window.onload=function(){
	var imgWrap=document.getElementById("imgWrap");
	var imgs=document.querySelectorAll("img");
	var btn=document.querySelector(".btn");
	var endNum=0;
	var on=true;  //这个变量用来表示用户是否能够再次点击(true可以点,false不可以点)
	
	btn.onclick=function(){
		//避免用户连续点击
		if(!on){
			return;//阻止函数继续运行
		}
		on=false;
		
		var endNum=0;	//存运动完成的图片数量
		var endNum2=0;	//同上 避免用户连续点击
		for(var i=0;i<imgs.length;i++){  //for循环是同步(瞬间)的 要想不同步就要用setTimeout
			(function(i){//形参
				setTimeout(function(){
					motion(imgs[i],'10ms',function(){
						//一上来变小
						this.style.transform='scale(0)';
					},function(){
						//变小之后再变大 闪的效果(第二步)
						motion(this,'1s',function(){
							this.style.transform='scale(1)';
							this.style.opacity=0;
						},function(){
							//变大并旋转
							endNum++;//只要有一张图片走完了就给它加1
							//全部图片都变大变透明之后(也就是上一步)才执行下一步
							if(endNum==imgs.length){
								toBig();
							}
						});
					});
				},Math.random()*1000);
			})(i);//实参 循环的i
		}
		//函数表达式后面加括号可以执行 将函数声明转为表达式执行:(function(){})()
		
		function toBig(){
			for(var i=0;i<imgs.length;i++){
				imgs[i].style.transition='';
				//imgs[i].style.opacity=1; 测试用
				//让物体在css3中有一些变化,必须设置初始值
				//下一步translateZ为负值表示向内聚 随机可以设置层次感
				imgs[i].style.transform='rotateY(0deg) translateZ(-'+Math.random()*500+'px)';
				
				(function(i){
					setTimeout(function(){
						motion(imgs[i],'2s',function(){
							this.style.opacity=1;
							this.style.transform='rotateY(-360deg) translateZ(0)';//恢复到图片原来的位置
						},function(){
							//避免用户连续点击
							endNum2++;
							if(endNum2==imgs.length){
								//所有图片都运动完了才能让用户再次点击	
								on=true;
							}
						});
					},Math.random()*1000);
				})(i);
			}
		}
	};
	
	//运动函数
	//参数:运动的对象(谁)，运动的时间，运动的属性函数，运动后执行的回调函数
	function motion(obj,time,fn,callBack){
		obj.style.transition=time;
		fn.call(obj);//call改变this指向(指向obj)也就是fn函数的调用者 也使得上面调用的时候可以用this
		var called=false;	//避免transitionend多次执行(解决transitionend调用多次的bug)
		//transitionend为系统自带事件
		obj.addEventListener('transitionend',function(){
			if(!called){
				callBack&&callBack.call(obj);
				called=true;
			}
		},false);//false为默认值 表示事件句柄在冒泡阶段执行
	}
};