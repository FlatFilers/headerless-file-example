import { Flatfile } from "@flatfile/api";

export type Delimiters = "," | "|" | "\t" | ";" | ":" | "~" | "^" | "#";

export interface HeaderDetectionResult {
  header: string[];
  skip: number;
  letters: string[];
}

export interface DefaultOptions {
  algorithm: "default";
  rowsToSearch?: number;
}

export interface ExplicitHeadersOptions {
  algorithm: "explicitHeaders";
  headers: string[] | ((filename: string) => string[]);
  skip?: number;
}

export interface SpecificRowsOptions {
  algorithm: "specificRows";
  rowNumbers: number[];
  skip?: number;
}

export type GetHeadersOptions = DefaultOptions | ExplicitHeadersOptions | SpecificRowsOptions;

export interface DelimiterOptions {
  readonly filePattern?: RegExp;
  readonly filename?: string;
  readonly delimiter?: Delimiters | ((filename: string) => Delimiters);
  readonly guessDelimiters?: Delimiters[];
  readonly dynamicTyping?: boolean;
  readonly skipEmptyLines?: boolean | "greedy";
  readonly transform?: (value: any) => Flatfile.CellValueUnion;
  readonly chunkSize?: number;
  readonly parallel?: number;
  readonly headerDetectionOptions?: GetHeadersOptions;
  readonly debug?: boolean;
  readonly onError?: (error: Error) => void;
  readonly validate?: (headers: string[]) => boolean;
} 