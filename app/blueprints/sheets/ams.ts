import type { Flatfile } from "@flatfile/api";

export const amsSheet: Flatfile.SheetConfig = {
  name: "AMS Import",
  slug: "ams_import",
  fields: [
    // Basic Information
    {
      key: "account_number",
      type: "string",
      label: "Account Number",
      description: "Customer account number",
      constraints: [{ type: "required" }],
    },
    {
      key: "display_account_number",
      type: "string",
      label: "Display Account Number",
      description: "Account number for display purposes",
    },
    {
      key: "merchant_name",
      type: "string",
      label: "Merchant Name",
      constraints: [{ type: "required" }],
    },
    {
      key: "merchant_min",
      type: "string",
      label: "Merchant MIN",
    },
    // Invoice Information
    {
      key: "invoice_number",
      type: "string",
      label: "Invoice Number",
      constraints: [{ type: "required" }],
    },
    {
      key: "invoice_date",
      type: "date",
      label: "Invoice Date",
      constraints: [{ type: "required" }],
    },
    {
      key: "current_date",
      type: "date",
      label: "Current Date",
    },
    {
      key: "order_number",
      type: "string",
      label: "Order Number",
    },
    {
      key: "order_date",
      type: "date",
      label: "Order Date",
    },
    // Plant Information
    {
      key: "plant_state",
      type: "string",
      label: "Plant State",
    },
    {
      key: "plant_zip",
      type: "string",
      label: "Plant ZIP",
    },
    // Shipping Information
    {
      key: "ship_from_zip",
      type: "string",
      label: "Ship From ZIP",
    },
    {
      key: "ship_to_zip",
      type: "string",
      label: "Ship To ZIP",
    },
    {
      key: "shipping_country_code",
      type: "string",
      label: "Shipping Country Code",
    },
    // Billing Address
    {
      key: "billing_address_1",
      type: "string",
      label: "Billing Address Line 1",
      constraints: [{ type: "required" }],
    },
    {
      key: "billing_address_2",
      type: "string",
      label: "Billing Address Line 2",
    },
    {
      key: "billing_address_3",
      type: "string",
      label: "Billing Address Line 3",
    },
    {
      key: "billing_address_4",
      type: "string",
      label: "Billing Address Line 4",
    },
    {
      key: "billing_city",
      type: "string",
      label: "Billing City",
      constraints: [{ type: "required" }],
    },
    {
      key: "billing_state",
      type: "string",
      label: "Billing State",
      constraints: [{ type: "required" }],
    },
    {
      key: "billing_zip",
      type: "string",
      label: "Billing ZIP",
      constraints: [{ type: "required" }],
    },
    {
      key: "billing_country",
      type: "string",
      label: "Billing Country",
      constraints: [{ type: "required" }],
    },
    // Line Items
    {
      key: "line",
      type: "string",
      label: "Line",
      description: "Line item identifier",
    },
    {
      key: "product",
      type: "string",
      label: "Product",
      description: "Product identifier",
    },
    {
      key: "part_number",
      type: "string",
      label: "Part Number",
    },
    {
      key: "commodity_code",
      type: "string",
      label: "Commodity Code",
    },
    {
      key: "description",
      type: "string",
      label: "Description",
    },
    {
      key: "quantity_ordered",
      type: "number",
      label: "Quantity Ordered",
      constraints: [{ type: "required" }],
    },
    {
      key: "unit_of_measure",
      type: "string",
      label: "Unit of Measure",
      constraints: [{ type: "required" }],
    },
    {
      key: "net_amount",
      type: "number",
      label: "Net Amount",
      constraints: [{ type: "required" }],
    },
    // Financial Information
    {
      key: "total_due",
      type: "number",
      label: "Total Due",
      description: "Total amount due",
      constraints: [{ type: "required" }],
    },
    {
      key: "freight",
      type: "number",
      label: "Freight",
      description: "Freight charges",
    },
    {
      key: "duty_amount",
      type: "number",
      label: "Duty Amount",
      description: "Duty charges",
    },
    {
      key: "sales_tax",
      type: "number",
      label: "Sales Tax",
      description: "Sales tax amount",
    },
    {
      key: "total_sales_tax",
      type: "number",
      label: "Total Sales Tax",
      description: "Total sales tax amount",
    },
    {
      key: "discount_amount",
      type: "number",
      label: "Discount Amount",
      description: "Line item discount amount",
    },
    {
      key: "total_discount_amount",
      type: "number",
      label: "Total Discount Amount",
      description: "Total discount amount",
    },
  ],
}; 