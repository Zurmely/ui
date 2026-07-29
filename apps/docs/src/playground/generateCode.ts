import type { ControlDef } from './types';

function escapeJsxString(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function formatPropValue(key: string, value: unknown, control: ControlDef): string | null {
  if (control.type === 'boolean') {
    if (value === control.defaultValue) return null;
    return value ? key : null;
  }

  if (control.type === 'number') {
    if (value === control.defaultValue) return null;
    return `${key}={${value}}`;
  }

  if (control.type === 'select' || control.type === 'text') {
    if (value === control.defaultValue) return null;
    if (value === '' && control.type === 'text') return null;
    return `${key}="${escapeJsxString(String(value))}"`;
  }

  if (control.type === 'slot') {
    if (value === control.defaultValue) return null;
    return `${key}={/* ${value} */}`;
  }

  return null;
}

export function generateCode(
  componentName: string,
  props: Record<string, unknown>,
  controls: Record<string, ControlDef>,
  children?: string,
): string {
  const propParts: string[] = [];

  for (const [key, control] of Object.entries(controls)) {
    if (key === 'children') continue;
    const formatted = formatPropValue(key, props[key], control);
    if (formatted) {
      if (control.type === 'boolean' && props[key] === true) {
        propParts.push(key);
      } else if (formatted) {
        propParts.push(formatted);
      }
    }
  }

  const propsStr = propParts.length > 0 ? ` ${propParts.join(' ')}` : '';
  const childContent = children ?? (typeof props.children === 'string' ? props.children : '');

  if (childContent) {
    return `<${componentName}${propsStr}>\n  ${childContent}\n</${componentName}>`;
  }

  return `<${componentName}${propsStr} />`;
}

export function generateImport(importPath: string, componentName: string): string {
  return `import { ${componentName} } from '${importPath}';`;
}

export function generateFullSnippet(
  doc: {
    importPath: string;
    componentName: string;
    controls: Record<string, ControlDef>;
    code?: (props: Record<string, unknown>) => string;
  },
  props: Record<string, unknown>,
): string {
  const code =
    doc.code?.(props) ??
    generateCode(
      doc.componentName,
      props,
      doc.controls,
      typeof props.children === 'string' ? props.children : undefined,
    );

  return `${generateImport(doc.importPath, doc.componentName)}\n\n${code}`;
}
