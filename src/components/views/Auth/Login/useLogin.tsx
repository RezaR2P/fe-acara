import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const loginSchema = yup.object().shape({
  identifier: yup.string().required("Please Input Your Email or Password"),
  password: yup.string().required("Please Input Your Password"),
});

const useLogin = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    return setIsVisible(!isVisible);
  };

  const callbackUrl: string = (router.query.callbackUrl as string) || "/";

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginServices = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });

    if (!result || result.error) {
      throw new Error("Email or username does not match your password");
    }
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginServices,
    onError(error) {
      setError("root", {
        message: error.message,
      });
    },
    onSuccess: () => {
      router.push(callbackUrl);
      reset();
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);

  return {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  };
};

export default useLogin;
