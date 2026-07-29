import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Breadcrumbs,
} from '@z-ui/react';
import type { ReactNode } from 'react';

export function FoundationPageHeader({
  title,
  summary,
}: {
  title: string;
  summary: ReactNode;
}) {
  return (
    <>
      <Breadcrumbs className="docs-page__breadcrumbs">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/" current>
            {title}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumbs>
      <header className="docs-page__header">
        <h1 className="docs-page__title">{title}</h1>
        <p className="docs-page__summary">{summary}</p>
      </header>
    </>
  );
}
