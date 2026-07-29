import { ThemeController } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';

export const themeControllerDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'theme-controller',
  name: 'Theme Controller',
  category: 'System',
  summary: 'Segmented control for switching light, dark, and system theme preferences.',
  importPath: '@z-ui/react/theme-controller',
  componentName: 'ThemeController',
  controls: {},
  render: () => <ThemeController />,
  code: () => '<ThemeController />',
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<theme-controller />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, ...defaults }) : '<theme-controller />',
      render: () => doc.render({ ...defaults,  }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<theme-controller />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
