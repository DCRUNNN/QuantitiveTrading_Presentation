/**
 * Created by pc on 2017/6/1.
 */

function show1()  //显示隐藏层和弹出层
{
    var hideobj=document.getElementById("hidebg1");
    hidebg1.style.display="block";  //显示隐藏层
    hidebg1.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度
    document.getElementById("login1").style.display="block";  //显示弹出层
}
function hide1()  //去除隐藏层和弹出层
{
    document.getElementById("hidebg1").style.display="none";
    document.getElementById("login1").style.display="none";
}
function show2()  //显示隐藏层和弹出层
{
    var hideobj=document.getElementById("hidebg2");
    hidebg2.style.display="block";  //显示隐藏层
    hidebg2.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度
    document.getElementById("login2").style.display="block";  //显示弹出层
}
function hide2()  //去除隐藏层和弹出层
{
    document.getElementById("hidebg2").style.display="none";
    document.getElementById("login2").style.display="none";
}

function show3()  //显示隐藏层和弹出层
{
    var hideobj=document.getElementById("hidebg3");
    hidebg3.style.display="block";  //显示隐藏层
    hidebg3.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度
    document.getElementById("login3").style.display="block";  //显示弹出层
}
function hide3()  //去除隐藏层和弹出层
{
    document.getElementById("hidebg3").style.display="none";
    document.getElementById("login3").style.display="none";
}
function isChinese(str){
    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
    return reg.test(str);
}

function isNum(str){
    if(""==str){
        return false;
    }
    var reg = /\D/;
    return str.match(reg)==null;
}


var vm = new Vue({
    el:'#container',
    data:{

    },
    methods: {

        getCookieValue:function (cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return "";
        },

        search: function () {
            var code = document.getElementById("input").value.split("-")[1];
           alert(code);
            if(code==null||code==""){
               show1();
            } else if(!isChinese(code)&&!isNum(code)){
                show2();
            }else{
                this.$http.get("http://localhost:8080/check/"+code).then(function (response) {
                    if(response.data.errorCode === 0) {
                        window.location.href = "../pages/SingleStock.html?code=" + code;
                    }else if(response.data.errorCode === 20000001){
                        show3();
                    }else {
                        alert("出现了未知的错误！");
                    }
                }).catch(function (error) {
                    alert("网络不通畅！请检查网络！");
                });

            }
        }

    },
    mounted(){
        if(this.getCookieValue("phoneNumber") === ""){
            document.getElementById("login").innerHTML = "登录";
        }else{
            document.getElementById("login").innerHTML = "已登录";
            document.getElementById("login").href = "#";
        }

    }
});
