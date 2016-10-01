# Photo-wall
原生javascript实现绚丽的照片墙

运动步骤:
  - 闪的效果(瞬间宽高都变为0,scale随机)
  - 图片从小到大,同时透明度从1变到0(必须是上一部走完了,它才会走)
  - 图片旋转,同时透明度从0变到1,有层次感(位移)(当所有图片透明度都变为0的时候,才会走这一步)
  
浏览地址:http://fangxx.org/demo/photo_wall/index.html


