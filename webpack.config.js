module.exports = {
    mode: 'developement',
      entry: './src/index.js',
      output: {
          path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
      module: {
        rules: [{
            test: /\.(svg|png|jpg|gif|mp4)$/,
            loader: 'file-loader',
            options: {
              name: 'assets/[contenthash].[ext]',
            },
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          }]
    },
      plugins: []
}