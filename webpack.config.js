module.exports = {
    entry: "./app/index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ],
        rules: [
     		 {
        "exclude": "/node_modules/",
        "loader": "babel-loader"
    }
  ]

}
}

