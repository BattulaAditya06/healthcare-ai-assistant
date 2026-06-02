"use client";

import {
  useState
} from "react";

import {
  useRouter
} from "next/navigation";

import {
  login
} from "@/features/auth/services/auth-service";

import {
  useAuthStore
} from "@/features/auth/store/auth-store";

export default function LoginPage() {

  const router =
    useRouter();

  const {
    setAuth
  } = useAuthStore();

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword
  ] = useState("");

  const handleLogin =
    async () => {

      try {

        const response =
          await login({

            email,

            password

          });

        setAuth(

          response.token,

          response.user

        );

        router.push(
          "/chat"
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center
      "
    >

      <div
        className="
          flex
          w-full
          max-w-sm
          flex-col
          gap-4
          rounded-2xl
          border
          bg-card
          p-6
        "
      >

        <h1
          className="
            text-2xl
            font-semibold
          "
        >

          Login

        </h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="
            rounded-xl
            border
            px-4
            py-3
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="
            rounded-xl
            border
            px-4
            py-3
          "
        />

        <button
          onClick={handleLogin}
          className="
            rounded-xl
            bg-primary
            px-4
            py-3
            text-primary-foreground
          "
        >

          Login

        </button>

      </div>

    </div>

  );

}