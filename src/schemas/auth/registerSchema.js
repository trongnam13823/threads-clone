import z from "zod";
import { email, password } from "./common";
import i18n from "@/i18n";

export default z
  .object({
    username: z
      .string()
      .min(3, () => i18n.t("validation.usernameMinLength"))
      .regex(/^[a-zA-Z0-9_-]+$/, () => i18n.t("validation.usernamePattern")),

    email,

    password,

    password_confirmation: z.string(),
  })
  .refine((d) => d.password_confirmation === d.password, {
    path: ["password_confirmation"],
    message: () => i18n.t("validation.passwordMismatch"),
  });
