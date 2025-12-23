import z from "zod";

export default z.object({
  login: z.string().min(1, "Tền người dùng hoặc Email không được để trống"),
  password: z.string().min(1, "Mật khẩu không được để trống"),
});
