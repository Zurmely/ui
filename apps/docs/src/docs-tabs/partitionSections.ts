import type { DocSection } from '../markdown/sections';
import { parseAllSections } from '../markdown/sections';
import {
  getAiAnatomySupplement,
  getAiImportSupplement,
  getAiPropsSupplement,
} from './aiDocContent';
import { extractTypeSnippets, stripTypeCodeFences } from './extractTypes';
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

export function partitionMarkdownSections(markdown: string, slug: string): PartitionedDocSections {
  const parsed = parseAllSections(markdown);
  const design: DocSection[] = [];
  const code: DocSection[] = [];

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
  let apiPropsBody = '';
  let apiStatesBody = '';

  if (api) {
    const split = splitApiSection(api.body);
    anatomyBody = appendMarkdownSection(anatomyBody, split.anatomy);
    apiPropsBody = split.props;
    apiStatesBody = split.states;
  }

  anatomyBody = appendMarkdownSection(anatomyBody, getAiAnatomySupplement(slug));
  const anatomySection = section('Anatomy', anatomyBody);

  let statesBody = apiStatesBody;
  const accessibility = findSection(parsed, 'Accessibility');
  if (accessibility) {
    statesBody = appendMarkdownSection(statesBody, accessibility.body);
  }
  const keyboard = findSection(parsed, 'Keyboard');
  if (keyboard) {
    statesBody = appendMarkdownSection(statesBody, keyboard.body);
  }

  const statesSection = section('States', statesBody);

  const install = findSection(parsed, 'Install');
  const importBody = install
    ? appendMarkdownSection(install.body, getAiImportSupplement(slug))
    : getAiImportSupplement(slug);

  let propsBody = appendMarkdownSection(apiPropsBody, getAiPropsSupplement(slug));
  const typesBody = extractTypeSnippets(markdown, api?.body ?? '', propsBody, importBody);
  propsBody = stripTypeCodeFences(propsBody);

  const importSection = section('Import', importBody);
  const propsSection = section('Props', propsBody);
  const typesSection = section('Types', typesBody);
  const examples = findSection(parsed, 'Examples');

  for (const entry of [
    importSection,
    anatomySection,
    propsSection,
    typesSection,
    statesSection,
    examples,
  ]) {
    if (entry) {
      code.push(entry);
    }
  }

  return {
    design,
    code,
  };
}
