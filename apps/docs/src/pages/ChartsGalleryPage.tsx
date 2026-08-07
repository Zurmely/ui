import { Card, CardContent, CardHeader, CardTitle, Link, Stack } from '@z-ux/ui';
import { chartDocs, CHARTS_GALLERY_PATH } from '../components/charts-registry';
import { componentBySlug } from '../components/registry';

function ChartPreviewCard({ slug }: { slug: string }) {
  const doc = componentBySlug.get(slug);
  if (!doc) return null;

  return (
    <Card className="docs-charts-gallery__card">
      <CardHeader>
        <CardTitle>
          <Link href={`/components/${slug}`}>{doc.name}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="docs-charts-gallery__summary">{doc.summary}</p>
        <div className="docs-charts-gallery__preview" aria-hidden="true">
          {doc.render({ showLegend: true, showGrid: true, showTooltip: false })}
        </div>
      </CardContent>
    </Card>
  );
}

export function ChartsGalleryPage() {
  return (
    <div className="docs-page docs-charts-gallery">
      <header className="docs-page__header">
        <p className="docs-page__eyebrow">Charts</p>
        <h1 className="docs-page__title">Charts overview</h1>
        <p className="docs-page__summary">
          Token-styled data visualization built on visx. Each chart type has its own page with
          playground, examples, and API reference.
        </p>
      </header>

      <Stack gap="lg">
        {chartDocs.map((doc) => (
          <ChartPreviewCard key={doc.slug} slug={doc.slug} />
        ))}
      </Stack>

      <p className="docs-charts-gallery__footer">
        Browse individual chart docs from the sidebar or jump to{' '}
        <Link href={CHARTS_GALLERY_PATH}>this overview</Link>.
      </p>
    </div>
  );
}
