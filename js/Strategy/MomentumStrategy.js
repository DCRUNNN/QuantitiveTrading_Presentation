/**
 * Created by cyz on 2017/6/12.
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
Vue.prototype.$echarts = echarts;
var vm = new Vue({
    el:'#container',
    data:{
        yearProfit:'',
        primaryYearProfit:'',
        alafa:'',
        beita:'',
        sharp:'',
        maxBack:'',


        dateRange:'',
        createDays:'99',
        holdingDays:'',
        stockPool:[],

        items:[

        ],
        chosens:[

        ],
        backup:[

        ],
        MomentumDate:['2016-02-10','2016-02-11','2016-02-12','2016-02-13','2016-02-14'

        ],
        MomentumFieldRate:[
            '60','290','170','200','90'
        ],
        MomentumPrimaryDate:[
            '100','200','300','280','50'
        ],
        MomentumWinRates:[],
        MomentumRateNums:[]


    },
    methods:{

        run:function () {
            var mychart = this.$echarts.init(document.getElementById('line-chart'),'macarons');
            mychart.showLoading({
                text:'数据加载中'
            });
            var barchart = this.$echarts.init(document.getElementById('bar-chart'),'macarons');
            barchart.showLoading({
                text:'数据加载中'
            });
            for(var i=0;i<this.chosens.length;i++){
                this.stockPool.push(this.chosens[i].stockCode);
            }
            this.$http.get("http://localhost:8080/exhibition/momentumStrategy",{
                params:{
                    stockPool:this.stockPool,
                   dateRange:document.getElementById("reservation").value,
                    dayNumFormative:this.createDays,
                    dayNumHolding:this.holdingDays
                }
            }).then(function (response) {
                console.log(response.data.data.winRates);
                this.MomentumDate = response.data.data.dateList;
                this.MomentumFieldRate = response.data.data.yieldRates;
                this.MomentumPrimaryDate = response.data.data.primaryRates;
                this.MomentumWinRates = response.data.data.winRates;
                this.MomentumRateNums = response.data.data.rateNums;
                this.yearProfit = response.data.data.yearYield;
                this.primaryYearProfit = response.data.data.primaryYearYield;
                this.alafa = response.data.data.alpha;
                this.beita = response.data.data.beta;
                this.sharp = response.data.data.shapeRatio;
                this.maxBack = response.data.data.maxDrawnDown;

                var option1 = {
                    title : {
                        text:'柱状显示数据'

                    },
                    tooltip : {
                        trigger: 'axis'
                    },             legend: {
                        data:['基准收益','策略收益']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : this.MomentumDate
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLabel : {
                                formatter: '{value} %'
                            }
                        }
                    ],
                    series : [
                        {
                            name:'基准收益',
                            type:'line',
                            data:this.MomentumFieldRate,
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'策略收益',
                            type:'line',
                            data:this.MomentumPrimaryDate,
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name : '平均值'}
                                ]
                            }
                        }
                    ]
                };
                mychart.hideLoading();
                mychart.setOption(option1);


                var option2 = {
                    title : {

                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['频数']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            axisLabel : {
                                formatter: '{value}% '
                            },
                            data:this.MomentumWinRates
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'频数',
                            type:'bar',
                            data:this.MomentumRateNums,
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        }
                    ]
                };
                barchart.hideLoading();
                barchart.setOption(option2);
            }).catch(function (error) {
                alert("发生了未知的错误！")
            });

        },

        add:function (code,name,sector) {
            this.chosens.push({
                "code":code,
                "name":name,
                "sector":sector
            });
            // window.alert(this.items.length);
            // window.alert("haha");
            for(var i=0;i<this.items.length;i+=1){
                if(this.items[i].code == code&&this.items[i].name == name&&this.items[i].sector == sector){
                    this.items.splice(i,1);
                }
            }
            // window.alert(this.items.length);
        },
        myDelete:function (code,name,sector){
            for(var i=0;i<this.chosens.length;i++){
                if(this.chosens[i].code==code && this.chosens[i].name==name &&this.chosens[i].sector==sector) {
                    this.chosens.splice(i, 1);
                }
            }
            this.items.push({
                "code":code,
                "name":name,
                "sector":sector
            });
        },
        addAll:function () {
            this.chosens = this.backup;
        },
        deleteAll:function () {

            this.chosens=[];
            this.items=this.backup;
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

        } else{
            document.getElementById("loginLabel").innerHTML = "已登录";
            document.getElementById("loginLabel").href = "";
        }
        this.$http.get("http://localhost:8080/stockWithSector/"+"2016-03-02").then(function (response) {

            this.items = response.data.data;
            this.backup = this.items;
            // var dt = $('#table1').DataTable();
            // dt.destroy();
            setTimeout(function () {
                $('#table1').DataTable();
            },0);
            // $('#table1').DataTable.destroy();

        }).catch(function (error) {
            alert("发生了未知的错误！");
        });

    }
});