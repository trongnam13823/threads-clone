import z from 'zod';
import i18n from '@/i18n';

export default z.object({
  login: z.string().min(1, () => i18n.t('validation.usernameRequired')),
  password: z.string().min(1, () => i18n.t('validation.passwordRequired')),
});
