import { cn } from "@/lib/utils";
import TextareaAutosize from "react-textarea-autosize";

export default function Editor({ value, onChange, placeholder, className, autoFocus = true, ...props }) {
  return (
    <TextareaAutosize
      autoFocus={autoFocus}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      minRows={1}
      className={cn("resize-none placeholder:text-(--secondary-text) focus:outline-none", className)}
      {...props}
    />
  );
}
