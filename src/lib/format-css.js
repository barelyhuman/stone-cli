const css = require("css");

export function formatCSS(cssData) {
  return css.stringify(css.parse(cssData));
}
