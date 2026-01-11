import { useResendVerificationEmailMutation } from "@/services/auth/authService";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useDispatch } from "react-redux";
import { logoutThunk } from "@/features/auth/authThunks";
import { useNavigate } from "react-router";
import paths from "@/configs/paths";
import { useTranslation } from "react-i18next";

const SendVerifyEmail = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resend, { isLoading: isResending }] = useResendVerificationEmailMutation();

  const handleResend = async () => {
    if (isResending) return;

    try {
      await resend().unwrap();

      toast.success(t("auth.verificationEmailSent"));
    } catch {
      toast.error(t("auth.cannotSendVerification"));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center text-base font-bold">{t("auth.verifyEmail")}</h1>

      <p className="text-sm text-(--text-secondary)">
        {t("auth.verifyEmailDescription")}
      </p>

      <Button type="submit" className="auth__btn-submit" onClick={handleResend}>
        <span>{isResending ? <Spinner className="size-6" /> : t("auth.resend")}</span>
      </Button>

      <Button
        variant="outline"
        className="rounded-xl text-(--text-primary)"
        onClick={() => {
          dispatch(logoutThunk());
          navigate(paths.login);
        }}
      >
        {t("auth.logout")}
      </Button>
    </div>
  );
};

export default SendVerifyEmail;
