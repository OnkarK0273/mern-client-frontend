"use server";

import cookie from "cookie";
import { cookies } from "next/headers";

export default async function login(prevState: any, formdata: FormData) {
  const email = formdata.get("email");
  const password = formdata.get("password");

  // Move this inside the function - we must await it later

  const cookieStore = await cookies();

  try {
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        type: "error",
        message: error.errors?.[0]?.msg || "Login failed",
      };
    }

    // Extract cookies from the backend response headers
    const rawCookies = response.headers.getSetCookie();
    const accessTokenStr = rawCookies.find((c) => c.includes("accessToken"));
    const refreshTokenStr = rawCookies.find((c) => c.includes("refreshToken"));

    if (!accessTokenStr || !refreshTokenStr) {
      return {
        type: "error",
        message: "Authentication tokens missing from server response.",
      };
    }

    // Parse the cookie strings into objects
    const parsedAccess = cookie.parse(accessTokenStr);
    const parsedRefresh = cookie.parse(refreshTokenStr);

    // --- ACCESS TOKEN ---
    // Make sure to await each set call in Next.js 15+
    await cookieStore.set({
      name: "accessToken",
      value: parsedAccess.accessToken,
      expires: new Date(
        parsedAccess.Expires || parsedAccess.expires || Date.now() + 3600000,
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/", // Default to root
    });

    // --- REFRESH TOKEN ---
    await cookieStore.set({
      name: "refreshToken",
      value: parsedRefresh.refreshToken,
      expires: new Date(
        parsedRefresh.Expires ||
          parsedRefresh.expires ||
          Date.now() + 604800000,
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: parsedRefresh.Path || "/",
      sameSite:
        (parsedRefresh.SameSite?.toLowerCase() as "strict" | "lax" | "none") ||
        "lax",
    });

    return {
      type: "success",
      message: "Login successful!",
    };
  } catch (err: any) {
    console.error("Login Error:", err);
    return {
      type: "error",
      message: err.message || "An unexpected error occurred.",
    };
  }
}
