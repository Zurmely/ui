import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { FieldLabel } from '../field/Field';
import { TextField } from '../text-field/TextField';
import { Validator, ValidatorMessage } from './Validator';

describe('Validator', () => {
  it('shows validation message on change', async () => {
    function Example() {
      const [value, setValue] = useState('');
      return (
        <Validator
          id="email"
          value={value}
          validate={(nextValue) => (nextValue.includes('@') ? undefined : 'Enter a valid email.')}
        >
          <FieldLabel>Email</FieldLabel>
          <TextField value={value} onChange={(event) => setValue(event.target.value)} />
          <ValidatorMessage />
        </Validator>
      );
    }

    const user = userEvent.setup();
    renderWithTheme(<Example />);
    await user.type(screen.getByRole('textbox'), 'bad');
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email.');
    });
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders custom validator message children', async () => {
    renderWithTheme(
      <Validator id="name" value="" validate={() => 'Required'}>
        <ValidatorMessage>Custom error</ValidatorMessage>
      </Validator>,
    );
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Custom error');
    });
  });

  it('has no axe violations when valid', async () => {
    const { container } = renderWithTheme(
      <Validator id="email" value="you@example.com" validate={() => undefined}>
        <FieldLabel>Email</FieldLabel>
        <TextField />
        <ValidatorMessage />
      </Validator>,
    );
    await checkA11y(container);
  });
});
