//随机背景图片数组,图片可以换成图床链接，注意最后一条后面不要有逗号
var backimg =[
    "url(/img/background/01.jpg)",
    "url(/img/background/02.jpg)",
    "url(/img/background/03.jpg)",
    "url(/img/background/04.jpg)",
    "url(/img/background/10.jpg)",
    "url(/img/background/23.jpg)",
    "url(/img/background/39.jpg)",
    "url(/img/background/42.jpg)",
    "url(/img/background/55.jpg)"
  ];
  //获取背景图片总数，生成随机数
  var bgindex =Math.floor(Math.random() * (backimg.length));
  //重设背景图片
  document.getElementById("web_bg").style.backgroundImage = backimg[bgindex];
  
  //随机banner数组,图片可以换成图床链接，注意最后一条后面不要有逗号
  var bannerimg =[
    "url(/img/banner/Winslow.jpg)",
    "url(/img/banner/Winslow.jpg)",
    "url(/img/banner/Nakoa.jpg)"
  ];
  //获取banner图片总数，生成随机数
  var bannerindex =Math.ceil(Math.random() * (bannerimg.length-1));
  //重设banner图片
  document.getElementById("page-header").style.backgroundImage = bannerimg[bannerindex];
  