(function(win){
 var years = 1e3*365*24*360000
 //获取值
 function getCookies(){
  return document.cookie.match(/([^=]+)=([^;]+);?\s*/g)||[]
 }
 
 //获取有效时间
 function getExpires(flag){
  flag = flag ||1
  return 'expires='+new Date(+new Date()+years*flag).toUTCString()
 }
 
 //根据key名称获取值
 function getItem(key){
  var cookies = getCookies()
  for(var i=0;i<cookies.length;i++){
   var param = cookies[i].match(/^\s*([^=]+)=(.+)/)
   if(param[1]===String(key)){
   return decodeURIComponent(param[2])
   }
  }
  return null
 }
 
 // 设置值，isexprired是否过期-1为过期
 function setItem(key,value,isExpired){
  document.cookie = [key+'='+encodeURIComponent(value),getExpires(isExpired?-1:1),'path=/'].join(';')
 }
 
 //清理所有的值
 function clear(){
   var cookies = getCookies();
   for(var i=0;i<cookies.length;i++){
    var key = cookies[i].match(/^\s*([^=]+)/)[1]
    remove(key)
   }
 }

//删除指定的key值
function remove(key){
 setItem(key,'',true)
}

win.Store = {
getItem,
setItem,
clear,
remove
}
})(window)
