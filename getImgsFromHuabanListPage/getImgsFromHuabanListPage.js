javascript:(function(){
list={};
var numDiv=document.createElement("p");
numDiv.style.position="fixed";
    numDiv.style.left="15px";
    numDiv.style.bottom="10px";
numDiv.style.zIndex="999999999";
numDiv.style.padding="1em";
numDiv.style.background="rgba(102, 102, 102,0.8)";
numDiv.style.textAlign='center';
numDiv.style.color= '#fff';

numDiv.innerText='已经获取 '+Object.getOwnPropertyNames(list).length+" 张图片,按esc提取";

document.getElementsByTagName("html")[0].appendChild(numDiv);
           function addToList(){
box=document.querySelector("#waterfall");
obj=document.getElementsByClassName("qudit");
for(i=0;i<obj.length;i++){
list[obj[i].getAttribute("data-id")]=obj[i].querySelector("a.layer-view>img").src;
}
numDiv.innerText='已经获取 '+Object.getOwnPropertyNames(list).length+" 张图片,按esc提取";
console.log(numDiv.innerText);
            }

    // 选择将观察突变的节点
    var targetNode = document.getElementsByTagName('body')[0];
 
    // 观察者的选项(要观察哪些突变)
    var config = { attributes: true, childList: true, subtree: true };
 
    // 创建一个链接到回调函数的观察者实例
    var observer = new MutationObserver(addToList);
 
    // 开始观察已配置突变的目标节点
    observer.observe(targetNode, config);
 
    // 停止观察
    //observer.disconnect();
    
 	function makeImgPage(imgList) {
 		var result = "";
 		for (var i in imgList) {
 			result += '<img src=' + imgList[i].replace(/_fw\d*\/format\/.*/g,'') + '><br>'
 		}
 		return result
 	}

		document.onkeydown = function(event) {
			var e = event || window.e;
			var keyCode = e.keyCode || e.which;
			switch (keyCode) {
			case 27:
				observer.disconnect();
                var result=makeImgPage(list);
                document.write(result);
				break
			}
        }
            
})()

            
