import * as React from "react";
import { createStandaloneToast } from "@chakra-ui/react";
import { Toast } from "components";

interface IToastProps {
  content?: string;
  type?: "Success" | "Error" | "Warning" | "Info";
  duration?: number;
}

export const useToast = () => {
  const { toast } = createStandaloneToast();

  const showToast = ({
    content = "Content",
    type = "Error",
    duration = 2000,
  }: IToastProps) => {
    toast({
      position: "top-right",
      duration: duration,
      render: () => <Toast type={type} content={content} />,
    });
  };

  return showToast;
};
