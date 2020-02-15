/**
 * 控制所有需要懒加载的图片
 * 1. 图片加载的是因为在HTML中填写的图片的路径， 将图片的路径保存在自定义属性data-src中
 * 2. 
 */

  /**
   * 实现懒加载
   * @param {string} defaultSrc 默认加载图片路径
   */
  function startLazy (defaultSrc) {
    // 1 获取到页面所有的图片对象，将src地址设置为defaultSrc
    var oImgs = document.querySelectorAll('img[data-src]');
    oImgs = Array.from(oImgs);
    var oImgsLen = oImgs.length;
    // 2 设置默认地址
    setDefaultSrc(defaultSrc)

    // 3 设置必要的图片路径
    loadAllImgs()

    // 4 注册滚动条事件
    var timer = null;
    window.addEventListener('scroll', function () {
      if (timer) {
         clearTimeout(timer);
      }
      timer = setTimeout(function () {
        // 500ms 后进行加载 避免滚动条事件触发频繁
        loadAllImgs();
      }, 500)
    }, false)

  // 函数区

    /**
     * 设置默认地址
     */
    function setDefaultSrc (defaultSrc) {
      if (!defaultSrc) {
        return ;
      }
      for (var i = 0; i < oImgsLen; i++) {
        oImgs[i].src = defaultSrc;
      }
    }

    /**
     * 加载所有图片的正确地址
     */
    function loadAllImgs () {
      for (var i = 0; i < oImgs.length; i++) {
        // 判断是否加载过 如果加载过 在图片数组对象中删除
        if (loadImg(oImgs[i])) {
          oImgs.splice(i, 1);
          i --;
        }
      }
    }

    /**
     * 加载单张图片的正确地址
     * @param {object} oImg : 图片对象
     * 返回值 代表当前图片是否加载过了
     */
    function loadImg (oImg) {
      // 获取视口的宽高
      var viewH = document.documentElement.clientHeight;
      var viewW = document.documentElement.clientWidth;
      /**
       * 图片加载的条件：图片在可视范围内;
       * oImg.getBoundingClientRect() 图片在页面的 位置
       */
      var react = oImg.getBoundingClientRect();
      // 符合条件进行加载
      if (react.right > 0  && react.left < viewW && react.bottom > 0 && react.top < viewH) {
          oImg.src = oImg.dataset.src;
           //判断是否有原图
        if(oImg.dataset.original){
          //等待图片加载完成
          oImg.onload = function(){
              oImg.src = oImg.dataset.original;
              oImg.onload = null;
          }
        }
          return true;
      }
      return false
    }
  }