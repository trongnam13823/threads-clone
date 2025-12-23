import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useCheckAvailable } from "@/hooks/useCheckAvailable";
import { useRegisterMutation, useValidateEmailMutation, useValidateUsernameMutation } from "@/services/auth/authApi";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import paths from "@/configs/paths";
import Link from "@/contexts/history/components/Link";
import { Spinner } from "@/components/ui/spinner";
import { CheckCircle2Icon, CheckIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import toastFirstAvailabilityError from "./helper/toastFirstAvailabilityError";
import registerSchema from "@/schemas/auth/registerSchema";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function RegisterPage() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    reValidateMode: "onSubmit",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const { control, trigger, handleSubmit, formState } = form;

  const [register, { isLoading, isSuccess }] = useRegisterMutation();
  const [validateUsername] = useValidateUsernameMutation();
  const [validateEmail] = useValidateEmailMutation();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const usernameStatus = useCheckAvailable({
    name: "username",
    control,
    trigger,
    mutation: validateUsername,
  });

  const emailStatus = useCheckAvailable({
    name: "email",
    control,
    trigger,
    mutation: validateEmail,
  });

  const isSubmitDisabled = !formState.isValid || !usernameStatus.isAvailable || !emailStatus.isAvailable;

  const onSubmit = async (values) => {
    toastFirstAvailabilityError([
      { status: usernameStatus, message: "Tên người dùng đã tồn tại" },
      { status: emailStatus, message: "Email người dùng đã tồn tại" },
    ]);

    if (isLoading || isSubmitDisabled) return;

    try {
      await register(values).unwrap();

      toast.success("Đăng kí thành công");
    } catch {
      toast.error("Đăng kí không thành công");
    }
  };

  const handleInvalid = (errors) => {
    toast.error(errors[Object.keys(errors)[0]].message);
  };

  return (
    <div className="flex w-full max-w-92.5 flex-col gap-4">
      <h1 className="text-center text-base font-bold">Đăng kí</h1>

      {!isLoading && isSuccess && (
        <Alert className="text-(--success-text)">
          <CheckCircle2Icon className="h-5 w-5" />
          <AlertTitle className="font-bold">Email đã được gửi</AlertTitle>
          <AlertDescription className="text-inherit">
            Chúng tôi đã gửi một liên kết xác thực tới email của bạn.
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit, handleInvalid)} className="flex flex-col gap-2" autoComplete="off">
          <FormField
            control={control}
            name="username"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Input autoFocus {...field} className={cn("auth__input", "pr-14")} placeholder="Tên người dùng" />
                </FormControl>

                <div className="absolute top-1/2 right-4 -translate-y-1/2">
                  {usernameStatus.isIdle ? null : usernameStatus.isChecking ? (
                    <Spinner className="size-6" />
                  ) : usernameStatus.isAvailable ? (
                    <CheckIcon className="size-6 text-(--success-text)" />
                  ) : (
                    <XIcon className="size-6 text-(--error-text)" />
                  )}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Input {...field} className="auth__input" placeholder="Email" />
                </FormControl>

                <div className="absolute top-1/2 right-4 -translate-y-1/2">
                  {emailStatus.isIdle ? null : emailStatus.isChecking ? (
                    <Spinner className="size-6" />
                  ) : emailStatus.isAvailable ? (
                    <CheckIcon className="size-6 text-(--success-text)" />
                  ) : (
                    <XIcon className="size-6 text-(--error-text)" />
                  )}
                </div>
              </FormItem>
            )}
          />

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

          <FormField
            control={control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type={isShowPassword ? "text" : "password"}
                    {...field}
                    className="auth__input"
                    placeholder="Xác nhận mật khẩu"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className={cn("auth__btn-submit", isSubmitDisabled && "cursor-not-allowed")}>
            <span className={cn(isSubmitDisabled && "opacity-50")}>
              {isLoading ? <Spinner className="size-6" /> : "Đăng kí"}
            </span>
          </Button>

          <p className="mt-4 text-center text-(--text-secondary)">
            Bạn đã có tài khoản?{" "}
            <Link to={paths.login} className="text-(--text-primary) underline">
              Đăng nhập
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
