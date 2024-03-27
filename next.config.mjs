import { join, resolve } from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	images: {
		unoptimized: true,
	},
	sassOptions: {
		includePaths: [join(resolve(), 'src', 'styles')],
		prependData: '@import "~/styles/base.scss";',
	},
}

export default nextConfig
