const ANATOMY_SUBSECTION_TITLES = new Set([
  'slots',
  'composition',
  'compound parts',
  'subcomponents',
  'timelineitem slots',
]);
const STATES_SUBSECTION_TITLES = new Set(['data attributes', 'state attributes']);

function normalizeHeading(title: string): string {
  return title.trim().toLowerCase();
}

function splitByH3(body: string): { heading: string | null; content: string }[] {
  const chunks: { heading: string | null; content: string }[] = [];
  const lines = body.replace(/\r\n/g, '\n').split('\n');
  let currentHeading: string | null = null;
  let currentLines: string[] = [];

  const flush = () => {
    const content = currentLines.join('\n').trim();
    if (currentHeading !== null || content) {
      chunks.push({ heading: currentHeading, content });
    }
    currentLines = [];
  };

  for (const line of lines) {
    if (line.startsWith('### ')) {
      flush();
      currentHeading = line.slice(4).trim();
      continue;
    }
    currentLines.push(line);
  }
  flush();

  return chunks;
}

function joinChunks(chunks: { heading: string | null; content: string }[]): string {
  const parts: string[] = [];
  for (const chunk of chunks) {
    if (!chunk.content && !chunk.heading) {
      continue;
    }
    if (chunk.heading) {
      parts.push(`### ${chunk.heading}`, '', chunk.content);
    } else {
      parts.push(chunk.content);
    }
  }
  return parts.join('\n').trim();
}

export function splitApiSection(body: string): { props: string; anatomy: string; states: string } {
  const chunks = splitByH3(body);
  const propsChunks: { heading: string | null; content: string }[] = [];
  const anatomyChunks: { heading: string | null; content: string }[] = [];
  const statesChunks: { heading: string | null; content: string }[] = [];

  for (const chunk of chunks) {
    const key = chunk.heading ? normalizeHeading(chunk.heading) : null;
    if (key && ANATOMY_SUBSECTION_TITLES.has(key)) {
      anatomyChunks.push(chunk);
    } else if (key && STATES_SUBSECTION_TITLES.has(key)) {
      statesChunks.push(chunk);
    } else {
      propsChunks.push(chunk);
    }
  }

  return {
    props: joinChunks(propsChunks),
    anatomy: joinChunks(anatomyChunks),
    states: joinChunks(statesChunks),
  };
}

export function appendMarkdownSection(base: string, extra: string): string {
  const trimmedBase = base.trim();
  const trimmedExtra = extra.trim();
  if (!trimmedExtra) {
    return trimmedBase;
  }
  if (!trimmedBase) {
    return trimmedExtra;
  }
  return `${trimmedBase}\n\n${trimmedExtra}`;
}
