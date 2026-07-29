import {
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type InputHTMLAttributes,
} from 'react';
import { cx, useFieldContext } from '../../shared';
import '../../shared/focus-ring.css';
import './file-input.css';

function getAriaDescribedBy(
  ariaDescribedBy: string | undefined,
  field: ReturnType<typeof useFieldContext>,
  isInvalid: boolean | undefined,
): string | undefined {
  const ids = [
    ariaDescribedBy,
    field?.descriptionId,
    isInvalid ? field?.errorId : undefined,
  ].filter(Boolean);

  return ids.length > 0 ? ids.join(' ') : undefined;
}

function formatFileList(files: FileList | null): string {
  if (!files || files.length === 0) {
    return '';
  }
  if (files.length === 1) {
    return files[0].name;
  }
  return `${files.length} files selected`;
}

export interface FileInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {
  invalid?: boolean;
  enableDragDrop?: boolean;
  dropLabel?: string;
  browseLabel?: string;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(function FileInput(
  {
    className,
    disabled,
    invalid,
    required,
    id,
    name,
    accept,
    multiple,
    onChange,
    enableDragDrop = true,
    dropLabel = 'Drag and drop files here, or',
    browseLabel = 'browse',
    'aria-describedby': ariaDescribedBy,
    ...props
  },
  ref,
) {
  const field = useFieldContext();
  const generatedId = useId();
  const isDisabled = disabled ?? field?.disabled;
  const isInvalid = invalid ?? field?.invalid;
  const isRequired = required ?? field?.required;
  const inputId = id ?? field?.id ?? generatedId;
  const browseId = `${inputId}-browse`;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileLabel, setFileLabel] = useState('');

  const setRefs = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFileLabel(formatFileList(event.target.files));
    onChange?.(event);
  };

  const openPicker = () => {
    if (!isDisabled) {
      inputRef.current?.click();
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    if (!enableDragDrop || isDisabled) {
      return;
    }
    event.preventDefault();
    const input = inputRef.current;
    if (!input) {
      return;
    }
    const dataTransfer = new DataTransfer();
    Array.from(event.dataTransfer.files).forEach((file) => dataTransfer.items.add(file));
    input.files = dataTransfer.files;
    setFileLabel(formatFileList(input.files));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    if (!enableDragDrop || isDisabled) {
      return;
    }
    event.preventDefault();
  };

  return (
    <div
      className={cx('z-file-input', className)}
      data-disabled={isDisabled ? 'true' : undefined}
      data-invalid={isInvalid ? 'true' : undefined}
      data-drag-drop={enableDragDrop ? 'true' : undefined}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        ref={setRefs}
        id={inputId}
        className="z-file-input__native"
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        disabled={isDisabled}
        required={isRequired}
        aria-invalid={isInvalid || undefined}
        aria-required={isRequired || undefined}
        aria-describedby={getAriaDescribedBy(ariaDescribedBy, field, isInvalid)}
        onChange={handleChange}
        tabIndex={-1}
        {...props}
      />
      <div className="z-file-input__dropzone">
        <p className="z-file-input__text">
          {fileLabel || (
            <>
              {enableDragDrop ? `${dropLabel} ` : null}
              <button
                id={browseId}
                type="button"
                className={cx('z-file-input__browse', 'z-focus-ring')}
                disabled={isDisabled}
                onClick={openPicker}
              >
                {browseLabel}
              </button>
            </>
          )}
        </p>
        {fileLabel ? (
          <button
            type="button"
            className={cx('z-file-input__change', 'z-focus-ring')}
            disabled={isDisabled}
            onClick={openPicker}
          >
            Change files
          </button>
        ) : null}
      </div>
    </div>
  );
});

FileInput.displayName = 'FileInput';
