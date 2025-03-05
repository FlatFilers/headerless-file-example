import { Extractor } from "@flatfile/util-extractor";
import { DelimiterOptions } from "./types";
import { parseDelimitedFile } from "./parser";
import { amsHeaders } from "../../config/headers";

/**
 * Creates a delimiter extractor for pipe-delimited files
 * This extractor will work with any file with a .txt or .csv extension
 */
export const DelimiterExtractor = () => {
  console.log("[Debug] Creating new delimiter extractor for pipe-delimited files");

  // Create and return the extractor with high priority
  const extractor = Extractor(/\.(txt|csv)$/i, "delimiter", parseDelimitedFile, {
    delimiter: '|', // Fixed to pipe delimiter for AMS files
    skipEmptyLines: true,
    debug: true,
    headerDetectionOptions: {
      algorithm: "explicitHeaders",
      headers: amsHeaders, // Use AMS headers for all files
      skip: 0,
    },
    matchOptions: {
      matchFilename: false, // Don't require exact filename match
      priority: 100, // High priority to ensure this extractor is used
    },
  });

  console.log("[Debug] Delimiter extractor created successfully with high priority");
  return extractor;
}; 