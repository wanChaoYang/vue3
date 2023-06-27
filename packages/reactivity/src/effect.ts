import { TrackOpTypes } from "./operations";
//1.定义effect 
//2.定义相关的属性，目的收集依赖更新视图
export function effect<T = any>(fn: () => T, options: any = {}) {
    const effect = createReactEffect(fn, options);
    //判断一下是否懒加载
    if (!options.lazy) {
        effect()//默认执行
    }
    return effect
}
let uid = 0;//定义全局属性
let activeEffect: any;//全局定义一个effect，保存当前的effect
const effectStack: any[] = [];//定义一个栈
function createReactEffect(fn: () => void, options: any) {
    const effect = function reactiveEffect() {//响应式的effect
        if (!effectStack.includes(effect)) {//保证栈中的effect的唯一性
            // 问题;effect是一个栈型结构，解决effect嵌套问题
            try {
                //入栈的时候,把当前的effect放进去
                effectStack.push(effect)
                activeEffect = effect;
                fn()//执行用户的方法
            } finally {
                //不管代码有没有错误都会往下执行
                //出栈删除最后一个
                effectStack.pop()
                activeEffect = effectStack[effectStack.length - 1]
            }
        }
    }
    effect.id = uid++;//区别effect
    effect._isEffect = true;//区分是否是不是响应式的
    effect.raw = fn;//保存用户的方法
    effect.options = options;//保存用户的属性
    return effect;
}

//3.收集effect 在获取数据的时候收集effect
const targetMap = new WeakMap();//自动的垃圾回收，不会造成内存泄露，，就是key只能是对象
export function Track(target: object, type: TrackOpTypes, key: unknown) {
    //1.获取到对应的属性的effect
    // console.log(target, type, key, activeEffect);
    //对应的key和我们的effect一一对应 
    if (!activeEffect == undefined) {//没有在effect中使用
        return
    }
    //获取effect {target:值(map结构)}
    // map=>key=target=>[effect] set这样的结构
    let depMap = targetMap.get(target)
    //没有值
    if (!depMap) {
        targetMap.set(target, (depMap = new Map()))
    }
    //有值
    let dep = depMap.get(key);
    if (!dep) {
        depMap.set(key, (dep = new Set()))
    }
    if(!dep.has(activeEffect)){
        dep.add(activeEffect)
    }
    console.log(targetMap);
}