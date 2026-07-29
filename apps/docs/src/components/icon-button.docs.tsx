import { IconButton, Toolbar } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import {
  actionVariantControl,
  booleanControl,
  disabledControl,
  plusIcon,
  searchIcon,
  sizeControl,
} from './shared-controls';

interface IconButtonPlaygroundProps {
  variant: string;
  size: string;
  isLoading: boolean;
  disabled: boolean;
  iconChoice: string;
}

export const iconButtonDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'icon-button',
  name: 'IconButton',
  category: 'Actions',
  summary: 'Icon-only button with required accessible name.',
  importPath: '@z-ui/react/icon-button',
  componentName: 'IconButton',
  controls: {
    variant: actionVariantControl(),
    size: sizeControl(),
    isLoading: booleanControl('isLoading', false),
    disabled: disabledControl,
    iconChoice: {
      type: 'select',
      label: 'icon',
      options: ['plus', 'search'],
      defaultValue: 'plus',
    },
  },
  render: (props) => (
    <IconButton
      aria-label={props.iconChoice === 'search' ? 'Search' : 'Add'}
      variant={props.variant as 'primary' | 'secondary' | 'ghost' | 'danger'}
      size={props.size as 'sm' | 'md' | 'lg'}
      isLoading={props.isLoading as boolean}
      disabled={props.disabled as boolean}
    >
      {props.iconChoice === 'search' ? searchIcon : plusIcon}
    </IconButton>
  ),
  code: (props) => {
    const label = props.iconChoice === 'search' ? 'Search' : 'Add';
    const parts = [
      `aria-label="${label}"`,
      props.variant !== 'primary' ? `variant="${props.variant}"` : null,
      props.size !== 'md' ? `size="${props.size}"` : null,
      props.isLoading ? 'isLoading' : null,
      props.disabled ? 'disabled' : null,
    ].filter(Boolean);
    return `<IconButton ${parts.join(' ')}>\n  {/* icon */}\n</IconButton>`;
  },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<icon-button />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, iconChoice: 'search' }) : '<icon-button />',
      render: () => doc.render({ ...defaults, iconChoice: 'search' }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<icon-button />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Toolbar icons',
      description: 'Icon buttons in a document toolbar.',
      code: '<Toolbar label="Editor">...</Toolbar>',
      render: () => (
        <Toolbar label="Editor actions" style={{ width: '100%' }}>
          <IconButton aria-label="Bold" variant="ghost" size="sm">B</IconButton>
          <IconButton aria-label="Italic" variant="ghost" size="sm">I</IconButton>
        </Toolbar>
      ),
      fullWidth: true,
    },
  ];
  return doc;
})();
