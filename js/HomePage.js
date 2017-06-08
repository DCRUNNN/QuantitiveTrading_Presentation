/**
 * Created by pc on 2017/6/1.
 */

var vm = new Vue({
    el:'#container',
    data:{
        items:[
        ],
        charts:{}
    },
    methods:{
        getSingle:function (code) {
            window.location.href = "../pages/SingleStock.html?code=" + code;
        }
    },
    mounted(){
        const self=this;

        this.$http.get("http://localhost:8080/homepage/market/"+"2016-04-06").then(function (response) {
            self.charts=response.data.data;
        });


        $(function () {
                "use strict";

                var bar = new Morris.Bar({
                    element: 'bar-chart',
                    resize: true,
                    data: [
                        {y: '成交量', a:self.charts.volume},
                        {y: '涨停数', a:self.charts.amountOfLimitUp},
                        {y: '跌停数', a: self.charts.amountOfLimitDown},
                        {y: '涨幅超5%', a: self.charts.amountOf5PercentUp},
                        {y: '跌幅超5%', a: self.charts.amountOf5PercentDown},
                        {y: '开减收>5%*', a: self.charts.amountOf5PercentUptolastClose},
                        {y: '开减收<5%*昨收数', a: self.charts.amountOf5PercentDowntolastClose}
                    ],
                    barColors: ['#f56954'],
                    xkey: 'y',
                    ykeys: ['a'],
                    labels: ['数量'],
                    hideHover: 'auto'
                });
            }
        );

        this.$http.get("http://localhost:8080/homepage/allstock/"+"2016-01-01").then(function (response) {
            self.items=response.data.data;
            setTimeout(function () {
                $('#example1').DataTable();
            },0);
        }).catch(function (error) {
            alert("出现了未知的错误！")
        });



    }
});

