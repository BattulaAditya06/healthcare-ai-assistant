"use client";

import {
  useState
} from "react";

import {
  useRouter
} from "next/navigation";

import {
  login
} from "@/shared/services/auth-service";

export function LoginForm() {

  const router =
    useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        setLoading(true);

        // IMPORTANT
        await login({

          email,

          password

        });

        console.log(
          "TOKEN AFTER LOGIN:",
          localStorage.getItem(
            "token"
          )
        );

        // SMALL DELAY
        setTimeout(() => {

          router.push(
            "/chat"
          );

        }, 300);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  return (

    <form
      onSubmit={
        handleSubmit
      }
    >

      <input
        type="email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
      />

      <input
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
      />

      <button
        type="submit"
      >

        {loading
          ? "Loading..."
          : "Login"}

      </button>

    </form>

  );

}