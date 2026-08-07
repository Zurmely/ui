import { useCallback, useMemo, useState } from 'react';
import { Separator } from '@z-ux/ui';
import type { AnyComponentDoc } from './types';
import { getDefaultProps } from './types';
import { Controls } from './Controls';
import { CodeBlock } from './CodeBlock';
import { generateFullSnippet } from './generateCode';

interface PlaygroundProps {
  doc: AnyComponentDoc;
}

export function Playground({ doc }: PlaygroundProps) {
  const defaultProps = useMemo(() => getDefaultProps(doc.controls), [doc.controls]);
  const [props, setProps] = useState<Record<string, unknown>>(defaultProps);

  const handleChange = useCallback((key: string, value: unknown) => {
    setProps((prev) => ({ ...prev, [key]: value }));
  }, []);

  const code = useMemo(
    () =>
      generateFullSnippet(
        {
          importPath: doc.importPath,
          componentName: doc.componentName,
          controls: doc.controls,
          code: doc.code as ((props: Record<string, unknown>) => string) | undefined,
        },
        props,
      ),
    [doc, props],
  );

  return (
    <div className="docs-playground">
      <div className="docs-playground__stage">
        <div className="docs-playground__preview">
          <div className="docs-playground__preview-inner">{doc.render(props)}</div>
        </div>
        <Separator orientation="vertical" className="docs-playground__divider docs-playground__divider--vertical" />
        <Separator className="docs-playground__divider docs-playground__divider--horizontal" />
        <aside className="docs-playground__sidebar">
          <h3 className="docs-playground__heading">Controls</h3>
          <Controls controls={doc.controls} values={props} onChange={handleChange} />
        </aside>
      </div>
      <Separator />
      <div className="docs-playground__code">
        <h3 className="docs-playground__heading">Code</h3>
        <CodeBlock code={code} />
      </div>
    </div>
  );
}
