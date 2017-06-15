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

                    var json = JSON.parse(response.data.data);

                    console.log(json.dateList);

                    self.dateRange = json.dateList;
                    self.fieldRate = json.yieldRates;
                    self.primaryRate = json.primaryRates;

                    self.yearProfit = json.yearYield;
                    self.primaryYearProfit = json.primaryYearYield;
                    self.alafa = json.alpha;
                    self.beita = json.beta;
                    self.sharp = json.shapeRatio;
                    self.maxBack =json.maxDrawnDown;

                    var option1 = {
                        title : {

                        },
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['基准收益','策略收益']
                        },/* grid: [           {
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
                        }],*/
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
                                data : this.dateRange
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