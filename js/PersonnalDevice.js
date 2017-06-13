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
function show1() {
    var hideobj=document.getElementById("hidebg1");
    hidebg1.style.display="block";  //显示隐藏层
    hidebg1.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度
    document.getElementById("login2").style.display="block";  //显示弹出层
}
function hide1() {
    document.getElementById("hidebg1").style.display="none";
    document.getElementById("login2").style.display="none";
    window.location.href = "../Login.html";

}
function show2() {
    var hideobj=document.getElementById("hidebg2");
    hidebg2.style.display="block";  //显示隐藏层
    hidebg2.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度
    document.getElementById("login3").style.display="block";  //显示弹出层
}
function hide2() {
    document.getElementById("hidebg2").style.display="none";
    document.getElementById("login3").style.display="none";
    window.location.reload();

}
var vm = new Vue({
   el:'#container',
    data:{
       item:{
           userName:'',
           sex:'',
           email:'',
           unit:'',
           phone_number:'',
           place:''
       }
    },
    methods:{

       save:function () {
           if(document.getElementById("optionsRadios1").checked=="true"){
               this.items.sex="男"
           }else if(document.getElementById("optionsRadios2").checked=="true"){
               this.items.sex="女"
           }
           this.$http.post("http://localhost:8080/personnel/update",{
                   phone_number:this.item.phone_number,
                   user_name:this.item.userName,
                   sex:this.item.sex,
                   email:this.item.email,
                   unit:this.item.unit,
                   place:this.item.place
           }).then(function (response) {
               console.log(response.data.data);
               if(response.data.errorCode==0){
                   hide();
                   show2();
               }
           }).catch(function (error) {
               alert("发生了未知的错误！");
           })
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

           hide();
           show1();

       }else{
               document.getElementById("login1").innerHTML = "已登录";
               document.getElementById("login1").href = "";

           this.$http.get("http://localhost:8080/personnel/"+this.getCookieValue("phoneNumber")).then(function (response) {
               this.item.userName=response.data.data.userName;
               this.item.sex = response.data.data.sex;
               this.item.email = response.data.data.email;
               this.item.unit = response.data.data.unit;
               this.item.place = response.data.data.place;
               this.item.phone_number = response.data.data.phoneNumber;
           }).catch(function (response) {
               alert("发生了未知的错误！");
           });

           if(this.item.sex == '男'){
               document.getElementById("optionsRadios1").checked="true";
           }else{
               document.getElementById("optionsRadios2").checked="true";
           }

       }

    }
});