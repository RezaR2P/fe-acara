import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  Spinner,
  TextField,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import useLogin from "./useLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Controller } from "react-hook-form";

const Login = () => {
  const {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useLogin();

  return (
    <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-6 md:flex-row md:gap-12">
      {/* Kolom Kiri: Logo & Ilustrasi */}
      <div className="hidden w-full flex-col items-center justify-center gap-6 md:flex md:w-1/3">
        <Image
          className="h-auto w-40 object-contain lg:w-48"
          src="/images/general/logo.svg"
          alt="Logo"
          width={180}
          height={180}
          priority
        />
        <Image
          className="w-full"
          src="/images/ilustrations/login.svg"
          alt="Login"
          width={1000}
          height={1000}
          priority
        />
      </div>

      {/* Kolom Kanan: Card Form */}
      <Card className="w-full max-w-md border border-gray-200 shadow-xl">
        <Card.Header className="flex flex-col items-center gap-3 p-6 pb-2 sm:p-8 sm:pb-2 md:items-start">
          <Image
            className="h-auto w-24 object-contain md:hidden"
            src="/images/general/logo.svg"
            alt="Logo"
            width={180}
            height={180}
            priority
          />
          <div className="text-center md:text-left">
            <h2 className="text-danger text-2xl font-bold sm:text-3xl">
              Login
            </h2>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Don{"'"}t have an account?&nbsp;
              <Link
                href="/auth/register"
                className="text-danger font-semibold hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </Card.Header>

        <Form
          onSubmit={handleSubmit(handleLogin)}
          className="flex w-full flex-col"
        >
          <Card.Content className="p-6 pt-2 sm:p-8 sm:pt-2">
            {/* Display Alert Error Global (Root Error) */}
            {errors.root && (
              <div className="bg-danger-50 text-danger border-danger-200 mb-4 rounded-lg border p-3 text-xs font-medium sm:text-sm">
                {errors.root.message}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Controller
                name="identifier"
                control={control}
                render={({ field }) => (
                  <TextField
                    name="identifier"
                    type="text"
                    isInvalid={Boolean(errors.identifier)}
                    className="gap-1"
                  >
                    <Label className="text-sm">Email / Username</Label>
                    <Input
                      placeholder="johndoe"
                      variant="secondary"
                      {...field}
                    />
                    <FieldError className="text-danger text-xs">
                      {errors.identifier?.message}
                    </FieldError>
                  </TextField>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    name="password"
                    isInvalid={Boolean(errors.password)}
                    className="gap-1"
                  >
                    <Label className="text-sm">Password</Label>
                    <InputGroup variant="secondary">
                      <InputGroup.Input
                        type={isVisible ? "text" : "password"}
                        {...field}
                        placeholder="••••••••"
                      />
                      <InputGroup.Suffix className="pe-0">
                        <Button
                          className="focus:outline-none"
                          isIconOnly
                          type="button"
                          aria-label={
                            isVisible ? "Hide password" : "Show password"
                          }
                          size="sm"
                          variant="ghost"
                          onPress={toggleVisibility}
                        >
                          {isVisible ? (
                            <FaEye className="text-lg text-gray-600" />
                          ) : (
                            <FaEyeSlash className="text-lg text-gray-600" />
                          )}
                        </Button>
                      </InputGroup.Suffix>
                    </InputGroup>
                    <FieldError className="text-danger text-xs">
                      {errors.password?.message}
                    </FieldError>
                  </TextField>
                )}
              />
            </div>
          </Card.Content>

          <Card.Footer className="flex flex-col gap-2 p-6 pt-2 sm:p-8 sm:pt-2">
            <Button
              className="bg-danger hover:bg-danger/90 w-full text-white"
              size="lg"
              type="submit"
            >
              {isPendingLogin ? <Spinner color="current" size="md" /> : "Login"}
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
