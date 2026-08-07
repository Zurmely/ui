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
    summary: 'Shows the current page location within a hierarchy.',
    importPath: '@z-ux/ui',
    componentName: 'Breadcrumbs',
    controls: {
      currentPage: textControl('currentPage', 'Breadcrumbs'),
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
        <Breadcrumbs>
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
            <BreadcrumbLink href="#" aria-current="page">
              {currentPage}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumbs>
      );
    },
    code: (props) => {
      const currentPage = props.currentPage as string;
      const isDeep = props.depth === 'deep';

      if (isDeep) {
        return `<Breadcrumbs>
  <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem><BreadcrumbLink href="#" aria-current="page">${currentPage}</BreadcrumbLink></BreadcrumbItem>
</Breadcrumbs>`;
      }

      return `<Breadcrumbs>
  <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem><BreadcrumbLink href="#" aria-current="page">${currentPage}</BreadcrumbLink></BreadcrumbItem>
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
            <BreadcrumbLink href="#" aria-current="page">
              Breadcrumbs
            </BreadcrumbLink>
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
  <BreadcrumbItem><BreadcrumbLink href="#" aria-current="page">Settings</BreadcrumbLink></BreadcrumbItem>
</Breadcrumbs>`,
      render: () => (
        <Breadcrumbs>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#" aria-current="page">
              Settings
            </BreadcrumbLink>
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
  <BreadcrumbItem><BreadcrumbLink href="#" aria-current="page">Button</BreadcrumbLink></BreadcrumbItem>
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
            <BreadcrumbLink href="#" aria-current="page">
              Button
            </BreadcrumbLink>
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
  <BreadcrumbItem><BreadcrumbLink href="#" aria-current="page">Desk lamp</BreadcrumbLink></BreadcrumbItem>
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
            <BreadcrumbLink href="#" aria-current="page">
              Desk lamp
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumbs>
      ),
      fullWidth: true,
    },
  ];
  return doc;
})();
