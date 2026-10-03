import {
  BreadcrumbItem,
  BreadcrumbLink,
  Breadcrumbs,
  BreadcrumbSeparator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@z-ux/ui';
import type { ComponentDoc } from '../playground/types';
import { getDefaultProps } from '../playground/types';
import { textControl } from './shared-controls';

export const breadcrumbsDoc: ComponentDoc = (() => {
  const doc: ComponentDoc = {
    slug: 'breadcrumbs',
    name: 'Breadcrumbs',
    category: 'Navigation',
    summary:
      'Hierarchical page trail. Mark the last crumb with current so it renders as text, not a link.',
    importPath: '@z-ux/ui',
    componentName: 'Breadcrumbs',
    controls: {
      currentPage: textControl('currentPage', 'Breadcrumbs'),
      label: textControl('label', 'Breadcrumb'),
      depth: {
        type: 'select',
        label: 'depth',
        options: ['shallow', 'deep'],
        defaultValue: 'deep',
      },
    },
    render: (props) => {
      const currentPage = props.currentPage as string;
      const isDeep = props.depth === 'deep';

      return (
        <Breadcrumbs label={props.label as string}>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {isDeep ? (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          ) : null}
          <BreadcrumbItem>
            <BreadcrumbLink current>{currentPage}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumbs>
      );
    },
    code: (props) => {
      const currentPage = props.currentPage as string;
      const isDeep = props.depth === 'deep';

      if (isDeep) {
        return `<Breadcrumbs label="${props.label}">
  <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem><BreadcrumbLink current>${currentPage}</BreadcrumbLink></BreadcrumbItem>
</Breadcrumbs>`;
      }

      return `<Breadcrumbs label="${props.label}">
  <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem><BreadcrumbLink current>${currentPage}</BreadcrumbLink></BreadcrumbItem>
</Breadcrumbs>`;
    },
    whenToUsePreviews: {
      use: () => (
        <Breadcrumbs>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink current>Breadcrumbs</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumbs>
      ),
      doNotUse: () => (
        <Tabs defaultValue="overview" style={{ width: '100%' }}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">Project overview</TabsContent>
          <TabsContent value="settings">Project settings</TabsContent>
        </Tabs>
      ),
    },
  };
  const defaults = getDefaultProps(doc.controls);
  doc.examples = [
    {
      label: 'Page trail',
      description: 'Show where the current page sits in the site hierarchy.',
      code: `<Breadcrumbs>
  <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem><BreadcrumbLink current>Settings</BreadcrumbLink></BreadcrumbItem>
</Breadcrumbs>`,
      render: () => (
        <Breadcrumbs>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink current>Settings</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumbs>
      ),
    },
    {
      label: 'Deep navigation',
      description: 'Multi-level path through nested sections.',
      code: `<Breadcrumbs>
  <BreadcrumbItem><BreadcrumbLink href="#">Docs</BreadcrumbLink></BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem><BreadcrumbLink current>Button</BreadcrumbLink></BreadcrumbItem>
</Breadcrumbs>`,
      render: () => (
        <Breadcrumbs>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink current>Button</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumbs>
      ),
    },
    {
      label: 'Product catalog',
      description: 'E-commerce category path above a product detail page.',
      code: `<Breadcrumbs>
  <BreadcrumbItem><BreadcrumbLink href="#">Shop</BreadcrumbLink></BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem><BreadcrumbLink href="#">Accessories</BreadcrumbLink></BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem><BreadcrumbLink current>Desk lamp</BreadcrumbLink></BreadcrumbItem>
</Breadcrumbs>`,
      render: () => (
        <Breadcrumbs>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Accessories</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink current>Desk lamp</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumbs>
      ),
      fullWidth: true,
    },
  ];
  return doc;
})();
