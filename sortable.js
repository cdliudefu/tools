// 元素排序方法
function sortable(el, callback) {
  var tempLi, top, left;
  if (typeof (el) === 'string') {
    el = document.getElementById(el);
  }
  if (el === undefined || el == null) {
    return;
  }
  var outWidth = el.offsetWidth;
    // 绑定事件
  var addEvent = function (node, event, listener) {
    if (!node) {
      return false;
    }
    if (node.addEventListener) {
      node.addEventListener(event, listener, false);
    } else {
      node.attachEvent('on' + event, listener);
    }
  };
    // 移除事件 removeEventListener
  var removeEvent = function (node, event, listener) {
    if (node.removeEventListener) {
      node.removeEventListener(event, listener, false);
    } else {
      node.detachEvent('on' + event, listener);
    }
  };
  var dragManager = {
    clientY: 0,
    draging: function (event) { // mousemove时拖动行
      var e = event;
      var dragObj = dragManager.dragObj;
      if (e.clientY > document.documentElement.clientHeight) {
        document.body.scrollTop = 2000;
      }
      if (e.clientY < 0) {
        document.body.scrollTop = document.body.scrollTop - 100;
      }

      if (dragObj) {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var clientY = e.clientY + scrollTop;
        // 拖动内容不被选中
        if (window.getSelection) { // w3c
          window.getSelection().removeAllRanges();
        } else if (document.selection) {
          document.selection.empty(); // IE
        }

        var down = clientY > dragManager.clientY; // 是否向下移动
        dragManager.clientY = clientY;

        top = clientY - dragManager.posY;
        left = e.clientX - dragManager.posX;

        dragObj.style.top = top + 'px';
        dragObj.style.left = left + 'px';

        var lis = el.children;
        for (var i = 0; i < lis.length; i++) {
          var y1 = lis[i].offsetTop;
          var y2 = y1 + lis[i].offsetHeight;
          if (dragObj !== lis[i] && lis[i].id !== 'spaceHandle' && y1 < clientY && y2 > clientY) {
            tempLi = lis[i];
            el.insertBefore(dragManager.dragSpace, down ? tempLi.nextSibling : tempLi);
          }
        }
      }
    },
    dragStart: function (event) { // mousedown准备开始拖动
      var e = event;
      var target = e.target || e.srcElement;
      if (target.nodeName === 'LI') {
        dragManager.dragObj = target;
      } else if (target.nodeName === 'DIV') {
        dragManager.dragObj = target.parentNode;
      }
      var dragObj = dragManager.dragObj;
      if (dragObj&&dragObj.nodeName === 'LI') {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var clientY = e.clientY + scrollTop;
        dragManager.clientY = clientY;

        dragManager.posY = clientY - dragObj.offsetTop;
        dragManager.posX = e.clientX - dragObj.offsetLeft;

        top = clientY - dragManager.posY;
        left = dragObj.offsetLeft;
        // 增加占位符
        dragManager.dragSpace = document.createElement('li');
        dragManager.dragSpace.setAttribute('class', 'spaceHandle');
        dragManager.dragSpace.setAttribute('id', 'spaceHandle');
        dragObj.parentNode.insertBefore(dragManager.dragSpace, dragObj.nextSibling);

        dragObj.style.width = outWidth + 'px';
        dragObj.style.backgroundColor = '#fff';
        dragObj.style.cursor = 'move';
        dragObj.style.position = 'absolute';
        dragObj.style.zIndex = '1000';
        dragObj.style.top = top + 'px';
        dragObj.style.left = left + 'px';

        addEvent(document, 'mousemove', dragManager.draging);
        addEvent(document, 'mouseup', dragManager.dragEnd);
      }
    },
    dragEnd: function (event) { // mouseup拖动结果
      var dragObj = dragManager.dragObj;
      var li = dragManager.dragSpace;
      var e = event;
      if (dragObj) {
        var target = e.target || e.srcElement;
        var down = dragManager.y > dragManager.clientY; // 是否向下移动
        dragManager.clientY = dragManager.y;
        if (dragObj !== li) {
          el.insertBefore(dragObj, down ? li.nextSibling : li);// (down ? li.nextSibling : li)
        }

        dragObj.removeAttribute('style');
        el.removeChild(dragManager.dragSpace); // 移除点位元素
        dragManager.dragObj = null;
        removeEvent(document, 'mousemove', dragManager.draging);
        removeEvent(document, 'mouseup', dragManager.dragEnd);
        if (typeof (callback) === 'function') {
          callback();
        }
      }
    },
    doMouseEvent: function (el) {
      addEvent(el, 'mousedown', dragManager.dragStart);
    }
  };
  dragManager.doMouseEvent(el);
}
module.exports = {sortable};
