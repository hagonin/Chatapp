import path from 'path';
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import ESLintPlugin from 'eslint-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const isDevelopment = process.env.NODE_ENV !== 'production';
const PORT = 3000;

const plugins: webpack.WebpackPluginInstance[] = [
	new HTMLWebpackPlugin({
		template: './public/index.html',
	}),
	new MiniCssExtractPlugin({
		// Options similar to the same options in webpackOptions.output
		// both options are optional
		filename: '[name].css',
		chunkFilename: '[id].css',
	}),
	// [new ESLintPlugin()],
];
isDevelopment
	? plugins.push(new ReactRefreshWebpackPlugin())
	: plugins.push(new MiniCssExtractPlugin());

const config: webpack.Configuration = {
	mode: isDevelopment ? 'development' : 'production',
	externals: {
		devServer: {
			hot: true,
			port: PORT,
			contentBase: path.join(__dirname, 'public'),
			compress: true,
		},
	},
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'index.js',
	},
	plugins,
	resolve: {
		modules: [path.resolve(__dirname, './src'), 'node_modules'],
		// automatically resolve certain extensions (Ex. import './file' will automatically look for file.js)
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
		alias: {
			// absolute path importing files
			'@components': path.resolve(__dirname, './src/components'),
			'@pages': path.resolve(__dirname, './src/pages'),
		},
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.html$/,
				use: ['html-loader'],
			},
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: require.resolve('babel-loader'),
						options: {
							presets: [
								'@babel/preset-env',
								'@babel/preset-react',
								'@babel/preset-typescript',
							],
							plugins: [
								isDevelopment && require.resolve('react-refresh/babel'),
							].filter(Boolean),
						},
					},
				],
			},
			// remove this line below for a production build
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(sa|sc|c)ss$/i, // .sass or .scss
				enforce: 'pre',
				use: [
					// Creates `style` nodes from JS strings
					isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
					// Translates CSS into CommonJS
					'css-loader',
					'source-map-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							implementation: require.resolve('sass'),
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg|png|jpg|gif)$/i,
				use: [
					{
						loader: 'url-loader',
					},
				],
			},
		],
	},
};

export default config;
