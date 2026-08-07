import type { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { DocsLayout } from './layout/DocsLayout';
import { HomePage } from './pages/HomePage';
import { ComponentPage } from './pages/ComponentPage';
import { ComponentsIndexPage } from './pages/ComponentsIndexPage';
import { ElementPage } from './pages/ElementPage';
import { ElementsIndexPage } from './pages/ElementsIndexPage';
import { PageExamplePage } from './pages/PageExamplePage';
import { PagesIndexPage } from './pages/PagesIndexPage';
import { ColorsPage } from './foundations/ColorsPage';
import { SizesPage } from './foundations/SizesPage';
import { TypographyPage } from './foundations/TypographyPage';
import { MotionPage } from './foundations/MotionPage';
import { ElevationPage } from './foundations/ElevationPage';

function withLayout(page: ReactNode) {
  return <DocsLayout>{page}</DocsLayout>;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={withLayout(<HomePage />)} />
      <Route path="/foundations/colors" element={withLayout(<ColorsPage />)} />
      <Route path="/foundations/sizes" element={withLayout(<SizesPage />)} />
      <Route path="/foundations/typography" element={withLayout(<TypographyPage />)} />
      <Route path="/foundations/motion" element={withLayout(<MotionPage />)} />
      <Route path="/foundations/elevation" element={withLayout(<ElevationPage />)} />
      <Route path="/components" element={withLayout(<ComponentsIndexPage />)} />
      <Route path="/components/:slug" element={withLayout(<ComponentPage />)} />
      <Route path="/elements" element={withLayout(<ElementsIndexPage />)} />
      <Route path="/elements/:slug" element={withLayout(<ElementPage />)} />
      <Route path="/pages" element={withLayout(<PagesIndexPage />)} />
      <Route path="/pages/:slug" element={withLayout(<PageExamplePage />)} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
