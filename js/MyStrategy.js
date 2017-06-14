/**
 * Created by pc on 2017/6/9.
 */
var vm = new Vue({
   el:'#container',
    data:{
       items:[

       ]

    },
    methods:{
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
    mounted(){
        if(this.getCookieValue("phoneNumber") === ""){
            document.getElementById("login1").innerHTML = "登录";
            alert("请先登录");
            window.location.href = "../Login.html";
            return;
        }else{
            document.getElementById("login1").innerHTML = "已登录";
            document.getElementById("login1").href = "#";
        }

        var phoneNumber = this.getCookieValue("phoneNumber");
        const self = this;
        this.$http.get("http://localhost:8080/strategy/"+phoneNumber).then(function (response) {
            self.items = response.data.data;
        }).catch(function (error) {
            alert("出现了未知的错误");
        })
    }
});