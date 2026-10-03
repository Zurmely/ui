import {
  buildFoundationToc,
  foundationTocItem,
  FoundationTabbedPage,
} from '../docs-tabs/FoundationTabbedPage';
import { TokenTable } from '../components/TokenTable';
import { buildTokenManifest, getTokensByTier } from '../tokens/parse';
import {
  MotionContinuousSample,
  MotionDurationSample,
  MotionEasingSample,
  MotionEnterExitSample,
  MotionInteractionSample,
  MotionLayoutSample,
  RecipePanel,
} from '../tokens/TokenSwatches';
import { Section, TokenGroup, TokenSubGroup } from './FoundationSection';

const DURATION_TOKENS = [
  {
    purpose: 'interaction',
    label: 'Interaction',
    useWhen: 'Hover, pressed, checked, and border or color feedback',
  },
  {
    purpose: 'layout',
    label: 'Layout',
    useWhen: 'Layout rearrange, expand, and resize of a surface',
  },
  {
    purpose: 'enter',
    label: 'Enter',
    useWhen: 'Overlay and floating content open',
  },
  {
    purpose: 'exit',
    label: 'Exit',
    useWhen: 'Overlay and floating content close',
  },
  {
    purpose: 'continuous',
    label: 'Continuous',
    useWhen: 'Spinner and other looping indicators',
  },
] as const;

const EASING_TOKENS = [
  {
    purpose: 'interaction',
    label: 'Interaction',
    useWhen: 'Hover, pressed, checked, and border or color feedback',
  },
  {
    purpose: 'enter',
    label: 'Enter',
    useWhen: 'Overlay and floating content open',
  },
  {
    purpose: 'exit',
    label: 'Exit',
    useWhen: 'Overlay and floating content close',
  },
  {
    purpose: 'continuous',
    label: 'Continuous',
    useWhen: 'Spinner and other looping indicators',
  },
] as const;

export function MotionPage() {
  const manifest = buildTokenManifest();
  const primitives = getTokensByTier(manifest, 'motion', 'primitive');
  const semantics = getTokensByTier(manifest, 'motion', 'semantic');

  const summary = (
    <>
      Duration and easing tokens for interaction, layout, enter/exit, and continuous motion.{' '}
      {primitives.length} primitives, {semantics.length} semantics parsed from{' '}
      <code>motion.css</code>. Pair <code>motion.duration.*</code> with the matching{' '}
      <code>motion.easing.*</code>. Layout duration uses interaction easing — there is no separate
      layout easing token.
    </>
  );

  const designUsage = (
    <>
      <Section title="Recipes">
        <p className="docs-page__intro">
          Interactive demos for each semantic motion purpose. Hover a card to preview timing.
        </p>
        <TokenSubGroup title="Demos">
          <div className="docs-demo-token-grid">
            <MotionInteractionSample />
            <MotionLayoutSample />
            <MotionEnterExitSample />
            <MotionContinuousSample />
          </div>
        </TokenSubGroup>
        <div className="docs-recipes-grid">
          <RecipePanel
            title="When to use which"
            note="Pair motion.duration.* with motion.easing.* for the same purpose"
          >
            <ul className="docs-recipe-motion-guide">
              <li>
                <strong>Interaction</strong> — color, border, and control feedback
                <code className="docs-recipe-motion-guide__code">
                  transition: background-color var(--z-motion-duration-interaction)
                  var(--z-motion-easing-interaction);
                </code>
              </li>
              <li>
                <strong>Layout</strong> — expand, rearrange, and resize of a surface
                <code className="docs-recipe-motion-guide__code">
                  transition: width var(--z-motion-duration-layout)
                  var(--z-motion-easing-interaction);
                </code>
              </li>
              <li>
                <strong>Enter / exit</strong> — overlays and floating content
                <code className="docs-recipe-motion-guide__code">
                  transition: opacity var(--z-motion-duration-enter)
                  var(--z-motion-easing-enter);
                </code>
              </li>
              <li>
                <strong>Continuous</strong> — spinners and looping indicators
                <code className="docs-recipe-motion-guide__code">
                  animation: spin var(--z-motion-duration-continuous)
                  var(--z-motion-easing-continuous) infinite;
                </code>
              </li>
            </ul>
          </RecipePanel>
        </div>
      </Section>
    </>
  );

  const codeReference = (
    <>
      <Section title="Primitives">
        <TokenTable rows={primitives.map((t) => ({ name: t.name, value: t.value }))} />
      </Section>

      <Section title="Semantic motion">
        <p className="docs-page__intro">
          Purpose-based duration and easing aliases. Components consume these; theme authors bind
          the primitive scale.
        </p>

        <TokenGroup title="Duration">
          <TokenSubGroup title="Purposes">
            <div className="docs-demo-token-grid">
              {DURATION_TOKENS.map((item) => (
                <MotionDurationSample
                  key={item.purpose}
                  purpose={item.purpose}
                  label={item.label}
                  useWhen={item.useWhen}
                />
              ))}
            </div>
          </TokenSubGroup>
        </TokenGroup>

        <TokenGroup title="Easing">
          <TokenSubGroup title="Purposes">
            <div className="docs-demo-token-grid">
              {EASING_TOKENS.map((item) => (
                <MotionEasingSample
                  key={item.purpose}
                  purpose={item.purpose}
                  label={item.label}
                  useWhen={item.useWhen}
                />
              ))}
            </div>
          </TokenSubGroup>
        </TokenGroup>

        <TokenTable rows={semantics.map((t) => ({ name: t.name, value: t.value }))} />
      </Section>
    </>
  );

  const tocByTab = buildFoundationToc(
    [foundationTocItem('recipes', 'Recipes')],
    [
      foundationTocItem('primitives', 'Primitives'),
      foundationTocItem('semantic-motion', 'Semantic motion'),
    ],
  );

  return (
    <FoundationTabbedPage
      title="Motion"
      path="/foundations/motion"
      summary={summary}
      changelogKey="motion"
      designUsage={designUsage}
      codeReference={codeReference}
      tocByTab={tocByTab}
    />
  );
}
