/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'localhost'], // Allow local images and cloudinary
    },
}

module.exports = nextConfig
