/**
 * Created by cyz on 2017/6/12.
 */
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

        ]

    },
    methods:{
       add:function (code,name,sector) {
               this.chosens.push({
                   "code":code,
                   "name":name,
                   "sector":sector
               });

           for(var i=0;i<this.items.length;i+=1){
                   if(this.items[i].code == code&&this.items[i].name == name&&this.items[i].sector == sector){
                       this.items.splice(i,1);
                   }
           }
       },
        delete:function (code,name,sector) {
            for(var i=0;i<this.chosens.length;i+=1){
                if(this.chosens[i].code == code&&this.chosens[i].name == name&&this.chosens[i].sector == sector){
                    this.chosens.splice(i,1);
                }
            }
            this.items.push({
                "code":code,
                "name":name,
                "sector":sector
            });
        },
        addAll:function () {

            this.chosens=this.chosens+this.items;
        },
        deleteAll:function () {
            this.chosens=[];
        }
    },
    mounted(){
       this.$http.get("http://localhost:8080/stockWithSector/"+"2016-03-02").then(function (response) {
           this.items = response.data.data;
           setTimeout(function () {
               $('#table1').DataTable();
           },0);
           setTimeout(function () {
               $('#table2').DataTable();
           },0);
       }).catch(function (error) {
           alert("发生了未知的错误！");
       })

    }
});