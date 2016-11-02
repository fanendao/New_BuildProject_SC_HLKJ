var Pub = Pub || {};

Pub.Hello = function (val)
{
    var win = window.self;
    console.info(win.parent);
    console.info(/default.jsp/.test(win.location.href));
    
    alert(val);
}