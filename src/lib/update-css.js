import { formatCSS } from "./format-css";
import fs from "fs";
import css from "css";

export function updateCSS(options = { path: "", css: "" }) {
  if (!fs.existsSync(options.path)) {
    fs.writeFileSync(options.path, "");
  }
  const buffer = fs.readFileSync(options.path);
  let _data = buffer.toString();

  // TODO: handle duplicated classes and overwriting of classes

  _data += css;
  _data = formatCSS(_data);
  fs.writeFileSync(filePath, _data);
}
