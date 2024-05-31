module.exports = {
  presets: [
    ['@babel/preset-env', { modules: false }],
    '@vue/cli-plugin-babel/preset'
    
  ],
  plugins: ["@babel/plugin-transform-modules-commonjs",
  "@babel/plugin-syntax-dynamic-import",
 
  ]
}
