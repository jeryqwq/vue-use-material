const { readdirSync, readFileSync, writeFileSync } = require ('fs');
const path = require('path');
const dir = path.join('./', '/dist')
readdirSync(dir).forEach(i => {
  if(i.endsWith('.js')) {
    const filePath = path.resolve(__dirname, `./dist/${i}`)
    const content = readFileSync(filePath)
    const res = require("@babel/core").transformSync(content, {
      plugins: ["@babel/plugin-transform-arrow-functions", '@babel/plugin-proposal-optional-chaining'],
      presets: ["@babel/preset-env"],
    });
    writeFileSync(filePath, res.code)
  }
})
