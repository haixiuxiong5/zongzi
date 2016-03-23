//////////
// 原生js //
//////////
window.onload = function() {
    waterfall('main', 'box');
    var dataInt = { "data": [{ "src": "2 栀子花开.jpg" }, { "src": "canzhan.png" }, { "src": "ab.jpg" }, { "src": "3.jpg" }] };
    window.onscroll = function() {
        if (checkScrollSlide) {
        	var oParent=document.getElementById('main');
            // 将数据块渲染到当前页面的尾部
            for (var i = 0; i < dataInt.data.length; i++){
            	var oBox=document.createElement('div');
            	oBox.className='box';
            	oParent.appendChild(oBox);
            	var oPic=document.createElement('div');
            	oPic.className='pic';
            	oBox.appendChild(oPic);
            	var oImg=document.createElement('img');
            	oImg.src='images/'+dataInt.data[i].src;
            	oPic.appendChild(oImg);
            }
            waterfall('main', 'box');
        }
    }
}

function waterfall(parent, box) {
    // 将main下的所有的class为box的元素取出来
    var oParent = document.getElementById(parent);
    var oBoxs = getByClass(oParent, box);
    // 计算整个页面显示的列数
    var oBoxW = oBoxs[0].offsetWidth;
    var clos = Math.floor(document.body.clientWidth / oBoxW);
    console.log(clos);
    // 设置main的宽度
    oParent.style.cssText = 'width:' + oBoxW * clos + 'px;margin:0 auto';
    var hArr = [];
    for (var i = 0; i < oBoxs.length; i++) {
        if (i < clos) {
            hArr.push(oBoxs[i].offsetHeight);
        } else {
            var minH = Math.min.apply(null, hArr);
            // console.log(minH);
            var index = getMinHIndex(hArr, minH);
            oBoxs[i].style.position = 'absolute';
            oBoxs[i].style.top = minH + 'px';
            oBoxs[i].style.left = oBoxW * index + 'px';
            // oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
            hArr[index] += oBoxs[i].offsetHeight;
        }
    }
}

// 根据class获取元素
function getByClass(parent, clsName) {
    var boxArr = [],
        /*用来存储获取到所有class为box的元素*/
        oElements = parent.getElementsByTagName('*');
    for (var i = 0; i < oElements.length; i++) {
        if (oElements[i].className == clsName) {
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}


function getMinHIndex(arr, val) {
    for (var i in arr) {
        if (arr[i] == val) {
            return i;
        }
    }
}


// 检测是否具备了滚动条加载数据库的条件
function checkScrollSlide() {
    var oParent = document.getElementById('main');
    var oBoxs = getByClass(oParent, 'box');
    var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight / 2);
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    // console.log(height);
    return (lastBoxH < scrollTop + height) ? true : false;

}


// jQuery
/*$(window).on('load', function() {
    waterfall();
    var dataInt = { "data": [{ "src": "2 栀子花开.jpg" }, { "src": "canzhan.png" }, { "src": "ab.jpg" }, { "src": "3.jpg" }] };
    $(window).on('scroll', function() {
    	if (checkScrollSlide) {
    		$.each(dataInt.data,function(key,value){
    			var oBox=$('<div>').addClass('box').appendTo($('#main'));
    			var oPic=$('<div>').addClass('pic').appendTo($(oBox));
    			var oImg=$('<img>').attr('src','images/'+$(value).attr('src')).appendTo(oPic);
    		});
    		waterfall();
    	}
    });
});

function waterfall() {
    var $boxs = $('#main>div');
    var w = $boxs.eq(0).outerWidth();
    var cols = Math.floor($(window).width() / w);
    $('#main').width(w * cols).css('margin', '0 auto');
    var hArr = [];
    $boxs.each(function(index, value) {
        var h = $boxs.eq(index).outerHeight();
        if (index < cols) {
            hArr[index] = h;
        } else {
            var minH = Math.min.apply(null, hArr);
            var minIndex = $.inArray(minH, hArr);
            $(value).css({ 'position': 'absolute', 'top': minH + 'px', 'left': minIndex * w + 'px' });
            hArr[minIndex] += $boxs.eq(index).outerHeight();
        }
    });
}

function checkScrollSlide() {
    var $lastBox = $('#main>div').last();
    var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight() / 2);
    var scrollTop = $(window).scrollTop();
    var documentH = $(window).height();
    return (lastBoxDis < scrollTop + documentH) ? true : false;
}*/
