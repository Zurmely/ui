/// <reference types="vite/client" />

declare module '*.css?raw' {
  const content: string;
  export default content;
}

interface ImportMeta {
  readonly glob: (
    pattern: string,
    options?: {
      query?: string;
      import?: string;
      eager?: boolean;
    },
  ) => Record<string, unknown>;
}
