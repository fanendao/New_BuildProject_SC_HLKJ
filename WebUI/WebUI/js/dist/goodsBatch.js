function callbackSp(a) {
    alert(1);
    var b = parent.THISPAGE || api.data.page,
    c = b.curID,
    d = (b.newId, "fix1"),
    e = (api.data.callback, $("#grid").jqGrid("getGridParam", "selarrrow")),
    f = e.length,
    g = oldRow = parent.curRow,
    h = parent.curCol;
    if (f > 0) {
        parent.$("#fixedGrid").jqGrid("restoreCell", g, h);
        var i = (Public.getDefaultPage(), $("#grid").jqGrid("getRowData", e[0]));
        if (i.id = i.id.split("_")[0], "string" == typeof i.invSkus && (i.invSkus = $.parseJSON(i.invSkus)), "string" == typeof i.prices && (i.prices = $.parseJSON(i.prices)), "" === i.spec) var j = i.number + " " + i.name;
        else var j = i.number + " " + i.name + "_" + i.spec;
        i.isSerNum = 0 == i.isSerNum ? 0 : 1;
        var k = $.extend(!0, {},
        i);
        if (k.goods = j, k.id = d, c) var l = parent.$("#fixedGrid").jqGrid("setRowData", c, {});
        l && parent.$("#" + c).data("goodsInfo", i).data("storageInfo", {
            id: i.locationId,
            name: i.locationName
        }).data("unitInfo", {
            unitId: i.unitId,
            name: i.unitName
        }),
        parent.$("#fixedGrid").jqGrid("setRowData", d, {
            goods: j
        })
    }
    return e
}

function callback(a) {
    var b = parent.THISPAGE || api.data.page,
    c = b.curID,
    d = b.newId,
    e = api.data.callback,
    f = $("#grid").jqGrid("getGridParam", "selarrrow"),
    g = f.length,
    h = oldRow = parent.curRow,
    i = parent.curCol;
    if (isSingle) {
        parent.$("#grid").jqGrid("restoreCell", h, i);
        var j = $("#grid").jqGrid("getRowData", $("#grid").jqGrid("getGridParam", "selrow"));
        if ("string" == typeof j.invSkus && (j.invSkus = $.parseJSON(j.invSkus)), "string" == typeof j.prices && (j.prices = $.parseJSON(j.prices)), j.id = j.id.split("_")[0], delete j.amount, "" === j.spec) var k = j.number + " " + j.name;
        else var k = j.number + " " + j.name + "_" + j.spec;
        if (h > 8 && h > oldRow) var l = h;
        else var l = c;
        var m = parent.$("#grid").jqGrid("getRowData", Number(c));
        m = $.extend({},
        m, {
            id: j.id,
            goods: k,
            invNumber: j.number,
            invName: j.name,
            unitName: j.unitName,
            qty: 1 == j.isSerNum ? 0 : 1,
            price: j.salePrice,
            spec: j.spec,
            skuId: j.skuId,
            skuName: j.skuName,
            isSerNum: 0 == j.isSerNum ? 0 : 1,
            safeDays: j.safeDays,
            invSkus: j.invSkus,
            name: j.name,
            prices: j.prices
        }),
        e(l, m)
    } else if (g > 0) {
        parent.$("#grid").jqGrid("restoreCell", h, i);
        for (rowid in addList) {
            var j = addList[rowid];
            if (j.id = j.id.split("_")[0], delete j.amount, defaultPage.SYSTEM.goodsInfo.push(j), j.invSkus = j.invSkus, j.prices = j.prices, "" === j.spec) var k = j.number + " " + j.name;
            else var k = j.number + " " + j.name + "_" + j.spec;
            if (c) var l = c;
            else var l = d;
            var n = $.extend(!0, {},
            j);
            if (n.goods = k, n.id = l, n.qty = 1 == j.isSerNum ? 0 : n.qty || 1, c) var o = parent.$("#grid").jqGrid("setRowData", Number(c), {});
            else {
                var o = parent.$("#grid").jqGrid("addRowData", Number(d), {},
                "last");
                d++
            }
            j.isSerNum = 0 == j.isSerNum ? 0 : 1,
            o && parent.$("#" + l).data("goodsInfo", j).data("storageInfo", {
                id: j.locationId,
                name: j.locationName
            }).data("unitInfo", {
                unitId: j.unitId,
                name: j.unitName
            }),
            parent.$("#grid").jqGrid("setRowData", l, {
                goods: k
            }),
            h++;
            var p = parent.$("#" + c).next();
            c = p.length > 0 ? parent.$("#" + c).next().attr("id") : ""
        }
        e(d, c, h),
        $("#grid").jqGrid("resetSelection"),
        addList = {}
    }
    return f
}
var $grid = $("#grid"),
addList = {},
urlParam = Public.urlParam(),
zTree,
defaultPage = Public.getDefaultPage(),
SYSTEM = defaultPage.SYSTEM,
taxRequiredCheck = SYSTEM.taxRequiredCheck;
taxRequiredInput = SYSTEM.taxRequiredInput;

var api = frameElement.api,
data = api.data || {},
isSingle = data.isSingle || 0,
skuMult = data.skuMult,
queryConditions = {
    skey: (frameElement.api.data ? frameElement.api.data.skey : "") || "",
    isDelete: data.isDelete || 0
},
THISPAGE = {
    init: function (a) {
        this.initDom(),
        this.loadGrid(),
        this.initZtree(),
        this.addEvent()
    },
    initDom: function () {
        this.$_matchCon = $("#matchCon").val(queryConditions.skey || "请输入商品编号或名称或型号"),
        this.$_matchCon.placeholder()
    },
    initZtree: function () {
        zTree = Public.zTree.init($(".grid-wrap"), {
            defaultClass: "ztreeDefault",
            showRoot: !0
        },
        {
            callback: {
                beforeClick: function (a, b) {
                    queryConditions.assistId = b.id,
                    $("#search").trigger("click")
                }
            }
        })
    },
    loadGrid: function () {
        function a(a, b, c) {
            var d = '<div class="operating" data-id="' + c.id + '"><a class="ui-icon ui-icon-search" title="查询"></a><span class="ui-icon ui-icon-copy" title="商品图片"></span></div>';
            return d
        }
        $(window).height() - $(".grid-wrap").offset().top - 84;
        $("#grid").jqGrid({
            //url: "/basedata/inventory.do?action=list",
            url: "/basedata/16.txt",
            postData: queryConditions,
            datatype: "json",
            width: 578,
            height: 354,
            altRows: !0,
            gridview: !0,
            colModel: [{
                name: "id",
                label: "ID",
                width: 0,
                hidden: !0
            },
            {
                name: "operating",
                label: "操作",
                width: 60,
                fixed: !0,
                formatter: a,
                align: "center"
            },
            {
                name: "number",
                label: "商品编号",
                width: 100,
                title: !1
            },
            {
                name: "name",
                label: "商品名称",
                width: 200,
                classes: "ui-ellipsis"
            },
            {
                name: "skuClassId",
                label: "skuClassId",
                width: 0,
                hidden: !0
            },
            {
                name: "skuId",
                label: "skuId",
                width: 0,
                hidden: !0
            },
            {
                name: "skuName",
                label: "属性",
                width: 100,
                hidden: !skuMult,
                classes: "ui-ellipsis"
            },
            {
                name: "qty",
                label: "数量",
                width: 60,
                hidden: !skuMult,
                formatter: function (a) {
                    return a || "&#160;"
                }
            },
            {
                name: "spec",
                label: "规格型号",
                width: 106,
                title: !1
            },
            {
                name: "unitName",
                label: "单位",
                width: 60,
                title: !1
            },
            {
                name: "unitId",
                label: "单位ID",
                width: 0,
                hidden: !0
            },
            {
                name: "salePrice",
                label: "零售价",
                width: 0,
                hidden: !0
            },
            {
                name: "retailPrice",
                label: "批发价",
                width: 0,
                hidden: !0
            },
            {
                name: "salePrice1",
                label: "vip价",
                width: 0,
                hidden: !0
            },
            {
                name: "salePrice2",
                label: "折扣率一",
                width: 0,
                hidden: !0
            },
            {
                name: "salePrice3",
                label: "折扣率二",
                width: 0,
                hidden: !0
            },
            {
                name: "purPrice",
                label: "采购单价",
                width: 0,
                hidden: !0
            },
            {
                name: "locationId",
                label: "仓库ID",
                width: 0,
                hidden: !0
            },
            {
                name: "locationName",
                label: "仓库名称",
                width: 0,
                hidden: !0
            },
            {
                name: "isSerNum",
                label: "是否启用序列号",
                width: 0,
                hidden: !0
            },
            {
                name: "invSkus",
                label: "商品属性集合",
                width: 0,
                hidden: !0,
                formatter: function (a, b, c) {
                    return a && "object" == typeof a ? JSON.stringify(a) : a || "&#160;"
                }
            },
            {
                name: "isWarranty",
                label: "是否批次保质期管理",
                width: 0,
                hidden: !0
            },
            {
                name: "safeDays",
                label: "保质期(天)",
                width: 0,
                hidden: !0
            },
            {
                name: "remark",
                label: "备注",
                width: 100,
                classes: "ui-ellipsis"
            },
            {
                name: "purUnitId",
                label: "首选入库",
                width: 0,
                hidden: !0
            },
            {
                name: "purUnitName",
                label: "首选入库",
                width: 0,
                hidden: !0
            },
            {
                name: "saleUnitId",
                label: "首选出库",
                width: 0,
                hidden: !0
            },
            {
                name: "saleUnitName",
                label: "首选出库",
                width: 0,
                hidden: !0
            },
            {
                name: "prices",
                label: "价格数组",
                width: 0,
                hidden: !0,
                formatter: function (a, b, c) {
                    return a && "object" == typeof a ? JSON.stringify(a) : a || "&#160;"
                }
            }],
            cmTemplate: {
                sortable: !1
            },
            multiselect: isSingle ? !1 : !0,
            page: 1,
            sortname: "number",
            sortorder: "desc",
            pager: "#page",
            page: 1,
            rowNum: 100,
            rowList: [100, 200, 500],
            viewrecords: !0,
            shrinkToFit: !0,
            forceFit: !1,
            jsonReader: {
                root: "data.rows",
                records: "data.records",
                total: "data.total",
                repeatitems: !1,
                id: "id"
            },
            loadError: function (a, b, c) { },
            ondblClickRow: function (a, b, c, d) {
                isSingle && (callback(), frameElement.api.close())
            },
            onSelectRow: function (a, b) {
                if (b) {
                    var c = $grid.jqGrid("getRowData", a);
                    "string" == typeof c.invSkus && (c.invSkus = $.parseJSON(c.invSkus)),
                    "string" == typeof c.prices && (c.prices = $.parseJSON(c.prices)),
                    addList[a] = c
                } else addList[a] && delete addList[a]
            },
            onSelectAll: function (a, b) {
                for (var c = 0,
                d = a.length; d > c; c++) {
                    var e = a[c];
                    if (b) {
                        var f = $grid.jqGrid("getRowData", e);
                        "string" == typeof f.invSkus && (f.invSkus = $.parseJSON(f.invSkus)),
                        "string" == typeof f.prices && (f.prices = $.parseJSON(f.prices)),
                        addList[e] = f
                    } else addList[e] && delete addList[e]
                }
            },
            gridComplete: function () {
                if (!isSingle) for (_item in addList) {
                    var a = $("#" + addList[_item].id); !a.length && a.find("input:checkbox")[0].checked && $grid.jqGrid("setSelection", _item, !1)
                }
            }
        })
    },
    reloadData: function (a) {
        addList = {},
        $("#grid").jqGrid("setGridParam", {
            //  url: "/basedata/inventory.do?action=list",
            url: "/basedata/16.txt",
            datatype: "json",
            postData: a
        }).trigger("reloadGrid")
    },
    addEvent: function () {
        var a = this;
        $(".grid-wrap").on("click", ".ui-icon-search",
        function (a) {
            a.preventDefault();
            var b = $(this).parent().data("id");
            Business.forSearch(b, "")
        }),
        $(".grid-wrap").on("click", ".ui-icon-copy",
        function (a) {
            a.preventDefault();
            var b = $(this).parent().data("id"),
            c = "商品图片";
            parent.$.dialog({
                content: "url:http://vip2.youshang.com/settings/fileUpload.jsp",
                data: {
                    title: c,
                    id: b,
                    callback: function () { }
                },
                title: c,
                width: 775,
                height: 470,
                max: !1,
                min: !1,
                cache: !1,
                lock: !0
            })
        }),
        $("#search").click(function () {
            queryConditions.catId = a.catId,
            queryConditions.skey = "请输入商品编号或名称或型号" === a.$_matchCon.val() ? "" : a.$_matchCon.val(),
            a.reloadData(queryConditions)
        }),
        $("#refresh").click(function () {
            a.reloadData(queryConditions)
        })
    }
};
THISPAGE.init();