/**
 * Created by zhangxin1.dz on 2017/3/27.
 */
var loca=location.href;
function exelunbo(){
	/*点击轮播组件加载相应的属性设置页面*/
	var lunboData=new FormData();
	var imgArrs=[];
	var l=imgArrs.length;
	/*判断选中图片后下次再选时，是否保存过*/
	var flag=1;
	/*保险措施，仅仅根据所见页面中的组件保存当前实例的id*/
	var lunboHtml=`<h3 class="nature-choice">多图轮播</h3>
			<div class="tupian-exchange">
	        <label>模块标题：<input type="text" id="componentTitle" class="missValue"/><span class="mustValue">*</span></label>
	        <!--第一部分-->
	        <div class="lunbo-1 kejian">
                <div style="position: relative;height: 80px;margin-bottom: 15px;">
                    <div class="nature-add">
                        <img src="/qrtrace/selfDefine/data/new/tj2.png" alt=""/>
                        <form enctype="multipart/form-data" name="fileinfo" id="fileinfo"><label>图片：<input type="file" multiple size="6" id="lunbo-image" name="file"/><input type="hidden" name="folderName" id="folderName" data-com="1"></label></form>
                    </div>
                    <div class="nature-add-noty">添加图片（格式JPEG、PNG、GIF，不超过500k，建议比例16：9）</div>
                </div>
	            <div class="lunbo-imgsss">
                    <ul class="lunbo-img missText" id="lunbo-1-title">
                        <!--<li>图片1&nbsp;<img src="/qrtrace/selfDefine/data/moren.png" alt=""/>&nbsp;<label><input type="radio"/>添加链接</label>&nbsp;<input type="text" class="super-link"/>&nbsp;<span class="cancel lunbo-span"></span></li>-->
                    </ul>
	            </div>
	            <div class="lunboScroll-bar"><div class="lunboScroll-barer"></divclass></div>
	            </div>
	        </div>
	        <div class="tupian-level5" style="display: none !important;"><label class="tupian-level5-1"><input type="radio" class="tupian-level5-2" checked name="ppComponent">公有组件</label><label class="tupian-level5-3"><input type="radio" class="tupian-level5-4" name="ppComponent">私有组件</label><i class="tupian-level6" data-dir="1"></i></div>
			<ul class="tupian-level7 clearFloats">
				<li class="floats tupian-level8">
					<div class="tupian-level8-s">
						<div class="tupian-level8-0" data-dir="1">请选择产品<span class="tupian-level8-0-1"></span></div>
						<div class="tupian-level8-4"><input type="text" placeholder="请输入产品名" id="searchProduct" value=""><span class="tupian-level8-1"></span></div>
						<ul class="tupian-level8-2"><li class="tupian-level8-3" data-id="-5">请选择产品</li></ul>
					</div>
					<span class="goBack"></span>
					<label for="selectAll" class="selectAlling">批次列表</label>	
						<label class="selectAlling1" id="allSelect">全部添加</label>		
					<div class="tupian-level9-father">
                        <ul class="clearFloats tupian-level9" data-name="product">						
                        </ul>
					</div>				
				</li>
				<li class="floats tupian-level14">
					<p class="tupian-level11">关联批次</p>
					<p class="deleteAll" id="allDelete">全部删除</p>
						<div class="choose-father" style="height:382px">
					<ul class="clearFloats tupian-level10"></ul>
					</div>
				</li>
			</ul>
			<hr/>
	        <a class="button button-sure" id="lunbo-save">保存组件</a>
			<a class="button" id="tupian-abort">取消保存</a>`;

	$("#edit"+attrId).html(lunboHtml);
	/*全局中的参数*/
	$("#componentTitle").val(allTitle);
	/*bindMove();*/
	/*页面需要再次请求，获得轮播图片相关的属性*/
	needLoad();
	function needLoad(){
        if($("#QRCode").length != 0){
            var datas="componentPropertyId="+attrId+"&isPhone="+1;
        }else{
            var datas="componentPropertyId="+attrId+"&isPhone="+0;
        }
		$.ajax({
			type:"get",
			url:"/qrtrace/carouselComponent/loadComponentProperty",
			data:datas,
			success:function(data,textStatus,jqXHR){
                    //断点3:
                    /*console.log("二次请求", data);*/
                    var arr1 = data;
                    lunboInit(arr1);
                    /*judge();*/
                    lunboScroll();
                    checkLunbo();
            },
            error:function(jqXHR,textStatus,err){
                errorCode(jqXHR.status);
            }
		});
	}
    function checkLunbo(){
        /*获取加载的字符串*/
        /*记录ID主要用于判断是否是不同组件之间的切换*/
        iidd2=$(".edit-inner").attr("id").match(/\d+/g);
        iidd2=iidd2[0];
        /**为什么第一次jiazai没有值*/
        strs2 = "";
        $(".missValue").each(function (i) {
            strs2 += $(this).val();
        });
        $(".missText").each(function (i) {
            strs2 += $(this).html();
        });
    }
	/**
     * 函数：todo确定详情展示区域高度，若超过进行滚动
     * 滚动部分的实现在main.js中
     * 此部分仅用作显示滚动条
     * 更新滚动条的高度
     * */
	function lunboScroll(){
        var H=120*($("#lunbo-1-title .lunboCC").length);
        var pi=360/H;
        var hh=360*pi;
        $(".lunboScroll-barer").height(hh);
		if($("#lunbo-1-title .lunboCC").length <= 3){
            $(".lunboScroll-bar").css("display","none");
            /*没有滚动条时，要进行清理，设置初始化*/
            $("#lunbo-1-title").css("top",0);
            $(".lunboScroll-barer").css("top",0);
		}else{
            $(".lunboScroll-bar").css("display","block");
        }
        /*初始化滚动条*/
        $("#lunbo-1-title").css("top",0);
        $(".lunboScroll-barer").css("top",0);
	}
	/*建立函数，获取展示列表的信息，放入imgArrs中*/
	function getInfo(){
		imgArrs=[];
		$(".lunboCC").each(function(i){
			var a=i+1;
			imgArrs.push({"id":a,"source":"","src":""});
		});
		$(".lunbo-mm").each(function(i){
			imgArrs[i].source=$(this).attr("src");
		});
		$(".jumplink").each(function(i){
			imgArrs[i].src=$(this).val();
		});
	}
	/*向ID为lunbo-1-title的包含框中添加可编辑的内容*/
	/*有图片时，进行编辑*/
	/*没有图片时，不进行编辑*/
	/*此处的arr是一个特殊的数组*/
	function lunboInit(data){
		var t=0;
		var html="";
		/*这里的arr仅仅借用父层作用域中的数组*/
		for(var i=0;i<data.length;i++){
	        t=parseInt(i)+1;
	        html+='<li class="lunboCC" data-i='+t+' data-order='+t+' data-id='+data[i].id+'><img src="'+data[i].pictureLocation+'" alt="" class="lunbo-mm"/><span class="lunbo-name">'+data[i].pictureName+'</span><label>添加链接：<input type="text" class="jumplink missValue"/></label><span class="lunbo-xia"></span><span class="lunbo-up"></span><span class="cancel lunbo-span"></span></li>';
	        //html2+='<li>'+str+'<span class="cancel"></span></li>';
	        /*lunboData.append("myfile"+i,files[i]);*/
	    }
	    $("#lunbo-1-title").html(html);
		lunboScroll();
	    $(".jumplink").each(function(i){
	    	$(this).val(data[i].pictureHyperlink);
	    });
	}
	/*
	 * 按钮组件JS功能实现
	 */
	/*图片上传时，显示出图片的基本信息*/
	/*$("#lunbo-image").click(function(){
		$("#loading").css("display","block");
	});
	$("#loading").click(function(){
		$("#loading").css("display","none");
	});*/
	
	$("#lunbo-image").on("change",function(e){
		/*gif动态加载*/
		/*$("#loading").css("display","none");*/
		/*$("#lunbo-1-title").html("");*/
		var target=e.target;
	    var filess=target.files;
	    /*console.log(filess);*/
	    var html1="",html2="",strName=[];
	    var t=0;
	    l=imgArrs.length;
	    /*获取文件内容，用作读取文件大小进行限制*/
		var files=document.getElementById("lunbo-image").files;
		if(($("#lunbo-1-title .lunboCC").length+files.length) > 6){
            errorHint("轮播图不能超过6张！");
            $("#lunbo-image").val("");
            t=1;
        }else{
		    t=0;
        }
		for(var i=0;i<files.length;i++){
			if(t == 0){
                var size=files[i].size;
                var fileSize=size/1024/1024;
                if(fileSize>0.5){
                    errorHint("图片应小于500k！");
                    t=1;
                }
                if(files[i].type.slice(0,5) != "image"){
                    errorHint("上传格式为img/png/gif");
                    t = 1;
                }
			}
		}
		/*只有符合所有的设定条件才可以进行下一步*/
        if(t == 0) {
			/*建立表单对象*/
            var fd = new FormData(document.getElementById("fileinfo"));
            var folderName = $("#elunbo").attr("data-name");
            //console.log(folderName);
            fd.append("folderName", folderName);
            for (var i = 0; i < filess.length; i++) {
                strName.push(filess[i].name);
            }
            $("#folderName").attr("data-com",0);
			/*使用原生ajax请求，上传图片或者文件*/
            $(".loading-2").css("display","block");
            var xhr = new XMLHttpRequest();
			/*console.log(xhr);*/
            xhr.open("post", "/qrtrace/carouselComponent/uploadCarouselPicture");
            xhr.onreadystatechange = function () {
                /*(xhr.status >=200 && xhr.status < 300) || xhr.status == 304*/
                if (xhr.readyState == 4 && xhr.status == 403) {
                    errorCode(403);
                }else if(xhr.readyState == 4 && ((xhr.status >=200 && xhr.status < 300) || xhr.status == 304)) {
                    $(".loading-2").css("display","none");
                    $("#folderName").attr("data-com",1);
					/*console.log(xhr);*/
                    var arr = xhr.responseText;
                    arr = JSON.parse(arr);
					/*console.log(arr);*/
					/*此处需要注意是否是追加图片还是整体上传*/
					/*var arrs=[];使用imgArr方便进行追加图片等*/
					/*执行函数获得之前存在的图片的数组信息*/
                    getInfo();
                    l = imgArrs.length;
                    console.log(imgArrs);
                    if (arr.length != 0 && arr) {
                        console.log(imgArrs, arr, l);
                        for (var i = 0; i < arr.length; i++) {
							/*$("#lunbo"+attrId).find("li[data-i="+i+1+"]").find("img").attr("src",arr[i]);*/
                            var k = 1 + i + l;
                            html1 += '<li class="lunboCC" data-i="' + k + '" data-order=' + k + ' data-id="0"><img src="' + arr[i] + '" alt="" class="lunbo-mm"/><span class="lunbo-name">' + strName[i] + '</span><label>添加链接：<input type="text" class="jumplink"/></label><span class="lunbo-xia"></span><span class="lunbo-up"></span><span class="cancel lunbo-span"></span></li>';
                            imgArrs.push({"id": k, "source": arr[i], "src": ""});
                        }
						/*先保存之后，在进行轮播更新*/
                        console.log("每次上传的图片后所有的图片", imgArrs);
						/*为了避免bug，在保存后再调用轮播方法*/
						/*lunbo(attrId,imgArrs);*/
                    } else {
                        console.log("input上传图片长度不够");
                    }
					/*上传图片是追加*/
                    $("#lunbo-1-title").append(html1);
                    lunboScroll();
                }else{

                }
            };
			/*xhr.setRequestHeader("Content-Type","multipart/form-data");*/
            xhr.send(fd);
            //$("#lunbo-2-title").html(html2);
            $("#lunbo-image").val("");
            //图片在本地加载完成后上传到数据库
        }
	});

	$(".nature-alert-father").undelegate().delegate(".lunbo-span,.lunbo-up,.lunbo-xia","click",function(e){
	    console.log(e.target);
	    var target=e.target;
	    if($(target).hasClass("lunbo-xia")){
            $(this).parent().next().after($(this).parent());
        }else if($(target).hasClass("lunbo-up")){
            $(this).parent().prev().before($(this).parent());
        }else if($(target).hasClass("lunbo-span")){
            $(target).parent().remove();
            lunboScroll();
        }
	});

	isSave=0;
	//提交轮播图属性信息
	$("#lunbo-save").click(function(){
		var dd={"componentInstanceId":attrId,
				"componentTitle":"",
				"carouselPicture":{
					"pictureOrder":[],
					"pictureLocation":[],
					"pictureLink":[],
					"pictureName":[],
					"ids":[]
				}
		};
		dd.componentTitle=$("#componentTitle").val();
        if(dd.componentTitle == ""){
            /*$(".mustValue").html("此项为必填项");*/
            errorHint("标题为必填项！");
        }else if($("#folderName").attr("data-com") == 0){
            /*$(".mustValue").html("此项为必填项");*/
            errorHint("图片上传暂未完成！");
        }else{
            //通过imgArr数组的内容获得图片的属性
            $(".lunbo-mm").each(function(){
                dd.carouselPicture.pictureLocation.push($(this).attr("src"));
            });
            var htmlDom=document.querySelectorAll(".lunboCC");
            for(var j=0;j<htmlDom.length;j++){
				/*var PC=htmlDom[j].getAttribute("data-i");*/
                var PC=j+1;
                dd.carouselPicture.pictureOrder.push(PC);
            }
            $(".lunboCC").each(function(){
                var a=$(this).attr("data-id");
                if(a == undefined){
                    a=0;
                    dd.carouselPicture.ids.push(a);
                }else{
                    dd.carouselPicture.ids.push($(this).attr("data-id"));
                }
            });
            $(".lunbo-name").each(function(){
                dd.carouselPicture.pictureName.push($(this).html());
            });
            $(".jumplink").each(function(){
                dd.carouselPicture.pictureLink.push($(this).val());
            });
            console.log(dd);
            var ddd=JSON.stringify(dd);
            /*if($(".show-inner").attr("data-id") == $(".mainTitle").attr("data-id")) {*/
                /*批次关联*/
                attrId = parseInt(attrId);
                var ddValue = {"instanceId": attrId, "componentTitle": "", "batchId": [],"pageId":0};
                ddValue.componentTitle = $("#componentTitle").val();
                ddValue.pageId = $(".show-inner").attr("data-id");
                if ($(".tupian-level5-2").is(":checked")) {
                    ddValue.batchId.push(-2);
                } else {
                    if ($(".tupian-level16-1").length == 0) {
                        ddValue.batchId.push(-2);
                    } else {
                        $(".tupian-level16-1").each(function () {
                            ddValue.batchId.push(parseInt($(this).attr("data-batchId")));
                        });
                    }
                }
                $.ajax({
                    type: "post",
                    url: "/qrtrace/addBatchComponentRelation",
                    data: ddValue,
                    dataType: "json",
                    success: function (data, textStatus, jqXHR) {

                    },
                    error:function(jqXHR,textStatus,err){
                        errorCode(jqXHR.status);
                    }
                });
                if($(".tupian-level5-2").is(":checked")){
                    pubPri(attrId,false);
                }else if($(".tupian-level5-4").is(":checked")){
                    pubPri(attrId,true);
                }
            /*}*/
			/*保存编辑的信息*/
            $.ajax({
                type:"post",
                url:"/qrtrace/carouselComponent/saveComponentProperty",
                data:ddd,
                dataType:"json",
                contentType:"application/json",
                success:function(data,textStatus,jqXHR){
                    console.log("保存完",data);
                    isSave=1;
					/*imgArr=[];
					 for(var i=0;i<data.length;i++){
					 //1-6代表轮播的顺序
					 imgArr.push({"id":data[i].pictureOrder,"source":data[i].pictureLocation});
					 }*/
                    lunboInit(data);
					/*lunbo(attrId,imgArrs);*/
                    $(".nature-alert").removeClass("kejian");
                    $(".delete-info").html("组件保存成功！");
                    $(".delete-father").css("display","block");
                    $(".save-lunbo").css("display","block");
					/*var dc=document.getElementById("contentFrame");
					 var loc=location.href;
					 dc.setAttribute("src",loc);*/
                },
                error:function(jqXHR,textStatus,err){
                    errorCode(jqXHR.status);
                }
                /*error:function(err){
                    console.log("lunbo-error");
                    $(".nature-alert").removeClass("kejian");
                    $(".delete-info").html("组件保存失败！");
                    $(".delete-father").css("display","block");
                    $(".save-lunbo").css("display","block");
                }*/
            });
		}
	});
}
exelunbo();