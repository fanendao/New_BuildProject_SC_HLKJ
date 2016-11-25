<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AddMenu.aspx.cs" Inherits="AspWebUI.SystemSet.AddMenu" %>

<!DOCTYPE html>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link href="../css/bootstrap.min.css" rel="stylesheet" />
    <script src="../js/jquery.min.js"></script>
    <script src="../js/bootstrap.min.js"></script>
    <link href="../css/animate.css" rel="stylesheet" />
    <link href="../css/style.css" rel="stylesheet" />
    <link href="../css/plugins/chosen/chosen.css" rel="stylesheet" />
</head>
<body class="gray-bg">
      
            <div class="col-sm-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>新增菜单</h5>
                    
                    </div>
                    <div class="ibox-content">
                    <form class="form-horizontal m-t" runat="server"  id="commentForm">
                         <div class="form-group">
                            <label class="font-noraml">基本示例</label>
                            <div class="input-group">
                                <select data-placeholder="选择省份..." class="chosen-select" runat="server" id="sel_sf" style="width:350px;" tabindex="2">
                                    <option value="">请选择省份</option>
                                    <option value="110000"  >北京</option>
                                    <option value="120000" >天津</option>
                                    <option value="130000" >河北省</option>
                                    <option value="140000" >山西省</option>
                                    <option value="150000" >内蒙古自治区</option>
                                    <option value="210000" >辽宁省</option>
                                    <option value="220000" >吉林省</option>
                                    <option value="230000" >黑龙江省</option>
                                    <option value="310000" >上海</option>
                                    <option value="320000" >江苏省</option>
                                    <option value="330000" >浙江省</option>
                                    <option value="340000" >安徽省</option>
                                    <option value="350000" >福建省</option>
                                    <option value="360000" >江西省</option>
                                    <option value="370000" >山东省</option>
                                    <option value="410000" >河南省</option>
                                    <option value="420000" >湖北省</option>
                                    <option value="430000" >湖南省</option>
                                    <option value="440000" >广东省</option>
                                    <option value="450000" >广西壮族自治区</option>
                                    <option value="460000" >海南省</option>
                                    <option value="500000" >重庆</option>
                                    <option value="510000" >四川省</option>
                                    <option value="520000" >贵州省</option>
                                    <option value="530000" >云南省</option>
                                    <option value="540000" >西藏自治区</option>
                                    <option value="610000" >陕西省</option>
                                    <option value="620000" >甘肃省</option>
                                    <option value="630000" >青海省</option>
                                    <option value="640000" >宁夏回族自治区</option>
                                    <option value="650000" >新疆维吾尔自治区</option>
                                    <option value="710000" >台湾省</option>
                                    <option value="810000" >香港特别行政区</option>
                                    <option value="820000" >澳门特别行政区</option>
                                    <option value="990000" >海外</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                                <label class="col-sm-4 control-label">菜单级数：</label>
                                <div class="col-sm-8">
                                  
                                    <asp:DropDownList ID="ddl_CDJS" CssClass="form-control m-b" runat="server" AutoPostBack="true" OnSelectedIndexChanged="ddl_CDJS_SelectedIndexChanged">
                                        <asp:ListItem Value="1">一级菜单</asp:ListItem>
                                        <asp:ListItem Value="2">二级菜单</asp:ListItem>
                                        <asp:ListItem Value="3">三级菜单</asp:ListItem>
                                    </asp:DropDownList>
                                </div>
                            </div>
                        <div class="form-group">
                                <label class="col-sm-4 control-label">上级菜单：</label>
                                <div class="col-sm-8"> 
                                    <asp:DropDownList ID="ddl_SJCD" runat="server" CssClass="form-control m-b">
                                        <asp:ListItem Value="-1">根节点</asp:ListItem>
                                    </asp:DropDownList>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">菜单名称：</label>
                                <div class="col-sm-8">
                                    <input id="txt_function_Name"    runat="server"  type="text" class="form-control" required aria-required="true">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">图标样式：</label>
                                <div class="col-sm-8">
                                    <input id="txt_function_ioc" runat="server" type="text" class="form-control" required aria-required="true">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">路径地址：</label>
                                <div class="col-sm-8">
                                    <input id="txt_ddl_SJCD" runat="server" type="text" class="form-control" required aria-required="true">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-4 control-label">菜单排序：</label>
                                <div class="col-sm-8">
                                    <input id="txt_function_order" runat="server"    type="number" class="form-control" required aria-required="true">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">是否公司：</label>
                                <div class="col-sm-8">
                                     <select class="form-control m-b" runat="server" id="sel_function_IsCompany" name="account">
                                        <option value="0">否</option>
                                        <option value="1">是</option> 
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">是否项目：</label>
                                <div class="col-sm-8">
                                    <select class="form-control m-b" runat="server" id="sel_function_IsProject" name="account">
                                        <option value="0">否</option>
                                        <option value="1">是</option> 
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">是否可点：</label>
                                <div class="col-sm-8">
                                     <select class="form-control m-b" runat="server" id="sel_function_isClick" name="account">
                                        <option value="0">否</option>
                                        <option value="1">是</option> 
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">是否提示：</label>
                                <div class="col-sm-8">
                                   <select class="form-control m-b" runat="server" id="sel_function_IsTip" name="account">
                                        <option value="0">否</option>
                                        <option value="1">是</option> 
                                    </select>
                                </div>
                            </div>
                              

                            <div class="form-group">
                                <div class="col-sm-4 col-sm-offset-5"> 
                                    <input type="submit"  value="提交"  class="btn btn-primary"/>
                                    &nbsp;
                                      <input type="reset"  value="重置"  class="btn btn-primary"/>
                                </div>
                              
                            </div>  <div style="display:none">
        <input runat="server" id="btn_Commit"  type="button" onserverclick="btn_Commit_ServerClick" />
    </div>
                        </form>
                    </div>
                </div> 
          </div>
  
    <script src="../js/plugins/validate/jquery.validate.min.js"></script>
    <script src="../js/plugins/validate/messages_zh.min.js"></script>
    <script src="../js/plugins/chosen/chosen.jquery.js"></script>
  
    <script type="text/javascript">
        $.validator.setDefaults(
            {
                highlight: function (e) {
                    $(e).closest(".form-group").removeClass("has-success").addClass("has-error")
                },
                success: function (e) {
                    e.closest(".form-group").removeClass("has-error").addClass("has-success");
                },
                errorElement: "span", errorPlacement: function (e, r) { e.appendTo(r.is(":radio") || r.is(":checkbox") ? r.parent().parent().parent() : r.parent()) }, errorClass: "help-block m-b-none",
                validClass: "help-block m-b-none"
            });

        $().ready(function () {
            $("#commentForm").validate({
                submitHandler: function (form) {
                    document.getElementById("btn_Commit").click();
                }
            });



            var config = {
                ".chosen-select": {},
                ".chosen-select-deselect": { allow_single_deselect: !0 },
                ".chosen-select-no-single": { disable_search_threshold: 10 },
                ".chosen-select-no-results": { no_results_text: "Oops, nothing found!" },
                ".chosen-select-width": { width: "95%" }
            };


            for (var selector in config) $(selector).chosen(config[selector]);
        });



       
    </script>
</body>
        
</html>
