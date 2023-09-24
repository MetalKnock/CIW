import { toast } from 'react-toastify';

export function handleError(error: unknown, message: string) {
  const errorMessage = error instanceof Error ? error.message : message;
  toast.error(errorMessage);
}
