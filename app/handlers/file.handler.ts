import type { FlatfileListener, FlatfileEvent } from "@flatfile/listener";
import api from "@flatfile/api";
import * as Papa from "papaparse";
import { getHeadersForFileType } from "../config/headers.config";

/**
 * File handler to process uploaded files with header detection
 */
export class FileHandler {
  private listener: FlatfileListener;
  private headerDetectionState: Record<string, any> = {};

  constructor(listener: FlatfileListener) {
    this.listener = listener;
  }

  /**
   * Handle file created event
   */
  async handleFileCreated(event: FlatfileEvent): Promise<void> {
    const { fileId, fileName } = event.context;
    console.log(`Processing file: ${fileName} (${fileId})`);

    try {
      // Download the file content
      const fileData = await this.downloadFile(fileId);
      
      // Detect if the file has headers
      const hasHeaders = await this.detectHeaders(fileData, fileId, fileName);
      
      if (hasHeaders) {
        console.log(`Headers detected in file: ${fileName}. Using existing headers.`);
        // Process with existing headers
        await this.processFileWithHeaders(fileData, fileId);
      } else {
        console.log(`No headers detected in file: ${fileName}. Using predefined headers.`);
        // Process without headers (use predefined headers)
        await this.processFileWithoutHeaders(fileData, fileId, fileName);
      }
    } catch (error) {
      console.error(`Error processing file ${fileName}:`, error);
      throw error;
    }
  }

  private async downloadFile(fileId: string): Promise<string> {
    // Download the file content as a readable stream
    const fileStream = await api.files.download(fileId);
    
    // Convert the stream to a string
    return new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = [];
      
      fileStream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      fileStream.on('error', (err) => reject(err));
      fileStream.on('end', () => {
        const fileContent = Buffer.concat(chunks).toString('utf8');
        resolve(fileContent);
      });
    });
  }

  private async detectHeaders(fileData: string, fileId: string, fileName: string): Promise<boolean> {
    // Parse the first few lines of the file
    const parseResult = Papa.parse<string[]>(fileData, {
      preview: 5, // Look at first 5 rows
      skipEmptyLines: true
    });
    
    if (parseResult.data.length === 0) {
      return false;
    }
    
    const firstRow = parseResult.data[0];
    
    // Store the potential headers for later use
    this.headerDetectionState[fileId] = {
      potentialHeaders: firstRow,
      fileName
    };
    
    // Heuristic to detect if first row is headers:
    // 1. Check if first row contains mostly strings while second row contains mostly numbers
    if (parseResult.data.length > 1) {
      const secondRow = parseResult.data[1];
      
      const firstRowStringCount = firstRow.filter((cell: string) => 
        typeof cell === 'string' && isNaN(Number(cell))).length;
      const secondRowNumberCount = secondRow.filter((cell: string) => 
        !isNaN(Number(cell))).length;
      
      if (firstRowStringCount > firstRow.length / 2 && 
          secondRowNumberCount > secondRow.length / 2) {
        return true;
      }
    }
    
    // 2. Check if first row has different data types than the rest
    const dataTypesDifferent = this.checkDataTypesDifferent(parseResult.data);
    if (dataTypesDifferent) {
      return true;
    }
    
    // 3. Check for common header patterns (e.g., "id", "name", "date", etc.)
    const commonHeaderWords = ["id", "name", "date", "time", "code", "type", "status", "amount"];
    const headerWordsFound = firstRow.some((cell: string) => 
      typeof cell === 'string' && 
      commonHeaderWords.some(word => 
        cell.toLowerCase().includes(word)));
    
    if (headerWordsFound) {
      return true;
    }
    
    return false;
  }
  
  private checkDataTypesDifferent(data: string[][]): boolean {
    if (data.length < 2) return false;
    
    const firstRowTypes = data[0].map(cell => typeof cell === 'string' && isNaN(Number(cell)) ? 'string' : 'number');
    
    // Check if subsequent rows have different types than the first row
    for (let i = 1; i < Math.min(data.length, 3); i++) {
      const rowTypes = data[i].map(cell => typeof cell === 'string' && isNaN(Number(cell)) ? 'string' : 'number');
      const differentTypes = firstRowTypes.some((type, index) => type !== rowTypes[index]);
      
      if (differentTypes) {
        return true;
      }
    }
    
    return false;
  }

  private async processFileWithHeaders(fileData: string, fileId: string): Promise<void> {
    // Get the stored potential headers
    const { potentialHeaders } = this.headerDetectionState[fileId] || {};
    
    if (!potentialHeaders) {
      throw new Error("Headers not found in state");
    }
    
    // Parse the file with the first row as headers
    const parseResult = Papa.parse(fileData, {
      header: true,
      skipEmptyLines: true
    });
    
    // Process the data with the detected headers
    console.log(`Processing file with detected headers: ${potentialHeaders.join(', ')}`);
    
    // Example: Update the file in Flatfile with the parsed data
    await this.updateFileInFlatfile(fileId, parseResult.data, potentialHeaders);
  }

  private async processFileWithoutHeaders(fileData: string, fileId: string, fileName: string): Promise<void> {
    // Get predefined headers based on file type
    const predefinedHeaders = getHeadersForFileType(fileName);
    
    // Parse the file without headers
    const parseResult = Papa.parse<string[]>(fileData, {
      header: false,
      skipEmptyLines: true
    });
    
    // Map the data to objects with predefined headers
    const mappedData = parseResult.data.map((row: string[]) => {
      const obj: Record<string, any> = {};
      row.forEach((cell: string, index: number) => {
        if (index < predefinedHeaders.length) {
          obj[predefinedHeaders[index]] = cell;
        } else {
          obj[`Column ${index + 1}`] = cell;
        }
      });
      return obj;
    });
    
    console.log(`Processing file with predefined headers: ${predefinedHeaders.join(', ')}`);
    
    // Update the file in Flatfile with the parsed data
    await this.updateFileInFlatfile(fileId, mappedData, predefinedHeaders);
  }

  private async updateFileInFlatfile(fileId: string, data: any[], headers: string[]): Promise<void> {
    // This is a placeholder for your actual implementation
    // You'll need to use the Flatfile API to update the file with the processed data
    console.log(`Updating file ${fileId} in Flatfile with ${data.length} rows`);
    
    // Example implementation (you'll need to adapt this to your specific needs)
    try {
      // Create a sheet or get an existing one
      // Map the data to the sheet
      // Submit the data
      console.log("File updated successfully");
    } catch (error) {
      console.error("Error updating file in Flatfile:", error);
      throw error;
    }
  }

  /**
   * Reset any state
   */
  resetState(): void {
    this.headerDetectionState = {};
  }
} 