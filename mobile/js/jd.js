// JavaScript Documen
$(function(){
	/*1、顶部搜索
	2、轮播图效果
	3、倒计时*/	
	search();
	banner();
	downTime();
	
})
window.onload = function(){
	var myscroll = new IScroll("#wrapper");
}
var search = function(){
	/*轮播图的高度*/
	var height = $('.jd_banner').height();
	/*窗口滚动条滚动的距离*/	
	window.onscroll = function(){
		var scrollTop = document.documentElement.scrollTop;
		/*随着页面滚动，search的透明度增加；当超过轮播图的高度时停止增加*/
		if(scrollTop && 0< scrollTop < height){
			$('.jd_banner').css('opacity','0.85*(scrollTop/height)');	
		}else {
			$('.jd_banner').css('opacity','0.85');		
		}
	}
};
var banner = function(){
	/*功能分析
	1、图片自动切换且无缝（定时器+位移+过度效果）
	2、随着图片滑动，点也随之变化（增减类）
	3、鼠标滑动切换图片（touch事件和滑动手势）
	4、当鼠标滑动的距离<1/3时，图片吸附回去，否则图片切换
	*/
	/*优化：几个重复使用功能的封装*/
	/*加过度*/
	var addTtansition = function(){
		imgBox.style.transition = 'all,0.2s';
		imgBox.style.webkitTransition = 'all,0.2s';	
	};
	/*请过度*/
	var removeTransition = function(){
		imgBox.style.transition = 'none';
		imgBox.style.webkitTransition = 'none';	
	};
	/*做定位*/
	var setPosition = function(distanceX){
		imgBox.style.transform = 'translateX('+ distanceX+'px)';
		imgBox.style.webkitTransform = 'translateX('+ distanceX+'px)';	
	};
	var imgBox = document.querySelector('.jd_banner ul:first-child');
	var imgWidth = imgBox.querySelector('li').offsetWidth;
	var points = document.querySelectorAll('.jd_banner ul:last-child li');
	/*定时器*/
	var index = 1;
	var timer = setInterval(function(){
		index++;
		/*过度效果*/
		addTtansition();
		/*做位移*/
		var distanceX  = -index*imgWidth;
		setPosition(distanceX);
	},2000);
	/*动画完成后判断图片当前的索引值*/
	imgBox.addEventListener('transitionend',function(){
		if(index >= 9){
			index = 1;
			/*瞬间定位到第一张*/
			var distanceX  = -index*imgWidth;
			setPosition(distanceX);
			/*清过度*/	
			removeTransition();
		}else {
			/*向右滑动时也需要瞬间定位*/
			if(index <= 0){
				index = 8;
				/*瞬间定位最后一张*/
				var distanceX  = -index*imgWidth;
				setPosition(index);
				/*清过度*/	
				removeTransition();
			}	
		};
		setPoint();
	});
	/*根据索引，改变点的状态*/
	var setPoint = function setPoint(){
		for(var i = 0;i < points.length; i++){
			points[i].classList.remove('now');
		}	
		points[index-1].classList.add('now');
	}
	
	/*鼠标滑动*/
	var startX = 0;
    var distanceX =0;
	imgBox.addEventListener('touchstart',function(e){
		clearInterval(timer);
		startX = e.touches[0].clientX;
			
	});
	imgBox.addEventListener('touchmove',function(e){
		var moveX = e.touches[0].clientX;
		distanceX = moveX - startX;	
		translateX = -index*imgWidth + distanceX;
		setPosition(translateX);
	});
	
	/*待滑动结束时判断滑动距离从而做不同动作*/
	imgBox.addEventListener('touchend',function(e){
		/*若滑动的距离小于1/3的图片距离，则吸附回去（带过度）*/
		/*过度效果*/
		addTtansition();
		if(Math.abs(distanceX)< imgWidth/3){
			/*做位移*/
			setPosition(-index*imgWidth);
		}else if(distanceX>0){
			index--;
		}else {
			index++;	
		}
		setPosition(-index*imgWidth);
		/*滑动结束后重新添加计时器*/
		timer = setInterval(function(){
		index++;
		/*过度效果*/
		addTtansition();
		/*做位移*/
		setPosition(-index*imgWidth);
	},2000);
	});
};

var downTime = function(){
	/*拿span*/
	var spans = document.querySelectorAll('.time span');
	console.log(spans);	
	var time = 3*60*60;
	var timer = setInterval(function(){
		time--;
		var getH = Math.floor(time/3600) ;
		console.log(getH)
		var getM = Math.floor(time%3600/60);
		console.log(getM)
		var getS =time%3600%60;
		console.log(getS)
		spans[0].innerHTML= Math.floor(getH/10);
		spans[1].innerHTML=getH%10;
		spans[3].innerHTML=Math.floor(getM/10);
		spans[4].innerHTML=getM%10;
		spans[6].innerHTML=Math.floor(getS/10);
		spans[7].innerHTML=getS%10;	
	},1000);
};
