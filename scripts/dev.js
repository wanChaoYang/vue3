//打包配置 是通过monorepo的方式进行打包
//1.获取打包文件(打包目录)
// import { readdirSync, statSync } from 'node:fs';
import { execa } from "execa";
//2.进行打包 并行打包
async function build(target) {
    //exeac打包第一参数是rollup方式打包第二参数数组,第三个参数是配置子进程在父进程中的输出配置
    await execa(
        "rollup",//执行rollup的配置
        [
            "-cw",//-c执行配置环境 -w标识热更新
            "--environment", //环境变量配置
            `TARGET:${target}`//添加的配置信息
        ],
        { stdio: 'inherit' }//最外层需要打印添加这个属性
    )
}
build('reactivity')
