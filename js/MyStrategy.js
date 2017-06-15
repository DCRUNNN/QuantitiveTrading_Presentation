/**
 * Created by pc on 2017/6/9.
 */
var vm = new Vue({
   el:'#container',
    data:{
       items:[

       ],
        strategyName:"",
        phoneNumber:""
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
        },
        
        addNewStrategy:function () {
            window.location.href="../Strategy/NewStrategy.html";
        },

        shareStrategy:function() {
            const self=this;
            this.$http.post("http://localhost:8080/strategysquare/square",{
                phoneNumber:self.getCookieValue("phoneNumber"),
                strategyName:self.strategyName,
            }).then(function (response) {
                console.log(response);
                var check=response.data.errorCode;
                // if(check==50000001) {
                //     alert("该策略名称已经存在了哟！");
                // }else
                    if(check==0) {
                    alert("分享策略成功");
                    }
                hide();
            }).catch(function(error){
                alert("很抱歉，分享策略时出现了错误！")
            })
        }
    },
    mounted:function (){

        var phoneNumber = this.getCookieValue("phoneNumber");

        if(this.getCookieValue("phoneNumber") === ""){
            document.getElementById("login1").innerHTML = "登录";
            alert("请先登录");
            window.location.href = "../Login.html";
            return;
        }else{
            document.getElementById("login1").innerHTML = "已登录";
            document.getElementById("login1").href = "#";
        }

        const self = this;
        this.$http.get("http://localhost:8080/strategy/"+phoneNumber).then(function (response) {
            self.items = response.data.data;
        }).catch(function (error) {
            alert("出现了未知的错误");
        })
    }
});


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