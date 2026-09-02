import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import authServices from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const registerSchema = yup.object().shape({
  fullName: yup.string().required("Please Input Your Full Name"),
  userName: yup.string().required("Please Input Your User Name"),
  email: yup
    .string()
    .email("Email format not valid")
    .required("Please Input Your Email"),
  password: yup
    .string()
    .min(8, "Minimal 8 Characters")
    .required("Please Input Your Password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Password not Match")
    .required("Please Input Your Password Confirmation"),
});

const useRegister = () => {
  const router = useRouter();
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerServices = async (payload: IRegister) => {
    const result = await authServices.register(payload);
    return result;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerServices,
    onError(error) {
      setError("root", {
        message: error.message,
      });
    },
    onSuccess: () => {
      router.push("/auth/register/success");
      reset();
    },
  });

  const handleRegister = (data: IRegister) => mutateRegister(data);

  return {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  };
};

export default useRegister;
