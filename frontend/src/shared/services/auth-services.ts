import { apiClient }
from "@/shared/lib/api-client";

interface LoginData {

  email: string;

  password: string;

}

interface RegisterData {

  name: string;

  email: string;

  password: string;

}

// LOGIN
export const login =
async (
  data: LoginData
) => {

  const response =
    await apiClient.post(

      "/auth/login",

      data

    );

  console.log(
    "LOGIN RESPONSE:",
    response.data
  );

  // TOKEN EXTRACTION
  const token =

    response.data.token ||

    response.data.data?.token ||

    response.data.user?.token;

  console.log(
    "TOKEN FOUND:",
    token
  );

  // SAVE TOKEN
  if (token) {

    localStorage.setItem(
      "token",
      token
    );

  }

  return response.data;

};

// REGISTER
export const register =
async (
  data: RegisterData
) => {

  const response =
    await apiClient.post(

      "/auth/register",

      data

    );

  console.log(
    "REGISTER RESPONSE:",
    response.data
  );

  // TOKEN EXTRACTION
  const token =

    response.data.token ||

    response.data.data?.token ||

    response.data.user?.token;

  console.log(
    "TOKEN FOUND:",
    token
  );

  // SAVE TOKEN
  if (token) {

    localStorage.setItem(
      "token",
      token
    );

  }

  return response.data;

};

// LOGOUT
export const logout =
() => {

  localStorage.removeItem(
    "token"
  );

};

// GET TOKEN
export const getToken =
() => {

  return localStorage.getItem(
    "token"
  );

};