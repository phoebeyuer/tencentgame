
window.onload=function(){
	/*实现关闭悬浮二维码功能*/
	var closebtn = document.getElementById("closeBtn");       
	var qr_code = document.getElementById("qrCode");
	closebtn.onclick=function(){         //关闭悬浮二维码函数
		closebtn.className="hide";
		qr_code.className="hide";
}

     /*实现鼠标飘过滚动图圆点图标产生选中样式功能*/
     var picsContainer = document.getElementById("bannerPics");
     var bannerBtnGroup = document.getElementById("bannerBtnGroup");
     var bannerBtnItem = bannerBtnGroup.getElementsByTagName("div");
     for(var i=0;i<bannerBtnItem.length;i++){
     	bannerBtnItem[i].onmouseover=function(){       //鼠标飘过圆点显示选中样式
     		this.classList.add("banner-btn-hover");
     	} 
     	bannerBtnItem[i].onmouseout=function(){        //鼠标离开圆点恢复默认样式
     		this.classList.remove("banner-btn-hover");
     	}   	
     }

     /*实现焦点轮播图滚动效果所需变量*/
     var bannerPicsGroup = document.getElementById("bannerPicsGroup");
     var picsItem = bannerPicsGroup.getElementsByTagName("a");
     var arcLeft = document.getElementById("arcLeft");
     var arcRight = document.getElementById("arcRight");
/*     for(var i = 0; i<picsItem.length; i++){

     }*/
     var index = 1;
     var picWidth = 720;
     var picsNum = 6;
     var scrolling = false;
   

     /*图片滚动函数*/
     function scrollPic(offset){
         scrolling = true; 
         var scrolltime = 359.5;
         var scrollstep = 10;
         var step = 35.95;
         var newLeftValue = parseInt(bannerPicsGroup.style.left) + offset; 
         if(offset > 0){
             var speed = 40;
         }
         else{
             var speed = -40;
         }
         function go(){       
            if((speed < 0 && parseInt(bannerPicsGroup.style.left) > newLeftValue) || (speed > 0 && parseInt(bannerPicsGroup.style.left) <newLeftValue)){
                bannerPicsGroup.style.left = parseInt(bannerPicsGroup.style.left) + speed +'px';
                setTimeout(go,20);
            }
            else{    
                 scrolling = false;
                 bannerPicsGroup.style.left = newLeftValue;
                if(newLeftValue > (-picWidth+1)){
                    bannerPicsGroup.style.left = -picsNum*picWidth + 'px';
                }
                if(newLeftValue < (-picWidth*picsNum)){
                    bannerPicsGroup.style.left = -picWidth + 'px';
                }
            }

         }
         go();
         // alert("速度："+speed+"偏置"+offset);
     }

     /*按钮激活函数*/
     function showBtn(){
        for(var i = 0; i < bannerBtnItem.length; i++){
             bannerBtnItem[i].classList.remove("banner-btn-active");
         } 
             bannerBtnItem[index-1].classList.add("banner-btn-active");    
     }

     /*实现点击箭头，图片滚动至上一张或下一张*/
     arcLeft.onclick = function(){
        if(scrolling == false){
             // alert("scrolling值为："+scrolling);
              if(index == 1){
                 index = picsNum;
                 scrollPic(picWidth);   
                 showBtn(); 

            }
            else{
                 index -= 1;
                 scrollPic(picWidth);  
                 showBtn();        
            }               
        }
       

     }

     arcRight.onclick = function(){
        if(scrolling == false){
            if(index == picsNum){
                     index = 1;
                     scrollPic(-picWidth);
                     showBtn();
                }
                else{
                     index += 1;
                     scrollPic(-picWidth);
                     showBtn();         
                }            
        }            
        }

     /* 实现点击按钮，跳转至对应图片*/
     for(var i = 0 ; i < bannerBtnItem.length; i++){      
     bannerBtnItem[i].onclick = function(){
         if(scrolling == false){
            var myindex = parseInt(this.getAttribute('index'));
            if(index == myindex){
                return;
            }
            else{
                 if(Math.abs(myindex - index) == 1){
                     scrollPic((index - myindex)*picWidth);
                     index = myindex;
                     showBtn();
                 }
                 if((myindex - index) > 1){
                     if((myindex == 6) && (index == 1)){
                         scrollPic(picWidth);
                         index = myindex;
                         showBtn();
                     }
                     else{
                         bannerPicsGroup.style.left = parseInt(bannerPicsGroup.style.left) - (myindex - index - 1)*picWidth + 'px';
                         scrollPic(-picWidth);
                         index = myindex;
                         showBtn();
                     }  
                 }
                 else if((myindex - index) < -1){
                    if((myindex == 1) && (index == 6)){
                         scrollPic(-picWidth);
                         index = myindex;
                         showBtn();
                    }
                    else{
                         bannerPicsGroup.style.left = parseInt(bannerPicsGroup.style.left) + (index - myindex - 1)*picWidth + 'px';
                         scrollPic(picWidth);
                         index = myindex;
                         showBtn();
                    }

                 }
            }
            }  
        }      
     }

     /*实现定时自动滚动图片（当鼠标未悬浮在图片上时，自动播放，鼠标悬浮在图片上时停止播放）*/
     var timer;
     function autoplay(){
        timer = setInterval(function(){
        arcRight.onclick();
        },5000);
     }
     function autostop(){
        clearInterval(timer);
     }
     picsContainer.onmouseout = autoplay;
     picsContainer.onmouseover = autostop;
     
     autoplay();

     /*实现面板1鼠标飘过游戏板块导航显示对应图片功能*/
    var pannelPics = document.getElementById("pannelPics");
    var pannelImg = pannelPics.getElementsByTagName("div");
    var pannelList = document.getElementById("pannelList");
    var listBackground = pannelList.getElementsByTagName("span");
    var listItem = pannelList.getElementsByTagName("a");
    for(var i=0;i<pannelImg.length;i++){
    	listItem[i].index = i;
    	listItem[i].onmouseover=function(){       //鼠标飘过导航显示对应图片函数
            for(var n=0;n<pannelImg.length;n++){
    			pannelImg[n].className="hide";
                listItem[n].style.color="#999999";
                listBackground[n].style.left="-205px";
                listBackground[n].setAttribute("mouseover","0");

    		}
            this.style.color="white";
    		pannelImg[this.index].className="";
            var myindex = this.index;
            listBackground[myindex].setAttribute("mouseover","1");
            
            /*实现背景逐渐拉长*/
            function listgo(){
                if(parseInt(listBackground[myindex].style.left) < 0){
                    listBackground[myindex].style.left = parseInt(listBackground[myindex].style.left) + 5 + 'px';
                    if(listBackground[myindex].getAttribute("mouseover") != 1){
                        listBackground[myindex].style.left = "-205px";
                        return;
                    }
                    var timertwo = setTimeout(listgo,10);
                }
            }
            listgo();
    	}  
    }

}


