/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'sgp.cloud.appwrite.io',
                port: '',
                pathname: '**'
            }
        ]
        //domains: ['sgp.cloud.appwrite.io'],/v1/storage/buckets/
    }
};

export default nextConfig;
