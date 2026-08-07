import {
  Button,
  Spinner,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { sizeControl } from './shared-controls';

export const spinnerDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'spinner',
  name: 'Spinner',
  category: 'Display',
  summary: 'Loading spinner indicator.',
  importPath: '@z-ux/ui/spinner',
  componentName: 'Spinner',
  controls: {
    size: sizeControl(),
  },
  render: (props) => <Spinner size={props.size as 'sm' | 'md' | 'lg'} />,
  whenToUsePreviews: {
    use: () => <Spinner aria-label="Loading content" />,
    doNotUse: () => <Button variant="primary" isLoading>Saving</Button>,
  },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Inline loading',
      description: 'Small spinner beside button text.',
      code: '<Spinner size="sm" aria-label="Loading" />',
      render: () => <Spinner size="sm" aria-label="Loading" />,
    },
    {
      label: 'Page loading',
      description: 'Medium spinner centered in a content area.',
      code: '<Spinner aria-label="Loading page" />',
      render: () => <Spinner aria-label="Loading page" />,
    },
    {
      label: 'Button loading',
      description: 'Use Button isLoading for action feedback; reserve Spinner for standalone loading regions.',
      code: '<Button variant="primary" isLoading>Saving</Button>',
      render: () => (
        <Button variant="primary" isLoading>
          Saving
        </Button>
      ),
    },
  ];
  return doc;
})();
