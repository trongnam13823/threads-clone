import { useResendVerificationEmailMutation } from "@/services/auth/authApi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useDispatch } from "react-redux";
import { logoutThunk } from "@/features/auth/authThunks";
import { useNavigate } from "react-router";
import paths from "@/configs/paths";

const SendVerifyEmailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resend, { isLoading: isResending }] = useResendVerificationEmailMutation();

  const handleResend = async () => {
    if (isResending) return;

    try {
      await resend().unwrap();

      toast.success("Email xác thực đã được gửi thành công");
    } catch {
      toast.error("Không thể gửi email xác thực. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center text-base font-bold">Xác thực email</h1>

      <p className="text-sm text-(--text-secondary)">
        Chúng tôi đã gửi một liên kết xác thực tới email của bạn.
        <br />
        Vui lòng kiểm tra email để xác thực tài khoản.
      </p>

      <Button type="submit" className="auth__btn-submit" onClick={handleResend}>
        <span>{isResending ? <Spinner className="size-6" /> : "Gửi lại"}</span>
      </Button>

      <Button
        variant="outline"
        className="rounded-xl text-(--text-primary)"
        onClick={() => {
          dispatch(logoutThunk());
          navigate(paths.login);
        }}
      >
        Đăng xuất
      </Button>
    </div>
  );
};

export default SendVerifyEmailPage;
