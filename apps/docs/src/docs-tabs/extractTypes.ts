const TYPE_BLOCK_PATTERN = /```(?:tsx?|typescript)\n([\s\S]*?)```/g;

function isTypeBlock(body: string): boolean {
  return /^(export\s+)?(type|interface|enum)\s/m.test(body.trim());
}

export function extractTypeSnippets(...sources: string[]): string {
  const blocks: string[] = [];
  const seen = new Set<string>();

  for (const source of sources) {
    for (const match of source.matchAll(TYPE_BLOCK_PATTERN)) {
      const body = match[1].trim();
      if (!isTypeBlock(body) || seen.has(body)) {
        continue;
      }
      seen.add(body);
      blocks.push(`\`\`\`tsx\n${body}\n\`\`\``);
    }
  }

  return blocks.join('\n\n');
}

export function stripTypeCodeFences(markdown: string): string {
  return markdown
    .replace(TYPE_BLOCK_PATTERN, (full, body: string) => (isTypeBlock(body) ? '' : full))
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
