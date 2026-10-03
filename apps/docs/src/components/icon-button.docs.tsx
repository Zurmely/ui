import { Button, IconButton, Toolbar } from '@z-ux/ui';
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
  importPath: '@z-ux/ui/icon-button',
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
  whenToUsePreviews: {
    use: () => (
      <IconButton aria-label="Add item" variant="primary">
        {plusIcon}
      </IconButton>
    ),
    doNotUse: () => <Button variant="ghost">Add item</Button>,
  },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Add item',
      description: 'Primary icon button with an accessible name.',
      code: '<IconButton aria-label="Add">{/* plus icon */}</IconButton>',
      render: () => (
        <IconButton aria-label="Add" variant="primary">
          {plusIcon}
        </IconButton>
      ),
    },
    {
      label: 'Search',
      description: 'Ghost icon button for toolbar search.',
      code: '<IconButton aria-label="Search" variant="ghost">{/* search icon */}</IconButton>',
      render: () => (
        <IconButton aria-label="Search" variant="ghost">
          {searchIcon}
        </IconButton>
      ),
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
