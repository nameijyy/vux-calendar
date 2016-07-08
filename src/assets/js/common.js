/**
 * Created by nick on 2016/6/1.
 */
//全局js
var Y ={};
Y.init =function () {
  console.log('全局初始化')
  if (/Android/gi.test(navigator.userAgent)) {
    window.addEventListener('resize', function () {
      if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
        window.setTimeout(function () {
          document.activeElement.scrollIntoViewIfNeeded();
        }, 0);
      }
    })
  }

}
Y.gotoView =function (url, openView,Vue) {

  if(openView){
    try {
      appGotoView(window.location.origin +'/#!'+url)
    }catch (error){
      console.log(error,window.location.origin +'/#!'+url)
      Vue.$router.go(url)
    }
  }
}



Y.open = function (type,o) {
  var _o ={
    title:'提示',
    content:'',
    sucess:function () {}
  }
  var o = o||_o;
  o.content =o.content?o.content:'';
  var html = '' +
    '<div class="weui_mask"></div>'+
    '<div class="weui_dialog">'+
    '<div class="weui_dialog_hd"><strong class="weui_dialog_title">'+o.title+'</strong></div>'+
    '<div class="weui_dialog_bd">'+o.content+'</div>'+
    '<div class="weui_dialog_ft">';
  if(type == 'confirm'){
    html+= '<a href="javascript:;" class="weui_btn_dialog default weui_btn_dialog_no">取消</a>'+ '<a href="javascript:;" class="weui_btn_dialog weui_btn_dialog_ok primary">确定</a>';
  }else{
    html+= '<a href="javascript:;" class="weui_btn_dialog weui_btn_dialog_ok primary">确定</a>';
  }
  html +='</div>'+
    '</div>';

  var div = document.createElement('DIV');
  if(type =='confirm'){
    div.className = 'weui_dialog_confirm weui_dialog_'
  }else{
    div.className = 'weui_dialog_alert weui_dialog_'
  }
  div.innerHTML = html;
  document.body.appendChild(div);

  if(type == 'confirm'){
    var noBtn =  div.querySelector('.weui_btn_dialog_no');
    noBtn.onclick = function () {
      document.body.removeChild(div);
      console.log('no关闭')
    };
  }
  var okBtn =  div.querySelector('.weui_btn_dialog_ok');
  okBtn.onclick = o.yes ||function () {
    document.body.removeChild(div);
    console.log('ok关闭')
  };
  setTimeout(function () {
    _o.sucess();
  },0)
};
Y.close = function () {
  document.body.removeChild('.weui_dialog_');
}
Y.alert = function (content,cb) {
  var _o ={
    title:'提示',
    content:content,
    yes:cb,
    sucess:function () {}
  }
   return new $Y.open('alert',_o)
}

Y.confirm = function (o) {
   return new $Y.open('confirm',o)
}



Y.hidden_copyright =function () {
  let copyRitht = document.querySelector('#copy_right')
  copyRitht.className ='ui-hidden'
}

Y.show_copyright =function () {
  let copyRitht = document.querySelector('#copy_right')
  copyRitht.className =''
}


if (typeof module !== 'undefined' && module.exports) {
  module.exports = Y;
} else {
  window.$Y = Y;
}




