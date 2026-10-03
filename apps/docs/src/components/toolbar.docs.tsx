import { Button, Separator, Toolbar } from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { textControl } from './shared-controls';

export const toolbarDoc: ComponentDoc = {
  slug: 'toolbar',
  name: 'Toolbar',
  category: 'Layout',
  summary: 'Grouped actions with leading, center, and trailing regions and roving keyboard focus.',
  importPath: '@z-ux/ui/toolbar',
  componentName: 'Toolbar',
  controls: {
    label: textControl('label', 'Document actions'),
    orientation: {
      type: 'select',
      label: 'orientation',
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal',
    },
  },
  render: (props) => (
    <Toolbar
      label={props.label as string}
      orientation={props.orientation as 'horizontal' | 'vertical'}
      style={{ width: '100%', maxWidth: '28rem' }}
      leading={
        <Button size="sm" variant="ghost">
          Back
        </Button>
      }
      trailing={
        <Button size="sm" variant="primary">
          Publish
        </Button>
      }
    >
      <Button size="sm">Save</Button>
      <Separator orientation={props.orientation === 'vertical' ? 'horizontal' : 'vertical'} />
      <Button size="sm" variant="secondary">
        Cancel
      </Button>
    </Toolbar>
  ),
  code: (props) => `<Toolbar
  label="${props.label}"
  orientation="${props.orientation}"
  leading={<Button size="sm" variant="ghost">Back</Button>}
  trailing={<Button size="sm" variant="primary">Publish</Button>}
>
  <Button size="sm">Save</Button>
  <Separator orientation="${props.orientation === 'vertical' ? 'horizontal' : 'vertical'}" />
  <Button size="sm" variant="secondary">Cancel</Button>
</Toolbar>`,
  whenToUsePreviews: {
    use: () => (
      <Toolbar label="Document actions" style={{ width: '100%', maxWidth: '24rem' }}>
        <Button size="sm">Save</Button>
        <Separator orientation="vertical" />
        <Button size="sm" variant="secondary">
          Cancel
        </Button>
      </Toolbar>
    ),
    doNotUse: () => <Button size="sm">Save</Button>,
  },
  examples: [
    {
      label: 'Horizontal actions',
      description: 'Save and cancel actions in a horizontal toolbar.',
      code: `<Toolbar label="Document actions">
  <Button size="sm">Save</Button>
  <Separator orientation="vertical" />
  <Button size="sm" variant="secondary">Cancel</Button>
</Toolbar>`,
      render: () => (
        <Toolbar label="Document actions" style={{ width: '100%', maxWidth: '28rem' }}>
          <Button size="sm">Save</Button>
          <Separator orientation="vertical" />
          <Button size="sm" variant="secondary">
            Cancel
          </Button>
        </Toolbar>
      ),
    },
    {
      label: 'Vertical toolbar',
      description: 'Stacked actions for narrow panels.',
      code: `<Toolbar label="Sidebar actions" orientation="vertical">
  <Button size="sm" variant="ghost">Edit</Button>
  <Button size="sm" variant="ghost">Share</Button>
</Toolbar>`,
      render: () => (
        <Toolbar label="Sidebar actions" orientation="vertical">
          <Button size="sm" variant="ghost">
            Edit
          </Button>
          <Button size="sm" variant="ghost">
            Share
          </Button>
        </Toolbar>
      ),
    },
    {
      label: 'Leading and trailing',
      description: 'Back in leading, formatting in the center, publish in trailing.',
      code: `<Toolbar
  label="Document actions"
  leading={<Button size="sm" variant="ghost">Back</Button>}
  trailing={<Button size="sm" variant="primary">Publish</Button>}
>
  <Button size="sm" variant="ghost">Bold</Button>
  <Button size="sm" variant="ghost">Italic</Button>
</Toolbar>`,
      render: () => (
        <Toolbar
          label="Document actions"
          style={{ width: '100%', maxWidth: '28rem' }}
          leading={
            <Button size="sm" variant="ghost">
              Back
            </Button>
          }
          trailing={
            <Button size="sm" variant="primary">
              Publish
            </Button>
          }
        >
          <Button size="sm" variant="ghost">
            Bold
          </Button>
          <Button size="sm" variant="ghost">
            Italic
          </Button>
        </Toolbar>
      ),
      fullWidth: true,
    },
  ],
};
