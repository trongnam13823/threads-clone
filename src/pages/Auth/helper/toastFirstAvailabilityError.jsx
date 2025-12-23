import { toast } from "sonner";

export default (checks) => {
  const error = checks.find(({ status }) => !status.isIdle && !status.isChecking && status.isAvailable === false);

  if (error) {
    toast.error(error.message);
    return true;
  }

  return false;
};
