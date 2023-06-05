//打包配置 是通过monorepo的方式进行打包
//1.获取打包文件(打包目录)
import { readdirSync, statSync } from 'node:fs';
import { execa } from "execa";
//读取文件
//注意：文件夹才进行打包，需要处理一下过滤掉非文件夹的文件
// fs.statSync读到文件的状态 isDirectory()是否是文件夹
const dirs = readdirSync("packages").filter(p => statSync(`packages/${p}`).isDirectory());
console.log('dirs', dirs);
//2.进行打包 并行打包
async function build(target) {
    console.log('888', target);
    //exeac打包第一参数是rollup方式打包第二参数数组,第三个参数是配置子进程在父进程中的输出配置
    await execa(
        "rollup",
        //["-c 执行rollup的配置","--environment 环境变量",`TARGET:${target}` 添加的配置信息]
        [ "-c", "--environment", `TARGET:${target}` ],
        { stdio: 'inherit' })
}
async function runParaller(dirs, itemfn) {
    //遍历文件
    let result = [];
    for (let item of dirs) {
        result.push(itemfn(item))
    }
    return Promise.all(result);//存放打包的promise，这里打包执行后，调用成功
}

runParaller(dirs, build).then(() => {
    console.log('成功');

})
