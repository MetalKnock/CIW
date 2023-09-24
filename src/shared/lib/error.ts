import { toast } from 'react-toastify';

export function handleError(error: unknown, message: string) {
  if (error instanceof Error) {
    toast.error(error.message);
  }
  toast.error(message);
}
