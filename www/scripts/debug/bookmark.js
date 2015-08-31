/*
   1] Breakpoint Tester(BETA) V 1.0
      Copyright (c) 2013 Mandar Shirke.
   2] ScrollTo Plugin | Copyright (c) 2007-2013 Ariel Flesler
*/
function loadScript(e, t) {
    var n = document.createElement("script");
    n.type = "text/javascript";
    if (n.readyState) {
        n.onreadystatechange = function() {
            if (n.readyState == "loaded" || n.readyState == "complete") {
                n.onreadystatechange = null;
                t()
            }
        }
    } else {
        n.onload = function() {
            t()
        }
    }
    n.src = e;
    document.getElementsByTagName("head")[0].appendChild(n)
}
loadScript("http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js", function() {
    function e() {
        var e;
        if (e === undefined) {
            var t = $('<div style="width:50px;height:50px;overflow:hidden;' + 'position:absolute;top:-200px;left:-200px;"><div style="height:100px;">' + "</div>");
            $("body").append(t);
            var n = $("div", t).innerWidth();
            t.css("overflow-y", "scroll");
            var r = $("div", t).innerWidth();
            $(t).remove();
            e = n - r
        }
        return e
    }(function(e) {
        function n(e) {
            return typeof e == "object" ? e : {
                top: e,
                left: e
            }
        }
        var t = e.scrollTo = function(t, n, r) {
            e(window).scrollTo(t, n, r)
        };
        t.defaults = {
            axis: "xy",
            duration: parseFloat(e.fn.jquery) >= 1.3 ? 0 : 1,
            limit: true
        };
        t.window = function(t) {
            return e(window)._scrollable()
        };
        e.fn._scrollable = function() {
            return this.map(function() {
                var t = this,
                    n = !t.nodeName || e.inArray(t.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1;
                if (!n) return t;
                var r = (t.contentWindow || t).document || t.ownerDocument || t;
                return /webkit/i.test(navigator.userAgent) || r.compatMode == "BackCompat" ? r.body : r.documentElement
            })
        };
        e.fn.scrollTo = function(r, i, s) {
            if (typeof i == "object") {
                s = i;
                i = 0
            }
            if (typeof s == "function") s = {
                onAfter: s
            };
            if (r == "max") r = 9e9;
            s = e.extend({}, t.defaults, s);
            i = i || s.duration;
            s.queue = s.queue && s.axis.length > 1;
            if (s.queue) i /= 2;
            s.offset = n(s.offset);
            s.over = n(s.over);
            return this._scrollable().each(function() {
                function d(e) {
                    u.animate(c, i, s.easing, e && function() {
                        e.call(this, a, s)
                    })
                }
                if (r == null) return;
                var o = this,
                    u = e(o),
                    a = r,
                    l, c = {},
                    p = u.is("html,body");
                switch (typeof a) {
                    case "number":
                    case "string":
                        if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(a)) {
                            a = n(a);
                            break
                        }
                        a = e(a, this);
                        if (!a.length) return;
                    case "object":
                        if (a.is || a.style) l = (a = e(a)).offset()
                }
                e.each(s.axis.split(""), function(e, n) {
                    var r = n == "x" ? "Left" : "Top",
                        i = r.toLowerCase(),
                        f = "scroll" + r,
                        v = o[f],
                        m = t.max(o, n);
                    if (l) {
                        c[f] = l[i] + (p ? 0 : v - u.offset()[i]);
                        if (s.margin) {
                            c[f] -= parseInt(a.css("margin" + r)) || 0;
                            c[f] -= parseInt(a.css("border" + r + "Width")) || 0
                        }
                        c[f] += s.offset[i] || 0;
                        if (s.over[i]) c[f] += a[n == "x" ? "width" : "height"]() * s.over[i]
                    } else {
                        var y = a[i];
                        c[f] = y.slice && y.slice(-1) == "%" ? parseFloat(y) / 100 * m : y
                    }
                    if (s.limit && /^\d+$/.test(c[f])) c[f] = c[f] <= 0 ? 0 : Math.min(c[f], m);
                    if (!e && s.queue) {
                        if (v != c[f]) d(s.onAfterFirst);
                        delete c[f]
                    }
                });
                d(s.onAfter)
            }).end()
        };
        t.max = function(t, n) {
            var r = n == "x" ? "Width" : "Height",
                i = "scroll" + r;
            if (!e(t).is("html,body")) return t[i] - e(t)[r.toLowerCase()]();
            var s = "client" + r,
                o = t.ownerDocument.documentElement,
                u = t.ownerDocument.body;
            return Math.max(o[i], u[i]) - Math.min(o[s], u[s])
        }
    })(jQuery);
    frameHeight = $(window).height() - 162;
    $(window).resize(function() {
        $(".frameWrapper").height($(window).height() - 162)
    });
    $("#count").text(function(e, t) {
        var n = parseInt($("#bpList li").length, 10);
        return n < 10 ? "0" + n : n
    });
    $("#bpList li").each(function(t) {
        var n = $(this).attr("data-width");
        var r = $(this).attr("data-unit");
        if (r === "em") {
            emToPx = 16;
            emtoPxText = '	<span class="emToPx">(1EM = 16PX)</span>'
        } else {
            emToPx = 1;
            emtoPxText = ""
        }
        var i = parseFloat($(this).attr("data-width") * emToPx) + e() + "px";
        var s = '<li id="breakpoint-' + n + r + '" data-width="' + n + '" data-unit="' + r + '" style="width: ' + i + '"><header class="frameTitle">' + n + r + '</header><div class="frameWrapper" style="height:' + frameHeight + 'px"><iframe frameborder="0" style="width: ' + i + '"></iframe></div></li>';
        $("#qcWW").append(s)
    });
    $("iframe").each(function() {
        $(this).attr("src", $("body").attr("data-url"));
        $(this).on("load", function() {
            $(this).fadeIn()
        })
    });
    $(".reload").click(function() {
        var e = $(this).parent().parent().next("iframe");
        e.fadeOut();
        e.attr("src", e.attr("src"));
        return false
    });
    $("#bpList li:first-child input").attr("checked", "checked");
    $("#bpList li a").each(function() {
        if ($(this).find("input").is(":checked")) {
            $(this).addClass("checked");
            $(this).parent("li").addClass("active");
            var e = $("#qcWW").find("[data-width='" + $(this).parent("li").attr("data-width") + "']");
            e.addClass("visible")
        }
    });
    $("#bpList li a").click(function() {
        $("*").removeClass("active");
        $(this).parent("li").addClass("active");
        var e = $("#qcWW").find("[data-width='" + $(this).parent("li").attr("data-width") + "']");
        $("#qcWWW").scrollTo(e, 700, {
            offset: 0
        });
        window.history.pushState(data, "Title", e.prev("li a").attr("href"));
        return false
    })
});

/* Google Analytics */
(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-45865355-1', 'breakpointtester.com');
ga('send', 'pageview');
