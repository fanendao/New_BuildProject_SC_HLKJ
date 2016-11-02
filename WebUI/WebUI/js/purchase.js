var curRow, curCol, loading, SYSTEM = system = parent.SYSTEM,
billRequiredCheck = system.billRequiredCheck,
requiredMoney = system.requiredMoney,
taxRequiredCheck = system.taxRequiredCheck,
taxRequiredInput = system.taxRequiredInput,
hiddenAmount = !1,
hideCustomerCombo = !1,
urlParam = Public.urlParam(),
disEditable = urlParam.disEditable,
defaultPage = Public.getDefaultPage(),
qtyPlaces = Number(parent.SYSTEM.qtyPlaces),
pricePlaces = Number(parent.SYSTEM.pricePlaces),
amountPlaces = Number(parent.SYSTEM.amountPlaces),
isCopy = !1,
THISPAGE = {
    init: function (a) {
        "150502" == urlParam.transType ? this.mod_PageConfig = Public.mod_PageConfig.init("purchaseBack") : this.mod_PageConfig = Public.mod_PageConfig.init("purchase"),
        SYSTEM.isAdmin !== !1 || SYSTEM.rights.AMOUNT_INAMOUNT || (hiddenAmount = !0, $("#amountArea").hide()),
        this.initDom(a),
        this.loadGrid(a),
        this.initCombo(),
        a.id > 0 && a.checked ? this.disableEdit() : (this.editable = !0, $("#grid").jqGrid("setGridParam", {
            cellEdit: !0
        })),
        this.addEvent(),
        $.cookie("BarCodeInsert") && THISPAGE.$_barCodeInsert.addClass("active"),
        this.goodsEdittypeInit()
    },
    initDom: function (a) {
        var b = this;
        this.$_customer = $("#customer"),
        this.$_date = $("#date").val(system.endDate),
        this.$_number = $("#number"),
        this.$_note = $("#note"),
        this.$_discountRate = $("#discountRate"),
        this.$_deduction = $("#deduction"),
        this.$_discount = $("#discount"),
        this.$_payment = $("#payment"),
        this.$_arrears = $("#arrears"),
        this.$_totalArrears = $("#totalArrears"),
        this.$_toolTop = $("#toolTop"),
        this.$_toolBottom = $("#toolBottom"),
        this.$_paymentTxt = $("#paymentTxt"),
        this.$_accountInfo = $("#accountInfo"),
        this.$_userName = $("#userName"),
        this.$_modifyTime = $("#modifyTime"),
        this.$_createTime = $("#createTime"),
        this.$_checkName = $("#checkName"),
        this.customerArrears = 0,
        this.$_note.placeholder(),
        this.$_purExpense = $("#purExpense"),
        this.$_expenseInfo = $("#expenseInfo"),
        "150502" == originalData.transType ? (parent.$("#page-tab").find("li.l-selected").children("a").html("购货退货单"), $("#paymentTxt").html("本次退款")) : (parent.$("#page-tab").find("li.l-selected").children("a").html("购货单"), $("#paymentTxt").html("本次付款")),
        this.customerCombo = Business.billSupplierCombo($("#customer"), {
            defaultSelected: -1
        }),
        "add" !== a.status || a.buId ? (this.$_customer.data("contactInfo", {
            id: a.buId,
            name: a.contactName
        }), this.customerCombo.input.val(a.contactName)) : Public.ajaxPost("/basedata/contact.do?action=getRecentlyContact", {
            transType: originalData.transType,
            billType: "PUR"
        },
        function (a) {
            if ("" == b.customerCombo.input.val()) {
                a = a.data;
                var c = {
                    id: a.buId,
                    name: a.contactName,
                    cLevel: a.cLevel,
                    taxRate: a.taxRate
                };
                b.$_customer.data("contactInfo", c),
                b.customerCombo.input.val(a.contactName)
            }
        }),
        hideCustomerCombo && this.customerCombo.disable(),
        this.$_date.datepicker({
            onSelect: function (a) {
                if (!(originalData.id > 0)) {
                    var c = a.format("yyyy-MM-dd");
                    b.$_number.text(""),
                    Public.ajaxPost("/basedata/systemProfile.do?action=generateDocNo", {
                        billType: "PUR",
                        billDate: c
                    },
                    function (a) {
                        200 === a.status ? b.$_number.text(a.data.billNo) : parent.Public.tips({
                            type: 1,
                            content: a.msg
                        })
                    })
                }
            }
        }),
        a.description && this.$_note.val(a.description),
        this.$_discountRate.val(a.disRate),
        this.$_deduction.val(a.disAmount),
        this.$_discount.val(a.amount),
        this.$_payment.val(a.rpAmount),
        this.$_arrears.val(a.arrears),
        a.feeBill ? (this.$_expenseInfo.data("expenseInfo", a.feeBill), this.$_purExpense.val(a.feeBill.amount)) : this.$_purExpense.val("0.00"),
        requiredMoney && ($("#accountWrap").show(), SYSTEM.isAdmin !== !1 || SYSTEM.rights.SettAcct_QUERY ? this.accountCombo = Business.accountCombo($("#account"), {
            width: 112,
            height: 300,
            emptyOptions: !0,
            addOptions: {
                text: "多账户",
                value: -1
            },
            defaultSelected: ["id", a.accId],
            callback: {
                onChange: function (a) {
                    if (-1 === this.getValue()) b.chooseAccount();
                    else {
                        var c = [];
                        c.push({
                            accId: this.getValue(),
                            account: "",
                            payment: b.$_payment.val(),
                            wayId: 0,
                            way: "",
                            settlement: ""
                        }),
                        b.$_accountInfo.data("accountInfo", c).hide(),
                        b.$_payment.removeAttr("disabled").removeClass("ui-input-dis")
                    }
                }
            }
        }) : this.accountCombo = Business.accountCombo($("#account"), {
            width: 112,
            height: 300,
            data: [],
            editable: !1,
            disabled: !0,
            addOptions: {
                text: "(没有账户管理权限)",
                value: 0
            }
        }));
        var c = '<a id="savaAndAdd" class="ui-btn ui-btn-sp">保存并新增</a><a id="save" class="ui-btn">保存</a>',
        d = '<a id="add" class="ui-btn ui-btn-sp">新增</a><a id="copy" class="ui-btn">复制</a><a href="/scm/invPu.do?action=toPdf&id=' + a.id + '" target="_blank" id="print" class="ui-btn">打印</a><a id="edit" class="ui-btn">保存</a>',
        e = '<a id="add" class="ui-btn ui-btn-sp">新增</a><a id="copy" class="ui-btn">复制</a><a href="/scm/invPu.do?action=toPdf&id=' + a.id + '" target="_blank" id="print" class="ui-btn">打印</a>',
        f = "",
        g = "";
        billRequiredCheck ? (f = '<a class="ui-btn" id="audit">审核</a>', g = '<a class="ui-btn" id="reAudit">反审核</a>') : this.$_checkName.parent().hide();
        var h = '<a class="ui-btn-prev" id="prev" title="上一张"><b></b></a><a class="ui-btn-next" id="next" title="下一张"><b></b></a>';
        this.btn_add = c,
        this.btn_edit = d,
        this.btn_audit = f,
        this.btn_view = e,
        this.btn_reaudit = g,
        a.id > 0 ? (this.$_number.text(a.billNo), this.$_date.val(a.date), this.$_totalArrears.val(a.totalArrears), this.$_accountInfo.data("accountInfo", a.accounts), -1 === a.accId && (this.$_accountInfo.show(), b.$_payment.attr("disabled", "disabled").addClass("ui-input-dis")), $("#grid").jqGrid("footerData", "set", {
            qty: a.totalQty,
            amount: a.totalAmount
        }), "list" !== urlParam.flag && (h = ""), "edit" === a.status ? this.$_toolBottom.html("<span id=groupBtn>" + d + f + "</span>" + h) : a.checked ? ($("#mark").addClass("has-audit"), this.$_toolBottom.html('<span id="groupBtn">' + e + g + "</span>" + h)) : this.$_toolBottom.html('<span id="groupBtn">' + e + "</span>" + h), "150502" == a.transType ? this.idList = parent.cacheList.purchaseBackId || [] : this.idList = parent.cacheList.purchaseId || [], this.idPostion = $.inArray(String(a.id), this.idList), this.idLength = this.idList.length, 0 === this.idPostion && $("#prev").addClass("ui-btn-prev-dis"), this.idPostion === this.idLength - 1 && $("#next").addClass("ui-btn-next-dis"), this.$_userName.html(a.userName), this.$_modifyTime.html(a.modifyTime), this.$_createTime.html(a.createTime), this.$_checkName.html(a.checkName)) : (billRequiredCheck ? this.$_toolBottom.html("<span id=groupBtn>" + c + f + "</span>") : this.$_toolBottom.html('<span id="groupBtn">' + c + "</span>"), this.$_userName.html(system.realName || ""), this.$_modifyTime.parent().hide(), this.$_createTime.parent().hide(), this.$_checkName.parent().hide()),
        disEditable && (THISPAGE.disableEdit(), this.$_toolBottom.hide())
    },
    loadGrid: function (a) {
        function b(a) {
            if (taxRequiredCheck) {
                var b = $("#grid").jqGrid("getRowData", a),
                c = parseFloat(b.taxRate);
                if ($.isNumeric(c)) {
                    var d = parseFloat(b.amount),
                    e = d * c / 100,
                    f = d + e;
                    $("#grid").jqGrid("setRowData", a, {
                        tax: e,
                        taxAmount: f
                    })
                }
            }
        }
        function c(a, b, c) {
            return a ? (A(b.rowId), a) : c.invNumber ? c.invSpec ? c.invNumber + " " + c.invName + "_" + c.invSpec : c.invNumber + " " + c.invName : "&#160;"
        }
        function d(a, b) {
            var c = $(".skuAuto")[0];
            return c
        }
        function e(a, b, c) {
            var a = f(a),
            d = $("#grid").jqGrid("getRowData", b.rowId),
            e = $("#grid").jqGrid("getRowData", c.id);
            if ((c.isSerNum && "0" != c.isSerNum || e.isSerNum && "0" != e.isSerNum) && "合计" !== c.goods && (c.isSerNum || "1" == d.isSerNum || c.invSerNumList)) {
                var g = $("#" + b.rowId).data("goodsInfo");
                a = g && g.serNumList && g.serNumList.length > 0 || c.invSerNumList ? "<span class='qtyInsertAfter'>SN</span>" + a : "<span class='qtyInsert'>SN</span>" + a
            }
            return a || "&#160;"
        }
        function f(a) {
            if (a) var b = a.toString().replace(",", "");
            a = parseFloat(b);
            var c = qtyPlaces;
            if (0 === a || isNaN(a)) return "";
            a = a.toFixed(c).split(".");
            var d = /(\d{1,3})(?=(\d{3})+(?:$|\D))/g;
            return a[1] ? a[0].replace(d, "$1,") + "." + a[1] : a[0].replace(d, "$1,")
        }
        function g(a, b, c) {
            if ("get" === b) {
                if ("" !== $(".skuAuto").getCombo().getValue()) return $(a).val();
                var d = $(a).parents("tr");
                return d.removeData("skuInfo"),
                ""
            }
            "set" === b && $("input", a).val(c)
        }
        function h() {
            $("#initCombo").append($(".skuAuto").val(""))
        }
        function i(a, b) {
            var c = $(".storageAuto")[0];
            return c
        }
        function j(a, b, c) {
            if ("get" === b) {
                if ("" !== $(".storageAuto").getCombo().getValue()) return $(a).val();
                var d = $(a).parents("tr");
                return d.removeData("storageInfo"),
                ""
            }
            "set" === b && $("input", a).val(c)
        }
        function k() {
            $("#initCombo").append($(".storageAuto").val(""))
        }
        function l(a, b) {
            var c = $(".unitAuto")[0];
            return c
        }
        function m(a, b, c) {
            if ("get" === b) {
                if ("" !== $(".unitAuto").getCombo().getValue()) return $(a).val();
                var d = $(a).parents("tr"),
                e = d.data("unitInfo") || {};
                return THISPAGE.unitCombo.selectByIndex(e.unitId || e.id),
                e.name || ""
            }
            "set" === b && $("input", a).val(c)
        }
        function n() {
            $("#initCombo").append($(".unitAuto").val(""))
        }
        function o(a, b) {
            var c = $(".dateAuto")[0];
            return c
        }
        function p(a, b, c) {
            return "get" === b ? a.val() : void ("set" === b && $("input", a).val(c))
        }
        function q() {
            $("#initCombo").append($(".dateAuto"))
        }
        function r(a, b) {
            var c = $(".batchAuto")[0];
            return c
        }
        function s(a, b, c) {
            return "get" === b ? a.val() : void ("set" === b && $("input", a).val(c))
        }
        function t() {
            $("#initCombo").append($(".batchAuto").val(""))
        }
        function u(a, b) {
            var c = $(".priceAuto")[0];
            return c
        }
        function v(a, b, c) {
            if ("get" === b) {
                var d = a.val().split("：")[1];
                return d || a.val() || ""
            }
            "set" === b && $("input", a).val(c)
        }
        function w() {
            $("#initCombo").append($(".priceAuto").val(""))
        }
        function x(a, b) {
            var c = $('<input type="text" class="textbox"/>')[0];
            return c
        }
        function y(a, b, c) {
            a = $(a);
            var d = a.closest("tr").data("goodsInfo");
            if (!d) return "";
            if ("get" === b) {
                var e = a.val();
                return "&#160;" == e && (e = ""),
                e || ""
            }
            "set" === b && a.val(c)
        }
        function z() { }
        function A(a) {
            var b = $("#" + a).data("goodsInfo"),
            c = $("#customer").data("contactInfo");
            if (b) {
                if (b.batch || $("#grid").jqGrid("setCell", a, "batch", "&#160;"), b.safeDays || ($("#grid").jqGrid("setCell", a, "prodDate", "&#160;"), $("#grid").jqGrid("setCell", a, "safeDays", "&#160;"), $("#grid").jqGrid("setCell", a, "validDate", "&#160;")), 1 == b.isWarranty && $("#grid").jqGrid("showCol", "batch"), b.safeDays > 0 && ($("#grid").jqGrid("showCol", "prodDate"), $("#grid").jqGrid("showCol", "safeDays"), $("#grid").jqGrid("showCol", "validDate")), taxRequiredCheck && c && (b.taxRate = c.taxRate), b.prices && b.purUnitName) {
                    for (var d = 0; d < b.prices.length; d++) if (b.prices[d].unitId == b.purUnitId) {
                        b.price = b.prices[d].purPrice,
                        b.amount = b.price * b.qty;
                        break
                    }
                    b = $.extend(!0, b, {
                        mainUnit: b.purUnitName,
                        unitId: b.purUnitId
                    })
                }
                var e = {
                    skuName: b.skuName || "",
                    mainUnit: b.mainUnit || b.unitName,
                    unitId: b.unitId,
                    qty: b.qty || 1,
                    price: b.price || b.purPrice,
                    discountRate: b.discountRate || 0,
                    deduction: b.deduction || 0,
                    amount: b.amount,
                    locationName: b.locationName,
                    locationId: b.locationId,
                    taxRate: b.taxRate || taxRequiredInput,
                    srcOrderNo: b.srcOrderNo || "",
                    srcOrderEntryId: b.srcOrderEntryId || "",
                    srcOrderId: b.srcOrderId || "",
                    serNumList: b.serNumList,
                    safeDays: b.safeDays,
                    isSerNum: b.isSerNum
                };
                if (SYSTEM.ISSERNUM && 1 == b.isSerNum && (e.qty = e.serNumList ? e.serNumList.length : 0), e.qty > 0) {
                    var f = parseFloat(e.qty),
                    g = parseFloat(e.price),
                    h = parseFloat(e.discountRate);
                    $.isNumeric(g) && ($.isNumeric(h) ? (e.deduction = e.deduction || f * g * h / 100, e.amount = e.amount || f * g - e.deduction) : e.amount = e.amount || f * g)
                }
                e.amount = e.amount ? e.amount : e.price * e.qty;
                var i = Number(e.amount);
                if (taxRequiredCheck) {
                    var j = parseFloat(e.taxRate),
                    k = i * j / 100,
                    l = i + k;
                    e.tax = b.tax || k,
                    e.taxAmount = b.taxAmount || l;
                    var m = 1 - parseFloat(e.discountRate) / 100;
                    e.taxPrice = parseFloat(e.price) * (1 + j / 100) || i / m / parseFloat(e.qty) * (1 + j / 100)
                }
                var n = $("#grid").jqGrid("setRowData", a, e);
                n && THISPAGE.calTotal()
            }
        }
        var B = this,
        C = (new Date).format();
        if (a.id) {
            var D = 8 - a.entries.length;
            if (D > 0) for (var E = 0; D > E; E++) a.entries.push({})
        }
        B.newId = 9;
        var F = !1;
        1 === SYSTEM.siType && (F = !0);
        var G = [{
            name: "operating",
            label: " ",
            width: 60,
            fixed: !0,
            formatter: Public.billsOper_goods,
            align: "center"
        },
        {
            name: "goods",
            label: "商品",
            nameExt: '<span id="barCodeInsert">扫描枪录入</span>',
            width: 300,
            classes: "goods",
            formatter: c,
            editable: !0,
            enterCallback: function () {
                if (THISPAGE.$_barCodeInsert.hasClass("active")) {
                    var a = function (a) {
                        var b = $("#" + a),
                        c = b.next(),
                        d = b.index() + 1;
                        return 0 == c.length ? ($("#grid").jqGrid("addRowData", THISPAGE.newId, {},
                        "last"), THISPAGE.newId++, $("#" + (THISPAGE.newId - 1)).index()) : c.data("goodsInfo") ? arguments.callee(d) : d
                    }(THISPAGE.curID);
                    $("#grid").jqGrid("nextCell", a, 1)
                } else 0 != $("#grid")[0].p.savedRow.length && $("#grid").jqGrid("nextCell", $("#grid")[0].p.savedRow[0].id, $("#grid")[0].p.savedRow[0].ic)
            }
        },
        {
            name: "skuId",
            label: "属性ID",
            hidden: !0
        },
        {
            name: "skuName",
            label: "属性",
            width: 100,
            classes: "ui-ellipsis skuInfo",
            hidden: !SYSTEM.enableAssistingProp,
            editable: !0,
            edittype: "custom",
            editoptions: {
                custom_element: d,
                custom_value: g,
                handle: h,
                trigger: "ui-icon-ellipsis"
            }
        },
        {
            name: "mainUnit",
            label: "单位",
            width: 80,
            editable: !0,
            edittype: "custom",
            editoptions: {
                custom_element: l,
                custom_value: m,
                handle: n,
                trigger: "ui-icon-triangle-1-s"
            }
        },
        {
            name: "unitId",
            label: "单位Id",
            hidden: !0
        },
        {
            name: "locationName",
            label: "仓库",
            nameExt: '<small id="batchStorage">(批量)</small>',
            width: 100,
            editable: !0,
            edittype: "custom",
            editoptions: {
                custom_element: i,
                custom_value: j,
                handle: k,
                trigger: "ui-icon-triangle-1-s"
            }
        },
        {
            name: "batch",
            label: "批次",
            width: 90,
            classes: "ui-ellipsis batch",
            hidden: !0,
            title: !1,
            editable: !0,
            align: "left",
            edittype: "custom",
            edittype: "custom",
            editoptions: {
                custom_element: r,
                custom_value: s,
                handle: t,
                trigger: "ui-icon-ellipsis"
            }
        },
        {
            name: "prodDate",
            label: "生产日期",
            width: 90,
            hidden: !0,
            title: !1,
            editable: !0,
            edittype: "custom",
            edittype: "custom",
            editoptions: {
                custom_element: o,
                custom_value: p,
                handle: q
            }
        },
        {
            name: "safeDays",
            label: "保质期(天)",
            width: 90,
            hidden: !0,
            title: !1,
            addClassign: "left"
        },
        {
            name: "validDate",
            label: "有效期至",
            width: 90,
            hidden: !0,
            title: !1,
            align: "left"
        },
        {
            name: "qty",
            label: "数量",
            width: 80,
            align: "right",
            classes: "right",
            unformat: function (a, b, c) {
                var d, e, f = (b.colModel.formatter, b.colModel.formatoptions || {}),
                g = /([\.\*\_\'\(\)\{\}\+\?\\])/g,
                f = $.extend({},
                ($.jgrid.formatter || {}).currency, f);
                return e = f.thousandsSeparator.replace(g, "\\$1"),
                stripTag = new RegExp(e, "g"),
                d = $(c).text(),
                f.prefix && f.prefix.length && (d = d.substr(f.prefix.length)),
                f.suffix && f.suffix.length && (d = d.substr(0, d.length - f.suffix.length)),
                d = d.replace(stripTag, "").replace(f.decimalSeparator, ".").replace("SN", "")
            },
            formatter: e,
            formatoptions: {
                decimalPlaces: qtyPlaces
            },
            trigger: "qtyInsert",
            editable: !0,
            edittype: "custom",
            editoptions: {
                custom_element: x,
                custom_value: y,
                handle: z
            }
        },
        {
            name: "price",
            label: "购货单价",
            hidden: hiddenAmount,
            width: 100,
            fixed: !0,
            align: "right",
            formatter: "currency",
            formatoptions: {
                showZero: !0,
                decimalPlaces: pricePlaces
            },
            editable: !0,
            edittype: "custom",
            editoptions: {
                custom_element: u,
                custom_value: v,
                handle: w,
                trigger: "ui-icon-triangle-1-s"
            }
        }];
        taxRequiredCheck && G.push({
            name: "taxPrice",
            label: "含税单价",
            hidden: hiddenAmount,
            width: 100,
            fixed: !0,
            align: "right",
            formatter: "currency",
            formatoptions: {
                showZero: !0,
                decimalPlaces: pricePlaces
            },
            editable: !0,
            edittype: "custom",
            editoptions: {
                custom_element: u,
                custom_value: v,
                handle: w,
                trigger: "ui-icon-triangle-1-s"
            }
        }),
        G.push({
            name: "discountRate",
            label: "折扣率(%)",
            hidden: hiddenAmount,
            width: 70,
            fixed: !0,
            align: "right",
            formatter: "integer",
            editable: !0
        },
        {
            name: "deduction",
            label: "折扣额",
            hidden: hiddenAmount,
            width: 70,
            fixed: !0,
            align: "right",
            formatter: "currency",
            formatoptions: {
                showZero: !0,
                decimalPlaces: amountPlaces
            },
            editable: !0
        },
        {
            name: "isSerNum",
            label: "是否有序列号",
            hidden: !0,
            width: 100
        },
        {
            name: "prices",
            label: "销售价格数组",
            hidden: !0,
            width: 100
        },
        {
            name: "amount",
            label: "购货金额",
            hidden: hiddenAmount,
            width: 100,
            fixed: !0,
            align: "right",
            formatter: "currency",
            formatoptions: {
                showZero: !0,
                decimalPlaces: amountPlaces
            },
            editable: !0
        }),
        this.calAmount = "amount",
        taxRequiredCheck && (G.pop(), G.push({
            name: "amount",
            label: "金额",
            hidden: hiddenAmount,
            width: 100,
            fixed: !0,
            align: "right",
            formatter: "currency",
            formatoptions: {
                showZero: !0,
                decimalPlaces: amountPlaces
            },
            editable: !0
        },
        {
            name: "taxRate",
            label: "税率(%)",
            hidden: hiddenAmount,
            width: 70,
            fixed: !0,
            align: "right",
            formatter: "integer",
            editable: !0
        },
        {
            name: "tax",
            label: "税额",
            hidden: hiddenAmount,
            width: 70,
            fixed: !0,
            align: "right",
            formatter: "currency",
            formatoptions: {
                showZero: !0,
                decimalPlaces: amountPlaces
            },
            editable: !0
        },
        {
            name: "taxAmount",
            label: "价税合计",
            hidden: hiddenAmount,
            width: 100,
            fixed: !0,
            align: "right",
            formatter: "currency",
            formatoptions: {
                showZero: !0,
                decimalPlaces: amountPlaces
            },
            editable: !0
        }), this.calAmount = "taxAmount"),
        G.push({
            name: "shareAmount",
            label: "采购费用",
            hidden: hiddenAmount,
            width: 100,
            title: !0,
            formatter: "currency",
            editable: !0
        },
        {
            name: "description",
            label: "备注",
            width: 150,
            title: !0,
            editable: !0
        },
        {
            name: "srcOrderEntryId",
            label: "源单分录ID",
            width: 0,
            hidden: !0
        },
        {
            name: "srcOrderId",
            label: "源单ID",
            width: 0,
            hidden: !0
        },
        {
            name: "srcOrderNo",
            label: "源单号",
            width: 120,
            fixed: !0,
            hidden: F,
            formatter: function (a, b, c) {
                return a && (hideCustomerCombo = !0),
                a || "&#160;"
            }
        });
        var H = "grid";
        B.mod_PageConfig.gridReg(H, G),
        G = B.mod_PageConfig.conf.grids[H].colModel,
        $("#grid").jqGrid({
            data: a.entries,
            datatype: "clientSide",
            autowidth: !0,
            height: "100%",
            rownumbers: !0,
            gridview: !0,
            onselectrow: !1,
            colModel: G,
            cmTemplate: {
                sortable: !1,
                title: !1
            },
            shrinkToFit: !1,
            forceFit: !0,
            rowNum: 1e3,
            cellEdit: !1,
            cellsubmit: "clientArray",
            localReader: {
                root: "rows",
                records: "records",
                repeatitems: !1,
                id: "id"
            },
            jsonReader: {
                root: "data.entries",
                records: "records",
                repeatitems: !1,
                id: "id"
            },
            loadComplete: function (a) {
                if (THISPAGE.$_barCodeInsert = $("#barCodeInsert"), urlParam.id > 0) {
                    var b = a.rows,
                    c = b.length;
                    B.newId = c + 1;
                    for (var d = 0; c > d; d++) {
                        var e = d + 1,
                        f = b[d];
                        if ($.isEmptyObject(b[d])) break;
                        var g = $.extend(!0, {
                            id: f.invId,
                            number: f.invNumber,
                            name: f.invName,
                            spec: f.invSpec,
                            unitId: f.unitId,
                            unitName: f.mainUnit,
                            prices: f.prices,
                            isSerNum: f.isSerNum,
                            serNumList: f.serNumList || f.invSerNumList,
                            skuId: f.skuId,
                            skuName: f.skuName
                        },
                        f);
                        Business.cacheManage.getGoodsInfoByNumber(g.number,
                        function (a) {
                            g.isSerNum = a.isSerNum,
                            g.isWarranty = f.isWarranty = a.isWarranty,
                            g.safeDays = f.safeDays = a.safeDays,
                            g.invSkus = a.invSkus,
                            g.prices = a.prices,
                            g.id = f.invId,
                            $("#" + e).data("goodsInfo", g).data("storageInfo", {
                                id: f.locationId,
                                name: f.locationName
                            }).data("unitInfo", {
                                unitId: f.unitId,
                                name: f.mainUnit
                            }).data("skuInfo", {
                                name: f.skuName,
                                id: f.skuId
                            }).data("prices", {
                                id: f.prices
                            })
                        }),
                        1 == f.isWarranty && $("#grid").jqGrid("showCol", "batch"),
                        f.safeDays > 0 && ($("#grid").jqGrid("showCol", "prodDate"), $("#grid").jqGrid("showCol", "safeDays"), $("#grid").jqGrid("showCol", "validDate"))
                    }
                }
            },
            gridComplete: function () {
                setTimeout(function () {
                    Public.autoGrid($("#grid"))
                },
                10)
            },
            afterEditCell: function (a, b, c, d, e) {
                function f() {
                    var b = $("#" + a).data("goodsInfo");
                    if (b) {
                        var c = $("#grid").jqGrid("getRowData", a);
                        b = $.extend(!0, {},
                        b),
                        b.skuName = c.skuName,
                        b.mainUnit = c.mainUnit,
                        b.unitId = c.unitId,
                        b.qty = c.qty,
                        b.price = c.price,
                        b.taxPrice = c.taxPrice,
                        b.discountRate = c.discountRate,
                        b.deduction = c.deduction,
                        b.amount = c.amount,
                        b.taxRate = c.taxRate,
                        b.tax = c.tax,
                        b.taxAmount = c.taxAmount,
                        b.locationName = c.locationName,
                        b.srcOrderNo = c.srcOrderNo,
                        $("#" + a).data("goodsInfo", b)
                    }
                }
                if (THISPAGE.curID = a, "goods" === b && (f(), $("#" + d + "_goods", "#grid").val(c), THISPAGE.goodsCombo.selectByText(c)), "skuName" === b) {
                    f();
                    var g = $("#" + a).data("goodsInfo");
                    if (!g || !g.invSkus || !g.invSkus.length) return $("#grid").jqGrid("restoreCell", d, e),
                    curCol = e + 1,
                    $("#grid").jqGrid("nextCell", d, e + 1),
                    void THISPAGE.skuCombo.loadData([], 1, !1);
                    if ("string" == typeof g.invSkus && (g.invSkus = $.parseJSON(g.invSkus)), $("#" + d + "_skuName", "#grid").val(c), THISPAGE.skuCombo.loadData(g.invSkus || [], 1, !1), THISPAGE.skuCombo.selectByText(c), !g || "150502" != originalData.transType) return;
                    SYSTEM.ISSERNUM && 1 == g.isSerNum && Business.serNumManage({
                        row: $("#" + a),
                        enableStorage: !0,
                        enableSku: !0,
                        isCreate: "150502" != originalData.transType
                    })
                }
                if ("qty" === b) {
                    f();
                    var h = $("#" + a),
                    g = h.data("goodsInfo");
                    if (!g) return;
                    $("#" + d + "_qty", "#grid").val(c),
                    SYSTEM.ISSERNUM && 1 == g.isSerNum && Business.serNumManage({
                        row: h,
                        enableStorage: 0 == c,
                        enableSku: 0 == c,
                        isCreate: "150502" != originalData.transType
                    })
                }
                if ("price" === b && $("#" + d + "_price", "#grid").val(c), "taxPrice" === b && $("#" + d + "_taxPrice", "#grid").val(c), "locationName" === b) {
                    $("#" + d + "_locationName", "#grid").val(c),
                    THISPAGE.storageCombo.selectByText(c);
                    var g = $("#" + a).data("goodsInfo");
                    if (!g || "150502" != originalData.transType) return;
                    SYSTEM.ISSERNUM && 1 == g.isSerNum && Business.serNumManage({
                        row: $("#" + a),
                        enableStorage: !0,
                        enableSku: !0,
                        isCreate: "150502" != originalData.transType
                    })
                }
                if ("batch" === b) {
                    var g = $("#" + a).data("goodsInfo");
                    if (!g) return $("#grid").jqGrid("restoreCell", d, e),
                    curCol = e + 1,
                    void $("#grid").jqGrid("nextCell", d, e + 1);
                    $("#" + d + "_batch", "#grid").val(c),
                    THISPAGE.batchCombo.selectByText(c)
                }
                if ("prodDate" === b) {
                    var g = $("#" + a).data("goodsInfo");
                    if (!g) return $("#grid").jqGrid("restoreCell", d, e),
                    curCol = e + 1,
                    void $("#grid").jqGrid("nextCell", d, e + 1);
                    if (!g.safeDays) return $("#grid").jqGrid("restoreCell", d, e),
                    curCol = e + 1,
                    void $("#grid").jqGrid("nextCell", d, e + 1);
                    c ? THISPAGE.cellPikaday.setDate(c) : THISPAGE.cellPikaday.setDate(THISPAGE.cellPikaday.getDate() || new Date)
                }
                if ("mainUnit" === b) {
                    $("#" + d + "_mainUnit", "#grid").val(c);
                    var i = $("#" + a).data("unitInfo") || {};
                    if (!i.unitId || "0" === i.unitId) return $("#grid").jqGrid("restoreCell", d, e),
                    curCol = e + 1,
                    void $("#grid").jqGrid("nextCell", d, e + 1);
                    THISPAGE.unitCombo.enable(),
                    THISPAGE.unitCombo.loadData(function () {
                        for (var a = {},
                        b = 0; b < SYSTEM.unitInfo.length; b++) {
                            var c = SYSTEM.unitInfo[b],
                            d = i.unitId;
                            i.unitId == c.id && (i = c),
                            i.unitId = d;
                            var e = c.unitTypeId || b;
                            a[e] || (a[e] = []),
                            a[e].push(c)
                        }
                        return i.unitTypeId ? a[i.unitTypeId] : [i]
                    }),
                    THISPAGE.unitCombo.selectByText(c)
                }
            },
            formatCell: function (a, b, c, d, e) {
                if ("qty" == b && c) {
                    var f = c.split("</span>");
                    return 2 === f.length ? f[1] : f[0] || "&160;"
                }
            },
            beforeSaveCell: function (a, b, c, d, e) {
                if ("goods" === b) {
                    var f = $("#" + a).data("goodsInfo");
                    if (!f) {
                        B.skey = c;
                        var g, h = function (b) {
                            $("#" + a).data("goodsInfo", b).data("storageInfo", {
                                id: b.locationId,
                                name: b.locationName
                            }).data("unitInfo", {
                                unitId: b.unitId,
                                name: b.unitName
                            }).data("skuInfo", {
                                id: b.skuId,
                                name: b.skuName
                            }),
                            g = Business.formatGoodsName(b)
                        };
                        return THISPAGE.$_barCodeInsert && THISPAGE.$_barCodeInsert.hasClass("active") ? Business.cacheManage.getGoodsInfoByBarCode(c, h, !0) : Business.cacheManage.getGoodsInfoByNumber(c, h, !0),
                        g ? g : ($.dialog({
                            width: 775,
                            height: 510,
                            title: "选择商品",
                            content: "url:/settings/goods-batch.jsp",
                            data: {
                                skuMult: SYSTEM.enableAssistingProp,
                                skey: B.skey,
                                callback: function (a, b, c) {
                                    "" === b && ($("#grid").jqGrid("addRowData", a, {},
                                    "last"), B.newId = a + 1),
                                    setTimeout(function () {
                                        $("#grid").jqGrid("editCell", c, 2, !0)
                                    },
                                    10),
                                    B.calTotal()
                                }
                            },
                            init: function () {
                                B.skey = ""
                            },
                            lock: !0,
                            button: [{
                                name: "选中",
                                defClass: "ui_state_highlight fl",
                                focus: !0,
                                callback: function () {
                                    return this.content.callback && this.content.callback("purchase"),
                                    !1
                                }
                            },
                            {
                                name: "选中并关闭",
                                defClass: "ui_state_highlight",
                                callback: function () {
                                    return this.content.callback("purchase"),
                                    this.close(),
                                    !1
                                }
                            },
                            {
                                name: "关闭",
                                callback: function () {
                                    return !0
                                }
                            }]
                        }), setTimeout(function () {
                            $("#grid").jqGrid("editCell", curRow, 2, !0),
                            $("#grid").jqGrid("setCell", curRow, 2, "")
                        },
                        10), "&#160;")
                    }
                }
                return c
            },
            afterSaveCell: function (a, c, d, e, f) {
                switch (c) {
                    case "goods":
                        break;
                    case "skuName":
                        $("#" + a).data("goodsInfo").srcOrderNo && $("#grid").jqGrid("setRowData", a, {
                            srcOrderNo: "",
                            srcOrderId: "",
                            srcOrderEntryId: ""
                        });
                        break;
                    case "mainUnit":
                        var g = $(".unitAuto").getCombo().getValue(),
                        h = $("#" + a).data("goodsInfo"),
                        i = $("#grid").jqGrid("getRowData", a);
                        if (h.prices) for (var j = 0; j < h.prices.length; j++) if (h.prices[j].unitId == g) {
                            var k = parseFloat($("#grid").jqGrid("getRowData", a).qty),
                            l = h.prices[j].purPrice,
                            m = parseFloat($("#grid").jqGrid("getRowData", a).discountRate),
                            n = parseFloat(i.taxRate);
                            if ($.isNumeric(l)) if ($.isNumeric(m)) var o = k * l * m / 100,
                            p = k * l - o,
                            q = $("#grid").jqGrid("setRowData", a, {
                                unitId: g,
                                price: l,
                                deduction: o,
                                amount: p
                            });
                            else var q = $("#grid").jqGrid("setRowData", a, {
                                unitId: g,
                                amount: k * l
                            });
                            if ($.isNumeric(n)) var r = l * (1 + n / 100),
                            q = $("#grid").jqGrid("setRowData", a, {
                                taxPrice: r
                            });
                            b(a),
                            q && THISPAGE.calTotal()
                        }
                        break;
                    case "qty":
                        var d = parseFloat(d),
                        i = $("#grid").jqGrid("getRowData", a),
                        l = parseFloat(i.price),
                        m = parseFloat(i.discountRate);
                        if ($.isNumeric(l)) if ($.isNumeric(m)) var o = d * l * m / 100,
                        p = d * l - o,
                        q = $("#grid").jqGrid("setRowData", a, {
                            deduction: o,
                            amount: p
                        });
                        else var q = $("#grid").jqGrid("setRowData", a, {
                            amount: d * l
                        });
                        b(a),
                        q && THISPAGE.calTotal();
                        break;
                    case "price":
                        var d = parseFloat(d),
                        i = $("#grid").jqGrid("getRowData", a),
                        k = parseFloat(i.qty),
                        m = parseFloat(i.discountRate),
                        n = parseFloat(i.taxRate);
                        if ($.isNumeric(k)) if ($.isNumeric(m)) var o = d * k * m / 100,
                        p = d * k - o,
                        q = $("#grid").jqGrid("setRowData", a, {
                            deduction: o,
                            amount: p
                        });
                        else var q = $("#grid").jqGrid("setRowData", a, {
                            amount: d * k
                        });
                        if ($.isNumeric(n)) var r = d * (1 + n / 100),
                        q = $("#grid").jqGrid("setRowData", a, {
                            taxPrice: r
                        });
                        b(a),
                        q && THISPAGE.calTotal();
                        break;
                    case "taxPrice":
                        var d = parseFloat(d),
                        i = $("#grid").jqGrid("getRowData", a),
                        n = parseFloat(i.taxRate);
                        if ($.isNumeric(n)) var l = d / (1 + n / 100),
                        q = $("#grid").jqGrid("setRowData", a, {
                            price: l
                        });
                        var k = parseFloat(i.qty),
                        m = parseFloat(i.discountRate);
                        if ($.isNumeric(k)) if ($.isNumeric(m)) var o = l * k * m / 100,
                        p = l * k - o,
                        q = $("#grid").jqGrid("setRowData", a, {
                            deduction: o,
                            amount: p
                        });
                        else var q = $("#grid").jqGrid("setRowData", a, {
                            amount: l * k
                        });
                        b(a),
                        q && THISPAGE.calTotal();
                        break;
                    case "discountRate":
                        var d = parseFloat(d),
                        i = $("#grid").jqGrid("getRowData", a),
                        k = parseFloat(i.qty),
                        l = parseFloat(i.price);
                        if ($.isNumeric(k) && $.isNumeric(l)) var s = k * l,
                        o = s * d / 100,
                        p = s - o,
                        q = $("#grid").jqGrid("setRowData", a, {
                            deduction: o,
                            amount: p
                        });
                        b(a),
                        q && THISPAGE.calTotal();
                        break;
                    case "deduction":
                        var d = parseFloat(d),
                        i = $("#grid").jqGrid("getRowData", a),
                        k = parseFloat(i.qty),
                        l = parseFloat(i.price);
                        if ($.isNumeric(k) && $.isNumeric(l)) var s = k * l,
                        p = s - d,
                        m = s ? (100 * d / s).toFixed(amountPlaces) : 0,
                        q = $("#grid").jqGrid("setRowData", a, {
                            discountRate: m,
                            amount: p
                        });
                        b(a),
                        q && THISPAGE.calTotal();
                        break;
                    case "amount":
                        var d = parseFloat(d),
                        i = $("#grid").jqGrid("getRowData", a);
                        if ($.isNumeric(d)) {
                            var o = parseFloat(i.deduction),
                            t = parseFloat(i.qty),
                            l = (d + o) / t;
                            if ($.isNumeric(t) && $.isNumeric(l)) {
                                var s = t * l,
                                m = s ? (100 * o / s).toFixed(amountPlaces) : 0;
                                $("#grid").jqGrid("setRowData", a, {
                                    discountRate: m
                                })
                            }
                            $("#grid").jqGrid("setRowData", a, {
                                discountRate: m,
                                price: l
                            });
                            var n = parseFloat(i.taxRate);
                            if ($.isNumeric(n)) {
                                var r = l * (1 + n / 100);
                                $("#grid").jqGrid("setRowData", a, {
                                    taxPrice: r
                                })
                            }
                        }
                        b(a),
                        THISPAGE.calTotal();
                        break;
                    case "taxRate":
                        var u = d,
                        d = parseFloat(d),
                        i = $("#grid").jqGrid("getRowData", a),
                        p = parseFloat(i.amount),
                        l = parseFloat(i.price);
                        if ($.isNumeric(d)) {
                            var v = p * d / 100,
                            w = p + v,
                            q = $("#grid").jqGrid("setRowData", a, {
                                tax: v,
                                taxAmount: w
                            });
                            q && THISPAGE.calTotal()
                        }
                        if ("" === u) {
                            var q = $("#grid").jqGrid("setRowData", a, {
                                tax: "",
                                taxAmount: p
                            });
                            q && THISPAGE.calTotal()
                        }
                        if ($.isNumeric(l)) {
                            var r = l * (1 + d / 100),
                            q = $("#grid").jqGrid("setRowData", a, {
                                taxPrice: r
                            });
                            q && THISPAGE.calTotal()
                        }
                        break;
                    case "tax":
                        var d = parseFloat(d),
                        i = $("#grid").jqGrid("getRowData", a);
                        if ($.isNumeric(d)) {
                            var p = parseFloat(i.amount),
                            w = p + d,
                            q = $("#grid").jqGrid("setRowData", a, {
                                taxAmount: w
                            });
                            q && THISPAGE.calTotal()
                        }
                        break;
                    case "taxAmount":
                        var d = parseFloat(d),
                        i = $("#grid").jqGrid("getRowData", a);
                        if ($.isNumeric(d)) {
                            var o = parseFloat(i.deduction),
                            n = parseFloat(i.taxRate) / 100,
                            p = d / (1 + n),
                            t = parseFloat(i.qty),
                            m = (100 * o / (p + o)).toFixed(amountPlaces),
                            l = (p + o) / t,
                            v = d - p,
                            q = $("#grid").jqGrid("setRowData", a, {
                                discountRate: m,
                                price: l,
                                amount: p,
                                tax: v
                            }),
                            n = parseFloat(i.taxRate);
                            if ($.isNumeric(n)) {
                                var r = l * (1 + n / 100);
                                $("#grid").jqGrid("setRowData", a, {
                                    taxPrice: r
                                })
                            }
                            q && THISPAGE.calTotal()
                        }
                        break;
                    case "shareAmount":
                        for (var x = $("#grid").jqGrid("getDataIDs"), y = 0, j = 0; j < x.length; j++) {
                            var i = $("#grid").jqGrid("getRowData", x[j]);
                            y += Number(i.shareAmount)
                        }
                        $("#purExpense").val(y);
                        var z = B.$_expenseInfo.data("expenseInfo");
                        z = $.extend(!0, z, {
                            amount: y
                        }),
                        B.$_expenseInfo.data("expenseInfo", z);
                        break;
                    case "batch":
                        var A = $("#grid").jqGrid("getRowData", a),
                        h = $("#" + a).data("goodsInfo") || {};
                        if (h.safeDays) {
                            var D = {};
                            if ($.trim(A.prodDate) || (D.prodDate = C), $.trim(A.safeDays) || (D.safeDays = h.safeDays), !$.trim(A.validDate)) {
                                var E = A.prodDate || D.prodDate,
                                F = E.split("-");
                                if (E = new Date(F[0], F[1] - 1, F[2]), "Invalid Date" === E.toString()) return defaultPage.Public.tips({
                                    type: 2,
                                    content: "日期格式错误！"
                                }),
                                void setTimeout(function () {
                                    $("#grid").jqGrid("editCellByColName", a, "prodDate")
                                },
                                10);
                                E && (E.addDays(Number(A.safeDays || D.safeDays)), D.validDate = E.format())
                            }
                            $.isEmptyObject(D) || $("#grid").jqGrid("setRowData", a, D)
                        }
                        break;
                    case "prodDate":
                        var A = $("#grid").jqGrid("getRowData", a),
                        h = $("#" + a).data("goodsInfo") || {},
                        D = {};
                        $.trim(A.safeDays) || (D.safeDays = h.safeDays),
                        $.trim(d) || (D.prodDate = C);
                        var E = d || D.prodDate,
                        F = E.split("-");
                        if (E = new Date(F[0], F[1] - 1, F[2]), "Invalid Date" === E.toString()) return defaultPage.Public.tips({
                            type: 2,
                            content: "日期格式错误！"
                        }),
                        void setTimeout(function () {
                            $("#grid").jqGrid("editCellByColName", a, "prodDate")
                        },
                        10);
                        E && (E.addDays(Number(A.safeDays || D.safeDays)), D.validDate = E.format()),
                        $("#grid").jqGrid("setRowData", a, D)
                }
            },
            loadonce: !0,
            resizeStop: function (a, b) {
                B.mod_PageConfig.setGridWidthByIndex(a, b, "grid")
            },
            footerrow: !0,
            userData: {
                goods: "合计：",
                qty: a.totalQty,
                deduction: a.totalDiscount,
                amount: a.totalAmount,
                tax: a.totalTax,
                taxAmount: a.totalTaxAmount
            },
            userDataOnFooter: !0,
            loadError: function (a, b, c) {
                Public.tips({
                    type: 1,
                    content: "Type: " + b + "; Response: " + a.status + " " + a.statusText
                })
            }
        }),
        $("#grid").jqGrid("setGridParam", {
            cellEdit: !0
        })
    },
    goodsEdittypeInit: function () {
        function a(a, b) {
            var c = $(".goodsAuto")[0];
            return c
        }
        function b(a, b, c) {
            if ("get" === b) {
                if ("" !== $(".goodsAuto").getCombo().getValue()) return $(a).val();
                var d = $(a).parents("tr");
                return d.removeData("goodsInfo"),
                ""
            }
            "set" === b && $("input", a).val(c)
        }
        function c() {
            $("#initCombo").append($(".goodsAuto").val("").unbind("focus.once"))
        }
        0 != $("#grid")[0].p.savedRow.length && $("#grid").jqGrid("saveCell", $("#grid")[0].p.savedRow[0].id, $("#grid")[0].p.savedRow[0].ic),
        THISPAGE.$_barCodeInsert.hasClass("active") ? $("#grid").jqGrid("setColProp", "goods", {
            edittype: "text",
            editoptions: null
        }) : $("#grid").jqGrid("setColProp", "goods", {
            edittype: "custom",
            editoptions: {
                custom_element: a,
                custom_value: b,
                handle: c,
                trigger: "ui-icon-ellipsis"
            }
        })
    },
    reloadData: function (a) {
        function b() {
            c.$_customer.data("contactInfo", {
                id: a.buId,
                name: a.contactName,
                taxRate: a.taxRate
            }),
            c.customerCombo.input.val(a.contactName),
            c.$_date.val(a.date),
            c.$_number.text(a.billNo),
            c.$_note.val(a.description),
            c.$_discountRate.val(a.disRate),
            c.$_deduction.val(a.disAmount),
            c.$_discount.val(a.amount),
            c.$_payment.val(a.rpAmount),
            c.accountCombo.selectByValue(a.accId, !1),
            c.$_expenseInfo.data("expenseInfo", a.feeBill),
            c.$_accountInfo.data("accountInfo", a.accounts),
            -1 === a.accId ? c.$_accountInfo.show() : c.$_accountInfo.hide(),
            c.$_arrears.val(a.arrears),
            c.$_totalArrears.val(a.totalArrears),
            c.$_userName.html(a.userName),
            c.$_modifyTime.html(a.modifyTime),
            c.$_createTime.html(a.createTime),
            c.$_checkName.html(a.checkName)
        }
        $("#grid").clearGridData();
        var c = this;
        originalData = a;
        var d = 8 - a.entries.length;
        if (d > 0) for (var e = 0; d > e; e++) a.entries.push({});
        $("#grid").jqGrid("setGridParam", {
            data: a.entries,
            userData: {
                qty: a.totalQty,
                deduction: a.totalDiscount,
                amount: a.totalAmount,
                tax: a.totalTax,
                taxAmount: a.totalTaxAmount
            }
        }).trigger("reloadGrid"),
        b(),
        "edit" === a.status ? this.editable || (c.enableEdit(), $("#groupBtn").html(c.btn_edit + c.btn_audit), $("#mark").removeClass("has-audit")) : this.editable && (c.disableEdit(), $("#groupBtn").html(c.btn_view + c.btn_reaudit), $("#mark").addClass("has-audit"))
    },
    initCombo: function () {
        var a = this;
        this.goodsCombo = Business.billGoodsCombo($(".goodsAuto"), {
            userData: {
                isCreate: "150502" != originalData.transType
            }
        }),
        this.skuCombo = Business.billskuCombo($(".skuAuto"), {
            data: []
        }),
        this.storageCombo = Business.billStorageCombo($(".storageAuto")),
        this.unitCombo = Business.unitCombo($(".unitAuto"), {
            defaultSelected: -1,
            forceSelection: !1,
            callback: {
                onChange: function (a) {
                    var b = this.input.parents("tr");
                    a && (a.id = a.id || a.unitId, b.data("unitInfo", {
                        unitId: a.id,
                        name: a.name,
                        rate: a.rate
                    }))
                }
            }
        }),
        this.cellPikaday = new Pikaday({
            field: $(".dateAuto")[0],
            editable: !1
        }),
        this.batchCombo = Business.batchCombo($(".batchAuto")),
        this.priceCombo = $(".priceAuto").combo({
            data: function () {
                if (!this.input) return [];
                var a = $("#customer").data("contactInfo");
                if (!a) return [];
                var b = this.input.closest("tr"),
                c = b.data("goodsInfo");
                if (!c) return [];
                var d = $("#customer").data("priceList")[c.id];
                if (!d || !d.prices) return [];
                if (a.id <= 0) return [];
                var e = [];
                return d.prices.nearPrice && e.push({
                    name: "最近采购价：" + d.prices.nearPrice,
                    id: 2
                }),
                e
            },
            text: "name",
            value: "id",
            defaultSelected: 0,
            cache: !1,
            editable: !0,
            trigger: !1,
            defaultFlag: !1,
            forceSelection: !1,
            listWidth: 140,
            callback: {
                onChange: function (a) { },
                onFocus: function () {
                    var b = $(".priceAuto ").siblings(".ui-icon-triangle-1-s").hide(),
                    c = this.input.closest("tr"),
                    d = c.data("goodsInfo");
                    if (d) {
                        var e = a.$_customer.data("contactInfo"),
                        f = a.$_customer.data("priceList");
                        if (f || (f = {},
                        a.$_customer.data("priceList", f)), e && "" !== $.trim(a.$_customer.find("input").val())) {
                            var g = function () {
                                var a = {
                                    cId: e.id
                                };
                                f[d.id] = a,
                                Public.ajaxPost("/basedata/inventory.do?action=listBySelected", {
                                    type: "sa",
                                    ids: d.id,
                                    contactId: e.id
                                },
                                function (c) {
                                    if (200 === c.status && c.data && c.data.result) {
                                        for (var d = c.data.result,
                                        e = 0,
                                        f = d.length; f > e; e++) {
                                            var g = d[e];
                                            g.nearPrice && (a.prices = {},
                                            a.prices.nearPrice = g.nearPrice),
                                            g.salePrice && (a.prices = a.prices || {},
                                            a.prices.levelPrice = g.salePrice, a.prices.discountRate = g.discountRate)
                                        }
                                        a.prices && b.show()
                                    }
                                })
                            };
                            if (f[d.id]) {
                                var h = f[d.id];
                                h.cId != e.id ? g() : h.prices && b.show()
                            } else g()
                        }
                    }
                }
            }
        }).getCombo()
    },
    disableEdit: function () {
        this.customerCombo.disable(),
        this.$_date.attr("disabled", "disabled").addClass("ui-input-dis"),
        this.$_note.attr("disabled", "disabled").addClass("ui-input-dis"),
        this.$_discountRate.attr("disabled", "disabled").addClass("ui-input-dis"),
        this.$_deduction.attr("disabled", "disabled").addClass("ui-input-dis"),
        this.$_payment.attr("disabled", "disabled").addClass("ui-input-dis"),
        this.accountCombo.disable(),
        $("#grid").jqGrid("setGridParam", {
            cellEdit: !1
        }),
        this.editable = !1
    },
    enableEdit: function () {
        disEditable || (!hideCustomerCombo && this.customerCombo.enable(), this.$_date.removeAttr("disabled").removeClass("ui-input-dis"), this.$_note.removeAttr("disabled").removeClass("ui-input-dis"), this.$_discountRate.removeAttr("disabled").removeClass("ui-input-dis"), this.$_deduction.removeAttr("disabled").removeClass("ui-input-dis"), this.$_payment.removeAttr("disabled").removeClass("ui-input-dis"), this.accountCombo.enable(), $("#grid").jqGrid("setGridParam", {
            cellEdit: !0
        }), this.editable = !0)
    },
    chooseAccount: function (a) {
        var b = this;
        b.$_accountInfo.show(),
        b.$_payment.attr("disabled", "disabled").addClass("ui-input-dis"),
        $.dialog({
            width: 670,
            height: 250,
            title: "多账户结算",
            content: "url:/settings/choose-account.jsp",
            data: {
                accountInfo: a,
                type: "purchase"
            },
            lock: !0,
            ok: function () {
                var a = this.content.callback();
                return a ? (b.$_payment.val(a.payment).trigger("keyup"), b.$_accountInfo.data("accountInfo", a.accounts), b.accountCombo.blur(), void 0) : !1
            },
            cancel: function () {
                var a = b.$_accountInfo.data("accountInfo");
                a ? 1 === a.length && b.accountCombo.selectByValue(a[0].accId) : b.accountCombo.selectByValue(0)
            }
        })
    },
    addEvent: function () {
        var a = this;
        this.$_date.bind("keydown",
        function (a) {
            13 === a.which && $("#grid").jqGrid("editCell", 1, 2, !0)
        }).bind("focus",
        function (b) {
            a.dateValue = $(this).val()
        }).bind("blur",
        function (b) {
            var c = /((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/;
            c.test($(this).val()) || (parent.Public.tips({
                type: 2,
                content: "日期格式有误！如：2012-08-08。"
            }), $(this).val(a.dateValue))
        }),
        this.$_note.enterKey(),
        this.$_discount.enterKey(),
        this.$_discountRate.enterKey(),
        $(".grid-wrap").on("click", ".ui-icon-triangle-1-s",
        function (a) {
            var b = $(this).siblings(),
            c = b.getCombo();
            setTimeout(function () {
                c.active = !0,
                c.doQuery()
            },
            10)
        }),
        Business.billsEvent(a, "purchase"),
        this.$_deduction.keyup(function () {
            var b = Number($(this).val()),
            c = Number($("#grid").jqGrid("footerData", "get")[a.calAmount].replace(/,/g, "")),
            d = (c - b).toFixed(amountPlaces);
            if (c) {
                var e = b / c * 100,
                f = d - Number($.trim(a.$_payment.val()));
                THISPAGE.$_discountRate.val(e.toFixed(amountPlaces)),
                THISPAGE.$_discount.val(d),
                THISPAGE.$_arrears.val(f.toFixed(amountPlaces))
            }
        }).on("keypress",
        function (a) {
            Public.numerical(a)
        }).on("focus",
        function () {
            this.select()
        }).blur(function (a) {
            $(this).val() < 0 && (defaultPage.Public.tips({
                type: 2,
                content: "优惠金额不能为负数！"
            }), $(this).focus())
        }),
        this.$_discountRate.keyup(function () {
            var b = Number($(this).val()),
            c = Number($("#grid").jqGrid("footerData", "get")[a.calAmount].replace(/,/g, "")),
            d = c * (b / 100),
            e = d.toFixed(amountPlaces),
            f = (c - e).toFixed(amountPlaces),
            g = f - Number($.trim(a.$_payment.val()));
            THISPAGE.$_deduction.val(e),
            THISPAGE.$_discount.val(f),
            THISPAGE.$_arrears.val(g.toFixed(amountPlaces))
        }).on("keypress",
        function (a) {
            Public.numerical(a)
        }).on("focus",
        function () {
            this.select()
        }).blur(function (a) {
            $(this).val() < 0 && (defaultPage.Public.tips({
                type: 2,
                content: "优惠率不能为负数！"
            }), $(this).focus())
        }),
        this.$_payment.keyup(function () {
            var b = $(this).val() || 0,
            c = a.$_discount.val(),
            d = Number(parseFloat(c) - parseFloat(b)),
            e = Number(d + THISPAGE.customerArrears);
            THISPAGE.$_arrears.val(d.toFixed(amountPlaces)),
            THISPAGE.$_totalArrears.val(e.toFixed(amountPlaces));
            var f = a.$_accountInfo.data("accountInfo");
            f && 1 === f.length && (f[0].payment = b)
        }).on("keypress",
        function (a) {
            Public.numerical(a)
        }).on("focus",
        function () {
            this.select()
        }),
        $(".wrapper").on("click", "#save",
        function (b) {
            if (b.preventDefault(), Business.verifyRight("PU_ADD")) {
                var c = $(this),
                d = THISPAGE.getPostData();
                d && ("edit" === originalData.stata && (d.id = originalData.id, d.stata = "edit"), c.ajaxPost("/scm/invPu.do?action=add", {
                    postData: JSON.stringify(d)
                },
                function (b) {
                    200 === b.status ? (a.$_modifyTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().show(), a.$_createTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().show(), originalData.id = b.data.id, billRequiredCheck ? a.$_toolBottom.html('<span id="groupBtn">' + a.btn_edit + a.btn_audit + "</span>") : a.$_toolBottom.html('<span id="groupBtn">' + a.btn_edit + "</span>"), parent.Public.tips({
                        content: "保存成功！"
                    })) : parent.Public.tips({
                        type: 1,
                        content: b.msg
                    })
                }))
            }
        }),
        $(".wrapper").on("click", "#savaAndAdd",
        function (b) {
            if (b.preventDefault(), Business.verifyRight("PU_ADD")) {
                var c = $(this),
                d = THISPAGE.getPostData();
                d && c.ajaxPost("/scm/invPu.do?action=addNew", {
                    postData: JSON.stringify(d)
                },
                function (b) {
                    if (200 === b.status) {
                        a.$_number.text(b.data.billNo),
                        $("#grid").clearGridData(),
                        $("#grid").clearGridData(!0);
                        for (var c = 1; 8 >= c; c++) $("#grid").jqGrid("addRowData", c, {});
                        a.newId = 9,
                        a.$_note.val(""),
                        a.$_discountRate.val(originalData.disRate),
                        a.$_deduction.val(originalData.disAmount),
                        a.$_discount.val(originalData.amount),
                        a.$_payment.val(originalData.rpAmount),
                        a.$_arrears.val(originalData.arrears),
                        a.accountCombo.selectByValue(0, !0),
                        parent.Public.tips({
                            content: "保存成功！"
                        })
                    } else parent.Public.tips({
                        type: 1,
                        content: b.msg
                    })
                })
            }
        }),
        $(".wrapper").on("click", "#copy",
        function (b) {
            if (b.preventDefault(), Business.verifyRight("PU_ADD")) {
                var c = $(this);
                a.$_date = $("#date").val(system.endDate),
                a.$_deliveryDate = $("#deliveryDate").val(system.endDate);
                var d = THISPAGE.getPostData(),
                e = "PUR",
                f = d.date;
                if (d.feeBill) {
                    for (var g = $("#grid").jqGrid("getDataIDs"), h = 0; h < g.length; h++) $("#grid").jqGrid("setCell", g[h], "shareAmount", "&#160;");
                    $("#purExpense").val("0.00"),
                    a.$_expenseInfo.data("expenseInfo", {})
                }
                c.ajaxPost("/basedata/systemProfile.do?action=generateDocNo", {
                    billType: e,
                    billDate: f
                },
                function (b) {
                    if (200 === b.status) {
                        originalData.id = -1,
                        a.$_number.text(b.data.billNo),
                        a.newId = 9,
                        $("#mark").removeClass(),
                        a.$_checkName.html(""),
                        a.enableEdit(),
                        $("#groupBtn").html(a.btn_edit + a.btn_audit),
                        a.accountCombo.selectByValue(0, !0),
                        a.$_modifyTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().hide(),
                        a.$_createTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().hide(),
                        $("[aria-describedby=grid_srcOrderNo]").html(""),
                        parent.Public.tips({
                            content: "复制数据成功！"
                        }),
                        isCopy = !0;
                        var c = a.btn_add;
                        billRequiredCheck && (c += a.btn_audit),
                        a.$_toolBottom.html('<span id="groupBtn">' + c + "</span>")
                    } else parent.Public.tips({
                        type: 1,
                        content: b.msg
                    })
                })
            }
        }),
        $(".wrapper").on("click", "#edit",
        function (b) {
            if (b.preventDefault(), Business.verifyRight("PU_UPDATE")) {
                var c = $(this),
                d = THISPAGE.getPostData();
                d && c.ajaxPost("/scm/invPu.do?action=updateInvPu", {
                    postData: JSON.stringify(d)
                },
                function (b) {
                    200 === b.status ? (a.$_modifyTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().show(), originalData.id = b.data.id, parent.Public.tips({
                        content: "修改成功！"
                    })) : parent.Public.tips({
                        type: 1,
                        content: b.msg
                    })
                })
            }
        }),
        $(".wrapper").on("click", "#audit",
        function (b) {
            if (b.preventDefault(), Business.verifyRight("PU_CHECK")) {
                var c = $(this),
                d = THISPAGE.getPostData({
                    checkSerNum: !0
                });
                d && c.ajaxPost("/scm/invPu.do?action=checkInvPu", {
                    postData: JSON.stringify(d)
                },
                function (b) {
                    200 === b.status ? (originalData.id = b.data.id, $("#mark").addClass("has-audit"), a.$_checkName.html(SYSTEM.realName).parent().show(), $("#edit").hide(), a.disableEdit(), $("#groupBtn").html(a.btn_view + a.btn_reaudit), parent.Public.tips({
                        content: "审核成功！"
                    })) : parent.Public.tips({
                        type: 1,
                        content: b.msg
                    })
                })
            }
        }),
        $(".wrapper").on("click", "#reAudit",
        function (b) {
            if (b.preventDefault(), Business.verifyRight("PU_UNCHECK")) {
                var c = $(this);
                c.ajaxPost("/scm/invPu.do?action=rsBatchCheckInvPu", {
                    id: originalData.id
                },
                function (b) {
                    200 === b.status ? ($("#mark").removeClass(), $("#edit").show(), a.$_checkName.html(""), a.enableEdit(), $("#groupBtn").html(a.btn_edit + a.btn_audit), parent.Public.tips({
                        content: "反审核成功！"
                    })) : parent.Public.tips({
                        type: 1,
                        content: b.msg
                    })
                })
            }
        }),
        $(".wrapper").on("click", "#add",
        function (a) {
            if (a.preventDefault(), Business.verifyRight("PU_ADD")) {
                var b = "购货单",
                c = "purchase-purchase";
                if ("150502" == originalData.transType) var b = "购货退货单",
                c = "purchase-purchaseBack";
                parent.tab.overrideSelectedTabItem({
                    tabid: c,
                    text: b,
                    url: "/scm/invPu.do?action=initPur&transType=" + originalData.transType
                })
            }
        }),
        $(".wrapper").on("click", "#print",
        function (a) {
            a.preventDefault(),
            Business.verifyRight("PU_PRINT") && Public.print({
                title: "购货单列表",
                $grid: $("#grid"),
                pdf: "/scm/invPu.do?action=toPdf",
                billType: 10101,
                filterConditions: {
                    id: originalData.id
                }
            })
        }),
        this.$_accountInfo.click(function () {
            var b = $(this).data("accountInfo");
            a.chooseAccount(b)
        }),
        $("#prev").click(function (b) {
            return b.preventDefault(),
            $(this).hasClass("ui-btn-prev-dis") ? (parent.Public.tips({
                type: 2,
                content: "已经没有上一张了！"
            }), !1) : (a.idPostion = a.idPostion - 1, 0 === a.idPostion && $(this).addClass("ui-btn-prev-dis"), loading = $.dialog.tips("数据加载中...", 1e3, "loading.gif", !0), Public.ajaxGet("/scm/invPu.do?action=update", {
                id: a.idList[a.idPostion]
            },
            function (b) {
                originalData.id = a.idList[a.idPostion],
                THISPAGE.reloadData(b.data),
                $("#next").removeClass("ui-btn-next-dis"),
                loading && loading.close()
            }), void 0)
        }),
        $("#next").click(function (b) {
            return b.preventDefault(),
            $(this).hasClass("ui-btn-next-dis") ? (parent.Public.tips({
                type: 2,
                content: "已经没有下一张了！"
            }), !1) : (a.idPostion = a.idPostion + 1, a.idLength === a.idPostion + 1 && $(this).addClass("ui-btn-next-dis"), loading = $.dialog.tips("数据加载中...", 1e3, "loading.gif", !0), Public.ajaxGet("/scm/invPu.do?action=update", {
                id: a.idList[a.idPostion]
            },
            function (b) {
                originalData.id = a.idList[a.idPostion],
                THISPAGE.reloadData(b.data),
                $("#prev").removeClass("ui-btn-prev-dis"),
                loading && loading.close()
            }), void 0)
        }),
        THISPAGE.$_barCodeInsert.click(function (b) {
            var c = 1;
            THISPAGE.$_barCodeInsert.hasClass("active") ? (THISPAGE.$_barCodeInsert.removeClass("active"), c = null) : THISPAGE.$_barCodeInsert.addClass("active"),
            a.goodsEdittypeInit(),
            $.cookie("BarCodeInsert", c)
        }),
        $(document).on("click", "#ldg_lockmask",
        function (a) {
            a.stopPropagation()
        }),
        $("#grid").on("click", 'tr[role="row"]',
        function (a) {
            if ($("#mark").hasClass("has-audit")) {
                var b = $(this),
                c = (b.prop("id"), b.data("goodsInfo"));
                if (!c) return;
                SYSTEM.ISSERNUM && 1 == c.isSerNum && Business.serNumManage({
                    row: b,
                    view: !0
                })
            }
        }),
        $("#expenseInfo").on("click",
        function (b) {
            b.preventDefault();
            var c = a.$_expenseInfo.data("expenseInfo");
            $.dialog({
                title: "采购费用",
                content: "url:/purchase/expense-manage.jsp",
                data: {
                    expenseInfo: c,
                    callback: function (b, c) {
                        try {
                            $("#purExpense").val(b.amount),
                            a.$_expenseInfo.data("expenseInfo", b),
                            c && c.api.close()
                        } catch (d) { }
                    }
                },
                width: 360,
                height: 200,
                max: !1,
                min: !1,
                cache: !1,
                lock: !0
            })
        }),
        $("#doExpense").on("click",
        function (a) {
            a.preventDefault();
            for (var b = Number($("#purExpense").val()), c = $("#grid").jqGrid("getDataIDs"), d = c.length, e = 0, f = [], g = $("#grid").jqGrid("footerData", "get").amount.replace(/,/g, ""), h = 0, i = 0, j = 0, d = c.length; d > j; j++) {
                var k = $("#grid").jqGrid("getRowData", c[j]);
                if ("" !== k.goods) {
                    var l = Math.floor(b * (k.amount / g));
                    $("#grid").jqGrid("setRowData", c[j], {
                        shareAmount: l
                    }),
                    h += l,
                    e++,
                    f.push(c[j])
                }
            }
            var i = b - h,
            m = parseFloat($("#grid").jqGrid("getRowData", f[f.length - 1]).shareAmount || 0),
            n = parseFloat(i) + parseFloat(m);
            $("#grid").jqGrid("setRowData", f[f.length - 1], {
                shareAmount: n
            })
        }),
        $("#expenseList").on("click",
        function (a) {
            a.preventDefault(),
            Business.verifyRight("FEEBILL_QUERY") && parent.tab.addTabItem({
                tabid: "money-expenseList",
                text: "费用清单",
                url: "/money/expense-list.jsp"
            })
        }),
        $("#config").show().click(function (b) {
            a.mod_PageConfig.config()
        }),
        $(window).resize(function (a) {
            Public.autoGrid($("#grid"))
        })
    },
    resetData: function () {
        var a = this;
        $("#grid").clearGridData();
        for (var b = 1; 8 >= b; b++) $("#grid").jqGrid("addRowData", b, {}),
        $("#grid").jqGrid("footerData", "set", {
            qty: 0,
            amount: 0
        });
        a.$_note.val(""),
        a.$_discountRate.val(originalData.disRate),
        a.$_deduction.val(originalData.disAmount),
        a.$_discount.val(originalData.amount),
        a.$_payment.val(originalData.rpAmount),
        a.$_arrears.val(originalData.arrears)
    },
    calTotal: function () {
        for (var a = $("#grid").jqGrid("getDataIDs"), b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = a.length; h > g; g++) {
            var i = a[g],
            j = $("#grid").jqGrid("getRowData", i);
            if (j.qty) {
                var k = j.qty.replace(",", "");
                b += parseFloat(k)
            }
            j.deduction && (c += parseFloat(j.deduction)),
            j.amount && (d += parseFloat(j.amount)),
            j.tax && (e += parseFloat(j.tax)),
            j.taxAmount && (f += parseFloat(j.taxAmount))
        }
        if ($("#grid").jqGrid("footerData", "set", {
            goods: "合计：",
            qty: b,
            deduction: c,
            amount: d,
            tax: e,
            taxAmount: f
        }), taxRequiredCheck) var l = (f - Number(this.$_deduction.val())).toFixed(2);
        else var l = (d - Number(this.$_deduction.val())).toFixed(2);
        var m = (l - Number(this.$_payment.val())).toFixed(2);
        m = Number(m) ? m : "0.00",
        this.$_discount.val(l),
        this.$_arrears.val(m)
    },
    _getEntriesData: function (a) {
        a = a || {};
        for (var b = [], c = $("#grid").jqGrid("getDataIDs"), d = 0, e = c.length; e > d; d++) {
            var f, g = c[d],
            h = $("#grid").jqGrid("getRowData", g);
            if ("" !== h.goods) {
                var i = $("#" + g).data("goodsInfo");
                if (i) {
                    var j = $("#" + g).data("skuInfo") || {};
                    if (i.invSkus && i.invSkus.length > 0 && !j.id) return parent.Public.tips({
                        type: 2,
                        content: "请选择相应的属性！"
                    }),
                    $("#grid").jqGrid("editCellByColName", g, "skuName"),
                    !1;
                    var k = $("#" + g).data("storageInfo");
                    if (!k || !k.id) return parent.Public.tips({
                        type: 2,
                        content: "请选择相应的仓库！"
                    }),
                    $("#grid").jqGrid("editCellByColName", g, "locationName"),
                    !1;
                    var l = ($("#" + g).data("unitInfo") || {},
                    $("#grid").jqGrid("getRowData", g));
                    if (SYSTEM.ISSERNUM) {
                        var m = i.serNumList;
                        if (m && m.length == Number(h.qty));
                        else {
                            var n = !1,
                            o = "点击";
                            if (1 == i.isSerNum && (n = !0, a.checkSerNum && (n = !0)), n) return parent.Public.tips({
                                type: 2,
                                content: "请" + o + "数量设置【" + i.name + "】的序列号"
                            }),
                            $("#grid").jqGrid("editCellByColName", g, "qty"),
                            !1
                        }
                    }
                    f = {
                        invId: i.id,
                        invNumber: i.number,
                        invName: i.name,
                        invSpec: i.spec || "",
                        skuId: j.id || -1,
                        skuName: j.name || "",
                        unitId: l.unitId || -1,
                        mainUnit: l.mainUnit || "",
                        qty: h.qty,
                        price: h.price,
                        taxPrice: h.taxPrice,
                        discountRate: h.discountRate,
                        deduction: h.deduction,
                        amount: h.amount,
                        locationId: k.id,
                        locationName: k.name,
                        description: h.description,
                        srcOrderEntryId: h.srcOrderEntryId,
                        srcOrderId: h.srcOrderId,
                        srcOrderNo: h.srcOrderNo,
                        serNumList: m,
                        shareAmount: h.shareAmount || 0
                    },
                    isCopy && (f.srcOrderEntryId = "", f.srcOrderId = "", f.srcOrderNo = ""),
                    SYSTEM.ISWARRANTY && $.extend(!0, f, {
                        batch: h.batch || "",
                        prodDate: h.prodDate || "",
                        safeDays: h.safeDays || "",
                        validDate: h.validDate || ""
                    }),
                    taxRequiredCheck && (f.taxRate = h.taxRate, f.tax = h.tax, f.taxAmount = h.taxAmount),
                    b.push(f)
                }
            }
        }
        return b
    },
    getPostData: function (a) {
        var b = this,
        c = this;
        null !== curRow && null !== curCol && ($("#grid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null);
        var d = c.$_customer.find("input");
        if ("" === d.val()) return c.$_customer.removeData("contactInfo"),
        parent.Public.tips({
            type: 2,
            content: "请选择供应商！"
        }),
        c.customerCombo.active = !0,
        c.customerCombo.doQuery(),
        c.customerCombo.input.focus(),
        !1;
        var e = c.$_customer.data("contactInfo");
        if (!e || !e.id) return setTimeout(function () {
            d.focus().select()
        },
        15),
        parent.Public.tips({
            type: 2,
            content: "当前供应商不存在！"
        }),
        !1;
        var f = c.$_expenseInfo.data("expenseInfo");
        if (Number($("#purExpense").val()) > 0 && !f.buId) return parent.Public.tips({
            type: 2,
            content: "采购费用供应商不能为空！"
        }),
        !1;
        if (Number($("#purExpense").val()) > 0 && !f.accountId) return parent.Public.tips({
            type: 2,
            content: "采购费用支出类别不能为空！"
        }),
        !1;
        var g = this._getEntriesData(a);
        if (!g) return !1;
        if (g.length > 0) {
            var h = $.trim(b.$_note.val()),
            i = {
                id: originalData.id,
                buId: e.id,
                contactName: e.name,
                date: $.trim(b.$_date.val()),
                billNo: $.trim(b.$_number.text()),
                transType: originalData.transType,
                entries: g,
                totalQty: $("#grid").jqGrid("footerData", "get").qty.replace(/,/g, ""),
                totalAmount: $("#grid").jqGrid("footerData", "get").amount.replace(/,/g, ""),
                description: h === b.$_note[0].defaultValue ? "" : h,
                disRate: $.trim(b.$_discountRate.val() || 0),
                disAmount: $.trim(b.$_deduction.val() || 0),
                amount: $.trim(b.$_discount.val()),
                rpAmount: $.trim(b.$_payment.val() || 0),
                arrears: $.trim(b.$_arrears.val()),
                totalArrears: "",
                feeBill: f
            }; !f || "" != f.amount && "0" != f.amount && f.amount || delete i.feeBill;
            for (var j = 0,
            k = 0; k < i.entries.length; k++) j += Number(i.entries[k].shareAmount);
            if (i.feeBill && Number(j) != Number(i.feeBill.amount)) return defaultPage.Public.tips({
                type: 2,
                content: "总费用和分录费用之和不相等！"
            }),
            !1;
            if (i.disRate < 0) return defaultPage.Public.tips({
                type: 2,
                content: "优惠率不能为负数！"
            }),
            !1;
            if (i.disAmount < 0) return defaultPage.Public.tips({
                type: 2,
                content: "优惠金额不能为负数！"
            }),
            !1;
            if (taxRequiredCheck && (i.totalTax = $("#grid").jqGrid("footerData", "get").tax.replace(/,/g, ""), i.totalTaxAmount = $("#grid").jqGrid("footerData", "get").taxAmount.replace(/,/g, "")), requiredMoney) {
                i.accId = b.accountCombo.getValue(),
                i.accounts = b.$_accountInfo.data("accountInfo");
                var l = "150501" == i.transType ? "付款额" : "退款额";
                if (0 !== Number(i.rpAmount) && 0 === i.accId) return parent.Public.tips({
                    type: 1,
                    content: l + "不为空时，请选择结算账户！"
                }),
                !1;
                if (0 === Number(i.rpAmount) && 0 !== i.accId) return parent.Public.tips({
                    type: 1,
                    content: "结算账户不为空时，需要输入" + l + "！"
                }),
                !1;
                if (-1 === i.accId && !i.accounts) return parent.Public.tips({
                    type: 1,
                    content: "请检查账户信息是否正确！"
                }),
                !1
            }
            return i
        }
        return parent.Public.tips({
            type: 2,
            content: "商品信息不能为空！"
        }),
        $("#grid").jqGrid("editCell", 1, 2, !0),
        !1
    }
},
hasLoaded = !1,
originalData;
$(function () {
    if (urlParam.id) {
        if (!hasLoaded) {
            var a = $(".bills").hide();
            if (urlParam.turn) Public.ajaxGet("/scm/invPo.do?action=queryDetails", {
                id: urlParam.id
            },
            function (b) {
                200 === b.status ? (originalData = b.data, originalData.id = -1, originalData.orderId = b.data.id, originalData.orderNo = b.data.billNo, originalData.status = "add", THISPAGE.init(b.data), a.show(), hasLoaded = !0) : parent.Public.tips({
                    type: 1,
                    content: b.msg
                })
            });
            else if (urlParam.turnBygoodList) {
                originalData = {
                    id: -1,
                    status: "add",
                    customer: 0,
                    entries: [{
                        id: "1"
                    },
                    {
                        id: "2"
                    },
                    {
                        id: "3"
                    },
                    {
                        id: "4"
                    },
                    {
                        id: "5"
                    },
                    {
                        id: "6"
                    },
                    {
                        id: "7"
                    },
                    {
                        id: "8"
                    }],
                    description: "",
                    totalQty: 0,
                    totalDiscount: 0,
                    totalAmount: 0,
                    totalTax: 0,
                    totalTaxAmount: 0,
                    disRate: 0,
                    disAmount: 0,
                    amount: "0.00",
                    rpAmount: "0.00",
                    arrears: "0.00",
                    accId: 0
                },
                "150502" === urlParam.transType ? originalData.transType = "150502" : originalData.transType = "150501",
                THISPAGE.init(originalData),
                a.show(),
                hasLoaded = !0;
                for (var b = JSON.parse(urlParam.goodsIds), c = [], d = {},
                e = 0; e < b.length; e++) {
                    var f = b[e];
                    d[f.id] || c.push(f.id),
                    d[f.id] = {
                        id: f.id,
                        qty: f.qty,
                        skuId: f.skuId,
                        skuName: f.skuName,
                        locationName: f.locationName,
                        locationId: f.locationId
                    }
                }
                if (!c.length) return;
                Public.ajaxGet("/basedata/inventory.do?action=list", {
                    ids: c.join()
                },
                function (a) {
                    if (200 === a.status) {
                        var c = a.data.rows || {};
                        curRow = THISPAGE.curID = 1;
                        var d = 1;
                        newId = THISPAGE.newId;
                        for (var e = 0; e < b.length; e++) {
                            var f = b[e];
                            if ("object" == typeof f) {
                                for (var g = 0; g < c.length; g++) {
                                    var h = c[g];
                                    f.id == h.id && (f = $.extend({},
                                    h, f))
                                }
                                if (f) {
                                    if (delete f.amount, "" === f.spec) var i = f.number + " " + f.name;
                                    else var i = f.number + " " + f.name + "_" + f.spec;
                                    if (d) var j = d;
                                    else var j = newId;
                                    var a = $.extend(!0, {},
                                    f);
                                    if (a.goods = i, a.id = j, a.qty = a.qty || 1, d) var k = $("#grid").jqGrid("setRowData", Number(d), {});
                                    else {
                                        var k = $("#grid").jqGrid("addRowData", Number(newId), {},
                                        "last");
                                        newId++
                                    }
                                    f.isSerNum = 0 == f.isSerNum ? 0 : 1,
                                    k && $("#" + j).data("goodsInfo", f).data("storageInfo", {
                                        id: f.locationId,
                                        name: f.locationName
                                    }).data("unitInfo", {
                                        unitId: f.unitId,
                                        name: f.unitName
                                    }).data("skuInfo", {
                                        id: f.skuId,
                                        name: f.skuName
                                    }),
                                    $("#grid").jqGrid("setRowData", j, a),
                                    curRow++;
                                    var l = $("#" + d).next();
                                    d = l.length > 0 ? $("#" + d).next().attr("id") : ""
                                }
                            }
                        }
                        "" === d && ($("#grid").jqGrid("addRowData", newId, {},
                        "last"), THISPAGE.newId = newId + 1),
                        setTimeout(function () {
                            $("#grid").jqGrid("editCell", curRow, 2, !0)
                        },
                        10),
                        THISPAGE.calTotal()
                    } else parent.Public.tips({
                        type: 1,
                        content: a.msg
                    })
                })
            } else Public.ajaxGet("/scm/invPu.do?action=update", {
                id: urlParam.id
            },
            function (b) {
                200 === b.status ? (originalData = b.data, THISPAGE.init(b.data), a.show(), hasLoaded = !0) : parent.Public.tips({
                    type: 1,
                    content: b.msg
                })
            })
        }
    } else originalData = {
        id: -1,
        status: "add",
        customer: 0,
        transType: 150501,
        entries: [{
            id: "1"
        },
        {
            id: "2"
        },
        {
            id: "3"
        },
        {
            id: "4"
        },
        {
            id: "5"
        },
        {
            id: "6"
        },
        {
            id: "7"
        },
        {
            id: "8"
        }],
        description: "",
        totalQty: 0,
        totalDiscount: 0,
        totalAmount: 0,
        totalTax: 0,
        totalTaxAmount: 0,
        disRate: 0,
        disAmount: 0,
        amount: "0.00",
        rpAmount: "0.00",
        arrears: "0.00",
        accId: 0
    },
    "150502" === urlParam.transType ? originalData.transType = "150502" : originalData.transType = "150501",
    THISPAGE.init(originalData)
});