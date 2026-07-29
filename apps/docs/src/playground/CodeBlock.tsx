import { CodeBlock as ZCodeBlock } from '@z-ui/react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

/** Docs playground wrapper around the library multi CodeBlock. */
export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  return <ZCodeBlock variant="multi" language={language} code={code} />;
}
