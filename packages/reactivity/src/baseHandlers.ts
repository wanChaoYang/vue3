import { isObject } from "@vue/shared";
import { reactive, readonly } from "./reactive";
import {TrackOpTypes} from "./operations";
import { Track } from "./effect";

function createGetter(isReadonly = false, shall = false) {
    //返回一个函数
    return function get(target: object, key: string | symbol, receivers: object) {
        //proxy + reflect反射来进行搭配
        const res = Reflect.get(target, key, receivers);
        //判断是否是只读的,不是只读搜集依赖，否知返回不代理
        if (!isReadonly) {
            //收集依赖effect,等数据变化后更新视图
            Track(target,TrackOpTypes.GET,key)
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

//set
const set = createSetter();
const shallowSet = createSetter(true);
function createSetter(shallow = false) {
    return function set(
        target: object,
        key: string | symbol,
        value: unknown,
        receivers: object
    ) {
        const res = Reflect.set(target, key, value, receivers);//映射的方式获取最新值
        return res;
    }
}
export const reactiveHandlers = {
    get,
    set
};
export const shallowReactiveHandlers = {
    get: shallowGet,
    set: shallowSet,
};
export const readonlyHandlers = {
    get: readonlyGet,
    //只读的不能修改
    set: () => {
        console.warn('set on key faild');
    }
};
export const shallowReadonlyHandlers = {
    get: shallowReadonlyGet,
    set: () => {
        console.warn('set on key faild');
    }
};
