import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpack, { Configuration as WebpackConfiguration } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const isDevelopment = process.env.NODE_ENV !== 'production'; //배포용   //development : 개발용

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const config: webpack.Configuration = {
    name: 'ReviewSite',
    mode: isDevelopment ? 'development' : 'production',
    devtool: !isDevelopment ? 'hidden-source-map' : 'eval',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'], //바벨이 처리할 확장자 목록
        alias: {
            '@hooks': path.resolve(__dirname, 'hooks'), // .../.../.../ 을 @src/fasdasda 로도 가능하게
            '@components': path.resolve(__dirname, 'components'),
            '@layouts': path.resolve(__dirname, 'layouts'),
            '@pages': path.resolve(__dirname, 'pages'),
            '@utils': path.resolve(__dirname, 'utils'),
            '@typings': path.resolve(__dirname, 'typings'),
        },
    },
    entry: {
        app: './client',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: { browsers: ['last 2 chrome versions'] }, // target 브라우져에서 호환이 되도록 바꾸어주는 preset-env
                                debug: isDevelopment,
                            },
                        ],
                        '@babel/preset-react',
                        '@babel/preset-typescript',
                    ],
                    env: {
                        development: {
                            plugins: [['@emotion', { sourceMap: true }], require.resolve('react-refresh/babel')],
                        },
                        production: {
                            plugins: ['@emotion'],
                        },
                    },
                },
                exclude: path.join(__dirname, 'node_modules'),
            },
            {
                test: /\.css?$/,
                use: ['style-loader', 'css-loader'], //babel이 loader로 css파일도 javascript로 변환해준다
            },
        ],
    },
    plugins: [
        // ts와 webpack을 동시에 돌아가게 도와주는 라이브러리(성능 상승)
        new ForkTsCheckerWebpackPlugin({
            async: false,
            // eslint: {
            //   files: "./src/**/*",
            // },
        }),
        new webpack.EnvironmentPlugin({ NODE_ENV: isDevelopment ? 'development' : 'production' }),
    ],

    //entry를 따라 쭉 써내려간 결과물을 output형태로 나오게한다.
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist/',
    },
    devServer: {
        historyApiFallback: true, // react router
        port: 3090,
        static: { directory: path.resolve(__dirname) },
        proxy: {
            '/api/': {
                target: 'http://localhost:3095',
                changeOrigin: true,
            },
        },
    },
};

//개발환경일때 plugin들과
if (isDevelopment && config.plugins) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new ReactRefreshWebpackPlugin());
    // config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: true }));
}

//개발환경이 아닐때 plugin들
if (!isDevelopment && config.plugins) {
    config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
    // config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
}

export default config;
