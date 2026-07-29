import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@z-ui/react';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { textControl } from './shared-controls';

export const toastDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
  slug: 'toast',
  name: 'Toast',
  category: 'Feedback',
  summary: 'Brief notification message.',
  importPath: '@z-ui/react/toast',
  componentName: 'Toast',
  controls: {
    title: textControl('title', 'Scheduled'),
    description: textControl('description', 'Your meeting starts in 10 minutes.'),
  },
  render: (props) => (
    <ToastProvider>
      <Toast open>
        <ToastTitle>{props.title as string}</ToastTitle>
        <ToastDescription>{props.description as string}</ToastDescription>
        <ToastAction altText="Undo">Undo</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
  code: (props) => `<ToastProvider>
  <Toast open>
    <ToastTitle>${props.title}</ToastTitle>
    <ToastDescription>${props.description}</ToastDescription>
    <ToastAction altText="Undo">Undo</ToastAction>
    <ToastClose />
  </Toast>
  <ToastViewport />
</ToastProvider>`,
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Default',
      description: 'Default playground configuration.',
      code: doc.code ? doc.code(defaults) : '<toast />',
      render: () => doc.render(defaults),
    },
    {
      label: 'Alternate state',
      description: 'Another common configuration from the playground controls.',
      code: doc.code ? doc.code({ ...defaults, ...defaults }) : '<toast />',
      render: () => doc.render({ ...defaults,  }),
    },
    {
      label: 'Interactive preview',
      description: 'Live render of the component with default props.',
      code: doc.code ? doc.code(defaults) : '<toast />',
      render: () => doc.render(defaults),
    },
  ];
  return doc;
})();
