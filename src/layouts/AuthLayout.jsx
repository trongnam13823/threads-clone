import { Logo } from "@/components/Logo";

const AuthLayout = ({ children }) => {
  return (
    <div className="bg-( --background-primary) relative min-h-svh min-w-svw">
      <img
        src="./auth-bg.webp"
        alt="auth-bg"
        className="absolute top-0 left-0 h-128.75 w-full object-cover max-md:hidden"
      />

      <div className="absolute inset-0 mt-20 flex flex-col items-center justify-center gap-6 p-6">
        <Logo size={60} className="pointer-events-none md:hidden" />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
