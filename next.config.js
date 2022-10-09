/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => {
    return [
      {
        source: "/",
        destination: "/stocks",
        permanent: true,
      },
      {
        source: "/api/:path*",
        destination: "https://cuptorul-bio-app.onrender.com/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
