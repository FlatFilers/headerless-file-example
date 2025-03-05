import { amsHeaders } from './headers';

export const predefinedHeaders = {
  default: [
    "Column 1", "Column 2", "Column 3", "Column 4", "Column 5",
    "Column 6", "Column 7", "Column 8", "Column 9", "Column 10"
  ],
  // You can add specific configurations for different file types
  csv: [
    "ID", "Name", "Email", "Phone", "Address",
    "City", "State", "Zip", "Country", "Notes"
  ],
  // AMS file headers
  ams: amsHeaders,
  // Add more as needed
};

export function getHeadersForFileType(fileName: string): string[] {
  // Check if it's an AMS file by name pattern
  if (fileName.toLowerCase().includes('ams') || fileName.toLowerCase().includes('account_management')) {
    return predefinedHeaders.ams;
  }
  
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'csv':
      return predefinedHeaders.csv;
    case 'txt':
    case 'tsv':
    default:
      return predefinedHeaders.default;
  }
} 