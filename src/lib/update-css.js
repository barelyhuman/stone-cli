import { compile, prefixer, middleware, serialize, stringify } from "stylis";
import fs from "fs";

export function updateCSS(options = { path: "", css: "" }) {
  if (!fs.existsSync(options.path)) {
    fs.writeFileSync(options.path, "");
  }
  const buffer = fs.readFileSync(options.path);
  let existingCSSString = buffer.toString();

  // TODO: handle duplicated classes and overwriting of classes

  let parsedCSS;
  try {
    parsedCSS = compile(existingCSSString);
  } catch (err) {
    parsedCSS = false;
  }

  if (!parsedCSS) {
    existingCSSString = options.css;
    existingCSSString = serialize(compile(existingCSSString), stringify);
  }

  existingCSSString += "\n\n" + options.css;
  existingCSSString = serialize(compile(existingCSSString), stringify);

  parsedCSS = compile(existingCSSString);

  const selectors = new Map();

  parsedCSS.forEach((item) => {
    const key = item.value;
    selectors.set(key, item);
  });

  const rules = [...selectors.values()];
  console.log({ rules });

  const writableCSSString = serialize(rules, middleware([prefixer, stringify]));

  fs.writeFileSync(options.path, writableCSSString);
}
