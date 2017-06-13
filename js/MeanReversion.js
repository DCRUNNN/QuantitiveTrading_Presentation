/**
 * Created by cyz on 2017/6/12.
 */

Vue.prototype.$echarts = echarts;
var vm = new Vue({
   el:'#container',
    data:{
       createDays:'',
       holdDays:'',
       beginDate:'',
       endDate:'',

       items:[

       ],
        chosens:[

        ],
        backup:[

        ]

    },
    methods:{
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
            alert("实现添加所有股票");
        },
        deleteAll:function () {

            this.chosens=[];
            this.items=this.backup;
        }
    },
    mounted(){

        var mychart = this.$echarts.init(document.getElementById('line-chart'),'macarons');
        mychart.showLoading({
            text:'数据加载中'
        });


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

        var option = {
            title : {
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['最高气温','最低气温']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar','scatter']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLabel : {
                        formatter: '{value} °C'
                    }
                }
            ],
            series : [
                {
                    name:'基准收益',
                    type:'line',
                    data:[11, 11, 15, 13, 12, 13, 10],
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
                    data:[1, -2, 2, 5, 3, 2, 0],
                    markPoint : {
                        data : [
                            {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
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
        mychart.setOption(option);
    }
});