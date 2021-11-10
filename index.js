// Debug AST: https://astexplorer.net/
// Babel Plugin Handbook: https://gist.github.com/wafuwafu13/d424f2eabb870ec4f338f10006eadff0
const { transformFileSync } = require("@babel/core");
const generate = require("@babel/generator").default;
const { writeFile } = require("fs");

const plugin = ({ types: t, template }) => {
  return {
    visitor: {
      CallExpression: (path) => {
        if (path.node.callee.name === "assert") {
          if (
            t.isJSXElement(path.node.arguments[0]) ||
            (t.isCallExpression(path.node.arguments[0]) &&
              t.isJSXElement(path.node.arguments[0].arguments[0]))
          )
            return;
          const arg = generate(path.node.arguments[0]).code;
          const replaceCode = `expect(${arg}).toBeTruthy();`;
          const newAST = template(replaceCode)();
          path.replaceWith(newAST);
        }
      },
      JSXElement: (path) => {
        path.skip();
      },
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
