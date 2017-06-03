var num = "";
var btn = getId('btn');
var test = getId('test');
function getId(obj) {
    return document.getElementById(obj);
}
function keyUp(){
    var str = test.value;
    str = str.replace(/\r/gi,"");
    str = str.split("\n");
    n = str.length;
    line(n);
}
function line(n){
    var lineobj = getId("leftNum");
    for(var i = 1;i <= n;i ++){
        if(document.all){
            num += i + "\r\n";//判断浏览器是否是IE
        }else{
            num += i + "\n";
        }
    }
    lineobj.value = num;
    num = "";
}

(function() {
    keyUp();
})();
