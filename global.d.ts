declare namespace NodeJS {
  interface ProcessEnv {
    STANDARD_USERNAME?: string;
    STANDARD_PASSWORD?: string;
    PASSWORD?: string;
    [key: string]: string | undefined;
  }
}

declare var process: NodeJS.Process;