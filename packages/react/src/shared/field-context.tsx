import { createContext, useContext, useId, type ReactNode } from 'react';

export interface FieldContextValue {
  id: string;
  labelId: string;
  descriptionId: string;
  errorId: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

export function useFieldContext(): FieldContextValue | null {
  return useContext(FieldContext);
}

export interface FieldProviderProps {
  id?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  children: ReactNode;
}

export function FieldProvider({
  id: idProp,
  disabled,
  invalid,
  required,
  children,
}: FieldProviderProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const value: FieldContextValue = {
    id,
    labelId: `${id}-label`,
    descriptionId: `${id}-description`,
    errorId: `${id}-error`,
    disabled,
    invalid,
    required,
  };

  return <FieldContext.Provider value={value}>{children}</FieldContext.Provider>;
}
