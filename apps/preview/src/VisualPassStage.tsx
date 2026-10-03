import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldLabel,
  Indicator,
  IndicatorItem,
  Status,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TextField,
  ThemeController,
} from '@z-ux/ui';

const tones = ['success', 'warning', 'info', 'danger'] as const;

export default function VisualPassStage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        padding: 'var(--z-spacing-gap-section)',
        backgroundColor: 'var(--z-color-background-canvas)',
        color: 'var(--z-color-text-primary)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--z-spacing-stack-section)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ThemeController />
      </div>

      <section data-screenshot="status-soft">
        <h2 style={{ margin: '0 0 var(--z-spacing-stack-component)' }}>Soft status</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--z-spacing-gap-component)' }}>
          {tones.map((tone) => (
            <div
              key={tone}
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--z-spacing-gap-inline)' }}
            >
              <Badge tone={tone}>{tone}</Badge>
              <Alert tone={tone} title={`${tone} alert`} description="Supporting copy." />
              <Status tone={tone} label={tone} />
            </div>
          ))}
        </div>
      </section>

      <section data-screenshot="indicator">
        <h2 style={{ margin: '0 0 var(--z-spacing-stack-component)' }}>Indicator inheritance</h2>
        <div style={{ display: 'flex', gap: 'var(--z-spacing-gap-component)' }}>
          {tones.map((tone) => (
            <Indicator key={tone}>
              <Avatar fallback={tone.slice(0, 1).toUpperCase()} />
              <IndicatorItem tone={tone} variant="dot" label={tone} />
            </Indicator>
          ))}
        </div>
      </section>

      <section data-screenshot="buttons">
        <h2 style={{ margin: '0 0 var(--z-spacing-stack-component)' }}>Buttons</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--z-spacing-gap-inline)' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </section>

      <section data-screenshot="tabs">
        <h2 style={{ margin: '0 0 var(--z-spacing-stack-component)' }}>Tabs</h2>
        <Tabs defaultValue="a">
          <TabsList>
            <TabsTrigger value="a">Overview</TabsTrigger>
            <TabsTrigger value="b">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="a">Panel content with space below the tab row.</TabsContent>
          <TabsContent value="b">Second panel.</TabsContent>
        </Tabs>
      </section>

      <section data-screenshot="surfaces">
        <h2 style={{ margin: '0 0 var(--z-spacing-stack-component)' }}>Card, table, dialog, fields</h2>
        <Card>
          <CardHeader>
            <CardTitle>Workspace</CardTitle>
          </CardHeader>
          <CardContent
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--z-spacing-stack-section)' }}
          >
            <Field id="stage-name">
              <FieldLabel>Name</FieldLabel>
              <TextField id="stage-name" defaultValue="Acme" />
            </Field>
            <Field id="stage-invalid" invalid>
              <FieldLabel>Email</FieldLabel>
              <TextField id="stage-invalid" defaultValue="bad" data-invalid="true" />
            </Field>
            <Field id="stage-focus">
              <FieldLabel>Focus</FieldLabel>
              <TextField id="stage-focus" defaultValue="Focused" autoFocus />
            </Field>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Pro</TableCell>
                  <TableCell>
                    <Badge tone="success">Active</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Team</TableCell>
                  <TableCell>
                    <Badge tone="info">Trial</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Open dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Dialog surface</DialogTitle>
                <Field id="stage-dialog-field">
                  <FieldLabel>In dialog</FieldLabel>
                  <TextField id="stage-dialog-field" placeholder="Recessed well" />
                </Field>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
