import { observable, action, computed, autorun } from 'mobx';

/*
https://ppt.baomitu.com/p/b3bbf855#/
1、定义
（1）支持被observable的类型有三个，分别是Object, Array, Map；
（2）对于原始类型，可以使用Obserable.box。
备注：
值得注意的一点是，当某一数据被observable包装后，他返回的其实是被observable包装后的类型
类型判断
可以通过Mobx原始提供的observable.toJS()转换成JS再判断，
或者直接使用Mobx原生提供的如：APIisObservableArray进行判断。

2、依赖
computed： 简而言之，你有一个值，该值的结果依赖于state，并且该值也需要被obserable，那么就使用computed。
autorun: 另一个响应state的api便是autorun。和computed类似，每当依赖的值改变时，其都会改变。用途：例如打印日志，更新UI等等。

3、改变
action.bound语法糖，目的是为了解决javascript作用域问题。

4. 补充
无法收集新增的属性
可以通过extendObservable(target, props)方法来实现。 当然，如果你对变量的entry增删非常关心，应该使用Map数据结构而不是Object。
*/
class Store {
  constructor() {
    autorun((e) => {
      console.log(JSON.stringify(this.mObj))
    })
  }

  @observable arr = [1,3,5,6]
  @observable str = 'hello mbox'
  @observable mObj = new Map([['name', 'xiaoming'], ['city', 'beijing']])
  @observable obj = {
    name: '',
    city: ''
  }

  // arr
  @action.bound
  getArr() {
    return this.arr
  }

  @action.bound
  setArr(s, _item) {
    if(s) {
      this.arr.push(_item)
    } else {
      this.arr.forEach((item, index) => {
        if (item == _item) {
          this.arr.splice(index, 1)
        }
      })
    }
  }

  // str
  @action.bound
  getStr() {
    return '刚刚输入的是：' + this.str
  }

  @action.bound
  setStr(_str) {
    this.str = _str
  }

  // map
  @action.bound
  getMap() {
    return this.mObj
  }

  @action.bound
  setMap(s, key, val) {
    if (s) {
      this.mObj.set(key, val)
    } else {
      this.mObj.delete(key)
    }
  }

  // obj
  @action.bound
  getObj() {
    return JSON.stringify(this.obj)
  }

  @action.bound
  setObj(key, val) {
    this.obj[key] = val
  }

  // computed
  @computed get
  print () {
    return this.str + ' | ' + JSON.stringify(this.arr) + ' | '  + JSON.stringify(this.obj)
  }
}

export default new Store()