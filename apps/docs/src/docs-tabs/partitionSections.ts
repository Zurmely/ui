import type { DocSection } from '../markdown/sections';
import { parseAllSections } from '../markdown/sections';
import { getAiAnatomySupplement, getAiPropsSupplement } from './aiDocContent';
import { appendMarkdownSection, splitApiSection } from './splitApiSection';

export interface PartitionedDocSections {
  design: DocSection[];
  code: DocSection[];
}

function section(title: string, body: string): DocSection | null {
  const trimmed = body.trim();
  if (!trimmed) {
    return null;
  }
  const id = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
  return { id, title, body: trimmed };
}

function findSection(sections: DocSection[], title: string): DocSection | undefined {
  return sections.find((entry) => entry.title === title);
}

function extractTypeSnippets(markdown: string): string {
  const blocks: string[] = [];
  const pattern = /```(?:tsx?|typescript)\n([\s\S]*?)```/g;
  for (const match of markdown.matchAll(pattern)) {
    const body = match[1].trim();
    if (/^(export\s+)?(type|interface|enum)\s/m.test(body)) {
      blocks.push(`\`\`\`tsx\n${body}\n\`\`\``);
    }
  }
  return blocks.join('\n\n');
}

export function partitionMarkdownSections(markdown: string, slug: string): PartitionedDocSections {
  const parsed = parseAllSections(markdown);
  const design: DocSection[] = [];
  const code: DocSection[] = [];

  const overview = findSection(parsed, 'Overview');
  if (overview) {
    design.push(overview);
  }

  const whenToUse = findSection(parsed, 'When to use');
  if (whenToUse) {
    design.push(whenToUse);
  }

  let anatomyBody = '';
  const figma = findSection(parsed, 'Figma');
  if (figma) {
    anatomyBody = appendMarkdownSection(anatomyBody, figma.body);
  }
  const tokens = findSection(parsed, 'Tokens');
  if (tokens) {
    anatomyBody = appendMarkdownSection(anatomyBody, tokens.body);
  }

  const api = findSection(parsed, 'API');
  if (api) {
    const split = splitApiSection(api.body);
    anatomyBody = appendMarkdownSection(anatomyBody, split.anatomy);
    anatomyBody = appendMarkdownSection(anatomyBody, getAiAnatomySupplement(slug));

    let statesBody = split.states;
    const accessibility = findSection(parsed, 'Accessibility');
    if (accessibility) {
      statesBody = appendMarkdownSection(statesBody, accessibility.body);
    }
    const keyboard = findSection(parsed, 'Keyboard');
    if (keyboard) {
      statesBody = appendMarkdownSection(statesBody, keyboard.body);
    }
    const notes = findSection(parsed, 'Notes');
    if (notes) {
      statesBody = appendMarkdownSection(statesBody, notes.body);
    }

    const anatomySection = section('Anatomy', anatomyBody);
    if (anatomySection) {
      design.push(anatomySection);
    }

    const statesSection = section('States', statesBody);
    if (statesSection) {
      design.push(statesSection);
    }

    const propsBody = appendMarkdownSection(split.props, getAiPropsSupplement(slug));
    const propsSection = section('Props', propsBody);
    const typesSection = section('Types', extractTypeSnippets(propsBody));
    if (propsSection) {
      code.push(propsSection);
    }
    if (typesSection) {
      code.push(typesSection);
    }
  } else {
    const anatomySection = section('Anatomy', appendMarkdownSection(anatomyBody, getAiAnatomySupplement(slug)));
    if (anatomySection) {
      design.push(anatomySection);
    }

    let statesBody = '';
    const accessibility = findSection(parsed, 'Accessibility');
    if (accessibility) {
      statesBody = appendMarkdownSection(statesBody, accessibility.body);
    }
    const keyboard = findSection(parsed, 'Keyboard');
    if (keyboard) {
      statesBody = appendMarkdownSection(statesBody, keyboard.body);
    }
    const notes = findSection(parsed, 'Notes');
    if (notes) {
      statesBody = appendMarkdownSection(statesBody, notes.body);
    }
    const statesSection = section('States', statesBody);
    if (statesSection) {
      design.push(statesSection);
    }
  }

  const examples = findSection(parsed, 'Examples');
  if (examples) {
    design.push(examples);
  }

  const install = findSection(parsed, 'Install');
  if (install) {
    code.push({ ...install, title: 'Import', id: 'import' });
  }

  return { design, code };
}
