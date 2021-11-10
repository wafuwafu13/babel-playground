// Debug AST: https://astexplorer.net/
// Babel Plugin Handbook: https://gist.github.com/wafuwafu13/d424f2eabb870ec4f338f10006eadff0
const { transformFileSync } = require("@babel/core");
const generate = require("@babel/generator").default;
const { writeFile } = require("fs");

const plugin = ({ types: t, template }) => {
  return {
    visitor: {
      
    },
  };
};

const { code } = transformFileSync("in.js", {
  plugins: [plugin],
  presets: ["@babel/preset-react"],
});

writeFile("out.js", code, (err) => {
  if (err) throw err;
  console.log("saved!");
});
