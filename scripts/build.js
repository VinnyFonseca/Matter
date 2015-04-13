function initCookies() {
    cookieSystem = {
        get: function(a) {
            return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(a).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        },
        set: function(a, b, c, d, e, f) {
            if (!a || /^(?:expires|max\-age|path|domain|secure)$/i.test(a)) return !1;
            var g = "";
            if (c) switch (c.constructor) {
              case Number:
                var h = new Date(), i = new Date(h.getTime() + 864e5 * c);
                g = c === 1 / 0 ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; expires=" + i.toGMTString();
                break;

              case String:
                g = "; expires=" + c;
                break;

              case Date:
                g = "; expires=" + c.toGMTString();
            }
            return document.cookie = encodeURIComponent(a) + "=" + encodeURIComponent(b) + g + (e ? "; domain=" + e : "") + (d ? "; path=" + d : "") + (f ? "; secure" : ""), 
            !0;
        },
        remove: function(a, b, c) {
            return a && this.hasItem(a) ? (document.cookie = encodeURIComponent(a) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (c ? "; domain=" + c : "") + (b ? "; path=" + b : ""), 
            !0) : !1;
        },
        has: function(a) {
            return new RegExp("(?:^|;\\s*)" + encodeURIComponent(a).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie);
        }
    };
    var a = cookieSystem.get("firstVisit");
    if (null === a) {
        cookieSystem.set("firstVisit", "yes", 365);
        var b = 0, c = "warning", d = "Matter uses cookies to give you a better experience. By continuing to browse you are accepting our <a href='#' target='_blank'>Terms &amp; Conditions</a>.";
        notify(d, c, b);
    }
    config.application.debug && console.log("System :: Cookie System");
}

function initForm() {
    if ($("select[data-countries]").length && ($("select[data-countries]").each(function() {
        function a(a) {
            for (var c = 0; c < a.length; c++) {
                var d = a[c].Name, e = a[c].Code, f = "<option value='" + e + "'>" + d + "</option>";
                b.append(f);
            }
            initDropdowns();
        }
        var b = $(this), c = b.data("countries");
        dataRequest(c, "GET", a);
    }), config.application.debug && console.log("Form :: Country Dropdowns")), $(".file-wrapper").length && ($(".file-wrapper:not('.last')").each(function() {
        var a = $(this), b = a.find("input"), c = a.find(".fake-upload"), d = a.find(".file-result");
        c.on("click", function() {
            b.trigger("click");
        }), b.on("change", function() {
            var a = $(this).val().replace("C:\\fakepath\\", "");
            d.html(a).addClass("loaded");
        });
    }), config.application.debug && console.log("Form :: File Upload")), $(".multifile-wrapper").length) {
        var a = function() {
            var b = $(".multifile-wrapper"), c = b.length, d = config.forms.uploadlimit, e = $(".multi-limit"), f = d - b.find(".loaded").length, g = (1 == f ? $(".multifile-info").find(".plural").hide() : $(".multifile-info").find(".plural").show(), 
            '<div class="multifile-wrapper mobile-hide last">\r\n								<input type="file" id="file[' + c + ']" name="file[' + c + ']" />\r\n								<div class="fakefile">\r\n									<div class="button primary fake-upload">Choose File</div>\r\n									<div class="file-result">No file chosen</div>\r\n									<div class="button primary fake-close">\r\n										<img class="svg icon icon-close" src="img/icons/icon-close.svg" width="16" height="16" onerror="this.onerror=null;this.src=\'img/icons/icon-close.png\'" alt="File upload delete icon">\r\n									</div>\r\n								</div>\r\n							</div>');
            e.html(f), b.each(function(b) {
                var e = $(this), f = e.find(".file-result");
                e.find("input").attr("id", "file[" + b + "]").attr("name", "file[" + b + "]"), e.off("click").on("click", ".fake-upload", function() {
                    e.find("input").trigger("click");
                }).on("click", ".fake-close", function() {
                    c != d || $(".multifile-wrapper.last").length || $(g).insertAfter($(".multifile-wrapper").eq(c - 1)), 
                    e.remove(), a();
                }).off("change").on("change", "input", function() {
                    var h = $(this).val().replace("C:\\fakepath\\", "");
                    f.html(h).addClass("loaded"), d > c && $(g).insertAfter(e), a(), c > b && e.removeClass("last");
                });
            }), initSVGs();
        };
        a(), config.application.debug && console.log("Form :: Multiple File Upload");
    }
    if ($("input[type='checkbox']").length && $("input[type='checkbox']").each(function() {
        var a = $(this);
        if ("true" === a.attr("data-toggle")) {
            var b = '<span class="toggle-body">\r\n									<span class="toggle-switch"></span>\r\n									<span class="toggle-track">\r\n									<span class="toggle-background"></span>\r\n										<span class="toggle-background toggle-background-negative"></span>\r\n									</span>\r\n								</span>';
            a.wrap("<div class='controller toggle'></div>");
            var c = a.parents(".controller");
            c.next("label").prepend(b).appendTo(c), config.application.debug && console.log("Form :: Toggle Checkboxes");
        } else {
            a.wrap("<div class='controller checkbox'></div>");
            var c = a.parents(".controller");
            c.next("label").appendTo(c), config.application.debug && console.log("Form :: Checkboxes");
        }
    }), $("input[type='radio']").length && $("input[type='radio']").each(function() {
        var a = $(this);
        if ("true" === a.attr("data-toggle")) {
            var b = '<span class="toggle-body">\r\n									<span class="toggle-switch"></span>\r\n									<span class="toggle-track">\r\n									<span class="toggle-background"></span>\r\n										<span class="toggle-background toggle-background-negative"></span>\r\n									</span>\r\n								</span>';
            a.wrap("<div class='controller toggle'></div>");
            var c = a.parents(".controller");
            c.next("label").prepend(b).appendTo(c), config.application.debug && console.log("Form :: Toggle Radios");
        } else {
            a.wrap("<div class='controller radio'></div>");
            var c = a.parents(".controller");
            c.next("label").appendTo(c), config.application.debug && console.log("Form :: Radios");
        }
    }), $(document).on("click", "input[type='checkbox'][readonly], input[type='radio'][readonly]", function(a) {
        a.preventDefault();
    }), $("input[type='password']").length) {
        var b = '<div class="password-wrapper"></div>', c = '<div class="password-meter-mask"><div class="password-meter"></div></div>';
        $("input[type='password']").each(function() {
            var a = $(this);
            "match" !== a.data("validation") && (a.wrap(b), $(c).insertAfter(a));
        }), config.application.debug && console.log("Form :: Password Meters");
    }
    if ($("progress").length) {
        var d = function(a) {
            var b = $("progress"), c = b.prev("label"), d = b.find(".progress-bar span");
            d.width(a + "%").html(a + "%"), c.removeClass("active").width(a + "%").attr("data-progress", a), 
            b.removeClass("valid").attr("value", a), a >= 8 && c.addClass("active"), a >= 100 && b.addClass("valid");
        };
        $("[data-progress]").on("click", function(a) {
            var b = 0;
            clearInterval(c);
            var c = setInterval(function() {
                100 > b ? (b++, d(b)) : ($(".progress").addClass("valid"), clearInterval(c));
            }, 300);
        }), config.application.debug && console.log("Form :: Progress Bar");
    }
}

function initDropdowns() {
    if ($("select").length) {
        var a = function() {
            $("select").each(function() {
                var a = $(this), b = "undefined" == b || "" === b ? 1 : parseInt(a.attr("size"), 10), c = "undefined" != typeof b && "" !== b && b > 1 ? "list" : "drop", d = a.children("option").not("[default]"), e = a.children("option:selected"), f = '<div class="dropdown-wrapper ' + c + '" data-size="' + b + '"></div>', g = '<div class="dropdown-current" data-value="' + e.val() + '">' + e.html() + "</div>", h = ' <div class="dropdown-arrow valign-middle">\r\n									<img class="svg icon icon-caret-down" src="img/icons/icon-caret-down.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-caret-down.png\'">\r\n								</div>', i = '<div class="dropdown default"></div>';
                a.parents(".dropdown-wrapper").length || (a.wrap(f), $(i).insertAfter(a), $(h).insertAfter(a), 
                $(g).insertAfter(a));
                var j = a.parents(".dropdown-wrapper"), k = j.children(".dropdown-arrow"), l = j.children(".dropdown-current"), m = j.children(".dropdown");
                m.html(""), l.val(e.val()).html(e.html());
                for (var n = 0; n < d.length; n++) {
                    var o = d.eq(n), p = o.is(":selected") ? "active" : "", q = '<div class="dropdown-item ' + p + '" data-value="' + o.val() + '">' + o.html() + "</div>";
                    m.append(q);
                }
                var r = m.children(".dropdown-item");
                "list" == c && m.height((j.find(".dropdown-item").outerHeight() + 1) * b - 1);
                $(this);
                l.attr("class", "dropdown-current " + a.attr("class")), a.is("[readonly]") ? (j.addClass("readonly"), 
                l.attr("readonly", !0)) : a.is("[disabled]") ? (j.addClass("disabled"), l.attr("disabled", !0)) : (l.off().on("click", function() {
                    a.focus();
                }), k.off().on("click", function() {
                    a.focus();
                }), r.off().on("click", function() {
                    var b = $(this).attr("data-value").trim();
                    a.val(b).trigger("change");
                }), a.on("focus", function() {
                    $(".dropdown-wrapper").removeClass("active"), j.addClass("active"), pageBottom >= j.offset().top + m.height() + 35 && !m.hasClass("up") ? m.removeClass("bound").addClass("default") : m.removeClass("default").addClass("bound");
                }).on("change", function() {
                    var b = $(this).children("option:selected");
                    a.blur(), j.removeClass("active"), a.hasClass("keep") || l.text(b.text()).attr("data-value", b.val()), 
                    r.removeClass("active");
                    for (var c = 0; c < r.length; c++) r.eq(c).text() === b.text() && (r.eq(c).addClass("active"), 
                    a.parents("form").hasClass("auto-send") && a.parents("form").submit());
                })), $("html, body").off().on("click", function(a) {
                    $(a.target).closest(".dropdown").length || $(a.target).closest(".dropdown-wrapper.active").length || $(".dropdown-wrapper").removeClass("active");
                });
            });
        };
        a(), $(window).on("scroll", function() {
            var a = $(".dropdown-wrapper.active"), b = a.children(".dropdown");
            a.length && pageBottom >= a.offset().top + b.height() + 55 && !b.hasClass("up") ? b.removeClass("bound").addClass("default") : b.removeClass("default").addClass("bound");
        }), config.application.debug && console.log("Form :: Dropdowns"), initSVGs();
    }
}

function serialize(a) {
    var b = [];
    for (var c in a) a.hasOwnProperty(c) && b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
    return b.join("&");
}

function initTables() {
    config.tables.responsive && $("table").length && ($("table").each(function() {
        var a = $(this), b = this.id, c = document.getElementById(b), d = [], e = [];
        a.addClass("table-original");
        for (var f = c.rows[0].cells.length - 1; f >= 0; f--) e[f] = c.rows[0].cells[f].innerHTML;
        for (var g = c.rows.length - 1; g >= 1; g--) {
            for (var h = c.rows[g], i = {}, j = 0; j < h.cells.length; j++) i[e[j]] = h.cells[j].innerHTML;
            d.push(i);
        }
        for (var k = 0; k < d.length; k++) {
            var l = d[k], m = '<table class="' + b + "-row-" + k + ' table-mirror">\r\n										  <tbody>\r\n										  </tbody>\r\n									  </table>';
            $(m).insertAfter(a);
            var n = $("." + b + "-row-" + k);
            a.children("caption").length && n.prepend("<caption>Row of " + a.children("caption").html() + "</caption>");
            for (var o in l) {
                var p = '<tr>\r\n								   <th scope="row">' + o + "</th>\r\n								   <td>" + l[o] + "</td>\r\n							   </tr>";
                n.children("tbody").append(p);
            }
        }
    }), config.application.debug && console.log("System :: Tables"));
}

function FastClick(a) {
    "use strict";
    function b(a, b) {
        return function() {
            return a.apply(b, arguments);
        };
    }
    var c;
    this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, 
    this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = 10, 
    this.layer = a, FastClick.notNeeded(a) || (deviceIsAndroid && (a.addEventListener("mouseover", b(this.onMouse, this), !0), 
    a.addEventListener("mousedown", b(this.onMouse, this), !0), a.addEventListener("mouseup", b(this.onMouse, this), !0)), 
    a.addEventListener("click", b(this.onClick, this), !0), a.addEventListener("touchstart", b(this.onTouchStart, this), !1), 
    a.addEventListener("touchmove", b(this.onTouchMove, this), !1), a.addEventListener("touchend", b(this.onTouchEnd, this), !1), 
    a.addEventListener("touchcancel", b(this.onTouchCancel, this), !1), Event.prototype.stopImmediatePropagation || (a.removeEventListener = function(b, c, d) {
        var e = Node.prototype.removeEventListener;
        "click" === b ? e.call(a, b, c.hijacked || c, d) : e.call(a, b, c, d);
    }, a.addEventListener = function(b, c, d) {
        var e = Node.prototype.addEventListener;
        "click" === b ? e.call(a, b, c.hijacked || (c.hijacked = function(a) {
            a.propagationStopped || c(a);
        }), d) : e.call(a, b, c, d);
    }), "function" == typeof a.onclick && (c = a.onclick, a.addEventListener("click", function(a) {
        c(a);
    }, !1), a.onclick = null));
}

function initAutocomplete() {
    $("[data-autocomplete]").length && ($("[data-autocomplete]").each(function() {
        function a(a) {
            function e(a) {
                for (var b = [], c = 0; c < j.length; c++) {
                    var d = j[c], e = d[a];
                    if (e instanceof Array) for (var f = 0; f < e.length; f++) $.inArray(e[f], b) < 0 && b.push(e[f]); else $.inArray(e, b) < 0 && b.push(e);
                }
                b.sort();
                for (var g = 0; g < b.length; g++) h.append("<li>" + b[g] + "</li>");
            }
            function i(a) {
                var d = $(a).val();
                k.each(function() {
                    $(this).text().search(new RegExp(d, "i")) < 0 ? $(this).removeClass("selected") : $(this).addClass("selected");
                }).on("click", function() {
                    c.val($(this).text()).trigger({
                        type: "keydown",
                        which: 13
                    }), b.removeClass("active"), unhighlight(h.find("li"));
                }), d.length > 0 && k.hasClass("selected") ? (b.addClass("active"), highlight(h.find("li"), d)) : (b.removeClass("active"), 
                unhighlight(h.find("li")));
            }
            var j = a.Results;
            e(f);
            var k = h.children("li").not(".divider");
            h.on("mouseenter", function() {
                g = !0;
            }).on("mouseleave", function() {
                g = !1;
            }), c.on("keydown", function(a) {
                if (h.hasClass("active")) {
                    var b = h.children("li.selected");
                    38 === a.keyCode && d > -1 && (k.removeClass("active"), d--, b.eq(d).addClass("active"), 
                    d % 7 === 6 && h.scrollTop(7 * (k.outerHeight() - 1) * ((d - 6) / 7))), 40 === a.keyCode && d < b.length - 1 && (k.removeClass("active"), 
                    d++, b.eq(d).addClass("active"), d % 7 === 0 && h.scrollTop(7 * (k.outerHeight() - 1) * (d / 7))), 
                    (9 === a.keyCode || 13 === a.keyCode) && (c.val(h.children("li.active").text()), 
                    k.removeClass("active")), (8 === a.keyCode || 46 === a.keyCode) && (k.removeClass("active"), 
                    d = -1), 27 === a.keyCode && c.blur();
                }
            }).on("keyup", function(a) {
                i(this);
            }).on("focus", function() {
                d = h.children("li.active").length ? d : -1, i(this);
            }).on("blur", function() {
                g === !1 && (b.removeClass("active"), unhighlight(h.find("li")));
            });
        }
        var b = $(this), c = b.children("input"), d = -1, e = b.data("autocomplete"), f = c.data("autocomplete-parameter"), g = !1;
        b.append("<div class='divider'>" + f + "</div>"), b.append("<ul class='autocomplete-results'></ul>");
        var h = b.children("ul");
        dataRequest(e, "GET", a);
    }), config.application.debug && console.log("Search :: Autocomplete"));
}

function initFontSizeControls() {
    if ($(".font-control").length) {
        var a = 10, b = a, c = config.accessibility.font.range;
        null === cookieSystem.get("fontSize") && cookieSystem.set("fontSize", b, 365), b = cookieSystem.get("fontSize"), 
        $("html").css("font-size", b + "px"), $(".font-up").click(function() {
            a + c > b && b++, cookieSystem.set("fontSize", b, 365), b = cookieSystem.get("fontSize"), 
            $("html").css("font-size", b + "px");
        }), $(".font-reset").click(function() {
            b = a, cookieSystem.set("fontSize", b, 365), b = cookieSystem.get("fontSize"), $("html").css("font-size", b + "px");
        }), $(".font-down").click(function() {
            b > a - c && b--, cookieSystem.set("fontSize", b, 365), b = cookieSystem.get("fontSize"), 
            $("html").css("font-size", b + "px");
        }), config.application.debug && console.log("Widget :: Font Size Controls");
    }
}

function buildKonami() {
    var a = '<img class="konami" style="width: 100%;" src="scripts/core/konami/contra.gif">';
    $(".main").prepend(a);
}

function initKonami(a) {
    function b() {
        d = [], e = "", f = !1, $(".konami").remove();
    }
    function c(c) {
        var g = [ 38, 38, 40, 40, 37, 39, 37, 39, 66, 65 ], h = g.join(", ");
        38 == c.keyCode && (f = !0), f && e.length <= h.length ? (-1 == e.indexOf(h) && (d.push(c.keyCode), 
        e = d.join(", ")), -1 != e.indexOf(h) && (console.log("Easter Egg :: Konami!"), 
        b(), a(), 27 == c.keyCode && b())) : b();
    }
    var d = [], e = "", f = !1;
    $(document).on("keyup", c), config.application.debug && console.log("Widget :: Konami");
}

function initialize() {
    function a(a, b, c, d, e, f, g) {
        link = "http://" != g.substring(0, 7) ? "http://" + g : g;
        var h = function() {
            var a = !1;
            return function(b) {
                return void 0 !== b && (a = b), a;
            };
        }();
        iw = new google.maps.InfoWindow(), google.maps.event.addListener(a, "click", function() {
            if (h()) iw.close(), h(!1); else {
                var i = "<div class='gm-info'><h4>" + c + "</h4><p>" + d + "<p><p>" + e + "<p><a href='mailto:" + f + "' >" + f + "<a><a href='" + link + "'' >" + g + "<a></div>";
                iw = new google.maps.InfoWindow({
                    content: i
                }), iw.open(b, a), h(!0);
            }
        }), google.maps.event.addListener(iw, "closeclick", function() {
            h(!1);
        });
    }
    var b = {
        center: new google.maps.LatLng(51.507333, -.107806),
        zoom: 15,
        zoomControl: !0,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE
        },
        disableDoubleClickZoom: !1,
        mapTypeControl: !1,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
        },
        scaleControl: !1,
        scrollwheel: !1,
        panControl: !1,
        streetViewControl: !1,
        draggable: !0,
        overviewMapControl: !1,
        overviewMapControlOptions: {
            opened: !1
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: themes.MapBox
    }, c = document.getElementById("map-canvas");
    map = new google.maps.Map(c, b);
    var d = [ [ "Purestone TFM", "Award winning digital communications agency.", "02037355460", "info@purestone.co.uk", "http://www.purestone.co.uk", 51.5071911, -.1076299, "img/markers/default.png" ] ];
    for (i = 0; i < d.length; i++) description = "undefined" == d[i][1] ? "" : d[i][1], 
    telephone = "undefined" == d[i][2] ? "" : d[i][2], email = "undefined" == d[i][3] ? "" : d[i][3], 
    web = "undefined" == d[i][4] ? "" : d[i][4], markericon = "undefined" == d[i][7] ? "" : d[i][7], 
    marker = new google.maps.Marker({
        icon: markericon,
        position: new google.maps.LatLng(d[i][5], d[i][6]),
        map: map,
        title: d[i][0],
        desc: description,
        tel: telephone,
        email: email,
        web: web
    }), a(marker, map, d[i][0], description, telephone, email, web);
}

function buildMap() {
    window.google && google.maps && (initialize(), google.maps.event.addDomListener(window, "resize", function() {
        var a = map.getCenter();
        google.maps.event.trigger(map, "resize"), map.setCenter(a);
    }), config.application.debug && console.log("Widget ~~ Map"));
}

function initMap() {
    $(".map-wrapper").length && loadScript("//maps.googleapis.com/maps/api/js?key=&sensor=false&extension=.js&callback=buildMap");
}

function Timer(a, b) {
    var c, d, e = b;
    this.stop = function() {
        window.clearTimeout(c), e = b;
    }, this.pause = function() {
        window.clearTimeout(c), e -= new Date() - d;
    }, this.resume = function() {
        d = new Date(), window.clearTimeout(c), c = window.setTimeout(a, e);
    }, this.resume();
}

function notify(a, b, c) {
    function d() {
        0 !== c && (timer = new Timer(function() {
            $(".notification").removeClass("active");
        }, c)), $(".notification").addClass("active").removeClass("default").removeClass("success").removeClass("warning").removeClass("failure").addClass(b).off("mouseenter").on("mouseenter", function() {
            0 !== c && timer.pause();
        }).off("mouseleave").on("mouseleave", function() {
            0 !== c && timer.resume();
        }).on("click", function() {
            $(".notification").removeClass("active");
        }).children(".notification-message").html(a), config.application.debug && console.log("Trigger :: Notification | Delay: " + c);
    }
    b = "undefined" == typeof b || "" === b ? config.notification.tone : b, c = "undefined" == typeof c || isNaN(c) || "" === c ? config.notification.delay : c;
    var e = "undefined" != typeof timer;
    e && timer.stop(), $(".notification").hasClass("active") ? ($(".notification").removeClass("active"), 
    setTimeout(d, 300)) : d();
}

function initNotifications() {
    $("[data-notification]").length && ($("[data-notification]").on("click", function() {
        var a = $(this).attr("data-message"), b = $(this).attr("data-tone"), c = parseInt($(this).attr("data-delay"));
        notify(a, b, c);
    }), config.application.debug && console.log("Widget :: Notifications"));
}

function initOverlays() {
    $("[data-overlay]").length && ($("[data-overlay]").each(function() {
        var a = $(this), b = $("#" + a.data("overlay"));
        a.on("click", function() {
            b.hasClass("active") ? b.removeClass("active") : b.addClass("active");
        }), b.on("click", function() {
            b.removeClass("active");
        }), b.children(".overlay-close").on("click", function() {
            b.removeClass("active");
        }), b.children(".modal").on("click", function(a) {
            $(a.target).closest(".overlay-close").length || a.stopPropagation();
        });
    }), config.application.debug && console.log("Widget :: Overlays"));
}

function initSearch() {
    $("[data-search]").length && ($("[data-search]").each(function(a) {
        function b(a) {
            function b(a) {
                var b = c.find("select[data-search-parameter='" + a + "']"), d = [];
                g[a] = [], n[a] = [];
                for (var e = 0; e < k.length; e++) {
                    var f = k[e], h = f[a];
                    if (h instanceof Array) for (var i = 0; i < h.length; i++) $.inArray(h[i], d) < 0 && d.push(h[i]); else $.inArray(h, d) < 0 && d.push(h);
                }
                var j = '<option value="" default selected>Select ' + a + "...</option>";
                b.append(j), d.sort();
                for (var l = 0; l < d.length; l++) {
                    var m = '<option value="' + d[l] + '">' + d[l] + "</option>";
                    b.append(m);
                }
            }
            function d() {
                var a = e.data("search-parameter");
                l.push(a), g[a] = [], e.length && e.each(function() {
                    $(this).on("keyup", function(a) {
                        var b = $(this).val().toLowerCase(), c = $(this).data("search-parameter"), d = (c.replace(/\s/g, "").split(","), 
                        a.keyCode), e = 32 == d || 13 === d || 8 == d || d > 47 && 58 > d || d > 64 && 91 > d || d > 95 && 112 > d || d > 185 && 193 > d || d > 218 && 223 > d;
                        return e ? (b.length <= 1 && unhighlight(p), g[c] = b, j(), !1) : void 0;
                    });
                }), f.length && f.each(function(a) {
                    var c = ($(this).val(), $(this).data("search-parameter"));
                    b(c), l.push(c), g[c] = [], $(this).on("change", function(b) {
                        b.preventDefault();
                        var d = $(this).val(), e = '<li class="tag" data-tag-group="' + a + '" data-tag-parameter="' + c + '" data-tag="' + d + '">' + d + i + "</li>";
                        if ("" !== d) {
                            if (!($.inArray(d, g[c]) < 0)) return notify("This tag already exists.", "failure"), 
                            !1;
                            q.addClass("active").append(e);
                        }
                        h(c), initSVGs();
                    });
                }), q.on("click", ".tag", function() {
                    var a = $(this).data("tag-parameter");
                    $(this).remove(), q.children(".tag").length > 0 ? q.addClass("active") : q.removeClass("active"), 
                    h(a);
                });
            }
            function h(a) {
                for (var b = q.children(".tag[data-tag-parameter='" + a + "']"), c = [], d = 0; d < b.length; d++) {
                    var e = b.eq(d).data("tag");
                    c.push(e);
                }
                g[a] = c, j();
            }
            function j() {
                function a() {
                    if (e.length) {
                        for (var a = e.data("search-parameter"), b = a.replace(/\s/g, "").split(","), c = [], d = 0; d < k.length; d++) for (var f = k[d], i = f.Id, j = g[a], l = 0; l < b.length; l++) {
                            var m = f[b[l]];
                            if (m instanceof Array) for (var n = 0; n < m.length; n++) {
                                var o = m[n].toLowerCase();
                                o.indexOf(j) > -1 && "" !== e.val() && $.inArray(i, c) < 0 && c.push(i);
                            } else {
                                var p = m.toLowerCase();
                                p.indexOf(j) > -1 && "" !== e.val() && $.inArray(i, c) < 0 && c.push(i);
                            }
                        }
                        h[a] = c;
                    }
                }
                function b() {
                    for (var a = 0; a < q.children(".tag").length; a++) {
                        for (var b = q.children(".tag").eq(a).data("tag-parameter"), c = b, d = g[b], e = [], f = 0; f < k.length; f++) {
                            var i = k[f], j = i.Id, l = i[c];
                            if (l instanceof Array) {
                                var m = l.concat(d);
                                m.duplicates().length > 0 && $.inArray(j, e) < 0 && e.push(j);
                            } else $.inArray(l, d) > -1 && $.inArray(j, e) < 0 && e.push(j);
                        }
                        h[b] = e;
                    }
                }
                function c(a) {
                    for (var b = {}, c = 0; c < a.length; c++) {
                        var d = a[c];
                        b[d] = b[d] ? b[d] + 1 : 1;
                    }
                    return b;
                }
                function d() {
                    function a() {
                        p.append(m);
                        for (var a = 0; a < k.length; a++) {
                            var b = k[a], c = b.Id, d = b.Image, f = b.Title, g = b.Date, h = g.replace("Z", ""), i = h.split("T"), j = i[0].split("-"), l = i[1].split(":"), o = new Date(j[0], j[1] - 1, j[2], l[0], l[1], l[2]), q = o.getHours(), r = 10 > q ? "0" + q : q, s = o.getMinutes(), t = 10 > s ? "0" + s : s, u = o.getDate(), v = 10 > u ? "0" + u : u, w = o.getMonth(), x = 10 > w + 1 ? "0" + (w + 1) : w + 1, y = o.getFullYear(), z = 10 > y ? "0" + y : y, A = r + ":" + t + " @ " + v + "/" + x + "/" + z, B = b.Url, C = b.Summary, D = b.Type, E = b.Categories.length > 0 ? b.Categories.toString().replace(/,/g, ", ") : "None", F = b.Tags.length > 0 ? b.Tags.toString().replace(/,/g, ", ") : "None", G = '<div class="search-item loading">\r\n												  <a class="img" href="' + B + '" style="background: url(' + d + ') no-repeat center center;"></a>\r\n												  <a class="title" href="' + B + '">' + f + '</a>\r\n												  <div class="date">' + A + '</div>\r\n												  <div class="type">' + D + '</div>\r\n												  <div class="summary">' + C + '</div>\r\n												  <div class="info">\r\n													  <div class="categories" data-tooltip="' + E + '">Categories</div>\r\n													  <div class="tags" data-tooltip="' + F + '">Tags</div>\r\n												  </div>\r\n											  </div>';
                            $.inArray(c, n) > -1 && p.append(G);
                        }
                        initTooltips(), e.each(function() {
                            var a = $(this).val().toLowerCase(), b = $(this).data("search-parameter"), c = b.replace(/\s/g, "").split(",");
                            if (a.length > 1) for (var d = 0; d < c.length; d++) {
                                var e = p.find("[class='" + c[d].toLowerCase() + "']");
                                highlight(e, a);
                            }
                        }), p.append(m), I = !1;
                    }
                    function b(a, b) {
                        b < config.search.count * w && (config.search.pagination ? a.eq(b).removeClass("loading") : setTimeout(function() {
                            a.eq(b).removeClass("loading");
                        }, 100 * (b % config.search.count)));
                    }
                    I && a();
                    var c = p.children(".search-item"), d = c.length;
                    if (u.css({
                        display: "inline-block"
                    }).html((0 === d ? "No" : d) + " result" + (1 === d ? " " : "s ") + "found"), d) {
                        p.removeClass("loading").removeClass("no-results"), config.search.pagination && c.addClass("loading");
                        for (var f = config.search.count * (w - 1); d > f; f++) b(c, f);
                    } else D ? p.removeClass("loading").addClass("no-results") : p.removeClass("no-results").addClass("loading");
                    H = $(".search-pagination"), config.search.pagination ? d > config.search.count ? H.show() : H.hide() : d > config.search.count * w ? s.show() : s.hide();
                }
                for (var f = [], h = [], i = [], j = [], n = [], o = 0; o < k.length; o++) {
                    var r = k[o], t = r.Id;
                    f.push(t);
                }
                for (var v = 0; v < l.length; v++) h[l[v]] = [];
                var w = 1;
                a(), b();
                for (var x = 0; x < l.length; x++) {
                    var y = g[l[x]], z = h[l[x]];
                    if (i.push(y.length > 0), y.length > 0) {
                        var A = z.concat(f).duplicates();
                        j.push(A);
                    }
                }
                for (var B = 0, C = 0; C < i.length; C++) i[C] === !0 && B++;
                var D = B >= 1, E = j.reduce().sort(), F = c(E);
                if (D) for (var G = 0; G < E.length; G++) F[E[G]] === B && $.inArray(E[G], n) < 0 && n.push(E[G]); else n = f;
                config.application.debug && console.log("Search == " + n.length + " items");
                var H, I = !0;
                p.html(""), d();
                var J = p.children(".search-item"), K = J.length;
                if (config.search.pagination) {
                    for (var L = 0, M = 0; K > M; M++) if (M % config.search.count === 0) {
                        L++;
                        var N = "<button data-page='" + L + "'>" + L + "</button>";
                        H.append(N);
                    }
                    $("[data-page='" + w + "']").addClass("primary"), $("[data-page]").off().on("click", function() {
                        w = $(this).data("page"), $("[data-page]").removeClass("primary"), $("[data-page='" + w + "']").addClass("primary"), 
                        $("html, body").animate({
                            scrollTop: $(".search-wrapper").offset().top - 90
                        }, {
                            duration: 1e3,
                            queue: !1,
                            complete: function() {
                                anchorClicked = !1;
                            }
                        }), d();
                    });
                } else s.on("click", function() {
                    w++, d();
                });
            }
            var k = a.Results, l = [], n = [];
            d(), initDropdowns(), j();
        }
        var c = $(this), d = c.data("search"), e = (c.find(".search-icon"), c.find("input[data-search-parameter]")), f = c.find("select[data-search-parameter]"), g = [], h = '<ul class="tagcloud"></ul>', i = '<img class="svg icon icon-close" src="img/icons/icon-close.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-close.png\'">', j = '<div class="search-controls"></div>', k = '<div class="search-count"></div>', l = '<div class="search-views">\r\n											<div class="search-view" data-view="grid">\r\n												<img class="svg icon icon-grid" src="img/icons/icon-grid.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-grid.png\'">\r\n											</div>\r\n											<div class="search-view" data-view="list">\r\n												<img class="svg icon icon-list" src="img/icons/icon-list.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-list.png\'">\r\n											</div>\r\n										</div>', m = '<div class="search-pagination"></div>', n = '<div class="search-results loading ' + config.search.display + '" data-view="' + config.search.view + '"></div>', o = '<button class="primary center search-load">Load More</button>';
        $(".search-container").append(n);
        var p = $(".search-container .search-results");
        $(h).insertBefore(p), $(j).insertBefore(p), $(o).insertAfter(p);
        var q = $(".tagcloud"), r = $(".search-controls"), s = $(".search-load");
        r.append(l).append(k);
        var t = r.find(".search-views"), u = r.find(".search-count");
        initSVGs(), t.children(".search-view[data-view='" + config.search.view + "']").addClass("active"), 
        t.on("click", ".search-view", function() {
            var a = $(this), b = a.data("view");
            a.addClass("active").siblings().removeClass("active"), p.attr("data-view", b);
        }), dataRequest(d, "GET", b);
    }), config.application.debug && console.log("Search :: Unified Search"));
}

function initTagClouds() {
    $("[data-tagcloud]").length && ($("[data-tagcloud]").each(function(a) {
        function b() {
            e = [];
            for (var a = 0; a < i.children(".tag").length; a++) e.push(i.children(".tag").eq(a).data("tag"));
            j.val(e), initSVGs();
        }
        var c = $(this), d = a, e = [], f = '<ul class="tagcloud" data-tag="tagcloud-' + d + '"></ul>', g = '<input type="hidden" class="tagcloud-result" data-tag="tagcloud-' + d + '">', h = '<img class="svg icon icon-close" src="img/icons/icon-close.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-close.png\'">';
        $(g).insertAfter(c), $(f).insertAfter(c);
        var i = $(".tagcloud[data-tag='tagcloud-" + d + "']"), j = $("input[data-tag='tagcloud-" + d + "']");
        c.on("keydown", function(a) {
            if (9 === a.keyCode || 13 === a.keyCode) {
                var d = c.val(), f = '<li class="tag" data-tag="' + d + '">' + d + h + "</li>";
                return "" !== d && $.inArray(d, e) < 0 && i.addClass("active").append(f), $.inArray(d, e) >= 0 && notify("This tag already exists.", "failure"), 
                b(), c.val("").focus(), !1;
            }
        }).on("change", function() {
            var a = c.val(), d = '<li class="tag" data-tag="' + a + '">' + a + h + "</li>";
            return "" !== a && $.inArray(a, e) < 0 && i.addClass("active").append(d), $.inArray(a, e) >= 0 && notify("This tag already exists.", "failure"), 
            b(), !1;
        }), i.on("click", ".tag", function() {
            $(this).remove(), i.children(".tag").length > 0 ? i.addClass("active") : i.removeClass("active"), 
            b();
        });
    }), config.application.debug && console.log("Search :: Tag Cloud"));
}

function initTwitter() {
    $("[data-twitter]").length && ($("[data-twitter]").each(function(a) {
        var b = $(this), c = b.attr("id"), d = b.data("widget-id"), e = b.data("start-at");
        maxTweets = b.data("max-tweets"), "undefined" == typeof c && (b.attr("id", "widget-twitter-" + a), 
        twitterConfig = {
            domId: b.attr("id"),
            widgetId: "undefined" != typeof d ? d : config.twitter.widgetId,
            startAt: "undefined" != typeof e ? e : (config.twitter.startAt + config.twitter.maxTweets) * a,
            maxTweets: "undefined" != typeof maxTweets ? maxTweets : config.twitter.maxTweets,
            enableLinks: config.twitter.enableLinks,
            showUser: config.twitter.showUser,
            showTime: config.twitter.showTime,
            showRetweet: config.twitter.showRetweet,
            showFollow: config.twitter.showFollow,
            showInteraction: config.twitter.showInteraction
        }, twitterFetcher.fetch(twitterConfig));
    }), config.application.debug && console.log("Widget :: Twitter"));
}

function initVideo() {
    function a() {
        if ($("iframe[src*='youtube']").length) {
            var a = function(a) {
                function b() {
                    e.addClass("loaded"), g.off().on("click", function() {
                        e.hasClass("playing") ? d.pauseVideo() : (e.addClass("playing"), config.application.touch || d.playVideo());
                    }), f.off().on("click", function() {
                        e.addClass("playing"), config.application.touch || d.playVideo();
                    });
                }
                function c(a) {
                    (a.data === YT.PlayerState.ENDED || a.data === YT.PlayerState.PAUSED) && e.removeClass("playing");
                }
                var d = new YT.Player(a, {
                    events: {
                        onReady: b,
                        onStateChange: c
                    }
                }), e = $("." + a), f = e.children(".video-thumb"), g = e.children(".video-button");
            };
            $("iframe[src*='youtube']").each(function(b) {
                if (!$(this).parents(".video-frame").length) {
                    var c = $(this), d = "ytFramePlayer-" + b, e = c.attr("src").split("/"), f = e[e.length - 1].split("?")[0], g = "//img.youtube.com/vi/" + f + "/hqdefault.jpg", h = {
                        rel: 0,
                        wmode: "transparent",
                        modestbranding: 1,
                        enablejsapi: 1,
                        html5: 1,
                        showinfo: 0,
                        controls: 1,
                        autohide: 1
                    }, i = '<div class="video-frame ' + d + '">\r\n										<div class="video-overlay"></div>\r\n										<img class="video-loader" src="img/loader.gif" alt="Video loader">\r\n										<div class="video-thumb" style="background: url(' + g + ');">&nbsp;</div>\r\n										<div class="video-button">\r\n											<img class="svg icon icon-play" src="img/icons/icon-play.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-play.png\'">\r\n											<img class="svg icon icon-pause" src="img/icons/icon-pause.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-pause.png\'">\r\n										</div>\r\n										<iframe id="' + d + '" src="' + c.attr("src") + "?" + serialize(h) + '" frameborder="0" allowfullscreen></iframe>\r\n									</div>';
                    c.replaceWith(i), initSVGs(), a(d);
                }
            });
        }
    }
    function b() {
        if ($(".video-frame[data-video-service='youtube']").length) {
            var a = function(a, b) {
                function c() {
                    f.addClass("loaded"), h.off().on("click", function() {
                        f.hasClass("playing") ? e.pauseVideo() : (f.addClass("playing"), config.application.touch || e.playVideo());
                    }), g.off().on("click", function() {
                        f.addClass("playing"), config.application.touch || e.playVideo();
                    });
                }
                function d(a) {
                    (a.data === YT.PlayerState.ENDED || a.data === YT.PlayerState.PAUSED) && f.removeClass("playing");
                }
                var e = new YT.Player(a, {
                    videoId: b,
                    width: "1280",
                    height: "600",
                    playerVars: {
                        rel: 0,
                        wmode: "transparent",
                        modestbranding: 1,
                        enablejsapi: 1,
                        html5: 1,
                        showinfo: 0,
                        controls: 1,
                        autohide: 1
                    },
                    events: {
                        onReady: c,
                        onStateChange: d
                    }
                }), f = $("." + a), g = f.children(".video-thumb"), h = f.children(".video-button");
            };
            $(".video-frame[data-video-service='youtube']").each(function(b) {
                var c = $(this), d = "ytVideoPlayer-" + b, e = c.data("video-id"), f = "//img.youtube.com/vi/" + e + "/hqdefault.jpg", g = '<div class="video-overlay"></div>\r\n								<img class="video-loader" src="img/loader.gif" alt="Video loader">\r\n								<div class="video-thumb" style="background: url(' + f + ');">&nbsp;</div>\r\n								<div class="video-button">\r\n									<img class="svg icon icon-play" src="img/icons/icon-play.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-play.png\'">\r\n									<img class="svg icon icon-pause" src="img/icons/icon-pause.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-pause.png\'">\r\n								</div>\r\n								<div id="' + d + '"></div>';
                c.html("").addClass(d).append(g), c.children(".video-thumb").css({
                    background: "url(" + f + ")"
                }), initSVGs(), a(d, e);
            });
        }
    }
    function c() {
        if ($("iframe[src*='vimeo']").length) {
            var a = function(a) {
                function b() {
                    e.addClass("loaded"), g.off().on("click", function() {
                        e.hasClass("playing") ? d.vimeo("pause") : (e.addClass("playing"), config.application.touch || d.vimeo("play"));
                    }), f.off().on("click", function() {
                        e.addClass("playing"), config.application.touch || d.vimeo("play");
                    });
                }
                function c() {
                    e.removeClass("playing");
                }
                var d = $("#" + a), e = $("." + a), f = e.children(".video-thumb"), g = e.children(".video-button");
                d.on("load", b).on("pause finish", c);
            };
            $("iframe[src*='vimeo']").each(function(b) {
                if (!$(this).parents(".video-frame").length) {
                    var c = $(this), d = "vimFramePlayer-" + b, e = c.attr("src").split("/"), f = e[e.length - 1].split("?")[0], g = {
                        api: 1,
                        player_id: d
                    }, h = '<div class="video-frame ' + d + '">\r\n										<div class="video-overlay"></div>\r\n										<img class="video-loader" src="img/loader.gif" alt="Video loader">\r\n										<div class="video-thumb">&nbsp;</div>\r\n										<div class="video-button">\r\n											<img class="svg icon icon-play" src="img/icons/icon-play.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-play.png\'">\r\n											<img class="svg icon icon-pause" src="img/icons/icon-pause.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-pause.png\'">\r\n										</div>\r\n										<iframe id="' + d + '" src="//player.vimeo.com/video/' + f + "?" + serialize(g) + '" frameborder="0" allowfullscreen></iframe>\r\n									</div>';
                    c.wrap(h), initSVGs(), dataRequest("//vimeo.com/api/v2/video/" + f + ".json", "GET", function(a) {
                        var b = a[0].thumbnail_large;
                        c.parents(".video-frame").children(".video-thumb").css({
                            background: "url(" + b + ")"
                        }), c.remove();
                    }), a(d);
                }
            });
        }
    }
    function d() {
        if ($(".video-frame[data-video-service='vimeo']").length) {
            var a = function(a) {
                function b() {
                    e.addClass("loaded"), g.off().on("click", function() {
                        e.hasClass("playing") ? d.vimeo("pause") : (e.addClass("playing"), config.application.touch || d.vimeo("play"));
                    }), f.off().on("click", function() {
                        e.addClass("playing"), config.application.touch || d.vimeo("play");
                    });
                }
                function c() {
                    e.removeClass("playing");
                }
                var d = $("#" + a), e = $("." + a), f = e.children(".video-thumb"), g = e.children(".video-button");
                d.on("load", b).on("pause finish", c);
            };
            $(".video-frame[data-video-service='vimeo']").each(function(b) {
                var c = $(this), d = "vimVideoPlayer-" + b, e = c.data("video-id"), f = {
                    api: 1,
                    player_id: d
                }, g = '<div class="video-overlay"></div>\r\n								<img class="video-loader" src="img/loader.gif" alt="Video loader">\r\n								<div class="video-thumb">&nbsp;</div>\r\n								<div class="video-button">\r\n									<img class="svg icon icon-play" src="img/icons/icon-play.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-play.png\'">\r\n									<img class="svg icon icon-pause" src="img/icons/icon-pause.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-pause.png\'">\r\n								</div>\r\n								<iframe id="' + d + '" src="//player.vimeo.com/video/' + e + "?" + serialize(f) + '" frameborder="0" allowfullscreen></iframe>';
                c.html("").addClass(d).append(g), initSVGs(), dataRequest("//vimeo.com/api/v2/video/" + e + ".json", "GET", function(a) {
                    var b = a[0].thumbnail_large;
                    c.children(".video-thumb").css({
                        background: "url(" + b + ")"
                    });
                }), a(d);
            });
        }
    }
    var e = !1, f = !1;
    ("undefined" == typeof YT || "undefined" == typeof YT.Player) && (f ? a() : (window.onYouTubeIframeAPIReady = function() {
        f = !0, a();
    }, $.getScript("https://www.youtube.com/iframe_api")), e ? b() : (window.onYouTubePlayerAPIReady = function() {
        e = !0, b();
    }, $.getScript("https://www.youtube.com/player_api"))), c(), d(), config.application.debug && console.log("Widget :: Videos");
}

!function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");
        return b(a);
    } : b(a);
}("undefined" != typeof window ? window : this, function(a, b) {
    function c(a) {
        var b = a.length, c = ea.type(a);
        return "function" === c || ea.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a;
    }
    function d(a, b, c) {
        if (ea.isFunction(b)) return ea.grep(a, function(a, d) {
            return !!b.call(a, d, a) !== c;
        });
        if (b.nodeType) return ea.grep(a, function(a) {
            return a === b !== c;
        });
        if ("string" == typeof b) {
            if (ma.test(b)) return ea.filter(b, a, c);
            b = ea.filter(b, a);
        }
        return ea.grep(a, function(a) {
            return ea.inArray(a, b) >= 0 !== c;
        });
    }
    function e(a, b) {
        do a = a[b]; while (a && 1 !== a.nodeType);
        return a;
    }
    function f(a) {
        var b = ua[a] = {};
        return ea.each(a.match(ta) || [], function(a, c) {
            b[c] = !0;
        }), b;
    }
    function g() {
        oa.addEventListener ? (oa.removeEventListener("DOMContentLoaded", h, !1), a.removeEventListener("load", h, !1)) : (oa.detachEvent("onreadystatechange", h), 
        a.detachEvent("onload", h));
    }
    function h() {
        (oa.addEventListener || "load" === event.type || "complete" === oa.readyState) && (g(), 
        ea.ready());
    }
    function i(a, b, c) {
        if (void 0 === c && 1 === a.nodeType) {
            var d = "data-" + b.replace(za, "-$1").toLowerCase();
            if (c = a.getAttribute(d), "string" == typeof c) {
                try {
                    c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : ya.test(c) ? ea.parseJSON(c) : c;
                } catch (e) {}
                ea.data(a, b, c);
            } else c = void 0;
        }
        return c;
    }
    function j(a) {
        var b;
        for (b in a) if (("data" !== b || !ea.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
        return !0;
    }
    function k(a, b, c, d) {
        if (ea.acceptData(a)) {
            var e, f, g = ea.expando, h = a.nodeType, i = h ? ea.cache : a, j = h ? a[g] : a[g] && g;
            if (j && i[j] && (d || i[j].data) || void 0 !== c || "string" != typeof b) return j || (j = h ? a[g] = W.pop() || ea.guid++ : g), 
            i[j] || (i[j] = h ? {} : {
                toJSON: ea.noop
            }), ("object" == typeof b || "function" == typeof b) && (d ? i[j] = ea.extend(i[j], b) : i[j].data = ea.extend(i[j].data, b)), 
            f = i[j], d || (f.data || (f.data = {}), f = f.data), void 0 !== c && (f[ea.camelCase(b)] = c), 
            "string" == typeof b ? (e = f[b], null == e && (e = f[ea.camelCase(b)])) : e = f, 
            e;
        }
    }
    function l(a, b, c) {
        if (ea.acceptData(a)) {
            var d, e, f = a.nodeType, g = f ? ea.cache : a, h = f ? a[ea.expando] : ea.expando;
            if (g[h]) {
                if (b && (d = c ? g[h] : g[h].data)) {
                    ea.isArray(b) ? b = b.concat(ea.map(b, ea.camelCase)) : b in d ? b = [ b ] : (b = ea.camelCase(b), 
                    b = b in d ? [ b ] : b.split(" ")), e = b.length;
                    for (;e--; ) delete d[b[e]];
                    if (c ? !j(d) : !ea.isEmptyObject(d)) return;
                }
                (c || (delete g[h].data, j(g[h]))) && (f ? ea.cleanData([ a ], !0) : ca.deleteExpando || g != g.window ? delete g[h] : g[h] = null);
            }
        }
    }
    function m() {
        return !0;
    }
    function n() {
        return !1;
    }
    function o() {
        try {
            return oa.activeElement;
        } catch (a) {}
    }
    function p(a) {
        var b = Ka.split("|"), c = a.createDocumentFragment();
        if (c.createElement) for (;b.length; ) c.createElement(b.pop());
        return c;
    }
    function q(a, b) {
        var c, d, e = 0, f = typeof a.getElementsByTagName !== xa ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== xa ? a.querySelectorAll(b || "*") : void 0;
        if (!f) for (f = [], c = a.childNodes || a; null != (d = c[e]); e++) !b || ea.nodeName(d, b) ? f.push(d) : ea.merge(f, q(d, b));
        return void 0 === b || b && ea.nodeName(a, b) ? ea.merge([ a ], f) : f;
    }
    function r(a) {
        Ea.test(a.type) && (a.defaultChecked = a.checked);
    }
    function s(a, b) {
        return ea.nodeName(a, "table") && ea.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a;
    }
    function t(a) {
        return a.type = (null !== ea.find.attr(a, "type")) + "/" + a.type, a;
    }
    function u(a) {
        var b = Va.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a;
    }
    function v(a, b) {
        for (var c, d = 0; null != (c = a[d]); d++) ea._data(c, "globalEval", !b || ea._data(b[d], "globalEval"));
    }
    function w(a, b) {
        if (1 === b.nodeType && ea.hasData(a)) {
            var c, d, e, f = ea._data(a), g = ea._data(b, f), h = f.events;
            if (h) {
                delete g.handle, g.events = {};
                for (c in h) for (d = 0, e = h[c].length; e > d; d++) ea.event.add(b, c, h[c][d]);
            }
            g.data && (g.data = ea.extend({}, g.data));
        }
    }
    function x(a, b) {
        var c, d, e;
        if (1 === b.nodeType) {
            if (c = b.nodeName.toLowerCase(), !ca.noCloneEvent && b[ea.expando]) {
                e = ea._data(b);
                for (d in e.events) ea.removeEvent(b, d, e.handle);
                b.removeAttribute(ea.expando);
            }
            "script" === c && b.text !== a.text ? (t(b).text = a.text, u(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), 
            ca.html5Clone && a.innerHTML && !ea.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && Ea.test(a.type) ? (b.defaultChecked = b.checked = a.checked, 
            b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue);
        }
    }
    function y(b, c) {
        var d, e = ea(c.createElement(b)).appendTo(c.body), f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : ea.css(e[0], "display");
        return e.detach(), f;
    }
    function z(a) {
        var b = oa, c = _a[a];
        return c || (c = y(a, b), "none" !== c && c || ($a = ($a || ea("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), 
        b = ($a[0].contentWindow || $a[0].contentDocument).document, b.write(), b.close(), 
        c = y(a, b), $a.detach()), _a[a] = c), c;
    }
    function A(a, b) {
        return {
            get: function() {
                var c = a();
                if (null != c) return c ? void delete this.get : (this.get = b).apply(this, arguments);
            }
        };
    }
    function B(a, b) {
        if (b in a) return b;
        for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = mb.length; e--; ) if (b = mb[e] + c, 
        b in a) return b;
        return d;
    }
    function C(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = ea._data(d, "olddisplay"), 
        c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && Ca(d) && (f[g] = ea._data(d, "olddisplay", z(d.nodeName)))) : (e = Ca(d), 
        (c && "none" !== c || !e) && ea._data(d, "olddisplay", e ? c : ea.css(d, "display"))));
        for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a;
    }
    function D(a, b, c) {
        var d = ib.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b;
    }
    function E(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += ea.css(a, c + Ba[f], !0, e)), 
        d ? ("content" === c && (g -= ea.css(a, "padding" + Ba[f], !0, e)), "margin" !== c && (g -= ea.css(a, "border" + Ba[f] + "Width", !0, e))) : (g += ea.css(a, "padding" + Ba[f], !0, e), 
        "padding" !== c && (g += ea.css(a, "border" + Ba[f] + "Width", !0, e)));
        return g;
    }
    function F(a, b, c) {
        var d = !0, e = "width" === b ? a.offsetWidth : a.offsetHeight, f = ab(a), g = ca.boxSizing && "border-box" === ea.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = bb(a, b, f), (0 > e || null == e) && (e = a.style[b]), db.test(e)) return e;
            d = g && (ca.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0;
        }
        return e + E(a, b, c || (g ? "border" : "content"), d, f) + "px";
    }
    function G(a, b, c, d, e) {
        return new G.prototype.init(a, b, c, d, e);
    }
    function H() {
        return setTimeout(function() {
            nb = void 0;
        }), nb = ea.now();
    }
    function I(a, b) {
        var c, d = {
            height: a
        }, e = 0;
        for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = Ba[e], d["margin" + c] = d["padding" + c] = a;
        return b && (d.opacity = d.width = a), d;
    }
    function J(a, b, c) {
        for (var d, e = (tb[b] || []).concat(tb["*"]), f = 0, g = e.length; g > f; f++) if (d = e[f].call(c, b, a)) return d;
    }
    function K(a, b, c) {
        var d, e, f, g, h, i, j, k, l = this, m = {}, n = a.style, o = a.nodeType && Ca(a), p = ea._data(a, "fxshow");
        c.queue || (h = ea._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, 
        i = h.empty.fire, h.empty.fire = function() {
            h.unqueued || i();
        }), h.unqueued++, l.always(function() {
            l.always(function() {
                h.unqueued--, ea.queue(a, "fx").length || h.empty.fire();
            });
        })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [ n.overflow, n.overflowX, n.overflowY ], 
        j = ea.css(a, "display"), k = "none" === j ? ea._data(a, "olddisplay") || z(a.nodeName) : j, 
        "inline" === k && "none" === ea.css(a, "float") && (ca.inlineBlockNeedsLayout && "inline" !== z(a.nodeName) ? n.zoom = 1 : n.display = "inline-block")), 
        c.overflow && (n.overflow = "hidden", ca.shrinkWrapBlocks() || l.always(function() {
            n.overflow = c.overflow[0], n.overflowX = c.overflow[1], n.overflowY = c.overflow[2];
        }));
        for (d in b) if (e = b[d], pb.exec(e)) {
            if (delete b[d], f = f || "toggle" === e, e === (o ? "hide" : "show")) {
                if ("show" !== e || !p || void 0 === p[d]) continue;
                o = !0;
            }
            m[d] = p && p[d] || ea.style(a, d);
        } else j = void 0;
        if (ea.isEmptyObject(m)) "inline" === ("none" === j ? z(a.nodeName) : j) && (n.display = j); else {
            p ? "hidden" in p && (o = p.hidden) : p = ea._data(a, "fxshow", {}), f && (p.hidden = !o), 
            o ? ea(a).show() : l.done(function() {
                ea(a).hide();
            }), l.done(function() {
                var b;
                ea._removeData(a, "fxshow");
                for (b in m) ea.style(a, b, m[b]);
            });
            for (d in m) g = J(o ? p[d] : 0, d, l), d in p || (p[d] = g.start, o && (g.end = g.start, 
            g.start = "width" === d || "height" === d ? 1 : 0));
        }
    }
    function L(a, b) {
        var c, d, e, f, g;
        for (c in a) if (d = ea.camelCase(c), e = b[d], f = a[c], ea.isArray(f) && (e = f[1], 
        f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = ea.cssHooks[d], g && "expand" in g) {
            f = g.expand(f), delete a[d];
            for (c in f) c in a || (a[c] = f[c], b[c] = e);
        } else b[d] = e;
    }
    function M(a, b, c) {
        var d, e, f = 0, g = sb.length, h = ea.Deferred().always(function() {
            delete i.elem;
        }), i = function() {
            if (e) return !1;
            for (var b = nb || H(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
            return h.notifyWith(a, [ j, f, c ]), 1 > f && i ? c : (h.resolveWith(a, [ j ]), 
            !1);
        }, j = h.promise({
            elem: a,
            props: ea.extend({}, b),
            opts: ea.extend(!0, {
                specialEasing: {}
            }, c),
            originalProperties: b,
            originalOptions: c,
            startTime: nb || H(),
            duration: c.duration,
            tweens: [],
            createTween: function(b, c) {
                var d = ea.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(d), d;
            },
            stop: function(b) {
                var c = 0, d = b ? j.tweens.length : 0;
                if (e) return this;
                for (e = !0; d > c; c++) j.tweens[c].run(1);
                return b ? h.resolveWith(a, [ j, b ]) : h.rejectWith(a, [ j, b ]), this;
            }
        }), k = j.props;
        for (L(k, j.opts.specialEasing); g > f; f++) if (d = sb[f].call(j, a, k, j.opts)) return d;
        return ea.map(k, J, j), ea.isFunction(j.opts.start) && j.opts.start.call(a, j), 
        ea.fx.timer(ea.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always);
    }
    function N(a) {
        return function(b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0, f = b.toLowerCase().match(ta) || [];
            if (ea.isFunction(c)) for (;d = f[e++]; ) "+" === d.charAt(0) ? (d = d.slice(1) || "*", 
            (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
        };
    }
    function O(a, b, c, d) {
        function e(h) {
            var i;
            return f[h] = !0, ea.each(a[h] || [], function(a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), 
                e(j), !1);
            }), i;
        }
        var f = {}, g = a === Rb;
        return e(b.dataTypes[0]) || !f["*"] && e("*");
    }
    function P(a, b) {
        var c, d, e = ea.ajaxSettings.flatOptions || {};
        for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
        return c && ea.extend(!0, a, c), a;
    }
    function Q(a, b, c) {
        for (var d, e, f, g, h = a.contents, i = a.dataTypes; "*" === i[0]; ) i.shift(), 
        void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
        if (e) for (g in h) if (h[g] && h[g].test(e)) {
            i.unshift(g);
            break;
        }
        if (i[0] in c) f = i[0]; else {
            for (g in c) {
                if (!i[0] || a.converters[g + " " + i[0]]) {
                    f = g;
                    break;
                }
                d || (d = g);
            }
            f = f || d;
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;
    }
    function R(a, b, c, d) {
        var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
        if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        for (f = k.shift(); f; ) if (a.responseFields[f] && (c[a.responseFields[f]] = b), 
        !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i; else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                break;
            }
            if (g !== !0) if (g && a["throws"]) b = g(b); else try {
                b = g(b);
            } catch (l) {
                return {
                    state: "parsererror",
                    error: g ? l : "No conversion from " + i + " to " + f
                };
            }
        }
        return {
            state: "success",
            data: b
        };
    }
    function S(a, b, c, d) {
        var e;
        if (ea.isArray(b)) ea.each(b, function(b, e) {
            c || Vb.test(a) ? d(a, e) : S(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d);
        }); else if (c || "object" !== ea.type(b)) d(a, b); else for (e in b) S(a + "[" + e + "]", b[e], c, d);
    }
    function T() {
        try {
            return new a.XMLHttpRequest();
        } catch (b) {}
    }
    function U() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP");
        } catch (b) {}
    }
    function V(a) {
        return ea.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1;
    }
    var W = [], X = W.slice, Y = W.concat, Z = W.push, $ = W.indexOf, _ = {}, aa = _.toString, ba = _.hasOwnProperty, ca = {}, da = "1.11.2", ea = function(a, b) {
        return new ea.fn.init(a, b);
    }, fa = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ga = /^-ms-/, ha = /-([\da-z])/gi, ia = function(a, b) {
        return b.toUpperCase();
    };
    ea.fn = ea.prototype = {
        jquery: da,
        constructor: ea,
        selector: "",
        length: 0,
        toArray: function() {
            return X.call(this);
        },
        get: function(a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : X.call(this);
        },
        pushStack: function(a) {
            var b = ea.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b;
        },
        each: function(a, b) {
            return ea.each(this, a, b);
        },
        map: function(a) {
            return this.pushStack(ea.map(this, function(b, c) {
                return a.call(b, c, b);
            }));
        },
        slice: function() {
            return this.pushStack(X.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(a) {
            var b = this.length, c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [ this[c] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: Z,
        sort: W.sort,
        splice: W.splice
    }, ea.extend = ea.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || ea.isFunction(g) || (g = {}), 
        h === i && (g = this, h--); i > h; h++) if (null != (e = arguments[h])) for (d in e) a = g[d], 
        c = e[d], g !== c && (j && c && (ea.isPlainObject(c) || (b = ea.isArray(c))) ? (b ? (b = !1, 
        f = a && ea.isArray(a) ? a : []) : f = a && ea.isPlainObject(a) ? a : {}, g[d] = ea.extend(j, f, c)) : void 0 !== c && (g[d] = c));
        return g;
    }, ea.extend({
        expando: "jQuery" + (da + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(a) {
            throw new Error(a);
        },
        noop: function() {},
        isFunction: function(a) {
            return "function" === ea.type(a);
        },
        isArray: Array.isArray || function(a) {
            return "array" === ea.type(a);
        },
        isWindow: function(a) {
            return null != a && a == a.window;
        },
        isNumeric: function(a) {
            return !ea.isArray(a) && a - parseFloat(a) + 1 >= 0;
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a) return !1;
            return !0;
        },
        isPlainObject: function(a) {
            var b;
            if (!a || "object" !== ea.type(a) || a.nodeType || ea.isWindow(a)) return !1;
            try {
                if (a.constructor && !ba.call(a, "constructor") && !ba.call(a.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (c) {
                return !1;
            }
            if (ca.ownLast) for (b in a) return ba.call(a, b);
            for (b in a) ;
            return void 0 === b || ba.call(a, b);
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? _[aa.call(a)] || "object" : typeof a;
        },
        globalEval: function(b) {
            b && ea.trim(b) && (a.execScript || function(b) {
                a.eval.call(a, b);
            })(b);
        },
        camelCase: function(a) {
            return a.replace(ga, "ms-").replace(ha, ia);
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
        },
        each: function(a, b, d) {
            var e, f = 0, g = a.length, h = c(a);
            if (d) {
                if (h) for (;g > f && (e = b.apply(a[f], d), e !== !1); f++) ; else for (f in a) if (e = b.apply(a[f], d), 
                e === !1) break;
            } else if (h) for (;g > f && (e = b.call(a[f], f, a[f]), e !== !1); f++) ; else for (f in a) if (e = b.call(a[f], f, a[f]), 
            e === !1) break;
            return a;
        },
        trim: function(a) {
            return null == a ? "" : (a + "").replace(fa, "");
        },
        makeArray: function(a, b) {
            var d = b || [];
            return null != a && (c(Object(a)) ? ea.merge(d, "string" == typeof a ? [ a ] : a) : Z.call(d, a)), 
            d;
        },
        inArray: function(a, b, c) {
            var d;
            if (b) {
                if ($) return $.call(b, a, c);
                for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++) if (c in b && b[c] === a) return c;
            }
            return -1;
        },
        merge: function(a, b) {
            for (var c = +b.length, d = 0, e = a.length; c > d; ) a[e++] = b[d++];
            if (c !== c) for (;void 0 !== b[d]; ) a[e++] = b[d++];
            return a.length = e, a;
        },
        grep: function(a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
            return e;
        },
        map: function(a, b, d) {
            var e, f = 0, g = a.length, h = c(a), i = [];
            if (h) for (;g > f; f++) e = b(a[f], f, d), null != e && i.push(e); else for (f in a) e = b(a[f], f, d), 
            null != e && i.push(e);
            return Y.apply([], i);
        },
        guid: 1,
        proxy: function(a, b) {
            var c, d, e;
            return "string" == typeof b && (e = a[b], b = a, a = e), ea.isFunction(a) ? (c = X.call(arguments, 2), 
            d = function() {
                return a.apply(b || this, c.concat(X.call(arguments)));
            }, d.guid = a.guid = a.guid || ea.guid++, d) : void 0;
        },
        now: function() {
            return +new Date();
        },
        support: ca
    }), ea.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        _["[object " + b + "]"] = b.toLowerCase();
    });
    var ja = function(a) {
        function b(a, b, c, d) {
            var e, f, g, h, i, j, l, n, o, p;
            if ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, c = c || [], h = b.nodeType, 
            "string" != typeof a || !a || 1 !== h && 9 !== h && 11 !== h) return c;
            if (!d && I) {
                if (11 !== h && (e = sa.exec(a))) if (g = e[1]) {
                    if (9 === h) {
                        if (f = b.getElementById(g), !f || !f.parentNode) return c;
                        if (f.id === g) return c.push(f), c;
                    } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g) return c.push(f), 
                    c;
                } else {
                    if (e[2]) return $.apply(c, b.getElementsByTagName(a)), c;
                    if ((g = e[3]) && v.getElementsByClassName) return $.apply(c, b.getElementsByClassName(g)), 
                    c;
                }
                if (v.qsa && (!J || !J.test(a))) {
                    if (n = l = N, o = b, p = 1 !== h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
                        for (j = z(a), (l = b.getAttribute("id")) ? n = l.replace(ua, "\\$&") : b.setAttribute("id", n), 
                        n = "[id='" + n + "'] ", i = j.length; i--; ) j[i] = n + m(j[i]);
                        o = ta.test(a) && k(b.parentNode) || b, p = j.join(",");
                    }
                    if (p) try {
                        return $.apply(c, o.querySelectorAll(p)), c;
                    } catch (q) {} finally {
                        l || b.removeAttribute("id");
                    }
                }
            }
            return B(a.replace(ia, "$1"), b, c, d);
        }
        function c() {
            function a(c, d) {
                return b.push(c + " ") > w.cacheLength && delete a[b.shift()], a[c + " "] = d;
            }
            var b = [];
            return a;
        }
        function d(a) {
            return a[N] = !0, a;
        }
        function e(a) {
            var b = G.createElement("div");
            try {
                return !!a(b);
            } catch (c) {
                return !1;
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null;
            }
        }
        function f(a, b) {
            for (var c = a.split("|"), d = a.length; d--; ) w.attrHandle[c[d]] = b;
        }
        function g(a, b) {
            var c = b && a, d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || V) - (~a.sourceIndex || V);
            if (d) return d;
            if (c) for (;c = c.nextSibling; ) if (c === b) return -1;
            return a ? 1 : -1;
        }
        function h(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a;
            };
        }
        function i(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a;
            };
        }
        function j(a) {
            return d(function(b) {
                return b = +b, d(function(c, d) {
                    for (var e, f = a([], c.length, b), g = f.length; g--; ) c[e = f[g]] && (c[e] = !(d[e] = c[e]));
                });
            });
        }
        function k(a) {
            return a && "undefined" != typeof a.getElementsByTagName && a;
        }
        function l() {}
        function m(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
            return d;
        }
        function n(a, b, c) {
            var d = b.dir, e = c && "parentNode" === d, f = Q++;
            return b.first ? function(b, c, f) {
                for (;b = b[d]; ) if (1 === b.nodeType || e) return a(b, c, f);
            } : function(b, c, g) {
                var h, i, j = [ P, f ];
                if (g) {
                    for (;b = b[d]; ) if ((1 === b.nodeType || e) && a(b, c, g)) return !0;
                } else for (;b = b[d]; ) if (1 === b.nodeType || e) {
                    if (i = b[N] || (b[N] = {}), (h = i[d]) && h[0] === P && h[1] === f) return j[2] = h[2];
                    if (i[d] = j, j[2] = a(b, c, g)) return !0;
                }
            };
        }
        function o(a) {
            return a.length > 1 ? function(b, c, d) {
                for (var e = a.length; e--; ) if (!a[e](b, c, d)) return !1;
                return !0;
            } : a[0];
        }
        function p(a, c, d) {
            for (var e = 0, f = c.length; f > e; e++) b(a, c[e], d);
            return d;
        }
        function q(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++) (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), 
            j && b.push(h));
            return g;
        }
        function r(a, b, c, e, f, g) {
            return e && !e[N] && (e = r(e)), f && !f[N] && (f = r(f, g)), d(function(d, g, h, i) {
                var j, k, l, m = [], n = [], o = g.length, r = d || p(b || "*", h.nodeType ? [ h ] : h, []), s = !a || !d && b ? r : q(r, m, a, h, i), t = c ? f || (d ? a : o || e) ? [] : g : s;
                if (c && c(s, t, h, i), e) for (j = q(t, n), e(j, [], h, i), k = j.length; k--; ) (l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                if (d) {
                    if (f || a) {
                        if (f) {
                            for (j = [], k = t.length; k--; ) (l = t[k]) && j.push(s[k] = l);
                            f(null, t = [], j, i);
                        }
                        for (k = t.length; k--; ) (l = t[k]) && (j = f ? aa(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l));
                    }
                } else t = q(t === g ? t.splice(o, t.length) : t), f ? f(null, g, t, i) : $.apply(g, t);
            });
        }
        function s(a) {
            for (var b, c, d, e = a.length, f = w.relative[a[0].type], g = f || w.relative[" "], h = f ? 1 : 0, i = n(function(a) {
                return a === b;
            }, g, !0), j = n(function(a) {
                return aa(b, a) > -1;
            }, g, !0), k = [ function(a, c, d) {
                var e = !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
                return b = null, e;
            } ]; e > h; h++) if (c = w.relative[a[h].type]) k = [ n(o(k), c) ]; else {
                if (c = w.filter[a[h].type].apply(null, a[h].matches), c[N]) {
                    for (d = ++h; e > d && !w.relative[a[d].type]; d++) ;
                    return r(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1).concat({
                        value: " " === a[h - 2].type ? "*" : ""
                    })).replace(ia, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && m(a));
                }
                k.push(c);
            }
            return o(k);
        }
        function t(a, c) {
            var e = c.length > 0, f = a.length > 0, g = function(d, g, h, i, j) {
                var k, l, m, n = 0, o = "0", p = d && [], r = [], s = C, t = d || f && w.find.TAG("*", j), u = P += null == s ? 1 : Math.random() || .1, v = t.length;
                for (j && (C = g !== G && g); o !== v && null != (k = t[o]); o++) {
                    if (f && k) {
                        for (l = 0; m = a[l++]; ) if (m(k, g, h)) {
                            i.push(k);
                            break;
                        }
                        j && (P = u);
                    }
                    e && ((k = !m && k) && n--, d && p.push(k));
                }
                if (n += o, e && o !== n) {
                    for (l = 0; m = c[l++]; ) m(p, r, g, h);
                    if (d) {
                        if (n > 0) for (;o--; ) p[o] || r[o] || (r[o] = Y.call(i));
                        r = q(r);
                    }
                    $.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i);
                }
                return j && (P = u, C = s), p;
            };
            return e ? d(g) : g;
        }
        var u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + 1 * new Date(), O = a.document, P = 0, Q = 0, R = c(), S = c(), T = c(), U = function(a, b) {
            return a === b && (E = !0), 0;
        }, V = 1 << 31, W = {}.hasOwnProperty, X = [], Y = X.pop, Z = X.push, $ = X.push, _ = X.slice, aa = function(a, b) {
            for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
            return -1;
        }, ba = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ca = "[\\x20\\t\\r\\n\\f]", da = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ea = da.replace("w", "w#"), fa = "\\[" + ca + "*(" + da + ")(?:" + ca + "*([*^$|!~]?=)" + ca + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ea + "))|)" + ca + "*\\]", ga = ":(" + da + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + fa + ")*)|.*)\\)|)", ha = new RegExp(ca + "+", "g"), ia = new RegExp("^" + ca + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ca + "+$", "g"), ja = new RegExp("^" + ca + "*," + ca + "*"), ka = new RegExp("^" + ca + "*([>+~]|" + ca + ")" + ca + "*"), la = new RegExp("=" + ca + "*([^\\]'\"]*?)" + ca + "*\\]", "g"), ma = new RegExp(ga), na = new RegExp("^" + ea + "$"), oa = {
            ID: new RegExp("^#(" + da + ")"),
            CLASS: new RegExp("^\\.(" + da + ")"),
            TAG: new RegExp("^(" + da.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + fa),
            PSEUDO: new RegExp("^" + ga),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ca + "*(even|odd|(([+-]|)(\\d*)n|)" + ca + "*(?:([+-]|)" + ca + "*(\\d+)|))" + ca + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + ba + ")$", "i"),
            needsContext: new RegExp("^" + ca + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ca + "*((?:-\\d)?\\d*)" + ca + "*\\)|)(?=[^-]|$)", "i")
        }, pa = /^(?:input|select|textarea|button)$/i, qa = /^h\d$/i, ra = /^[^{]+\{\s*\[native \w/, sa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ta = /[+~]/, ua = /'|\\/g, va = new RegExp("\\\\([\\da-f]{1,6}" + ca + "?|(" + ca + ")|.)", "ig"), wa = function(a, b, c) {
            var d = "0x" + b - 65536;
            return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320);
        }, xa = function() {
            F();
        };
        try {
            $.apply(X = _.call(O.childNodes), O.childNodes), X[O.childNodes.length].nodeType;
        } catch (ya) {
            $ = {
                apply: X.length ? function(a, b) {
                    Z.apply(a, _.call(b));
                } : function(a, b) {
                    for (var c = a.length, d = 0; a[c++] = b[d++]; ) ;
                    a.length = c - 1;
                }
            };
        }
        v = b.support = {}, y = b.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1;
        }, F = b.setDocument = function(a) {
            var b, c, d = a ? a.ownerDocument || a : O;
            return d !== G && 9 === d.nodeType && d.documentElement ? (G = d, H = d.documentElement, 
            c = d.defaultView, c && c !== c.top && (c.addEventListener ? c.addEventListener("unload", xa, !1) : c.attachEvent && c.attachEvent("onunload", xa)), 
            I = !y(d), v.attributes = e(function(a) {
                return a.className = "i", !a.getAttribute("className");
            }), v.getElementsByTagName = e(function(a) {
                return a.appendChild(d.createComment("")), !a.getElementsByTagName("*").length;
            }), v.getElementsByClassName = ra.test(d.getElementsByClassName), v.getById = e(function(a) {
                return H.appendChild(a).id = N, !d.getElementsByName || !d.getElementsByName(N).length;
            }), v.getById ? (w.find.ID = function(a, b) {
                if ("undefined" != typeof b.getElementById && I) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [ c ] : [];
                }
            }, w.filter.ID = function(a) {
                var b = a.replace(va, wa);
                return function(a) {
                    return a.getAttribute("id") === b;
                };
            }) : (delete w.find.ID, w.filter.ID = function(a) {
                var b = a.replace(va, wa);
                return function(a) {
                    var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                    return c && c.value === b;
                };
            }), w.find.TAG = v.getElementsByTagName ? function(a, b) {
                return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : v.qsa ? b.querySelectorAll(a) : void 0;
            } : function(a, b) {
                var c, d = [], e = 0, f = b.getElementsByTagName(a);
                if ("*" === a) {
                    for (;c = f[e++]; ) 1 === c.nodeType && d.push(c);
                    return d;
                }
                return f;
            }, w.find.CLASS = v.getElementsByClassName && function(a, b) {
                return I ? b.getElementsByClassName(a) : void 0;
            }, K = [], J = [], (v.qsa = ra.test(d.querySelectorAll)) && (e(function(a) {
                H.appendChild(a).innerHTML = "<a id='" + N + "'></a><select id='" + N + "-\f]' msallowcapture=''><option selected=''></option></select>", 
                a.querySelectorAll("[msallowcapture^='']").length && J.push("[*^$]=" + ca + "*(?:''|\"\")"), 
                a.querySelectorAll("[selected]").length || J.push("\\[" + ca + "*(?:value|" + ba + ")"), 
                a.querySelectorAll("[id~=" + N + "-]").length || J.push("~="), a.querySelectorAll(":checked").length || J.push(":checked"), 
                a.querySelectorAll("a#" + N + "+*").length || J.push(".#.+[+~]");
            }), e(function(a) {
                var b = d.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && J.push("name" + ca + "*[*^$|!~]?="), 
                a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), 
                J.push(",.*:");
            })), (v.matchesSelector = ra.test(L = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function(a) {
                v.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", ga);
            }), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), 
            b = ra.test(H.compareDocumentPosition), M = b || ra.test(H.contains) ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
            } : function(a, b) {
                if (b) for (;b = b.parentNode; ) if (b === a) return !0;
                return !1;
            }, U = b ? function(a, b) {
                if (a === b) return E = !0, 0;
                var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return c ? c : (c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 
                1 & c || !v.sortDetached && b.compareDocumentPosition(a) === c ? a === d || a.ownerDocument === O && M(O, a) ? -1 : b === d || b.ownerDocument === O && M(O, b) ? 1 : D ? aa(D, a) - aa(D, b) : 0 : 4 & c ? -1 : 1);
            } : function(a, b) {
                if (a === b) return E = !0, 0;
                var c, e = 0, f = a.parentNode, h = b.parentNode, i = [ a ], j = [ b ];
                if (!f || !h) return a === d ? -1 : b === d ? 1 : f ? -1 : h ? 1 : D ? aa(D, a) - aa(D, b) : 0;
                if (f === h) return g(a, b);
                for (c = a; c = c.parentNode; ) i.unshift(c);
                for (c = b; c = c.parentNode; ) j.unshift(c);
                for (;i[e] === j[e]; ) e++;
                return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0;
            }, d) : G;
        }, b.matches = function(a, c) {
            return b(a, null, null, c);
        }, b.matchesSelector = function(a, c) {
            if ((a.ownerDocument || a) !== G && F(a), c = c.replace(la, "='$1']"), !(!v.matchesSelector || !I || K && K.test(c) || J && J.test(c))) try {
                var d = L.call(a, c);
                if (d || v.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d;
            } catch (e) {}
            return b(c, G, null, [ a ]).length > 0;
        }, b.contains = function(a, b) {
            return (a.ownerDocument || a) !== G && F(a), M(a, b);
        }, b.attr = function(a, b) {
            (a.ownerDocument || a) !== G && F(a);
            var c = w.attrHandle[b.toLowerCase()], d = c && W.call(w.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
            return void 0 !== d ? d : v.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
        }, b.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a);
        }, b.uniqueSort = function(a) {
            var b, c = [], d = 0, e = 0;
            if (E = !v.detectDuplicates, D = !v.sortStable && a.slice(0), a.sort(U), E) {
                for (;b = a[e++]; ) b === a[e] && (d = c.push(e));
                for (;d--; ) a.splice(c[d], 1);
            }
            return D = null, a;
        }, x = b.getText = function(a) {
            var b, c = "", d = 0, e = a.nodeType;
            if (e) {
                if (1 === e || 9 === e || 11 === e) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += x(a);
                } else if (3 === e || 4 === e) return a.nodeValue;
            } else for (;b = a[d++]; ) c += x(b);
            return c;
        }, w = b.selectors = {
            cacheLength: 50,
            createPseudo: d,
            match: oa,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(va, wa), a[3] = (a[3] || a[4] || a[5] || "").replace(va, wa), 
                    "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4);
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), 
                    a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), 
                    a;
                },
                PSEUDO: function(a) {
                    var b, c = !a[6] && a[2];
                    return oa.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && ma.test(c) && (b = z(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), 
                    a[2] = c.slice(0, b)), a.slice(0, 3));
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(va, wa).toLowerCase();
                    return "*" === a ? function() {
                        return !0;
                    } : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b;
                    };
                },
                CLASS: function(a) {
                    var b = R[a + " "];
                    return b || (b = new RegExp("(^|" + ca + ")" + a + "(" + ca + "|$)")) && R(a, function(a) {
                        return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "");
                    });
                },
                ATTR: function(a, c, d) {
                    return function(e) {
                        var f = b.attr(e, a);
                        return null == f ? "!=" === c : c ? (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f.replace(ha, " ") + " ").indexOf(d) > -1 : "|=" === c ? f === d || f.slice(0, d.length + 1) === d + "-" : !1) : !0;
                    };
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4), h = "of-type" === b;
                    return 1 === d && 0 === e ? function(a) {
                        return !!a.parentNode;
                    } : function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode, r = h && b.nodeName.toLowerCase(), s = !i && !h;
                        if (q) {
                            if (f) {
                                for (;p; ) {
                                    for (l = b; l = l[p]; ) if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling";
                                }
                                return !0;
                            }
                            if (o = [ g ? q.firstChild : q.lastChild ], g && s) {
                                for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === P && j[1], m = j[0] === P && j[2], 
                                l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop(); ) if (1 === l.nodeType && ++m && l === b) {
                                    k[a] = [ P, n, m ];
                                    break;
                                }
                            } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P) m = j[1]; else for (;(l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [ P, m ]), 
                            l !== b)); ) ;
                            return m -= e, m === d || m % d === 0 && m / d >= 0;
                        }
                    };
                },
                PSEUDO: function(a, c) {
                    var e, f = w.pseudos[a] || w.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                    return f[N] ? f(c) : f.length > 1 ? (e = [ a, a, "", c ], w.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) {
                        for (var d, e = f(a, c), g = e.length; g--; ) d = aa(a, e[g]), a[d] = !(b[d] = e[g]);
                    }) : function(a) {
                        return f(a, 0, e);
                    }) : f;
                }
            },
            pseudos: {
                not: d(function(a) {
                    var b = [], c = [], e = A(a.replace(ia, "$1"));
                    return e[N] ? d(function(a, b, c, d) {
                        for (var f, g = e(a, null, d, []), h = a.length; h--; ) (f = g[h]) && (a[h] = !(b[h] = f));
                    }) : function(a, d, f) {
                        return b[0] = a, e(b, null, f, c), b[0] = null, !c.pop();
                    };
                }),
                has: d(function(a) {
                    return function(c) {
                        return b(a, c).length > 0;
                    };
                }),
                contains: d(function(a) {
                    return a = a.replace(va, wa), function(b) {
                        return (b.textContent || b.innerText || x(b)).indexOf(a) > -1;
                    };
                }),
                lang: d(function(a) {
                    return na.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(va, wa).toLowerCase(), 
                    function(b) {
                        var c;
                        do if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), 
                        c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                        return !1;
                    };
                }),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id;
                },
                root: function(a) {
                    return a === H;
                },
                focus: function(a) {
                    return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
                },
                enabled: function(a) {
                    return a.disabled === !1;
                },
                disabled: function(a) {
                    return a.disabled === !0;
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected;
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) return !1;
                    return !0;
                },
                parent: function(a) {
                    return !w.pseudos.empty(a);
                },
                header: function(a) {
                    return qa.test(a.nodeName);
                },
                input: function(a) {
                    return pa.test(a.nodeName);
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b;
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase());
                },
                first: j(function() {
                    return [ 0 ];
                }),
                last: j(function(a, b) {
                    return [ b - 1 ];
                }),
                eq: j(function(a, b, c) {
                    return [ 0 > c ? c + b : c ];
                }),
                even: j(function(a, b) {
                    for (var c = 0; b > c; c += 2) a.push(c);
                    return a;
                }),
                odd: j(function(a, b) {
                    for (var c = 1; b > c; c += 2) a.push(c);
                    return a;
                }),
                lt: j(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0; ) a.push(d);
                    return a;
                }),
                gt: j(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b; ) a.push(d);
                    return a;
                })
            }
        }, w.pseudos.nth = w.pseudos.eq;
        for (u in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) w.pseudos[u] = h(u);
        for (u in {
            submit: !0,
            reset: !0
        }) w.pseudos[u] = i(u);
        return l.prototype = w.filters = w.pseudos, w.setFilters = new l(), z = b.tokenize = function(a, c) {
            var d, e, f, g, h, i, j, k = S[a + " "];
            if (k) return c ? 0 : k.slice(0);
            for (h = a, i = [], j = w.preFilter; h; ) {
                (!d || (e = ja.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), 
                d = !1, (e = ka.exec(h)) && (d = e.shift(), f.push({
                    value: d,
                    type: e[0].replace(ia, " ")
                }), h = h.slice(d.length));
                for (g in w.filter) !(e = oa[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), 
                f.push({
                    value: d,
                    type: g,
                    matches: e
                }), h = h.slice(d.length));
                if (!d) break;
            }
            return c ? h.length : h ? b.error(a) : S(a, i).slice(0);
        }, A = b.compile = function(a, b) {
            var c, d = [], e = [], f = T[a + " "];
            if (!f) {
                for (b || (b = z(a)), c = b.length; c--; ) f = s(b[c]), f[N] ? d.push(f) : e.push(f);
                f = T(a, t(e, d)), f.selector = a;
            }
            return f;
        }, B = b.select = function(a, b, c, d) {
            var e, f, g, h, i, j = "function" == typeof a && a, l = !d && z(a = j.selector || a);
            if (c = c || [], 1 === l.length) {
                if (f = l[0] = l[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && v.getById && 9 === b.nodeType && I && w.relative[f[1].type]) {
                    if (b = (w.find.ID(g.matches[0].replace(va, wa), b) || [])[0], !b) return c;
                    j && (b = b.parentNode), a = a.slice(f.shift().value.length);
                }
                for (e = oa.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !w.relative[h = g.type]); ) if ((i = w.find[h]) && (d = i(g.matches[0].replace(va, wa), ta.test(f[0].type) && k(b.parentNode) || b))) {
                    if (f.splice(e, 1), a = d.length && m(f), !a) return $.apply(c, d), c;
                    break;
                }
            }
            return (j || A(a, l))(d, b, !I, c, ta.test(a) && k(b.parentNode) || b), c;
        }, v.sortStable = N.split("").sort(U).join("") === N, v.detectDuplicates = !!E, 
        F(), v.sortDetached = e(function(a) {
            return 1 & a.compareDocumentPosition(G.createElement("div"));
        }), e(function(a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href");
        }) || f("type|href|height|width", function(a, b, c) {
            return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
        }), v.attributes && e(function(a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value");
        }) || f("value", function(a, b, c) {
            return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue;
        }), e(function(a) {
            return null == a.getAttribute("disabled");
        }) || f(ba, function(a, b, c) {
            var d;
            return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
        }), b;
    }(a);
    ea.find = ja, ea.expr = ja.selectors, ea.expr[":"] = ea.expr.pseudos, ea.unique = ja.uniqueSort, 
    ea.text = ja.getText, ea.isXMLDoc = ja.isXML, ea.contains = ja.contains;
    var ka = ea.expr.match.needsContext, la = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, ma = /^.[^:#\[\.,]*$/;
    ea.filter = function(a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? ea.find.matchesSelector(d, a) ? [ d ] : [] : ea.find.matches(a, ea.grep(b, function(a) {
            return 1 === a.nodeType;
        }));
    }, ea.fn.extend({
        find: function(a) {
            var b, c = [], d = this, e = d.length;
            if ("string" != typeof a) return this.pushStack(ea(a).filter(function() {
                for (b = 0; e > b; b++) if (ea.contains(d[b], this)) return !0;
            }));
            for (b = 0; e > b; b++) ea.find(a, d[b], c);
            return c = this.pushStack(e > 1 ? ea.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, 
            c;
        },
        filter: function(a) {
            return this.pushStack(d(this, a || [], !1));
        },
        not: function(a) {
            return this.pushStack(d(this, a || [], !0));
        },
        is: function(a) {
            return !!d(this, "string" == typeof a && ka.test(a) ? ea(a) : a || [], !1).length;
        }
    });
    var na, oa = a.document, pa = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, qa = ea.fn.init = function(a, b) {
        var c, d;
        if (!a) return this;
        if ("string" == typeof a) {
            if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [ null, a, null ] : pa.exec(a), 
            !c || !c[1] && b) return !b || b.jquery ? (b || na).find(a) : this.constructor(b).find(a);
            if (c[1]) {
                if (b = b instanceof ea ? b[0] : b, ea.merge(this, ea.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : oa, !0)), 
                la.test(c[1]) && ea.isPlainObject(b)) for (c in b) ea.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                return this;
            }
            if (d = oa.getElementById(c[2]), d && d.parentNode) {
                if (d.id !== c[2]) return na.find(a);
                this.length = 1, this[0] = d;
            }
            return this.context = oa, this.selector = a, this;
        }
        return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : ea.isFunction(a) ? "undefined" != typeof na.ready ? na.ready(a) : a(ea) : (void 0 !== a.selector && (this.selector = a.selector, 
        this.context = a.context), ea.makeArray(a, this));
    };
    qa.prototype = ea.fn, na = ea(oa);
    var ra = /^(?:parents|prev(?:Until|All))/, sa = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    ea.extend({
        dir: function(a, b, c) {
            for (var d = [], e = a[b]; e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !ea(e).is(c)); ) 1 === e.nodeType && d.push(e), 
            e = e[b];
            return d;
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c;
        }
    }), ea.fn.extend({
        has: function(a) {
            var b, c = ea(a, this), d = c.length;
            return this.filter(function() {
                for (b = 0; d > b; b++) if (ea.contains(this, c[b])) return !0;
            });
        },
        closest: function(a, b) {
            for (var c, d = 0, e = this.length, f = [], g = ka.test(a) || "string" != typeof a ? ea(a, b || this.context) : 0; e > d; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && ea.find.matchesSelector(c, a))) {
                f.push(c);
                break;
            }
            return this.pushStack(f.length > 1 ? ea.unique(f) : f);
        },
        index: function(a) {
            return a ? "string" == typeof a ? ea.inArray(this[0], ea(a)) : ea.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(a, b) {
            return this.pushStack(ea.unique(ea.merge(this.get(), ea(a, b))));
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
        }
    }), ea.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null;
        },
        parents: function(a) {
            return ea.dir(a, "parentNode");
        },
        parentsUntil: function(a, b, c) {
            return ea.dir(a, "parentNode", c);
        },
        next: function(a) {
            return e(a, "nextSibling");
        },
        prev: function(a) {
            return e(a, "previousSibling");
        },
        nextAll: function(a) {
            return ea.dir(a, "nextSibling");
        },
        prevAll: function(a) {
            return ea.dir(a, "previousSibling");
        },
        nextUntil: function(a, b, c) {
            return ea.dir(a, "nextSibling", c);
        },
        prevUntil: function(a, b, c) {
            return ea.dir(a, "previousSibling", c);
        },
        siblings: function(a) {
            return ea.sibling((a.parentNode || {}).firstChild, a);
        },
        children: function(a) {
            return ea.sibling(a.firstChild);
        },
        contents: function(a) {
            return ea.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : ea.merge([], a.childNodes);
        }
    }, function(a, b) {
        ea.fn[a] = function(c, d) {
            var e = ea.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = ea.filter(d, e)), 
            this.length > 1 && (sa[a] || (e = ea.unique(e)), ra.test(a) && (e = e.reverse())), 
            this.pushStack(e);
        };
    });
    var ta = /\S+/g, ua = {};
    ea.Callbacks = function(a) {
        a = "string" == typeof a ? ua[a] || f(a) : ea.extend({}, a);
        var b, c, d, e, g, h, i = [], j = !a.once && [], k = function(f) {
            for (c = a.memory && f, d = !0, g = h || 0, h = 0, e = i.length, b = !0; i && e > g; g++) if (i[g].apply(f[0], f[1]) === !1 && a.stopOnFalse) {
                c = !1;
                break;
            }
            b = !1, i && (j ? j.length && k(j.shift()) : c ? i = [] : l.disable());
        }, l = {
            add: function() {
                if (i) {
                    var d = i.length;
                    !function f(b) {
                        ea.each(b, function(b, c) {
                            var d = ea.type(c);
                            "function" === d ? a.unique && l.has(c) || i.push(c) : c && c.length && "string" !== d && f(c);
                        });
                    }(arguments), b ? e = i.length : c && (h = d, k(c));
                }
                return this;
            },
            remove: function() {
                return i && ea.each(arguments, function(a, c) {
                    for (var d; (d = ea.inArray(c, i, d)) > -1; ) i.splice(d, 1), b && (e >= d && e--, 
                    g >= d && g--);
                }), this;
            },
            has: function(a) {
                return a ? ea.inArray(a, i) > -1 : !(!i || !i.length);
            },
            empty: function() {
                return i = [], e = 0, this;
            },
            disable: function() {
                return i = j = c = void 0, this;
            },
            disabled: function() {
                return !i;
            },
            lock: function() {
                return j = void 0, c || l.disable(), this;
            },
            locked: function() {
                return !j;
            },
            fireWith: function(a, c) {
                return !i || d && !j || (c = c || [], c = [ a, c.slice ? c.slice() : c ], b ? j.push(c) : k(c)), 
                this;
            },
            fire: function() {
                return l.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!d;
            }
        };
        return l;
    }, ea.extend({
        Deferred: function(a) {
            var b = [ [ "resolve", "done", ea.Callbacks("once memory"), "resolved" ], [ "reject", "fail", ea.Callbacks("once memory"), "rejected" ], [ "notify", "progress", ea.Callbacks("memory") ] ], c = "pending", d = {
                state: function() {
                    return c;
                },
                always: function() {
                    return e.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var a = arguments;
                    return ea.Deferred(function(c) {
                        ea.each(b, function(b, f) {
                            var g = ea.isFunction(a[b]) && a[b];
                            e[f[1]](function() {
                                var a = g && g.apply(this, arguments);
                                a && ea.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [ a ] : arguments);
                            });
                        }), a = null;
                    }).promise();
                },
                promise: function(a) {
                    return null != a ? ea.extend(a, d) : d;
                }
            }, e = {};
            return d.pipe = d.then, ea.each(b, function(a, f) {
                var g = f[2], h = f[3];
                d[f[1]] = g.add, h && g.add(function() {
                    c = h;
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this;
                }, e[f[0] + "With"] = g.fireWith;
            }), d.promise(e), a && a.call(e, e), e;
        },
        when: function(a) {
            var b, c, d, e = 0, f = X.call(arguments), g = f.length, h = 1 !== g || a && ea.isFunction(a.promise) ? g : 0, i = 1 === h ? a : ea.Deferred(), j = function(a, c, d) {
                return function(e) {
                    c[a] = this, d[a] = arguments.length > 1 ? X.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d);
                };
            };
            if (g > 1) for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++) f[e] && ea.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
            return h || i.resolveWith(d, f), i.promise();
        }
    });
    var va;
    ea.fn.ready = function(a) {
        return ea.ready.promise().done(a), this;
    }, ea.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? ea.readyWait++ : ea.ready(!0);
        },
        ready: function(a) {
            if (a === !0 ? !--ea.readyWait : !ea.isReady) {
                if (!oa.body) return setTimeout(ea.ready);
                ea.isReady = !0, a !== !0 && --ea.readyWait > 0 || (va.resolveWith(oa, [ ea ]), 
                ea.fn.triggerHandler && (ea(oa).triggerHandler("ready"), ea(oa).off("ready")));
            }
        }
    }), ea.ready.promise = function(b) {
        if (!va) if (va = ea.Deferred(), "complete" === oa.readyState) setTimeout(ea.ready); else if (oa.addEventListener) oa.addEventListener("DOMContentLoaded", h, !1), 
        a.addEventListener("load", h, !1); else {
            oa.attachEvent("onreadystatechange", h), a.attachEvent("onload", h);
            var c = !1;
            try {
                c = null == a.frameElement && oa.documentElement;
            } catch (d) {}
            c && c.doScroll && !function e() {
                if (!ea.isReady) {
                    try {
                        c.doScroll("left");
                    } catch (a) {
                        return setTimeout(e, 50);
                    }
                    g(), ea.ready();
                }
            }();
        }
        return va.promise(b);
    };
    var wa, xa = "undefined";
    for (wa in ea(ca)) break;
    ca.ownLast = "0" !== wa, ca.inlineBlockNeedsLayout = !1, ea(function() {
        var a, b, c, d;
        c = oa.getElementsByTagName("body")[0], c && c.style && (b = oa.createElement("div"), 
        d = oa.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", 
        c.appendChild(d).appendChild(b), typeof b.style.zoom !== xa && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", 
        ca.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(d));
    }), function() {
        var a = oa.createElement("div");
        if (null == ca.deleteExpando) {
            ca.deleteExpando = !0;
            try {
                delete a.test;
            } catch (b) {
                ca.deleteExpando = !1;
            }
        }
        a = null;
    }(), ea.acceptData = function(a) {
        var b = ea.noData[(a.nodeName + " ").toLowerCase()], c = +a.nodeType || 1;
        return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b;
    };
    var ya = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, za = /([A-Z])/g;
    ea.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(a) {
            return a = a.nodeType ? ea.cache[a[ea.expando]] : a[ea.expando], !!a && !j(a);
        },
        data: function(a, b, c) {
            return k(a, b, c);
        },
        removeData: function(a, b) {
            return l(a, b);
        },
        _data: function(a, b, c) {
            return k(a, b, c, !0);
        },
        _removeData: function(a, b) {
            return l(a, b, !0);
        }
    }), ea.fn.extend({
        data: function(a, b) {
            var c, d, e, f = this[0], g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = ea.data(f), 1 === f.nodeType && !ea._data(f, "parsedAttrs"))) {
                    for (c = g.length; c--; ) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = ea.camelCase(d.slice(5)), 
                    i(f, d, e[d])));
                    ea._data(f, "parsedAttrs", !0);
                }
                return e;
            }
            return "object" == typeof a ? this.each(function() {
                ea.data(this, a);
            }) : arguments.length > 1 ? this.each(function() {
                ea.data(this, a, b);
            }) : f ? i(f, a, ea.data(f, a)) : void 0;
        },
        removeData: function(a) {
            return this.each(function() {
                ea.removeData(this, a);
            });
        }
    }), ea.extend({
        queue: function(a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue", d = ea._data(a, b), c && (!d || ea.isArray(c) ? d = ea._data(a, b, ea.makeArray(c)) : d.push(c)), 
            d || []) : void 0;
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = ea.queue(a, b), d = c.length, e = c.shift(), f = ea._queueHooks(a, b), g = function() {
                ea.dequeue(a, b);
            };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), 
            delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return ea._data(a, c) || ea._data(a, c, {
                empty: ea.Callbacks("once memory").add(function() {
                    ea._removeData(a, b + "queue"), ea._removeData(a, c);
                })
            });
        }
    }), ea.fn.extend({
        queue: function(a, b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? ea.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                var c = ea.queue(this, a, b);
                ea._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && ea.dequeue(this, a);
            });
        },
        dequeue: function(a) {
            return this.each(function() {
                ea.dequeue(this, a);
            });
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", []);
        },
        promise: function(a, b) {
            var c, d = 1, e = ea.Deferred(), f = this, g = this.length, h = function() {
                --d || e.resolveWith(f, [ f ]);
            };
            for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--; ) c = ea._data(f[g], a + "queueHooks"), 
            c && c.empty && (d++, c.empty.add(h));
            return h(), e.promise(b);
        }
    });
    var Aa = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Ba = [ "Top", "Right", "Bottom", "Left" ], Ca = function(a, b) {
        return a = b || a, "none" === ea.css(a, "display") || !ea.contains(a.ownerDocument, a);
    }, Da = ea.access = function(a, b, c, d, e, f, g) {
        var h = 0, i = a.length, j = null == c;
        if ("object" === ea.type(c)) {
            e = !0;
            for (h in c) ea.access(a, b, h, c[h], !0, f, g);
        } else if (void 0 !== d && (e = !0, ea.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), 
        b = null) : (j = b, b = function(a, b, c) {
            return j.call(ea(a), c);
        })), b)) for (;i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
    }, Ea = /^(?:checkbox|radio)$/i;
    !function() {
        var a = oa.createElement("input"), b = oa.createElement("div"), c = oa.createDocumentFragment();
        if (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        ca.leadingWhitespace = 3 === b.firstChild.nodeType, ca.tbody = !b.getElementsByTagName("tbody").length, 
        ca.htmlSerialize = !!b.getElementsByTagName("link").length, ca.html5Clone = "<:nav></:nav>" !== oa.createElement("nav").cloneNode(!0).outerHTML, 
        a.type = "checkbox", a.checked = !0, c.appendChild(a), ca.appendChecked = a.checked, 
        b.innerHTML = "<textarea>x</textarea>", ca.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue, 
        c.appendChild(b), b.innerHTML = "<input type='radio' checked='checked' name='t'/>", 
        ca.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, ca.noCloneEvent = !0, 
        b.attachEvent && (b.attachEvent("onclick", function() {
            ca.noCloneEvent = !1;
        }), b.cloneNode(!0).click()), null == ca.deleteExpando) {
            ca.deleteExpando = !0;
            try {
                delete b.test;
            } catch (d) {
                ca.deleteExpando = !1;
            }
        }
    }(), function() {
        var b, c, d = oa.createElement("div");
        for (b in {
            submit: !0,
            change: !0,
            focusin: !0
        }) c = "on" + b, (ca[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), ca[b + "Bubbles"] = d.attributes[c].expando === !1);
        d = null;
    }();
    var Fa = /^(?:input|select|textarea)$/i, Ga = /^key/, Ha = /^(?:mouse|pointer|contextmenu)|click/, Ia = /^(?:focusinfocus|focusoutblur)$/, Ja = /^([^.]*)(?:\.(.+)|)$/;
    ea.event = {
        global: {},
        add: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = ea._data(a);
            if (q) {
                for (c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = ea.guid++), 
                (g = q.events) || (g = q.events = {}), (k = q.handle) || (k = q.handle = function(a) {
                    return typeof ea === xa || a && ea.event.triggered === a.type ? void 0 : ea.event.dispatch.apply(k.elem, arguments);
                }, k.elem = a), b = (b || "").match(ta) || [ "" ], h = b.length; h--; ) f = Ja.exec(b[h]) || [], 
                n = p = f[1], o = (f[2] || "").split(".").sort(), n && (j = ea.event.special[n] || {}, 
                n = (e ? j.delegateType : j.bindType) || n, j = ea.event.special[n] || {}, l = ea.extend({
                    type: n,
                    origType: p,
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    needsContext: e && ea.expr.match.needsContext.test(e),
                    namespace: o.join(".")
                }, i), (m = g[n]) || (m = g[n] = [], m.delegateCount = 0, j.setup && j.setup.call(a, d, o, k) !== !1 || (a.addEventListener ? a.addEventListener(n, k, !1) : a.attachEvent && a.attachEvent("on" + n, k))), 
                j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, l) : m.push(l), 
                ea.event.global[n] = !0);
                a = null;
            }
        },
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = ea.hasData(a) && ea._data(a);
            if (q && (k = q.events)) {
                for (b = (b || "").match(ta) || [ "" ], j = b.length; j--; ) if (h = Ja.exec(b[j]) || [], 
                n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                    for (l = ea.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, 
                    m = k[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), 
                    i = f = m.length; f--; ) g = m[f], !e && p !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1), 
                    g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
                    i && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || ea.removeEvent(a, n, q.handle), 
                    delete k[n]);
                } else for (n in k) ea.event.remove(a, n + b[j], c, d, !0);
                ea.isEmptyObject(k) && (delete q.handle, ea._removeData(a, "events"));
            }
        },
        trigger: function(b, c, d, e) {
            var f, g, h, i, j, k, l, m = [ d || oa ], n = ba.call(b, "type") ? b.type : b, o = ba.call(b, "namespace") ? b.namespace.split(".") : [];
            if (h = k = d = d || oa, 3 !== d.nodeType && 8 !== d.nodeType && !Ia.test(n + ea.event.triggered) && (n.indexOf(".") >= 0 && (o = n.split("."), 
            n = o.shift(), o.sort()), g = n.indexOf(":") < 0 && "on" + n, b = b[ea.expando] ? b : new ea.Event(n, "object" == typeof b && b), 
            b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            b.result = void 0, b.target || (b.target = d), c = null == c ? [ b ] : ea.makeArray(c, [ b ]), 
            j = ea.event.special[n] || {}, e || !j.trigger || j.trigger.apply(d, c) !== !1)) {
                if (!e && !j.noBubble && !ea.isWindow(d)) {
                    for (i = j.delegateType || n, Ia.test(i + n) || (h = h.parentNode); h; h = h.parentNode) m.push(h), 
                    k = h;
                    k === (d.ownerDocument || oa) && m.push(k.defaultView || k.parentWindow || a);
                }
                for (l = 0; (h = m[l++]) && !b.isPropagationStopped(); ) b.type = l > 1 ? i : j.bindType || n, 
                f = (ea._data(h, "events") || {})[b.type] && ea._data(h, "handle"), f && f.apply(h, c), 
                f = g && h[g], f && f.apply && ea.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
                if (b.type = n, !e && !b.isDefaultPrevented() && (!j._default || j._default.apply(m.pop(), c) === !1) && ea.acceptData(d) && g && d[n] && !ea.isWindow(d)) {
                    k = d[g], k && (d[g] = null), ea.event.triggered = n;
                    try {
                        d[n]();
                    } catch (p) {}
                    ea.event.triggered = void 0, k && (d[g] = k);
                }
                return b.result;
            }
        },
        dispatch: function(a) {
            a = ea.event.fix(a);
            var b, c, d, e, f, g = [], h = X.call(arguments), i = (ea._data(this, "events") || {})[a.type] || [], j = ea.event.special[a.type] || {};
            if (h[0] = a, a.delegateTarget = this, !j.preDispatch || j.preDispatch.call(this, a) !== !1) {
                for (g = ea.event.handlers.call(this, a, i), b = 0; (e = g[b++]) && !a.isPropagationStopped(); ) for (a.currentTarget = e.elem, 
                f = 0; (d = e.handlers[f++]) && !a.isImmediatePropagationStopped(); ) (!a.namespace_re || a.namespace_re.test(d.namespace)) && (a.handleObj = d, 
                a.data = d.data, c = ((ea.event.special[d.origType] || {}).handle || d.handler).apply(e.elem, h), 
                void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation()));
                return j.postDispatch && j.postDispatch.call(this, a), a.result;
            }
        },
        handlers: function(a, b) {
            var c, d, e, f, g = [], h = b.delegateCount, i = a.target;
            if (h && i.nodeType && (!a.button || "click" !== a.type)) for (;i != this; i = i.parentNode || this) if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                for (e = [], f = 0; h > f; f++) d = b[f], c = d.selector + " ", void 0 === e[c] && (e[c] = d.needsContext ? ea(c, this).index(i) >= 0 : ea.find(c, this, null, [ i ]).length), 
                e[c] && e.push(d);
                e.length && g.push({
                    elem: i,
                    handlers: e
                });
            }
            return h < b.length && g.push({
                elem: this,
                handlers: b.slice(h)
            }), g;
        },
        fix: function(a) {
            if (a[ea.expando]) return a;
            var b, c, d, e = a.type, f = a, g = this.fixHooks[e];
            for (g || (this.fixHooks[e] = g = Ha.test(e) ? this.mouseHooks : Ga.test(e) ? this.keyHooks : {}), 
            d = g.props ? this.props.concat(g.props) : this.props, a = new ea.Event(f), b = d.length; b--; ) c = d[b], 
            a[c] = f[c];
            return a.target || (a.target = f.srcElement || oa), 3 === a.target.nodeType && (a.target = a.target.parentNode), 
            a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), 
                a;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var c, d, e, f = b.button, g = b.fromElement;
                return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || oa, 
                e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), 
                a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), 
                !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), 
                a;
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== o() && this.focus) try {
                        return this.focus(), !1;
                    } catch (a) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === o() && this.blur ? (this.blur(), !1) : void 0;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return ea.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), 
                    !1) : void 0;
                },
                _default: function(a) {
                    return ea.nodeName(a.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result);
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = ea.extend(new ea.Event(), c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? ea.event.trigger(e, null, b) : ea.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault();
        }
    }, ea.removeEvent = oa.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1);
    } : function(a, b, c) {
        var d = "on" + b;
        a.detachEvent && (typeof a[d] === xa && (a[d] = null), a.detachEvent(d, c));
    }, ea.Event = function(a, b) {
        return this instanceof ea.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, 
        this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? m : n) : this.type = a, 
        b && ea.extend(this, b), this.timeStamp = a && a.timeStamp || ea.now(), void (this[ea.expando] = !0)) : new ea.Event(a, b);
    }, ea.Event.prototype = {
        isDefaultPrevented: n,
        isPropagationStopped: n,
        isImmediatePropagationStopped: n,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = m, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1);
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = m, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0);
        },
        stopImmediatePropagation: function() {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = m, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), 
            this.stopPropagation();
        }
    }, ea.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(a, b) {
        ea.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this, e = a.relatedTarget, f = a.handleObj;
                return (!e || e !== d && !ea.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), 
                a.type = b), c;
            }
        };
    }), ca.submitBubbles || (ea.event.special.submit = {
        setup: function() {
            return ea.nodeName(this, "form") ? !1 : void ea.event.add(this, "click._submit keypress._submit", function(a) {
                var b = a.target, c = ea.nodeName(b, "input") || ea.nodeName(b, "button") ? b.form : void 0;
                c && !ea._data(c, "submitBubbles") && (ea.event.add(c, "submit._submit", function(a) {
                    a._submit_bubble = !0;
                }), ea._data(c, "submitBubbles", !0));
            });
        },
        postDispatch: function(a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && ea.event.simulate("submit", this.parentNode, a, !0));
        },
        teardown: function() {
            return ea.nodeName(this, "form") ? !1 : void ea.event.remove(this, "._submit");
        }
    }), ca.changeBubbles || (ea.event.special.change = {
        setup: function() {
            return Fa.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ea.event.add(this, "propertychange._change", function(a) {
                "checked" === a.originalEvent.propertyName && (this._just_changed = !0);
            }), ea.event.add(this, "click._change", function(a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1), ea.event.simulate("change", this, a, !0);
            })), !1) : void ea.event.add(this, "beforeactivate._change", function(a) {
                var b = a.target;
                Fa.test(b.nodeName) && !ea._data(b, "changeBubbles") && (ea.event.add(b, "change._change", function(a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || ea.event.simulate("change", this.parentNode, a, !0);
                }), ea._data(b, "changeBubbles", !0));
            });
        },
        handle: function(a) {
            var b = a.target;
            return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0;
        },
        teardown: function() {
            return ea.event.remove(this, "._change"), !Fa.test(this.nodeName);
        }
    }), ca.focusinBubbles || ea.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = function(a) {
            ea.event.simulate(b, a.target, ea.event.fix(a), !0);
        };
        ea.event.special[b] = {
            setup: function() {
                var d = this.ownerDocument || this, e = ea._data(d, b);
                e || d.addEventListener(a, c, !0), ea._data(d, b, (e || 0) + 1);
            },
            teardown: function() {
                var d = this.ownerDocument || this, e = ea._data(d, b) - 1;
                e ? ea._data(d, b, e) : (d.removeEventListener(a, c, !0), ea._removeData(d, b));
            }
        };
    }), ea.fn.extend({
        on: function(a, b, c, d, e) {
            var f, g;
            if ("object" == typeof a) {
                "string" != typeof b && (c = c || b, b = void 0);
                for (f in a) this.on(f, b, c, a[f], e);
                return this;
            }
            if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, 
            c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = n; else if (!d) return this;
            return 1 === e && (g = d, d = function(a) {
                return ea().off(a), g.apply(this, arguments);
            }, d.guid = g.guid || (g.guid = ea.guid++)), this.each(function() {
                ea.event.add(this, a, d, c, b);
            });
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1);
        },
        off: function(a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj, ea(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), 
            this;
            if ("object" == typeof a) {
                for (e in a) this.off(e, b, a[e]);
                return this;
            }
            return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = n), 
            this.each(function() {
                ea.event.remove(this, a, c, b);
            });
        },
        trigger: function(a, b) {
            return this.each(function() {
                ea.event.trigger(a, b, this);
            });
        },
        triggerHandler: function(a, b) {
            var c = this[0];
            return c ? ea.event.trigger(a, b, c, !0) : void 0;
        }
    });
    var Ka = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", La = / jQuery\d+="(?:null|\d+)"/g, Ma = new RegExp("<(?:" + Ka + ")[\\s/>]", "i"), Na = /^\s+/, Oa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Pa = /<([\w:]+)/, Qa = /<tbody/i, Ra = /<|&#?\w+;/, Sa = /<(?:script|style|link)/i, Ta = /checked\s*(?:[^=]|=\s*.checked.)/i, Ua = /^$|\/(?:java|ecma)script/i, Va = /^true\/(.*)/, Wa = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Xa = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        area: [ 1, "<map>", "</map>" ],
        param: [ 1, "<object>", "</object>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: ca.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
    }, Ya = p(oa), Za = Ya.appendChild(oa.createElement("div"));
    Xa.optgroup = Xa.option, Xa.tbody = Xa.tfoot = Xa.colgroup = Xa.caption = Xa.thead, 
    Xa.th = Xa.td, ea.extend({
        clone: function(a, b, c) {
            var d, e, f, g, h, i = ea.contains(a.ownerDocument, a);
            if (ca.html5Clone || ea.isXMLDoc(a) || !Ma.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (Za.innerHTML = a.outerHTML, 
            Za.removeChild(f = Za.firstChild)), !(ca.noCloneEvent && ca.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || ea.isXMLDoc(a))) for (d = q(f), 
            h = q(a), g = 0; null != (e = h[g]); ++g) d[g] && x(e, d[g]);
            if (b) if (c) for (h = h || q(a), d = d || q(f), g = 0; null != (e = h[g]); g++) w(e, d[g]); else w(a, f);
            return d = q(f, "script"), d.length > 0 && v(d, !i && q(a, "script")), d = h = e = null, 
            f;
        },
        buildFragment: function(a, b, c, d) {
            for (var e, f, g, h, i, j, k, l = a.length, m = p(b), n = [], o = 0; l > o; o++) if (f = a[o], 
            f || 0 === f) if ("object" === ea.type(f)) ea.merge(n, f.nodeType ? [ f ] : f); else if (Ra.test(f)) {
                for (h = h || m.appendChild(b.createElement("div")), i = (Pa.exec(f) || [ "", "" ])[1].toLowerCase(), 
                k = Xa[i] || Xa._default, h.innerHTML = k[1] + f.replace(Oa, "<$1></$2>") + k[2], 
                e = k[0]; e--; ) h = h.lastChild;
                if (!ca.leadingWhitespace && Na.test(f) && n.push(b.createTextNode(Na.exec(f)[0])), 
                !ca.tbody) for (f = "table" !== i || Qa.test(f) ? "<table>" !== k[1] || Qa.test(f) ? 0 : h : h.firstChild, 
                e = f && f.childNodes.length; e--; ) ea.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j);
                for (ea.merge(n, h.childNodes), h.textContent = ""; h.firstChild; ) h.removeChild(h.firstChild);
                h = m.lastChild;
            } else n.push(b.createTextNode(f));
            for (h && m.removeChild(h), ca.appendChecked || ea.grep(q(n, "input"), r), o = 0; f = n[o++]; ) if ((!d || -1 === ea.inArray(f, d)) && (g = ea.contains(f.ownerDocument, f), 
            h = q(m.appendChild(f), "script"), g && v(h), c)) for (e = 0; f = h[e++]; ) Ua.test(f.type || "") && c.push(f);
            return h = null, m;
        },
        cleanData: function(a, b) {
            for (var c, d, e, f, g = 0, h = ea.expando, i = ea.cache, j = ca.deleteExpando, k = ea.event.special; null != (c = a[g]); g++) if ((b || ea.acceptData(c)) && (e = c[h], 
            f = e && i[e])) {
                if (f.events) for (d in f.events) k[d] ? ea.event.remove(c, d) : ea.removeEvent(c, d, f.handle);
                i[e] && (delete i[e], j ? delete c[h] : typeof c.removeAttribute !== xa ? c.removeAttribute(h) : c[h] = null, 
                W.push(e));
            }
        }
    }), ea.fn.extend({
        text: function(a) {
            return Da(this, function(a) {
                return void 0 === a ? ea.text(this) : this.empty().append((this[0] && this[0].ownerDocument || oa).createTextNode(a));
            }, null, a, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = s(this, a);
                    b.appendChild(a);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = s(this, a);
                    b.insertBefore(a, b.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this);
            });
        },
        after: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
            });
        },
        remove: function(a, b) {
            for (var c, d = a ? ea.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || ea.cleanData(q(c)), 
            c.parentNode && (b && ea.contains(c.ownerDocument, c) && v(q(c, "script")), c.parentNode.removeChild(c));
            return this;
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) {
                for (1 === a.nodeType && ea.cleanData(q(a, !1)); a.firstChild; ) a.removeChild(a.firstChild);
                a.options && ea.nodeName(a, "select") && (a.options.length = 0);
            }
            return this;
        },
        clone: function(a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
                return ea.clone(this, a, b);
            });
        },
        html: function(a) {
            return Da(this, function(a) {
                var b = this[0] || {}, c = 0, d = this.length;
                if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(La, "") : void 0;
                if (!("string" != typeof a || Sa.test(a) || !ca.htmlSerialize && Ma.test(a) || !ca.leadingWhitespace && Na.test(a) || Xa[(Pa.exec(a) || [ "", "" ])[1].toLowerCase()])) {
                    a = a.replace(Oa, "<$1></$2>");
                    try {
                        for (;d > c; c++) b = this[c] || {}, 1 === b.nodeType && (ea.cleanData(q(b, !1)), 
                        b.innerHTML = a);
                        b = 0;
                    } catch (e) {}
                }
                b && this.empty().append(a);
            }, null, a, arguments.length);
        },
        replaceWith: function() {
            var a = arguments[0];
            return this.domManip(arguments, function(b) {
                a = this.parentNode, ea.cleanData(q(this)), a && a.replaceChild(b, this);
            }), a && (a.length || a.nodeType) ? this : this.remove();
        },
        detach: function(a) {
            return this.remove(a, !0);
        },
        domManip: function(a, b) {
            a = Y.apply([], a);
            var c, d, e, f, g, h, i = 0, j = this.length, k = this, l = j - 1, m = a[0], n = ea.isFunction(m);
            if (n || j > 1 && "string" == typeof m && !ca.checkClone && Ta.test(m)) return this.each(function(c) {
                var d = k.eq(c);
                n && (a[0] = m.call(this, c, d.html())), d.domManip(a, b);
            });
            if (j && (h = ea.buildFragment(a, this[0].ownerDocument, !1, this), c = h.firstChild, 
            1 === h.childNodes.length && (h = c), c)) {
                for (f = ea.map(q(h, "script"), t), e = f.length; j > i; i++) d = h, i !== l && (d = ea.clone(d, !0, !0), 
                e && ea.merge(f, q(d, "script"))), b.call(this[i], d, i);
                if (e) for (g = f[f.length - 1].ownerDocument, ea.map(f, u), i = 0; e > i; i++) d = f[i], 
                Ua.test(d.type || "") && !ea._data(d, "globalEval") && ea.contains(g, d) && (d.src ? ea._evalUrl && ea._evalUrl(d.src) : ea.globalEval((d.text || d.textContent || d.innerHTML || "").replace(Wa, "")));
                h = c = null;
            }
            return this;
        }
    }), ea.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        ea.fn[a] = function(a) {
            for (var c, d = 0, e = [], f = ea(a), g = f.length - 1; g >= d; d++) c = d === g ? this : this.clone(!0), 
            ea(f[d])[b](c), Z.apply(e, c.get());
            return this.pushStack(e);
        };
    });
    var $a, _a = {};
    !function() {
        var a;
        ca.shrinkWrapBlocks = function() {
            if (null != a) return a;
            a = !1;
            var b, c, d;
            return c = oa.getElementsByTagName("body")[0], c && c.style ? (b = oa.createElement("div"), 
            d = oa.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", 
            c.appendChild(d).appendChild(b), typeof b.style.zoom !== xa && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", 
            b.appendChild(oa.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), 
            c.removeChild(d), a) : void 0;
        };
    }();
    var ab, bb, cb = /^margin/, db = new RegExp("^(" + Aa + ")(?!px)[a-z%]+$", "i"), eb = /^(top|right|bottom|left)$/;
    a.getComputedStyle ? (ab = function(b) {
        return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(b, null);
    }, bb = function(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || ab(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== g || ea.contains(a.ownerDocument, a) || (g = ea.style(a, b)), 
        db.test(g) && cb.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, 
        g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + "";
    }) : oa.documentElement.currentStyle && (ab = function(a) {
        return a.currentStyle;
    }, bb = function(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || ab(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), 
        db.test(g) && !eb.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), 
        h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), 
        void 0 === g ? g : g + "" || "auto";
    }), function() {
        function b() {
            var b, c, d, e;
            c = oa.getElementsByTagName("body")[0], c && c.style && (b = oa.createElement("div"), 
            d = oa.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", 
            c.appendChild(d).appendChild(b), b.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", 
            f = g = !1, i = !0, a.getComputedStyle && (f = "1%" !== (a.getComputedStyle(b, null) || {}).top, 
            g = "4px" === (a.getComputedStyle(b, null) || {
                width: "4px"
            }).width, e = b.appendChild(oa.createElement("div")), e.style.cssText = b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", 
            e.style.marginRight = e.style.width = "0", b.style.width = "1px", i = !parseFloat((a.getComputedStyle(e, null) || {}).marginRight), 
            b.removeChild(e)), b.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", 
            e = b.getElementsByTagName("td"), e[0].style.cssText = "margin:0;border:0;padding:0;display:none", 
            h = 0 === e[0].offsetHeight, h && (e[0].style.display = "", e[1].style.display = "none", 
            h = 0 === e[0].offsetHeight), c.removeChild(d));
        }
        var c, d, e, f, g, h, i;
        c = oa.createElement("div"), c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        e = c.getElementsByTagName("a")[0], d = e && e.style, d && (d.cssText = "float:left;opacity:.5", 
        ca.opacity = "0.5" === d.opacity, ca.cssFloat = !!d.cssFloat, c.style.backgroundClip = "content-box", 
        c.cloneNode(!0).style.backgroundClip = "", ca.clearCloneStyle = "content-box" === c.style.backgroundClip, 
        ca.boxSizing = "" === d.boxSizing || "" === d.MozBoxSizing || "" === d.WebkitBoxSizing, 
        ea.extend(ca, {
            reliableHiddenOffsets: function() {
                return null == h && b(), h;
            },
            boxSizingReliable: function() {
                return null == g && b(), g;
            },
            pixelPosition: function() {
                return null == f && b(), f;
            },
            reliableMarginRight: function() {
                return null == i && b(), i;
            }
        }));
    }(), ea.swap = function(a, b, c, d) {
        var e, f, g = {};
        for (f in b) g[f] = a.style[f], a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b) a.style[f] = g[f];
        return e;
    };
    var fb = /alpha\([^)]*\)/i, gb = /opacity\s*=\s*([^)]*)/, hb = /^(none|table(?!-c[ea]).+)/, ib = new RegExp("^(" + Aa + ")(.*)$", "i"), jb = new RegExp("^([+-])=(" + Aa + ")", "i"), kb = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, lb = {
        letterSpacing: "0",
        fontWeight: "400"
    }, mb = [ "Webkit", "O", "Moz", "ms" ];
    ea.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = bb(a, "opacity");
                        return "" === c ? "1" : c;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": ca.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = ea.camelCase(b), i = a.style;
                if (b = ea.cssProps[h] || (ea.cssProps[h] = B(i, h)), g = ea.cssHooks[b] || ea.cssHooks[h], 
                void 0 === c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
                if (f = typeof c, "string" === f && (e = jb.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(ea.css(a, b)), 
                f = "number"), null != c && c === c && ("number" !== f || ea.cssNumber[h] || (c += "px"), 
                ca.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), 
                !(g && "set" in g && void 0 === (c = g.set(a, c, d))))) try {
                    i[b] = c;
                } catch (j) {}
            }
        },
        css: function(a, b, c, d) {
            var e, f, g, h = ea.camelCase(b);
            return b = ea.cssProps[h] || (ea.cssProps[h] = B(a.style, h)), g = ea.cssHooks[b] || ea.cssHooks[h], 
            g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = bb(a, b, d)), "normal" === f && b in lb && (f = lb[b]), 
            "" === c || c ? (e = parseFloat(f), c === !0 || ea.isNumeric(e) ? e || 0 : f) : f;
        }
    }), ea.each([ "height", "width" ], function(a, b) {
        ea.cssHooks[b] = {
            get: function(a, c, d) {
                return c ? hb.test(ea.css(a, "display")) && 0 === a.offsetWidth ? ea.swap(a, kb, function() {
                    return F(a, b, d);
                }) : F(a, b, d) : void 0;
            },
            set: function(a, c, d) {
                var e = d && ab(a);
                return D(a, c, d ? E(a, b, d, ca.boxSizing && "border-box" === ea.css(a, "boxSizing", !1, e), e) : 0);
            }
        };
    }), ca.opacity || (ea.cssHooks.opacity = {
        get: function(a, b) {
            return gb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : "";
        },
        set: function(a, b) {
            var c = a.style, d = a.currentStyle, e = ea.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "", f = d && d.filter || c.filter || "";
            c.zoom = 1, (b >= 1 || "" === b) && "" === ea.trim(f.replace(fb, "")) && c.removeAttribute && (c.removeAttribute("filter"), 
            "" === b || d && !d.filter) || (c.filter = fb.test(f) ? f.replace(fb, e) : f + " " + e);
        }
    }), ea.cssHooks.marginRight = A(ca.reliableMarginRight, function(a, b) {
        return b ? ea.swap(a, {
            display: "inline-block"
        }, bb, [ a, "marginRight" ]) : void 0;
    }), ea.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        ea.cssHooks[a + b] = {
            expand: function(c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [ c ]; 4 > d; d++) e[a + Ba[d] + b] = f[d] || f[d - 2] || f[0];
                return e;
            }
        }, cb.test(a) || (ea.cssHooks[a + b].set = D);
    }), ea.fn.extend({
        css: function(a, b) {
            return Da(this, function(a, b, c) {
                var d, e, f = {}, g = 0;
                if (ea.isArray(b)) {
                    for (d = ab(a), e = b.length; e > g; g++) f[b[g]] = ea.css(a, b[g], !1, d);
                    return f;
                }
                return void 0 !== c ? ea.style(a, b, c) : ea.css(a, b);
            }, a, b, arguments.length > 1);
        },
        show: function() {
            return C(this, !0);
        },
        hide: function() {
            return C(this);
        },
        toggle: function(a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                Ca(this) ? ea(this).show() : ea(this).hide();
            });
        }
    }), ea.Tween = G, G.prototype = {
        constructor: G,
        init: function(a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), 
            this.end = d, this.unit = f || (ea.cssNumber[c] ? "" : "px");
        },
        cur: function() {
            var a = G.propHooks[this.prop];
            return a && a.get ? a.get(this) : G.propHooks._default.get(this);
        },
        run: function(a) {
            var b, c = G.propHooks[this.prop];
            return this.pos = b = this.options.duration ? ea.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, 
            this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            c && c.set ? c.set(this) : G.propHooks._default.set(this), this;
        }
    }, G.prototype.init.prototype = G.prototype, G.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = ea.css(a.elem, a.prop, ""), 
                b && "auto" !== b ? b : 0) : a.elem[a.prop];
            },
            set: function(a) {
                ea.fx.step[a.prop] ? ea.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[ea.cssProps[a.prop]] || ea.cssHooks[a.prop]) ? ea.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now;
            }
        }
    }, G.propHooks.scrollTop = G.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
        }
    }, ea.easing = {
        linear: function(a) {
            return a;
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2;
        }
    }, ea.fx = G.prototype.init, ea.fx.step = {};
    var nb, ob, pb = /^(?:toggle|show|hide)$/, qb = new RegExp("^(?:([+-])=|)(" + Aa + ")([a-z%]*)$", "i"), rb = /queueHooks$/, sb = [ K ], tb = {
        "*": [ function(a, b) {
            var c = this.createTween(a, b), d = c.cur(), e = qb.exec(b), f = e && e[3] || (ea.cssNumber[a] ? "" : "px"), g = (ea.cssNumber[a] || "px" !== f && +d) && qb.exec(ea.css(c.elem, a)), h = 1, i = 20;
            if (g && g[3] !== f) {
                f = f || g[3], e = e || [], g = +d || 1;
                do h = h || ".5", g /= h, ea.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i);
            }
            return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), 
            c;
        } ]
    };
    ea.Animation = ea.extend(M, {
        tweener: function(a, b) {
            ea.isFunction(a) ? (b = a, a = [ "*" ]) : a = a.split(" ");
            for (var c, d = 0, e = a.length; e > d; d++) c = a[d], tb[c] = tb[c] || [], tb[c].unshift(b);
        },
        prefilter: function(a, b) {
            b ? sb.unshift(a) : sb.push(a);
        }
    }), ea.speed = function(a, b, c) {
        var d = a && "object" == typeof a ? ea.extend({}, a) : {
            complete: c || !c && b || ea.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !ea.isFunction(b) && b
        };
        return d.duration = ea.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in ea.fx.speeds ? ea.fx.speeds[d.duration] : ea.fx.speeds._default, 
        (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
            ea.isFunction(d.old) && d.old.call(this), d.queue && ea.dequeue(this, d.queue);
        }, d;
    }, ea.fn.extend({
        fadeTo: function(a, b, c, d) {
            return this.filter(Ca).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d);
        },
        animate: function(a, b, c, d) {
            var e = ea.isEmptyObject(a), f = ea.speed(b, c, d), g = function() {
                var b = M(this, ea.extend({}, a), f);
                (e || ea._data(this, "finish")) && b.stop(!0);
            };
            return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
        },
        stop: function(a, b, c) {
            var d = function(a) {
                var b = a.stop;
                delete a.stop, b(c);
            };
            return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), 
            this.each(function() {
                var b = !0, e = null != a && a + "queueHooks", f = ea.timers, g = ea._data(this);
                if (e) g[e] && g[e].stop && d(g[e]); else for (e in g) g[e] && g[e].stop && rb.test(e) && d(g[e]);
                for (e = f.length; e--; ) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), 
                b = !1, f.splice(e, 1));
                (b || !c) && ea.dequeue(this, a);
            });
        },
        finish: function(a) {
            return a !== !1 && (a = a || "fx"), this.each(function() {
                var b, c = ea._data(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = ea.timers, g = d ? d.length : 0;
                for (c.finish = !0, ea.queue(this, a, []), e && e.stop && e.stop.call(this, !0), 
                b = f.length; b--; ) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), 
                f.splice(b, 1));
                for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish;
            });
        }
    }), ea.each([ "toggle", "show", "hide" ], function(a, b) {
        var c = ea.fn[b];
        ea.fn[b] = function(a, d, e) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(I(b, !0), a, d, e);
        };
    }), ea.each({
        slideDown: I("show"),
        slideUp: I("hide"),
        slideToggle: I("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        ea.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d);
        };
    }), ea.timers = [], ea.fx.tick = function() {
        var a, b = ea.timers, c = 0;
        for (nb = ea.now(); c < b.length; c++) a = b[c], a() || b[c] !== a || b.splice(c--, 1);
        b.length || ea.fx.stop(), nb = void 0;
    }, ea.fx.timer = function(a) {
        ea.timers.push(a), a() ? ea.fx.start() : ea.timers.pop();
    }, ea.fx.interval = 13, ea.fx.start = function() {
        ob || (ob = setInterval(ea.fx.tick, ea.fx.interval));
    }, ea.fx.stop = function() {
        clearInterval(ob), ob = null;
    }, ea.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, ea.fn.delay = function(a, b) {
        return a = ea.fx ? ea.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
            var d = setTimeout(b, a);
            c.stop = function() {
                clearTimeout(d);
            };
        });
    }, function() {
        var a, b, c, d, e;
        b = oa.createElement("div"), b.setAttribute("className", "t"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        d = b.getElementsByTagName("a")[0], c = oa.createElement("select"), e = c.appendChild(oa.createElement("option")), 
        a = b.getElementsByTagName("input")[0], d.style.cssText = "top:1px", ca.getSetAttribute = "t" !== b.className, 
        ca.style = /top/.test(d.getAttribute("style")), ca.hrefNormalized = "/a" === d.getAttribute("href"), 
        ca.checkOn = !!a.value, ca.optSelected = e.selected, ca.enctype = !!oa.createElement("form").enctype, 
        c.disabled = !0, ca.optDisabled = !e.disabled, a = oa.createElement("input"), a.setAttribute("value", ""), 
        ca.input = "" === a.getAttribute("value"), a.value = "t", a.setAttribute("type", "radio"), 
        ca.radioValue = "t" === a.value;
    }();
    var ub = /\r/g;
    ea.fn.extend({
        val: function(a) {
            var b, c, d, e = this[0];
            {
                if (arguments.length) return d = ea.isFunction(a), this.each(function(c) {
                    var e;
                    1 === this.nodeType && (e = d ? a.call(this, c, ea(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : ea.isArray(e) && (e = ea.map(e, function(a) {
                        return null == a ? "" : a + "";
                    })), b = ea.valHooks[this.type] || ea.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e));
                });
                if (e) return b = ea.valHooks[e.type] || ea.valHooks[e.nodeName.toLowerCase()], 
                b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(ub, "") : null == c ? "" : c);
            }
        }
    }), ea.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = ea.find.attr(a, "value");
                    return null != b ? b : ea.trim(ea.text(a));
                }
            },
            select: {
                get: function(a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++) if (c = d[i], 
                    !(!c.selected && i !== e || (ca.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && ea.nodeName(c.parentNode, "optgroup"))) {
                        if (b = ea(c).val(), f) return b;
                        g.push(b);
                    }
                    return g;
                },
                set: function(a, b) {
                    for (var c, d, e = a.options, f = ea.makeArray(b), g = e.length; g--; ) if (d = e[g], 
                    ea.inArray(ea.valHooks.option.get(d), f) >= 0) try {
                        d.selected = c = !0;
                    } catch (h) {
                        d.scrollHeight;
                    } else d.selected = !1;
                    return c || (a.selectedIndex = -1), e;
                }
            }
        }
    }), ea.each([ "radio", "checkbox" ], function() {
        ea.valHooks[this] = {
            set: function(a, b) {
                return ea.isArray(b) ? a.checked = ea.inArray(ea(a).val(), b) >= 0 : void 0;
            }
        }, ca.checkOn || (ea.valHooks[this].get = function(a) {
            return null === a.getAttribute("value") ? "on" : a.value;
        });
    });
    var vb, wb, xb = ea.expr.attrHandle, yb = /^(?:checked|selected)$/i, zb = ca.getSetAttribute, Ab = ca.input;
    ea.fn.extend({
        attr: function(a, b) {
            return Da(this, ea.attr, a, b, arguments.length > 1);
        },
        removeAttr: function(a) {
            return this.each(function() {
                ea.removeAttr(this, a);
            });
        }
    }), ea.extend({
        attr: function(a, b, c) {
            var d, e, f = a.nodeType;
            if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === xa ? ea.prop(a, b, c) : (1 === f && ea.isXMLDoc(a) || (b = b.toLowerCase(), 
            d = ea.attrHooks[b] || (ea.expr.match.bool.test(b) ? wb : vb)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = ea.find.attr(a, b), 
            null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), 
            c) : void ea.removeAttr(a, b));
        },
        removeAttr: function(a, b) {
            var c, d, e = 0, f = b && b.match(ta);
            if (f && 1 === a.nodeType) for (;c = f[e++]; ) d = ea.propFix[c] || c, ea.expr.match.bool.test(c) ? Ab && zb || !yb.test(c) ? a[d] = !1 : a[ea.camelCase("default-" + c)] = a[d] = !1 : ea.attr(a, c, ""), 
            a.removeAttribute(zb ? c : d);
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!ca.radioValue && "radio" === b && ea.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b;
                    }
                }
            }
        }
    }), wb = {
        set: function(a, b, c) {
            return b === !1 ? ea.removeAttr(a, c) : Ab && zb || !yb.test(c) ? a.setAttribute(!zb && ea.propFix[c] || c, c) : a[ea.camelCase("default-" + c)] = a[c] = !0, 
            c;
        }
    }, ea.each(ea.expr.match.bool.source.match(/\w+/g), function(a, b) {
        var c = xb[b] || ea.find.attr;
        xb[b] = Ab && zb || !yb.test(b) ? function(a, b, d) {
            var e, f;
            return d || (f = xb[b], xb[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, 
            xb[b] = f), e;
        } : function(a, b, c) {
            return c ? void 0 : a[ea.camelCase("default-" + b)] ? b.toLowerCase() : null;
        };
    }), Ab && zb || (ea.attrHooks.value = {
        set: function(a, b, c) {
            return ea.nodeName(a, "input") ? void (a.defaultValue = b) : vb && vb.set(a, b, c);
        }
    }), zb || (vb = {
        set: function(a, b, c) {
            var d = a.getAttributeNode(c);
            return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", 
            "value" === c || b === a.getAttribute(c) ? b : void 0;
        }
    }, xb.id = xb.name = xb.coords = function(a, b, c) {
        var d;
        return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null;
    }, ea.valHooks.button = {
        get: function(a, b) {
            var c = a.getAttributeNode(b);
            return c && c.specified ? c.value : void 0;
        },
        set: vb.set
    }, ea.attrHooks.contenteditable = {
        set: function(a, b, c) {
            vb.set(a, "" === b ? !1 : b, c);
        }
    }, ea.each([ "width", "height" ], function(a, b) {
        ea.attrHooks[b] = {
            set: function(a, c) {
                return "" === c ? (a.setAttribute(b, "auto"), c) : void 0;
            }
        };
    })), ca.style || (ea.attrHooks.style = {
        get: function(a) {
            return a.style.cssText || void 0;
        },
        set: function(a, b) {
            return a.style.cssText = b + "";
        }
    });
    var Bb = /^(?:input|select|textarea|button|object)$/i, Cb = /^(?:a|area)$/i;
    ea.fn.extend({
        prop: function(a, b) {
            return Da(this, ea.prop, a, b, arguments.length > 1);
        },
        removeProp: function(a) {
            return a = ea.propFix[a] || a, this.each(function() {
                try {
                    this[a] = void 0, delete this[a];
                } catch (b) {}
            });
        }
    }), ea.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(a, b, c) {
            var d, e, f, g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !ea.isXMLDoc(a), f && (b = ea.propFix[b] || b, 
            e = ea.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b];
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var b = ea.find.attr(a, "tabindex");
                    return b ? parseInt(b, 10) : Bb.test(a.nodeName) || Cb.test(a.nodeName) && a.href ? 0 : -1;
                }
            }
        }
    }), ca.hrefNormalized || ea.each([ "href", "src" ], function(a, b) {
        ea.propHooks[b] = {
            get: function(a) {
                return a.getAttribute(b, 4);
            }
        };
    }), ca.optSelected || (ea.propHooks.selected = {
        get: function(a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null;
        }
    }), ea.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        ea.propFix[this.toLowerCase()] = this;
    }), ca.enctype || (ea.propFix.enctype = "encoding");
    var Db = /[\t\r\n\f]/g;
    ea.fn.extend({
        addClass: function(a) {
            var b, c, d, e, f, g, h = 0, i = this.length, j = "string" == typeof a && a;
            if (ea.isFunction(a)) return this.each(function(b) {
                ea(this).addClass(a.call(this, b, this.className));
            });
            if (j) for (b = (a || "").match(ta) || []; i > h; h++) if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Db, " ") : " ")) {
                for (f = 0; e = b[f++]; ) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                g = ea.trim(d), c.className !== g && (c.className = g);
            }
            return this;
        },
        removeClass: function(a) {
            var b, c, d, e, f, g, h = 0, i = this.length, j = 0 === arguments.length || "string" == typeof a && a;
            if (ea.isFunction(a)) return this.each(function(b) {
                ea(this).removeClass(a.call(this, b, this.className));
            });
            if (j) for (b = (a || "").match(ta) || []; i > h; h++) if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Db, " ") : "")) {
                for (f = 0; e = b[f++]; ) for (;d.indexOf(" " + e + " ") >= 0; ) d = d.replace(" " + e + " ", " ");
                g = a ? ea.trim(d) : "", c.className !== g && (c.className = g);
            }
            return this;
        },
        toggleClass: function(a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(ea.isFunction(a) ? function(c) {
                ea(this).toggleClass(a.call(this, c, this.className, b), b);
            } : function() {
                if ("string" === c) for (var b, d = 0, e = ea(this), f = a.match(ta) || []; b = f[d++]; ) e.hasClass(b) ? e.removeClass(b) : e.addClass(b); else (c === xa || "boolean" === c) && (this.className && ea._data(this, "__className__", this.className), 
                this.className = this.className || a === !1 ? "" : ea._data(this, "__className__") || "");
            });
        },
        hasClass: function(a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++) if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(Db, " ").indexOf(b) >= 0) return !0;
            return !1;
        }
    }), ea.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        ea.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
        };
    }), ea.fn.extend({
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a);
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c);
        },
        unbind: function(a, b) {
            return this.off(a, null, b);
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d);
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c);
        }
    });
    var Eb = ea.now(), Fb = /\?/, Gb = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    ea.parseJSON = function(b) {
        if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
        var c, d = null, e = ea.trim(b + "");
        return e && !ea.trim(e.replace(Gb, function(a, b, e, f) {
            return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "");
        })) ? Function("return " + e)() : ea.error("Invalid JSON: " + b);
    }, ea.parseXML = function(b) {
        var c, d;
        if (!b || "string" != typeof b) return null;
        try {
            a.DOMParser ? (d = new DOMParser(), c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), 
            c.async = "false", c.loadXML(b));
        } catch (e) {
            c = void 0;
        }
        return c && c.documentElement && !c.getElementsByTagName("parsererror").length || ea.error("Invalid XML: " + b), 
        c;
    };
    var Hb, Ib, Jb = /#.*$/, Kb = /([?&])_=[^&]*/, Lb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Mb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Nb = /^(?:GET|HEAD)$/, Ob = /^\/\//, Pb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Qb = {}, Rb = {}, Sb = "*/".concat("*");
    try {
        Ib = location.href;
    } catch (Tb) {
        Ib = oa.createElement("a"), Ib.href = "", Ib = Ib.href;
    }
    Hb = Pb.exec(Ib.toLowerCase()) || [], ea.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ib,
            type: "GET",
            isLocal: Mb.test(Hb[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Sb,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": ea.parseJSON,
                "text xml": ea.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? P(P(a, ea.ajaxSettings), b) : P(ea.ajaxSettings, a);
        },
        ajaxPrefilter: N(Qb),
        ajaxTransport: N(Rb),
        ajax: function(a, b) {
            function c(a, b, c, d) {
                var e, k, r, s, u, w = b;
                2 !== t && (t = 2, h && clearTimeout(h), j = void 0, g = d || "", v.readyState = a > 0 ? 4 : 0, 
                e = a >= 200 && 300 > a || 304 === a, c && (s = Q(l, v, c)), s = R(l, s, v, e), 
                e ? (l.ifModified && (u = v.getResponseHeader("Last-Modified"), u && (ea.lastModified[f] = u), 
                u = v.getResponseHeader("etag"), u && (ea.etag[f] = u)), 204 === a || "HEAD" === l.type ? w = "nocontent" : 304 === a ? w = "notmodified" : (w = s.state, 
                k = s.data, r = s.error, e = !r)) : (r = w, (a || !w) && (w = "error", 0 > a && (a = 0))), 
                v.status = a, v.statusText = (b || w) + "", e ? o.resolveWith(m, [ k, w, v ]) : o.rejectWith(m, [ v, w, r ]), 
                v.statusCode(q), q = void 0, i && n.trigger(e ? "ajaxSuccess" : "ajaxError", [ v, l, e ? k : r ]), 
                p.fireWith(m, [ v, w ]), i && (n.trigger("ajaxComplete", [ v, l ]), --ea.active || ea.event.trigger("ajaxStop")));
            }
            "object" == typeof a && (b = a, a = void 0), b = b || {};
            var d, e, f, g, h, i, j, k, l = ea.ajaxSetup({}, b), m = l.context || l, n = l.context && (m.nodeType || m.jquery) ? ea(m) : ea.event, o = ea.Deferred(), p = ea.Callbacks("once memory"), q = l.statusCode || {}, r = {}, s = {}, t = 0, u = "canceled", v = {
                readyState: 0,
                getResponseHeader: function(a) {
                    var b;
                    if (2 === t) {
                        if (!k) for (k = {}; b = Lb.exec(g); ) k[b[1].toLowerCase()] = b[2];
                        b = k[a.toLowerCase()];
                    }
                    return null == b ? null : b;
                },
                getAllResponseHeaders: function() {
                    return 2 === t ? g : null;
                },
                setRequestHeader: function(a, b) {
                    var c = a.toLowerCase();
                    return t || (a = s[c] = s[c] || a, r[a] = b), this;
                },
                overrideMimeType: function(a) {
                    return t || (l.mimeType = a), this;
                },
                statusCode: function(a) {
                    var b;
                    if (a) if (2 > t) for (b in a) q[b] = [ q[b], a[b] ]; else v.always(a[v.status]);
                    return this;
                },
                abort: function(a) {
                    var b = a || u;
                    return j && j.abort(b), c(0, b), this;
                }
            };
            if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, l.url = ((a || l.url || Ib) + "").replace(Jb, "").replace(Ob, Hb[1] + "//"), 
            l.type = b.method || b.type || l.method || l.type, l.dataTypes = ea.trim(l.dataType || "*").toLowerCase().match(ta) || [ "" ], 
            null == l.crossDomain && (d = Pb.exec(l.url.toLowerCase()), l.crossDomain = !(!d || d[1] === Hb[1] && d[2] === Hb[2] && (d[3] || ("http:" === d[1] ? "80" : "443")) === (Hb[3] || ("http:" === Hb[1] ? "80" : "443")))), 
            l.data && l.processData && "string" != typeof l.data && (l.data = ea.param(l.data, l.traditional)), 
            O(Qb, l, b, v), 2 === t) return v;
            i = ea.event && l.global, i && 0 === ea.active++ && ea.event.trigger("ajaxStart"), 
            l.type = l.type.toUpperCase(), l.hasContent = !Nb.test(l.type), f = l.url, l.hasContent || (l.data && (f = l.url += (Fb.test(f) ? "&" : "?") + l.data, 
            delete l.data), l.cache === !1 && (l.url = Kb.test(f) ? f.replace(Kb, "$1_=" + Eb++) : f + (Fb.test(f) ? "&" : "?") + "_=" + Eb++)), 
            l.ifModified && (ea.lastModified[f] && v.setRequestHeader("If-Modified-Since", ea.lastModified[f]), 
            ea.etag[f] && v.setRequestHeader("If-None-Match", ea.etag[f])), (l.data && l.hasContent && l.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", l.contentType), 
            v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + Sb + "; q=0.01" : "") : l.accepts["*"]);
            for (e in l.headers) v.setRequestHeader(e, l.headers[e]);
            if (l.beforeSend && (l.beforeSend.call(m, v, l) === !1 || 2 === t)) return v.abort();
            u = "abort";
            for (e in {
                success: 1,
                error: 1,
                complete: 1
            }) v[e](l[e]);
            if (j = O(Rb, l, b, v)) {
                v.readyState = 1, i && n.trigger("ajaxSend", [ v, l ]), l.async && l.timeout > 0 && (h = setTimeout(function() {
                    v.abort("timeout");
                }, l.timeout));
                try {
                    t = 1, j.send(r, c);
                } catch (w) {
                    if (!(2 > t)) throw w;
                    c(-1, w);
                }
            } else c(-1, "No Transport");
            return v;
        },
        getJSON: function(a, b, c) {
            return ea.get(a, b, c, "json");
        },
        getScript: function(a, b) {
            return ea.get(a, void 0, b, "script");
        }
    }), ea.each([ "get", "post" ], function(a, b) {
        ea[b] = function(a, c, d, e) {
            return ea.isFunction(c) && (e = e || d, d = c, c = void 0), ea.ajax({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            });
        };
    }), ea._evalUrl = function(a) {
        return ea.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        });
    }, ea.fn.extend({
        wrapAll: function(a) {
            if (ea.isFunction(a)) return this.each(function(b) {
                ea(this).wrapAll(a.call(this, b));
            });
            if (this[0]) {
                var b = ea(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType; ) a = a.firstChild;
                    return a;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(a) {
            return this.each(ea.isFunction(a) ? function(b) {
                ea(this).wrapInner(a.call(this, b));
            } : function() {
                var b = ea(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a);
            });
        },
        wrap: function(a) {
            var b = ea.isFunction(a);
            return this.each(function(c) {
                ea(this).wrapAll(b ? a.call(this, c) : a);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                ea.nodeName(this, "body") || ea(this).replaceWith(this.childNodes);
            }).end();
        }
    }), ea.expr.filters.hidden = function(a) {
        return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !ca.reliableHiddenOffsets() && "none" === (a.style && a.style.display || ea.css(a, "display"));
    }, ea.expr.filters.visible = function(a) {
        return !ea.expr.filters.hidden(a);
    };
    var Ub = /%20/g, Vb = /\[\]$/, Wb = /\r?\n/g, Xb = /^(?:submit|button|image|reset|file)$/i, Yb = /^(?:input|select|textarea|keygen)/i;
    ea.param = function(a, b) {
        var c, d = [], e = function(a, b) {
            b = ea.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
        };
        if (void 0 === b && (b = ea.ajaxSettings && ea.ajaxSettings.traditional), ea.isArray(a) || a.jquery && !ea.isPlainObject(a)) ea.each(a, function() {
            e(this.name, this.value);
        }); else for (c in a) S(c, a[c], b, e);
        return d.join("&").replace(Ub, "+");
    }, ea.fn.extend({
        serialize: function() {
            return ea.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var a = ea.prop(this, "elements");
                return a ? ea.makeArray(a) : this;
            }).filter(function() {
                var a = this.type;
                return this.name && !ea(this).is(":disabled") && Yb.test(this.nodeName) && !Xb.test(a) && (this.checked || !Ea.test(a));
            }).map(function(a, b) {
                var c = ea(this).val();
                return null == c ? null : ea.isArray(c) ? ea.map(c, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(Wb, "\r\n")
                    };
                }) : {
                    name: b.name,
                    value: c.replace(Wb, "\r\n")
                };
            }).get();
        }
    }), ea.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && T() || U();
    } : T;
    var Zb = 0, $b = {}, _b = ea.ajaxSettings.xhr();
    a.attachEvent && a.attachEvent("onunload", function() {
        for (var a in $b) $b[a](void 0, !0);
    }), ca.cors = !!_b && "withCredentials" in _b, _b = ca.ajax = !!_b, _b && ea.ajaxTransport(function(a) {
        if (!a.crossDomain || ca.cors) {
            var b;
            return {
                send: function(c, d) {
                    var e, f = a.xhr(), g = ++Zb;
                    if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields) for (e in a.xhrFields) f[e] = a.xhrFields[e];
                    a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                    for (e in c) void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
                    f.send(a.hasContent && a.data || null), b = function(c, e) {
                        var h, i, j;
                        if (b && (e || 4 === f.readyState)) if (delete $b[g], b = void 0, f.onreadystatechange = ea.noop, 
                        e) 4 !== f.readyState && f.abort(); else {
                            j = {}, h = f.status, "string" == typeof f.responseText && (j.text = f.responseText);
                            try {
                                i = f.statusText;
                            } catch (k) {
                                i = "";
                            }
                            h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404;
                        }
                        j && d(h, i, j, f.getAllResponseHeaders());
                    }, a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = $b[g] = b : b();
                },
                abort: function() {
                    b && b(void 0, !0);
                }
            };
        }
    }), ea.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {
                return ea.globalEval(a), a;
            }
        }
    }), ea.ajaxPrefilter("script", function(a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1);
    }), ea.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c = oa.head || ea("head")[0] || oa.documentElement;
            return {
                send: function(d, e) {
                    b = oa.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), 
                    b.src = a.url, b.onload = b.onreadystatechange = function(a, c) {
                        (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, 
                        b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success"));
                    }, c.insertBefore(b, c.firstChild);
                },
                abort: function() {
                    b && b.onload(void 0, !0);
                }
            };
        }
    });
    var ac = [], bc = /(=)\?(?=&|$)|\?\?/;
    ea.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = ac.pop() || ea.expando + "_" + Eb++;
            return this[a] = !0, a;
        }
    }), ea.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (bc.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && bc.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = ea.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, 
        h ? b[h] = b[h].replace(bc, "$1" + e) : b.jsonp !== !1 && (b.url += (Fb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), 
        b.converters["script json"] = function() {
            return g || ea.error(e + " was not called"), g[0];
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
            g = arguments;
        }, d.always(function() {
            a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, ac.push(e)), g && ea.isFunction(f) && f(g[0]), 
            g = f = void 0;
        }), "script") : void 0;
    }), ea.parseHTML = function(a, b, c) {
        if (!a || "string" != typeof a) return null;
        "boolean" == typeof b && (c = b, b = !1), b = b || oa;
        var d = la.exec(a), e = !c && [];
        return d ? [ b.createElement(d[1]) ] : (d = ea.buildFragment([ a ], b, e), e && e.length && ea(e).remove(), 
        ea.merge([], d.childNodes));
    };
    var cc = ea.fn.load;
    ea.fn.load = function(a, b, c) {
        if ("string" != typeof a && cc) return cc.apply(this, arguments);
        var d, e, f, g = this, h = a.indexOf(" ");
        return h >= 0 && (d = ea.trim(a.slice(h, a.length)), a = a.slice(0, h)), ea.isFunction(b) ? (c = b, 
        b = void 0) : b && "object" == typeof b && (f = "POST"), g.length > 0 && ea.ajax({
            url: a,
            type: f,
            dataType: "html",
            data: b
        }).done(function(a) {
            e = arguments, g.html(d ? ea("<div>").append(ea.parseHTML(a)).find(d) : a);
        }).complete(c && function(a, b) {
            g.each(c, e || [ a.responseText, b, a ]);
        }), this;
    }, ea.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(a, b) {
        ea.fn[b] = function(a) {
            return this.on(b, a);
        };
    }), ea.expr.filters.animated = function(a) {
        return ea.grep(ea.timers, function(b) {
            return a === b.elem;
        }).length;
    };
    var dc = a.document.documentElement;
    ea.offset = {
        setOffset: function(a, b, c) {
            var d, e, f, g, h, i, j, k = ea.css(a, "position"), l = ea(a), m = {};
            "static" === k && (a.style.position = "relative"), h = l.offset(), f = ea.css(a, "top"), 
            i = ea.css(a, "left"), j = ("absolute" === k || "fixed" === k) && ea.inArray("auto", [ f, i ]) > -1, 
            j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), 
            ea.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), 
            null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m);
        }
    }, ea.fn.extend({
        offset: function(a) {
            if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                ea.offset.setOffset(this, a, b);
            });
            var b, c, d = {
                top: 0,
                left: 0
            }, e = this[0], f = e && e.ownerDocument;
            if (f) return b = f.documentElement, ea.contains(b, e) ? (typeof e.getBoundingClientRect !== xa && (d = e.getBoundingClientRect()), 
            c = V(f), {
                top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
            }) : d;
        },
        position: function() {
            if (this[0]) {
                var a, b, c = {
                    top: 0,
                    left: 0
                }, d = this[0];
                return "fixed" === ea.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), 
                b = this.offset(), ea.nodeName(a[0], "html") || (c = a.offset()), c.top += ea.css(a[0], "borderTopWidth", !0), 
                c.left += ea.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - c.top - ea.css(d, "marginTop", !0),
                    left: b.left - c.left - ea.css(d, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || dc; a && !ea.nodeName(a, "html") && "static" === ea.css(a, "position"); ) a = a.offsetParent;
                return a || dc;
            });
        }
    }), ea.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, b) {
        var c = /Y/.test(b);
        ea.fn[a] = function(d) {
            return Da(this, function(a, d, e) {
                var f = V(a);
                return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void (f ? f.scrollTo(c ? ea(f).scrollLeft() : e, c ? e : ea(f).scrollTop()) : a[d] = e);
            }, a, d, arguments.length, null);
        };
    }), ea.each([ "top", "left" ], function(a, b) {
        ea.cssHooks[b] = A(ca.pixelPosition, function(a, c) {
            return c ? (c = bb(a, b), db.test(c) ? ea(a).position()[b] + "px" : c) : void 0;
        });
    }), ea.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        ea.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(c, d) {
            ea.fn[d] = function(d, e) {
                var f = arguments.length && (c || "boolean" != typeof d), g = c || (d === !0 || e === !0 ? "margin" : "border");
                return Da(this, function(b, c, d) {
                    var e;
                    return ea.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, 
                    Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? ea.css(b, c, g) : ea.style(b, c, d, g);
                }, b, f ? d : void 0, f, null);
            };
        });
    }), ea.fn.size = function() {
        return this.length;
    }, ea.fn.andSelf = ea.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return ea;
    });
    var ec = a.jQuery, fc = a.$;
    return ea.noConflict = function(b) {
        return a.$ === ea && (a.$ = fc), b && a.jQuery === ea && (a.jQuery = ec), ea;
    }, typeof b === xa && (a.jQuery = a.$ = ea), ea;
}), window.Modernizr = function(a, b, c) {
    function d(a) {
        t.cssText = a;
    }
    function e(a, b) {
        return d(x.join(a + ";") + (b || ""));
    }
    function f(a, b) {
        return typeof a === b;
    }
    function g(a, b) {
        return !!~("" + a).indexOf(b);
    }
    function h(a, b) {
        for (var d in a) {
            var e = a[d];
            if (!g(e, "-") && t[e] !== c) return "pfx" == b ? e : !0;
        }
        return !1;
    }
    function i(a, b, d) {
        for (var e in a) {
            var g = b[a[e]];
            if (g !== c) return d === !1 ? a[e] : f(g, "function") ? g.bind(d || b) : g;
        }
        return !1;
    }
    function j(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.slice(1), e = (a + " " + z.join(d + " ") + d).split(" ");
        return f(b, "string") || f(b, "undefined") ? h(e, b) : (e = (a + " " + A.join(d + " ") + d).split(" "), 
        i(e, b, c));
    }
    function k() {
        o.input = function(c) {
            for (var d = 0, e = c.length; e > d; d++) E[c[d]] = !!(c[d] in u);
            return E.list && (E.list = !(!b.createElement("datalist") || !a.HTMLDataListElement)), 
            E;
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), 
        o.inputtypes = function(a) {
            for (var d, e, f, g = 0, h = a.length; h > g; g++) u.setAttribute("type", e = a[g]), 
            d = "text" !== u.type, d && (u.value = v, u.style.cssText = "position:absolute;visibility:hidden;", 
            /^range$/.test(e) && u.style.WebkitAppearance !== c ? (q.appendChild(u), f = b.defaultView, 
            d = f.getComputedStyle && "textfield" !== f.getComputedStyle(u, null).WebkitAppearance && 0 !== u.offsetHeight, 
            q.removeChild(u)) : /^(search|tel)$/.test(e) || (d = /^(url|email)$/.test(e) ? u.checkValidity && u.checkValidity() === !1 : u.value != v)), 
            D[a[g]] = !!d;
            return D;
        }("search tel url email datetime date month week time datetime-local number range color".split(" "));
    }
    var l, m, n = "2.8.3", o = {}, p = !0, q = b.documentElement, r = "modernizr", s = b.createElement(r), t = s.style, u = b.createElement("input"), v = ":)", w = {}.toString, x = " -webkit- -moz- -o- -ms- ".split(" "), y = "Webkit Moz O ms", z = y.split(" "), A = y.toLowerCase().split(" "), B = {
        svg: "http://www.w3.org/2000/svg"
    }, C = {}, D = {}, E = {}, F = [], G = F.slice, H = function(a, c, d, e) {
        var f, g, h, i, j = b.createElement("div"), k = b.body, l = k || b.createElement("body");
        if (parseInt(d, 10)) for (;d--; ) h = b.createElement("div"), h.id = e ? e[d] : r + (d + 1), 
        j.appendChild(h);
        return f = [ "&#173;", '<style id="s', r, '">', a, "</style>" ].join(""), j.id = r, 
        (k ? j : l).innerHTML += f, l.appendChild(j), k || (l.style.background = "", l.style.overflow = "hidden", 
        i = q.style.overflow, q.style.overflow = "hidden", q.appendChild(l)), g = c(j, a), 
        k ? j.parentNode.removeChild(j) : (l.parentNode.removeChild(l), q.style.overflow = i), 
        !!g;
    }, I = function(b) {
        var c = a.matchMedia || a.msMatchMedia;
        if (c) return c(b) && c(b).matches || !1;
        var d;
        return H("@media " + b + " { #" + r + " { position: absolute; } }", function(b) {
            d = "absolute" == (a.getComputedStyle ? getComputedStyle(b, null) : b.currentStyle).position;
        }), d;
    }, J = function() {
        function a(a, e) {
            e = e || b.createElement(d[a] || "div"), a = "on" + a;
            var g = a in e;
            return g || (e.setAttribute || (e = b.createElement("div")), e.setAttribute && e.removeAttribute && (e.setAttribute(a, ""), 
            g = f(e[a], "function"), f(e[a], "undefined") || (e[a] = c), e.removeAttribute(a))), 
            e = null, g;
        }
        var d = {
            select: "input",
            change: "input",
            submit: "form",
            reset: "form",
            error: "img",
            load: "img",
            abort: "img"
        };
        return a;
    }(), K = {}.hasOwnProperty;
    m = f(K, "undefined") || f(K.call, "undefined") ? function(a, b) {
        return b in a && f(a.constructor.prototype[b], "undefined");
    } : function(a, b) {
        return K.call(a, b);
    }, Function.prototype.bind || (Function.prototype.bind = function(a) {
        var b = this;
        if ("function" != typeof b) throw new TypeError();
        var c = G.call(arguments, 1), d = function() {
            if (this instanceof d) {
                var e = function() {};
                e.prototype = b.prototype;
                var f = new e(), g = b.apply(f, c.concat(G.call(arguments)));
                return Object(g) === g ? g : f;
            }
            return b.apply(a, c.concat(G.call(arguments)));
        };
        return d;
    }), C.flexbox = function() {
        return j("flexWrap");
    }, C.flexboxlegacy = function() {
        return j("boxDirection");
    }, C.canvas = function() {
        var a = b.createElement("canvas");
        return !(!a.getContext || !a.getContext("2d"));
    }, C.canvastext = function() {
        return !(!o.canvas || !f(b.createElement("canvas").getContext("2d").fillText, "function"));
    }, C.webgl = function() {
        return !!a.WebGLRenderingContext;
    }, C.touch = function() {
        var c;
        return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : H([ "@media (", x.join("touch-enabled),("), r, ")", "{#modernizr{top:9px;position:absolute}}" ].join(""), function(a) {
            c = 9 === a.offsetTop;
        }), c;
    }, C.geolocation = function() {
        return "geolocation" in navigator;
    }, C.postmessage = function() {
        return !!a.postMessage;
    }, C.websqldatabase = function() {
        return !!a.openDatabase;
    }, C.indexedDB = function() {
        return !!j("indexedDB", a);
    }, C.hashchange = function() {
        return J("hashchange", a) && (b.documentMode === c || b.documentMode > 7);
    }, C.history = function() {
        return !(!a.history || !history.pushState);
    }, C.draganddrop = function() {
        var a = b.createElement("div");
        return "draggable" in a || "ondragstart" in a && "ondrop" in a;
    }, C.websockets = function() {
        return "WebSocket" in a || "MozWebSocket" in a;
    }, C.rgba = function() {
        return d("background-color:rgba(150,255,150,.5)"), g(t.backgroundColor, "rgba");
    }, C.hsla = function() {
        return d("background-color:hsla(120,40%,100%,.5)"), g(t.backgroundColor, "rgba") || g(t.backgroundColor, "hsla");
    }, C.multiplebgs = function() {
        return d("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(t.background);
    }, C.backgroundsize = function() {
        return j("backgroundSize");
    }, C.borderimage = function() {
        return j("borderImage");
    }, C.borderradius = function() {
        return j("borderRadius");
    }, C.boxshadow = function() {
        return j("boxShadow");
    }, C.textshadow = function() {
        return "" === b.createElement("div").style.textShadow;
    }, C.opacity = function() {
        return e("opacity:.55"), /^0.55$/.test(t.opacity);
    }, C.cssanimations = function() {
        return j("animationName");
    }, C.csscolumns = function() {
        return j("columnCount");
    }, C.cssgradients = function() {
        var a = "background-image:", b = "gradient(linear,left top,right bottom,from(#9f9),to(white));", c = "linear-gradient(left top,#9f9, white);";
        return d((a + "-webkit- ".split(" ").join(b + a) + x.join(c + a)).slice(0, -a.length)), 
        g(t.backgroundImage, "gradient");
    }, C.cssreflections = function() {
        return j("boxReflect");
    }, C.csstransforms = function() {
        return !!j("transform");
    }, C.csstransforms3d = function() {
        var a = !!j("perspective");
        return a && "webkitPerspective" in q.style && H("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(b, c) {
            a = 9 === b.offsetLeft && 3 === b.offsetHeight;
        }), a;
    }, C.csstransitions = function() {
        return j("transition");
    }, C.fontface = function() {
        var a;
        return H('@font-face {font-family:"font";src:url("https://")}', function(c, d) {
            var e = b.getElementById("smodernizr"), f = e.sheet || e.styleSheet, g = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : "";
            a = /src/i.test(g) && 0 === g.indexOf(d.split(" ")[0]);
        }), a;
    }, C.generatedcontent = function() {
        var a;
        return H([ "#", r, "{font:0/0 a}#", r, ':after{content:"', v, '";visibility:hidden;font:3px/1 a}' ].join(""), function(b) {
            a = b.offsetHeight >= 3;
        }), a;
    }, C.video = function() {
        var a = b.createElement("video"), c = !1;
        try {
            (c = !!a.canPlayType) && (c = new Boolean(c), c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), 
            c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""));
        } catch (d) {}
        return c;
    }, C.audio = function() {
        var a = b.createElement("audio"), c = !1;
        try {
            (c = !!a.canPlayType) && (c = new Boolean(c), c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), 
            c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""), c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), 
            c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, ""));
        } catch (d) {}
        return c;
    }, C.localstorage = function() {
        try {
            return localStorage.setItem(r, r), localStorage.removeItem(r), !0;
        } catch (a) {
            return !1;
        }
    }, C.sessionstorage = function() {
        try {
            return sessionStorage.setItem(r, r), sessionStorage.removeItem(r), !0;
        } catch (a) {
            return !1;
        }
    }, C.webworkers = function() {
        return !!a.Worker;
    }, C.applicationcache = function() {
        return !!a.applicationCache;
    }, C.svg = function() {
        return !!b.createElementNS && !!b.createElementNS(B.svg, "svg").createSVGRect;
    }, C.inlinesvg = function() {
        var a = b.createElement("div");
        return a.innerHTML = "<svg/>", (a.firstChild && a.firstChild.namespaceURI) == B.svg;
    }, C.smil = function() {
        return !!b.createElementNS && /SVGAnimate/.test(w.call(b.createElementNS(B.svg, "animate")));
    }, C.svgclippaths = function() {
        return !!b.createElementNS && /SVGClipPath/.test(w.call(b.createElementNS(B.svg, "clipPath")));
    };
    for (var L in C) m(C, L) && (l = L.toLowerCase(), o[l] = C[L](), F.push((o[l] ? "" : "no-") + l));
    return o.input || k(), o.addTest = function(a, b) {
        if ("object" == typeof a) for (var d in a) m(a, d) && o.addTest(d, a[d]); else {
            if (a = a.toLowerCase(), o[a] !== c) return o;
            b = "function" == typeof b ? b() : b, "undefined" != typeof p && p && (q.className += " " + (b ? "" : "no-") + a), 
            o[a] = b;
        }
        return o;
    }, d(""), s = u = null, function(a, b) {
        function c(a, b) {
            var c = a.createElement("p"), d = a.getElementsByTagName("head")[0] || a.documentElement;
            return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild);
        }
        function d() {
            var a = s.elements;
            return "string" == typeof a ? a.split(" ") : a;
        }
        function e(a) {
            var b = r[a[p]];
            return b || (b = {}, q++, a[p] = q, r[q] = b), b;
        }
        function f(a, c, d) {
            if (c || (c = b), k) return c.createElement(a);
            d || (d = e(c));
            var f;
            return f = d.cache[a] ? d.cache[a].cloneNode() : o.test(a) ? (d.cache[a] = d.createElem(a)).cloneNode() : d.createElem(a), 
            !f.canHaveChildren || n.test(a) || f.tagUrn ? f : d.frag.appendChild(f);
        }
        function g(a, c) {
            if (a || (a = b), k) return a.createDocumentFragment();
            c = c || e(a);
            for (var f = c.frag.cloneNode(), g = 0, h = d(), i = h.length; i > g; g++) f.createElement(h[g]);
            return f;
        }
        function h(a, b) {
            b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, 
            b.frag = b.createFrag()), a.createElement = function(c) {
                return s.shivMethods ? f(c, a, b) : b.createElem(c);
            }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + d().join().replace(/[\w\-]+/g, function(a) {
                return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")';
            }) + ");return n}")(s, b.frag);
        }
        function i(a) {
            a || (a = b);
            var d = e(a);
            return !s.shivCSS || j || d.hasCSS || (d.hasCSS = !!c(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), 
            k || h(a, d), a;
        }
        var j, k, l = "3.7.0", m = a.html5 || {}, n = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, o = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, p = "_html5shiv", q = 0, r = {};
        !function() {
            try {
                var a = b.createElement("a");
                a.innerHTML = "<xyz></xyz>", j = "hidden" in a, k = 1 == a.childNodes.length || function() {
                    b.createElement("a");
                    var a = b.createDocumentFragment();
                    return "undefined" == typeof a.cloneNode || "undefined" == typeof a.createDocumentFragment || "undefined" == typeof a.createElement;
                }();
            } catch (c) {
                j = !0, k = !0;
            }
        }();
        var s = {
            elements: m.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
            version: l,
            shivCSS: m.shivCSS !== !1,
            supportsUnknownElements: k,
            shivMethods: m.shivMethods !== !1,
            type: "default",
            shivDocument: i,
            createElement: f,
            createDocumentFragment: g
        };
        a.html5 = s, i(b);
    }(this, b), o._version = n, o._prefixes = x, o._domPrefixes = A, o._cssomPrefixes = z, 
    o.mq = I, o.hasEvent = J, o.testProp = function(a) {
        return h([ a ]);
    }, o.testAllProps = j, o.testStyles = H, o.prefixed = function(a, b, c) {
        return b ? j(a, b, c) : j(a, "pfx");
    }, q.className = q.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (p ? " js " + F.join(" ") : ""), 
    o;
}(this, this.document), function() {
    if (document.querySelectorAll && !$("html").hasClass("lt-ie9")) {
        var a, b, c, d, e, f, g, h, i, j;
        b = window.device, a = {}, window.device = a, d = window.document.documentElement, 
        j = window.navigator.userAgent.toLowerCase(), a.ios = function() {
            return a.iphone() || a.ipod() || a.ipad();
        }, a.iphone = function() {
            return e("iphone");
        }, a.ipod = function() {
            return e("ipod");
        }, a.ipad = function() {
            return e("ipad");
        }, a.android = function() {
            return e("android");
        }, a.androidPhone = function() {
            return a.android() && e("mobile");
        }, a.androidTablet = function() {
            return a.android() && !e("mobile");
        }, a.blackberry = function() {
            return e("blackberry") || e("bb10") || e("rim");
        }, a.blackberryPhone = function() {
            return a.blackberry() && !e("tablet");
        }, a.blackberryTablet = function() {
            return a.blackberry() && e("tablet");
        }, a.windows = function() {
            return e("windows");
        }, a.windowsPhone = function() {
            return a.windows() && e("phone");
        }, a.windowsTablet = function() {
            return a.windows() && e("touch") && !a.windowsPhone();
        }, a.fxos = function() {
            return (e("(mobile;") || e("(tablet;")) && e("; rv:");
        }, a.fxosPhone = function() {
            return a.fxos() && e("mobile");
        }, a.fxosTablet = function() {
            return a.fxos() && e("tablet");
        }, a.meego = function() {
            return e("meego");
        }, a.cordova = function() {
            return window.cordova && "file:" === location.protocol;
        }, a.nodeWebkit = function() {
            return "object" == typeof window.process;
        }, a.mobile = function() {
            return a.androidPhone() || a.iphone() || a.ipod() || a.windowsPhone() || a.blackberryPhone() || a.fxosPhone() || a.meego();
        }, a.tablet = function() {
            return a.ipad() || a.androidTablet() || a.blackberryTablet() || a.windowsTablet() || a.fxosTablet();
        }, a.desktop = function() {
            return !a.tablet() && !a.mobile();
        }, a.television = function() {
            var a;
            for (television = [ "googletv", "viera", "smarttv", "internet.tv", "netcast", "nettv", "appletv", "boxee", "kylo", "roku", "dlnadoc", "roku", "pov_tv", "hbbtv", "ce-html" ], 
            a = 0; a < television.length; ) {
                if (e(television[a])) return !0;
                a++;
            }
            return !1;
        }, a.portrait = function() {
            return window.innerHeight / window.innerWidth > 1;
        }, a.landscape = function() {
            return window.innerHeight / window.innerWidth < 1;
        }, a.noConflict = function() {
            return window.device = b, this;
        }, e = function(a) {
            return -1 !== j.indexOf(a);
        }, g = function(a) {
            var b;
            return b = new RegExp(a, "i"), d.className.match(b);
        }, c = function(a) {
            g(a) || (d.className = d.className.trim() + " " + a);
        }, i = function(a) {
            g(a) && (d.className = d.className.replace(" " + a, ""));
        }, a.ios() ? a.ipad() ? c("ios ipad tablet") : a.iphone() ? c("ios iphone mobile") : a.ipod() && c("ios ipod mobile") : a.android() ? c(a.androidTablet() ? "android tablet" : "android mobile") : a.blackberry() ? c(a.blackberryTablet() ? "blackberry tablet" : "blackberry mobile") : a.windows() ? c(a.windowsTablet() ? "windows tablet" : a.windowsPhone() ? "windows mobile" : "desktop") : a.fxos() ? c(a.fxosTablet() ? "fxos tablet" : "fxos mobile") : a.meego() ? c("meego mobile") : a.nodeWebkit() ? c("node-webkit") : a.television() ? c("television") : a.desktop() && c("desktop"), 
        a.cordova() && c("cordova"), f = function() {
            a.landscape() ? (i("portrait"), c("landscape")) : (i("landscape"), c("portrait"));
        }, h = window.hasOwnProperty("onorientationchange") ? "orientationchange" : "resize", 
        window.addEventListener ? window.addEventListener(h, f, !1) : window.attachEvent ? window.attachEvent(h, f) : window[h] = f, 
        f(), "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
            return a;
        }) : "undefined" != typeof module && module.exports ? module.exports = a : window.device = a;
    }
}.call(this);

var config = {
    application: {
        touch: Modernizr.touch && !device.desktop(),
        debug: !0
    },
    accessibility: {
        font: {
            range: 3
        }
    },
    forms: {
        validation: !0,
        uploadlimit: 3
    },
    search: {
        view: "list",
        display: "full",
        count: 10,
        pagination: !1
    },
    tables: {
        responsive: !0
    },
    notification: {
        tone: "default",
        delay: 5e3
    },
    tooltip: {
        position: "center",
        bound: !0
    },
    slider: {
        arrows: !0,
        bullets: !0,
        slideshow: !0,
        duration: 500,
        interval: 5e3,
        threshold: 10,
        animation: "slide"
    },
    twitter: {
        widgetId: "492660537293938688",
        startAt: 0,
        maxTweets: 3,
        enableLinks: !0,
        showUser: !0,
        showTime: !0,
        showRetweet: !1,
        showFollow: !1,
        showInteraction: !1
    }
}, cookieSystem;

window.console || (console = {
    log: function() {}
});

var loadScript = function(a, b) {
    var c = document.createElement("script");
    c.type = "text/javascript", c.src = a, b && (c.onload = b), document.body.appendChild(c);
}, initSVGs = function() {
    if (!$("html").hasClass("lt-ie9") && $("img.svg").length) {
        var a = 0;
        $("img.svg").each(function(b) {
            var c = $(this), d = c.attr("id"), e = c.attr("class"), f = c.attr("src");
            a = b, $.get(f, function(a) {
                var b = $(a).find("svg");
                "undefined" != typeof d && (b = b.attr("id", d)), "undefined" != typeof e && (b = b.attr("class", e + " replaced-svg")), 
                b.find("*").removeAttr("style"), b = b.removeAttr("xmlns:a"), c.replaceWith(b);
            }, "xml");
        }), config.application.debug && console.log("System :: SVG Injection @ " + a + " images");
    }
}, randomizeInteger = function(a, b) {
    return Math.floor(Math.random() * (b - a)) + a;
}, popupWindow = function(a, b, c, d) {
    var e = screen.width / 2 - c / 2, f = screen.height / 2 - d / 2;
    return window.open(a, b, "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + c + ", height=" + d + ", top=" + f + ", left=" + e);
}, highlight = function(a, b) {
    var c = RegExp(b, "gi");
    a.each(function() {
        $(this).filter(function() {
            return c.test($(this).text());
        }).html(function() {
            return b ? $(this).text().replace(c, '<span class="highlight">$&</span>') : $(this).text();
        });
    });
}, unhighlight = function(a) {
    a.find("span.highlight").replaceWith(function() {
        return $(this).text();
    });
}, URLQueryObject = function() {
    var a = "";
    return window.onpopstate = function() {
        var b, c = /\+/g, d = /([^&=]+)=?([^&]*)/g, e = function(a) {
            return decodeURIComponent(a.replace(c, " "));
        }, f = window.location.search.substring(1);
        for (a = {}; b == d.exec(f); ) a[e(b[1])] = e(b[2]);
    }, a;
}, returnedData, dataObject = "", dataRequest = function(a, b, c) {
    config.application.debug && console.log("AJAX ~~ Request"), request = $.ajax({
        url: a,
        type: b,
        data: "POST" == b ? dataObject : "",
        dataType: "JSON",
        success: function(a) {
            config.application.debug && console.log("AJAX ~~ Success"), "undefined" != typeof c && c(a);
        },
        error: function(a, b, c) {
            config.application.debug && console.log("AJAX ~~ Error");
        }
    });
}, anchorClicked, initLinks = function() {
    $(document).on("click", "a[href^='#']", function(a) {
        var b = $(this).attr("href");
        if (a.preventDefault(), "#" === b) config.application.debug && console.log("System :: Link blocked"); else if ($($.attr(this, "href")).length) return anchorClicked = !0, 
        $("html, body").animate({
            scrollTop: $($.attr(this, "href")).offset().top - 90
        }, {
            duration: 1e3,
            queue: !1,
            complete: function() {
                anchorClicked = !1;
            }
        }), !1;
    }), config.application.debug && console.log("System :: Links");
}, scrollProgress = function() {
    var a = 100 * pageTop / ($(document).height() - $(window).height());
    $(".scroll-progress").width(a + "%");
}, initFramework = function() {
    isWideScreen = $(window).width() > 768, config.application.touch && (FastClick.attach(document.body), 
    $(".map-canvas").addClass("map-mobile")), config.application.debug && (console.log(":: means DOM.ready"), 
    console.log("~~ means Async"), console.log("•• means Complete"), console.log("== means User Action"), 
    console.log(" ")), initKonami(buildKonami), initSVGs(), initCookies(), initLinks(), 
    initTables(), scrollProgress(), initFontSizeControls(), initOverlays(), initNotifications(), 
    initTooltips(), initSliders(), initMap(), initTwitter(), initVideo(), initSearch(), 
    initAutocomplete(), initTagClouds(), initForm(), initDropdowns(), initValidation();
    var a = new Date().getTime();
    config.application.debug && console.log("Done •• Matter in " + (new Date().getTime() - a) + " milliseconds");
}, isWideScreen, pageTop, pageBottom;

$(document).ready(initFramework), $(window).on("load", function() {
    $("body").removeClass("preload");
}), $(window).on("resize", function() {
    isWideScreen = $(window).width() > 768;
}), $(window).on("scroll", function() {
    pageTop = $(document).scrollTop(), pageBottom = pageTop + $(window).height(), scrollProgress();
}), $(window).load(function() {
    $("input[data-calendar='true']").datepicker({
        autoclose: !0,
        format: "dd/mm/yyyy",
        todayBtn: "linked",
        todayHighlight: !0,
        startDate: new Date()
    }), $(".input-daterange").datepicker({
        autoclose: !0,
        format: "dd/mm/yyyy",
        todayBtn: "linked",
        todayHighlight: !0,
        startDate: new Date()
    });
});

var dateFormat = function() {
    var a = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g, b = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g, c = /[^-+\dA-Z]/g, d = function(a, b) {
        for (a = String(a), b = b || 2; a.length < b; ) a = "0" + a;
        return a;
    };
    return function(e, f, g) {
        var h = dateFormat;
        1 != arguments.length || "[object String]" != Object.prototype.toString.call(e) || /\d/.test(e) || (f = e, 
        e = void 0), e = e ? new Date(e) : new Date(), f = String(h.masks[f] || f || h.masks["default"]), 
        "UTC:" == f.slice(0, 4) && (f = f.slice(4), g = !0);
        var i = g ? "getUTC" : "get", j = e[i + "Date"](), k = e[i + "Day"](), l = e[i + "Month"](), m = e[i + "FullYear"](), n = e[i + "Hours"](), o = e[i + "Minutes"](), p = e[i + "Seconds"](), q = e[i + "Milliseconds"](), r = g ? 0 : e.getTimezoneOffset(), s = {
            d: j,
            dd: d(j),
            ddd: h.i18n.dayNames[k],
            dddd: h.i18n.dayNames[k + 7],
            m: l + 1,
            mm: d(l + 1),
            mmm: h.i18n.monthNames[l],
            mmmm: h.i18n.monthNames[l + 12],
            yy: String(m).slice(2),
            yyyy: m,
            h: n % 12 || 12,
            hh: d(n % 12 || 12),
            H: n,
            HH: d(n),
            M: o,
            MM: d(o),
            s: p,
            ss: d(p),
            l: d(q, 3),
            L: d(q > 99 ? Math.round(q / 10) : q),
            t: 12 > n ? "a" : "p",
            tt: 12 > n ? "am" : "pm",
            T: 12 > n ? "A" : "P",
            TT: 12 > n ? "AM" : "PM",
            Z: g ? "UTC" : (String(e).match(b) || [ "" ]).pop().replace(c, ""),
            o: (r > 0 ? "-" : "+") + d(100 * Math.floor(Math.abs(r) / 60) + Math.abs(r) % 60, 4),
            S: [ "th", "st", "nd", "rd" ][j % 10 > 3 ? 0 : (j % 100 - j % 10 != 10) * j % 10]
        };
        return f.replace(a, function(a) {
            return a in s ? s[a] : a.slice(1, a.length - 1);
        });
    };
}();

dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
}, dateFormat.i18n = {
    dayNames: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
    monthNames: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
}, Date.prototype.format = function(a, b) {
    return dateFormat(this, a, b);
}, window.hasOwnProperty = window.hasOwnProperty || Object.prototype.hasOwnProperty, 
"function" != typeof String.prototype.trim && (String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
}), Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}, NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for (var a = 0, b = this.length; b > a; a++) this[a] && this[a].parentElement && this[a].parentElement.removeChild(this[a]);
}, Array.prototype.indexOf || (Array.prototype.indexOf = function(a) {
    "use strict";
    if (null == this) throw new TypeError();
    var b = Object(this), c = b.length >>> 0;
    if (0 === c) return -1;
    var d = 0;
    if (arguments.length > 1 && (d = Number(arguments[1]), d != d ? d = 0 : 0 !== d && d != 1 / 0 && d != -(1 / 0) && (d = (d > 0 || -1) * Math.floor(Math.abs(d)))), 
    d >= c) return -1;
    for (var e = d >= 0 ? d : Math.max(c - Math.abs(d), 0); c > e; e++) if (e in b && b[e] === a) return e;
    return -1;
}), Array.prototype.forEach || (Array.prototype.forEach = function(a, b) {
    var c, d, e, f, g, h = Object(this), i = h.length, j = i >>> 0;
    if ("function" != typeof a) throw new TypeError();
    for (c = b ? b : void 0, d = 0; j > d; ) e = d.toString(), f = h.hasOwnProperty(e), 
    f && (g = h[e], a.call(c, g, d, h)), d += 1;
    return void 0;
}), Array.prototype.clean = function(a) {
    for (var b = 0; b < this.length; b++) this[b] == a && (this.splice(b, 1), b--);
    return this;
}, Array.prototype.uniques = function() {
    return this.reduce(function(a, b) {
        return a.indexOf(b) < 0 && a.push(b), a;
    }, []);
}, Array.prototype.contains = function(a) {
    for (var b = 0; b < this.length; b++) if (this[b] === a) return !0;
    return !1;
}, Array.prototype.duplicates = function() {
    var a, b, c = this.length, d = [];
    for (a = 0; c > a; a++) for (b = 0; c > b; b++) this[a] != this[b] || a == b || d.contains(this[a]) || d.push(this[a]);
    return d;
}, Array.prototype.reduce = function() {
    for (var a = [], b = 0; b < this.length; b++) for (var c = 0; c < this[b].length; c++) a.push(this[b][c]);
    return a;
};

var initValidation = function() {
    if (config.forms.validation && $("[data-validation]").length) {
        var a = function(a) {
            var b = 0;
            if (!a) return b;
            for (var c = {}, d = 0; d < a.length; d++) c[a[d]] = (c[a[d]] || 0) + 1, b += 5 / c[a[d]];
            var e = {
                digits: /\d/.test(a),
                lower: /[a-z]/.test(a),
                upper: /[A-Z]/.test(a),
                nonWords: /\W/.test(a)
            };
            variationCount = 0;
            for (var f in e) variationCount += e[f] === !0 ? 1 : 0;
            return b += 10 * (variationCount - 1), parseInt(b, 10);
        }, b = function(a) {
            var b = {
                amex: /^3[47][0-9]{13}$/,
                dankort: /^(5019)\d+$/,
                diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
                discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
                electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
                interpayment: /^(636)\d+$/,
                jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
                maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
                mastercard: /^5[1-5][0-9]{14}$/,
                unionpay: /^(62|88)\d+$/,
                visa: /^4[0-9]{12}(?:[0-9]{3})?$/
            };
            return b.amex.test(a) ? "american-express" : b.dankort.test(a) ? "dankort" : b.diners.test(a) ? "diners" : b.discover.test(a) ? "discover" : b.electron.test(a) ? "visa-electron" : b.interpayment.test(a) ? "interpayment" : b.jcb.test(a) ? "jcb" : b.maestro.test(a) ? "maestro" : b.mastercard.test(a) ? "mastercard" : b.unionpay.test(a) ? "unionpay" : b.visa.test(a) ? "visa" : "generic";
        }, c = function(c, d, e) {
            switch (config.application.debug && console.log("Validation :: " + d), c.removeClass("invalid").removeClass("valid"), 
            d) {
              case "text":
                c.addClass("" !== e ? "valid" : "invalid");
                break;

              case "number":
                check = /\D+/, c.addClass("" !== e && e.length == e.replace(check, "").length ? "valid" : "invalid");
                break;

              case "email":
                check = /^\S+@\S+\.\S+$/, c.addClass("" !== e && check.test(e) ? "valid" : "invalid");
                break;

              case "password":
                c.addClass(a(e) >= 30 ? "valid" : "invalid");
                break;

              case "match":
                d = c.attr("type");
                var f = c.parents().find("input[type='" + d + "']");
                check = f.val(), c.addClass(f.hasClass("valid") && e === check ? "valid" : "invalid");
                break;

              case "card":
                c.addClass("" !== e ? "valid" : "invalid"), $(".card-wrapper .card").attr("src", "img/icons/payment/cards/" + b(e) + ".png");
                break;

              case "date":
                check = /^\d{2}\/\d{2}\/\d{4}$/, c.addClass("" !== e && check.test(e) ? "valid" : "invalid");
                break;

              case "select":
                c.addClass("" !== e ? "valid" : "invalid"), c.parents(".dropdown-wrapper").children(".dropdown-current").attr("class", "dropdown-current " + c.attr("class"));
                break;

              case "selectgroup":
                group = c.data("validation-group");
                var g = $("select[data-validation-group='" + group + "']"), h = {};
                h[group] = [], g.removeClass("invalid").each(function() {
                    var a = "" !== e;
                    h[group].push(a);
                }), g.addClass(-1 != h[group].indexOf(!0) ? "valid" : "invalid"), g.parents(".dropdown-wrapper").children(".dropdown-current").attr("class", "dropdown-current " + c.attr("class"));
                break;

              case "checkbox":
                c.addClass(c.prop("checked") ? "valid" : "invalid");
                break;

              case "radio":
                group = c.attr("name");
                var i = $("input[type='radio'][name='" + group + "']"), j = {};
                j[group] = [], i.removeClass("invalid").each(function() {
                    var a = $(this).prop("checked");
                    j[group].push(a);
                }), i.addClass(-1 != j[group].indexOf(!0) ? "valid" : "invalid");
                break;

              default:
                var k = [];
                c.find("[required]").each(function() {
                    k.push($(this).hasClass("valid") ? !0 : !1);
                }), k.indexOf(!1) < 0 ? (c.addClass("submitted").addClass("valid"), c.find("[data-validation='date']").datepicker("remove"), 
                c.find("input, select, textarea").attr("readonly", "readonly"), c.find("button").attr("readonly", "readonly"), 
                initDropdowns(), c.find(".form-loader").hide(), c.find(".form-done").show(), notify("Form submitted successfully.", "success", 3e3)) : (c.removeClass("valid"), 
                c.find("[required]:not('.valid')").addClass("invalid"), c.find(".form-loader").hide(), 
                c.find("button").show(), notify("Form not submitted. Please review.", "failure", 3e3));
            }
        }, d = function(c, d, e) {
            switch (console.log("Validating keypress for " + d), d) {
              case "password":
                c.next(".password-meter-mask").width(a(e) + "%").find(".password-meter").width(c.outerWidth());
                break;

              case "card":
                $(".card-wrapper .card").attr("src", "img/icons/payment/cards/" + b(e) + ".png");
            }
        };
        $("input[data-validate-key]").on("keyup", function() {
            var a = $(this), b = a.attr("data-validation"), c = a.val();
            d(a, b, c);
        }), $("form[data-validation]").each(function() {
            var a = $(this);
            a.find("[required]").each(function() {
                var a = $(this);
                "checkbox" === a.attr("type") || "radio" === a.attr("type") ? a.on("change", function() {
                    var b = a.attr("data-validation"), d = a.val();
                    c(a, b, d);
                }).next("label").append("<span class='indicator-required'></span>") : a.on("keyup", function() {
                    a.removeClass("valid").removeClass("invalid");
                }).on("focus", function() {
                    var b = a.attr("data-validation"), d = a.val();
                    "select" == b && a.next(".dropdown-current").removeClass("valid").removeClass("invalid"), 
                    $(this).hasClass("invalid") && c(a, b, d);
                }).on("blur", function() {
                    setTimeout(function() {
                        var b = a.attr("data-validation"), d = a.val();
                        c(a, b, d);
                    }, 200);
                }).prev("label").append("<span class='indicator-required'></span>");
            }), a.on("submit", function(b) {
                if (a.find("[required]").each(function() {
                    var a = $(this), b = a.attr("data-validation"), d = a.val();
                    c(a, b, d);
                }), !a.hasClass("submitted")) {
                    var d = a.attr("data-validation"), e = "";
                    a.find("button").hide(), a.find(".form-loader").show(), b.preventDefault(), c(a, d, e);
                }
            });
        }), config.application.debug && console.log("Form :: Validation");
    }
};

!function(a, b) {
    function c() {
        return new Date(Date.UTC.apply(Date, arguments));
    }
    function d() {
        var a = new Date();
        return c(a.getFullYear(), a.getMonth(), a.getDate());
    }
    function e(a) {
        return function() {
            return this[a].apply(this, arguments);
        };
    }
    function f(b, c) {
        function d(a, b) {
            return b.toLowerCase();
        }
        var e, f = a(b).data(), g = {}, h = new RegExp("^" + c.toLowerCase() + "([A-Z])");
        c = new RegExp("^" + c.toLowerCase());
        for (var i in f) c.test(i) && (e = i.replace(h, d), g[e] = f[i]);
        return g;
    }
    function g(b) {
        var c = {};
        if (o[b] || (b = b.split("-")[0], o[b])) {
            var d = o[b];
            return a.each(n, function(a, b) {
                b in d && (c[b] = d[b]);
            }), c;
        }
    }
    var h = a(window), i = function() {
        var b = {
            get: function(a) {
                return this.slice(a)[0];
            },
            contains: function(a) {
                for (var b = a && a.valueOf(), c = 0, d = this.length; d > c; c++) if (this[c].valueOf() === b) return c;
                return -1;
            },
            remove: function(a) {
                this.splice(a, 1);
            },
            replace: function(b) {
                b && (a.isArray(b) || (b = [ b ]), this.clear(), this.push.apply(this, b));
            },
            clear: function() {
                this.splice(0);
            },
            copy: function() {
                var a = new i();
                return a.replace(this), a;
            }
        };
        return function() {
            var c = [];
            return c.push.apply(c, arguments), a.extend(c, b), c;
        };
    }(), j = function(b, c) {
        this.dates = new i(), this.viewDate = d(), this.focusDate = null, this._process_options(c), 
        this.element = a(b), this.isInline = !1, this.isInput = this.element.is("input"), 
        this.component = this.element.is(".date") ? this.element.find(".add-on, .input-group-addon, .btn") : !1, 
        this.hasInput = this.component && this.element.find("input").length, this.component && 0 === this.component.length && (this.component = !1), 
        this.picker = a(p.template), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), 
        this.o.rtl && this.picker.addClass("datepicker-rtl"), this.viewMode = this.o.startView, 
        this.o.calendarWeeks && this.picker.find("tfoot th.today").attr("colspan", function(a, b) {
            return parseInt(b) + 1;
        }), this._allow_update = !1, this.setStartDate(this._o.startDate), this.setEndDate(this._o.endDate), 
        this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled), this.fillDow(), this.fillMonths(), 
        this._allow_update = !0, this.update(), this.showMode(), this.isInline && this.show();
    };
    j.prototype = {
        constructor: j,
        _process_options: function(b) {
            this._o = a.extend({}, this._o, b);
            var c = this.o = a.extend({}, this._o), d = c.language;
            switch (o[d] || (d = d.split("-")[0], o[d] || (d = m.language)), c.language = d, 
            c.startView) {
              case 2:
              case "decade":
                c.startView = 2;
                break;

              case 1:
              case "year":
                c.startView = 1;
                break;

              default:
                c.startView = 0;
            }
            switch (c.minViewMode) {
              case 1:
              case "months":
                c.minViewMode = 1;
                break;

              case 2:
              case "years":
                c.minViewMode = 2;
                break;

              default:
                c.minViewMode = 0;
            }
            c.startView = Math.max(c.startView, c.minViewMode), c.multidate !== !0 && (c.multidate = Number(c.multidate) || !1, 
            c.multidate = c.multidate !== !1 ? Math.max(0, c.multidate) : 1), c.multidateSeparator = String(c.multidateSeparator), 
            c.weekStart %= 7, c.weekEnd = (c.weekStart + 6) % 7;
            var e = p.parseFormat(c.format);
            c.startDate !== -(1 / 0) && (c.startDate = c.startDate ? c.startDate instanceof Date ? this._local_to_utc(this._zero_time(c.startDate)) : p.parseDate(c.startDate, e, c.language) : -(1 / 0)), 
            c.endDate !== 1 / 0 && (c.endDate = c.endDate ? c.endDate instanceof Date ? this._local_to_utc(this._zero_time(c.endDate)) : p.parseDate(c.endDate, e, c.language) : 1 / 0), 
            c.daysOfWeekDisabled = c.daysOfWeekDisabled || [], a.isArray(c.daysOfWeekDisabled) || (c.daysOfWeekDisabled = c.daysOfWeekDisabled.split(/[,\s]*/)), 
            c.daysOfWeekDisabled = a.map(c.daysOfWeekDisabled, function(a) {
                return parseInt(a, 10);
            });
            var f = String(c.orientation).toLowerCase().split(/\s+/g), g = c.orientation.toLowerCase();
            if (f = a.grep(f, function(a) {
                return /^auto|left|right|top|bottom$/.test(a);
            }), c.orientation = {
                x: "auto",
                y: "auto"
            }, g && "auto" !== g) if (1 === f.length) switch (f[0]) {
              case "top":
              case "bottom":
                c.orientation.y = f[0];
                break;

              case "left":
              case "right":
                c.orientation.x = f[0];
            } else g = a.grep(f, function(a) {
                return /^left|right$/.test(a);
            }), c.orientation.x = g[0] || "auto", g = a.grep(f, function(a) {
                return /^top|bottom$/.test(a);
            }), c.orientation.y = g[0] || "auto"; else ;
        },
        _events: [],
        _secondaryEvents: [],
        _applyEvents: function(a) {
            for (var c, d, e, f = 0; f < a.length; f++) c = a[f][0], 2 === a[f].length ? (d = b, 
            e = a[f][1]) : 3 === a[f].length && (d = a[f][1], e = a[f][2]), c.on(e, d);
        },
        _unapplyEvents: function(a) {
            for (var c, d, e, f = 0; f < a.length; f++) c = a[f][0], 2 === a[f].length ? (e = b, 
            d = a[f][1]) : 3 === a[f].length && (e = a[f][1], d = a[f][2]), c.off(d, e);
        },
        _buildEvents: function() {
            this.isInput ? this._events = [ [ this.element, {
                focus: a.proxy(this.show, this),
                keyup: a.proxy(function(b) {
                    -1 === a.inArray(b.keyCode, [ 27, 37, 39, 38, 40, 32, 13, 9 ]) && this.update();
                }, this),
                keydown: a.proxy(this.keydown, this)
            } ] ] : this.component && this.hasInput ? this._events = [ [ this.element.find("input"), {
                focus: a.proxy(this.show, this),
                keyup: a.proxy(function(b) {
                    -1 === a.inArray(b.keyCode, [ 27, 37, 39, 38, 40, 32, 13, 9 ]) && this.update();
                }, this),
                keydown: a.proxy(this.keydown, this)
            } ], [ this.component, {
                click: a.proxy(this.show, this)
            } ] ] : this.element.is("div") ? this.isInline = !0 : this._events = [ [ this.element, {
                click: a.proxy(this.show, this)
            } ] ], this._events.push([ this.element, "*", {
                blur: a.proxy(function(a) {
                    this._focused_from = a.target;
                }, this)
            } ], [ this.element, {
                blur: a.proxy(function(a) {
                    this._focused_from = a.target;
                }, this)
            } ]), this._secondaryEvents = [ [ this.picker, {
                click: a.proxy(this.click, this)
            } ], [ a(window), {
                resize: a.proxy(this.place, this)
            } ], [ a(document), {
                "mousedown touchstart": a.proxy(function(a) {
                    this.element.is(a.target) || this.element.find(a.target).length || this.picker.is(a.target) || this.picker.find(a.target).length || this.hide();
                }, this)
            } ] ];
        },
        _attachEvents: function() {
            this._detachEvents(), this._applyEvents(this._events);
        },
        _detachEvents: function() {
            this._unapplyEvents(this._events);
        },
        _attachSecondaryEvents: function() {
            this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents);
        },
        _detachSecondaryEvents: function() {
            this._unapplyEvents(this._secondaryEvents);
        },
        _trigger: function(b, c) {
            var d = c || this.dates.get(-1), e = this._utc_to_local(d);
            this.element.trigger({
                type: b,
                date: e,
                dates: a.map(this.dates, this._utc_to_local),
                format: a.proxy(function(a, b) {
                    0 === arguments.length ? (a = this.dates.length - 1, b = this.o.format) : "string" == typeof a && (b = a, 
                    a = this.dates.length - 1), b = b || this.o.format;
                    var c = this.dates.get(a);
                    return p.formatDate(c, b, this.o.language);
                }, this)
            });
        },
        show: function() {
            this.isInline || this.picker.appendTo("body"), this.picker.show(), this.place(), 
            this._attachSecondaryEvents(), this._trigger("show");
        },
        hide: function() {
            this.isInline || this.picker.is(":visible") && (this.focusDate = null, this.picker.hide().detach(), 
            this._detachSecondaryEvents(), this.viewMode = this.o.startView, this.showMode(), 
            this.o.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), 
            this._trigger("hide"));
        },
        remove: function() {
            this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), 
            delete this.element.data().datepicker, this.isInput || delete this.element.data().date;
        },
        _utc_to_local: function(a) {
            return a && new Date(a.getTime() + 6e4 * a.getTimezoneOffset());
        },
        _local_to_utc: function(a) {
            return a && new Date(a.getTime() - 6e4 * a.getTimezoneOffset());
        },
        _zero_time: function(a) {
            return a && new Date(a.getFullYear(), a.getMonth(), a.getDate());
        },
        _zero_utc_time: function(a) {
            return a && new Date(Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate()));
        },
        getDates: function() {
            return a.map(this.dates, this._utc_to_local);
        },
        getUTCDates: function() {
            return a.map(this.dates, function(a) {
                return new Date(a);
            });
        },
        getDate: function() {
            return this._utc_to_local(this.getUTCDate());
        },
        getUTCDate: function() {
            return new Date(this.dates.get(-1));
        },
        setDates: function() {
            var b = a.isArray(arguments[0]) ? arguments[0] : arguments;
            this.update.apply(this, b), this._trigger("changeDate"), this.setValue();
        },
        setUTCDates: function() {
            var b = a.isArray(arguments[0]) ? arguments[0] : arguments;
            this.update.apply(this, a.map(b, this._utc_to_local)), this._trigger("changeDate"), 
            this.setValue();
        },
        setDate: e("setDates"),
        setUTCDate: e("setUTCDates"),
        setValue: function() {
            var a = this.getFormattedDate();
            this.isInput ? this.element.val(a).change() : this.component && this.element.find("input").val(a).change();
        },
        getFormattedDate: function(c) {
            c === b && (c = this.o.format);
            var d = this.o.language;
            return a.map(this.dates, function(a) {
                return p.formatDate(a, c, d);
            }).join(this.o.multidateSeparator);
        },
        setStartDate: function(a) {
            this._process_options({
                startDate: a
            }), this.update(), this.updateNavArrows();
        },
        setEndDate: function(a) {
            this._process_options({
                endDate: a
            }), this.update(), this.updateNavArrows();
        },
        setDaysOfWeekDisabled: function(a) {
            this._process_options({
                daysOfWeekDisabled: a
            }), this.update(), this.updateNavArrows();
        },
        place: function() {
            if (!this.isInline) {
                var b = this.picker.outerWidth(), c = this.picker.outerHeight(), d = 10, e = h.width(), f = h.height(), g = h.scrollTop(), i = parseInt(this.element.parents().filter(function() {
                    return "auto" !== a(this).css("z-index");
                }).first().css("z-index")) + 10, j = this.component ? this.component.parent().offset() : this.element.offset(), k = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1), l = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1), m = j.left, n = j.top;
                this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), 
                "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), 
                "right" === this.o.orientation.x && (m -= b - l)) : (this.picker.addClass("datepicker-orient-left"), 
                j.left < 0 ? m -= j.left - d : j.left + b > e && (m = e - b - d));
                var o, p, q = this.o.orientation.y;
                "auto" === q && (o = -g + j.top - c, p = g + f - (j.top + k + c), q = Math.max(o, p) === p ? "top" : "bottom"), 
                this.picker.addClass("datepicker-orient-" + q), "top" === q ? n += k : n -= c + parseInt(this.picker.css("padding-top")), 
                this.picker.css({
                    top: n,
                    left: m,
                    zIndex: i
                });
            }
        },
        _allow_update: !0,
        update: function() {
            if (this._allow_update) {
                var b = this.dates.copy(), c = [], d = !1;
                arguments.length ? (a.each(arguments, a.proxy(function(a, b) {
                    b instanceof Date && (b = this._local_to_utc(b)), c.push(b);
                }, this)), d = !0) : (c = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val(), 
                c = c && this.o.multidate ? c.split(this.o.multidateSeparator) : [ c ], delete this.element.data().date), 
                c = a.map(c, a.proxy(function(a) {
                    return p.parseDate(a, this.o.format, this.o.language);
                }, this)), c = a.grep(c, a.proxy(function(a) {
                    return a < this.o.startDate || a > this.o.endDate || !a;
                }, this), !0), this.dates.replace(c), this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate && (this.viewDate = new Date(this.o.endDate)), 
                d ? this.setValue() : c.length && String(b) !== String(this.dates) && this._trigger("changeDate"), 
                !this.dates.length && b.length && this._trigger("clearDate"), this.fill();
            }
        },
        fillDow: function() {
            var a = this.o.weekStart, b = "<tr>";
            if (this.o.calendarWeeks) {
                var c = '<th class="cw">&nbsp;</th>';
                b += c, this.picker.find(".datepicker-days thead tr:first-child").prepend(c);
            }
            for (;a < this.o.weekStart + 7; ) b += '<th class="dow">' + o[this.o.language].daysMin[a++ % 7] + "</th>";
            b += "</tr>", this.picker.find(".datepicker-days thead").append(b);
        },
        fillMonths: function() {
            for (var a = "", b = 0; 12 > b; ) a += '<span class="month">' + o[this.o.language].monthsShort[b++] + "</span>";
            this.picker.find(".datepicker-months td").html(a);
        },
        setRange: function(b) {
            b && b.length ? this.range = a.map(b, function(a) {
                return a.valueOf();
            }) : delete this.range, this.fill();
        },
        getClassNames: function(b) {
            var c = [], d = this.viewDate.getUTCFullYear(), e = this.viewDate.getUTCMonth(), f = new Date();
            return b.getUTCFullYear() < d || b.getUTCFullYear() === d && b.getUTCMonth() < e ? c.push("old") : (b.getUTCFullYear() > d || b.getUTCFullYear() === d && b.getUTCMonth() > e) && c.push("new"), 
            this.focusDate && b.valueOf() === this.focusDate.valueOf() && c.push("focused"), 
            this.o.todayHighlight && b.getUTCFullYear() === f.getFullYear() && b.getUTCMonth() === f.getMonth() && b.getUTCDate() === f.getDate() && c.push("today"), 
            -1 !== this.dates.contains(b) && c.push("active"), (b.valueOf() < this.o.startDate || b.valueOf() > this.o.endDate || -1 !== a.inArray(b.getUTCDay(), this.o.daysOfWeekDisabled)) && c.push("disabled"), 
            this.range && (b > this.range[0] && b < this.range[this.range.length - 1] && c.push("range"), 
            -1 !== a.inArray(b.valueOf(), this.range) && c.push("selected")), c;
        },
        fill: function() {
            var d, e = new Date(this.viewDate), f = e.getUTCFullYear(), g = e.getUTCMonth(), h = this.o.startDate !== -(1 / 0) ? this.o.startDate.getUTCFullYear() : -(1 / 0), i = this.o.startDate !== -(1 / 0) ? this.o.startDate.getUTCMonth() : -(1 / 0), j = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0, k = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0, l = o[this.o.language].today || o.en.today || "", m = o[this.o.language].clear || o.en.clear || "";
            this.picker.find(".datepicker-days thead th.datepicker-switch").text(o[this.o.language].months[g] + " " + f), 
            this.picker.find("tfoot th.today").text(l).toggle(this.o.todayBtn !== !1), this.picker.find("tfoot th.clear").text(m).toggle(this.o.clearBtn !== !1), 
            this.updateNavArrows(), this.fillMonths();
            var n = c(f, g - 1, 28), q = p.getDaysInMonth(n.getUTCFullYear(), n.getUTCMonth());
            n.setUTCDate(q), n.setUTCDate(q - (n.getUTCDay() - this.o.weekStart + 7) % 7);
            var r = new Date(n);
            r.setUTCDate(r.getUTCDate() + 42), r = r.valueOf();
            for (var s, t = []; n.valueOf() < r; ) {
                if (n.getUTCDay() === this.o.weekStart && (t.push("<tr>"), this.o.calendarWeeks)) {
                    var u = new Date(+n + (this.o.weekStart - n.getUTCDay() - 7) % 7 * 864e5), v = new Date(Number(u) + (11 - u.getUTCDay()) % 7 * 864e5), w = new Date(Number(w = c(v.getUTCFullYear(), 0, 1)) + (11 - w.getUTCDay()) % 7 * 864e5), x = (v - w) / 864e5 / 7 + 1;
                    t.push('<td class="cw">' + x + "</td>");
                }
                if (s = this.getClassNames(n), s.push("day"), this.o.beforeShowDay !== a.noop) {
                    var y = this.o.beforeShowDay(this._utc_to_local(n));
                    y === b ? y = {} : "boolean" == typeof y ? y = {
                        enabled: y
                    } : "string" == typeof y && (y = {
                        classes: y
                    }), y.enabled === !1 && s.push("disabled"), y.classes && (s = s.concat(y.classes.split(/\s+/))), 
                    y.tooltip && (d = y.tooltip);
                }
                s = a.unique(s), t.push('<td class="' + s.join(" ") + '"' + (d ? ' title="' + d + '"' : "") + ">" + n.getUTCDate() + "</td>"), 
                n.getUTCDay() === this.o.weekEnd && t.push("</tr>"), n.setUTCDate(n.getUTCDate() + 1);
            }
            this.picker.find(".datepicker-days tbody").empty().append(t.join(""));
            var z = this.picker.find(".datepicker-months").find("th:eq(1)").text(f).end().find("span").removeClass("active");
            a.each(this.dates, function(a, b) {
                b.getUTCFullYear() === f && z.eq(b.getUTCMonth()).addClass("active");
            }), (h > f || f > j) && z.addClass("disabled"), f === h && z.slice(0, i).addClass("disabled"), 
            f === j && z.slice(k + 1).addClass("disabled"), t = "", f = 10 * parseInt(f / 10, 10);
            var A = this.picker.find(".datepicker-years").find("th:eq(1)").text(f + "-" + (f + 9)).end().find("td");
            f -= 1;
            for (var B, C = a.map(this.dates, function(a) {
                return a.getUTCFullYear();
            }), D = -1; 11 > D; D++) B = [ "year" ], -1 === D ? B.push("old") : 10 === D && B.push("new"), 
            -1 !== a.inArray(f, C) && B.push("active"), (h > f || f > j) && B.push("disabled"), 
            t += '<span class="' + B.join(" ") + '">' + f + "</span>", f += 1;
            A.html(t);
        },
        updateNavArrows: function() {
            if (this._allow_update) {
                var a = new Date(this.viewDate), b = a.getUTCFullYear(), c = a.getUTCMonth();
                switch (this.viewMode) {
                  case 0:
                    this.picker.find(".prev").css(this.o.startDate !== -(1 / 0) && b <= this.o.startDate.getUTCFullYear() && c <= this.o.startDate.getUTCMonth() ? {
                        visibility: "hidden"
                    } : {
                        visibility: "visible"
                    }), this.picker.find(".next").css(this.o.endDate !== 1 / 0 && b >= this.o.endDate.getUTCFullYear() && c >= this.o.endDate.getUTCMonth() ? {
                        visibility: "hidden"
                    } : {
                        visibility: "visible"
                    });
                    break;

                  case 1:
                  case 2:
                    this.picker.find(".prev").css(this.o.startDate !== -(1 / 0) && b <= this.o.startDate.getUTCFullYear() ? {
                        visibility: "hidden"
                    } : {
                        visibility: "visible"
                    }), this.picker.find(".next").css(this.o.endDate !== 1 / 0 && b >= this.o.endDate.getUTCFullYear() ? {
                        visibility: "hidden"
                    } : {
                        visibility: "visible"
                    });
                }
            }
        },
        click: function(b) {
            b.preventDefault();
            var d, e, f, g = a(b.target).closest("span, td, th");
            if (1 === g.length) switch (g[0].nodeName.toLowerCase()) {
              case "th":
                switch (g[0].className) {
                  case "datepicker-switch":
                    this.showMode(1);
                    break;

                  case "prev":
                  case "next":
                    var h = p.modes[this.viewMode].navStep * ("prev" === g[0].className ? -1 : 1);
                    switch (this.viewMode) {
                      case 0:
                        this.viewDate = this.moveMonth(this.viewDate, h), this._trigger("changeMonth", this.viewDate);
                        break;

                      case 1:
                      case 2:
                        this.viewDate = this.moveYear(this.viewDate, h), 1 === this.viewMode && this._trigger("changeYear", this.viewDate);
                    }
                    this.fill();
                    break;

                  case "today":
                    var i = new Date();
                    i = c(i.getFullYear(), i.getMonth(), i.getDate(), 0, 0, 0), this.showMode(-2);
                    var j = "linked" === this.o.todayBtn ? null : "view";
                    this._setDate(i, j);
                    break;

                  case "clear":
                    var k;
                    this.isInput ? k = this.element : this.component && (k = this.element.find("input")), 
                    k && k.val("").change(), this.update(), this._trigger("changeDate"), this.o.autoclose && this.hide();
                }
                break;

              case "span":
                g.is(".disabled") || (this.viewDate.setUTCDate(1), g.is(".month") ? (f = 1, e = g.parent().find("span").index(g), 
                d = this.viewDate.getUTCFullYear(), this.viewDate.setUTCMonth(e), this._trigger("changeMonth", this.viewDate), 
                1 === this.o.minViewMode && this._setDate(c(d, e, f))) : (f = 1, e = 0, d = parseInt(g.text(), 10) || 0, 
                this.viewDate.setUTCFullYear(d), this._trigger("changeYear", this.viewDate), 2 === this.o.minViewMode && this._setDate(c(d, e, f))), 
                this.showMode(-1), this.fill());
                break;

              case "td":
                g.is(".day") && !g.is(".disabled") && (f = parseInt(g.text(), 10) || 1, d = this.viewDate.getUTCFullYear(), 
                e = this.viewDate.getUTCMonth(), g.is(".old") ? 0 === e ? (e = 11, d -= 1) : e -= 1 : g.is(".new") && (11 === e ? (e = 0, 
                d += 1) : e += 1), this._setDate(c(d, e, f)));
            }
            this.picker.is(":visible") && this._focused_from && a(this._focused_from).focus(), 
            delete this._focused_from;
        },
        _toggle_multidate: function(a) {
            var b = this.dates.contains(a);
            if (a ? -1 !== b ? this.dates.remove(b) : this.dates.push(a) : this.dates.clear(), 
            "number" == typeof this.o.multidate) for (;this.dates.length > this.o.multidate; ) this.dates.remove(0);
        },
        _setDate: function(a, b) {
            b && "date" !== b || this._toggle_multidate(a && new Date(a)), b && "view" !== b || (this.viewDate = a && new Date(a)), 
            this.fill(), this.setValue(), this._trigger("changeDate");
            var c;
            this.isInput ? c = this.element : this.component && (c = this.element.find("input")), 
            c && c.change(), !this.o.autoclose || b && "date" !== b || this.hide();
        },
        moveMonth: function(a, c) {
            if (!a) return b;
            if (!c) return a;
            var d, e, f = new Date(a.valueOf()), g = f.getUTCDate(), h = f.getUTCMonth(), i = Math.abs(c);
            if (c = c > 0 ? 1 : -1, 1 === i) e = -1 === c ? function() {
                return f.getUTCMonth() === h;
            } : function() {
                return f.getUTCMonth() !== d;
            }, d = h + c, f.setUTCMonth(d), (0 > d || d > 11) && (d = (d + 12) % 12); else {
                for (var j = 0; i > j; j++) f = this.moveMonth(f, c);
                d = f.getUTCMonth(), f.setUTCDate(g), e = function() {
                    return d !== f.getUTCMonth();
                };
            }
            for (;e(); ) f.setUTCDate(--g), f.setUTCMonth(d);
            return f;
        },
        moveYear: function(a, b) {
            return this.moveMonth(a, 12 * b);
        },
        dateWithinRange: function(a) {
            return a >= this.o.startDate && a <= this.o.endDate;
        },
        keydown: function(a) {
            if (this.picker.is(":not(:visible)")) return void (27 === a.keyCode && this.show());
            var b, c, e, f = !1, g = this.focusDate || this.viewDate;
            switch (a.keyCode) {
              case 27:
                this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, 
                this.fill()) : this.hide(), a.preventDefault();
                break;

              case 37:
              case 39:
                if (!this.o.keyboardNavigation) break;
                b = 37 === a.keyCode ? -1 : 1, a.ctrlKey ? (c = this.moveYear(this.dates.get(-1) || d(), b), 
                e = this.moveYear(g, b), this._trigger("changeYear", this.viewDate)) : a.shiftKey ? (c = this.moveMonth(this.dates.get(-1) || d(), b), 
                e = this.moveMonth(g, b), this._trigger("changeMonth", this.viewDate)) : (c = new Date(this.dates.get(-1) || d()), 
                c.setUTCDate(c.getUTCDate() + b), e = new Date(g), e.setUTCDate(g.getUTCDate() + b)), 
                this.dateWithinRange(c) && (this.focusDate = this.viewDate = e, this.setValue(), 
                this.fill(), a.preventDefault());
                break;

              case 38:
              case 40:
                if (!this.o.keyboardNavigation) break;
                b = 38 === a.keyCode ? -1 : 1, a.ctrlKey ? (c = this.moveYear(this.dates.get(-1) || d(), b), 
                e = this.moveYear(g, b), this._trigger("changeYear", this.viewDate)) : a.shiftKey ? (c = this.moveMonth(this.dates.get(-1) || d(), b), 
                e = this.moveMonth(g, b), this._trigger("changeMonth", this.viewDate)) : (c = new Date(this.dates.get(-1) || d()), 
                c.setUTCDate(c.getUTCDate() + 7 * b), e = new Date(g), e.setUTCDate(g.getUTCDate() + 7 * b)), 
                this.dateWithinRange(c) && (this.focusDate = this.viewDate = e, this.setValue(), 
                this.fill(), a.preventDefault());
                break;

              case 32:
                break;

              case 13:
                g = this.focusDate || this.dates.get(-1) || this.viewDate, this._toggle_multidate(g), 
                f = !0, this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, 
                this.setValue(), this.fill(), this.picker.is(":visible") && (a.preventDefault(), 
                this.o.autoclose && this.hide());
                break;

              case 9:
                this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill(), 
                this.hide();
            }
            if (f) {
                this._trigger(this.dates.length ? "changeDate" : "clearDate");
                var h;
                this.isInput ? h = this.element : this.component && (h = this.element.find("input")), 
                h && h.change();
            }
        },
        showMode: function(a) {
            a && (this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + a))), 
            this.picker.find(">div").hide().filter(".datepicker-" + p.modes[this.viewMode].clsName).css("display", "block"), 
            this.updateNavArrows();
        }
    };
    var k = function(b, c) {
        this.element = a(b), this.inputs = a.map(c.inputs, function(a) {
            return a.jquery ? a[0] : a;
        }), delete c.inputs, a(this.inputs).datepicker(c).bind("changeDate", a.proxy(this.dateUpdated, this)), 
        this.pickers = a.map(this.inputs, function(b) {
            return a(b).data("datepicker");
        }), this.updateDates();
    };
    k.prototype = {
        updateDates: function() {
            this.dates = a.map(this.pickers, function(a) {
                return a.getUTCDate();
            }), this.updateRanges();
        },
        updateRanges: function() {
            var b = a.map(this.dates, function(a) {
                return a.valueOf();
            });
            a.each(this.pickers, function(a, c) {
                c.setRange(b);
            });
        },
        dateUpdated: function(b) {
            if (!this.updating) {
                this.updating = !0;
                var c = a(b.target).data("datepicker"), d = c.getUTCDate(), e = a.inArray(b.target, this.inputs), f = this.inputs.length;
                if (-1 !== e) {
                    if (a.each(this.pickers, function(a, b) {
                        b.getUTCDate() || b.setUTCDate(d);
                    }), d < this.dates[e]) for (;e >= 0 && d < this.dates[e]; ) this.pickers[e--].setUTCDate(d); else if (d > this.dates[e]) for (;f > e && d > this.dates[e]; ) this.pickers[e++].setUTCDate(d);
                    this.updateDates(), delete this.updating;
                }
            }
        },
        remove: function() {
            a.map(this.pickers, function(a) {
                a.remove();
            }), delete this.element.data().datepicker;
        }
    };
    var l = a.fn.datepicker;
    a.fn.datepicker = function(c) {
        var d = Array.apply(null, arguments);
        d.shift();
        var e;
        return this.each(function() {
            var h = a(this), i = h.data("datepicker"), l = "object" == typeof c && c;
            if (!i) {
                var n = f(this, "date"), o = a.extend({}, m, n, l), p = g(o.language), q = a.extend({}, m, p, n, l);
                if (h.is(".input-daterange") || q.inputs) {
                    var r = {
                        inputs: q.inputs || h.find("input").toArray()
                    };
                    h.data("datepicker", i = new k(this, a.extend(q, r)));
                } else h.data("datepicker", i = new j(this, q));
            }
            return "string" == typeof c && "function" == typeof i[c] && (e = i[c].apply(i, d), 
            e !== b) ? !1 : void 0;
        }), e !== b ? e : this;
    };
    var m = a.fn.datepicker.defaults = {
        autoclose: !1,
        beforeShowDay: a.noop,
        calendarWeeks: !1,
        clearBtn: !1,
        daysOfWeekDisabled: [],
        endDate: 1 / 0,
        forceParse: !0,
        format: "mm/dd/yyyy",
        keyboardNavigation: !0,
        language: "en",
        minViewMode: 0,
        multidate: !1,
        multidateSeparator: ",",
        orientation: "auto",
        rtl: !1,
        startDate: -(1 / 0),
        startView: 0,
        todayBtn: !1,
        todayHighlight: !1,
        weekStart: 0
    }, n = a.fn.datepicker.locale_opts = [ "format", "rtl", "weekStart" ];
    a.fn.datepicker.Constructor = j;
    var o = a.fn.datepicker.dates = {
        en: {
            days: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
            daysShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ],
            daysMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su" ],
            months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
            monthsShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
            today: "Today",
            clear: "Clear"
        }
    }, p = {
        modes: [ {
            clsName: "days",
            navFnc: "Month",
            navStep: 1
        }, {
            clsName: "months",
            navFnc: "FullYear",
            navStep: 1
        }, {
            clsName: "years",
            navFnc: "FullYear",
            navStep: 10
        } ],
        isLeapYear: function(a) {
            return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0;
        },
        getDaysInMonth: function(a, b) {
            return [ 31, p.isLeapYear(a) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ][b];
        },
        validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
        nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
        parseFormat: function(a) {
            var b = a.replace(this.validParts, "\x00").split("\x00"), c = a.match(this.validParts);
            if (!b || !b.length || !c || 0 === c.length) throw new Error("Invalid date format.");
            return {
                separators: b,
                parts: c
            };
        },
        parseDate: function(d, e, f) {
            function g() {
                var a = this.slice(0, m[k].length), b = m[k].slice(0, a.length);
                return a === b;
            }
            if (!d) return b;
            if (d instanceof Date) return d;
            "string" == typeof e && (e = p.parseFormat(e));
            var h, i, k, l = /([\-+]\d+)([dmwy])/, m = d.match(/([\-+]\d+)([dmwy])/g);
            if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(d)) {
                for (d = new Date(), k = 0; k < m.length; k++) switch (h = l.exec(m[k]), i = parseInt(h[1]), 
                h[2]) {
                  case "d":
                    d.setUTCDate(d.getUTCDate() + i);
                    break;

                  case "m":
                    d = j.prototype.moveMonth.call(j.prototype, d, i);
                    break;

                  case "w":
                    d.setUTCDate(d.getUTCDate() + 7 * i);
                    break;

                  case "y":
                    d = j.prototype.moveYear.call(j.prototype, d, i);
                }
                return c(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0);
            }
            m = d && d.match(this.nonpunctuation) || [], d = new Date();
            var n, q, r = {}, s = [ "yyyy", "yy", "M", "MM", "m", "mm", "d", "dd" ], t = {
                yyyy: function(a, b) {
                    return a.setUTCFullYear(b);
                },
                yy: function(a, b) {
                    return a.setUTCFullYear(2e3 + b);
                },
                m: function(a, b) {
                    if (isNaN(a)) return a;
                    for (b -= 1; 0 > b; ) b += 12;
                    for (b %= 12, a.setUTCMonth(b); a.getUTCMonth() !== b; ) a.setUTCDate(a.getUTCDate() - 1);
                    return a;
                },
                d: function(a, b) {
                    return a.setUTCDate(b);
                }
            };
            t.M = t.MM = t.mm = t.m, t.dd = t.d, d = c(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
            var u = e.parts.slice();
            if (m.length !== u.length && (u = a(u).filter(function(b, c) {
                return -1 !== a.inArray(c, s);
            }).toArray()), m.length === u.length) {
                var v;
                for (k = 0, v = u.length; v > k; k++) {
                    if (n = parseInt(m[k], 10), h = u[k], isNaN(n)) switch (h) {
                      case "MM":
                        q = a(o[f].months).filter(g), n = a.inArray(q[0], o[f].months) + 1;
                        break;

                      case "M":
                        q = a(o[f].monthsShort).filter(g), n = a.inArray(q[0], o[f].monthsShort) + 1;
                    }
                    r[h] = n;
                }
                var w, x;
                for (k = 0; k < s.length; k++) x = s[k], x in r && !isNaN(r[x]) && (w = new Date(d), 
                t[x](w, r[x]), isNaN(w) || (d = w));
            }
            return d;
        },
        formatDate: function(b, c, d) {
            if (!b) return "";
            "string" == typeof c && (c = p.parseFormat(c));
            var e = {
                d: b.getUTCDate(),
                D: o[d].daysShort[b.getUTCDay()],
                DD: o[d].days[b.getUTCDay()],
                m: b.getUTCMonth() + 1,
                M: o[d].monthsShort[b.getUTCMonth()],
                MM: o[d].months[b.getUTCMonth()],
                yy: b.getUTCFullYear().toString().substring(2),
                yyyy: b.getUTCFullYear()
            };
            e.dd = (e.d < 10 ? "0" : "") + e.d, e.mm = (e.m < 10 ? "0" : "") + e.m, b = [];
            for (var f = a.extend([], c.separators), g = 0, h = c.parts.length; h >= g; g++) f.length && b.push(f.shift()), 
            b.push(e[c.parts[g]]);
            return b.join("");
        },
        headTemplate: '<thead><tr><th class="prev">&laquo;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>',
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
    };
    p.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + p.headTemplate + "<tbody></tbody>" + p.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + p.headTemplate + p.contTemplate + p.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + p.headTemplate + p.contTemplate + p.footTemplate + "</table></div></div>", 
    a.fn.datepicker.DPGlobal = p, a.fn.datepicker.noConflict = function() {
        return a.fn.datepicker = l, this;
    }, a(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function(b) {
        var c = a(this);
        c.data("datepicker") || (b.preventDefault(), c.datepicker("show"));
    }), a(function() {
        a('[data-provide="datepicker-inline"]').datepicker();
    });
}(window.jQuery);

var deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0, deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent), deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent), deviceIsIOSWithBadTarget = deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);

FastClick.prototype.needsClick = function(a) {
    "use strict";
    switch (a.nodeName.toLowerCase()) {
      case "button":
      case "select":
      case "textarea":
        if (a.disabled) return !0;
        break;

      case "input":
        if (deviceIsIOS && "file" === a.type || a.disabled) return !0;
        break;

      case "label":
      case "video":
        return !0;
    }
    return /\bneedsclick\b/.test(a.className);
}, FastClick.prototype.needsFocus = function(a) {
    "use strict";
    switch (a.nodeName.toLowerCase()) {
      case "textarea":
        return !0;

      case "select":
        return !deviceIsAndroid;

      case "input":
        switch (a.type) {
          case "button":
          case "checkbox":
          case "file":
          case "image":
          case "radio":
          case "submit":
            return !1;
        }
        return !a.disabled && !a.readOnly;

      default:
        return /\bneedsfocus\b/.test(a.className);
    }
}, FastClick.prototype.sendClick = function(a, b) {
    "use strict";
    var c, d;
    document.activeElement && document.activeElement !== a && document.activeElement.blur(), 
    d = b.changedTouches[0], c = document.createEvent("MouseEvents"), c.initMouseEvent(this.determineEventType(a), !0, !0, window, 1, d.screenX, d.screenY, d.clientX, d.clientY, !1, !1, !1, !1, 0, null), 
    c.forwardedTouchEvent = !0, a.dispatchEvent(c);
}, FastClick.prototype.determineEventType = function(a) {
    "use strict";
    return deviceIsAndroid && "select" === a.tagName.toLowerCase() ? "mousedown" : "click";
}, FastClick.prototype.focus = function(a) {
    "use strict";
    var b;
    deviceIsIOS && a.setSelectionRange && 0 !== a.type.indexOf("date") && "time" !== a.type ? (b = a.value.length, 
    a.setSelectionRange(b, b)) : a.focus();
}, FastClick.prototype.updateScrollParent = function(a) {
    "use strict";
    var b, c;
    if (b = a.fastClickScrollParent, !b || !b.contains(a)) {
        c = a;
        do {
            if (c.scrollHeight > c.offsetHeight) {
                b = c, a.fastClickScrollParent = c;
                break;
            }
            c = c.parentElement;
        } while (c);
    }
    b && (b.fastClickLastScrollTop = b.scrollTop);
}, FastClick.prototype.getTargetElementFromEventTarget = function(a) {
    "use strict";
    return a.nodeType === Node.TEXT_NODE ? a.parentNode : a;
}, FastClick.prototype.onTouchStart = function(a) {
    "use strict";
    var b, c, d;
    if (a.targetTouches.length > 1) return !0;
    if (b = this.getTargetElementFromEventTarget(a.target), c = a.targetTouches[0], 
    deviceIsIOS) {
        if (d = window.getSelection(), d.rangeCount && !d.isCollapsed) return !0;
        if (!deviceIsIOS4) {
            if (c.identifier === this.lastTouchIdentifier) return a.preventDefault(), !1;
            this.lastTouchIdentifier = c.identifier, this.updateScrollParent(b);
        }
    }
    return this.trackingClick = !0, this.trackingClickStart = a.timeStamp, this.targetElement = b, 
    this.touchStartX = c.pageX, this.touchStartY = c.pageY, a.timeStamp - this.lastClickTime < 200 && a.preventDefault(), 
    !0;
}, FastClick.prototype.touchHasMoved = function(a) {
    "use strict";
    var b = a.changedTouches[0], c = this.touchBoundary;
    return Math.abs(b.pageX - this.touchStartX) > c || Math.abs(b.pageY - this.touchStartY) > c ? !0 : !1;
}, FastClick.prototype.onTouchMove = function(a) {
    "use strict";
    return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(a.target) || this.touchHasMoved(a)) && (this.trackingClick = !1, 
    this.targetElement = null), !0) : !0;
}, FastClick.prototype.findControl = function(a) {
    "use strict";
    return void 0 !== a.control ? a.control : a.htmlFor ? document.getElementById(a.htmlFor) : a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea");
}, FastClick.prototype.onTouchEnd = function(a) {
    "use strict";
    var b, c, d, e, f, g = this.targetElement;
    if (!this.trackingClick) return !0;
    if (a.timeStamp - this.lastClickTime < 200) return this.cancelNextClick = !0, !0;
    if (this.cancelNextClick = !1, this.lastClickTime = a.timeStamp, c = this.trackingClickStart, 
    this.trackingClick = !1, this.trackingClickStart = 0, deviceIsIOSWithBadTarget && (f = a.changedTouches[0], 
    g = document.elementFromPoint(f.pageX - window.pageXOffset, f.pageY - window.pageYOffset) || g, 
    g.fastClickScrollParent = this.targetElement.fastClickScrollParent), d = g.tagName.toLowerCase(), 
    "label" === d) {
        if (b = this.findControl(g)) {
            if (this.focus(g), deviceIsAndroid) return !1;
            g = b;
        }
    } else if (this.needsFocus(g)) return a.timeStamp - c > 100 || deviceIsIOS && window.top !== window && "input" === d ? (this.targetElement = null, 
    !1) : (this.focus(g), this.sendClick(g, a), deviceIsIOS4 && "select" === d || (this.targetElement = null, 
    a.preventDefault()), !1);
    return deviceIsIOS && !deviceIsIOS4 && (e = g.fastClickScrollParent, e && e.fastClickLastScrollTop !== e.scrollTop) ? !0 : (this.needsClick(g) || (a.preventDefault(), 
    this.sendClick(g, a)), !1);
}, FastClick.prototype.onTouchCancel = function() {
    "use strict";
    this.trackingClick = !1, this.targetElement = null;
}, FastClick.prototype.onMouse = function(a) {
    "use strict";
    return this.targetElement ? a.forwardedTouchEvent ? !0 : a.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (a.stopImmediatePropagation ? a.stopImmediatePropagation() : a.propagationStopped = !0, 
    a.stopPropagation(), a.preventDefault(), !1) : !0 : !0;
}, FastClick.prototype.onClick = function(a) {
    "use strict";
    var b;
    return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, 
    !0) : "submit" === a.target.type && 0 === a.detail ? !0 : (b = this.onMouse(a), 
    b || (this.targetElement = null), b);
}, FastClick.prototype.destroy = function() {
    "use strict";
    var a = this.layer;
    deviceIsAndroid && (a.removeEventListener("mouseover", this.onMouse, !0), a.removeEventListener("mousedown", this.onMouse, !0), 
    a.removeEventListener("mouseup", this.onMouse, !0)), a.removeEventListener("click", this.onClick, !0), 
    a.removeEventListener("touchstart", this.onTouchStart, !1), a.removeEventListener("touchmove", this.onTouchMove, !1), 
    a.removeEventListener("touchend", this.onTouchEnd, !1), a.removeEventListener("touchcancel", this.onTouchCancel, !1);
}, FastClick.notNeeded = function(a) {
    "use strict";
    var b, c;
    if ("undefined" == typeof window.ontouchstart) return !0;
    if (c = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [ , 0 ])[1]) {
        if (!deviceIsAndroid) return !0;
        if (b = document.querySelector("meta[name=viewport]")) {
            if (-1 !== b.content.indexOf("user-scalable=no")) return !0;
            if (c > 31 && window.innerWidth <= window.screen.width) return !0;
        }
    }
    return "none" === a.style.msTouchAction ? !0 : !1;
}, FastClick.attach = function(a) {
    "use strict";
    return new FastClick(a);
}, "undefined" != typeof define && define.amd ? define(function() {
    "use strict";
    return FastClick;
}) : "undefined" != typeof module && module.exports ? (module.exports = FastClick.attach, 
module.exports.FastClick = FastClick) : window.FastClick = FastClick, function(a, b) {
    function c(a, b) {
        var c = a.createElement("p"), d = a.getElementsByTagName("head")[0] || a.documentElement;
        return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild);
    }
    function d() {
        var a = y.elements;
        return "string" == typeof a ? a.split(" ") : a;
    }
    function e(a, b) {
        var c = y.elements;
        "string" != typeof c && (c = c.join(" ")), "string" != typeof a && (a = a.join(" ")), 
        y.elements = c + " " + a, j(b);
    }
    function f(a) {
        var b = x[a[v]];
        return b || (b = {}, w++, a[v] = w, x[w] = b), b;
    }
    function g(a, c, d) {
        if (c || (c = b), q) return c.createElement(a);
        d || (d = f(c));
        var e;
        return e = d.cache[a] ? d.cache[a].cloneNode() : u.test(a) ? (d.cache[a] = d.createElem(a)).cloneNode() : d.createElem(a), 
        !e.canHaveChildren || t.test(a) || e.tagUrn ? e : d.frag.appendChild(e);
    }
    function h(a, c) {
        if (a || (a = b), q) return a.createDocumentFragment();
        c = c || f(a);
        for (var e = c.frag.cloneNode(), g = 0, h = d(), i = h.length; i > g; g++) e.createElement(h[g]);
        return e;
    }
    function i(a, b) {
        b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, 
        b.frag = b.createFrag()), a.createElement = function(c) {
            return y.shivMethods ? g(c, a, b) : b.createElem(c);
        }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + d().join().replace(/[\w\-:]+/g, function(a) {
            return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")';
        }) + ");return n}")(y, b.frag);
    }
    function j(a) {
        a || (a = b);
        var d = f(a);
        return !y.shivCSS || p || d.hasCSS || (d.hasCSS = !!c(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), 
        q || i(a, d), a;
    }
    function k(a) {
        for (var b, c = a.getElementsByTagName("*"), e = c.length, f = RegExp("^(?:" + d().join("|") + ")$", "i"), g = []; e--; ) b = c[e], 
        f.test(b.nodeName) && g.push(b.applyElement(l(b)));
        return g;
    }
    function l(a) {
        for (var b, c = a.attributes, d = c.length, e = a.ownerDocument.createElement(A + ":" + a.nodeName); d--; ) b = c[d], 
        b.specified && e.setAttribute(b.nodeName, b.nodeValue);
        return e.style.cssText = a.style.cssText, e;
    }
    function m(a) {
        for (var b, c = a.split("{"), e = c.length, f = RegExp("(^|[\\s,>+~])(" + d().join("|") + ")(?=[[\\s,>+~#.:]|$)", "gi"), g = "$1" + A + "\\:$2"; e--; ) b = c[e] = c[e].split("}"), 
        b[b.length - 1] = b[b.length - 1].replace(f, g), c[e] = b.join("}");
        return c.join("{");
    }
    function n(a) {
        for (var b = a.length; b--; ) a[b].removeNode();
    }
    function o(a) {
        function b() {
            clearTimeout(g._removeSheetTimer), d && d.removeNode(!0), d = null;
        }
        var d, e, g = f(a), h = a.namespaces, i = a.parentWindow;
        return !B || a.printShived ? a : ("undefined" == typeof h[A] && h.add(A), i.attachEvent("onbeforeprint", function() {
            b();
            for (var f, g, h, i = a.styleSheets, j = [], l = i.length, n = Array(l); l--; ) n[l] = i[l];
            for (;h = n.pop(); ) if (!h.disabled && z.test(h.media)) {
                try {
                    f = h.imports, g = f.length;
                } catch (o) {
                    g = 0;
                }
                for (l = 0; g > l; l++) n.push(f[l]);
                try {
                    j.push(h.cssText);
                } catch (o) {}
            }
            j = m(j.reverse().join("")), e = k(a), d = c(a, j);
        }), i.attachEvent("onafterprint", function() {
            n(e), clearTimeout(g._removeSheetTimer), g._removeSheetTimer = setTimeout(b, 500);
        }), a.printShived = !0, a);
    }
    var p, q, r = "3.7.3-pre", s = a.html5 || {}, t = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, u = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, v = "_html5shiv", w = 0, x = {};
    !function() {
        try {
            var a = b.createElement("a");
            a.innerHTML = "<xyz></xyz>", p = "hidden" in a, q = 1 == a.childNodes.length || function() {
                b.createElement("a");
                var a = b.createDocumentFragment();
                return "undefined" == typeof a.cloneNode || "undefined" == typeof a.createDocumentFragment || "undefined" == typeof a.createElement;
            }();
        } catch (c) {
            p = !0, q = !0;
        }
    }();
    var y = {
        elements: s.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
        version: r,
        shivCSS: s.shivCSS !== !1,
        supportsUnknownElements: q,
        shivMethods: s.shivMethods !== !1,
        type: "default",
        shivDocument: j,
        createElement: g,
        createDocumentFragment: h,
        addElements: e
    };
    a.html5 = y, j(b);
    var z = /^$|\b(?:all|print)\b/, A = "html5shiv", B = !q && function() {
        var c = b.documentElement;
        return !("undefined" == typeof b.namespaces || "undefined" == typeof b.parentWindow || "undefined" == typeof c.applyElement || "undefined" == typeof c.removeNode || "undefined" == typeof a.attachEvent);
    }();
    y.type += " print", y.shivPrint = o, o(b), "object" == typeof module && module.exports && (module.exports = y);
}("undefined" != typeof window ? window : this, document), function(a, b) {
    var c = {
        catchMethods: {
            methodreturn: [],
            count: 0
        },
        init: function(b) {
            var c, d, e;
            b.originalEvent.origin.match(/vimeo/g) && "data" in b.originalEvent && (e = "string" === a.type(b.originalEvent.data) ? a.parseJSON(b.originalEvent.data) : b.originalEvent.data, 
            e && (c = this.setPlayerID(e), d = this.setVimeoAPIurl(c), e.hasOwnProperty("event") && this.handleEvent(e, c, d), 
            e.hasOwnProperty("method") && this.handleMethod(e, c, d)));
        },
        setPlayerID: function(b) {
            return b.hasOwnProperty("player_id") ? a(a("#" + b.player_id).length ? "#" + b.player_id : "iframe[src*=" + b.player_id + "]") : a("iframe[src*='vimeo']").eq(0);
        },
        setVimeoAPIurl: function(a) {
            return "http" !== a.attr("src").substr(0, 4) ? "https:" !== b.location.protocol ? "http:" + a.attr("src").split("?")[0] : "https:" + a.attr("src").split("?")[0] : a.attr("src").split("?")[0];
        },
        handleMethod: function(a, b, c) {
            this.catchMethods.methodreturn.push(a.value);
        },
        handleEvent: function(b, c, d) {
            switch (b.event.toLowerCase()) {
              case "ready":
                for (var e in a._data(c[0], "events")) e.match(/loadProgress|playProgress|play|pause|finish|seek|cuechange/) && c[0].contentWindow.postMessage(JSON.stringify({
                    method: "addEventListener",
                    value: e
                }), d);
                if (c.data("vimeoAPICall")) {
                    for (var f = c.data("vimeoAPICall"), g = 0; g < f.length; g++) c[0].contentWindow.postMessage(JSON.stringify(f[g].message), f[g].api);
                    c.removeData("vimeoAPICall");
                }
                c.data("vimeoReady", !0), c.triggerHandler("ready");
                break;

              case "seek":
                c.triggerHandler("seek", [ b.data ]);
                break;

              case "loadprogress":
                c.triggerHandler("loadProgress", [ b.data ]);
                break;

              case "playprogress":
                c.triggerHandler("playProgress", [ b.data ]);
                break;

              case "pause":
                c.triggerHandler("pause");
                break;

              case "finish":
                c.triggerHandler("finish");
                break;

              case "play":
                c.triggerHandler("play");
                break;

              case "cuechange":
                c.triggerHandler("cuechange");
            }
        }
    };
    a(b).on("message", function(a) {
        c.init(a);
    }), a.vimeo = function(a, d, e) {
        var f = {}, g = c.catchMethods.methodreturn.length;
        if ("string" == typeof d && (f.method = d), void 0 !== typeof e && "function" != typeof e && (f.value = e), 
        "iframe" === a.prop("tagName").toLowerCase() && f.hasOwnProperty("method")) if (a.data("vimeoReady")) a[0].contentWindow.postMessage(JSON.stringify(f), c.setVimeoAPIurl(a)); else {
            var h = a.data("vimeoAPICall") ? a.data("vimeoAPICall") : [];
            h.push({
                message: f,
                api: c.setVimeoAPIurl(a)
            }), a.data("vimeoAPICall", h);
        }
        return "get" !== d.toString().substr(0, 3) && "paused" !== d.toString() || "function" != typeof e || (!function(a, d, e) {
            var f = b.setInterval(function() {
                c.catchMethods.methodreturn.length != a && (b.clearInterval(f), d(c.catchMethods.methodreturn[e]));
            }, 10);
        }(g, e, c.catchMethods.count), c.catchMethods.count++), a;
    }, a.fn.vimeo = function(b, c) {
        return a.vimeo(this, b, c);
    };
}(jQuery, window), function(a) {
    a.fn.datepicker.dates.ar = {
        days: [ "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد" ],
        daysShort: [ "أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت", "أحد" ],
        daysMin: [ "ح", "ن", "ث", "ع", "خ", "ج", "س", "ح" ],
        months: [ "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر" ],
        monthsShort: [ "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر" ],
        today: "هذا اليوم",
        rtl: !0
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.az = {
        days: [ "Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə", "Bazar" ],
        daysShort: [ "B.", "B.e", "Ç.a", "Ç.", "C.a", "C.", "Ş.", "B." ],
        daysMin: [ "B.", "B.e", "Ç.a", "Ç.", "C.a", "C.", "Ş.", "B." ],
        months: [ "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun", "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr" ],
        monthsShort: [ "Yan", "Fev", "Mar", "Apr", "May", "İyun", "İyul", "Avq", "Sen", "Okt", "Noy", "Dek" ],
        today: "Bu gün",
        weekStart: 1
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.bg = {
        days: [ "Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота", "Неделя" ],
        daysShort: [ "Нед", "Пон", "Вто", "Сря", "Чет", "Пет", "Съб", "Нед" ],
        daysMin: [ "Н", "П", "В", "С", "Ч", "П", "С", "Н" ],
        months: [ "Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември" ],
        monthsShort: [ "Ян", "Фев", "Мар", "Апр", "Май", "Юни", "Юли", "Авг", "Сеп", "Окт", "Ное", "Дек" ],
        today: "днес"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.ca = {
        days: [ "Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte", "Diumenge" ],
        daysShort: [ "Diu", "Dil", "Dmt", "Dmc", "Dij", "Div", "Dis", "Diu" ],
        daysMin: [ "dg", "dl", "dt", "dc", "dj", "dv", "ds", "dg" ],
        months: [ "Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre" ],
        monthsShort: [ "Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des" ],
        today: "Avui"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.cs = {
        days: [ "Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle" ],
        daysShort: [ "Ned", "Pon", "Úte", "Stř", "Čtv", "Pát", "Sob", "Ned" ],
        daysMin: [ "Ne", "Po", "Út", "St", "Čt", "Pá", "So", "Ne" ],
        months: [ "Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec" ],
        monthsShort: [ "Led", "Úno", "Bře", "Dub", "Kvě", "Čer", "Čnc", "Srp", "Zář", "Říj", "Lis", "Pro" ],
        today: "Dnes"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.cy = {
        days: [ "Sul", "Llun", "Mawrth", "Mercher", "Iau", "Gwener", "Sadwrn", "Sul" ],
        daysShort: [ "Sul", "Llu", "Maw", "Mer", "Iau", "Gwe", "Sad", "Sul" ],
        daysMin: [ "Su", "Ll", "Ma", "Me", "Ia", "Gwe", "Sa", "Su" ],
        months: [ "Ionawr", "Chewfror", "Mawrth", "Ebrill", "Mai", "Mehefin", "Gorfennaf", "Awst", "Medi", "Hydref", "Tachwedd", "Rhagfyr" ],
        monthsShort: [ "Ion", "Chw", "Maw", "Ebr", "Mai", "Meh", "Gor", "Aws", "Med", "Hyd", "Tach", "Rha" ],
        today: "Heddiw"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.da = {
        days: [ "Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag" ],
        daysShort: [ "Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn" ],
        daysMin: [ "Sø", "Ma", "Ti", "On", "To", "Fr", "Lø", "Sø" ],
        months: [ "Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December" ],
        monthsShort: [ "Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec" ],
        today: "I Dag",
        clear: "Nulstil"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.de = {
        days: [ "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag" ],
        daysShort: [ "Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam", "Son" ],
        daysMin: [ "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So" ],
        months: [ "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember" ],
        monthsShort: [ "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez" ],
        today: "Heute",
        clear: "Löschen",
        weekStart: 1,
        format: "dd.mm.yyyy"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.el = {
        days: [ "Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο", "Κυριακή" ],
        daysShort: [ "Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ", "Κυρ" ],
        daysMin: [ "Κυ", "Δε", "Τρ", "Τε", "Πε", "Πα", "Σα", "Κυ" ],
        months: [ "Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος" ],
        monthsShort: [ "Ιαν", "Φεβ", "Μαρ", "Απρ", "Μάι", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ" ],
        today: "Σήμερα"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.es = {
        days: [ "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo" ],
        daysShort: [ "Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom" ],
        daysMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do" ],
        months: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
        monthsShort: [ "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic" ],
        today: "Hoy"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.et = {
        days: [ "Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev", "Pühapäev" ],
        daysShort: [ "Pühap", "Esmasp", "Teisip", "Kolmap", "Neljap", "Reede", "Laup", "Pühap" ],
        daysMin: [ "P", "E", "T", "K", "N", "R", "L", "P" ],
        months: [ "Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember" ],
        monthsShort: [ "Jaan", "Veebr", "Märts", "Apr", "Mai", "Juuni", "Juuli", "Aug", "Sept", "Okt", "Nov", "Dets" ],
        today: "Täna",
        clear: "Tühjenda",
        weekStart: 1,
        format: "dd.mm.yyyy"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.fa = {
        days: [ "یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه", "یک‌شنبه" ],
        daysShort: [ "یک", "دو", "سه", "چهار", "پنج", "جمعه", "شنبه", "یک" ],
        daysMin: [ "ی", "د", "س", "چ", "پ", "ج", "ش", "ی" ],
        months: [ "ژانویه", "فوریه", "مارس", "آوریل", "مه", "ژوئن", "ژوئیه", "اوت", "سپتامبر", "اکتبر", "نوامبر", "دسامبر" ],
        monthsShort: [ "ژان", "فور", "مار", "آور", "مه", "ژون", "ژوی", "اوت", "سپت", "اکت", "نوا", "دسا" ],
        today: "امروز",
        clear: "پاک کن",
        weekStart: 1,
        format: "yyyy/mm/dd"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.fi = {
        days: [ "sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai", "sunnuntai" ],
        daysShort: [ "sun", "maa", "tii", "kes", "tor", "per", "lau", "sun" ],
        daysMin: [ "su", "ma", "ti", "ke", "to", "pe", "la", "su" ],
        months: [ "tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu" ],
        monthsShort: [ "tam", "hel", "maa", "huh", "tou", "kes", "hei", "elo", "syy", "lok", "mar", "jou" ],
        today: "tänään",
        weekStart: 1,
        format: "d.m.yyyy"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.fr = {
        days: [ "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche" ],
        daysShort: [ "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim" ],
        daysMin: [ "D", "L", "Ma", "Me", "J", "V", "S", "D" ],
        months: [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre" ],
        monthsShort: [ "Jan", "Fév", "Mar", "Avr", "Mai", "Jui", "Jul", "Aou", "Sep", "Oct", "Nov", "Déc" ],
        today: "Aujourd'hui",
        clear: "Effacer",
        weekStart: 1,
        format: "dd/mm/yyyy"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.gl = {
        days: [ "Domingo", "Luns", "Martes", "Mércores", "Xoves", "Venres", "Sábado", "Domingo" ],
        daysShort: [ "Dom", "Lun", "Mar", "Mér", "Xov", "Ven", "Sáb", "Dom" ],
        daysMin: [ "Do", "Lu", "Ma", "Me", "Xo", "Ve", "Sa", "Do" ],
        months: [ "Xaneiro", "Febreiro", "Marzo", "Abril", "Maio", "Xuño", "Xullo", "Agosto", "Setembro", "Outubro", "Novembro", "Decembro" ],
        monthsShort: [ "Xan", "Feb", "Mar", "Abr", "Mai", "Xun", "Xul", "Ago", "Sep", "Out", "Nov", "Dec" ],
        today: "Hoxe",
        clear: "Limpar"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.he = {
        days: [ "ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת", "ראשון" ],
        daysShort: [ "א", "ב", "ג", "ד", "ה", "ו", "ש", "א" ],
        daysMin: [ "א", "ב", "ג", "ד", "ה", "ו", "ש", "א" ],
        months: [ "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר" ],
        monthsShort: [ "ינו", "פבר", "מרץ", "אפר", "מאי", "יונ", "יול", "אוג", "ספט", "אוק", "נוב", "דצמ" ],
        today: "היום",
        rtl: !0
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.hr = {
        days: [ "Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota", "Nedjelja" ],
        daysShort: [ "Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned" ],
        daysMin: [ "Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su", "Ne" ],
        months: [ "Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac" ],
        monthsShort: [ "Sij", "Velj", "Ožu", "Tra", "Svi", "Lip", "Srp", "Kol", "Ruj", "Lis", "Stu", "Pro" ],
        today: "Danas"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.hu = {
        days: [ "Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap" ],
        daysShort: [ "Vas", "Hét", "Ked", "Sze", "Csü", "Pén", "Szo", "Vas" ],
        daysMin: [ "Va", "Hé", "Ke", "Sz", "Cs", "Pé", "Sz", "Va" ],
        months: [ "Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December" ],
        monthsShort: [ "Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Sze", "Okt", "Nov", "Dec" ],
        today: "Ma",
        weekStart: 1,
        format: "yyyy.mm.dd"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.id = {
        days: [ "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu" ],
        daysShort: [ "Mgu", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Mgu" ],
        daysMin: [ "Mg", "Sn", "Sl", "Ra", "Ka", "Ju", "Sa", "Mg" ],
        months: [ "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember" ],
        monthsShort: [ "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des" ],
        today: "Hari Ini",
        clear: "Kosongkan"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.is = {
        days: [ "Sunnudagur", "Mánudagur", "Þriðjudagur", "Miðvikudagur", "Fimmtudagur", "Föstudagur", "Laugardagur", "Sunnudagur" ],
        daysShort: [ "Sun", "Mán", "Þri", "Mið", "Fim", "Fös", "Lau", "Sun" ],
        daysMin: [ "Su", "Má", "Þr", "Mi", "Fi", "Fö", "La", "Su" ],
        months: [ "Janúar", "Febrúar", "Mars", "Apríl", "Maí", "Júní", "Júlí", "Ágúst", "September", "Október", "Nóvember", "Desember" ],
        monthsShort: [ "Jan", "Feb", "Mar", "Apr", "Maí", "Jún", "Júl", "Ágú", "Sep", "Okt", "Nóv", "Des" ],
        today: "Í Dag"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.it = {
        days: [ "Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica" ],
        daysShort: [ "Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom" ],
        daysMin: [ "Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa", "Do" ],
        months: [ "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre" ],
        monthsShort: [ "Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic" ],
        today: "Oggi",
        clear: "Cancella",
        weekStart: 1,
        format: "dd/mm/yyyy"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.ja = {
        days: [ "日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜", "日曜" ],
        daysShort: [ "日", "月", "火", "水", "木", "金", "土", "日" ],
        daysMin: [ "日", "月", "火", "水", "木", "金", "土", "日" ],
        months: [ "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月" ],
        monthsShort: [ "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月" ],
        today: "今日",
        format: "yyyy/mm/dd"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.ka = {
        days: [ "კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი", "კვირა" ],
        daysShort: [ "კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ", "კვი" ],
        daysMin: [ "კვ", "ორ", "სა", "ოთ", "ხუ", "პა", "შა", "კვ" ],
        months: [ "იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომები", "ნოემბერი", "დეკემბერი" ],
        monthsShort: [ "იან", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ" ],
        today: "დღეს",
        clear: "გასუფთავება",
        weekStart: 1,
        format: "dd.mm.yyyy"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.kk = {
        days: [ "Жексенбі", "Дүйсенбі", "Сейсенбі", "Сәрсенбі", "Бейсенбі", "Жұма", "Сенбі", "Жексенбі" ],
        daysShort: [ "Жек", "Дүй", "Сей", "Сәр", "Бей", "Жұм", "Сен", "Жек" ],
        daysMin: [ "Жк", "Дс", "Сс", "Ср", "Бс", "Жм", "Сн", "Жк" ],
        months: [ "Қаңтар", "Ақпан", "Наурыз", "Сәуір", "Мамыр", "Маусым", "Шілде", "Тамыз", "Қыркүйек", "Қазан", "Қараша", "Желтоқсан" ],
        monthsShort: [ "Қаң", "Ақп", "Нау", "Сәу", "Мамыр", "Мау", "Шлд", "Тмз", "Қыр", "Қзн", "Қар", "Жел" ],
        today: "Бүгін",
        weekStart: 1
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.kr = {
        days: [ "일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일" ],
        daysShort: [ "일", "월", "화", "수", "목", "금", "토", "일" ],
        daysMin: [ "일", "월", "화", "수", "목", "금", "토", "일" ],
        months: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
        monthsShort: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ]
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.lt = {
        days: [ "Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis", "Sekmadienis" ],
        daysShort: [ "S", "Pr", "A", "T", "K", "Pn", "Š", "S" ],
        daysMin: [ "Sk", "Pr", "An", "Tr", "Ke", "Pn", "Št", "Sk" ],
        months: [ "Sausis", "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis", "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis" ],
        monthsShort: [ "Sau", "Vas", "Kov", "Bal", "Geg", "Bir", "Lie", "Rugp", "Rugs", "Spa", "Lap", "Gru" ],
        today: "Šiandien",
        weekStart: 1
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.lv = {
        days: [ "Svētdiena", "Pirmdiena", "Otrdiena", "Trešdiena", "Ceturtdiena", "Piektdiena", "Sestdiena", "Svētdiena" ],
        daysShort: [ "Sv", "P", "O", "T", "C", "Pk", "S", "Sv" ],
        daysMin: [ "Sv", "Pr", "Ot", "Tr", "Ce", "Pk", "Se", "Sv" ],
        months: [ "Janvāris", "Februāris", "Marts", "Aprīlis", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris" ],
        monthsShort: [ "Jan", "Feb", "Mar", "Apr", "Mai", "Jūn", "Jūl", "Aug", "Sep", "Okt", "Nov", "Dec" ],
        today: "Šodien",
        weekStart: 1
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.mk = {
        days: [ "Недела", "Понеделник", "Вторник", "Среда", "Четврток", "Петок", "Сабота", "Недела" ],
        daysShort: [ "Нед", "Пон", "Вто", "Сре", "Чет", "Пет", "Саб", "Нед" ],
        daysMin: [ "Не", "По", "Вт", "Ср", "Че", "Пе", "Са", "Не" ],
        months: [ "Јануари", "Февруари", "Март", "Април", "Мај", "Јуни", "Јули", "Август", "Септември", "Октомври", "Ноември", "Декември" ],
        monthsShort: [ "Јан", "Фев", "Мар", "Апр", "Мај", "Јун", "Јул", "Авг", "Сеп", "Окт", "Ное", "Дек" ],
        today: "Денес",
        format: "dd.mm.yyyy"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.ms = {
        days: [ "Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu", "Ahad" ],
        daysShort: [ "Aha", "Isn", "Sel", "Rab", "Kha", "Jum", "Sab", "Aha" ],
        daysMin: [ "Ah", "Is", "Se", "Ra", "Kh", "Ju", "Sa", "Ah" ],
        months: [ "Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember" ],
        monthsShort: [ "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ogo", "Sep", "Okt", "Nov", "Dis" ],
        today: "Hari Ini"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.nb = {
        days: [ "Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag" ],
        daysShort: [ "Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn" ],
        daysMin: [ "Sø", "Ma", "Ti", "On", "To", "Fr", "Lø", "Sø" ],
        months: [ "Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember" ],
        monthsShort: [ "Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des" ],
        today: "I Dag"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates["nl-BE"] = {
        days: [ "Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag" ],
        daysShort: [ "Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo" ],
        daysMin: [ "Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo" ],
        months: [ "Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December" ],
        monthsShort: [ "Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec" ],
        today: "Vandaag",
        clear: "Leegmaken",
        weekStart: 1,
        format: "dd/mm/yyyy"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.nl = {
        days: [ "Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag" ],
        daysShort: [ "Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo" ],
        daysMin: [ "Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo" ],
        months: [ "Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December" ],
        monthsShort: [ "Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec" ],
        today: "Vandaag"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.no = {
        days: [ "Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag" ],
        daysShort: [ "Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør" ],
        daysMin: [ "Sø", "Ma", "Ti", "On", "To", "Fr", "Lø" ],
        months: [ "Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember" ],
        monthsShort: [ "Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des" ],
        today: "I dag",
        clear: "Nullstill",
        weekStart: 1,
        format: "dd.mm.yyyy"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.pl = {
        days: [ "Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela" ],
        daysShort: [ "Nie", "Pn", "Wt", "Śr", "Czw", "Pt", "So", "Nie" ],
        daysMin: [ "N", "Pn", "Wt", "Śr", "Cz", "Pt", "So", "N" ],
        months: [ "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień" ],
        monthsShort: [ "Sty", "Lu", "Mar", "Kw", "Maj", "Cze", "Lip", "Sie", "Wrz", "Pa", "Lis", "Gru" ],
        today: "Dzisiaj",
        weekStart: 1
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates["pt-BR"] = {
        days: [ "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo" ],
        daysShort: [ "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom" ],
        daysMin: [ "Do", "Se", "Te", "Qu", "Qu", "Se", "Sa", "Do" ],
        months: [ "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ],
        monthsShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
        today: "Hoje",
        clear: "Limpar"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.pt = {
        days: [ "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo" ],
        daysShort: [ "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom" ],
        daysMin: [ "Do", "Se", "Te", "Qu", "Qu", "Se", "Sa", "Do" ],
        months: [ "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ],
        monthsShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
        today: "Hoje",
        clear: "Limpar"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.ro = {
        days: [ "Duminică", "Luni", "Marţi", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică" ],
        daysShort: [ "Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sâm", "Dum" ],
        daysMin: [ "Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ", "Du" ],
        months: [ "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie" ],
        monthsShort: [ "Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
        today: "Astăzi",
        clear: "Șterge",
        weekStart: 1
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates["rs-latin"] = {
        days: [ "Nedelja", "Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota", "Nedelja" ],
        daysShort: [ "Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned" ],
        daysMin: [ "N", "Po", "U", "Sr", "Č", "Pe", "Su", "N" ],
        months: [ "Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar" ],
        monthsShort: [ "Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec" ],
        today: "Danas"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.rs = {
        days: [ "Недеља", "Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота", "Недеља" ],
        daysShort: [ "Нед", "Пон", "Уто", "Сре", "Чет", "Пет", "Суб", "Нед" ],
        daysMin: [ "Н", "По", "У", "Ср", "Ч", "Пе", "Су", "Н" ],
        months: [ "Јануар", "Фебруар", "Март", "Април", "Мај", "Јун", "Јул", "Август", "Септембар", "Октобар", "Новембар", "Децембар" ],
        monthsShort: [ "Јан", "Феб", "Мар", "Апр", "Мај", "Јун", "Јул", "Авг", "Сеп", "Окт", "Нов", "Дец" ],
        today: "Данас"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.ru = {
        days: [ "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье" ],
        daysShort: [ "Вск", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб", "Вск" ],
        daysMin: [ "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс" ],
        months: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
        monthsShort: [ "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек" ],
        today: "Сегодня",
        weekStart: 1
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.sk = {
        days: [ "Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota", "Nedeľa" ],
        daysShort: [ "Ned", "Pon", "Uto", "Str", "Štv", "Pia", "Sob", "Ned" ],
        daysMin: [ "Ne", "Po", "Ut", "St", "Št", "Pia", "So", "Ne" ],
        months: [ "Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December" ],
        monthsShort: [ "Jan", "Feb", "Mar", "Apr", "Máj", "Jún", "Júl", "Aug", "Sep", "Okt", "Nov", "Dec" ],
        today: "Dnes"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.sl = {
        days: [ "Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota", "Nedelja" ],
        daysShort: [ "Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob", "Ned" ],
        daysMin: [ "Ne", "Po", "To", "Sr", "Če", "Pe", "So", "Ne" ],
        months: [ "Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December" ],
        monthsShort: [ "Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec" ],
        today: "Danes"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.sq = {
        days: [ "E Diel", "E Hënë", "E martē", "E mërkurë", "E Enjte", "E Premte", "E Shtunë", "E Diel" ],
        daysShort: [ "Die", "Hën", "Mar", "Mër", "Enj", "Pre", "Shtu", "Die" ],
        daysMin: [ "Di", "Hë", "Ma", "Më", "En", "Pr", "Sht", "Di" ],
        months: [ "Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor", "Korrik", "Gusht", "Shtator", "Tetor", "Nëntor", "Dhjetor" ],
        monthsShort: [ "Jan", "Shk", "Mar", "Pri", "Maj", "Qer", "Korr", "Gu", "Sht", "Tet", "Nën", "Dhjet" ],
        today: "Sot"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.sv = {
        days: [ "Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag" ],
        daysShort: [ "Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön" ],
        daysMin: [ "Sö", "Må", "Ti", "On", "To", "Fr", "Lö", "Sö" ],
        months: [ "Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December" ],
        monthsShort: [ "Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec" ],
        today: "Idag",
        format: "yyyy-mm-dd",
        weekStart: 1
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.sw = {
        days: [ "Jumapili", "Jumatatu", "Jumanne", "Jumatano", "Alhamisi", "Ijumaa", "Jumamosi", "Jumapili" ],
        daysShort: [ "J2", "J3", "J4", "J5", "Alh", "Ij", "J1", "J2" ],
        daysMin: [ "2", "3", "4", "5", "A", "I", "1", "2" ],
        months: [ "Januari", "Februari", "Machi", "Aprili", "Mei", "Juni", "Julai", "Agosti", "Septemba", "Oktoba", "Novemba", "Desemba" ],
        monthsShort: [ "Jan", "Feb", "Mac", "Apr", "Mei", "Jun", "Jul", "Ago", "Sep", "Okt", "Nov", "Des" ],
        today: "Leo"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.th = {
        days: [ "อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์" ],
        daysShort: [ "อา", "จ", "อ", "พ", "พฤ", "ศ", "ส", "อา" ],
        daysMin: [ "อา", "จ", "อ", "พ", "พฤ", "ศ", "ส", "อา" ],
        months: [ "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม" ],
        monthsShort: [ "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค." ],
        today: "วันนี้"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.tr = {
        days: [ "Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar" ],
        daysShort: [ "Pz", "Pzt", "Sal", "Çrş", "Prş", "Cu", "Cts", "Pz" ],
        daysMin: [ "Pz", "Pzt", "Sa", "Çr", "Pr", "Cu", "Ct", "Pz" ],
        months: [ "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık" ],
        monthsShort: [ "Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara" ],
        today: "Bugün",
        format: "dd.mm.yyyy"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.ua = {
        days: [ "Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятница", "Субота", "Неділя" ],
        daysShort: [ "Нед", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб", "Нед" ],
        daysMin: [ "Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд" ],
        months: [ "Cічень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень" ],
        monthsShort: [ "Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру" ],
        today: "Сьогодні",
        weekStart: 1
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates.vi = {
        days: [ "Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy", "Chủ nhật" ],
        daysShort: [ "CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN" ],
        daysMin: [ "CN", "T2", "T3", "T4", "T5", "T6", "T7", "CN" ],
        months: [ "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12" ],
        monthsShort: [ "Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9", "Th10", "Th11", "Th12" ],
        today: "Hôm nay",
        clear: "Xóa",
        format: "dd/mm/yyyy"
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates["zh-CN"] = {
        days: [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日" ],
        daysShort: [ "周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日" ],
        daysMin: [ "日", "一", "二", "三", "四", "五", "六", "日" ],
        months: [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
        monthsShort: [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
        today: "今日",
        format: "yyyy年mm月dd日",
        weekStart: 1
    };
}(jQuery), function(a) {
    a.fn.datepicker.dates["zh-TW"] = {
        days: [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日" ],
        daysShort: [ "週日", "週一", "週二", "週三", "週四", "週五", "週六", "週日" ],
        daysMin: [ "日", "一", "二", "三", "四", "五", "六", "日" ],
        months: [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
        monthsShort: [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
        today: "今天",
        format: "yyyy年mm月dd日",
        weekStart: 1
    };
}(jQuery), function(a, b) {
    "use strict";
    function c(a) {
        var b, c, d, f, g, h = a || {};
        b = h.elements || e.getAllElements();
        for (var i = 0, j = b.length; j > i; i++) if (c = b[i], d = c.parentNode, f = void 0, 
        g = void 0, c[e.ns] || (c[e.ns] = {}), h.reevaluate || !c[e.ns].evaluated) {
            if ("PICTURE" === d.nodeName.toUpperCase()) {
                if (e.removeVideoShim(d), f = e.getMatch(c, d), f === !1) continue;
            } else f = void 0;
            ("PICTURE" === d.nodeName.toUpperCase() || c.srcset && !e.srcsetSupported || !e.sizesSupported && c.srcset && c.srcset.indexOf("w") > -1) && e.dodgeSrcset(c), 
            f ? (g = e.processSourceSet(f), e.applyBestCandidate(g, c)) : (g = e.processSourceSet(c), 
            (void 0 === c.srcset || c[e.ns].srcset) && e.applyBestCandidate(g, c)), c[e.ns].evaluated = !0;
        }
    }
    function d() {
        function d() {
            var b;
            a._picturefillWorking || (a._picturefillWorking = !0, a.clearTimeout(b), b = a.setTimeout(function() {
                c({
                    reevaluate: !0
                }), a._picturefillWorking = !1;
            }, 60));
        }
        c();
        var e = setInterval(function() {
            return c(), /^loaded|^i|^c/.test(b.readyState) ? void clearInterval(e) : void 0;
        }, 250);
        a.addEventListener ? a.addEventListener("resize", d, !1) : a.attachEvent && a.attachEvent("onresize", d);
    }
    if (a.HTMLPictureElement) return void (a.picturefill = function() {});
    b.createElement("picture");
    var e = {};
    e.ns = "picturefill", function() {
        var a = b.createElement("img");
        e.srcsetSupported = "srcset" in a, e.sizesSupported = "sizes" in a;
    }(), e.trim = function(a) {
        return a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "");
    }, e.endsWith = function(a, b) {
        return a.endsWith ? a.endsWith(b) : -1 !== a.indexOf(b, a.length - b.length);
    }, e.restrictsMixedContent = function() {
        return "https:" === a.location.protocol;
    }, e.matchesMedia = function(b) {
        return a.matchMedia && a.matchMedia(b).matches;
    }, e.getDpr = function() {
        return a.devicePixelRatio || 1;
    }, e.getWidthFromLength = function(a) {
        return a = a && a.indexOf("%") > -1 == !1 && (parseFloat(a) > 0 || a.indexOf("calc(") > -1) ? a : "100vw", 
        a = a.replace("vw", "%"), e.lengthEl || (e.lengthEl = b.createElement("div"), b.documentElement.insertBefore(e.lengthEl, b.documentElement.firstChild)), 
        e.lengthEl.style.cssText = "position: absolute; left: 0; width: " + a + ";", e.lengthEl.className = "helper-from-picturefill-js", 
        e.lengthEl.offsetWidth <= 0 && (e.lengthEl.style.cssText = "width: 100%;"), e.lengthEl.offsetWidth;
    }, e.types = {}, e.types["image/jpeg"] = !0, e.types["image/gif"] = !0, e.types["image/png"] = !0, 
    e.types["image/svg+xml"] = b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"), 
    e.types["image/webp"] = function() {
        var b = new a.Image(), d = "image/webp";
        b.onerror = function() {
            e.types[d] = !1, c();
        }, b.onload = function() {
            e.types[d] = 1 === b.width, c();
        }, b.src = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
    }, e.verifyTypeSupport = function(a) {
        var b = a.getAttribute("type");
        return null === b || "" === b ? !0 : "function" == typeof e.types[b] ? (e.types[b](), 
        "pending") : e.types[b];
    }, e.parseSize = function(a) {
        var b = /(\([^)]+\))?\s*(.+)/g.exec(a);
        return {
            media: b && b[1],
            length: b && b[2]
        };
    }, e.findWidthFromSourceSize = function(a) {
        for (var b, c = e.trim(a).split(/\s*,\s*/), d = 0, f = c.length; f > d; d++) {
            var g = c[d], h = e.parseSize(g), i = h.length, j = h.media;
            if (i && (!j || e.matchesMedia(j))) {
                b = i;
                break;
            }
        }
        return e.getWidthFromLength(b);
    }, e.parseSrcset = function(a) {
        for (var b = []; "" !== a; ) {
            a = a.replace(/^\s+/g, "");
            var c, d = a.search(/\s/g), e = null;
            if (-1 !== d) {
                c = a.slice(0, d);
                var f = c[c.length - 1];
                if (("," === f || "" === c) && (c = c.replace(/,+$/, ""), e = ""), a = a.slice(d + 1), 
                null === e) {
                    var g = a.indexOf(",");
                    -1 !== g ? (e = a.slice(0, g), a = a.slice(g + 1)) : (e = a, a = "");
                }
            } else c = a, a = "";
            (c || e) && b.push({
                url: c,
                descriptor: e
            });
        }
        return b;
    }, e.parseDescriptor = function(a, b) {
        var c, d = b || "100vw", f = a && a.replace(/(^\s+|\s+$)/g, ""), g = e.findWidthFromSourceSize(d);
        if (f) for (var h = f.split(" "), i = h.length + 1; i >= 0; i--) if (void 0 !== h[i]) {
            var j = h[i], k = j && j.slice(j.length - 1);
            if ("h" !== k && "w" !== k || e.sizesSupported) {
                if ("x" === k) {
                    var l = j && parseFloat(j, 10);
                    c = l && !isNaN(l) ? l : 1;
                }
            } else c = parseFloat(parseInt(j, 10) / g), c === 1 / 0 && (c = 0);
        }
        return c || 1;
    }, e.getCandidatesFromSourceSet = function(a, b) {
        for (var c = e.parseSrcset(a), d = [], f = 0, g = c.length; g > f; f++) {
            var h = c[f];
            d.push({
                url: h.url,
                resolution: e.parseDescriptor(h.descriptor, b)
            });
        }
        return d;
    }, e.dodgeSrcset = function(a) {
        a.srcset && (a[e.ns].srcset = a.srcset, a.removeAttribute("srcset"));
    }, e.processSourceSet = function(a) {
        var b = a.getAttribute("srcset"), c = a.getAttribute("sizes"), d = [];
        return "IMG" === a.nodeName.toUpperCase() && a[e.ns] && a[e.ns].srcset && (b = a[e.ns].srcset), 
        b && (d = e.getCandidatesFromSourceSet(b, c)), d;
    }, e.applyBestCandidate = function(a, b) {
        var c, d, f;
        a.sort(e.ascendingSort), d = a.length, f = a[d - 1];
        for (var g = 0; d > g; g++) if (c = a[g], c.resolution >= e.getDpr()) {
            f = c;
            break;
        }
        f && !e.endsWith(b.src, f.url) && (e.restrictsMixedContent() && "http:" === f.url.substr(0, "http:".length).toLowerCase() ? void 0 !== typeof console && console.warn("Blocked mixed content image " + f.url) : (b.src = f.url, 
        b.currentSrc = b.src));
    }, e.ascendingSort = function(a, b) {
        return a.resolution - b.resolution;
    }, e.removeVideoShim = function(a) {
        var b = a.getElementsByTagName("video");
        if (b.length) {
            for (var c = b[0], d = c.getElementsByTagName("source"); d.length; ) a.insertBefore(d[0], c);
            c.parentNode.removeChild(c);
        }
    }, e.getAllElements = function() {
        for (var a = [], c = b.getElementsByTagName("img"), d = 0, f = c.length; f > d; d++) {
            var g = c[d];
            ("PICTURE" === g.parentNode.nodeName.toUpperCase() || null !== g.getAttribute("srcset") || g[e.ns] && null !== g[e.ns].srcset) && a.push(g);
        }
        return a;
    }, e.getMatch = function(a, b) {
        for (var c, d = b.childNodes, f = 0, g = d.length; g > f; f++) {
            var h = d[f];
            if (1 === h.nodeType) {
                if (h === a) return c;
                if ("SOURCE" === h.nodeName.toUpperCase()) {
                    null !== h.getAttribute("src") && void 0 !== typeof console && console.warn("The `src` attribute is invalid on `picture` `source` element; instead, use `srcset`.");
                    var i = h.getAttribute("media");
                    if (h.getAttribute("srcset") && (!i || e.matchesMedia(i))) {
                        var j = e.verifyTypeSupport(h);
                        if (j === !0) {
                            c = h;
                            break;
                        }
                        if ("pending" === j) return !1;
                    }
                }
            }
        }
        return c;
    }, d(), c._ = e, "object" == typeof module && "object" == typeof module.exports ? module.exports = c : "function" == typeof define && define.amd ? define(function() {
        return c;
    }) : "object" == typeof a && (a.picturefill = c);
}(this, this.document), function(a) {
    "use strict";
    function b() {}
    function c() {
        try {
            return document.activeElement;
        } catch (a) {}
    }
    function d(a, b) {
        for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return !0;
        return !1;
    }
    function e(a, b, c) {
        return a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : void 0;
    }
    function f(a, b) {
        var c;
        a.createTextRange ? (c = a.createTextRange(), c.move("character", b), c.select()) : a.selectionStart && (a.focus(), 
        a.setSelectionRange(b, b));
    }
    function g(a, b) {
        try {
            return a.type = b, !0;
        } catch (c) {
            return !1;
        }
    }
    function h(a, b) {
        if (a && a.getAttribute(B)) b(a); else for (var c, d = a ? a.getElementsByTagName("input") : N, e = a ? a.getElementsByTagName("textarea") : O, f = d ? d.length : 0, g = e ? e.length : 0, h = f + g, i = 0; h > i; i++) c = f > i ? d[i] : e[i - f], 
        b(c);
    }
    function i(a) {
        h(a, k);
    }
    function j(a) {
        h(a, l);
    }
    function k(a, b) {
        var c = !!b && a.value !== b, d = a.value === a.getAttribute(B);
        if ((c || d) && "true" === a.getAttribute(C)) {
            a.removeAttribute(C), a.value = a.value.replace(a.getAttribute(B), ""), a.className = a.className.replace(A, "");
            var e = a.getAttribute(I);
            parseInt(e, 10) >= 0 && (a.setAttribute("maxLength", e), a.removeAttribute(I));
            var f = a.getAttribute(D);
            return f && (a.type = f), !0;
        }
        return !1;
    }
    function l(a) {
        var b = a.getAttribute(B);
        if ("" === a.value && b) {
            a.setAttribute(C, "true"), a.value = b, a.className += " " + z;
            var c = a.getAttribute(I);
            c || (a.setAttribute(I, a.maxLength), a.removeAttribute("maxLength"));
            var d = a.getAttribute(D);
            return d ? a.type = "text" : "password" === a.type && g(a, "text") && a.setAttribute(D, "password"), 
            !0;
        }
        return !1;
    }
    function m(a) {
        return function() {
            P && a.value === a.getAttribute(B) && "true" === a.getAttribute(C) ? f(a, 0) : k(a);
        };
    }
    function n(a) {
        return function() {
            l(a);
        };
    }
    function o(a) {
        return function() {
            i(a);
        };
    }
    function p(a) {
        return function(b) {
            return v = a.value, "true" === a.getAttribute(C) && v === a.getAttribute(B) && d(x, b.keyCode) ? (b.preventDefault && b.preventDefault(), 
            !1) : void 0;
        };
    }
    function q(a) {
        return function() {
            k(a, v), "" === a.value && (a.blur(), f(a, 0));
        };
    }
    function r(a) {
        return function() {
            a === c() && a.value === a.getAttribute(B) && "true" === a.getAttribute(C) && f(a, 0);
        };
    }
    function s(a) {
        var b = a.form;
        b && "string" == typeof b && (b = document.getElementById(b), b.getAttribute(E) || (e(b, "submit", o(b)), 
        b.setAttribute(E, "true"))), e(a, "focus", m(a)), e(a, "blur", n(a)), P && (e(a, "keydown", p(a)), 
        e(a, "keyup", q(a)), e(a, "click", r(a))), a.setAttribute(F, "true"), a.setAttribute(B, T), 
        (P || a !== c()) && l(a);
    }
    var t = document.createElement("input"), u = void 0 !== t.placeholder;
    if (a.Placeholders = {
        nativeSupport: u,
        disable: u ? b : i,
        enable: u ? b : j
    }, !u) {
        var v, w = [ "text", "search", "url", "tel", "email", "password", "number", "textarea" ], x = [ 27, 33, 34, 35, 36, 37, 38, 39, 40, 8, 46 ], y = "#ccc", z = "placeholdersjs", A = new RegExp("(?:^|\\s)" + z + "(?!\\S)"), B = "data-placeholder-value", C = "data-placeholder-active", D = "data-placeholder-type", E = "data-placeholder-submit", F = "data-placeholder-bound", G = "data-placeholder-focus", H = "data-placeholder-live", I = "data-placeholder-maxlength", J = 100, K = document.getElementsByTagName("head")[0], L = document.documentElement, M = a.Placeholders, N = document.getElementsByTagName("input"), O = document.getElementsByTagName("textarea"), P = "false" === L.getAttribute(G), Q = "false" !== L.getAttribute(H), R = document.createElement("style");
        R.type = "text/css";
        var S = document.createTextNode("." + z + " {color:" + y + ";}");
        R.styleSheet ? R.styleSheet.cssText = S.nodeValue : R.appendChild(S), K.insertBefore(R, K.firstChild);
        for (var T, U, V = 0, W = N.length + O.length; W > V; V++) U = V < N.length ? N[V] : O[V - N.length], 
        T = U.attributes.placeholder, T && (T = T.nodeValue, T && d(w, U.type) && s(U));
        var X = setInterval(function() {
            for (var a = 0, b = N.length + O.length; b > a; a++) U = a < N.length ? N[a] : O[a - N.length], 
            T = U.attributes.placeholder, T ? (T = T.nodeValue, T && d(w, U.type) && (U.getAttribute(F) || s(U), 
            (T !== U.getAttribute(B) || "password" === U.type && !U.getAttribute(D)) && ("password" === U.type && !U.getAttribute(D) && g(U, "text") && U.setAttribute(D, "password"), 
            U.value === U.getAttribute(B) && (U.value = T), U.setAttribute(B, T)))) : U.getAttribute(C) && (k(U), 
            U.removeAttribute(B));
            Q || clearInterval(X);
        }, J);
        e(a, "beforeunload", function() {
            M.disable();
        });
    }
}(this);

var map, themes = {
    Bentley: [ {
        featureType: "landscape",
        stylers: [ {
            hue: "#F1FF00"
        }, {
            saturation: -27.4
        }, {
            lightness: 9.4
        }, {
            gamma: 1
        } ]
    }, {
        featureType: "road.highway",
        stylers: [ {
            hue: "#0099FF"
        }, {
            saturation: -20
        }, {
            lightness: 36.4
        }, {
            gamma: 1
        } ]
    }, {
        featureType: "road.arterial",
        stylers: [ {
            hue: "#00FF4F"
        }, {
            saturation: 0
        }, {
            lightness: 0
        }, {
            gamma: 1
        } ]
    }, {
        featureType: "road.local",
        stylers: [ {
            hue: "#FFB300"
        }, {
            saturation: -38
        }, {
            lightness: 11.2
        }, {
            gamma: 1
        } ]
    }, {
        featureType: "water",
        stylers: [ {
            hue: "#00B6FF"
        }, {
            saturation: 4.2
        }, {
            lightness: -63.4
        }, {
            gamma: 1
        } ]
    }, {
        featureType: "poi",
        stylers: [ {
            hue: "#9FFF00"
        }, {
            saturation: 0
        }, {
            lightness: 0
        }, {
            gamma: 1
        } ]
    } ],
    MapBox: [ {
        featureType: "water",
        stylers: [ {
            saturation: 43
        }, {
            lightness: -11
        }, {
            hue: "#0088ff"
        } ]
    }, {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [ {
            hue: "#ff0000"
        }, {
            saturation: -100
        }, {
            lightness: 99
        } ]
    }, {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [ {
            color: "#808080"
        }, {
            lightness: 54
        } ]
    }, {
        featureType: "landscape.man_made",
        elementType: "geometry.fill",
        stylers: [ {
            color: "#ece2d9"
        } ]
    }, {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [ {
            color: "#ccdca1"
        } ]
    }, {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [ {
            color: "#767676"
        } ]
    }, {
        featureType: "road",
        elementType: "labels.text.stroke",
        stylers: [ {
            color: "#ffffff"
        } ]
    }, {
        featureType: "poi",
        stylers: [ {
            visibility: "off"
        } ]
    }, {
        featureType: "landscape.natural",
        elementType: "geometry.fill",
        stylers: [ {
            visibility: "on"
        }, {
            color: "#b8cb93"
        } ]
    }, {
        featureType: "poi.park",
        stylers: [ {
            visibility: "on"
        } ]
    }, {
        featureType: "poi.sports_complex",
        stylers: [ {
            visibility: "on"
        } ]
    }, {
        featureType: "poi.medical",
        stylers: [ {
            visibility: "on"
        } ]
    }, {
        featureType: "poi.business",
        stylers: [ {
            visibility: "simplified"
        } ]
    } ],
    PastelTones: [ {
        featureType: "landscape",
        stylers: [ {
            saturation: -100
        }, {
            lightness: 60
        } ]
    }, {
        featureType: "road.local",
        stylers: [ {
            saturation: -100
        }, {
            lightness: 40
        }, {
            visibility: "on"
        } ]
    }, {
        featureType: "transit",
        stylers: [ {
            saturation: -100
        }, {
            visibility: "simplified"
        } ]
    }, {
        featureType: "administrative.province",
        stylers: [ {
            visibility: "off"
        } ]
    }, {
        featureType: "water",
        stylers: [ {
            visibility: "on"
        }, {
            lightness: 30
        } ]
    }, {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [ {
            color: "#ef8c25"
        }, {
            lightness: 40
        } ]
    }, {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [ {
            visibility: "off"
        } ]
    }, {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [ {
            color: "#b6c54c"
        }, {
            lightness: 40
        }, {
            saturation: -40
        } ]
    } ],
    LightOnDarkGray: [ {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [ {
            color: "#444444"
        } ]
    }, {
        featureType: "landscape",
        elementType: "all",
        stylers: [ {
            color: "#f2f2f2"
        } ]
    }, {
        featureType: "poi",
        elementType: "all",
        stylers: [ {
            visibility: "off"
        } ]
    }, {
        featureType: "road",
        elementType: "all",
        stylers: [ {
            saturation: -100
        }, {
            lightness: 45
        } ]
    }, {
        featureType: "road.highway",
        elementType: "all",
        stylers: [ {
            visibility: "simplified"
        } ]
    }, {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [ {
            visibility: "off"
        } ]
    }, {
        featureType: "transit",
        elementType: "all",
        stylers: [ {
            visibility: "off"
        } ]
    }, {
        featureType: "water",
        elementType: "all",
        stylers: [ {
            color: "#4f595d"
        }, {
            visibility: "on"
        } ]
    } ],
    Grayscale: [ {
        featureType: "administrative",
        elementType: "all",
        stylers: [ {
            visibility: "off"
        } ]
    }, {
        featureType: "water",
        elementType: "all",
        stylers: [ {
            color: "#EAEAEA"
        } ]
    }, {
        featureType: "landscape",
        elementType: "all",
        stylers: [ {
            color: "#838383"
        } ]
    }, {
        featureType: "poi",
        elementType: "all",
        stylers: [ {
            color: "#838383"
        } ]
    }, {
        featureType: "road",
        elementType: "all",
        stylers: [ {
            visibility: "off"
        } ]
    }, {
        featureType: "transit",
        elementType: "all",
        stylers: [ {
            visibility: "off"
        } ]
    }, {
        featureType: "all",
        elementType: "labels",
        stylers: [ {
            visibility: "off"
        } ]
    } ]
}, getOffset = function(a) {
    for (var b = 0, c = 0; a && !isNaN(a.offsetLeft) && !isNaN(a.offsetTop); ) b += a.offsetLeft, 
    c += a.offsetTop, a = a.offsetParent;
    return {
        top: c,
        left: b
    };
}, scrollTo = function(a, b, c, d) {
    var e = document.documentElement.scrollTop ? document.documentElement : document.body, f = e.scrollTop;
    if (f === a) return void ("undefined" != typeof d && d());
}, easing = {
    linear: function(a) {
        return a;
    },
    easeInQuad: function(a) {
        return a * a;
    },
    easeOutQuad: function(a) {
        return a * (2 - a);
    },
    easeInOutQuad: function(a) {
        return .5 > a ? 2 * a * a : -1 + (4 - 2 * a) * a;
    },
    easeInCubic: function(a) {
        return a * a * a;
    },
    easeOutCubic: function(a) {
        return --a * a * a + 1;
    },
    easeInOutCubic: function(a) {
        return .5 > a ? 4 * a * a * a : (a - 1) * (2 * a - 2) * (2 * a - 2) + 1;
    },
    easeInQuart: function(a) {
        return a * a * a * a;
    },
    easeOutQuart: function(a) {
        return 1 - --a * a * a * a;
    },
    easeInOutQuart: function(a) {
        return .5 > a ? 8 * a * a * a * a : 1 - 8 * --a * a * a * a;
    },
    easeInQuint: function(a) {
        return a * a * a * a * a;
    },
    easeOutQuint: function(a) {
        return 1 + --a * a * a * a * a;
    },
    easeInOutQuint: function(a) {
        return .5 > a ? 16 * a * a * a * a * a : 1 + 16 * --a * a * a * a * a;
    }
};

window.console || (console = {
    log: function() {}
}), String.prototype.bool = function() {
    return /^true$/i.test(this);
};

var sliderInit = function(a) {
    var b = $("#" + a), c = b.find(".slider-container-wrapper"), d = b.find(".slider-container"), e = b.find(".slider-movable"), f = b.attr("data-bullets") ? b.attr("data-bullets").bool() : config.slider.bullets, g = b.attr("data-arrows") ? b.attr("data-arrows").bool() : config.slider.arrows, h = b.attr("data-slideshow") ? b.attr("data-slideshow").bool() : config.slider.slideshow, i = b.attr("data-animation") ? b.attr("data-animation") : config.slider.animation, j = b.width() / 6, k = 50, l = config.slider.duration, m = config.slider.interval, n = b.width(), o = 0;
    d.clone().prependTo(e), d = b.find(".slider-container"), d.css({
        width: n
    });
    var p = d.length / 2, q = p > 1, r = function() {
        n = b.width(), d.css({
            width: n
        }), e.css({
            "margin-left": n * (G - p),
            width: n * d.size(),
            height: d.eq(E % p).height(),
            left: -n * G
        });
    };
    r();
    var s = '<div class="slider-arrow-wrapper">\r\n						<div class="slider-arrow slider-arrow-prev valign-middle">\r\n							<img class="svg icon icon-caret-left" src="img/icons/icon-caret-left.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-caret-left.png\'">\r\n						</div>\r\n						<div class="slider-arrow slider-arrow-next valign-middle">\r\n							<img class="svg icon icon-caret-right" src="img/icons/icon-caret-right.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-caret-right.png\'">\r\n						</div>\r\n					</div>';
    c.prepend(s), initSVGs();
    var t = b.find(".slider-arrow"), u = b.find(".slider-arrow-prev"), v = b.find(".slider-arrow-next");
    g === !0 && q && t.show();
    var w;
    if (f === !0 && q) {
        var x = '<div class="slider-nav"></div>';
        b.append(x);
        for (var y = b.find(".slider-nav"), z = 0; p > z; z++) {
            var A = '<div class="slider-bullet">&bull;</div>';
            y.append(A);
        }
        w = b.find(".slider-bullet");
    } else w = b.find(".bullet");
    var B, C, D = !1, E = 0, F = 0, G = 0, H = 0, I = 0, J = d.length - 1, K = function() {
        if ("prev" == B) for (var a = J; a >= E; a--) e.prepend(d.eq(a)); else for (var b = I; E >= b; b++) e.append(d.eq(b - 1));
        e.css({
            "margin-left": n * (G - p)
        });
    }, L = function() {
        D === !1 && (B = "prev", F = E, G--, I >= E ? (E = J, H--) : E--, K(), O());
    }, M = function() {
        D === !1 && (B = "next", F = E, G++, E == J ? (E = I, H++) : E++, K(), O());
    }, N = function(a) {
        D === !1 && (E = p > E ? a : a + p, G = E + (J + 1) * H, F > E && (B = "prev"), 
        E > F && (B = "next"), K(), O(), F = E);
    }, O = function() {
        D = !0, o = -(n * G), "slide" === i && e.animate({
            height: d.eq(E % p).height(),
            left: o
        }, {
            duration: l,
            complete: function() {
                D = !1, l = config.slider.duration, r();
            }
        }), "fade" === i && e.hide().css({
            left: o
        }).fadeIn(l + 250).animate({
            height: d.eq(E % p).height()
        }, {
            duration: l,
            complete: function() {
                D = !1, l = config.slider.duration, r();
            }
        }), w.removeClass("active"), w.eq(E % p).addClass("active");
    };
    if (O(), v.on("click", function() {
        M();
    }), u.on("click", function() {
        L();
    }), w.on("click", function() {
        var a = $(this).index();
        N(a);
        var c = getOffset(b).top - 100;
        scrollTo(c, 350, easing.easeOutQuad);
    }), "slide" === i) {
        var P, Q, R, S = !1, T = !1, U = b.offset().top + k / 2, V = b.offset().top + b.height() - k / 2, W = b.offset().left + k, X = b.offset().left + b.width() - k;
        e.on("mousedown touchstart", function(a) {
            config.application.touch || a.preventDefault(), P = a.pageX || a.originalEvent.touches[0].pageX, 
            Q = a.pageX || a.originalEvent.touches[0].pageX, S = !0;
        }).on("mousemove touchmove", function(a) {
            if (Q = a.pageX || a.originalEvent.touches[0].pageX, dragY = a.pageY || a.originalEvent.touches[0].pageY, 
            initDrag = Q - P > config.slider.threshold || Q - P < -config.slider.threshold, 
            S && initDrag && !D) {
                config.application.touch || a.preventDefault(), T = !0, e.css({
                    left: o - (P - Q)
                });
                var b = W >= Q || Q >= X || dragY <= U || dragY >= V;
                b && (P - Q > j ? (S = !1, T = !1, M()) : -j > P - Q ? (S = !1, T = !1, L()) : (l = 250, 
                S = !1, T = !1, O()));
            }
        }).on("mouseleave mouseup touchend", function(a) {
            config.application.touch || a.preventDefault(), S = !1, T && !D && (T = !1, R = Q, 
            P - R > j ? M() : -j > P - R ? L() : O());
        });
    }
    document.onkeydown = function(a) {
        switch (a = a || window.event, a.which || a.keyCode) {
          case 39:
            M();
            break;

          case 37:
            L();
            break;

          default:
            return;
        }
        a.preventDefault();
    };
    var Y = function() {
        e.removeClass("stopped"), C = setInterval(M, m);
    }, Z = function() {
        e.addClass("stopped"), clearInterval(C);
    };
    h !== !1 && q && (Y(), config.application.touch ? (e.on("click touchstart", function() {
        Z();
    }), $("html").on("click touchstart", function(a) {
        !$(a.target).closest(".slider").length && e.hasClass("stopped") && Y();
    })) : (b.on("mouseenter", function() {
        Z();
    }), b.on("mouseleave", function() {
        Y();
    }))), $(window).on("resize", function() {
        r();
    });
}, initSliders = function() {
    var a = $("[data-slider]");
    a.length && (a.each(function(a, b) {
        setTimeout(function() {
            sliderInit(b.id = "slider-" + a);
        }, 250 * a);
    }).find(".slider-container").css({
        visibility: "visible"
    }), config.application.debug && console.log("Widget :: Sliders"));
}, initTooltips = function() {
    if ($("[data-tooltip]").length) {
        var a = function(a, b) {
            var c = $(".tooltip"), d = a.pageX || a.originalEvent.touches[0].pageX, e = a.pageY || a.originalEvent.touches[0].pageY;
            switch (c.html(b).addClass("active"), config.tooltip.position) {
              case "left":
                c.css({
                    top: e - c.outerHeight() - 10,
                    left: d - c.outerWidth()
                });
                break;

              case "center":
                c.css({
                    top: e - c.outerHeight() - 10,
                    left: d - c.outerWidth() / 2 - 5
                });
                break;

              case "right":
                c.css({
                    top: e - c.outerHeight() - 10,
                    left: d
                });
                break;

              default:
                c.css({
                    top: e - c.outerHeight() - 10,
                    left: d - c.outerWidth() / 2 - 5
                });
            }
            var f = {
                left: c.offset().left,
                right: c.offset().left + c.outerWidth()
            }, g = {
                left: $(".wrapper").offset().left + 20,
                right: $(".wrapper").offset().left + $(".wrapper").outerWidth() - 20
            };
            config.tooltip.bound && (f.left <= g.left && c.css({
                left: g.left
            }), f.right >= g.right && c.css({
                left: g.right - c.outerWidth()
            }));
        };
        $("[data-tooltip]").each(function() {
            var b = $(this), c = b.data("tooltip");
            config.application.touch ? (b.on("click", function(b) {
                $(".tooltip").remove(), $("body").prepend('<div class="tooltip"></div>'), a(b, c);
            }), $("html, body").on("click", function(a) {
                $(a.target).closest("[data-tooltip]").length || $(".tooltip").remove();
            })) : b.on("mouseenter", function(b) {
                $("body").prepend('<div class="tooltip"></div>'), $(this).on("mousemove", function(b) {
                    a(b, c);
                });
            }).on("mouseleave", function() {
                $(".tooltip").remove();
            });
        }), config.application.debug && console.log("Widget :: Tooltips");
    }
};

!function(a, b) {
    "function" == typeof define && define.amd ? define([], b) : "object" == typeof exports ? module.exports = b() : b();
}(this, function() {
    function a(a) {
        return a.replace(/<b[^>]*>(.*?)<\/b>/gi, function(a, b) {
            return b;
        }).replace(/class=".*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi, "");
    }
    function b(a) {
        for (var b = a.getElementsByTagName("a"), c = b.length - 1; c >= 0; c--) b[c].setAttribute("target", "_blank");
    }
    function c(a, b) {
        for (var c = [], d = new RegExp("(^| )" + b + "( |$)"), e = a.getElementsByTagName("*"), f = 0, g = e.length; g > f; f++) d.test(e[f].className) && c.push(e[f]);
        return c;
    }
    function d(a) {
        if (void 0 !== a) {
            var b = a.innerHTML.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0];
            return decodeURIComponent(b).split('"')[1];
        }
    }
    var e, f = "", g = 0, h = 20, i = !0, j = [], k = !1, l = !0, m = !0, n = !0, o = !0, p = !0, q = !1, r = !0, s = null, t = null, u = !0, v = "en", w = {
        fetch: function(a) {
            function b() {
                k = !0, f = e.domId, g = e.startAt, h = e.maxTweets + e.startAt, i = e.enableLinks, 
                m = e.showUser, l = e.showTime, n = e.showRetweet, o = e.showFollow, s = e.dateFunction, 
                t = e.customCallback, p = e.showInteraction, q = e.showImages, r = e.linksInNewWindow;
                var a = document.createElement("script");
                a.type = "text/javascript", a.src = "//cdn.syndication.twimg.com/widgets/timelines/" + e.widgetId + "?&lang=" + (e.lang || v) + "&callback=twitterFetcher.callback&suppress_response_codes=true&rnd=" + Math.random(), 
                document.getElementsByTagName("head")[0].appendChild(a);
            }
            e = a, void 0 === e.startAt && (e.startAt = 0), void 0 === e.maxTweets && (e.maxTweets = 5), 
            void 0 === e.enableLinks && (e.enableLinks = !0), void 0 === e.showUser && (e.showUser = !0), 
            void 0 === e.showTime && (e.showTime = !0), void 0 === e.dateFunction && (e.dateFunction = "default"), 
            void 0 === e.showRetweet && (e.showRetweet = !0), void 0 === e.showFollow && (e.showFollow = !0), 
            void 0 === e.customCallback && (e.customCallback = null), void 0 === e.showInteraction && (e.showInteraction = !0), 
            void 0 === e.showImages && (e.showImages = !1), void 0 === e.linksInNewWindow && (e.linksInNewWindow = !0), 
            k ? j.push(e) : b();
        },
        handler: function(a) {
            var b = a.length, c = 0, d = $("#" + f), e = '<div class="twitter-user"></div>';
            for (e += '<div class="content">'; b > c; ) e += "<hr>", e += '<div class="tweet-item">' + a[c] + "</div>", 
            c++;
            if (e += "</div>", e += '<div class="button primary input-medium twitter-follow">Follow</div>', 
            d.html(e), n) {
                var g = d.find(".user");
                g.each(function() {
                    $(this).find("img").attr("class", "box-logo"), $(this).find("span").eq(0).replaceWith(function() {
                        return $(this).html();
                    }), $(this).find("span").eq(1).attr("class", "handle"), $(this).find("a").attr("target", "_blank").addClass("no-icon").addClass("valign-middle");
                });
            } else {
                d.addClass("twitter-main"), d.find(".twitter-user").append("<h4 class='user'>" + d.find(".user:first-child").html() + "</h4>");
                var h = d.find(".twitter-user .user");
                h.find("img").attr("class", "box-logo"), h.find("span").eq(0).replaceWith(function() {
                    return $(this).html();
                }), h.find("span").eq(1).attr("class", "handle"), h.find("a").attr("target", "_blank").addClass("no-icon"), 
                o && d.find(".twitter-follow").show();
            }
            d.find(".button").on("click", function() {
                return popupWindow("https://twitter.com/intent/user?screen_name=" + user.find("span").eq(1).html().substr(1), "Twitter Follow", 640, 600), 
                !1;
            });
        },
        callback: function(e) {
            var f = document.createElement("div");
            f.innerHTML = e.body, "undefined" == typeof f.getElementsByClassName && (u = !1);
            var o = [], t = [], v = [], x = [], y = [], z = [], A = 0;
            if (u) for (var B = f.getElementsByClassName("tweet"); A < B.length; ) y.push(B[A].getElementsByClassName("retweet-credit").length > 0 ? !0 : !1), 
            (!y[A] || y[A] && n) && (o.push(B[A].getElementsByClassName("e-entry-title")[0]), 
            z.push(B[A].getAttribute("data-tweet-id")), t.push(B[A].getElementsByClassName("p-author")[0]), 
            v.push(B[A].getElementsByClassName("dt-updated")[0]), x.push(void 0 !== B[A].getElementsByClassName("inline-media")[0] ? B[A].getElementsByClassName("inline-media")[0] : void 0)), 
            A++; else for (var C = c(f, "tweet"); A < C.length; ) o.push(c(C[A], "e-entry-title")[0]), 
            z.push(C[A].getAttribute("data-tweet-id")), t.push(c(C[A], "p-author")[0]), v.push(c(C[A], "dt-updated")[0]), 
            x.push(void 0 !== c(C[A], "inline-media")[0] ? c(C[A], "inline-media")[0] : void 0), 
            y.push(c(C[A], "retweet-credit").length > 0 ? !0 : !1), A++;
            o.length > h && (o.splice(h, o.length - h), t.splice(h, t.length - h), v.splice(h, v.length - h), 
            y.splice(h, y.length - h), x.splice(h, x.length - h));
            for (var D = [], E = o.length, F = g; E > F; ) {
                if ("string" != typeof s) {
                    var G = v[F].getAttribute("datetime"), H = new Date(v[F].getAttribute("datetime").replace(/-/g, "/").replace("T", " ").split("+")[0]), I = s(H, G);
                    if (v[F].setAttribute("aria-label", I), o[F].innerText) if (u) v[F].innerText = I; else {
                        var J = document.createElement("p"), K = document.createTextNode(I);
                        J.appendChild(K), J.setAttribute("aria-label", I), v[F] = J;
                    } else v[F].textContent = I;
                }
                var L = "";
                i ? (r && (b(o[F]), m && b(t[F])), m && (L += '<div class="user">' + a(t[F].innerHTML) + "</div>"), 
                L += '<p class="tweet">' + a(o[F].innerHTML) + "</p>", l && (L += '<p class="timePosted">' + v[F].getAttribute("aria-label") + "</p>")) : o[F].innerText ? (m && (L += '<p class="user">' + t[F].innerText + "</p>"), 
                L += '<p class="tweet">' + o[F].innerText + "</p>", l && (L += '<p class="timePosted">' + v[F].innerText + "</p>")) : (m && (L += '<p class="user">' + t[F].textContent + "</p>"), 
                L += '<p class="tweet">' + o[F].textContent + "</p>", l && (L += '<p class="timePosted">' + v[F].textContent + "</p>")), 
                p && (L += '<p class="interact"><a href="https://twitter.com/intent/tweet?in_reply_to=' + z[F] + '" class="twitter_reply_icon"' + (r ? ' target="_blank">' : ">") + 'Reply</a><a href="https://twitter.com/intent/retweet?tweet_id=' + z[F] + '" class="twitter_retweet_icon"' + (r ? ' target="_blank">' : ">") + 'Retweet</a><a href="https://twitter.com/intent/favorite?tweet_id=' + z[F] + '" class="twitter_fav_icon"' + (r ? ' target="_blank">' : ">") + "Favorite</a></p>"), 
                q && void 0 !== x[F] && (L += '<div class="media"><img src="' + d(x[F]) + '" alt="Image from tweet" /></div>'), 
                D.push(L), F++;
            }
            w.handler(D), k = !1, j.length > 0 && (w.fetch(j[0]), j.splice(0, 1));
        }
    };
    return window.twitterFetcher = w, w;
});

var twitterConfig;

$(document).ready(function() {
    for (var a, b = this.location.href, c = b.split("/"), d = $("nav"), e = 0; e < c.length; e++) a = c[c.length - 1].split(".")[0];
    d.children("a").removeClass("active");
    a.length ? d.children("a[href*=" + a + "]").addClass("active") : d.children("a").eq(0).addClass("active");
    $(".nav-trigger").on("click", function() {
        $("header").toggleClass("active");
    }), $("html").on("click", function(a) {
        $(a.target).closest("header").length || $("header").removeClass("active");
    }), $(".sidebar").append("<ul></ul>"), $(".main a.anchor").each(function(a) {
        var b = $(this).attr("id"), c = $(this).next().html();
        $(".sidebar ul").append('<li><a href="#' + b + '">' + c + "</a></li>"), 0 === a && $(".sidebar ul a").addClass("active");
    }), $(".sidebar-trigger").on("click", function() {
        $(".main").hasClass("sidebar-on") ? $(".main").removeClass("sidebar-on") : $(".main").addClass("sidebar-on");
    }), $("html, body").on("click", function(a) {
        !$(a.target).closest(".sidebar") && $(".main").hasClass("sidebar-on") && $(".main").removeClass("sidebar-on");
    }), $(".sidebar li a").on("click", function(a) {
        $(".sidebar li a").removeClass("active"), $(this).addClass("active"), $(".main").removeClass("sidebar-on");
    });
}), $(window).on("scroll", function() {
    anchorClicked || $("a.anchor").each(function(a) {
        var b = $(this).offset().top - 200;
        pageTop >= b && ($(".sidebar li").find("a").removeClass("active"), $(".sidebar li").eq(a - 1).find("a").addClass("active")), 
        b > pageTop && $(".sidebar li").eq(a + 1).find("a").removeClass("active"), pageTop + $(window).height() >= $(document).height() && ($(".sidebar li").find("a").removeClass("active"), 
        $(".sidebar li").eq($(".sidebar li").length - 1).find("a").addClass("active"));
    });
});
//# sourceMappingURL=build.js.map