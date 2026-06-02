
"use client";

import {
  useState
} from "react";

import {
  useRouter
} from "next/navigation";

import {
  signup
} from "@/features/auth/services/auth-service";

export default function SignupPage() {

  const router =
    useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

 const handleSignup =
  async () => {

    try {

      setLoading(true);

      console.log(
        "SIGNUP START"
      );

      const response =
        await signup({

          name,

          email,

          password

        });

      console.log(
        "SIGNUP RESPONSE:",
        response
      );

      console.log(
        "TOKEN:",
        localStorage.getItem(
          "token"
        )
      );

      router.push(
        "/chat"
      );

    } catch (error) {

      console.log(
        "SIGNUP ERROR:",
        error
      );

    } finally {

      setLoading(false);

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
          w-full
          max-w-md
          rounded-xl
          border
          p-8
          shadow
        "
      >

        <h1
          className="
            mb-6
            text-2xl
            font-bold
          "
        >

          Signup

        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="
              w-full
              rounded-lg
              border
              p-3
            "
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="
              w-full
              rounded-lg
              border
              p-3
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
              w-full
              rounded-lg
              border
              p-3
            "
          />

          <button
            onClick={
              handleSignup
            }
            className="
              w-full
              rounded-lg
              bg-black
              p-3
              text-white
            "
          >

            {loading
              ? "Creating..."
              : "Signup"}

          </button>

        </div>

      </div>

    </div>

  );

}
