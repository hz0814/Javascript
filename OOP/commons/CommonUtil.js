/**
     * BH 命名空间 namespace
     */
var BH = {};


/**
 * 接口需要2个参数
 * 参数1：接口的名字(string)
 * 参数2：接受方法名称的集合(数组)
 */
BH.Interface = function (name, methods) {
  // 判断接口的参数个数
  if (arguments.length != 2) {
    throw new Error('arguments must be 2 length');
  }
  this.name = name;
  this.methods = [];//定义一个内置的空数组对象 等待接受methods的元素(方法名字)
  for (var i = 0, len = methods.length; i < len; i++) {
    if (typeof methods[i] !== 'string') {
      throw new Error('name must be string');
    }
    this.methods.push(methods[i]);
  }
}

// 检测方法
BH.Interface.ensureImplements = function (object) {
  // 如果检测方法接受的参数小于2个，参数传递失败
  if (arguments.length < 2) {
    throw new Error('arguments must be >=2');
  }
  // 获得接口实例对象
  for (var i = 1, len = arguments.length; i < len; i++) {
    var instanceInterface = arguments[i];
    if (instanceInterface.constructor !== BH.Interface) {
      throw new Error('the arguments not be Interface');
    }
    for (var j = 0; j < instanceInterface.methods.length; j++) {
      // 用一个临时变量 接受每一个方法的名字
      var methodName = instanceInterface.methods[j];
      if (!object[methodName] || typeof (object[methodName]) !== 'function') {
        throw new Error('this method "' + methodName + '" not found');
      }
    }
  }
}

// extend方法：继承1次父类模板，一次父类原型对象
// 只继承一遍父类的原型对象
BH.extend = function (sub, sup) {
  // 目的：实现只继承父类的原型对象
  var F = new Function();           //1.创建一个空函数 目的：进行中转
  F.prototype = sup.prototype;      //2.实现空函数的原型对象和超类的原型对象转换
  sub.prototype = new F();          //3.原型继承
  sub.prototype.constructor = sub;  //4.还原子类构造器
  // 保存父类原型对象：1.方便解耦 2.方便获得父类的原型对象
  sub.superClass = sup.prototype;     //自定义子类的一个静态属性
  // 判断父类原型对象构造器
  if (sup.prototype.constructor == Object.prototype.constructor) {
    sup.prototype.constructor = sup;
  }
}

/**
 * 单体模式
 * 实现一个跨浏览器的事件处理程序
 */
BH.EventUtil = {
  addHandler: function (element, type, handler) {
    if (window.addEventListener) {  //FF
      element.addEventListener(type, handler, false);//冒泡
    } else if (window.attachEvent) { //IE
      element.attachEvent('on' + type, handler);
    }
  },
  removeHandler: function (element, type, handler) {
    if (window.removeEventListener) {  //FF
      element.removeEventListener(type, handler, false);//冒泡
    } else if (window.detachEvent) { //IE
      element.detachEvent('on' + type, handler);
    }
  }
}

// 扩展Array原型对象，遍历数组的每一个元素，并让每一个元素执行fn函数(可遍历多维数组)
Array.prototype.each = function (fn) {
  try {
    // 1.目的：遍历数组每一项，计数器：记录当前遍历元素位置
    this.i || (this.i = 0);
    // 2.严谨的判断什么时候走each核心方法
    // 当数组的长度大于0 && 传递的参数为函数
    if (this.length > 0 && fn.constructor == Function) {
      // 循环遍历每一项
      while (this.i < this.length) {
        // 获取数组每一项
        var e = this[this.i];
        // 如果当前元素去到了并且为数组
        if (e && e.constructor == Array) {
          e.each(fn);
        } else {
          fn.apply(e, [e]);
        }
        this.i++;
      }
      this.i = null;
    }
  } catch (error) {
    console.log(error);
  }
  return this;
}