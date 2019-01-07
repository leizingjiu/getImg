javascript: /*获取图片书签by leizingyiu；*/
(function() {
	var mySrc = '';
	var mySrcList = [];
	var imgSrcList = [];
	var bgUrlList = [];
	imgSrcList = imgLinkArray(document);
	bgUrlList = bgImgLinkArray(document);
	mySrcList = mySrcList.concat(imgSrcList, bgUrlList);
	var myFrame = document.getElementsByTagName("iframe");
	var frameDoc;
	for (j = 0; j < myFrame.length; j++) {
		if (myFrame[j].scrollWidth != 0 || myFrame[j].scrollHeight != 0) {
			try {
				frameDoc = myFrame[j].contentWindow.document;
				imgSrcList = imgLinkArray(frameDoc);
				bgUrlList = bgImgLinkArray(frameDoc);
				mySrcList = mySrcList.concat(imgSrcList, bgUrlList);
			} catch (err) {}
		}
	}
	mySrc = makeImgPage(mySrcList);
	var myStyle = "<style>img{max-width:100vw;}</style>";
	if (mySrc != '') {
		document.write(myStyle + '<center>' + mySrc + '</center>');
		void(document.close())
	} else {
		alert('No images!')
	}
	void 0;

	function imgLinkArray(obj) {
		var result = [];
		var reg = /(\S+)(jpg|png|jpeg|gif)(.+)/gi;
		var regData = /^data.*/g;
		for (var i = 0; i < obj.images.length; i++) {
			if (obj.images[i].hasAttribute("src")) {
				result[result.length] = obj.images[i].src
			} else if (obj.images[i].hasAttribute("lazy-scr-load")) {
				result[result.length] = obj.images[i].attributes["lazy-src-load"].value
			} else {
				result[result.length] = obj.images[i].attributes[0].value
			}
			if (regData.test(result[result.length - 1]) != true) {
				result[result.length - 1] = result[result.length - 1].replace(reg, "$1$2")
			}
			console.log(result[result.length - 1])
		}
		return result
	}
	function makeImgPage(imgArray) {
		var result = "";
		for (var i = 0; i < imgArray.length; i++) {
			result += '<img src=' + imgArray[i] + '><br>'
		}
		return result
	}
	function getAllChildren(obj) {
		var result = [];
		for (var i = 0; i < obj.childElementCount; i++) {
			result = result.concat(obj.children[i]);
			if (obj.children[i].childElementCount !== 0) {
				result = result.concat(getAllChildren(obj.children[i]))
			}
		}
		return result
	}
	function bgImgLinkArray(obj) {
		var result = [];
		var all = getAllChildren(obj);
		var bg;
		var reg = /(url\(")(.*)("\))/g;
		var reg2 = /(\S+)(jpg|png|jpeg|gif)(.+)/gi;
		for (var j = 0; j < all.length; j++) {
			bg = all[j].style.backgroundImage;
			if (bg != "" || bg != undefined) {
				result[result.length] = String(bg).replace(reg, "$2");
				result[result.length - 1] = result[result.length - 1].replace(reg2, "$1$2")
			}
		}
		return result
	}
})() /*来关注我微博 @leizingyiu 呀，虽然不怎么更新😀*/