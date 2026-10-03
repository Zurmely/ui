import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@z-ux/ui';
import type { ReactNode } from 'react';
import { isValidElement } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent, CardHeader, CardTitle } from '@z-ux/ui';
import { DocsHeadingLinkIcon } from '../icons/DocsHeadingLinkIcon';
import { CodeBlock } from '../playground/CodeBlock';
import { folderForSlug } from './component-slugs';

interface MarkdownContentProps {
  content: string;
  sectionTitle?: string;
  whenToUsePreviews?: {
    use: () => ReactNode;
    doNotUse: () => ReactNode;
  };
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

function getTextContent(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getTextContent).join('');
  }
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getTextContent(node.props.children);
  }
  return '';
}

function parseWhenToUse(content: string): { useWhen: string[]; doNotUse: string[] } {
  const useWhen: string[] = [];
  const doNotUse: string[] = [];
  let mode: 'use' | 'dont' | null = null;

  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (trimmed === '**Use when:**' || trimmed === 'Use when:') {
      mode = 'use';
      continue;
    }
    if (trimmed === '**Do not use when:**' || trimmed === 'Do not use when:') {
      mode = 'dont';
      continue;
    }
    if (trimmed.startsWith('- ')) {
      const item = trimmed.slice(2).trim();
      if (mode === 'use') {
        useWhen.push(item);
      } else if (mode === 'dont') {
        doNotUse.push(item);
      }
    }
  }

  return { useWhen, doNotUse };
}

interface WhenToUseCardsProps {
  content: string;
  usePreview?: () => ReactNode;
  doNotUsePreview?: () => ReactNode;
}

function WhenToUsePreview({ children }: { children: ReactNode }) {
  return (
    <div className="docs-callout__preview">
      <div className="docs-callout__preview-inner">{children}</div>
    </div>
  );
}

function WhenToUseCards({ content, usePreview, doNotUsePreview }: WhenToUseCardsProps) {
  const { useWhen, doNotUse } = parseWhenToUse(content);

  return (
    <div className="docs-callout-grid">
      <Card className="docs-callout docs-callout--do">
        <CardHeader>
          <CardTitle className="docs-callout__title">Use when</CardTitle>
        </CardHeader>
        <CardContent>
          {usePreview ? (
            <WhenToUsePreview>{usePreview()}</WhenToUsePreview>
          ) : null}
          <ul className="docs-markdown__ul">
            {useWhen.map((item) => (
              <li key={item} className="docs-markdown__li">
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card className="docs-callout docs-callout--dont">
        <CardHeader>
          <CardTitle className="docs-callout__title">Do not use when</CardTitle>
        </CardHeader>
        <CardContent>
          {doNotUsePreview ? (
            <WhenToUsePreview>{doNotUsePreview()}</WhenToUsePreview>
          ) : null}
          <ul className="docs-markdown__ul">
            {doNotUse.map((item) => (
              <li key={item} className="docs-markdown__li">
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function HeadingAnchor({ id }: { id: string }) {
  return (
    <a href={`#${id}`} className="docs-markdown__heading-anchor" aria-label="Link to section">
      <DocsHeadingLinkIcon />
    </a>
  );
}

const markdownComponents = {
  h1: ({ children }: { children?: ReactNode }) => <h2 className="docs-markdown__h2">{children}</h2>,
  h2: ({ children }: { children?: ReactNode }) => {
    const text = getTextContent(children);
    const id = slugifyHeading(text);
    return (
      <h3 className="docs-markdown__h3" id={id}>
        <HeadingAnchor id={id} />
        {children}
      </h3>
    );
  },
  h3: ({ children }: { children?: ReactNode }) => {
    const text = getTextContent(children);
    const id = slugifyHeading(text);
    return (
      <h4 className="docs-markdown__h4" id={id}>
        <HeadingAnchor id={id} />
        {children}
      </h4>
    );
  },
  p: ({ children }: { children?: ReactNode }) => <p className="docs-markdown__p">{children}</p>,
  ul: ({ children }: { children?: ReactNode }) => <ul className="docs-markdown__ul">{children}</ul>,
  ol: ({ children }: { children?: ReactNode }) => <ol className="docs-markdown__ol">{children}</ol>,
  li: ({ children }: { children?: ReactNode }) => <li className="docs-markdown__li">{children}</li>,
  table: ({ children }: { children?: ReactNode }) => (
    <div className="docs-markdown__table-scroll">
      <Table className="docs-markdown__table">{children}</Table>
    </div>
  ),
  thead: ({ children }: { children?: ReactNode }) => <TableHeader>{children}</TableHeader>,
  tbody: ({ children }: { children?: ReactNode }) => <TableBody>{children}</TableBody>,
  tr: ({ children }: { children?: ReactNode }) => <TableRow>{children}</TableRow>,
  th: ({ children }: { children?: ReactNode }) => <TableHead>{children}</TableHead>,
  td: ({ children }: { children?: ReactNode }) => <TableCell>{children}</TableCell>,
  code: ({ className, children }: { className?: string; children?: ReactNode }) => {
    const isBlock = className?.includes('language-');
    if (isBlock) {
      const language = className?.replace('language-', '') ?? 'tsx';
      return <CodeBlock code={String(children)} language={language} />;
    }
    return <code className="docs-markdown__code">{children}</code>;
  },
  pre: ({ children }: { children?: ReactNode }) => <>{children}</>,
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="docs-markdown__strong">{children}</strong>
  ),
};

export function MarkdownContent({ content, sectionTitle, whenToUsePreviews }: MarkdownContentProps) {
  if (sectionTitle === 'When to use') {
    return (
      <div className="docs-markdown docs-markdown--section">
        <WhenToUseCards
          content={content}
          usePreview={whenToUsePreviews?.use}
          doNotUsePreview={whenToUsePreviews?.doNotUse}
        />
      </div>
    );
  }

  return (
    <div className="docs-markdown docs-markdown--section">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

const markdownModules = {
  ...import.meta.glob('../../../../packages/react/src/components/*/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
  }),
} as Record<string, string>;

export function getComponentMarkdown(slug: string): string | undefined {
  const folder = folderForSlug(slug);
  const entry = Object.entries(markdownModules).find(([path]) =>
    path.includes(`/components/${folder}/`),
  );
  return entry?.[1];
}
