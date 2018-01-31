const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'app/main.js'),

  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      path.resolve('./app')
    ]
  },

   output: {
      path:'./',
      filename: 'index.js',
   },

   devServer: {
      inline: true,
      port: 8081
   },

   module: {
     preLoaders: [
        { test: /\.json$/, loader: 'json'}
    ],
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   },

   node: {
     fs: 'empty',
     net: 'empty',
     tls: 'empty'
   }
}
