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
  path,
}: {
  title: string;
  summary: ReactNode;
  path: string;
}) {
  return (
    <>
      <Breadcrumbs className="docs-page__breadcrumbs">
        <BreadcrumbItem>
          <BreadcrumbLink href={withBasePath('/')}>Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={withBasePath('/foundations/colors')}>Foundations</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={withBasePath(path)} current>
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
