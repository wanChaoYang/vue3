//通过rollup进行打包
//1. 引入相关依赖
import ts from "rollup-plugin-typescript2"//解析ts
import json from "@rollup/plugin-json"
import resolvePlugin from "@rollup/plugin-node-resolve"//解析第三方插件
import path from "node:path";//处理路径
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url)
const __dirname = fileURLToPath(new URL('.', import.meta.url));
//2.获取打包文件夹
const packagesDir = path.resolve(__dirname, 'packages');
//2.1获取需要打包的包
const packageDir = path.resolve(packagesDir, process.env.TARGET);
//2.2获取到打包的每个包的项目配置
const resolve = p => path.resolve(packageDir, p);
const pkg = require(resolve(`package.json`))//获取json
//3.创建一个表
const name = path.basename(packageDir);//获取到文件的名称
const outPutOptions = {
    "esm-bundler": {
        file: resolve(`dist/${name}.esm-bundler.js`),
        format: "es"
    },
    "cjs": {
        file: resolve(`dist/${name}.cjs.js`),
        format: "cjs"
    },
    "global": {
        file: resolve(`dist/${name}.global.js`),
        format: "iife"//表示一个全局变量
    }
}
const options = pkg.buildOptions;
function createConfig(format, output) {
    //进行打包输出
    output.name = options.name
    output.sourcemap = true;//添加一个调试代码的映射
    //生成roullup配置
    return {
        input: resolve("src/index.ts"),//导入
        output,
        plugins: [
            json(),
            ts({ //解析 ts
                tsconfig: path.resolve(__dirname, "tsconfig.json")
            }),
            resolvePlugin()
        ]
    }
}
//导出rollup的配置
export default options.formats.map(format => createConfig(format, outPutOptions[ format ]))

