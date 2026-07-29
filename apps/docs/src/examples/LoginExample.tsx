import { useState } from 'react';
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Field,
  FieldError,
  FieldLabel,
  Link,
  Separator,
  Stack,
  TextField,
} from '@z-ui/react';

export function LoginExample() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowError(!email || !password);
  };

  return (
    <div className="docs-login">
      <Card className="docs-login__card">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Enter your credentials to access your workspace.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="docs-login__form" onSubmit={handleSubmit} noValidate>
            <Stack direction="vertical" gap="md">
              {showError ? (
                <Alert
                  tone="danger"
                  title="Sign in failed"
                  description="Enter both email and password to continue."
                />
              ) : null}

              <Field id="login-email" required invalid={showError && !email}>
                <FieldLabel>Email</FieldLabel>
                <TextField
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  invalid={showError && !email}
                />
                {showError && !email ? <FieldError>Email is required.</FieldError> : null}
              </Field>

              <Field id="login-password" required invalid={showError && !password}>
                <FieldLabel>Password</FieldLabel>
                <TextField
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  invalid={showError && !password}
                />
                {showError && !password ? <FieldError>Password is required.</FieldError> : null}
              </Field>

              <Stack direction="horizontal" gap="sm" className="docs-login__options">
                <Checkbox
                  id="login-remember"
                  checked={remember}
                  onCheckedChange={(checked) => setRemember(checked === true)}
                />
                <label htmlFor="login-remember" className="docs-login__remember-label">
                  Remember me
                </label>
                <Link href="#" className="docs-login__forgot">
                  Forgot password?
                </Link>
              </Stack>

              <Button type="submit">Sign in</Button>

              <Separator />

              <p className="docs-login__signup">
                No account? <Link href="#">Create one</Link>
              </p>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
