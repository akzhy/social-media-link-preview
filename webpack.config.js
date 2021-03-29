const webpack = require('webpack'),
    path = require('path'),
    fileSystem = require('fs-extra'),
    env = require('./utils/env'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    TerserPlugin = require('terser-webpack-plugin');

const ASSET_PATH = process.env.ASSET_PATH || '/';

const alias = {
    'react-dom': '@hot-loader/react-dom',
    src: path.resolve(__dirname, 'src'),
};

// load the secrets
const secretsPath = path.join(__dirname, 'secrets.' + env.NODE_ENV + '.js');

const fileExtensions = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'eot',
    'otf',
    'svg',
    'ttf',
    'woff',
    'woff2',
];

if (fileSystem.existsSync(secretsPath)) {
    alias['secrets'] = secretsPath;
}

const options = {
    mode: process.env.NODE_ENV || 'development',
    entry: {
        popup: path.join(__dirname, 'src', 'parts', 'popup', 'index.jsx'),
        background: path.join(
            __dirname,
            'src',
            'parts',
            'background',
            'index.ts'
        ),
        contentScript: path.join(
            __dirname,
            'src',
            'parts',
            'content',
            'index.ts'
        ),
    },
    chromeExtensionBoilerplate: {
        notHotReload: ['contentScript'],
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js',
        publicPath: ASSET_PATH,
    },
    module: {
        rules: [
            {
                test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'source-map-loader',
                    },
                    {
                        loader: 'babel-loader',
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        alias: alias,
        fallback: {
            fs: false,
            tls: false,
            net: false,
            zlib: false,
            http: false,
            https: false,
            stream: false,
            crypto: false,
            util: false,
            buffer: false,
            assert: false,
            path: require.resolve('path-browserify'),
        },
        extensions: fileExtensions
            .map((extension) => '.' + extension)
            .concat(['.js', '.jsx', '.ts', '.tsx', '.css']),
    },
    plugins: [
        new webpack.ProgressPlugin(),
        // clean the build folder
        new CleanWebpackPlugin({
            verbose: true,
            cleanStaleWebpackAssets: true,
        }),
        // expose and write the allowed env consts on the compiled bundle
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/manifest.json',
                    to: path.join(__dirname, 'build'),
                    force: true,
                    transform: function (content, path) {
                        // generates the manifest file using the package.json informations
                        return Buffer.from(
                            JSON.stringify({
                                description:
                                    process.env.npm_package_description,
                                version: process.env.npm_package_version,
                                ...JSON.parse(content.toString()),
                            })
                        );
                    },
                },
            ],
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/assets/img/icon-128.png',
                    to: path.join(__dirname, 'build'),
                    force: true,
                },
            ],
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/assets/img/icon-34.png',
                    to: path.join(__dirname, 'build'),
                    force: true,
                },
            ],
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/assets/img/broken.png',
                    to: path.join(__dirname, 'build'),
                    force: true,
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: path.join(
                __dirname,
                'src',
                'parts',
                'popup',
                'index.html'
            ),
            filename: 'popup.html',
            chunks: ['popup'],
            cache: false,
        }),
    ],
    infrastructureLogging: {
        level: 'info',
    },
};

if (env.NODE_ENV === 'development') {
    options.devtool = 'cheap-module-source-map';
} else {
    options.optimization = {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
    };
}

module.exports = options;
