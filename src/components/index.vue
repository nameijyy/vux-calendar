<template>
  <div id="hyj_index">


    <scroller lock-x scrollbar-y  use-pullup :pullup-status.sync="pullupStatus" @pullup:loading="load3">
      <!--content slot-->
      <div class="box">

        <div class="con_list" v-for="(k,v) in list">
          <div class="hj_img"><a href="{{v.condition_go_url}}"><img :src="v.condition_img" /></a></div>
          <div class="center">
            <i class="iconfont icon-pinglun"></i>
            <span>{{v.condition_name}} &bull; {{v.condition_name_des}}</span>
          </div>
          <div class="data_list" v-for="(hk,hv) in v.house_list" onclick="location.href='{{hv.go_url}}'">
            <img class="bg_img" :src="hv.img" />
            <div class="price_show">
              <div>---</div>
              <div class="des">{{hv.price_des}}</div>
              <div class="price">{{hv.price}}</div>
            </div>
            <div class="list_bottom">
              <span>{{hv.tag}}</span>
              {{hv.name}}
            </div>
          </div>
          <!--<div class="load_icon" v-show="pullupStatus === 'default'">-->
            <!--<i class="iconfont icon-yunduan"></i>-->
          <!--</div>-->
        </div>
      </div>
      <!--pullup slot-->
      <!--<div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">-->
        <!--<span v-show="pullupStatus === 'default'"></span>-->
        <!--<span class="pullup-arrow" v-show="pullupStatus === 'down' || pullupStatus === 'up'" :class="{'rotate': pullupStatus === 'up'}">↑</span>-->
        <!--<span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>-->
      <!--</div>-->
      <!--pullup slot-->
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 120px; bottom: -40px; text-align: center;">
        <div class="load_icon" style="position:relative">
          <i class="iconfont icon-yunduan"></i>
          <div class="icon-yunduan-radius" :class="{'active':pullupStatus === 'down' ||  pullupStatus === 'loading','rotate':pullupStatus === 'loading'}" ></div>
          <!--:class="{'active':pullupStatus === 'down'}"-->
          <div transition="fadein" v-show="pullupStatus === 'down' || pullupStatus === 'loading'" style="line-height:1.5" >
            云山书院月溪鸣月明松下房栊静。<br />
            日出云中竹涧清禅印花雨水似镜。
          </div>
        </div>

        <span v-show="pullupStatus === 'loading'">
          <div style="height:100px"></div>
        </span>
      </div>
    </scroller>
  </div>
</template>

<script>
  import { Scroller, Divider, Spinner } from "vux/src/components"
  export default {
    components: {

      Scroller,
      Divider,
      Spinner
    },
    data(){
      return{
        loading_show:false,
        loading_text:"",
        list:[],
        pullupStatus: 'default',
        n3: 10,
      }
    },
    ready(){

    },
    methods:{
      load3 (uuid) {
        var that = this;

        setTimeout(function(){
          var data =
          {
            condition_img:"/Public/home/static/images/con_3.jpg",
            condition_go_url:"http://hyj.home.com:8080/#!/discover",
            condition_name:"从化",
            condition_name_des:"凤凰山水库",
            loading_info:"/Public/home/static/images/con_4.jpg",
            loading_text:"云山书院月溪鸣月明松下房栊静。<br />日出云中竹涧清禅印花雨水似镜。",
            house_list:[
              {
                img:"/Public/home/static/images/con_4.jpg",
                tag:"疏影",
                name:"新中式禅境",
                price:"￥480",
                price_des:"最低每晚",
                go_url:"http://hyj.home.com:8080/#!/discover"
              },
              {
                img:"/Public/home/static/images/con_4.jpg",
                tag:"疏影2",
                name:"新中式禅境2",
                price:"￥490",
                price_des:"最低每晚",
                go_url:"http://hyj.home.com:8080/#!/discover"
              }
            ]
          }
          that.list.push(data);
          setTimeout(function(){
            that.$broadcast('pullup:reset', uuid)
          },10);
        },2000);


      }
    },
    route:{
      data(){

        this.list = [
         {
         condition_img:"/Public/home/static/images/con_3.jpg",
         condition_go_url:"http://hyj.home.com:8080/#!/discover",
         condition_name:"从化",
         condition_name_des:"凤凰山水库",
           loading_info:"/Public/home/static/images/con_4.jpg",
           loading_text:"云山书院月溪鸣月明松下房栊静。<br />日出云中竹涧清禅印花雨水似镜。",
         house_list:[
         {
         img:"/Public/home/static/images/con_4.jpg",
         tag:"疏影",
         name:"新中式禅境",
         price:"￥480",
         price_des:"最低每晚",
         go_url:"http://hyj.home.com:8080/#!/discover"
         },
         {
         img:"/Public/home/static/images/con_4.jpg",
         tag:"疏影2",
         name:"新中式禅境2",
         price:"￥490",
         price_des:"最低每晚",
         go_url:"http://hyj.home.com:8080/#!/discover"
         }
         ]
         }
         ]


        document.title = '花雨间'
//        this.loading_show = true;
//        this.$http[type](baseUrl + '/Home/Doctors/Doctor_list').then(function (response) {
//            if(response.data) {
//              var _array = response.data.list.map(v => {
//                v.show = 0;
//              v.description2 = v.description;
//              var des = v.description;
//              des = des.replace(/<p>/g,'');
//              des = des.replace(/<\/p>/g,'');
//              v.description = des;
//              return v;
//            });
//              this.list = _array;
//            }
//            this.loading_show = false;
//          },function () {
//            // error
//            this.loading_show = true;
//          }
//        )

//        var Random = Mock.Random;
//        function natural(){
//          var Random2 = Mock.Random;
//          return Random2.natural(100,8000)
//        }
//        var data = Mock.mock({
//          'list|1-10': [{
//            'condition_img': Random.image('400x100'),
//            'condition_go_url':'javascript:;',
//            'condition_name':Random.cword(2,6),
//            'condition_name_des':'凤凰山水库',
//            loading_info:"/Public/home/static/images/con_4.jpg",
//            loading_text:"云山书院月溪鸣月明松下房栊静。<br />日出云中竹涧清禅印花雨水似镜。",
//            'house_list|1-5':[ {
//              'img':Random.image('200x100'),
//              'tag':"疏影",
//              'name':Random.cword(2,6),
//              'price':"￥" + natural(),
//              'price_des':"最低每晚",
//              'go_url':"javascript:;"
//            }]
//          }]
//        })
//        end
//        this.list = data.list;
      }
    },
  }
</script>

