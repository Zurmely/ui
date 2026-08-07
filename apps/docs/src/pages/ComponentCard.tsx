import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@z-ux/ui';
import { Link } from 'react-router-dom';
import type { AnyComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

interface ComponentCardProps {
  doc: AnyComponentDoc;
}

export function ComponentCard({ doc }: ComponentCardProps) {
  const defaultProps = useMemo(() => getDefaultProps(doc.controls), [doc.controls]);

  return (
    <Link to={`/components/${doc.slug}`} className="docs-home-card-link">
      <Card>
        <CardContent className="docs-home-card__preview">
          <div className="docs-home-card__preview-inner">{doc.render(defaultProps)}</div>
        </CardContent>
        <CardHeader>
          <CardTitle>{doc.name}</CardTitle>
          <CardDescription>{doc.summary}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
