import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Gera o site 100% estático (HTML/CSS/JS) na pasta "out" — sem backend.
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
