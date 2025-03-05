import { configureSpace } from "@flatfile/plugin-space-configure";
import type { FlatfileListener } from "@flatfile/listener";
import customerWorkbook from "../blueprints/customer.workbook";
import welcomeDocument from "../blueprints/documents/welcome";

/**
 * Configure the space with the customer workbook and welcome document
 */
export default async function spaceConfigure(listener: FlatfileListener) {
  console.log("Configuring space...");
  
  // Configure the space with the customer workbook and welcome document
  listener.use(
    configureSpace({
      workbooks: [customerWorkbook],
      documents: [welcomeDocument],
      space: {
        metadata: {
          sidebarConfig: {
            defaultPage: {
              document: "welcome"
            }
          },
          theme: {
            root: {
              primaryColor: "#8439F6",
              dangerColor: "#FF4B55",
              warningColor: "#FFB946",
              borderColor: "#E6E8F0",
              fontFamily: "Inter, -apple-system, sans-serif"
            },
            sidebar: {
              backgroundColor: "#1A1B3D",
              textColor: "#E6E8F0",
              titleColor: "#8439F6",
              focusBgColor: "#2A2C4E",
              focusTextColor: "#FFFFFF"
            },
            table: {
              column: {
                header: {
                  backgroundColor: "#2A2C4E",
                  color: "#FFFFFF"
                }
              },
              indexColumn: {
                backgroundColor: "#F8F9FD",
                color: "#1A1B3D",
                selected: {
                  backgroundColor: "#8439F6"
                }
              },
              inputs: {
                checkbox: {
                  color: "#8439F6",
                  borderColor: "#C7C9D9"
                }
              },
              footer: {
                backgroundColor: "#1A1B3D",
                textColor: "#FFFFFF"
              }
            }
          }
        }
      }
    })
  );
  
  console.log("Space configured successfully");
} 