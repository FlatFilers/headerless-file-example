import { FlatfileListener } from "@flatfile/listener";
import listeners from "./listeners";

/**
 * This is the main entry point for the Flatfile plugin
 */
export default function (listener: FlatfileListener) {
  // Use our listeners configuration
  listeners(listener);

  // Log all events
  listener.on("**", (event) => {
    console.log(`Received event: ${event.topic}`);
  });
}
 