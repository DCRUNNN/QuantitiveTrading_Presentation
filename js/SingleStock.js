/**
 * Created by pc on 2017/6/1.
 */
/**
 * Created by cyz on 2017/5/16.
 */

function show()  //显示隐藏层和弹出层
{
    var hideobj=document.getElementById("hidebg");
    hidebg.style.display="block";  //显示隐藏层
    hidebg.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度
    document.getElementById("login1").style.display="block";  //显示弹出层
}
function hide()  //去除隐藏层和弹出层
{
    document.getElementById("hidebg").style.display="none";
    document.getElementById("login1").style.display="none";
    window.location.href = "../pages/Login.html";
}
function show1()  //显示隐藏层和弹出层
{
    var hideobj1=document.getElementById("hidebg1");
    hidebg1.style.display="block";  //显示隐藏层
    hidebg1.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度
    document.getElementById("login2").style.display="block";  //显示弹出层
}
function hide1()  //去除隐藏层和弹出层
{
    document.getElementById("hidebg1").style.display="none";
    document.getElementById("login2").style.display="none";
}

function show2()  //显示隐藏层和弹出层
{
    var hideobj2=document.getElementById("hidebg2");
    hidebg2.style.display="block";  //显示隐藏层
    hidebg2.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度
    document.getElementById("login3").style.display="block";  //显示弹出层
}
function hide2()  //去除隐藏层和弹出层
{
    document.getElementById("hidebg2").style.display="none";
    document.getElementById("login3").style.display="none";

}



function changeTag() {
    var temp=document.getElementById("select").value;
    if(temp == "opt1"){
        document.getElementById("changeColumn").innerHTML="涨幅";
        document.getElementById("涨幅").style.display="";
        document.getElementById("成交量").style.display="none";
        document.getElementById("换手").style.display="none";
        document.getElementById("量比").style.display="none";
        document.getElementById("市盈率").style.display="none";
        document.getElementById("跌幅").style.display="none";
    }
    if(temp == "opt2"){
        document.getElementById("changeColumn").innerHTML="跌幅";
        document.getElementById("涨幅").style.display="none";
        document.getElementById("成交量").style.display="none";
        document.getElementById("换手").style.display="none";
        document.getElementById("量比").style.display="none";
        document.getElementById("市盈率").style.display="none";
        document.getElementById("跌幅").style.display="";
    }
    if(temp=="opt3"){
        document.getElementById("changeColumn").innerHTML="成交量";
        document.getElementById("涨幅").style.display="none";
        document.getElementById("跌幅").style.display="none";
        document.getElementById("换手").style.display="none";
        document.getElementById("量比").style.display="none";
        document.getElementById("市盈率").style.display="none";
        document.getElementById("成交量").style.display="";
    }
    if(temp=="opt4"){
        document.getElementById("涨幅").style.display="none";
        document.getElementById("成交量").style.display="none";
        document.getElementById("跌幅").style.display="none";
        document.getElementById("量比").style.display="none";
        document.getElementById("市盈率").style.display="none";
        document.getElementById("换手").style.display="";
    }
    if(temp=="opt5"){
        document.getElementById("涨幅").style.display="none";
        document.getElementById("成交量").style.display="none";
        document.getElementById("换手").style.display="none";
        document.getElementById("跌幅").style.display="none";
        document.getElementById("市盈率").style.display="none";
        document.getElementById("量比").style.display="";
    }
    if(temp=="opt6"){
        document.getElementById("涨幅").style.display="none";
        document.getElementById("成交量").style.display="none";
        document.getElementById("换手").style.display="none";
        document.getElementById("量比").style.display="none";
        document.getElementById("市盈率").style.display="";
        document.getElementById("跌幅").style.display="none";
    }
}



Vue.prototype.$echarts = echarts

var vm = new Vue({
    el:'#app',
    data:{
        stockname:'',
        stockCode:'',
        quote_change:'',
        quote_change_per:'',

        location:'',
        range:'',
        business:'',
        date:'',
        propertyperstock:'',
        incomeperstock:'',
        income:'',
        incomeincrease:'',
        marincome:'',
        cashperstock:'',
        fundsperstock:'1.34',
        notprofit:'000',
        total:'10000',
        flowstock:'900',

        topenprice:'',
        thighprice:'',
        tlowprice:'',
        pprice:'',
        price:'',
        tvolume:'',
        ttotal:'',
        market:'',



        newstitle1:'',
        newstitle2:'',
        newstitle3:'',
        newstitle4:'',
        newstitle5:'',
        newstitle6:'',
        newstitle7:'',
        newstitle8:'',
        newsurl1:'',
        newsurl2:'',
        newsurl3:'',
        newsurl4:'',
        newsurl5:'',
        newsurl6:'',
        newsurl7:'',
        newsurl8:'',
        newsdate1:'',
        newsdate2:'',
        newsdate3:'',
        newsdate4:'',
        newsdate5:'',
        newsdate6:'',
        newsdate7:'',
        newsdate8:'',

        announcementtitle1:'',
        announcementtitle2:'',
        announcementtitle3:'',
        announcementtitle4:'',
        announcementtitle5:'',
        announcementtitle6:'',
        announcementtitle7:'',
        announcementtitle8:'',

        announcementurl1:'',
        announcementurl2:'',
        announcementurl3:'',
        announcementurl4:'',
        announcementurl5:'',
        announcementurl6:'',
        announcementurl7:'',
        announcementurl8:'',
        announcementdate1:'',
        announcementdate2:'',
        announcementdate3:'',
        announcementdate4:'',
        announcementdate5:'',
        announcementdate6:'',
        announcementdate7:'',
        announcementdate8:'',

        point:"",
        overview:"",
        beat:"",
        shortTrend:"",
        midTrend:"",
        longTrend:"",
        conclude:"",
        testDate:"",
        technical_test: "",
        fund_test: "",
        info_test: "",
        industry_test: "",
        basic_test: ""

    },
    methods:{

        addStock:function () {

            if(this.getCookieValue("phoneNumber") === ""){
                show();
            }else{
                this.$http.get("http://localhost:8080/personnel/addStock",{
                    params:{
                        userId:this.getCookieValue("phoneNumber"),
                        stockCode:this.stockCode
                    }
                }).then(function (response) {
                    if (response.data.errorCode === 0) {
                       show1();
                    }else if(response.data.errorCode == 50000001){
                        // console.log(response.data);
                     show2();
                    }
                }).catch(function (error) {
                    alert("发生了未知的错误！");
                });
            }

        },

        setCookie:function (cname,cvalue) {
            var d = new Date();
            d.setTime(d.getTime() + (300*24*60*60*1000)); //300天
            var expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
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
        },
        getNowFormatDate:function () {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();

            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();

            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            if (hour >= 0 && hour <= 9) {
                hour = "0" + hour;
            }

            if (minute >= 0 && minute <= 9) {
                minute = "0" + minute;
            }

            if (second >= 0 && second <= 9) {
                second = "0" + second;
            }

            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + hour + seperator2 + minute
                + seperator2 + second;
            return currentdate;
        }
    },
    computed: {
        classObject: function () {
            if (this.quote_change >= 0) {
                return "info-box-icon bg-red";
            }
            return "info-box-icon bg-green";
        },

        iObject: function () {
            if (this.quote_change >= 0) {
                return "fa fa-arrow-up";
            }
            return "fa fa-arrow-down";
        }
    },

    mounted:function () {

        if(this.getCookieValue("phoneNumber") === ""){
            document.getElementById("login").innerHTML = "登录";
        }else{
            document.getElementById("login").innerHTML = "已登录";
            document.getElementById("login").href = "#";
        }


        var mychart = this.$echarts.init(document.getElementById('kline'));
        mychart.showLoading({
            text:'数据loading',
            effect: 'whirling',
            textStyle : {
                fontSize : 20
            }
        });

        var thisUrl = document.URL;
        var getVal = thisUrl.split('?')[1];
        var code = getVal.split('=')[1];
        this.stockCode = code;
        var klineData;
        const self = this;

        var phoneNumber = this.getCookieValue("phoneNumber");

        //根据stockCode得到stockName
        this.$http.get("http://localhost:8080/stockName/"+code).then(function (response) {
            self.stockname = response.data.data;
        });

        //根据stockCode得到本股信息
        this.$http.get("http://localhost:8080/company/details/"+code).then(function (response) {
            self.topenprice = response.data.data.open;
            self.thighprice = response.data.data.high;
            self.tlowprice = response.data.data.low;
            self.pprice = response.data.data.close;
            self.price = response.data.data.currentPrice;
            self.tvolume = response.data.data.volume;
            self.ttotal = response.data.data.turnover;
            self.market = response.data.data.market;
            self.quote_change=(self.price-self.pprice).toPrecision(2);
            self.quote_change_per=response.data.data.quote_change+"%";

        }).catch(function (error) {
            if(error==20000001){
                alert("股票不存在！")
            }
            alert("出现了未知的错误！")
        });



        this.$http.get("http://localhost:8080/company/info/"+code).then(function (response) {
            // console.log(response.data);
            self.location = response.data.data.area;
            self.range = response.data.data.concept.substring(0,15);
            self.business = response.data.data.businessDetail.substring(0,15);
            self.date = response.data.data.listingDate;
            self.propertyperstock = response.data.data.netAssetPerShare;
            self.incomeperstock = response.data.data.incomePerShare;
            self.income = response.data.data.profit;
            self.incomeincrease = response.data.data.growthRate_profit;
            self.marincome = response.data.data.incomeAll;
            self.cashperstock = response.data.data.cashFlowPerShare;

            self.fundsperstock = response.data.data.fundPerShare;
            self.notprofit = response.data.data.undistributedProfitPerShare;
            self.total = response.data.data.totalShareCapital;
            self.flowstock = response.data.data.outstandingShares;
        }).catch(function (error) {
            alert("出现了未知的错误");
        });

        //根据stockCode得到公司新闻
        this.$http.get("http://localhost:8080/company/news/"+code).then(function (response) {

            self.newstitle1=response.data.data[0].title;
            self.newsurl1=response.data.data[0].link;
            self.newsdate1=response.data.data[0].date;

            self.newstitle2=response.data.data[1].title;
            self.newsurl2=response.data.data[1].link;
            self.newsdate2=response.data.data[1].date;

            self.newstitle3=response.data.data[2].title;
            self.newsurl3=response.data.data[2].link;
            self.newsdate3=response.data.data[2].date;

            self.newstitle4=response.data.data[3].title;
            self.newsurl4=response.data.data[3].link;
            self.newsdate4=response.data.data[3].date;

            self.newstitle5=response.data.data[4].title;
            self.newsurl5=response.data.data[4].link;
            self.newsdate5=response.data.data[4].date;

            self.newstitle6=response.data.data[5].title;
            self.newsurl6=response.data.data[5].link;
            self.newsdate6=response.data.data[5].date;

            self.newstitle7=response.data.data[6].title;
            self.newsurl7=response.data.data[6].link;
            self.newsdate7=response.data.data[6].date;

            self.newstitle8=response.data.data[7].title;
            self.newsurl8=response.data.data[7].link;
            self.newsdate8=response.data.data[7].date;

        }).catch(function (response) {
            alert("加载公司近期新闻时出现了错误");
        });

        this.$http.get("http://localhost:8080/company/announcement/"+code).then(function (response) {
            self.announcementtitle1=response.data.data[0].title.substring(0,18);
            self.announcementurl1=response.data.data[0].link;
            self.announcementdate1=response.data.data[0].date;

            self.announcementtitle2=response.data.data[1].title.substring(0,18);
            self.announcementurl2=response.data.data[1].link;
            self.announcementdate2=response.data.data[1].date;

            self.announcementtitle3=response.data.data[2].title.substring(0,18);
            self.announcementurl3=response.data.data[2].link;
            self.announcementdate3=response.data.data[2].date;

            self.announcementtitle4=response.data.data[3].title.substring(0,18);
            self.announcementurl4=response.data.data[3].link;
            self.announcementdate4=response.data.data[3].date;

            self.announcementtitle5=response.data.data[4].title.substring(0,18);
            self.announcementurl5=response.data.data[4].link;
            self.announcementdate5=response.data.data[4].date;

            self.announcementtitle6=response.data.data[5].title.substring(0,18);
            self.announcementurl6=response.data.data[5].link;
            self.announcementdate6=response.data.data[5].date;

            self.announcementtitle7=response.data.data[6].title.substring(0,18);
            self.announcementurl7=response.data.data[6].link;
            self.announcementdate7=response.data.data[6].date;

            self.announcementtitle8=response.data.data[7].title.substring(0,18);
            self.announcementurl8=response.data.data[7].link;
            self.announcementdate8=response.data.data[7].date;
        }).catch(function (response) {
            alert("加载公司公告时出现了错误");
        });

        this.$http.get("http://localhost:8080/company/diagnosis/"+code).then(function (response) {
            self.point=response.data.data.point;
            self.overview=response.data.data.overview;
            self.beat=response.data.data.beat;
            self.shortTrend=response.data.data.shortTerm_trend;
            self.midTrend=response.data.data.midTerm_trend;
            self.longTrend=response.data.data.longTerm_trend;
            self.conclude=response.data.data.conclude;
            // self.testDate=response.data.data.testDate;
            var date=new Date();
            self.testDate="诊断日期："+date.toLocaleDateString()+" "+date.toLocaleTimeString();
            self.technical_test=response.data.data.technical_test;
            self.fund_test=response.data.data.fund_test;
            self.info_test=response.data.data.info_test;
            self.industry_test=response.data.data.industry_test;
            self.basic_test=response.data.data.basic_test;
        }).catch(function (response) {
            alert("诊断股票时发生了错误");
        });

        this.$http.get("http://localhost:8080/exhibition/kline/"+code,{
            params:{
                beginDate:'2017-02-02',
                endDate:'2017-06-14'
            }
        }).then(function (response) {

            klineData = response.data.data.klineData;
            // console.log(response.data.data.klineData);

           var data = splitData(klineData);

//数组处理
            function splitData(rawData) {
                var datas = [];
                var times = [];
                var vols = [];
                for (var i = 0; i < rawData.length; i++) {
                    datas.push(rawData[i]);
                    times.push(rawData[i].splice(0, 1)[0]);
                    vols.push(rawData[i][4]);
                }
                return {
                    datas: datas,
                    times: times,
                    vols: vols,
                };
            }

//分段计算
            function fenduans(){
                var markLineData = [];
                var idx = 0; var tag = 0; var vols = 0;
                for (var i = 0; i < data.times.length; i++) {
                    //初始化数据
                    if(data.datas[i][5] != 0 && tag == 0){
                        idx = i; vols = data.datas[i][4]; tag = 1;
                    }
                    if(tag == 1){ vols += data.datas[i][4]; }
                    if(data.datas[i][5] != 0 && tag == 1){
                        markLineData.push([{
                            xAxis: idx,
                            yAxis: data.datas[idx][1]>data.datas[idx][0]?(data.datas[idx][3]).toFixed(2):(data.datas[idx][2]).toFixed(2),
                            value: vols
                        }, {
                            xAxis: i,
                            yAxis: data.datas[i][1]>data.datas[i][0]?(data.datas[i][3]).toFixed(2):(data.datas[i][2]).toFixed(2)
                        }]);
                        idx = i; vols = data.datas[i][4]; tag = 2;
                    }

                    //更替数据
                    if(tag == 2){ vols += data.datas[i][4]; }
                    if(data.datas[i][5] != 0 && tag == 2){
                        markLineData.push([{
                            xAxis: idx,
                            yAxis: data.datas[idx][1]>data.datas[idx][0]?(data.datas[idx][3]).toFixed(2):(data.datas[idx][2]).toFixed(2),
                            value: (vols/(i-idx+1)).toFixed(2)+' M'
                        }, {
                            xAxis: i,
                            yAxis: data.datas[i][1]>data.datas[i][0]?(data.datas[i][3]).toFixed(2):(data.datas[i][2]).toFixed(2)
                        }]);
                        idx = i; vols = data.datas[i][4];
                    }
                }
                return markLineData;
            }

//MA计算公式
            function calculateMA(dayCount) {
                var result = [];
                for (var i = 0, len = data.times.length; i < len; i++) {
                    if (i < dayCount) {
                        result.push('-');
                        continue;
                    }
                    var sum = 0;
                    for (var j = 0; j < dayCount; j++) {
                        sum += data.datas[i - j][1];
                    }
                    result.push((sum / dayCount).toFixed(2));
                }
                return result;
            }
            mychart.showLoading();
            var option = {
                title: {
                    text: '',
                    left: 0
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line'
                    }
                },
                legend: {
                    data: ['KLine', 'MA5','MA10','MA20','MA30','MA60','MA120']
                },
                grid: [           {
                    left: '8%',
                    right: '1%',
                    top:'7%',
                    height: '60%'
                },{
                    left: '8%',
                    right: '1%',
                    top: '80%',
                    height: '10%'
                },{
                    left: '3%',
                    right: '1%',
                    top: '120%',
                    height: '14%'
                }],
                xAxis: [{
                    type: 'category',
                    data: data.times,
                    scale: true,
                    boundaryGap: false,
                    axisLine: { onZero: false },
                    splitLine: { show: false },
                    splitNumber: 20,
                    min: 'dataMin',
                    max: 'dataMax'
                },{
                    type: 'category',
                    gridIndex: 1,
                    data: data.times,
                    axisLabel: {show: false}
                },{
                    type: 'category',
                    gridIndex: 2,
                    data: data.times,
                    axisLabel: {show: false}
                }],
                yAxis: [{
                    scale: true,
                    splitArea: {
                        show: false
                    }
                },{
                    gridIndex: 1,
                    splitNumber: 3,
                    axisLine: {onZero: false},
                    axisTick: {show: false},
                    splitLine: {show: false},
                    axisLabel: {show: true}
                },{
                    gridIndex: 2,
                    splitNumber: 4,
                    axisLine: {onZero: false},
                    axisTick: {show: false},
                    splitLine: {show: false},
                    axisLabel: {show: true}
                }],
                dataZoom: [{
                    type: 'inside',
                    xAxisIndex: [0, 0],
                    start: 20,
                    end: 100
                },{
                    show: true,
                    xAxisIndex: [0, 1],
                    type: 'slider',
                    top: '97%',
                    start: 20,
                    end: 100
                },{
                    show: false,
                    xAxisIndex: [0, 2],
                    type: 'slider',
                    start: 20,
                    end: 100
                }],
                series: [{
                    name: '',
                    type: 'candlestick',
                    data: data.datas,
                    itemStyle: {
                        normal: {
                            color: '#ef232a',
                            color0: '#14b143',
                            borderColor: '#ef232a',
                            borderColor0: '#14b143'
                        }
                    },
                    markArea: {
                        silent: true,
                        itemStyle: {
                            normal: {
                                color: 'Honeydew'
                            }
                        },
                        data: fenduans()
                    },
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    }
                }, {
                    name: 'MA5',
                    type: 'line',
                    data: calculateMA(5),
                    smooth: true,
                    lineStyle: {
                        normal: {
                            opacity: 0.5
                        }
                    }
                },{
                    name:'MA10',
                    type:'line',
                    data:calculateMA(10),
                    smooth:true,
                    lineStyle:{
                        normal:{
                            opacity:0.5
                        }
                    }
                },{
                    name:'MA20',
                    type:'line',
                    data:calculateMA(20),
                    smooth:true,
                    lineStyle:{
                        normal:{
                            opacity:0.5
                        }
                    }
                },
                    {
                        name:'MA30',
                        type:'line',
                        data:calculateMA(30),
                        smooth:true,
                        lineStyle:{
                            normal:{
                                opacity:0.5
                            }
                        }
                    },
                    {
                        name:'MA60',
                        type:'line',
                        data:calculateMA(60),
                        smooth:true,
                        lineStyle:{
                            normal:{
                                opacity:0.5
                            }
                        }
                    },
                    {
                        name:'MA120',
                        type:'line',
                        data:calculateMA(120),
                        smooth:true,
                        lineStyle:{
                            normal:{
                                opacity:0.5
                            }
                        }
                    },
                    {
                        name: 'Volumn',
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: data.vols,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var colorList;
                                    if (data.datas[params.dataIndex][1]>data.datas[params.dataIndex][0]) {
                                        colorList = '#ef232a';
                                    } else {
                                        colorList = '#14b143';
                                    }
                                    return colorList;
                                },
                            }
                        }
                    }
                ]
            };
            mychart.hideLoading();
            mychart.setOption(option);


            //添加本页面股票浏览记录

            if(this.getCookieValue("history") === "") {
                //不存在history
                this.setCookie("history", code+"--"+self.stockname+"/"+this.getNowFormatDate());
            }else{
                var historyData = this.getCookieValue("history");
                //删除cookie
                var d = new Date();
                d.setTime(d.getTime() - 4 * 600000);
                document.cookie = "history=" + historyData + ";expires=" + d.toUTCString() + ";path=/";

                var array = (historyData + "|" + code+"--"+self.stockname+"/"+this.getNowFormatDate()).split("|");
                if(array.length > 10) {
                    //元素个数大于１０的话，删除第一个元素
                    array.shift();
                }

                var newString = array.join("|");
                this.setCookie("history", newString);
            }
        });

    }
});