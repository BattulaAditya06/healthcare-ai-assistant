
import { apiClient }
from "@/shared/lib/api-client";

import {
  AuthResponse
} from "../types/auth";

// SIGNUP
export const signup =
async (
  data: {

    name: string;

    email: string;

    password: string;

  }
) => {

  const response =
    await apiClient.post<AuthResponse>(

      "/auth/register",

      data

    );

  // SAVE TOKEN
  if (
    response.data.token
  ) {

    localStorage.setItem(

      "token",

      response.data.token

    );

  }

  return response.data;

};

// LOGIN
export const login =
async (
  data: {

    email: string;

    password: string;

  }
) => {

  const response =
    await apiClient.post<AuthResponse>(

      "/auth/login",

      data

    );

  console.log(
    "LOGIN RESPONSE:",
    response.data
  );

  // SAVE TOKEN
  if (
    response.data.token
  ) {

    localStorage.setItem(

      "token",

      response.data.token

    );

  }

  console.log(
    "TOKEN AFTER SAVE:",
    localStorage.getItem(
      "token"
    )
  );

  return response.data;

};

// LOGOUT
export const logout =
() => {

  localStorage.removeItem(
    "token"
  );

};
