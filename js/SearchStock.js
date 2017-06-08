/**
 * Created by pc on 2017/6/1.
 */

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
        search: function () {
            var code = document.getElementById("input").value;
            if(code==null||code==""){
                alert("请输入搜索内容！")
            } else if(!isChinese(code)&&!isNum(code)){
                alert("请输入中文或者数字！")
            }else{
                this.$http.get("http://localhost:8080/check/"+code).then(function (response) {

                        window.location.href = "../pages/SingleStock.html?code=" + code;


                }).catch(function (error) {
                    alert("该股票不存在！")
                });

            }
        }

    }
});
