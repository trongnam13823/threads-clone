import z from "zod";

export const email = z.email("Email không hợp lệ");
export const password = z.string().min(8, "Mật khẩu tối thiểu 8 ký tự");
