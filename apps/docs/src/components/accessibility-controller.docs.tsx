import { AccessibilityController } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

export const accessibilityControllerDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'accessibility-controller',
    name: 'Accessibility Controller',
    category: 'System',
    summary:
      'Controls for contrast, motion, transparency, and link underline accessibility preferences.',
    importPath: '@z-ui/react/accessibility',
    componentName: 'AccessibilityController',
    controls: {},
    render: () => <AccessibilityController />,
    code: () => '<AccessibilityController />',
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<AccessibilityController />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<AccessibilityController />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
