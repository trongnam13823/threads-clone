import { cn } from "@/lib/utils";

const Content = ({ children, className }) => {
  return (
    <main
      className={cn(
        "mx-auto flex w-full flex-1 flex-col gap-5 bg-(--elevated-background) md:max-w-(--column-max-w) md:p-px",
        className
      )}
    >
      {children}
    </main>
  );
};

export default Content;
