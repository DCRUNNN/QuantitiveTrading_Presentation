/**
 * Created by pc on 2017/6/1.
 */

$(function () {
    "use strict";

    var bar = new Morris.Bar({
        element: 'bar-chart',
        resize: true,
        data: [
            {y: '2006', a: 100},
            {y: '2007', a: 75},
            {y: '2008', a: 50},
            {y: '2009', a: 75},
            {y: '2010', a: 50},
            {y: '2011', a: 75},
            {y: '2012', a: 100}
        ],
        barColors: ['#f56954'],
        xkey: 'y',
        ykeys: ['a'],
        labels: ['CPU'],
        hideHover: 'auto'
    });
});

var vm = new Vue({
    el:'#container',
    data:{
        items:[
        ]
    },
    methods:{
        // viewSingleStock:function () {
        //
        //     var name =document.getElementById("example1").getElementsByTagName("tr")[1].getElementsByTagName("td")[1];
        //
        // },
    },
    mounted(){
        const self=this;
        this.$http.get(url)
            .then(function (response) {
            self.items=response.data;
            setTimeout(function () {
                $('#example1').DataTable();
            },0);
        }).catch(function (error) {
            alert("出现了未知的错误！")
        })
    }
});