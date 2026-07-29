import { FloatingActionButton } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import {
  actionVariantControl,
  booleanControl,
  disabledControl,
  plusIcon,
  sizeControl,
} from './shared-controls';

export const floatingActionButtonDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'floating-action-button',
  name: 'FloatingActionButton',
  category: 'Actions',
  summary: 'Prominent circular action button.',
  importPath: '@z-ui/react/floating-action-button',
  componentName: 'FloatingActionButton',
  controls: {
    variant: actionVariantControl(),
    size: sizeControl(),
    isLoading: booleanControl('isLoading', false),
    disabled: disabledControl,
  },
  render: (props) => (
    <FloatingActionButton
      aria-label="Add"
      variant={props.variant as 'primary' | 'secondary' | 'ghost' | 'danger'}
      size={props.size as 'sm' | 'md' | 'lg'}
      isLoading={props.isLoading as boolean}
      disabled={props.disabled as boolean}
      icon={plusIcon}
    />
  ),
  code: (props) => {
    const parts = [
      'aria-label="Add"',
      props.variant !== 'primary' ? `variant="${props.variant}"` : null,
      props.size !== 'md' ? `size="${props.size}"` : null,
      props.isLoading ? 'isLoading' : null,
      props.disabled ? 'disabled' : null,
      'icon={<PlusIcon />}',
    ].filter(Boolean);
    return `<FloatingActionButton ${parts.join(' ')} />`;
  },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<floating-action-button />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, ...defaults }) : '<floating-action-button />',
      render: () => doc.render({ ...defaults,  }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<floating-action-button />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
