import { useRef, type ComponentProps } from "react";

import { Toast, ToastTitle, useToast } from "../components/ui/toast";

type UseToastReturn = ReturnType<typeof useToast>;
type ToastShowParams = Parameters<UseToastReturn["show"]>[0];
type ToastPlacement = ToastShowParams["placement"];

interface ErrorToastParams {
  placement?: ToastPlacement;
  duration?: number;
  message: string;
  toastVariant?: ComponentProps<typeof Toast>["variant"];
  action?: ComponentProps<typeof Toast>["action"];
  className?: string;
}

export const useErrorToast = () => {
  const toast = useToast();
  const toastRef = useRef<string | null>(null);

  const showErrorToast = (params: ErrorToastParams) => {
    toastRef.current = toast.show({
      placement: params.placement ?? "bottom right",
      duration: params.duration ?? 3000,
      render: ({ id }) => (
        <Toast
          nativeID={`toast-${id}`}
          variant={params.toastVariant ?? "outline"}
          action={params.action ?? "error"}
          className={params.className ?? "flex-row items-center gap-4 px-5 py-3 shadow-soft-1"}
        >
          <ToastTitle size="sm">{params.message}</ToastTitle>
        </Toast>
      ),
    });
  };

  const closeErrorToast = () => {
    if (toastRef.current) {
      toast.close(toastRef.current);
      toastRef.current = null;
    }
  };

  return {
    showErrorToast,
    closeErrorToast,
  };
};
