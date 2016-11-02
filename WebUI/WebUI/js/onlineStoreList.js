$(function(){
	var myGrid=$('#grid');
	var system = parent.SYSTEM;
	var isNewUser;
	var storeList = {
        '1' : {name:"淘宝"},
        '2' : {name:"京东"},
        '3' : {name:"1号店", authUrl:'http://www.baidu.com'},
        '4' : {name:"亚马逊", authUrl:'http://www.baidu.com'},
        '5' : {name:"苏宁易购", authUrl:'http://www.baidu.com'},
        '6' : {name:"唯品会", authUrl:'http://www.baidu.com'},
        '7' : {name:"当当网", authUrl:'http://www.baidu.com'},
        '8' : {name:"淘宝分销", authUrl:'http://www.baidu.com'},
        '9' : {name:"1688", authUrl:'http://www.baidu.com'},
        '10' : {name:"美丽说", authUrl:'http://www.baidu.com'},
        '11' : {name:"千米网", authUrl:'http://www.baidu.com'},
        '12' : {name:"蘑菇街", authUrl:'http://www.baidu.com'},
        '13' : {name:"速卖通", authUrl:'http://www.baidu.com'},
        '14' : {name:"国美在线", authUrl:'http://www.baidu.com'},
        '15' : {name:"拍拍商城", authUrl:'http://www.baidu.com'},
        '90' : {name:"虚拟商城", authUrl:'http://www.baidu.com'},
        '100' : {name:"对接商城",  authUrl:'http://www.baidu.com'}
    };
	initUser();
	var handle = {
			operate : function (oper, rowId){
				switch(oper){
					case'add'://新增
						var _this = this;
						$.dialog({
							title:'请选择网店类型',
							content:'<span id="type"></span>',
							data:{},
							width:260,
							height:80,
							min:false,
							max:false,
							cache:false,
							lock:true,
							init:function(){
								var self = this;
								$('#type').combo({
									data: [
										{id:1,name:'淘宝网店'},
										{id:2,name:'京东网店'},
										{id:3,name:'其他电商'}
									],
									value: 'id',
									text: 'name',
									width : 197,
									defaultSelected:0,
									editable: true,
									emptyOptions:true,
									zIndex:99999,
									callback:{
										onChange:function(data){
											if(data){
												var stype = data.id;
												if(stype == 1 || stype == 2){
													//淘宝京东用户使用旧的方式新增
										 			_this.pop('新增网店',{oper:"add",stype:stype, callback: _this.callback},'url:onlineStoreManage.jsp');
												}else{
													//其他电商用户跳到订单100
													Public.ajaxPost('/bs/cloudStore.do?action=getShopListURL', {}, function(data){
														if (data.status == 200) {
															$.dialog({
																title:'新增网店',
																content:'url:'+ data.data.url,
																data:{},
																min:false,
																max:false,
																width:1003,
																height:670,
																cache:true,
																lock:true,
																close:function(){
																	Public.ajaxPost('/bs/cloudStore.do?action=DownShop',{},function(data){
																		if(data.status == 200){
																			myGrid.trigger('reloadGrid');
																		}else{
																			Public.tips({type:1, content : 'ERROE,'+data.msg});
																		}
																	});
																	
																}
															});
														} else {
															Public.tips({type:1, content : '网店新增失败！' + data.msg});
															return;
														}
													});
												}
												self.close();
											}
										}
									}
								}).getCombo();
							}
						})
						break;
					case'edit'://编辑
						//获取本条数据关联的最新数据
						var _this = this;
						Public.ajaxPost('/bs/cloudStore.do?action=query', {id:rowId}, function(data){
							if (data.status == 200) {
								_this.pop('修改网店',{oper: oper, isNewUser: isNewUser, rowData: data.data, callback: _this.callback},'url:onlineStoreManage.jsp');
							} else {
								Public.tips({type:1, content : '网店修改失败！' + data.msg});
								return;
							}
						});
						break;
					case'del'://删除
						$.dialog.confirm('删除的网店将不能恢复，请确认是否删除？',function(){
							Public.ajaxPost('/bs/cloudStore.do?action=delete', {
								id: rowId
							}, function(data){
								if(data && data.status == 200){
									Public.tips({content:'网店删除成功！'});
									$('#grid').jqGrid('delRowData', rowId);
									refCache(oper,{id:rowId});
								}else{
									Public.tips({type: 1, content:'网店删除失败！' + data.msg});
								}
							});
						});
						break;
					case'setStatus'://更改状态
						break;
					case'refresh'://刷新
						myGrid.trigger('reloadGrid');
						break;
					case'getRight':	//授权
						var row = $('#grid').jqGrid('getRowData', rowId);
						var aa=window.open();
						if(row.cloudType != 1 && row.cloudType!=2){
							//淘宝京东以外的电商
							//aa.location = storeList[''+row.cloudType].authUrl;
							aa.close();
							Public.ajaxPost('/bs/cloudStore.do?action=getShopListURL', {}, function(data){
								if (data.status == 200) {
									$.dialog({
										title:'网店授权',
										content:'url:'+ data.data.url,
										data:{},
										min:false,
										max:false,
										width:1003,
										height:670,
										cache:true,
										lock:true,
										close:function(){
											Public.ajaxPost('/bs/cloudStore.do?action=DownShop',{},function(data){
												if(data.status == 200){
													myGrid.trigger('reloadGrid');
												}else{
													Public.tips({type:1, content : 'ERROE,'+data.msg});
												}
											});
											
										}
									});
								} else {
									Public.tips({type:1, content : '授权网店失败！' + data.msg});
									return;
								}
							});
							return;
						}
						Public.ajaxPost('../scm/eshop.do?cmd=auth.session.get', {
							sid: rowId
						}, function(data){
							if(data && data.status == 200){
								if(!data.data.items[0]){
									Public.tips({type: 1, content:'网店授权接口数据异常，请联系管理员！'});
									aa.close();
									return;
								}
								aa.location = data.data.items[0].url;
							}else{
								Public.tips({type: 1, content:'网店授权失败！' + data.msg});
							}
						});
						break;
					default:Public.tips({type:1,centent:'未知操作！'});break;
				}
			},
			callback: function(data, oper, dialogWin){
				var gridData = $("#grid").data('gridData');
				if(!gridData){
					gridData = {};
					$("#grid").data('gridData', gridData);
				}
				gridData[data.id] = data;
				
				if(oper == "edit") {
					$("#grid").jqGrid('setRowData', data.id, data);
					dialogWin && dialogWin.api.close();
				} else {
					$("#grid").jqGrid('addRowData', data.id, data, 'last');
					dialogWin && dialogWin.resetForm(data);
				}
				refCache(oper,data);
			},
			pop: function(title,data,url){
				$.dialog({
					title:title,
					content:url,
					data:data,
					width:640,
					height:340,
					min:false,
					max:false,
					cache:false,
					lock:true
				});
			}
	};
	function initGrid(){
		myGrid.jqGrid({
			colModel:[
			          {name:'operate',label:'操作',width:60,fixed:true,align:'center',formatter: function (val, opt, row) {
			        		var html_con = '<div class="operating" data-id="' + row.id + '"></span><span class="ui-icon ui-icon-pencil" title="修改"></span><span class="ui-icon ui-icon-trash" title="删除"></span></div>';
			        		return html_con;
			        	}},
			          {name:'number',label:'网店编号',width:100,hidden:true},
			          {name:'name',label:'网店名称',width:200,classes: 'ui-ellipsis',title:true},
			          {name:'cloudCoide',label:'商家账号',width:150,align:'center'},
			          {name:'cloudType',label:'网店类型',width:100,align:'center',hidden:true},
			          {name:'typeNameZhcn',label:'商城平台',width:100,align:'center',formatter:function (val, opt, row){
			        	  	var text = '';
			        	  	var cloud = storeList[''+row.cloudType];
			        		return (cloud ? cloud.name :'' )|| '&#160;';
			          }},
			          {name:'locationId',label:'默认仓库',width:100,align:'center',formatter:function (val, opt, row){
			        	  	var text = '';
			        	  	var storageList = system.storageInfo;
			        	  	if(storageList){
			        	  		for(var i = 0 ,len = storageList.length ;i<len ;i++){
			        	  			if(storageList[i].id == val){
			        	  				text = storageList[i].name;
			        	  			}
			        	  		}
			        	  	}
			        		return text || '&#160;';
			          }},
			          {name:'expressName',label:'默认物流',width:100,align:'center'},
			          {name:'expressId',label:'默认物流ID',hidden:true},
			          {name:'deliveryAddrId',label:'默认发货地址',width:100,align:'center',classes: 'ui-ellipsis',formatter:function (val, opt, row){
			        	  	var text = '';
			        	  	var _List = system.addrInfo;
			        	  	if(_List){
			        	  		for(var i = 0 ,len = _List.length ;i<len ;i++){
			        	  			if(_List[i].id == val){
			        	  				var _l = _List[i];
			        	  				var province = _l.province || '';
			        	  				var city = _l.city || '';
			        	  				var area = _l.area || '';
			        	  				var address = _l.address || '';
			        	  				text = province + city + area + address;
			        	  			}
			        	  		}
			        	  	}
			        		return text || '&#160;';
			          }},
			          {name:'settacctId',label:'结算账户',width:100,align:'center',formatter:function (val, opt, row){
			        	  	var text = '';
			        	  	var _List = system.accountInfo;
			        	  	if(_List){
			        	  		for(var i = 0 ,len = _List.length ;i<len ;i++){
			        	  			if(_List[i].id == val){
			        	  				text = _List[i].name;
			        	  			}
			        	  		}
			        	  	}
			        		return text || '&#160;';
			          }},
			          {name:'sid',label:'网店授权',width:100,align:'center',hidden:true},
			          {name:'hasToken',label:'授权订单服务',width:100,align:'center',formatter:function (val, opt, row){
			        	  // if(isNewUser){
			        		 //  var _cls = val ? 'ui-label ui-label-success' : 'ui-label ui-label-warning';
				        	 //  var text = '<span class="'+ _cls +'" data-id="' + row.id +'">' + (val ? '是' : '否') + '</span>';
				        	 //  return text;
			        	  // }else{
			        		  var _cls = (row.sid || val) ? 'hasRight ui-label-success' : 'ui-label-warning';
			        		  var text =  '<span class="getRight ui-label '+_cls+'" data-delete="' + row.sid + '" data-id="' + row.id + '">'+(row.sid ? '已授权' :'点击授权')+'</span>';
				        	  return text;
			        	  // }
			          }}
			],
			url:'/bs/cloudStore.do?action=list',
			datatype:'json',
			height:Public.setGrid().h,
			altRows:true,//行间样式交替
			gridview: true,
			autowidth:true,
			pager:'#page',
			viewrecords:true,
			rownumbers:true,
			cmTemplate: {sortable:false, title:false},//修改cell的属性默认值，不用再次在每列中去定义
			page:1,//第一页开始
			rowNum:3000,//需要3000条记录
			shrinkToFit:false,//列宽度使用colModel指定的宽度
			scroll:1,
			jsonReader:{
				root:'data.items',
				records:'data.totalsize',
				repeatitems:false,
				id:'id'
			},
			loadComplete: function(data){
				if(data && data.status == 200){
					var gridData = {};
					data = data.data;
					for(var i=0; i<data.items.length; i++){
						var item = data.items[i];
						gridData[item.id] = item;
					}
					$("#grid").data('gridData', gridData);
					
					if(data.items.length == 0){
						Public.tips({type:2, content: '没有网店数据！'});
					}
				}else{
					Public.tips({type:2, content: '获取网店数据失败！' + data.msg});
				};
			},
			loadError:function(xhr, status, error){
				Public.tips({type: 1, content : '操作失败了哦，请检查您的网络链接！'});
			}
		});
	};
	function initEvent(){
		//刷新
		$('#btn-refresh').click(function(e){
			e.preventDefault();
			handle.operate('refresh');
		});
		//新增
		$('#btn-add').click(function(e){
			e.preventDefault();
			if (!Business.verifyRight('CLOUDSTORE_ADD')) {
				return ;
			};
			handle.operate('add');
		});
		//修改
		myGrid.on('click','.operating .ui-icon-pencil',function(e){
			e.preventDefault();
			if (!Business.verifyRight('CLOUDSTORE_UPDATE')) {
				return ;
			};
			handle.operate('edit',$(this).parent().data('id'));
		});
		//删除
		myGrid.on('click','.operating .ui-icon-trash',function(e){
			e.preventDefault();
			if (!Business.verifyRight('CLOUDSTORE_DELETE')) {
				return ;
			};
			handle.operate('del',$(this).parent().data('id'));
		});
		//已授权
		myGrid.on('mouseover','.hasRight',function(e){
			$(this).html('重新授权');
		}).on('mouseout','.hasRight',function(e){
			$(this).html('已授权');
		});
		//授权
		myGrid.on('click','.getRight',function(e){
			e.preventDefault();
			if (!Business.verifyRight('CLOUDSTORE_AUTH')) {
				return ;
			};
			var _thisId = $(this).data('id');
			$.dialog.confirm('请您在新开的页面完成授权！完成前请不要关闭此窗口。', function(){
				Public.ajaxPost('/bs/cloudStore.do?action=query', {id:_thisId}, function(data){
					if (data.status == 200) {
						if(data.data.sid){
							Public.tips({content : '授权成功！'});
							myGrid.trigger('reloadGrid');
							/*$('#grid').setCell(_thisId,'sid','data.data.sid');
							$('#grid').setCell(_thisId,'cloudCoide',data.data.cloudCoide);*/
						}
					} else {
						Public.tips({type:1, content : msg + '失败！' + data.msg});
						return;
					}
				});
			}, function(){
			    return;
			});
			handle.operate('getRight',_thisId);
		});
		//window窗口改变时grid自适应
		$(window).resize(function(){
			Public.resizeGrid();
		});
	};
	//获取用户信息
	function initUser(){
		Public.ajaxPost('/bs/cloudStore.do?action=isNewUser', {}, function(data){
			if (data.status == 200) {
				isNewUser = data.data.isNewUser;
			} else {
				isNewUser = 0;
			}
		});
	};
	//缓存处理
	function refCache(oper,data){
		if(parent.SYSTEM.storeInfo){
			switch(oper){
				case 'edit':
					for(var i=0,len=parent.SYSTEM.storeInfo.length;i<len;i++){
						if(parent.SYSTEM.storeInfo[i].id === data.id){
							parent.SYSTEM.storeInfo[i] = data;
						}
					}
					break;
				case 'add':
					parent.SYSTEM.storeInfo.push(data);
					break;
				case 'del':
					for(var i=0,len=parent.SYSTEM.storeInfo.length;i<len;i++){
						if(parent.SYSTEM.storeInfo[i].id === data.id){
							parent.SYSTEM.storeInfo.splice(i,1);
							i--;
							len--;
						}
					}
					break;
				default:break;
			}
		}
	};
	initGrid();
	initEvent();

		if(GetQueryString("clickType")=="formNav"){$("#btn-add").trigger('click')};

});


function GetQueryString(name) {
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
   var r = window.location.search.substr(1).match(reg);
   if (r!=null) return (r[2]); return null;
}