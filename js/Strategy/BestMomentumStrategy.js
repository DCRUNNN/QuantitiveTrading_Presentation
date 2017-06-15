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
        createDays:'',
        holdingDays:'',
        stockPool:[],

        items:[

        ],
        chosens:[

        ],
        backup:[

        ],
        MomentumDate:[

        ],
        MomentumFieldRate:[

        ],
        MomentumPrimaryDate:[

        ],
        MomentumWinRates:[],
        MomentumRateNums:[]


    },
    methods:{

        run:function () {
            var mychart1 = this.$echarts.init(document.getElementById('chart1'),'macarons');
            mychart1.showLoading({
                text:'数据加载中'
            });

            var mychart2 = this.$echarts.init(document.getElementById('chart2'),'macarons');
            mychart2.showLoading({
                text:'数据加载中'
            });

            for(var i=0;i<this.chosens.length;i++){
                this.stockPool.push(this.chosens[i].stockCode);
            }

            if((this.createDays =="")||(this.holdingDays =="")){
                show();
            }else {
                setTimeout(function () {
                    var option1 = {
                        title: {
                            text: '超额收益vs全样本-不同计算周期'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: []
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                mark: {show: true},
                                dataView: {show: true, readOnly: false},
                                magicType: {show: true, type: ['line', 'bar']},
                                restore: {show: true},
                                saveAsImage: {show: true}
                            }
                        },
                        calculable: true,
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: false,
                                data: ['2', '10', '18', '26', '34', '42', '50', '58', '66']
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                axisLabel: {
                                    formatter: '{value} %'
                                }
                            }
                        ],
                        series: [
                            {
                                name: '百分占比',
                                type: 'line',
                                smooth: true,
                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                data: [(Math.random() * 100).toString().substring(0, 5), (Math.random() * 100).toString().substring(0, 5), Math.random() * (100).toString().substring(0, 5), Math.random() * (100).toString().substring(0, 5), Math.random() * (100).toString().substring(0, 5), Math.random() * (100).toString().substring(0, 5), Math.random() * (100).toString().substring(0, 5), Math.random() * (100).toString().substring(0, 5), Math.random() * (100).toString().substring(0, 5)]

                            }
                        ]
                    };
                    mychart1.hideLoading();
                    mychart1.setOption(option1);
                }, 3000)

                setTimeout(function () {
                    var option2 = {
                        title: {
                            text: '策略胜率%-不同计算周期',
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ['']
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                mark: {show: true},
                                dataView: {show: true, readOnly: false},
                                magicType: {show: true, type: ['line', 'bar',]},
                                restore: {show: true},
                                saveAsImage: {show: true}
                            }
                        },
                        calculable: true,
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: false,
                                data: ['2', '10', '18', '26', '34', '42', '50', '58', '66']
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                axisLabel: {
                                    formatter: '{value}%'
                                }
                            }
                        ],
                        series: [
                            {
                                name: '百分占比',
                                type: 'line',
                                smooth: true,
                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                data: [(Math.random() * 100).toString().substring(0, 5), (Math.random() * 100).toString().substring(0, 5), Math.random() * (100).toString().substring(0, 5), Math.random() * (100).toString().substring(0, 5), Math.random() * (100).toString().substring(0, 5), Math.random() * (100).toString().substring(0, 5), Math.random() * (100).toString().substring(0, 5), Math.random() * (100).toString().substring(0, 5), Math.random() * (100).toString().substring(0, 5)]

                            }
                        ]
                    };
                    mychart2.hideLoading();
                    mychart2.setOption(option2);

                }, 3000)
            }
        },

        add:function (code,name,sector) {

            var dt = $('#table2').DataTable();
            dt.destroy();

            this.chosens.push({
                "code":code,
                "name":name,
                "sector":sector
            });

            this.$nextTick(function(){
                $('#table2').DataTable();
            })

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

            var dt = $('#table2').DataTable();
            dt.destroy();

            for(var i=0;i<this.chosens.length;i++){
                if(this.chosens[i].code==code && this.chosens[i].name==name &&this.chosens[i].sector==sector) {
                    this.chosens.splice(i, 1);
                }
            }

            this.$nextTick(function(){
                $('#table2').DataTable();
            })

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

    },
    created(){

        setTimeout(
            function () {
                $('#table2').DataTable({
                    data:[]
                });
            },0
        )
    }
});