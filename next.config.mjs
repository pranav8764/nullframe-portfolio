/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/resume.pdf",
        destination: "/1-Pranav_Rajoria_Resume.pdf",
        permanent: false
      }
    ];
  }
};

export default nextConfig;
