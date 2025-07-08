/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: false, // ✅ This disables the route type-checking error
  },
};

export default nextConfig;
