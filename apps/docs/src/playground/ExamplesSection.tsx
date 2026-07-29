import type { Example } from './types';
import { ExampleCard } from './ExampleCard';

interface ExamplesSectionProps {
  examples: Example[];
}

export function ExamplesSection({ examples }: ExamplesSectionProps) {
  if (examples.length === 0) {
    return null;
  }

  return (
    <div className="docs-examples-grid">
      {examples.map((example) => (
        <ExampleCard key={example.label} example={example} />
      ))}
    </div>
  );
}
