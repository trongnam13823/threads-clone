import z from "zod";
import { email, password } from "./common";

export default z
  .object({
    username: z
      .string()
      .min(3, "Tên người dùng tối thiểu 3 ký tự")
      .regex(/^[a-zA-Z0-9_-]+$/, "Tên người dùng chỉ được chứa chữ cái, số, dấu gạch ngang (-) và gạch dưới (_)"),

    email,

    password,

    password_confirmation: z.string(),
  })
  .refine((d) => d.password_confirmation === d.password, {
    path: ["password_confirmation"],
    message: "Xác nhận mật khẩu không khớp",
  });
