import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  /**
   *
   * @returns melakukan redirect paksa jika ada yang mengakses halaman '/'
   */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/workflows",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
