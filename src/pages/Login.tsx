import { useForm, FormProvider } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import LabelInput from '../components/LabelInput';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/auth';
import Error from '../components/Error';

const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const { error, loading, login } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'thomas.aelbrecht@hogent.be',
      password: '12345678',
    },
  });

  const handleLogin = async ({ email, password }: LoginFormValues) => {
    const loggedIn = await login(email, password);
    if (loggedIn) {
      const params = new URLSearchParams(search);
      const redirect = params.get('redirect');
      const safePath =
        redirect?.startsWith('/') && !redirect.startsWith('//')
          ? redirect
          : '/';
      navigate(safePath, { replace: true });
    }
  };

  return (
    <div className='flex justify-center pt-12'>
      <Card className='w-full max-w-sm'>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <CardHeader>
              <CardTitle className='text-2xl'>Sign in</CardTitle>
            </CardHeader>

            <CardContent className='py-4'>
              <Error error={error} />
              <FieldGroup>
                <LabelInput
                  label='Email'
                  name='email'
                  placeholder='your@email.com'
                  type='text'
                />
                <LabelInput
                  label='Password'
                  name='password'
                  placeholder='password'
                  type='password'
                />
              </FieldGroup>
            </CardContent>

            <CardFooter className='flex justify-end gap-2'>
              <Button type='submit' disabled={loading}>Sign in</Button>
              <Button type='button' variant='outline' onClick={() => form.reset()} >
                Cancel
              </Button>
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </div >
  );
}
