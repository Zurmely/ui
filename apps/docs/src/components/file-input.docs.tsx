import { FileInput } from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { booleanControl } from './shared-controls';

export const fileInputDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'file-input',
  name: 'FileInput',
  category: 'Forms',
  summary: 'Styled file upload control.',
  importPath: '@z-ui/react/file-input',
  componentName: 'FileInput',
  controls: {
    disabled: booleanControl('disabled', false),
    multiple: booleanControl('multiple', false),
  },
  render: (props) => (
    <FileInput
      disabled={props.disabled as boolean}
      multiple={props.multiple as boolean}
      aria-label="Upload file"
    />
  ),
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<file-input />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, ...defaults }) : '<file-input />',
      render: () => doc.render({ ...defaults,  }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<file-input />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
