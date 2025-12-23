import z from "zod";
import { email, password } from "./common";

export default z
  .object({
    email,
    password,

    password_confirmation: z.string(),
  })
  .refine((d) => d.password_confirmation === d.password, {
    path: ["password_confirmation"],
    message: "Xác nhận mật khẩu không khớp",
  });
