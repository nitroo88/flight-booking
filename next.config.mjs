import { join, resolve } from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
	sassOptions: {
		includePaths: [join(resolve(), 'src', 'styles')],
		prependData: '@import "~/styles/base.scss";',
	},
}

export default nextConfig
