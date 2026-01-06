import z from 'zod';
import i18n from '@/i18n';

export const email = z.email(() => i18n.t('validation.emailInvalid'));
export const password = z.string().min(8, () => i18n.t('validation.passwordMinLength'));
