import type { FlatfileListener } from "@flatfile/listener";
import { FileHandler } from "./handlers/file.handler";
import spaceConfigure from "./jobs/space.configure";
import { DelimiterExtractor } from "./extractors/delimiter";

/**
 * Main listener setup
 */
export default function (listener: FlatfileListener): void {
  // Initialize handlers
  const fileHandler = new FileHandler(listener);

  // Listen for space:created events
  listener.on("space:created", async (event) => {
    console.log("Space created event received:", event.context.spaceId);
    try {
      await spaceConfigure(listener);
      console.log("Space configuration completed successfully");
    } catch (error) {
      console.error("Error configuring space:", error);
    }
  });

  // Also listen for space:configure events for backward compatibility
  listener.on("space:configure", async (event) => {
    console.log("Space configure event received:", event.context.spaceId);
    try {
      await spaceConfigure(listener);
      console.log("Space configuration completed successfully");
    } catch (error) {
      console.error("Error configuring space:", error);
    }
  });

  // Register the delimiter extractor
  listener.use(DelimiterExtractor());

  // Add file event handlers
  listener.on("file:created", async (event) => {
    console.log("[Debug] file:created event received:", {
      fileId: event.context.fileId,
      fileName: event.context.fileName,
      workbookId: event.context.workbookId
    });
    await fileHandler.handleFileCreated(event);
  });

  // Handle job completion and errors
  listener.on("job:complete", async ({ context }) => {
    console.log("[Debug] Job complete:", {
      jobId: context.jobId,
      fileName: context.fileName,
    });
    fileHandler.resetState();
  });

  listener.on("job:failed", async ({ context }) => {
    console.log("[Debug] Job failed:", {
      jobId: context.jobId,
      fileName: context.fileName,
      error: context.error,
    });
    fileHandler.resetState();
  });

  // Log all events for debugging
  listener.on("**", (event) => {
    console.log(`Event received: ${event.topic}`, {
      spaceId: event.context.spaceId,
      eventData: event.payload
    });
  });
} 