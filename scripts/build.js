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
                g = 1/0 === c ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; expires=" + i.toGMTString();
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

function loadScript(a, b) {
    var c = document.createElement("script");
    c.type = "text/javascript", c.src = a, b && (c.onload = b), document.body.appendChild(c);
}

function randomizeInteger(a, b) {
    return Math.floor(Math.random() * (b - a)) + a;
}

function alertKonami() {
    alert("TETSUOOO!!");
}

function initKonami(a) {
    function b() {
        d = [], e = "", f = !1;
    }
    function c(c) {
        var g = [ 38, 38, 40, 40, 37, 39, 37, 39, 66, 65 ], h = g.join(", ");
        38 == c.keyCode && (f = !0), f && e.length <= h.length ? (-1 == e.indexOf(h) && (d.push(c.keyCode), 
        e = d.join(", ")), -1 != e.indexOf(h) && (console.log("Easter Egg :: Konami!"), 
        b(), a(), 27 == c.keyCode && b())) : b();
    }
    var d = [], e = "", f = !1;
    $(document).on("keyup", c);
}

function initSVGs() {
    if (!$("html").hasClass("lt-ie9") && $("img.svg").length) {
        var a = 0;
        $("img.svg").each(function(b) {
            var c = $(this), d = c.attr("id"), e = c.attr("class"), f = c.attr("src");
            a = b, $.get(f, function(a) {
                var b = $(a).find("svg");
                "undefined" != typeof d && (b = b.attr("id", d)), "undefined" != typeof e && (b = b.attr("class", e + " replaced-svg")), 
                b = b.removeAttr("xmlns:a"), c.replaceWith(b);
            }, "xml");
        }), config.application.debug && console.log("System :: SVG Injection @ " + a + " images");
    }
}

function URLQueryObject() {
    var a = "";
    return (window.onpopstate = function() {
        var b, c = /\+/g, d = /([^&=]+)=?([^&]*)/g, e = function(a) {
            return decodeURIComponent(a.replace(c, " "));
        }, f = window.location.search.substring(1);
        for (a = {}; b = d.exec(f); ) a[e(b[1])] = e(b[2]);
    })(), a;
}

function dataRequest(a, b, c) {
    config.application.debug && console.log("AJAX ~~ Request"), request = $.ajax({
        url: a,
        type: b,
        data: "POST" == b ? data : "",
        dataType: "JSON",
        success: function(a) {
            config.application.debug && console.log("AJAX ~~ Success"), "undefined" != typeof c && c(a);
        },
        error: function() {
            config.application.debug && console.log("AJAX ~~ Error");
        }
    });
}

function initTables() {
    config.tables.responsive && $("table").length && ($("table").each(function() {
        var a = $(this), b = this.id, c = document.getElementById(b), d = [], e = [];
        a.addClass("table-original");
        for (var f = 0; f < c.rows[0].cells.length; f++) e[f] = c.rows[0].cells[f].innerHTML.toLowerCase().replace(/ /gi, "");
        for (var g = 1; g < c.rows.length; g++) {
            for (var h = c.rows[g], i = {}, j = 0; j < h.cells.length; j++) i[e[j]] = h.cells[j].innerHTML;
            d.push(i);
        }
        for (var k = 0; k < d.length; k++) {
            var l = d[k], m = '<table class="' + b + "-row-" + k + ' table-mirror">										  <tbody>										  </tbody>									  </table>';
            $(m).insertAfter(a);
            var n = $("." + b + "-row-" + k);
            a.children("caption").length && n.prepend("<caption>Row of " + a.children("caption").html() + "</caption>"), 
            Object.keys(l).forEach(function(a) {
                var b = '<tr>								   <th scope="row">' + a + "</th>								   <td>" + l[a] + "</td>							   </tr>";
                n.children("tbody").append(b);
            });
        }
    }), config.application.debug && console.log("System :: Tables"));
}

function initLinks() {
    $(document).on("click", "a[href^='#']", function(a) {
        var b = $(this).attr("href");
        if (a.preventDefault(), "#" === b) config.application.debug && console.log("Intentional: blocked behaviour on global.js."); else if ($($.attr(this, "href")).length) return anchorClicked = !0, 
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
}

function scrollProgress() {
    var a = 100 * pageTop / ($(document).height() - $(window).height());
    $(".scroll-progress").width(a + "%");
}

function initFramework() {
    isWideScreen = $(window).width() > 768, config.application.touch && (FastClick.attach(document.body), 
    $(".map-wrapper").addClass("map-mobile")), config.application.debug && console.log(":: means DOM.ready"), 
    config.application.debug && console.log("~~ means Async"), config.application.debug && console.log("•• means Complete"), 
    initKonami(alertKonami), initSVGs(), initCookies(), initLinks(), initNav(), initTables(), 
    scrollProgress(), initOverlays(), initNotifications(), initTooltips(), initSliders(), 
    initMap(), initTwitter(), initFontSizeControls(), initSearch(), initAutocomplete(), 
    initTagClouds(), initDropdowns(), loadFileInputs(config.forms.uploadlimit), initValidation(), 
    config.application.debug && console.log("Done •• Matter");
}

function buildDropdowns(a) {
    var b = $("select").eq(a), c = "undefined" == c || "" === c ? 1 : parseInt(b.attr("size"), 10), d = "undefined" != typeof c && "" !== c && c > 1 ? "list" : "drop", e = b.find("option").not(".placeholder"), f = b.find("option:selected"), g = '<div class="dropdown-' + a + " dropdown-wrapper " + d + '" data-size="' + c + '"></div>', h = '<div class="dropdown-arrow valign-middle"><span>&#9660;</span></div>', i = '<div class="dropdown-current" data-value="' + f.val() + '">' + f.html() + "</div>", j = '<div class="dropdown"></div>';
    $(".dropdown-" + a).length && b.insertAfter($(".dropdown-" + a)), $(".dropdown-" + a).remove(), 
    b.wrap(g);
    var k = $(".dropdown-" + a);
    k.find(".dropdown").remove(), k.find(".dropdown-arrow").remove(), k.find(".dropdown-current").remove(), 
    $(".dropdown-" + a).prepend(j).prepend(h).prepend(i), e.each(function() {
        var a = $(this), b = a.is(":selected") ? "active" : "", c = '<div class="dropdown-item ' + b + '" data-value="' + a.val() + '">' + a.html() + "</div>";
        k.find(".dropdown").append(c);
    }), "list" == d && k.find(".dropdown").height((k.find(".dropdown-item").outerHeight() + 1) * c - 1), 
    $(".dropdown-" + a).each(function() {
        var a = $(this), b = a.find(".dropdown"), c = a.find(".dropdown-item"), e = a.children(".dropdown-current"), f = a.find("select");
        a.off().on("click", function() {
            "drop" == d && (a.hasClass("active") ? ($(".dropdown-wrapper").removeClass("active"), 
            $(this).find("select").blur()) : ($(".dropdown-wrapper").removeClass("active"), 
            a.addClass("active"), pageBottom >= a.offset().top + b.height() + 55 ? b.removeClass("bound").addClass("default") : b.removeClass("default").addClass("bound"), 
            $(this).find("select").focus()));
        }), c.off().on("click", function() {
            var a = $(this).attr("data-value");
            c.removeClass("active"), e.text($(this).text()).attr("data-value", a), f.val(a).trigger("change"), 
            $(this).addClass("active").parents("form.auto-send").submit();
        }), f.on("change", function() {
            var a = $(this).children("option:selected");
            c.removeClass("active"), e.text(a.text()).attr("data-value", a.val());
            for (var b = 0; b < c.length; b++) c.eq(b).text() === a.text() && c.eq(b).addClass("active").parents("form.auto-send").submit();
        });
    }), $("html, body").off().on("click", function(a) {
        $(a.target).closest(".dropdown").length || $(a.target).closest(".dropdown-wrapper").length || !$(".dropdown-wrapper").hasClass("active") || $(".dropdown-wrapper").removeClass("active");
    });
}

function initDropdowns() {
    $("select").length && ($("select").each(function(a) {
        buildDropdowns(a);
    }), $(window).on("scroll", function() {
        var a = $(".dropdown-wrapper.active"), b = a.find(".dropdown");
        a.length && pageBottom >= a.offset().top + b.height() + 55 ? b.removeClass("bound").addClass("default") : b.removeClass("default").addClass("bound");
    }), config.application.debug && console.log("Form :: Dropdowns"));
}

function loadFileInputs() {
    if ($(".file-wrapper").length && ($(".file-wrapper:not('.last')").each(function() {
        var a = $(this), b = a.find("input"), c = a.find(".fake-upload"), d = a.find(".file-result");
        c.on("click", function() {
            b.trigger("click");
        }), b.on("change", function() {
            var a = $(this).val().replace("C:\\fakepath\\", "");
            d.html(a).addClass("loaded");
        });
    }), config.application.debug && console.log("Form :: File Upload")), $(".multifile-wrapper").length) {
        var a = $(".multifile-wrapper"), b = a.length, c = config.forms.uploadlimit, d = $(".multi-limit"), e = c - a.find(".loaded").length, f = (1 == e ? $(".multifile-info").find(".plural").hide() : $(".multifile-info").find(".plural").show(), 
        '<div class="multifile-wrapper mobile-hide last">							<input type="file" id="file[' + b + ']" name="file[' + b + ']" />							<div class="fakefile">								<div class="button primary fake-upload">Choose File</div>								<div class="file-result">No file chosen</div>								<div class="button primary fake-close">&times;</div>							</div>						</div>');
        d.html(e), a.each(function(a) {
            var d = $(this), e = d.find(".file-result");
            d.find("input").attr("id", "file[" + a + "]").attr("name", "file[" + a + "]"), d.off("click").on("click", ".fake-upload", function() {
                d.find("input").trigger("click");
            }).on("click", ".fake-close", function() {
                b != c || $(".multifile-wrapper.last").length || $(f).insertAfter($(".multifile-wrapper").eq(b - 1)), 
                d.remove(), loadFileInputs(c);
            }).off("change").on("change", "input", function() {
                var g = $(this).val().replace("C:\\fakepath\\", "");
                e.html(g).addClass("loaded"), c > b && $(f).insertAfter(d), loadFileInputs(c), b > a && d.removeClass("last");
            });
        }), config.application.debug && console.log("Form :: Multiple File Upload");
    }
}

function initNav() {
    for (var a, b = this.location.href, c = b.split("/"), d = $("nav"), e = !1, f = 0; f < c.length; f++) a = c[c.length - 1].split(".")[0];
    d.children("a[href^='#']").each(function() {
        var a = $(this).attr("href"), b = $(a);
        $(this).offset().top >= b.offset().top - 80 && (d.children("a").removeClass("active"), 
        $(this).addClass("active"));
    }).on("click", function() {
        e = !0, $("header").removeClass("active"), d.children("a").removeClass("active"), 
        $(this).addClass("active"), setTimeout(function() {
            e = !1;
        }, 1e3);
    }), $(window).on("scroll", function() {
        d.children("a[href^='#']").each(function() {
            var a = $(this).attr("href"), b = $(a);
            $(this).offset().top >= b.offset().top - 160 && e === !1 && (d.children("a").removeClass("active"), 
            $(this).addClass("active"));
        });
    }), d.children("a").removeClass("active");
    a.length ? d.children("a[href*=" + a + "]").addClass("active") : d.children("a").eq(0).addClass("active");
    $(".nav-trigger").on("click", function() {
        $("header").toggleClass("active");
    }), $("html").on("click", function(a) {
        $(a.target).closest("header").length || $("header").removeClass("active");
    }), config.application.debug && console.log("System :: Navigation");
}

function initValidation() {
    function a(a) {
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
    }
    function b(b, c, d) {
        switch (console.log("Validating keypress for " + c), c) {
          case "password":
            b.next(".password-meter-mask").width(a(d) + "%").find(".password-meter").width(b.outerWidth());
        }
    }
    function c(b, c, d) {
        var e = "failure", f = 3e3;
        switch (config.application.debug && console.log("Validation :: " + c), c) {
          case "text":
            "" !== d ? b.removeClass("invalid").addClass("valid") : (b.removeClass("valid").addClass("invalid"), 
            notify("This field cannot be left empty.", e, f));
            break;

          case "number":
            var g = /\D+/;
            d.length == d.replace(g, "").length ? b.removeClass("invalid").addClass("valid") : (b.removeClass("valid").addClass("invalid"), 
            notify("This field can only have numbers.", e, f));
            break;

          case "email":
            var g = /^\S+@\S+\.\S+$/;
            "" !== d && g.test(d) ? b.removeClass("invalid").addClass("valid") : (b.removeClass("valid").addClass("invalid"), 
            notify("Your email is invalid.", e, f));
            break;

          case "password":
            a(d) >= 30 ? b.removeClass("invalid").addClass("valid") : (b.removeClass("valid").addClass("invalid"), 
            notify("Your password is not strong enough.", e, f));
            break;

          case "password-match":
            var h = $("input[name='password-match']").eq(0), i = h.val();
            h.hasClass("valid") && d === i ? b.removeClass("invalid").addClass("valid") : (b.removeClass("valid").addClass("invalid"), 
            notify("Your passwords must match.", e, f));
            break;

          case "date":
            var g = /^\d{2}\/\d{2}\/\d{4}$/;
            "" !== d && g.test(d) ? b.removeClass("invalid").addClass("valid") : (b.removeClass("valid").addClass("invalid"), 
            notify("The date you entered is not valid.", e, f));
        }
    }
    config.forms.validation && $("[data-validation]").length && ($("input[data-validation='password']").on("keyup", function() {
        var a = $(this), c = a.attr("data-validation"), d = a.val();
        b(a, c, d);
    }), $("[required]").on("keyup", function() {
        $(this).removeClass("valid").removeClass("invalid");
    }).on("focus", function() {
        var a = $(this), b = a.attr("data-validation"), d = a.val();
        $(this).hasClass("invalid") && c(a, b, d);
    }).on("blur", function() {
        var a = $(this), b = a.attr("data-validation"), d = a.val();
        c(a, b, d);
    }), config.application.debug && console.log("Form :: Validation"));
}

function initAutocomplete() {
    $("[data-autocomplete]").length && ($("[data-autocomplete]").each(function() {
        function a(a) {
            function e(b) {
                for (var c = [], d = 0; d < a.Items.length; d++) {
                    var e = a.Items[d], f = e[b];
                    if (f instanceof Array) for (var g = 0; g < f.length; g++) $.inArray(f[g], c) < 0 && c.push(f[g]); else $.inArray(f, c) < 0 && c.push(f);
                }
                c.sort();
                for (var i in c) h.append("<li>" + c[i] + "</li>");
            }
            function i(a) {
                var d = $(a).val();
                j.each(function() {
                    $(this).text().search(new RegExp(d, "i")) < 0 ? $(this).removeClass("selected") : $(this).addClass("selected");
                }).on("click", function() {
                    c.val($(this).text()).trigger({
                        type: "keydown",
                        which: 13
                    }), b.removeClass("active"), h.unhighlight();
                }), d.length > 0 && j.hasClass("selected") ? (b.addClass("active"), h.unhighlight().highlight(d)) : (b.removeClass("active"), 
                h.unhighlight());
            }
            e(f);
            var j = h.children("li").not(".divider");
            h.on("mouseenter", function() {
                g = !0;
            }).on("mouseleave", function() {
                g = !1;
            }), c.on("keydown", function(a) {
                if (h.hasClass("active")) {
                    var b = h.children("li.selected");
                    38 === a.keyCode && d > -1 && (j.removeClass("active"), d--, b.eq(d).addClass("active"), 
                    d % 7 === 6 && h.scrollTop(7 * (j.outerHeight() - 1) * ((d - 6) / 7))), 40 === a.keyCode && d < b.length - 1 && (j.removeClass("active"), 
                    d++, b.eq(d).addClass("active"), d % 7 === 0 && h.scrollTop(7 * (j.outerHeight() - 1) * (d / 7))), 
                    (9 === a.keyCode || 13 === a.keyCode) && (c.val(h.children("li.active").text()), 
                    j.removeClass("active")), (8 === a.keyCode || 46 === a.keyCode) && (j.removeClass("active"), 
                    d = -1), 27 === a.keyCode && c.blur();
                }
            }).on("keyup", function() {
                i(this);
            }).on("focus", function() {
                d = h.children("li.active").length ? d : -1, i(this);
            }).on("blur", function() {
                g === !1 && (b.removeClass("active"), h.unhighlight());
            });
        }
        var b = $(this), c = b.children("input"), d = -1, e = b.data("autocomplete"), f = c.data("autocomplete-subject"), g = !1;
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
        styles: themes.Mapbox
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
            function b(b) {
                var d = [], e = c.find("select[data-search-subject='" + b + "']");
                searchArray[b] = [];
                for (var f = 0; f < a.Items.length; f++) {
                    var g = a.Items[f], h = g[b];
                    if (h instanceof Array) for (var i = 0; i < h.length; i++) $.inArray(h[i], d) < 0 && d.push(h[i]); else $.inArray(h, d) < 0 && d.push(h);
                }
                d.sort();
                var j = '<option class="placeholder">Select ' + b + "...</option>";
                e.append(j);
                for (var k in d) {
                    var l = '<option value="' + d[k] + '">' + d[k] + "</option>";
                    e.append(l);
                }
            }
            function h(a) {
                for (var b = [], c = f.children(".tag[data-tag-subject='" + a + "']"), d = 0; d < c.length; d++) {
                    var e = c.eq(d).data("tag");
                    b.push(e);
                }
                searchArray[a] = b, initSVGs();
            }
            function i() {
                for (var b = 0; b < a.Items.length; b++) {
                    var c = a.Items[b], e = (c.Id, c.Image), f = c.Title, h = new Date(c.Date), i = h.getHours() < 10 ? "0" + h.getHours() : h.getHours();
                    minute = h.getMinutes() < 10 ? "0" + h.getMinutes() : h.getMinutes(), day = h.getDate() < 10 ? "0" + h.getDate() : h.getDate(), 
                    month = h.getMonth() + 1 < 10 ? "0" + (h.getMonth() + 1) : h.getMonth() + 1, year = h.getFullYear() < 10 ? "0" + h.getFullYear() : h.getFullYear(), 
                    fulldate = i + ":" + minute + " @ " + day + "/" + month + "/" + year, d = c.Url, 
                    summary = c.Summary, type = c.Type, categories = c.Categories, tags = c.Tags, item = '<div class="search-item">											 <a href="' + d + '">												 <img src="' + e + '" />												 <div class="title">' + f + '</div>											 </a>											 <div class="date">' + fulldate + '</div>											 <div class="summary">' + summary + '</div>											 <div class="type">Type: ' + type + '</div>											 <div class="categories">Categories: ' + categories + '</div>											 <div class="tags">Tags: ' + tags + "</div>										</div>", 
                    g.append(item);
                }
                g.children(".search-item").length ? g.show() : g.hide();
            }
            e.on("keydown", function(a) {
                if (13 === a.keyCode) {
                    var b = $(this).val();
                    return subject = $(this).data("search-subject"), "" !== b && (searchArray[subject] = b), 
                    i(), !1;
                }
            }), select.each(function(a) {
                var c = ($(this).val(), $(this).data("search-subject"));
                $(this).parents(".dropdown-wrapper").attr("data-search-subject", c), b(c), $(this).on("change", function(b) {
                    b.preventDefault();
                    var d = $(this).val(), e = '<li class="tag valign-middle" data-tag-group="' + a + '" data-tag-subject="' + c + '" data-tag="' + d + '"><span>' + d + "</span>" + tagclose + "</li>";
                    "" !== d && ($.inArray(d, searchArray[c]) < 0 ? f.addClass("active").append(e) : notify("This tag already exists.", "failure")), 
                    h(c), i();
                });
            }), f.on("click", ".tag", function() {
                var a = $(this).data("tag-subject");
                $(this).remove(), f.children(".tag").length > 0 ? f.addClass("active") : f.removeClass("active"), 
                h(a), i();
            }), initDropdowns(), i();
        }
        var c = $(this), d = c.data("search"), e = c.find("input[data-search-subject]");
        select = c.find("select[data-search-subject]"), searchArray = [], tagcloudElement = '<ul class="tagcloud"></ul>', 
        tagclose = '<img class="svg icon icon-close" src="img/icons/icon-close.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-close.png\'">', 
        resultsElement = '<div class="search-results valign-middle"></div>', c.append(tagcloudElement).append(resultsElement);
        var f = c.find("ul.tagcloud"), g = c.find(".search-results");
        searchArray.Search = "", dataRequest(d, "GET", b);
    }), config.application.debug && console.log("Search :: Unified Search"));
}

function getOffset(a) {
    for (var b = 0, c = 0; a && !isNaN(a.offsetLeft) && !isNaN(a.offsetTop); ) b += a.offsetLeft, 
    c += a.offsetTop, a = a.offsetParent;
    return {
        top: c,
        left: b
    };
}

function scrollTo(a, b, c, d) {
    var e = (Date.now = Date.now || function() {
        return +new Date();
    }, document.documentElement.scrollTop ? document.documentElement : document.body), f = e.scrollTop;
    return f === a ? void ("undefined" != typeof d && d()) : void 0;
}

function sliderInit(a) {
    function b() {
        t = j.width(), l.css({
            width: t
        }), m.css({
            "margin-left": t * (M - v),
            width: t * l.size(),
            height: l.eq(K % v).outerHeight(),
            left: -t * M
        });
    }
    function c() {
        if ("prev" == H) for (var a = P; a >= K; a--) m.prepend(l.eq(a)); else for (var a = O; K >= a; a++) m.append(l.eq(a - 1));
        m.css({
            "margin-left": t * (M - v)
        });
    }
    function d() {
        J === !1 && (H = "prev", L = K, M--, O >= K ? (K = P, N--) : K--, c(), g());
    }
    function e() {
        J === !1 && (H = "next", L = K, M++, K == P ? (K = O, N++) : K++, c(), g());
    }
    function f(a) {
        J === !1 && (K = v > K ? a : a + v, M = K + (P + 1) * N, L > K && (H = "prev"), 
        K > L && (H = "next"), c(), g(), L = K);
    }
    function g() {
        J = !0, u = -(t * M), "slide" === q && m.animate({
            height: l.eq(K % v).outerHeight(),
            left: u
        }, {
            duration: r,
            complete: function() {
                J = !1, r = config.slider.duration, b();
            }
        }), "fade" === q && m.hide().css({
            left: u
        }).fadeIn(r + 250).animate({
            height: l.eq(K % v).outerHeight()
        }, {
            duration: r,
            complete: function() {
                J = !1, r = config.slider.duration, b();
            }
        }), G.removeClass("active"), G.eq(K % v).addClass("active");
    }
    function h() {
        m.removeClass("stopped"), I = setInterval(function() {
            e();
        }, s);
    }
    function i() {
        m.addClass("stopped"), clearInterval(I);
    }
    var j = $("#" + a), k = j.find(".slider-container-wrapper"), l = j.find(".slider-container"), m = j.find(".slider-movable"), n = j.attr("data-bullets") ? j.attr("data-bullets").bool() : config.slider.bullets, o = j.attr("data-arrows") ? j.attr("data-arrows").bool() : config.slider.arrows, p = j.attr("data-slideshow") ? j.attr("data-slideshow").bool() : config.slider.slideshow, q = j.attr("data-animation") ? j.attr("data-animation") : config.slider.animation, r = config.slider.duration, s = config.slider.interval, t = j.width(), u = 0;
    l.clone().prependTo(m), l = j.find(".slider-container"), l.css({
        width: t
    });
    var v = l.length / 2, w = v > 1;
    b();
    var x = '<div class="slider-arrow slider-arrow-prev"><span>&lsaquo;</span></div>', y = '<div class="slider-arrow slider-arrow-next"><span>&rsaquo;</span></div>';
    k.prepend(x), k.prepend(y);
    var z = j.find(".slider-arrow"), A = j.find(".slider-arrow-prev"), B = j.find(".slider-arrow-next");
    if (o === !0 && w && z.show(), n === !0 && w) {
        var C = '<div class="slider-nav"></div>';
        j.append(C);
        for (var D = j.find(".slider-nav"), E = 0; v > E; E++) {
            var F = '<div class="slider-bullet">&bull;</div>';
            D.append(F);
        }
        var G = j.find(".slider-bullet");
    } else var G = j.find(".bullet");
    var H, I, J = !1, K = 0, L = 0, M = 0, N = 0, O = 0, P = l.length - 1;
    if (g(), B.on("click", function() {
        e();
    }), A.on("click", function() {
        d();
    }), G.on("click", function() {
        var a = $(this).index();
        f(a);
        var b = getOffset(j).top - 100;
        scrollTo(b, 350, easing.easeOutQuad);
    }), "slide" === q) {
        var Q, R, S, T = !1, U = j.offset().left + 50, V = j.offset().left + j.outerWidth() - 50;
        m.on("mousedown touchstart", function(a) {
            config.application.touch || a.preventDefault(), T = !0, Q = config.application.touch ? a.originalEvent.touches[0].pageX : a.pageX, 
            S = 0;
        }).on("mousemove touchmove", function(a) {
            R = config.application.touch ? a.originalEvent.touches[0].pageX : a.pageX, initDrag = R - Q > config.slider.threshold || R - Q < -config.slider.threshold, 
            T && initDrag && !J && (config.application.touch || a.preventDefault(), m.css({
                left: u - (Q - R)
            }), U > R && (Q - R > config.slider.trigger ? (T = !1, e()) : (r = 250, T = !1, 
            g())), R > V && (Q - R < -config.slider.trigger ? (T = !1, d()) : (r = 250, T = !1, 
            g())));
        }).on("mouseup touchend", function(a) {
            config.application.touch || a.preventDefault(), T = !1, J || (S = R, Q - S > config.slider.trigger ? e() : Q - S < -config.slider.trigger ? d() : g());
        });
    }
    document.onkeydown = function(a) {
        switch (a = a || window.event, a.which || a.keyCode) {
          case 39:
            e();
            break;

          case 37:
            d();
            break;

          default:
            return;
        }
        a.preventDefault();
    }, p !== !1 && w && (h(), config.application.touch ? (m.on("click touchstart", function() {
        i();
    }), $("html").on("click touchstart", function(a) {
        !$(a.target).closest(".slider").length && m.hasClass("stopped") && h();
    })) : (j.on("mouseenter", function() {
        i();
    }), j.on("mouseleave", function() {
        h();
    }))), $(window).on("resize", function() {
        b();
    });
}

function initSliders() {
    var a = $(".slider");
    a.length && (a.each(function(a, b) {
        setTimeout(function() {
            sliderInit(b.id = "slider-" + a);
        }, 250 * a);
    }).find(".slider-container").css({
        visibility: "visible"
    }), config.application.debug && console.log("Widget :: Sliders"));
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
                var d = c.val(), f = '<li class="tag valign-middle" data-tag="' + d + '"><span>' + d + "</span>" + h + "</li>";
                return "" !== d && $.inArray(d, e) < 0 && i.addClass("active").append(f), $.inArray(d, e) >= 0 && notify("This tag already exists.", "failure"), 
                b(), c.val("").focus(), !1;
            }
        }).on("change", function() {
            var a = c.val(), d = '<li class="tag valign-middle" data-tag="' + a + '"><span>' + a + "</span>" + h + "</li>";
            return "" !== a && $.inArray(a, e) < 0 && i.addClass("active").append(d), $.inArray(a, e) >= 0 && notify("This tag already exists.", "failure"), 
            b(), !1;
        }), i.on("click", ".tag", function() {
            $(this).remove(), i.children(".tag").length > 0 ? i.addClass("active") : i.removeClass("active"), 
            b();
        });
    }), config.application.debug && console.log("Search :: Tag Clouds"));
}

function initTooltips() {
    $("[data-tooltip]").length && ($("[data-tooltip]").each(function() {
        var a = $(this), b = a.data("tooltip"), c = $(".tooltip");
        config.application.touch || a.on("mousemove", function(a) {
            switch (c.html(b).addClass("active"), config.tooltip.position) {
              case "left":
                c.css({
                    top: a.pageY - c.outerHeight() - 10,
                    left: a.pageX - c.outerWidth()
                });
                break;

              case "center":
                c.css({
                    top: a.pageY - c.outerHeight() - 10,
                    left: a.pageX - c.outerWidth() / 2 - 5
                });
                break;

              case "right":
                c.css({
                    top: a.pageY - c.outerHeight() - 10,
                    left: a.pageX
                });
                break;

              default:
                c.css({
                    top: a.pageY - c.outerHeight() - 10,
                    left: a.pageX - c.outerWidth() / 2 - 5
                });
            }
            var d = {
                left: c.offset().left,
                right: c.offset().left + c.outerWidth()
            }, e = {
                left: $(".wrapper").offset().left,
                right: $(".wrapper").offset().left + $(".wrapper").outerWidth()
            };
            config.tooltip.bound && (d.left <= e.left && c.css({
                left: e.left
            }), d.right >= e.right && c.css({
                left: e.right - c.outerWidth()
            }));
        }).on("mouseleave", function() {
            c.removeClass("active").css({
                left: -200,
                top: -200
            });
        });
    }), config.application.debug && console.log("Widget :: Tooltips"));
}

function initTwitter() {
    $("#" + config.twitter.domID).length && (twitterFetcher.fetch(config.twitter), config.application.debug && console.log("Widget :: Twitter"));
}

!function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");
        return b(a);
    } : b(a);
}("undefined" != typeof window ? window : this, function(a, b) {
    function c(a) {
        var b = a.length, c = eb.type(a);
        return "function" === c || eb.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a;
    }
    function d(a, b, c) {
        if (eb.isFunction(b)) return eb.grep(a, function(a, d) {
            return !!b.call(a, d, a) !== c;
        });
        if (b.nodeType) return eb.grep(a, function(a) {
            return a === b !== c;
        });
        if ("string" == typeof b) {
            if (mb.test(b)) return eb.filter(b, a, c);
            b = eb.filter(b, a);
        }
        return eb.grep(a, function(a) {
            return eb.inArray(a, b) >= 0 !== c;
        });
    }
    function e(a, b) {
        do a = a[b]; while (a && 1 !== a.nodeType);
        return a;
    }
    function f(a) {
        var b = ub[a] = {};
        return eb.each(a.match(tb) || [], function(a, c) {
            b[c] = !0;
        }), b;
    }
    function g() {
        ob.addEventListener ? (ob.removeEventListener("DOMContentLoaded", h, !1), a.removeEventListener("load", h, !1)) : (ob.detachEvent("onreadystatechange", h), 
        a.detachEvent("onload", h));
    }
    function h() {
        (ob.addEventListener || "load" === event.type || "complete" === ob.readyState) && (g(), 
        eb.ready());
    }
    function i(a, b, c) {
        if (void 0 === c && 1 === a.nodeType) {
            var d = "data-" + b.replace(zb, "-$1").toLowerCase();
            if (c = a.getAttribute(d), "string" == typeof c) {
                try {
                    c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : yb.test(c) ? eb.parseJSON(c) : c;
                } catch (e) {}
                eb.data(a, b, c);
            } else c = void 0;
        }
        return c;
    }
    function j(a) {
        var b;
        for (b in a) if (("data" !== b || !eb.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
        return !0;
    }
    function k(a, b, c, d) {
        if (eb.acceptData(a)) {
            var e, f, g = eb.expando, h = a.nodeType, i = h ? eb.cache : a, j = h ? a[g] : a[g] && g;
            if (j && i[j] && (d || i[j].data) || void 0 !== c || "string" != typeof b) return j || (j = h ? a[g] = W.pop() || eb.guid++ : g), 
            i[j] || (i[j] = h ? {} : {
                toJSON: eb.noop
            }), ("object" == typeof b || "function" == typeof b) && (d ? i[j] = eb.extend(i[j], b) : i[j].data = eb.extend(i[j].data, b)), 
            f = i[j], d || (f.data || (f.data = {}), f = f.data), void 0 !== c && (f[eb.camelCase(b)] = c), 
            "string" == typeof b ? (e = f[b], null == e && (e = f[eb.camelCase(b)])) : e = f, 
            e;
        }
    }
    function l(a, b, c) {
        if (eb.acceptData(a)) {
            var d, e, f = a.nodeType, g = f ? eb.cache : a, h = f ? a[eb.expando] : eb.expando;
            if (g[h]) {
                if (b && (d = c ? g[h] : g[h].data)) {
                    eb.isArray(b) ? b = b.concat(eb.map(b, eb.camelCase)) : b in d ? b = [ b ] : (b = eb.camelCase(b), 
                    b = b in d ? [ b ] : b.split(" ")), e = b.length;
                    for (;e--; ) delete d[b[e]];
                    if (c ? !j(d) : !eb.isEmptyObject(d)) return;
                }
                (c || (delete g[h].data, j(g[h]))) && (f ? eb.cleanData([ a ], !0) : cb.deleteExpando || g != g.window ? delete g[h] : g[h] = null);
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
            return ob.activeElement;
        } catch (a) {}
    }
    function p(a) {
        var b = Kb.split("|"), c = a.createDocumentFragment();
        if (c.createElement) for (;b.length; ) c.createElement(b.pop());
        return c;
    }
    function q(a, b) {
        var c, d, e = 0, f = typeof a.getElementsByTagName !== xb ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== xb ? a.querySelectorAll(b || "*") : void 0;
        if (!f) for (f = [], c = a.childNodes || a; null != (d = c[e]); e++) !b || eb.nodeName(d, b) ? f.push(d) : eb.merge(f, q(d, b));
        return void 0 === b || b && eb.nodeName(a, b) ? eb.merge([ a ], f) : f;
    }
    function r(a) {
        Eb.test(a.type) && (a.defaultChecked = a.checked);
    }
    function s(a, b) {
        return eb.nodeName(a, "table") && eb.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a;
    }
    function t(a) {
        return a.type = (null !== eb.find.attr(a, "type")) + "/" + a.type, a;
    }
    function u(a) {
        var b = Vb.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a;
    }
    function v(a, b) {
        for (var c, d = 0; null != (c = a[d]); d++) eb._data(c, "globalEval", !b || eb._data(b[d], "globalEval"));
    }
    function w(a, b) {
        if (1 === b.nodeType && eb.hasData(a)) {
            var c, d, e, f = eb._data(a), g = eb._data(b, f), h = f.events;
            if (h) {
                delete g.handle, g.events = {};
                for (c in h) for (d = 0, e = h[c].length; e > d; d++) eb.event.add(b, c, h[c][d]);
            }
            g.data && (g.data = eb.extend({}, g.data));
        }
    }
    function x(a, b) {
        var c, d, e;
        if (1 === b.nodeType) {
            if (c = b.nodeName.toLowerCase(), !cb.noCloneEvent && b[eb.expando]) {
                e = eb._data(b);
                for (d in e.events) eb.removeEvent(b, d, e.handle);
                b.removeAttribute(eb.expando);
            }
            "script" === c && b.text !== a.text ? (t(b).text = a.text, u(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), 
            cb.html5Clone && a.innerHTML && !eb.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && Eb.test(a.type) ? (b.defaultChecked = b.checked = a.checked, 
            b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue);
        }
    }
    function y(b, c) {
        var d, e = eb(c.createElement(b)).appendTo(c.body), f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : eb.css(e[0], "display");
        return e.detach(), f;
    }
    function z(a) {
        var b = ob, c = _b[a];
        return c || (c = y(a, b), "none" !== c && c || ($b = ($b || eb("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), 
        b = ($b[0].contentWindow || $b[0].contentDocument).document, b.write(), b.close(), 
        c = y(a, b), $b.detach()), _b[a] = c), c;
    }
    function A(a, b) {
        return {
            get: function() {
                var c = a();
                return null != c ? c ? void delete this.get : (this.get = b).apply(this, arguments) : void 0;
            }
        };
    }
    function B(a, b) {
        if (b in a) return b;
        for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = mc.length; e--; ) if (b = mc[e] + c, 
        b in a) return b;
        return d;
    }
    function C(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = eb._data(d, "olddisplay"), 
        c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && Cb(d) && (f[g] = eb._data(d, "olddisplay", z(d.nodeName)))) : (e = Cb(d), 
        (c && "none" !== c || !e) && eb._data(d, "olddisplay", e ? c : eb.css(d, "display"))));
        for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a;
    }
    function D(a, b, c) {
        var d = ic.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b;
    }
    function E(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += eb.css(a, c + Bb[f], !0, e)), 
        d ? ("content" === c && (g -= eb.css(a, "padding" + Bb[f], !0, e)), "margin" !== c && (g -= eb.css(a, "border" + Bb[f] + "Width", !0, e))) : (g += eb.css(a, "padding" + Bb[f], !0, e), 
        "padding" !== c && (g += eb.css(a, "border" + Bb[f] + "Width", !0, e)));
        return g;
    }
    function F(a, b, c) {
        var d = !0, e = "width" === b ? a.offsetWidth : a.offsetHeight, f = ac(a), g = cb.boxSizing && "border-box" === eb.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = bc(a, b, f), (0 > e || null == e) && (e = a.style[b]), dc.test(e)) return e;
            d = g && (cb.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0;
        }
        return e + E(a, b, c || (g ? "border" : "content"), d, f) + "px";
    }
    function G(a, b, c, d, e) {
        return new G.prototype.init(a, b, c, d, e);
    }
    function H() {
        return setTimeout(function() {
            nc = void 0;
        }), nc = eb.now();
    }
    function I(a, b) {
        var c, d = {
            height: a
        }, e = 0;
        for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = Bb[e], d["margin" + c] = d["padding" + c] = a;
        return b && (d.opacity = d.width = a), d;
    }
    function J(a, b, c) {
        for (var d, e = (tc[b] || []).concat(tc["*"]), f = 0, g = e.length; g > f; f++) if (d = e[f].call(c, b, a)) return d;
    }
    function K(a, b, c) {
        var d, e, f, g, h, i, j, k, l = this, m = {}, n = a.style, o = a.nodeType && Cb(a), p = eb._data(a, "fxshow");
        c.queue || (h = eb._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, 
        i = h.empty.fire, h.empty.fire = function() {
            h.unqueued || i();
        }), h.unqueued++, l.always(function() {
            l.always(function() {
                h.unqueued--, eb.queue(a, "fx").length || h.empty.fire();
            });
        })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [ n.overflow, n.overflowX, n.overflowY ], 
        j = eb.css(a, "display"), k = "none" === j ? eb._data(a, "olddisplay") || z(a.nodeName) : j, 
        "inline" === k && "none" === eb.css(a, "float") && (cb.inlineBlockNeedsLayout && "inline" !== z(a.nodeName) ? n.zoom = 1 : n.display = "inline-block")), 
        c.overflow && (n.overflow = "hidden", cb.shrinkWrapBlocks() || l.always(function() {
            n.overflow = c.overflow[0], n.overflowX = c.overflow[1], n.overflowY = c.overflow[2];
        }));
        for (d in b) if (e = b[d], pc.exec(e)) {
            if (delete b[d], f = f || "toggle" === e, e === (o ? "hide" : "show")) {
                if ("show" !== e || !p || void 0 === p[d]) continue;
                o = !0;
            }
            m[d] = p && p[d] || eb.style(a, d);
        } else j = void 0;
        if (eb.isEmptyObject(m)) "inline" === ("none" === j ? z(a.nodeName) : j) && (n.display = j); else {
            p ? "hidden" in p && (o = p.hidden) : p = eb._data(a, "fxshow", {}), f && (p.hidden = !o), 
            o ? eb(a).show() : l.done(function() {
                eb(a).hide();
            }), l.done(function() {
                var b;
                eb._removeData(a, "fxshow");
                for (b in m) eb.style(a, b, m[b]);
            });
            for (d in m) g = J(o ? p[d] : 0, d, l), d in p || (p[d] = g.start, o && (g.end = g.start, 
            g.start = "width" === d || "height" === d ? 1 : 0));
        }
    }
    function L(a, b) {
        var c, d, e, f, g;
        for (c in a) if (d = eb.camelCase(c), e = b[d], f = a[c], eb.isArray(f) && (e = f[1], 
        f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = eb.cssHooks[d], g && "expand" in g) {
            f = g.expand(f), delete a[d];
            for (c in f) c in a || (a[c] = f[c], b[c] = e);
        } else b[d] = e;
    }
    function M(a, b, c) {
        var d, e, f = 0, g = sc.length, h = eb.Deferred().always(function() {
            delete i.elem;
        }), i = function() {
            if (e) return !1;
            for (var b = nc || H(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
            return h.notifyWith(a, [ j, f, c ]), 1 > f && i ? c : (h.resolveWith(a, [ j ]), 
            !1);
        }, j = h.promise({
            elem: a,
            props: eb.extend({}, b),
            opts: eb.extend(!0, {
                specialEasing: {}
            }, c),
            originalProperties: b,
            originalOptions: c,
            startTime: nc || H(),
            duration: c.duration,
            tweens: [],
            createTween: function(b, c) {
                var d = eb.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(d), d;
            },
            stop: function(b) {
                var c = 0, d = b ? j.tweens.length : 0;
                if (e) return this;
                for (e = !0; d > c; c++) j.tweens[c].run(1);
                return b ? h.resolveWith(a, [ j, b ]) : h.rejectWith(a, [ j, b ]), this;
            }
        }), k = j.props;
        for (L(k, j.opts.specialEasing); g > f; f++) if (d = sc[f].call(j, a, k, j.opts)) return d;
        return eb.map(k, J, j), eb.isFunction(j.opts.start) && j.opts.start.call(a, j), 
        eb.fx.timer(eb.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always);
    }
    function N(a) {
        return function(b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0, f = b.toLowerCase().match(tb) || [];
            if (eb.isFunction(c)) for (;d = f[e++]; ) "+" === d.charAt(0) ? (d = d.slice(1) || "*", 
            (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
        };
    }
    function O(a, b, c, d) {
        function e(h) {
            var i;
            return f[h] = !0, eb.each(a[h] || [], function(a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), 
                e(j), !1);
            }), i;
        }
        var f = {}, g = a === Rc;
        return e(b.dataTypes[0]) || !f["*"] && e("*");
    }
    function P(a, b) {
        var c, d, e = eb.ajaxSettings.flatOptions || {};
        for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
        return c && eb.extend(!0, a, c), a;
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
        if (eb.isArray(b)) eb.each(b, function(b, e) {
            c || Vc.test(a) ? d(a, e) : S(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d);
        }); else if (c || "object" !== eb.type(b)) d(a, b); else for (e in b) S(a + "[" + e + "]", b[e], c, d);
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
        return eb.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1;
    }
    var W = [], X = W.slice, Y = W.concat, Z = W.push, $ = W.indexOf, _ = {}, ab = _.toString, bb = _.hasOwnProperty, cb = {}, db = "1.11.2", eb = function(a, b) {
        return new eb.fn.init(a, b);
    }, fb = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, gb = /^-ms-/, hb = /-([\da-z])/gi, ib = function(a, b) {
        return b.toUpperCase();
    };
    eb.fn = eb.prototype = {
        jquery: db,
        constructor: eb,
        selector: "",
        length: 0,
        toArray: function() {
            return X.call(this);
        },
        get: function(a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : X.call(this);
        },
        pushStack: function(a) {
            var b = eb.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b;
        },
        each: function(a, b) {
            return eb.each(this, a, b);
        },
        map: function(a) {
            return this.pushStack(eb.map(this, function(b, c) {
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
    }, eb.extend = eb.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || eb.isFunction(g) || (g = {}), 
        h === i && (g = this, h--); i > h; h++) if (null != (e = arguments[h])) for (d in e) a = g[d], 
        c = e[d], g !== c && (j && c && (eb.isPlainObject(c) || (b = eb.isArray(c))) ? (b ? (b = !1, 
        f = a && eb.isArray(a) ? a : []) : f = a && eb.isPlainObject(a) ? a : {}, g[d] = eb.extend(j, f, c)) : void 0 !== c && (g[d] = c));
        return g;
    }, eb.extend({
        expando: "jQuery" + (db + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(a) {
            throw new Error(a);
        },
        noop: function() {},
        isFunction: function(a) {
            return "function" === eb.type(a);
        },
        isArray: Array.isArray || function(a) {
            return "array" === eb.type(a);
        },
        isWindow: function(a) {
            return null != a && a == a.window;
        },
        isNumeric: function(a) {
            return !eb.isArray(a) && a - parseFloat(a) + 1 >= 0;
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a) return !1;
            return !0;
        },
        isPlainObject: function(a) {
            var b;
            if (!a || "object" !== eb.type(a) || a.nodeType || eb.isWindow(a)) return !1;
            try {
                if (a.constructor && !bb.call(a, "constructor") && !bb.call(a.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (c) {
                return !1;
            }
            if (cb.ownLast) for (b in a) return bb.call(a, b);
            for (b in a) ;
            return void 0 === b || bb.call(a, b);
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? _[ab.call(a)] || "object" : typeof a;
        },
        globalEval: function(b) {
            b && eb.trim(b) && (a.execScript || function(b) {
                a.eval.call(a, b);
            })(b);
        },
        camelCase: function(a) {
            return a.replace(gb, "ms-").replace(hb, ib);
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
            return null == a ? "" : (a + "").replace(fb, "");
        },
        makeArray: function(a, b) {
            var d = b || [];
            return null != a && (c(Object(a)) ? eb.merge(d, "string" == typeof a ? [ a ] : a) : Z.call(d, a)), 
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
            return "string" == typeof b && (e = a[b], b = a, a = e), eb.isFunction(a) ? (c = X.call(arguments, 2), 
            d = function() {
                return a.apply(b || this, c.concat(X.call(arguments)));
            }, d.guid = a.guid = a.guid || eb.guid++, d) : void 0;
        },
        now: function() {
            return +new Date();
        },
        support: cb
    }), eb.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        _["[object " + b + "]"] = b.toLowerCase();
    });
    var jb = function(a) {
        function b(a, b, c, d) {
            var e, f, g, h, i, j, l, n, o, p;
            if ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, c = c || [], h = b.nodeType, 
            "string" != typeof a || !a || 1 !== h && 9 !== h && 11 !== h) return c;
            if (!d && I) {
                if (11 !== h && (e = sb.exec(a))) if (g = e[1]) {
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
                        for (j = z(a), (l = b.getAttribute("id")) ? n = l.replace(ub, "\\$&") : b.setAttribute("id", n), 
                        n = "[id='" + n + "'] ", i = j.length; i--; ) j[i] = n + m(j[i]);
                        o = tb.test(a) && k(b.parentNode) || b, p = j.join(",");
                    }
                    if (p) try {
                        return $.apply(c, o.querySelectorAll(p)), c;
                    } catch (q) {} finally {
                        l || b.removeAttribute("id");
                    }
                }
            }
            return B(a.replace(ib, "$1"), b, c, d);
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
                        for (k = t.length; k--; ) (l = t[k]) && (j = f ? ab(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l));
                    }
                } else t = q(t === g ? t.splice(o, t.length) : t), f ? f(null, g, t, i) : $.apply(g, t);
            });
        }
        function s(a) {
            for (var b, c, d, e = a.length, f = w.relative[a[0].type], g = f || w.relative[" "], h = f ? 1 : 0, i = n(function(a) {
                return a === b;
            }, g, !0), j = n(function(a) {
                return ab(b, a) > -1;
            }, g, !0), k = [ function(a, c, d) {
                var e = !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
                return b = null, e;
            } ]; e > h; h++) if (c = w.relative[a[h].type]) k = [ n(o(k), c) ]; else {
                if (c = w.filter[a[h].type].apply(null, a[h].matches), c[N]) {
                    for (d = ++h; e > d && !w.relative[a[d].type]; d++) ;
                    return r(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1).concat({
                        value: " " === a[h - 2].type ? "*" : ""
                    })).replace(ib, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && m(a));
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
        }, V = 1 << 31, W = {}.hasOwnProperty, X = [], Y = X.pop, Z = X.push, $ = X.push, _ = X.slice, ab = function(a, b) {
            for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
            return -1;
        }, bb = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", cb = "[\\x20\\t\\r\\n\\f]", db = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", eb = db.replace("w", "w#"), fb = "\\[" + cb + "*(" + db + ")(?:" + cb + "*([*^$|!~]?=)" + cb + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + eb + "))|)" + cb + "*\\]", gb = ":(" + db + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + fb + ")*)|.*)\\)|)", hb = new RegExp(cb + "+", "g"), ib = new RegExp("^" + cb + "+|((?:^|[^\\\\])(?:\\\\.)*)" + cb + "+$", "g"), jb = new RegExp("^" + cb + "*," + cb + "*"), kb = new RegExp("^" + cb + "*([>+~]|" + cb + ")" + cb + "*"), lb = new RegExp("=" + cb + "*([^\\]'\"]*?)" + cb + "*\\]", "g"), mb = new RegExp(gb), nb = new RegExp("^" + eb + "$"), ob = {
            ID: new RegExp("^#(" + db + ")"),
            CLASS: new RegExp("^\\.(" + db + ")"),
            TAG: new RegExp("^(" + db.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + fb),
            PSEUDO: new RegExp("^" + gb),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + cb + "*(even|odd|(([+-]|)(\\d*)n|)" + cb + "*(?:([+-]|)" + cb + "*(\\d+)|))" + cb + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + bb + ")$", "i"),
            needsContext: new RegExp("^" + cb + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + cb + "*((?:-\\d)?\\d*)" + cb + "*\\)|)(?=[^-]|$)", "i")
        }, pb = /^(?:input|select|textarea|button)$/i, qb = /^h\d$/i, rb = /^[^{]+\{\s*\[native \w/, sb = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, tb = /[+~]/, ub = /'|\\/g, vb = new RegExp("\\\\([\\da-f]{1,6}" + cb + "?|(" + cb + ")|.)", "ig"), wb = function(a, b, c) {
            var d = "0x" + b - 65536;
            return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320);
        }, xb = function() {
            F();
        };
        try {
            $.apply(X = _.call(O.childNodes), O.childNodes), X[O.childNodes.length].nodeType;
        } catch (yb) {
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
            c = d.defaultView, c && c !== c.top && (c.addEventListener ? c.addEventListener("unload", xb, !1) : c.attachEvent && c.attachEvent("onunload", xb)), 
            I = !y(d), v.attributes = e(function(a) {
                return a.className = "i", !a.getAttribute("className");
            }), v.getElementsByTagName = e(function(a) {
                return a.appendChild(d.createComment("")), !a.getElementsByTagName("*").length;
            }), v.getElementsByClassName = rb.test(d.getElementsByClassName), v.getById = e(function(a) {
                return H.appendChild(a).id = N, !d.getElementsByName || !d.getElementsByName(N).length;
            }), v.getById ? (w.find.ID = function(a, b) {
                if ("undefined" != typeof b.getElementById && I) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [ c ] : [];
                }
            }, w.filter.ID = function(a) {
                var b = a.replace(vb, wb);
                return function(a) {
                    return a.getAttribute("id") === b;
                };
            }) : (delete w.find.ID, w.filter.ID = function(a) {
                var b = a.replace(vb, wb);
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
            }, K = [], J = [], (v.qsa = rb.test(d.querySelectorAll)) && (e(function(a) {
                H.appendChild(a).innerHTML = "<a id='" + N + "'></a><select id='" + N + "-\f]' msallowcapture=''><option selected=''></option></select>", 
                a.querySelectorAll("[msallowcapture^='']").length && J.push("[*^$]=" + cb + "*(?:''|\"\")"), 
                a.querySelectorAll("[selected]").length || J.push("\\[" + cb + "*(?:value|" + bb + ")"), 
                a.querySelectorAll("[id~=" + N + "-]").length || J.push("~="), a.querySelectorAll(":checked").length || J.push(":checked"), 
                a.querySelectorAll("a#" + N + "+*").length || J.push(".#.+[+~]");
            }), e(function(a) {
                var b = d.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && J.push("name" + cb + "*[*^$|!~]?="), 
                a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), 
                J.push(",.*:");
            })), (v.matchesSelector = rb.test(L = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function(a) {
                v.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", gb);
            }), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), 
            b = rb.test(H.compareDocumentPosition), M = b || rb.test(H.contains) ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
            } : function(a, b) {
                if (b) for (;b = b.parentNode; ) if (b === a) return !0;
                return !1;
            }, U = b ? function(a, b) {
                if (a === b) return E = !0, 0;
                var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return c ? c : (c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 
                1 & c || !v.sortDetached && b.compareDocumentPosition(a) === c ? a === d || a.ownerDocument === O && M(O, a) ? -1 : b === d || b.ownerDocument === O && M(O, b) ? 1 : D ? ab(D, a) - ab(D, b) : 0 : 4 & c ? -1 : 1);
            } : function(a, b) {
                if (a === b) return E = !0, 0;
                var c, e = 0, f = a.parentNode, h = b.parentNode, i = [ a ], j = [ b ];
                if (!f || !h) return a === d ? -1 : b === d ? 1 : f ? -1 : h ? 1 : D ? ab(D, a) - ab(D, b) : 0;
                if (f === h) return g(a, b);
                for (c = a; c = c.parentNode; ) i.unshift(c);
                for (c = b; c = c.parentNode; ) j.unshift(c);
                for (;i[e] === j[e]; ) e++;
                return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0;
            }, d) : G;
        }, b.matches = function(a, c) {
            return b(a, null, null, c);
        }, b.matchesSelector = function(a, c) {
            if ((a.ownerDocument || a) !== G && F(a), c = c.replace(lb, "='$1']"), !(!v.matchesSelector || !I || K && K.test(c) || J && J.test(c))) try {
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
            match: ob,
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
                    return a[1] = a[1].replace(vb, wb), a[3] = (a[3] || a[4] || a[5] || "").replace(vb, wb), 
                    "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4);
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), 
                    a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), 
                    a;
                },
                PSEUDO: function(a) {
                    var b, c = !a[6] && a[2];
                    return ob.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && mb.test(c) && (b = z(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), 
                    a[2] = c.slice(0, b)), a.slice(0, 3));
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(vb, wb).toLowerCase();
                    return "*" === a ? function() {
                        return !0;
                    } : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b;
                    };
                },
                CLASS: function(a) {
                    var b = R[a + " "];
                    return b || (b = new RegExp("(^|" + cb + ")" + a + "(" + cb + "|$)")) && R(a, function(a) {
                        return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "");
                    });
                },
                ATTR: function(a, c, d) {
                    return function(e) {
                        var f = b.attr(e, a);
                        return null == f ? "!=" === c : c ? (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f.replace(hb, " ") + " ").indexOf(d) > -1 : "|=" === c ? f === d || f.slice(0, d.length + 1) === d + "-" : !1) : !0;
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
                        for (var d, e = f(a, c), g = e.length; g--; ) d = ab(a, e[g]), a[d] = !(b[d] = e[g]);
                    }) : function(a) {
                        return f(a, 0, e);
                    }) : f;
                }
            },
            pseudos: {
                not: d(function(a) {
                    var b = [], c = [], e = A(a.replace(ib, "$1"));
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
                    return a = a.replace(vb, wb), function(b) {
                        return (b.textContent || b.innerText || x(b)).indexOf(a) > -1;
                    };
                }),
                lang: d(function(a) {
                    return nb.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(vb, wb).toLowerCase(), 
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
                    return qb.test(a.nodeName);
                },
                input: function(a) {
                    return pb.test(a.nodeName);
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
                (!d || (e = jb.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), 
                d = !1, (e = kb.exec(h)) && (d = e.shift(), f.push({
                    value: d,
                    type: e[0].replace(ib, " ")
                }), h = h.slice(d.length));
                for (g in w.filter) !(e = ob[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), 
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
                    if (b = (w.find.ID(g.matches[0].replace(vb, wb), b) || [])[0], !b) return c;
                    j && (b = b.parentNode), a = a.slice(f.shift().value.length);
                }
                for (e = ob.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !w.relative[h = g.type]); ) if ((i = w.find[h]) && (d = i(g.matches[0].replace(vb, wb), tb.test(f[0].type) && k(b.parentNode) || b))) {
                    if (f.splice(e, 1), a = d.length && m(f), !a) return $.apply(c, d), c;
                    break;
                }
            }
            return (j || A(a, l))(d, b, !I, c, tb.test(a) && k(b.parentNode) || b), c;
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
        }) || f(bb, function(a, b, c) {
            var d;
            return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
        }), b;
    }(a);
    eb.find = jb, eb.expr = jb.selectors, eb.expr[":"] = eb.expr.pseudos, eb.unique = jb.uniqueSort, 
    eb.text = jb.getText, eb.isXMLDoc = jb.isXML, eb.contains = jb.contains;
    var kb = eb.expr.match.needsContext, lb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, mb = /^.[^:#\[\.,]*$/;
    eb.filter = function(a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? eb.find.matchesSelector(d, a) ? [ d ] : [] : eb.find.matches(a, eb.grep(b, function(a) {
            return 1 === a.nodeType;
        }));
    }, eb.fn.extend({
        find: function(a) {
            var b, c = [], d = this, e = d.length;
            if ("string" != typeof a) return this.pushStack(eb(a).filter(function() {
                for (b = 0; e > b; b++) if (eb.contains(d[b], this)) return !0;
            }));
            for (b = 0; e > b; b++) eb.find(a, d[b], c);
            return c = this.pushStack(e > 1 ? eb.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, 
            c;
        },
        filter: function(a) {
            return this.pushStack(d(this, a || [], !1));
        },
        not: function(a) {
            return this.pushStack(d(this, a || [], !0));
        },
        is: function(a) {
            return !!d(this, "string" == typeof a && kb.test(a) ? eb(a) : a || [], !1).length;
        }
    });
    var nb, ob = a.document, pb = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, qb = eb.fn.init = function(a, b) {
        var c, d;
        if (!a) return this;
        if ("string" == typeof a) {
            if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [ null, a, null ] : pb.exec(a), 
            !c || !c[1] && b) return !b || b.jquery ? (b || nb).find(a) : this.constructor(b).find(a);
            if (c[1]) {
                if (b = b instanceof eb ? b[0] : b, eb.merge(this, eb.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : ob, !0)), 
                lb.test(c[1]) && eb.isPlainObject(b)) for (c in b) eb.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                return this;
            }
            if (d = ob.getElementById(c[2]), d && d.parentNode) {
                if (d.id !== c[2]) return nb.find(a);
                this.length = 1, this[0] = d;
            }
            return this.context = ob, this.selector = a, this;
        }
        return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : eb.isFunction(a) ? "undefined" != typeof nb.ready ? nb.ready(a) : a(eb) : (void 0 !== a.selector && (this.selector = a.selector, 
        this.context = a.context), eb.makeArray(a, this));
    };
    qb.prototype = eb.fn, nb = eb(ob);
    var rb = /^(?:parents|prev(?:Until|All))/, sb = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    eb.extend({
        dir: function(a, b, c) {
            for (var d = [], e = a[b]; e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !eb(e).is(c)); ) 1 === e.nodeType && d.push(e), 
            e = e[b];
            return d;
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c;
        }
    }), eb.fn.extend({
        has: function(a) {
            var b, c = eb(a, this), d = c.length;
            return this.filter(function() {
                for (b = 0; d > b; b++) if (eb.contains(this, c[b])) return !0;
            });
        },
        closest: function(a, b) {
            for (var c, d = 0, e = this.length, f = [], g = kb.test(a) || "string" != typeof a ? eb(a, b || this.context) : 0; e > d; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && eb.find.matchesSelector(c, a))) {
                f.push(c);
                break;
            }
            return this.pushStack(f.length > 1 ? eb.unique(f) : f);
        },
        index: function(a) {
            return a ? "string" == typeof a ? eb.inArray(this[0], eb(a)) : eb.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(a, b) {
            return this.pushStack(eb.unique(eb.merge(this.get(), eb(a, b))));
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
        }
    }), eb.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null;
        },
        parents: function(a) {
            return eb.dir(a, "parentNode");
        },
        parentsUntil: function(a, b, c) {
            return eb.dir(a, "parentNode", c);
        },
        next: function(a) {
            return e(a, "nextSibling");
        },
        prev: function(a) {
            return e(a, "previousSibling");
        },
        nextAll: function(a) {
            return eb.dir(a, "nextSibling");
        },
        prevAll: function(a) {
            return eb.dir(a, "previousSibling");
        },
        nextUntil: function(a, b, c) {
            return eb.dir(a, "nextSibling", c);
        },
        prevUntil: function(a, b, c) {
            return eb.dir(a, "previousSibling", c);
        },
        siblings: function(a) {
            return eb.sibling((a.parentNode || {}).firstChild, a);
        },
        children: function(a) {
            return eb.sibling(a.firstChild);
        },
        contents: function(a) {
            return eb.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : eb.merge([], a.childNodes);
        }
    }, function(a, b) {
        eb.fn[a] = function(c, d) {
            var e = eb.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = eb.filter(d, e)), 
            this.length > 1 && (sb[a] || (e = eb.unique(e)), rb.test(a) && (e = e.reverse())), 
            this.pushStack(e);
        };
    });
    var tb = /\S+/g, ub = {};
    eb.Callbacks = function(a) {
        a = "string" == typeof a ? ub[a] || f(a) : eb.extend({}, a);
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
                        eb.each(b, function(b, c) {
                            var d = eb.type(c);
                            "function" === d ? a.unique && l.has(c) || i.push(c) : c && c.length && "string" !== d && f(c);
                        });
                    }(arguments), b ? e = i.length : c && (h = d, k(c));
                }
                return this;
            },
            remove: function() {
                return i && eb.each(arguments, function(a, c) {
                    for (var d; (d = eb.inArray(c, i, d)) > -1; ) i.splice(d, 1), b && (e >= d && e--, 
                    g >= d && g--);
                }), this;
            },
            has: function(a) {
                return a ? eb.inArray(a, i) > -1 : !(!i || !i.length);
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
    }, eb.extend({
        Deferred: function(a) {
            var b = [ [ "resolve", "done", eb.Callbacks("once memory"), "resolved" ], [ "reject", "fail", eb.Callbacks("once memory"), "rejected" ], [ "notify", "progress", eb.Callbacks("memory") ] ], c = "pending", d = {
                state: function() {
                    return c;
                },
                always: function() {
                    return e.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var a = arguments;
                    return eb.Deferred(function(c) {
                        eb.each(b, function(b, f) {
                            var g = eb.isFunction(a[b]) && a[b];
                            e[f[1]](function() {
                                var a = g && g.apply(this, arguments);
                                a && eb.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [ a ] : arguments);
                            });
                        }), a = null;
                    }).promise();
                },
                promise: function(a) {
                    return null != a ? eb.extend(a, d) : d;
                }
            }, e = {};
            return d.pipe = d.then, eb.each(b, function(a, f) {
                var g = f[2], h = f[3];
                d[f[1]] = g.add, h && g.add(function() {
                    c = h;
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this;
                }, e[f[0] + "With"] = g.fireWith;
            }), d.promise(e), a && a.call(e, e), e;
        },
        when: function(a) {
            var b, c, d, e = 0, f = X.call(arguments), g = f.length, h = 1 !== g || a && eb.isFunction(a.promise) ? g : 0, i = 1 === h ? a : eb.Deferred(), j = function(a, c, d) {
                return function(e) {
                    c[a] = this, d[a] = arguments.length > 1 ? X.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d);
                };
            };
            if (g > 1) for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++) f[e] && eb.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
            return h || i.resolveWith(d, f), i.promise();
        }
    });
    var vb;
    eb.fn.ready = function(a) {
        return eb.ready.promise().done(a), this;
    }, eb.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? eb.readyWait++ : eb.ready(!0);
        },
        ready: function(a) {
            if (a === !0 ? !--eb.readyWait : !eb.isReady) {
                if (!ob.body) return setTimeout(eb.ready);
                eb.isReady = !0, a !== !0 && --eb.readyWait > 0 || (vb.resolveWith(ob, [ eb ]), 
                eb.fn.triggerHandler && (eb(ob).triggerHandler("ready"), eb(ob).off("ready")));
            }
        }
    }), eb.ready.promise = function(b) {
        if (!vb) if (vb = eb.Deferred(), "complete" === ob.readyState) setTimeout(eb.ready); else if (ob.addEventListener) ob.addEventListener("DOMContentLoaded", h, !1), 
        a.addEventListener("load", h, !1); else {
            ob.attachEvent("onreadystatechange", h), a.attachEvent("onload", h);
            var c = !1;
            try {
                c = null == a.frameElement && ob.documentElement;
            } catch (d) {}
            c && c.doScroll && !function e() {
                if (!eb.isReady) {
                    try {
                        c.doScroll("left");
                    } catch (a) {
                        return setTimeout(e, 50);
                    }
                    g(), eb.ready();
                }
            }();
        }
        return vb.promise(b);
    };
    var wb, xb = "undefined";
    for (wb in eb(cb)) break;
    cb.ownLast = "0" !== wb, cb.inlineBlockNeedsLayout = !1, eb(function() {
        var a, b, c, d;
        c = ob.getElementsByTagName("body")[0], c && c.style && (b = ob.createElement("div"), 
        d = ob.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", 
        c.appendChild(d).appendChild(b), typeof b.style.zoom !== xb && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", 
        cb.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(d));
    }), function() {
        var a = ob.createElement("div");
        if (null == cb.deleteExpando) {
            cb.deleteExpando = !0;
            try {
                delete a.test;
            } catch (b) {
                cb.deleteExpando = !1;
            }
        }
        a = null;
    }(), eb.acceptData = function(a) {
        var b = eb.noData[(a.nodeName + " ").toLowerCase()], c = +a.nodeType || 1;
        return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b;
    };
    var yb = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, zb = /([A-Z])/g;
    eb.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(a) {
            return a = a.nodeType ? eb.cache[a[eb.expando]] : a[eb.expando], !!a && !j(a);
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
    }), eb.fn.extend({
        data: function(a, b) {
            var c, d, e, f = this[0], g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = eb.data(f), 1 === f.nodeType && !eb._data(f, "parsedAttrs"))) {
                    for (c = g.length; c--; ) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = eb.camelCase(d.slice(5)), 
                    i(f, d, e[d])));
                    eb._data(f, "parsedAttrs", !0);
                }
                return e;
            }
            return "object" == typeof a ? this.each(function() {
                eb.data(this, a);
            }) : arguments.length > 1 ? this.each(function() {
                eb.data(this, a, b);
            }) : f ? i(f, a, eb.data(f, a)) : void 0;
        },
        removeData: function(a) {
            return this.each(function() {
                eb.removeData(this, a);
            });
        }
    }), eb.extend({
        queue: function(a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue", d = eb._data(a, b), c && (!d || eb.isArray(c) ? d = eb._data(a, b, eb.makeArray(c)) : d.push(c)), 
            d || []) : void 0;
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = eb.queue(a, b), d = c.length, e = c.shift(), f = eb._queueHooks(a, b), g = function() {
                eb.dequeue(a, b);
            };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), 
            delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return eb._data(a, c) || eb._data(a, c, {
                empty: eb.Callbacks("once memory").add(function() {
                    eb._removeData(a, b + "queue"), eb._removeData(a, c);
                })
            });
        }
    }), eb.fn.extend({
        queue: function(a, b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? eb.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                var c = eb.queue(this, a, b);
                eb._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && eb.dequeue(this, a);
            });
        },
        dequeue: function(a) {
            return this.each(function() {
                eb.dequeue(this, a);
            });
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", []);
        },
        promise: function(a, b) {
            var c, d = 1, e = eb.Deferred(), f = this, g = this.length, h = function() {
                --d || e.resolveWith(f, [ f ]);
            };
            for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--; ) c = eb._data(f[g], a + "queueHooks"), 
            c && c.empty && (d++, c.empty.add(h));
            return h(), e.promise(b);
        }
    });
    var Ab = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Bb = [ "Top", "Right", "Bottom", "Left" ], Cb = function(a, b) {
        return a = b || a, "none" === eb.css(a, "display") || !eb.contains(a.ownerDocument, a);
    }, Db = eb.access = function(a, b, c, d, e, f, g) {
        var h = 0, i = a.length, j = null == c;
        if ("object" === eb.type(c)) {
            e = !0;
            for (h in c) eb.access(a, b, h, c[h], !0, f, g);
        } else if (void 0 !== d && (e = !0, eb.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), 
        b = null) : (j = b, b = function(a, b, c) {
            return j.call(eb(a), c);
        })), b)) for (;i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
    }, Eb = /^(?:checkbox|radio)$/i;
    !function() {
        var a = ob.createElement("input"), b = ob.createElement("div"), c = ob.createDocumentFragment();
        if (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        cb.leadingWhitespace = 3 === b.firstChild.nodeType, cb.tbody = !b.getElementsByTagName("tbody").length, 
        cb.htmlSerialize = !!b.getElementsByTagName("link").length, cb.html5Clone = "<:nav></:nav>" !== ob.createElement("nav").cloneNode(!0).outerHTML, 
        a.type = "checkbox", a.checked = !0, c.appendChild(a), cb.appendChecked = a.checked, 
        b.innerHTML = "<textarea>x</textarea>", cb.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue, 
        c.appendChild(b), b.innerHTML = "<input type='radio' checked='checked' name='t'/>", 
        cb.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, cb.noCloneEvent = !0, 
        b.attachEvent && (b.attachEvent("onclick", function() {
            cb.noCloneEvent = !1;
        }), b.cloneNode(!0).click()), null == cb.deleteExpando) {
            cb.deleteExpando = !0;
            try {
                delete b.test;
            } catch (d) {
                cb.deleteExpando = !1;
            }
        }
    }(), function() {
        var b, c, d = ob.createElement("div");
        for (b in {
            submit: !0,
            change: !0,
            focusin: !0
        }) c = "on" + b, (cb[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), cb[b + "Bubbles"] = d.attributes[c].expando === !1);
        d = null;
    }();
    var Fb = /^(?:input|select|textarea)$/i, Gb = /^key/, Hb = /^(?:mouse|pointer|contextmenu)|click/, Ib = /^(?:focusinfocus|focusoutblur)$/, Jb = /^([^.]*)(?:\.(.+)|)$/;
    eb.event = {
        global: {},
        add: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = eb._data(a);
            if (q) {
                for (c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = eb.guid++), 
                (g = q.events) || (g = q.events = {}), (k = q.handle) || (k = q.handle = function(a) {
                    return typeof eb === xb || a && eb.event.triggered === a.type ? void 0 : eb.event.dispatch.apply(k.elem, arguments);
                }, k.elem = a), b = (b || "").match(tb) || [ "" ], h = b.length; h--; ) f = Jb.exec(b[h]) || [], 
                n = p = f[1], o = (f[2] || "").split(".").sort(), n && (j = eb.event.special[n] || {}, 
                n = (e ? j.delegateType : j.bindType) || n, j = eb.event.special[n] || {}, l = eb.extend({
                    type: n,
                    origType: p,
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    needsContext: e && eb.expr.match.needsContext.test(e),
                    namespace: o.join(".")
                }, i), (m = g[n]) || (m = g[n] = [], m.delegateCount = 0, j.setup && j.setup.call(a, d, o, k) !== !1 || (a.addEventListener ? a.addEventListener(n, k, !1) : a.attachEvent && a.attachEvent("on" + n, k))), 
                j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, l) : m.push(l), 
                eb.event.global[n] = !0);
                a = null;
            }
        },
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = eb.hasData(a) && eb._data(a);
            if (q && (k = q.events)) {
                for (b = (b || "").match(tb) || [ "" ], j = b.length; j--; ) if (h = Jb.exec(b[j]) || [], 
                n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                    for (l = eb.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, 
                    m = k[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), 
                    i = f = m.length; f--; ) g = m[f], !e && p !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1), 
                    g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
                    i && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || eb.removeEvent(a, n, q.handle), 
                    delete k[n]);
                } else for (n in k) eb.event.remove(a, n + b[j], c, d, !0);
                eb.isEmptyObject(k) && (delete q.handle, eb._removeData(a, "events"));
            }
        },
        trigger: function(b, c, d, e) {
            var f, g, h, i, j, k, l, m = [ d || ob ], n = bb.call(b, "type") ? b.type : b, o = bb.call(b, "namespace") ? b.namespace.split(".") : [];
            if (h = k = d = d || ob, 3 !== d.nodeType && 8 !== d.nodeType && !Ib.test(n + eb.event.triggered) && (n.indexOf(".") >= 0 && (o = n.split("."), 
            n = o.shift(), o.sort()), g = n.indexOf(":") < 0 && "on" + n, b = b[eb.expando] ? b : new eb.Event(n, "object" == typeof b && b), 
            b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            b.result = void 0, b.target || (b.target = d), c = null == c ? [ b ] : eb.makeArray(c, [ b ]), 
            j = eb.event.special[n] || {}, e || !j.trigger || j.trigger.apply(d, c) !== !1)) {
                if (!e && !j.noBubble && !eb.isWindow(d)) {
                    for (i = j.delegateType || n, Ib.test(i + n) || (h = h.parentNode); h; h = h.parentNode) m.push(h), 
                    k = h;
                    k === (d.ownerDocument || ob) && m.push(k.defaultView || k.parentWindow || a);
                }
                for (l = 0; (h = m[l++]) && !b.isPropagationStopped(); ) b.type = l > 1 ? i : j.bindType || n, 
                f = (eb._data(h, "events") || {})[b.type] && eb._data(h, "handle"), f && f.apply(h, c), 
                f = g && h[g], f && f.apply && eb.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
                if (b.type = n, !e && !b.isDefaultPrevented() && (!j._default || j._default.apply(m.pop(), c) === !1) && eb.acceptData(d) && g && d[n] && !eb.isWindow(d)) {
                    k = d[g], k && (d[g] = null), eb.event.triggered = n;
                    try {
                        d[n]();
                    } catch (p) {}
                    eb.event.triggered = void 0, k && (d[g] = k);
                }
                return b.result;
            }
        },
        dispatch: function(a) {
            a = eb.event.fix(a);
            var b, c, d, e, f, g = [], h = X.call(arguments), i = (eb._data(this, "events") || {})[a.type] || [], j = eb.event.special[a.type] || {};
            if (h[0] = a, a.delegateTarget = this, !j.preDispatch || j.preDispatch.call(this, a) !== !1) {
                for (g = eb.event.handlers.call(this, a, i), b = 0; (e = g[b++]) && !a.isPropagationStopped(); ) for (a.currentTarget = e.elem, 
                f = 0; (d = e.handlers[f++]) && !a.isImmediatePropagationStopped(); ) (!a.namespace_re || a.namespace_re.test(d.namespace)) && (a.handleObj = d, 
                a.data = d.data, c = ((eb.event.special[d.origType] || {}).handle || d.handler).apply(e.elem, h), 
                void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation()));
                return j.postDispatch && j.postDispatch.call(this, a), a.result;
            }
        },
        handlers: function(a, b) {
            var c, d, e, f, g = [], h = b.delegateCount, i = a.target;
            if (h && i.nodeType && (!a.button || "click" !== a.type)) for (;i != this; i = i.parentNode || this) if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                for (e = [], f = 0; h > f; f++) d = b[f], c = d.selector + " ", void 0 === e[c] && (e[c] = d.needsContext ? eb(c, this).index(i) >= 0 : eb.find(c, this, null, [ i ]).length), 
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
            if (a[eb.expando]) return a;
            var b, c, d, e = a.type, f = a, g = this.fixHooks[e];
            for (g || (this.fixHooks[e] = g = Hb.test(e) ? this.mouseHooks : Gb.test(e) ? this.keyHooks : {}), 
            d = g.props ? this.props.concat(g.props) : this.props, a = new eb.Event(f), b = d.length; b--; ) c = d[b], 
            a[c] = f[c];
            return a.target || (a.target = f.srcElement || ob), 3 === a.target.nodeType && (a.target = a.target.parentNode), 
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
                return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || ob, 
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
                    return eb.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), 
                    !1) : void 0;
                },
                _default: function(a) {
                    return eb.nodeName(a.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result);
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = eb.extend(new eb.Event(), c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? eb.event.trigger(e, null, b) : eb.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault();
        }
    }, eb.removeEvent = ob.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1);
    } : function(a, b, c) {
        var d = "on" + b;
        a.detachEvent && (typeof a[d] === xb && (a[d] = null), a.detachEvent(d, c));
    }, eb.Event = function(a, b) {
        return this instanceof eb.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, 
        this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? m : n) : this.type = a, 
        b && eb.extend(this, b), this.timeStamp = a && a.timeStamp || eb.now(), void (this[eb.expando] = !0)) : new eb.Event(a, b);
    }, eb.Event.prototype = {
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
    }, eb.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(a, b) {
        eb.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this, e = a.relatedTarget, f = a.handleObj;
                return (!e || e !== d && !eb.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), 
                a.type = b), c;
            }
        };
    }), cb.submitBubbles || (eb.event.special.submit = {
        setup: function() {
            return eb.nodeName(this, "form") ? !1 : void eb.event.add(this, "click._submit keypress._submit", function(a) {
                var b = a.target, c = eb.nodeName(b, "input") || eb.nodeName(b, "button") ? b.form : void 0;
                c && !eb._data(c, "submitBubbles") && (eb.event.add(c, "submit._submit", function(a) {
                    a._submit_bubble = !0;
                }), eb._data(c, "submitBubbles", !0));
            });
        },
        postDispatch: function(a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && eb.event.simulate("submit", this.parentNode, a, !0));
        },
        teardown: function() {
            return eb.nodeName(this, "form") ? !1 : void eb.event.remove(this, "._submit");
        }
    }), cb.changeBubbles || (eb.event.special.change = {
        setup: function() {
            return Fb.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (eb.event.add(this, "propertychange._change", function(a) {
                "checked" === a.originalEvent.propertyName && (this._just_changed = !0);
            }), eb.event.add(this, "click._change", function(a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1), eb.event.simulate("change", this, a, !0);
            })), !1) : void eb.event.add(this, "beforeactivate._change", function(a) {
                var b = a.target;
                Fb.test(b.nodeName) && !eb._data(b, "changeBubbles") && (eb.event.add(b, "change._change", function(a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || eb.event.simulate("change", this.parentNode, a, !0);
                }), eb._data(b, "changeBubbles", !0));
            });
        },
        handle: function(a) {
            var b = a.target;
            return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0;
        },
        teardown: function() {
            return eb.event.remove(this, "._change"), !Fb.test(this.nodeName);
        }
    }), cb.focusinBubbles || eb.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = function(a) {
            eb.event.simulate(b, a.target, eb.event.fix(a), !0);
        };
        eb.event.special[b] = {
            setup: function() {
                var d = this.ownerDocument || this, e = eb._data(d, b);
                e || d.addEventListener(a, c, !0), eb._data(d, b, (e || 0) + 1);
            },
            teardown: function() {
                var d = this.ownerDocument || this, e = eb._data(d, b) - 1;
                e ? eb._data(d, b, e) : (d.removeEventListener(a, c, !0), eb._removeData(d, b));
            }
        };
    }), eb.fn.extend({
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
                return eb().off(a), g.apply(this, arguments);
            }, d.guid = g.guid || (g.guid = eb.guid++)), this.each(function() {
                eb.event.add(this, a, d, c, b);
            });
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1);
        },
        off: function(a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj, eb(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), 
            this;
            if ("object" == typeof a) {
                for (e in a) this.off(e, b, a[e]);
                return this;
            }
            return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = n), 
            this.each(function() {
                eb.event.remove(this, a, c, b);
            });
        },
        trigger: function(a, b) {
            return this.each(function() {
                eb.event.trigger(a, b, this);
            });
        },
        triggerHandler: function(a, b) {
            var c = this[0];
            return c ? eb.event.trigger(a, b, c, !0) : void 0;
        }
    });
    var Kb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", Lb = / jQuery\d+="(?:null|\d+)"/g, Mb = new RegExp("<(?:" + Kb + ")[\\s/>]", "i"), Nb = /^\s+/, Ob = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Pb = /<([\w:]+)/, Qb = /<tbody/i, Rb = /<|&#?\w+;/, Sb = /<(?:script|style|link)/i, Tb = /checked\s*(?:[^=]|=\s*.checked.)/i, Ub = /^$|\/(?:java|ecma)script/i, Vb = /^true\/(.*)/, Wb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Xb = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        area: [ 1, "<map>", "</map>" ],
        param: [ 1, "<object>", "</object>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: cb.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
    }, Yb = p(ob), Zb = Yb.appendChild(ob.createElement("div"));
    Xb.optgroup = Xb.option, Xb.tbody = Xb.tfoot = Xb.colgroup = Xb.caption = Xb.thead, 
    Xb.th = Xb.td, eb.extend({
        clone: function(a, b, c) {
            var d, e, f, g, h, i = eb.contains(a.ownerDocument, a);
            if (cb.html5Clone || eb.isXMLDoc(a) || !Mb.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (Zb.innerHTML = a.outerHTML, 
            Zb.removeChild(f = Zb.firstChild)), !(cb.noCloneEvent && cb.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || eb.isXMLDoc(a))) for (d = q(f), 
            h = q(a), g = 0; null != (e = h[g]); ++g) d[g] && x(e, d[g]);
            if (b) if (c) for (h = h || q(a), d = d || q(f), g = 0; null != (e = h[g]); g++) w(e, d[g]); else w(a, f);
            return d = q(f, "script"), d.length > 0 && v(d, !i && q(a, "script")), d = h = e = null, 
            f;
        },
        buildFragment: function(a, b, c, d) {
            for (var e, f, g, h, i, j, k, l = a.length, m = p(b), n = [], o = 0; l > o; o++) if (f = a[o], 
            f || 0 === f) if ("object" === eb.type(f)) eb.merge(n, f.nodeType ? [ f ] : f); else if (Rb.test(f)) {
                for (h = h || m.appendChild(b.createElement("div")), i = (Pb.exec(f) || [ "", "" ])[1].toLowerCase(), 
                k = Xb[i] || Xb._default, h.innerHTML = k[1] + f.replace(Ob, "<$1></$2>") + k[2], 
                e = k[0]; e--; ) h = h.lastChild;
                if (!cb.leadingWhitespace && Nb.test(f) && n.push(b.createTextNode(Nb.exec(f)[0])), 
                !cb.tbody) for (f = "table" !== i || Qb.test(f) ? "<table>" !== k[1] || Qb.test(f) ? 0 : h : h.firstChild, 
                e = f && f.childNodes.length; e--; ) eb.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j);
                for (eb.merge(n, h.childNodes), h.textContent = ""; h.firstChild; ) h.removeChild(h.firstChild);
                h = m.lastChild;
            } else n.push(b.createTextNode(f));
            for (h && m.removeChild(h), cb.appendChecked || eb.grep(q(n, "input"), r), o = 0; f = n[o++]; ) if ((!d || -1 === eb.inArray(f, d)) && (g = eb.contains(f.ownerDocument, f), 
            h = q(m.appendChild(f), "script"), g && v(h), c)) for (e = 0; f = h[e++]; ) Ub.test(f.type || "") && c.push(f);
            return h = null, m;
        },
        cleanData: function(a, b) {
            for (var c, d, e, f, g = 0, h = eb.expando, i = eb.cache, j = cb.deleteExpando, k = eb.event.special; null != (c = a[g]); g++) if ((b || eb.acceptData(c)) && (e = c[h], 
            f = e && i[e])) {
                if (f.events) for (d in f.events) k[d] ? eb.event.remove(c, d) : eb.removeEvent(c, d, f.handle);
                i[e] && (delete i[e], j ? delete c[h] : typeof c.removeAttribute !== xb ? c.removeAttribute(h) : c[h] = null, 
                W.push(e));
            }
        }
    }), eb.fn.extend({
        text: function(a) {
            return Db(this, function(a) {
                return void 0 === a ? eb.text(this) : this.empty().append((this[0] && this[0].ownerDocument || ob).createTextNode(a));
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
            for (var c, d = a ? eb.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || eb.cleanData(q(c)), 
            c.parentNode && (b && eb.contains(c.ownerDocument, c) && v(q(c, "script")), c.parentNode.removeChild(c));
            return this;
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) {
                for (1 === a.nodeType && eb.cleanData(q(a, !1)); a.firstChild; ) a.removeChild(a.firstChild);
                a.options && eb.nodeName(a, "select") && (a.options.length = 0);
            }
            return this;
        },
        clone: function(a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
                return eb.clone(this, a, b);
            });
        },
        html: function(a) {
            return Db(this, function(a) {
                var b = this[0] || {}, c = 0, d = this.length;
                if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(Lb, "") : void 0;
                if (!("string" != typeof a || Sb.test(a) || !cb.htmlSerialize && Mb.test(a) || !cb.leadingWhitespace && Nb.test(a) || Xb[(Pb.exec(a) || [ "", "" ])[1].toLowerCase()])) {
                    a = a.replace(Ob, "<$1></$2>");
                    try {
                        for (;d > c; c++) b = this[c] || {}, 1 === b.nodeType && (eb.cleanData(q(b, !1)), 
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
                a = this.parentNode, eb.cleanData(q(this)), a && a.replaceChild(b, this);
            }), a && (a.length || a.nodeType) ? this : this.remove();
        },
        detach: function(a) {
            return this.remove(a, !0);
        },
        domManip: function(a, b) {
            a = Y.apply([], a);
            var c, d, e, f, g, h, i = 0, j = this.length, k = this, l = j - 1, m = a[0], n = eb.isFunction(m);
            if (n || j > 1 && "string" == typeof m && !cb.checkClone && Tb.test(m)) return this.each(function(c) {
                var d = k.eq(c);
                n && (a[0] = m.call(this, c, d.html())), d.domManip(a, b);
            });
            if (j && (h = eb.buildFragment(a, this[0].ownerDocument, !1, this), c = h.firstChild, 
            1 === h.childNodes.length && (h = c), c)) {
                for (f = eb.map(q(h, "script"), t), e = f.length; j > i; i++) d = h, i !== l && (d = eb.clone(d, !0, !0), 
                e && eb.merge(f, q(d, "script"))), b.call(this[i], d, i);
                if (e) for (g = f[f.length - 1].ownerDocument, eb.map(f, u), i = 0; e > i; i++) d = f[i], 
                Ub.test(d.type || "") && !eb._data(d, "globalEval") && eb.contains(g, d) && (d.src ? eb._evalUrl && eb._evalUrl(d.src) : eb.globalEval((d.text || d.textContent || d.innerHTML || "").replace(Wb, "")));
                h = c = null;
            }
            return this;
        }
    }), eb.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        eb.fn[a] = function(a) {
            for (var c, d = 0, e = [], f = eb(a), g = f.length - 1; g >= d; d++) c = d === g ? this : this.clone(!0), 
            eb(f[d])[b](c), Z.apply(e, c.get());
            return this.pushStack(e);
        };
    });
    var $b, _b = {};
    !function() {
        var a;
        cb.shrinkWrapBlocks = function() {
            if (null != a) return a;
            a = !1;
            var b, c, d;
            return c = ob.getElementsByTagName("body")[0], c && c.style ? (b = ob.createElement("div"), 
            d = ob.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", 
            c.appendChild(d).appendChild(b), typeof b.style.zoom !== xb && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", 
            b.appendChild(ob.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), 
            c.removeChild(d), a) : void 0;
        };
    }();
    var ac, bc, cc = /^margin/, dc = new RegExp("^(" + Ab + ")(?!px)[a-z%]+$", "i"), ec = /^(top|right|bottom|left)$/;
    a.getComputedStyle ? (ac = function(b) {
        return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(b, null);
    }, bc = function(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || ac(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== g || eb.contains(a.ownerDocument, a) || (g = eb.style(a, b)), 
        dc.test(g) && cc.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, 
        g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + "";
    }) : ob.documentElement.currentStyle && (ac = function(a) {
        return a.currentStyle;
    }, bc = function(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || ac(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), 
        dc.test(g) && !ec.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), 
        h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), 
        void 0 === g ? g : g + "" || "auto";
    }), !function() {
        function b() {
            var b, c, d, e;
            c = ob.getElementsByTagName("body")[0], c && c.style && (b = ob.createElement("div"), 
            d = ob.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", 
            c.appendChild(d).appendChild(b), b.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", 
            f = g = !1, i = !0, a.getComputedStyle && (f = "1%" !== (a.getComputedStyle(b, null) || {}).top, 
            g = "4px" === (a.getComputedStyle(b, null) || {
                width: "4px"
            }).width, e = b.appendChild(ob.createElement("div")), e.style.cssText = b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", 
            e.style.marginRight = e.style.width = "0", b.style.width = "1px", i = !parseFloat((a.getComputedStyle(e, null) || {}).marginRight), 
            b.removeChild(e)), b.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", 
            e = b.getElementsByTagName("td"), e[0].style.cssText = "margin:0;border:0;padding:0;display:none", 
            h = 0 === e[0].offsetHeight, h && (e[0].style.display = "", e[1].style.display = "none", 
            h = 0 === e[0].offsetHeight), c.removeChild(d));
        }
        var c, d, e, f, g, h, i;
        c = ob.createElement("div"), c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        e = c.getElementsByTagName("a")[0], (d = e && e.style) && (d.cssText = "float:left;opacity:.5", 
        cb.opacity = "0.5" === d.opacity, cb.cssFloat = !!d.cssFloat, c.style.backgroundClip = "content-box", 
        c.cloneNode(!0).style.backgroundClip = "", cb.clearCloneStyle = "content-box" === c.style.backgroundClip, 
        cb.boxSizing = "" === d.boxSizing || "" === d.MozBoxSizing || "" === d.WebkitBoxSizing, 
        eb.extend(cb, {
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
    }(), eb.swap = function(a, b, c, d) {
        var e, f, g = {};
        for (f in b) g[f] = a.style[f], a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b) a.style[f] = g[f];
        return e;
    };
    var fc = /alpha\([^)]*\)/i, gc = /opacity\s*=\s*([^)]*)/, hc = /^(none|table(?!-c[ea]).+)/, ic = new RegExp("^(" + Ab + ")(.*)$", "i"), jc = new RegExp("^([+-])=(" + Ab + ")", "i"), kc = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, lc = {
        letterSpacing: "0",
        fontWeight: "400"
    }, mc = [ "Webkit", "O", "Moz", "ms" ];
    eb.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = bc(a, "opacity");
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
            "float": cb.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = eb.camelCase(b), i = a.style;
                if (b = eb.cssProps[h] || (eb.cssProps[h] = B(i, h)), g = eb.cssHooks[b] || eb.cssHooks[h], 
                void 0 === c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
                if (f = typeof c, "string" === f && (e = jc.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(eb.css(a, b)), 
                f = "number"), null != c && c === c && ("number" !== f || eb.cssNumber[h] || (c += "px"), 
                cb.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), 
                !(g && "set" in g && void 0 === (c = g.set(a, c, d))))) try {
                    i[b] = c;
                } catch (j) {}
            }
        },
        css: function(a, b, c, d) {
            var e, f, g, h = eb.camelCase(b);
            return b = eb.cssProps[h] || (eb.cssProps[h] = B(a.style, h)), g = eb.cssHooks[b] || eb.cssHooks[h], 
            g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = bc(a, b, d)), "normal" === f && b in lc && (f = lc[b]), 
            "" === c || c ? (e = parseFloat(f), c === !0 || eb.isNumeric(e) ? e || 0 : f) : f;
        }
    }), eb.each([ "height", "width" ], function(a, b) {
        eb.cssHooks[b] = {
            get: function(a, c, d) {
                return c ? hc.test(eb.css(a, "display")) && 0 === a.offsetWidth ? eb.swap(a, kc, function() {
                    return F(a, b, d);
                }) : F(a, b, d) : void 0;
            },
            set: function(a, c, d) {
                var e = d && ac(a);
                return D(a, c, d ? E(a, b, d, cb.boxSizing && "border-box" === eb.css(a, "boxSizing", !1, e), e) : 0);
            }
        };
    }), cb.opacity || (eb.cssHooks.opacity = {
        get: function(a, b) {
            return gc.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : "";
        },
        set: function(a, b) {
            var c = a.style, d = a.currentStyle, e = eb.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "", f = d && d.filter || c.filter || "";
            c.zoom = 1, (b >= 1 || "" === b) && "" === eb.trim(f.replace(fc, "")) && c.removeAttribute && (c.removeAttribute("filter"), 
            "" === b || d && !d.filter) || (c.filter = fc.test(f) ? f.replace(fc, e) : f + " " + e);
        }
    }), eb.cssHooks.marginRight = A(cb.reliableMarginRight, function(a, b) {
        return b ? eb.swap(a, {
            display: "inline-block"
        }, bc, [ a, "marginRight" ]) : void 0;
    }), eb.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        eb.cssHooks[a + b] = {
            expand: function(c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [ c ]; 4 > d; d++) e[a + Bb[d] + b] = f[d] || f[d - 2] || f[0];
                return e;
            }
        }, cc.test(a) || (eb.cssHooks[a + b].set = D);
    }), eb.fn.extend({
        css: function(a, b) {
            return Db(this, function(a, b, c) {
                var d, e, f = {}, g = 0;
                if (eb.isArray(b)) {
                    for (d = ac(a), e = b.length; e > g; g++) f[b[g]] = eb.css(a, b[g], !1, d);
                    return f;
                }
                return void 0 !== c ? eb.style(a, b, c) : eb.css(a, b);
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
                Cb(this) ? eb(this).show() : eb(this).hide();
            });
        }
    }), eb.Tween = G, G.prototype = {
        constructor: G,
        init: function(a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), 
            this.end = d, this.unit = f || (eb.cssNumber[c] ? "" : "px");
        },
        cur: function() {
            var a = G.propHooks[this.prop];
            return a && a.get ? a.get(this) : G.propHooks._default.get(this);
        },
        run: function(a) {
            var b, c = G.propHooks[this.prop];
            return this.pos = b = this.options.duration ? eb.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, 
            this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            c && c.set ? c.set(this) : G.propHooks._default.set(this), this;
        }
    }, G.prototype.init.prototype = G.prototype, G.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = eb.css(a.elem, a.prop, ""), 
                b && "auto" !== b ? b : 0) : a.elem[a.prop];
            },
            set: function(a) {
                eb.fx.step[a.prop] ? eb.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[eb.cssProps[a.prop]] || eb.cssHooks[a.prop]) ? eb.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now;
            }
        }
    }, G.propHooks.scrollTop = G.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
        }
    }, eb.easing = {
        linear: function(a) {
            return a;
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2;
        }
    }, eb.fx = G.prototype.init, eb.fx.step = {};
    var nc, oc, pc = /^(?:toggle|show|hide)$/, qc = new RegExp("^(?:([+-])=|)(" + Ab + ")([a-z%]*)$", "i"), rc = /queueHooks$/, sc = [ K ], tc = {
        "*": [ function(a, b) {
            var c = this.createTween(a, b), d = c.cur(), e = qc.exec(b), f = e && e[3] || (eb.cssNumber[a] ? "" : "px"), g = (eb.cssNumber[a] || "px" !== f && +d) && qc.exec(eb.css(c.elem, a)), h = 1, i = 20;
            if (g && g[3] !== f) {
                f = f || g[3], e = e || [], g = +d || 1;
                do h = h || ".5", g /= h, eb.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i);
            }
            return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), 
            c;
        } ]
    };
    eb.Animation = eb.extend(M, {
        tweener: function(a, b) {
            eb.isFunction(a) ? (b = a, a = [ "*" ]) : a = a.split(" ");
            for (var c, d = 0, e = a.length; e > d; d++) c = a[d], tc[c] = tc[c] || [], tc[c].unshift(b);
        },
        prefilter: function(a, b) {
            b ? sc.unshift(a) : sc.push(a);
        }
    }), eb.speed = function(a, b, c) {
        var d = a && "object" == typeof a ? eb.extend({}, a) : {
            complete: c || !c && b || eb.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !eb.isFunction(b) && b
        };
        return d.duration = eb.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in eb.fx.speeds ? eb.fx.speeds[d.duration] : eb.fx.speeds._default, 
        (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
            eb.isFunction(d.old) && d.old.call(this), d.queue && eb.dequeue(this, d.queue);
        }, d;
    }, eb.fn.extend({
        fadeTo: function(a, b, c, d) {
            return this.filter(Cb).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d);
        },
        animate: function(a, b, c, d) {
            var e = eb.isEmptyObject(a), f = eb.speed(b, c, d), g = function() {
                var b = M(this, eb.extend({}, a), f);
                (e || eb._data(this, "finish")) && b.stop(!0);
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
                var b = !0, e = null != a && a + "queueHooks", f = eb.timers, g = eb._data(this);
                if (e) g[e] && g[e].stop && d(g[e]); else for (e in g) g[e] && g[e].stop && rc.test(e) && d(g[e]);
                for (e = f.length; e--; ) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), 
                b = !1, f.splice(e, 1));
                (b || !c) && eb.dequeue(this, a);
            });
        },
        finish: function(a) {
            return a !== !1 && (a = a || "fx"), this.each(function() {
                var b, c = eb._data(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = eb.timers, g = d ? d.length : 0;
                for (c.finish = !0, eb.queue(this, a, []), e && e.stop && e.stop.call(this, !0), 
                b = f.length; b--; ) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), 
                f.splice(b, 1));
                for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish;
            });
        }
    }), eb.each([ "toggle", "show", "hide" ], function(a, b) {
        var c = eb.fn[b];
        eb.fn[b] = function(a, d, e) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(I(b, !0), a, d, e);
        };
    }), eb.each({
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
        eb.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d);
        };
    }), eb.timers = [], eb.fx.tick = function() {
        var a, b = eb.timers, c = 0;
        for (nc = eb.now(); c < b.length; c++) a = b[c], a() || b[c] !== a || b.splice(c--, 1);
        b.length || eb.fx.stop(), nc = void 0;
    }, eb.fx.timer = function(a) {
        eb.timers.push(a), a() ? eb.fx.start() : eb.timers.pop();
    }, eb.fx.interval = 13, eb.fx.start = function() {
        oc || (oc = setInterval(eb.fx.tick, eb.fx.interval));
    }, eb.fx.stop = function() {
        clearInterval(oc), oc = null;
    }, eb.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, eb.fn.delay = function(a, b) {
        return a = eb.fx ? eb.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
            var d = setTimeout(b, a);
            c.stop = function() {
                clearTimeout(d);
            };
        });
    }, function() {
        var a, b, c, d, e;
        b = ob.createElement("div"), b.setAttribute("className", "t"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        d = b.getElementsByTagName("a")[0], c = ob.createElement("select"), e = c.appendChild(ob.createElement("option")), 
        a = b.getElementsByTagName("input")[0], d.style.cssText = "top:1px", cb.getSetAttribute = "t" !== b.className, 
        cb.style = /top/.test(d.getAttribute("style")), cb.hrefNormalized = "/a" === d.getAttribute("href"), 
        cb.checkOn = !!a.value, cb.optSelected = e.selected, cb.enctype = !!ob.createElement("form").enctype, 
        c.disabled = !0, cb.optDisabled = !e.disabled, a = ob.createElement("input"), a.setAttribute("value", ""), 
        cb.input = "" === a.getAttribute("value"), a.value = "t", a.setAttribute("type", "radio"), 
        cb.radioValue = "t" === a.value;
    }();
    var uc = /\r/g;
    eb.fn.extend({
        val: function(a) {
            var b, c, d, e = this[0];
            return arguments.length ? (d = eb.isFunction(a), this.each(function(c) {
                var e;
                1 === this.nodeType && (e = d ? a.call(this, c, eb(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : eb.isArray(e) && (e = eb.map(e, function(a) {
                    return null == a ? "" : a + "";
                })), b = eb.valHooks[this.type] || eb.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e));
            })) : e ? (b = eb.valHooks[e.type] || eb.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, 
            "string" == typeof c ? c.replace(uc, "") : null == c ? "" : c)) : void 0;
        }
    }), eb.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = eb.find.attr(a, "value");
                    return null != b ? b : eb.trim(eb.text(a));
                }
            },
            select: {
                get: function(a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++) if (c = d[i], 
                    !(!c.selected && i !== e || (cb.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && eb.nodeName(c.parentNode, "optgroup"))) {
                        if (b = eb(c).val(), f) return b;
                        g.push(b);
                    }
                    return g;
                },
                set: function(a, b) {
                    for (var c, d, e = a.options, f = eb.makeArray(b), g = e.length; g--; ) if (d = e[g], 
                    eb.inArray(eb.valHooks.option.get(d), f) >= 0) try {
                        d.selected = c = !0;
                    } catch (h) {
                        d.scrollHeight;
                    } else d.selected = !1;
                    return c || (a.selectedIndex = -1), e;
                }
            }
        }
    }), eb.each([ "radio", "checkbox" ], function() {
        eb.valHooks[this] = {
            set: function(a, b) {
                return eb.isArray(b) ? a.checked = eb.inArray(eb(a).val(), b) >= 0 : void 0;
            }
        }, cb.checkOn || (eb.valHooks[this].get = function(a) {
            return null === a.getAttribute("value") ? "on" : a.value;
        });
    });
    var vc, wc, xc = eb.expr.attrHandle, yc = /^(?:checked|selected)$/i, zc = cb.getSetAttribute, Ac = cb.input;
    eb.fn.extend({
        attr: function(a, b) {
            return Db(this, eb.attr, a, b, arguments.length > 1);
        },
        removeAttr: function(a) {
            return this.each(function() {
                eb.removeAttr(this, a);
            });
        }
    }), eb.extend({
        attr: function(a, b, c) {
            var d, e, f = a.nodeType;
            return a && 3 !== f && 8 !== f && 2 !== f ? typeof a.getAttribute === xb ? eb.prop(a, b, c) : (1 === f && eb.isXMLDoc(a) || (b = b.toLowerCase(), 
            d = eb.attrHooks[b] || (eb.expr.match.bool.test(b) ? wc : vc)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = eb.find.attr(a, b), 
            null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), 
            c) : void eb.removeAttr(a, b)) : void 0;
        },
        removeAttr: function(a, b) {
            var c, d, e = 0, f = b && b.match(tb);
            if (f && 1 === a.nodeType) for (;c = f[e++]; ) d = eb.propFix[c] || c, eb.expr.match.bool.test(c) ? Ac && zc || !yc.test(c) ? a[d] = !1 : a[eb.camelCase("default-" + c)] = a[d] = !1 : eb.attr(a, c, ""), 
            a.removeAttribute(zc ? c : d);
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!cb.radioValue && "radio" === b && eb.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b;
                    }
                }
            }
        }
    }), wc = {
        set: function(a, b, c) {
            return b === !1 ? eb.removeAttr(a, c) : Ac && zc || !yc.test(c) ? a.setAttribute(!zc && eb.propFix[c] || c, c) : a[eb.camelCase("default-" + c)] = a[c] = !0, 
            c;
        }
    }, eb.each(eb.expr.match.bool.source.match(/\w+/g), function(a, b) {
        var c = xc[b] || eb.find.attr;
        xc[b] = Ac && zc || !yc.test(b) ? function(a, b, d) {
            var e, f;
            return d || (f = xc[b], xc[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, 
            xc[b] = f), e;
        } : function(a, b, c) {
            return c ? void 0 : a[eb.camelCase("default-" + b)] ? b.toLowerCase() : null;
        };
    }), Ac && zc || (eb.attrHooks.value = {
        set: function(a, b, c) {
            return eb.nodeName(a, "input") ? void (a.defaultValue = b) : vc && vc.set(a, b, c);
        }
    }), zc || (vc = {
        set: function(a, b, c) {
            var d = a.getAttributeNode(c);
            return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", 
            "value" === c || b === a.getAttribute(c) ? b : void 0;
        }
    }, xc.id = xc.name = xc.coords = function(a, b, c) {
        var d;
        return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null;
    }, eb.valHooks.button = {
        get: function(a, b) {
            var c = a.getAttributeNode(b);
            return c && c.specified ? c.value : void 0;
        },
        set: vc.set
    }, eb.attrHooks.contenteditable = {
        set: function(a, b, c) {
            vc.set(a, "" === b ? !1 : b, c);
        }
    }, eb.each([ "width", "height" ], function(a, b) {
        eb.attrHooks[b] = {
            set: function(a, c) {
                return "" === c ? (a.setAttribute(b, "auto"), c) : void 0;
            }
        };
    })), cb.style || (eb.attrHooks.style = {
        get: function(a) {
            return a.style.cssText || void 0;
        },
        set: function(a, b) {
            return a.style.cssText = b + "";
        }
    });
    var Bc = /^(?:input|select|textarea|button|object)$/i, Cc = /^(?:a|area)$/i;
    eb.fn.extend({
        prop: function(a, b) {
            return Db(this, eb.prop, a, b, arguments.length > 1);
        },
        removeProp: function(a) {
            return a = eb.propFix[a] || a, this.each(function() {
                try {
                    this[a] = void 0, delete this[a];
                } catch (b) {}
            });
        }
    }), eb.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(a, b, c) {
            var d, e, f, g = a.nodeType;
            return a && 3 !== g && 8 !== g && 2 !== g ? (f = 1 !== g || !eb.isXMLDoc(a), f && (b = eb.propFix[b] || b, 
            e = eb.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]) : void 0;
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var b = eb.find.attr(a, "tabindex");
                    return b ? parseInt(b, 10) : Bc.test(a.nodeName) || Cc.test(a.nodeName) && a.href ? 0 : -1;
                }
            }
        }
    }), cb.hrefNormalized || eb.each([ "href", "src" ], function(a, b) {
        eb.propHooks[b] = {
            get: function(a) {
                return a.getAttribute(b, 4);
            }
        };
    }), cb.optSelected || (eb.propHooks.selected = {
        get: function(a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null;
        }
    }), eb.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        eb.propFix[this.toLowerCase()] = this;
    }), cb.enctype || (eb.propFix.enctype = "encoding");
    var Dc = /[\t\r\n\f]/g;
    eb.fn.extend({
        addClass: function(a) {
            var b, c, d, e, f, g, h = 0, i = this.length, j = "string" == typeof a && a;
            if (eb.isFunction(a)) return this.each(function(b) {
                eb(this).addClass(a.call(this, b, this.className));
            });
            if (j) for (b = (a || "").match(tb) || []; i > h; h++) if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Dc, " ") : " ")) {
                for (f = 0; e = b[f++]; ) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                g = eb.trim(d), c.className !== g && (c.className = g);
            }
            return this;
        },
        removeClass: function(a) {
            var b, c, d, e, f, g, h = 0, i = this.length, j = 0 === arguments.length || "string" == typeof a && a;
            if (eb.isFunction(a)) return this.each(function(b) {
                eb(this).removeClass(a.call(this, b, this.className));
            });
            if (j) for (b = (a || "").match(tb) || []; i > h; h++) if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Dc, " ") : "")) {
                for (f = 0; e = b[f++]; ) for (;d.indexOf(" " + e + " ") >= 0; ) d = d.replace(" " + e + " ", " ");
                g = a ? eb.trim(d) : "", c.className !== g && (c.className = g);
            }
            return this;
        },
        toggleClass: function(a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(eb.isFunction(a) ? function(c) {
                eb(this).toggleClass(a.call(this, c, this.className, b), b);
            } : function() {
                if ("string" === c) for (var b, d = 0, e = eb(this), f = a.match(tb) || []; b = f[d++]; ) e.hasClass(b) ? e.removeClass(b) : e.addClass(b); else (c === xb || "boolean" === c) && (this.className && eb._data(this, "__className__", this.className), 
                this.className = this.className || a === !1 ? "" : eb._data(this, "__className__") || "");
            });
        },
        hasClass: function(a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++) if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(Dc, " ").indexOf(b) >= 0) return !0;
            return !1;
        }
    }), eb.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        eb.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
        };
    }), eb.fn.extend({
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
    var Ec = eb.now(), Fc = /\?/, Gc = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    eb.parseJSON = function(b) {
        if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
        var c, d = null, e = eb.trim(b + "");
        return e && !eb.trim(e.replace(Gc, function(a, b, e, f) {
            return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "");
        })) ? Function("return " + e)() : eb.error("Invalid JSON: " + b);
    }, eb.parseXML = function(b) {
        var c, d;
        if (!b || "string" != typeof b) return null;
        try {
            a.DOMParser ? (d = new DOMParser(), c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), 
            c.async = "false", c.loadXML(b));
        } catch (e) {
            c = void 0;
        }
        return c && c.documentElement && !c.getElementsByTagName("parsererror").length || eb.error("Invalid XML: " + b), 
        c;
    };
    var Hc, Ic, Jc = /#.*$/, Kc = /([?&])_=[^&]*/, Lc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Mc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Nc = /^(?:GET|HEAD)$/, Oc = /^\/\//, Pc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Qc = {}, Rc = {}, Sc = "*/".concat("*");
    try {
        Ic = location.href;
    } catch (Tc) {
        Ic = ob.createElement("a"), Ic.href = "", Ic = Ic.href;
    }
    Hc = Pc.exec(Ic.toLowerCase()) || [], eb.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ic,
            type: "GET",
            isLocal: Mc.test(Hc[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Sc,
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
                "text json": eb.parseJSON,
                "text xml": eb.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? P(P(a, eb.ajaxSettings), b) : P(eb.ajaxSettings, a);
        },
        ajaxPrefilter: N(Qc),
        ajaxTransport: N(Rc),
        ajax: function(a, b) {
            function c(a, b, c, d) {
                var e, k, r, s, u, w = b;
                2 !== t && (t = 2, h && clearTimeout(h), j = void 0, g = d || "", v.readyState = a > 0 ? 4 : 0, 
                e = a >= 200 && 300 > a || 304 === a, c && (s = Q(l, v, c)), s = R(l, s, v, e), 
                e ? (l.ifModified && (u = v.getResponseHeader("Last-Modified"), u && (eb.lastModified[f] = u), 
                u = v.getResponseHeader("etag"), u && (eb.etag[f] = u)), 204 === a || "HEAD" === l.type ? w = "nocontent" : 304 === a ? w = "notmodified" : (w = s.state, 
                k = s.data, r = s.error, e = !r)) : (r = w, (a || !w) && (w = "error", 0 > a && (a = 0))), 
                v.status = a, v.statusText = (b || w) + "", e ? o.resolveWith(m, [ k, w, v ]) : o.rejectWith(m, [ v, w, r ]), 
                v.statusCode(q), q = void 0, i && n.trigger(e ? "ajaxSuccess" : "ajaxError", [ v, l, e ? k : r ]), 
                p.fireWith(m, [ v, w ]), i && (n.trigger("ajaxComplete", [ v, l ]), --eb.active || eb.event.trigger("ajaxStop")));
            }
            "object" == typeof a && (b = a, a = void 0), b = b || {};
            var d, e, f, g, h, i, j, k, l = eb.ajaxSetup({}, b), m = l.context || l, n = l.context && (m.nodeType || m.jquery) ? eb(m) : eb.event, o = eb.Deferred(), p = eb.Callbacks("once memory"), q = l.statusCode || {}, r = {}, s = {}, t = 0, u = "canceled", v = {
                readyState: 0,
                getResponseHeader: function(a) {
                    var b;
                    if (2 === t) {
                        if (!k) for (k = {}; b = Lc.exec(g); ) k[b[1].toLowerCase()] = b[2];
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
            if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, l.url = ((a || l.url || Ic) + "").replace(Jc, "").replace(Oc, Hc[1] + "//"), 
            l.type = b.method || b.type || l.method || l.type, l.dataTypes = eb.trim(l.dataType || "*").toLowerCase().match(tb) || [ "" ], 
            null == l.crossDomain && (d = Pc.exec(l.url.toLowerCase()), l.crossDomain = !(!d || d[1] === Hc[1] && d[2] === Hc[2] && (d[3] || ("http:" === d[1] ? "80" : "443")) === (Hc[3] || ("http:" === Hc[1] ? "80" : "443")))), 
            l.data && l.processData && "string" != typeof l.data && (l.data = eb.param(l.data, l.traditional)), 
            O(Qc, l, b, v), 2 === t) return v;
            i = eb.event && l.global, i && 0 === eb.active++ && eb.event.trigger("ajaxStart"), 
            l.type = l.type.toUpperCase(), l.hasContent = !Nc.test(l.type), f = l.url, l.hasContent || (l.data && (f = l.url += (Fc.test(f) ? "&" : "?") + l.data, 
            delete l.data), l.cache === !1 && (l.url = Kc.test(f) ? f.replace(Kc, "$1_=" + Ec++) : f + (Fc.test(f) ? "&" : "?") + "_=" + Ec++)), 
            l.ifModified && (eb.lastModified[f] && v.setRequestHeader("If-Modified-Since", eb.lastModified[f]), 
            eb.etag[f] && v.setRequestHeader("If-None-Match", eb.etag[f])), (l.data && l.hasContent && l.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", l.contentType), 
            v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + Sc + "; q=0.01" : "") : l.accepts["*"]);
            for (e in l.headers) v.setRequestHeader(e, l.headers[e]);
            if (l.beforeSend && (l.beforeSend.call(m, v, l) === !1 || 2 === t)) return v.abort();
            u = "abort";
            for (e in {
                success: 1,
                error: 1,
                complete: 1
            }) v[e](l[e]);
            if (j = O(Rc, l, b, v)) {
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
            return eb.get(a, b, c, "json");
        },
        getScript: function(a, b) {
            return eb.get(a, void 0, b, "script");
        }
    }), eb.each([ "get", "post" ], function(a, b) {
        eb[b] = function(a, c, d, e) {
            return eb.isFunction(c) && (e = e || d, d = c, c = void 0), eb.ajax({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            });
        };
    }), eb._evalUrl = function(a) {
        return eb.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        });
    }, eb.fn.extend({
        wrapAll: function(a) {
            if (eb.isFunction(a)) return this.each(function(b) {
                eb(this).wrapAll(a.call(this, b));
            });
            if (this[0]) {
                var b = eb(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType; ) a = a.firstChild;
                    return a;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(a) {
            return this.each(eb.isFunction(a) ? function(b) {
                eb(this).wrapInner(a.call(this, b));
            } : function() {
                var b = eb(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a);
            });
        },
        wrap: function(a) {
            var b = eb.isFunction(a);
            return this.each(function(c) {
                eb(this).wrapAll(b ? a.call(this, c) : a);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                eb.nodeName(this, "body") || eb(this).replaceWith(this.childNodes);
            }).end();
        }
    }), eb.expr.filters.hidden = function(a) {
        return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !cb.reliableHiddenOffsets() && "none" === (a.style && a.style.display || eb.css(a, "display"));
    }, eb.expr.filters.visible = function(a) {
        return !eb.expr.filters.hidden(a);
    };
    var Uc = /%20/g, Vc = /\[\]$/, Wc = /\r?\n/g, Xc = /^(?:submit|button|image|reset|file)$/i, Yc = /^(?:input|select|textarea|keygen)/i;
    eb.param = function(a, b) {
        var c, d = [], e = function(a, b) {
            b = eb.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
        };
        if (void 0 === b && (b = eb.ajaxSettings && eb.ajaxSettings.traditional), eb.isArray(a) || a.jquery && !eb.isPlainObject(a)) eb.each(a, function() {
            e(this.name, this.value);
        }); else for (c in a) S(c, a[c], b, e);
        return d.join("&").replace(Uc, "+");
    }, eb.fn.extend({
        serialize: function() {
            return eb.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var a = eb.prop(this, "elements");
                return a ? eb.makeArray(a) : this;
            }).filter(function() {
                var a = this.type;
                return this.name && !eb(this).is(":disabled") && Yc.test(this.nodeName) && !Xc.test(a) && (this.checked || !Eb.test(a));
            }).map(function(a, b) {
                var c = eb(this).val();
                return null == c ? null : eb.isArray(c) ? eb.map(c, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(Wc, "\r\n")
                    };
                }) : {
                    name: b.name,
                    value: c.replace(Wc, "\r\n")
                };
            }).get();
        }
    }), eb.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && T() || U();
    } : T;
    var Zc = 0, $c = {}, _c = eb.ajaxSettings.xhr();
    a.attachEvent && a.attachEvent("onunload", function() {
        for (var a in $c) $c[a](void 0, !0);
    }), cb.cors = !!_c && "withCredentials" in _c, _c = cb.ajax = !!_c, _c && eb.ajaxTransport(function(a) {
        if (!a.crossDomain || cb.cors) {
            var b;
            return {
                send: function(c, d) {
                    var e, f = a.xhr(), g = ++Zc;
                    if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields) for (e in a.xhrFields) f[e] = a.xhrFields[e];
                    a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                    for (e in c) void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
                    f.send(a.hasContent && a.data || null), b = function(c, e) {
                        var h, i, j;
                        if (b && (e || 4 === f.readyState)) if (delete $c[g], b = void 0, f.onreadystatechange = eb.noop, 
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
                    }, a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = $c[g] = b : b();
                },
                abort: function() {
                    b && b(void 0, !0);
                }
            };
        }
    }), eb.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {
                return eb.globalEval(a), a;
            }
        }
    }), eb.ajaxPrefilter("script", function(a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1);
    }), eb.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c = ob.head || eb("head")[0] || ob.documentElement;
            return {
                send: function(d, e) {
                    b = ob.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), 
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
    var ad = [], bd = /(=)\?(?=&|$)|\?\?/;
    eb.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = ad.pop() || eb.expando + "_" + Ec++;
            return this[a] = !0, a;
        }
    }), eb.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (bd.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && bd.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = eb.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, 
        h ? b[h] = b[h].replace(bd, "$1" + e) : b.jsonp !== !1 && (b.url += (Fc.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), 
        b.converters["script json"] = function() {
            return g || eb.error(e + " was not called"), g[0];
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
            g = arguments;
        }, d.always(function() {
            a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, ad.push(e)), g && eb.isFunction(f) && f(g[0]), 
            g = f = void 0;
        }), "script") : void 0;
    }), eb.parseHTML = function(a, b, c) {
        if (!a || "string" != typeof a) return null;
        "boolean" == typeof b && (c = b, b = !1), b = b || ob;
        var d = lb.exec(a), e = !c && [];
        return d ? [ b.createElement(d[1]) ] : (d = eb.buildFragment([ a ], b, e), e && e.length && eb(e).remove(), 
        eb.merge([], d.childNodes));
    };
    var cd = eb.fn.load;
    eb.fn.load = function(a, b, c) {
        if ("string" != typeof a && cd) return cd.apply(this, arguments);
        var d, e, f, g = this, h = a.indexOf(" ");
        return h >= 0 && (d = eb.trim(a.slice(h, a.length)), a = a.slice(0, h)), eb.isFunction(b) ? (c = b, 
        b = void 0) : b && "object" == typeof b && (f = "POST"), g.length > 0 && eb.ajax({
            url: a,
            type: f,
            dataType: "html",
            data: b
        }).done(function(a) {
            e = arguments, g.html(d ? eb("<div>").append(eb.parseHTML(a)).find(d) : a);
        }).complete(c && function(a, b) {
            g.each(c, e || [ a.responseText, b, a ]);
        }), this;
    }, eb.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(a, b) {
        eb.fn[b] = function(a) {
            return this.on(b, a);
        };
    }), eb.expr.filters.animated = function(a) {
        return eb.grep(eb.timers, function(b) {
            return a === b.elem;
        }).length;
    };
    var dd = a.document.documentElement;
    eb.offset = {
        setOffset: function(a, b, c) {
            var d, e, f, g, h, i, j, k = eb.css(a, "position"), l = eb(a), m = {};
            "static" === k && (a.style.position = "relative"), h = l.offset(), f = eb.css(a, "top"), 
            i = eb.css(a, "left"), j = ("absolute" === k || "fixed" === k) && eb.inArray("auto", [ f, i ]) > -1, 
            j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), 
            eb.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), 
            null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m);
        }
    }, eb.fn.extend({
        offset: function(a) {
            if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                eb.offset.setOffset(this, a, b);
            });
            var b, c, d = {
                top: 0,
                left: 0
            }, e = this[0], f = e && e.ownerDocument;
            return f ? (b = f.documentElement, eb.contains(b, e) ? (typeof e.getBoundingClientRect !== xb && (d = e.getBoundingClientRect()), 
            c = V(f), {
                top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
            }) : d) : void 0;
        },
        position: function() {
            if (this[0]) {
                var a, b, c = {
                    top: 0,
                    left: 0
                }, d = this[0];
                return "fixed" === eb.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), 
                b = this.offset(), eb.nodeName(a[0], "html") || (c = a.offset()), c.top += eb.css(a[0], "borderTopWidth", !0), 
                c.left += eb.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - c.top - eb.css(d, "marginTop", !0),
                    left: b.left - c.left - eb.css(d, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || dd; a && !eb.nodeName(a, "html") && "static" === eb.css(a, "position"); ) a = a.offsetParent;
                return a || dd;
            });
        }
    }), eb.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, b) {
        var c = /Y/.test(b);
        eb.fn[a] = function(d) {
            return Db(this, function(a, d, e) {
                var f = V(a);
                return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void (f ? f.scrollTo(c ? eb(f).scrollLeft() : e, c ? e : eb(f).scrollTop()) : a[d] = e);
            }, a, d, arguments.length, null);
        };
    }), eb.each([ "top", "left" ], function(a, b) {
        eb.cssHooks[b] = A(cb.pixelPosition, function(a, c) {
            return c ? (c = bc(a, b), dc.test(c) ? eb(a).position()[b] + "px" : c) : void 0;
        });
    }), eb.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        eb.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(c, d) {
            eb.fn[d] = function(d, e) {
                var f = arguments.length && (c || "boolean" != typeof d), g = c || (d === !0 || e === !0 ? "margin" : "border");
                return Db(this, function(b, c, d) {
                    var e;
                    return eb.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, 
                    Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? eb.css(b, c, g) : eb.style(b, c, d, g);
                }, b, f ? d : void 0, f, null);
            };
        });
    }), eb.fn.size = function() {
        return this.length;
    }, eb.fn.andSelf = eb.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return eb;
    });
    var ed = a.jQuery, fd = a.$;
    return eb.noConflict = function(b) {
        return a.$ === eb && (a.$ = fd), b && a.jQuery === eb && (a.jQuery = ed), eb;
    }, typeof b === xb && (a.jQuery = a.$ = eb), eb;
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
            for (var d = 0, e = c.length; e > d; d++) E[c[d]] = c[d] in u;
            return E.list && (E.list = !!b.createElement("datalist") && !!a.HTMLDataListElement), 
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
    var l, m, n = "2.7.1", o = {}, p = !0, q = b.documentElement, r = "modernizr", s = b.createElement(r), t = s.style, u = b.createElement("input"), v = ":)", w = {}.toString, x = " -webkit- -moz- -o- -ms- ".split(" "), y = "Webkit Moz O ms", z = y.split(" "), A = y.toLowerCase().split(" "), B = {
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
    }, I = function() {
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
    }(), J = {}.hasOwnProperty;
    m = f(J, "undefined") || f(J.call, "undefined") ? function(a, b) {
        return b in a && f(a.constructor.prototype[b], "undefined");
    } : function(a, b) {
        return J.call(a, b);
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
        return !!a.getContext && !!a.getContext("2d");
    }, C.canvastext = function() {
        return !!o.canvas && !!f(b.createElement("canvas").getContext("2d").fillText, "function");
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
        return I("hashchange", a) && (b.documentMode === c || b.documentMode > 7);
    }, C.history = function() {
        return !!a.history && !!history.pushState;
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
        return a && "webkitPerspective" in q.style && H("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(b) {
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
    for (var K in C) m(C, K) && (l = K.toLowerCase(), o[l] = C[K](), F.push((o[l] ? "" : "no-") + l));
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
            return s.shivCSS && !j && !d.hasCSS && (d.hasCSS = !!c(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), 
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
    o.hasEvent = I, o.testProp = function(a) {
        return h([ a ]);
    }, o.testAllProps = j, o.testStyles = H, q.className = q.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (p ? " js " + F.join(" ") : ""), 
    o;
}(this, this.document), function(a, b, c) {
    function d(a) {
        return "[object Function]" == q.call(a);
    }
    function e(a) {
        return "string" == typeof a;
    }
    function f() {}
    function g(a) {
        return !a || "loaded" == a || "complete" == a || "uninitialized" == a;
    }
    function h() {
        var a = r.shift();
        s = 1, a ? a.t ? o(function() {
            ("c" == a.t ? m.injectCss : m.injectJs)(a.s, 0, a.a, a.x, a.e, 1);
        }, 0) : (a(), h()) : s = 0;
    }
    function i(a, c, d, e, f, i, j) {
        function k(b) {
            if (!n && g(l.readyState) && (t.r = n = 1, !s && h(), l.onload = l.onreadystatechange = null, 
            b)) {
                "img" != a && o(function() {
                    v.removeChild(l);
                }, 50);
                for (var d in A[c]) A[c].hasOwnProperty(d) && A[c][d].onload();
            }
        }
        var j = j || m.errorTimeout, l = b.createElement(a), n = 0, q = 0, t = {
            t: d,
            s: c,
            e: f,
            a: i,
            x: j
        };
        1 === A[c] && (q = 1, A[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), 
        l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
            k.call(this, q);
        }, r.splice(e, 0, t), "img" != a && (q || 2 === A[c] ? (v.insertBefore(l, u ? null : p), 
        o(k, j)) : A[c].push(l));
    }
    function j(a, b, c, d, f) {
        return s = 0, b = b || "j", e(a) ? i("c" == b ? x : w, a, b, this.i++, c, d, f) : (r.splice(this.i++, 0, a), 
        1 == r.length && h()), this;
    }
    function k() {
        var a = m;
        return a.loader = {
            load: j,
            i: 0
        }, a;
    }
    var l, m, n = b.documentElement, o = a.setTimeout, p = b.getElementsByTagName("script")[0], q = {}.toString, r = [], s = 0, t = "MozAppearance" in n.style, u = t && !!b.createRange().compareNode, v = u ? n : p.parentNode, n = a.opera && "[object Opera]" == q.call(a.opera), n = !!b.attachEvent && !n, w = t ? "object" : n ? "script" : "img", x = n ? "script" : w, y = Array.isArray || function(a) {
        return "[object Array]" == q.call(a);
    }, z = [], A = {}, B = {
        timeout: function(a, b) {
            return b.length && (a.timeout = b[0]), a;
        }
    };
    m = function(a) {
        function b(a) {
            var b, c, d, a = a.split("!"), e = z.length, f = a.pop(), g = a.length, f = {
                url: f,
                origUrl: f,
                prefixes: a
            };
            for (c = 0; g > c; c++) d = a[c].split("="), (b = B[d.shift()]) && (f = b(f, d));
            for (c = 0; e > c; c++) f = z[c](f);
            return f;
        }
        function g(a, e, f, g, h) {
            var i = b(a), j = i.autoCallback;
            i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), 
            i.instead ? i.instead(a, e, f, g, h) : (A[i.url] ? i.noexec = !0 : A[i.url] = 1, 
            f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), 
            (d(e) || d(j)) && f.load(function() {
                k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), A[i.url] = 2;
            })));
        }
        function h(a, b) {
            function c(a, c) {
                if (a) {
                    if (e(a)) c || (l = function() {
                        var a = [].slice.call(arguments);
                        m.apply(this, a), n();
                    }), g(a, l, b, 0, j); else if (Object(a) === a) for (i in h = function() {
                        var b, c = 0;
                        for (b in a) a.hasOwnProperty(b) && c++;
                        return c;
                    }(), a) a.hasOwnProperty(i) && (!c && !--h && (d(l) ? l = function() {
                        var a = [].slice.call(arguments);
                        m.apply(this, a), n();
                    } : l[i] = function(a) {
                        return function() {
                            var b = [].slice.call(arguments);
                            a && a.apply(this, b), n();
                        };
                    }(m[i])), g(a[i], l, b, i, j));
                } else !c && n();
            }
            var h, i, j = !!a.test, k = a.load || a.both, l = a.callback || f, m = l, n = a.complete || f;
            c(j ? a.yep : a.nope, !!k), k && c(k);
        }
        var i, j, l = this.yepnope.loader;
        if (e(a)) g(a, 0, l, 0); else if (y(a)) for (i = 0; i < a.length; i++) j = a[i], 
        e(j) ? g(j, 0, l, 0) : y(j) ? m(j) : Object(j) === j && h(j, l); else Object(a) === a && h(a, l);
    }, m.addPrefix = function(a, b) {
        B[a] = b;
    }, m.addFilter = function(a) {
        z.push(a);
    }, m.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", 
    b.addEventListener("DOMContentLoaded", l = function() {
        b.removeEventListener("DOMContentLoaded", l, 0), b.readyState = "complete";
    }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
        var k, l, n = b.createElement("script"), e = e || m.errorTimeout;
        n.src = a;
        for (l in d) n.setAttribute(l, d[l]);
        c = j ? h : c || f, n.onreadystatechange = n.onload = function() {
            !k && g(n.readyState) && (k = 1, c(), n.onload = n.onreadystatechange = null);
        }, o(function() {
            k || (k = 1, c(1));
        }, e), i ? n.onload() : p.parentNode.insertBefore(n, p);
    }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
        var j, e = b.createElement("link"), c = i ? h : c || f;
        e.href = a, e.rel = "stylesheet", e.type = "text/css";
        for (j in d) e.setAttribute(j, d[j]);
        g || (p.parentNode.insertBefore(e, p), o(c, 0));
    };
}(this, document), Modernizr.load = function() {
    yepnope.apply(window, [].slice.call(arguments, 0));
}, function(a, b) {
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
            c.startDate !== -1/0 && (c.startDate = c.startDate ? c.startDate instanceof Date ? this._local_to_utc(this._zero_time(c.startDate)) : p.parseDate(c.startDate, e, c.language) : -1/0), 
            1/0 !== c.endDate && (c.endDate = c.endDate ? c.endDate instanceof Date ? this._local_to_utc(this._zero_time(c.endDate)) : p.parseDate(c.endDate, e, c.language) : 1/0), 
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
            var d, e = new Date(this.viewDate), f = e.getUTCFullYear(), g = e.getUTCMonth(), h = this.o.startDate !== -1/0 ? this.o.startDate.getUTCFullYear() : -1/0, i = this.o.startDate !== -1/0 ? this.o.startDate.getUTCMonth() : -1/0, j = 1/0 !== this.o.endDate ? this.o.endDate.getUTCFullYear() : 1/0, k = 1/0 !== this.o.endDate ? this.o.endDate.getUTCMonth() : 1/0, l = o[this.o.language].today || o.en.today || "", m = o[this.o.language].clear || o.en.clear || "";
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
                    this.picker.find(".prev").css(this.o.startDate !== -1/0 && b <= this.o.startDate.getUTCFullYear() && c <= this.o.startDate.getUTCMonth() ? {
                        visibility: "hidden"
                    } : {
                        visibility: "visible"
                    }), this.picker.find(".next").css(1/0 !== this.o.endDate && b >= this.o.endDate.getUTCFullYear() && c >= this.o.endDate.getUTCMonth() ? {
                        visibility: "hidden"
                    } : {
                        visibility: "visible"
                    });
                    break;

                  case 1:
                  case 2:
                    this.picker.find(".prev").css(this.o.startDate !== -1/0 && b <= this.o.startDate.getUTCFullYear() ? {
                        visibility: "hidden"
                    } : {
                        visibility: "visible"
                    }), this.picker.find(".next").css(1/0 !== this.o.endDate && b >= this.o.endDate.getUTCFullYear() ? {
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
        endDate: 1/0,
        forceParse: !0,
        format: "mm/dd/yyyy",
        keyboardNavigation: !0,
        language: "en",
        minViewMode: 0,
        multidate: !1,
        multidateSeparator: ",",
        orientation: "auto",
        rtl: !1,
        startDate: -1/0,
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
module.exports.FastClick = FastClick) : window.FastClick = FastClick, !function(a, b) {
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
    var p, q, r = "3.7.2", s = a.html5 || {}, t = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, u = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, v = "_html5shiv", w = 0, x = {};
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
    y.type += " print", y.shivPrint = o, o(b);
}(this, document), jQuery.extend({
    highlight: function(a, b, c, d) {
        if (3 === a.nodeType) {
            var e = a.data.match(b);
            if (e) {
                var f = document.createElement(c || "span");
                f.className = d || "highlight";
                var g = a.splitText(e.index);
                g.splitText(e[0].length);
                var h = g.cloneNode(!0);
                return f.appendChild(h), g.parentNode.replaceChild(f, g), 1;
            }
        } else if (1 === a.nodeType && a.childNodes && !/(script|style)/i.test(a.tagName) && (a.tagName !== c.toUpperCase() || a.className !== d)) for (var i = 0; i < a.childNodes.length; i++) i += jQuery.highlight(a.childNodes[i], b, c, d);
        return 0;
    }
}), jQuery.fn.unhighlight = function(a) {
    var b = {
        className: "highlight",
        element: "span"
    };
    return jQuery.extend(b, a), this.find(b.element + "." + b.className).each(function() {
        var a = this.parentNode;
        a.replaceChild(this.firstChild, this), a.normalize();
    }).end();
}, jQuery.fn.highlight = function(a, b) {
    var c = {
        className: "highlight",
        element: "span",
        caseSensitive: !1,
        wordsOnly: !1
    };
    if (jQuery.extend(c, b), a.constructor === String && (a = [ a ]), a = jQuery.grep(a, function(a) {
        return "" != a;
    }), a = jQuery.map(a, function(a) {
        return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }), 0 == a.length) return this;
    var d = c.caseSensitive ? "" : "i", e = "(" + a.join("|") + ")";
    c.wordsOnly && (e = "\\b" + e + "\\b");
    var f = new RegExp(e, d);
    return this.each(function() {
        jQuery.highlight(this, f, c.element, c.className);
    });
}, function(a, b) {
    "function" == typeof define && define.amd ? define([ "jquery" ], b) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(a.jQuery);
}(this, function(a) {
    function b(a) {
        if (a in l.style) return a;
        for (var b = [ "Moz", "Webkit", "O", "ms" ], c = a.charAt(0).toUpperCase() + a.substr(1), d = 0; d < b.length; ++d) {
            var e = b[d] + c;
            if (e in l.style) return e;
        }
    }
    function c() {
        return l.style[m.transform] = "", l.style[m.transform] = "rotateY(90deg)", "" !== l.style[m.transform];
    }
    function d(a) {
        return "string" == typeof a && this.parse(a), this;
    }
    function e(a, b, c) {
        b === !0 ? a.queue(c) : b ? a.queue(b, c) : a.each(function() {
            c.call(this);
        });
    }
    function f(b) {
        var c = [];
        return a.each(b, function(b) {
            b = a.camelCase(b), b = a.transit.propertyMap[b] || a.cssProps[b] || b, b = i(b), 
            m[b] && (b = i(m[b])), -1 === a.inArray(b, c) && c.push(b);
        }), c;
    }
    function g(b, c, d, e) {
        var g = f(b);
        a.cssEase[d] && (d = a.cssEase[d]);
        var h = "" + k(c) + " " + d;
        parseInt(e, 10) > 0 && (h += " " + k(e));
        var i = [];
        return a.each(g, function(a, b) {
            i.push(b + " " + h);
        }), i.join(", ");
    }
    function h(b, c) {
        c || (a.cssNumber[b] = !0), a.transit.propertyMap[b] = m.transform, a.cssHooks[b] = {
            get: function(c) {
                var d = a(c).css("transit:transform");
                return d.get(b);
            },
            set: function(c, d) {
                var e = a(c).css("transit:transform");
                e.setFromString(b, d), a(c).css({
                    "transit:transform": e
                });
            }
        };
    }
    function i(a) {
        return a.replace(/([A-Z])/g, function(a) {
            return "-" + a.toLowerCase();
        });
    }
    function j(a, b) {
        return "string" != typeof a || a.match(/^[\-0-9\.]+$/) ? "" + a + b : a;
    }
    function k(b) {
        var c = b;
        return "string" != typeof c || c.match(/^[\-0-9\.]+/) || (c = a.fx.speeds[c] || a.fx.speeds._default), 
        j(c, "ms");
    }
    a.transit = {
        version: "0.9.12",
        propertyMap: {
            marginLeft: "margin",
            marginRight: "margin",
            marginBottom: "margin",
            marginTop: "margin",
            paddingLeft: "padding",
            paddingRight: "padding",
            paddingBottom: "padding",
            paddingTop: "padding"
        },
        enabled: !0,
        useTransitionEnd: !1
    };
    var l = document.createElement("div"), m = {}, n = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
    m.transition = b("transition"), m.transitionDelay = b("transitionDelay"), m.transform = b("transform"), 
    m.transformOrigin = b("transformOrigin"), m.filter = b("Filter"), m.transform3d = c();
    var o = {
        transition: "transitionend",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd",
        WebkitTransition: "webkitTransitionEnd",
        msTransition: "MSTransitionEnd"
    }, p = m.transitionEnd = o[m.transition] || null;
    for (var q in m) m.hasOwnProperty(q) && "undefined" == typeof a.support[q] && (a.support[q] = m[q]);
    return l = null, a.cssEase = {
        _default: "ease",
        "in": "ease-in",
        out: "ease-out",
        "in-out": "ease-in-out",
        snap: "cubic-bezier(0,1,.5,1)",
        easeInCubic: "cubic-bezier(.550,.055,.675,.190)",
        easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
        easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
        easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
        easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
        easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
        easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
        easeOutExpo: "cubic-bezier(.19,1,.22,1)",
        easeInOutExpo: "cubic-bezier(1,0,0,1)",
        easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
        easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
        easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
        easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
        easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
        easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
        easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
        easeOutQuint: "cubic-bezier(.23,1,.32,1)",
        easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
        easeInSine: "cubic-bezier(.47,0,.745,.715)",
        easeOutSine: "cubic-bezier(.39,.575,.565,1)",
        easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
        easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
        easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
        easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
    }, a.cssHooks["transit:transform"] = {
        get: function(b) {
            return a(b).data("transform") || new d();
        },
        set: function(b, c) {
            var e = c;
            e instanceof d || (e = new d(e)), b.style[m.transform] = "WebkitTransform" !== m.transform || n ? e.toString() : e.toString(!0), 
            a(b).data("transform", e);
        }
    }, a.cssHooks.transform = {
        set: a.cssHooks["transit:transform"].set
    }, a.cssHooks.filter = {
        get: function(a) {
            return a.style[m.filter];
        },
        set: function(a, b) {
            a.style[m.filter] = b;
        }
    }, a.fn.jquery < "1.8" && (a.cssHooks.transformOrigin = {
        get: function(a) {
            return a.style[m.transformOrigin];
        },
        set: function(a, b) {
            a.style[m.transformOrigin] = b;
        }
    }, a.cssHooks.transition = {
        get: function(a) {
            return a.style[m.transition];
        },
        set: function(a, b) {
            a.style[m.transition] = b;
        }
    }), h("scale"), h("scaleX"), h("scaleY"), h("translate"), h("rotate"), h("rotateX"), 
    h("rotateY"), h("rotate3d"), h("perspective"), h("skewX"), h("skewY"), h("x", !0), 
    h("y", !0), d.prototype = {
        setFromString: function(a, b) {
            var c = "string" == typeof b ? b.split(",") : b.constructor === Array ? b : [ b ];
            c.unshift(a), d.prototype.set.apply(this, c);
        },
        set: function(a) {
            var b = Array.prototype.slice.apply(arguments, [ 1 ]);
            this.setter[a] ? this.setter[a].apply(this, b) : this[a] = b.join(",");
        },
        get: function(a) {
            return this.getter[a] ? this.getter[a].apply(this) : this[a] || 0;
        },
        setter: {
            rotate: function(a) {
                this.rotate = j(a, "deg");
            },
            rotateX: function(a) {
                this.rotateX = j(a, "deg");
            },
            rotateY: function(a) {
                this.rotateY = j(a, "deg");
            },
            scale: function(a, b) {
                void 0 === b && (b = a), this.scale = a + "," + b;
            },
            skewX: function(a) {
                this.skewX = j(a, "deg");
            },
            skewY: function(a) {
                this.skewY = j(a, "deg");
            },
            perspective: function(a) {
                this.perspective = j(a, "px");
            },
            x: function(a) {
                this.set("translate", a, null);
            },
            y: function(a) {
                this.set("translate", null, a);
            },
            translate: function(a, b) {
                void 0 === this._translateX && (this._translateX = 0), void 0 === this._translateY && (this._translateY = 0), 
                null !== a && void 0 !== a && (this._translateX = j(a, "px")), null !== b && void 0 !== b && (this._translateY = j(b, "px")), 
                this.translate = this._translateX + "," + this._translateY;
            }
        },
        getter: {
            x: function() {
                return this._translateX || 0;
            },
            y: function() {
                return this._translateY || 0;
            },
            scale: function() {
                var a = (this.scale || "1,1").split(",");
                return a[0] && (a[0] = parseFloat(a[0])), a[1] && (a[1] = parseFloat(a[1])), a[0] === a[1] ? a[0] : a;
            },
            rotate3d: function() {
                for (var a = (this.rotate3d || "0,0,0,0deg").split(","), b = 0; 3 >= b; ++b) a[b] && (a[b] = parseFloat(a[b]));
                return a[3] && (a[3] = j(a[3], "deg")), a;
            }
        },
        parse: function(a) {
            var b = this;
            a.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(a, c, d) {
                b.setFromString(c, d);
            });
        },
        toString: function(a) {
            var b = [];
            for (var c in this) if (this.hasOwnProperty(c)) {
                if (!m.transform3d && ("rotateX" === c || "rotateY" === c || "perspective" === c || "transformOrigin" === c)) continue;
                "_" !== c[0] && b.push(a && "scale" === c ? c + "3d(" + this[c] + ",1)" : a && "translate" === c ? c + "3d(" + this[c] + ",0)" : c + "(" + this[c] + ")");
            }
            return b.join(" ");
        }
    }, a.fn.transition = a.fn.transit = function(b, c, d, f) {
        var h = this, i = 0, j = !0, l = a.extend(!0, {}, b);
        "function" == typeof c && (f = c, c = void 0), "object" == typeof c && (d = c.easing, 
        i = c.delay || 0, j = "undefined" == typeof c.queue ? !0 : c.queue, f = c.complete, 
        c = c.duration), "function" == typeof d && (f = d, d = void 0), "undefined" != typeof l.easing && (d = l.easing, 
        delete l.easing), "undefined" != typeof l.duration && (c = l.duration, delete l.duration), 
        "undefined" != typeof l.complete && (f = l.complete, delete l.complete), "undefined" != typeof l.queue && (j = l.queue, 
        delete l.queue), "undefined" != typeof l.delay && (i = l.delay, delete l.delay), 
        "undefined" == typeof c && (c = a.fx.speeds._default), "undefined" == typeof d && (d = a.cssEase._default), 
        c = k(c);
        var n = g(l, c, d, i), o = a.transit.enabled && m.transition, q = o ? parseInt(c, 10) + parseInt(i, 10) : 0;
        if (0 === q) {
            var r = function(a) {
                h.css(l), f && f.apply(h), a && a();
            };
            return e(h, j, r), h;
        }
        var s = {}, t = function(b) {
            var c = !1, d = function() {
                c && h.unbind(p, d), q > 0 && h.each(function() {
                    this.style[m.transition] = s[this] || null;
                }), "function" == typeof f && f.apply(h), "function" == typeof b && b();
            };
            q > 0 && p && a.transit.useTransitionEnd ? (c = !0, h.bind(p, d)) : window.setTimeout(d, q), 
            h.each(function() {
                q > 0 && (this.style[m.transition] = n), a(this).css(l);
            });
        }, u = function(a) {
            this.offsetWidth, t(a);
        };
        return e(h, j, u), this;
    }, a.transit.getTransitionValue = g, a;
}), function(a, b) {
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
            } else c = parseFloat(parseInt(j, 10) / g), 1/0 === c && (c = 0);
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
    function b(a, b, c) {
        return a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : void 0;
    }
    function c(a, b) {
        var c, d;
        for (c = 0, d = a.length; d > c; c++) if (a[c] === b) return !0;
        return !1;
    }
    function d(a, b) {
        var c;
        a.createTextRange ? (c = a.createTextRange(), c.move("character", b), c.select()) : a.selectionStart && (a.focus(), 
        a.setSelectionRange(b, b));
    }
    function e(a, b) {
        try {
            return a.type = b, !0;
        } catch (c) {
            return !1;
        }
    }
    a.Placeholders = {
        Utils: {
            addEventListener: b,
            inArray: c,
            moveCaret: d,
            changeType: e
        }
    };
}(this), function(a) {
    "use strict";
    function b() {}
    function c() {
        try {
            return document.activeElement;
        } catch (a) {}
    }
    function d(a, b) {
        var c, d, e = !!b && a.value !== b, f = a.value === a.getAttribute(H);
        return (e || f) && "true" === a.getAttribute(I) ? (a.removeAttribute(I), a.value = a.value.replace(a.getAttribute(H), ""), 
        a.className = a.className.replace(G, ""), d = a.getAttribute(O), parseInt(d, 10) >= 0 && (a.setAttribute("maxLength", d), 
        a.removeAttribute(O)), c = a.getAttribute(J), c && (a.type = c), !0) : !1;
    }
    function e(a) {
        var b, c, d = a.getAttribute(H);
        return "" === a.value && d ? (a.setAttribute(I, "true"), a.value = d, a.className += " " + F, 
        c = a.getAttribute(O), c || (a.setAttribute(O, a.maxLength), a.removeAttribute("maxLength")), 
        b = a.getAttribute(J), b ? a.type = "text" : "password" === a.type && T.changeType(a, "text") && a.setAttribute(J, "password"), 
        !0) : !1;
    }
    function f(a, b) {
        var c, d, e, f, g, h, i;
        if (a && a.getAttribute(H)) b(a); else for (e = a ? a.getElementsByTagName("input") : p, 
        f = a ? a.getElementsByTagName("textarea") : q, c = e ? e.length : 0, d = f ? f.length : 0, 
        i = 0, h = c + d; h > i; i++) g = c > i ? e[i] : f[i - c], b(g);
    }
    function g(a) {
        f(a, d);
    }
    function h(a) {
        f(a, e);
    }
    function i(a) {
        return function() {
            r && a.value === a.getAttribute(H) && "true" === a.getAttribute(I) ? T.moveCaret(a, 0) : d(a);
        };
    }
    function j(a) {
        return function() {
            e(a);
        };
    }
    function k(a) {
        return function(b) {
            return t = a.value, "true" === a.getAttribute(I) && t === a.getAttribute(H) && T.inArray(D, b.keyCode) ? (b.preventDefault && b.preventDefault(), 
            !1) : void 0;
        };
    }
    function l(a) {
        return function() {
            d(a, t), "" === a.value && (a.blur(), T.moveCaret(a, 0));
        };
    }
    function m(a) {
        return function() {
            a === c() && a.value === a.getAttribute(H) && "true" === a.getAttribute(I) && T.moveCaret(a, 0);
        };
    }
    function n(a) {
        return function() {
            g(a);
        };
    }
    function o(a) {
        a.form && (y = a.form, "string" == typeof y && (y = document.getElementById(y)), 
        y.getAttribute(K) || (T.addEventListener(y, "submit", n(y)), y.setAttribute(K, "true"))), 
        T.addEventListener(a, "focus", i(a)), T.addEventListener(a, "blur", j(a)), r && (T.addEventListener(a, "keydown", k(a)), 
        T.addEventListener(a, "keyup", l(a)), T.addEventListener(a, "click", m(a))), a.setAttribute(L, "true"), 
        a.setAttribute(H, w), (r || a !== c()) && e(a);
    }
    var p, q, r, s, t, u, v, w, x, y, z, A, B, C = [ "text", "search", "url", "tel", "email", "password", "number", "textarea" ], D = [ 27, 33, 34, 35, 36, 37, 38, 39, 40, 8, 46 ], E = "#ccc", F = "placeholdersjs", G = RegExp("(?:^|\\s)" + F + "(?!\\S)"), H = "data-placeholder-value", I = "data-placeholder-active", J = "data-placeholder-type", K = "data-placeholder-submit", L = "data-placeholder-bound", M = "data-placeholder-focus", N = "data-placeholder-live", O = "data-placeholder-maxlength", P = document.createElement("input"), Q = document.getElementsByTagName("head")[0], R = document.documentElement, S = a.Placeholders, T = S.Utils;
    if (S.nativeSupport = void 0 !== P.placeholder, !S.nativeSupport) {
        for (p = document.getElementsByTagName("input"), q = document.getElementsByTagName("textarea"), 
        r = "false" === R.getAttribute(M), s = "false" !== R.getAttribute(N), u = document.createElement("style"), 
        u.type = "text/css", v = document.createTextNode("." + F + " { color:" + E + "; }"), 
        u.styleSheet ? u.styleSheet.cssText = v.nodeValue : u.appendChild(v), Q.insertBefore(u, Q.firstChild), 
        B = 0, A = p.length + q.length; A > B; B++) z = p.length > B ? p[B] : q[B - p.length], 
        w = z.attributes.placeholder, w && (w = w.nodeValue, w && T.inArray(C, z.type) && o(z));
        x = setInterval(function() {
            for (B = 0, A = p.length + q.length; A > B; B++) z = p.length > B ? p[B] : q[B - p.length], 
            w = z.attributes.placeholder, w ? (w = w.nodeValue, w && T.inArray(C, z.type) && (z.getAttribute(L) || o(z), 
            (w !== z.getAttribute(H) || "password" === z.type && !z.getAttribute(J)) && ("password" === z.type && !z.getAttribute(J) && T.changeType(z, "text") && z.setAttribute(J, "password"), 
            z.value === z.getAttribute(H) && (z.value = w), z.setAttribute(H, w)))) : z.getAttribute(I) && (d(z), 
            z.removeAttribute(H));
            s || clearInterval(x);
        }, 100);
    }
    T.addEventListener(a, "beforeunload", function() {
        S.disable();
    }), S.disable = S.nativeSupport ? b : g, S.enable = S.nativeSupport ? b : h;
}(this);

var config = {
    application: {
        touch: Modernizr.touch,
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
        threshold: 0,
        trigger: $(".wrapper").width() / 6,
        animation: "slide"
    },
    twitter: {
        twitterID: "492660537293938688",
        domID: "widget-twitter",
        maxTweets: 5,
        enableLinks: !0,
        showUser: !0,
        showFollow: !1,
        showTime: !0,
        showRetweet: !1,
        showInteraction: !1
    }
}, cookieSystem;

window.console || (console = {
    log: function() {}
}), window.hasOwnProperty = window.hasOwnProperty || Object.prototype.hasOwnProperty, 
Array.prototype.indexOf || (Array.prototype.indexOf = function(a) {
    "use strict";
    if (null == this) throw new TypeError();
    var b = Object(this), c = b.length >>> 0;
    if (0 === c) return -1;
    var d = 0;
    if (arguments.length > 1 && (d = Number(arguments[1]), d != d ? d = 0 : 0 != d && 1/0 != d && d != -1/0 && (d = (d > 0 || -1) * Math.floor(Math.abs(d)))), 
    d >= c) return -1;
    for (var e = d >= 0 ? d : Math.max(c - Math.abs(d), 0); c > e; e++) if (e in b && b[e] === a) return e;
    return -1;
}), Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}, NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for (var a = 0, b = this.length; b > a; a++) this[a] && this[a].parentElement && this[a].parentElement.removeChild(this[a]);
};

var returnedData, dataObject, anchorClicked, isWideScreen, pageTop, pageBottom;

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
    }), $("form").on("submit", function() {
        return config.application.debug ? (console.log("Intentional: Form submit blocked."), 
        !1) : void 0;
    });
});

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
    } ]
}, _requestAnimationFrame = function(a, b) {
    return a["webkitR" + b] || a["r" + b] || a["mozR" + b] || a["msR" + b] || function(a) {
        setTimeout(a, 60);
    };
}(window, "requestAnimationFrame"), easing = {
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

var twitterFetcher = function() {
    function a(a) {
        return a.replace(/<b[^>]*>(.*?)<\/b>/gi, function(a, b) {
            return b;
        }).replace(/class=".*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi, "");
    }
    function b(a, b) {
        for (var c = [], d = new RegExp("(^| )" + b + "( |$)"), e = a.getElementsByTagName("*"), f = 0, g = e.length; g > f; f++) d.test(e[f].className) && c.push(e[f]);
        return c;
    }
    var c = "", d = 20, e = !0, f = [], g = !1, h = !0, i = !0, j = null, k = !0, l = !0, m = null, n = !0;
    return {
        fetch: function(a) {
            if (void 0 === a.maxTweets && (a.maxTweets = 20), void 0 === a.enableLinks && (a.enableLinks = !0), 
            void 0 === a.showUser && (a.showUser = !0), void 0 === a.showFollow && (a.showFollow = !0), 
            void 0 === a.showTime && (a.showTime = !0), void 0 === a.dateFunction && (a.dateFunction = "default"), 
            void 0 === a.showRetweet && (a.showRetweet = !0), void 0 === a.customCallback && (a.customCallback = null), 
            void 0 === a.showInteraction && (a.showInteraction = !0), g) f.push(a); else {
                g = !0, c = a.domID, d = a.maxTweets, e = a.enableLinks, h = a.showUser, i = a.showTime, 
                l = a.showRetweet, j = a.dateFunction, m = a.customCallback, n = a.showInteraction;
                var b = document.createElement("script");
                b.type = "text/javascript", b.src = "//cdn.syndication.twimg.com/widgets/timelines/" + a.twitterID + "?&lang=en&callback=twitterFetcher.callback&suppress_response_codes=true&rnd=" + Math.random(), 
                document.getElementsByTagName("head")[0].appendChild(b);
            }
        },
        handler: function(a) {
            function b(a, b, c, d) {
                var e = screen.width / 2 - c / 2, f = screen.height / 2 - d / 2;
                return window.open(a, b, "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + c + ", height=" + d + ", top=" + f + ", left=" + e);
            }
            var c = a.length, d = 0, e = document.getElementById(config.twitter.domID), f = '<div class="twitter-user"></div>';
            for (f += '<div class="content feed">'; c > d; ) f += "<hr>", f += '<div class="tweet-item">' + a[d] + "</div>", 
            d++;
            if (f += "</div>", f += '<div class="button input-medium center twitter-follow">Follow Us</div>', 
            e.innerHTML = f, config.twitter.showRetweet) {
                document.getElementById(config.twitter.domID).className = config.twitter.domID + " framed multi";
                for (var g = 0; g < document.querySelectorAll(".user").length; g++) {
                    var h = document.querySelectorAll(".user")[g];
                    h.getElementsByTagName("a")[0].setAttribute("target", "_blank"), h.getElementsByTagName("a")[0].className = "no-icon valign-middle";
                }
            } else {
                document.getElementById(config.twitter.domID).className = config.twitter.domID + " framed twitter-main";
                var h = document.createElement("h4");
                h.className = "user", h.innerHTML = document.querySelectorAll(".user")[0].innerHTML, 
                h.getElementsByTagName("img")[0].className = "box-logo", h.getElementsByTagName("span")[0].remove(), 
                h.getElementsByTagName("span")[0].className = "handle", h.getElementsByTagName("a")[0].setAttribute("target", "_blank"), 
                h.getElementsByTagName("a")[0].className = "no-icon valign-middle", document.querySelector(".twitter-user").appendChild(h);
            }
            config.twitter.showFollow ? $("#" + config.twitter.domID).find(".twitter-follow").show() : $("#" + config.twitter.domID).find(".twitter-follow").hide(), 
            document.getElementById(config.twitter.domID).querySelector(".button").onclick = function() {
                return b("https://twitter.com/intent/user?screen_name=" + h.getElementsByTagName("span")[0].innerHTML.substr(1), "Twitter Follow", 640, 600), 
                !1;
            };
        },
        callback: function(c) {
            var m = document.createElement("div");
            m.innerHTML = c.body, "undefined" == typeof m.getElementsByClassName && (k = !1);
            var o = [], p = [], q = [], r = [], s = [], t = 0;
            if (k) for (var u = m.getElementsByClassName("tweet"); t < u.length; ) r.push(u[t].getElementsByClassName("retweet-credit").length > 0 ? !0 : !1), 
            (!r[t] || r[t] && l) && (o.push(u[t].getElementsByClassName("e-entry-title")[0]), 
            s.push(u[t].getAttribute("data-tweet-id")), p.push(u[t].getElementsByClassName("p-author")[0]), 
            q.push(u[t].getElementsByClassName("dt-updated")[0])), t++; else for (var u = b(m, "tweet"); t < u.length; ) o.push(b(u[t], "e-entry-title")[0]), 
            s.push(u[t].getAttribute("data-tweet-id")), p.push(b(u[t], "p-author")[0]), q.push(b(u[t], "dt-updated")[0]), 
            r.push(b(u[t], "retweet-credit").length > 0 ? !0 : !1), t++;
            o.length > d && (o.splice(d, o.length - d), p.splice(d, p.length - d), q.splice(d, q.length - d), 
            r.splice(d, r.length - d));
            for (var v = [], t = o.length, w = 0; t > w; ) {
                if ("string" != typeof j) {
                    var x = new Date(q[w].getAttribute("datetime").replace(/-/g, "/").replace("T", " ").split("+")[0]), y = j(x);
                    if (q[w].setAttribute("aria-label", y), o[w].innerText) if (k) q[w].innerText = y; else {
                        var z = document.createElement("p"), A = document.createTextNode(y);
                        z.appendChild(A), z.setAttribute("aria-label", y), q[w] = z;
                    } else q[w].textContent = y;
                }
                var B = "";
                e ? (h && (B += '<div class="user">' + a(p[w].innerHTML) + "</div>"), B += '<p class="tweet">' + a(o[w].innerHTML) + "</p>", 
                i && (B += '<p class="timePosted">' + q[w].getAttribute("aria-label") + "</p>")) : o[w].innerText ? (h && (B += '<p class="user">' + p[w].innerText + "</p>"), 
                B += '<p class="tweet">' + o[w].innerText + "</p>", i && (B += '<p class="timePosted">' + q[w].innerText + "</p>")) : (h && (B += '<p class="user">' + p[w].textContent + "</p>"), 
                B += '<p class="tweet">' + o[w].textContent + "</p>", i && (B += '<p class="timePosted">' + q[w].textContent + "</p>")), 
                n && (B += '<p class="interact"><a href="https://twitter.com/intent/tweet?in_reply_to=' + s[w] + '" class="twitter_reply_icon">Reply</a><a href="https://twitter.com/intent/retweet?tweet_id=' + s[w] + '" class="twitter_retweet_icon">Retweet</a><a href="https://twitter.com/intent/favorite?tweet_id=' + s[w] + '" class="twitter_fav_icon">Favorite</a></p>'), 
                v.push(B), w++;
            }
            twitterFetcher.handler(v), g = !1, f.length > 0 && (twitterFetcher.fetch(f[0]), 
            f.splice(0, 1));
        }
    };
}();

$(document).ready(function() {
    $(".nav-trigger").on("click", function() {
        $("header").hasClass("active") ? $("header").addClass("active") : $("header").removeClass("active");
    });
    var a = 0;
    $("progress").each(function() {
        var b = $(this), c = b.prev("label"), d = b.find(".progress-bar span");
        setInterval(function() {
            100 > a ? a++ : a = 0, b.attr("value", a), c.width(a + "%").attr("data-progress", a), 
            d.width(a + "%").html(a + "%");
        }, 500);
    }), $(".sidebar").append("<ul></ul>"), $(".main a.anchor").each(function(a) {
        var b = $(this).attr("id"), c = $(this).next().html();
        $(".sidebar ul").append('<li><a href="#' + b + '">' + c + "</a></li>"), 0 === a && $(".sidebar ul a").addClass("active");
    }), $(".sidebar-trigger").on("click", function() {
        $(".main").hasClass("sidebar-on") ? $(".main").removeClass("sidebar-on") : $(".main").addClass("sidebar-on");
    }), $("html, body").on("click", function(a) {
        !$(a.target).closest(".sidebar") && $(".main").hasClass("sidebar-on") && $(".main").removeClass("sidebar-on");
    }), $(".sidebar li a").on("click", function() {
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