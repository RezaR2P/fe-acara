import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";

const RegisterSuccess = () => {
  const router = useRouter();
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          className="h-auto w-40 object-contain lg:w-48"
          src="/images/general/logo.svg"
          alt="Logo"
          width={180}
          height={180}
          priority
        />
        <Image
          className="h-auto w-64 object-contain sm:w-80"
          src="/images/ilustrations/email-send.svg"
          alt="success"
          width={300}
          height={300}
          priority
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-danger/80 text-3xl font-bold">
          Create Account Success
        </h1>
        <p className="text-muted text-xl font-bold">
          check your email for account activation
        </p>
        <Button
          className="border-danger text-danger mt-2 w-fit"
          variant="outline"
          onClick={() => router.push("/")}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
