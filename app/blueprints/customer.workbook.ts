import type { Flatfile } from "@flatfile/api";
import { amsSheet } from "./sheets/ams";

// Simple workbook with AMS sheet
export const customerWorkbook: Flatfile.CreateWorkbookConfig = {
  name: "AMS Data Import",
  labels: ["ams-data-import"],
  sheets: [amsSheet],
};

export default customerWorkbook; 