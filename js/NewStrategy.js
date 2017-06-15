String.prototype.trim2=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
function F(objid){
    return document.getElementById(objid).value;
}
function G(objid){
    return document.getElementById(objid);
}

var msgA=["msg1","msg2","msg3","msg4"];
var c=["c1","c2","c3","c4"];
var slen=[50,20000,20000,60];//允许最大字数 
var num="";
var isfirst=[0,0,0,0,0,0];
function isEmpty(strVal){
    if( strVal=="" )
        return true;
    else
        return false;
}
function isBlank(testVal){
    var regVal=/^\s*$/;
    return (regVal.test(testVal))
}
function chLen(strVal){
    strValstrVal=strVal.trim2();
    var cArr=strVal.match(/[^\x00-\xff]/ig);
    return strVal.length+(cArr==null ? 0 : cArr.length);
}
function check(i){
    var iValue=F("c"+i);
    var iObj=G("msg"+i);
    var n=(chLen(iValue)>slen[i-1]);
    if((isBlank(iValue)==true)||(isEmpty(iValue)==true)||n==true){
        iObj.style.display ="block";
    }else{
        iObj.style.display ="none";
    }
}
function checkAll(){
    for(var i=0;i<msgA.length;i++){
        check(i+1);
        if(G(msgA[i]).style.display=="none"){
            continue;
        }else{
            alert("填写错误,请查看提示信息！");
            return;
        }
    }
    G("form1").submit();
}
function clearValue(i){
    G(c[i-1]).style.color="#000";
    keyUp();
    if(isfirst[i]==0){
        G(c[i-1]).value="";
    }
    isfirst[i]=1;
}
function keyUp(){
    var obj=G("c2");
    var str=obj.value;
    str=str.replace(/\r/gi,"");
    str=str.split("\n");
    n=str.length;
    line(n);
}
function line(n){
    var lineobj=G("li");
    for(var i=1;i<=n;i++){
        if(document.all){
            num+=i+"\r\n";
        }else{
            num+=i+"\n";
        }
    }
    lineobj.value=num;
    num="";
}
function autoScroll(){
    var nV=0;
    if(!document.all){
        nV=G("c2").scrollTop;
        G("li").scrollTop=nV;
        setTimeout("autoScroll()",20);
    }
}
if(!document.all){
    window.addEventListener("load",autoScroll,false);
}



HTMLTextAreaElement.prototype.getCaretPosition = function () {
//return the caret position of the textarea
    return this.selectionStart;
};
HTMLTextAreaElement.prototype.setCaretPosition = function (position) {
//change the caret position of the textarea
    this.selectionStart = position;
    this.selectionEnd = position;
    this.focus();
};
HTMLTextAreaElement.prototype.hasSelection = function () {
//if the textarea has selection then return true
    if (this.selectionStart == this.selectionEnd) {
        return false;
    } else {
        return true;
    }
};
HTMLTextAreaElement.prototype.getSelectedText = function () {
//return the selection text
    return this.value.substring(this.selectionStart, this.selectionEnd);
};
HTMLTextAreaElement.prototype.setSelection = function (start, end) {
//change the selection area of the textarea
    this.selectionStart = start;
    this.selectionEnd = end;
    this.focus();
};
var textarea = document.getElementById("c2");
textarea.onkeydown = function(event) {
    //support tab on textarea
    if (event.keyCode == 9) { //tab was pressed
        var newCaretPosition;
        newCaretPosition = textarea.getCaretPosition() + "    ".length;
        textarea.value = textarea.value.substring(0, textarea.getCaretPosition()) + "    " + textarea.value.substring(textarea.getCaretPosition(), textarea.value.length);
        textarea.setCaretPosition(newCaretPosition);
        return false;
    }
    if(event.keyCode == 8){
        //backspace
        if (textarea.value.substring(textarea.getCaretPosition() - 4, textarea.getCaretPosition()) == "    ") {
            //it's a tab space
            var newCaretPosition;
            newCaretPosition = textarea.getCaretPosition() - 3;
            textarea.value = textarea.value.substring(0, textarea.getCaretPosition() - 3) + textarea.value.substring(textarea.getCaretPosition(), textarea.value.length);
            textarea.setCaretPosition(newCaretPosition);
        }
    }
    if(event.keyCode == 37){ //left arrow
        var newCaretPosition;
        if (textarea.value.substring(textarea.getCaretPosition() - 4, textarea.getCaretPosition()) == "    ") {
            //it's a tab space
            newCaretPosition = textarea.getCaretPosition() - 3;
            textarea.setCaretPosition(newCaretPosition);
        }
    }
    if(event.keyCode == 39){
        //right arrow
        var newCaretPosition;
        if (textarea.value.substring(textarea.getCaretPosition() + 4, textarea.getCaretPosition()) == "    ") {
            //it's a tab space
            newCaretPosition = textarea.getCaretPosition() + 3;
            textarea.setCaretPosition(newCaretPosition);
        }
    }
}

function save(){
    var hideobj=document.getElementById("hidebg");
    hidebg.style.display="block";  //显示隐藏层
    hidebg.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度
    document.getElementById("saveBody").style.display="block";  //显示弹出层
}

function hide() {
    document.getElementById("hidebg").style.display="none";
    document.getElementById("saveBody").style.display="none";
}
