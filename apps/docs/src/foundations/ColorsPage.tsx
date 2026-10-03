import { Button } from '@z-ux/ui';
import {
  buildFoundationToc,
  foundationTocItem,
  FoundationTabbedPage,
} from '../docs-tabs/FoundationTabbedPage';
import { Section, TokenGroup, TokenSubGroup } from './FoundationSection';
import {
  COLOR_FAMILIES,
  COLOR_STEPS,
  MEANING_PALETTES,
  buildTokenManifest,
} from '../tokens/parse';
import { ColorSwatch, PrimitiveColorSwatch, RecipePanel } from '../tokens/TokenSwatches';

type ColorTokenItem = { token: string; label: string; useWhen: string };
type ColorTokenSubgroup = { title: string; tokens: readonly ColorTokenItem[] };

const BACKGROUND_SUBGROUPS: readonly ColorTokenSubgroup[] = [
  {
    title: 'Surfaces',
    tokens: [
      { token: 'background-canvas', label: 'Canvas', useWhen: 'App or page base behind content' },
      { token: 'background-surface', label: 'Surface', useWhen: 'Cards, panels, elevated sections on canvas' },
      { token: 'background-subtle', label: 'Subtle', useWhen: 'Quiet secondary regions, table headers, sidebars' },
      { token: 'background-muted', label: 'Muted', useWhen: 'Disabled-looking fills, skeleton placeholders' },
      { token: 'background-inverse', label: 'Inverse', useWhen: 'High-contrast inverted blocks' },
      { token: 'background-selected', label: 'Selected', useWhen: 'Chosen item in tabs, menus, or list rows' },
    ],
  },
  {
    title: 'Interactive primary',
    tokens: [
      { token: 'background-primary', label: 'Primary', useWhen: 'Primary actions and neutral emphasis fills' },
      { token: 'background-primary-hover', label: 'Hover', useWhen: 'Pointer over an enabled primary control' },
      { token: 'background-primary-active', label: 'Active', useWhen: 'Pressed or activated primary control' },
      { token: 'background-primary-disabled', label: 'Disabled', useWhen: 'Primary control that cannot be activated' },
    ],
  },
  {
    title: 'Feedback subtle',
    tokens: [
      { token: 'background-primary-subtle', label: 'Primary', useWhen: 'Quiet primary emphasis without a solid fill' },
      { token: 'background-danger-subtle', label: 'Danger', useWhen: 'Error or destructive context without a solid fill' },
      { token: 'background-success-subtle', label: 'Success', useWhen: 'Positive feedback without a solid fill' },
      { token: 'background-warning-subtle', label: 'Warning', useWhen: 'Caution feedback without a solid fill' },
      { token: 'background-info-subtle', label: 'Info', useWhen: 'Informational feedback without a solid fill' },
    ],
  },
  {
    title: 'Feedback solid',
    tokens: [
      { token: 'background-danger', label: 'Danger', useWhen: 'Destructive filled controls or error emphasis' },
      { token: 'background-success', label: 'Success', useWhen: 'Positive filled feedback' },
      { token: 'background-warning', label: 'Warning', useWhen: 'Caution filled feedback' },
      { token: 'background-info', label: 'Info', useWhen: 'Informational filled feedback' },
    ],
  },
];

const TEXT_SUBGROUPS: readonly ColorTokenSubgroup[] = [
  {
    title: 'Neutral',
    tokens: [
      { token: 'text-primary', label: 'Primary', useWhen: 'Default body copy and titles' },
      { token: 'text-secondary', label: 'Secondary', useWhen: 'Supporting copy and metadata' },
      { token: 'text-tertiary', label: 'Tertiary', useWhen: 'Hints and placeholders' },
      { token: 'text-disabled', label: 'Disabled', useWhen: 'Disabled control labels' },
    ],
  },
  {
    title: 'On color',
    tokens: [
      { token: 'text-inverse', label: 'Inverse', useWhen: 'Text on background.inverse only' },
      { token: 'text-on-solid', label: 'On solid', useWhen: 'Text on solid status fills' },
      { token: 'text-on-primary', label: 'On primary', useWhen: 'Text on background.primary fills' },
    ],
  },
  {
    title: 'Feedback',
    tokens: [
      { token: 'text-danger', label: 'Danger', useWhen: 'Errors and destructive labels' },
      { token: 'text-success', label: 'Success', useWhen: 'Success messages' },
      { token: 'text-warning', label: 'Warning', useWhen: 'Warning messages' },
      { token: 'text-info', label: 'Info', useWhen: 'Informational messages' },
    ],
  },
  {
    title: 'Link',
    tokens: [
      { token: 'text-link', label: 'Link', useWhen: 'Default link color' },
      { token: 'text-link-hover', label: 'Hover', useWhen: 'Link hover state' },
    ],
  },
];

const ICON_SUBGROUPS: readonly ColorTokenSubgroup[] = [
  {
    title: 'Neutral',
    tokens: [
      { token: 'icon-primary', label: 'Primary', useWhen: 'Pairs with text.primary' },
      { token: 'icon-secondary', label: 'Secondary', useWhen: 'Pairs with text.secondary' },
      { token: 'icon-disabled', label: 'Disabled', useWhen: 'Pairs with text.disabled' },
    ],
  },
  {
    title: 'On color',
    tokens: [
      { token: 'icon-inverse', label: 'Inverse', useWhen: 'Pairs with text.inverse' },
      { token: 'icon-on-solid', label: 'On solid', useWhen: 'Pairs with text.on-solid' },
      { token: 'icon-on-primary', label: 'On primary', useWhen: 'Pairs with text.on-primary' },
    ],
  },
  {
    title: 'Feedback',
    tokens: [
      { token: 'icon-danger', label: 'Danger', useWhen: 'Pairs with text.danger' },
      { token: 'icon-success', label: 'Success', useWhen: 'Pairs with text.success' },
      { token: 'icon-warning', label: 'Warning', useWhen: 'Pairs with text.warning' },
      { token: 'icon-info', label: 'Info', useWhen: 'Pairs with text.info' },
    ],
  },
];

const BORDER_SUBGROUPS: readonly ColorTokenSubgroup[] = [
  {
    title: 'Structural',
    tokens: [
      { token: 'border-subtle', label: 'Subtle', useWhen: 'Low-emphasis separators' },
      { token: 'border-default', label: 'Default', useWhen: 'Standard control and card borders' },
      { token: 'border-strong', label: 'Strong', useWhen: 'High-emphasis outlines' },
      { token: 'border-disabled', label: 'Disabled', useWhen: 'Disabled control borders' },
    ],
  },
  {
    title: 'Meaning',
    tokens: [
      { token: 'border-primary', label: 'Primary', useWhen: 'Primary emphasis borders on solid fills' },
      { token: 'border-danger', label: 'Danger', useWhen: 'Invalid fields and destructive emphasis' },
      { token: 'border-success', label: 'Success', useWhen: 'Success emphasis borders' },
      { token: 'border-warning', label: 'Warning', useWhen: 'Warning emphasis borders' },
      { token: 'border-info', label: 'Info', useWhen: 'Informational emphasis borders' },
      { token: 'border-focus', label: 'Focus', useWhen: 'Focus border when the pattern uses border rather than ring' },
    ],
  },
];

const CHART_SUBGROUPS: readonly ColorTokenSubgroup[] = [
  {
    title: 'Series',
    tokens: [
      { token: 'chart-series-1', label: 'Series 1', useWhen: 'First categorical data series' },
      { token: 'chart-series-2', label: 'Series 2', useWhen: 'Second categorical data series' },
      { token: 'chart-series-3', label: 'Series 3', useWhen: 'Third categorical data series' },
      { token: 'chart-series-4', label: 'Series 4', useWhen: 'Fourth categorical data series' },
      { token: 'chart-series-5', label: 'Series 5', useWhen: 'Fifth categorical data series' },
      { token: 'chart-series-6', label: 'Series 6', useWhen: 'Sixth categorical data series' },
      { token: 'chart-series-7', label: 'Series 7', useWhen: 'Seventh categorical data series' },
      { token: 'chart-series-8', label: 'Series 8', useWhen: 'Eighth categorical data series' },
    ],
  },
  {
    title: 'Structure',
    tokens: [
      { token: 'chart-grid', label: 'Grid', useWhen: 'Chart grid line strokes' },
      { token: 'chart-axis', label: 'Axis', useWhen: 'Axis line strokes' },
      { token: 'chart-axis-label', label: 'Axis label', useWhen: 'Tick and axis label color' },
      { token: 'chart-reference', label: 'Reference', useWhen: 'Threshold and reference lines' },
      { token: 'chart-muted', label: 'Muted', useWhen: 'De-emphasized chart chrome' },
    ],
  },
  {
    title: 'Direction',
    tokens: [
      { token: 'chart-positive', label: 'Positive', useWhen: 'Upward or favorable change' },
      { token: 'chart-negative', label: 'Negative', useWhen: 'Downward or unfavorable change' },
    ],
  },
];

function PrimitiveScale({ family }: { family: string }) {
  return (
    <div className="docs-primitive-scale">
      <h4 className="docs-primitive-scale__family">{family}</h4>
      <div className="docs-primitive-scale__steps">
        {COLOR_STEPS.map((step) => (
          <PrimitiveColorSwatch
            key={step}
            varName={`--${family}-${step}`}
          />
        ))}
      </div>
    </div>
  );
}

function MeaningPalette({ meaning }: { meaning: string }) {
  return (
    <div className="docs-primitive-scale">
      <h4 className="docs-primitive-scale__family">{meaning}</h4>
      <div className="docs-primitive-scale__steps">
        {COLOR_STEPS.map((step) => (
          <PrimitiveColorSwatch
            key={step}
            varName={`--z-color-${meaning}-${step}`}
          />
        ))}
      </div>
    </div>
  );
}

function ColorTokenSubgroupStrip({
  subgroup,
  kind,
}: {
  subgroup: ColorTokenSubgroup;
  kind: 'fill' | 'text' | 'border' | 'icon';
}) {
  return (
    <TokenSubGroup title={subgroup.title}>
      <div className="docs-color-token-grid">
        {subgroup.tokens.map((item) => (
          <ColorSwatch key={item.token} {...item} kind={kind} />
        ))}
      </div>
    </TokenSubGroup>
  );
}

export function ColorsPage() {
  const manifest = buildTokenManifest();
  const primitiveCount = manifest.colors.filter((t) => t.tier === 'primitive').length;
  const semanticCount = manifest.colors.filter((t) => t.tier === 'semantic').length;

  const summary = (
    <>
      Primitive OKLCH scales and semantic color tokens for light and dark themes.{' '}
      {primitiveCount} primitives, {semanticCount} semantics parsed from <code>colors.css</code>.
      Pick a token by role (background, text, icon, border), then meaning, then state. Components
      must use <code>--z-color-*</code> semantics, not raw family scales.
    </>
  );

  const designUsage = (
    <>
      <Section title="How to choose">
        <p className="docs-page__intro">
          Start with the job, not the hue. Body copy is <code>--z-color-text-primary</code>. A
          primary button fill is <code>--z-color-background-primary</code> with{' '}
          <code>--z-color-text-on-primary</code>. Danger and success use the matching meaning
          pair. Do not pick a primitive because the swatch looks close — retheme the semantic
          role instead.
        </p>
      </Section>

      <Section title="Recipes">
        <p className="docs-page__intro">
          Interactive patterns composed from semantic color tokens. Pair foreground and background
          tokens as documented in each card.
        </p>
        <div className="docs-recipes-grid">
          <RecipePanel
            title="Solid primary button"
            note="background.primary + text.on-primary; hover, active, disabled, and focus.ring states"
          >
            <Button variant="primary">Save changes</Button>
          </RecipePanel>

          <RecipePanel
            title="Subtle status"
            note="background.{meaning}-subtle + text.{meaning} for quiet feedback"
          >
            <div className="docs-recipe-color-subtle">
              <span className="docs-recipe-color-subtle__item docs-recipe-color-subtle__item--danger">
                Connection failed
              </span>
              <span className="docs-recipe-color-subtle__item docs-recipe-color-subtle__item--success">
                Changes saved
              </span>
            </div>
          </RecipePanel>

          <RecipePanel
            title="Text field"
            note="background.surface, border.default → border.focus, text.primary, text.tertiary placeholder"
          >
            <div className="docs-recipe-color-field">
              <span className="docs-recipe-color-field__input">name@example.com</span>
              <span className="docs-recipe-color-field__input docs-recipe-color-field__input--invalid">
                Invalid value
              </span>
              <span className="docs-recipe-color-field__error">Enter a valid email address.</span>
            </div>
          </RecipePanel>

          <RecipePanel
            title="Selected row"
            note="background.selected + text.primary; add a non-color indicator (bar or check)"
          >
            <div className="docs-recipe-color-row">
              <span className="docs-recipe-color-row__item">Inbox</span>
              <span className="docs-recipe-color-row__item docs-recipe-color-row__item--selected">
                <span className="docs-recipe-color-row__indicator" aria-hidden="true" />
                Drafts
              </span>
            </div>
          </RecipePanel>

          <RecipePanel
            title="Link"
            note="text.link → text.link-hover; focus.ring on :focus-visible"
          >
            <a className="docs-recipe-color-link" href="#colors-recipes">
              View color semantics contract
            </a>
          </RecipePanel>
        </div>
      </Section>
    </>
  );

  const codeReference = (
    <>
      <Section title="Primitives">
        <p className="docs-page__intro">
          Raw OKLCH family scales (50–950). Theme authors bind these; components consume semantic
          tokens. Color must not be the only cue for state — pair fills with labels, icons, or
          attributes.
        </p>
        <div className="docs-primitive-scales">
          {COLOR_FAMILIES.map((family) => (
            <PrimitiveScale key={family} family={family} />
          ))}
        </div>
      </Section>

      <Section title="Meaning palettes">
        <p className="docs-page__intro">
          Semantic aliases for danger, success, warning, and info. Primary emphasis uses the
          neutral scale via semantic tokens below.
        </p>
        <div className="docs-primitive-scales">
          {MEANING_PALETTES.map((meaning) => (
            <MeaningPalette key={meaning} meaning={meaning} />
          ))}
        </div>
      </Section>

      <Section title="Semantic tokens">
        <TokenGroup title="Background">
          {BACKGROUND_SUBGROUPS.map((subgroup) => (
            <ColorTokenSubgroupStrip key={subgroup.title} subgroup={subgroup} kind="fill" />
          ))}
        </TokenGroup>

        <TokenGroup title="Text">
          {TEXT_SUBGROUPS.map((subgroup) => (
            <ColorTokenSubgroupStrip key={subgroup.title} subgroup={subgroup} kind="text" />
          ))}
        </TokenGroup>

        <TokenGroup title="Icon">
          {ICON_SUBGROUPS.map((subgroup) => (
            <ColorTokenSubgroupStrip key={subgroup.title} subgroup={subgroup} kind="icon" />
          ))}
        </TokenGroup>

        <TokenGroup title="Border">
          {BORDER_SUBGROUPS.map((subgroup) => (
            <ColorTokenSubgroupStrip key={subgroup.title} subgroup={subgroup} kind="border" />
          ))}
        </TokenGroup>

        <TokenGroup title="Charts">
          {CHART_SUBGROUPS.map((subgroup) => (
            <ColorTokenSubgroupStrip key={subgroup.title} subgroup={subgroup} kind="fill" />
          ))}
        </TokenGroup>

        <TokenGroup title="Focus & overlay">
          <div className="docs-color-token-grid">
            <ColorSwatch
              token="focus-ring"
              label="Focus ring"
              kind="border"
              useWhen="Outer focus ring on :focus-visible"
            />
            <ColorSwatch
              token="overlay-scrim"
              label="Overlay scrim"
              kind="fill"
              useWhen="Dialog or modal backdrop"
            />
            <ColorSwatch
              token="overlay-tooltip"
              label="Overlay tooltip"
              kind="fill"
              useWhen="Optional solid tooltip fill"
            />
          </div>
        </TokenGroup>
      </Section>
    </>
  );

  const tocByTab = buildFoundationToc(
    [
      foundationTocItem('how-to-choose', 'How to choose'),
      foundationTocItem('recipes', 'Recipes'),
    ],
    [
      foundationTocItem('primitives', 'Primitives'),
      foundationTocItem('meaning-palettes', 'Meaning palettes'),
      foundationTocItem('semantic-tokens', 'Semantic tokens'),
    ],
  );

  return (
    <FoundationTabbedPage
      title="Colors"
      path="/foundations/colors"
      summary={summary}
      changelogKey="colors"
      designUsage={designUsage}
      codeReference={codeReference}
      tocByTab={tocByTab}
    />
  );
}
