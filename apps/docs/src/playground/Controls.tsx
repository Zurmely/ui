import {
  Badge,
  Field,
  FieldDescription,
  FieldLabel,
  ListItem,
  RangeSlider,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Stack,
  Switch,
  TextField,
} from '@z-ui/react';
import type { ControlDef } from './types';

interface ControlsProps {
  controls: Record<string, ControlDef>;
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

export function Controls({ controls, values, onChange }: ControlsProps) {
  return (
    <Stack gap="sm">
      {Object.entries(controls).map(([key, control]) => (
        <ControlField
          key={key}
          controlKey={key}
          control={control}
          value={values[key]}
          onChange={onChange}
        />
      ))}
    </Stack>
  );
}

interface ControlFieldProps {
  controlKey: string;
  control: ControlDef;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

function ControlField({ controlKey, control, value, onChange }: ControlFieldProps) {
  if (control.type === 'boolean') {
    return (
      <ListItem
        size="sm"
        label={control.label}
        description={control.description}
        control={
          <Switch
            checked={Boolean(value)}
            onCheckedChange={(checked) => onChange(controlKey, checked)}
          />
        }
      />
    );
  }

  const fieldId = `control-${controlKey}`;

  return (
    <Field id={fieldId}>
      {control.type === 'number' && control.min != null && control.max != null ? (
        <div className="docs-controls__label-row">
          <FieldLabel>{control.label}</FieldLabel>
          <Badge size="sm">{String(value)}</Badge>
        </div>
      ) : (
        <FieldLabel>{control.label}</FieldLabel>
      )}
      {control.description ? (
        <FieldDescription>{control.description}</FieldDescription>
      ) : null}
      <ControlInput
        fieldId={fieldId}
        controlKey={controlKey}
        control={control}
        value={value}
        onChange={onChange}
      />
    </Field>
  );
}

interface ControlInputProps {
  fieldId: string;
  controlKey: string;
  control: ControlDef;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

function ControlInput({ fieldId, controlKey, control, value, onChange }: ControlInputProps) {
  switch (control.type) {
    case 'select':
      return (
        <Select value={String(value)} onValueChange={(next) => onChange(controlKey, next)}>
          <SelectTrigger id={fieldId}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {control.options.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case 'text':
      return (
        <TextField
          type="text"
          value={String(value ?? '')}
          onChange={(e) => onChange(controlKey, e.target.value)}
        />
      );

    case 'number':
      if (control.min != null && control.max != null) {
        return (
          <RangeSlider
            min={control.min}
            max={control.max}
            step={control.step}
            value={Number(value)}
            onValueChange={(next) =>
              onChange(controlKey, Array.isArray(next) ? next[1] : next)
            }
          />
        );
      }

      return (
        <TextField
          type="number"
          value={Number(value)}
          min={control.min}
          max={control.max}
          step={control.step}
          onChange={(e) => onChange(controlKey, Number(e.target.value))}
        />
      );

    case 'slot':
      return (
        <Select
          value={String(value ?? control.defaultValue)}
          onValueChange={(next) => onChange(controlKey, next)}
        >
          <SelectTrigger id={fieldId}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(control.options).map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    default:
      return null;
  }
}
