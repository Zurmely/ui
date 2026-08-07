#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../../..');
const docsDir = path.join(root, 'apps/docs/src/components');

const PLACEHOLDER_DESCRIPTIONS = [
  'Default playground configuration.',
  'Another common configuration from the playground controls.',
  'Live render of the component with default props.',
  'Live render of the component with playground props.',
];

const SKIP_SLUGS = new Set(['button', 'list-item', 'toolbar']);

/** @type {Record<string, string[]>} */
const PRESERVE_LABELS = {
  'code-block': ['Single line', 'Multi line'],
  dialog: ['Destructive confirm'],
  filter: ['Filter bar'],
  'icon-button': ['Toolbar icons'],
  table: ['Status table'],
};

/**
 * @typedef {{ label: string; description: string; code: string; render: string; fullWidth?: boolean; reactImports?: string[]; zuiImports?: string[]; zuiTypeImports?: string[] }} ExampleDef
 */

/** @type {Record<string, ExampleDef[]>} */
const EXAMPLES = {
  'accessibility-controller': [
    {
      label: 'Settings panel',
      description: 'Uncontrolled panel for contrast, motion, transparency, and link underline preferences.',
      code: '<AccessibilityController />',
      render: '() => <AccessibilityController />',
    },
    {
      label: 'High contrast preset',
      description: 'Start with high contrast and reduced motion for accessibility-first defaults.',
      code: `<AccessibilityController
  defaultValue={{ contrast: 'high', motion: 'reduced', transparency: 'system', linkUnderline: 'auto' }}
/>`,
      render: `() => (
        <AccessibilityController
          defaultValue={{ contrast: 'high', motion: 'reduced', transparency: 'system', linkUnderline: 'auto' }}
        />
      )`,
    },
    {
      label: 'Controlled preferences',
      description: 'Sync accessibility preferences with application state.',
      code: `const [prefs, setPrefs] = useState({
  contrast: 'high',
  motion: 'reduced',
  transparency: 'system',
  linkUnderline: 'always',
});
<AccessibilityController value={prefs} onChange={setPrefs} />`,
      render: `() => {
        function ControlledPreferences() {
          const [prefs, setPrefs] = useState<Required<AccessibilityPreferences>>({
            contrast: 'high',
            motion: 'reduced',
            transparency: 'system',
            linkUnderline: 'always',
          });
          return (
            <AccessibilityController
              value={prefs}
              onChange={(next) =>
                setPrefs({
                  contrast: next.contrast ?? 'system',
                  motion: next.motion ?? 'system',
                  transparency: next.transparency ?? 'system',
                  linkUnderline: next.linkUnderline ?? 'auto',
                })
              }
            />
          );
        }
        return <ControlledPreferences />;
      }`,
      reactImports: ['useState'],
      zuiImports: ['AccessibilityPreferences'],
      zuiTypeImports: ['AccessibilityPreferences'],
    },
  ],
  accordion: [
    {
      label: 'FAQ section',
      description: 'Single collapsible panel for frequently asked questions.',
      code: `<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It follows the WAI-ARIA accordion pattern.</AccordionContent>
  </AccordionItem>
</Accordion>`,
      render: `() => (
        <Accordion type="single" collapsible defaultValue="item-1" style={{ width: '100%', maxWidth: '24rem' }}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. It follows the WAI-ARIA accordion pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>Yes. It uses semantic Z-UI tokens.</AccordionContent>
          </AccordionItem>
        </Accordion>
      )`,
    },
    {
      label: 'Multiple sections',
      description: 'Allow more than one section to stay open at a time.',
      code: `<Accordion type="multiple" defaultValue={['billing', 'shipping']}>
  <AccordionItem value="billing">...</AccordionItem>
  <AccordionItem value="shipping">...</AccordionItem>
</Accordion>`,
      render: `() => (
        <Accordion type="multiple" defaultValue={['billing', 'shipping']} style={{ width: '100%', maxWidth: '24rem' }}>
          <AccordionItem value="billing">
            <AccordionTrigger>Billing</AccordionTrigger>
            <AccordionContent>Update payment method and invoices.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="shipping">
            <AccordionTrigger>Shipping</AccordionTrigger>
            <AccordionContent>Manage delivery addresses.</AccordionContent>
          </AccordionItem>
        </Accordion>
      )`,
    },
    {
      label: 'Settings group',
      description: 'Group related settings in an expandable panel on a preferences page.',
      code: `<Accordion type="single" collapsible>
  <AccordionItem value="notifications">
    <AccordionTrigger>Notifications</AccordionTrigger>
    <AccordionContent>Email and push alert preferences.</AccordionContent>
  </AccordionItem>
</Accordion>`,
      render: `() => (
        <Accordion type="single" collapsible style={{ width: '100%', maxWidth: '24rem' }}>
          <AccordionItem value="notifications">
            <AccordionTrigger>Notifications</AccordionTrigger>
            <AccordionContent>Email and push alert preferences.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="privacy">
            <AccordionTrigger>Privacy</AccordionTrigger>
            <AccordionContent>Control data sharing and visibility.</AccordionContent>
          </AccordionItem>
        </Accordion>
      )`,
      fullWidth: true,
    },
  ],
  alert: [
    {
      label: 'Informational',
      description: 'Neutral alert for general updates and context.',
      code: '<Alert title="Heads up" description="Your trial ends in 7 days." />',
      render: '() => <Alert title="Heads up" description="Your trial ends in 7 days." />',
    },
    {
      label: 'Warning',
      description: 'Draw attention before a potentially risky action.',
      code: '<Alert tone="warning" title="Storage almost full" description="Free up space to keep syncing." />',
      render: '() => <Alert tone="warning" title="Storage almost full" description="Free up space to keep syncing." />',
    },
    {
      label: 'Error',
      description: 'Report a failed operation that needs user attention.',
      code: '<Alert tone="danger" title="Payment failed" description="Update your billing details to continue." />',
      render: '() => <Alert tone="danger" title="Payment failed" description="Update your billing details to continue." />',
    },
  ],
  avatar: [
    {
      label: 'Initials fallback',
      description: 'Show user initials when no image is available.',
      code: '<Avatar fallback="JD" alt="Jane Doe" />',
      render: '() => <Avatar fallback="JD" alt="Jane Doe" />',
    },
    {
      label: 'Large profile',
      description: 'Larger avatar for profile headers and account settings.',
      code: '<Avatar size="lg" fallback="AC" alt="Alex Chen" />',
      render: '() => <Avatar size="lg" fallback="AC" alt="Alex Chen" />',
    },
    {
      label: 'Team member row',
      description: 'Avatar paired with a name in a member list.',
      code: `<Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
  <Avatar fallback="MR" alt="Morgan Reed" />
  <span>Morgan Reed</span>
</Stack>`,
      render: `() => (
        <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
          <Avatar fallback="MR" alt="Morgan Reed" />
          <span>Morgan Reed</span>
        </Stack>
      )`,
      zuiImports: ['Stack'],
    },
  ],
  badge: [
    {
      label: 'Status label',
      description: 'Compact label for item state or category.',
      code: '<Badge tone="info">New</Badge>',
      render: '() => <Badge tone="info">New</Badge>',
    },
    {
      label: 'Success count',
      description: 'Positive outcome indicator on a dashboard metric.',
      code: '<Badge tone="success" size="sm">Active</Badge>',
      render: '() => <Badge tone="success" size="sm">Active</Badge>',
    },
    {
      label: 'Unread count',
      description: 'Numeric badge beside a navigation label.',
      code: '<Badge>12</Badge>',
      render: '() => <Badge>12</Badge>',
    },
  ],
  breadcrumbs: [
    {
      label: 'Page trail',
      description: 'Show where the current page sits in the site hierarchy.',
      code: `<Breadcrumbs>
  <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem><BreadcrumbLink href="#" aria-current="page">Settings</BreadcrumbLink></BreadcrumbItem>
</Breadcrumbs>`,
      render: `() => (
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
      )`,
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
      render: `() => (
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
      )`,
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
      render: `() => (
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
      )`,
      fullWidth: true,
    },
  ],
  calendar: [
    {
      label: 'Date picker',
      description: 'Select a single date from a month grid.',
      code: '<Calendar />',
      render: '() => <Calendar />',
    },
    {
      label: 'Disabled',
      description: 'Read-only calendar while a form is submitting.',
      code: '<Calendar disabled />',
      render: '() => <Calendar disabled />',
    },
    {
      label: 'Booking form',
      description: 'Calendar inside a labeled field for appointment scheduling.',
      code: `<Field>
  <FieldLabel>Appointment date</FieldLabel>
  <Calendar />
</Field>`,
      render: `() => (
        <Field style={{ width: '100%', maxWidth: '20rem' }}>
          <FieldLabel>Appointment date</FieldLabel>
          <Calendar />
        </Field>
      )`,
      zuiImports: ['Field', 'FieldLabel'],
    },
  ],
  card: [
    {
      label: 'Content card',
      description: 'Grouped content with header, body, and footer actions.',
      code: `<Card>
  <CardHeader>
    <CardTitle>Project overview</CardTitle>
    <CardDescription>Track milestones and team activity.</CardDescription>
  </CardHeader>
  <CardContent><p>3 tasks due this week.</p></CardContent>
  <CardFooter><Button variant="primary">View project</Button></CardFooter>
</Card>`,
      render: `() => (
        <Card style={{ width: '100%', maxWidth: '24rem' }}>
          <CardHeader>
            <CardTitle>Project overview</CardTitle>
            <CardDescription>Track milestones and team activity.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>3 tasks due this week.</p>
          </CardContent>
          <CardFooter>
            <Button variant="primary">View project</Button>
          </CardFooter>
        </Card>
      )`,
    },
    {
      label: 'Metric summary',
      description: 'Highlight a KPI with supporting detail.',
      code: `<Card>
  <CardHeader>
    <CardTitle>Monthly revenue</CardTitle>
    <CardDescription>Compared to last month</CardDescription>
  </CardHeader>
  <CardContent><p style={{ fontSize: '1.5rem', margin: 0 }}>$42,800</p></CardContent>
</Card>`,
      render: `() => (
        <Card style={{ width: '100%', maxWidth: '20rem' }}>
          <CardHeader>
            <CardTitle>Monthly revenue</CardTitle>
            <CardDescription>Compared to last month</CardDescription>
          </CardHeader>
          <CardContent>
            <p style={{ fontSize: '1.5rem', margin: 0 }}>$42,800</p>
          </CardContent>
        </Card>
      )`,
    },
    {
      label: 'Confirm action',
      description: 'Card footer with cancel and primary actions.',
      code: `<Card>
  <CardHeader><CardTitle>Publish changes?</CardTitle></CardHeader>
  <CardFooter>
    <Stack direction="horizontal" gap="sm" style={{ justifyContent: 'flex-end', width: '100%' }}>
      <Button variant="ghost">Cancel</Button>
      <Button variant="primary">Publish</Button>
    </Stack>
  </CardFooter>
</Card>`,
      render: `() => (
        <Card style={{ width: '100%', maxWidth: '24rem' }}>
          <CardHeader>
            <CardTitle>Publish changes?</CardTitle>
            <CardDescription>Updates will be visible to all team members.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Stack direction="horizontal" gap="sm" style={{ justifyContent: 'flex-end', width: '100%' }}>
              <Button variant="ghost">Cancel</Button>
              <Button variant="primary">Publish</Button>
            </Stack>
          </CardFooter>
        </Card>
      )`,
      zuiImports: ['Stack'],
      fullWidth: true,
    },
  ],
  carousel: [
    {
      label: 'Image gallery',
      description: 'Horizontal carousel for browsing featured images.',
      code: `<Carousel>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
      render: `() => (
        <Carousel style={{ width: '100%', maxWidth: '24rem' }}>
          <CarouselContent>
            <CarouselItem>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '8rem', background: 'var(--z-color-background-muted)', borderRadius: 'var(--z-radius-surface)' }}>Slide 1</div>
            </CarouselItem>
            <CarouselItem>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '8rem', background: 'var(--z-color-background-muted)', borderRadius: 'var(--z-radius-surface)' }}>Slide 2</div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )`,
    },
    {
      label: 'Product highlights',
      description: 'Showcase product features one at a time.',
      code: `<Carousel>
  <CarouselContent>
    <CarouselItem>Free shipping</CarouselItem>
    <CarouselItem>2-year warranty</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
      render: `() => (
        <Carousel style={{ width: '100%', maxWidth: '24rem' }}>
          <CarouselContent>
            <CarouselItem>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '8rem', background: 'var(--z-color-background-muted)', borderRadius: 'var(--z-radius-surface)' }}>Free shipping</div>
            </CarouselItem>
            <CarouselItem>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '8rem', background: 'var(--z-color-background-muted)', borderRadius: 'var(--z-radius-surface)' }}>2-year warranty</div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )`,
    },
    {
      label: 'Vertical stack',
      description: 'Vertical orientation for narrow side panels.',
      code: '<Carousel orientation="vertical">...</Carousel>',
      render: `() => (
        <Carousel orientation="vertical" style={{ height: '10rem', width: '100%', maxWidth: '16rem' }}>
          <CarouselContent>
            <CarouselItem>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '8rem', background: 'var(--z-color-background-muted)', borderRadius: 'var(--z-radius-surface)' }}>First</div>
            </CarouselItem>
            <CarouselItem>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '8rem', background: 'var(--z-color-background-muted)', borderRadius: 'var(--z-radius-surface)' }}>Second</div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )`,
    },
  ],
  checkbox: [
    {
      label: 'Terms acceptance',
      description: 'Unchecked checkbox for optional consent.',
      code: '<Checkbox aria-label="Accept terms" />',
      render: '() => <Checkbox aria-label="Accept terms" />',
    },
    {
      label: 'Selected option',
      description: 'Pre-selected filter in a settings form.',
      code: '<Checkbox checked aria-label="Email updates" />',
      render: '() => <Checkbox checked aria-label="Email updates" />',
    },
    {
      label: 'Invalid state',
      description: 'Validation error on a required checkbox.',
      code: '<Checkbox invalid aria-label="Agree to terms" />',
      render: '() => <Checkbox invalid aria-label="Agree to terms" />',
    },
  ],
  dialog: [
    {
      label: 'Edit profile',
      description: 'Modal for focused edits without leaving the page.',
      code: `<Dialog>
  <DialogTrigger asChild><Button variant="secondary">Edit profile</Button></DialogTrigger>
  <DialogContent>
    <DialogTitle>Edit profile</DialogTitle>
    <DialogDescription>Make changes to your profile here.</DialogDescription>
  </DialogContent>
</Dialog>`,
      render: `() => (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">Edit profile</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here.</DialogDescription>
          </DialogContent>
        </Dialog>
      )`,
    },
    {
      label: 'Share link',
      description: 'Short task dialog with a single action.',
      code: `<Dialog>
  <DialogTrigger asChild><Button variant="primary">Share</Button></DialogTrigger>
  <DialogContent>
    <DialogTitle>Share document</DialogTitle>
    <DialogDescription>Anyone with the link can view.</DialogDescription>
  </DialogContent>
</Dialog>`,
      render: `() => (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="primary">Share</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Share document</DialogTitle>
            <DialogDescription>Anyone with the link can view.</DialogDescription>
          </DialogContent>
        </Dialog>
      )`,
    },
    {
      label: 'Destructive confirm',
      description: 'Confirm before deleting a resource.',
      code: `<Dialog>
  <DialogTrigger asChild><Button variant="danger">Delete</Button></DialogTrigger>
  <DialogContent>
    <DialogTitle>Delete project?</DialogTitle>
    <DialogDescription>This cannot be undone.</DialogDescription>
  </DialogContent>
</Dialog>`,
      render: `() => (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="danger">Delete</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Delete project?</DialogTitle>
            <DialogDescription>This cannot be undone.</DialogDescription>
          </DialogContent>
        </Dialog>
      )`,
    },
  ],
  drawer: [
    {
      label: 'Right panel',
      description: 'Slide-in panel from the right for secondary tasks.',
      code: `<Drawer>
  <DrawerTrigger asChild><Button variant="secondary">Open drawer</Button></DrawerTrigger>
  <DrawerContent side="right">
    <DrawerHeader>
      <DrawerTitle>Filters</DrawerTitle>
      <DrawerDescription>Refine the current view.</DrawerDescription>
    </DrawerHeader>
  </DrawerContent>
</Drawer>`,
      render: `() => (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="secondary">Open drawer</Button>
          </DrawerTrigger>
          <DrawerContent side="right">
            <DrawerHeader>
              <DrawerTitle>Filters</DrawerTitle>
              <DrawerDescription>Refine the current view.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="secondary">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )`,
    },
    {
      label: 'Top sheet',
      description: 'Drawer from the top for mobile-friendly sheets.',
      code: '<Drawer><DrawerContent side="top">...</DrawerContent></Drawer>',
      render: `() => (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="secondary">Show details</Button>
          </DrawerTrigger>
          <DrawerContent side="top">
            <DrawerHeader>
              <DrawerTitle>Order summary</DrawerTitle>
              <DrawerDescription>Review items before checkout.</DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      )`,
    },
    {
      label: 'Mobile navigation',
      description: 'Full-height drawer for navigation on small screens.',
      code: '<Drawer><DrawerContent side="left">...</DrawerContent></Drawer>',
      render: `() => (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost">Menu</Button>
          </DrawerTrigger>
          <DrawerContent side="left">
            <DrawerHeader>
              <DrawerTitle>Navigation</DrawerTitle>
            </DrawerHeader>
            <Stack gap="sm" style={{ padding: 'var(--z-spacing-inset-component)' }}>
              <Button variant="ghost" style={{ justifyContent: 'flex-start' }}>Home</Button>
              <Button variant="ghost" style={{ justifyContent: 'flex-start' }}>Projects</Button>
              <Button variant="ghost" style={{ justifyContent: 'flex-start' }}>Settings</Button>
            </Stack>
          </DrawerContent>
        </Drawer>
      )`,
      zuiImports: ['Stack'],
      fullWidth: true,
    },
  ],
  field: [
    {
      label: 'Email field',
      description: 'Label, input, and helper text for a signup form.',
      code: `<Field>
  <FieldLabel>Email</FieldLabel>
  <TextField type="email" placeholder="you@example.com" />
  <FieldDescription>We will never share your email.</FieldDescription>
</Field>`,
      render: `() => (
        <Field style={{ width: '100%', maxWidth: '24rem' }}>
          <FieldLabel>Email</FieldLabel>
          <TextField type="email" placeholder="you@example.com" />
          <FieldDescription>We will never share your email.</FieldDescription>
        </Field>
      )`,
    },
    {
      label: 'Validation error',
      description: 'Invalid field with an error message below the input.',
      code: `<Field invalid>
  <FieldLabel>Username</FieldLabel>
  <TextField invalid aria-label="Username" />
  <FieldError>Username is already taken.</FieldError>
</Field>`,
      render: `() => (
        <Field invalid style={{ width: '100%', maxWidth: '24rem' }}>
          <FieldLabel>Username</FieldLabel>
          <TextField invalid aria-label="Username" />
          <FieldError>Username is already taken.</FieldError>
        </Field>
      )`,
    },
    {
      label: 'Disabled field',
      description: 'Read-only field while account details are locked.',
      code: `<Field disabled>
  <FieldLabel>Account ID</FieldLabel>
  <TextField disabled value="acct_123" aria-label="Account ID" />
</Field>`,
      render: `() => (
        <Field disabled style={{ width: '100%', maxWidth: '24rem' }}>
          <FieldLabel>Account ID</FieldLabel>
          <TextField disabled value="acct_123" aria-label="Account ID" />
        </Field>
      )`,
    },
  ],
  'file-input': [
    {
      label: 'Single upload',
      description: 'Pick one file for a profile image or document.',
      code: '<FileInput aria-label="Upload file" />',
      render: '() => <FileInput aria-label="Upload file" />',
    },
    {
      label: 'Multiple files',
      description: 'Attach several files to a support ticket.',
      code: '<FileInput multiple aria-label="Attachments" />',
      render: '() => <FileInput multiple aria-label="Attachments" />',
    },
    {
      label: 'Disabled upload',
      description: 'Upload control disabled until the user verifies their account.',
      code: '<FileInput disabled aria-label="Upload file" />',
      render: '() => <FileInput disabled aria-label="Upload file" />',
    },
  ],
  filter: [
    {
      label: 'Status filter',
      description: 'Toggle between all, active, and archived items.',
      code: `<Filter value="active" onValueChange={setValue}>
  <FilterItem value="all">All</FilterItem>
  <FilterItem value="active">Active</FilterItem>
  <FilterItem value="archived">Archived</FilterItem>
</Filter>`,
      render: `() => (
        <Filter value="active" onValueChange={() => {}}>
          <FilterItem value="all">All</FilterItem>
          <FilterItem value="active">Active</FilterItem>
          <FilterItem value="archived">Archived</FilterItem>
        </Filter>
      )`,
    },
    {
      label: 'All items',
      description: 'Default view showing every record.',
      code: `<Filter value="all" onValueChange={setValue}>
  <FilterItem value="all">All</FilterItem>
  <FilterItem value="active">Active</FilterItem>
</Filter>`,
      render: `() => (
        <Filter value="all" onValueChange={() => {}}>
          <FilterItem value="all">All</FilterItem>
          <FilterItem value="active">Active</FilterItem>
          <FilterItem value="archived">Archived</FilterItem>
        </Filter>
      )`,
    },
    {
      label: 'Filter bar',
      description: 'Status filters above a data table.',
      code: `<Filter type="multiple" defaultValue={['active']} aria-label="Status">
  <FilterItem value="active">Active</FilterItem>
  <FilterItem value="pending">Pending</FilterItem>
  <FilterItem value="archived">Archived</FilterItem>
</Filter>`,
      render: `() => (
        <Filter type="multiple" defaultValue={['active']} aria-label="Status">
          <FilterItem value="active">Active</FilterItem>
          <FilterItem value="pending">Pending</FilterItem>
          <FilterItem value="archived">Archived</FilterItem>
        </Filter>
      )`,
      fullWidth: true,
    },
  ],
  'floating-action-button': [
    {
      label: 'Create action',
      description: 'Primary floating action for the main page task.',
      code: '<FloatingActionButton aria-label="Create">+</FloatingActionButton>',
      render: '() => <FloatingActionButton aria-label="Create">+</FloatingActionButton>',
    },
    {
      label: 'Loading',
      description: 'FAB while an async create operation is in progress.',
      code: '<FloatingActionButton isLoading aria-label="Saving">+</FloatingActionButton>',
      render: '() => <FloatingActionButton isLoading aria-label="Saving">+</FloatingActionButton>',
    },
    {
      label: 'Secondary FAB',
      description: 'Lower-emphasis action on content-heavy pages.',
      code: '<FloatingActionButton variant="secondary" aria-label="Compose">✎</FloatingActionButton>',
      render: '() => <FloatingActionButton variant="secondary" aria-label="Compose">✎</FloatingActionButton>',
    },
  ],
  'icon-button': [
    {
      label: 'Add item',
      description: 'Primary icon button with an accessible name.',
      code: '<IconButton aria-label="Add">{/* plus icon */}</IconButton>',
      render: `() => (
        <IconButton aria-label="Add" variant="primary">
          {plusIcon}
        </IconButton>
      )`,
    },
    {
      label: 'Search',
      description: 'Ghost icon button for toolbar search.',
      code: '<IconButton aria-label="Search" variant="ghost">{/* search icon */}</IconButton>',
      render: `() => (
        <IconButton aria-label="Search" variant="ghost">
          {searchIcon}
        </IconButton>
      )`,
    },
    {
      label: 'Toolbar icons',
      description: 'Icon buttons in a document toolbar.',
      code: '<Toolbar label="Editor">...</Toolbar>',
      render: `() => (
        <Toolbar label="Editor actions" style={{ width: '100%' }}>
          <IconButton aria-label="Bold" variant="ghost" size="sm">B</IconButton>
          <IconButton aria-label="Italic" variant="ghost" size="sm">I</IconButton>
        </Toolbar>
      )`,
      fullWidth: true,
    },
  ],
  indicator: [
    {
      label: 'Unread dot',
      description: 'Subtle dot indicator on a navigation icon.',
      code: `<Indicator>
  <Button variant="secondary">Inbox</Button>
  <IndicatorItem variant="dot" placement="top-end" />
</Indicator>`,
      render: `() => (
        <Indicator>
          <Button variant="secondary">Inbox</Button>
          <IndicatorItem variant="dot" placement="top-end" />
        </Indicator>
      )`,
    },
    {
      label: 'Notification badge',
      description: 'Numeric badge on an icon button.',
      code: `<Indicator>
  <Button variant="secondary">Inbox</Button>
  <IndicatorItem variant="badge" placement="top-end">5</IndicatorItem>
</Indicator>`,
      render: `() => (
        <Indicator>
          <Button variant="secondary">Inbox</Button>
          <IndicatorItem variant="badge" placement="top-end">5</IndicatorItem>
        </Indicator>
      )`,
    },
    {
      label: 'Bottom placement',
      description: 'Badge anchored to the bottom-start of a trigger.',
      code: `<Indicator>
  <Button variant="ghost" size="sm">Messages</Button>
  <IndicatorItem variant="badge" placement="bottom-start">12</IndicatorItem>
</Indicator>`,
      render: `() => (
        <Indicator>
          <Button variant="ghost" size="sm">Messages</Button>
          <IndicatorItem variant="badge" placement="bottom-start">12</IndicatorItem>
        </Indicator>
      )`,
    },
  ],
  link: [
    {
      label: 'Inline link',
      description: 'Text link within a paragraph.',
      code: '<Link href="#">Learn more</Link>',
      render: '() => <Link href="#">Learn more</Link>',
    },
    {
      label: 'Navigation link',
      description: 'Standalone link in a header or footer.',
      code: '<Link href="/docs">Documentation</Link>',
      render: '() => <Link href="/docs">Documentation</Link>',
    },
    {
      label: 'Disabled link',
      description: 'Unavailable destination while permissions are loading.',
      code: '<Link href="#" disabled>Admin settings</Link>',
      render: '() => <Link href="#" disabled>Admin settings</Link>',
    },
  ],
  megamenu: [
    {
      label: 'Product menu',
      description: 'Large dropdown for product categories.',
      code: `<Megamenu>
  <MegamenuTrigger asChild><Button variant="secondary">Products</Button></MegamenuTrigger>
  <MegamenuContent>
    <MegamenuItem href="#">Analytics</MegamenuItem>
  </MegamenuContent>
</Megamenu>`,
      render: `() => (
        <Megamenu>
          <MegamenuTrigger asChild>
            <Button variant="secondary">Products</Button>
          </MegamenuTrigger>
          <MegamenuContent>
            <MegamenuItem href="#">Analytics</MegamenuItem>
            <MegamenuItem href="#">Automation</MegamenuItem>
            <MegamenuItem href="#">Integrations</MegamenuItem>
          </MegamenuContent>
        </Megamenu>
      )`,
    },
    {
      label: 'Solutions menu',
      description: 'Megamenu for solution verticals on a marketing site.',
      code: `<Megamenu>
  <MegamenuTrigger asChild><Button variant="ghost">Solutions</Button></MegamenuTrigger>
  <MegamenuContent>
    <MegamenuItem href="#">Enterprise</MegamenuItem>
    <MegamenuItem href="#">Startups</MegamenuItem>
  </MegamenuContent>
</Megamenu>`,
      render: `() => (
        <Megamenu>
          <MegamenuTrigger asChild>
            <Button variant="ghost">Solutions</Button>
          </MegamenuTrigger>
          <MegamenuContent>
            <MegamenuItem href="#">Enterprise</MegamenuItem>
            <MegamenuItem href="#">Startups</MegamenuItem>
            <MegamenuItem href="#">Agencies</MegamenuItem>
          </MegamenuContent>
        </Megamenu>
      )`,
    },
    {
      label: 'Resources hub',
      description: 'Grouped links to docs, blog, and support.',
      code: `<Megamenu>
  <MegamenuTrigger asChild><Button variant="secondary">Resources</Button></MegamenuTrigger>
  <MegamenuContent>
    <MegamenuItem href="#">Documentation</MegamenuItem>
    <MegamenuItem href="#">Blog</MegamenuItem>
    <MegamenuItem href="#">Support</MegamenuItem>
  </MegamenuContent>
</Megamenu>`,
      render: `() => (
        <Megamenu>
          <MegamenuTrigger asChild>
            <Button variant="secondary">Resources</Button>
          </MegamenuTrigger>
          <MegamenuContent>
            <MegamenuItem href="#">Documentation</MegamenuItem>
            <MegamenuItem href="#">Blog</MegamenuItem>
            <MegamenuItem href="#">Support</MegamenuItem>
          </MegamenuContent>
        </Megamenu>
      )`,
      fullWidth: true,
    },
  ],
  menu: [
    {
      label: 'Account menu',
      description: 'Dropdown for profile and settings actions.',
      code: `<Menu>
  <MenuTrigger asChild><Button variant="secondary">Account</Button></MenuTrigger>
  <MenuContent>
    <MenuItem>Profile</MenuItem>
    <MenuItem>Settings</MenuItem>
    <MenuSeparator />
    <MenuItem>Log out</MenuItem>
  </MenuContent>
</Menu>`,
      render: `() => (
        <Menu>
          <MenuTrigger asChild>
            <Button variant="secondary">Account</Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuSeparator />
            <MenuItem>Log out</MenuItem>
          </MenuContent>
        </Menu>
      )`,
    },
    {
      label: 'Row actions',
      description: 'Context menu for a table or list row.',
      code: `<Menu>
  <MenuTrigger asChild><Button variant="ghost" size="sm">Actions</Button></MenuTrigger>
  <MenuContent>
    <MenuItem>Edit</MenuItem>
    <MenuItem>Duplicate</MenuItem>
    <MenuItem>Delete</MenuItem>
  </MenuContent>
</Menu>`,
      render: `() => (
        <Menu>
          <MenuTrigger asChild>
            <Button variant="ghost" size="sm">
              Actions
            </Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem>Edit</MenuItem>
            <MenuItem>Duplicate</MenuItem>
            <MenuItem>Delete</MenuItem>
          </MenuContent>
        </Menu>
      )`,
    },
    {
      label: 'Sort menu',
      description: 'Menu for changing list sort order.',
      code: `<Menu>
  <MenuTrigger asChild><Button variant="secondary">Sort by</Button></MenuTrigger>
  <MenuContent>
    <MenuItem>Newest</MenuItem>
    <MenuItem>Oldest</MenuItem>
    <MenuItem>Name</MenuItem>
  </MenuContent>
</Menu>`,
      render: `() => (
        <Menu>
          <MenuTrigger asChild>
            <Button variant="secondary">Sort by</Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem>Newest</MenuItem>
            <MenuItem>Oldest</MenuItem>
            <MenuItem>Name</MenuItem>
          </MenuContent>
        </Menu>
      )`,
    },
  ],
  navbar: [
    {
      label: 'App header',
      description: 'Top bar with logo and primary navigation links.',
      code: `<Navbar>
  <NavbarLogo>Z-UI</NavbarLogo>
  <NavbarContent>
    <NavbarItem><Link href="#">Docs</Link></NavbarItem>
    <NavbarItem><Link href="#">Components</Link></NavbarItem>
  </NavbarContent>
</Navbar>`,
      render: `() => (
        <Navbar style={{ width: '100%' }}>
          <NavbarLogo>Z-UI</NavbarLogo>
          <NavbarContent>
            <NavbarItem>
              <Link href="#">Docs</Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="#">Components</Link>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      )`,
      fullWidth: true,
    },
    {
      label: 'Marketing nav',
      description: 'Navbar for a landing page with product links.',
      code: `<Navbar>
  <NavbarLogo>Acme</NavbarLogo>
  <NavbarContent>
    <NavbarItem><Link href="#">Pricing</Link></NavbarItem>
    <NavbarItem><Link href="#">About</Link></NavbarItem>
  </NavbarContent>
</Navbar>`,
      render: `() => (
        <Navbar style={{ width: '100%' }}>
          <NavbarLogo>Acme</NavbarLogo>
          <NavbarContent>
            <NavbarItem>
              <Link href="#">Pricing</Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="#">About</Link>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      )`,
      fullWidth: true,
    },
    {
      label: 'Docs site',
      description: 'Navigation for a documentation site with foundations and components.',
      code: `<Navbar>
  <NavbarLogo>Design System</NavbarLogo>
  <NavbarContent>
    <NavbarItem><Link href="#">Foundations</Link></NavbarItem>
    <NavbarItem><Link href="#">Patterns</Link></NavbarItem>
  </NavbarContent>
</Navbar>`,
      render: `() => (
        <Navbar style={{ width: '100%' }}>
          <NavbarLogo>Design System</NavbarLogo>
          <NavbarContent>
            <NavbarItem>
              <Link href="#">Foundations</Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="#">Patterns</Link>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      )`,
      fullWidth: true,
    },
  ],
  'otp-input': [
    {
      label: 'Verification code',
      description: 'Six-digit code entry for two-factor authentication.',
      code: '<OTPInput length={6} aria-label="Verification code" />',
      render: '() => <OTPInput length={6} aria-label="Verification code" />',
    },
    {
      label: 'Short PIN',
      description: 'Four-digit PIN for quick device unlock.',
      code: '<OTPInput length={4} aria-label="PIN" />',
      render: '() => <OTPInput length={4} aria-label="PIN" />',
    },
    {
      label: 'Disabled',
      description: 'Read-only code display while resend is unavailable.',
      code: '<OTPInput length={6} disabled aria-label="Verification code" />',
      render: '() => <OTPInput length={6} disabled aria-label="Verification code" />',
    },
  ],
  pagination: [
    {
      label: 'Table pages',
      description: 'Navigate paginated search results.',
      code: `<Pagination>
  <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
  <PaginationItem><PaginationLink href="#" aria-current="page">2</PaginationLink></PaginationItem>
  <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
</Pagination>`,
      render: `() => (
        <Pagination>
          <PaginationItem>
            <PaginationLink href="#" aria-label="Previous page">‹</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" aria-current="page">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" aria-label="Next page">›</PaginationLink>
          </PaginationItem>
        </Pagination>
      )`,
      zuiImports: ['Pagination', 'PaginationEllipsis', 'PaginationItem', 'PaginationLink'],
    },
    {
      label: 'First page',
      description: 'Pagination at the start of a result set.',
      code: `<Pagination>
  <PaginationItem><PaginationLink href="#" aria-current="page">1</PaginationLink></PaginationItem>
  <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
</Pagination>`,
      render: `() => (
        <Pagination>
          <PaginationItem>
            <PaginationLink href="#" aria-current="page">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
        </Pagination>
      )`,
      zuiImports: ['Pagination', 'PaginationItem', 'PaginationLink'],
    },
    {
      label: 'Last page',
      description: 'Pagination near the end of a long list.',
      code: `<Pagination>
  <PaginationItem><PaginationLink href="#">9</PaginationLink></PaginationItem>
  <PaginationItem><PaginationLink href="#" aria-current="page">10</PaginationLink></PaginationItem>
</Pagination>`,
      render: `() => (
        <Pagination>
          <PaginationItem>
            <PaginationLink href="#" aria-label="Previous page">‹</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">9</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" aria-current="page">10</PaginationLink>
          </PaginationItem>
        </Pagination>
      )`,
      zuiImports: ['Pagination', 'PaginationItem', 'PaginationLink'],
    },
  ],
  popover: [
    {
      label: 'Help hint',
      description: 'Short contextual help anchored to a trigger.',
      code: `<Popover>
  <PopoverTrigger asChild><Button variant="ghost" size="sm">?</Button></PopoverTrigger>
  <PopoverContent>Shipping is free on orders over $50.</PopoverContent>
</Popover>`,
      render: `() => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm">
              ?
            </Button>
          </PopoverTrigger>
          <PopoverContent>Shipping is free on orders over $50.</PopoverContent>
        </Popover>
      )`,
    },
    {
      label: 'Date picker anchor',
      description: 'Popover for picking a date beside an input.',
      code: `<Popover>
  <PopoverTrigger asChild><Button variant="secondary">Pick date</Button></PopoverTrigger>
  <PopoverContent>Select a delivery date.</PopoverContent>
</Popover>`,
      render: `() => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary">Pick date</Button>
          </PopoverTrigger>
          <PopoverContent>Select a delivery date.</PopoverContent>
        </Popover>
      )`,
    },
    {
      label: 'Share options',
      description: 'Popover with quick share actions.',
      code: `<Popover>
  <PopoverTrigger asChild><Button variant="primary">Share</Button></PopoverTrigger>
  <PopoverContent>Copy link or invite teammates.</PopoverContent>
</Popover>`,
      render: `() => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="primary">Share</Button>
          </PopoverTrigger>
          <PopoverContent>Copy link or invite teammates.</PopoverContent>
        </Popover>
      )`,
    },
  ],
  progress: [
    {
      label: 'Upload progress',
      description: 'Determinate bar while a file uploads.',
      code: '<Progress value={45} aria-label="Upload progress" />',
      render: '() => <Progress value={45} aria-label="Upload progress" />',
    },
    {
      label: 'Indeterminate',
      description: 'Loading state when duration is unknown.',
      code: '<Progress indeterminate aria-label="Loading" />',
      render: '() => <Progress indeterminate aria-label="Loading" />',
    },
    {
      label: 'Profile completion',
      description: 'Progress toward completing an onboarding checklist.',
      code: '<Progress value={80} aria-label="Profile completion" />',
      render: '() => <Progress value={80} aria-label="Profile completion" />',
    },
  ],
  'radial-progress': [
    {
      label: 'Goal tracker',
      description: 'Circular progress for a daily step goal.',
      code: '<RadialProgress value={65} aria-label="Daily goal" />',
      render: '() => <RadialProgress value={65} aria-label="Daily goal" />',
    },
    {
      label: 'Indeterminate',
      description: 'Spinner-style radial progress for async tasks.',
      code: '<RadialProgress indeterminate aria-label="Loading" />',
      render: '() => <RadialProgress indeterminate aria-label="Loading" />',
    },
    {
      label: 'Compact metric',
      description: 'Small radial indicator on a dashboard card.',
      code: '<RadialProgress value={92} size="sm" aria-label="Uptime" />',
      render: '() => <RadialProgress value={92} size="sm" aria-label="Uptime" />',
    },
  ],
  'radio-group': [
    {
      label: 'Plan selection',
      description: 'Choose one subscription plan.',
      code: `<RadioGroup defaultValue="pro" aria-label="Plan">
  <label><RadioGroupItem value="free" /> Free</label>
  <label><RadioGroupItem value="pro" /> Pro</label>
</RadioGroup>`,
      render: `() => (
        <RadioGroup defaultValue="pro" aria-label="Plan">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RadioGroupItem value="free" /> Free
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RadioGroupItem value="pro" /> Pro
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RadioGroupItem value="team" /> Team
          </label>
        </RadioGroup>
      )`,
    },
    {
      label: 'Shipping method',
      description: 'Pick one delivery option at checkout.',
      code: `<RadioGroup defaultValue="standard" aria-label="Shipping">
  <label><RadioGroupItem value="standard" /> Standard (5–7 days)</label>
  <label><RadioGroupItem value="express" /> Express (2 days)</label>
</RadioGroup>`,
      render: `() => (
        <RadioGroup defaultValue="standard" aria-label="Shipping">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RadioGroupItem value="standard" /> Standard (5–7 days)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RadioGroupItem value="express" /> Express (2 days)
          </label>
        </RadioGroup>
      )`,
    },
    {
      label: 'Disabled group',
      description: 'Read-only selection while permissions are loading.',
      code: '<RadioGroup disabled defaultValue="a" aria-label="Options">...</RadioGroup>',
      render: `() => (
        <RadioGroup disabled defaultValue="a" aria-label="Options">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RadioGroupItem value="a" /> Option A
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RadioGroupItem value="b" /> Option B
          </label>
        </RadioGroup>
      )`,
    },
  ],
  'range-slider': [
    {
      label: 'Price range',
      description: 'Filter products by minimum and maximum price.',
      code: '<RangeSlider min={0} max={500} defaultValue={[50, 200]} aria-label="Price range" />',
      render: '() => <RangeSlider min={0} max={500} defaultValue={[50, 200]} aria-label="Price range" />',
    },
    {
      label: 'Volume control',
      description: 'Dual-handle slider for min and max volume.',
      code: '<RangeSlider min={0} max={100} defaultValue={[20, 80]} aria-label="Volume" />',
      render: '() => <RangeSlider min={0} max={100} defaultValue={[20, 80]} aria-label="Volume" />',
    },
    {
      label: 'Disabled',
      description: 'Inactive range while filters are unavailable.',
      code: '<RangeSlider disabled min={0} max={100} defaultValue={[25, 75]} aria-label="Range" />',
      render: '() => <RangeSlider disabled min={0} max={100} defaultValue={[25, 75]} aria-label="Range" />',
    },
  ],
  rating: [
    {
      label: 'Product review',
      description: 'Star rating for a product review form.',
      code: '<Rating value={4} onValueChange={setValue} aria-label="Rating" />',
      render: '() => <Rating value={4} onValueChange={() => {}} aria-label="Rating" />',
    },
    {
      label: 'Read-only score',
      description: 'Display average rating without editing.',
      code: '<Rating value={4.5} readOnly aria-label="Average rating" />',
      render: '() => <Rating value={4.5} readOnly aria-label="Average rating" />',
    },
    {
      label: 'Custom scale',
      description: 'Ten-point satisfaction survey.',
      code: '<Rating value={8} max={10} onValueChange={setValue} aria-label="Satisfaction" />',
      render: '() => <Rating value={8} max={10} onValueChange={() => {}} aria-label="Satisfaction" />',
    },
  ],
  select: [
    {
      label: 'Fruit picker',
      description: 'Single selection from a short list.',
      code: `<Select defaultValue="apple">
  <SelectTrigger aria-label="Fruit"><SelectValue placeholder="Select a fruit" /></SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
  </SelectContent>
</Select>`,
      render: `() => (
        <Select defaultValue="apple">
          <SelectTrigger aria-label="Fruit">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
      )`,
    },
    {
      label: 'Country field',
      description: 'Select inside a labeled form field.',
      code: `<Field>
  <FieldLabel>Country</FieldLabel>
  <Select defaultValue="us">
    <SelectTrigger aria-label="Country"><SelectValue /></SelectTrigger>
    <SelectContent>
      <SelectItem value="us">United States</SelectItem>
      <SelectItem value="ca">Canada</SelectItem>
    </SelectContent>
  </Select>
</Field>`,
      render: `() => (
        <Field style={{ width: '100%', maxWidth: '20rem' }}>
          <FieldLabel>Country</FieldLabel>
          <Select defaultValue="us">
            <SelectTrigger aria-label="Country">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      )`,
      zuiImports: ['Field', 'FieldLabel'],
    },
    {
      label: 'Disabled',
      description: 'Read-only select while form data is loading.',
      code: '<Select disabled defaultValue="apple">...</Select>',
      render: `() => (
        <Select disabled defaultValue="apple">
          <SelectTrigger aria-label="Fruit">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
      )`,
    },
  ],
  separator: [
    {
      label: 'Section divider',
      description: 'Horizontal rule between content blocks.',
      code: '<Separator />',
      render: '() => <Separator />',
    },
    {
      label: 'Toolbar divider',
      description: 'Vertical separator between action groups.',
      code: '<Separator orientation="vertical" />',
      render: `() => (
        <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center', height: '2rem' }}>
          <span>Edit</span>
          <Separator orientation="vertical" />
          <span>Share</span>
        </Stack>
      )`,
      zuiImports: ['Stack'],
    },
    {
      label: 'Sidebar sections',
      description: 'Divide navigation groups in a sidebar.',
      code: '<Separator />',
      render: `() => (
        <Stack gap="sm" style={{ width: '100%', maxWidth: '12rem' }}>
          <span>General</span>
          <Separator />
          <span>Account</span>
        </Stack>
      )`,
      zuiImports: ['Stack'],
    },
  ],
  skeleton: [
    {
      label: 'Text placeholder',
      description: 'Loading placeholder for body copy.',
      code: '<Skeleton text="body" width={240} />',
      render: '() => <Skeleton text="body" width={240} />',
    },
    {
      label: 'Avatar loading',
      description: 'Circular skeleton while profile data loads.',
      code: '<Skeleton radius="circle" width={40} height={40} />',
      render: '() => <Skeleton radius="circle" width={40} height={40} />',
    },
    {
      label: 'Card loading',
      description: 'Skeleton layout matching a content card.',
      code: `<Stack gap="sm">
  <Skeleton text="title" width={180} />
  <Skeleton text="body" width={280} />
  <Skeleton radius="control" width={120} height={32} />
</Stack>`,
      render: `() => (
        <Stack gap="sm" style={{ width: '100%', maxWidth: '20rem' }}>
          <Skeleton text="title" width={180} />
          <Skeleton text="body" width={280} />
          <Skeleton radius="control" width={120} height={32} />
        </Stack>
      )`,
      zuiImports: ['Stack'],
    },
  ],
  spinner: [
    {
      label: 'Inline loading',
      description: 'Small spinner beside button text.',
      code: '<Spinner size="sm" aria-label="Loading" />',
      render: '() => <Spinner size="sm" aria-label="Loading" />',
    },
    {
      label: 'Page loading',
      description: 'Medium spinner centered in a content area.',
      code: '<Spinner aria-label="Loading page" />',
      render: '() => <Spinner aria-label="Loading page" />',
    },
    {
      label: 'Button loading',
      description: 'Spinner paired with a disabled submit button.',
      code: `<Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
  <Spinner size="sm" aria-label="Saving" />
  <span>Saving...</span>
</Stack>`,
      render: `() => (
        <Stack direction="horizontal" gap="sm" style={{ alignItems: 'center' }}>
          <Spinner size="sm" aria-label="Saving" />
          <span>Saving...</span>
        </Stack>
      )`,
      zuiImports: ['Stack'],
    },
  ],
  stack: [
    {
      label: 'Vertical form',
      description: 'Stack form fields with consistent vertical spacing.',
      code: `<Stack gap="md">
  <TextField aria-label="Name" placeholder="Name" />
  <TextField aria-label="Email" placeholder="Email" />
</Stack>`,
      render: `() => (
        <Stack gap="md" style={{ width: '100%', maxWidth: '20rem' }}>
          <TextField aria-label="Name" placeholder="Name" />
          <TextField aria-label="Email" placeholder="Email" />
        </Stack>
      )`,
      zuiImports: ['TextField'],
    },
    {
      label: 'Button row',
      description: 'Horizontal stack for dialog or form footer actions.',
      code: `<Stack direction="horizontal" gap="sm" style={{ justifyContent: 'flex-end' }}>
  <Button variant="ghost">Cancel</Button>
  <Button variant="primary">Save</Button>
</Stack>`,
      render: `() => (
        <Stack direction="horizontal" gap="sm" style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Save</Button>
        </Stack>
      )`,
      fullWidth: true,
    },
    {
      label: 'Card actions',
      description: 'Vertical stack of secondary actions in a panel.',
      code: `<Stack gap="sm">
  <Button variant="secondary">Export</Button>
  <Button variant="ghost">Archive</Button>
</Stack>`,
      render: `() => (
        <Stack gap="sm" style={{ width: '100%', maxWidth: '12rem' }}>
          <Button variant="secondary">Export</Button>
          <Button variant="ghost">Archive</Button>
        </Stack>
      )`,
    },
  ],
  status: [
    {
      label: 'Online',
      description: 'Positive connection status on a dashboard.',
      code: '<Status tone="success" label="Online" />',
      render: '() => <Status tone="success" label="Online" />',
    },
    {
      label: 'Degraded',
      description: 'Warning status during partial outage.',
      code: '<Status tone="warning" label="Degraded" size="sm" />',
      render: '() => <Status tone="warning" label="Degraded" size="sm" />',
    },
    {
      label: 'Offline',
      description: 'Danger status when a service is unavailable.',
      code: '<Status tone="danger" label="Offline" />',
      render: '() => <Status tone="danger" label="Offline" />',
    },
  ],
  steps: [
    {
      label: 'Checkout flow',
      description: 'Multi-step progress through checkout.',
      code: `<Steps currentStep={2}>
  <Step step={1}><StepIndicator step={1} /><StepTitle>Cart</StepTitle></Step>
  <Step step={2}><StepIndicator step={2} /><StepTitle>Shipping</StepTitle></Step>
  <Step step={3}><StepIndicator step={3} /><StepTitle>Payment</StepTitle></Step>
</Steps>`,
      render: `() => (
        <Steps currentStep={2}>
          <Step step={1}>
            <StepIndicator step={1} />
            <StepTitle>Cart</StepTitle>
          </Step>
          <Step step={2}>
            <StepIndicator step={2} />
            <StepTitle>Shipping</StepTitle>
          </Step>
          <Step step={3}>
            <StepIndicator step={3} />
            <StepTitle>Payment</StepTitle>
          </Step>
        </Steps>
      )`,
      zuiImports: ['Step', 'StepDescription', 'StepIndicator', 'Steps', 'StepTitle'],
    },
    {
      label: 'Onboarding',
      description: 'Guide new users through account setup.',
      code: `<Steps currentStep={1}>
  <Step step={1}><StepIndicator step={1} /><StepTitle>Profile</StepTitle><StepDescription>Create your account</StepDescription></Step>
</Steps>`,
      render: `() => (
        <Steps currentStep={1}>
          <Step step={1}>
            <StepIndicator step={1} />
            <StepTitle>Profile</StepTitle>
            <StepDescription>Create your account</StepDescription>
          </Step>
          <Step step={2}>
            <StepIndicator step={2} />
            <StepTitle>Team</StepTitle>
            <StepDescription>Invite collaborators</StepDescription>
          </Step>
          <Step step={3}>
            <StepIndicator step={3} />
            <StepTitle>Done</StepTitle>
            <StepDescription>Start using the app</StepDescription>
          </Step>
        </Steps>
      )`,
      zuiImports: ['Step', 'StepDescription', 'StepIndicator', 'Steps', 'StepTitle'],
    },
    {
      label: 'Completed',
      description: 'All steps finished in a workflow.',
      code: '<Steps currentStep={3}>...</Steps>',
      render: `() => (
        <Steps currentStep={3}>
          <Step step={1}>
            <StepIndicator step={1} />
            <StepTitle>Draft</StepTitle>
          </Step>
          <Step step={2}>
            <StepIndicator step={2} />
            <StepTitle>Review</StepTitle>
          </Step>
          <Step step={3}>
            <StepIndicator step={3} />
            <StepTitle>Publish</StepTitle>
          </Step>
        </Steps>
      )`,
      zuiImports: ['Step', 'StepIndicator', 'Steps', 'StepTitle'],
    },
  ],
  switch: [
    {
      label: 'Notifications',
      description: 'Toggle email notifications in settings.',
      code: '<Switch aria-label="Email notifications" />',
      render: '() => <Switch aria-label="Email notifications" />',
    },
    {
      label: 'Enabled',
      description: 'Switch turned on for an active feature.',
      code: '<Switch checked aria-label="Dark mode" />',
      render: '() => <Switch checked aria-label="Dark mode" />',
    },
    {
      label: 'Invalid',
      description: 'Validation error on a required toggle.',
      code: '<Switch invalid aria-label="Accept terms" />',
      render: '() => <Switch invalid aria-label="Accept terms" />',
    },
  ],
  table: [
    {
      label: 'Invoice list',
      description: 'Basic data table with caption and columns.',
      code: `<Table>
  <TableCaption>Recent invoices</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
      render: `() => (
        <Table>
          <TableCaption>Recent invoices</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>INV002</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>$150.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )`,
    },
    {
      label: 'User directory',
      description: 'Table listing team members and roles.',
      code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Jane Doe</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
      render: `() => (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Jane Doe</TableCell>
              <TableCell>Admin</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Alex Chen</TableCell>
              <TableCell>Editor</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )`,
    },
    {
      label: 'Status table',
      description: 'Table rows with status badges.',
      code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Invoice</TableCell>
      <TableCell>Paid</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
      render: `() => (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Invoice</TableCell>
              <TableCell>Paid</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )`,
      fullWidth: true,
    },
  ],
  tabs: [
    {
      label: 'Account settings',
      description: 'Switch between account and password panels.',
      code: `<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings</TabsContent>
  <TabsContent value="password">Password settings</TabsContent>
</Tabs>`,
      render: `() => (
        <Tabs defaultValue="account" style={{ width: '100%', maxWidth: '24rem' }}>
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Account settings</TabsContent>
          <TabsContent value="password">Password settings</TabsContent>
        </Tabs>
      )`,
      zuiImports: ['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent'],
    },
    {
      label: 'Dashboard views',
      description: 'Tabs for switching chart time ranges.',
      code: `<Tabs defaultValue="week">
  <TabsList>
    <TabsTrigger value="week">Week</TabsTrigger>
    <TabsTrigger value="month">Month</TabsTrigger>
  </TabsList>
</Tabs>`,
      render: `() => (
        <Tabs defaultValue="week">
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      )`,
      zuiImports: ['Tabs', 'TabsList', 'TabsTrigger'],
    },
    {
      label: 'Documentation',
      description: 'Tabs for API reference sections.',
      code: `<Tabs defaultValue="usage">
  <TabsList>
    <TabsTrigger value="usage">Usage</TabsTrigger>
    <TabsTrigger value="api">API</TabsTrigger>
  </TabsList>
  <TabsContent value="usage">How to use this component.</TabsContent>
  <TabsContent value="api">Props and types.</TabsContent>
</Tabs>`,
      render: `() => (
        <Tabs defaultValue="usage" style={{ width: '100%', maxWidth: '24rem' }}>
          <TabsList>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>
          <TabsContent value="usage">How to use this component.</TabsContent>
          <TabsContent value="api">Props and types.</TabsContent>
        </Tabs>
      )`,
      zuiImports: ['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent'],
    },
  ],
  'text-field': [
    {
      label: 'Name input',
      description: 'Single-line text field with placeholder.',
      code: '<TextField placeholder="Enter your name" aria-label="Name" />',
      render: '() => <TextField placeholder="Enter your name" aria-label="Name" />',
    },
    {
      label: 'Email with error',
      description: 'Invalid text field after form validation.',
      code: '<TextField type="email" invalid aria-label="Email" placeholder="you@example.com" />',
      render: '() => <TextField type="email" invalid aria-label="Email" placeholder="you@example.com" />',
    },
    {
      label: 'Labeled field',
      description: 'TextField composed inside a Field with label and helper text.',
      code: `<Field>
  <FieldLabel>Username</FieldLabel>
  <TextField aria-label="Username" placeholder="jane_doe" />
  <FieldDescription>Visible on your public profile.</FieldDescription>
</Field>`,
      render: `() => (
        <Field style={{ width: '100%', maxWidth: '24rem' }}>
          <FieldLabel>Username</FieldLabel>
          <TextField aria-label="Username" placeholder="jane_doe" />
          <FieldDescription>Visible on your public profile.</FieldDescription>
        </Field>
      )`,
      zuiImports: ['Field', 'FieldLabel', 'FieldDescription'],
    },
  ],
  textarea: [
    {
      label: 'Comment box',
      description: 'Multi-line input for user feedback.',
      code: '<Textarea placeholder="Leave a comment..." aria-label="Comment" />',
      render: '() => <Textarea placeholder="Leave a comment..." aria-label="Comment" />',
    },
    {
      label: 'Bio field',
      description: 'Longer profile description with helper text.',
      code: `<Field>
  <FieldLabel>Bio</FieldLabel>
  <Textarea aria-label="Bio" placeholder="Tell us about yourself" />
  <FieldDescription>Max 280 characters.</FieldDescription>
</Field>`,
      render: `() => (
        <Field style={{ width: '100%', maxWidth: '24rem' }}>
          <FieldLabel>Bio</FieldLabel>
          <Textarea aria-label="Bio" placeholder="Tell us about yourself" />
          <FieldDescription>Max 280 characters.</FieldDescription>
        </Field>
      )`,
      zuiImports: ['Field', 'FieldLabel', 'FieldDescription'],
    },
    {
      label: 'Disabled',
      description: 'Read-only textarea while content is locked.',
      code: '<Textarea disabled value="Archived note" aria-label="Note" />',
      render: '() => <Textarea disabled value="Archived note" aria-label="Note" />',
    },
  ],
  'theme-controller': [
    {
      label: 'App settings',
      description: 'Let users switch between light, dark, and system theme.',
      code: '<ThemeController />',
      render: '() => <ThemeController />',
    },
    {
      label: 'Header control',
      description: 'Theme toggle in a site header or settings drawer.',
      code: '<ThemeController aria-label="Theme" />',
      render: '() => <ThemeController aria-label="Theme" />',
    },
    {
      label: 'Preferences panel',
      description: 'Theme selector grouped with other appearance settings.',
      code: `<Stack gap="sm">
  <span>Appearance</span>
  <ThemeController />
</Stack>`,
      render: `() => (
        <Stack gap="sm" style={{ alignItems: 'flex-start' }}>
          <span>Appearance</span>
          <ThemeController />
        </Stack>
      )`,
      zuiImports: ['Stack'],
    },
  ],
  timeline: [
    {
      label: 'Order history',
      description: 'Vertical timeline of shipment events.',
      code: `<Timeline>
  <TimelineItem title="Shipped" description="Left warehouse" />
  <TimelineItem title="In transit" description="Arriving tomorrow" />
</Timeline>`,
      render: `() => (
        <Timeline style={{ width: '100%', maxWidth: '24rem' }}>
          <TimelineItem title="Shipped" description="Left warehouse" />
          <TimelineItem title="In transit" description="Arriving tomorrow" />
          <TimelineItem title="Delivered" description="Signed by recipient" />
        </Timeline>
      )`,
      zuiImports: ['Timeline', 'TimelineItem'],
    },
    {
      label: 'Project milestones',
      description: 'Track progress through a project lifecycle.',
      code: `<Timeline>
  <TimelineItem title="Kickoff" description="Project started" />
  <TimelineItem title="Beta" description="Released to testers" />
</Timeline>`,
      render: `() => (
        <Timeline style={{ width: '100%', maxWidth: '24rem' }}>
          <TimelineItem title="Kickoff" description="Project started" />
          <TimelineItem title="Beta" description="Released to testers" />
          <TimelineItem title="Launch" description="General availability" />
        </Timeline>
      )`,
      zuiImports: ['Timeline', 'TimelineItem'],
    },
    {
      label: 'Horizontal',
      description: 'Horizontal timeline for compact dashboards.',
      code: '<Timeline orientation="horizontal">...</Timeline>',
      render: `() => (
        <Timeline orientation="horizontal" style={{ width: '100%' }}>
          <TimelineItem title="Plan" />
          <TimelineItem title="Build" />
          <TimelineItem title="Ship" />
        </Timeline>
      )`,
      zuiImports: ['Timeline', 'TimelineItem'],
      fullWidth: true,
    },
  ],
  toast: [
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
      render: `() => (
        <ToastProvider>
          <Toast open>
            <ToastTitle>Scheduled</ToastTitle>
            <ToastDescription>Your meeting starts in 10 minutes.</ToastDescription>
            <ToastAction altText="Undo">Undo</ToastAction>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      )`,
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
      render: `() => (
        <ToastProvider>
          <Toast open>
            <ToastTitle>Saved</ToastTitle>
            <ToastDescription>Your profile was updated.</ToastDescription>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      )`,
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
      render: `() => (
        <ToastProvider>
          <Toast open>
            <ToastTitle>Upload failed</ToastTitle>
            <ToastDescription>Try again or check your connection.</ToastDescription>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      )`,
    },
  ],
  tooltip: [
    {
      label: 'Icon hint',
      description: 'Short hint on hover for an icon button.',
      code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild><Button variant="ghost" size="sm">?</Button></TooltipTrigger>
    <TooltipContent>Search</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
      render: `() => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm">?</Button>
            </TooltipTrigger>
            <TooltipContent>Search</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )`,
      zuiImports: ['TooltipContent', 'TooltipProvider', 'TooltipTrigger'],
    },
    {
      label: 'Truncated label',
      description: 'Reveal full text for a truncated table cell.',
      code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild><span>Quarterly revenue...</span></TooltipTrigger>
    <TooltipContent>Quarterly revenue report Q3 2025</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
      render: `() => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>Quarterly revenue...</span>
            </TooltipTrigger>
            <TooltipContent>Quarterly revenue report Q3 2025</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )`,
      zuiImports: ['TooltipContent', 'TooltipProvider', 'TooltipTrigger'],
    },
    {
      label: 'Disabled control',
      description: 'Explain why an action is unavailable.',
      code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild><span><Button disabled>Publish</Button></span></TooltipTrigger>
    <TooltipContent>Upgrade to publish</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
      render: `() => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button disabled>Publish</Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>Upgrade to publish</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )`,
      zuiImports: ['TooltipContent', 'TooltipProvider', 'TooltipTrigger'],
    },
  ],
  validator: [
    {
      label: 'Username check',
      description: 'Inline validation on a text field.',
      code: `<Validator value={value} validate={(v) => v.length < 3 ? 'Too short' : undefined}>
  <TextField aria-label="Username" />
  <ValidatorMessage />
</Validator>`,
      render: `() => (
        <Validator value="ab" validate={(v) => (v.length < 3 ? 'Too short' : undefined)} defaultTouched>
          <TextField value="ab" onChange={() => {}} aria-label="Username" style={{ width: '100%', maxWidth: '20rem' }} />
          <ValidatorMessage />
        </Validator>
      )`,
    },
    {
      label: 'Valid input',
      description: 'No error when validation passes.',
      code: `<Validator value={value} validate={(v) => v.length < 3 ? 'Too short' : undefined}>
  <TextField aria-label="Username" />
  <ValidatorMessage />
</Validator>`,
      render: `() => (
        <Validator value="jane" validate={(v) => (v.length < 3 ? 'Too short' : undefined)} defaultTouched>
          <TextField value="jane" onChange={() => {}} aria-label="Username" style={{ width: '100%', maxWidth: '20rem' }} />
          <ValidatorMessage />
        </Validator>
      )`,
    },
    {
      label: 'Signup form',
      description: 'Validator wrapped field in a registration form.',
      code: `<Field>
  <FieldLabel>Username</FieldLabel>
  <Validator value={value} validate={validateUsername}>
    <TextField aria-label="Username" />
    <ValidatorMessage />
  </Validator>
</Field>`,
      render: `() => (
        <Field style={{ width: '100%', maxWidth: '20rem' }}>
          <FieldLabel>Username</FieldLabel>
          <Validator value="" validate={(v) => (v.length < 3 ? 'Too short' : undefined)} defaultTouched>
            <TextField value="" onChange={() => {}} aria-label="Username" />
            <ValidatorMessage />
          </Validator>
        </Field>
      )`,
      zuiImports: ['Field', 'FieldLabel'],
    },
  ],
};

// code-block uses doc.code() for first two — handled specially below
EXAMPLES['code-block'] = [
  {
    label: 'Single line',
    description: 'Compact inline chip for token names and short identifiers.',
    code: '<CodeBlock variant="single">--z-color-text-primary</CodeBlock>',
    render: '() => <CodeBlock variant="single">--z-color-text-primary</CodeBlock>',
  },
  {
    label: 'Multi line',
    description: 'Block sample with an optional language label.',
    code: `<CodeBlock
  variant="multi"
  language="tsx"
  code={\`import { Button } from '@z-ux/ui';\`}
/>`,
    render: `() => (
        <div style={{ width: '100%', maxWidth: '28rem' }}>
          <CodeBlock
            variant="multi"
            language="tsx"
            code={\`import { Button } from '@z-ux/ui';\`}
          />
        </div>
      )`,
  },
  {
    label: 'Token reference',
    description: 'Inline code for a spacing token in documentation.',
    code: '<CodeBlock variant="single">--z-spacing-stack-component</CodeBlock>',
    render: '() => <CodeBlock variant="single">--z-spacing-stack-component</CodeBlock>',
  },
];

function hasPlaceholders(content) {
  return PLACEHOLDER_DESCRIPTIONS.some((phrase) => content.includes(phrase));
}

function extractSlug(content) {
  return content.match(/slug:\s*'([^']+)'/)?.[1] ?? null;
}

function findBracketBlock(content, openIndex) {
  let depth = 0;
  for (let i = openIndex; i < content.length; i++) {
    if (content[i] === '[') depth++;
    else if (content[i] === ']') {
      depth--;
      if (depth === 0) return { start: openIndex, end: i + 1 };
    }
  }
  return null;
}

function findExamplesRange(content) {
  const docAssign = content.indexOf('doc.examples = [');
  if (docAssign !== -1) {
    const open = content.indexOf('[', docAssign);
    const block = findBracketBlock(content, open);
    if (block) return { ...block, assignStart: docAssign, prefix: 'doc.examples = ', isIife: true };
  }

  const inline = content.match(/\n\s*examples:\s*\[/);
  if (inline) {
    const assignStart = inline.index + 1;
    const open = content.indexOf('[', inline.index);
    const block = findBracketBlock(content, open);
    if (block) return { ...block, assignStart, prefix: 'examples: ', isIife: false };
  }

  return null;
}

function escapeForSingleQuotedString(value) {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function formatCodeField(code) {
  if (code.includes('\n') || code.includes('`')) {
    const escaped = code.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    return `\`${escaped}\``;
  }
  return `'${escapeForSingleQuotedString(code)}'`;
}

function formatExample(example, baseIndent) {
  const i = baseIndent;
  const lines = [
    `${i}{`,
    `${i}  label: '${escapeForSingleQuotedString(example.label)}',`,
    `${i}  description: '${escapeForSingleQuotedString(example.description)}',`,
    `${i}  code: ${formatCodeField(example.code)},`,
    `${i}  render: ${example.render},`,
  ];
  if (example.fullWidth) {
    lines.push(`${i}  fullWidth: true,`);
  }
  lines.push(`${i}},`);
  return lines.join('\n');
}

function formatExamplesArray(examples, assignmentPrefix) {
  const body = examples.map((ex) => formatExample(ex, '    ')).join('\n');
  return `${assignmentPrefix}[\n${body}\n  ]`;
}

function parseNamedImports(content, moduleName) {
  const re = new RegExp(`import\\s*\\{([^}]+)\\}\\s*from\\s*'${moduleName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`);
  const match = content.match(re);
  if (!match) return [];
  return match[1]
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
}

function ensureReactImport(content, names) {
  if (names.length === 0) return content;
  const existing = parseNamedImports(content, 'react');
  const missing = names.filter((name) => !existing.includes(name));
  if (missing.length === 0) return content;

  const merged = [...new Set([...existing, ...missing])].sort();
  const importLine = `import { ${merged.join(', ')} } from 'react';`;

  if (content.includes("from 'react'")) {
    return content.replace(/import\s*\{[^}]+\}\s*from\s*'react';/, importLine);
  }

  const firstImport = content.indexOf('import ');
  if (firstImport === -1) return `${importLine}\n${content}`;
  return `${content.slice(0, firstImport)}${importLine}\n${content.slice(firstImport)}`;
}

function ensureZuiImports(content, names) {
  if (names.length === 0) return content;

  const importBlocks = [...content.matchAll(/import\s*\{([^}]+)\}\s*from\s*'@z-ui\/react';/g)];
  if (importBlocks.length === 0) return content;

  const existing = importBlocks.flatMap((match) =>
    match[1]
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean),
  );
  const missing = names.filter((name) => !existing.includes(name));
  if (missing.length === 0) return content;

  const merged = [...new Set([...existing, ...missing])].sort();
  const importLine = `import {\n  ${merged.join(',\n  ')},\n} from '@z-ux/ui';`;
  let updated = content.replace(importBlocks[0][0], importLine);

  for (let i = 1; i < importBlocks.length; i++) {
    updated = updated.replace(importBlocks[i][0], '');
  }

  return updated.replace(/\n{3,}/g, '\n\n');
}

function collectImports(examples) {
  const reactImports = new Set();
  const zuiImports = new Set();
  const zuiTypeImports = new Set();
  for (const example of examples) {
    for (const name of example.reactImports ?? []) reactImports.add(name);
    for (const name of example.zuiImports ?? []) zuiImports.add(name);
    for (const name of example.zuiTypeImports ?? []) zuiTypeImports.add(name);
  }
  return {
    reactImports: [...reactImports],
    zuiImports: [...zuiImports].filter((name) => !zuiTypeImports.has(name)),
    zuiTypeImports: [...zuiTypeImports],
  };
}

function ensureZuiTypeImports(content, names) {
  if (names.length === 0) return content;

  const typeImport = content.match(
    /import\s*\{([^}]*type\s+AccessibilityPreferences[^}]*)\}\s*from\s*'@z-ui\/react';/,
  );
  if (typeImport) return content;

  const valueImport = content.match(/import\s*\{([^}]+)\}\s*from\s*'@z-ui\/react';/);
  if (!valueImport) return content;

  const parts = valueImport[1]
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
  const typeParts = names.map((name) => `type ${name}`);
  const merged = [...parts, ...typeParts.filter((part) => !parts.includes(part))];
  const importLine = `import { ${merged.join(', ')} } from '@z-ux/ui';`;
  return content.replace(valueImport[0], importLine);
}

function patchFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const slug = extractSlug(content);
  if (!slug) throw new Error(`Could not parse slug in ${filePath}`);

  if (SKIP_SLUGS.has(slug)) {
    return { slug, patched: false, reason: 'skipped-good' };
  }

  if (!EXAMPLES[slug]) {
    throw new Error(`Missing example definitions for slug: ${slug}`);
  }

  if (!hasPlaceholders(content)) {
    return { slug, patched: false, reason: 'no-placeholders' };
  }

  const range = findExamplesRange(content);
  if (!range) throw new Error(`Could not find examples block in ${slug}`);

  const examples = EXAMPLES[slug];
  if (examples.length < 3) {
    throw new Error(`Expected at least 3 examples for ${slug}, got ${examples.length}`);
  }

  const assignmentPrefix = range.prefix;
  const formatted = formatExamplesArray(examples, assignmentPrefix);
  const after = content.slice(range.end);
  const terminator = range.isIife ? (after.startsWith(';') ? '' : ';') : after.startsWith(',') ? '' : ',';

  let updated = content.slice(0, range.assignStart) + formatted + terminator + after;

  const { reactImports, zuiImports, zuiTypeImports } = collectImports(examples);
  updated = ensureReactImport(updated, reactImports);
  updated = ensureZuiImports(updated, zuiImports);
  updated = ensureZuiTypeImports(updated, zuiTypeImports);

  if (updated !== content) {
    fs.writeFileSync(filePath, updated);
    return { slug, patched: true };
  }

  return { slug, patched: false, reason: 'unchanged' };
}

function main() {
  const files = fs
    .readdirSync(docsDir)
    .filter((file) => file.endsWith('.docs.tsx'))
    .sort();

  if (files.length < 51) {
    throw new Error(`Expected at least 51 docs files, found ${files.length}`);
  }

  const results = [];
  for (const file of files) {
    results.push(patchFile(path.join(docsDir, file)));
  }

  const patched = results.filter((result) => result.patched);
  const skipped = results.filter((result) => !result.patched);

  console.log(`patch-examples: patched ${patched.length} of ${files.length} files`);
  for (const result of patched) {
    console.log(`  ✓ ${result.slug}`);
  }
  for (const result of skipped) {
    console.log(`  - ${result.slug} (${result.reason})`);
  }

  return patched.length;
}

const patchedCount = main();
process.exit(0);
