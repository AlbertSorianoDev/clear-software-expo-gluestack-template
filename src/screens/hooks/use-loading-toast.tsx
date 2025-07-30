import { useRef, type ComponentProps } from "react";

import { Divider } from "../components/ui/divider";
import { Spinner } from "../components/ui/spinner";
import { Toast, ToastTitle, useToast } from "../components/ui/toast";

type UseToastReturn = ReturnType<typeof useToast>;
type ToastShowParams = Parameters<UseToastReturn["show"]>[0];
type ToastPlacement = ToastShowParams["placement"];

interface LoadingToastParams {
  placement?: ToastPlacement;
  duration?: number | null;
  message: string;
  spinnerColor?: string;
  toastVariant?: ComponentProps<typeof Toast>["variant"];
}

export const useLoadingToast = () => {
  const toast = useToast();
  const toastRef = useRef<string | null>(null);

  const showLoadingToast = (params: LoadingToastParams) => {
    toastRef.current = toast.show({
      placement: params.placement ?? "bottom right",
      duration: params.duration ?? null,
      render: ({ id }) => (
        <Toast
          nativeID={`toast-${id}`}
          variant={params.toastVariant ?? "outline"}
          className="flex-row items-center gap-4 px-5 py-3 shadow-soft-1"
        >
          <Spinner size="small" color={params.spinnerColor ?? "rgb(var(--color-primary-600))"} />
          <Divider orientation="vertical" className="h-[30px] bg-outline-200" />
          <ToastTitle size="sm">{params.message}</ToastTitle>
        </Toast>
      ),
    });
  };

  const closeLoadingToast = () => {
    if (toastRef.current) {
      toast.close(toastRef.current);
      toastRef.current = null;
    }
  };

  return {
    showLoadingToast,
    closeLoadingToast,
  };
};
