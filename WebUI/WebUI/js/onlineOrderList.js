var curRow,curCol,
THISPAGE = {};
var system = parent.SYSTEM;
var billclass = {
		'快递单' :30111,
		'发货单' :30112, 
		'配货单' :30113 
	};
var limit =20,kdrdp,_formclassid,_isPrint;
var exportData;
var CNPrint=Public.getCaiNiaoPrint();  
//自定义打印
window.customPrint = function(billType,templateId,printCondition,printLogo){
	// e.preventDefault();
	var $this = $(this);
	// var billType = $this.data('type');
	switch(billType){
		case 1: 
			var arr_ids = $('#grid').jqGrid('getGridParam','selarrrow')
			var idSet = arr_ids.join();
			/*for (var i = 1; i < arr_ids.length + 1; i++) {
				if(i%10 == 0){
					idSet.
				}
			};*/
			kdrprint.doPrint(billclass['发货单'], 0 ,idSet,templateId);
		break;
		case 2: 
			var arr_ids = $('#grid').jqGrid('getGridParam','selarrrow')
			var idSet = arr_ids.join();
			var formclassid = billclass['快递单'], expresstype;
			var _rData = _page.$grid.jqGrid('getRowData',arr_ids[0]);
			if(_rData.expressId <= 0){
				defaultPage.Public.tips({type:2, content : '请先选择订单【'+_rData.orderIdCloud+'】的物流公司！'});
				return false;
			}
			for (var i = 0; i < system.logisticInfo.length; i++) {
				var  logistic = system.logisticInfo[i];
				if(_rData.expressId == logistic.expressId){
					expresstype = logistic.expressType;
					break;
				}
			}
			var condition = {
				idSet: idSet,
				formclassid: formclassid,
				templateid: templateId?templateId:0,
				expresstype: expresstype,
				isWaybill: printCondition.isWaybill,
				offsetX: printCondition.offsetX,
				offsetY: printCondition.offsetY,
				width: printCondition.width,
				height: printCondition.height,
				print: true
			}
			if(printCondition.isWaybill == 1){		
				CaiNiaoPrint(condition,printLogo);	
			}else{
				for (var i = 0; i < system.logisticInfo.length; i++) {
					var  logistic = system.logisticInfo[i];
					if(_rData.expressId == logistic.expressId){
						kdrprint.doPrint(billclass['快递单'], logistic.expressType ,idSet,templateId);
						break;
					}
				}
			};
		break;
		case 3: 
			var arr_ids = $('#grid').jqGrid('getGridParam','selarrrow')
			idSet = arr_ids[0];
			var k = 11;
			var m = 0;
			for (var i = 2; i <= arr_ids.length; i++) {
				if(i%k == m){
					idSet += '|' + arr_ids[i-1];
					k=10;
					m = 1;
				}else{
					idSet += ',' + arr_ids[i-1];
				}
			};
			kdrprint.doPrint(billclass['配货单'], 0 ,idSet,templateId);
		break;
	}
};
window.previewPrint = function(billType,templateId,printCondition){
	if (!Business.verifyRight('ORDERCLOUD_PRINT')) {
			return ;
		};
		var $this = $(this);
		var arr_ids = $('#grid').jqGrid('getGridParam','selarrrow');
		// if(arr_ids.length !== 1){
		// 	if(!arr_ids.length){
		// 		defaultPage.Public.tips({type:2, content : '请选择需要打印的订单'});
		// 		return;
		// 	}
		// }
		// var billType = $this.data('type');
		var formclassid , idSet, expresstype;
		switch(billType){
			case 1: 
				formclassid = billclass['发货单'];
				idSet = arr_ids.join();
			break;
			case 2: 
				formclassid = billclass['快递单'];
				idSet = arr_ids.join();
				var _rData = _page.$grid.jqGrid('getRowData',arr_ids[0]);
				if(_rData.expressId <= 0){
					defaultPage.Public.tips({type:2, content : '请先选择订单【'+_rData.orderIdCloud+'】的物流公司！'});
					return false;
				}
				for (var i = 0; i < system.logisticInfo.length; i++) {
					var  logistic = system.logisticInfo[i];
					if(_rData.expressId == logistic.expressId){
						expresstype = logistic.expressType;
						break;
					}
				};
			break;
			case 3: 
				formclassid = billclass['配货单'];
				idSet = arr_ids[0];
				var k = 11;
				var m = 0;
				for (var i = 2; i <= arr_ids.length; i++) {
					if(i%k == m){
						idSet += '|' + arr_ids[i-1];
						k = 10;
						m = 1;
					}else{
						idSet += ',' + arr_ids[i-1];
					}
				};
				// idSet = arr_ids.join();
			break;
		}
		
		var condition = {
			idSet: idSet,
			formclassid: formclassid,
			templateid: templateId?templateId:0,
			expresstype: expresstype,
			isWaybill: printCondition.isWaybill,
			offsetX: printCondition.offsetX,
			offsetY: printCondition.offsetY,
			width: printCondition.width,
			height: printCondition.height,
			print: false
		}
		if(printCondition.isWaybill == 1){		
			CaiNiaoPrint(condition);	
		}	else{
			$.dialog({
				title : '打印预览',
				content : 'url:printPreview.jsp',
				width : 850,
				height : 480,
				max : false,
				min : false,
				cache : false,
				lock: true,
				ok: false,
				data:{
					condition: condition,
					callback:function(data){
						//打印成功之后回调
					}
				}
			});
		}
};
window.CaiNiaoPrint = function(condition,printLogo){
	$(this).ajaxPost('/bs/print.do?action=getPrintData', condition, function(data) {
		if (data && data.status == 200) {
			var fixedMsg = data.items, customMsg = data.msg;
			CNPrint.PRINT_INITA(condition.offsetY,condition.offsetX,condition.width*4,condition.height*4,"打印控件功能演示");
			for (i = 0; i < fixedMsg.length; i++) {	
				CNPrint.NewPageA();		
				CNPrint.SET_PRINT_IDENTITY("AppKey=98801&Seller_ID="+fixedMsg[i].sellerid);
				CNPrint.SET_PRINT_MODE("CAINIAOPRINT_MODE","CP_CODE="+fixedMsg[i].cpcode+"&CONFIG="+fixedMsg[i].printConfig);
				CNPrint.SET_PRINT_CONTENT("ali_waybill_short_address",fixedMsg[i].shortaddress);
				CNPrint.SET_PRINT_CONTENT("ali_waybill_package_center_name",fixedMsg[i].packagecentername);//集散地名称
				CNPrint.SET_PRINT_CONTENT("ali_waybill_package_center_code",fixedMsg[i].packagecentercode);//集散地条码
				CNPrint.SET_PRINT_CONTENT("ali_waybill_waybill_code",fixedMsg[i].waybillcode);
				CNPrint.SET_PRINT_CONTENT("ali_waybill_consignee_name",fixedMsg[i].consigneename);
				CNPrint.SET_PRINT_CONTENT("ali_waybill_consignee_phone",fixedMsg[i].consigneephone);
				CNPrint.SET_PRINT_CONTENT("ali_waybill_consignee_address",fixedMsg[i].consigneeaddress);//收件人地址
				CNPrint.SET_PRINT_CONTENT("ali_waybill_send_name",fixedMsg[i].deliver);
				CNPrint.SET_PRINT_CONTENT("ali_waybill_send_phone",fixedMsg[i].sendphone);
				CNPrint.SET_PRINT_CONTENT("ali_waybill_shipping_address",fixedMsg[i].sendaddress);
				CNPrint.SET_PRINT_STYLEA("ali_waybill_cp_logo_up","PreviewOnly",printLogo);//签收联物流公司logo
				CNPrint.SET_PRINT_STYLEA("ali_waybill_cp_logo_down","PreviewOnly",printLogo);//留存联物流公司logo
				if(customMsg){
					for(var j=0;j<customMsg.length;j++){
						var item = customMsg[j].position.split(',');
						var customCon = customMsg[j].fieldKey;
						if(customMsg[j].isLine == 0 && customMsg[j].isText == 0 && customMsg[j].isBarcode == 0){
							CNPrint.ADD_PRINT_TEXT(item[0],item[1],item[2],item[3],fixedMsg[i][customCon]);
						}
						if(customMsg[j].isText == 1){
							CNPrint.ADD_PRINT_TEXT(item[0],item[1],item[2],item[3],customMsg[j].name);
						}
						if(customMsg[j].isLine == 1){
							var lineContent = customMsg[j].name.split('(')[1].split(')')[0].split(',')
							CNPrint.ADD_PRINT_LINE(lineContent[0],lineContent[1],lineContent[2],lineContent[3],lineContent[4],lineContent[5]);
						}
						if(customMsg[j].isBarcode == 1){
							var lineContent = customMsg[j].name.split('(')[1].split(')')[0].split(',')
							CNPrint.ADD_PRINT_BARCODE(lineContent[0],lineContent[1],lineContent[2],lineContent[3],lineContent[4].replace(/"/g,''),fixedMsg[i][customCon]);
						}
					}
				}
			}
			CNPrint.SET_PRINT_MODE("NP_NO_RESULT",true);
			CNPrint.SET_PRINT_PAGESIZE(1,condition.width*10,condition.height*10,"CreateCustomPage");
			CNPrint.SET_PRINT_MODE("CREATE_CUSTOM_PAGE_NAME","菜鸟电子面单"+condition.width+"*"+condition.height);//对新建的纸张重命名
			if(!condition.print){
				CNPrint.PREVIEW();
			}
			else{
				CNPrint.PRINTA();
			}
		}
	});
}
$(function() {
	var billRequiredCheck =true,// system.billRequiredCheck, 
	// kdrdp,
	// _formclassid,
	// _isPrint,
	param = Public.getRequest(),
	handle = param['handle'],
	btmDivH = 205;//底部订单详情框高度
	adjustH = btmDivH + ((!handle || handle === '2') ? 90 : 70),
	billRequiredCheck = true,
	qtyPlaces = 2,//Number(system.qtyPlaces), 
	pricePlaces = Number(system.pricePlaces), 
	amountPlaces = Number(system.amountPlaces),
	storageList = system.storageInfo,
	originalData = {},
	defaultPage = Public.getDefaultPage(),
	dataHandle = {
		init:function(){//加载并缓存数据
			system.taobaoData ={};
			system.taobaoData.TradeType=[
				{name:'买家已付款',id:'LOCAL_WAIT_SELLER_SEND_GOODS'},
				{name:'卖家部分发货',id:'LOCAL_SELLER_CONSIGNED_PART'},
				{name:'卖家已发货',id:'LOCAL_WAIT_BUYER_CONFIRM_GOODS'},
				{name:'买家已签收(货到付款)',id:'LOCAL_TRADE_BUYER_SIGNED'},
				{name:'交易成功',id:'LOCAL_TRADE_FINISHED'},
				{name:'交易关闭',id:'LOCAL_ALL_CLOSED'},
				{name:'换货订单',id:'LOCAL_REBACK_ORDER'},
				{name:'锁定订单',id:'LOCAL_LOCK_ORDER'},
				{name:'等待买家付款',id:'LOCAL_ALL_WAIT_PAY'}
			];
			
			system.taobaoData.RefundStatus=[
			    {name:'买家已经申请退款，等待卖家同意',id:'WAIT_SELLER_AGREE'},
			    {name:'卖家已经同意退款，等待买家退货',id:'WAIT_BUYER_RETURN_GOODS'},
			    {name:'买家已经退货，等待卖家确认收货',id:'WAIT_SELLER_CONFIRM_GOODS'},
			    {name:'卖家拒绝退款',id:'SELLER_REFUSE_BUYER'},
			    {name:'退款关闭',id:'CLOSED'},
			    {name:'退款成功',id:'SUCCESS'}
			];
			
			system.taobaoData.ShippingMethod = [ {name:'快递',id:1},{name:'卖家包邮',id:2},{name:'EMS',id:3},{name:'平邮',id:4} ];
			system.taobaoData.ShippingStatus = [{name:'已发货',id:1},{name:'未发货',id:0}];
			system.taobaoData.outStatus  = [{name:'已生成销货单',id:1},{name:'未生成销货单',id:0}];
			system.taobaoData.getFlagList = function(){
				var FlagList = [];
				for (var i = 0; i < 6; i++) {
					FlagList.push({name:$('<img src="http://a.tbcdn.cn/sys/common/icon/trade/op_memo_'+i+'.png">'),id:+i});
				};
				return FlagList;
			};
		},
		getTradeType : function() {return system.taobaoData.TradeType;},
		getRefundStatus : function() {return system.taobaoData.RefundStatus;},
		getShippingMethod : function() {return system.taobaoData.ShippingMethod ;},
		getShippingStatus : function() {return system.taobaoData.ShippingStatus;},
		getoutStatus : function() {return system.taobaoData.outStatus;},//出库状态
		getFlagList : function() {return system.taobaoData.getFlagList();},
		getAuditStatus : function(){return [{name:'已审核', id:'1'}, {name:'未审核', id:'0'}];},
		getCashDelivery : function(){return [{name:'货到付款', id:'1'}, {name:'非货到付款', id:'0'}];},
		getPremiumStatus : function(){return [{name:'已添加', id:'1'}, {name:'未添加', id:'0'}];},
		getMayPrint : function(){return [{name:'待打印的物流单', id:'0'}, {name:'待打印的配货单', id:'1'}, {name:'待打印的发货单', id:'2'}];},  //可打印
		calTotalDetail: function(){
			var ids = _page.$gridDetail.jqGrid('getDataIDs');
			var total_amount = 0, shipmentsFree = parseFloat(_page.$shipmentsFree.html())|| 0;
			for(var i = 0, len = ids.length; i < len; i++){
				var id = ids[i];
				var row = _page.$gridDetail.jqGrid('getRowData',id);
				if(row.amount) {
					total_amount += parseFloat(row.amount);
				};
				if(row.rpAmount) {
					total_rpAmount += parseFloat(row.rpAmount);
				};
			};
			_page.$gridDetail.jqGrid('footerData', 'set', {qty:"应收金额："+total_amount.toFixed(2)});
			_page.$amount.html((total_amount + shipmentsFree).toFixed(2));
			_page.$realIncome.html((shipmentsFree + total_amount).toFixed(2));	
		},
		getEntriesData: function(notTips){
			//_grid.cancelGirdEdit();
			var entriesData = [];
			var ids = _page.$gridDetail.jqGrid('getDataIDs');
			var orderIdCloud; 
			for(var i = 0, len = ids.length; i < len; i++){
				var id = ids[i], itemData;
				var row = _page.$gridDetail.jqGrid('getRowData',id);
				var storageInfo = $('#' + id).data("storageInfo") || {};
				var goodsInfo = $('#' + id).data("goodsInfo") || {};
				var skuInfo = $('#' + id).data("skuInfo") || {} ;
				if(!(row.invCId==""&&goodsInfo.id == undefined)){
						if(goodsInfo.invSkus && goodsInfo.invSkus.length>0 && !skuInfo.id) {
						if(!notTips){
							parent.Public.tips({type:2, content:'请选择相应的属性！'});
							setTimeout(function(){
								_page.$gridDetail.jqGrid('editCellByColName', id, 'skuName');
								_page.skuCombo.active = true;
								_page.skuCombo.doQuery();
							},100);
							return false;
						}
						break;
					}
					if(row.qty == 0){
						if(!notTips){
							parent.Public.tips({type:2, content:'数量必须大于0！'});
							setTimeout(function(){
								_page.$gridDetail.jqGrid('editCellByColName', id, 'qty');
								//$('#'+id+'_qty').val(1);
							},100);
							return false;
						}
						break;
					}
					/*if(!storageInfo.id){
						if(!notTips){
							defaultPage.Public.tips({type:2, content:'请选择商品对应的仓库！'})
							_page.$gridDetail.jqGrid('editCellByColName', id, 'locationName');
						}
						return;
					}*/
					orderIdCloud = orderIdCloud || row.orderIdCloud;
					itemData = {
						//orderId : api.data.rowData.id,// 订单ID
						//entryId : '',// 订单体ID
						orderIdCloud : row.orderIdCloud || orderIdCloud,// 网上订单号
						invCId : row.invCId,// 网店商品ID
						qty : row.qty || 0,// 数量
						price : row.price || 0,// 单价
						amount : row.amount || 0,// 金额
						//rpAmount : row.rpAmount,// 实收金额
						locationId : storageInfo.id,// 仓库
						locationName : storageInfo.name,// 仓库名称
						skuCId : row.skuCId,
						invId : goodsInfo.id || -1,// 本地商品ID
						skuId : skuInfo.id || -1,
						deduction : row.deduction,
						oid: row.oid
						//desc : ''// 说明
					};
					entriesData.push(itemData);
				}
			};

			return entriesData;
		},
		getPostData: function(updateAddressInfo){
			if(!originalData.orderId) return;
			var entries = this.getEntriesData();
			if(!entries) return;
			if(entries.length > 0) {
				var postData ;
				if(!updateAddressInfo){
					postData = {
						expressId: originalData.expressId,//物流公司ID
						expressName: originalData.expressName,//物流公司
						deliveryId : originalData.deliveryId || 1,//运送方式ID,默认‘快递’
						deliveryName : originalData.deliveryName,//运送方式
						receiver: originalData.receiver,//收件人名称
						phone : originalData.phone,//收件人电话
						mobile : originalData.mobile,//收件人手机
						postalCode : originalData.postalCode,//邮编
						province: originalData.province,//省
						city: originalData.city,//市
						area : originalData.area,//区
						address : originalData.address,//详细地址
						totalAmount :_page.$amount.html(),//应收金额
						rpAmount : _page.$realIncome.html(),//实收金额
						shipmentsFree: _page.$shipmentsFree.html()//运费
					};
				}
				else{
					postData = {
						expressId:_page.logisticsDetailCombo.getValue(),//物流公司ID
						expressName:_page.logisticsDetailCombo.getText(),//物流公司
						deliveryId : _page.shippingMethodDetailCombo.getValue(),//运送方式ID
						deliveryName : _page.shippingMethodDetailCombo.getText(),//运送方式
						receiver:_page.$toName.val(),//收件人名称
						phone : _page.$toTel.val(),//收件人电话
						mobile :_page.$toPhone.val(),//收件人手机
						postalCode :_page.$toPostcode.val(),//邮编
						province:_page.provinceCombo.getText(),//省
						city:_page.cityCombo.getText(),//市
						area : _page.areaCombo.getText(),//区
						address : _page.$toAddress.val(),//详细地址
						totalAmount : _page.$amount.html(),//应收金额
						rpAmount : _page.$realIncome.html(),//实收金额
						shipmentsFree: _page.$shipmentsFree.html()//运费
					};
				}
				postData.buyerDesc = _page.$buyerRemark.val();//买家留言
				postData.salerDesc = _page.$sellerRemark.val();//卖家留言
				postData.entries = entries;//分录数据
				postData.orderId = originalData.orderId;//分录数据
				return postData;
			} else {
				Public.tips({type: 2, content: '商品信息不能为空！'});
				return false;
			}
		},
		detailUpdate: function(updateAddressInfo){
			var postData = dataHandle.getPostData(updateAddressInfo);
			if(postData) {
				Public.ajaxPost('/scm/orderCloud.do?action=updateOrderCloud', {postData: JSON.stringify(postData)}, function(data){
					if(data.status === 200) {
						defaultPage.Public.tips({content : '保存成功！'});
						_page.$grid.jqGrid('setGridParam').trigger('reloadGrid');//保存成功刷新不跳转。。
						if(curRow !== null && curCol !== null){
						   _page.$gridDetail.jqGrid("saveCell", curRow, curCol);
						   curRow = null;
						   curCol = null;
						};
						orderDetailInit(data.data.orderId, _page.$gridDetail);//相当于保存成功后再执行一次点击那一行的操做。。
						var invCName = $('#gridDetail').find('td[aria-describedby="gridDetail_invCName"]');
						invCName.each(function(index, el) {
							if($(this).html() === '&nbsp;'){
								$(this).closest('tr').find('td[aria-describedby="gridDetail_isReFund"]').html('<span class="icons ui-label ui-label-success">赠</span>');
							}
						});
						$.extend(originalData , postData);
					}else {
						defaultPage.Public.tips({type: 1, content : data.msg});
						orderDetailInit(originalData.orderId, _page.$gridDetail);
					}
				})
			}
		},
		getShippingMethod:function(){
			return system.taobaoData.ShippingMethod;
		}
	},
	checkHandle = {
			checkAudit:function(ids){
				if(ids){
					for ( var i = 0, len = ids.length; i < len; i++){
						var _rData = _page.$grid.jqGrid('getRowData',ids[i]);
						if(!_rData.checked){
							defaultPage.Public.tips({content:'请选择已审核的订单',type:2});
							return false;
						}
					}
					return true;
				}
				return false;
			},
			checkExpress:function(ids){
				if(ids){
					var _eid = '-1';
					for ( var i = 0, len = ids.length; i < len; i++){
						var _rData = _page.$grid.jqGrid('getRowData',ids[i]);
						_eid === '-1'&&(_eid = _rData.expressId);
						if(!_rData.checked){
							defaultPage.Public.tips({type:2, content : '请选择已审核的订单！'});
							return false;
						}
						if(_eid !=_rData.expressId){
							defaultPage.Public.tips({content:'请选择相同物流公司的订单',type:2});
							return false;
						}
					}
					return true;
				}
				return false;
			},
			sendCheck :function(ids){
				if(ids){
					for ( var i = 0, len = ids.length; i < len; i++){
						var _rData = _page.$grid.jqGrid('getRowData',ids[i]);
						if(!_rData.checked){
							defaultPage.Public.tips({content:'请选择已审核的订单',type:2});
							return false;
						}
						if(_rData.deliveryStatus){
							defaultPage.Public.tips({content:'请选择未发货的订单',type:2});
							return false;
						}
					}
					return true;
				}
				return false;
			}
	}, 
	Fmatter = {
		operFmatter : function(val, opt, row) {
			var html_con = '<div class="operating" data-id="'+ row.orderId + '"><!--<a class="ui-icon ui-icon-pencil" title="修改">--></a><a class="ui-icon ui-icon-trash" title="删除"></a></div>';
			return html_con;
		},
		operDetailFmatter : function(val, opt, row) {
			var html_con = '<div class="operating"><a class="ui-icon ui-icon-plus" title="新增"></a><a class="ui-icon ui-icon-trash" title="删除"></a></div>';
			return html_con;
		},
		checkedFmatter : function(val, opt, row) {
			return val === 1 ? '已审核' : '&#160;';
		},
		tradeTypeFmatter : function(val, opt, row) {
			for(var i = 0,len = system.taobaoData.TradeType.length ;i<len;i++){
				if(system.taobaoData.TradeType[i].id === val)
					return system.taobaoData.TradeType[i].name;
			}
			return val;
		},
		shippingStatusFmatter : function(val, opt, row) {
			if(val === 1){
				return '已发货';
			}else if(val === 2){
				return '发货中';
			}else{
				return '&#160;';
			}
		},
		sellerFlagFmatter : function(val, opt, row) {
			var str = ''
			if(row.sellerFlag > 0){
				str = '<img style="padding-right: 5px;" src="http://a.tbcdn.cn/sys/common/icon/trade/op_memo_'+ row.sellerFlag +'.png">'
			}
			str += val || '';
			return str || '&#160;';
		},
		refundFmatter : function(val, opt, row) {
			return val === 1 ? '是' : '&#160;';
		},
		refundStatusFmatter : function(val, opt, row) {
			for(var i = 0,len = system.taobaoData.RefundStatus.length ;i<len;i++){
				if(system.taobaoData.RefundStatus[i].id === val){
					if(val == 'SUCCESS' || val == 'CLOSED')
						return '<font color=green>'+system.taobaoData.RefundStatus[i].name+'</font>';
					else
						return '<font color=red>'+system.taobaoData.RefundStatus[i].name+'</font>';
				}
			}
			return val == null ? '&#160;' : val;
		},
		expressFmatter : function(val, opt, row) {
			if(system.logisticInfo){
				var _expressId = val ? val :row.expressId;
				for(var i=0,len=system.logisticInfo.length;i<len;i++){
					if(system.logisticInfo[i].id == _expressId)
						return system.logisticInfo[i].name;
				}
			}
			return '&#160;';
		},
		billNoFmatter : function(val, opt, row) {
			return val ? '<a class="btnBillcheck" href="" title="点击查看" data-id="'+row.billId+'">'+val+'</a>' : '&#160;';
		},
		reBillNoFmatter : function(val, opt, row) {
			return val ? '<a class="btnBillcheck" href="" title="点击查看" data-id="'+row.reBillId+'">'+val+'</a>' : '&#160;';
		},
		printStatusFmatter : function(val, opt, row) {
			// return val === 1 ? '<i class="checked"></i>' : '&#160;';
			var icons = [
				{name:'物', 'class': row.printExpStatus ? 'ui-label-success' : 'ui-label-default' },//快递单
				{name:'配', 'class': row.printPhStatus ? 'ui-label-success' : 'ui-label-default' },//配货单
				{name:'发', 'class': val ? 'ui-label-success' : 'ui-label-default' }//发货单
			]
			return $.map(icons, function(val, index) {
				return '<span class="icons ui-label '+val['class']+'">'+ val.name +'</span>';
			}).join('');
		},
		moneyFmt:function(val, opt, row){
			return val || '&#160;';
		},
		onlineGoodsFmt: function(val, opt, row){
			if(val){
				var name = val;
				var num = row.skuOuterId ? '\n'+ (row.skuOuterId ? '['+ row.skuOuterId + ']' :'')+ row.skuCName : '\n'+(row.invCNumber?'['+ row.invCNumber + ']':'');
				val = name + num;
			}
			return val || '&#160;';
		},
		localGoodsFmt: function(val, opt, row){
			if(val) {
				_grid.goodsInfoHandle(opt.rowId);
				return val;
			} else if(row.invNumber) {
				if(row.invSpec) {
					return row.invNumber + ' ' + row.invName + '_' + row.invSpec;
				} else {
					return row.invNumber + ' ' + row.invName;
				}
			} else {
				return '&#160;';
			}
		},
		buyerNameFmatter: function(val, opt, row){
			if(val){
				val = '<a target="_blank" class="" href="http://www.taobao.com/webww/ww.php?ver=3&amp;touid='+ val +'&amp;siteid=cntaobao&amp;status=1&amp;charset=utf-8&amp;scene=taobao_shop"><img src="http://amos.alicdn.com/online.aw?v=2&amp;uid='+ val +'&amp;site=cntaobao&amp;s=2&amp;charset=utf-8" alt="点击这里给我发消息" border="0"></a>' + val;
			}
			return val || '&#160;';
		},
		remarkFmatter: function(val, opt, row){
			var identify = '' ,present = '' ,reject = '';
			if(val==1){
				identify = '<span class="icons ui-label ui-label-success">合</span>';
			}else if(val==-1){
				identify = '<span class="icons ui-label ui-label-success">拆</span>';
			}
			if(row.iszp == 1){
				present = '<span class="icons ui-label ui-label-success">赠</span>';
			}
			if(row.refund == 1){
				reject = '<span class="icons ui-label ui-label-tips">退</span>'
			}
			return identify + reject + present;
		},
		prstatusFmatter: function(val, opt, row){
			if(val == 1){
				return "货到付款";
			}
			else{
				return "非货到付款";
			}
		}
	}, 
	_page = {
		$more: $('#more'), // 按钮 - 更多
		$storeName: $('#storeName'), // 下拉框 - 网店名称
		$matchCon: $('#matchCon'), // 输入框 - 查询条件
		$beginDate: $('#filter-fromDate'), // 开始日期
		$endDate: $('#filter-toDate'), // 结束日期
		$tradeType: $('#tradeType'), // 下拉框 - 交易类型
		$shippingMethod: $('#shippingMethod'), // 下拉框 - 运送方式
		$shippingStatus: $('#shippingStatus'), // 下拉框 - 发货状态
		$search: $('.js-search'), // 按钮 - 查询
		$loadManual: $('#loadManual'), // 按钮 - 手工下载
		$audit: $('#audit'), // 按钮 - 审核
		$revAudit: $('#revAudit'), // 按钮 - 反审核
		$shipments: $('#shipments'), // 按钮 - 发货
		$print: $('#print'), // 按钮 - 打印发货单
		$printWaybill: $('#printWaybill'), //按钮 - 打印运单
		$printPhBill : $('#printPhBill'),//按钮 -  打印配货单
		$batchEdit: $('#batchEdit'), //按钮 - 批量修改
		$batchPrint: $('#batchPrint'),//按钮 - 打印
		$checkRelative: $('#checkRelative'), // 按钮 - 下查
		$checkRange: $('#checkRange'), //按钮 - 检查快递送达
		$makeSaleOrder: $('#makeSaleOrder'), //按钮 - 补销售单
		$addNewRefund: $('#addNewRefund'), //按钮 - 生成退货单
		$makeRefundOrder: $('#makeRefundOrder'), //按钮 - 生成退货单
		$logistics: $('#logistics'), //物流公司
		$auditStatus: $('#auditStatus'), //审核状态
		$delete: $('#delete'), //批量删除
		$grid: $('#grid'),
		$page: $('#page'),
		$orderDetail: $('#orderDetail'),
		$gridDetail: $('#gridDetail'),
		$pageDetail: $('#pageDetail'),
		$orderIdCloud: $('#orderIdCloud'), //查询条件 网上订单号
		$invCName: $('#invCName'), //查询条件 宝贝名称
		$buyerName: $('#buyerName'), //查询条件 买家昵称
		$deliveryName: $('#deliveryName'),//查询条件 收货人名
		$mobile: $('#mobile'),//查询条件 买家手机
		$buyerDesc: $('#buyerDesc'),//查询条件 买家留言
		$salerDesc: $('#salerDesc'), //查询条件 卖家备注	
		$expressNum : $('#expressNum'),//物流单号
		$hasBuyerDesc: $('#hasBuyerDesc'), //查询条件 买家勾选	
		$hasSalerDesc: $('#hasSalerDesc'), //查询条件 卖家勾选
		$hasExpressNum: $('#hasExpressNum'), //查询条件 物流单号勾选	
		$buyerEmail: $('#buyerEmail'), //买家邮箱
		$toName: $('#toName'), //收件人名称
		$toTel: $('#toTel'), //收件人电话
		$toPhone: $('#toPhone'), //收件人手机
		$toPostcode: $('#toPostcode'), //邮编
		$toProvince: $('#toProvince'), //省
		$toCity: $('#toCity'), //市
		$toArea: $('#toArea'), //区
		$toAddress: $('#toAddress'), //详细地址
		$buyerRemark : $('#buyerRemark'),//买家备注
		$sellerRemark : $('#sellerRemark'),//卖家备注
		$storageAuto :$('.storageAuto'),//仓库下拉框
		$amount:$('#amount'),//应收金额
		$realIncome:$('#realIncome'),//实收金额
		$shipmentsFree:$('#shipmentsFree'),//运费
		$logisticsDetail : $('#logistics_Detail'),//物流公司Detail
		$shippingMethodDetail : $('#shippingMethod_Detail'),//运送方式Detail
		$detailSave : $('#detailSave'),//保存联系方式
		$sellerFlag : $('#sellerFlag'),//旗帜
		$cashDelivery : $('#cashDelivery'),//货到付款
		$premiumStatus : $('#premiumStatus'),//赠品状态
		$refundStatus: $('#refundStatus'), // 下拉框 - 退款状态
		$mayPrint: $('#mayPrint'), // 查询条件 可打印
		$refresh: $('#refresh'), //刷新按钮
		$logisticsName: $('#logisticsName'),//查询条件  物流公司
		$outStatus: $('#outStatus'), // 下拉框 - 出库状态
		$printExpressSetting: $('#printExpressSetting'),  //按钮  打印设置
		$mergeList: $('#mergeList'),//按钮   合并订单
		$splitList: $('#splitList'),//按钮   拆分订单
		$getRookie: $('#getRookie'),//按钮	 获取菜鸟单号
		$exports: $('#exports'),//导出按钮
		$giveawayAdd: $("#giveawayAdd"),//按钮 赠品添加
		init : function() {
			switch (handle) {
				case '1':
					this.mod_PageConfig = Public.mod_PageConfig.init('onlineOrderList');//页面配置初始化
					break; //订单处理
				case '2':
					this.mod_PageConfig = Public.mod_PageConfig.init('onlineOrderList2');//页面配置初始化
					break; //打单发货
				default:
					this.mod_PageConfig = Public.mod_PageConfig.init('onlineOrderList4');
					break;
			}
			this.$checkRelative.hide();
			this.$more.click();
			this.$matchCon.placeholder();
			this.$beginDate.val(system.startDate + " 00:00").datepicker({
				onSelectTime:function(){
					this.trigger('close.xdsoft');
					$('.js-search').trigger('click');
				}/*,
				onSelectDate:function(){
					this.trigger('close.xdsoft');
					$('.js-search').trigger('click');
				}*/
				,onChangeDateTime:function(){
					var beginDate = _page.$beginDate.val();
					var endDate = _page.$endDate.val();
					if(beginDate && endDate && (beginDate > endDate)){
						defaultPage.Public.tips({type : 2,content : "查询起始日期应该小于截止日期！"});
						_page.$beginDate.val('');
						return;
					}
					$('.change-date').find('.cur').removeClass('cur');
				}
			});
			this.$endDate.val(system.endDate + " 23:59").datepicker({
				onSelectTime:function(){
					this.trigger('close.xdsoft');
					$('.js-search').trigger('click');
				}/*,
				onSelectDate:function(){
					this.trigger('close.xdsoft');
					$('.js-search').trigger('click');
				}*/
				,onChangeDateTime:function(){
					var beginDate = _page.$beginDate.val();
					var endDate = _page.$endDate.val();
					if(beginDate && endDate && (beginDate > endDate)){
						defaultPage.Public.tips({type : 2,content : "查询起始日期应该小于截止日期！"});
						_page.$endDate.val('');
						return;
					}
					$('.change-date').find('.cur').removeClass('cur');
				}
			});
			this.storageCombo = Business.storageCombo(this.$storageAuto,{userData:{system:system}});
			this.logisticsDetailCombo = Business.logisticCombo(this.$logisticsDetail,{width:112, userData:{system:system}});
			this.shippingMethodDetailCombo = this.getCombo(this.$shippingMethodDetail, dataHandle.getShippingMethod());
			_grid.queryConditions.beginDate = this.$beginDate.val();
			_grid.queryConditions.endDate = this.$endDate.val();
			_grid.init();// 初始化表格
			uiHandle.init();
			mod_AreasCombo.init(_page.$toProvince,_page.$toCity,_page.$toArea,function(){
				_page.provinceCombo = mod_AreasCombo.provinceCombo;
				_page.cityCombo = mod_AreasCombo.cityCombo;
				_page.areaCombo = mod_AreasCombo.areaCombo;
			});
			THISPAGE.calTotal = dataHandle.calTotalDetail;//这个提供给公共组件使用
		},
		getCombo : function(obj, data , opts) {
			var opts = $.extend(true, {
				data : data,
				text : 'name',
				value : 'id',
				width : 112,
				defaultSelected : 0,
				addOptions : {
					text : '(所有)',
					value : -1
				},
				cache : false
			}, opts);
			return obj.combo(opts).getCombo();
		}

	}, 
	uiHandle = {
		init:function(){
			this.btnControl();
			this.comboControl();
			this.gridColControl();
		},
		btnControl:function(){
			$('.tools').find('.ui-btn').hide();
			$('.tools').find('.ui-btn-menu').hide();
			switch (handle) {
				case '1':
					_page.$loadManual.show();
					_page.$audit.show();
					_page.$revAudit.show();
					_page.$checkRange.show();
					_page.$batchEdit.show().parent().show();
					_page.$loadManual.show();
					_page.$mergeList.show();
					_page.$splitList.show();
					_page.$exports.show();
					_page.$giveawayAdd.show();
					break; //未审核
				case '2':
					_page.$revAudit.show();
					_page.$shipments.show();
					_page.$batchPrint.show().parent().show();
					_page.$makeSaleOrder.show();
					_page.$printExpressSetting.show();
					_page.$mergeList.show();
					_page.$splitList.show();
					_page.$exports.show();
					_page.$getRookie.show();
					break; //已审核
				case '3':
					_page.$revAudit.show();
					_page.$makeSaleOrder.show();
					// _page.$addNewRefund.show();
					break; //已审核+未发货
				default:
					_page.$loadManual.show();
					// _page.$printWaybill.show().parent().show();
					break;
			}
		},
		comboControl:function(){
			_page.$logisticsCombo = Business.logisticCombo(_page.$logistics);//物流公司下拉框，暂时隐藏
			_page.$storeNameCombo = Business.storeCombo(_page.$storeName, {//网店下拉框
				width: 100,
				addOptions: {
					text: '全部网店',
					value: -1
				},
				callback: {//下拉框的值变化会会触发查询按钮
					onChange: function(data) {
						$('.js-search').trigger("click");
					}
				}
			});
			//货到付款
			_page.$cashDeliveryCombo = _page.getCombo(_page.$cashDelivery, dataHandle.getCashDelivery(), {
				width : 155,
				defaultSelected: 0,
				addOptions: {
					text: '全部',
					value: -1
				},
				callback : {
					onListClick: function(){
						$('#more_searchCn').trigger("click");
					}		
				}
			});
			switch (handle) {
				case '1':
					_page.$tradeTypeCombo = _page.getCombo(_page.$tradeType, dataHandle.getTradeType(), {
						defaultSelected: 0,
							callback: { //下拉框的值变化会会触发查询按钮
								onChange: function(data) {
									$('.js-search').trigger("click");
								}
							}					
					});
					_page.$tradeTypeCombo.selectByValue('LOCAL_WAIT_SELLER_SEND_GOODS');
					//_page.$tradeTypeCombo.disable();
					//审核状态
					_page.$auditStatusCombo = _page.getCombo(_page.$auditStatus, dataHandle.getAuditStatus(), {
						defaultSelected: 2,
						callback: { //下拉框的值变化会会触发查询按钮
							onChange: function(data) {
								$('.js-search').trigger("click");
							}
						}
					});
					//赠品状态
					_page.$premiumStatusCombo = _page.getCombo(_page.$premiumStatus, dataHandle.getPremiumStatus(), {
						width : 155,
						defaultSelected: 0,
						addOptions: {
							text: '全部',
							value: -1
						},
						callback : {
							onListClick: function(){
								$('#more_searchCn').trigger("click");
							}		
						}
					});
					//$('#auditStatus').closest('li').hide();
					$('#shippingStatus').closest('li').hide();
					$('#outStatus').closest('li').hide();
					$('#refundStatus').closest('li').hide();
					break; //未审核
				case '2':
					$('#auditStatus').closest('li').hide();
					$('#tradeType').closest('li').hide();
					// $('#shippingStatus').closest('li').hide();
					$('#refundStatus').closest('li').hide();
					$('#premiumStatus').closest('li').hide().siblings('.label-wrap').hide();
					$('#emptyDiv').closest('li').hide();//空标签。占位。。
					_page.$mayPrintCombo = _page.getCombo(_page.$mayPrint,dataHandle.getMayPrint(),{
						defaultSelected: 0,
						addOptions: {
							text: '待打印单据',
							value: -1
						},
						callback: { //下拉框的值变化会会触发查询按钮
							onChange: function(data) {
								$('.js-search').trigger("click");
							}
						}
					});
					_page.$shippingStatusCombo = _page.getCombo(_page.$shippingStatus,dataHandle.getShippingStatus(),{
						defaultSelected: 0,
						addOptions : {
							text : '发货状态',
							value : -1
						},
						callback: { //下拉框的值变化会会触发查询按钮
							onChange: function(data) {
								$('.js-search').trigger("click");
							}
						}						
					});	
					//物流公司
					_page.$logisticsNameCombo = Business.logisticCombo(_page.$logisticsName, {
						width: 112,
						defaultSelected: 0,
						addOptions : {
							text : '物流公司',
							value : -1
						},
						userData: {
							system: system
						},
						formatText: function(data) {
							return data.name;
						},
						callback: { //下拉框的值变化会会触发查询按钮
							onChange: function(data) {
								$('.js-search').trigger("click");
							}
						}	
					});
					//出库状态，outStatus
					_page.$outStatusCombo = _page.getCombo(_page.$outStatus,dataHandle.getoutStatus(),{
						defaultSelected: 0,
						addOptions : {
							text : '出库状态',
							value : -1
						},
						callback: { //下拉框的值变化会会触发查询按钮
							onChange: function(data) {
								$('.js-search').trigger("click");
							}
						}						
					});	
					break; //已审核
				case '3':
					_page.$tradeTypeCombo = _page.getCombo(_page.$tradeType, dataHandle.getTradeType(),{defaultSelected: 0});
					_page.$refundStatusCombo = _page.getCombo(_page.$refundStatus, dataHandle.getRefundStatus());
					_page.$shippingMethodCombo = _page.getCombo(_page.$shippingMethod,dataHandle.getShippingMethod());
					$('#auditStatus').closest('li').hide();
					$('#shippingStatus').closest('li').hide();
					$('#premiumStatus').closest('.ctn-wrap').hide().siblings('.label-wrap').hide();
					break; //已审核+未发货
				default:
				 	_page.$tradeTypeCombo = _page.getCombo(_page.$tradeType, dataHandle.getTradeType(),{defaultSelected: 0});
					_page.$shippingMethodCombo = _page.getCombo(_page.$shippingMethod,dataHandle.getShippingMethod());
					_page.$shippingStatusCombo = _page.getCombo(_page.$shippingStatus,dataHandle.getShippingStatus());
					_page.$outStatusCombo = _page.getCombo(_page.$outStatus,dataHandle.getoutStatus());//出库状态。
					// $('.ul-inline').find('li:eq(5)').after('<li class="line"></li>')
					_page.$matchCon.width(392);
					$('#refundStatus').closest('li').hide();
					break;
			}
			_page.$sellerFlagCombo = _page.getCombo(_page.$sellerFlag,dataHandle.getFlagList(), {
				disStrict: true,//非严格模式
				width: 50,
				addOptions : {
					text : '(空)',
					value : -1
				},
				listHeight: 182,
				callback : {
						onListClick: function(){
							$('#more_searchCn').trigger("click");
							var $selectedLi = this.list.find('.on');
							var imgSrc = $selectedLi.find('img').prop('src');
							var index = $selectedLi.index() - 1;
							var bgSrc = '';
							if(index >= 0){
								bgSrc = "url('http://a.tbcdn.cn/sys/common/icon/trade/op_memo_"+ index +".png') no-repeat 10px 8px"
							}
							this.input.css({
								background: bgSrc
							}).data('index', index + '');
						}
				}
			});
			_page.goodsCombo = Business.billGoodsCombo($('.goodsAuto'));
			_page.skuCombo = Business.billskuCombo($('.skuAuto'));
		},
		gridColControl:function(){
			/*switch (handle) {
				case '1':
					_page.$grid.jqGrid('hideCol','orderNo');
					_page.$grid.jqGrid('hideCol','checkName');
					_page.$grid.jqGrid('hideCol','printStatus');
					_page.$grid.jqGrid('hideCol','printExpStatus');
					_page.$grid.jqGrid('hideCol','deliveryTime');
					_page.$grid.jqGrid('hideCol','billNo');
					_page.$grid.jqGrid('hideCol','reBillNo');
					_page.$grid.jqGrid('hideCol','refundStatus');
					_page.$grid.jqGrid('hideCol','refund');
					_page.$grid.jqGrid('hideCol','status');
					break; //未审核
				case '2':
					_page.$grid.jqGrid('hideCol','orderNo');
					_page.$grid.jqGrid('hideCol','reBillNo');
					_page.$grid.jqGrid('hideCol','refundStatus');
					_page.$grid.jqGrid('hideCol','status');
					_page.$grid.jqGrid('hideCol','deliveryTime');
					break; //已审核
				case '3':
					_page.$grid.jqGrid('hideCol','printStatus');
					_page.$grid.jqGrid('hideCol','printExpStatus');
					break; //已审核+未发货
				default:
					break;
			}*/
		}
	},
	_event = {
		init : function() {
			//仓库和单位下拉显示
			$('.grid-wrap').on('click', '.ui-icon-triangle-1-s', function(e){
				e.stopPropagation();
				var $input = $(this).siblings();
				var _combo = $input.getCombo();
				setTimeout(function(){ 
					_combo.active = true;
					_combo.doQuery();
				}, 10);
			});
			// 查询
			$('.js-search').click(function(e) {
				e.preventDefault();
				_grid.queryConditions.matchCon = _page.$matchCon.val() === '按网上订单号、卖家备注等查询' ? '': _page.$matchCon.val();
				_grid.queryConditions.beginDate = _page.$beginDate.val();
				_grid.queryConditions.endDate = _page.$endDate.val();

				_grid.queryConditions.orderIdCloud = _page.$orderIdCloud.val();
				_grid.queryConditions.invNameCloud = _page.$invCName.val();
				_grid.queryConditions.buyerNumber = _page.$buyerName.val();
				_grid.queryConditions.deliveryName = _page.$deliveryName.val();
				_grid.queryConditions.mobile = _page.$mobile.val();
				_grid.queryConditions.buyerDesc = _page.$buyerDesc.val();
				_grid.queryConditions.salerDesc = _page.$salerDesc.val();
				_grid.queryConditions.expressNum = _page.$expressNum.val();//物流单号
				_grid.queryConditions.buyerDescEmpty = $('#hasBuyerDesc')[0].checked == false ? 0 : 1;//买家备注勾选
				_grid.queryConditions.salerDescEmpty = $('#hasSalerDesc')[0].checked == false ? 0 : 1;//卖家备注勾选	
				_grid.queryConditions.expressNumEmpty  = $('#hasExpressNum')[0].checked == false ? 0 : 1;//物流单号勾选	


				if(_page.$tradeTypeCombo) _grid.queryConditions.status = _page.$tradeTypeCombo.getValue()!=-1?_page.$tradeTypeCombo.getValue():'';
				if(_page.$refundStatusCombo) _grid.queryConditions.refundStatus = _page.$refundStatusCombo.getValue()!=-1?_page.$refundStatusCombo.getValue():'';
				// if(_page.$shippingStatusCombo) _grid.queryConditions.deliveryStatus = _page.$shippingStatusCombo.getValue()!=-1?_page.$shippingStatusCombo.getValue():'';
				if(_page.$sellerFlagCombo) _grid.queryConditions.sellerFlag = _page.$sellerFlagCombo.input.data('index') || -1;
				if(_page.$storeNameCombo)_grid.queryConditions.cloudStoreId = _page.$storeNameCombo.getValue();
				if(_page.$shippingMethodCombo)_grid.queryConditions.deliveryMethod = _page.$shippingMethodCombo.getValue();
				if(_page.$auditStatusCombo) _grid.queryConditions.checkStatus = _page.$auditStatusCombo.getValue()!=-1?_page.$auditStatusCombo.getValue():'';
				if(_page.$shippingStatusCombo) _grid.queryConditions.sended = _page.$shippingStatusCombo.getValue()!=-1?_page.$shippingStatusCombo.getValue():-1;
				if(_page.$outStatusCombo) _grid.queryConditions.outStatus = _page.$outStatusCombo.getValue()!=-1?_page.$outStatusCombo.getValue():-1;//出库状态
				if(_page.$logisticsNameCombo) _grid.queryConditions.expressId = _page.$logisticsNameCombo.getValue()!=-1?_page.$logisticsNameCombo.getValue():'';
				if(_page.$cashDeliveryCombo) _grid.queryConditions.iscod = _page.$cashDeliveryCombo.getValue();
				if(_page.$premiumStatusCombo) _grid.queryConditions.iszp = _page.$premiumStatusCombo.getValue();
				if(_page.$mayPrintCombo){
					switch (_page.$mayPrintCombo.getValue()) {
					case "0":
						_grid.queryConditions.printExpStatus = 1;
						_grid.queryConditions.printPhStatus = -1;
						_grid.queryConditions.printStatus = -1;
						break;
					case "1":
						_grid.queryConditions.printExpStatus = -1;
						_grid.queryConditions.printPhStatus = 1;
						_grid.queryConditions.printStatus = -1;
						break;
					case "2":
						_grid.queryConditions.printExpStatus = -1;
						_grid.queryConditions.printPhStatus = -1;
						_grid.queryConditions.printStatus = 1;
						break;
					default:
						_grid.queryConditions.printExpStatus = -1;
						_grid.queryConditions.printPhStatus = -1;
						_grid.queryConditions.printStatus = -1;
						break;
					}
				}
				_page.$grid.jqGrid('setGridParam', {page:1,url : _grid.requireURL,postData : _grid.queryConditions}).trigger("reloadGrid");
			});
			//刷新
			_page.$refresh.click(function(event) {
				$('.js-search').trigger("click");
			});
			//修改订单时间
			$('.js-changeDate').click(function(e) {
				e.preventDefault();
				var $this = $(this);
				var today = new Date();
				var cur_date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
				var todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate());
				todayEnd.addDays(1);
				
				switch($this.data('type')){
					case 1: 
						_page.$beginDate.val(cur_date.format("yyyy-MM-dd hh:mm"));
						_page.$endDate.val(todayEnd.format("yyyy-MM-dd hh:mm"));
						$('.js-search').trigger("click");
						$this.parent().addClass('cur').siblings().removeClass('cur');
						break;
					case 2: 
						var today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
						today.addDays(-3);
						_page.$beginDate.val(today.format("yyyy-MM-dd hh:mm"));
						_page.$endDate.val(todayEnd.format("yyyy-MM-dd hh:mm"));
						$('.js-search').trigger("click");
						$this.parent().addClass('cur').siblings().removeClass('cur');;
						break;
					case 3:
						var today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
						today.addDays(-7);
						_page.$beginDate.val(today.format("yyyy-MM-dd hh:mm"));
						_page.$endDate.val(todayEnd.format("yyyy-MM-dd hh:mm"));
						$('.js-search').trigger("click");
						$this.parent().addClass('cur').siblings().removeClass('cur');;
						break;
					case 4:
						var today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
						today.addMonths(-1);
						_page.$beginDate.val(today.format("yyyy-MM-dd hh:mm"));
						_page.$endDate.val(todayEnd.format("yyyy-MM-dd hh:mm"));
						$('.js-search').trigger("click");
						$this.parent().addClass('cur').siblings().removeClass('cur');;
						break;
					default:
						break;
				}

			});
			//鼠标移开时隐藏展开的列表
			$('.js-hideDetailList').on('mouseleave.menuEvent',function(e){
				$(this).removeClass('ui-btn-menu-cur');
			});					
			//回车查询
			$('.mod-search').find('input').on('keydown',function(e){
				if(e.keyCode === 13){
					_page.$search.trigger('click');
				}
			});
			//订单明细修改
			_page.$gridDetail.on('click','.ui-icon-plus',function(e){
				e.preventDefault();
				_grid.cancelGirdEdit();
				//新增分录
				var rowId = $(this).closest('tr')[0].id;
				var newId = _page.$gridDetail.find('tbody tr').length;
				var datarow = { id: THISPAGE.newId };
				var su = _page.$gridDetail.jqGrid('addRowData', THISPAGE.newId, datarow, 'after', rowId);
				if(su) {
					$(this).parents('td').removeAttr('class');
					$(this).parents('tr').removeClass('selected-row ui-state-hover');
					_page.$gridDetail.jqGrid('resetSelection');
					THISPAGE.newId++;
				}
			})
			.on('click','.ui-icon-trash',function(e){
				e.preventDefault();
				_grid.cancelGirdEdit();
				//删除分录
				_grid.cancelGirdEdit();
				var su = _page.$gridDetail.jqGrid('delRowData', $(this).closest('tr')[0].id);
				if(su) {
					dataHandle.calTotalDetail();
					dataHandle.detailUpdate();
				};
			});
			// 手工下载
			_page.$loadManual.click(function(e) {
				e.preventDefault();
				if (!Business.verifyRight('ORDERCLOUD_DOWNLOAD')) {
					return ;
				};
				if(_page.$loadManual.hasClass('ui-btn-dis')){
					defaultPage.Public.tips({type:2,content:'订单正在下载。。。'});
					return;
				}
				_page.$loadManual.addClass('ui-btn-dis').html('正在下载');
				$.dialog({
					width : 540,
					height : 370,
					title : '手工下载 ',
					content : 'url:/online-store/manualDownload.jsp',
					data : {
						callback:function(param){
							var _pData = {
								sid : param.storeId
							}
							if(param.bdate){
								_pData.start_created = param.bdate;
							}
							if(param.edate){
								_pData.end_created = param.edate;
							}
							if(param.number){
								_pData.number = param.number;
							}
							Public.ajaxGet('../scm/eshop.do?cmd=trades.sold.get', _pData , function(data) {
								if (data.status === 200) {
									if(data.data.items){
										var _Scount = 0 ,_Fcount = 0;
										for(var i= 0,len = data.data.items.length;i<len;i++){
											
												_Scount += data.data.items[i].successCount||0;
													
												_Fcount += data.data.items[i].failedCount||0;
												
											
										}
										var content = (_Scount?_Scount +'个网店的订单下载完毕<br />':'');
										var type = 0;
										if( _Fcount != 0 ){
											content += _Fcount+'个网店授权失败或者已过期，请到网店记录页面重新授权';
											type = 2;
										}
										defaultPage.Public.tips({type : type , content:content});
										_page.$grid.trigger('reloadGrid');
									}
									_page.$loadManual.removeClass('ui-btn-dis').html('手工下载');
									
								}else{
									defaultPage.Public.tips({type : 1,content : data.msg});
									_page.$loadManual.removeClass('ui-btn-dis').html('手工下载');
								}
							});
						}
					},
					lock : true,
					okVal:'开始下载',
					ok : function() {
						return this.content.callback();
					},
					cancel : function(){
						_page.$loadManual.removeClass('ui-btn-dis').html('手工下载');
						return true;
					}
				});
			});
			if (billRequiredCheck) {
				// 审核
				_page.$audit.click(function(e) {
							e.preventDefault();
							if (!Business.verifyRight('ORDERCLOUD_CHECK')) {
								return ;
							};
							var arr_ids = $('#grid').jqGrid('getGridParam','selarrrow');
							var voucherIds = arr_ids.join();
							if (!voucherIds) {
								defaultPage.Public.tips({type : 2,content : "请先选择需要审核的项！"});
								return;
							}
							for(var i=0; i<arr_ids.length; i++){
								var rowData = $('#grid').jqGrid('getRowData',arr_ids[i]);
								if(rowData.refund === '是'){
									$.dialog.confirm('存在已申请了退款的订单，是否继续审核？', function(){
										refundAudit(voucherIds);
									});
									return;
								}
							}
							refundAudit(voucherIds);
						});
				function refundAudit(voucherIds){
					Public.ajaxPost('/scm/orderCloud.do?action=checkOrderCloud',{"orderId" : voucherIds},
					function(data) {
						if (data.status === 200) {
							/*var result = '';
							for ( var i = 0, len = arr_ids.length; i < len; i++) {
								$('#grid').setCell(arr_ids[i],'checkName',system.realName);
								$('#grid').setCell(arr_ids[i],'checkDate',system.endDate);
								$('#grid').setCell(arr_ids[i],'checked',1);	
							}*/
							var result = '';
							if(data.data.failedMsg){
								result += '<p class="red">'+ data.data.failedMsg + '</p>';
							}
							if (data.data.successMsg) {
								result += '<p>'+ data.data.successMsg + '</p>';
							}
							defaultPage.Public.tips({content : result});
							_page.$grid.trigger('reloadGrid');
						} else {
							defaultPage.Public.tips({type : 1,content : data.msg});
						}
					});
				}
				// 反审核
				_page.$revAudit.click(function(e) {
							e.preventDefault();
							if (!Business.verifyRight('ORDERCLOUD_UNCHECK')) {
								return ;
							};
							var arr_ids = $('#grid').jqGrid('getGridParam','selarrrow');
							var voucherIds = arr_ids.join();
							if (!voucherIds) {
								defaultPage.Public.tips({type : 2,content : "请先选择需要反审核的项！"});
								return;
							}
							Public.ajaxPost('/scm/orderCloud.do?action=rsCheckOrderCloud',{"orderId" : voucherIds},
											function(data) {
												if (data.status === 200) {
													var result = '';
													/*for ( var i = 0, len = arr_ids.length; i < len; i++) {
														$('#grid').setCell(arr_ids[i],'checkName',"&#160;");
														$('#grid').setCell(arr_ids[i],'checkDate',"&#160;");
														$('#grid').setCell(arr_ids[i],'checked',"&#160;");	
													}
													if((data.data.successArr.length > 0) || (data.data.successArr.length == 0)){
														result += '<p>'+data.data.successArr.length+'个订单反审核成功!</p>';
													}
													if(data.data.failedArr.length){
														result += '<p ></p>';
														for (var resultItem in data.data.failedArr) {
															if(typeof data.data.failedArr[resultItem] === 'function') continue;//兼容ie8
															resultItem = data.data.failedArr[resultItem];
															result += '<p class="red">'+ resultItem.wdOrderNo +'反审核失败，'+ resultItem.msg +'</p>';
														};
													}
													defaultPage.Public.tips({content : result});
													_page.$grid.trigger('reloadGrid');*/
													var failedMsg = data.data.failedMsg;
													if(data.data.failedMsg){
														// result += '<p>'
														// var reg = /(\n)/g;
														// failedMsg = failedMsg.replace(reg,"<p></p>");
														result += '<p class="red">'+ data.data.failedMsg + '</p>';
													}
													if (data.data.successMsg) {
														result += '<p>'+ data.data.successMsg + '</p>';
													}
													defaultPage.Public.tips({content : result});
													_page.$grid.trigger('reloadGrid');
												} else {
													defaultPage.Public.tips({type : 1,content : data.msg});
												}
											});
						});
			} else {
				_page.$audit.hide();
				_page.$revAudit.hide();
			}
			;
			// 发货
			_page.$shipments.click(function(e) {
				e.preventDefault();
				if (!Business.verifyRight('ORDERCLOUD_DELIVERY')) {
					return ;
				};
				var _title = '物流发货';
				var _arrData = [];
				var arr_ids = $('#grid').jqGrid('getGridParam','selarrrow');
				if(!arr_ids.length){
					defaultPage.Public.tips({type:2, content : '请选择需要发货的订单'});
					return;
				}
				/*if(arr_ids.length !== 1){
					if(!arr_ids.length)defaultPage.Public.tips({type:2, content : '请选择需要发货的订单'});
					else defaultPage.Public.tips({type:2, content : '只支持单个订单发货'});
					return;
				}*/
				if(!checkHandle.sendCheck(arr_ids)){
					return;
				};
				for( var i = 0, len = arr_ids.length; i < len; i++){
					_arrData.push($('#grid').jqGrid('getRowData',arr_ids[i]));
				}
				var voucherIds = arr_ids.join();
				var _popW = 800;//300;//700
				var _popH = 320;//200;//260
				$.dialog({
					title: _title,
					id: "Prompt",
					min:false,
					max:false,
					width:_popW,
					height:_popH,
					cache:false,
					lock:true,
					//content: ['<div style="margin-bottom:5px;font-size:12px">', t, "</div>", "<div>", '<input value="', s, '" style="width:18em;padding:6px 4px" />', "</div>"].join(""),
					content:'url:shipmentsManage.jsp',
					data:{
						voucherIds :voucherIds,
						rowData:_arrData,
						callback:function(successItems, win) {
							for ( var k = 0, dlen = successItems.length; k < dlen; k++){
								var rowItem = successItems[k];
								_page.$grid.setCell(rowItem.orderId,'expressId',rowItem.expressId);
								_page.$grid.setCell(rowItem.orderId,'express',rowItem.expressId);
								_page.$grid.setCell(rowItem.orderId,'receiver',rowItem.receiver);
								_page.$grid.setCell(rowItem.orderId,'expressNum',rowItem.expressNum);
								_page.$grid.setCell(rowItem.orderId,'deliveryStatus',1);
								_page.$grid.setCell(rowItem.orderId,'delivery',system.realName);
								_page.$grid.setCell(rowItem.orderId,'deliveryTime',system.endDate);
								_page.$grid.setCell(rowItem.orderId,'printStatus',rowItem.printStatus==""?0:1);
								_page.$grid.setCell(rowItem.orderId,'printExpStatus',rowItem.printStatus==""?0:1);
							}
							//win.api.close();
							_page.$grid.trigger('reloadGrid');
						}
					}					
				});
				return;
			});
			// 打印发货单
			// page.$print.click(function(e) {
			// 	e.preventDefault();
			// 	if (!Business.verifyRight('ORDERCLOUD_PRINT')) {
			// 		return ;
			// 	};
			// 	var arr_ids = $('#grid').jqGrid('getGridParam','selarrrow');
			// 	if(arr_ids.length !== 1){
			// 		if(!arr_ids.length){
			// 			defaultPage.Public.tips({type:2, content : '请选择需要打印的订单'});
			// 			return;
			// 		}
			// 	}
			// 	//检查是否包含已打印的发货单
			// 	var hasPrinted = false;
			// 	for (var i = arr_ids.length - 1; i >= 0; i--) {
			// 		var _data = $('#grid').jqGrid('getRowData',arr_ids[i]);
			// 		if(!_data.checked){
			// 			defaultPage.Public.tips({type:2, content : '请选择已审核的订单'});
			// 			return;
			// 		}
			// 		if(_data.printStatus){
			// 			hasPrinted = true;
			// 		}
			// 	};
			// 	if(hasPrinted){
			// 		defaultPage.Public.tips({type:2, content : '包含有已打印的发货单！'});
			// 	}
			// 	var voucherIds = arr_ids.join();
			// 	Public.print({
			// 		title : '打印发货单',
			// 		$grid : $('#grid'),
			// 		pdf : '/scm/orderCloud.do?action=toPdf',
			// 		billType : 10205,
			// 		filterConditions : {id:voucherIds}
			// 	});
			// });
			//自定义打印
			// $('.js-customPrint').click(function(e) {
			// 	e.preventDefault();
			// 	var $this = $(this);
			// 	var billType = $this.data('type');
			// 	switch(billType){
			// 		case 1: 
			// 			var arr_ids = $('#grid').jqGrid('getGridParam','selarrrow')
			// 			var idSet = arr_ids.join();
			// 			/*for (var i = 1; i < arr_ids.length + 1; i++) {
			// 				if(i%10 == 0){
			// 					idSet.
			// 				}
			// 			};*/
			// 			kdrprint.doPrint(billclass['发货单'], 0 ,idSet);
			// 		break;
			// 		case 2: 
			// 			var arr_ids = $('#grid').jqGrid('getGridParam','selarrrow')
			// 			var idSet = arr_ids.join();
			// 			var _rData = _page.$grid.jqGrid('getRowData',arr_ids[0]);
			// 			if(_rData.expressId <= 0){
			// 				defaultPage.Public.tips({type:2, content : '请先选择订单【'+_rData.orderIdCloud+'】的物流公司！'});
			// 				return false;
			// 			}
			// 			for (var i = 0; i < system.logisticInfo.length; i++) {
			// 				var  logistic = system.logisticInfo[i];
			// 				if(_rData.expressId == logistic.expressId){
			// 					kdrprint.doPrint(billclass['快递单'], logistic.expressType ,idSet);
			// 					break;
			// 				}
			// 			};
			// 		break;
			// 		case 3: 
			// 			var arr_ids = $('#grid').jqGrid('getGridParam','selarrrow')
			// 			idSet = arr_ids[0];
			// 			for (var i = 2; i <= arr_ids.length; i++) {
			// 				if(i%11 == 0){
			// 					idSet += '|' + arr_ids[i-1];
			// 				}else{
			// 					idSet += ',' + arr_ids[i-1];
			// 				}
			// 			};
			// 			kdrprint.doPrint(billclass['配货单'], 0 ,idSet);
			// 		break;
			// 	}
			// });
			//打印预览
			// $('.js-preview').click(function(e) {
			// 	e.preventDefault();
			// 	if (!Business.verifyRight('ORDERCLOUD_PRINT')) {
			// 		return ;
			// 	};
			// 	var $this = $(this);
			// 	var arr_ids = $('#grid').jqGrid('getGridParam','selarrrow');
			// 	if(arr_ids.length !== 1){
			// 		if(!arr_ids.length){
			// 			defaultPage.Public.tips({type:2, content : '请选择需要打印的订单'});
			// 			return;
			// 		}
			// 	}
			// 	var billType = $this.data('type');
			// 	var formclassid , idSet, expresstype;
			// 	switch(billType){
			// 		case 1: 
			// 			formclassid = billclass['发货单'];
			// 			idSet = arr_ids.join();
			// 		break;
			// 		case 2: 
			// 			formclassid = billclass['快递单'];
			// 			idSet = arr_ids.join();
			// 			var _rData = _page.$grid.jqGrid('getRowData',arr_ids[0]);
			// 			if(_rData.expressId <= 0){
			// 				defaultPage.Public.tips({type:2, content : '请先选择订单【'+_rData.orderIdCloud+'】的物流公司！'});
			// 				return false;
			// 			}
			// 			for (var i = 0; i < system.logisticInfo.length; i++) {
			// 				var  logistic = system.logisticInfo[i];
			// 				if(_rData.expressId == logistic.expressId){
			// 					expresstype = logistic.expressType;
			// 					break;
			// 				}
			// 			};
			// 		break;
			// 		case 3: 
			// 			formclassid = billclass['配货单'];
			// 			idSet = arr_ids[0];
			// 			for (var i = 2; i <= arr_ids.length; i++) {
			// 				if(i%11 == 0){
			// 					idSet += '|' + arr_ids[i-1];
			// 				}else{
			// 					idSet += ',' + arr_ids[i-1];
			// 				}
			// 			};
			// 			// idSet = arr_ids.join();
			// 		break;
			// 	}
				
			// 	var condition = {
			// 		idSet: idSet,
			// 		formclassid: formclassid,
			// 		templateid: 0,
			// 		expresstype: expresstype,
			// 		print: false
			// 	}

			// 	$.dialog({
			// 		title : '打印预览',
			// 		content : 'url:printPreview.jsp',
			// 		width : 850,
			// 		height : 480,
			// 		max : false,
			// 		min : false,
			// 		cache : false,
			// 		lock: true,
			// 		ok: false,
			// 		data:{
			// 			condition: condition,
			// 			callback:function(data){
			// 				//打印成功之后回调
			// 			}
			// 		}
			// 	});
			// });
			//批量修改
			$('.js-batchEdit').click(function(e) {
				e.preventDefault();
				if (!Business.verifyRight('ORDERCLOUD_DELIVERY')) {
					return ;
				};
				var arr_ids = _page.$grid.jqGrid('getGridParam','selarrrow');
				var $this = $(this);
				if(arr_ids.length !== 1){
					if(!arr_ids.length){
						defaultPage.Public.tips({type:2, content : '请选择需要修改物流的订单'});
						return;
					}
				}
				var orderIds = arr_ids.join();
				var _title = '批量修改';
				var _pop = $.dialog({
					title: _title,
					id: "Prompt",
					min:false,
					max:false,
					width:560,
					height:440,
					cache:false,
					lock:true,
					content:'url:batchEdit.jsp',
					data:{
						dataType:$this.data('type'),
						orderIds :orderIds,
						callback:function(ids,logisticsId,locationId){
							for (var i = 0; i < ids.length; i++) {
								var _id = ids[i];
								if(logisticsId){
									_page.$grid.jqGrid('setRowData', _id, {express: logisticsId});
								}
								if(locationId){
									orderDetailInit(_id, _page.$gridDetail);
								}
							};
							_pop.close();
						}
					}					
				});
				
				// switch($this.data('type')){
				// 	case 1: alert('1');break;
				// 	case 2: alert('2');break;
				// 	case 3: alert('3');break;
				// }
			});
			//点击查询条件中的更多，显示浮动框
			$("#more_searchCn").powerFloat({
				eventType: "click",
				reverseSharp: true,
				target: function(){
					return $("#searchCn");
				},
				width: 550,
				// offsets: {x:10,y:0},
				position: "4-1",
				showCall: function(e){
					$("#searchCn").css("top","38px");
					$("#searchCn").css("right","-10px");
					$("#searchCn").css("left","auto");
				}
			});
			$('#search_more').on('click',function(e){
				$.powerFloat.hide();
			});
			//点击取消按钮后，隐藏浮动框
			$('#cancel').on('click',function(e){
				$.powerFloat.hide();
			});
			// 打印快递单
			// page.$printWaybill.click(function(e) {
			// 	e.preventDefault();
			// 	if (!Business.verifyRight('ORDERCLOUD_PRINT')) {
			// 		return ;
			// 	};
			// 	var arr_ids = $('#grid').jqGrid('getGridParam','selarrrow');
			// 	if(arr_ids.length !== 1){
			// 		if(!arr_ids.length){
			// 			defaultPage.Public.tips({type:2, content : '请选择需要打印的订单'});
			// 			return;
			// 		}
			// 	}
			// 	//检查是否包含已打印的快递单
			// 	var hasPrinted = false;
			// 	for (var i = arr_ids.length - 1; i >= 0; i--) {
			// 		var _data = $('#grid').jqGrid('getRowData',arr_ids[i]);
			// 		if(_data.printExpStatus){
			// 			hasPrinted = true;
			// 		}
			// 	};
			// 	if(hasPrinted){
			// 		defaultPage.Public.tips({type:2, content : '包含有已打印的快递单！'});
			// 	}
			// 	if(!checkHandle.checkExpress(arr_ids)){
			// 		return;
			// 	}
			// 	var _data = $('#grid').jqGrid('getRowData',arr_ids[0]);
			// 	_data.templateId = _data.templateId ? _data.templateId : 0;
			// 	var voucherIds = arr_ids.join();
			// 	Public.print({
			// 		title : '打印快递单',
			// 		$grid : $('#grid'),
			// 		pdf : '',
			// 		billType : 10501,
			// 		defaultSelectValue:['id',Number(_data.templateId)],
			// 		filterConditions : {id:voucherIds}
			// 	});
			// });
			//获取菜鸟单号
			$('#getRookie').on('click',function(e){
				e.preventDefault();
				var $this = $(this);
				var billType = $this.data('type');
				var arr_ids = _page.$grid.jqGrid('getGridParam','selarrrow');
				var orderIds = arr_ids.join();
				if(arr_ids.length !== 1){
					if(!arr_ids.length){
						defaultPage.Public.tips({type:2, content : '请选择需要获取菜鸟单号的订单！'});
						return;
					}
				}
				var hasRepeat = {} , expressId, expressIds = [];
				for(var i = 0; i<arr_ids.length ; i++){
						var rowData = $('#grid').jqGrid('getRowData',arr_ids[i]);
						expressId = rowData.expressId;
						if(Number(expressId)==0){  //获取菜鸟单号时，物流公司不能为空
							defaultPage.Public.tips({type:2, content : '所选订单中存在物流公司为空，请先加上物流公司！'});
							return;
						}
						if(expressIds.indexOf(expressId) == -1){
							expressIds.push(expressId);
						}
					}
					expressIds = expressIds.join(); 
					Public.ajaxPost('/bs/express.do?action=checkExpressEnableWlb', {expressIds:expressIds}, function(data){
						if (data.status == 200) {
							$(this).ajaxPost('/scm/orderCloud.do?action=getLogisiticOrder', {orderIds:orderIds}, function(data){
								if (data.status == 200) {
									 Public.tips({content :  '操作成功！' + data.msg});
									//if(data.msg=='success'){
										for(var i = 0;i<data.items.length;i++){
											_page.$grid.jqGrid('setRowData', data.items[i].orderId, {expressNum: data.items[i].expressNum, printCheck: data.items[i].printCheck});
										}
									//}else{
									//	Public.tips({type:1, content : '操作失败！' + data.msg});
									//}
								} else {
									Public.tips({type:1, content : '操作失败！' + data.msg});
								}
							});
						}
						else{
							defaultPage.Public.tips({type:2, content : data.msg});
						}
					});
			});
			//自定义打印
			$('.js-customPrint').click(function(e) {
				e.preventDefault();
				var $this = $(this);
				var billType = $this.data('type');
				var arr_ids = _page.$grid.jqGrid('getGridParam','selarrrow');
				var orderIds = arr_ids.join();
				if(arr_ids.length !== 1){
					if(!arr_ids.length){
						defaultPage.Public.tips({type:2, content : '请选择需要打印的订单'});
						return;
					}
				}
				//判断选择的订单用的是不是同一个物流公司
				var hasRepeat = {} , expressId , cloudTypeId , expressIds = [], items = [];
				if(billType==2){  
					for(var i = 0; i<arr_ids.length ; i++){
						var rowData = $('#grid').jqGrid('getRowData',arr_ids[i]);
						expressId = rowData.expressId;
						cloudTypeId = rowData.cloudTypeId;
						if(Number(expressId)==0&&billType==2){  //打印快递单时，物流公司不能为空
							defaultPage.Public.tips({type:2, content : '所选订单中存在物流公司为空，请先加上物流公司！'});
							return;
						}
						if((!hasRepeat[expressId])){
							if(i==0){
								hasRepeat[expressId] = true;
							}else{
								defaultPage.Public.tips({type:2, content : '存在多个物流公司的订单，请先按照物流公司筛选，然后选择打印'});
								return;
							}
						}
						if(expressIds.indexOf(expressId) == -1){
							expressIds.push(expressId);
						}
					}
					expressIds = expressIds.join(); 
					var result = true;
					Public.ajax({
						 url: '/bs/express.do?action=list',
					   data: {expressId: expressIds}, 
						 async:false,
					   success: function(data, status){ 
					   	items = data.data.items;
							 if (data.data.items[0].enableWayBill == false) {
							 		printDialog(billType,expressId,items);
							 }else{
							 		for(var j = 0; j<arr_ids.length; j++){
										var rowData = $('#grid').jqGrid('getRowData',arr_ids[j]);
										var expressNum = rowData.expressNum;
										if(!expressNum){
											defaultPage.Public.tips({type:2, content : '存在订单并未获取电子面单，请先获取菜鸟单号！'});
											result = false;
										}
										if(expressNum && rowData.printCheck === '否'){
											$.dialog.confirm('存在订单信息与获取单号时不一致，是否更新？', function(){
												Public.ajaxPost('/scm/orderCloud.do?action=printLogisiticOrderCheck',{orderIds:orderIds}, function(data){
													if(data.status === 200 && data.msg && data.msg.length) {
														var result = '<p>操作成功！</p>';
														parent.Public.tips({content : result});
														for(var i = 0;i<arr_ids.length;i++){
															_page.$grid.jqGrid('setRowData', arr_ids[i], {printCheck: 1});
														}
														printDialog(billType,expressId,items);
													} else {
														parent.Public.tips({type: 1, content : data.msg});
													}
												});
											});
											result = false;
										}
									}
							 }
					   }
					});
					if(!result){
						return false;
					}
					printDialog(billType,expressId,items);
				}
				else{
					printDialog(billType,expressId,items);
				}
			});
			//打印设置
			function printDialog(billType,expressId,items){
				var _title;
				switch(billType){
					case 1: _title="打印发货单";break;
					case 2: _title="打印快递单";break;
					case 3: _title="打印配货单";break;
					default: break;
				}
				var arr_ids = _page.$grid.jqGrid('getGridParam','selarrrow');
				var orderIds = arr_ids.join();
				var _pop = $.dialog({
					title: _title,
					id: "Prompt",
					min:false,
					max:false,
					width:500,
					height:300,
					cache:false,
					lock:true,
					content:'url:customPrint.jsp',
					data:{
						billType:billType,
						orderIds :orderIds,
						expressId: expressId,
						items:items
						/*callback :function(data){
							for(var i = 0;i<data.length;i++){
								_page.$grid.jqGrid('setRowData', data[0].orderId, {expressNum: data[0].expressNum});
							}
						}*/
					}					
				});
			};

			_page.$printExpressSetting.click(function(e) { 
				parent.tab.addTabItem({tabid: 'printSettings', text: '打印设置', url: '/online-store/printSettings.jsp?'});
			});
			//订单合并
			_page.$mergeList.click(function(e) { 
				e.preventDefault();
				var $this = $(this);
				var arr_ids = _page.$grid.jqGrid('getGridParam','selarrrow');
				var strs = [];//生成销售单的不允许合并。
				for(var i = 0,len = arr_ids.length; i < len; i++){
					var id = arr_ids[i];
					var row = $("#grid").jqGrid('getRowData',id);
					if(row.billId !== ''){
						var result = '';
						result += '<p class="ui-tips-warning">订单：' + row.orderNo + '已生成销售单！不允许合并</p>';
						defaultPage.Public.tips({type:2, content : result});
						return;
					}
				}
				var ids = [];
				for(var i = 0;i < arr_ids.length;i++){
					ids.push(Number(arr_ids[i]));
				}
				if(arr_ids.length > 1){
					var fkStatus= false,printStatus = false;
					for(var i = 0;i< ids.length;i++){
						var status = $('#'+ids[i]).data('status') ,printPhStatus = $('#'+ids[i]).data('printphstatus');
						var printExpStatus = $('#'+ids[i]).data('printexpstatus') ,printStatus = $('#'+ids[i]).data('printstatus');
						if(status === 'LOCAL_ALL_WAIT_PAY')fkStatus = true;   //付款状态
						if(printPhStatus===1)printStatus=true;
						if(printExpStatus===1)printStatus=true;
						if(printStatus===1)printStatus=true; 
					}
					if(fkStatus){
						_popInf(1,ids);
					}else if(printStatus){
						_popInf(2,ids);
					}else{
						postMergeData(ids);
					}
					return;
				}else if(arr_ids.length === 1){
					defaultPage.Public.tips({type:2, content : '订单数量小于2，不符合订单合并的条件！'});
					return;
				}
				var _pop = $.dialog({
					title: "订单合并",
					id: "Prompt",
					min:false,
					max:false,
					width:700,
					height:430,
					cache:false,
					lock:true,
					content:'url:mergeList.jsp',
					data:{
						callback:function(){
							$('.js-search').trigger('click');   //刷新
							// _pop.close();
						}
					}					
				});
			});
			//订单拆分
			_page.$splitList.click(function(e) { 
				e.preventDefault();
				var $this = $(this);
				var arr_ids = _page.$grid.jqGrid('getGridParam','selarrrow');
				if(arr_ids.length !== 1){
					defaultPage.Public.tips({type:2, content : '请选择一个需要拆分的订单！'});
					return;
				}
				var rowData = $('#grid').jqGrid('getRowData',Number(arr_ids));
				if(rowData.status=='LOCAL_WAIT_BUYER_CONFIRM_GOODS'){   //已发货
					defaultPage.Public.tips({type:2, content : '订单已发货，不符合拆分条件！'});
					return;
				}
				var orderId = arr_ids.join(),entries;
				Public.ajaxPost('/scm/orderCloud.do?action=update', {orderId : orderId}, function(data) {
					if(data.status === 200) {
						entries =  data.data.entries;
						if(entries.length<1 || (entries.length==1 && entries[0].qty<2)){
							defaultPage.Public.tips({type:2, content : '商品种类和数量都不大于1，不符合拆分条件！'});
							return;
						}
						var _pop = $.dialog({
							title: "订单拆分",
							id: "Prompt",
							min:false,
							max:false,
							width:770,
							height:450,
							cache:false,
							lock:true,
							content:'url:splitList.jsp',
							data:{
								orderIds:orderId,
								entries: entries,
								defaultType:1,
								callback:function(){
									$('.js-search').trigger('click');
									_pop.close();
								}
							}					
						});
					}
				});
			});

			//批量添加赠品
			_page.$giveawayAdd.click(function(e) { 
				e.preventDefault();
				var $this = $(this);
				var arr_ids = _page.$grid.jqGrid('getGridParam','selarrrow');
				if(arr_ids.length !== 1){
					if(!arr_ids.length){
						defaultPage.Public.tips({type:2, content : '请选择需要添加赠品的订单！'});
						return;
					}
				}
				var orderId = arr_ids.join();
				var _pop = $.dialog({
					title: "添加赠品",
					//id: "Prompt",
					min:false,
					max:false,
					width:830,
					height:600,
					cache:false,
					lock:true,
					content:'url:giveawayAdd.jsp',
					data:{
						orderIds:orderId,
						defaultType:1,
						callback:function(){
							$('.js-search').trigger('click');
							_pop.close();
						}
					}					
				});
			});
			//打印快递单设置
			// _page.$printExpress.click(function(e) {
			// 	e.preventDefault();
			// 	if (!Business.verifyRight('ORDERCLOUD_PRINT')) {
			// 		return ;
			// 	};
			// 	var arr_ids = _page.$grid.jqGrid('getGridParam','selarrrow');
			// 	var $this = $(this);
			// 	// if(arr_ids.length !== 1){
			// 	// 	if(!arr_ids.length){
			// 	// 		defaultPage.Public.tips({type:2, content : '请选择需要修改物流的订单'});
			// 	// 		return;
			// 	// 	}
			// 	// }
			// 	var orderIds = arr_ids.join();
			// 	var _title = '批量修改';
			// 	var _pop = $.dialog({
			// 		title: _title,
			// 		id: "Prompt",
			// 		min:false,
			// 		max:false,
			// 		width:560,
			// 		height:440,
			// 		cache:false,
			// 		lock:true,
			// 		content:'url:batchEdit.jsp',
			// 		data:{
			// 			dataType:$this.data('type'),
			// 			orderIds :orderIds,
			// 			callback:function(ids,logisticsId,locationId){
			// 				for (var i = 0; i < ids.length; i++) {
			// 					var _id = ids[i];
			// 					if(logisticsId){
			// 						_page.$grid.jqGrid('setRowData', _id, {express: logisticsId});
			// 					}
			// 					if(locationId){
			// 						orderDetailInit(_id, _page.$gridDetail);
			// 					}
			// 				};
			// 				_pop.close();
			// 			}
			// 		}
			// });
			
			// 下查
			/*_page.$grid.on('click', '.operating .ui-icon-search', function(e) {
				e.preventDefault();
				if (!Business.verifyRight('ORDERCLOUD_LOOKFORINV')) {
					return ;
				};
				var _id = $(this).parent().data('id');
				Public.ajaxPost('/scm/orderCloud.do?action=lookForInv',{"orderId" : _id},
						function(data) {
							if (data.status === 200) {
								parent.tab.addTabItem({tabid: 'sales-sales', text: '销售单', url: 'http://'+parent.location.hostname+'/sales/sales.jsp?id=' + data.data.id + '&flag=list'});
							} else {
								defaultPage.Public.tips({type : 1,content : data.msg});
							}
						});
			});*/
			_page.$grid.on('click', '.btnBillcheck', function(e){
				e.preventDefault();
				var billId = $(this).data('id');
				parent.tab.addTabItem({tabid: 'sales-sales', text: '销货单', url: '/sales/sales.jsp?id=' + billId + '&flag=list&disEditable=true'});
				parent.cacheList.saleId = $("#grid").jqGrid('getDataIDs');
			});
			//导出
			$('.wrapper').on('click','#exports', function(e){
				if (!Business.verifyRight('PO_EXPORT')) {
					e.preventDefault();
					return ;
				};
					var arr_ids = $('#grid').jqGrid('getGridParam','selarrrow');
					var voucherIds = arr_ids.join();
					var params = voucherIds ? '&orderIds='+ voucherIds : '';
					var queryConditions = _grid.queryConditions;
					var sord = $('#grid').jqGrid('getGridParam').sortorder;
					var sidx = $('#grid').jqGrid('getGridParam').sortname;
					for(var item in queryConditions){
						if(queryConditions[item]){
							params += '&' + item +'='+ queryConditions[item];
						}
					}
					params += '&' + 'sended=' + exportData.sended;
					params += '&' + 'sord=' + sord;
					params += '&' + 'sidx=' + sidx;
					switch(handle){
						case '1'://来自订单处理
							var url = '/scm/orderCloud.do?action=exportOrdersList&controlType=0'+params;//sidx、sord=
							$(this).attr('href', url);
							break;
						case '2'://来自打单发货
							var url = '/scm/orderCloud.do?action=exportOrdersList&controlType=1'+params;
							$(this).attr('href', url);
							break;
						default:
							break;
					}
				
				
			});
			// 	检查快递送达
			//	reachable: 0-不可达  1-可达  2-不确定
			_page.$checkRange.click(function(e) {
				e.preventDefault();
				if(_page.$checkRange.hasClass('ui-btn-dis')){
					defaultPage.Public.tips({type:2, content : '正在检查，请稍等！'});
					return;
				}
				var arr_ids = $('#grid').jqGrid('getGridParam','selarrrow');
				if(arr_ids.length <= 0){
					if(!arr_ids.length)defaultPage.Public.tips({type:2, content : '请选择需要检查的订单'});
				}	
				var voucherIds = arr_ids.join();
				for ( var i = 0, len = arr_ids.length; i < len; i++){
					var _rData = _page.$grid.jqGrid('getRowData',arr_ids[i]);
				}
				_page.$checkRange.addClass('ui-btn-dis');
				_page.$checkRange.html("正在检查...");
				Public.ajaxPost('/scm/orderCloud.do?action=checkReachable',{"orderId" : arr_ids.join()},
						function(data) {
							if (data && data.status === 200 && data.data && data.data.items) {
								var _faileList = "",
								_faileCount = 1,
								_unsureList = "",
								_unsureCount = 1,
								_errorAList = "",
								_errorACount = 1,
								_errorBList = "",
								_errorBCount = 1,
								_len = data.data.items.length ;
								for(var i=0 ;i<len;i++){
									var _item = data.data.items[i];
									switch(_item.reachable){
									case 0:
										_faileList += '<tr><td>'+_item.orderNo+'</td></tr>';
										_faileCount++;
										break;
									case 1:										
										break;
									case 2:
										_unsureList += '<tr><td>'+_item.orderNo+'</td></tr>';
										_unsureCount++;
										break;
									case 3:
										_errorAList += '<tr><td>'+_item.orderNo+'</td></tr>';
										_errorACount++;
										break;
									case 4:
										_errorBList += '<tr><td>'+_item.orderNo+'</td></tr>';
										_errorBCount++;
										break;
									default:break;
									}
								}
								_faileList = _faileList ==='' ? '' : '<tr><td rowspan="'+_faileCount+'" style="align-content: top;vertical-align: top;">不可达的订单：</td></tr>'+ _faileList;
								_unsureList = _unsureList ==='' ? '' : '<tr><td rowspan="'+_unsureCount+'" style="align-content: top;vertical-align: top;">不确定送达的订单：</td></tr>'+ _unsureList;
								_errorAList = _errorAList ==='' ? '' : '<tr><td rowspan="'+_errorACount+'" style="align-content: top;vertical-align: top;">未填快递公司的订单：</td></tr>'+ _errorAList;
								_errorBList = _errorBList ==='' ? '' : '<tr><td rowspan="'+_errorBCount+'" style="align-content: top;vertical-align: top;">未填市/区级收货地址的订单：</td></tr>'+ _errorBList;
								if(!_faileList && !_unsureList && !_errorAList && !_errorBList){
									defaultPage.Public.tips({type : 0,content : '所选订单均可送达！'});
								}else{
									$.dialog({
										title:'检查快递送达',
										content:'<table>'+_faileList+_unsureList+_errorAList+_errorBList+'<tr><td>其他订单均可送达！</td></tr>'+'</table>',
										ok:true
									});
								}
							} else {
								defaultPage.Public.tips({type : 1,content : data.msg});
							}
							_page.$checkRange.removeClass('ui-btn-dis');
							_page.$checkRange.html("检查快递送达");
						});
			});
			// 补销售单
			_page.$makeSaleOrder.click(function(e){
				e.preventDefault();
				var arr_ids = _page.$grid.jqGrid('getGridParam','selarrrow');
				
				var result = '';
				var $gird = $('#grid');
				var strs = [];
				for(var i = 0,len = arr_ids.length; i < len; i++){
					var id = arr_ids[i];
					var row = $("#grid").jqGrid('getRowData',id);
					if(row.billId == ''){
						strs.push(arr_ids[i]);
					}else{
						result += '<p class="ui-tips-warning">订单：' + row.orderNo + '已生成销售单！</p>';
					}
				}
				var voucherIds = strs.join();
				if (!voucherIds) {
					defaultPage.Public.tips({type : 2,content : "请选择未生成销售单的订单！"});
					return;
				}
				Public.ajaxPost('/scm/orderCloud.do?action=batchGenerateInvSa',{"orderId" : voucherIds , "transType" : '150601'},
								function(data) {
									if (data.status === 200) {
										if(data.data){
											if(data.data.successArr){
												if (data.data.successArr.length >　0) {
													result += '<p>'+data.data.successArr.length+'个订单成功生成销货单!</p>';
												};
											}
											if(data.data.successArr2){
												result += '<p ></p>';
												for (var resultItem in data.data.successArr2) {
													if(typeof data.data.successArr2[resultItem] === 'function') continue;//兼容ie8
													resultItem = data.data.successArr2[resultItem];
													result += '<p class="red">'+ resultItem.wdOrderNo +'生成销售单失败</p>';
													result += '<p class="red">失败原因：'+resultItem.meg+'</p>';
												};
											}
											if(data.data.errorArr && data.data.errorArr.length !== 0){
												result += '<p ></p>';
												for(var resultItem in data.data.errorArr){
													if(typeof data.data.errorArr[resultItem] === 'function') continue;//兼容ie8
													resultItem = data.data.errorArr[resultItem];
													result += '<p class="red">'+ resultItem.wdOrderNo +'生成销售单失败</p>';
													result += '<p class="red">失败原因：'+resultItem.meg+'</p>';
												}
											}
											if(data.data.failArr && data.data.failArr.length !== 0){
												result += '<p ></p>';	
												for(var resultItem in data.data.failArr){
													if(typeof data.data.failArr[resultItem] === 'function') continue;//兼容ie8
													resultItem = data.data.failArr[resultItem];
													result += '<p class="red">'+ resultItem.wdOrderNo +'生成销售单失败</p>';
													result += '<p class="red">失败原因：'+resultItem.meg+'</p>';
												}
											}
										}
										defaultPage.Public.tips({content : result});
										_page.$grid.jqGrid('setGridParam').trigger("reloadGrid");
									} else {
										defaultPage.Public.tips({type : 1,content : data.msg});
									}
								});
			});
			// 生成退货单
			_page.$makeRefundOrder.click(function(e){
				e.preventDefault();
				var arr_ids = _page.$grid.jqGrid('getGridParam','selarrrow');
				var voucherIds = arr_ids.join();
				if (!voucherIds) {
					defaultPage.Public.tips({type : 2,content : "未选择任何订单！"});
					return;
				}
				Public.ajaxPost('/scm/orderCloud.do?action=batchGenerateInvSa',{"orderId" : voucherIds , "transType" : '150602'},
								function(data) {
									if (data.status === 200) {
										var errorList = [];
										for ( var i = 0, len = data.data.items.length; i < len; i++) {
											var item = data.data.items[i];
											/*if(item.msg === 'success'){
												_page.$grid.jqGrid('setRowData', item.data.FRCLOUDSTOREID, item.data);
											}else{
												errorList.push('<p>订单[' + item.orderIdCloud + ']转单失败：' + item.msg + '<p/>');
											}*/
											if(item.orderId){
												var $gird = $('#grid');
												var rowData = $gird.jqGrid('getRowData',item.orderId);
												rowData = $.extend(true,rowData,{
													checkName:system.realName,
													checkDate:system.endDate,
													checked:1,
													reBillNo:item.reBillNo,
													reBillId:item.reBillId,
													printStatus:rowData.printStatus==""?0:1,
													printExpStatus:rowData.printExpStatus==""?0:1
												});
												$gird.jqGrid('setRowData',item.orderId,rowData);
												/*$('#grid').setCell(item.orderId,'checkName',system.realName);
												$('#grid').setCell(item.orderId,'checkDate',system.endDate);
												$('#grid').setCell(item.orderId,'checked',1);	
												$('#grid').setCell(item.orderId,'billNo',item.billNo);
												$('#grid').setCell(item.orderId,'billId',item.billId);*/
											}
											
										}
										defaultPage.Public.tips({type: 3,content : data.msg});
									} else {
										defaultPage.Public.tips({type : 1,content : data.msg});
									}
								});
			});
		/*	_page.$makeRefundOrder.click(make_sale_refund_click('150602'));*/
			
			// 修改
			_page.$grid.on('click', '.operating .ui-icon-pencil', function(e) {
				e.preventDefault();
				if (!Business.verifyRight('ORDERCLOUD_UPDATE')) {
					return ;
				};
				var rowId = $(this).parent().data('id');
				parent.tab.addTabItem({
					tabid : 'onlineStore-onlineOrder',
					text : '网店订单',
					url : 'online-store/onlineOrder.jsp?id=' + rowId
				});
			});
			// 删除
			_page.$grid.on('click', '.operating .ui-icon-trash', function(e) {
				e.preventDefault();
				if (!Business.verifyRight('ORDERCLOUD_DELETE')) {
					return ;
				};
				var rowId = $(this).parent().data('id');
				$.dialog.confirm('您确定要删除该记录吗？', function() {
					Public.ajaxGet('/scm/orderCloud.do?action=delete', {
						orderId : rowId
					}, function(data) {
						if (data.status === 200) {
							$("#grid").jqGrid('delRowData', rowId);
							defaultPage.Public.tips({
								content : '删除成功！'
							});
							_page.$gridDetail.jqGrid('clearGridData').trigger('reloadGrid');//删除订单时删除明细。。
						} else {
							defaultPage.Public.tips({
								type : 1,
								content : data.msg
							});
						}
					});
				});
			});
			// 批量删除
			_page.$delete.on('click', function(e) {
				e.preventDefault();
				if (!Business.verifyRight('ORDERCLOUD_DELETE')) {
					return ;
				};
				var arr_ids = $('#grid').jqGrid('getGridParam','selarrrow');
				if(arr_ids.length <= 0){
					if(!arr_ids.length)defaultPage.Public.tips({type:2, content : '请选择需要检查的订单'});
				}	
				var voucherIds = arr_ids.join();
				$.dialog.confirm('您确定要删除该记录吗？', function() {
					Public.ajaxGet('/scm/orderCloud.do?action=delete', {
						orderId : voucherIds
					}, function(data) {
						if (data.status === 200) {
							for ( var i = 0, len = arr_ids.length; i < len; i++) {
								$("#grid").jqGrid('delRowData', arr_ids[i]);
							}
							defaultPage.Public.tips({
								content : '删除成功！'
							});
						} else {
							defaultPage.Public.tips({
								type : 1,
								content : data.msg
							});
						}
					});
				});
			});
			//tab
			_page.$orderDetail.find('.ui-tab').find('li').each(function(index, el) {
				var $this = $(this);
				(function(i,obj){
					obj.click(function(event) {
						obj.addClass('cur').siblings().removeClass('cur');
						_page.$orderDetail.find('.wrap').children('li:eq('+i+')').addClass('cur').siblings().removeClass('cur');
					});
				})(index,$this);
			});
			//点击其他地方接触grid的编辑状态
			$(document).on('click', function(e){
				if($(e.target).closest("#gridDetail").length == 0 && curRow !== null && curCol !== null){
				   _page.$gridDetail.jqGrid("saveCell", curRow, curCol);
				   curRow = null;
				   curCol = null;
				};
			});
			//实时更新Detail
			_page.$detailSave.on('click', function(e) {
				e.preventDefault();
				dataHandle.detailUpdate(true);
			});
			_page.$sellerRemark.blur(function(event) {
				/* Act on the event */
				if($(this).val() != originalData.salerDesc){
					dataHandle.detailUpdate();
				}
			});
			_page.$gridDetail.on('click', '.ui-icon-ellipsis', function(e){
				var $tr = $(this).closest('tr');
				//var $_input = $(this).prev('input');
				var skuMult = false;
				if(!$(this).hasClass('disableSku')){
					skuMult = $(this).data('skuMult') || defaultPage.SYSTEM.enableAssistingProp;
				}
				var url = 'http://'+defaultPage.location.hostname+'/settings/goods-batch.jsp';
				$.dialog({
					width: 775,
					height: 500,
					title: '选择商品',
					content: 'url:' + url,
					data: {
						isSingle: 1,//单选模式
						skuMult: skuMult,
						page:THISPAGE,
						type:'onlineOrderList',
						curID: THISPAGE.curID,
						callback:function(addId,data){
							//delete data.id;//本地商品ID会覆盖网店商品ID
							addId =  $tr.prop('id'); 
							var rowData = _page.$gridDetail.jqGrid('getRowData',addId) || {};
							var newData = $.extend(true, {}, {
								id: Number(data.id),
								goods: data.goods , 
								skuId:data.skuId, 
								skuName:data.skuName,
								unitName : data.unitName,
								unitId : data.unitId,
								qty : rowData.qty || data.qty,
								price : rowData.price || data.salesPrice || 0,
								amount : rowData.amount,
								deduction : rowData.deduction,
								locationName : rowData.locationName ||　data.locationName,
								locationId: rowData.locationId　||　data.locationId,
								invSkus : data.invSkus　,
								isSerNum : data.isSerNum,
								name : data.name
							});
							if(!$('#'+addId).data('storageInfo')){
								$('#'+addId).data('storageInfo',{
									id:data.locationId,
									name:data.locationName
								})
							}
							if(!$('#'+addId).data('unitInfo')){
								$('#'+addId).data('unitInfo',{
									id:data.unitId,
									name:data.unitName
								})
							}
							$tr.data("goodsInfo", newData);
							_page.$gridDetail.jqGrid('setRowData', addId, newData);
						}
					},
					lock: true,
					ok: function(){
						this.content.callback('onlineOrderList');
						//return false;
					},
					cancel: true
				});
			});
		}
	},
	_grid = {
		getRequireURL : function(){
			var action = '';
			switch(handle){
				case '1':
				this.queryConditions.checkStatus=0;
				this.queryConditions.status = 'LOCAL_WAIT_SELLER_SEND_GOODS';
				break;//未审核
				case '2':
				this.queryConditions.sended = -1;
				break;//已审核
				case '3':
				this.queryConditions.sended=1;
				break;//已发货（系统的已发货+淘宝交易状态表示的已发货状态）
				default:break;
			}
			return '/scm/orderCloud.do?action=list&'+action;
		},
		queryConditions : {matchCon : ''},
		colModel : [ 
					{name : 'operate',label : '操作',width : 30,fixed : true, disConfigured: true, align : 'center',formatter : Fmatter.operFmatter}, 
					{name : 'orderId',label : '订单ID',width : 100,hidden : true}, 
					{name : 'type',label : '单据标识',width : 70,align : 'center', formatter : Fmatter.remarkFmatter}, 
					{name : 'date',label : '单据日期',width : 70, sortable:true}, 
					{name : 'orderIdCloud',label : '网上订单号',width : 120}, 
					{name : 'iscod',label : '货到付款', width : 120, formatter : Fmatter.prstatusFmatter}, 
					{name : 'status',label : '交易状态',width : 100, formatter : Fmatter.tradeTypeFmatter}, 
					{name : 'payDate',label : '付款日期',width : 70, sortable:true}, 
					{name : 'templateId',label : '物流公司默认运单模板类型',width : 100,hidden:true},
					{name : 'deliveryMethod',label : '运送方式',width : 60,hidden : true}, 
					//{name : 'cloudStoreName',label : '订单来源',width : 100,hidden : true},
					// {name:'', label:'是否合并', width:100},
					{name : 'invoiceStatus',label : '是否开票',width : 100,hidden : true}, 
					{name : 'desc',label : '备注',width : 100,hidden : true}, 
					{name : 'buyerNumber',label : '买家帐号',width : 100,hidden : true}, 
					{name : 'buyerName',label : '买家昵称',width : 100, formatter:Fmatter.buyerNameFmatter}, 
					{name : 'buyerEmail',label : '买家邮箱',width : 100,hidden : true}, 
					{name : 'deliveryName',label : '收货人名',width : 100,hidden : true}, 
					{name : 'receiver',label : '收货人名',width : 100,hidden : true}, 
					{name : 'phone',label : '买家联系电话',width : 100,hidden : true}, 
					{name : 'mobile',label : '买家手机号码',width : 100,hidden : true}, 
					{name : 'postalCode',label : '买家邮政编码',width : 100,hidden : true}, 
					{name : 'province',label : '省(买)',width : 60, classes: 'ui-ellipsis', sortable:true}, 
					{name : 'city',label : '市(买)',width : 60, classes: 'ui-ellipsis', sortable:true}, 
					{name : 'area',label : '区(买)',width : 60, classes: 'ui-ellipsis', sortable:true}, 
					{name : 'address',label : '买家收货地址',width : 100,hidden : true}, 
					{name : 'totalAmount',label : '金额',width : 100,hidden : true}, 
					{name : 'rpAmount',label : '应收金额',width : 100,sortable : true}, 
					{name : 'buyerDesc',label : '买家留言',width : 60,classes: 'ui-ellipsis'}, 
					{name : 'salerDesc',label : '卖家备注',width : 60,classes: 'ui-ellipsis', formatter : Fmatter.sellerFlagFmatter}, 
					{name : 'checkDate',label : '审核日期',width : 80,hidden : billRequiredCheck ? false : true,fixed : true,align : 'center',title : false,hidden : true}, 
					{name : 'checkName',label : '审核人',width : 60,sortable : true, hidden : billRequiredCheck ? false : true,fixed : true,align : 'center',classes: 'ui-ellipsis'}, 
					{name : 'checked',label : '审核状态',width : 60,hidden : billRequiredCheck ? false : true,fixed : true,align : 'center',title : false,align : 'center',formatter : Fmatter.checkedFmatter,hidden : true}, 
					{name : 'printStatus',label : '打印状态',width : 70,align : 'center',formatter : Fmatter.printStatusFmatter},
					{name : 'expressId',label : '物流公司ID',width : 100,hidden:true}, 
					{name : 'express',label : '物流公司',width : 60,align : 'center',formatter : Fmatter.expressFmatter}, 
					{name : 'expressNum',label : '物流单号',width : 100}, 
					{name : 'deliveryStatus',label : '发货状态',width : 60, align : 'center', formatter : Fmatter.shippingStatusFmatter,title : false,hidden : true}, 
					{name : 'delivery',label : '发货人',width : 100,hidden : true}, 
					{name : 'deliveryTime',label : '发货时间',width : 70, align : 'center'}, 
					{name : 'userName',label : '制单人',width : 100,hidden : true}, 
					{name : 'createDate',label : '制单日期',width : 100,hidden : true}, 
					{name : 'modifyName',label : '最后修改人',width : 100,hidden : true}, 
					{name : 'modifyTime',label : '最后修改日期',width : 100,hidden : true}, 
					{name : 'billNo',label : '销售单号',width : 100,formatter:Fmatter.billNoFmatter},
					{name : 'billId',label : '销售单ID',width : 100,hidden:true},
					{name : 'reBillNo',label : '退货单号',width : 100,formatter:Fmatter.reBillNoFmatter,hidden:true},
					{name : 'reBillId',label : '退货单ID',width : 100,hidden:true},
					{name : 'refund',label : '申请退款',width : 60,formatter : Fmatter.refundFmatter},
					{name : 'refundStatus',label : '退款状态',width : 60,hidden:true,formatter : Fmatter.refundStatusFmatter},
					{name : 'orderNo',label : '单据编号',width : 120}, 
					{name : 'cloudStoreId',label : '网店ID',width : 100,hidden : true}, 
					{name : 'cloudStoreName',label : '网店名称',width : 100},
					{name : 'printCheck',label : '是否通过校验',width:100, formatter:function(val, opt, row){
						if(val === 1){
							return '是';
						}else{
							return '否';
						}
					}},
					{name : 'waybillenable' ,label : '是否开启电子面单' , hidden:true, formatter:function(val, opt, row){
						if(val === true){
							return 1;
						}else{
							return '';
						}
					}}
		],
		colModel_Detail : [ 
					{name:'oid',width:0,hidden:true},
					//{name:'invCNumber', label:'网店商品编号', width:100,hidden:true},
					{name : 'operate',label : '操作',width : 40,fixed : true,disConfigured: true, align : 'center',formatter : Fmatter.operDetailFmatter}, 
					{name:'skuOuterId', label:'网店商品属性编号', width:100,hidden:true},
					{name:'pic_url', label:'图', width:33,formatter:function(val, opt, row){
						if(val){
							val = '<img src="'+val+'">';
						}else{
							val = '&#160;';
						}
						return val;
					} ,classes:'imgFlied'},
					{name:'isReFund', label:'商品标识', width:50,align:'right',title:'退款',align:"center",formatter:function (val, opt, row){
						var identify = '' ,present = '',lackQty = '';
						if(val==1){
							identify = '<span class="icons ui-label ui-label-tips">退</span>';
						}
						if(row.invzp == 1){
							present = '<span class="icons ui-label ui-label-success">赠</span>';
						}
						if(row.invKYQty < 0 || row.invKYQty == 0){//参考可用库存字段判断。
							lackQty = '<span class="icons ui-label ui-label-tips">缺</span>';
						}
						return identify + present + lackQty;
					}},
					{name:'invCName', label:'线上宝贝', width:240,classes: 'ui-ellipsis',formatter:Fmatter.onlineGoodsFmt},
					{name:'orderIdCloud', label:'网上订单号', width:110,hidden:true},
		           	{name:'invId', label:'商品ID', width:0,hidden:true},
					{name:'invNumber', label:'商品代码', width:100,hidden:true},
					{name:'invCId', label:'网上商品ID', width:0,hidden:true},
					{name:'skuCId', label:'skuCId', width:0, hidden:true},
					//{name:'invName', label:'本地商品', width:240,classes: 'ui-ellipsis operation',formatter:Fmatter.localGoodsFmt},
					{name:'goods', label:'本地商品', width:300, classes: 'ui-ellipsis', formatter:Fmatter.localGoodsFmt, editable:true, edittype:'custom', editoptions:{
						custom_element: function(){
							var el = $('.goodsAuto')[0];
							return el;
						},
						custom_value: function(elem, operation, value) {
							if(operation === 'get') {
							   //console.log($('.goodsAuto').getCombo().getValue())
							   if($('.goodsAuto').getCombo().getValue() !== '') {
								  return $(elem).val();
							   } else {
								  var parentTr = $(elem).parents('tr');
								  parentTr.removeData('goodsInfo');
								  return '';
							   }
							} else if(operation === 'set') {
							   $('input',elem).val(value);
							}
						},
						handle: function() {
						  	$('#initCombo').append($('.goodsAuto').val('').unbind("focus.once"));
						}, 
						trigger:'ui-icon-ellipsis'}},
					{name:'skuId', label:'skuId', width:0, hidden:true},
					{name:'skuName', label:'属性' , width:100 , classes: 'ui-ellipsis' ,hidden:!system.enableAssistingProp, editable:true, edittype:'custom', editoptions:{
						custom_element: function(value, options) {
						  	var el = $('.skuAuto')[0];
						  	return el;
						}, 
						custom_value: function(elem, operation, value) {
							if(operation === 'get') {
							   if($('.skuAuto').getCombo().getValue() !== '') {
								  return $(elem).val();
							   } else {
								  var parentTr = $(elem).parents('tr');
								  parentTr.removeData('skuInfo');
								  return '';
							   }
							} else if(operation === 'set') {
							   $('input', elem).val(value);
							}
						}, 
						handle: function() {
						    $('#initCombo').append($('.skuAuto').val(''));
						}, 
						trigger:'ui-icon-triangle-1-s'}}, 
					{name:'invSpec', label:'规格型号', width:60,hidden:true},
					{name:'unitName', label:'单位', width:50,hidden:true},
					{name:'qty', label:'数量', width:50,align:'right', editable:true},
					{name:'price', label:'单价', width:50, align:'right', editable:true,formatter:'currency',formatoptions:{showZero: true, decimalPlaces: qtyPlaces}},
					{name:'deduction', label:'折扣额', width:70, fixed:true, align:"right", formatter:'currency',formatoptions:{showZero: true}, editable:true},
					{name:'amount', label:'金额', width:50,align:'right',formatter:'currency',formatoptions:{showZero: true}},
					//{name:'rpAmount', label:'实收金额', width:60, align:'right',editable:true},
					{name:'locationName', label:'仓库', width:100, editable:true, edittype:'custom', editoptions:{
						custom_element:  function(value, options) {
						  	var el = $('.storageAuto')[0];
						  	return el;
						},
						custom_value: function(elem, operation, value) {
							if(operation === 'get') {
								   if($('.storageAuto').getCombo().getValue() !== '') {
									  return $(elem).val();
								   } else {
									  var parentTr = $(elem).parents('tr');
									  parentTr.removeData('storageInfo');
									  return '';
								   }
								} else if(operation === 'set') {
								   $('input', elem).val(value);
								}
							},		
						handle: function() {
						    $('#initCombo').append($('.storageAuto').val(''));
						},
						trigger:'ui-icon-triangle-1-s'}
					},
					{name:'invQty', label:'即时库存', width:50,align:'right'},
					{name:'invKYQty', label:'可用库存', width:50,align:'right'}
		],
		goodsInfoHandle : function(rowid){
			var goodsInfo = $('#' + rowid).data('goodsInfo');
			if(goodsInfo && !goodsInfo.isOld) {
				var rowData = {
					skuId : goodsInfo.skuId || -1,
					skuName : goodsInfo.skuName || '',
					unitName : goodsInfo.unitName,
					unitId : goodsInfo.unitId,
					qty : goodsInfo.qty || 1,
					price : goodsInfo.price || goodsInfo.salesPrice || 0,
					amount : goodsInfo.amount,
					deduction : goodsInfo.deduction,
					locationName : goodsInfo.locationName,
					locationId: goodsInfo.locationId
				};
				rowData.amount = rowData.amount ? rowData.amount : rowData.price * rowData.qty;
				var su =  $("#gridDetail").jqGrid('setRowData', rowid, rowData);
				if(su) {
					goodsInfo.isOld = 1;
					$('#' + rowid).data('goodsInfo',goodsInfo);
					$('#' + rowid).data('skuInfo',null);
					dataHandle.calTotalDetail();
					//dataHandle.detailUpdate();
				};
			}
		},
		cancelGirdEdit: function(){
			if(curRow !== null && curCol !== null){
			   _page.$gridDetail.jqGrid("saveCell", curRow, curCol);
			   curRow = null;
			   curCol = null;
			};
		},
		height : $(window).height() - $(".grid-wrap").offset().top - adjustH,
		init : function() {
			exportData = this.queryConditions;
			_page.mod_PageConfig.gridReg('grid', this.colModel,'订单列表');
			this.colModel = _page.mod_PageConfig.conf.grids['grid'].colModel;
			_page.$grid.jqGrid({
				url : this.getRequireURL(),
				datatype : "json",
				postData : this.queryConditions,
				autowidth : true,
				height : this.height,
				altRows : true,
				gridview : true,
				colModel : this.colModel,
				multiselect : true,// 多选
				cmTemplate : {
					sortable : false
				},
				page : 1,
				sortname : 'date',
				sortorder : "desc",
				pager : _page.$page,
				rowNum : 20,
				rowList : [ 20, 50, 100 ],
				viewrecords : true,
				shrinkToFit : false,// 按设定列宽度
				forceFit : false,// 改变列宽度影响表格宽度
				multiboxonly: true,
				jsonReader : {
					root : "data.rows",
					records : "data.records",
					total : "data.total",
					repeatitems : false,
					id : "orderId"
				},
				loadComplete : function(data) {
					var rowDatas = data.data.rows;
					if(rowDatas.length>1){
						for(var i = 0;i<rowDatas.length;i++){
							$('#'+rowDatas[i].orderId).attr('data-status',rowDatas[i].status);
							$('#'+rowDatas[i].orderId).attr('data-printPhStatus',rowDatas[i].printPhStatus);
							$('#'+rowDatas[i].orderId).attr('data-printExpStatus',rowDatas[i].printExpStatus);
							$('#'+rowDatas[i].orderId).attr('data-printStatus',rowDatas[i].printStatus);
						}
					}
				},
				gridComplete : function(data) {
					switch(handle){
						case '1':break;
						default:disEditable();break;
					}	
				},
				ondblClickRow : function(rowid, iRow, iCol, e) {// 双击触发修改事件
					//$('#' + rowid).find('.ui-icon-pencil').trigger('click');
				},
				onSelectRow:function(rowid,status){
					if(status){
						_grid.cancelGirdEdit();
						orderDetailInit(rowid, _page.$gridDetail);
					}
				},
				resizeStop: function(newwidth, index){
					_page.mod_PageConfig.setGridWidthByIndex(newwidth, index, 'grid');
				}
			}).navGrid('#page',{edit:false,add:false,del:false,search:false,refresh:false}).navButtonAdd('#page',{  
				caption:"",   
				buttonicon:"ui-icon-config",   
				onClickButton: function(){
					_page.mod_PageConfig.config();
				},   
				position:"last"  
			});
			/* //定义多表头
			_page.$grid.jqGrid('setGroupHeaders', {
			  useColSpanStyle: true, 
			  groupHeaders:[
				{startColumnName: 'printStatus', numberOfColumns:2, titleText: '打印状态'}
			  ]	
			});*/
			//GridDetail
			var dataDetail = {};
			_page.mod_PageConfig.gridReg('gridDetail', this.colModel_Detail,'订单明细');
			this.colModel_Detail = _page.mod_PageConfig.conf.grids['gridDetail'].colModel;
			_page.$gridDetail.jqGrid({
				data: {}, 
				datatype: "clientSide",
				//postData: this.queryConditions,
				colModel:this.colModel_Detail,
				autowidth: true,
				height: '100',
				//rownumbers: true,
				gridview: true,
				onselectrow: false,
				cmTemplate: {sortable: false, title: true},
				shrinkToFit: false,
				//forceFit: true,
				rowNum: 1000,
				cellEdit: true,
				cellsubmit: 'clientArray',
				localReader: {
					  root: "rows", 
					  records: "records", 
					  total: "total", 
					  repeatitems : false,
					  id: "id"
					},
				jsonReader: {
					  root: "rows", 
					  records: "records", 
					  total: "total", 
					  repeatitems : false,
					  id: "id"
					},
				afterEditCell: function (rowid,name,val,iRow,iCol){
					THISPAGE.curID = rowid;
					function _updateGoodsInfo(){
						var goodsInfo = $('#' + rowid).data('goodsInfo');
						if(goodsInfo){
							var rowData = _page.$gridDetail.jqGrid('getRowData',rowid);
							goodsInfo = $.extend(true,{},goodsInfo);
							goodsInfo.skuId = rowData.skuId;
							goodsInfo.skuName = rowData.skuName;
							goodsInfo.unitName = rowData.unitName;
							goodsInfo.unitId = rowData.unitId;
							goodsInfo.qty = rowData.qty;
							goodsInfo.price = rowData.price;
							goodsInfo.amount = rowData.amount;
							goodsInfo.deduction = rowData.deduction;
							goodsInfo.locationId = rowData.locationId;
							goodsInfo.locationName = rowData.locationName;
							goodsInfo.isOld = 1;//如果这个值被刷新了则表示商品发生了更改
							$('#' + rowid).data('goodsInfo',goodsInfo);
						}
					}
					if(name==='goods') {
						//更新goodsInfo
						_updateGoodsInfo();
						$("#"+iRow+"_goods",_page.$gridDetail).val(val);
						_page.goodsCombo.selectByText(val);
					};
					if(name==='skuName') {
						_updateGoodsInfo();
						var goodsInfo = $('#' + rowid).data('goodsInfo');
						if(typeof goodsInfo.invSkus === 'string'){
							goodsInfo.invSkus = $.parseJSON(goodsInfo.invSkus);
						}
						if(!goodsInfo || !goodsInfo.invSkus || !goodsInfo.invSkus.length){
							_page.$gridDetail.jqGrid('restoreCell',iRow,iCol);
							curCol = iCol+1;
							_page.$gridDetail.jqGrid('nextCell',iRow,iCol+1);
							return;
						}
						$("#"+iRow+"_skuName",_page.$gridDetail).val(val);
						_page.skuCombo.loadData(goodsInfo.invSkus||[] , 1 ,false);
						_page.skuCombo.selectByText(val);
						if(system.ISSERNUM && goodsInfo.isSerNum == 1){
							Business.serNumManage({
								row : $('#'+rowid),
								enableStorage: true,
								enableSku: true,
								afterSelected: dataHandle.detailUpdate
							});
						}
					};
					if(name==='qty'){
						_updateGoodsInfo();
						var goodsInfo = $('#' + rowid).data('goodsInfo');
						if(!goodsInfo){return}
						if(system.ISSERNUM && goodsInfo.isSerNum == 1){
							Business.serNumManage({
								row : $('#'+rowid),
								enableStorage: val == 0,
								enableSku: val == 0,
								afterSelected: dataHandle.detailUpdate
							});
						}
					};
					if(name==='locationName') {
						$("#"+iRow+"_locationName",_page.$gridDetail).val(val);
						_page.storageCombo.selectByText(val);
						var goodsInfo = $('#' + rowid).data('goodsInfo');
						var storageInfo = $('#' + rowid).data('storageInfo') || {};
						if(!goodsInfo){return}
						if(system.ISSERNUM && goodsInfo.isSerNum == 1){
							Business.serNumManage({
								row : $('#'+rowid),
								enableStorage: true,
								enableSku: true
								// afterSelected: dataHandle.detailUpdate
							});
						}
					};
				},
				afterSaveCell : function(rowid,name,val,iRow,iCol) {
					var row = _page.$gridDetail.getRowData(rowid);
					switch(name){
					case 'locationName':
						dataHandle.detailUpdate;
						break
					case 'qty':
						var result = ((val*10000)*(row.price*10000) - row.deduction*100000000)/100000000 ;
						_page.$gridDetail.setCell(rowid,'amount',result);
						dataHandle.calTotalDetail();
						break;
					case 'price':
						var result = ((val*10000)*(row.qty*10000) - row.deduction*100000000)/100000000;
						_page.$gridDetail.setCell(rowid,'amount',result);
						dataHandle.calTotalDetail();
						break;
					case 'deduction':
						var result = ((row.price*10000)*(row.qty*10000) - val*100000000)/100000000;
						_page.$gridDetail.setCell(rowid,'amount',result);
						dataHandle.calTotalDetail();
						break;
					default:break;
					}
					dataHandle.detailUpdate();
				},
				loadComplete: function(data) {
					if(data){
						var rows = data['rows'];
						var len = rows.length;
						//_self.newId = len + 1;
						for(var i = 0; i < len; i++) {
							var tempId = i + 1, row = rows[i];
							var $row = $('#'+tempId);
							if($.isEmptyObject(rows[i])){
								break;
							};
							var number = row.goods.split(' ')[0];
							//获取商品信息
							Business.cacheManage.getGoodsInfoByNumber(number,function(good){
								$('#' + tempId).data('goodsInfo', good)
								.data('storageInfo', { 
									id: row.locationId, 
									name: row.locationName
								}).data('unitInfo',{
									unitId: row.unitId,
									name: row.mainUnit
								}).data('skuInfo',{
									name:row.skuName,
									id: row.skuId
								});
							});
						};
						var $imgView = $('.imgView');
						$('.imgFlied').each(function(index, el) {
							var $this = $(this);
							var $img = $this.find('img');
							if(!$img.length) return;
							var src = $img[0].src;
							(function($this, src){
								$this.powerFloat({
									eventType: "hover",
									//reverseSharp: true,
									target: function(){
										return $imgView;
									},
									// width: 550,
									offsets: {x:-40,y:-35},
									position: "2-4",
									showCall: function(target){
										$('.imgView').attr('src', src);//.siblings('.imgView').remove();
									}
								});
							})($this, src);
						});
					}
				},
				footerrow : true,
				userData: { invCName:"订单金额：", goods: "整单优惠：",skuName: "运费：",qty: "应收金额："},
				userDataOnFooter : true,
				resizeStop: function(newwidth, index){
					_page.mod_PageConfig.setGridWidthByIndex(newwidth, index+1, 'gridDetail');
				},
				loadError : function(xhr,st,err) {
					defaultPage.Public.tips({type: 1, content : "Type: "+st+"; Response: "+ xhr.status + " "+xhr.statusText});
				}
			});
		}
	},
	_popMsg = function(html,type){
		var pic = type==1?'error.gif':'success.gif';
		$.dialog({
			lock: true,
			width: 350,
			height: 100,
			title: '提示',
			content: html,
			icon: pic,
			okVal: '确定',
			ok: true
		});
	},
	_popInf = function(type,ids){
		var content = type==1?'<div><p>存在未付款单据，确认要合并吗!</p></div>':'<div><p>存在已打印单据，确认要合并吗!</p></div>';
		$.dialog({
			lock: true,
			width: 200,
			height: 100,
			title: '提示',
			content: content,
			icon: 'confirm.gif',
			okVal: '确定',
			ok: function () {
				postMergeData(ids);
				return;
			},
			cancelVal: '取消',
			cancel: true
		});
	},
	postMergeData = function(ids){
		var html = '';
		Public.ajaxPost('/scm/orderCloud.do?action=merge',{postData:JSON.stringify([ids])} , function(data) {
			if ( data.status == 200) {
				$('.js-search').trigger('click');//刷新
				html = '<div>'+data.data.result[0].msg+'</div>';
				if(data.data.result[0].isSuccess==0){
					_popMsg(html,1);
				}else{
					_popMsg(html,2);
				}
			} else {
				html = '<div>'+data.msg+'</div>';
				_popMsg(html,1);
			}
			
		});
	},
	orderDetailInit = function(orderId,$grid){
		$grid.clearGridData();
		disEditable();
		Public.ajaxGet('/scm/orderCloud.do?action=update', {orderId : orderId}, function(data){
			if(data.status === 200) {
				originalData = data.data;
				THISPAGE.newId = data.data.entries.length + 1;
				reloadData(originalData, $grid);
				// switch(handle){
				// 	case '1':editable();break;
				// 	default:break;
				// }
				if(!originalData.checked){
					editable();
				}
			}
		})
	},
	editable = function(){
		_page.$gridDetail.jqGrid('setGridParam',{cellEdit:true});
		_page.$gridDetail.jqGrid('showCol','operate');
		_page.$detailSave.show();
		_page.logisticsDetailCombo.enable();
		_page.shippingMethodDetailCombo.enable();
		_page.provinceCombo.enable();
		_page.cityCombo.enable();
		_page.areaCombo.enable();
		_page.$toProvince.removeClass('disabled') ;
		_page.$toCity.removeClass('disabled');
		_page.$toArea.removeClass('disabled');
		//_page.$buyerRemark.removeAttr('disabled').removeClass('ui-input-dis');
		_page.$sellerRemark.removeAttr('disabled').removeClass('ui-input-dis');
		_page.$toName.removeAttr('disabled').removeClass('ui-input-dis');
		_page.$toPhone.removeAttr('disabled').removeClass('ui-input-dis');
		_page.$toTel.removeAttr('disabled').removeClass('ui-input-dis');
		_page.$toPostcode.removeAttr('disabled').removeClass('ui-input-dis');
		_page.$toAddress.removeAttr('disabled').removeClass('ui-input-dis');
	},
	disEditable = function(){
		_page.$gridDetail.jqGrid('setGridParam',{cellEdit:false});
		_page.$gridDetail.jqGrid('hideCol','operate');
		_page.$detailSave.hide();
		_page.logisticsDetailCombo.disable();
		_page.shippingMethodDetailCombo.disable();
		_page.provinceCombo ? _page.provinceCombo.disable() : _page.$toProvince.addClass('disabled') ;
		_page.cityCombo ? _page.cityCombo.disable() : _page.$toCity.addClass('disabled');
		_page.areaCombo ? _page.areaCombo.disable() : _page.$toArea.addClass('disabled');
		//_page.$buyerRemark.attr('disabled',true).addClass('ui-input-dis');
		_page.$sellerRemark.attr('disabled',true).addClass('ui-input-dis');
		_page.$toName.attr('disabled',true).addClass('ui-input-dis');
		_page.$toPhone.attr('disabled',true).addClass('ui-input-dis');
		_page.$toTel.attr('disabled',true).addClass('ui-input-dis');
		_page.$toPostcode.attr('disabled',true).addClass('ui-input-dis');
		_page.$toAddress.attr('disabled',true).addClass('ui-input-dis');
	},
	reloadData = function(data, $grid){
		$grid.clearGridData();
		//重载基础数据
		var _self = this;
		var disAmount = data.disAmount!==undefined?data.disAmount:0;
		$grid.jqGrid('setGridParam',{data: data.entries, userData: { invCName:"订单金额："+data.totalPayment , goods: "整单优惠："+disAmount,skuName: "运费："+data.shipmentsFree,qty: "应收金额："+data.totalAmount}}).trigger("reloadGrid");
		_page.provinceCombo.selectByText(data.province);
		_page.cityCombo.selectByText(data.city);
		_page.areaCombo.selectByText(data.area);
		//_page.$buyerAcct.html(data.buyerAcct||"");
		//_page.$buyerName.val(data.buyerName||"");
		_page.$buyerEmail.val(data.buyerEmail||"");
		_page.$toName.val(data.receiver||"");
		_page.$toTel.val(data.phone||"");
		_page.$toPhone.val(data.mobile||"");
		_page.$toPostcode.val(data.postalCode||"");
		_page.$toAddress.val(data.address||"");
		_page.$buyerRemark.val(data.buyerDesc||"");
		_page.$sellerRemark.val(data.salerDesc||"");
		_page.$amount.html(data.totalAmount);//应收金额
		_page.$realIncome.html(data.rpAmount);//实收金额
		_page.$shipmentsFree.html(data.shipmentsFree);//运费
		_page.logisticsDetailCombo.selectByValue(data.expressId);
		_page.shippingMethodDetailCombo.selectByValue(data.deliveryId || 1);
	},
	autoDown = {
			start:function(min){
				if(!_page.$loadManual.length)return;
				var _this = this;
				var tDayBegin = new Date();
				var tDayEnd = new Date();
				tDayEnd.addDays(1);
				if (!Business.verifyRight('ORDERCLOUD_DOWNLOAD')) {
					return ;
				};
				this.timer = setInterval(function(){
					if(_page.$loadManual.hasClass('ui-btn-dis')){
						return;
					}
					_page.$loadManual.addClass('ui-btn-dis').html('正在下载');
					Public.ajaxGet('../scm/eshop.do?cmd=trades.sold.get', {
						sid : -1,
						start_created : tDayBegin.Format("yyyy-MM-dd"),
						end_created : tDayEnd.Format("yyyy-MM-dd")
					}, function(data) {
						if (data.status === 200) {
							if(data.data.items){
								//_page.$grid.trigger('reloadGrid');
							}
							else{
								_this.stop();
							}
							_page.$loadManual.removeClass('ui-btn-dis').html('手工下载');
							
						}else{
							//defaultPage.Public.tips({type : 1,content : data.msg});
							_page.$loadManual.removeClass('ui-btn-dis').html('手工下载');
							_this.stop();
						}
					});
					},min*60*1000);
			},
			stop:function(){
				this.timer && clearInterval(this.timer);
			}
	},
	(function() {
		dataHandle.init();
		_page.init();// 初始化文档内容
		_event.init();// 挂载事件
		disEditable();

		setTimeout(function(){if(GetQueryString("clickType")=="formNav"){$("#loadManual").trigger('click')};},100)
		
		//autoDown.start(5);//自动下载,5min下载一次当前数据
		$(window).resize(function(){
			Public.resizeGrid(adjustH);
			var w = $('#orderDetail').width();
			_page.$gridDetail.jqGrid('setGridWidth', w-220);
		});
		$(window).trigger('resize');
	})();
});
var kdrprint = {
		doPrint : function(formclassid, expresstype ,idSet,templateId) {
			kdrdp = this.getKDReportDesigner($('#viewobject')[0], $('#viewactivex')[0]);
			if(!kdrprint.inited){
				kdrprint.inited = true;
				//kdrdp = this.getKDReportDesigner($('#viewobject')[0], $('#viewactivex')[0]);
				if(!kdrdp.VERSION){
					$.dialog({
						title:'下载打印控件',
						content:'url:download.jsp',
						lock:true
					});
					return;
				}
			}
			_formclassid = formclassid;
			_isPrint = true;
			this.printkdr(_formclassid, templateId, expresstype, idSet,this.updateorderStatus);
		},
		
		getKDReportDesigner : function(oOBJECT, oEMBED) {
			var kdrd;
			try {
				// =====判断浏览器类型:===============
				var isIE = (navigator.userAgent.indexOf('MSIE') >= 0) ||(navigator.userAgent.indexOf('Trident') >= 0);
				var is64IE = isIE && (navigator.userAgent.indexOf('x64') >=	0);

				// =====如果页面有kdrdp就直接使用，没有则新建:==========
				if (oOBJECT != undefined || oEMBED != undefined) {
					if (isIE) {
						kdrd = oOBJECT;
					
						oEMBED.setAttribute("style",

								"position:absolute;left:0px;top:-100px;width:0px;height:0px;");
					} else {
						kdrd = oEMBED;
						oOBJECT.setAttribute("style","position:absolute;left:0px;top:-100px;width:0px;height:0px;");
					}
				}

				// 判断打印插件的版本
				/*
				 * var printVersion = KERP.require('Config').get
				 * 
				 * ('PrintConfig').PrintControlVersion; if (kdrdp.VERSION >=
				 * printVersion) { return kdrdp; } else { return null; }
				 */

				return kdrd;
			} catch (err) {
				Public.tips({
					type : 1,
					content : '打印设计控件对象失败！' +

					err
				});

			}
		},
		openkdrfile : function(kdrfileUrl,fn,formclassid, sid, printer,callback) {
			Public.ajax({
				url : '/bs/print.do?action=downloadNotePrint&kdrUrl='
						+ kdrfileUrl,
				dataType : "text",
				success : function(data) {
					kdrdp.openReportFromDB(data);
					fn && fn(formclassid, sid, printer,callback);
					
				}
			});
			//.ReadHttpFile(kdrUrl);
		},
        
		showDefaultPrinter : function(formclassid, tempeletid, logisticID, sid,fn) {
			
			//kdrdp.openReportFromDB('');
			if (tempeletid) {
				this.getkdrinfo(formclassid, logisticID, sid,fn);
			} else {
				this.getkdrinfobyID(tempeletid, sid,fn);
			}
		},
		getkdrinfo : function(formclassid, logisticID, sid,fn) {
		
			Public.ajaxPost('/bs/print.do?action=querydefaultKdr', {
				expressId : logisticID,
				formClassID :formclassid
			}, function(data) {
				if ( data.status == 200) {
					kdrprint.setprinter(data.data, sid,fn);
				} else {
					defaultPage.Public.tips({
						type : 1,
						content : '请转到打印设置页面,设置默认模板！'
						+ data.msg
					});
				}
			});
		},
		getkdrinfobyID: function(tempeletid, sid,fn) {
            
			Public.ajaxPost('/bs/print.do?action=qureyByID', {
				templateid : tempeletid
			}, function(data) {
				if ( data.status == 200) {
					kdrprint.setprinter(data.data, sid,fn);
				} else {
					defaultPage.Public.tips({
						type : 1,
						content : '请转到打印设置页面,检查此模板是否存在！'
						+ data.msg
					});
				}
			});
		},
		setprinter : function(data, sid,fn) {

			if (data.templateid == "") {
				defaultPage.Public.tips({
					type : 1,
					content : '请转到打印设置页面,新建打印模板！'
				});
			} else {
				
				//this.preview(data.formclassid, sid, data.kdrUrl,data.printer);
				
				this.openkdrfile(data.kdrUrl,this.preview,data.formclassid, sid, data.printer,fn);
				
			}

		},
		//文件模板取数
		preview : function(formclassid,sid,printer,fn) {

			var isOK = false;
					
			//this.openkdrfile(formclassid, sid, sPath,printer);
			if (formclassid == billclass['快递单']) {
				kdrdp.setIsExpress(true);
				/*kdrdp.SetCellImageSize(1, 1, 1, 1, false);
				kdrdp.SetCellSize("A1:J10", parseInt(kdrdp.GetPrintPaperWidth()),
						parseInt(kdrdp.GetPrintPaperHeight()));*/
				// kdrdp.SetCellOnlyPrintText(1, 1, 25, 10, false);
			}
			//kdrdp.setAttribute("style", "width:1024px;height:800px;");
		
			var sfield = kdrdp.kdrfields();
			if (sid != '0' && sfield != "") {
				    var obj={};
				    obj.fields=sfield;
					kdrprint.print(formclassid, sid, JSON.stringify(obj) ,printer,fn);
			} else {
				if (printer != "") {
					isOK = kdrdp.setKdrPrinter(printer);
				}
				if (!isOK) {
					//设置打印计
					kdrdp.KdrOnPrintSetup();
				}
				kdrdp.PrintPreveiw();
			}			
		},
		print : function (lclassId, sid, fields,printer,fn) {

			Public.ajaxPost('/bs/print.do?action=getReportData', {
				'classId' : lclassId,
				'KeyIds' : sid,
				'fields' : fields
			}, function(data) {
				if ( data.status == 200) {
					// 需要设定纸张 需要指定打印机名称
					var isOK = false;
					kdrdp.SetStatDataFromString("ds1", data.data.kdrdata);
					if (printer != "") {
						isOK = kdrdp.setKdrPrinter(printer);
					}
					if (!isOK) {
						//真实打印
						kdrdp.KdrOnPrintSetup();
					}
					//console.log(sid.split(","));
					kdrdp.setOrderIDs(String(sid));
					kdrdp.ReplaceQueryParameter();
					kdrdp.SetRunTimePageSize(String(sid).split("|").length > 1 ? String(sid).split("|").length - 1: String(sid).split(",").length);
					if  (_isPrint) {
						kdrdp.HttpPrintReport(" ");
						fn&&fn(sid);
					}
					else
					{
						kdrdp.HttpPrintPreveiw();
					}
						                
				} else {
					defaultPage.Public.tips({
						type : 1,
						content : '读取数据失败！'
						+ data.msg
					});
				}
			});
			
		},
		

		
		printkdr:function(formclassid, tempeletid, logisticID, sid,fn){
			if (formclassid != billclass['快递单']) {
	            //配货单，发货单
	            //getDefaultPrinter(formclassid, logisticID, sid, fn);
	            this.showDefaultPrinter(formclassid, tempeletid, logisticID, sid,fn)
	            return;
	        }

	        //物流单
	        var tid;
	        var printSuccess;//标识打印成功

	        var list = this.cutSelf(String(sid).split(','));
	        //console.log(list);
	        function callBack(sid) {
	            printSuccess = true;
	            fn && fn(sid);
	        }

	        //getDefaultPrinter(formclassid, logisticID, list.splice(0, 1)[0], callBack);
	        this.showDefaultPrinter(formclassid, tempeletid, logisticID, list.splice(0, 1)[0],callBack)

	        function printOrder(list) {

	            if (list.length) {
	                tid = setTimeout(function () {
	                   
	                    if (printSuccess) {
	                        var sid = list.splice(0, 1)[0];
	                        //getDefaultPrinter(formclassid, logisticID, sid, callBack);
	                        kdrprint.showDefaultPrinter(formclassid, tempeletid, logisticID, sid,callBack)
	                        printSuccess = false;
	                    }
	                    printOrder(list);

	                }, 300);
	            }
	        }

	        printOrder(list);

			
		},
		cutSelf: function (list) {
	        var items = [list.splice(0, +limit).join(',')];
	        if (list.length) {
	            return items.concat(cutSelf(list));
	        }
	        else {
	            return items;
	        }
	    },
	    updateorderStatus:function(id)
	    {
	    	var kdr={};
	    	kdr.formclassid=_formclassid;
	    	kdr.id=id;
	    	
	    	Public.ajaxPost('/bs/print.do?action=updateOrderStatus', kdr, function(data) {
				if (data.status === 200) {
				    //typeof callback === 'function' && callback(data.data,oper=="update"?"edit":oper);
					defaultPage.Public.tips({
						content : '更新打印标识成功！'
					});
					// $('.js-search').trigger('click');
					_page.$grid.jqGrid('setGridParam').trigger('reloadGrid');
				} else {
					defaultPage.Public.tips({
						type : 1,
						content : '更新打印标识失败: ' + data.msg || '未知错误！'
					});
				}
			});
	    }
	};

	function GetQueryString(name) {
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
   var r = window.location.search.substr(1).match(reg);
   if (r!=null) return (r[2]); return null;
}