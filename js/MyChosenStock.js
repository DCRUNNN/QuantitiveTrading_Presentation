/**
 * Created by cyz on 2017/6/9.
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
            alert("请先登录！");
            window.location.href = "../Login.html";
        }else{
            var phone_number=this.getCookieValue("phoneNumber");
            // console.log(phone_number);
            this.$http.get("http://localhost:8080/personnel/mystock/"+phone_number).then(function (response) {
                // console.log(response.data);
                this.items = response.data.data;
            }).catch(function (error) {
                alert("发生了未知的错误！");
            });
        }
    }
});