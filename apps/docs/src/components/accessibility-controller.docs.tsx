import { useState } from 'react';
import { AccessibilityController, type AccessibilityPreferences } from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

export const accessibilityControllerDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'accessibility-controller',
    name: 'Accessibility Controller',
    category: 'System',
    summary:
      'Controls for contrast, motion, transparency, and link underline accessibility preferences.',
    importPath: '@z-ux/ui/accessibility',
    componentName: 'AccessibilityController',
    controls: {
      contrast: {
        type: 'select',
        label: 'contrast',
        options: ['system', 'standard', 'high'],
        defaultValue: 'system',
      },
      motion: {
        type: 'select',
        label: 'motion',
        options: ['system', 'full', 'reduced'],
        defaultValue: 'system',
      },
      transparency: {
        type: 'select',
        label: 'transparency',
        options: ['system', 'full', 'reduced'],
        defaultValue: 'system',
      },
      linkUnderline: {
        type: 'select',
        label: 'link underline',
        options: ['auto', 'always'],
        defaultValue: 'auto',
      },
    },
    render: (props) => (
      <AccessibilityController
        defaultValue={{
          contrast: props.contrast as AccessibilityPreferences['contrast'],
          motion: props.motion as AccessibilityPreferences['motion'],
          transparency: props.transparency as AccessibilityPreferences['transparency'],
          linkUnderline: props.linkUnderline as AccessibilityPreferences['linkUnderline'],
        }}
      />
    ),
    code: (props) => `<AccessibilityController
  defaultValue={{
    contrast: '${props.contrast}',
    motion: '${props.motion}',
    transparency: '${props.transparency}',
    linkUnderline: '${props.linkUnderline}',
  }}
/>`,
    whenToUsePreviews: {
      use: () => <AccessibilityController />,
      doNotUse: () => (
        <p
          style={{
            margin: 0,
            fontSize: 'var(--z-text-caption-size)',
            color: 'var(--z-color-text-secondary)',
          }}
        >
          High contrast enabled in app config
        </p>
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Settings panel',
      description: 'Uncontrolled panel for contrast, motion, transparency, and link underline preferences.',
      code: '<AccessibilityController />',
      render: () => <AccessibilityController />,
    },
    {
      label: 'High contrast preset',
      description: 'Start with high contrast and reduced motion for accessibility-first defaults.',
      code: `<AccessibilityController
  defaultValue={{ contrast: 'high', motion: 'reduced', transparency: 'system', linkUnderline: 'auto' }}
/>`,
      render: () => (
        <AccessibilityController
          defaultValue={{ contrast: 'high', motion: 'reduced', transparency: 'system', linkUnderline: 'auto' }}
        />
      ),
    },
    {
      label: 'Controlled preferences',
      description: 'Sync accessibility preferences with application state.',
      code: `const [prefs, setPrefs] = useState({
  contrast: 'high',
  motion: 'reduced',
  transparency: 'system',
  linkUnderline: 'always',
});
<AccessibilityController value={prefs} onChange={setPrefs} />`,
      render: () => {
        function ControlledPreferences() {
          const [prefs, setPrefs] = useState<Required<AccessibilityPreferences>>({
            contrast: 'high',
            motion: 'reduced',
            transparency: 'system',
            linkUnderline: 'always',
          });
          return (
            <AccessibilityController
              value={prefs}
              onChange={(next) =>
                setPrefs({
                  contrast: next.contrast ?? 'system',
                  motion: next.motion ?? 'system',
                  transparency: next.transparency ?? 'system',
                  linkUnderline: next.linkUnderline ?? 'auto',
                })
              }
            />
          );
        }
        return <ControlledPreferences />;
      },
    },
  ];
  return doc;
})();
