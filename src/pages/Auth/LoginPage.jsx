import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/services/auth/authApi";
import { setToken, setUserInfo } from "@/features/auth/authSlice";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { useLocation, useNavigate } from "react-router";
import paths from "@/configs/paths";
import loginSchema from "@/schemas/auth/loginSchema";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import Link from "@/contexts/PageStack/components/Link";

/* ================== Page ================== */
export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isVerified, isReset } = location.state || {};

  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const [isShowPassword, setIsShowPassword] = useState(false);

  const { control, handleSubmit, formState } = form;

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (values) => {
    if (isLoading) return;

    try {
      const { user, access_token, refresh_token } = await login(values).unwrap();

      dispatch(setToken({ access_token, refresh_token }));
      dispatch(setUserInfo(user));
      navigate(paths.home);
    } catch {
      toast.error("Thông tin đăng nhập không chính xác");
    }
  };

  const handleInvalid = (errors) => {
    toast.error(errors[Object.keys(errors)[0]].message);
  };

  return (
    <div className="flex w-full max-w-92.5 flex-col gap-4">
      <h1 className="text-center text-base font-bold">Đăng nhập</h1>

      {isVerified && (
        <Alert className="text-(--success-text)">
          <AlertTitle>Đã xác minh tài khoản thành công, vui lòng đăng nhập!</AlertTitle>
        </Alert>
      )}

      {isReset && (
        <Alert className="text-(--success-text)">
          <AlertTitle>Tạo mật khẩu mới thành công, vui lòng đăng nhập!</AlertTitle>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit, handleInvalid)} className="flex flex-col gap-2" autoComplete="off">
          {/* Login */}
          <FormField
            control={control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input autoFocus {...field} className="auth__input" placeholder="Tên người dùng hoặc email" />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Input
                    type={isShowPassword ? "text" : "password"}
                    {...field}
                    className={cn("auth__input", "pr-14")}
                    placeholder="Mật khẩu"
                  />
                </FormControl>

                <button
                  tabIndex={-1}
                  type="button"
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-(--placeholder-text)"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword ? <EyeIcon className="size-6" /> : <EyeOffIcon className="size-6" />}
                </button>
              </FormItem>
            )}
          />

          <Link to={paths.forgotPassword} className="my-1 text-right text-(--text-secondary) hover:underline">
            Quên mật khẩu?
          </Link>

          <Button type="submit" className={cn("auth__btn-submit", !formState.isValid && "cursor-not-allowed")}>
            <span className={cn(!formState.isValid && "opacity-50")}>
              {isLoading ? <Spinner className="size-6" /> : "Đăng nhập"}
            </span>
          </Button>
        </form>
      </Form>

      <p className="text-center text-(--text-secondary)">
        Bạn chưa có tài khoản?{" "}
        <Link to={paths.register} className="text-(--text-primary) underline">
          Đăng ký
        </Link>
      </p>
    </div>
  );
}
