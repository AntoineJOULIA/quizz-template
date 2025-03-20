import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: process.env.NODE_ENV === "production" ? "/quizz" : "",
};

export default nextConfig;
