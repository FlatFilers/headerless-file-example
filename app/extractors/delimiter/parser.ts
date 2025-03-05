import { Flatfile } from "@flatfile/api";
import { Readable } from "stream";
import { parse } from "papaparse";
import { createHeaderDetector } from "./header-detection";
import { DelimiterOptions } from "./types";
import { WorkbookCapture } from "@flatfile/util-extractor";

/**
 * Parse a delimited file and return a workbook capture
 */
export async function parseDelimitedFile(buffer: Buffer, options: DelimiterOptions): Promise<WorkbookCapture> {
  const startTime = Date.now();
  try {
    console.log("[Debug] Starting file parse...");
    const fileContent = buffer.toString("utf8");
    const lines = fileContent.split("\n").filter((line) => line.trim());
    const filename = options.filename || "";
    
    console.log(`[Debug] Processing file: ${filename}, ${lines.length} lines`);

    // Process in smaller chunks
    const CHUNK_SIZE = 500;
    const processedData: Record<string, { value: Flatfile.CellValueUnion }>[] = [];

    // Get headers
    const headerDetector = createHeaderDetector(options.headerDetectionOptions || { algorithm: "default" });

    const stream = Readable.from([lines[0]]) as Readable & { path?: string };
    stream.path = filename;
    const { header } = await headerDetector.getHeaders(stream);

    // Use pipe delimiter for AMS files
    const delimiter = '|';
    console.log("[Debug] Using delimiter:", delimiter, "for file:", filename);

    // Process lines in chunks
    for (let i = 0; i < lines.length; i += CHUNK_SIZE) {
      const chunk = lines.slice(i, i + CHUNK_SIZE);
      console.log(`[Debug] Processing chunk ${Math.floor(i / CHUNK_SIZE) + 1}/${Math.ceil(lines.length / CHUNK_SIZE)}`);

      const chunkData = await Promise.all(
        chunk.map((line) => {
          const fields = line.split(delimiter).map((field) => field.trim());
          
          // Create a record with each field mapped to the corresponding header
          const record: Record<string, { value: Flatfile.CellValueUnion }> = {};
          
          header.forEach((headerName, index) => {
            if (headerName && index < fields.length) {
              // Apply transform function if provided
              const value = options.transform ? options.transform(fields[index]) : fields[index];
              record[headerName] = { value };
            }
          });
          
          return record;
        })
      );

      processedData.push(...chunkData);

      // Small delay between chunks
      if (i + CHUNK_SIZE < lines.length) {
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }

    console.log(`[Debug] Completed processing in ${Date.now() - startTime}ms`);

    return {
      Sheet1: {
        headers: header,
        data: processedData,
      },
    };
  } catch (error) {
    console.error("[Debug] Parser error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      timeElapsed: Date.now() - startTime,
      filename: options.filename,
    });

    if (options?.onError) {
      options.onError(error as Error);
    }
    throw error;
  }
} 