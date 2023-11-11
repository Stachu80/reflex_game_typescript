// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const isProduction = process.env.NODE_ENV == 'production';


const config = {
    entry: './src/main.ts',
    output: {
        filename:"bundle.js",
        path: path.resolve(__dirname, 'public'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
             {
                 test: /\.css$/,
                 use: ['style-loader', 'css-loader']
             },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
        
    } else {
        config.mode = 'development';
    }
    return config;
};
