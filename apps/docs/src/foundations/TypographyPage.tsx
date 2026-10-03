import { FoundationPageHeader } from '../components/FoundationPageHeader';
import { buildTokenManifest, getTokensByTier } from '../tokens/parse';
import {
  FontFamilySample,
  FontLineHeightSample,
  FontSizeSample,
  FontWeightSample,
  RecipePanel,
  TextRoleSample,
} from '../tokens/TokenSwatches';
import { Section, TokenGroup, TokenSubGroup } from './FoundationSection';

const FONT_SIZE_STEPS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const FONT_WEIGHTS = ['regular', 'medium', 'semibold', 'bold'] as const;
const FONT_LINE_HEIGHTS = ['tight', 'snug', 'normal', 'relaxed'] as const;

const HEADING_ROLES = [
  { role: 'display', useWhen: 'Hero marketing headlines' },
  { role: 'h1', useWhen: 'Page title' },
  { role: 'h2', useWhen: 'Section title' },
  { role: 'h3', useWhen: 'Subsection title' },
  { role: 'h4', useWhen: 'Card or panel title' },
  { role: 'h5', useWhen: 'Minor heading' },
  { role: 'h6', useWhen: 'Smallest heading' },
] as const;

const UI_ROLES = [
  { role: 'body', useWhen: 'Paragraph copy, dialog descriptions' },
  { role: 'control', useWhen: 'Buttons, inputs, menu items, tabs, links' },
  { role: 'label', useWhen: 'Form field labels' },
  { role: 'caption', useWhen: 'Tooltips, helper text, error messages' },
  { role: 'badge', useWhen: 'Compact status labels — smallest UI text role' },
  { role: 'title', useWhen: 'Dialog titles, alert titles' },
] as const;

export function TypographyPage() {
  const manifest = buildTokenManifest();
  const primitives = getTokensByTier(manifest, 'text', 'primitive');
  const semantics = getTokensByTier(manifest, 'text', 'semantic');

  return (
    <div className="docs-page">
      <FoundationPageHeader
        title="Typography"
        path="/foundations/typography"
        summary={
          <>
            Font primitives and semantic text roles. {primitives.length} primitives,{' '}
            {semantics.length} semantics parsed from <code>text.css</code>. Use{' '}
            <code>--z-text-*</code> for type and <code>--z-color-text-*</code> for foreground
            color. 12px (<code>font.size.1</code> / <code>text.badge</code>) is the minimum.
          </>
        }
      />

      <Section title="Font primitives">
        <p className="docs-page__intro">
          Raw font scales. Theme authors bind these; components consume semantic{' '}
          <code>--z-text-*</code> roles. Use <code>--z-color-text-*</code> for foreground color
          only.
        </p>

        <TokenGroup title="Size">
          <TokenSubGroup title="Scale">
            <div className="docs-demo-token-grid">
              {FONT_SIZE_STEPS.map((step) => (
                <FontSizeSample key={step} step={step} />
              ))}
            </div>
          </TokenSubGroup>
        </TokenGroup>

        <TokenGroup title="Weight">
          <TokenSubGroup title="Scale">
            <div className="docs-demo-token-grid">
              {FONT_WEIGHTS.map((weight) => (
                <FontWeightSample key={weight} weight={weight} />
              ))}
            </div>
          </TokenSubGroup>
        </TokenGroup>

        <TokenGroup title="Line height">
          <TokenSubGroup title="Scale">
            <div className="docs-demo-token-grid">
              {FONT_LINE_HEIGHTS.map((lineHeight) => (
                <FontLineHeightSample key={lineHeight} lineHeight={lineHeight} />
              ))}
            </div>
          </TokenSubGroup>
        </TokenGroup>

        <TokenGroup title="Family">
          <TokenSubGroup title="Faces">
            <div className="docs-demo-token-grid">
              <FontFamilySample family="sans" />
              <FontFamilySample family="mono" />
            </div>
          </TokenSubGroup>
        </TokenGroup>
      </Section>

      <Section title="Text roles">
        <p className="docs-page__intro">
          Purpose-based typography tokens. 12px (<code>font.size.1</code>) is the minimum font size in
          the design system.
        </p>

        <TokenGroup title="Display & headings">
          <TokenSubGroup title="Hierarchy">
            <div className="docs-demo-token-grid">
              {HEADING_ROLES.map((item) => (
                <TextRoleSample key={item.role} role={item.role} useWhen={item.useWhen} />
              ))}
            </div>
          </TokenSubGroup>
        </TokenGroup>

        <TokenGroup title="UI roles">
          <TokenSubGroup title="Chrome">
            <div className="docs-demo-token-grid">
              {UI_ROLES.map((item) => (
                <TextRoleSample key={item.role} role={item.role} useWhen={item.useWhen} />
              ))}
            </div>
          </TokenSubGroup>
        </TokenGroup>
      </Section>

      <Section title="Recipes">
        <p className="docs-page__intro">
          Composed examples showing how semantic text roles work together in real UI patterns.
        </p>
        <div className="docs-recipes-grid">
          <RecipePanel
            title="Type hierarchy"
            note="text.display, text.body, and text.caption for marketing hero stacks"
          >
            <div className="docs-recipe-type-stack">
              <p className="docs-recipe-type-stack__display">Marketing headline</p>
              <p className="docs-recipe-type-stack__body">
                Supporting body copy explains the product value in a short paragraph.
              </p>
              <p className="docs-recipe-type-stack__caption">Caption or metadata line</p>
            </div>
          </RecipePanel>

          <RecipePanel
            title="Field stack"
            note="text.label, text.control, and text.caption with spacing.stack.form"
          >
            <div className="docs-recipe-field-stack">
              <span className="docs-recipe-field-stack__label">Email address</span>
              <span className="docs-recipe-field-stack__control">name@example.com</span>
              <span className="docs-recipe-field-stack__caption">
                We never share your email with third parties.
              </span>
            </div>
          </RecipePanel>

          <RecipePanel
            title="Dialog chrome"
            note="text.title for the heading; text.body for the description"
          >
            <div className="docs-recipe-dialog">
              <p className="docs-recipe-dialog__title">Confirm changes</p>
              <p className="docs-recipe-dialog__body">
                Your updates will apply immediately. You can undo this action from settings.
              </p>
            </div>
          </RecipePanel>

          <RecipePanel
            title="Monospace"
            note="font.family.mono via --z-font-family-mono for code and technical strings"
          >
            <code className="docs-recipe-mono">pnpm add @z-ux/tokens</code>
          </RecipePanel>
        </div>
      </Section>
    </div>
  );
}
