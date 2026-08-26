import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://pokeapi.co/**"),
      new URL("https://raw.githubusercontent.com/**"),
      new URL("https://images.dog.ceo/**"),
    ],
  },
};

export default nextConfig;
