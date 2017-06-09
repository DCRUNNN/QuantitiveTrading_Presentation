/**
 * Created by cyz on 2017/6/3.
 */
function show() {
    var hideobj=document.getElementById("hidebg");
    hidebg.style.display="block";  //显示隐藏层
    hidebg.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度
    document.getElementById("login").style.display="block";  //显示弹出层
}
function hide() {
    document.getElementById("hidebg").style.display="none";
    document.getElementById("login").style.display="none";
}

var vm = new Vue({
   el:'#container',
    data:{
       item:{
           userName:'陈远志',
           sex:'女',
           email:'',
           unit:'南京大学',
           phone_number:'15951926608',
           place:'南京'
       }
    },
    methods:{

       save:function () {

       },

        getCookieValue:function (cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return "";
        }

    },
    created(){

       if(this.getCookieValue("phoneNumber") === ""){
           alert("请先登录！");
           window.location.href = "../Login.html";
       }else{

           if(this.item.sex == '男'){
               document.getElementById("optionsRadios1").checked="true";
           }else{
               document.getElementById("optionsRadios2").checked="true";
           }
           // this.$http.get("http://localhost:8080/").then(function (response) {
           //     this.item.userName = response.data.userName;
           //     this.item.sex = response.data.sex;
           //     this.item.email=response.data.email;
           //     this.item.unit = response.data.unit;
           //     this.item.phone_number = response.data.phone_number;
           //     this.item.place = response.data.place;
           // }).catch(function (error) {
           //     alert("发生了未知的错误！");
           // });

       }

    }
});