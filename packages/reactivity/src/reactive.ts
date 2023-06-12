
import {reactiveHandlers,shallowReactiveHandlers,readonlyHandlers,shallowReadonlyHandlers } from "./baseHandlers";
import { isObject } from "@vue/shared";
export function reactive<T extends object>(target: T) {
    return createReactiveObject(target, false, reactiveHandlers)//高阶函数
};
export function shallowReactive<T extends object>(target: T) {
    return createReactiveObject(target, false, shallowReactiveHandlers)//高阶函数
};
export function readonly<T extends object>(target: T) {
    return createReactiveObject(target, true, readonlyHandlers)//高阶函数
};
export function shallowReadonly<T extends object>(target: T) {
    return createReactiveObject(target, true, shallowReadonlyHandlers)//高阶函数
};
//4个方法 （1）是不是只读 （2是不是深的） 
//注意：核心Proxy进行代理 源码中采用高阶函数的柯里化：根据不同参数返回
/**
 * 这个函数的核心是实现代理
 * @param target  目标对象
 * @param isReadonly 是否只读
 * @param baseHandlers 实现代理
 */
const reactiveMap = new WeakMap();//es6的语法 key必须是对象 自动的垃圾回收，不会内存泄露
const readonlyMap = new WeakMap();
function createReactiveObject(target: object, isReadonly: boolean, baseHandlers: any) {
    //判断是否是对象
    if (!isObject(target)) {
        return target;
    }
    //问题优化：如果这对象已经代理了就不需要代理了，避免重复代理
    const proxymap = isReadonly ? readonlyMap : reactiveMap;
    if (proxymap.get(target)) return proxymap.get(target)
    //核心 
    const proxy = new Proxy(target, baseHandlers);
    proxymap.set(target, proxy);//存入
    return proxy
}
