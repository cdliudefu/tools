
// 将时间戳转为日期格式
function getLocalTime(ns){
  //return new Date(parseInt(nS) * 1000).toLocaleString().substr(0,17);
  return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
 }
 //test: getLocalTime(1293072805)
 
 // 显示字数限制
function listenTextLength(str, length) {
  length = length ? length : 90; // eslint-disable-line no-unneeded-ternary
  str = str ? str : ''; // eslint-disable-line no-unneeded-ternary
  let index = 0;
  let afterStr = '';
  let srtList = str.split('');
  for (let i = 0; i < srtList.length; i++) {
    if (/[^\u4e00-\u9fa5]/.test(srtList[i])) {
      index = index + 0.5;
    } else {
      index = index + 1;
    }
    if (index >= length || i === srtList.length - 1) {
      index = i;
      break;
    }
  }
  index = Math.floor(index);
  if (index === srtList.length - 1) {
    afterStr = str;
  } else {
    afterStr = str.substr(0, index) + '...';
  }
  return afterStr;
}
  
  // 时间格式化
function formatForDetail(seconds, lang, format) {
  let result = '';
  if (!seconds) return result;

  const time = seconds * 1000;
  if (format && format.length > 0) {
    return moment(new Date(time)).format(format);
  }

  const nowTime = +new Date();

  const diff = Math.floor((nowTime - time) / 1000);
  if (diff <= 0) {
    result = lang === 'zh_CN' ? '刚刚' : 'Just now';
  } else if (diff < 60) {
    result = diff + (lang === 'zh_CN' ? '秒前' : ' seconds ago');
  } else if (diff < 60 * 60) {
    result = Math.floor(diff / 60) + (lang === 'zh_CN' ? '分钟前' : ' minutes ago');
  } else if (diff < 60 * 60 * 24) {
    let hours = Math.floor(diff / (60 * 60));
    result = hours >= 2 ? hours + (lang === 'zh_CN' ? '小时前' : ' hours ago') : hours + (lang === 'zh_CN' ? '小时前' : ' hour ago');
  } else {
    result = moment(new Date(time)).format('YYYY-MM-DD HH:mm');
  }

  return result;
}

// 获取字节数长度
function getByteLen(val) {
  var len = 0;
  if(val){
    for (var i = 0; i < val.length; i++) {
      if (val[i].match(/[^x00-xff]/ig) != null) { // 全角
        len += 2;
      } else {
        len += 1;
      }
    }
  }
  return len;
}

// 动态加载脚本
function loadScript(src, callback) {
  // $('.manueAddJs').remove();
  const manueAddJsEle = document.getElementById('.manueAddJs');
  if (manueAddJsEle && manueAddJsEle.parentNode) {
    manueAddJsEle.parentNode.removeChild(manueAddJsEle);
  }

  let script = document.createElement('script');
  let head = document.getElementsByTagName('head')[0];

  script.type = 'text/javascript';
  script.charset = 'UTF-8';
  script.setAttribute('class', 'manueAddJs');
  var s = src.indexOf('?') >= 0 ? '&' : '?';
  script.src = src + s + Math.random();

  if (script.addEventListener) {
    script.addEventListener('load', function () {
      typeof callback === 'function' && callback();
    }, false);
  } else if (script.attachEvent) {
    script.attachEvent('onreadystatechange', function () {
      var target = window.event.srcElement;
      if (target.readyState === 'loaded') {
        typeof callback === 'function' && callback();
      }
    });
  }
  head.appendChild(script);
}

// 监听事件
function addEventListener(node, event, listener) {
  if (!node) {
    return false;
  }
  if (node.addEventListener) {
    node.addEventListener(event, listener, false);
  } else {
    node.attachEvent('on' + event, listener);
  }
}
// 移除事件
function removeEventListener(node, event, listener) {
  if (node.removeEventListener) {
    node.removeEventListener(event, listener, false);
  } else {
    node.detachEvent('on' + event, listener);
  }
}

// 添加class
var addClass = function (el, name) {
  if (this.hasClass(el, name) == false) { // eslint-disable-line eqeqeq
    /\s+$/.test(el.className) ? (el.className += name) : (el.className = el.className + ' ' + name);
  }
  return this;
};

// 移除class
var removeClass = function (el, name) {
  if (this.hasClass(el, name)) {
    // 可能一个className中多个一样的类名: eg. class=" l l f12"
    var arrCl = el.className.split(' ');
    arrCl.forEach(function (cl, index) {
      if (cl && cl === name) {
        arrCl[index] = '';
      }
    });
    el.className = arrCl.join(' ');
  }
  return this;
};

var hasClass = function (el, name) {
  var hasClass = true;
  if (hasClass === true && (' ' + el.className + ' ').replace(/[\t\r\n]/g, ' ').indexOf(' ' + name + ' ') === -1) {
    hasClass = false;
  }
  return hasClass;
};

var getElementByClassName = function (className) {
  var elements = [];
  if (document.getElementsByClassName) {
    elements = document.getElementsByClassName(className);
  } else {
    var children = document.getElementsByTagName('*');
    for (var i = 0; i < children.length; i++) {
      if (hasClass(children[i], className)) {
        elements.push(children[i]);
      }
    }
  }
  return elements;
};

// 移除字符串空格
var strTrim = function (string) {
  if (string) {
    var s1 = string.replace(/^(\s|&nbsp;)*/ig, '');
    var s2 = s1.replace(/((\s|&nbsp;|<br>)*)$/ig, '');
    return s2;
  }
};

// html反转义
function htmlDecode(str) {
  var s = '';
  if (str && str.length === 0) return '';
  str = str + '';
  // 最常用的字符实体
  s = str.replace(/&amp;/g, '&');
  s = s.replace(/&lt;/g, '<');
  s = s.replace(/&gt;/g, '>');
  s = s.replace(/&nbsp;/g, ' ');
  s = s.replace(/&#39;/g, "\'"); // eslint-disable-line no-useless-escape
  s = s.replace(/&#039;/g, "\'"); // eslint-disable-line no-useless-escape
  s = s.replace(/&quot;/g, '"');
  s = s.replace(/<br>/g, '\n');
  // 其他一些常用的字符实体
  s = s.replace(/&cent;/g, '\n');
  s = s.replace(/&pound;/g, '\n');
  s = s.replace(/&yen;/g, '\n');
  s = s.replace(/&sect;/g, '\n');
  s = s.replace(/&copy;/g, '\n');
  s = s.replace(/&reg;/g, '\n');
  s = s.replace(/&times;/g, '\n');
  s = s.replace(/&divide;/g, '\n');

  return s;
}

//  字节转单位
function bytesToSize(bytes) {  
  if (bytes === 0) return '0 KB';  

   let k = 1024;  

   let sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];  

   let i = Math.floor(Math.log(bytes) / Math.log(k));  

   return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];                                                                                                                     //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];  
}

// 防止脚本注入函数
function safeStringify(obj) {
  return JSON.stringify(obj)
    .replace(/<\/(script)/gi,'<\\/$1')
    .replace(/<!--/g,'<\\!--')
    .replace(/\u2028/g,'\\u2028')
    .replace(/\u2029/g,'\\u2029')
}

// 简易加密
function compile(code) {
  var c = String.fromCharCode(code.charCodeAt(0) + code.length);
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }
  return escape(c);
}

// 简易解码
function unCompile(code) {
  code = unescape(code);
  var c = String.fromCharCode(code.charCodeAt(0) - code.length);
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
}
