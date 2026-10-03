import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
  Field,
  FieldError,
  FieldLabel,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TextField,
  ThemeController,
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@z-ux/ui';

const statusTones = ['success', 'warning', 'info', 'danger'] as const;

export default function ElevationVerifyStage() {
  const [toastOpen, setToastOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);
  const [popoverOpen, setPopoverOpen] = useState(true);
  const [selectOpen, setSelectOpen] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(true);

  useEffect(() => {
    const focusField = document.getElementById('elev-focus-field');
    focusField?.focus();
  }, []);

  return (
    <ToastProvider>
      <div
        data-screenshot-root
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

        <section data-screenshot="1-page-card-field">
          <h2 style={{ margin: '0 0 var(--z-spacing-stack-component)' }}>Page, card, recessed field</h2>
          <Card>
            <CardHeader>
              <CardTitle>Workspace</CardTitle>
            </CardHeader>
            <CardContent>
              <Field id="elev-card-field">
                <FieldLabel>Name</FieldLabel>
                <TextField id="elev-card-field" defaultValue="Acme Corp" />
              </Field>
            </CardContent>
          </Card>
        </section>

        <section data-screenshot="2-overlays-on-page-and-card">
          <h2 style={{ margin: '0 0 var(--z-spacing-stack-component)' }}>Overlays</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--z-spacing-gap-component)' }}>
            <Menu open={menuOpen} onOpenChange={setMenuOpen}>
              <MenuTrigger asChild>
                <Button variant="secondary">Menu</Button>
              </MenuTrigger>
              <MenuContent>
                <MenuItem>Profile</MenuItem>
                <MenuItem selected>Settings</MenuItem>
              </MenuContent>
            </Menu>

            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="secondary">Popover</Button>
              </PopoverTrigger>
              <PopoverContent>
                <p style={{ margin: 0 }}>Popover on surface fill.</p>
              </PopoverContent>
            </Popover>

            <Select open={selectOpen} onOpenChange={setSelectOpen} defaultValue="pro">
              <SelectTrigger aria-label="Plan">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="secondary" onClick={() => setToastOpen(true)}>Toast</Button>
          </div>
          <Card style={{ marginTop: 'var(--z-spacing-stack-component)', maxWidth: '20rem' }}>
            <CardHeader>
              <CardTitle>Under overlays</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ margin: 0 }}>Card behind floating panels.</p>
            </CardContent>
          </Card>
        </section>

        <section data-screenshot="3-dialog-drawer">
          <h2 style={{ margin: '0 0 var(--z-spacing-stack-component)' }}>Dialog and drawer</h2>
          <div style={{ display: 'flex', gap: 'var(--z-spacing-gap-inline)' }}>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary">Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Confirm</DialogTitle>
                <p style={{ margin: 0 }}>Flat scrim, lighter panel.</p>
              </DialogContent>
            </Dialog>

            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="secondary">Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerTitle>Navigation</DrawerTitle>
                <p style={{ margin: 0 }}>Drawer panel on scrim.</p>
              </DrawerContent>
            </Drawer>
          </div>
        </section>

        <section data-screenshot="4-focus-invalid">
          <h2 style={{ margin: '0 0 var(--z-spacing-stack-component)' }}>Focus and invalid</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))',
              gap: 'var(--z-spacing-gap-component)',
            }}
          >
            <Field id="elev-focus">
              <FieldLabel>Focus ring</FieldLabel>
              <TextField id="elev-focus-field" defaultValue="Focused" />
            </Field>
            <Field id="elev-invalid" invalid>
              <FieldLabel>Invalid</FieldLabel>
              <TextField id="elev-invalid-field" defaultValue="bad@" data-invalid="true" />
              <FieldError>Enter a valid email.</FieldError>
            </Field>
          </div>
        </section>

        <section data-screenshot="5-status-soft">
          <h2 style={{ margin: '0 0 var(--z-spacing-stack-component)' }}>Status soft fills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--z-spacing-gap-component)' }}>
            {statusTones.map((tone) => (
              <Alert key={tone} tone={tone} title={tone} description="Soft fill unchanged." />
            ))}
          </div>
        </section>
      </div>

      <Toast open={toastOpen} onOpenChange={setToastOpen} duration={86400000}>
        <ToastTitle>Saved</ToastTitle>
        <ToastDescription>Toast on raised surface.</ToastDescription>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}
