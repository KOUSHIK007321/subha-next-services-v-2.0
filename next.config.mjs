/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: {
        allowedOrigins: ["localhost:3000", "m4jlcwl5-3000.inc1.devtunnels.ms"],
      },
    },
    devIndicators: false
  }
  
  export default nextConfig
  