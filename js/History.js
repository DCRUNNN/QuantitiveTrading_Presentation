/**
 * Created by cyz on 2017/6/3.
 */

function show()  //显示隐藏层和弹出层
{
    var hideobj=document.getElementById("hidebg");
    hidebg.style.display="block";  //显示隐藏层
    hidebg.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度
    document.getElementById("login").style.display="block";  //显示弹出层
}
function hide()  //去除隐藏层和弹出层
{
    document.getElementById("hidebg").style.display="none";
    document.getElementById("login").style.display="none";
}

var vm = new Vue({
    el:"",
    data:{
        
    },
    methods:{
        
    }
});