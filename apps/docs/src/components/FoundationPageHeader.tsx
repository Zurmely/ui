import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Breadcrumbs,
} from '@z-ux/ui';
import type { ReactNode } from 'react';
import { withBasePath } from '../base-path';

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
          <BreadcrumbLink href={withBasePath('/')}>Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={withBasePath('/')} current>
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
