const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,
	entry: {
		editor: './src/editor/index.js',
		frontend: './src/frontend/index.js',
	},
};
