import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../contexts/auth';
import Error from '../components/Error';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '../components/ui/field';
import { Input } from '../components/ui/input';

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  confirmPassword: z.string().min(1, 'Password confirmation is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const { error, loading, register } = useAuth();
  const navigate = useNavigate();

  const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = useCallback(
    async ({ name, email, password }: RegisterFormValues) => {
      const loggedIn = await register({ name, email, password });
      if (loggedIn) navigate('/', { replace: true });
    },
    [register, navigate],
  );

  return (
    <div className="flex justify-center pt-12">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit(handleRegister)}>
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
          </CardHeader>

          <CardContent className="py-4">
            <Error error={error} />
            <FieldGroup>
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Name</FieldLabel>
                    <Input {...field} type="text" placeholder="Your Name" disabled={isSubmitting} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Email</FieldLabel>
                    <Input {...field} type="text" placeholder="your@email.com" disabled={isSubmitting} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Password</FieldLabel>
                    <Input {...field} type="password" disabled={isSubmitting} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Confirm password</FieldLabel>
                    <Input {...field} type="password" disabled={isSubmitting} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>

          <CardFooter className="flex justify-end gap-2">
            <Button type="submit" disabled={loading}>Register</Button>
            <Button type="button" variant="outline" onClick={() => reset()}>Cancel</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}