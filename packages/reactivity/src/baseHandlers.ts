import { isObject } from "@vue/shared";
import { reactive, readonly } from "./reactive";

function createGetter(isReadonly = false, shall = false) {
    //返回一个函数
    return function get(target: object, key: string | symbol, receivers: object) {
        //proxy + reflect反射来进行搭配
        const res = Reflect.get(target, key, receivers);
        //判断是否是只读的,不是只读搜集依赖，否知返回不代理
        if (!isReadonly) {
            //收集依赖
        }
        //判断是否是浅的
        if (shall) return res
        //key 是个对象的 就需要递归
        //vue3 的性能优化懒代理，不使用对象的第二层就使用readonly进行懒代理
        if (isObject(res)) {
            return isReadonly ? readonly(res) : reactive(res)
        }
        return res;
    }
}
const get = createGetter();//不是只读，是深的
const shallowGet = createGetter(false, true);//不是只读，是浅的
const readonlyGet = createGetter(true);//是只读深的
const shallowReadonlyGet = createGetter(true, true);//是只读浅的
export const reactiveHandlers = {
    get
};
export const shallowReactiveHandlers = {
    get: shallowGet
};
export const readonlyHandlers = {
    get: readonlyGet
};
export const shallowReadonlyHandlers = {
    get: shallowReadonlyGet
};
