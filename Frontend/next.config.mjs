/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true, // This makes it a permanent redirect (301)
      },
    ];
  },
};

export default nextConfig;
