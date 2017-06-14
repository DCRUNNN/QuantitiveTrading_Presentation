/**
 * Created by pc on 2017/6/1.
 */
Vue.prototype.$echarts = echarts;

var vm = new Vue({
    el:'#container',
    data:{
        items:[
        ],
        charts:{},
        pie:[

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
        },
        getSingle:function (code) {
            window.location.href = "../pages/SingleStock.html?code=" + code;
        }
    },
    mounted(){

        if(this.getCookieValue("phoneNumber") === ""){
            document.getElementById("login").innerHTML = "登录";
        }else{
            document.getElementById("login").innerHTML = "已登录";
            document.getElementById("login").href = "#";
        }

        const self=this;

        var mychart = this.$echarts.init(document.getElementById('bar-chart'),'macarons');
        mychart.showLoading({
            text:'数据加载中'
        });

        var mypie = this.$echarts.init(document.getElementById('pie-chart'),'macarons');
        mypie.showLoading({
            text:'数据加载中'
        });

        // var date=new Date().toLocaleDateString();
        var date="2017-06-14";

        this.$http.get("http://localhost:8080/homepage/allstock/"+date).then(function (response) {
            self.items=response.data.data;
            setTimeout(function () {
                $('#example1').DataTable();
            },0);
        }).catch(function (error) {
            alert("加载股票数据时出现了未知的错误！")
        });


        this.$http.get("http://localhost:8080/homepage/market/"+date).then(function (response) {
            self.charts=response.data.data;

            const request = new XMLHttpRequest();
            request.open('GET', "http://localhost:8080/market/"+date, true);
// request.setRequestHeader('Content-Type', 'application/json');
            request.onload = function () {
                if(this.status == 200 || this.status == 304) {

                }
            }
            request.send();
            mychart.title = '';
            var option = {
                title:{
                  text:'柱状显示数据',
                    x:'center'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line','bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    x:'center',
                    y:'bottom',
                    data:['数量']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['成交量','涨停数','跌停数','涨幅超5%','跌幅超5%','开减收>5%*昨日数','开减收<5%*昨日数'],
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '数量',
                        min: 0,
                        interval: 50,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },

                ],
                series: [
                    {
                        name:'数量',
                        type:'bar',
                        data:[self.charts.volume, self.charts.amountOfLimitUp, self.charts.amountOfLimitDown, self.charts.amountOf5PercentUp, self.charts.amountOf5PercentDown, self.charts.amountOf5PercentUptolastClose, self.charts.amountOf5PercentDowntolastClose]
                    }
                ]
            };
            mychart.hideLoading();
            mychart.setOption(option);

            //pie图部分
            var option1 = {
                title : {
                    text: '饼状显示比例',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    x : 'center',
                    y : 'bottom',
                    data:['涨停数','跌停数','涨超5%数','跌超5%数','开减收>5%昨日数','开减收<5%昨日数']
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                    // {
                    //     name:'数量',
                    //     type:'pie',
                    //     center : ['25%', 200],
                    //     roseType : 'radius',
                    //     width: '40%',       // for funnel
                    //     max: 40,            // for funnel
                    //     itemStyle : {
                    //         normal : {
                    //             label : {
                    //                 show : false
                    //             },
                    //             labelLine : {
                    //                 show : false
                    //             }
                    //         },
                    //         emphasis : {
                    //             label : {
                    //                 show : true
                    //             },
                    //             labelLine : {
                    //                 show : true
                    //             }
                    //         }
                    //     },
                    //     data:[
                    //         {value:this.charts.amountOfLimitUp, name:'涨停数'},
                    //         {value:this.charts.amountOfLimitDown, name:'跌停数'},
                    //         {value:this.charts.amountOf5PercentUp, name:'涨超5%数'},
                    //         {value:this.charts.amountOf5PercentDown, name:'跌超5%数'},
                    //         {value:this.charts.amountOf5PercentUptolastClose, name:'开减收>5%昨日数'},
                    //         {value:this.charts.amountOf5PercentDowntolastClose, name:'开减收<5%昨日数'}
                    //     ]
                    // },

                    {
                        name:'访问来源',
                        type:'pie',
                        center:['25%',200],
                        radius : ['50%', '70%'],
                        itemStyle : {
                            normal : {
                                label : {
                                    show : false
                                },
                                labelLine : {
                                    show : false
                                }
                            },
                            emphasis : {
                                label : {
                                    show : true
                                }
                            }
                        },
                        data:[
                            {value:this.charts.amountOfLimitUp, name:'涨停数'},
                            {value:this.charts.amountOfLimitDown, name:'跌停数'},
                            {value:this.charts.amountOf5PercentUp, name:'涨超5%数'},
                            {value:this.charts.amountOf5PercentDown, name:'跌超5%数'},
                            {value:this.charts.amountOf5PercentUptolastClose, name:'开减收>5%昨日数'},
                            {value:this.charts.amountOf5PercentDowntolastClose, name:'开减收<5%昨日数'}
                        ]
                    },
                    {
                        name:'数量',
                        type:'pie',
                        center : ['75%', 200],
                        roseType : 'area',
                        x: '50%',               // for funnel
                        max: 40,                // for funnel
                        sort : 'ascending',     // for funnel
                        data:[
                            {value:this.charts.amountOfLimitUp, name:'涨停数'},
                            {value:this.charts.amountOfLimitDown, name:'跌停数'},
                            {value:this.charts.amountOf5PercentUp, name:'涨超5%数'},
                            {value:this.charts.amountOf5PercentDown, name:'跌超5%数'},
                            {value:this.charts.amountOf5PercentUptolastClose, name:'开减收>5%昨日数'},
                            {value:this.charts.amountOf5PercentDowntolastClose, name:'开减收<5%昨日数'},
                        ]
                    }
                ]
            };
            mypie.hideLoading();
            mypie.setOption(option1)


        }).catch(function (error) {
            alert("加载图表时发生了未知的错误！");
        });


    }
});

