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
        announcementdate8:'2017-04-26'

    },
    method:{
    },
    mounted:function () {

        var thisUrl = document.URL;
        var getVal = thisUrl.split('?')[1];
        var code = getVal.split('=')[1];
        var klineData;
        // const self = this;
        this.$http.get("http://localhost:8080/exhibition/kline/"+code,{
            params:{
                beginDate:'2012-03-02',
                endDate:'2012-05-03'
            }
        }).then(function (response) {
            klineData = response.data.data.klineData;
            var mychart = this.$echarts.init(document.getElementById('kline'));

            console.log(klineData);
            // var data = splitData([['2015-10-16',18.4,18.58,18.33,18.79,67.00,1,0.04,0.11,0.09],['2015-10-19',18.56,18.25,18.19,18.56,55.00,0,-0.00,0.08,0.09],['2015-10-20',18.3,18.22,18.05,18.41,37.00,0,0.01,0.09,0.09],['2015-10-21',18.18,18.69,18.02,18.98,89.00,0,0.03,0.10,0.08],['2015-10-22',18.42,18.29,18.22,18.48,43.00,0,-0.06,0.05,0.08],['2015-10-23',18.26,18.19,18.08,18.36,46.00,0,-0.10,0.03,0.09],['2015-10-26',18.33,18.07,17.98,18.35,65.00,0,-0.15,0.03,0.10],['2015-10-27',18.08,18.04,17.88,18.13,37.00,0,-0.19,0.03,0.12],['2015-10-28',17.96,17.86,17.82,17.99,35.00,0,-0.24,0.03,0.15],['2015-10-29',17.85,17.81,17.8,17.93,27.00,0,-0.24,0.06,0.18],['2015-10-30',17.79,17.93,17.78,18.08,43.00,0,-0.22,0.11,0.22],['2015-11-02',17.78,17.83,17.78,18.04,27.00,0,-0.20,0.15,0.25],['2015-11-03',17.84,17.9,17.84,18.06,34.00,0,-0.12,0.22,0.28],['2015-11-04',17.97,18.36,17.85,18.39,62.00,0,-0.00,0.30,0.30],['2015-11-05',18.3,18.57,18.18,19.08,177.00,0,0.07,0.33,0.30],['2015-11-06',18.53,18.68,18.3,18.71,95.00,0,0.12,0.35,0.29],['2015-11-09',18.75,19.08,18.75,19.98,202.00,1,0.16,0.35,0.27],['2015-11-10',18.85,18.64,18.56,18.99,85.00,0,0.09,0.29,0.25],['2015-11-11',18.64,18.44,18.31,18.64,50.00,0,0.06,0.27,0.23],['2015-11-12',18.55,18.27,18.17,18.57,43.00,0,0.05,0.25,0.23],['2015-11-13',18.13,18.14,18.09,18.34,35.00,0,0.05,0.24,0.22],['2015-11-16',18.01,18.1,17.93,18.17,34.00,0,0.07,0.25,0.21],['2015-11-17',18.2,18.14,18.08,18.45,58.00,0,0.11,0.25,0.20],['2015-11-18',18.23,18.16,18.0,18.45,47.00,0,0.13,0.25,0.19],['2015-11-19',18.08,18.2,18.05,18.25,32.00,0,0.15,0.24,0.17],['2015-11-20',18.15,18.15,18.11,18.29,36.00,0,0.13,0.21,0.15],['2015-11-23',18.16,18.19,18.12,18.34,47.00,0,0.11,0.18,0.13],['2015-11-24',18.23,17.88,17.7,18.23,62.00,0,0.03,0.13,0.11],['2015-11-25',17.85,17.73,17.56,17.85,66.00,0,-0.03,0.09,0.11],['2015-11-26',17.79,17.53,17.5,17.92,63.00,0,-0.10,0.06,0.11],['2015-11-27',17.51,17.04,16.9,17.51,67.00,0,-0.16,0.05,0.13],['2015-11-30',17.07,17.2,16.98,17.32,55.00,0,-0.12,0.09,0.15],['2015-12-01',17.28,17.11,16.91,17.28,39.00,0,-0.09,0.12,0.16],['2015-12-02',17.13,17.91,17.05,17.99,102.00,0,-0.01,0.17,0.18],['2015-12-03',17.8,17.78,17.61,17.98,71.00,0,-0.09,0.14,0.18],['2015-12-04',17.6,17.25,17.13,17.69,51.00,0,-0.18,0.10,0.19],['2015-12-07',17.2,17.39,17.15,17.45,43.00,0,-0.19,0.12,0.22],['2015-12-08',17.3,17.42,17.18,17.62,45.00,0,-0.23,0.13,0.24],['2015-12-09',17.33,17.39,17.32,17.59,44.00,0,-0.29,0.13,0.28],['2015-12-10',17.39,17.26,17.21,17.65,44.00,0,-0.37,0.13,0.32],['2015-12-11',17.23,16.92,16.66,17.26,114.00,1,-0.44,0.15,0.37],['2015-12-14',16.75,17.06,16.5,17.09,94.00,0,-0.44,0.21,0.44],['2015-12-15',17.03,17.03,16.9,17.06,46.00,0,-0.44,0.28,0.50],['2015-12-16',17.08,16.96,16.87,17.09,30.00,0,-0.40,0.36,0.56],['2015-12-17',17.0,17.1,16.95,17.12,50.00,0,-0.30,0.47,0.62],['2015-12-18',17.09,17.52,17.04,18.06,156.00,0,-0.14,0.59,0.66],['2015-12-21',17.43,18.23,17.35,18.45,152.00,1,0.02,0.69,0.68],['2015-12-22',18.14,18.27,18.06,18.32,94.00,0,0.08,0.72,0.68],['2015-12-23',18.28,18.19,18.17,18.71,108.00,0,0.13,0.73,0.67],['2015-12-24',18.18,18.14,18.01,18.31,37.00,0,0.19,0.74,0.65],['2015-12-25',18.22,18.33,18.2,18.36,48.00,0,0.26,0.75,0.62],['2015-12-28',18.35,17.84,17.8,18.39,48.00,0,0.27,0.72,0.59],['2015-12-29',17.83,17.94,17.71,17.97,36.00,0,0.36,0.73,0.55],['2015-12-30',17.9,18.26,17.55,18.3,71.00,1,0.43,0.71,0.50],['2015-12-31',18.12,17.99,17.91,18.33,72.00,0,0.40,0.63,0.43],['2016-01-04',17.91,17.28,17.16,17.95,37.00,1,0.34,0.55,0.38],['2016-01-05',17.17,17.23,17.0,17.55,51.00,0,0.37,0.51,0.33],['2016-01-06',17.2,17.31,17.06,17.33,31.00,0,0.37,0.46,0.28],['2016-01-07',17.15,16.67,16.51,17.15,19.00,0,0.30,0.37,0.22],['2016-01-08',16.8,16.81,16.61,17.06,60.00,0,0.29,0.32,0.18],['2016-01-11',16.68,16.04,16.0,16.68,65.00,0,0.20,0.24,0.14],['2016-01-12',16.03,15.98,15.88,16.25,46.00,0,0.20,0.21,0.11],['2016-01-13',16.21,15.87,15.78,16.21,57.00,0,0.20,0.18,0.08],['2016-01-14',15.55,15.89,15.52,15.96,42.00,0,0.20,0.16,0.05],['2016-01-15',15.87,15.48,15.45,15.92,34.00,1,0.17,0.11,0.02],['2016-01-18',15.39,15.42,15.36,15.7,26.00,0,0.21,0.10,-0.00],['2016-01-19',15.58,15.71,15.35,15.77,38.00,0,0.25,0.09,-0.03],['2016-01-20',15.56,15.52,15.24,15.68,38.00,0,0.23,0.05,-0.07],['2016-01-21',15.41,15.3,15.28,15.68,35.00,0,0.21,0.00,-0.10],['2016-01-22',15.48,15.28,15.13,15.49,30.00,0,0.21,-0.02,-0.13],['2016-01-25',15.29,15.48,15.2,15.49,21.00,0,0.20,-0.06,-0.16],['2016-01-26',15.33,14.86,14.78,15.39,30.00,0,0.12,-0.13,-0.19],['2016-01-27',14.96,15.0,14.84,15.22,51.00,0,0.13,-0.14,-0.20],['2016-01-28',14.96,14.72,14.62,15.06,25.00,0,0.10,-0.17,-0.22],['2016-01-29',14.75,14.99,14.62,15.08,36.00,0,0.13,-0.17,-0.24],['2016-02-01',14.98,14.72,14.48,15.18,27.00,0,0.10,-0.21,-0.26],['2016-02-02',14.65,14.85,14.65,14.95,18.00,0,0.11,-0.21,-0.27],['2016-02-03',14.72,14.67,14.55,14.8,23.00,0,0.10,-0.24,-0.29],['2016-02-04',14.79,14.88,14.69,14.93,22.00,0,0.13,-0.24,-0.30],['2016-02-05',14.9,14.86,14.78,14.93,16.00,0,0.12,-0.26,-0.32],['2016-02-15',14.5,14.66,14.47,14.82,19.00,0,0.11,-0.28,-0.34],['2016-02-16',14.77,14.94,14.72,15.05,26.00,0,0.14,-0.28,-0.35],['2016-02-17',14.95,15.03,14.88,15.07,38.00,0,0.12,-0.31,-0.37],['2016-02-18',14.95,14.9,14.87,15.06,28.00,0,0.07,-0.35,-0.39],['2016-02-19',14.9,14.75,14.68,14.94,22.00,0,0.03,-0.38,-0.40]]);
            var data = splitData(klineData);
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
                    }
                    /*
                    * ,
                     markLine: {
                     label: {
                     normal: {
                     position: 'middle',
                     textStyle:{color:'Blue',fontSize: 15}
                     }
                     },
                     data: fenduans(),
                     symbol: ['circle', 'none']

                     }*/
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

        });

    }
})