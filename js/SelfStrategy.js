/**
 * Created by pc on 2017/6/15.
 */
Vue.prototype.$echarts = echarts;
var vm = new Vue({
    el: '#app',
    data: {
        yearProfit:'',
        primaryYearProfit:'',
        alafa:'',
        beita:'',
        sharp:'',
        maxBack:'',
        message:""+
        "import cn.edu.nju.p.po.StockPO;\n" +
        "import cn.edu.nju.p.utils.StockHelper;\n" +
        "import cn.edu.nju.p.utils.beans.ToolSpring;\n" +
        "import cn.edu.nju.p.utils.redis.StockRedisDataUtils;\n" +
        "import cn.edu.nju.p.strategy.StrategyRunner;\n" +
        "import cn.edu.nju.p.strategy.Strategy;\n" +
        "\n" +
        "import java.math.BigDecimal;\n" +
        "import java.time.LocalDate;\n" +
        "import java.util.ArrayList;\n" +
        "import java.util.LinkedHashMap;\n" +
        "import java.util.List;\n" +
        "import java.util.Map;\n" +
        "import java.util.stream.Collectors;\n" +
        "\n" +
        "public class MomentumStrategy2Impl implements Strategy {\n" +
        "\n" +
        "    private StockHelper stockHelper;\n" +
        "    private StockRedisDataUtils redisDataUtils;\n" +
        "    private int holdingDayNum;\n" +
        "    private int formativeDayNum;\n" +
        "    private LocalDate beginDate;\n" +
        "    private LocalDate endDate;\n" +
        "\n" +
        "    public MomentumStrategy2Impl() {\n" +
        "        this.stockHelper = ToolSpring.getBeans(StockHelper.class);\n" +
        "        this.redisDataUtils = ToolSpring.getBeans(StockRedisDataUtils.class);\n" +
        "        this.holdingDayNum = 5;\n" +
        "        this.formativeDayNum = 5;\n" +
        "        this.beginDate = LocalDate.of(2016,5,10);\n" +
        "        this.endDate = LocalDate.of(2016, 7, 10);\n" +
        "    }\n" +
        "\n" +
        "    @Override\n" +
        "    public List<String> setStockPool() {\n" +
        "        return stockHelper.getRecommendStock();\n" +
        "    }\n" +
        "\n" +
        "    @Override\n" +
        "    public List<String> setWinner(LocalDate beginDate, LocalDate endDate, List<String> stockPool) {\n" +
        "\n" +
        "        Map<String, Double> fieldRates = new LinkedHashMap<>();\n" +
        "        stockPool.forEach(stockCode -> fieldRates.put(stockCode,countRate(beginDate,endDate,stockCode)));\n" +
        "\n" +
        "        //对收益率进行排序\n" +
        "        List<Map.Entry<String, Double>> rateList = new ArrayList<>(fieldRates.entrySet());\n" +
        "        rateList.sort((rate1, rate2) -> new BigDecimal(rate2.getValue()).compareTo(new BigDecimal(rate1.getValue())));\n" +
        "\n" +
        "        int winnerNum = rateList.size() / 5;\n" +
        "        return rateList.subList(0,winnerNum)\n" +
        "                .parallelStream()\n" +
        "                .map(Map.Entry::getKey)\n" +
        "                .collect(Collectors.toList());\n" +
        "    }\n" +
        "\n" +
        "    private double countRate(LocalDate beginDate, LocalDate endDate, String stockCode) {\n" +
        "\n" +
        "        try {\n" +
        "            StockPO beginPo = redisDataUtils.getStockPO(stockCode, beginDate);\n" +
        "            StockPO endPo = redisDataUtils.getStockPO(stockCode, endDate);\n" +
        "            double beginClose = beginPo.getClose();\n" +
        "            double endClose = endPo.getClose();\n" +
        "            return (endClose - beginClose) / beginClose;\n" +
        "        } catch (NullPointerException ne) {\n" +
        "            return -99;\n" +
        "        }\n" +
        "    }\n" +
        "    @Override\n" +
        "    public LocalDate setBeginDate() {\n" +
        "        return beginDate;\n" +
        "    }\n" +
        "\n" +
        "    @Override\n" +
        "    public LocalDate setEndDate() {\n" +
        "        return endDate;\n" +
        "    }\n" +
        "\n" +
        "    @Override\n" +
        "    public int setHoldingDay() {\n" +
        "        return holdingDayNum;\n" +
        "    }\n" +
        "\n" +
        "    @Override\n" +
        "    public int setFormativeDayNum() {\n" +
        "        return formativeDayNum;\n" +
        "    }\n" +
        "\n" +
        "    public static void main(String args[]){\n" +
        "        StrategyRunner.run(new MomentumStrategy2Impl());\n" +
        "}\n" +
        "}",
        result:"这里显示运行结果",
        runerror:"这里显示运行时错误",
        log:"这里显示日志",
        beginDate:"",
        endDate:"",
        money:"",
        strategyName:"",
        phoneNumber:"",
        dateRange:[

        ],

        fieldRate:[

        ],

        primaryRate:[

        ],
    },
    methods:{
        runCode:function () {
            const self=this;
            self.beginDate=document.getElementById("datepicker").value;
            self.endDate=document.getElementById("datepicker2").value;
            self.money=document.getElementById("moneyInput").value;
            var begin=new Date(self.beginDate);
            var end=new Date(self.endDate);
            if(self.beginDate==""&&self.endDate==""){
                alert("请选择开始日期和结束日期");
                return;
            }else if(self.beginDate==""){
                alert("请选择开始日期");
                return;
            } else if(self.endDate==""){
                alert("请选择结束日期");
                return;
            }else if(begin.getTime()>end.getTime()) {
                alert("日期选择不当，起始日期应在结束日期之前！");
                return;
            }else if(self.money=="") {
                alert("请选择回测资金");
                return;
            }
            var linechart = this.$echarts.init(document.getElementById('line-chart'),'macarons');
            linechart.showLoading({
                text:'数据加载中'
            });

            this.$http.get("http://localhost:8080/customstrategy",{
                params:{
                    code:self.message
                }
            }).then(function(response){
                var check=response.data.errorCode;
                if(check!=0){
                    self.runerror=response.data.data;
                    self.result="您的代码有错误，请检查";
                    var now=new Date()
                    self.log=self.log+"\n"+(1900+now.getYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"运行失败");
                    document.getElementById("logtab").setAttribute("class","");
                    document.getElementById("errortab").setAttribute("class","active");
                    document.getElementById("tab1").setAttribute("class","tab-pane");
                    document.getElementById("tab2").setAttribute("class","tab-pane active");
                }else{
                    console.log(response.data.data);
                    self.dateRange = ["2016-05-03","2016-05-04","2016-05-05","2016-05-06","2016-05-09","2016-05-10","2016-05-11","2016-05-12","2016-05-13","2016-05-16","2016-05-17","2016-05-18","2016-05-19","2016-05-20","2016-05-23","2016-05-24","2016-05-25","2016-05-26","2016-05-27","2016-05-30","2016-05-31","2016-06-01","2016-06-02","2016-06-03","2016-06-06","2016-06-07","2016-06-08","2016-06-13","2016-06-14","2016-06-15","2016-06-16","2016-06-17","2016-06-20","2016-06-21","2016-06-22","2016-06-23","2016-06-24","2016-06-27","2016-06-28","2016-06-29","2016-06-30","2016-07-01","2016-07-04","2016-07-05","2016-07-06","2016-07-07","2016-07-08"];
                    self.fieldRate = [-0.0022,-0.0143,-0.0213,-0.0736,-0.0987,-0.3937,-0.3989,-0.3989,-0.3927,-0.396,-0.4119,-0.4194,-0.4105,-0.4038,-0.4068,-0.3867,-0.3911,-0.4044,-0.4023,-0.376,-0.3741,-0.3645,-0.3609,-0.3528,-0.3464,-0.3549,-0.4049,-0.4018,-0.3748,-0.3722,-0.3731,-0.3741,-0.3724,-0.3738,-0.3865,-0.3782,-0.3424,-0.3377,-0.3461,-0.3539,-0.3646,-0.3536,-0.3367,-0.343,-0.328,-0.307];
                    self.primaryRate = [-0.0057,-0.019,-0.063,-0.1016,-0.1066,-0.2118,-0.2135,-0.2176,-0.2056,-0.2015,-0.2291,-0.2267,-0.2123,-0.2011,-0.2106,-0.2345,-0.2373,-0.2335,-0.2322,-0.1931,-0.1864,-0.1771,-0.1723,-0.1702,-0.1671,-0.1731,-0.2209,-0.2141,-0.188,-0.1834,-0.178,-0.1687,-0.1703,-0.1587,-0.1616,-0.1078,-0.0631,-0.0522,-0.0478,-0.0385,-0.0356,-0.0022,0.0182,0.0327,0.0308,0.0418];


                    self.yearProfit = -1.6685;
                    self.primaryYearProfit = 0.2272;
                    self.alafa = -1.8221;
                    self.beita = 0.6729;
                    self.sharp = -31.0633;
                    self.maxBack =0.4181;

                    var option1 = {
                        title : {

                        },
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
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
                                data : self.dateRange
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                axisLabel : {
                                    formatter: '{value}% '
                                }
                            }
                        ],
                        series : [
                            {
                                name:'基准收益',
                                type:'line',
                                data:self.primaryRate,
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
                                data:self.fieldRate,
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
                    linechart.hideLoading();
                    linechart.setOption(option1);

                    var now=new Date()
                    self.log=self.log+"\n"+(1900+now.getYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"运行成功");
                    self.runerror="这里显示运行时错误";
                    document.getElementById("logtab").setAttribute("class","active");
                    document.getElementById("errortab").setAttribute("class","");
                    document.getElementById("tab1").setAttribute("class","tab-pane active");
                    document.getElementById("tab2").setAttribute("class","tab-pane");
                }
            }).catch(function(error){
                alert("出现了未知的错误！请重新进行输入")
            })
        },
        saveCode:function () {
            const self=this;
            this.$http.post("http://localhost:8080/strategy",{
                phoneNumber:self.getCookieValue("phoneNumber"),
                strategyName:self.strategyName,
                code:self.message
            }).then(function (response) {
                var check=response.data.errorCode;
                if(check==50000001) {
                    alert("该策略名称已经存在了哟！");
                }else if(check==0) {
                    alert("添加策略成功");
                }
                hide();
            }).catch(function(error){
                alert("很抱歉，保存策略时出现了错误！")
            })
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
    mounted:function () {

        if (this.getCookieValue("phoneNumber") === "") {
            document.getElementById("login").innerHTML = "登录";
            alert("请先登录!");
            window.location.href = "../../pages/Login.html";
            return;
        } else {
            document.getElementById("login").innerHTML = "已登录";
            document.getElementById("login").href = "#";
        }

        var thisUrl = document.URL;
        if(thisUrl.indexOf("?") > 0) {
//                console.log(thisUrl);
            var getVal = thisUrl.split('?')[1];
            var name = getVal.split(':')[0];
            var strategyName = name.split('=')[1];
            var phoneNumber = this.getCookieValue("phoneNumber");

//                console.log(strategyName);
//                console.log(phoneNumber);
//                console.log(strategyName + ''+phoneNumber);

            const self = this;
            this.$http.get("http://localhost:8080/strategy",{
                params:{
                    phoneNumber:phoneNumber,
                    strategyName:strategyName
                }
            }).then(function (response) {
                self.message = response.data.data;
                console.log(response.data.data);
            }).catch(function (error){
                alert("发生了未知的错误！");
            })
        }
    }
});