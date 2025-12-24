import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useResetPasswordMutation, useValidateResetTokenQuery } from "@/services/auth/authApi";
import paths from "@/configs/paths";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import resetPasswordSchema from "@/schemas/auth/resetPasswordSchema";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { logoutThunk } from "@/features/auth/authThunks";
import { useDispatch } from "react-redux";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const { control, handleSubmit, formState } = form;

  const [resetPassword, { isLoading: isResetting }] = useResetPasswordMutation();
  const { data, isLoading } = useValidateResetTokenQuery(token);

  useEffect(() => {
    if (!token) {
      toast.error("Link đặt lại mật khẩu không hợp lệ");
      navigate(paths.forgotPassword, { replace: true });
    }
  }, [token]);

  const onSubmit = async (values) => {
    if (isResetting) return;

    try {
      await resetPassword({ ...values, token }).unwrap();
      await dispatch(logoutThunk());

      navigate(paths.login, {
        replace: true,
        state: { isReset: true },
      });
    } catch {
      toast.error("Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn");
    }
  };

  const handleInvalid = (errors) => {
    toast.error(errors[Object.keys(errors)[0]]?.message);
  };

  return data?.valid ? (
    <div className="flex w-full max-w-92.5 flex-col gap-4">
      <h1 className="text-center text-base font-bold">Đặt lại mật khẩu</h1>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit, handleInvalid)} className="flex flex-col gap-2" autoComplete="off">
          {/* Email */}
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input autoFocus {...field} className="auth__input" placeholder="Email" />
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
                    className="auth__input"
                    {...field}
                    placeholder="Mật khẩu mới"
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

          {/* Confirm password */}
          <FormField
            control={control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type={isShowPassword ? "text" : "password"}
                    className="auth__input"
                    {...field}
                    placeholder="Xác nhận mật khẩu"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className={cn("auth__btn-submit", !formState.isValid && "cursor-not-allowed")}>
            <span className={cn(!formState.isValid && "opacity-50")}>
              {isResetting ? <Spinner className="size-6" /> : "Tạo mật khẩu mới"}
            </span>
          </Button>
        </form>
      </Form>
    </div>
  ) : (
    <div>
      <h1 className="mb-4 text-center text-base font-bold">
        {isLoading ? (
          <span>Đang xác thực...</span>
        ) : (
          !data?.valid && <span className="text-(--error-text)">Xác thực thất bại</span>
        )}
      </h1>

      <p className="mb-6 text-sm text-(--text-secondary)">
        {isLoading ? (
          <span>Vui lòng chờ trong giây lát</span>
        ) : (
          !data?.valid && <span className="text-(--error-text)">Liên kết đã hết hạn hoặc không hợp lệ.</span>
        )}
      </p>

      {!isLoading && (
        <Button type="submit" className="auth__btn-submit" asChild>
          <Link to={paths.forgotPassword} replace>
            Đi tới trang quên mật khẩu
          </Link>
        </Button>
      )}
    </div>
  );
};

export default ResetPasswordPage;
