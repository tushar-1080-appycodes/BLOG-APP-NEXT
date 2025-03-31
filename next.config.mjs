/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',  // Ensure protocol is specified
          hostname: 'dummyimage.com', // This configuration allows loading images from dummyimage.com.  
        },
      ],
    },
  };

export default nextConfig;
