/**
 * Created by cyz on 2017/6/9.
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
   el:'#container',
    data:{
       items:[
       ]
    },
    methods:{
       deleteStock:function (code) {
           this.$http.get("http://localhost:8080/personnel/deleteStock",{
               params:{
                   phoneNumber:this.getCookieValue("phoneNumber"),
                   stockCode:code
               }
           }).then(function (response) {
               if(response.data.errorCode == 0){
                   alert("删除成功！");
                   window.location.reload();
               }
           }).catch(function (error) {
               alert("发生了未知的错误！");
           })
       },
       deleteAllStock:function () {
           this.$http.get("http://localhost:8080/personnel/deleteAllStock/"+this.getCookieValue("phoneNumber")).then(function (response) {
               if(response.data.errorCode == 0){
                   alert("删除成功");
                   window.location.reload();
               }
           }).catch(function (error) {
               alert("发生了未知的错误！");
           })
       },

       turnToSearch:function () {
           window.location.href = "../SearchStock.html";
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
    mounted(){

        if(this.getCookieValue("phoneNumber") === ""){
            alert("请先登录！");
            window.location.href = "../Login.html";
        }else{
            document.getElementById("login1").innerHTML = "已登录";
            document.getElementById("login1").href = "";
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