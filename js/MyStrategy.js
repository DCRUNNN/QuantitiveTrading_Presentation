/**
 * Created by pc on 2017/6/9.
 */
var vm = new Vue({
   el:'#container',
    data:{
        items:[],
        saveItems:[],
        strategyName:"",
        phoneNumber:"",
        strategyName_delete:"",
        saveStrategyName_delete:""
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
            if(self.strategyName=="") {
                alert("请输入要分享的策略名称");
            }

            this.$http.post("http://localhost:8080/strategysquare/square",{
                phoneNumber:self.getCookieValue("phoneNumber"),
                strategyName:self.strategyName,
            }).then(function (response) {
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
        },

        deleteStrategy:function() {
            const self=this;
            if(self.strategyName_delete=="") {
                alert("请输入要删除的策略名称");
                return;
            }

            var check=1;
            this.$http.post("http://localhost:8080/strategy/deleteStrategy",{
                phoneNumber:self.getCookieValue("phoneNumber"),
                strategyName:self.strategyName_delete,
            }).then(function (response) {
                check=response.data.errorCode;
                // if(check==50000001) {
                //     alert("该策略名称已经存在了哟！");
                // }else
                alert(strategyName);
                if(check!=0) {
                    alert("很抱歉，删除策略时出现了错误！");
                }
            }).catch(function(error){
                alert("很抱歉，删除策略时出现了错误！")
            })

            this.$http.post("http://localhost:8080/strategysquare/deleteStrategy",{
                phoneNumber:self.getCookieValue("phoneNumber"),
                strategyName:self.strategyName_delete,
            }).then(function (response) {
                check=response.data.errorCode;
                // if(check==50000001) {
                //     alert("该策略名称已经存在了哟！");
                // }else
                if(check==0) {
                    alert("删除策略成功");
                    hide2();
                }else{
                    alert("很抱歉，删除策略时出现了错误！");
                }
            }).catch(function(error){
                alert("很抱歉，删除策略时出现了错误！")
            })
        },

        addNewSaveStrategy:function () {
            window.location.href="../Strategy.html";
        },

        deleteSaveStrategy:function() {
            const self=this;
            if(self.saveStrategyName_delete=="") {
                alert("请输入要删除的策略名称");
                return;
            }
            this.$http.get("http://localhost:8080/strategy/deleteSaveStrategy",{
                phoneNumber:this.getCookieValue("phoneNumber"),
                strategyName:this.strategyName_delete,
            }).then(function (response) {
                var check=response.data.errorCode;
                // if(check==50000001) {
                //     alert("该策略名称已经存在了哟！");
                // }else
                if(check==0) {
                    alert("删除策略成功");
                    hide3();
                }else{
                    alert("很抱歉，删除收藏策略时出现了错误！");
                }
            }).catch(function(error){
                alert("很抱歉，删除收藏策略时出现了错误！")
            })
        }
    },
    mounted:function (){

        if(this.getCookieValue("phoneNumber") === ""){
            document.getElementById("login1").innerHTML = "登录";
            alert("请先登录");
            window.location.href = "../Login.html";
            return;
        }else{
            document.getElementById("login1").innerHTML = "已登录";
            document.getElementById("login1").href = "#";
        }

        phoneNumber = this.getCookieValue("phoneNumber");


        const self = this;
        this.$http.get("http://localhost:8080/strategy/"+phoneNumber).then(function (response) {
            self.items = response.data.data;
        }).catch(function (error) {
            alert("出现了未知的错误");
        })

        this.$http.get("http://localhost:8080/strategy/save/"+phoneNumber).then(function (response) {
            self.saveItems = response.data.data;
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

function myDelete(){
    var hideobj=document.getElementById("hidebg1");
    hidebg1.style.display="block";  //显示隐藏层
    hidebg1.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度
    document.getElementById("deleteBody").style.display="block";  //显示弹出层
}

function hide2() {
    document.getElementById("hidebg1").style.display="none";
    document.getElementById("deleteBody").style.display="none";
}

function delete2() {
    var hideobj=document.getElementById("hidebg2");
    hidebg2.style.display="block";  //显示隐藏层
    hidebg2.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度
    document.getElementById("deleteBody2").style.display="block";  //显示弹出层
}

function hide3() {
    document.getElementById("hidebg2").style.display="none";
    document.getElementById("deleteBody2").style.display="none";
}