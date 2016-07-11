<template>
  <div id="discover">
    <div class="con_list" v-for="(k,v) in list">
      <!--<div>-->
        <!--<img src="./../assets/images/con_1.jpg" />-->
        <!--<img src="./../assets/images/con_2.jpg" />-->
      <!--</div>-->
      <div class="con_text">
        <p class="title">{{v.title}}</p>
        <p>{{v.summary}}</p>
        <div class="con_info">
          <span>{{v.author}}</span>|<span class="date">{{v.add_date}}</span> <span>{{v.zan_count}}</span> <span>{{v.comment_count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import inlineCalendar from './inline-calendar/index.vue'


  export default {
    components: {
      inlineCalendar,
    },
    data(){
      return{
        list:[]
      }
    },
    ready(){

    },
    methods:{

    },
    route:{
      data(){

        this.list = [
          {cover_img:"",head_img:"",title:"闭坐书院听花开",
            summary:"零六，夏未央，上白云山，宿花雨间。<br />逢云山夜雨淅淅沥，夜起推窗愠愠无所试，遂闭坐书院，万籁听花开。",
            author:"陆轩",add_date:"06-28",zan_count:"1136",comment_count:"39"
          },
          {cover_img:"",head_img:"",title:"闭坐书院听花开",
            summary:"零六，夏未央，上白云山，宿花雨间。<br />逢云山夜雨淅淅沥，夜起推窗愠愠无所试，遂闭坐书院，万籁听花开。",
            author:"陆轩",add_date:"06-28",zan_count:"1136",comment_count:"39"
          },
          {cover_img:"",head_img:"",title:"闭坐书院听花开",
            summary:"零六，夏未央，上白云山，宿花雨间。<br />逢云山夜雨淅淅沥，夜起推窗愠愠无所试，遂闭坐书院，万籁听花开。",
            author:"陆轩",add_date:"06-28",zan_count:"1136",comment_count:"39"
          }
        ]

      }
    },
  }
</script>

