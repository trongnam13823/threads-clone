import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForgotPasswordMutation } from "@/services/auth/authService";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import forgotPasswordSchema from "@/schemas/auth/forgotPasswordSchema";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";
import paths from "@/configs/paths";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function ForgotPassword() {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  const { control, handleSubmit, formState } = form;

  const [forgotPassword, { isLoading, isSuccess }] = useForgotPasswordMutation();

  const onSubmit = async (values) => {
    if (isLoading) return;

    try {
      await forgotPassword(values).unwrap();
    } catch (error) {
      toast.error(error?.data?.message || t("common.error"));
    }
  };

  const handleInvalid = (errors) => {
    toast.error(errors[Object.keys(errors)[0]].message);
  };

  return (
    <div className="flex w-full max-w-92.5 flex-col gap-4">
      <div className="text-center">
        <h1 className="text-base font-bold">{t("auth.forgotPasswordTitle")}</h1>
        <p className="text-sm text-(--text-secondary)">{t("auth.forgotPasswordDescription")}</p>
      </div>

      {!isLoading && isSuccess && (
        <Alert className="text-(--success-text)">
          <CheckCircle2Icon className="h-5 w-5" />
          <AlertTitle className="font-bold">{t("auth.emailSent")}</AlertTitle>
          <AlertDescription className="text-inherit">
            {t("auth.resetPasswordLinkSent")}
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit, handleInvalid)} className="flex flex-col gap-2" autoComplete="off">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input autoFocus {...field} className="auth__input" placeholder={t("auth.email")} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className={cn("auth__btn-submit", !formState.isValid && "cursor-not-allowed")}>
            <span className={cn(!formState.isValid && "opacity-50")}>
              {isLoading ? <Spinner className="size-6" /> : t("auth.resetPassword")}
            </span>
          </Button>
        </form>
      </Form>

      <p className="text-center text-(--text-secondary)">
        {t("auth.goToLogin")}{" "}
        <Link to={paths.login} className="text-(--text-primary) underline">
          {t("auth.goToLoginLink")}
        </Link>
      </p>
    </div>
  );
}
