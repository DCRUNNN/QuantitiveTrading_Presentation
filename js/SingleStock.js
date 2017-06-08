/**
 * Created by pc on 2017/6/1.
 */
/**
 * Created by cyz on 2017/5/16.
 */
Vue.prototype.$echarts = echarts

var vm = new Vue({
    el:'#app',
    data:{
        stockname:'顺络电子',
        location:'TIANJI',
        range:'邓聪邓聪邓聪',
        business:'邓聪，曾锡豪，陈远志，蔡其旻',
        date:'2013-12-12',
        propertyperstock:'666',
        incomeperstock:'888',
        income:'12',
        incomeincrease:'12.1%',
        marincome:'1000',
        cashperstock:'0.15',
        fundsperstock:'1.34',
        notprofit:'000',
        total:'10000',
        flowstock:'900',
        topenprice:'18.3',
        thighprice:'22',
        tlowprice:'11',
        pprice:'10',
        tvolumn:'666',
        tamounttotal:'280亿',
        tvalue:'999',
        flowvalue:'1111',
        trange:'0.2',
        tchange:'1',
        tvaluep:'9090',
        fvaluep:'000',
        newstitle1:'私募调研热情创年内新高 市场有望演绎“明星效应”',
        newstitle2:'苹果再创新高 与其感叹 不如看看苹果概念都有谁',
        newstitle3:'股市泡沫竟大过楼市？揭秘：如何在恐怖的“穷5月”多赚210%！',
        newstitle4:'顺络电子：产品和技术领先 主业稳中有升',
        newstitle5:'百度布局人工智能 人工智能概念股再受关注',
        newstitle6:'4月62家私募密集调研逾百家上市公司 四成跑赢大盘',
        newstitle7:'公司互动：顺络电子无线充电产品中的发射线圈与接收线圈已经量产',
        newstitle8:'四机构卖出顺络电子',
        newsurl1:'',
        newsurl2:'',
        newsurl3:'',
        newsurl4:'',
        newsurl5:'',
        newsurl6:'',
        newsurl7:'',
        newsurl8:'',
        newsdate1:'05-16 14:49',
        newsdate2:'05-10 20:36',
        newsdate3:'05-10 16:38',
        newsdate4:'05-09 07:24',
        newsdate5:'05-05 09:41',
        newsdate6:'05-04 19:43',
        newsdate7:'05-04 13:28',
        newsdate8:'05-03 08:29',

        announcementtitle1:'顺络电子：关于员工持股计划实施进展的公告',
        announcementtitle2:'顺络电子：2017年5月10日投资者关系活动记',
        announcementtitle3:'顺络电子：2017年第一季度报告正文',
        announcementtitle4:'顺络电子：第四届董事会第二十三次会议决议',
        announcementtitle5:'顺络电子：关于收购信柏陶瓷部分股权的进展',
        announcementtitle6:'顺络电子：2017年第一季度报告全文',
        announcementtitle7:'顺络电子：关于第一大股东解除部分股权质押',
        announcementtitle8:'顺络电子：西藏信托-莱沃35号集合资金信托',

        announcementurl1:'',
        announcementurl2:'',
        announcementurl3:'',
        announcementurl4:'',
        announcementurl5:'',
        announcementurl6:'',
        announcementurl7:'',
        announcementurl1:'',
        announcementdate1:'2017-05-17',
        announcementdate2:'2017-05-12',
        announcementdate3:'2017-04-29',
        announcementdate4:'2017-04-29',
        announcementdate5:'2017-04-29',
        announcementdate6:'2017-04-29',
        announcementdate7:'2017-04-28',
        announcementdate8:'2017-04-26',

        klineData:[[]]
    },
    methods:{
    },
    created:function () {

        var thisUrl = document.URL;
        var getVal = thisUrl.split('?')[1];
        var code = getVal.split('=')[1];

        // console.log(code)
        const self = this;
        this.$http.get("http://localhost:8080/exhibition/kline/"+code,{
            params:{
                beginDate:'2012-03-02',
                endDate:'2012-05-03'
            }
        }).then(function (response) {
            self.klineData = response.data.data.klineData;
        });
    },
    mounted:function () {

        var mychart = this.$echarts.init(document.getElementById('kline'));

        console.log(this.klineData);
        var data = splitData(this.klineData);
//数组处理
        function splitData(rawData) {
            var datas = [];
            var times = [];
            var vols = [];
            var macds = []; var difs = []; var deas = [];
            for (var i = 0; i < rawData.length; i++) {
                datas.push(rawData[i]);
                times.push(rawData[i].splice(0, 1)[0]);
                vols.push(rawData[i][4]);
                macds.push(rawData[i][6]);
                difs.push(rawData[i][7]);
                deas.push(rawData[i][8]);
            }
            return {
                datas: datas,
                times: times,
                vols: vols,
                macds: macds,
                difs: difs,
                deas: deas
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
                left: '3%',
                right: '1%',
                height: '60%'
            },{
                left: '3%',
                right: '1%',
                top: '76%',
                height: '10%'
            },{
                left: '3%',
                right: '1%',
                top: '88%',
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
                },
                markLine: {
                    label: {
                        normal: {
                            position: 'middle',
                            textStyle:{color:'Blue',fontSize: 15}
                        }
                    },
                    data: fenduans(),
                    symbol: ['circle', 'none']

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
                },{
                    name: 'MACD',
                    type: 'bar',
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    data: data.macds,
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                var colorList;
                                if (params.data >= 0) {
                                    colorList = '#ef232a';
                                } else {
                                    colorList = '#14b143';
                                }
                                return colorList;
                            },
                        }
                    }
                },{
                    name: 'DIF',
                    type: 'line',
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    data: data.difs
                },{
                    name: 'DEA',
                    type: 'line',
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    data: data.deas
                }
            ]
        };
        mychart.setOption(option);
    }
})