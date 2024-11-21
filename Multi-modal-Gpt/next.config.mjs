/** @type {import('next').NextConfig} */
const nextConfig = {
   output: "standalone",
   images: {
      remotePatterns: [{ hostname: 'localhost' }, { hostname: 'randomuser.me' }],
   },
   typescript: {
      ignoreBuildErrors: true,
   },
   
}

export default nextConfig
