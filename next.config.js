/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.notion.so", "lh3.googleusercontent.com"],
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/blog/page/1",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
