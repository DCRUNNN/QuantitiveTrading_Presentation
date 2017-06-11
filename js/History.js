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


new Vue({
    el: "#app",
    data:{
    },
    computed:{
        getHistory:function () {
            var array = this.getCookieValue("history").split("|");
            var jsonArray = new Array();
            for(var i=0;i<array.length;i++) {
                var code = array[i].split("/")[0];
                var date = array[i].split("/")[1];
                var json = {
                    "code":code,
                    "date":date
                };
                jsonArray.push(json);
            }
            return jsonArray.reverse();
        }
    },
    methods: {

        setCookie: function (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        },
        getCookieValue: function (cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return "";
        },
        clear: function () {
            alert("9");
            this.setCookie("history", "", -1);
        }
    },mounted(){
        if(this.getCookieValue("phoneNumber") === ""){
            document.getElementById("login1").innerHTML = "登录";
        }else{
            document.getElementById("login1").innerHTML = "已登录";
            document.getElementById("login1").href = "";
        }
    }


});
// var vm = new Vue({
//     el:"",
//     data:{
//
//     },
//     methods:{
//         getCookieValue:function (cname) {
//             var name = cname + "=";
//             var ca = document.cookie.split(';');
//             for(var i=0; i<ca.length; i++) {
//                 var c = ca[i];
//                 while (c.charAt(0)==' ') c = c.substring(1);
//                 if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
//             }
//             return "";
//         },
//
//         clear:function () {
//             var historyData = this.getCookieValue("history")
//             var d = new Date();
//             d.setTime(d.getTime() - 4 * 600000);
//             document.cookie = "history=" + historyData + ";expires=" + d.toUTCString() + ";path=/";
//         }
//     }
// });