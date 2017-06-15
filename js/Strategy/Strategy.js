var funds = new Vue({
    el:'#funds',
    data:{
        message: '￥30000'
    }
});

var retracement = new Vue({
    el:'#retracement',
    data:{
        retracement:'5.41%'
    }
})

var annualizedReturns = new Vue({
    el:'#annualizedReturns',
    data:{
        annualizedReturns:'82.32%'
    }
})

var vm = new Vue({
    el:"#app",
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

        shareStrategy:function() {
            const self=this;
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
        }
    },
    mounted:function (){
        var phoneNumber = this.getCookieValue("phoneNumber");

        if(this.getCookieValue("phoneNumber") === ""){
            document.getElementById("login1").innerHTML = "登录";
            return;
        }else{
            document.getElementById("login1").innerHTML = "已登录";
            document.getElementById("login1").href = "#";
        }

        const self = this;

        this.$http.get("http://localhost:8080/strategysquare/").then(function (response) {
            self.items = response.data.data;

        }).catch(function (error) {
            alert("初始化用户策略时出现了未知的错误");
        })
    }
});