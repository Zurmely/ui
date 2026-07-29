import { useState, type ReactNode } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  Avatar,
  Badge,
  BreadcrumbItem,
  BreadcrumbLink,
  Breadcrumbs,
  BreadcrumbSeparator,
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FileInput,
  Filter,
  FilterItem,
  FloatingActionButton,
  IconButton,
  Indicator,
  IndicatorItem,
  Link,
  ListItem,
  ListItemIcon,
  Megamenu,
  MegamenuContent,
  MegamenuItem,
  MegamenuTrigger,
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
  Navbar,
  NavbarLogo,
  NavbarContent,
  NavbarItem,
  OTPInput,
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadialProgress,
  RadioGroup,
  RadioGroupItem,
  RangeSlider,
  Rating,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  Spinner,
  Stack,
  Status,
  Step,
  StepDescription,
  StepIndicator,
  Steps,
  StepTitle,
  Switch,
  type Size,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TextField,
  Textarea,
  Toolbar,
  ThemeController,
  AccessibilityController,
  Timeline,
  TimelineItem,
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Validator,
  ValidatorMessage,
  readStoredTheme,
  type ThemePreference,
  type AccessibilityPreferences,
} from '@z-ui/react';
import TokensPreview from './TokensPreview';

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3 8.5 10 3l7 5.5V16a1 1 0 0 1-1 1h-4v-5H8v5H4a1 1 0 0 1-1-1V8.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="preview__section">
      <h2 className="preview__section-title">{title}</h2>
      {children}
    </section>
  );
}

const TEXT_ROLES = [
  { role: 'display', label: 'Display', sample: 'Hero headline' },
  { role: 'h1', label: 'Heading 1', sample: 'Page title' },
  { role: 'h2', label: 'Heading 2', sample: 'Section title' },
  { role: 'h3', label: 'Heading 3', sample: 'Subsection title' },
  { role: 'h4', label: 'Heading 4', sample: 'Card title' },
  { role: 'h5', label: 'Heading 5', sample: 'Minor heading' },
  { role: 'h6', label: 'Heading 6', sample: 'Smallest heading' },
] as const;

const UI_TEXT_ROLES = [
  { role: 'title', label: 'Title', sample: 'Dialog or alert title' },
  { role: 'body', label: 'Body', sample: 'Paragraph copy and descriptions.' },
  { role: 'control', label: 'Control', sample: 'Button and input label' },
  { role: 'label', label: 'Label', sample: 'Form field label' },
  { role: 'caption', label: 'Caption', sample: 'Helper text and tooltips' },
] as const;

const COMPONENT_SIZES: Size[] = ['sm', 'md', 'lg'];

function SizeSample({ size, children }: { size: Size; children: ReactNode }) {
  return (
    <div className="preview__size-sample">
      {children}
      <p className="preview__text-meta">
        <code>{size}</code>
      </p>
    </div>
  );
}

function TextSample({
  role,
  label,
  sample,
}: {
  role: string;
  label: string;
  sample: string;
}) {
  return (
    <div className="preview__text-sample">
      <p className={`preview__text--${role}`}>{sample}</p>
      <p className="preview__text-meta">
        {label} · <code>--z-text-{role}-*</code>
      </p>
    </div>
  );
}

function validateEmail(value: string) {
  if (!value) {
    return 'Email is required.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Enter a valid email address.';
  }
  return undefined;
}

export default function App() {
  const [theme, setTheme] = useState<ThemePreference>(() => readStoredTheme() ?? 'light');
  const [accessibility, setAccessibility] = useState<AccessibilityPreferences>({
    contrast: 'system',
    motion: 'system',
    transparency: 'system',
    linkUnderline: 'auto',
  });
  const [switchOn, setSwitchOn] = useState(true);
  const [checkboxOn, setCheckboxOn] = useState(true);
  const [filterValue, setFilterValue] = useState('all');
  const [rating, setRating] = useState(3);
  const [rangeValue, setRangeValue] = useState<[number, number]>([25, 75]);
  const [toastOpen, setToastOpen] = useState(false);
  const [validatorEmail, setValidatorEmail] = useState('');

  return (
    <TooltipProvider>
      <ToastProvider>
        <div className="preview">
          <header className="preview__header">
            <h1 className="preview__title">Z-UI Component Preview</h1>
            <div className="preview__controls">
              <span className="preview__label">Theme</span>
              <ThemeController value={theme} onChange={setTheme} />
            </div>
            <div className="preview__controls">
              <span className="preview__label">Accessibility</span>
              <AccessibilityController value={accessibility} onChange={setAccessibility} />
            </div>
          </header>

          <main className="preview__main">
            <TokensPreview />

            <Section title="Typography">
              <div className="preview__text-stack">
                <h3 className="preview__text-meta">Display &amp; headings</h3>
                <div className="preview__text-columns">
                  {TEXT_ROLES.map((item) => (
                    <TextSample key={item.role} {...item} />
                  ))}
                </div>
              </div>
              <div className="preview__text-stack">
                <h3 className="preview__text-meta">UI roles</h3>
                <div className="preview__text-columns">
                  {UI_TEXT_ROLES.map((item) => (
                    <TextSample key={item.role} {...item} />
                  ))}
                </div>
              </div>
            </Section>

            <Section title="Skeleton">
              <div className="preview__stack" aria-busy="true" aria-live="polite">
                <h3 className="preview__text-meta">Text roles</h3>
                <Skeleton text="display" width="14rem" />
                <Skeleton text="h2" width="12rem" />
                <Skeleton text="title" width="10rem" />
                <Skeleton text="body" width="100%" />
                <Skeleton text="body" width="85%" />
                <Skeleton text="caption" width="8rem" />
              </div>
              <div className="preview__row">
                <Skeleton radius="circle" width="2rem" aria-label="Loading avatar" />
                <Skeleton radius="pill" width="3rem" height="1.5rem" />
                <Skeleton radius="control" width="6rem" height="2.25rem" />
                <Skeleton radius="control" width="10rem" height="2.5rem" />
                <Skeleton radius="surface" width="12rem" height="4rem" />
              </div>
              <div className="preview__skeleton-card">
                <Skeleton radius="circle" width="2.5rem" />
                <div className="preview__skeleton-card-copy">
                  <Skeleton text="title" width="9rem" />
                  <Skeleton text="body" width="100%" />
                  <Skeleton text="body" width="70%" />
                </div>
              </div>
            </Section>

            <Section title="Sizes">
              <div className="preview__size-group">
                <h3 className="preview__text-meta">Button</h3>
                <div className="preview__size-row">
                  {COMPONENT_SIZES.map((size) => (
                    <SizeSample key={size} size={size}>
                      <Button variant="primary" size={size}>
                        Button
                      </Button>
                    </SizeSample>
                  ))}
                </div>
              </div>
              <div className="preview__size-group">
                <h3 className="preview__text-meta">Icon button</h3>
                <div className="preview__size-row">
                  {COMPONENT_SIZES.map((size) => (
                    <SizeSample key={size} size={size}>
                      <IconButton variant="secondary" size={size} aria-label="Add item">
                        <PlusIcon />
                      </IconButton>
                    </SizeSample>
                  ))}
                </div>
              </div>
              <div className="preview__size-group">
                <h3 className="preview__text-meta">Badge</h3>
                <div className="preview__size-row">
                  {COMPONENT_SIZES.map((size) => (
                    <SizeSample key={size} size={size}>
                      <Badge tone="primary" size={size}>
                        Badge
                      </Badge>
                    </SizeSample>
                  ))}
                </div>
              </div>
              <div className="preview__size-group">
                <h3 className="preview__text-meta">Avatar</h3>
                <div className="preview__size-row">
                  {COMPONENT_SIZES.map((size) => (
                    <SizeSample key={size} size={size}>
                      <Avatar fallback="ZA" size={size} />
                    </SizeSample>
                  ))}
                </div>
              </div>
              <div className="preview__size-group">
                <h3 className="preview__text-meta">Spinner</h3>
                <div className="preview__size-row">
                  {COMPONENT_SIZES.map((size) => (
                    <SizeSample key={size} size={size}>
                      <Spinner size={size} />
                    </SizeSample>
                  ))}
                </div>
              </div>
            </Section>

            <Section title="Actions">
              <div className="preview__row">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="primary" disabled>
                  Disabled
                </Button>
                <Button variant="primary" isLoading>
                  Loading
                </Button>
              </div>
              <div className="preview__row">
                <Button variant="primary" icon={<PlusIcon />}>
                  With icon
                </Button>
                <IconButton variant="secondary" aria-label="Add item">
                  <PlusIcon />
                </IconButton>
                <Link href="#">Link</Link>
                <Link href="#" disabled>
                  Disabled link
                </Link>
              </div>
            </Section>

            <Section title="Display">
              <div className="preview__row">
                <Badge tone="neutral">Neutral</Badge>
                <Badge tone="primary">Primary</Badge>
                <Badge tone="success">Success</Badge>
                <Badge tone="warning">Warning</Badge>
                <Badge tone="danger">Danger</Badge>
                <Badge tone="info">Info</Badge>
              </div>
              <div className="preview__row">
                <Status tone="success" label="Online" />
                <Status tone="warning" label="Away" />
                <Status tone="danger" label="Offline" />
                <Status tone="neutral" label="Unknown" />
              </div>
              <div className="preview__row">
                <Avatar fallback="ZA" />
                <Indicator>
                  <Avatar fallback="JD" />
                  <IndicatorItem variant="dot" tone="success" label="Online" />
                </Indicator>
                <Indicator>
                  <IconButton variant="secondary" aria-label="Notifications">
                    <PlusIcon />
                  </IconButton>
                  <IndicatorItem>3</IndicatorItem>
                </Indicator>
                <Spinner />
              </div>
            </Section>

            <Section title="Layout">
              <Stack direction="vertical" gap="md">
                <Card>
                  <CardHeader>
                    <CardTitle>Stack layout</CardTitle>
                    <CardDescription>Vertical stack with semantic gap tokens.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Stack direction="horizontal" gap="sm">
                      <Badge tone="primary">React</Badge>
                      <Badge tone="info">TypeScript</Badge>
                      <Badge tone="success">CSS</Badge>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Section>

            <Section title="Data display">
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is Z-UI?</AccordionTrigger>
                  <AccordionContent>
                    A semantic design system with accessible React components.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How are tokens used?</AccordionTrigger>
                  <AccordionContent>
                    Components consume semantic CSS variables for color, spacing, typography, and motion.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="preview__carousel">
                <Carousel aria-label="Featured items">
                  <CarouselContent>
                    {['Design tokens', 'Accessible components', 'Composable APIs'].map((item) => (
                      <CarouselItem key={item}>
                        <Card>
                          <CardHeader>
                            <CardTitle>{item}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="preview__text-meta">Carousel slide content.</p>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>

              <div className="preview__table-wrap">
                <Table>
                  <TableCaption>Recent activity</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Jane Doe</TableCell>
                      <TableCell>
                        <Status tone="success" size="sm" label="Active" />
                      </TableCell>
                      <TableCell>Admin</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>John Smith</TableCell>
                      <TableCell>
                        <Status tone="warning" size="sm" label="Pending" />
                      </TableCell>
                      <TableCell>Editor</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                <ListItem as="li" label="Install dependencies" />
                <ListItem as="li" label="Import components" />
                <ListItem as="li" label="Build your interface" />
              </ul>

              <Timeline>
                <TimelineItem
                  date="Jan 2026"
                  title="Project started"
                  description="Initial design system foundations."
                />
                <TimelineItem
                  date="Mar 2026"
                  title="Component library"
                  description="React components with semantic tokens."
                />
                <TimelineItem
                  date="Jul 2026"
                  title="Full parity"
                  description="All daisyUI-mapped components implemented."
                />
              </Timeline>
            </Section>

            <Section title="Curated compositions">
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                <ListItem
                  as="li"
                  leading={<Avatar fallback="JD" alt="Jane Doe" />}
                  label="Jane Doe"
                  description="Product designer"
                  trailing={<Badge tone="primary">Admin</Badge>}
                />
                <ListItem
                  as="li"
                  interactive
                  leading={
                    <ListItemIcon>
                      <PlusIcon />
                    </ListItemIcon>
                  }
                  label="Import components"
                  description="Add Z-UI to your project"
                  trailing={<Badge tone="info">New</Badge>}
                />
              </ul>

              <div className="preview__stack preview__stack--sm">
                <ListItem
                  label="Email notifications"
                  description="Receive product updates by email"
                  control={<Switch checked={switchOn} onCheckedChange={setSwitchOn} />}
                />
                <ListItem
                  label="Marketing emails"
                  description="Occasional announcements and tips"
                  control={<Checkbox />}
                />
              </div>

              <nav aria-label="Sidebar preview" className="preview__stack preview__stack--sm">
                <ListItem as="a" href="#" label="Inbox" selected trailing={<Badge>12</Badge>} />
                <ListItem
                  as="a"
                  href="#"
                  label="Settings"
                  leading={
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                  }
                />
              </nav>

              <ListItem
                leading={
                  <ListItemIcon>
                    <PlusIcon />
                  </ListItemIcon>
                }
                label="Flexible row"
                description="Open leading and trailing slots"
                trailing={<Badge>ListItem</Badge>}
              />

              <ListItem
                variant="contained"
                leading={
                  <ListItemIcon>
                    <PlusIcon />
                  </ListItemIcon>
                }
                label="Contained row"
                description="Surface, border, and radius"
                trailing={<Badge tone="info">Contained</Badge>}
              />

              <Toolbar label="Document actions">
                <Button size="sm">Save</Button>
                <Separator orientation="vertical" />
                <Button size="sm" variant="secondary">
                  Cancel
                </Button>
              </Toolbar>
            </Section>

            <Section title="Navigation">
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
                  <BreadcrumbLink current>Preview</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumbs>

              <Navbar>
                <NavbarLogo>
                  <strong>Z-UI</strong>
                </NavbarLogo>
                <NavbarContent>
                  <NavbarItem>
                    <Link href="#" aria-current="page">
                      Preview
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link href="#">Docs</Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link href="#">GitHub</Link>
                  </NavbarItem>
                </NavbarContent>
              </Navbar>

              <Megamenu>
                <MegamenuTrigger asChild>
                  <Button variant="secondary">Browse products</Button>
                </MegamenuTrigger>
                <MegamenuContent>
                  <MegamenuItem href="#">Analytics</MegamenuItem>
                  <MegamenuItem href="#" selected>
                    Components
                  </MegamenuItem>
                  <MegamenuItem href="#">Templates</MegamenuItem>
                  <MegamenuItem href="#">Integrations</MegamenuItem>
                </MegamenuContent>
              </Megamenu>

              <Pagination>
                <PaginationItem>
                  <PaginationLink href="#" disabled>
                    Previous
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" current>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">10</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">Next</PaginationLink>
                </PaginationItem>
              </Pagination>

              <Steps currentStep={2}>
                <Step step={1}>
                  <StepIndicator />
                  <StepTitle>Account</StepTitle>
                  <StepDescription>Create your account</StepDescription>
                </Step>
                <Step step={2}>
                  <StepIndicator />
                  <StepTitle>Profile</StepTitle>
                  <StepDescription>Set up your profile</StepDescription>
                </Step>
                <Step step={3}>
                  <StepIndicator />
                  <StepTitle>Complete</StepTitle>
                  <StepDescription>Review and finish</StepDescription>
                </Step>
              </Steps>
            </Section>

            <Section title="Feedback">
              <div className="preview__stack">
                <Progress value={65} max={100} />
                <Progress indeterminate aria-label="Loading" />
              </div>
              <div className="preview__row">
                <RadialProgress value={72} />
                <RadialProgress indeterminate size="lg" aria-label="Loading" />
              </div>
              <div className="preview__row">
                <Button variant="secondary" onClick={() => setToastOpen(true)}>
                  Show toast
                </Button>
              </div>
            </Section>

            <Section title="Alerts">
              <div className="preview__stack">
                <Alert tone="info" title="Information" description="Guidance for the user." />
                <Alert tone="success" title="Success" description="Action completed." />
                <Alert tone="warning" title="Warning" description="Proceed with caution." />
                <Alert
                  tone="danger"
                  title="Error"
                  description="Something went wrong."
                  action={<Button variant="ghost">Retry</Button>}
                />
              </div>
            </Section>

            <Section title="Forms">
              <div className="preview__grid">
                <Field id="preview-name" required>
                  <FieldLabel>Name</FieldLabel>
                  <TextField name="name" placeholder="Jane Doe" />
                  <FieldDescription>Your display name.</FieldDescription>
                </Field>

                <Field id="preview-email" invalid>
                  <FieldLabel>Email</FieldLabel>
                  <TextField name="email" placeholder="you@example.com" defaultValue="invalid" />
                  <FieldError>Enter a valid email address.</FieldError>
                </Field>

                <Field id="preview-bio">
                  <FieldLabel>Bio</FieldLabel>
                  <Textarea name="bio" placeholder="Tell us about yourself…" rows={3} />
                </Field>

                <Field id="preview-plan">
                  <FieldLabel>Plan</FieldLabel>
                  <Select defaultValue="pro">
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="team">Team</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field id="preview-file">
                  <FieldLabel>Avatar upload</FieldLabel>
                  <FileInput name="avatar" accept="image/*" />
                </Field>

                <Field id="preview-otp">
                  <FieldLabel>Verification code</FieldLabel>
                  <OTPInput length={6} />
                </Field>
              </div>

              <div className="preview__stack">
                <Field id="preview-rating">
                  <FieldLabel>Rating</FieldLabel>
                  <Rating value={rating} onValueChange={setRating} />
                </Field>

                <Field id="preview-range">
                  <FieldLabel>Price range</FieldLabel>
                  <RangeSlider
                    min={0}
                    max={100}
                    value={rangeValue}
                    onValueChange={(value) => {
                      if (Array.isArray(value)) {
                        setRangeValue([value[0], value[1]]);
                      }
                    }}
                    range
                  />
                  <FieldDescription>
                    {rangeValue[0]} – {rangeValue[1]}
                  </FieldDescription>
                </Field>

                <Field id="preview-calendar">
                  <FieldLabel>Date</FieldLabel>
                  <Calendar />
                </Field>
              </div>

              <div className="preview__stack">
                <span className="preview__label">Filter</span>
                <Filter
                  type="single"
                  value={filterValue}
                  onValueChange={(value) => {
                    if (typeof value === 'string') {
                      setFilterValue(value);
                    }
                  }}
                >
                  <FilterItem value="all">All</FilterItem>
                  <FilterItem value="active">Active</FilterItem>
                  <FilterItem value="archived">Archived</FilterItem>
                </Filter>
              </div>

              <Validator value={validatorEmail} validate={validateEmail} validateOn="blur" id="preview-validator">
                <Field id="preview-validator">
                  <FieldLabel>Validated email</FieldLabel>
                  <TextField
                    name="validated-email"
                    placeholder="you@example.com"
                    value={validatorEmail}
                    onChange={(event) => setValidatorEmail(event.target.value)}
                  />
                  <ValidatorMessage />
                </Field>
              </Validator>

              <div className="preview__row">
                <label className="preview__row">
                  <Checkbox checked={checkboxOn} onCheckedChange={(v) => setCheckboxOn(v === true)} />
                  <span>Accept terms</span>
                </label>
                <label className="preview__row">
                  <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
                  <span>Notifications {switchOn ? 'on' : 'off'}</span>
                </label>
              </div>

              <RadioGroup defaultValue="monthly" aria-label="Billing period">
                <label className="preview__row">
                  <RadioGroupItem value="monthly" aria-label="Monthly" />
                  <span>Monthly</span>
                </label>
                <label className="preview__row">
                  <RadioGroupItem value="yearly" aria-label="Yearly" />
                  <span>Yearly</span>
                </label>
              </RadioGroup>
            </Section>

            <Section title="Tabs">
              <Tabs defaultValue="account">
                <TabsList>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>
                <TabsContent value="account">Account settings content.</TabsContent>
                <TabsContent value="security">Security settings content.</TabsContent>
                <TabsContent value="billing">Billing settings content.</TabsContent>
              </Tabs>
            </Section>

            <Section title="Overlays">
              <div className="preview__row">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary">Open dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Dialog title</DialogTitle>
                    <DialogDescription>
                      Modal content using overlay scrim and surface tokens.
                    </DialogDescription>
                    <div className="preview__dialog-actions">
                      <DialogClose asChild>
                        <Button variant="ghost">Cancel</Button>
                      </DialogClose>
                      <Button variant="primary">Confirm</Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="secondary">Open drawer</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Drawer title</DrawerTitle>
                      <DrawerDescription>
                        Slide-in panel for navigation or secondary actions.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="preview__stack">
                      <Link href="#">Settings</Link>
                      <Link href="#">Profile</Link>
                      <Link href="#">Sign out</Link>
                    </div>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button variant="ghost">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="secondary">Open popover</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <p style={{ margin: 0 }}>Popover content on surface background.</p>
                  </PopoverContent>
                </Popover>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost">Hover for tooltip</Button>
                  </TooltipTrigger>
                  <TooltipContent>Tooltip using overlay tooltip token.</TooltipContent>
                </Tooltip>

                <Menu>
                  <MenuTrigger asChild>
                    <Button variant="secondary">Open menu</Button>
                  </MenuTrigger>
                  <MenuContent>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem selected>Settings</MenuItem>
                    <MenuSeparator />
                    <MenuItem>Sign out</MenuItem>
                  </MenuContent>
                </Menu>
              </div>
            </Section>
          </main>

          <FloatingActionButton aria-label="Create new item" icon={<PlusIcon />} />
        </div>

        <Toast open={toastOpen} onOpenChange={setToastOpen} duration={5000}>
          <ToastTitle>Saved</ToastTitle>
          <ToastDescription>Your changes were saved successfully.</ToastDescription>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </TooltipProvider>
  );
}
