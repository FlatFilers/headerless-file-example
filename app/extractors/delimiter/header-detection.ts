import { Readable } from "stream";
import { parse } from "papaparse";
import { GetHeadersOptions, HeaderDetectionResult } from "./types";
import { amsHeaders } from "../../config/headers";

/**
 * Creates a header detector based on the provided options
 */
export function createHeaderDetector(options: GetHeadersOptions) {
  return {
    getHeaders: async (stream: Readable & { path?: string }): Promise<HeaderDetectionResult> => {
      const filename = stream.path || "";
      
      // For explicit headers, just return them directly
      if (options.algorithm === "explicitHeaders") {
        const headers = typeof options.headers === "function" 
          ? options.headers(filename) 
          : options.headers;
        
        console.log("[Debug] Using explicit headers:", headers);
        
        return {
          header: headers,
          skip: options.skip || 0,
          letters: headers.map((_, i) => String.fromCharCode(65 + i)),
        };
      }
      
      // Default to AMS headers if not using explicit headers
      // This is a fallback and shouldn't normally be reached in this demo
      console.log("[Debug] Falling back to default AMS headers");
      return {
        header: amsHeaders,
        skip: 0,
        letters: amsHeaders.map((_, i) => String.fromCharCode(65 + i)),
      };
    },
  };
} 