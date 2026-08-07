import { Button, FloatingActionButton } from '@z-ux/ui';
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
  importPath: '@z-ux/ui/floating-action-button',
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
  whenToUsePreviews: {
    use: () => <FloatingActionButton aria-label="Create">+</FloatingActionButton>,
    doNotUse: () => <Button variant="primary">Create</Button>,
  },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Create action',
      description: 'Primary floating action for the main page task.',
      code: '<FloatingActionButton aria-label="Create">+</FloatingActionButton>',
      render: () => <FloatingActionButton aria-label="Create">+</FloatingActionButton>,
    },
    {
      label: 'Loading',
      description: 'FAB while an async create operation is in progress.',
      code: '<FloatingActionButton isLoading aria-label="Saving">+</FloatingActionButton>',
      render: () => <FloatingActionButton isLoading aria-label="Saving">+</FloatingActionButton>,
    },
    {
      label: 'Secondary FAB',
      description: 'Lower-emphasis action on content-heavy pages.',
      code: '<FloatingActionButton variant="secondary" aria-label="Compose">✎</FloatingActionButton>',
      render: () => <FloatingActionButton variant="secondary" aria-label="Compose">✎</FloatingActionButton>,
    },
  ];
  return doc;
})();
