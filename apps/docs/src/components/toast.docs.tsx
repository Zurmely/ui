import {
  Alert,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { textControl } from './shared-controls';

export const toastDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'toast',
    name: 'Toast',
    category: 'Feedback',
    summary: 'Brief notification message.',
    importPath: '@z-ux/ui/toast',
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
    whenToUsePreviews: {
      use: () => (
        <ToastProvider>
          <Toast open>
            <ToastTitle>Saved</ToastTitle>
            <ToastDescription>Your profile was updated.</ToastDescription>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      ),
      doNotUse: () => (
        <Alert tone="danger" title="Payment failed" description="Update your billing details to continue." />
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Scheduled reminder',
      description: 'Toast with title, description, and undo action.',
      code: `<ToastProvider>
  <Toast open>
    <ToastTitle>Scheduled</ToastTitle>
    <ToastDescription>Your meeting starts in 10 minutes.</ToastDescription>
    <ToastAction altText="Undo">Undo</ToastAction>
    <ToastClose />
  </Toast>
  <ToastViewport />
</ToastProvider>`,
      render: () => (
        <ToastProvider>
          <Toast open>
            <ToastTitle>Scheduled</ToastTitle>
            <ToastDescription>Your meeting starts in 10 minutes.</ToastDescription>
            <ToastAction altText="Undo">Undo</ToastAction>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      ),
    },
    {
      label: 'Save confirmation',
      description: 'Brief success toast after saving changes.',
      code: `<ToastProvider>
  <Toast open>
    <ToastTitle>Saved</ToastTitle>
    <ToastDescription>Your profile was updated.</ToastDescription>
    <ToastClose />
  </Toast>
  <ToastViewport />
</ToastProvider>`,
      render: () => (
        <ToastProvider>
          <Toast open>
            <ToastTitle>Saved</ToastTitle>
            <ToastDescription>Your profile was updated.</ToastDescription>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      ),
    },
    {
      label: 'Error notice',
      description: 'Toast for a failed background operation.',
      code: `<ToastProvider>
  <Toast open>
    <ToastTitle>Upload failed</ToastTitle>
    <ToastDescription>Try again or check your connection.</ToastDescription>
    <ToastClose />
  </Toast>
  <ToastViewport />
</ToastProvider>`,
      render: () => (
        <ToastProvider>
          <Toast open>
            <ToastTitle>Upload failed</ToastTitle>
            <ToastDescription>Try again or check your connection.</ToastDescription>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      ),
    },
  ];
  return doc;
})();
