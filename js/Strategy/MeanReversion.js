/**
 * Created by cyz on 2017/6/12.
 */

Vue.prototype.$echarts = echarts;
var vm = new Vue({
   el:'#container',
    data:{
       dayNum:'',
       beginDate:'',
       endDate:'',
       average:'',
       purchaseNum:'',
       stockPool:[],
       items:[

       ],
        chosens:[

        ],
        backup:[

        ],
        MeanReversionDate:['2016-02-10','2016-02-11','2016-02-12','2016-02-13','2016-02-14'

        ],
        MeanReversionFieldRate:[
            '60','290','170','200','90'
        ],
        MeanReversionPrimaryDate:[
            '100','200','300','280','50'
        ]

    },
    methods:{

       run:function () {
           var mychart = this.$echarts.init(document.getElementById('line-chart'),'macarons');
           mychart.showLoading({
               text:'数据加载中'
           });

           for(var i=0;i<this.chosens.length;i++){
               this.stockPool.push(this.chosens[i].stockCode);
           }
           // this.$http.get("http://localhost:8080/meanReversionStratey",{
           //     params:{
           //         stockPool:this.stockPool,
           //         beginDate:this.beginDate,
           //         endDate:this.endDate,
           //         holdingDayNum:this.dayNum,
           //         holdingStockNum:this.purchaseNum,
           //         meanDayNum:this.average
           //     }
           // }).then(function (response) {
           //     this.MeanReversionDate = response.data.data;
           //     this.MeanReversionFieldRate = response.data.data;
           //     this.MeanReversionPrimaryDate = response.data.data;
           // }).catch(function (error) {
           //     alert("发生了未知的错误！")
           // });

           var option = {
               title : {
                   text:'基准和累计收益率图'

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
                       data : this.MeanReversionDate
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
                       data:this.MeanReversionFieldRate,
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
                       data:this.MeanReversionPrimaryDate,
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
        }else {
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