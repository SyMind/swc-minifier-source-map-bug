import * as path from 'path';
import * as fs from "fs";
import swc from "@swc/core";
 
const src = fs.readFileSync(path.join(import.meta.dirname, 'index.js'), 'utf-8');
const { code, map } = await swc.minify(src,
  {
    module: true,
    compress: true,
    mangle: true,
    sourceMap: true,
  }
);

const dist = path.join(import.meta.dirname, './dist');
if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
}
fs.writeFileSync(path.join(dist, "main.js"), code, 'utf-8');
fs.writeFileSync(path.join(dist, "main.js.map"), JSON.stringify(map), 'utf-8');
