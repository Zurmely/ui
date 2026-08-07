import {
  Field,
  FieldLabel,
  Stack,
  ThemeController,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

export const themeControllerDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'theme-controller',
    name: 'Theme Controller',
    category: 'System',
    summary: 'Segmented control for switching light, dark, and system theme preferences.',
    importPath: '@z-ux/ui/theme-controller',
    componentName: 'ThemeController',
    controls: {},
    render: () => <ThemeController aria-label="Theme" />,
    code: () => '<ThemeController aria-label="Theme" />',
    whenToUsePreviews: {
      use: () => (
        <Field style={{ width: '100%', maxWidth: '20rem' }}>
          <FieldLabel>Appearance</FieldLabel>
          <ThemeController aria-label="Theme" />
        </Field>
      ),
      doNotUse: () => (
        <p
          style={{
            margin: 0,
            fontSize: 'var(--z-text-caption-size)',
            color: 'var(--z-color-text-secondary)',
          }}
        >
          Dark mode only
        </p>
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Header control',
      description: 'Theme toggle in a site header or toolbar trailing slot.',
      code: '<ThemeController aria-label="Theme" />',
      render: () => <ThemeController aria-label="Theme" />,
    },
    {
      label: 'Settings panel',
      description: 'Theme selector grouped with other appearance settings.',
      code: `<Field>
  <FieldLabel>Appearance</FieldLabel>
  <ThemeController aria-label="Theme" />
</Field>`,
      render: () => (
        <Stack gap="md" style={{ width: '100%', maxWidth: '20rem' }}>
          <Field>
            <FieldLabel>Appearance</FieldLabel>
            <ThemeController aria-label="Theme" />
          </Field>
        </Stack>
      ),
    },
    {
      label: 'Navbar trailing',
      description: 'Theme toggle aligned to the trailing edge of a site header.',
      code: `<Stack direction="horizontal" gap="sm" style={{ alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
  <span>Acme Docs</span>
  <ThemeController aria-label="Theme" />
</Stack>`,
      render: () => (
        <Stack
          direction="horizontal"
          gap="sm"
          style={{ alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '24rem' }}
        >
          <span>Acme Docs</span>
          <ThemeController aria-label="Theme" />
        </Stack>
      ),
      fullWidth: true,
    },
  ];
  return doc;
})();
