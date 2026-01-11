import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useCheckAvailable } from '@/hooks/useCheckAvailable';
import {
  useRegisterMutation,
  useValidateEmailMutation,
  useValidateUsernameMutation,
} from '@/services/auth/authService';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import paths from '@/configs/paths';
import { Spinner } from '@/components/ui/spinner';
import { CheckCircle2Icon, CheckIcon, XIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import toastFirstAvailabilityError from './helper/toastFirstAvailabilityError';
import registerSchema from '@/schemas/auth/registerSchema';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

export default function Register() {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  });

  const { control, trigger, handleSubmit, formState } = form;

  const [register, { isLoading, isSuccess }] = useRegisterMutation();
  const [validateUsername] = useValidateUsernameMutation();
  const [validateEmail] = useValidateEmailMutation();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const usernameStatus = useCheckAvailable({
    name: 'username',
    control,
    trigger,
    mutation: validateUsername,
  });

  console.log(usernameStatus);

  const emailStatus = useCheckAvailable({
    name: 'email',
    control,
    trigger,
    mutation: validateEmail,
  });

  const isSubmitDisabled =
    !formState.isValid || !usernameStatus.isAvailable || !emailStatus.isAvailable;

  const onSubmit = async (values) => {
    toastFirstAvailabilityError([
      { status: usernameStatus, message: t('validation.usernameExists') },
      { status: emailStatus, message: t('validation.emailExists') },
    ]);

    if (isLoading || isSubmitDisabled) return;

    try {
      await register(values).unwrap();

      toast.success(t('auth.registerSuccess'));
    } catch {
      toast.error(t('auth.registerError'));
    }
  };

  const handleInvalid = (errors) => {
    toast.error(errors[Object.keys(errors)[0]].message);
  };

  return (
    <div className='flex w-full max-w-92.5 flex-col gap-4'>
      <h1 className='text-center text-base font-bold'>{t('auth.register')}</h1>

      {!isLoading && isSuccess && (
        <Alert className='text-(--success-text)'>
          <CheckCircle2Icon className='h-5 w-5' />
          <AlertTitle className='font-bold'>{t('auth.emailSent')}</AlertTitle>
          <AlertDescription className='text-inherit'>
            {t('auth.verifyEmailDescription')}
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit, handleInvalid)}
          className='flex flex-col gap-2'
          autoComplete='off'
        >
          <FormField
            control={control}
            name='username'
            render={({ field }) => (
              <FormItem className='relative'>
                <FormControl>
                  <Input
                    autoFocus
                    {...field}
                    className={cn('auth__input', 'pr-14')}
                    placeholder={t('auth.username')}
                  />
                </FormControl>

                <div className='absolute top-1/2 right-4 -translate-y-1/2'>
                  {usernameStatus.isIdle ? null : usernameStatus.isChecking ? (
                    <Spinner className='size-6' />
                  ) : usernameStatus.isAvailable ? (
                    <CheckIcon className='size-6 text-(--success-text)' />
                  ) : (
                    <XIcon className='size-6 text-(--error-text)' />
                  )}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='email'
            render={({ field }) => (
              <FormItem className='relative'>
                <FormControl>
                  <Input {...field} className='auth__input' placeholder={t('auth.email')} />
                </FormControl>

                <div className='absolute top-1/2 right-4 -translate-y-1/2'>
                  {emailStatus.isIdle ? null : emailStatus.isChecking ? (
                    <Spinner className='size-6' />
                  ) : emailStatus.isAvailable ? (
                    <CheckIcon className='size-6 text-(--success-text)' />
                  ) : (
                    <XIcon className='size-6 text-(--error-text)' />
                  )}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='password'
            render={({ field }) => (
              <FormItem className='relative'>
                <FormControl>
                  <Input
                    type={isShowPassword ? 'text' : 'password'}
                    {...field}
                    className={cn('auth__input', 'pr-14')}
                    placeholder={t('auth.password')}
                  />
                </FormControl>

                <button
                  tabIndex={-1}
                  type='button'
                  className='absolute top-1/2 right-4 -translate-y-1/2 text-(--placeholder-text)'
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword ? (
                    <EyeIcon className='size-6' />
                  ) : (
                    <EyeOffIcon className='size-6' />
                  )}
                </button>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='password_confirmation'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type={isShowPassword ? 'text' : 'password'}
                    {...field}
                    className='auth__input'
                    placeholder={t('auth.confirmPassword')}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type='submit'
            className={cn('auth__btn-submit', isSubmitDisabled && 'cursor-not-allowed')}
          >
            <span className={cn(isSubmitDisabled && 'opacity-50')}>
              {isLoading ? <Spinner className='size-6' /> : t('auth.register')}
            </span>
          </Button>

          <p className='mt-4 text-center text-(--text-secondary)'>
            {t('auth.haveAccount')}{' '}
            <Link to={paths.login} className='text-(--text-primary) underline'>
              {t('auth.login')}
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
