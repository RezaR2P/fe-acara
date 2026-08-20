import {
  Button,
  Card,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { visiblePassword, handleVisiblePassword } = useRegister();

  return (
    <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-6 md:flex-row md:gap-12">
      {/* Kolom Kiri: Logo & Ilustrasi — disembunyikan di mobile, muncul dari md ke atas */}
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

      {/* Kolom Kanan / Konten utama di mobile: Card Form */}
      <Card className="w-full max-w-md border border-gray-200 shadow-xl">
        <Card.Header className="flex flex-col items-center gap-3 p-6 pb-4 sm:p-8 sm:pb-4 md:items-start">
          {/* Logo tampil di dalam card, hanya untuk mobile */}
          <Image
            className="h-auto w-24 object-contain md:hidden"
            src="/images/general/logo.svg"
            alt="Logo"
            width={180}
            height={180}
            priority
          />
          <div className="text-center md:text-left">
            <h2 className="text-danger text-lg font-bold sm:text-xl">
              Create Account
            </h2>
            <p className="text-xs text-gray-500 sm:text-sm">
              Have an account?&nbsp;
              <Link
                href="/login"
                className="text-danger font-semibold hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </Card.Header>
        <Form className="flex w-full flex-col">
          <Card.Content className="p-6 pt-0 sm:p-8 sm:pt-0">
            <div className="flex flex-col gap-4">
              <TextField name="fullName" type="text">
                <Label>Full Name</Label>
                <Input placeholder="John Doe" variant="secondary" />
              </TextField>

              <TextField name="email" type="email">
                <Label>Email</Label>
                <Input placeholder="email@example.com" variant="secondary" />
              </TextField>

              <TextField name="password">
                <Label>Password</Label>
                <InputGroup variant="secondary">
                  <InputGroup.Input
                    type={visiblePassword.password ? "text" : "password"}
                    placeholder="••••••••"
                  />
                  <InputGroup.Suffix className="pe-0">
                    <Button
                      className="focus:outline-none"
                      isIconOnly
                      aria-label={
                        visiblePassword.password
                          ? "Hide password"
                          : "Show password"
                      }
                      size="sm"
                      variant="ghost"
                      onPress={() => handleVisiblePassword("password")}
                    >
                      {visiblePassword.password ? (
                        <FaEye className="text-xl text-gray-600" />
                      ) : (
                        <FaEyeSlash className="text-xl text-gray-600" />
                      )}
                    </Button>
                  </InputGroup.Suffix>
                </InputGroup>
              </TextField>

              <TextField name="confirmPassword">
                <Label>Confirm Password</Label>
                <InputGroup variant="secondary">
                  <InputGroup.Input
                    type={visiblePassword.confirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                  />
                  <InputGroup.Suffix className="pe-0">
                    <Button
                      className="focus:outline-none"
                      isIconOnly
                      aria-label={
                        visiblePassword.confirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      size="sm"
                      variant="ghost"
                      onPress={() => handleVisiblePassword("confirmPassword")}
                    >
                      {visiblePassword.confirmPassword ? (
                        <FaEye className="text-xl text-gray-600" />
                      ) : (
                        <FaEyeSlash className="text-xl text-gray-600" />
                      )}
                    </Button>
                  </InputGroup.Suffix>
                </InputGroup>
              </TextField>
            </div>
          </Card.Content>
          <Card.Footer className="flex flex-col gap-2 p-6 pt-0 sm:p-8 sm:pt-0">
            <Button
              className="bg-danger hover:bg-danger/90 w-full text-white"
              size="lg"
              type="submit"
            >
              Register
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
