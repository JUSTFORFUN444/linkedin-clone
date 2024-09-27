/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [{
            protocol:'https',
            hostname:'res.cloudinary.com'
        }]
    },
    experimental:{
        serverActions:{
            bodySizeLimit: '20mb'
         } 
    },
    eslint: {
        ignoreDuringBuilds: true, // This will disable ESLint checks during the build process
    }
   
};

export default nextConfig;
