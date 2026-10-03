import { getChangelogLines } from './changelog';

export function ChangelogPanel({ pageKey }: { pageKey: string }) {
  const lines = getChangelogLines(pageKey);

  if (lines.length === 0) {
    return (
      <div className="docs-surface docs-changelog-empty" role="status">
        <p className="docs-changelog-empty__text">No changelog entries yet.</p>
      </div>
    );
  }

  return (
    <div className="docs-surface">
      <ul className="docs-changelog-list">
        {lines.map((line) => (
          <li key={line} className="docs-changelog-list__item">{line}</li>
        ))}
      </ul>
    </div>
  );
}
