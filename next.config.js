/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => {
    return [
      {
        source: "/",
        destination: "/stocks",
      },
      {
        source: "/api/:path*",
        destination: "https://cuptorul-bio-app.onrender.com/api/:path*",
        // destination: "http://localhost:3000/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
