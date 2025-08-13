// Webpack configuration file
// This tells your computer how to bundle and serve your React app

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  // Entry point - where webpack starts reading your code
  entry: './src/index.js',
  
  // Output - where the built files go
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // Clean the output directory before each build
  },
  
  // Module rules - how to handle different file types
  module: {
    rules: [
      {
        // Handle JavaScript and JSX files
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        // Handle CSS files
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  
  // Plugins - additional functionality
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    })
  ],
  
  // Development server configuration
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    hot: true, // Enable hot reloading (updates without full page refresh)
    open: true, // Automatically open browser
    historyApiFallback: true, // Handle client-side routing
  },
  
  // Resolve file extensions
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
