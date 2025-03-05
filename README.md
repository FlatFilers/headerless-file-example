# Headerless File Import Demo

This repo demonstrates how to import delimited files without headers in Flatfile.

## Features
- Import any pipe-delimited (.txt or .csv) file
- Automatically assign headers based on predefined mapping
- Process AMS-formatted data

## How It Works
1. Upload any pipe-delimited file
2. The system checks to see if the file has headers or not
3. If not, the system will use the predefined headers
4. The system automatically assigns headers based on column position
5. Data is mapped to the appropriate fields in the sheet
6. Process or transform the data as needed

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with your Flatfile credentials:
   ```
   FLATFILE_API_KEY=your_api_key
   FLATFILE_ENVIRONMENT_ID=your_environment_id
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Implementation Details

The key components of this demo are:

1. **Delimiter Extractor**: Configured to work with any .txt or .csv file
2. **Explicit Headers**: Predefined headers are assigned to columns based on position
3. **AMS Sheet**: Sheet configured to handle AMS data format

The main logic for header assignment is in `app/extractors/delimiter/index.ts` and the header definitions are in `app/config/headers.ts`.

## Sample Files

You can test with any pipe-delimited file. The system will automatically assign headers based on the predefined mapping.

There's a "AMS" file in the `sample-data` folder that can be used for the AMS sheet. This file is a pipe-delimited .txt file with no headers.

## Customization

To adapt this for your own use case:
1. Modify the headers in `app/config/headers.ts`
2. Update the sheet definition in `app/blueprints/sheets/ams.ts`
3. Adjust the delimiter in `app/extractors/delimiter/index.ts` if needed 