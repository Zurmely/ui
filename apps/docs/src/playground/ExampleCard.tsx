import { Button, Separator } from '@z-ux/ui';
import { useState } from 'react';
import type { Example } from './types';
import { CodeBlock } from './CodeBlock';

interface ExampleCardProps {
  example: Example;
}

export function ExampleCard({ example }: ExampleCardProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <article className={`docs-example${example.fullWidth ? ' docs-example--full-width' : ''}`}>
      <header className="docs-example__header">
        <div className="docs-example__meta">
          <h3 className="docs-example__label">{example.label}</h3>
          {example.description ? (
            <p className="docs-example__description">{example.description}</p>
          ) : null}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowCode((open) => !open)}
          aria-expanded={showCode}
        >
          {showCode ? 'Hide code' : 'Show code'}
        </Button>
      </header>
      <Separator />
      <div className="docs-example__preview">{example.render()}</div>
      {showCode ? (
        <>
          <Separator />
          <div className="docs-example__code">
          <CodeBlock code={example.code} />
          </div>
        </>
      ) : null}
    </article>
  );
}
