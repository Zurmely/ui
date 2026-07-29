export interface DocSection {
  id: string;
  title: string;
  body: string;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

export function parseSections(markdown: string): DocSection[] {
  const normalized = markdown.replace(/\r\n/g, '\n').trim();
  if (!normalized) {
    return [];
  }

  const parts = normalized.split('\n## ');
  const sections: DocSection[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (!part.trim()) {
      continue;
    }

    if (i === 0) {
      const withoutTitle = part.replace(/^#\s+.+\n?/, '').trim();
      if (!withoutTitle) {
        continue;
      }
      continue;
    }

    const newlineIndex = part.indexOf('\n');
    const title = newlineIndex === -1 ? part.trim() : part.slice(0, newlineIndex).trim();
    const body = newlineIndex === -1 ? '' : part.slice(newlineIndex + 1).trim();

    if (!title || title.toLowerCase() === 'examples') {
      continue;
    }

    sections.push({
      id: slugify(title),
      title,
      body,
    });
  }

  return sections;
}
