import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useVerifyEmailMutation } from "@/services/auth/authApi";
import paths from "@/configs/paths";
import { Button } from "@/components/ui/button";
import Link from "@/contexts/history/components/Link";
import { useDispatch } from "react-redux";
import { logoutThunk } from "@/features/auth/authThunks";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [verify, { isLoading: isVerifying, isSuccess, isError }] = useVerifyEmailMutation();

  useEffect(() => {
    if (!token) {
      navigate(paths.login, { replace: true });
      return;
    }

    const handleVerifyAndLogout = async () => {
      await verify({ token }).unwrap();
      await dispatch(logoutThunk());

      navigate(paths.login, {
        replace: true,
        state: { isVerified: true },
      });
    };

    handleVerifyAndLogout();
  }, [token, verify, dispatch, navigate]);

  return (
    <div>
      <h1 className="mb-4 text-center text-base font-bold">
        {isVerifying && <span>Đang xác thực...</span>}
        {isSuccess && <span className="text-(--success-text)">Xác thực thành công</span>}
        {isError && <span className="text-(--error-text)">Xác thực thất bại</span>}
      </h1>

      <p className="mb-6 text-sm text-(--text-secondary)">
        {isVerifying && <span>Vui lòng chờ trong giây lát</span>}
        {isSuccess && (
          <span className="text-(--success-text)">
            Email của bạn đã được xác thực. <br />
            Bây giờ bạn có thể sử dụng đầy đủ các chức năng của hệ thống.
          </span>
        )}
        {isError && <span className="text-(--error-text)">Liên kết đã hết hạn hoặc không hợp lệ.</span>}
      </p>

      {isError && (
        <Button type="submit" className="auth__btn-submit" asChild>
          <Link to={paths.login} replace>
            Đi tới trang đăng nhập
          </Link>
        </Button>
      )}
    </div>
  );
};

export default VerifyEmailPage;
