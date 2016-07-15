<template>
  <div id="discover">
    <div class="con_list" v-for="(k,v) in list">
      <div class="con_img">
        <img class="bg_img" :src="v.cover_img" onerror="this.src='';this.onerror=null" />
        <img class="head_img" :src="v.head_img" onerror="this.src='';this.onerror=null" />
      </div>
      <div class="con_text">
        <p class="title">{{v.title}}</p>
        <p>{{{v.summary}}}</p>
        <div class="con_info">
          <span>{{v.author}}</span>|<span class="date">{{v.add_date}}</span>
          <span class="icon_zan"><img src="../assets/images/icon_1.png" />{{v.zan_count}}</span>
          <span class="icon_comment"><img src="../assets/images/icon_2.png" />{{v.comment_count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {

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
          {cover_img:"/Public/home/static/images/con_1.jpg",head_img:"/Public/home/static/images/con_2.jpg",title:"闭坐书院听花开1",
            summary:"零六，夏未央，上白云山，宿花雨间。<br />逢云山夜雨淅淅沥，夜起推窗愠愠无所试，遂闭坐书院，万籁听花开。",
            author:"陆轩",add_date:"06-28",zan_count:"1136",comment_count:"39"
          },
          {cover_img:"/Public/home/static/images/con_1.jpg",head_img:"/Public/home/static/images/con_2.jpg",title:"闭坐书院听花开2",
            summary:"零六，夏未央，上白云山，宿花雨间。<br />逢云山夜雨淅淅沥，夜起推窗愠愠无所试，遂闭坐书院，万籁听花开。",
            author:"陆轩",add_date:"06-28",zan_count:"1136",comment_count:"39"
          },
          {cover_img:"/Public/home/static/images/con_1.jpg",head_img:"/Public/home/static/images/con_2.jpg",title:"闭坐书院听花开3",
            summary:"零六，夏未央，上白云山，宿花雨间。<br />逢云山夜雨淅淅沥，夜起推窗愠愠无所试，遂闭坐书院，万籁听花开。",
            author:"陆轩",add_date:"06-28",zan_count:"1136",comment_count:"39"
          }
        ]

      }
    },
  }
</script>

