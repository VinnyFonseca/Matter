function FastClick(layer) {
    "use strict";
    function bind(method, context) {
        return function() {
            return method.apply(context, arguments);
        };
    }
    var oldOnClick;
    this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, 
    this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = 10, 
    this.layer = layer, FastClick.notNeeded(layer) || (deviceIsAndroid && (layer.addEventListener("mouseover", bind(this.onMouse, this), !0), 
    layer.addEventListener("mousedown", bind(this.onMouse, this), !0), layer.addEventListener("mouseup", bind(this.onMouse, this), !0)), 
    layer.addEventListener("click", bind(this.onClick, this), !0), layer.addEventListener("touchstart", bind(this.onTouchStart, this), !1), 
    layer.addEventListener("touchmove", bind(this.onTouchMove, this), !1), layer.addEventListener("touchend", bind(this.onTouchEnd, this), !1), 
    layer.addEventListener("touchcancel", bind(this.onTouchCancel, this), !1), Event.prototype.stopImmediatePropagation || (layer.removeEventListener = function(type, callback, capture) {
        var rmv = Node.prototype.removeEventListener;
        "click" === type ? rmv.call(layer, type, callback.hijacked || callback, capture) : rmv.call(layer, type, callback, capture);
    }, layer.addEventListener = function(type, callback, capture) {
        var adv = Node.prototype.addEventListener;
        "click" === type ? adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
            event.propagationStopped || callback(event);
        }), capture) : adv.call(layer, type, callback, capture);
    }), "function" == typeof layer.onclick && (oldOnClick = layer.onclick, layer.addEventListener("click", function(event) {
        oldOnClick(event);
    }, !1), layer.onclick = null));
}

function detectSidebar() {
    !anchorClicked && $("a.anchor").length && $("a.anchor").each(function(i) {
        var top = $(this).offset().top - 40, length = $(".sidebar a").length;
        if (pageTop >= top && ($(".sidebar a").removeClass("active"), $(".sidebar a").eq(i).addClass("active"), 
        $(".sidebar a").eq(i).hasClass("core"))) {
            $(".sidebar a").eq(i).addClass("active");
            var container = $(".sidebar a").eq(i).data("container");
            $(".sidebar .container").removeClass("selected"), $(".sidebar .container[data-type=" + container + "]").addClass("selected");
        }
        pageTop + $(window).height() >= $(document).height() && $(".sidebar a").removeClass("active").eq(length - 1).addClass("active");
    });
}

!function(global, factory) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = global.document ? factory(global, !0) : function(w) {
        if (!w.document) throw new Error("jQuery requires a window with a document");
        return factory(w);
    } : factory(global);
}("undefined" != typeof window ? window : this, function(window, noGlobal) {
    function isArraylike(obj) {
        var length = "length" in obj && obj.length, type = jQuery.type(obj);
        return "function" === type || jQuery.isWindow(obj) ? !1 : 1 === obj.nodeType && length ? !0 : "array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj;
    }
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) return jQuery.grep(elements, function(elem, i) {
            return !!qualifier.call(elem, i, elem) !== not;
        });
        if (qualifier.nodeType) return jQuery.grep(elements, function(elem) {
            return elem === qualifier !== not;
        });
        if ("string" == typeof qualifier) {
            if (risSimple.test(qualifier)) return jQuery.filter(qualifier, elements, not);
            qualifier = jQuery.filter(qualifier, elements);
        }
        return jQuery.grep(elements, function(elem) {
            return jQuery.inArray(elem, qualifier) >= 0 !== not;
        });
    }
    function sibling(cur, dir) {
        do cur = cur[dir]; while (cur && 1 !== cur.nodeType);
        return cur;
    }
    function createOptions(options) {
        var object = optionsCache[options] = {};
        return jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
            object[flag] = !0;
        }), object;
    }
    function detach() {
        document.addEventListener ? (document.removeEventListener("DOMContentLoaded", completed, !1), 
        window.removeEventListener("load", completed, !1)) : (document.detachEvent("onreadystatechange", completed), 
        window.detachEvent("onload", completed));
    }
    function completed() {
        (document.addEventListener || "load" === event.type || "complete" === document.readyState) && (detach(), 
        jQuery.ready());
    }
    function dataAttr(elem, key, data) {
        if (void 0 === data && 1 === elem.nodeType) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            if (data = elem.getAttribute(name), "string" == typeof data) {
                try {
                    data = "true" === data ? !0 : "false" === data ? !1 : "null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
                } catch (e) {}
                jQuery.data(elem, key, data);
            } else data = void 0;
        }
        return data;
    }
    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) if (("data" !== name || !jQuery.isEmptyObject(obj[name])) && "toJSON" !== name) return !1;
        return !0;
    }
    function internalData(elem, name, data, pvt) {
        if (jQuery.acceptData(elem)) {
            var ret, thisCache, internalKey = jQuery.expando, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
            if (id && cache[id] && (pvt || cache[id].data) || void 0 !== data || "string" != typeof name) return id || (id = isNode ? elem[internalKey] = deletedIds.pop() || jQuery.guid++ : internalKey), 
            cache[id] || (cache[id] = isNode ? {} : {
                toJSON: jQuery.noop
            }), ("object" == typeof name || "function" == typeof name) && (pvt ? cache[id] = jQuery.extend(cache[id], name) : cache[id].data = jQuery.extend(cache[id].data, name)), 
            thisCache = cache[id], pvt || (thisCache.data || (thisCache.data = {}), thisCache = thisCache.data), 
            void 0 !== data && (thisCache[jQuery.camelCase(name)] = data), "string" == typeof name ? (ret = thisCache[name], 
            null == ret && (ret = thisCache[jQuery.camelCase(name)])) : ret = thisCache, ret;
        }
    }
    function internalRemoveData(elem, name, pvt) {
        if (jQuery.acceptData(elem)) {
            var thisCache, i, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[jQuery.expando] : jQuery.expando;
            if (cache[id]) {
                if (name && (thisCache = pvt ? cache[id] : cache[id].data)) {
                    jQuery.isArray(name) ? name = name.concat(jQuery.map(name, jQuery.camelCase)) : name in thisCache ? name = [ name ] : (name = jQuery.camelCase(name), 
                    name = name in thisCache ? [ name ] : name.split(" ")), i = name.length;
                    for (;i--; ) delete thisCache[name[i]];
                    if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) return;
                }
                (pvt || (delete cache[id].data, isEmptyDataObject(cache[id]))) && (isNode ? jQuery.cleanData([ elem ], !0) : support.deleteExpando || cache != cache.window ? delete cache[id] : cache[id] = null);
            }
        }
    }
    function returnTrue() {
        return !0;
    }
    function returnFalse() {
        return !1;
    }
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }
    function createSafeFragment(document) {
        var list = nodeNames.split("|"), safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement) for (;list.length; ) safeFrag.createElement(list.pop());
        return safeFrag;
    }
    function getAll(context, tag) {
        var elems, elem, i = 0, found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== strundefined ? context.querySelectorAll(tag || "*") : void 0;
        if (!found) for (found = [], elems = context.childNodes || context; null != (elem = elems[i]); i++) !tag || jQuery.nodeName(elem, tag) ? found.push(elem) : jQuery.merge(found, getAll(elem, tag));
        return void 0 === tag || tag && jQuery.nodeName(context, tag) ? jQuery.merge([ context ], found) : found;
    }
    function fixDefaultChecked(elem) {
        rcheckableType.test(elem.type) && (elem.defaultChecked = elem.checked);
    }
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
    }
    function disableScript(elem) {
        return elem.type = (null !== jQuery.find.attr(elem, "type")) + "/" + elem.type, 
        elem;
    }
    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        return match ? elem.type = match[1] : elem.removeAttribute("type"), elem;
    }
    function setGlobalEval(elems, refElements) {
        for (var elem, i = 0; null != (elem = elems[i]); i++) jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"));
    }
    function cloneCopyEvent(src, dest) {
        if (1 === dest.nodeType && jQuery.hasData(src)) {
            var type, i, l, oldData = jQuery._data(src), curData = jQuery._data(dest, oldData), events = oldData.events;
            if (events) {
                delete curData.handle, curData.events = {};
                for (type in events) for (i = 0, l = events[type].length; l > i; i++) jQuery.event.add(dest, type, events[type][i]);
            }
            curData.data && (curData.data = jQuery.extend({}, curData.data));
        }
    }
    function fixCloneNodeIssues(src, dest) {
        var nodeName, e, data;
        if (1 === dest.nodeType) {
            if (nodeName = dest.nodeName.toLowerCase(), !support.noCloneEvent && dest[jQuery.expando]) {
                data = jQuery._data(dest);
                for (e in data.events) jQuery.removeEvent(dest, e, data.handle);
                dest.removeAttribute(jQuery.expando);
            }
            "script" === nodeName && dest.text !== src.text ? (disableScript(dest).text = src.text, 
            restoreScript(dest)) : "object" === nodeName ? (dest.parentNode && (dest.outerHTML = src.outerHTML), 
            support.html5Clone && src.innerHTML && !jQuery.trim(dest.innerHTML) && (dest.innerHTML = src.innerHTML)) : "input" === nodeName && rcheckableType.test(src.type) ? (dest.defaultChecked = dest.checked = src.checked, 
            dest.value !== src.value && (dest.value = src.value)) : "option" === nodeName ? dest.defaultSelected = dest.selected = src.defaultSelected : ("input" === nodeName || "textarea" === nodeName) && (dest.defaultValue = src.defaultValue);
        }
    }
    function actualDisplay(name, doc) {
        var style, elem = jQuery(doc.createElement(name)).appendTo(doc.body), display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? style.display : jQuery.css(elem[0], "display");
        return elem.detach(), display;
    }
    function defaultDisplay(nodeName) {
        var doc = document, display = elemdisplay[nodeName];
        return display || (display = actualDisplay(nodeName, doc), "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement), 
        doc = (iframe[0].contentWindow || iframe[0].contentDocument).document, doc.write(), 
        doc.close(), display = actualDisplay(nodeName, doc), iframe.detach()), elemdisplay[nodeName] = display), 
        display;
    }
    function addGetHookIf(conditionFn, hookFn) {
        return {
            get: function() {
                var condition = conditionFn();
                if (null != condition) return condition ? void delete this.get : (this.get = hookFn).apply(this, arguments);
            }
        };
    }
    function vendorPropName(style, name) {
        if (name in style) return name;
        for (var capName = name.charAt(0).toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length; i--; ) if (name = cssPrefixes[i] + capName, 
        name in style) return name;
        return origName;
    }
    function showHide(elements, show) {
        for (var display, elem, hidden, values = [], index = 0, length = elements.length; length > index; index++) elem = elements[index], 
        elem.style && (values[index] = jQuery._data(elem, "olddisplay"), display = elem.style.display, 
        show ? (values[index] || "none" !== display || (elem.style.display = ""), "" === elem.style.display && isHidden(elem) && (values[index] = jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName)))) : (hidden = isHidden(elem), 
        (display && "none" !== display || !hidden) && jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))));
        for (index = 0; length > index; index++) elem = elements[index], elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
        return elements;
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        for (var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; 4 > i; i += 2) "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)), 
        isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)), 
        "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles), 
        "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
        return val;
    }
    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = !0, val = "width" === name ? elem.offsetWidth : elem.offsetHeight, styles = getStyles(elem), isBorderBox = support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
        if (0 >= val || null == val) {
            if (val = curCSS(elem, name, styles), (0 > val || null == val) && (val = elem.style[name]), 
            rnumnonpx.test(val)) return val;
            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]), 
            val = parseFloat(val) || 0;
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
    }
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    function createFxNow() {
        return setTimeout(function() {
            fxNow = void 0;
        }), fxNow = jQuery.now();
    }
    function genFx(type, includeWidth) {
        var which, attrs = {
            height: type
        }, i = 0;
        for (includeWidth = includeWidth ? 1 : 0; 4 > i; i += 2 - includeWidth) which = cssExpand[i], 
        attrs["margin" + which] = attrs["padding" + which] = type;
        return includeWidth && (attrs.opacity = attrs.width = type), attrs;
    }
    function createTween(value, prop, animation) {
        for (var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length; length > index; index++) if (tween = collection[index].call(animation, prop, value)) return tween;
    }
    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = jQuery._data(elem, "fxshow");
        opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, 
        oldfire = hooks.empty.fire, hooks.empty.fire = function() {
            hooks.unqueued || oldfire();
        }), hooks.unqueued++, anim.always(function() {
            anim.always(function() {
                hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire();
            });
        })), 1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [ style.overflow, style.overflowX, style.overflowY ], 
        display = jQuery.css(elem, "display"), checkDisplay = "none" === display ? jQuery._data(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display, 
        "inline" === checkDisplay && "none" === jQuery.css(elem, "float") && (support.inlineBlockNeedsLayout && "inline" !== defaultDisplay(elem.nodeName) ? style.zoom = 1 : style.display = "inline-block")), 
        opts.overflow && (style.overflow = "hidden", support.shrinkWrapBlocks() || anim.always(function() {
            style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2];
        }));
        for (prop in props) if (value = props[prop], rfxtypes.exec(value)) {
            if (delete props[prop], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show")) {
                if ("show" !== value || !dataShow || void 0 === dataShow[prop]) continue;
                hidden = !0;
            }
            orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
        } else display = void 0;
        if (jQuery.isEmptyObject(orig)) "inline" === ("none" === display ? defaultDisplay(elem.nodeName) : display) && (style.display = display); else {
            dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = jQuery._data(elem, "fxshow", {}), 
            toggle && (dataShow.hidden = !hidden), hidden ? jQuery(elem).show() : anim.done(function() {
                jQuery(elem).hide();
            }), anim.done(function() {
                var prop;
                jQuery._removeData(elem, "fxshow");
                for (prop in orig) jQuery.style(elem, prop, orig[prop]);
            });
            for (prop in orig) tween = createTween(hidden ? dataShow[prop] : 0, prop, anim), 
            prop in dataShow || (dataShow[prop] = tween.start, hidden && (tween.end = tween.start, 
            tween.start = "width" === prop || "height" === prop ? 1 : 0));
        }
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) if (name = jQuery.camelCase(index), easing = specialEasing[name], 
        value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), 
        index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], 
        hooks && "expand" in hooks) {
            value = hooks.expand(value), delete props[name];
            for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing);
        } else specialEasing[name] = easing;
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem;
        }), tick = function() {
            if (stopped) return !1;
            for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; length > index; index++) animation.tweens[index].run(percent);
            return deferred.notifyWith(elem, [ animation, percent, remaining ]), 1 > percent && length ? remaining : (deferred.resolveWith(elem, [ animation ]), 
            !1);
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(!0, {
                specialEasing: {}
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                return animation.tweens.push(tween), tween;
            },
            stop: function(gotoEnd) {
                var index = 0, length = gotoEnd ? animation.tweens.length : 0;
                if (stopped) return this;
                for (stopped = !0; length > index; index++) animation.tweens[index].run(1);
                return gotoEnd ? deferred.resolveWith(elem, [ animation, gotoEnd ]) : deferred.rejectWith(elem, [ animation, gotoEnd ]), 
                this;
            }
        }), props = animation.props;
        for (propFilter(props, animation.opts.specialEasing); length > index; index++) if (result = animationPrefilters[index].call(animation, elem, props, animation.opts)) return result;
        return jQuery.map(props, createTween, animation), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), 
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    }
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
            if (jQuery.isFunction(func)) for (;dataType = dataTypes[i++]; ) "+" === dataType.charAt(0) ? (dataType = dataType.slice(1) || "*", 
            (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func);
        };
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        function inspect(dataType) {
            var selected;
            return inspected[dataType] = !0, jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), 
                inspect(dataTypeOrTransport), !1);
            }), selected;
        }
        var inspected = {}, seekingTransport = structure === transports;
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }
    function ajaxExtend(target, src) {
        var deep, key, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) void 0 !== src[key] && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
        return deep && jQuery.extend(!0, target, deep), target;
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        for (var firstDataType, ct, finalDataType, type, contents = s.contents, dataTypes = s.dataTypes; "*" === dataTypes[0]; ) dataTypes.shift(), 
        void 0 === ct && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
        if (ct) for (type in contents) if (contents[type] && contents[type].test(ct)) {
            dataTypes.unshift(type);
            break;
        }
        if (dataTypes[0] in responses) finalDataType = dataTypes[0]; else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                firstDataType || (firstDataType = type);
            }
            finalDataType = finalDataType || firstDataType;
        }
        return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), 
        responses[finalDataType]) : void 0;
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
        for (current = dataTypes.shift(); current; ) if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), 
        !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), 
        prev = current, current = dataTypes.shift()) if ("*" === current) current = prev; else if ("*" !== prev && prev !== current) {
            if (conv = converters[prev + " " + current] || converters["* " + current], !conv) for (conv2 in converters) if (tmp = conv2.split(" "), 
            tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], 
                dataTypes.unshift(tmp[1]));
                break;
            }
            if (conv !== !0) if (conv && s["throws"]) response = conv(response); else try {
                response = conv(response);
            } catch (e) {
                return {
                    state: "parsererror",
                    error: conv ? e : "No conversion from " + prev + " to " + current
                };
            }
        }
        return {
            state: "success",
            data: response
        };
    }
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) jQuery.each(obj, function(i, v) {
            traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v ? i : "") + "]", v, traditional, add);
        }); else if (traditional || "object" !== jQuery.type(obj)) add(prefix, obj); else for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
    }
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {}
    }
    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
    }
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType ? elem.defaultView || elem.parentWindow : !1;
    }
    var deletedIds = [], slice = deletedIds.slice, concat = deletedIds.concat, push = deletedIds.push, indexOf = deletedIds.indexOf, class2type = {}, toString = class2type.toString, hasOwn = class2type.hasOwnProperty, support = {}, version = "1.11.3", jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
    }, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function(all, letter) {
        return letter.toUpperCase();
    };
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        selector: "",
        length: 0,
        toArray: function() {
            return slice.call(this);
        },
        get: function(num) {
            return null != num ? 0 > num ? this[num + this.length] : this[num] : slice.call(this);
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            return ret.prevObject = this, ret.context = this.context, ret;
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args);
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(i) {
            var len = this.length, j = +i + (0 > i ? len : 0);
            return this.pushStack(j >= 0 && len > j ? [ this[j] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: push,
        sort: deletedIds.sort,
        splice: deletedIds.splice
    }, jQuery.extend = jQuery.fn.extend = function() {
        var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
        for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, 
        i++), "object" == typeof target || jQuery.isFunction(target) || (target = {}), i === length && (target = this, 
        i--); length > i; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], 
        copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, 
        clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, 
        target[name] = jQuery.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
        return target;
    }, jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(msg) {
            throw new Error(msg);
        },
        noop: function() {},
        isFunction: function(obj) {
            return "function" === jQuery.type(obj);
        },
        isArray: Array.isArray || function(obj) {
            return "array" === jQuery.type(obj);
        },
        isWindow: function(obj) {
            return null != obj && obj == obj.window;
        },
        isNumeric: function(obj) {
            return !jQuery.isArray(obj) && obj - parseFloat(obj) + 1 >= 0;
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) return !1;
            return !0;
        },
        isPlainObject: function(obj) {
            var key;
            if (!obj || "object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj)) return !1;
            try {
                if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (e) {
                return !1;
            }
            if (support.ownLast) for (key in obj) return hasOwn.call(obj, key);
            for (key in obj) ;
            return void 0 === key || hasOwn.call(obj, key);
        },
        type: function(obj) {
            return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj;
        },
        globalEval: function(data) {
            data && jQuery.trim(data) && (window.execScript || function(data) {
                window.eval.call(window, data);
            })(data);
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        each: function(obj, callback, args) {
            var value, i = 0, length = obj.length, isArray = isArraylike(obj);
            if (args) {
                if (isArray) for (;length > i && (value = callback.apply(obj[i], args), value !== !1); i++) ; else for (i in obj) if (value = callback.apply(obj[i], args), 
                value === !1) break;
            } else if (isArray) for (;length > i && (value = callback.call(obj[i], i, obj[i]), 
            value !== !1); i++) ; else for (i in obj) if (value = callback.call(obj[i], i, obj[i]), 
            value === !1) break;
            return obj;
        },
        trim: function(text) {
            return null == text ? "" : (text + "").replace(rtrim, "");
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            return null != arr && (isArraylike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [ arr ] : arr) : push.call(ret, arr)), 
            ret;
        },
        inArray: function(elem, arr, i) {
            var len;
            if (arr) {
                if (indexOf) return indexOf.call(arr, elem, i);
                for (len = arr.length, i = i ? 0 > i ? Math.max(0, len + i) : i : 0; len > i; i++) if (i in arr && arr[i] === elem) return i;
            }
            return -1;
        },
        merge: function(first, second) {
            for (var len = +second.length, j = 0, i = first.length; len > j; ) first[i++] = second[j++];
            if (len !== len) for (;void 0 !== second[j]; ) first[i++] = second[j++];
            return first.length = i, first;
        },
        grep: function(elems, callback, invert) {
            for (var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert; length > i; i++) callbackInverse = !callback(elems[i], i), 
            callbackInverse !== callbackExpect && matches.push(elems[i]);
            return matches;
        },
        map: function(elems, callback, arg) {
            var value, i = 0, length = elems.length, isArray = isArraylike(elems), ret = [];
            if (isArray) for (;length > i; i++) value = callback(elems[i], i, arg), null != value && ret.push(value); else for (i in elems) value = callback(elems[i], i, arg), 
            null != value && ret.push(value);
            return concat.apply([], ret);
        },
        guid: 1,
        proxy: function(fn, context) {
            var args, proxy, tmp;
            return "string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), 
            jQuery.isFunction(fn) ? (args = slice.call(arguments, 2), proxy = function() {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy) : void 0;
        },
        now: function() {
            return +new Date();
        },
        support: support
    }), jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    var Sizzle = function(window) {
        function Sizzle(selector, context, results, seed) {
            var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
            if ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), 
            context = context || document, results = results || [], nodeType = context.nodeType, 
            "string" != typeof selector || !selector || 1 !== nodeType && 9 !== nodeType && 11 !== nodeType) return results;
            if (!seed && documentIsHTML) {
                if (11 !== nodeType && (match = rquickExpr.exec(selector))) if (m = match[1]) {
                    if (9 === nodeType) {
                        if (elem = context.getElementById(m), !elem || !elem.parentNode) return results;
                        if (elem.id === m) return results.push(elem), results;
                    } else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), 
                    results;
                } else {
                    if (match[2]) return push.apply(results, context.getElementsByTagName(selector)), 
                    results;
                    if ((m = match[3]) && support.getElementsByClassName) return push.apply(results, context.getElementsByClassName(m)), 
                    results;
                }
                if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    if (nid = old = expando, newContext = context, newSelector = 1 !== nodeType && selector, 
                    1 === nodeType && "object" !== context.nodeName.toLowerCase()) {
                        for (groups = tokenize(selector), (old = context.getAttribute("id")) ? nid = old.replace(rescape, "\\$&") : context.setAttribute("id", nid), 
                        nid = "[id='" + nid + "'] ", i = groups.length; i--; ) groups[i] = nid + toSelector(groups[i]);
                        newContext = rsibling.test(selector) && testContext(context.parentNode) || context, 
                        newSelector = groups.join(",");
                    }
                    if (newSelector) try {
                        return push.apply(results, newContext.querySelectorAll(newSelector)), results;
                    } catch (qsaError) {} finally {
                        old || context.removeAttribute("id");
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed);
        }
        function createCache() {
            function cache(key, value) {
                return keys.push(key + " ") > Expr.cacheLength && delete cache[keys.shift()], cache[key + " "] = value;
            }
            var keys = [];
            return cache;
        }
        function markFunction(fn) {
            return fn[expando] = !0, fn;
        }
        function assert(fn) {
            var div = document.createElement("div");
            try {
                return !!fn(div);
            } catch (e) {
                return !1;
            } finally {
                div.parentNode && div.parentNode.removeChild(div), div = null;
            }
        }
        function addHandle(attrs, handler) {
            for (var arr = attrs.split("|"), i = attrs.length; i--; ) Expr.attrHandle[arr[i]] = handler;
        }
        function siblingCheck(a, b) {
            var cur = b && a, diff = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            if (diff) return diff;
            if (cur) for (;cur = cur.nextSibling; ) if (cur === b) return -1;
            return a ? 1 : -1;
        }
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return "input" === name && elem.type === type;
            };
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return ("input" === name || "button" === name) && elem.type === type;
            };
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                return argument = +argument, markFunction(function(seed, matches) {
                    for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--; ) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]));
                });
            });
        }
        function testContext(context) {
            return context && "undefined" != typeof context.getElementsByTagName && context;
        }
        function setFilters() {}
        function toSelector(tokens) {
            for (var i = 0, len = tokens.length, selector = ""; len > i; i++) selector += tokens[i].value;
            return selector;
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir, checkNonElements = base && "parentNode" === dir, doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml);
            } : function(elem, context, xml) {
                var oldCache, outerCache, newCache = [ dirruns, doneName ];
                if (xml) {
                    for (;elem = elem[dir]; ) if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) return !0;
                } else for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) {
                    if (outerCache = elem[expando] || (elem[expando] = {}), (oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) return newCache[2] = oldCache[2];
                    if (outerCache[dir] = newCache, newCache[2] = matcher(elem, context, xml)) return !0;
                }
            };
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                for (var i = matchers.length; i--; ) if (!matchers[i](elem, context, xml)) return !1;
                return !0;
            } : matchers[0];
        }
        function multipleContexts(selector, contexts, results) {
            for (var i = 0, len = contexts.length; len > i; i++) Sizzle(selector, contexts[i], results);
            return results;
        }
        function condense(unmatched, map, filter, context, xml) {
            for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; len > i; i++) (elem = unmatched[i]) && (!filter || filter(elem, context, xml)) && (newUnmatched.push(elem), 
            mapped && map.push(i));
            return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), 
            postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), 
            markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [ context ] : context, []), matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml), matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter) for (temp = condense(matcherOut, postMap), 
                postFilter(temp, [], context, xml), i = temp.length; i--; ) (elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            for (temp = [], i = matcherOut.length; i--; ) (elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                            postFinder(null, matcherOut = [], temp, xml);
                        }
                        for (i = matcherOut.length; i--; ) (elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem));
                    }
                } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), 
                postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut);
            });
        }
        function matcherFromTokens(tokens) {
            for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext;
            }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                return indexOf(checkContext, elem) > -1;
            }, implicitRelative, !0), matchers = [ function(elem, context, xml) {
                var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                return checkContext = null, ret;
            } ]; len > i; i++) if (matcher = Expr.relative[tokens[i].type]) matchers = [ addCombinator(elementMatcher(matchers), matcher) ]; else {
                if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                    for (j = ++i; len > j && !Expr.relative[tokens[j].type]; j++) ;
                    return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                        value: " " === tokens[i - 2].type ? "*" : ""
                    })).replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), len > j && matcherFromTokens(tokens = tokens.slice(j)), len > j && toSelector(tokens));
                }
                matchers.push(matcher);
            }
            return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
                var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", outermost), dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1, len = elems.length;
                for (outermost && (outermostContext = context !== document && context); i !== len && null != (elem = elems[i]); i++) {
                    if (byElement && elem) {
                        for (j = 0; matcher = elementMatchers[j++]; ) if (matcher(elem, context, xml)) {
                            results.push(elem);
                            break;
                        }
                        outermost && (dirruns = dirrunsUnique);
                    }
                    bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem));
                }
                if (matchedCount += i, bySet && i !== matchedCount) {
                    for (j = 0; matcher = setMatchers[j++]; ) matcher(unmatched, setMatched, context, xml);
                    if (seed) {
                        if (matchedCount > 0) for (;i--; ) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                        setMatched = condense(setMatched);
                    }
                    push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results);
                }
                return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), 
                unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function(a, b) {
            return a === b && (hasDuplicate = !0), 0;
        }, MAX_NEGATIVE = 1 << 31, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = function(list, elem) {
            for (var i = 0, len = list.length; len > i; i++) if (list[i] === elem) return i;
            return -1;
        }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|.*)\\)|)", rwhitespace = new RegExp(whitespace + "+", "g"), rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            ID: new RegExp("^#(" + characterEncoding + ")"),
            CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
            TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + booleans + ")$", "i"),
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, rescape = /'|\\/g, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 65536;
            return high !== high || escapedWhitespace ? escaped : 0 > high ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320);
        }, unloadHandler = function() {
            setDocument();
        };
        try {
            push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes), 
            arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
            push = {
                apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els));
                } : function(target, els) {
                    for (var j = target.length, i = 0; target[j++] = els[i++]; ) ;
                    target.length = j - 1;
                }
            };
        }
        support = Sizzle.support = {}, isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? "HTML" !== documentElement.nodeName : !1;
        }, setDocument = Sizzle.setDocument = function(node) {
            var hasCompare, parent, doc = node ? node.ownerDocument || node : preferredDoc;
            return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, 
            docElem = doc.documentElement, parent = doc.defaultView, parent && parent !== parent.top && (parent.addEventListener ? parent.addEventListener("unload", unloadHandler, !1) : parent.attachEvent && parent.attachEvent("onunload", unloadHandler)), 
            documentIsHTML = !isXML(doc), support.attributes = assert(function(div) {
                return div.className = "i", !div.getAttribute("className");
            }), support.getElementsByTagName = assert(function(div) {
                return div.appendChild(doc.createComment("")), !div.getElementsByTagName("*").length;
            }), support.getElementsByClassName = rnative.test(doc.getElementsByClassName), support.getById = assert(function(div) {
                return docElem.appendChild(div).id = expando, !doc.getElementsByName || !doc.getElementsByName(expando).length;
            }), support.getById ? (Expr.find.ID = function(id, context) {
                if ("undefined" != typeof context.getElementById && documentIsHTML) {
                    var m = context.getElementById(id);
                    return m && m.parentNode ? [ m ] : [];
                }
            }, Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    return elem.getAttribute("id") === attrId;
                };
            }) : (delete Expr.find.ID, Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    var node = "undefined" != typeof elem.getAttributeNode && elem.getAttributeNode("id");
                    return node && node.value === attrId;
                };
            }), Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                return "undefined" != typeof context.getElementsByTagName ? context.getElementsByTagName(tag) : support.qsa ? context.querySelectorAll(tag) : void 0;
            } : function(tag, context) {
                var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                if ("*" === tag) {
                    for (;elem = results[i++]; ) 1 === elem.nodeType && tmp.push(elem);
                    return tmp;
                }
                return results;
            }, Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                return documentIsHTML ? context.getElementsByClassName(className) : void 0;
            }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(doc.querySelectorAll)) && (assert(function(div) {
                docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\f]' msallowcapture=''><option selected=''></option></select>", 
                div.querySelectorAll("[msallowcapture^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"), 
                div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"), 
                div.querySelectorAll("[id~=" + expando + "-]").length || rbuggyQSA.push("~="), div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked"), 
                div.querySelectorAll("a#" + expando + "+*").length || rbuggyQSA.push(".#.+[+~]");
            }), assert(function(div) {
                var input = doc.createElement("input");
                input.setAttribute("type", "hidden"), div.appendChild(input).setAttribute("name", "D"), 
                div.querySelectorAll("[name=d]").length && rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?="), 
                div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled"), 
                div.querySelectorAll("*,:x"), rbuggyQSA.push(",.*:");
            })), (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(div) {
                support.disconnectedMatch = matches.call(div, "div"), matches.call(div, "[s!='']:x"), 
                rbuggyMatches.push("!=", pseudos);
            }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), 
            hasCompare = rnative.test(docElem.compareDocumentPosition), contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                var adown = 9 === a.nodeType ? a.documentElement : a, bup = b && b.parentNode;
                return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)));
            } : function(a, b) {
                if (b) for (;b = b.parentNode; ) if (b === a) return !0;
                return !1;
            }, sortOrder = hasCompare ? function(a, b) {
                if (a === b) return hasDuplicate = !0, 0;
                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return compare ? compare : (compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 
                1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0 : 4 & compare ? -1 : 1);
            } : function(a, b) {
                if (a === b) return hasDuplicate = !0, 0;
                var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [ a ], bp = [ b ];
                if (!aup || !bup) return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                if (aup === bup) return siblingCheck(a, b);
                for (cur = a; cur = cur.parentNode; ) ap.unshift(cur);
                for (cur = b; cur = cur.parentNode; ) bp.unshift(cur);
                for (;ap[i] === bp[i]; ) i++;
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
            }, doc) : document;
        }, Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements);
        }, Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), 
            support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) try {
                var ret = matches.call(elem, expr);
                if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret;
            } catch (e) {}
            return Sizzle(expr, document, null, [ elem ]).length > 0;
        }, Sizzle.contains = function(context, elem) {
            return (context.ownerDocument || context) !== document && setDocument(context), 
            contains(context, elem);
        }, Sizzle.attr = function(elem, name) {
            (elem.ownerDocument || elem) !== document && setDocument(elem);
            var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
            return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }, Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        }, Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i = 0;
            if (hasDuplicate = !support.detectDuplicates, sortInput = !support.sortStable && results.slice(0), 
            results.sort(sortOrder), hasDuplicate) {
                for (;elem = results[i++]; ) elem === results[i] && (j = duplicates.push(i));
                for (;j--; ) results.splice(duplicates[j], 1);
            }
            return sortInput = null, results;
        }, getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (nodeType) {
                if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                    if ("string" == typeof elem.textContent) return elem.textContent;
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem);
                } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue;
            } else for (;node = elem[i++]; ) ret += getText(node);
            return ret;
        }, Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
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
                ATTR: function(match) {
                    return match[1] = match[1].replace(runescape, funescape), match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape), 
                    "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4);
                },
                CHILD: function(match) {
                    return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), 
                    match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), 
                    match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), 
                    match;
                },
                PSEUDO: function(match) {
                    var excess, unquoted = !match[6] && match[2];
                    return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[4] || match[5] || "" : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), 
                    match[2] = unquoted.slice(0, excess)), match.slice(0, 3));
                }
            },
            filter: {
                TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return "*" === nodeNameSelector ? function() {
                        return !0;
                    } : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
                },
                CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test("string" == typeof elem.className && elem.className || "undefined" != typeof elem.getAttribute && elem.getAttribute("class") || "");
                    });
                },
                ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        return null == result ? "!=" === operator : operator ? (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : "|=" === operator ? result === check || result.slice(0, check.length + 1) === check + "-" : !1) : !0;
                    };
                },
                CHILD: function(type, what, argument, first, last) {
                    var simple = "nth" !== type.slice(0, 3), forward = "last" !== type.slice(-4), ofType = "of-type" === what;
                    return 1 === first && 0 === last ? function(elem) {
                        return !!elem.parentNode;
                    } : function(elem, context, xml) {
                        var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType;
                        if (parent) {
                            if (simple) {
                                for (;dir; ) {
                                    for (node = elem; node = node[dir]; ) if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) return !1;
                                    start = dir = "only" === type && !start && "nextSibling";
                                }
                                return !0;
                            }
                            if (start = [ forward ? parent.firstChild : parent.lastChild ], forward && useCache) {
                                for (outerCache = parent[expando] || (parent[expando] = {}), cache = outerCache[type] || [], 
                                nodeIndex = cache[0] === dirruns && cache[1], diff = cache[0] === dirruns && cache[2], 
                                node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop(); ) if (1 === node.nodeType && ++diff && node === elem) {
                                    outerCache[type] = [ dirruns, nodeIndex, diff ];
                                    break;
                                }
                            } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) diff = cache[1]; else for (;(node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && ((node[expando] || (node[expando] = {}))[type] = [ dirruns, diff ]), 
                            node !== elem)); ) ;
                            return diff -= last, diff === first || diff % first === 0 && diff / first >= 0;
                        }
                    };
                },
                PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [ pseudo, pseudo, "", argument ], 
                    Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                        for (var idx, matched = fn(seed, argument), i = matched.length; i--; ) idx = indexOf(seed, matched[i]), 
                        seed[idx] = !(matches[idx] = matched[i]);
                    }) : function(elem) {
                        return fn(elem, 0, args);
                    }) : fn;
                }
            },
            pseudos: {
                not: markFunction(function(selector) {
                    var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--; ) (elem = unmatched[i]) && (seed[i] = !(matches[i] = elem));
                    }) : function(elem, context, xml) {
                        return input[0] = elem, matcher(input, null, xml, results), input[0] = null, !results.pop();
                    };
                }),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                contains: markFunction(function(text) {
                    return text = text.replace(runescape, funescape), function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),
                lang: markFunction(function(lang) {
                    return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), 
                    lang = lang.replace(runescape, funescape).toLowerCase(), function(elem) {
                        var elemLang;
                        do if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) return elemLang = elemLang.toLowerCase(), 
                        elemLang === lang || 0 === elemLang.indexOf(lang + "-"); while ((elem = elem.parentNode) && 1 === elem.nodeType);
                        return !1;
                    };
                }),
                target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                root: function(elem) {
                    return elem === docElem;
                },
                focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                enabled: function(elem) {
                    return elem.disabled === !1;
                },
                disabled: function(elem) {
                    return elem.disabled === !0;
                },
                checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected;
                },
                selected: function(elem) {
                    return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0;
                },
                empty: function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) if (elem.nodeType < 6) return !1;
                    return !0;
                },
                parent: function(elem) {
                    return !Expr.pseudos.empty(elem);
                },
                header: function(elem) {
                    return rheader.test(elem.nodeName);
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName);
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && "button" === elem.type || "button" === name;
                },
                text: function(elem) {
                    var attr;
                    return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || "text" === attr.toLowerCase());
                },
                first: createPositionalPseudo(function() {
                    return [ 0 ];
                }),
                last: createPositionalPseudo(function(matchIndexes, length) {
                    return [ length - 1 ];
                }),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [ 0 > argument ? argument + length : argument ];
                }),
                even: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 0; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                odd: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 1; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; --i >= 0; ) matchIndexes.push(i);
                    return matchIndexes;
                }),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; ++i < length; ) matchIndexes.push(i);
                    return matchIndexes;
                })
            }
        }, Expr.pseudos.nth = Expr.pseudos.eq;
        for (i in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) Expr.pseudos[i] = createInputPseudo(i);
        for (i in {
            submit: !0,
            reset: !0
        }) Expr.pseudos[i] = createButtonPseudo(i);
        return setFilters.prototype = Expr.filters = Expr.pseudos, Expr.setFilters = new setFilters(), 
        tokenize = Sizzle.tokenize = function(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) return parseOnly ? 0 : cached.slice(0);
            for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar; ) {
                (!matched || (match = rcomma.exec(soFar))) && (match && (soFar = soFar.slice(match[0].length) || soFar), 
                groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: match[0].replace(rtrim, " ")
                }), soFar = soFar.slice(matched.length));
                for (type in Expr.filter) !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: type,
                    matches: match
                }), soFar = soFar.slice(matched.length));
                if (!matched) break;
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        }, compile = Sizzle.compile = function(selector, match) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
                for (match || (match = tokenize(selector)), i = match.length; i--; ) cached = matcherFromTokens(match[i]), 
                cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers)), 
                cached.selector = selector;
            }
            return cached;
        }, select = Sizzle.select = function(selector, context, results, seed) {
            var i, tokens, token, type, find, compiled = "function" == typeof selector && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            if (results = results || [], 1 === match.length) {
                if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                    if (context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0], 
                    !context) return results;
                    compiled && (context = context.parentNode), selector = selector.slice(tokens.shift().value.length);
                }
                for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i], 
                !Expr.relative[type = token.type]); ) if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                    if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) return push.apply(results, seed), 
                    results;
                    break;
                }
            }
            return (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context), 
            results;
        }, support.sortStable = expando.split("").sort(sortOrder).join("") === expando, 
        support.detectDuplicates = !!hasDuplicate, setDocument(), support.sortDetached = assert(function(div1) {
            return 1 & div1.compareDocumentPosition(document.createElement("div"));
        }), assert(function(div) {
            return div.innerHTML = "<a href='#'></a>", "#" === div.firstChild.getAttribute("href");
        }) || addHandle("type|href|height|width", function(elem, name, isXML) {
            return isXML ? void 0 : elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2);
        }), support.attributes && assert(function(div) {
            return div.innerHTML = "<input/>", div.firstChild.setAttribute("value", ""), "" === div.firstChild.getAttribute("value");
        }) || addHandle("value", function(elem, name, isXML) {
            return isXML || "input" !== elem.nodeName.toLowerCase() ? void 0 : elem.defaultValue;
        }), assert(function(div) {
            return null == div.getAttribute("disabled");
        }) || addHandle(booleans, function(elem, name, isXML) {
            var val;
            return isXML ? void 0 : elem[name] === !0 ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }), Sizzle;
    }(window);
    jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, 
    jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, 
    jQuery.contains = Sizzle.contains;
    var rneedsContext = jQuery.expr.match.needsContext, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, risSimple = /^.[^:#\[\.,]*$/;
    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        return not && (expr = ":not(" + expr + ")"), 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [ elem ] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
            return 1 === elem.nodeType;
        }));
    }, jQuery.fn.extend({
        find: function(selector) {
            var i, ret = [], self = this, len = self.length;
            if ("string" != typeof selector) return this.pushStack(jQuery(selector).filter(function() {
                for (i = 0; len > i; i++) if (jQuery.contains(self[i], this)) return !0;
            }));
            for (i = 0; len > i; i++) jQuery.find(selector, self[i], ret);
            return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret), ret.selector = this.selector ? this.selector + " " + selector : selector, 
            ret;
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], !1));
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], !0));
        },
        is: function(selector) {
            return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length;
        }
    });
    var rootjQuery, document = window.document, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, init = jQuery.fn.init = function(selector, context) {
        var match, elem;
        if (!selector) return this;
        if ("string" == typeof selector) {
            if (match = "<" === selector.charAt(0) && ">" === selector.charAt(selector.length - 1) && selector.length >= 3 ? [ null, selector, null ] : rquickExpr.exec(selector), 
            !match || !match[1] && context) return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
            if (match[1]) {
                if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)), 
                rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) for (match in context) jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                return this;
            }
            if (elem = document.getElementById(match[2]), elem && elem.parentNode) {
                if (elem.id !== match[2]) return rootjQuery.find(selector);
                this.length = 1, this[0] = elem;
            }
            return this.context = document, this.selector = selector, this;
        }
        return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, 
        this) : jQuery.isFunction(selector) ? "undefined" != typeof rootjQuery.ready ? rootjQuery.ready(selector) : selector(jQuery) : (void 0 !== selector.selector && (this.selector = selector.selector, 
        this.context = selector.context), jQuery.makeArray(selector, this));
    };
    init.prototype = jQuery.fn, rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    jQuery.extend({
        dir: function(elem, dir, until) {
            for (var matched = [], cur = elem[dir]; cur && 9 !== cur.nodeType && (void 0 === until || 1 !== cur.nodeType || !jQuery(cur).is(until)); ) 1 === cur.nodeType && matched.push(cur), 
            cur = cur[dir];
            return matched;
        },
        sibling: function(n, elem) {
            for (var r = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && r.push(n);
            return r;
        }
    }), jQuery.fn.extend({
        has: function(target) {
            var i, targets = jQuery(target, this), len = targets.length;
            return this.filter(function() {
                for (i = 0; len > i; i++) if (jQuery.contains(this, targets[i])) return !0;
            });
        },
        closest: function(selectors, context) {
            for (var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; l > i; i++) for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
                matched.push(cur);
                break;
            }
            return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
        },
        index: function(elem) {
            return elem ? "string" == typeof elem ? jQuery.inArray(this[0], jQuery(elem)) : jQuery.inArray(elem.jquery ? elem[0] : elem, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(selector, context) {
            return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))));
        },
        addBack: function(selector) {
            return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
        }
    }), jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && 11 !== parent.nodeType ? parent : null;
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function(elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var ret = jQuery.map(this, fn, until);
            return "Until" !== name.slice(-5) && (selector = until), selector && "string" == typeof selector && (ret = jQuery.filter(selector, ret)), 
            this.length > 1 && (guaranteedUnique[name] || (ret = jQuery.unique(ret)), rparentsprev.test(name) && (ret = ret.reverse())), 
            this.pushStack(ret);
        };
    });
    var rnotwhite = /\S+/g, optionsCache = {};
    jQuery.Callbacks = function(options) {
        options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
        var firing, memory, fired, firingLength, firingIndex, firingStart, list = [], stack = !options.once && [], fire = function(data) {
            for (memory = options.memory && data, fired = !0, firingIndex = firingStart || 0, 
            firingStart = 0, firingLength = list.length, firing = !0; list && firingLength > firingIndex; firingIndex++) if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
                memory = !1;
                break;
            }
            firing = !1, list && (stack ? stack.length && fire(stack.shift()) : memory ? list = [] : self.disable());
        }, self = {
            add: function() {
                if (list) {
                    var start = list.length;
                    !function add(args) {
                        jQuery.each(args, function(_, arg) {
                            var type = jQuery.type(arg);
                            "function" === type ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== type && add(arg);
                        });
                    }(arguments), firing ? firingLength = list.length : memory && (firingStart = start, 
                    fire(memory));
                }
                return this;
            },
            remove: function() {
                return list && jQuery.each(arguments, function(_, arg) {
                    for (var index; (index = jQuery.inArray(arg, list, index)) > -1; ) list.splice(index, 1), 
                    firing && (firingLength >= index && firingLength--, firingIndex >= index && firingIndex--);
                }), this;
            },
            has: function(fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : !(!list || !list.length);
            },
            empty: function() {
                return list = [], firingLength = 0, this;
            },
            disable: function() {
                return list = stack = memory = void 0, this;
            },
            disabled: function() {
                return !list;
            },
            lock: function() {
                return stack = void 0, memory || self.disable(), this;
            },
            locked: function() {
                return !stack;
            },
            fireWith: function(context, args) {
                return !list || fired && !stack || (args = args || [], args = [ context, args.slice ? args.slice() : args ], 
                firing ? stack.push(args) : fire(args)), this;
            },
            fire: function() {
                return self.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!fired;
            }
        };
        return self;
    }, jQuery.extend({
        Deferred: function(func) {
            var tuples = [ [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ], [ "notify", "progress", jQuery.Callbacks("memory") ] ], state = "pending", promise = {
                state: function() {
                    return state;
                },
                always: function() {
                    return deferred.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var fn = jQuery.isFunction(fns[i]) && fns[i];
                            deferred[tuple[1]](function() {
                                var returned = fn && fn.apply(this, arguments);
                                returned && jQuery.isFunction(returned.promise) ? returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify) : newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments);
                            });
                        }), fns = null;
                    }).promise();
                },
                promise: function(obj) {
                    return null != obj ? jQuery.extend(obj, promise) : promise;
                }
            }, deferred = {};
            return promise.pipe = promise.then, jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2], stateString = tuple[3];
                promise[tuple[1]] = list.add, stateString && list.add(function() {
                    state = stateString;
                }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = function() {
                    return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), 
                    this;
                }, deferred[tuple[0] + "With"] = list.fireWith;
            }), promise.promise(deferred), func && func.call(deferred, deferred), deferred;
        },
        when: function(subordinate) {
            var progressValues, progressContexts, resolveContexts, i = 0, resolveValues = slice.call(arguments), length = resolveValues.length, remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = 1 === remaining ? subordinate : jQuery.Deferred(), updateFunc = function(i, contexts, values) {
                return function(value) {
                    contexts[i] = this, values[i] = arguments.length > 1 ? slice.call(arguments) : value, 
                    values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values);
                };
            };
            if (length > 1) for (progressValues = new Array(length), progressContexts = new Array(length), 
            resolveContexts = new Array(length); length > i; i++) resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues)) : --remaining;
            return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise();
        }
    });
    var readyList;
    jQuery.fn.ready = function(fn) {
        return jQuery.ready.promise().done(fn), this;
    }, jQuery.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(hold) {
            hold ? jQuery.readyWait++ : jQuery.ready(!0);
        },
        ready: function(wait) {
            if (wait === !0 ? !--jQuery.readyWait : !jQuery.isReady) {
                if (!document.body) return setTimeout(jQuery.ready);
                jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [ jQuery ]), 
                jQuery.fn.triggerHandler && (jQuery(document).triggerHandler("ready"), jQuery(document).off("ready")));
            }
        }
    }), jQuery.ready.promise = function(obj) {
        if (!readyList) if (readyList = jQuery.Deferred(), "complete" === document.readyState) setTimeout(jQuery.ready); else if (document.addEventListener) document.addEventListener("DOMContentLoaded", completed, !1), 
        window.addEventListener("load", completed, !1); else {
            document.attachEvent("onreadystatechange", completed), window.attachEvent("onload", completed);
            var top = !1;
            try {
                top = null == window.frameElement && document.documentElement;
            } catch (e) {}
            top && top.doScroll && !function doScrollCheck() {
                if (!jQuery.isReady) {
                    try {
                        top.doScroll("left");
                    } catch (e) {
                        return setTimeout(doScrollCheck, 50);
                    }
                    detach(), jQuery.ready();
                }
            }();
        }
        return readyList.promise(obj);
    };
    var i, strundefined = "undefined";
    for (i in jQuery(support)) break;
    support.ownLast = "0" !== i, support.inlineBlockNeedsLayout = !1, jQuery(function() {
        var val, div, body, container;
        body = document.getElementsByTagName("body")[0], body && body.style && (div = document.createElement("div"), 
        container = document.createElement("div"), container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", 
        body.appendChild(container).appendChild(div), typeof div.style.zoom !== strundefined && (div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", 
        support.inlineBlockNeedsLayout = val = 3 === div.offsetWidth, val && (body.style.zoom = 1)), 
        body.removeChild(container));
    }), function() {
        var div = document.createElement("div");
        if (null == support.deleteExpando) {
            support.deleteExpando = !0;
            try {
                delete div.test;
            } catch (e) {
                support.deleteExpando = !1;
            }
        }
        div = null;
    }(), jQuery.acceptData = function(elem) {
        var noData = jQuery.noData[(elem.nodeName + " ").toLowerCase()], nodeType = +elem.nodeType || 1;
        return 1 !== nodeType && 9 !== nodeType ? !1 : !noData || noData !== !0 && elem.getAttribute("classid") === noData;
    };
    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /([A-Z])/g;
    jQuery.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(elem) {
            return elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando], 
            !!elem && !isEmptyDataObject(elem);
        },
        data: function(elem, name, data) {
            return internalData(elem, name, data);
        },
        removeData: function(elem, name) {
            return internalRemoveData(elem, name);
        },
        _data: function(elem, name, data) {
            return internalData(elem, name, data, !0);
        },
        _removeData: function(elem, name) {
            return internalRemoveData(elem, name, !0);
        }
    }), jQuery.fn.extend({
        data: function(key, value) {
            var i, name, data, elem = this[0], attrs = elem && elem.attributes;
            if (void 0 === key) {
                if (this.length && (data = jQuery.data(elem), 1 === elem.nodeType && !jQuery._data(elem, "parsedAttrs"))) {
                    for (i = attrs.length; i--; ) attrs[i] && (name = attrs[i].name, 0 === name.indexOf("data-") && (name = jQuery.camelCase(name.slice(5)), 
                    dataAttr(elem, name, data[name])));
                    jQuery._data(elem, "parsedAttrs", !0);
                }
                return data;
            }
            return "object" == typeof key ? this.each(function() {
                jQuery.data(this, key);
            }) : arguments.length > 1 ? this.each(function() {
                jQuery.data(this, key, value);
            }) : elem ? dataAttr(elem, key, jQuery.data(elem, key)) : void 0;
        },
        removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key);
            });
        }
    }), jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            return elem ? (type = (type || "fx") + "queue", queue = jQuery._data(elem, type), 
            data && (!queue || jQuery.isArray(data) ? queue = jQuery._data(elem, type, jQuery.makeArray(data)) : queue.push(data)), 
            queue || []) : void 0;
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
                jQuery.dequeue(elem, type);
            };
            "inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"), 
            delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire();
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    jQuery._removeData(elem, type + "queue"), jQuery._removeData(elem, key);
                })
            });
        }
    }), jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type);
            });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },
        promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                --count || defer.resolveWith(elements, [ elements ]);
            };
            for ("string" != typeof type && (obj = type, type = void 0), type = type || "fx"; i--; ) tmp = jQuery._data(elements[i], type + "queueHooks"), 
            tmp && tmp.empty && (count++, tmp.empty.add(resolve));
            return resolve(), defer.promise(obj);
        }
    });
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, cssExpand = [ "Top", "Right", "Bottom", "Left" ], isHidden = function(elem, el) {
        return elem = el || elem, "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem);
    }, access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0, length = elems.length, bulk = null == key;
        if ("object" === jQuery.type(key)) {
            chainable = !0;
            for (i in key) jQuery.access(elems, fn, i, key[i], !0, emptyGet, raw);
        } else if (void 0 !== value && (chainable = !0, jQuery.isFunction(value) || (raw = !0), 
        bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value);
        })), fn)) for (;length > i; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
    }, rcheckableType = /^(?:checkbox|radio)$/i;
    !function() {
        var input = document.createElement("input"), div = document.createElement("div"), fragment = document.createDocumentFragment();
        if (div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        support.leadingWhitespace = 3 === div.firstChild.nodeType, support.tbody = !div.getElementsByTagName("tbody").length, 
        support.htmlSerialize = !!div.getElementsByTagName("link").length, support.html5Clone = "<:nav></:nav>" !== document.createElement("nav").cloneNode(!0).outerHTML, 
        input.type = "checkbox", input.checked = !0, fragment.appendChild(input), support.appendChecked = input.checked, 
        div.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !!div.cloneNode(!0).lastChild.defaultValue, 
        fragment.appendChild(div), div.innerHTML = "<input type='radio' checked='checked' name='t'/>", 
        support.checkClone = div.cloneNode(!0).cloneNode(!0).lastChild.checked, support.noCloneEvent = !0, 
        div.attachEvent && (div.attachEvent("onclick", function() {
            support.noCloneEvent = !1;
        }), div.cloneNode(!0).click()), null == support.deleteExpando) {
            support.deleteExpando = !0;
            try {
                delete div.test;
            } catch (e) {
                support.deleteExpando = !1;
            }
        }
    }(), function() {
        var i, eventName, div = document.createElement("div");
        for (i in {
            submit: !0,
            change: !0,
            focusin: !0
        }) eventName = "on" + i, (support[i + "Bubbles"] = eventName in window) || (div.setAttribute(eventName, "t"), 
        support[i + "Bubbles"] = div.attributes[eventName].expando === !1);
        div = null;
    }();
    var rformElems = /^(?:input|select|textarea)$/i, rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var tmp, events, t, handleObjIn, special, eventHandle, handleObj, handlers, type, namespaces, origType, elemData = jQuery._data(elem);
            if (elemData) {
                for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, selector = handleObjIn.selector), 
                handler.guid || (handler.guid = jQuery.guid++), (events = elemData.events) || (events = elemData.events = {}), 
                (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                    return typeof jQuery === strundefined || e && jQuery.event.triggered === e.type ? void 0 : jQuery.event.dispatch.apply(eventHandle.elem, arguments);
                }, eventHandle.elem = elem), types = (types || "").match(rnotwhite) || [ "" ], t = types.length; t--; ) tmp = rtypenamespace.exec(types[t]) || [], 
                type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type && (special = jQuery.event.special[type] || {}, 
                type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, 
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0, 
                special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || (elem.addEventListener ? elem.addEventListener(type, eventHandle, !1) : elem.attachEvent && elem.attachEvent("on" + type, eventHandle))), 
                special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), 
                selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), 
                jQuery.event.global[type] = !0);
                elem = null;
            }
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, handleObj, tmp, origCount, t, events, special, handlers, type, namespaces, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem);
            if (elemData && (events = elemData.events)) {
                for (types = (types || "").match(rnotwhite) || [ "" ], t = types.length; t--; ) if (tmp = rtypenamespace.exec(types[t]) || [], 
                type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
                    for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, 
                    handlers = events[type] || [], tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"), 
                    origCount = j = handlers.length; j--; ) handleObj = handlers[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1), 
                    handleObj.selector && handlers.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                    origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), 
                    delete events[type]);
                } else for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                jQuery.isEmptyObject(events) && (delete elemData.handle, jQuery._removeData(elem, "events"));
            }
        },
        trigger: function(event, data, elem, onlyHandlers) {
            var handle, ontype, cur, bubbleType, special, tmp, i, eventPath = [ elem || document ], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") >= 0 && (namespaces = type.split("."), 
            type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, 
            event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), 
            event.isTrigger = onlyHandlers ? 2 : 3, event.namespace = namespaces.join("."), 
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            event.result = void 0, event.target || (event.target = elem), data = null == data ? [ event ] : jQuery.makeArray(data, [ event ]), 
            special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
                if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                    for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur), 
                    tmp = cur;
                    tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
                for (i = 0; (cur = eventPath[i++]) && !event.isPropagationStopped(); ) event.type = i > 1 ? bubbleType : special.bindType || type, 
                handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle"), 
                handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && handle.apply && jQuery.acceptData(cur) && (event.result = handle.apply(cur, data), 
                event.result === !1 && event.preventDefault());
                if (event.type = type, !onlyHandlers && !event.isDefaultPrevented() && (!special._default || special._default.apply(eventPath.pop(), data) === !1) && jQuery.acceptData(elem) && ontype && elem[type] && !jQuery.isWindow(elem)) {
                    tmp = elem[ontype], tmp && (elem[ontype] = null), jQuery.event.triggered = type;
                    try {
                        elem[type]();
                    } catch (e) {}
                    jQuery.event.triggered = void 0, tmp && (elem[ontype] = tmp);
                }
                return event.result;
            }
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event);
            var i, ret, handleObj, matched, j, handlerQueue = [], args = slice.call(arguments), handlers = (jQuery._data(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
            if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                for (handlerQueue = jQuery.event.handlers.call(this, event, handlers), i = 0; (matched = handlerQueue[i++]) && !event.isPropagationStopped(); ) for (event.currentTarget = matched.elem, 
                j = 0; (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped(); ) (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) && (event.handleObj = handleObj, 
                event.data = handleObj.data, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), 
                void 0 !== ret && (event.result = ret) === !1 && (event.preventDefault(), event.stopPropagation()));
                return special.postDispatch && special.postDispatch.call(this, event), event.result;
            }
        },
        handlers: function(event, handlers) {
            var sel, handleObj, matches, i, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && cur.nodeType && (!event.button || "click" !== event.type)) for (;cur != this; cur = cur.parentNode || this) if (1 === cur.nodeType && (cur.disabled !== !0 || "click" !== event.type)) {
                for (matches = [], i = 0; delegateCount > i; i++) handleObj = handlers[i], sel = handleObj.selector + " ", 
                void 0 === matches[sel] && (matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [ cur ]).length), 
                matches[sel] && matches.push(handleObj);
                matches.length && handlerQueue.push({
                    elem: cur,
                    handlers: matches
                });
            }
            return delegateCount < handlers.length && handlerQueue.push({
                elem: this,
                handlers: handlers.slice(delegateCount)
            }), handlerQueue;
        },
        fix: function(event) {
            if (event[jQuery.expando]) return event;
            var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
            for (fixHook || (this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}), 
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props, event = new jQuery.Event(originalEvent), 
            i = copy.length; i--; ) prop = copy[i], event[prop] = originalEvent[prop];
            return event.target || (event.target = originalEvent.srcElement || document), 3 === event.target.nodeType && (event.target = event.target.parentNode), 
            event.metaKey = !!event.metaKey, fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode), 
                event;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var body, eventDoc, doc, button = original.button, fromElement = original.fromElement;
                return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, 
                doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), 
                event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), 
                !event.relatedTarget && fromElement && (event.relatedTarget = fromElement === event.target ? original.toElement : fromElement), 
                event.which || void 0 === button || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), 
                event;
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) try {
                        return this.focus(), !1;
                    } catch (e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === safeActiveElement() && this.blur ? (this.blur(), !1) : void 0;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return jQuery.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), 
                    !1) : void 0;
                },
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    void 0 !== event.result && event.originalEvent && (event.originalEvent.returnValue = event.result);
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: !0,
                originalEvent: {}
            });
            bubble ? jQuery.event.trigger(e, null, elem) : jQuery.event.dispatch.call(elem, e), 
            e.isDefaultPrevented() && event.preventDefault();
        }
    }, jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle) {
        elem.removeEventListener && elem.removeEventListener(type, handle, !1);
    } : function(elem, type, handle) {
        var name = "on" + type;
        elem.detachEvent && (typeof elem[name] === strundefined && (elem[name] = null), 
        elem.detachEvent(name, handle));
    }, jQuery.Event = function(src, props) {
        return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, 
        this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && src.returnValue === !1 ? returnTrue : returnFalse) : this.type = src, 
        props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), 
        void (this[jQuery.expando] = !0)) : new jQuery.Event(src, props);
    }, jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue, e && (e.stopPropagation && e.stopPropagation(), 
            e.cancelBubble = !0);
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), 
            this.stopPropagation();
        }
    }, jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                return (!related || related !== target && !jQuery.contains(target, related)) && (event.type = handleObj.origType, 
                ret = handleObj.handler.apply(this, arguments), event.type = fix), ret;
            }
        };
    }), support.submitBubbles || (jQuery.event.special.submit = {
        setup: function() {
            return jQuery.nodeName(this, "form") ? !1 : void jQuery.event.add(this, "click._submit keypress._submit", function(e) {
                var elem = e.target, form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : void 0;
                form && !jQuery._data(form, "submitBubbles") && (jQuery.event.add(form, "submit._submit", function(event) {
                    event._submit_bubble = !0;
                }), jQuery._data(form, "submitBubbles", !0));
            });
        },
        postDispatch: function(event) {
            event._submit_bubble && (delete event._submit_bubble, this.parentNode && !event.isTrigger && jQuery.event.simulate("submit", this.parentNode, event, !0));
        },
        teardown: function() {
            return jQuery.nodeName(this, "form") ? !1 : void jQuery.event.remove(this, "._submit");
        }
    }), support.changeBubbles || (jQuery.event.special.change = {
        setup: function() {
            return rformElems.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (jQuery.event.add(this, "propertychange._change", function(event) {
                "checked" === event.originalEvent.propertyName && (this._just_changed = !0);
            }), jQuery.event.add(this, "click._change", function(event) {
                this._just_changed && !event.isTrigger && (this._just_changed = !1), jQuery.event.simulate("change", this, event, !0);
            })), !1) : void jQuery.event.add(this, "beforeactivate._change", function(e) {
                var elem = e.target;
                rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles") && (jQuery.event.add(elem, "change._change", function(event) {
                    !this.parentNode || event.isSimulated || event.isTrigger || jQuery.event.simulate("change", this.parentNode, event, !0);
                }), jQuery._data(elem, "changeBubbles", !0));
            });
        },
        handle: function(event) {
            var elem = event.target;
            return this !== elem || event.isSimulated || event.isTrigger || "radio" !== elem.type && "checkbox" !== elem.type ? event.handleObj.handler.apply(this, arguments) : void 0;
        },
        teardown: function() {
            return jQuery.event.remove(this, "._change"), !rformElems.test(this.nodeName);
        }
    }), support.focusinBubbles || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function(orig, fix) {
        var handler = function(event) {
            jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0);
        };
        jQuery.event.special[fix] = {
            setup: function() {
                var doc = this.ownerDocument || this, attaches = jQuery._data(doc, fix);
                attaches || doc.addEventListener(orig, handler, !0), jQuery._data(doc, fix, (attaches || 0) + 1);
            },
            teardown: function() {
                var doc = this.ownerDocument || this, attaches = jQuery._data(doc, fix) - 1;
                attaches ? jQuery._data(doc, fix, attaches) : (doc.removeEventListener(orig, handler, !0), 
                jQuery._removeData(doc, fix));
            }
        };
    }), jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var type, origFn;
            if ("object" == typeof types) {
                "string" != typeof selector && (data = data || selector, selector = void 0);
                for (type in types) this.on(type, selector, data, types[type], one);
                return this;
            }
            if (null == data && null == fn ? (fn = selector, data = selector = void 0) : null == fn && ("string" == typeof selector ? (fn = data, 
            data = void 0) : (fn = data, data = selector, selector = void 0)), fn === !1) fn = returnFalse; else if (!fn) return this;
            return 1 === one && (origFn = fn, fn = function(event) {
                return jQuery().off(event), origFn.apply(this, arguments);
            }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), this.each(function() {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, 
            jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), 
            this;
            if ("object" == typeof types) {
                for (type in types) this.off(type, selector, types[type]);
                return this;
            }
            return (selector === !1 || "function" == typeof selector) && (fn = selector, selector = void 0), 
            fn === !1 && (fn = returnFalse), this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            return elem ? jQuery.event.trigger(type, data, elem, !0) : void 0;
        }
    });
    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g, rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"), rleadingWhitespace = /^\s+/, rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rtbody = /<tbody/i, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /^$|\/(?:java|ecma)script/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, wrapMap = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        area: [ 1, "<map>", "</map>" ],
        param: [ 1, "<object>", "</object>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
    }, safeFragment = createSafeFragment(document), fragmentDiv = safeFragment.appendChild(document.createElement("div"));
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, 
    wrapMap.th = wrapMap.td, jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var destElements, node, clone, i, srcElements, inPage = jQuery.contains(elem.ownerDocument, elem);
            if (support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">") ? clone = elem.cloneNode(!0) : (fragmentDiv.innerHTML = elem.outerHTML, 
            fragmentDiv.removeChild(clone = fragmentDiv.firstChild)), !(support.noCloneEvent && support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem))) for (destElements = getAll(clone), 
            srcElements = getAll(elem), i = 0; null != (node = srcElements[i]); ++i) destElements[i] && fixCloneNodeIssues(node, destElements[i]);
            if (dataAndEvents) if (deepDataAndEvents) for (srcElements = srcElements || getAll(elem), 
            destElements = destElements || getAll(clone), i = 0; null != (node = srcElements[i]); i++) cloneCopyEvent(node, destElements[i]); else cloneCopyEvent(elem, clone);
            return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), 
            destElements = srcElements = node = null, clone;
        },
        buildFragment: function(elems, context, scripts, selection) {
            for (var j, elem, contains, tmp, tag, tbody, wrap, l = elems.length, safe = createSafeFragment(context), nodes = [], i = 0; l > i; i++) if (elem = elems[i], 
            elem || 0 === elem) if ("object" === jQuery.type(elem)) jQuery.merge(nodes, elem.nodeType ? [ elem ] : elem); else if (rhtml.test(elem)) {
                for (tmp = tmp || safe.appendChild(context.createElement("div")), tag = (rtagName.exec(elem) || [ "", "" ])[1].toLowerCase(), 
                wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2], 
                j = wrap[0]; j--; ) tmp = tmp.lastChild;
                if (!support.leadingWhitespace && rleadingWhitespace.test(elem) && nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0])), 
                !support.tbody) for (elem = "table" !== tag || rtbody.test(elem) ? "<table>" !== wrap[1] || rtbody.test(elem) ? 0 : tmp : tmp.firstChild, 
                j = elem && elem.childNodes.length; j--; ) jQuery.nodeName(tbody = elem.childNodes[j], "tbody") && !tbody.childNodes.length && elem.removeChild(tbody);
                for (jQuery.merge(nodes, tmp.childNodes), tmp.textContent = ""; tmp.firstChild; ) tmp.removeChild(tmp.firstChild);
                tmp = safe.lastChild;
            } else nodes.push(context.createTextNode(elem));
            for (tmp && safe.removeChild(tmp), support.appendChecked || jQuery.grep(getAll(nodes, "input"), fixDefaultChecked), 
            i = 0; elem = nodes[i++]; ) if ((!selection || -1 === jQuery.inArray(elem, selection)) && (contains = jQuery.contains(elem.ownerDocument, elem), 
            tmp = getAll(safe.appendChild(elem), "script"), contains && setGlobalEval(tmp), 
            scripts)) for (j = 0; elem = tmp[j++]; ) rscriptType.test(elem.type || "") && scripts.push(elem);
            return tmp = null, safe;
        },
        cleanData: function(elems, acceptData) {
            for (var elem, type, id, data, i = 0, internalKey = jQuery.expando, cache = jQuery.cache, deleteExpando = support.deleteExpando, special = jQuery.event.special; null != (elem = elems[i]); i++) if ((acceptData || jQuery.acceptData(elem)) && (id = elem[internalKey], 
            data = id && cache[id])) {
                if (data.events) for (type in data.events) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                cache[id] && (delete cache[id], deleteExpando ? delete elem[internalKey] : typeof elem.removeAttribute !== strundefined ? elem.removeAttribute(internalKey) : elem[internalKey] = null, 
                deletedIds.push(id));
            }
        }
    }), jQuery.fn.extend({
        text: function(value) {
            return access(this, function(value) {
                return void 0 === value ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
            }, null, value, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this);
            });
        },
        after: function() {
            return this.domManip(arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling);
            });
        },
        remove: function(selector, keepData) {
            for (var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0; null != (elem = elems[i]); i++) keepData || 1 !== elem.nodeType || jQuery.cleanData(getAll(elem)), 
            elem.parentNode && (keepData && jQuery.contains(elem.ownerDocument, elem) && setGlobalEval(getAll(elem, "script")), 
            elem.parentNode.removeChild(elem));
            return this;
        },
        empty: function() {
            for (var elem, i = 0; null != (elem = this[i]); i++) {
                for (1 === elem.nodeType && jQuery.cleanData(getAll(elem, !1)); elem.firstChild; ) elem.removeChild(elem.firstChild);
                elem.options && jQuery.nodeName(elem, "select") && (elem.options.length = 0);
            }
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            return dataAndEvents = null == dataAndEvents ? !1 : dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, 
            this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {}, i = 0, l = this.length;
                if (void 0 === value) return 1 === elem.nodeType ? elem.innerHTML.replace(rinlinejQuery, "") : void 0;
                if ("string" == typeof value && !rnoInnerhtml.test(value) && (support.htmlSerialize || !rnoshimcache.test(value)) && (support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || [ "", "" ])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (;l > i; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), 
                        elem.innerHTML = value);
                        elem = 0;
                    } catch (e) {}
                }
                elem && this.empty().append(value);
            }, null, value, arguments.length);
        },
        replaceWith: function() {
            var arg = arguments[0];
            return this.domManip(arguments, function(elem) {
                arg = this.parentNode, jQuery.cleanData(getAll(this)), arg && arg.replaceChild(elem, this);
            }), arg && (arg.length || arg.nodeType) ? this : this.remove();
        },
        detach: function(selector) {
            return this.remove(selector, !0);
        },
        domManip: function(args, callback) {
            args = concat.apply([], args);
            var first, node, hasScripts, scripts, doc, fragment, i = 0, l = this.length, set = this, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
            if (isFunction || l > 1 && "string" == typeof value && !support.checkClone && rchecked.test(value)) return this.each(function(index) {
                var self = set.eq(index);
                isFunction && (args[0] = value.call(this, index, self.html())), self.domManip(args, callback);
            });
            if (l && (fragment = jQuery.buildFragment(args, this[0].ownerDocument, !1, this), 
            first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), 
            first)) {
                for (scripts = jQuery.map(getAll(fragment, "script"), disableScript), hasScripts = scripts.length; l > i; i++) node = fragment, 
                i !== iNoClone && (node = jQuery.clone(node, !0, !0), hasScripts && jQuery.merge(scripts, getAll(node, "script"))), 
                callback.call(this[i], node, i);
                if (hasScripts) for (doc = scripts[scripts.length - 1].ownerDocument, jQuery.map(scripts, restoreScript), 
                i = 0; hasScripts > i; i++) node = scripts[i], rscriptType.test(node.type || "") && !jQuery._data(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery._evalUrl && jQuery._evalUrl(node.src) : jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, "")));
                fragment = first = null;
            }
            return this;
        }
    }), jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            for (var elems, i = 0, ret = [], insert = jQuery(selector), last = insert.length - 1; last >= i; i++) elems = i === last ? this : this.clone(!0), 
            jQuery(insert[i])[original](elems), push.apply(ret, elems.get());
            return this.pushStack(ret);
        };
    });
    var iframe, elemdisplay = {};
    !function() {
        var shrinkWrapBlocksVal;
        support.shrinkWrapBlocks = function() {
            if (null != shrinkWrapBlocksVal) return shrinkWrapBlocksVal;
            shrinkWrapBlocksVal = !1;
            var div, body, container;
            return body = document.getElementsByTagName("body")[0], body && body.style ? (div = document.createElement("div"), 
            container = document.createElement("div"), container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", 
            body.appendChild(container).appendChild(div), typeof div.style.zoom !== strundefined && (div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", 
            div.appendChild(document.createElement("div")).style.width = "5px", shrinkWrapBlocksVal = 3 !== div.offsetWidth), 
            body.removeChild(container), shrinkWrapBlocksVal) : void 0;
        };
    }();
    var getStyles, curCSS, rmargin = /^margin/, rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"), rposition = /^(top|right|bottom|left)$/;
    window.getComputedStyle ? (getStyles = function(elem) {
        return elem.ownerDocument.defaultView.opener ? elem.ownerDocument.defaultView.getComputedStyle(elem, null) : window.getComputedStyle(elem, null);
    }, curCSS = function(elem, name, computed) {
        var width, minWidth, maxWidth, ret, style = elem.style;
        return computed = computed || getStyles(elem), ret = computed ? computed.getPropertyValue(name) || computed[name] : void 0, 
        computed && ("" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), 
        rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, 
        maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, 
        ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), 
        void 0 === ret ? ret : ret + "";
    }) : document.documentElement.currentStyle && (getStyles = function(elem) {
        return elem.currentStyle;
    }, curCSS = function(elem, name, computed) {
        var left, rs, rsLeft, ret, style = elem.style;
        return computed = computed || getStyles(elem), ret = computed ? computed[name] : void 0, 
        null == ret && style && style[name] && (ret = style[name]), rnumnonpx.test(ret) && !rposition.test(name) && (left = style.left, 
        rs = elem.runtimeStyle, rsLeft = rs && rs.left, rsLeft && (rs.left = elem.currentStyle.left), 
        style.left = "fontSize" === name ? "1em" : ret, ret = style.pixelLeft + "px", style.left = left, 
        rsLeft && (rs.left = rsLeft)), void 0 === ret ? ret : ret + "" || "auto";
    }), function() {
        function computeStyleTests() {
            var div, body, container, contents;
            body = document.getElementsByTagName("body")[0], body && body.style && (div = document.createElement("div"), 
            container = document.createElement("div"), container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", 
            body.appendChild(container).appendChild(div), div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", 
            pixelPositionVal = boxSizingReliableVal = !1, reliableMarginRightVal = !0, window.getComputedStyle && (pixelPositionVal = "1%" !== (window.getComputedStyle(div, null) || {}).top, 
            boxSizingReliableVal = "4px" === (window.getComputedStyle(div, null) || {
                width: "4px"
            }).width, contents = div.appendChild(document.createElement("div")), contents.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", 
            contents.style.marginRight = contents.style.width = "0", div.style.width = "1px", 
            reliableMarginRightVal = !parseFloat((window.getComputedStyle(contents, null) || {}).marginRight), 
            div.removeChild(contents)), div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", 
            contents = div.getElementsByTagName("td"), contents[0].style.cssText = "margin:0;border:0;padding:0;display:none", 
            reliableHiddenOffsetsVal = 0 === contents[0].offsetHeight, reliableHiddenOffsetsVal && (contents[0].style.display = "", 
            contents[1].style.display = "none", reliableHiddenOffsetsVal = 0 === contents[0].offsetHeight), 
            body.removeChild(container));
        }
        var div, style, a, pixelPositionVal, boxSizingReliableVal, reliableHiddenOffsetsVal, reliableMarginRightVal;
        div = document.createElement("div"), div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        a = div.getElementsByTagName("a")[0], style = a && a.style, style && (style.cssText = "float:left;opacity:.5", 
        support.opacity = "0.5" === style.opacity, support.cssFloat = !!style.cssFloat, 
        div.style.backgroundClip = "content-box", div.cloneNode(!0).style.backgroundClip = "", 
        support.clearCloneStyle = "content-box" === div.style.backgroundClip, support.boxSizing = "" === style.boxSizing || "" === style.MozBoxSizing || "" === style.WebkitBoxSizing, 
        jQuery.extend(support, {
            reliableHiddenOffsets: function() {
                return null == reliableHiddenOffsetsVal && computeStyleTests(), reliableHiddenOffsetsVal;
            },
            boxSizingReliable: function() {
                return null == boxSizingReliableVal && computeStyleTests(), boxSizingReliableVal;
            },
            pixelPosition: function() {
                return null == pixelPositionVal && computeStyleTests(), pixelPositionVal;
            },
            reliableMarginRight: function() {
                return null == reliableMarginRightVal && computeStyleTests(), reliableMarginRightVal;
            }
        }));
    }(), jQuery.swap = function(elem, options, callback, args) {
        var ret, name, old = {};
        for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
        ret = callback.apply(elem, args || []);
        for (name in options) elem.style[name] = old[name];
        return ret;
    };
    var ralpha = /alpha\([^)]*\)/i, ropacity = /opacity\s*=\s*([^)]*)/, rdisplayswap = /^(none|table(?!-c[ea]).+)/, rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"), rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"), cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
    }, cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return "" === ret ? "1" : ret;
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
            "float": support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(elem, name, value, extra) {
            if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
                if (name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), 
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], void 0 === value) return hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, !1, extra)) ? ret : style[name];
                if (type = typeof value, "string" === type && (ret = rrelNum.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name)), 
                type = "number"), null != value && value === value && ("number" !== type || jQuery.cssNumber[origName] || (value += "px"), 
                support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"), 
                !(hooks && "set" in hooks && void 0 === (value = hooks.set(elem, value, extra))))) try {
                    style[name] = value;
                } catch (e) {}
            }
        },
        css: function(elem, name, extra, styles) {
            var num, val, hooks, origName = jQuery.camelCase(name);
            return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)), 
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), 
            void 0 === val && (val = curCSS(elem, name, styles)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), 
            "" === extra || extra ? (num = parseFloat(val), extra === !0 || jQuery.isNumeric(num) ? num || 0 : val) : val;
        }
    }), jQuery.each([ "height", "width" ], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                return computed ? rdisplayswap.test(jQuery.css(elem, "display")) && 0 === elem.offsetWidth ? jQuery.swap(elem, cssShow, function() {
                    return getWidthOrHeight(elem, name, extra);
                }) : getWidthOrHeight(elem, name, extra) : void 0;
            },
            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles) : 0);
            }
        };
    }), support.opacity || (jQuery.cssHooks.opacity = {
        get: function(elem, computed) {
            return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : computed ? "1" : "";
        },
        set: function(elem, value) {
            var style = elem.style, currentStyle = elem.currentStyle, opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + 100 * value + ")" : "", filter = currentStyle && currentStyle.filter || style.filter || "";
            style.zoom = 1, (value >= 1 || "" === value) && "" === jQuery.trim(filter.replace(ralpha, "")) && style.removeAttribute && (style.removeAttribute("filter"), 
            "" === value || currentStyle && !currentStyle.filter) || (style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity);
        }
    }), jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
        return computed ? jQuery.swap(elem, {
            display: "inline-block"
        }, curCSS, [ elem, "marginRight" ]) : void 0;
    }), jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [ value ]; 4 > i; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                return expanded;
            }
        }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber);
    }), jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles, len, map = {}, i = 0;
                if (jQuery.isArray(name)) {
                    for (styles = getStyles(elem), len = name.length; len > i; i++) map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                    return map;
                }
                return void 0 !== value ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function() {
            return showHide(this, !0);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state) {
            return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
                isHidden(this) ? jQuery(this).show() : jQuery(this).hide();
            });
        }
    }), jQuery.Tween = Tween, Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem, this.prop = prop, this.easing = easing || "swing", this.options = options, 
            this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            return this.options.duration ? this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : this.pos = eased = percent, 
            this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this;
        }
    }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                return null == tween.elem[tween.prop] || tween.elem.style && null != tween.elem.style[tween.prop] ? (result = jQuery.css(tween.elem, tween.prop, ""), 
                result && "auto" !== result ? result : 0) : tween.elem[tween.prop];
            },
            set: function(tween) {
                jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop]) ? jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) : tween.elem[tween.prop] = tween.now;
            }
        }
    }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now);
        }
    }, jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2;
        }
    }, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"), rrun = /queueHooks$/, animationPrefilters = [ defaultPrefilter ], tweeners = {
        "*": [ function(prop, value) {
            var tween = this.createTween(prop, value), target = tween.cur(), parts = rfxnum.exec(value), unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"), start = (jQuery.cssNumber[prop] || "px" !== unit && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)), scale = 1, maxIterations = 20;
            if (start && start[3] !== unit) {
                unit = unit || start[3], parts = parts || [], start = +target || 1;
                do scale = scale || ".5", start /= scale, jQuery.style(tween.elem, prop, start + unit); while (scale !== (scale = tween.cur() / target) && 1 !== scale && --maxIterations);
            }
            return parts && (start = tween.start = +start || +target || 0, tween.unit = unit, 
            tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]), tween;
        } ]
    };
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            jQuery.isFunction(props) ? (callback = props, props = [ "*" ]) : props = props.split(" ");
            for (var prop, index = 0, length = props.length; length > index; index++) prop = props[index], 
            tweeners[prop] = tweeners[prop] || [], tweeners[prop].unshift(callback);
        },
        prefilter: function(callback, prepend) {
            prepend ? animationPrefilters.unshift(callback) : animationPrefilters.push(callback);
        }
    }), jQuery.speed = function(speed, easing, fn) {
        var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, 
        (null == opt.queue || opt.queue === !0) && (opt.queue = "fx"), opt.old = opt.complete, 
        opt.complete = function() {
            jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue);
        }, opt;
    }, jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                (empty || jQuery._data(this, "finish")) && anim.stop(!0);
            };
            return doAnimation.finish = doAnimation, empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop, stop(gotoEnd);
            };
            return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = void 0), 
            clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function() {
                var dequeue = !0, index = null != type && type + "queueHooks", timers = jQuery.timers, data = jQuery._data(this);
                if (index) data[index] && data[index].stop && stopQueue(data[index]); else for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                for (index = timers.length; index--; ) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), 
                dequeue = !1, timers.splice(index, 1));
                (dequeue || !gotoEnd) && jQuery.dequeue(this, type);
            });
        },
        finish: function(type) {
            return type !== !1 && (type = type || "fx"), this.each(function() {
                var index, data = jQuery._data(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                for (data.finish = !0, jQuery.queue(this, type, []), hooks && hooks.stop && hooks.stop.call(this, !0), 
                index = timers.length; index--; ) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0), 
                timers.splice(index, 1));
                for (index = 0; length > index; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
                delete data.finish;
            });
        }
    }), jQuery.each([ "toggle", "show", "hide" ], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback);
        };
    }), jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    }), jQuery.timers = [], jQuery.fx.tick = function() {
        var timer, timers = jQuery.timers, i = 0;
        for (fxNow = jQuery.now(); i < timers.length; i++) timer = timers[i], timer() || timers[i] !== timer || timers.splice(i--, 1);
        timers.length || jQuery.fx.stop(), fxNow = void 0;
    }, jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer), timer() ? jQuery.fx.start() : jQuery.timers.pop();
    }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
        timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval));
    }, jQuery.fx.stop = function() {
        clearInterval(timerId), timerId = null;
    }, jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, jQuery.fn.delay = function(time, type) {
        return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", 
        this.queue(type, function(next, hooks) {
            var timeout = setTimeout(next, time);
            hooks.stop = function() {
                clearTimeout(timeout);
            };
        });
    }, function() {
        var input, div, select, a, opt;
        div = document.createElement("div"), div.setAttribute("className", "t"), div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        a = div.getElementsByTagName("a")[0], select = document.createElement("select"), 
        opt = select.appendChild(document.createElement("option")), input = div.getElementsByTagName("input")[0], 
        a.style.cssText = "top:1px", support.getSetAttribute = "t" !== div.className, support.style = /top/.test(a.getAttribute("style")), 
        support.hrefNormalized = "/a" === a.getAttribute("href"), support.checkOn = !!input.value, 
        support.optSelected = opt.selected, support.enctype = !!document.createElement("form").enctype, 
        select.disabled = !0, support.optDisabled = !opt.disabled, input = document.createElement("input"), 
        input.setAttribute("value", ""), support.input = "" === input.getAttribute("value"), 
        input.value = "t", input.setAttribute("type", "radio"), support.radioValue = "t" === input.value;
    }();
    var rreturn = /\r/g;
    jQuery.fn.extend({
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            {
                if (arguments.length) return isFunction = jQuery.isFunction(value), this.each(function(i) {
                    var val;
                    1 === this.nodeType && (val = isFunction ? value.call(this, i, jQuery(this).val()) : value, 
                    null == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
                        return null == value ? "" : value + "";
                    })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], 
                    hooks && "set" in hooks && void 0 !== hooks.set(this, val, "value") || (this.value = val));
                });
                if (elem) return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], 
                hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, "value")) ? ret : (ret = elem.value, 
                "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret);
            }
        }
    }), jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return null != val ? val : jQuery.trim(jQuery.text(elem));
                }
            },
            select: {
                get: function(elem) {
                    for (var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || 0 > index, values = one ? null : [], max = one ? index + 1 : options.length, i = 0 > index ? max : one ? index : 0; max > i; i++) if (option = options[i], 
                    (option.selected || i === index) && (support.optDisabled ? !option.disabled : null === option.getAttribute("disabled")) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                        if (value = jQuery(option).val(), one) return value;
                        values.push(value);
                    }
                    return values;
                },
                set: function(elem, value) {
                    for (var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length; i--; ) if (option = options[i], 
                    jQuery.inArray(jQuery.valHooks.option.get(option), values) >= 0) try {
                        option.selected = optionSet = !0;
                    } catch (_) {
                        option.scrollHeight;
                    } else option.selected = !1;
                    return optionSet || (elem.selectedIndex = -1), options;
                }
            }
        }
    }), jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                return jQuery.isArray(value) ? elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0 : void 0;
            }
        }, support.checkOn || (jQuery.valHooks[this].get = function(elem) {
            return null === elem.getAttribute("value") ? "on" : elem.value;
        });
    });
    var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle, ruseDefault = /^(?:checked|selected)$/i, getSetAttribute = support.getSetAttribute, getSetInput = support.input;
    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        }
    }), jQuery.extend({
        attr: function(elem, name, value) {
            var hooks, ret, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return typeof elem.getAttribute === strundefined ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(), 
            hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)), 
            void 0 === value ? hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : (ret = jQuery.find.attr(elem, name), 
            null == ret ? void 0 : ret) : null !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : (elem.setAttribute(name, value + ""), 
            value) : void jQuery.removeAttr(elem, name));
        },
        removeAttr: function(elem, value) {
            var name, propName, i = 0, attrNames = value && value.match(rnotwhite);
            if (attrNames && 1 === elem.nodeType) for (;name = attrNames[i++]; ) propName = jQuery.propFix[name] || name, 
            jQuery.expr.match.bool.test(name) ? getSetInput && getSetAttribute || !ruseDefault.test(name) ? elem[propName] = !1 : elem[jQuery.camelCase("default-" + name)] = elem[propName] = !1 : jQuery.attr(elem, name, ""), 
            elem.removeAttribute(getSetAttribute ? name : propName);
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        return elem.setAttribute("type", value), val && (elem.value = val), value;
                    }
                }
            }
        }
    }), boolHook = {
        set: function(elem, value, name) {
            return value === !1 ? jQuery.removeAttr(elem, name) : getSetInput && getSetAttribute || !ruseDefault.test(name) ? elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name) : elem[jQuery.camelCase("default-" + name)] = elem[name] = !0, 
            name;
        }
    }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = getSetInput && getSetAttribute || !ruseDefault.test(name) ? function(elem, name, isXML) {
            var ret, handle;
            return isXML || (handle = attrHandle[name], attrHandle[name] = ret, ret = null != getter(elem, name, isXML) ? name.toLowerCase() : null, 
            attrHandle[name] = handle), ret;
        } : function(elem, name, isXML) {
            return isXML ? void 0 : elem[jQuery.camelCase("default-" + name)] ? name.toLowerCase() : null;
        };
    }), getSetInput && getSetAttribute || (jQuery.attrHooks.value = {
        set: function(elem, value, name) {
            return jQuery.nodeName(elem, "input") ? void (elem.defaultValue = value) : nodeHook && nodeHook.set(elem, value, name);
        }
    }), getSetAttribute || (nodeHook = {
        set: function(elem, value, name) {
            var ret = elem.getAttributeNode(name);
            return ret || elem.setAttributeNode(ret = elem.ownerDocument.createAttribute(name)), 
            ret.value = value += "", "value" === name || value === elem.getAttribute(name) ? value : void 0;
        }
    }, attrHandle.id = attrHandle.name = attrHandle.coords = function(elem, name, isXML) {
        var ret;
        return isXML ? void 0 : (ret = elem.getAttributeNode(name)) && "" !== ret.value ? ret.value : null;
    }, jQuery.valHooks.button = {
        get: function(elem, name) {
            var ret = elem.getAttributeNode(name);
            return ret && ret.specified ? ret.value : void 0;
        },
        set: nodeHook.set
    }, jQuery.attrHooks.contenteditable = {
        set: function(elem, value, name) {
            nodeHook.set(elem, "" === value ? !1 : value, name);
        }
    }, jQuery.each([ "width", "height" ], function(i, name) {
        jQuery.attrHooks[name] = {
            set: function(elem, value) {
                return "" === value ? (elem.setAttribute(name, "auto"), value) : void 0;
            }
        };
    })), support.style || (jQuery.attrHooks.style = {
        get: function(elem) {
            return elem.style.cssText || void 0;
        },
        set: function(elem, value) {
            return elem.style.cssText = value + "";
        }
    });
    var rfocusable = /^(?:input|select|textarea|button|object)$/i, rclickable = /^(?:a|area)$/i;
    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
            return name = jQuery.propFix[name] || name, this.each(function() {
                try {
                    this[name] = void 0, delete this[name];
                } catch (e) {}
            });
        }
    }), jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return notxml = 1 !== nType || !jQuery.isXMLDoc(elem), 
            notxml && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), 
            void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name];
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    var tabindex = jQuery.find.attr(elem, "tabindex");
                    return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
                }
            }
        }
    }), support.hrefNormalized || jQuery.each([ "href", "src" ], function(i, name) {
        jQuery.propHooks[name] = {
            get: function(elem) {
                return elem.getAttribute(name, 4);
            }
        };
    }), support.optSelected || (jQuery.propHooks.selected = {
        get: function(elem) {
            var parent = elem.parentNode;
            return parent && (parent.selectedIndex, parent.parentNode && parent.parentNode.selectedIndex), 
            null;
        }
    }), jQuery.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        jQuery.propFix[this.toLowerCase()] = this;
    }), support.enctype || (jQuery.propFix.enctype = "encoding");
    var rclass = /[\t\r\n\f]/g;
    jQuery.fn.extend({
        addClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, i = 0, len = this.length, proceed = "string" == typeof value && value;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).addClass(value.call(this, j, this.className));
            });
            if (proceed) for (classes = (value || "").match(rnotwhite) || []; len > i; i++) if (elem = this[i], 
            cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ")) {
                for (j = 0; clazz = classes[j++]; ) cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                finalValue = jQuery.trim(cur), elem.className !== finalValue && (elem.className = finalValue);
            }
            return this;
        },
        removeClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, i = 0, len = this.length, proceed = 0 === arguments.length || "string" == typeof value && value;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).removeClass(value.call(this, j, this.className));
            });
            if (proceed) for (classes = (value || "").match(rnotwhite) || []; len > i; i++) if (elem = this[i], 
            cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "")) {
                for (j = 0; clazz = classes[j++]; ) for (;cur.indexOf(" " + clazz + " ") >= 0; ) cur = cur.replace(" " + clazz + " ", " ");
                finalValue = value ? jQuery.trim(cur) : "", elem.className !== finalValue && (elem.className = finalValue);
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : jQuery.isFunction(value) ? this.each(function(i) {
                jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
            }) : this.each(function() {
                if ("string" === type) for (var className, i = 0, self = jQuery(this), classNames = value.match(rnotwhite) || []; className = classNames[i++]; ) self.hasClass(className) ? self.removeClass(className) : self.addClass(className); else (type === strundefined || "boolean" === type) && (this.className && jQuery._data(this, "__className__", this.className), 
                this.className = this.className || value === !1 ? "" : jQuery._data(this, "__className__") || "");
            });
        },
        hasClass: function(selector) {
            for (var className = " " + selector + " ", i = 0, l = this.length; l > i; i++) if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) return !0;
            return !1;
        }
    }), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
    }), jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
            return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        }
    });
    var nonce = jQuery.now(), rquery = /\?/, rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    jQuery.parseJSON = function(data) {
        if (window.JSON && window.JSON.parse) return window.JSON.parse(data + "");
        var requireNonComma, depth = null, str = jQuery.trim(data + "");
        return str && !jQuery.trim(str.replace(rvalidtokens, function(token, comma, open, close) {
            return requireNonComma && comma && (depth = 0), 0 === depth ? token : (requireNonComma = open || comma, 
            depth += !close - !open, "");
        })) ? Function("return " + str)() : jQuery.error("Invalid JSON: " + data);
    }, jQuery.parseXML = function(data) {
        var xml, tmp;
        if (!data || "string" != typeof data) return null;
        try {
            window.DOMParser ? (tmp = new DOMParser(), xml = tmp.parseFromString(data, "text/xml")) : (xml = new ActiveXObject("Microsoft.XMLDOM"), 
            xml.async = "false", xml.loadXML(data));
        } catch (e) {
            xml = void 0;
        }
        return xml && xml.documentElement && !xml.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + data), 
        xml;
    };
    var ajaxLocParts, ajaxLocation, rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, prefilters = {}, transports = {}, allTypes = "*/".concat("*");
    try {
        ajaxLocation = location.href;
    } catch (e) {
        ajaxLocation = document.createElement("a"), ajaxLocation.href = "", ajaxLocation = ajaxLocation.href;
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
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
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                2 !== state && (state = 2, timeoutTimer && clearTimeout(timeoutTimer), transport = void 0, 
                responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, isSuccess = status >= 200 && 300 > status || 304 === status, 
                responses && (response = ajaxHandleResponses(s, jqXHR, responses)), response = ajaxConvert(s, response, jqXHR, isSuccess), 
                isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), 
                modified && (jQuery.lastModified[cacheURL] = modified), modified = jqXHR.getResponseHeader("etag"), 
                modified && (jQuery.etag[cacheURL] = modified)), 204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state, 
                success = response.data, error = response.error, isSuccess = !error)) : (error = statusText, 
                (status || !statusText) && (statusText = "error", 0 > status && (status = 0))), 
                jqXHR.status = status, jqXHR.statusText = (nativeStatusText || statusText) + "", 
                isSuccess ? deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]) : deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]), 
                jqXHR.statusCode(statusCode), statusCode = void 0, fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [ jqXHR, s, isSuccess ? success : error ]), 
                completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]), 
                --jQuery.active || jQuery.event.trigger("ajaxStop")));
            }
            "object" == typeof url && (options = url, url = void 0), options = options || {};
            var parts, i, cacheURL, responseHeadersString, timeoutTimer, fireGlobals, transport, responseHeaders, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = "canceled", jqXHR = {
                readyState: 0,
                getResponseHeader: function(key) {
                    var match;
                    if (2 === state) {
                        if (!responseHeaders) for (responseHeaders = {}; match = rheaders.exec(responseHeadersString); ) responseHeaders[match[1].toLowerCase()] = match[2];
                        match = responseHeaders[key.toLowerCase()];
                    }
                    return null == match ? null : match;
                },
                getAllResponseHeaders: function() {
                    return 2 === state ? responseHeadersString : null;
                },
                setRequestHeader: function(name, value) {
                    var lname = name.toLowerCase();
                    return state || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, 
                    requestHeaders[name] = value), this;
                },
                overrideMimeType: function(type) {
                    return state || (s.mimeType = type), this;
                },
                statusCode: function(map) {
                    var code;
                    if (map) if (2 > state) for (code in map) statusCode[code] = [ statusCode[code], map[code] ]; else jqXHR.always(map[jqXHR.status]);
                    return this;
                },
                abort: function(statusText) {
                    var finalText = statusText || strAbort;
                    return transport && transport.abort(finalText), done(0, finalText), this;
                }
            };
            if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, 
            jqXHR.error = jqXHR.fail, s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), 
            s.type = options.method || options.type || s.method || s.type, s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [ "" ], 
            null == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()), s.crossDomain = !(!parts || parts[1] === ajaxLocParts[1] && parts[2] === ajaxLocParts[2] && (parts[3] || ("http:" === parts[1] ? "80" : "443")) === (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? "80" : "443")))), 
            s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), 
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state) return jqXHR;
            fireGlobals = jQuery.event && s.global, fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), 
            s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), cacheURL = s.url, 
            s.hasContent || (s.data && (cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data, 
            delete s.data), s.cache === !1 && (s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++)), 
            s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), 
            jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])), 
            (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), 
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state)) return jqXHR.abort();
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) jqXHR[i](s[i]);
            if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [ jqXHR, s ]), 
                s.async && s.timeout > 0 && (timeoutTimer = setTimeout(function() {
                    jqXHR.abort("timeout");
                }, s.timeout));
                try {
                    state = 1, transport.send(requestHeaders, done);
                } catch (e) {
                    if (!(2 > state)) throw e;
                    done(-1, e);
                }
            } else done(-1, "No Transport");
            return jqXHR;
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        getScript: function(url, callback) {
            return jQuery.get(url, void 0, callback, "script");
        }
    }), jQuery.each([ "get", "post" ], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            return jQuery.isFunction(data) && (type = type || callback, callback = data, data = void 0), 
            jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    }), jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        });
    }, jQuery.fn.extend({
        wrapAll: function(html) {
            if (jQuery.isFunction(html)) return this.each(function(i) {
                jQuery(this).wrapAll(html.call(this, i));
            });
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function() {
                    for (var elem = this; elem.firstChild && 1 === elem.firstChild.nodeType; ) elem = elem.firstChild;
                    return elem;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(html) {
            return jQuery.isFunction(html) ? this.each(function(i) {
                jQuery(this).wrapInner(html.call(this, i));
            }) : this.each(function() {
                var self = jQuery(this), contents = self.contents();
                contents.length ? contents.wrapAll(html) : self.append(html);
            });
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes);
            }).end();
        }
    }), jQuery.expr.filters.hidden = function(elem) {
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 || !support.reliableHiddenOffsets() && "none" === (elem.style && elem.style.display || jQuery.css(elem, "display"));
    }, jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem);
    };
    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, value) {
            value = jQuery.isFunction(value) ? value() : null == value ? "" : value, s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
        if (void 0 === traditional && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), 
        jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
            add(this.name, this.value);
        }); else for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
        return s.join("&").replace(r20, "+");
    }, jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                };
            }).get();
        }
    }), jQuery.ajaxSettings.xhr = void 0 !== window.ActiveXObject ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && createStandardXHR() || createActiveXHR();
    } : createStandardXHR;
    var xhrId = 0, xhrCallbacks = {}, xhrSupported = jQuery.ajaxSettings.xhr();
    window.attachEvent && window.attachEvent("onunload", function() {
        for (var key in xhrCallbacks) xhrCallbacks[key](void 0, !0);
    }), support.cors = !!xhrSupported && "withCredentials" in xhrSupported, xhrSupported = support.ajax = !!xhrSupported, 
    xhrSupported && jQuery.ajaxTransport(function(options) {
        if (!options.crossDomain || support.cors) {
            var callback;
            return {
                send: function(headers, complete) {
                    var i, xhr = options.xhr(), id = ++xhrId;
                    if (xhr.open(options.type, options.url, options.async, options.username, options.password), 
                    options.xhrFields) for (i in options.xhrFields) xhr[i] = options.xhrFields[i];
                    options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType), 
                    options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                    for (i in headers) void 0 !== headers[i] && xhr.setRequestHeader(i, headers[i] + "");
                    xhr.send(options.hasContent && options.data || null), callback = function(_, isAbort) {
                        var status, statusText, responses;
                        if (callback && (isAbort || 4 === xhr.readyState)) if (delete xhrCallbacks[id], 
                        callback = void 0, xhr.onreadystatechange = jQuery.noop, isAbort) 4 !== xhr.readyState && xhr.abort(); else {
                            responses = {}, status = xhr.status, "string" == typeof xhr.responseText && (responses.text = xhr.responseText);
                            try {
                                statusText = xhr.statusText;
                            } catch (e) {
                                statusText = "";
                            }
                            status || !options.isLocal || options.crossDomain ? 1223 === status && (status = 204) : status = responses.text ? 200 : 404;
                        }
                        responses && complete(status, statusText, responses, xhr.getAllResponseHeaders());
                    }, options.async ? 4 === xhr.readyState ? setTimeout(callback) : xhr.onreadystatechange = xhrCallbacks[id] = callback : callback();
                },
                abort: function() {
                    callback && callback(void 0, !0);
                }
            };
        }
    }), jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(text) {
                return jQuery.globalEval(text), text;
            }
        }
    }), jQuery.ajaxPrefilter("script", function(s) {
        void 0 === s.cache && (s.cache = !1), s.crossDomain && (s.type = "GET", s.global = !1);
    }), jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, head = document.head || jQuery("head")[0] || document.documentElement;
            return {
                send: function(_, callback) {
                    script = document.createElement("script"), script.async = !0, s.scriptCharset && (script.charset = s.scriptCharset), 
                    script.src = s.url, script.onload = script.onreadystatechange = function(_, isAbort) {
                        (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) && (script.onload = script.onreadystatechange = null, 
                        script.parentNode && script.parentNode.removeChild(script), script = null, isAbort || callback(200, "success"));
                    }, head.insertBefore(script, head.firstChild);
                },
                abort: function() {
                    script && script.onload(void 0, !0);
                }
            };
        }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            return this[callback] = !0, callback;
        }
    }), jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        return jsonProp || "jsonp" === s.dataTypes[0] ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, 
        jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), 
        s.converters["script json"] = function() {
            return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0];
        }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
            responseContainer = arguments;
        }, jqXHR.always(function() {
            window[callbackName] = overwritten, s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, 
            oldCallbacks.push(callbackName)), responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), 
            responseContainer = overwritten = void 0;
        }), "script") : void 0;
    }), jQuery.parseHTML = function(data, context, keepScripts) {
        if (!data || "string" != typeof data) return null;
        "boolean" == typeof context && (keepScripts = context, context = !1), context = context || document;
        var parsed = rsingleTag.exec(data), scripts = !keepScripts && [];
        return parsed ? [ context.createElement(parsed[1]) ] : (parsed = jQuery.buildFragment([ data ], context, scripts), 
        scripts && scripts.length && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes));
    };
    var _load = jQuery.fn.load;
    jQuery.fn.load = function(url, params, callback) {
        if ("string" != typeof url && _load) return _load.apply(this, arguments);
        var selector, response, type, self = this, off = url.indexOf(" ");
        return off >= 0 && (selector = jQuery.trim(url.slice(off, url.length)), url = url.slice(0, off)), 
        jQuery.isFunction(params) ? (callback = params, params = void 0) : params && "object" == typeof params && (type = "POST"), 
        self.length > 0 && jQuery.ajax({
            url: url,
            type: type,
            dataType: "html",
            data: params
        }).done(function(responseText) {
            response = arguments, self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
        }).complete(callback && function(jqXHR, status) {
            self.each(callback, response || [ jqXHR.responseText, status, jqXHR ]);
        }), this;
    }, jQuery.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
        };
    }), jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
        }).length;
    };
    var docElem = window.document.documentElement;
    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
            "static" === position && (elem.style.position = "relative"), curOffset = curElem.offset(), 
            curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && jQuery.inArray("auto", [ curCSSTop, curCSSLeft ]) > -1, 
            calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, 
            curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), 
            jQuery.isFunction(options) && (options = options.call(elem, i, curOffset)), null != options.top && (props.top = options.top - curOffset.top + curTop), 
            null != options.left && (props.left = options.left - curOffset.left + curLeft), 
            "using" in options ? options.using.call(elem, props) : curElem.css(props);
        }
    }, jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length) return void 0 === options ? this : this.each(function(i) {
                jQuery.offset.setOffset(this, options, i);
            });
            var docElem, win, box = {
                top: 0,
                left: 0
            }, elem = this[0], doc = elem && elem.ownerDocument;
            if (doc) return docElem = doc.documentElement, jQuery.contains(docElem, elem) ? (typeof elem.getBoundingClientRect !== strundefined && (box = elem.getBoundingClientRect()), 
            win = getWindow(doc), {
                top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
                left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
            }) : box;
        },
        position: function() {
            if (this[0]) {
                var offsetParent, offset, parentOffset = {
                    top: 0,
                    left: 0
                }, elem = this[0];
                return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(), 
                offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), 
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0)), 
                {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var offsetParent = this.offsetParent || docElem; offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position"); ) offsetParent = offsetParent.offsetParent;
                return offsetParent || docElem;
            });
        }
    }), jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = /Y/.test(prop);
        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win = getWindow(elem);
                return void 0 === val ? win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method] : void (win ? win.scrollTo(top ? jQuery(win).scrollLeft() : val, top ? val : jQuery(win).scrollTop()) : elem[method] = val);
            }, method, val, arguments.length, null);
        };
    }), jQuery.each([ "top", "left" ], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
            return computed ? (computed = curCSS(elem, prop), rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed) : void 0;
        });
    }), jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin), extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                return access(this, function(elem, type, value) {
                    var doc;
                    return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, 
                    Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === value ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : void 0, chainable, null);
            };
        });
    }), jQuery.fn.size = function() {
        return this.length;
    }, jQuery.fn.andSelf = jQuery.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return jQuery;
    });
    var _jQuery = window.jQuery, _$ = window.$;
    return jQuery.noConflict = function(deep) {
        return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), 
        jQuery;
    }, typeof noGlobal === strundefined && (window.jQuery = window.$ = jQuery), jQuery;
}), function() {
    if (document.querySelectorAll && !$("html").hasClass("lt-ie9")) {
        var device, previousDevice, addClass, documentElement, find, handleOrientation, hasClass, orientationEvent, removeClass, userAgent;
        previousDevice = window.device, device = {}, window.device = device, documentElement = window.document.documentElement, 
        userAgent = window.navigator.userAgent.toLowerCase(), device.ios = function() {
            return device.iphone() || device.ipod() || device.ipad();
        }, device.iphone = function() {
            return find("iphone");
        }, device.ipod = function() {
            return find("ipod");
        }, device.ipad = function() {
            return find("ipad");
        }, device.android = function() {
            return find("android");
        }, device.androidPhone = function() {
            return device.android() && find("mobile");
        }, device.androidTablet = function() {
            return device.android() && !find("mobile");
        }, device.blackberry = function() {
            return find("blackberry") || find("bb10") || find("rim");
        }, device.blackberryPhone = function() {
            return device.blackberry() && !find("tablet");
        }, device.blackberryTablet = function() {
            return device.blackberry() && find("tablet");
        }, device.windows = function() {
            return find("windows");
        }, device.windowsPhone = function() {
            return device.windows() && find("phone");
        }, device.windowsTablet = function() {
            return device.windows() && find("touch") && !device.windowsPhone();
        }, device.fxos = function() {
            return (find("(mobile;") || find("(tablet;")) && find("; rv:");
        }, device.fxosPhone = function() {
            return device.fxos() && find("mobile");
        }, device.fxosTablet = function() {
            return device.fxos() && find("tablet");
        }, device.meego = function() {
            return find("meego");
        }, device.cordova = function() {
            return window.cordova && "file:" === location.protocol;
        }, device.nodeWebkit = function() {
            return "object" == typeof window.process;
        }, device.mobile = function() {
            return device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone() || device.fxosPhone() || device.meego();
        }, device.tablet = function() {
            return device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet() || device.fxosTablet();
        }, device.desktop = function() {
            return !device.tablet() && !device.mobile();
        }, device.television = function() {
            var i;
            for (television = [ "googletv", "viera", "smarttv", "internet.tv", "netcast", "nettv", "appletv", "boxee", "kylo", "roku", "dlnadoc", "roku", "pov_tv", "hbbtv", "ce-html" ], 
            i = 0; i < television.length; ) {
                if (find(television[i])) return !0;
                i++;
            }
            return !1;
        }, device.portrait = function() {
            return window.innerHeight / window.innerWidth > 1;
        }, device.landscape = function() {
            return window.innerHeight / window.innerWidth < 1;
        }, device.noConflict = function() {
            return window.device = previousDevice, this;
        }, find = function(needle) {
            return -1 !== userAgent.indexOf(needle);
        }, hasClass = function(className) {
            var regex;
            return regex = new RegExp(className, "i"), documentElement.className.match(regex);
        }, addClass = function(className) {
            hasClass(className) || (documentElement.className = documentElement.className.trim() + " " + className);
        }, removeClass = function(className) {
            hasClass(className) && (documentElement.className = documentElement.className.replace(" " + className, ""));
        }, device.ios() ? device.ipad() ? addClass("ios ipad tablet") : device.iphone() ? addClass("ios iphone mobile") : device.ipod() && addClass("ios ipod mobile") : device.android() ? addClass(device.androidTablet() ? "android tablet" : "android mobile") : device.blackberry() ? addClass(device.blackberryTablet() ? "blackberry tablet" : "blackberry mobile") : device.windows() ? addClass(device.windowsTablet() ? "windows tablet" : device.windowsPhone() ? "windows mobile" : "desktop") : device.fxos() ? addClass(device.fxosTablet() ? "fxos tablet" : "fxos mobile") : device.meego() ? addClass("meego mobile") : device.nodeWebkit() ? addClass("node-webkit") : device.television() ? addClass("television") : device.desktop() && addClass("desktop"), 
        device.cordova() && addClass("cordova"), handleOrientation = function() {
            device.landscape() ? (removeClass("portrait"), addClass("landscape")) : (removeClass("landscape"), 
            addClass("portrait"));
        }, orientationEvent = window.hasOwnProperty("onorientationchange") ? "orientationchange" : "resize", 
        window.addEventListener ? window.addEventListener(orientationEvent, handleOrientation, !1) : window.attachEvent ? window.attachEvent(orientationEvent, handleOrientation) : window[orientationEvent] = handleOrientation, 
        handleOrientation(), "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
            return device;
        }) : "undefined" != typeof module && module.exports ? module.exports = device : window.device = device;
    }
}.call(this), window.Modernizr = function(window, document, undefined) {
    function setCss(str) {
        mStyle.cssText = str;
    }
    function setCssAll(str1, str2) {
        return setCss(prefixes.join(str1 + ";") + (str2 || ""));
    }
    function is(obj, type) {
        return typeof obj === type;
    }
    function contains(str, substr) {
        return !!~("" + str).indexOf(substr);
    }
    function testProps(props, prefixed) {
        for (var i in props) {
            var prop = props[i];
            if (!contains(prop, "-") && mStyle[prop] !== undefined) return "pfx" == prefixed ? prop : !0;
        }
        return !1;
    }
    function testDOMProps(props, obj, elem) {
        for (var i in props) {
            var item = obj[props[i]];
            if (item !== undefined) return elem === !1 ? props[i] : is(item, "function") ? item.bind(elem || obj) : item;
        }
        return !1;
    }
    function testPropsAll(prop, prefixed, elem) {
        var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1), props = (prop + " " + cssomPrefixes.join(ucProp + " ") + ucProp).split(" ");
        return is(prefixed, "string") || is(prefixed, "undefined") ? testProps(props, prefixed) : (props = (prop + " " + domPrefixes.join(ucProp + " ") + ucProp).split(" "), 
        testDOMProps(props, prefixed, elem));
    }
    function webforms() {
        Modernizr.input = function(props) {
            for (var i = 0, len = props.length; len > i; i++) attrs[props[i]] = !!(props[i] in inputElem);
            return attrs.list && (attrs.list = !(!document.createElement("datalist") || !window.HTMLDataListElement)), 
            attrs;
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), 
        Modernizr.inputtypes = function(props) {
            for (var bool, inputElemType, defaultView, i = 0, len = props.length; len > i; i++) inputElem.setAttribute("type", inputElemType = props[i]), 
            bool = "text" !== inputElem.type, bool && (inputElem.value = smile, inputElem.style.cssText = "position:absolute;visibility:hidden;", 
            /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ? (docElement.appendChild(inputElem), 
            defaultView = document.defaultView, bool = defaultView.getComputedStyle && "textfield" !== defaultView.getComputedStyle(inputElem, null).WebkitAppearance && 0 !== inputElem.offsetHeight, 
            docElement.removeChild(inputElem)) : /^(search|tel)$/.test(inputElemType) || (bool = /^(url|email)$/.test(inputElemType) ? inputElem.checkValidity && inputElem.checkValidity() === !1 : inputElem.value != smile)), 
            inputs[props[i]] = !!bool;
            return inputs;
        }("search tel url email datetime date month week time datetime-local number range color".split(" "));
    }
    var featureName, hasOwnProp, version = "2.8.3", Modernizr = {}, enableClasses = !0, docElement = document.documentElement, mod = "modernizr", modElem = document.createElement(mod), mStyle = modElem.style, inputElem = document.createElement("input"), smile = ":)", toString = {}.toString, prefixes = " -webkit- -moz- -o- -ms- ".split(" "), omPrefixes = "Webkit Moz O ms", cssomPrefixes = omPrefixes.split(" "), domPrefixes = omPrefixes.toLowerCase().split(" "), ns = {
        svg: "http://www.w3.org/2000/svg"
    }, tests = {}, inputs = {}, attrs = {}, classes = [], slice = classes.slice, injectElementWithStyles = function(rule, callback, nodes, testnames) {
        var style, ret, node, docOverflow, div = document.createElement("div"), body = document.body, fakeBody = body || document.createElement("body");
        if (parseInt(nodes, 10)) for (;nodes--; ) node = document.createElement("div"), 
        node.id = testnames ? testnames[nodes] : mod + (nodes + 1), div.appendChild(node);
        return style = [ "&#173;", '<style id="s', mod, '">', rule, "</style>" ].join(""), 
        div.id = mod, (body ? div : fakeBody).innerHTML += style, fakeBody.appendChild(div), 
        body || (fakeBody.style.background = "", fakeBody.style.overflow = "hidden", docOverflow = docElement.style.overflow, 
        docElement.style.overflow = "hidden", docElement.appendChild(fakeBody)), ret = callback(div, rule), 
        body ? div.parentNode.removeChild(div) : (fakeBody.parentNode.removeChild(fakeBody), 
        docElement.style.overflow = docOverflow), !!ret;
    }, testMediaQuery = function(mq) {
        var matchMedia = window.matchMedia || window.msMatchMedia;
        if (matchMedia) return matchMedia(mq) && matchMedia(mq).matches || !1;
        var bool;
        return injectElementWithStyles("@media " + mq + " { #" + mod + " { position: absolute; } }", function(node) {
            bool = "absolute" == (window.getComputedStyle ? getComputedStyle(node, null) : node.currentStyle).position;
        }), bool;
    }, isEventSupported = function() {
        function isEventSupported(eventName, element) {
            element = element || document.createElement(TAGNAMES[eventName] || "div"), eventName = "on" + eventName;
            var isSupported = eventName in element;
            return isSupported || (element.setAttribute || (element = document.createElement("div")), 
            element.setAttribute && element.removeAttribute && (element.setAttribute(eventName, ""), 
            isSupported = is(element[eventName], "function"), is(element[eventName], "undefined") || (element[eventName] = undefined), 
            element.removeAttribute(eventName))), element = null, isSupported;
        }
        var TAGNAMES = {
            select: "input",
            change: "input",
            submit: "form",
            reset: "form",
            error: "img",
            load: "img",
            abort: "img"
        };
        return isEventSupported;
    }(), _hasOwnProperty = {}.hasOwnProperty;
    hasOwnProp = is(_hasOwnProperty, "undefined") || is(_hasOwnProperty.call, "undefined") ? function(object, property) {
        return property in object && is(object.constructor.prototype[property], "undefined");
    } : function(object, property) {
        return _hasOwnProperty.call(object, property);
    }, Function.prototype.bind || (Function.prototype.bind = function(that) {
        var target = this;
        if ("function" != typeof target) throw new TypeError();
        var args = slice.call(arguments, 1), bound = function() {
            if (this instanceof bound) {
                var F = function() {};
                F.prototype = target.prototype;
                var self = new F(), result = target.apply(self, args.concat(slice.call(arguments)));
                return Object(result) === result ? result : self;
            }
            return target.apply(that, args.concat(slice.call(arguments)));
        };
        return bound;
    }), tests.flexbox = function() {
        return testPropsAll("flexWrap");
    }, tests.flexboxlegacy = function() {
        return testPropsAll("boxDirection");
    }, tests.canvas = function() {
        var elem = document.createElement("canvas");
        return !(!elem.getContext || !elem.getContext("2d"));
    }, tests.canvastext = function() {
        return !(!Modernizr.canvas || !is(document.createElement("canvas").getContext("2d").fillText, "function"));
    }, tests.webgl = function() {
        return !!window.WebGLRenderingContext;
    }, tests.touch = function() {
        var bool;
        return "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch ? bool = !0 : injectElementWithStyles([ "@media (", prefixes.join("touch-enabled),("), mod, ")", "{#modernizr{top:9px;position:absolute}}" ].join(""), function(node) {
            bool = 9 === node.offsetTop;
        }), bool;
    }, tests.geolocation = function() {
        return "geolocation" in navigator;
    }, tests.postmessage = function() {
        return !!window.postMessage;
    }, tests.websqldatabase = function() {
        return !!window.openDatabase;
    }, tests.indexedDB = function() {
        return !!testPropsAll("indexedDB", window);
    }, tests.hashchange = function() {
        return isEventSupported("hashchange", window) && (document.documentMode === undefined || document.documentMode > 7);
    }, tests.history = function() {
        return !(!window.history || !history.pushState);
    }, tests.draganddrop = function() {
        var div = document.createElement("div");
        return "draggable" in div || "ondragstart" in div && "ondrop" in div;
    }, tests.websockets = function() {
        return "WebSocket" in window || "MozWebSocket" in window;
    }, tests.rgba = function() {
        return setCss("background-color:rgba(150,255,150,.5)"), contains(mStyle.backgroundColor, "rgba");
    }, tests.hsla = function() {
        return setCss("background-color:hsla(120,40%,100%,.5)"), contains(mStyle.backgroundColor, "rgba") || contains(mStyle.backgroundColor, "hsla");
    }, tests.multiplebgs = function() {
        return setCss("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(mStyle.background);
    }, tests.backgroundsize = function() {
        return testPropsAll("backgroundSize");
    }, tests.borderimage = function() {
        return testPropsAll("borderImage");
    }, tests.borderradius = function() {
        return testPropsAll("borderRadius");
    }, tests.boxshadow = function() {
        return testPropsAll("boxShadow");
    }, tests.textshadow = function() {
        return "" === document.createElement("div").style.textShadow;
    }, tests.opacity = function() {
        return setCssAll("opacity:.55"), /^0.55$/.test(mStyle.opacity);
    }, tests.cssanimations = function() {
        return testPropsAll("animationName");
    }, tests.csscolumns = function() {
        return testPropsAll("columnCount");
    }, tests.cssgradients = function() {
        var str1 = "background-image:", str2 = "gradient(linear,left top,right bottom,from(#9f9),to(white));", str3 = "linear-gradient(left top,#9f9, white);";
        return setCss((str1 + "-webkit- ".split(" ").join(str2 + str1) + prefixes.join(str3 + str1)).slice(0, -str1.length)), 
        contains(mStyle.backgroundImage, "gradient");
    }, tests.cssreflections = function() {
        return testPropsAll("boxReflect");
    }, tests.csstransforms = function() {
        return !!testPropsAll("transform");
    }, tests.csstransforms3d = function() {
        var ret = !!testPropsAll("perspective");
        return ret && "webkitPerspective" in docElement.style && injectElementWithStyles("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(node, rule) {
            ret = 9 === node.offsetLeft && 3 === node.offsetHeight;
        }), ret;
    }, tests.csstransitions = function() {
        return testPropsAll("transition");
    }, tests.fontface = function() {
        var bool;
        return injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function(node, rule) {
            var style = document.getElementById("smodernizr"), sheet = style.sheet || style.styleSheet, cssText = sheet ? sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || "" : "";
            bool = /src/i.test(cssText) && 0 === cssText.indexOf(rule.split(" ")[0]);
        }), bool;
    }, tests.generatedcontent = function() {
        var bool;
        return injectElementWithStyles([ "#", mod, "{font:0/0 a}#", mod, ':after{content:"', smile, '";visibility:hidden;font:3px/1 a}' ].join(""), function(node) {
            bool = node.offsetHeight >= 3;
        }), bool;
    }, tests.video = function() {
        var elem = document.createElement("video"), bool = !1;
        try {
            (bool = !!elem.canPlayType) && (bool = new Boolean(bool), bool.ogg = elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), 
            bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), 
            bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""));
        } catch (e) {}
        return bool;
    }, tests.audio = function() {
        var elem = document.createElement("audio"), bool = !1;
        try {
            (bool = !!elem.canPlayType) && (bool = new Boolean(bool), bool.ogg = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), 
            bool.mp3 = elem.canPlayType("audio/mpeg;").replace(/^no$/, ""), bool.wav = elem.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), 
            bool.m4a = (elem.canPlayType("audio/x-m4a;") || elem.canPlayType("audio/aac;")).replace(/^no$/, ""));
        } catch (e) {}
        return bool;
    }, tests.localstorage = function() {
        try {
            return localStorage.setItem(mod, mod), localStorage.removeItem(mod), !0;
        } catch (e) {
            return !1;
        }
    }, tests.sessionstorage = function() {
        try {
            return sessionStorage.setItem(mod, mod), sessionStorage.removeItem(mod), !0;
        } catch (e) {
            return !1;
        }
    }, tests.webworkers = function() {
        return !!window.Worker;
    }, tests.applicationcache = function() {
        return !!window.applicationCache;
    }, tests.svg = function() {
        return !!document.createElementNS && !!document.createElementNS(ns.svg, "svg").createSVGRect;
    }, tests.inlinesvg = function() {
        var div = document.createElement("div");
        return div.innerHTML = "<svg/>", (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
    }, tests.smil = function() {
        return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, "animate")));
    }, tests.svgclippaths = function() {
        return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, "clipPath")));
    };
    for (var feature in tests) hasOwnProp(tests, feature) && (featureName = feature.toLowerCase(), 
    Modernizr[featureName] = tests[feature](), classes.push((Modernizr[featureName] ? "" : "no-") + featureName));
    return Modernizr.input || webforms(), Modernizr.addTest = function(feature, test) {
        if ("object" == typeof feature) for (var key in feature) hasOwnProp(feature, key) && Modernizr.addTest(key, feature[key]); else {
            if (feature = feature.toLowerCase(), Modernizr[feature] !== undefined) return Modernizr;
            test = "function" == typeof test ? test() : test, "undefined" != typeof enableClasses && enableClasses && (docElement.className += " " + (test ? "" : "no-") + feature), 
            Modernizr[feature] = test;
        }
        return Modernizr;
    }, setCss(""), modElem = inputElem = null, function(window, document) {
        function addStyleSheet(ownerDocument, cssText) {
            var p = ownerDocument.createElement("p"), parent = ownerDocument.getElementsByTagName("head")[0] || ownerDocument.documentElement;
            return p.innerHTML = "x<style>" + cssText + "</style>", parent.insertBefore(p.lastChild, parent.firstChild);
        }
        function getElements() {
            var elements = html5.elements;
            return "string" == typeof elements ? elements.split(" ") : elements;
        }
        function getExpandoData(ownerDocument) {
            var data = expandoData[ownerDocument[expando]];
            return data || (data = {}, expanID++, ownerDocument[expando] = expanID, expandoData[expanID] = data), 
            data;
        }
        function createElement(nodeName, ownerDocument, data) {
            if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createElement(nodeName);
            data || (data = getExpandoData(ownerDocument));
            var node;
            return node = data.cache[nodeName] ? data.cache[nodeName].cloneNode() : saveClones.test(nodeName) ? (data.cache[nodeName] = data.createElem(nodeName)).cloneNode() : data.createElem(nodeName), 
            !node.canHaveChildren || reSkip.test(nodeName) || node.tagUrn ? node : data.frag.appendChild(node);
        }
        function createDocumentFragment(ownerDocument, data) {
            if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createDocumentFragment();
            data = data || getExpandoData(ownerDocument);
            for (var clone = data.frag.cloneNode(), i = 0, elems = getElements(), l = elems.length; l > i; i++) clone.createElement(elems[i]);
            return clone;
        }
        function shivMethods(ownerDocument, data) {
            data.cache || (data.cache = {}, data.createElem = ownerDocument.createElement, data.createFrag = ownerDocument.createDocumentFragment, 
            data.frag = data.createFrag()), ownerDocument.createElement = function(nodeName) {
                return html5.shivMethods ? createElement(nodeName, ownerDocument, data) : data.createElem(nodeName);
            }, ownerDocument.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + getElements().join().replace(/[\w\-]+/g, function(nodeName) {
                return data.createElem(nodeName), data.frag.createElement(nodeName), 'c("' + nodeName + '")';
            }) + ");return n}")(html5, data.frag);
        }
        function shivDocument(ownerDocument) {
            ownerDocument || (ownerDocument = document);
            var data = getExpandoData(ownerDocument);
            return !html5.shivCSS || supportsHtml5Styles || data.hasCSS || (data.hasCSS = !!addStyleSheet(ownerDocument, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), 
            supportsUnknownElements || shivMethods(ownerDocument, data), ownerDocument;
        }
        var supportsHtml5Styles, supportsUnknownElements, version = "3.7.0", options = window.html5 || {}, reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, expando = "_html5shiv", expanID = 0, expandoData = {};
        !function() {
            try {
                var a = document.createElement("a");
                a.innerHTML = "<xyz></xyz>", supportsHtml5Styles = "hidden" in a, supportsUnknownElements = 1 == a.childNodes.length || function() {
                    document.createElement("a");
                    var frag = document.createDocumentFragment();
                    return "undefined" == typeof frag.cloneNode || "undefined" == typeof frag.createDocumentFragment || "undefined" == typeof frag.createElement;
                }();
            } catch (e) {
                supportsHtml5Styles = !0, supportsUnknownElements = !0;
            }
        }();
        var html5 = {
            elements: options.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
            version: version,
            shivCSS: options.shivCSS !== !1,
            supportsUnknownElements: supportsUnknownElements,
            shivMethods: options.shivMethods !== !1,
            type: "default",
            shivDocument: shivDocument,
            createElement: createElement,
            createDocumentFragment: createDocumentFragment
        };
        window.html5 = html5, shivDocument(document);
    }(this, document), Modernizr._version = version, Modernizr._prefixes = prefixes, 
    Modernizr._domPrefixes = domPrefixes, Modernizr._cssomPrefixes = cssomPrefixes, 
    Modernizr.mq = testMediaQuery, Modernizr.hasEvent = isEventSupported, Modernizr.testProp = function(prop) {
        return testProps([ prop ]);
    }, Modernizr.testAllProps = testPropsAll, Modernizr.testStyles = injectElementWithStyles, 
    Modernizr.prefixed = function(prop, obj, elem) {
        return obj ? testPropsAll(prop, obj, elem) : testPropsAll(prop, "pfx");
    }, docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (enableClasses ? " js " + classes.join(" ") : ""), 
    Modernizr;
}(this, this.document), !function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e(); else if ("function" == typeof define && define.amd) define([], e); else {
        var n;
        "undefined" != typeof window ? n = window : "undefined" != typeof global ? n = global : "undefined" != typeof self && (n = self), 
        n.AnimationFrame = e();
    }
}(function() {
    return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = "function" == typeof require && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw f.code = "MODULE_NOT_FOUND", f;
                }
                var l = n[o] = {
                    exports: {}
                };
                t[o][0].call(l.exports, function(e) {
                    var n = t[o][1][e];
                    return s(n ? n : e);
                }, l, l.exports, e, t, n, r);
            }
            return n[o].exports;
        }
        for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) s(r[o]);
        return s;
    }({
        1: [ function(require, module, exports) {
            module.exports = require("./lib/animation-frame");
        }, {
            "./lib/animation-frame": 2
        } ],
        2: [ function(require, module, exports) {
            "use strict";
            function AnimationFrame(options) {
                return this instanceof AnimationFrame ? (options || (options = {}), "number" == typeof options && (options = {
                    frameRate: options
                }), null != options.useNative || (options.useNative = !0), this.options = options, 
                this.frameRate = options.frameRate || AnimationFrame.FRAME_RATE, this._frameLength = 1e3 / this.frameRate, 
                this._isCustomFrameRate = this.frameRate !== AnimationFrame.FRAME_RATE, this._timeoutId = null, 
                this._callbacks = {}, this._lastTickTime = 0, void (this._tickCounter = 0)) : new AnimationFrame(options);
            }
            var nativeImpl = require("./native"), now = require("./now"), performance = require("./performance"), nativeRequest = nativeImpl.request, nativeCancel = nativeImpl.cancel;
            module.exports = AnimationFrame, AnimationFrame.FRAME_RATE = 60, AnimationFrame.shim = function(options) {
                var animationFrame = new AnimationFrame(options);
                return window.requestAnimationFrame = function(callback) {
                    return animationFrame.request(callback);
                }, window.cancelAnimationFrame = function(id) {
                    return animationFrame.cancel(id);
                }, animationFrame;
            }, AnimationFrame.prototype.request = function(callback) {
                var self = this;
                if (++this._tickCounter, nativeImpl.supported && this.options.useNative && !this._isCustomFrameRate) return nativeRequest(callback);
                if (!callback) throw new TypeError("Not enough arguments");
                if (null == this._timeoutId) {
                    var delay = this._frameLength + this._lastTickTime - now();
                    0 > delay && (delay = 0), this._timeoutId = setTimeout(function() {
                        self._lastTickTime = now(), self._timeoutId = null, ++self._tickCounter;
                        var callbacks = self._callbacks;
                        self._callbacks = {};
                        for (var id in callbacks) callbacks[id] && (nativeImpl.supported && self.options.useNative ? nativeRequest(callbacks[id]) : callbacks[id](performance.now()));
                    }, delay);
                }
                return this._callbacks[this._tickCounter] = callback, this._tickCounter;
            }, AnimationFrame.prototype.cancel = function(id) {
                nativeImpl.supported && this.options.useNative && nativeCancel(id), delete this._callbacks[id];
            };
        }, {
            "./native": 3,
            "./now": 4,
            "./performance": 6
        } ],
        3: [ function(require, module, exports) {
            "use strict";
            var global = window;
            try {
                global.top.name, global = global.top;
            } catch (e) {}
            exports.request = global.requestAnimationFrame, exports.cancel = global.cancelAnimationFrame || global.cancelRequestAnimationFrame, 
            exports.supported = !1;
            for (var vendors = [ "Webkit", "Moz", "ms", "O" ], i = 0; i < vendors.length && !exports.request; i++) exports.request = global[vendors[i] + "RequestAnimationFrame"], 
            exports.cancel = global[vendors[i] + "CancelAnimationFrame"] || global[vendors[i] + "CancelRequestAnimationFrame"];
            exports.request && exports.request.call(null, function() {
                exports.supported = !0;
            });
        }, {} ],
        4: [ function(require, module, exports) {
            "use strict";
            module.exports = Date.now || function() {
                return new Date().getTime();
            };
        }, {} ],
        5: [ function(require, module, exports) {
            "use strict";
            var now = require("./now");
            exports.navigationStart = now();
        }, {
            "./now": 4
        } ],
        6: [ function(require, module, exports) {
            "use strict";
            var now = require("./now"), PerformanceTiming = require("./performance-timing");
            exports.now = function() {
                return window.performance && window.performance.now ? window.performance.now() : now() - PerformanceTiming.navigationStart;
            };
        }, {
            "./now": 4,
            "./performance-timing": 5
        } ]
    }, {}, [ 1 ])(1);
});

var dateFormat = function() {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g, timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g, timezoneClip = /[^-+\dA-Z]/g, pad = function(val, len) {
        for (val = String(val), len = len || 2; val.length < len; ) val = "0" + val;
        return val;
    };
    return function(date, mask, utc) {
        var dF = dateFormat;
        1 != arguments.length || "[object String]" != Object.prototype.toString.call(date) || /\d/.test(date) || (mask = date, 
        date = void 0), date = date ? new Date(date) : new Date(), mask = String(dF.masks[mask] || mask || dF.masks["default"]), 
        "UTC:" == mask.slice(0, 4) && (mask = mask.slice(4), utc = !0);
        var _ = utc ? "getUTC" : "get", d = date[_ + "Date"](), D = date[_ + "Day"](), m = date[_ + "Month"](), y = date[_ + "FullYear"](), H = date[_ + "Hours"](), M = date[_ + "Minutes"](), s = date[_ + "Seconds"](), L = date[_ + "Milliseconds"](), o = utc ? 0 : date.getTimezoneOffset(), flags = {
            d: d,
            dd: pad(d),
            ddd: dF.i18n.dayNames[D],
            dddd: dF.i18n.dayNames[D + 7],
            m: m + 1,
            mm: pad(m + 1),
            mmm: dF.i18n.monthNames[m],
            mmmm: dF.i18n.monthNames[m + 12],
            yy: String(y).slice(2),
            yyyy: y,
            h: H % 12 || 12,
            hh: pad(H % 12 || 12),
            H: H,
            HH: pad(H),
            M: M,
            MM: pad(M),
            s: s,
            ss: pad(s),
            l: pad(L, 3),
            L: pad(L > 99 ? Math.round(L / 10) : L),
            t: 12 > H ? "a" : "p",
            tt: 12 > H ? "am" : "pm",
            T: 12 > H ? "A" : "P",
            TT: 12 > H ? "AM" : "PM",
            Z: utc ? "UTC" : (String(date).match(timezone) || [ "" ]).pop().replace(timezoneClip, ""),
            o: (o > 0 ? "-" : "+") + pad(100 * Math.floor(Math.abs(o) / 60) + Math.abs(o) % 60, 4),
            S: [ "th", "st", "nd", "rd" ][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
        };
        return mask.replace(token, function($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
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
}, Date.prototype.format = function(mask, utc) {
    return dateFormat(this, mask, utc);
};

var cookieSystem, initCookies = function() {
    cookieSystem = {
        get: function(sKey) {
            return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        },
        set: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) return !1;
            var sExpires = "";
            if (vEnd) switch (vEnd.constructor) {
              case Number:
                var currentDate = new Date(), expiryDate = new Date(currentDate.getTime() + 864e5 * vEnd);
                sExpires = vEnd === 1 / 0 ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; expires=" + expiryDate.toGMTString();
                break;

              case String:
                sExpires = "; expires=" + vEnd;
                break;

              case Date:
                sExpires = "; expires=" + vEnd.toGMTString();
            }
            return document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : ""), 
            !0;
        },
        remove: function(sKey, sPath, sDomain) {
            return sKey && this.hasItem(sKey) ? (document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : ""), 
            !0) : !1;
        },
        has: function(sKey) {
            return new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie);
        }
    }, config.application.debug && console.log("System :: Cookie System");
}, initAnimationFrame = function() {
    for (var lastTime = 0, vendors = [ "webkit", "moz", "ms", "o" ], x = 0; x < vendors.length && !window.requestAnimationFrame; x++) window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"], 
    window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime(), timeToCall = Math.max(0, 16 - (currTime - lastTime)), id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        return lastTime = currTime + timeToCall, id;
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    });
}, initSVGs = function() {
    if ($("img[src$='.svg']").length) {
        var svgCount = 0;
        $("img[src$='.svg']").each(function(i) {
            var img = $(this), imgID = img.attr("id"), imgClass = img.attr("class"), imgURL = img.attr("src");
            svgCount = i, Modernizr.svg ? $.get(imgURL, function(data) {
                var svg = $(data).find("svg");
                "undefined" != typeof imgID && (svg = svg.attr("id", imgID)), "undefined" != typeof imgClass && (svg = svg.attr("class", imgClass + " replaced-svg")), 
                img.hasClass("icon") && svg.find("*").removeAttr("style"), svg = svg.removeAttr("xmlns:a"), 
                img.after(svg).remove();
            }, "xml").fail(function() {
                img.removeClass("svg");
            }) : (imgURL = imgURL.replace(".svg", ".png"), img.attr("src", imgURL));
        }), config.application.debug && console.log("System :: SVG Injection @ " + svgCount + " images");
    }
}, randomizeInteger = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}, popupWindow = function(url, title, w, h) {
    var left = screen.width / 2 - w / 2, top = screen.height / 2 - h / 2;
    return window.open(url, title, "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left);
}, highlight = function(el, val) {
    var match = RegExp(val, "gi");
    el.each(function() {
        $(this).filter(function() {
            return match.test($(this).text());
        }).html(function() {
            return val ? $(this).text().replace(match, '<span class="highlight">$&</span>') : $(this).text();
        });
    });
}, unhighlight = function(el) {
    el.find("span.highlight").replaceWith(function() {
        return $(this).text();
    });
}, resizeText = function(elem) {
    var el = $(elem), span = el.children("span"), charLimit = config.typography.autoresize.characters, rowLimit = config.typography.autoresize.rows, minFontSize = config.typography.autoresize.minFontSize, maxFontSize = config.typography.autoresize.maxFontSize, fontSize = minFontSize;
    (function() {
        if (!el.hasClass("rebuilt")) {
            var string = el.html();
            el.children("span").length || el.empty().append("<span>" + string + "</span>"), 
            span = el.children("span");
            var stringContent = span.text().trim(), stringLength = stringContent.length, stringFinal = "", stringHalf = Math.round(stringLength / 2), spaceFound = !1;
            if (stringLength > charLimit && rowLimit > 1) {
                for (var i = 0; stringLength > i; i++) !spaceFound && i > stringHalf && /\s/.test(stringContent[i]) ? (stringFinal += "<br />", 
                spaceFound = !0) : stringFinal += stringContent[i];
                span.html(stringFinal);
            }
            el.addClass("rebuilt");
        }
    })(), function() {
        do fontSize--, span.css({
            "font-size": fontSize.toString() + "px",
            "font-size": (fontSize / 10).toString() + "rem"
        }); while (span.width() > el.width() && fontSize > minFontSize);
        do fontSize++, span.css({
            "font-size": fontSize.toString() + "px",
            "font-size": (fontSize / 10).toString() + "rem"
        }); while (span.width() < el.width() && maxFontSize > fontSize);
        el.hasClass("resized") || el.addClass("resized");
    }();
}, getQueryParameters = function(str) {
    return (str || document.location.search).replace(/(^\?)/, "").split("&").map(function(n) {
        return n = n.split("="), this[n[0]] = n[1], this;
    }.bind({}))[0];
}, URLQueryObject = function() {
    var urlParams = "";
    return window.onpopstate = function() {
        var match, pl = /\+/g, search = /([^&=]+)=?([^&]*)/g, decode = function(s) {
            return decodeURIComponent(s.replace(pl, " "));
        }, query = window.location.search.substring(1);
        for (urlParams = {}; match == search.exec(query); ) urlParams[decode(match[1])] = decode(match[2]);
    }, urlParams;
}, returnedData, dataObject = "", requestData = function(url, type, successFunction) {
    config.application.debug && console.log("AJAX ~~ Request (" + url + ")"), request = $.ajax({
        url: url,
        type: type,
        data: "POST" == type ? dataObject : "",
        dataType: "JSON",
        success: function(data) {
            config.application.debug && console.log("AJAX ~~ Success (" + url + ")"), "undefined" != typeof successFunction && successFunction(data);
        },
        error: function(request, status, error) {
            config.application.debug && console.log("AJAX ~~ Error (" + url + ")");
        }
    });
}, loadScript = function(src, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript", script.src = src, callback && (script.onload = callback), 
    document.body.appendChild(script);
}, anchorClicked, scrollTo = function(anchor) {
    if ("#" === anchor) config.application.debug && console.log("System :: Link blocked"); else if ($(anchor).length) return anchorClicked = !0, 
    $("html, body").animate({
        scrollTop: $(anchor).offset().top - 86
    }, {
        duration: 1e3,
        queue: !1,
        complete: function() {
            anchorClicked = !1;
        }
    }), !1;
}, initLinks = function() {
    $(document).on("click", "a[href^='#']", function(event) {
        var link = $.attr(this, "href");
        event.preventDefault(), scrollTo(link);
    }), config.application.debug && console.log("System :: Links");
}, scrollProgress = function() {
    var scrollPercentage = 100 * pageTop / ($(document).height() - $(window).height());
    $(".scroll-progress").width(scrollPercentage + "%");
}, ms = new Date().getTime(), matterReady = function() {
    isWideScreen = $(window).width() > 768, config.application.touch && (FastClick.attach(document.body), 
    $(".map-canvas").addClass("map-mobile")), config.application.debug && (console.log(":: is DOM.ready"), 
    console.log("~~ is Async"), console.log("•• is Complete"), console.log("== is User Action"), 
    console.log(" ")), initKonami(), initAnimationFrame(), initSVGs(), initSession(), 
    initCookies(), initLinks(), initTables(), scrollProgress(), initOverlays(), initNotifications(), 
    initTooltips(), initSearch(), initAutocomplete(), initTagClouds(), initForm(), initDropdowns(), 
    initValidation(), initGlobal();
}, matterDeferred = function() {
    $("body").removeClass("preload"), initSliders(), initMap(), initVideo(), config.application.debug && console.log("Done •• Matter in " + (new Date().getTime() - ms) + " milliseconds");
}, isWideScreen, pageTop, pageBottom;

$(document).on("ready", matterReady), $(window).on("load", matterDeferred), $(window).on("resize", function() {
    isWideScreen = $(this).width() > 768;
}), $(window).on("scroll", function() {
    pageTop = $(document).scrollTop(), pageBottom = pageTop + $(this).height(), scrollProgress();
});

var initBreakpointDebug = function(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript", script.readyState ? script.onreadystatechange = function() {
        ("loaded" == script.readyState || "complete" == script.readyState) && (script.onreadystatechange = null, 
        callback());
    } : script.onload = function() {
        callback();
    }, script.src = url, document.getElementsByTagName("head")[0].appendChild(script);
};

$(document).ready(function() {
    config.application.debug && !config.application.touch && $(".debug-trigger").removeClass("hidden").on("click", function() {
        initBreakpointDebug("scripts/debug/breakpoint.js", function() {
            var doc = document;
            doc.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Breakpoint Test - ' + doc.title + '</title><link rel="stylesheet" href="styles/debug/bookmark.css"><script src="scripts/debug/bookmark.js"></script></head><body data-url="' + doc.URL + '"><header id="topHeader" class="clearfix"><a href="#"></a></section><section id="bpCount"><div id="count">00</div><div id="countText"><span>BREAKPOINTS FOUND</span></div></section>' + mqUniqueBP + '</header><section id="qcWWW"><ul id="qcWW"></ul></section></body></html>');
        });
    });
});

var initForm = function() {
    $("select[data-countries]").length && ($("select[data-countries]").each(function() {
        var el = $(this), url = el.data("countries"), buildCountries = function(data) {
            for (var i = 0; i < data.length; i++) {
                var name = data[i].Name, code = data[i].Code, option = "<option value='" + code + "'>" + name + "</option>";
                el.append(option);
            }
            initDropdowns();
        };
        requestData(url, "GET", buildCountries);
    }), config.application.debug && console.log("Form :: Country Dropdowns"));
    var singleFileWrapper = '<div class="file-wrapper mobile-hide"></div>', singleFileFake = '<div class="fakefile">							<div class="button primary fake-upload">Choose File</div>							<div class="file-result">No file chosen</div>						</div>', multiFileIntro = '<div class="multifile-info form-info">							You\'ve got <strong class="emphasis multi-limit font-medium">0</strong> remaining upload<span class="plural">s</span>.						</div>', multiFileWrapper = '<div class="multifile-wrapper mobile-hide last"></div>', multiFileFake = '<div class="fakefile">							<div class="button primary fake-upload">Choose File</div>							<div class="file-result">No file chosen</div>							<div class="button primary fake-close">								<img class="svg icon icon-close" src="img/icons/icon-close.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-close.png\'">							</div>						</div>';
    if ($("input[type='file']").each(function() {
        $(this).data("multi") ? $(this).before(multiFileIntro).wrap(multiFileWrapper).after(multiFileFake) : $(this).wrap(singleFileWrapper).after(singleFileFake);
    }), $(".file-wrapper").length && ($(".file-wrapper:not('.last')").each(function() {
        var el = $(this), input = el.find("input"), button = el.find(".fake-upload"), result = el.find(".file-result");
        button.on("click", function() {
            input.trigger("click");
        }), input.on("change", function() {
            var text = $(this).val().replace("C:\\fakepath\\", "");
            result.html(text).addClass("loaded");
        });
    }), config.application.debug && console.log("Form :: File Upload")), $(".multifile-wrapper").length) {
        var initFileInputs = function() {
            var file = $(".multifile-wrapper"), inputCount = file.length, inputLimit = config.forms.multiUploadlimit, limitElement = $(".multi-limit"), currentCount = inputLimit - file.find(".loaded").length, newInput = (1 == currentCount ? $(".multifile-info").find(".plural").hide() : $(".multifile-info").find(".plural").show(), 
            '<input type="file" id="file[' + inputCount + ']" name="file[' + inputCount + ']" />');
            $(newInput).wrap(multiFileWrapper).after(multiFileFake), limitElement.html(currentCount), 
            file.each(function(i) {
                var el = $(this), resultElement = el.find(".file-result");
                el.find("input").attr("id", "file[" + i + "]").attr("name", "file[" + i + "]"), 
                el.off().on("click", ".fake-upload", function() {
                    el.find("input").trigger("click");
                }).on("click", ".fake-close", function() {
                    inputCount != inputLimit || $(".multifile-wrapper.last").length || $(newInput).insertAfter($(".multifile-wrapper").eq(inputCount - 1)), 
                    el.remove(), initFileInputs();
                }).on("change", "input", function() {
                    var text = $(this).val().replace("C:\\fakepath\\", "");
                    resultElement.html(text).addClass("loaded"), inputLimit >= inputCount && $(newInput).insertAfter(el).wrap(multiFileWrapper).after(multiFileFake), 
                    inputCount > i && el.removeClass("last"), initFileInputs();
                });
            }), initSVGs();
        };
        initFileInputs(), config.application.debug && console.log("Form :: Multiple File Upload");
    }
    var toggle = '<span class="toggle-body">					  <span class="toggle-switch"></span>					  <span class="toggle-track">					  <span class="toggle-background"></span>						  <span class="toggle-background toggle-background-negative"></span>					  </span>				  </span>';
    if ($("input[type='checkbox'], input[type='radio']").length && $("input[type='checkbox'], input[type='radio']").each(function() {
        var el = $(this), type = el.attr("type"), parent = "";
        "true" === el.attr("data-toggle") ? (el.wrap("<div class='controller toggle'></div>"), 
        parent = el.parents(".controller"), parent.next("label").prepend(toggle).appendTo(parent), 
        config.application.debug && console.log("Form :: Toggle " + type.toCamelCase())) : (el.wrap("<div class='controller " + type + "'></div>"), 
        parent = el.parents(".controller"), parent.next("label").appendTo(parent), config.application.debug && console.log("Form :: " + type.toCamelCase()));
    }), $(document).on("click", "input[type='checkbox'][readonly], input[type='radio'][readonly]", function(event) {
        event.preventDefault();
    }), $("input[type='password']").length) {
        var wrapper = '<div class="password-wrapper"></div>', meter = '<div class="password-meter-mask"><div class="password-meter"></div></div>';
        $("input[type='password']").each(function() {
            var el = $(this);
            "match" !== el.data("validation") && (el.wrap(wrapper), $(meter).insertAfter(el));
        }), config.application.debug && console.log("Form :: Password Meters");
    }
    if ($("progress").length) {
        var triggerProgress = function(progress) {
            var el = $("progress"), label = el.prev("label"), bar = el.find(".progress-bar span");
            bar.width(progress + "%").html(progress + "%"), label.removeClass("active").width(progress + "%").attr("data-progress", progress), 
            el.removeClass("valid").attr("value", progress), progress >= 8 && label.addClass("active"), 
            progress >= 100 && el.addClass("valid");
        };
        $("[data-progress]").on("click", function(event) {
            var progress = 0;
            clearInterval(progressInterval);
            var progressInterval = setInterval(function() {
                100 > progress ? (progress++, triggerProgress(progress)) : ($(".progress").addClass("valid"), 
                clearInterval(progressInterval));
            }, 300);
        }), config.application.debug && console.log("Form :: Progress Bar");
    }
}, initDropdowns = function() {
    if ($("select").length) {
        var buildDropdowns = function() {
            $("select").each(function() {
                var select = $(this), size = "undefined" == size || "" === size ? 1 : parseInt(select.attr("size"), 10), type = "undefined" != typeof size && "" !== size && size > 1 ? "list" : "drop", options = select.children("option").not("[default]"), selected = select.children("option:selected"), wrapperEl = '<div class="dropdown-wrapper ' + type + '" data-size="' + size + '"></div>', currentEl = '<div class="dropdown-current" data-value="' + selected.val() + '">' + selected.html() + "</div>", arrowEl = ' <div class="dropdown-arrow valign-middle">									<img class="svg icon icon-caret-down" src="img/icons/icon-caret-down.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-caret-down.png\'">								</div>', dropEl = '<div class="dropdown default"></div>';
                select.parents(".dropdown-wrapper").length || (select.wrap(wrapperEl), $(dropEl).insertAfter(select), 
                $(arrowEl).insertAfter(select), $(currentEl).insertAfter(select));
                var dropWrapper = select.parents(".dropdown-wrapper"), arrow = dropWrapper.children(".dropdown-arrow"), current = dropWrapper.children(".dropdown-current"), dropdown = dropWrapper.children(".dropdown");
                dropdown.html(""), current.val(selected.val()).html(selected.html());
                for (var i = 0; i < options.length; i++) {
                    var option = options.eq(i), isSelected = option.is(":selected") ? "active" : "", item = '<div class="dropdown-item ' + isSelected + '" data-value="' + option.val() + '">' + option.html() + "</div>";
                    dropdown.append(item);
                }
                var dropItem = dropdown.children(".dropdown-item");
                "list" == type && dropdown.height((dropWrapper.find(".dropdown-item").outerHeight() + 1) * size - 1);
                $(this);
                current.attr("class", "dropdown-current " + select.attr("class")), select.is("[readonly]") ? (dropWrapper.addClass("readonly"), 
                current.attr("readonly", !0)) : select.is("[disabled]") ? (dropWrapper.addClass("disabled"), 
                current.attr("disabled", !0)) : (current.off().on("click", function() {
                    select.focus();
                }), arrow.off().on("click", function() {
                    select.focus();
                }), dropItem.off().on("click", function() {
                    var value = $(this).attr("data-value").trim();
                    select.val(value).trigger("change");
                }), select.on("focus", function() {
                    $(".dropdown-wrapper").removeClass("active"), dropWrapper.addClass("active");
                }).on("change", function() {
                    var selected = $(this).children("option:selected");
                    select.blur(), dropWrapper.removeClass("active"), select.hasClass("keep") || current.text(selected.text()).attr("data-value", selected.val()), 
                    dropItem.removeClass("active");
                    for (var i = 0; i < dropItem.length; i++) dropItem.eq(i).text() === selected.text() && (dropItem.eq(i).addClass("active"), 
                    select.parents("form").hasClass("auto-send") && select.parents("form").submit());
                })), $("html, body").off().on("click", function(event) {
                    $(event.target).closest(".dropdown").length || $(event.target).closest(".dropdown-wrapper.active").length || $(".dropdown-wrapper").removeClass("active");
                });
            });
        };
        buildDropdowns(), config.application.debug && console.log("Form :: Dropdowns"), 
        initSVGs();
    }
};

window.console || (console = {
    log: function() {}
}), window.hasOwnProperty = window.hasOwnProperty || Object.prototype.hasOwnProperty, 
"function" != typeof String.prototype.trim && (String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
}), Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}, NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for (var i = 0, len = this.length; len > i; i++) this[i] && this[i].parentElement && this[i].parentElement.removeChild(this[i]);
}, Array.prototype.indexOf || (Array.prototype.indexOf = function(searchElement) {
    "use strict";
    if (null == this) throw new TypeError();
    var t = Object(this), len = t.length >>> 0;
    if (0 === len) return -1;
    var n = 0;
    if (arguments.length > 1 && (n = Number(arguments[1]), n != n ? n = 0 : 0 !== n && n != 1 / 0 && n != -(1 / 0) && (n = (n > 0 || -1) * Math.floor(Math.abs(n)))), 
    n >= len) return -1;
    for (var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0); len > k; k++) if (k in t && t[k] === searchElement) return k;
    return -1;
}), Array.prototype.forEach || (Array.prototype.forEach = function(callbackfn, thisArg) {
    var T, k, Pk, kPresent, kValue, O = Object(this), lenValue = O.length, len = lenValue >>> 0;
    if ("function" != typeof callbackfn) throw new TypeError();
    for (T = thisArg ? thisArg : void 0, k = 0; len > k; ) Pk = k.toString(), kPresent = O.hasOwnProperty(Pk), 
    kPresent && (kValue = O[Pk], callbackfn.call(T, kValue, k, O)), k += 1;
}), Array.prototype.clean = function(deleteValue) {
    for (var i = 0; i < this.length; i++) this[i] == deleteValue && (this.splice(i, 1), 
    i--);
    return this;
}, Array.prototype.uniques = function() {
    return this.reduce(function(a, b) {
        return a.indexOf(b) < 0 && a.push(b), a;
    }, []);
}, Array.prototype.contains = function(v) {
    for (var i = 0; i < this.length; i++) if (this[i] === v) return !0;
    return !1;
}, Array.prototype.duplicates = function() {
    var i, j, arrayLength = this.length, result = [];
    for (i = 0; arrayLength > i; i++) for (j = 0; arrayLength > j; j++) this[i] != this[j] || i == j || result.contains(this[i]) || result.push(this[i]);
    return result;
}, Array.prototype.reduce = function() {
    for (var a = [], i = 0; i < this.length; i++) for (var j = 0; j < this[i].length; j++) a.push(this[i][j]);
    return a;
};

var serialize = function(obj) {
    var str = [];
    for (var p in obj) obj.hasOwnProperty(p) && str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
};

String.prototype.trim || (String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
}), String.prototype.toCamelCase = function() {
    return this.replace(/(\-[a-z])/g, function($1) {
        return $1.toUpperCase().replace("-", "");
    });
}, String.prototype.bool = function() {
    return /^true$/i.test(this);
}, String.prototype.friendly = function() {
    return this.toLowerCase().replace(/&amp;/g, "&").replace(/[^\w\-\!\$\'\(\)\=\@\d_]+/g, "-").replace(/\-{2,}/g, "-").replace(/\-$/g, "");
}, String.prototype.truncate = function(n, useWordBoundary) {
    var isTooLong = this.length > n, $s = isTooLong ? this.substr(0, n - 1) : this;
    return $s = useWordBoundary && isTooLong ? $s.substr(0, $s.lastIndexOf(" ")) : $s, 
    isTooLong ? $s + "..." : $s;
};

var sessionSystem, initSession = function() {
    if (JSON && JSON.stringify && JSON.parse) {
        var win = window.top || window, store = win.name ? JSON.parse(win.name) : {}, sessionSave = function() {
            win.name = JSON.stringify(store);
        };
        window.addEventListener ? window.addEventListener("unload", sessionSave, !1) : window.attachEvent ? window.attachEvent("onunload", sessionSave) : window.onunload = sessionSave, 
        sessionSystem = {
            set: function(name, value) {
                store[name] = value, sessionSave();
            },
            get: function(name) {
                return store[name];
            },
            remove: function(name) {
                delete store[name], sessionSave();
            },
            clear: function() {
                store = {}, sessionSave();
            },
            dump: function() {
                return store;
            }
        };
    }
    config.application.debug && console.log("System :: Session System");
}, initValidation = function() {
    if (config.forms.validation && $("[data-validation]").length) {
        var scorePassword = function(pwd) {
            var score = 0;
            if (!pwd) return score;
            for (var letters = {}, i = 0; i < pwd.length; i++) letters[pwd[i]] = (letters[pwd[i]] || 0) + 1, 
            score += 5 / letters[pwd[i]];
            var variations = {
                digits: /\d/.test(pwd),
                lower: /[a-z]/.test(pwd),
                upper: /[A-Z]/.test(pwd),
                nonWords: /\W/.test(pwd)
            };
            variationCount = 0;
            for (var check in variations) variationCount += variations[check] === !0 ? 1 : 0;
            return score += 10 * (variationCount - 1), parseInt(score, 10);
        }, detectCard = function(number) {
            var regex = {
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
            return regex.amex.test(number) ? "american-express" : regex.dankort.test(number) ? "dankort" : regex.diners.test(number) ? "diners" : regex.discover.test(number) ? "discover" : regex.electron.test(number) ? "visa-electron" : regex.interpayment.test(number) ? "interpayment" : regex.jcb.test(number) ? "jcb" : regex.maestro.test(number) ? "maestro" : regex.mastercard.test(number) ? "mastercard" : regex.unionpay.test(number) ? "unionpay" : regex.visa.test(number) ? "visa" : "generic";
        }, validateField = function(el, type, value) {
            switch (config.application.debug && console.log("Validation :: " + type), el.removeClass("invalid").removeClass("valid"), 
            type) {
              case "text":
                "" !== value ? el.addClass("valid") : el.addClass("invalid");
                break;

              case "number":
                check = /\D+/, "" !== value && value.length == value.replace(check, "").length ? el.addClass("valid") : el.addClass("invalid");
                break;

              case "email":
                check = /^\S+@\S+\.\S+$/, "" !== value && check.test(value) ? el.addClass("valid") : el.addClass("invalid");
                break;

              case "password":
                scorePassword(value) >= 30 ? el.addClass("valid") : el.addClass("invalid");
                break;

              case "match":
                type = el.attr("type");
                var mirror = el.parents().find("input[type='" + type + "']");
                check = mirror.val(), mirror.hasClass("valid") && value === check ? el.addClass("valid") : el.addClass("invalid");
                break;

              case "card":
                "" !== value ? el.addClass("valid") : el.addClass("invalid"), $(".card-wrapper .card").attr("src", "img/icons/payment/cards/" + detectCard(value) + ".png");
                break;

              case "date":
                check = /^\d{2}\/\d{2}\/\d{4}$/, "" !== value && check.test(value) ? el.addClass("valid") : el.addClass("invalid");
                break;

              case "select":
                "" !== value ? el.addClass("valid") : el.addClass("invalid"), el.parents(".dropdown-wrapper").children(".dropdown-current").attr("class", "dropdown-current " + el.attr("class"));
                break;

              case "selectgroup":
                group = el.data("validation-group");
                var selects = $("select[data-validation-group='" + group + "']"), selectGroup = {};
                selectGroup[group] = [], selects.removeClass("invalid").each(function() {
                    var checked = "" !== value;
                    selectGroup[group].push(checked);
                }), -1 != selectGroup[group].indexOf(!0) ? selects.addClass("valid") : selects.addClass("invalid"), 
                selects.parents(".dropdown-wrapper").children(".dropdown-current").attr("class", "dropdown-current " + el.attr("class"));
                break;

              case "checkbox":
                el.prop("checked") ? el.addClass("valid") : el.addClass("invalid");
                break;

              case "radio":
                group = el.attr("name");
                var radios = $("input[type='radio'][name='" + group + "']"), radioGroup = {};
                radioGroup[group] = [], radios.removeClass("invalid").each(function() {
                    var checked = $(this).prop("checked");
                    radioGroup[group].push(checked);
                }), -1 != radioGroup[group].indexOf(!0) ? radios.addClass("valid") : radios.addClass("invalid");
                break;

              case "file":
                "" !== value ? el.addClass("valid") : el.addClass("invalid"), el.parents(".file-wrapper").children(".fakefile").attr("class", "fakefile " + el.attr("class"));
                break;

              default:
                var validArray = [];
                el.find("[required]").each(function() {
                    $(this).hasClass("valid") ? validArray.push(!0) : validArray.push(!1);
                }), validArray.indexOf(!1) < 0 ? (el.addClass("submitted").addClass("valid"), el.find("[data-validation='date']").datepicker("remove"), 
                el.find("input, select, textarea").attr("readonly", "readonly"), el.find("button, input[type='submit']").attr("readonly", "readonly"), 
                initDropdowns(), el.find(".form-loader").hide(), el.find(".form-done").show(), notify("Form submitted successfully.", "success", 3e3)) : (el.removeClass("valid"), 
                el.find("[required]:not('.valid')").addClass("invalid"), el.find(".form-loader").hide(), 
                el.find("button, input[type='submit']").show(), notify("Form not submitted. Please review.", "failure", 3e3));
            }
        }, validateRealtime = function(el, type, value) {
            switch (console.log("Validating keypress for " + type), type) {
              case "password":
                el.next(".password-meter-mask").width(scorePassword(value) + "%").find(".password-meter").width(el.outerWidth());
                break;

              case "card":
                $(".card-wrapper .card").attr("src", "img/icons/payment/cards/" + detectCard(value) + ".png");
            }
        };
        $("input[data-validate-key]").on("keyup", function() {
            var el = $(this), type = el.attr("data-validation"), value = el.val();
            validateRealtime(el, type, value);
        }), $("form[data-validation]").each(function() {
            var form = $(this);
            form.find("[required]").each(function() {
                var el = $(this);
                "checkbox" === el.attr("type") || "radio" === el.attr("type") ? el.on("change", function() {
                    var type = el.attr("data-validation"), value = el.val();
                    validateField(el, type, value);
                }).next("label").append("<span class='indicator-required'></span>") : el.on("keyup", function() {
                    el.removeClass("valid").removeClass("invalid");
                }).on("focus", function() {
                    var type = el.attr("data-validation"), value = el.val();
                    "select" == type && el.next(".dropdown-current").removeClass("valid").removeClass("invalid"), 
                    $(this).hasClass("invalid") && validateField(el, type, value);
                }).on("blur", function() {
                    setTimeout(function() {
                        var type = el.attr("data-validation"), value = el.val();
                        validateField(el, type, value);
                    }, 200);
                }).prev("label").append("<span class='indicator-required'></span>");
            }), form.on("submit", function(event) {
                if (form.find("[required]").each(function() {
                    var elem = $(this), type = elem.attr("data-validation"), value = elem.val();
                    validateField(elem, type, value);
                }), !form.hasClass("submitted")) {
                    var type = form.attr("data-validation"), value = "";
                    form.find("button, input[type='submit']").hide(), form.find(".form-loader").show(), 
                    event.preventDefault(), validateField(form, type, value);
                }
            });
        }), config.application.debug && console.log("Form :: Validation");
    }
}, deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0, deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent), deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent), deviceIsIOSWithBadTarget = deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);

FastClick.prototype.needsClick = function(target) {
    "use strict";
    switch (target.nodeName.toLowerCase()) {
      case "button":
      case "select":
      case "textarea":
        if (target.disabled) return !0;
        break;

      case "input":
        if (deviceIsIOS && "file" === target.type || target.disabled) return !0;
        break;

      case "label":
      case "video":
        return !0;
    }
    return /\bneedsclick\b/.test(target.className);
}, FastClick.prototype.needsFocus = function(target) {
    "use strict";
    switch (target.nodeName.toLowerCase()) {
      case "textarea":
        return !0;

      case "select":
        return !deviceIsAndroid;

      case "input":
        switch (target.type) {
          case "button":
          case "checkbox":
          case "file":
          case "image":
          case "radio":
          case "submit":
            return !1;
        }
        return !target.disabled && !target.readOnly;

      default:
        return /\bneedsfocus\b/.test(target.className);
    }
}, FastClick.prototype.sendClick = function(targetElement, event) {
    "use strict";
    var clickEvent, touch;
    document.activeElement && document.activeElement !== targetElement && document.activeElement.blur(), 
    touch = event.changedTouches[0], clickEvent = document.createEvent("MouseEvents"), 
    clickEvent.initMouseEvent(this.determineEventType(targetElement), !0, !0, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, !1, !1, !1, !1, 0, null), 
    clickEvent.forwardedTouchEvent = !0, targetElement.dispatchEvent(clickEvent);
}, FastClick.prototype.determineEventType = function(targetElement) {
    "use strict";
    return deviceIsAndroid && "select" === targetElement.tagName.toLowerCase() ? "mousedown" : "click";
}, FastClick.prototype.focus = function(targetElement) {
    "use strict";
    var length;
    deviceIsIOS && targetElement.setSelectionRange && 0 !== targetElement.type.indexOf("date") && "time" !== targetElement.type ? (length = targetElement.value.length, 
    targetElement.setSelectionRange(length, length)) : targetElement.focus();
}, FastClick.prototype.updateScrollParent = function(targetElement) {
    "use strict";
    var scrollParent, parentElement;
    if (scrollParent = targetElement.fastClickScrollParent, !scrollParent || !scrollParent.contains(targetElement)) {
        parentElement = targetElement;
        do {
            if (parentElement.scrollHeight > parentElement.offsetHeight) {
                scrollParent = parentElement, targetElement.fastClickScrollParent = parentElement;
                break;
            }
            parentElement = parentElement.parentElement;
        } while (parentElement);
    }
    scrollParent && (scrollParent.fastClickLastScrollTop = scrollParent.scrollTop);
}, FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
    "use strict";
    return eventTarget.nodeType === Node.TEXT_NODE ? eventTarget.parentNode : eventTarget;
}, FastClick.prototype.onTouchStart = function(event) {
    "use strict";
    var targetElement, touch, selection;
    if (event.targetTouches.length > 1) return !0;
    if (targetElement = this.getTargetElementFromEventTarget(event.target), touch = event.targetTouches[0], 
    deviceIsIOS) {
        if (selection = window.getSelection(), selection.rangeCount && !selection.isCollapsed) return !0;
        if (!deviceIsIOS4) {
            if (touch.identifier === this.lastTouchIdentifier) return event.preventDefault(), 
            !1;
            this.lastTouchIdentifier = touch.identifier, this.updateScrollParent(targetElement);
        }
    }
    return this.trackingClick = !0, this.trackingClickStart = event.timeStamp, this.targetElement = targetElement, 
    this.touchStartX = touch.pageX, this.touchStartY = touch.pageY, event.timeStamp - this.lastClickTime < 200 && event.preventDefault(), 
    !0;
}, FastClick.prototype.touchHasMoved = function(event) {
    "use strict";
    var touch = event.changedTouches[0], boundary = this.touchBoundary;
    return Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary ? !0 : !1;
}, FastClick.prototype.onTouchMove = function(event) {
    "use strict";
    return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) && (this.trackingClick = !1, 
    this.targetElement = null), !0) : !0;
}, FastClick.prototype.findControl = function(labelElement) {
    "use strict";
    return void 0 !== labelElement.control ? labelElement.control : labelElement.htmlFor ? document.getElementById(labelElement.htmlFor) : labelElement.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea");
}, FastClick.prototype.onTouchEnd = function(event) {
    "use strict";
    var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;
    if (!this.trackingClick) return !0;
    if (event.timeStamp - this.lastClickTime < 200) return this.cancelNextClick = !0, 
    !0;
    if (this.cancelNextClick = !1, this.lastClickTime = event.timeStamp, trackingClickStart = this.trackingClickStart, 
    this.trackingClick = !1, this.trackingClickStart = 0, deviceIsIOSWithBadTarget && (touch = event.changedTouches[0], 
    targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement, 
    targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent), 
    targetTagName = targetElement.tagName.toLowerCase(), "label" === targetTagName) {
        if (forElement = this.findControl(targetElement)) {
            if (this.focus(targetElement), deviceIsAndroid) return !1;
            targetElement = forElement;
        }
    } else if (this.needsFocus(targetElement)) return event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && "input" === targetTagName ? (this.targetElement = null, 
    !1) : (this.focus(targetElement), this.sendClick(targetElement, event), deviceIsIOS4 && "select" === targetTagName || (this.targetElement = null, 
    event.preventDefault()), !1);
    return deviceIsIOS && !deviceIsIOS4 && (scrollParent = targetElement.fastClickScrollParent, 
    scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) ? !0 : (this.needsClick(targetElement) || (event.preventDefault(), 
    this.sendClick(targetElement, event)), !1);
}, FastClick.prototype.onTouchCancel = function() {
    "use strict";
    this.trackingClick = !1, this.targetElement = null;
}, FastClick.prototype.onMouse = function(event) {
    "use strict";
    return this.targetElement ? event.forwardedTouchEvent ? !0 : event.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (event.stopImmediatePropagation ? event.stopImmediatePropagation() : event.propagationStopped = !0, 
    event.stopPropagation(), event.preventDefault(), !1) : !0 : !0;
}, FastClick.prototype.onClick = function(event) {
    "use strict";
    var permitted;
    return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, 
    !0) : "submit" === event.target.type && 0 === event.detail ? !0 : (permitted = this.onMouse(event), 
    permitted || (this.targetElement = null), permitted);
}, FastClick.prototype.destroy = function() {
    "use strict";
    var layer = this.layer;
    deviceIsAndroid && (layer.removeEventListener("mouseover", this.onMouse, !0), layer.removeEventListener("mousedown", this.onMouse, !0), 
    layer.removeEventListener("mouseup", this.onMouse, !0)), layer.removeEventListener("click", this.onClick, !0), 
    layer.removeEventListener("touchstart", this.onTouchStart, !1), layer.removeEventListener("touchmove", this.onTouchMove, !1), 
    layer.removeEventListener("touchend", this.onTouchEnd, !1), layer.removeEventListener("touchcancel", this.onTouchCancel, !1);
}, FastClick.notNeeded = function(layer) {
    "use strict";
    var metaViewport, chromeVersion;
    if ("undefined" == typeof window.ontouchstart) return !0;
    if (chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [ , 0 ])[1]) {
        if (!deviceIsAndroid) return !0;
        if (metaViewport = document.querySelector("meta[name=viewport]")) {
            if (-1 !== metaViewport.content.indexOf("user-scalable=no")) return !0;
            if (chromeVersion > 31 && window.innerWidth <= window.screen.width) return !0;
        }
    }
    return "none" === layer.style.msTouchAction ? !0 : !1;
}, FastClick.attach = function(layer) {
    "use strict";
    return new FastClick(layer);
}, "undefined" != typeof define && define.amd ? define(function() {
    "use strict";
    return FastClick;
}) : "undefined" != typeof module && module.exports ? (module.exports = FastClick.attach, 
module.exports.FastClick = FastClick) : window.FastClick = FastClick, function($, window) {
    var vimeoJqueryAPI = {
        catchMethods: {
            methodreturn: [],
            count: 0
        },
        init: function(d) {
            var vimeoVideo, vimeoAPIurl, data;
            d.originalEvent.origin.match(/vimeo/g) && "data" in d.originalEvent && (data = "string" === $.type(d.originalEvent.data) ? $.parseJSON(d.originalEvent.data) : d.originalEvent.data, 
            data && (vimeoVideo = this.setPlayerID(data), vimeoVideo.length && (vimeoAPIurl = this.setVimeoAPIurl(vimeoVideo), 
            data.hasOwnProperty("event") && this.handleEvent(data, vimeoVideo, vimeoAPIurl), 
            data.hasOwnProperty("method") && this.handleMethod(data, vimeoVideo, vimeoAPIurl))));
        },
        setPlayerID: function(d) {
            return $("iframe[src*=" + d.player_id + "]");
        },
        setVimeoAPIurl: function(d) {
            return "http" !== d.attr("src").substr(0, 4) ? "https:" + d.attr("src").split("?")[0] : d.attr("src").split("?")[0];
        },
        handleMethod: function(d, vid, api) {
            this.catchMethods.methodreturn.push(d.value);
        },
        handleEvent: function(d, vid, api) {
            switch (d.event.toLowerCase()) {
              case "ready":
                for (var prop in $._data(vid[0], "events")) prop.match(/loadProgress|playProgress|play|pause|finish|seek|cuechange/) && vid[0].contentWindow.postMessage(JSON.stringify({
                    method: "addEventListener",
                    value: prop
                }), api);
                if (vid.data("vimeoAPICall")) {
                    for (var vdata = vid.data("vimeoAPICall"), i = 0; i < vdata.length; i++) vid[0].contentWindow.postMessage(JSON.stringify(vdata[i].message), vdata[i].api);
                    vid.removeData("vimeoAPICall");
                }
                vid.data("vimeoReady", !0), vid.triggerHandler("ready");
                break;

              case "seek":
                vid.triggerHandler("seek", [ d.data ]);
                break;

              case "loadprogress":
                vid.triggerHandler("loadProgress", [ d.data ]);
                break;

              case "playprogress":
                vid.triggerHandler("playProgress", [ d.data ]);
                break;

              case "pause":
                vid.triggerHandler("pause");
                break;

              case "finish":
                vid.triggerHandler("finish");
                break;

              case "play":
                vid.triggerHandler("play");
                break;

              case "cuechange":
                vid.triggerHandler("cuechange");
            }
        }
    };
    jQuery(document).ready(function() {
        $("iframe[src*='vimeo.com']").each(function(index) {
            var url = $(this).attr("src");
            if (null === url.match(/player_id/g)) {
                var firstSeperator = -1 === url.indexOf("?") ? "?" : "&", param = $.param({
                    api: 1,
                    player_id: "vvvvimeoVideo-" + index
                });
                $(this).attr("src", url + firstSeperator + param);
            }
        });
    }), $(window).on("message", function(e) {
        vimeoJqueryAPI.init(e);
    }), $.vimeo = function(element, option1, option2) {
        var message = {}, catchMethodLength = vimeoJqueryAPI.catchMethods.methodreturn.length;
        if ("string" == typeof option1 && (message.method = option1), void 0 !== typeof option2 && "function" != typeof option2 && (message.value = option2), 
        "iframe" === element.prop("tagName").toLowerCase() && message.hasOwnProperty("method")) if (element.data("vimeoReady")) element[0].contentWindow.postMessage(JSON.stringify(message), vimeoJqueryAPI.setVimeoAPIurl(element)); else {
            var _data = element.data("vimeoAPICall") ? element.data("vimeoAPICall") : [];
            _data.push({
                message: message,
                api: vimeoJqueryAPI.setVimeoAPIurl(element)
            }), element.data("vimeoAPICall", _data);
        }
        return "get" !== option1.toString().substr(0, 3) && "paused" !== option1.toString() || "function" != typeof option2 || (!function(cml, func, i) {
            var interval = window.setInterval(function() {
                vimeoJqueryAPI.catchMethods.methodreturn.length != cml && (window.clearInterval(interval), 
                func(vimeoJqueryAPI.catchMethods.methodreturn[i]));
            }, 10);
        }(catchMethodLength, option2, vimeoJqueryAPI.catchMethods.count), vimeoJqueryAPI.catchMethods.count++), 
        element;
    }, $.fn.vimeo = function(option1, option2) {
        return $.vimeo(this, option1, option2);
    };
}(jQuery, window), function(w, doc) {
    "use strict";
    function picturefill(opt) {
        var elements, element, parent, firstMatch, candidates, options = opt || {};
        elements = options.elements || pf.getAllElements();
        for (var i = 0, plen = elements.length; plen > i; i++) if (element = elements[i], 
        parent = element.parentNode, firstMatch = void 0, candidates = void 0, element[pf.ns] || (element[pf.ns] = {}), 
        options.reevaluate || !element[pf.ns].evaluated) {
            if ("PICTURE" === parent.nodeName.toUpperCase()) {
                if (pf.removeVideoShim(parent), firstMatch = pf.getMatch(element, parent), firstMatch === !1) continue;
            } else firstMatch = void 0;
            ("PICTURE" === parent.nodeName.toUpperCase() || element.srcset && !pf.srcsetSupported || !pf.sizesSupported && element.srcset && element.srcset.indexOf("w") > -1) && pf.dodgeSrcset(element), 
            firstMatch ? (candidates = pf.processSourceSet(firstMatch), pf.applyBestCandidate(candidates, element)) : (candidates = pf.processSourceSet(element), 
            (void 0 === element.srcset || element[pf.ns].srcset) && pf.applyBestCandidate(candidates, element)), 
            element[pf.ns].evaluated = !0;
        }
    }
    function runPicturefill() {
        function checkResize() {
            var resizeThrottle;
            w._picturefillWorking || (w._picturefillWorking = !0, w.clearTimeout(resizeThrottle), 
            resizeThrottle = w.setTimeout(function() {
                picturefill({
                    reevaluate: !0
                }), w._picturefillWorking = !1;
            }, 60));
        }
        picturefill();
        var intervalId = setInterval(function() {
            return picturefill(), /^loaded|^i|^c/.test(doc.readyState) ? void clearInterval(intervalId) : void 0;
        }, 250);
        w.addEventListener ? w.addEventListener("resize", checkResize, !1) : w.attachEvent && w.attachEvent("onresize", checkResize);
    }
    if (w.HTMLPictureElement) return void (w.picturefill = function() {});
    doc.createElement("picture");
    var pf = {};
    pf.ns = "picturefill", function() {
        var img = doc.createElement("img");
        pf.srcsetSupported = "srcset" in img, pf.sizesSupported = "sizes" in img;
    }(), pf.trim = function(str) {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
    }, pf.endsWith = function(str, suffix) {
        return str.endsWith ? str.endsWith(suffix) : -1 !== str.indexOf(suffix, str.length - suffix.length);
    }, pf.restrictsMixedContent = function() {
        return "https:" === w.location.protocol;
    }, pf.matchesMedia = function(media) {
        return w.matchMedia && w.matchMedia(media).matches;
    }, pf.getDpr = function() {
        return w.devicePixelRatio || 1;
    }, pf.getWidthFromLength = function(length) {
        return length = length && length.indexOf("%") > -1 == !1 && (parseFloat(length) > 0 || length.indexOf("calc(") > -1) ? length : "100vw", 
        length = length.replace("vw", "%"), pf.lengthEl || (pf.lengthEl = doc.createElement("div"), 
        doc.documentElement.insertBefore(pf.lengthEl, doc.documentElement.firstChild)), 
        pf.lengthEl.style.cssText = "position: absolute; left: 0; width: " + length + ";", 
        pf.lengthEl.className = "helper-from-picturefill-js", pf.lengthEl.offsetWidth <= 0 && (pf.lengthEl.style.cssText = "width: 100%;"), 
        pf.lengthEl.offsetWidth;
    }, pf.types = {}, pf.types["image/jpeg"] = !0, pf.types["image/gif"] = !0, pf.types["image/png"] = !0, 
    pf.types["image/svg+xml"] = doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"), 
    pf.types["image/webp"] = function() {
        var img = new w.Image(), type = "image/webp";
        img.onerror = function() {
            pf.types[type] = !1, picturefill();
        }, img.onload = function() {
            pf.types[type] = 1 === img.width, picturefill();
        }, img.src = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
    }, pf.verifyTypeSupport = function(source) {
        var type = source.getAttribute("type");
        return null === type || "" === type ? !0 : "function" == typeof pf.types[type] ? (pf.types[type](), 
        "pending") : pf.types[type];
    }, pf.parseSize = function(sourceSizeStr) {
        var match = /(\([^)]+\))?\s*(.+)/g.exec(sourceSizeStr);
        return {
            media: match && match[1],
            length: match && match[2]
        };
    }, pf.findWidthFromSourceSize = function(sourceSizeListStr) {
        for (var winningLength, sourceSizeList = pf.trim(sourceSizeListStr).split(/\s*,\s*/), i = 0, len = sourceSizeList.length; len > i; i++) {
            var sourceSize = sourceSizeList[i], parsedSize = pf.parseSize(sourceSize), length = parsedSize.length, media = parsedSize.media;
            if (length && (!media || pf.matchesMedia(media))) {
                winningLength = length;
                break;
            }
        }
        return pf.getWidthFromLength(winningLength);
    }, pf.parseSrcset = function(srcset) {
        for (var candidates = []; "" !== srcset; ) {
            srcset = srcset.replace(/^\s+/g, "");
            var url, pos = srcset.search(/\s/g), descriptor = null;
            if (-1 !== pos) {
                url = srcset.slice(0, pos);
                var last = url[url.length - 1];
                if (("," === last || "" === url) && (url = url.replace(/,+$/, ""), descriptor = ""), 
                srcset = srcset.slice(pos + 1), null === descriptor) {
                    var descpos = srcset.indexOf(",");
                    -1 !== descpos ? (descriptor = srcset.slice(0, descpos), srcset = srcset.slice(descpos + 1)) : (descriptor = srcset, 
                    srcset = "");
                }
            } else url = srcset, srcset = "";
            (url || descriptor) && candidates.push({
                url: url,
                descriptor: descriptor
            });
        }
        return candidates;
    }, pf.parseDescriptor = function(descriptor, sizesattr) {
        var resCandidate, sizes = sizesattr || "100vw", sizeDescriptor = descriptor && descriptor.replace(/(^\s+|\s+$)/g, ""), widthInCssPixels = pf.findWidthFromSourceSize(sizes);
        if (sizeDescriptor) for (var splitDescriptor = sizeDescriptor.split(" "), i = splitDescriptor.length + 1; i >= 0; i--) if (void 0 !== splitDescriptor[i]) {
            var curr = splitDescriptor[i], lastchar = curr && curr.slice(curr.length - 1);
            if ("h" !== lastchar && "w" !== lastchar || pf.sizesSupported) {
                if ("x" === lastchar) {
                    var res = curr && parseFloat(curr, 10);
                    resCandidate = res && !isNaN(res) ? res : 1;
                }
            } else resCandidate = parseFloat(parseInt(curr, 10) / widthInCssPixels), resCandidate === 1 / 0 && (resCandidate = 0);
        }
        return resCandidate || 1;
    }, pf.getCandidatesFromSourceSet = function(srcset, sizes) {
        for (var candidates = pf.parseSrcset(srcset), formattedCandidates = [], i = 0, len = candidates.length; len > i; i++) {
            var candidate = candidates[i];
            formattedCandidates.push({
                url: candidate.url,
                resolution: pf.parseDescriptor(candidate.descriptor, sizes)
            });
        }
        return formattedCandidates;
    }, pf.dodgeSrcset = function(img) {
        img.srcset && (img[pf.ns].srcset = img.srcset, img.removeAttribute("srcset"));
    }, pf.processSourceSet = function(el) {
        var srcset = el.getAttribute("srcset"), sizes = el.getAttribute("sizes"), candidates = [];
        return "IMG" === el.nodeName.toUpperCase() && el[pf.ns] && el[pf.ns].srcset && (srcset = el[pf.ns].srcset), 
        srcset && (candidates = pf.getCandidatesFromSourceSet(srcset, sizes)), candidates;
    }, pf.applyBestCandidate = function(candidates, picImg) {
        var candidate, length, bestCandidate;
        candidates.sort(pf.ascendingSort), length = candidates.length, bestCandidate = candidates[length - 1];
        for (var i = 0; length > i; i++) if (candidate = candidates[i], candidate.resolution >= pf.getDpr()) {
            bestCandidate = candidate;
            break;
        }
        bestCandidate && !pf.endsWith(picImg.src, bestCandidate.url) && (pf.restrictsMixedContent() && "http:" === bestCandidate.url.substr(0, "http:".length).toLowerCase() ? void 0 !== typeof console && console.warn("Blocked mixed content image " + bestCandidate.url) : (picImg.src = bestCandidate.url, 
        picImg.currentSrc = picImg.src));
    }, pf.ascendingSort = function(a, b) {
        return a.resolution - b.resolution;
    }, pf.removeVideoShim = function(picture) {
        var videos = picture.getElementsByTagName("video");
        if (videos.length) {
            for (var video = videos[0], vsources = video.getElementsByTagName("source"); vsources.length; ) picture.insertBefore(vsources[0], video);
            video.parentNode.removeChild(video);
        }
    }, pf.getAllElements = function() {
        for (var elems = [], imgs = doc.getElementsByTagName("img"), h = 0, len = imgs.length; len > h; h++) {
            var currImg = imgs[h];
            ("PICTURE" === currImg.parentNode.nodeName.toUpperCase() || null !== currImg.getAttribute("srcset") || currImg[pf.ns] && null !== currImg[pf.ns].srcset) && elems.push(currImg);
        }
        return elems;
    }, pf.getMatch = function(img, picture) {
        for (var match, sources = picture.childNodes, j = 0, slen = sources.length; slen > j; j++) {
            var source = sources[j];
            if (1 === source.nodeType) {
                if (source === img) return match;
                if ("SOURCE" === source.nodeName.toUpperCase()) {
                    null !== source.getAttribute("src") && void 0 !== typeof console && console.warn("The `src` attribute is invalid on `picture` `source` element; instead, use `srcset`.");
                    var media = source.getAttribute("media");
                    if (source.getAttribute("srcset") && (!media || pf.matchesMedia(media))) {
                        var typeSupported = pf.verifyTypeSupport(source);
                        if (typeSupported === !0) {
                            match = source;
                            break;
                        }
                        if ("pending" === typeSupported) return !1;
                    }
                }
            }
        }
        return match;
    }, runPicturefill(), picturefill._ = pf, "object" == typeof module && "object" == typeof module.exports ? module.exports = picturefill : "function" == typeof define && define.amd ? define(function() {
        return picturefill;
    }) : "object" == typeof w && (w.picturefill = picturefill);
}(this, this.document), function(global) {
    "use strict";
    function noop() {}
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }
    function inArray(arr, item) {
        for (var i = 0, len = arr.length; len > i; i++) if (arr[i] === item) return !0;
        return !1;
    }
    function addEventListener(elem, event, fn) {
        return elem.addEventListener ? elem.addEventListener(event, fn, !1) : elem.attachEvent ? elem.attachEvent("on" + event, fn) : void 0;
    }
    function moveCaret(elem, index) {
        var range;
        elem.createTextRange ? (range = elem.createTextRange(), range.move("character", index), 
        range.select()) : elem.selectionStart && (elem.focus(), elem.setSelectionRange(index, index));
    }
    function changeType(elem, type) {
        try {
            return elem.type = type, !0;
        } catch (e) {
            return !1;
        }
    }
    function handleElem(node, callback) {
        if (node && node.getAttribute(ATTR_CURRENT_VAL)) callback(node); else for (var elem, handleInputs = node ? node.getElementsByTagName("input") : inputs, handleTextareas = node ? node.getElementsByTagName("textarea") : textareas, handleInputsLength = handleInputs ? handleInputs.length : 0, handleTextareasLength = handleTextareas ? handleTextareas.length : 0, len = handleInputsLength + handleTextareasLength, i = 0; len > i; i++) elem = handleInputsLength > i ? handleInputs[i] : handleTextareas[i - handleInputsLength], 
        callback(elem);
    }
    function disablePlaceholders(node) {
        handleElem(node, hidePlaceholder);
    }
    function enablePlaceholders(node) {
        handleElem(node, showPlaceholder);
    }
    function hidePlaceholder(elem, keydownValue) {
        var valueChanged = !!keydownValue && elem.value !== keydownValue, isPlaceholderValue = elem.value === elem.getAttribute(ATTR_CURRENT_VAL);
        if ((valueChanged || isPlaceholderValue) && "true" === elem.getAttribute(ATTR_ACTIVE)) {
            elem.removeAttribute(ATTR_ACTIVE), elem.value = elem.value.replace(elem.getAttribute(ATTR_CURRENT_VAL), ""), 
            elem.className = elem.className.replace(classNameRegExp, "");
            var maxLength = elem.getAttribute(ATTR_MAXLENGTH);
            parseInt(maxLength, 10) >= 0 && (elem.setAttribute("maxLength", maxLength), elem.removeAttribute(ATTR_MAXLENGTH));
            var type = elem.getAttribute(ATTR_INPUT_TYPE);
            return type && (elem.type = type), !0;
        }
        return !1;
    }
    function showPlaceholder(elem) {
        var val = elem.getAttribute(ATTR_CURRENT_VAL);
        if ("" === elem.value && val) {
            elem.setAttribute(ATTR_ACTIVE, "true"), elem.value = val, elem.className += " " + placeholderClassName;
            var maxLength = elem.getAttribute(ATTR_MAXLENGTH);
            maxLength || (elem.setAttribute(ATTR_MAXLENGTH, elem.maxLength), elem.removeAttribute("maxLength"));
            var type = elem.getAttribute(ATTR_INPUT_TYPE);
            return type ? elem.type = "text" : "password" === elem.type && changeType(elem, "text") && elem.setAttribute(ATTR_INPUT_TYPE, "password"), 
            !0;
        }
        return !1;
    }
    function makeFocusHandler(elem) {
        return function() {
            hideOnInput && elem.value === elem.getAttribute(ATTR_CURRENT_VAL) && "true" === elem.getAttribute(ATTR_ACTIVE) ? moveCaret(elem, 0) : hidePlaceholder(elem);
        };
    }
    function makeBlurHandler(elem) {
        return function() {
            showPlaceholder(elem);
        };
    }
    function makeSubmitHandler(form) {
        return function() {
            disablePlaceholders(form);
        };
    }
    function makeKeydownHandler(elem) {
        return function(e) {
            return keydownVal = elem.value, "true" === elem.getAttribute(ATTR_ACTIVE) && keydownVal === elem.getAttribute(ATTR_CURRENT_VAL) && inArray(badKeys, e.keyCode) ? (e.preventDefault && e.preventDefault(), 
            !1) : void 0;
        };
    }
    function makeKeyupHandler(elem) {
        return function() {
            hidePlaceholder(elem, keydownVal), "" === elem.value && (elem.blur(), moveCaret(elem, 0));
        };
    }
    function makeClickHandler(elem) {
        return function() {
            elem === safeActiveElement() && elem.value === elem.getAttribute(ATTR_CURRENT_VAL) && "true" === elem.getAttribute(ATTR_ACTIVE) && moveCaret(elem, 0);
        };
    }
    function newElement(elem) {
        var form = elem.form;
        form && "string" == typeof form && (form = document.getElementById(form), form.getAttribute(ATTR_FORM_HANDLED) || (addEventListener(form, "submit", makeSubmitHandler(form)), 
        form.setAttribute(ATTR_FORM_HANDLED, "true"))), addEventListener(elem, "focus", makeFocusHandler(elem)), 
        addEventListener(elem, "blur", makeBlurHandler(elem)), hideOnInput && (addEventListener(elem, "keydown", makeKeydownHandler(elem)), 
        addEventListener(elem, "keyup", makeKeyupHandler(elem)), addEventListener(elem, "click", makeClickHandler(elem))), 
        elem.setAttribute(ATTR_EVENTS_BOUND, "true"), elem.setAttribute(ATTR_CURRENT_VAL, placeholder), 
        (hideOnInput || elem !== safeActiveElement()) && showPlaceholder(elem);
    }
    var test = document.createElement("input"), nativeSupport = void 0 !== test.placeholder;
    if (global.Placeholders = {
        nativeSupport: nativeSupport,
        disable: nativeSupport ? noop : disablePlaceholders,
        enable: nativeSupport ? noop : enablePlaceholders
    }, !nativeSupport) {
        var keydownVal, validTypes = [ "text", "search", "url", "tel", "email", "password", "number", "textarea" ], badKeys = [ 27, 33, 34, 35, 36, 37, 38, 39, 40, 8, 46 ], placeholderStyleColor = "#ccc", placeholderClassName = "placeholdersjs", classNameRegExp = new RegExp("(?:^|\\s)" + placeholderClassName + "(?!\\S)"), ATTR_CURRENT_VAL = "data-placeholder-value", ATTR_ACTIVE = "data-placeholder-active", ATTR_INPUT_TYPE = "data-placeholder-type", ATTR_FORM_HANDLED = "data-placeholder-submit", ATTR_EVENTS_BOUND = "data-placeholder-bound", ATTR_OPTION_FOCUS = "data-placeholder-focus", ATTR_OPTION_LIVE = "data-placeholder-live", ATTR_MAXLENGTH = "data-placeholder-maxlength", UPDATE_INTERVAL = 100, head = document.getElementsByTagName("head")[0], root = document.documentElement, Placeholders = global.Placeholders, inputs = document.getElementsByTagName("input"), textareas = document.getElementsByTagName("textarea"), hideOnInput = "false" === root.getAttribute(ATTR_OPTION_FOCUS), liveUpdates = "false" !== root.getAttribute(ATTR_OPTION_LIVE), styleElem = document.createElement("style");
        styleElem.type = "text/css";
        var styleRules = document.createTextNode("." + placeholderClassName + " {color:" + placeholderStyleColor + ";}");
        styleElem.styleSheet ? styleElem.styleSheet.cssText = styleRules.nodeValue : styleElem.appendChild(styleRules), 
        head.insertBefore(styleElem, head.firstChild);
        for (var placeholder, elem, i = 0, len = inputs.length + textareas.length; len > i; i++) elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length], 
        placeholder = elem.attributes.placeholder, placeholder && (placeholder = placeholder.nodeValue, 
        placeholder && inArray(validTypes, elem.type) && newElement(elem));
        var timer = setInterval(function() {
            for (var i = 0, len = inputs.length + textareas.length; len > i; i++) elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length], 
            placeholder = elem.attributes.placeholder, placeholder ? (placeholder = placeholder.nodeValue, 
            placeholder && inArray(validTypes, elem.type) && (elem.getAttribute(ATTR_EVENTS_BOUND) || newElement(elem), 
            (placeholder !== elem.getAttribute(ATTR_CURRENT_VAL) || "password" === elem.type && !elem.getAttribute(ATTR_INPUT_TYPE)) && ("password" === elem.type && !elem.getAttribute(ATTR_INPUT_TYPE) && changeType(elem, "text") && elem.setAttribute(ATTR_INPUT_TYPE, "password"), 
            elem.value === elem.getAttribute(ATTR_CURRENT_VAL) && (elem.value = placeholder), 
            elem.setAttribute(ATTR_CURRENT_VAL, placeholder)))) : elem.getAttribute(ATTR_ACTIVE) && (hidePlaceholder(elem), 
            elem.removeAttribute(ATTR_CURRENT_VAL));
            liveUpdates || clearInterval(timer);
        }, UPDATE_INTERVAL);
        addEventListener(global, "beforeunload", function() {
            Placeholders.disable();
        });
    }
}(this);

var initAutocomplete = function() {
    $("[data-autocomplete]").length && ($("[data-autocomplete]").each(function() {
        var el = $(this), url = el.data("autocomplete-feed"), input = el.children("input"), loader = el.children(".loader"), parameter = input.data("autocomplete-parameter"), listIndex = 0, listMax = 10, listShow = $(window).width() > 480 ? 7 : 5, selecting = !1;
        el.append("<div class='autocomplete-list'></div>");
        var list = el.children(".autocomplete-list"), build = function(data) {
            list.children(".loader").hide(), list.append("<ul class='no-results'><li>No matches found. Press Enter to search globally.</li></ul>");
            var noResults = list.children("ul.no-results");
            noResults.hide(), list.append("<ul class='autocomplete-results'></ul>");
            var results = list.children("ul.autocomplete-results");
            results.append("<li class='divider'><span class='match-count'>0</span>Match<span class='plural'>es</span></li>"), 
            list.append("<ul class='autocomplete-suggestions'></ul>");
            var suggestions = list.children("ul.autocomplete-suggestions");
            suggestions.prepend("<li class='divider'>Suggested Items</li>"), list.append("<ul class='autocomplete-key-contacts'></ul>");
            var keyContacts = list.children("ul.autocomplete-key-contacts");
            keyContacts.append("<li class='divider'>Key Contacts</li>");
            for (var JSONobjects = data.Results, tempArray = [], i = 0; i < JSONobjects.length; i++) {
                var object = JSONobjects[i], property = object[parameter];
                if (property instanceof Array) for (var j = 0; j < property.length; j++) $.inArray(property[j], tempArray) < 0 && tempArray.push(object); else $.inArray(property, tempArray) < 0 && tempArray.push(object);
            }
            for (var itemsArray = tempArray.sort(), k = 0; k < itemsArray.length; k++) results.append("<li data-keywords='" + itemsArray[k].Keywords.join() + "'>							<a href='" + itemsArray[k].Url + "'>" + itemsArray[k].Title + "</a>						</li>");
            var init = function() {
                var show = function() {
                    var item = list.find("ul:not(.no-results) li:not(.divider)"), term = input.val(), filter = new RegExp(term, "i");
                    item.each(function() {
                        $(this).text().search(filter) >= 0 ? $(this).appendTo(results) : $(this).data("keywords").search(filter) >= 0 && ($(this).appendTo(suggestions), 
                        $(this).children("a").attr("href").indexOf("key-person") > -1 && $(this).appendTo(keyContacts));
                    });
                    var result = results.children("li:not(.divider)");
                    loader.show(), results.show(), result.each(function() {
                        $(this).text().search(filter) >= 0 ? results.children(".selected").length < listMax && $(this).addClass("selected") : $(this).removeClass("selected"), 
                        results.find(".divider .match-count").text(results.find(".selected").length + " "), 
                        1 == results.children(".selected").length ? results.find(".divider .plural").hide() : results.find(".divider .plural").show();
                    }).on("click", function() {
                        var value = $(this).text().trim();
                        input.val(value).trigger({
                            type: "keydown",
                            which: 13
                        }), list.removeClass("active"), unhighlight(results.children("li.selected"));
                    }), 0 === results.children(".selected").length && results.hide().find(".divider .match-count").text("No "), 
                    term.length > 0 ? list.addClass("active") : list.removeClass("active");
                    var suggestion = suggestions.children("li:not(.divider)");
                    suggestions.show(), suggestion.each(function() {
                        $(this).data("keywords").search(filter) < 0 ? $(this).removeClass("selected") : $(this).addClass("selected"), 
                        0 === suggestions.children(".selected").length && suggestions.hide();
                    });
                    var keyContact = keyContacts.children("li:not(.divider)");
                    keyContacts.show(), keyContact.each(function() {
                        $(this).data("keywords").search(filter) < 0 ? $(this).removeClass("selected") : $(this).addClass("selected"), 
                        0 === keyContacts.children(".selected").length && keyContacts.hide();
                    });
                    var totalShowing = list.find("li.divider:visible").length + list.find("li.selected").length;
                    totalShowing >= listShow ? list.css("height", list.find("li.selected").outerHeight() * listShow) : list.css("height", "auto"), 
                    list.find(".selected").length > 0 ? (noResults.hide(), highlight(results.children("li.selected"), term)) : (noResults.show(), 
                    unhighlight(results.children("li.selected"))), loader.hide();
                };
                list.on("mouseenter", function() {
                    selecting = !0;
                }).on("mouseleave", function() {
                    selecting = !1;
                }), input.on("keydown", function(event) {
                    if (list.hasClass("active")) {
                        var resultTop, resultBottom, selectedResult = results.children("li.selected"), listTop = list.scrollTop(), listBottom = listTop + list.height();
                        results.children("li:not(.divider)").removeClass("active"), 38 === event.keyCode && listIndex > 0 && (listIndex--, 
                        selectedResult.eq(listIndex).addClass("active"), resultTop = selectedResult.eq(listIndex).position().top, 
                        resultBottom = resultTop + selectedResult.eq(listIndex).outerHeight(), listTop > resultTop && list.scrollTop(resultBottom - list.height())), 
                        40 === event.keyCode && listIndex < selectedResult.length - 1 && (listIndex++, selectedResult.eq(listIndex).addClass("active"), 
                        resultTop = selectedResult.eq(listIndex).position().top, resultBottom = resultTop + selectedResult.eq(listIndex).outerHeight(), 
                        resultBottom > listBottom && list.scrollTop(resultTop)), (9 === event.keyCode || 13 === event.keyCode) && input.val(results.children("li.active").text()), 
                        (8 === event.keyCode || 46 === event.keyCode) && (listIndex = -1), 27 === event.keyCode && input.blur();
                    }
                }).on("keyup", function(event) {
                    show();
                }).on("focus", function() {
                    listIndex = list.find("li.active").length ? listIndex : -1, show();
                }).on("blur", function() {
                    selecting === !1 && (list.removeClass("active"), unhighlight(list.find("li")));
                });
            };
            init();
        };
        requestData(url, "GET", build);
    }), config.application.debug && console.log("Search :: Autocomplete"));
}, textResize = function(elem) {
    var el = $(elem), charLimit = config.typography.autoresize.characters, rowLimit = config.typography.autoresize.rows, minFontSize = config.typography.autoresize.minFontSize, maxFontSize = config.typography.autoresize.maxFontSize, fontSize = minFontSize;
    (function() {
        if (!el.hasClass("rebuilt")) {
            var string = el.text();
            el.children("span").length || el.empty().append("<span>" + string + "</span>");
            var span = el.children("span"), stringContent = span.text().trim(), stringLength = stringContent.length, stringFinal = "", stringHalf = Math.round(stringLength / 2), spaceFound = !1;
            if (stringLength > charLimit && rowLimit > 1) {
                for (var i = 0; stringLength > i; i++) !spaceFound && i > stringHalf && /\s/.test(stringContent[i]) ? (stringFinal += "<span>&#32;</span>", 
                spaceFound = !0) : stringFinal += stringContent[i];
                span.html(stringFinal);
            }
            el.addClass("rebuilt");
        }
    })(), function() {
        do fontSize--, el.css("font-size", fontSize.toString() + "px"); while (el.children("span").width() > el.width() && fontSize >= minFontSize);
        do fontSize++, el.css("font-size", fontSize.toString() + "px"); while (el.children("span").width() < el.width() && maxFontSize >= fontSize);
        el.hasClass("resized") || el.addClass("resized");
    }();
}, initKonami = function(callback) {
    var userCode = [], userString = "", konamiCoding = !1, buildKonami = function() {
        var img = '<img class="konami" style="width: 100%;" src="img/konami/contra.gif">';
        $(".main").prepend(img);
    }, resetKonami = function() {
        userCode = [], userString = "", konamiCoding = !1, $(".konami").remove();
    }, callKonami = function(event) {
        var konamiCode = [ 38, 38, 40, 40, 37, 39, 37, 39, 66, 65 ], konamiString = konamiCode.join(", ");
        38 == event.keyCode && (konamiCoding = !0), konamiCoding && userString.length <= konamiString.length ? (-1 == userString.indexOf(konamiString) && (userCode.push(event.keyCode), 
        userString = userCode.join(", ")), -1 != userString.indexOf(konamiString) && (console.log("Easter Egg :: Konami!"), 
        resetKonami(), buildKonami(), 27 == event.keyCode && resetKonami())) : resetKonami();
    };
    $(document).on("keyup", callKonami), config.application.debug && console.log("Widget :: Konami");
}, map, themes = {
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
}, testHiRes = function() {
    var dpr = window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI || 1;
    return dpr ? dpr > 1 : void 0;
}, buildMap = function() {
    var init = function(data) {
        var mapOptions = {
            center: new google.maps.LatLng(data.Options[0].CenterLat, data.Options[0].CenterLng),
            zoom: data.Options[0].Zoom,
            zoomControl: !0,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE
            },
            disableDoubleClickZoom: !1,
            mapTypeControl: !1,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
            },
            scale: testHiRes() ? 2 : 1,
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
        }, mapElement = document.getElementById("map-canvas");
        map = new google.maps.Map(mapElement, mapOptions);
        var bindInfoWindow = function(marker, map, title, desc, telephone, email, web) {
            "http://" != web.substring(0, 7) ? link = "http://" + web : link = web;
            var infoWindowVisible = function() {
                var currentlyVisible = !1;
                return function(visible) {
                    return void 0 !== visible && (currentlyVisible = visible), currentlyVisible;
                };
            }();
            iw = new google.maps.InfoWindow(), google.maps.event.addListener(marker, "click", function() {
                iw.close(), infoWindowVisible(!1);
                var html = "<div class='gm-info'><h4>" + title + "</h4><p>" + desc + "<p><p>" + telephone + "<p><a href='mailto:" + email + "' >" + email + "<a><a href='" + link + "'' >" + web + "<a></div>";
                iw = new google.maps.InfoWindow({
                    content: html
                }), iw.open(map, marker), infoWindowVisible(!0);
            }), google.maps.event.addListener(iw, "closeclick", function() {
                infoWindowVisible(!1);
            });
        };
        for (i = 0; i < data.Markers.length; i++) marker = new google.maps.Marker({
            icon: data.Markers[i].Marker,
            position: new google.maps.LatLng(data.Markers[i].Lat, data.Markers[i].Lng),
            map: map,
            title: data.Markers[i].Title,
            desc: data.Markers[i].Desc,
            tel: data.Markers[i].Tel,
            email: data.Markers[i].Email,
            web: data.Markers[i].Url
        }), bindInfoWindow(marker, map, data.Markers[i].Title, data.Markers[i].Desc, data.Markers[i].Tel, data.Markers[i].Email, data.Markers[i].Url);
    };
    window.google && google.maps && ($(".map-canvas").each(function() {
        requestData($(this).data("feed"), "GET", init), google.maps.event.addDomListener(window, "resize", function() {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize"), map.setCenter(center);
        });
    }), config.application.debug && console.log("Widget ~~ Map"));
}, initMap = function() {
    $(".map-wrapper").length && loadScript("//maps.googleapis.com/maps/api/js?key=&sensor=false&extension=.js&callback=buildMap");
}, notificationCount = 0, cookieNotify = !1, Timer = function(callback, delay) {
    var timerId, start, remaining = delay;
    this.stop = function() {
        window.clearTimeout(timerId), remaining = delay;
    }, this.pause = function() {
        window.clearTimeout(timerId), remaining -= new Date() - start;
    }, this.resume = function() {
        start = new Date(), window.clearTimeout(timerId), timerId = window.setTimeout(callback, remaining);
    }, this.resume();
}, notify = function(message, delay, tone) {
    delay = "undefined" == typeof delay || isNaN(delay) || "" === delay ? config.notification.delay : delay, 
    tone = "undefined" == typeof tone || "" === tone ? config.notification.tone : tone;
    var notifyShow = function() {
        var notification = '<div class="notification notification-' + notificationCount + '" data-type="' + tone + '">								<span class="notification-message">' + message + '</span>								<div class="notification-close">									<img class="svg icon icon-close" src="img/icons/icon-close.svg" width="16" height="16" onerror="this.onerror=null;this.src=\'img/icons/icon-close.png\'">								</div>							</div>';
        $(".notification-wrapper").append(notification);
        var el = $(".notification-" + notificationCount), clear = function() {
            el.removeClass("active"), setTimeout(function() {
                el.remove();
            }, 300);
        };
        0 !== delay && (timer = new Timer(clear, delay)), el.addClass(tone).off("mouseenter").on("mouseenter", function() {
            0 !== delay && timer.pause();
        }).off("mouseleave").on("mouseleave", function() {
            0 !== delay && timer.resume();
        }).on("click", clear), cookieNotify && (el.addClass("cookie"), cookieNotify = !1), 
        setTimeout(function() {
            el.addClass("active");
        }, 10), notificationCount++, config.application.debug && console.log("Trigger :: Notification | Delay: " + delay);
    };
    config.notification.active ? notifyShow() : config.cookie.active && notifyShow();
}, initNotifications = function() {
    $("[data-notification]").length && ($("[data-notification]").on("click", function() {
        var message = $(this).attr("data-message"), delay = parseInt($(this).attr("data-delay")), tone = $(this).attr("data-tone");
        notify(message, delay, tone);
    }), config.application.debug && console.log("Widget :: Notifications"));
}, initOverlays = function() {
    $("[data-overlay]").length && ($("[data-overlay]").each(function() {
        var el = $(this), target = $("#" + el.data("overlay"));
        el.on("click", function() {
            target.hasClass("active") ? target.removeClass("active") : target.addClass("active");
        }), target.on("click", function() {
            target.removeClass("active");
        }), target.children(".overlay-close").on("click", function() {
            target.removeClass("active");
        }), target.children(".modal").on("click", function(event) {
            $(event.target).closest(".overlay-close").length || event.stopPropagation();
        });
    }), config.application.debug && console.log("Widget :: Overlays"));
}, initSearch = function() {
    $("[data-search]").length && ($("[data-search]").each(function(i) {
        var el = $(this), url = el.data("search"), input = (el.find(".search-icon"), el.find("input[data-search-parameter]")), select = el.find("select[data-search-parameter]"), outputArray = [], tagcloudElement = '<ul class="tagcloud"></ul>', tagclose = '<img class="svg icon icon-close" src="' + config.application.root + 'img/icons/icon-close.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + "img/icons/icon-close.png'\">", searchView = el.data("search-view") ? el.data("search-view") : config.search.view, searchDisplay = el.data("search-display") ? el.data("search-display") : config.search.display, resultsControlsElement = '<div class="search-controls"></div>', resultsCountElement = '<div class="search-count"></div>', resultsViewsElement = '<div class="search-views">											<div class="search-view" data-view="grid">												<img class="svg icon icon-grid" src="' + config.application.root + 'img/icons/icon-grid.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + 'img/icons/icon-grid.png\'">											</div>											<div class="search-view" data-view="list">												<img class="svg icon icon-list" src="' + config.application.root + 'img/icons/icon-list.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + "img/icons/icon-list.png'\">											</div>										</div>", resultsPaginationElement = '<div class="search-pagination"></div>', resultsElement = '<div class="search-results loading ' + searchDisplay + '" data-view="' + searchView + '"></div>', loadElement = '<button class="primary center search-load">Load More</button>';
        $(".search-results").length ? $(".search-results").addClass("loading").addClass(searchDisplay).attr("data-view", searchView) : $(".search-container").append(resultsElement);
        var results = $(".search-results");
        $(tagcloudElement).insertBefore(results), $(resultsControlsElement).insertBefore(results), 
        $(loadElement).insertAfter(results);
        var tagcloud = $(".tagcloud"), controls = $(".search-controls"), load = $(".search-load");
        controls.append(resultsViewsElement).append(resultsCountElement);
        var views = controls.find(".search-views"), count = controls.find(".search-count");
        initSVGs(), views.children(".search-view[data-view='" + searchView + "']").addClass("active"), 
        views.on("click", ".search-view", function() {
            var el = $(this), view = el.data("view");
            el.addClass("active").siblings().removeClass("active"), results.attr("data-view", view);
        });
        var buildSystem = function(data) {
            var JSONobjects = data.Results, parameterArray = [], resultArray = [], populateSelects = function(parameter) {
                var target = el.find("select[data-search-parameter='" + parameter + "']"), tempArray = [];
                outputArray[parameter] = [], resultArray[parameter] = [];
                for (var i = 0; i < JSONobjects.length; i++) {
                    var object = JSONobjects[i], property = object[parameter];
                    if (property instanceof Array) for (var k = 0; k < property.length; k++) $.inArray(property[k], tempArray) < 0 && tempArray.push(property[k]); else $.inArray(property, tempArray) < 0 && tempArray.push(property);
                }
                var placeholder = '<option value="" default selected>Select ' + parameter + "...</option>";
                target.append(placeholder), tempArray.sort();
                for (var j = 0; j < tempArray.length; j++) {
                    var option = '<option value="' + tempArray[j] + '">' + tempArray[j] + "</option>";
                    target.append(option);
                }
            }, inputInit = function() {
                var parameter = input.data("search-parameter");
                parameterArray.push(parameter), outputArray[parameter] = [], input.length && input.each(function() {
                    $(this).on("keyup", function(event) {
                        var value = $(this).val().toLowerCase(), parameter = $(this).data("search-parameter"), keycode = (parameter.replace(/\s/g, "").split(","), 
                        event.keyCode), validKeys = 32 == keycode || 13 === keycode || 8 == keycode || keycode > 47 && 58 > keycode || keycode > 64 && 91 > keycode || keycode > 95 && 112 > keycode || keycode > 185 && 193 > keycode || keycode > 218 && 223 > keycode;
                        return validKeys ? (value.length <= 1 && unhighlight(results), outputArray[parameter] = value, 
                        updateResults(), !1) : void 0;
                    });
                }), select.length && select.each(function(i) {
                    var parameter = ($(this).val(), $(this).data("search-parameter"));
                    populateSelects(parameter), parameterArray.push(parameter), outputArray[parameter] = [], 
                    $(this).on("change", function(event) {
                        event.preventDefault();
                        var value = $(this).val(), tag = '<li class="tag" data-tag-group="' + i + '" data-tag-parameter="' + parameter + '" data-tag="' + value + '">' + value + tagclose + "</li>";
                        if ("" !== value) {
                            if (!($.inArray(value, outputArray[parameter]) < 0)) return notify("This tag already exists.", "failure"), 
                            !1;
                            tagcloud.addClass("active").append(tag);
                        }
                        updateTags(parameter), initSVGs();
                    });
                }), tagcloud.on("click", ".tag", function() {
                    var parameter = $(this).data("tag-parameter");
                    $(this).remove(), tagcloud.children(".tag").length > 0 ? tagcloud.addClass("active") : tagcloud.removeClass("active"), 
                    updateTags(parameter);
                });
            }, updateTags = function(parameter) {
                for (var target = tagcloud.children(".tag[data-tag-parameter='" + parameter + "']"), tempArray = [], n = 0; n < target.length; n++) {
                    var value = target.eq(n).data("tag");
                    tempArray.push(value);
                }
                outputArray[parameter] = tempArray, updateResults();
            };
            inputInit();
            var updateResults = function() {
                for (var allArray = [], resultArray = [], existsArray = [], totalArray = [], finalArray = [], i = 0; i < JSONobjects.length; i++) {
                    var object = JSONobjects[i], id = object.Id;
                    allArray.push(id);
                }
                for (var j = 0; j < parameterArray.length; j++) resultArray[parameterArray[j]] = [];
                var currentPage = 1, inputAnalysis = function() {
                    if (input.length) {
                        for (var parameter = input.data("search-parameter"), criteria = parameter.replace(/\s/g, "").split(","), tempArray = [], i = 0; i < JSONobjects.length; i++) for (var object = JSONobjects[i], id = object.Id, compare = outputArray[parameter], j = 0; j < criteria.length; j++) {
                            var retrieved = object[criteria[j]];
                            if (retrieved instanceof Array) for (var k = 0; k < retrieved.length; k++) {
                                var analyseArray = retrieved[k].toLowerCase();
                                analyseArray.indexOf(compare) > -1 && "" !== input.val() && $.inArray(id, tempArray) < 0 && tempArray.push(id);
                            } else {
                                var analyseString = retrieved.toLowerCase();
                                analyseString.indexOf(compare) > -1 && "" !== input.val() && $.inArray(id, tempArray) < 0 && tempArray.push(id);
                            }
                        }
                        resultArray[parameter] = tempArray;
                    }
                }, tagAnalysis = function() {
                    for (var n = 0; n < tagcloud.children(".tag").length; n++) {
                        for (var parameter = tagcloud.children(".tag").eq(n).data("tag-parameter"), criteria = parameter, compare = outputArray[parameter], tempArray = [], i = 0; i < JSONobjects.length; i++) {
                            var object = JSONobjects[i], id = object.Id, analyse = object[criteria];
                            if (analyse instanceof Array) {
                                var joined = analyse.concat(compare);
                                joined.duplicates().length > 0 && $.inArray(id, tempArray) < 0 && tempArray.push(id);
                            } else $.inArray(analyse, compare) > -1 && $.inArray(id, tempArray) < 0 && tempArray.push(id);
                        }
                        resultArray[parameter] = tempArray;
                    }
                };
                inputAnalysis(), tagAnalysis();
                for (var k = 0; k < parameterArray.length; k++) {
                    var outputSet = outputArray[parameterArray[k]], resultSet = resultArray[parameterArray[k]];
                    if (existsArray.push(outputSet.length > 0), outputSet.length > 0) {
                        var joined = resultSet.concat(allArray).duplicates();
                        totalArray.push(joined);
                    }
                }
                for (var outputCount = 0, l = 0; l < existsArray.length; l++) existsArray[l] === !0 && outputCount++;
                var hasOutput = outputCount >= 1, cleanArray = totalArray.reduce().sort(), countRepeated = function(arr) {
                    for (var counts = {}, i = 0; i < arr.length; i++) {
                        var num = arr[i];
                        counts[num] = counts[num] ? counts[num] + 1 : 1;
                    }
                    return counts;
                }, analysis = countRepeated(cleanArray);
                if (hasOutput) for (var m = 0; m < cleanArray.length; m++) analysis[cleanArray[m]] === outputCount && $.inArray(cleanArray[m], finalArray) < 0 && finalArray.push(cleanArray[m]); else finalArray = allArray;
                config.application.debug && console.log("Search == " + finalArray.length + " items");
                var pagination, firstLoad = !0, rebuildSystem = function() {
                    var loadItems = function() {
                        results.append(resultsPaginationElement);
                        for (var i = 0; i < JSONobjects.length; i++) {
                            var object = JSONobjects[i], id = object.Id, image = object.Image, title = object.Title, dateStr = object.Date, z = dateStr.replace("Z", ""), a = z.split("T"), d = a[0].split("-"), t = a[1].split(":"), date = new Date(d[0], d[1] - 1, d[2], t[0], t[1], t[2]), hour = date.getHours(), hours = 10 > hour ? "0" + hour : hour, minute = date.getMinutes(), minutes = 10 > minute ? "0" + minute : minute, day = date.getDate(), days = 10 > day ? "0" + day : day, month = date.getMonth(), months = 10 > month + 1 ? "0" + (month + 1) : month + 1, year = date.getFullYear(), years = 10 > year ? "0" + year : year, fulldate = hours + ":" + minutes + " @ " + days + "/" + months + "/" + years, url = object.Url, summary = object.Summary, type = object.Type, categories = object.Categories.length > 0 ? object.Categories.toString().replace(/,/g, ", ") : "None", tags = object.Tags.length > 0 ? object.Tags.toString().replace(/,/g, ", ") : "None", result = '<div class="search-item loading">												  <a class="img" href="' + url + '" style="background: url(' + image + ') no-repeat center center;"></a>												  <a class="title" href="' + url + '">' + title + '</a>												  <div class="date">' + fulldate + '</div>												  <div class="type">' + type + '</div>												  <div class="summary">' + summary + '</div>												  <div class="info">													  <div class="categories" data-tooltip="' + categories + '">Categories</div>													  <div class="tags" data-tooltip="' + tags + '">Tags</div>												  </div>											  </div>';
                            $.inArray(id, finalArray) > -1 && results.append(result);
                        }
                        initTooltips(), input.each(function() {
                            var value = $(this).val().toLowerCase(), parameter = $(this).data("search-parameter"), criteria = parameter.replace(/\s/g, "").split(",");
                            if (value.length > 1) for (var i = 0; i < criteria.length; i++) {
                                var target = results.find("[class='" + criteria[i].toLowerCase() + "']");
                                highlight(target, value);
                            }
                        }), results.append(resultsPaginationElement), firstLoad = !1;
                    };
                    firstLoad && loadItems();
                    var showItem = function(el, i) {
                        i < config.search.count * currentPage && (config.search.pagination ? el.eq(i).removeClass("loading") : setTimeout(function() {
                            el.eq(i).removeClass("loading");
                        }, 100 * (i % config.search.count)));
                    }, items = results.children(".search-item"), resultsCount = items.length;
                    if (count.css({
                        display: "inline-block"
                    }).html((0 === resultsCount ? "No" : resultsCount) + " result" + (1 === resultsCount ? " " : "s ") + "found"), 
                    resultsCount) {
                        results.removeClass("loading").removeClass("no-results"), config.search.pagination && items.addClass("loading");
                        for (var i = config.search.count * (currentPage - 1); resultsCount > i; i++) showItem(items, i);
                    } else hasOutput ? results.removeClass("loading").addClass("no-results") : results.removeClass("no-results").addClass("loading");
                    pagination = $(".search-pagination"), config.search.pagination ? resultsCount > config.search.count ? pagination.show() : pagination.hide() : resultsCount > config.search.count * currentPage ? load.show() : load.hide();
                };
                results.html(""), rebuildSystem();
                var items = results.children(".search-item"), resultsCount = items.length;
                if (config.search.pagination) {
                    for (var pages = 0, n = 0; resultsCount > n; n++) if (n % config.search.count === 0) {
                        pages++;
                        var page = "<button data-page='" + pages + "'>" + pages + "</button>";
                        pagination.append(page);
                    }
                    $("[data-page='" + currentPage + "']").addClass("primary"), $("[data-page]").off().on("click", function() {
                        currentPage = $(this).data("page"), $("[data-page]").removeClass("primary"), $("[data-page='" + currentPage + "']").addClass("primary"), 
                        $("html, body").animate({
                            scrollTop: $(".search-wrapper").offset().top - 90
                        }, {
                            duration: 1e3,
                            queue: !1,
                            complete: function() {
                                anchorClicked = !1;
                            }
                        }), rebuildSystem();
                    });
                } else load.on("click", function() {
                    currentPage++, rebuildSystem();
                });
            };
            initDropdowns(), updateResults();
            var queryObj = getQueryParameters();
            for (var prop in queryObj) if (queryObj.hasOwnProperty(prop)) {
                var assignedDrop = prop, assignedVal = queryObj[prop];
                $("select[data-search-parameter='" + assignedDrop + "']").val(assignedVal).trigger("change");
            }
        };
        requestData(url, "GET", buildSystem);
    }), config.application.debug && console.log("Search :: Unified Search"));
}, sliderInit = function(sliderId) {
    var sliderActive = $("#" + sliderId), slideContainerEl = '<div class="slider-container"></div>', slideMovableEl = '<div class="slider-movable"></div>';
    sliderActive.append(slideContainerEl);
    var slideContainer = sliderActive.find(".slider-container");
    slideContainer.append(slideMovableEl);
    var slideMovable = sliderActive.find(".slider-movable"), slide = sliderActive.find(".slide");
    slide.each(function() {
        $(this).attr("data-index", $(this).index());
    }).appendTo(slideMovable);
    var slideDirection, hasNav = sliderActive.attr("data-nav") ? sliderActive.data("nav") : config.slider.nav, hasArrows = sliderActive.attr("data-arrows") ? sliderActive.data("arrows") : config.slider.arrows, hasThumbnails = sliderActive.attr("data-thumbnails") ? sliderActive.data("thumbnails") : config.slider.thumbnails, slideAnimation = sliderActive.attr("data-animation") ? sliderActive.data("animation") : config.slider.animation, slideShow = sliderActive.attr("data-slideshow") ? sliderActive.data("slideshow") : config.slider.slideshow, animDuration = config.slider.duration, animInterval = config.slider.interval, animating = !1, slideCount = slide.length, slideCurrent = 0, slideBefore = 0, minCount = 0, maxCount = slideCount - 1, sliderWidth = slide.eq(slideCurrent).outerWidth(!0), sliderHeight = slide.eq(slideCurrent).outerHeight(!0), isMultiSlide = slideCount > 1, slideStep = sliderWidth, slideTrigger = sliderWidth / 4, slideTolerance = 50, arrowPrevEl = '<div class="slider-arrow slider-arrow-prev valign-middle">							<img class="svg icon icon-caret-left" src="' + config.application.root + 'img/icons/icon-caret-left.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + "img/icons/icon-caret-left.png'\">					    </div>", arrowNextEl = '<div class="slider-arrow slider-arrow-next valign-middle">							<img class="svg icon icon-caret-right" src="' + config.application.root + 'img/icons/icon-caret-right.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + "img/icons/icon-caret-right.png'\">					    </div>";
    slideContainer.prepend(arrowPrevEl), slideContainer.prepend(arrowNextEl), initSVGs();
    var arrows = slideContainer.children(".slider-arrow"), arrowPrev = slideContainer.children(".slider-arrow-prev"), arrowNext = slideContainer.children(".slider-arrow-next");
    hasArrows === !0 && isMultiSlide && arrows.show();
    var navBullet;
    if (hasNav === !0 && isMultiSlide) {
        var navWrapperEl = '<div class="slider-nav"></div>';
        sliderActive.append(navWrapperEl);
        for (var navWrapper = sliderActive.children(".slider-nav"), i = 0; slideCount > i; i++) {
            var navBulletEl = "", slideThumb = slide.eq(i), slideImg = slideThumb.data("thumb");
            slide.eq(i).hasClass("thumb") && slideThumb.css({
                "background-image": "url('img/pictures/slider/" + slideImg + "')"
            }), hasThumbnails ? (navBulletEl = '<div class="slider-bullet" style="background: url(\'img/pictures/slider/thumbs/' + slideImg + "') no-repeat center center;\">&nbsp;</div>", 
            navWrapper.addClass("thumbs")) : navBulletEl = '<div class="slider-bullet">&bull;</div>', 
            navWrapper.append(navBulletEl);
        }
        navBullet = sliderActive.find(".slider-bullet");
    } else navBullet = sliderActive.find(".bullet");
    navBullet.removeClass("active"), navBullet.eq(slideCurrent).addClass("active");
    var containerPos = function() {
        slideMovable.css({
            "margin-left": 0,
            left: 0,
            height: sliderHeight
        }), sliderTop = sliderActive.offset().top + slideTolerance / 2, sliderBottom = sliderActive.offset().top + sliderActive.height() - slideTolerance / 2, 
        sliderLeft = sliderActive.offset().left + slideTolerance, sliderRight = sliderActive.offset().left + sliderActive.width() - slideTolerance, 
        slideTrigger = sliderWidth / 4;
    };
    containerPos();
    var clone = !0, slideClone = function() {
        if (clone && !cloned) {
            if ("prev" == slideDirection) for (var i = maxCount; i >= slideCurrent; i--) slideMovable.prepend(slide.eq(i));
            if ("next" == slideDirection) {
                slide.each(function() {});
                for (var j = minCount; slideCurrent >= j; j++) slideMovable.append(slide.eq(j - 1));
            }
            slideMovable.css({
                "margin-left": slideStep
            }), clone = !1;
        }
    }, slidePrev = function() {
        animating || (slideDirection = "prev", minCount >= slideCurrent ? slideCurrent = maxCount : slideCurrent--, 
        slideAction(-1), slideBefore = slideCurrent);
    }, slideNext = function() {
        animating || (slideDirection = "next", slideCurrent >= maxCount ? slideCurrent = minCount : slideCurrent++, 
        slideAction(1), slideBefore = slideCurrent);
    }, slideAny = function(i) {
        animating || (slideCurrent = i, slideBefore > slideCurrent && (slideDirection = "prev"), 
        slideCurrent > slideBefore && (slideDirection = "next"), slideAction(slideCurrent - slideBefore), 
        slideBefore = slideCurrent);
    }, slideEnd = function() {
        clone = !0, cloned = !1, animating = !1, animDuration = config.slider.duration, 
        "next" == slideDirection && slideClone(), containerPos();
    }, slideAction = function(i) {
        animating = !0, slideStep = sliderWidth * i, sliderWidth = slide.eq(slideCurrent).outerWidth(!0), 
        sliderHeight = slide.eq(slideCurrent).outerHeight(!0), "prev" == slideDirection && slideClone(), 
        "slide" === slideAnimation && slideMovable.stop(!0, !1).animate({
            height: sliderHeight,
            left: -slideStep
        }, {
            duration: animDuration,
            complete: slideEnd
        }), "fade" === slideAnimation && slideMovable.hide().css({
            left: slideStep
        }).fadeIn(1.5 * animDuration).stop(!0, !1).animate({
            height: sliderHeight
        }, {
            duration: animDuration,
            complete: slideEnd
        }), navBullet.removeClass("active"), navBullet.eq(slideCurrent).addClass("active");
    };
    slideAction(0), $(window).on("resize", function() {
        slideAction(0);
    }), arrowNext.on("click", function() {
        clone = !0, slideNext();
    }), arrowPrev.on("click", function() {
        clone = !0, slidePrev();
    }), navBullet.on("click", function() {
        clone = !0, slideAny($(this).index());
    }), document.onkeydown = function(e) {
        switch (e = e || window.event, e.which || e.keyCode) {
          case 39:
            slideNext();
            break;

          case 37:
            slidePrev();
            break;

          default:
            return;
        }
        e.preventDefault();
    };
    var slideTimer, sliderStart = function() {
        slideMovable.removeClass("stopped"), slideTimer = setInterval(slideNext, animInterval);
    }, sliderStop = function() {
        slideMovable.addClass("stopped"), clearInterval(slideTimer);
    };
    if (isMultiSlide && slideShow !== !1 && (sliderStart(), config.application.touch ? (slideMovable.on("click touchstart", function() {
        sliderStop();
    }), $("html").on("click touchstart", function(event) {
        !$(event.target).closest(".slider").length && slideMovable.hasClass("stopped") && sliderStart();
    })) : (sliderActive.on("mouseenter", function() {
        sliderStop();
    }), sliderActive.on("mouseleave", function() {
        sliderStart();
    }))), "slide" === slideAnimation) {
        var dragStart, dragX, dragEnd, down = !1, cloned = !1, dragging = !1, sliderTop = sliderActive.offset().top + slideTolerance / 2, sliderBottom = sliderActive.offset().top + sliderActive.height() - slideTolerance / 2, sliderLeft = sliderActive.offset().left + slideTolerance, sliderRight = sliderActive.offset().left + sliderActive.width() - slideTolerance, slideKickback = function() {
            animDuration = 250, setTimeout(function() {
                cloned && (slideDirection = "prev", sliderActive.find(".slide:first-child").appendTo(slideMovable), 
                slideMovable.css({
                    "margin-left": 0
                }), cloned = !1);
            }, animDuration);
        };
        sliderActive.on("mousedown touchstart", function(e) {
            config.application.touch || e.preventDefault(), dragStart = e.pageX || e.originalEvent.touches[0].pageX, 
            dragX = e.pageX || e.originalEvent.touches[0].pageX, isMultiSlide && (down = !0);
        }).on("mousemove touchmove", function(e) {
            dragX = e.pageX || e.originalEvent.touches[0].pageX, dragY = e.pageY || e.originalEvent.touches[0].pageY;
            var dragNext = dragStart - dragX, dragPrev = dragX - dragStart;
            if (initDrag = dragPrev > config.slider.threshold || dragNext > config.slider.threshold, 
            down && initDrag && !animating) {
                config.application.touch || e.preventDefault(), dragging = !0, dragX > dragStart ? cloned || (slideDirection = "prev", 
                sliderActive.find(".slide:last-child").prependTo(slideMovable), slideMovable.css({
                    "margin-left": -sliderWidth
                }), cloned = !0) : (clone = !0, cloned && (slideDirection = "prev", sliderActive.find(".slide:first-child").appendTo(slideMovable), 
                slideMovable.css({
                    "margin-left": 0
                }), cloned = !1)), slideMovable.css({
                    left: -(dragStart - dragX)
                });
                var inBounds = sliderLeft >= dragX || dragX >= sliderRight || dragY <= sliderTop || dragY >= sliderBottom || dragNext >= sliderWidth || dragPrev >= sliderWidth;
                inBounds && (down = !1, dragging = !1, dragStart - dragX > slideTrigger ? slideNext() : dragX - dragStart > slideTrigger ? slidePrev() : (slideKickback(), 
                slideAction(0)));
            }
        }).on("mouseleave mouseup touchend", function(e) {
            config.application.touch || e.preventDefault(), down = !1, dragging && !animating && (dragging = !1, 
            dragEnd = dragX, dragStart - dragEnd > slideTrigger ? slideNext() : -slideTrigger > dragStart - dragEnd ? slidePrev() : (slideKickback(), 
            slideAction(0)));
        });
    }
}, initSliders = function() {
    var slider = $("[data-slider='true']");
    slider.length && (slider.each(function(i, slider) {
        setTimeout(function() {
            sliderInit(slider.id = "slider-" + i);
        }, 250 * i);
    }).find(".slide").css({
        visibility: "visible"
    }), config.application.debug && console.log("Widget :: Sliders"));
}, initTables = function() {
    config.tables.responsive && $("table").length && ($("table").addClass("table-original").each(function(index) {
        for (var el = $(this), caption = el.children("caption"), table = this, data = [], headers = [], i = 0, rlen = table.rows.length; rlen > i; i++) {
            for (var rowData = {}, j = 0, clen = table.rows[i].cells.length; clen > j; j++) {
                var cellData = table.rows[i].cells[j].innerHTML;
                i > 0 ? rowData[headers[j]] = cellData : headers[j] = cellData;
            }
            i > 0 && data.push(rowData);
        }
        for (var l = data.length - 1; l >= 0; l--) {
            var rowGroup = data[l], tbody = $("<tbody/>");
            for (var key in rowGroup) {
                var row = '<tr>								   <th scope="row">' + key + "</th>								   <td>" + rowGroup[key] + "</td>							   </tr>";
                tbody.append(row);
            }
            var mobileTable = $("<table/>").addClass("table-mirror");
            caption.length && $("<caption/>").text("Row of " + caption.text()).prependTo(mobileTable), 
            mobileTable.append(tbody).insertAfter(el);
        }
    }), config.application.debug && console.log("System :: Tables"));
}, initTagClouds = function() {
    $("[data-tagcloud]").length && ($("[data-tagcloud]").each(function(i) {
        var el = $(this), index = i, tagArray = [], tagCloud = '<ul class="tagcloud" data-tag="tagcloud-' + index + '"></ul>', tagHidden = '<input type="hidden" class="tagcloud-result" data-tag="tagcloud-' + index + '">', tagClose = '<img class="svg icon icon-close" src="' + config.application.root + 'img/icons/icon-close.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + "img/icons/icon-close.png'\">";
        $(tagHidden).insertAfter(el), $(tagCloud).insertAfter(el);
        var target = $(".tagcloud[data-tag='tagcloud-" + index + "']"), hidden = $("input[data-tag='tagcloud-" + index + "']"), updateArray = function() {
            tagArray = [];
            for (var i = 0; i < target.children(".tag").length; i++) tagArray.push(target.children(".tag").eq(i).data("tag"));
            hidden.val(tagArray), initSVGs();
        };
        el.on("keydown", function(event) {
            if (9 === event.keyCode || 13 === event.keyCode) {
                var value = el.val(), tag = '<li class="tag" data-tag="' + value + '">' + value + tagClose + "</li>";
                return "" !== value && $.inArray(value, tagArray) < 0 && target.addClass("active").append(tag), 
                $.inArray(value, tagArray) >= 0 && notify("This tag already exists.", "failure"), 
                updateArray(), el.val("").focus(), !1;
            }
        }).on("change", function() {
            var value = el.val(), tag = '<li class="tag" data-tag="' + value + '">' + value + tagClose + "</li>";
            return "" !== value && $.inArray(value, tagArray) < 0 && target.addClass("active").append(tag), 
            $.inArray(value, tagArray) >= 0 && notify("This tag already exists.", "failure"), 
            updateArray(), !1;
        }), target.on("click", ".tag", function() {
            $(this).remove(), target.children(".tag").length > 0 ? target.addClass("active") : target.removeClass("active"), 
            updateArray();
        });
    }), config.application.debug && console.log("Search :: Tag Cloud"));
}, initTooltips = function() {
    if ($("[data-tooltip]").length) {
        var tooltipPosition = function(evt, content) {
            var container = $(".tooltip"), cursorX = evt.pageX || evt.originalEvent.touches[0].pageX, cursorY = evt.pageY || evt.originalEvent.touches[0].pageY;
            switch (container.html(content).addClass("active"), config.tooltip.position) {
              case "left":
                container.css({
                    top: cursorY - container.outerHeight() - 10,
                    left: cursorX - container.outerWidth()
                });
                break;

              case "center":
                container.css({
                    top: cursorY - container.outerHeight() - 10,
                    left: cursorX - container.outerWidth() / 2 - 5
                });
                break;

              case "right":
                container.css({
                    top: cursorY - container.outerHeight() - 10,
                    left: cursorX
                });
                break;

              default:
                container.css({
                    top: cursorY - container.outerHeight() - 10,
                    left: cursorX - container.outerWidth() / 2 - 5
                });
            }
            var tooltip = {
                left: container.offset().left,
                right: container.offset().left + container.outerWidth()
            }, boundaries = {
                left: $(".wrapper").offset().left + 20,
                right: $(".wrapper").offset().left + $(".wrapper").outerWidth() - 20
            };
            config.tooltip.bound && (tooltip.left <= boundaries.left && container.css({
                left: boundaries.left
            }), tooltip.right >= boundaries.right && container.css({
                left: boundaries.right - container.outerWidth()
            }));
        };
        $("[data-tooltip]").each(function() {
            var el = $(this), tooltipData = el.data("tooltip");
            config.application.touch ? (el.on("click", function(event) {
                $(".tooltip").remove(), $("body").prepend('<div class="tooltip"></div>'), tooltipPosition(event, tooltipData);
            }), $("html, body").on("click", function(event) {
                $(event.target).closest("[data-tooltip]").length || $(".tooltip").remove();
            })) : el.on("mouseenter", function(event) {
                $("body").prepend('<div class="tooltip"></div>'), $(this).on("mousemove", function(event) {
                    tooltipPosition(event, tooltipData);
                });
            }).on("mouseleave", function() {
                $(".tooltip").remove();
            });
        }), config.application.debug && console.log("Widget :: Tooltips");
    }
}, initVideo = function() {
    var ytAPIVideoReady = !1, ytAPIFrameReady = !1, ytFramePlayers = function() {
        if ($("iframe[src*='youtube']").length) {
            var ytFrameBuild = function(name) {
                function onPlayerReady() {
                    wrapper.addClass("loaded"), button.off().on("click", function() {
                        wrapper.hasClass("playing") ? currentPlayer.pauseVideo() : (wrapper.addClass("playing"), 
                        config.application.touch || currentPlayer.playVideo());
                    }), preview.off().on("click", function() {
                        wrapper.addClass("playing"), config.application.touch || currentPlayer.playVideo();
                    });
                }
                function onPlayerStateChange(event) {
                    (event.data === YT.PlayerState.ENDED || event.data === YT.PlayerState.PAUSED) && wrapper.removeClass("playing");
                }
                var currentPlayer = new YT.Player(name, {
                    events: {
                        onReady: onPlayerReady,
                        onStateChange: onPlayerStateChange
                    }
                }), wrapper = $("." + name), preview = wrapper.children(".video-thumb"), button = wrapper.children(".video-button");
            };
            $("iframe[src*='youtube']").each(function(i) {
                if (!$(this).parents(".video-frame").length) {
                    var el = $(this), name = "ytFramePlayer-" + i, videoSRC = el.attr("src").split("/"), videoID = videoSRC[videoSRC.length - 1].split("?")[0], videoThumb = el.attr("data-video-thumb") && "" !== el.attr("data-video-thumb") ? el.data("video-thumb") : "https://img.youtube.com/vi/" + videoID + "/hqdefault.jpg", playerVars = {
                        rel: 0,
                        wmode: "transparent",
                        modestbranding: 1,
                        enablejsapi: 1,
                        html5: 1,
                        showinfo: 0,
                        controls: 1,
                        autohide: 1
                    }, widget = '<div class="video-frame ' + name + '">									<div class="video-overlay"></div>									<img class="video-loader" src="' + config.application.root + 'img/loader.gif" alt="Video loader">									<div class="video-thumb" style="background: url(' + videoThumb + ');">&nbsp;</div>									<div class="video-button">										<img class="svg icon icon-play" src="' + config.application.root + 'img/icons/icon-play.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + 'img/icons/icon-play.png\'">										<img class="svg icon icon-pause" src="' + config.application.root + 'img/icons/icon-pause.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + 'img/icons/icon-pause.png\'">									</div>									<iframe id="' + name + '" src="' + el.attr("src") + "?" + serialize(playerVars) + '" frameborder="0" allowfullscreen></iframe>								</div>';
                    el.replaceWith(widget), initSVGs(), ytFrameBuild(name);
                }
            });
        }
    }, ytVideoPlayers = function() {
        if ($(".video-frame[data-video-service='youtube']").length) {
            var ytVideoBuild = function(name, videoID) {
                function onPlayerReady() {
                    wrapper.addClass("loaded"), button.off().on("click", function() {
                        wrapper.hasClass("playing") ? currentPlayer.pauseVideo() : (wrapper.addClass("playing"), 
                        config.application.touch || currentPlayer.playVideo());
                    }), preview.off().on("click", function() {
                        wrapper.addClass("playing"), config.application.touch || currentPlayer.playVideo();
                    });
                }
                function onPlayerStateChange(event) {
                    (event.data === YT.PlayerState.ENDED || event.data === YT.PlayerState.PAUSED) && wrapper.removeClass("playing");
                }
                var currentPlayer = new YT.Player(name, {
                    videoId: videoID,
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
                        onReady: onPlayerReady,
                        onStateChange: onPlayerStateChange
                    }
                }), wrapper = $("." + name), preview = wrapper.children(".video-thumb"), button = wrapper.children(".video-button");
            };
            $(".video-frame[data-video-service='youtube']").each(function(i) {
                var el = $(this), name = "ytVideoPlayer-" + i, videoID = el.data("video-id"), videoThumb = el.attr("data-video-thumb") && "" !== el.attr("data-video-thumb") ? el.data("video-thumb") : "https://img.youtube.com/vi/" + videoID + "/hqdefault.jpg", widget = '<div class="video-overlay"></div>								<img class="video-loader" src="' + config.application.root + 'img/loader.gif" alt="Video loader">								<div class="video-thumb" style="background: url(' + videoThumb + ');">&nbsp;</div>								<div class="video-button">									<img class="svg icon icon-play" src="' + config.application.root + 'img/icons/icon-play.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + 'img/icons/icon-play.png\'">									<img class="svg icon icon-pause" src="' + config.application.root + 'img/icons/icon-pause.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + 'img/icons/icon-pause.png\'">								</div>								<div id="' + name + '"></div>';
                el.html("").addClass(name).append(widget), el.children(".video-thumb").css({
                    background: "url(" + videoThumb + ")"
                }), initSVGs(), ytVideoBuild(name, videoID);
            });
        }
    };
    ("undefined" == typeof YT || "undefined" == typeof YT.Player) && (ytAPIFrameReady ? ytFramePlayers() : (window.onYouTubeIframeAPIReady = function() {
        ytAPIFrameReady = !0, ytFramePlayers();
    }, $.getScript("https://www.youtube.com/iframe_api")), ytAPIVideoReady ? ytVideoPlayers() : (window.onYouTubePlayerAPIReady = function() {
        ytAPIVideoReady = !0, ytVideoPlayers();
    }, $.getScript("https://www.youtube.com/player_api")));
    var vimFramePlayers = function() {
        if ($("iframe[src*='vimeo']").length) {
            var vimFrameBuild = function(name) {
                var currentPlayer = $("#" + name), wrapper = $("." + name), preview = wrapper.children(".video-thumb"), button = wrapper.children(".video-button"), onPlayerReady = function() {
                    wrapper.addClass("loaded"), button.off().on("click", function() {
                        wrapper.hasClass("playing") ? currentPlayer.vimeo("pause") : (wrapper.addClass("playing"), 
                        config.application.touch || currentPlayer.vimeo("play"));
                    }), preview.off().on("click", function() {
                        wrapper.addClass("playing"), config.application.touch || currentPlayer.vimeo("play");
                    });
                }, onPlayerStop = function() {
                    wrapper.removeClass("playing");
                };
                currentPlayer.on("load", onPlayerReady).on("pause finish", onPlayerStop);
            };
            $("iframe[src*='vimeo']").each(function(i) {
                if (!$(this).parents(".video-frame").length) {
                    var el = $(this), name = "vimFramePlayer-" + i, videoSRC = el.attr("src").split("/"), videoID = videoSRC[videoSRC.length - 1].split("?")[0], playerVars = {
                        api: 1,
                        player_id: name
                    }, widget = '<div class="video-frame ' + name + '">										<div class="video-overlay"></div>										<img class="video-loader" src="' + config.application.root + 'img/loader.gif" alt="Video loader">										<div class="video-thumb">&nbsp;</div>										<div class="video-button">											<img class="svg icon icon-play" src="' + config.application.root + 'img/icons/icon-play.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + 'img/icons/icon-play.png\'">											<img class="svg icon icon-pause" src="' + config.application.root + 'img/icons/icon-pause.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + 'img/icons/icon-pause.png\'">										</div>										<iframe id="' + name + '" src="https://player.vimeo.com/video/' + videoID + "?" + serialize(playerVars) + '" frameborder="0" allowfullscreen></iframe>									</div>';
                    if (el.wrap(widget), initSVGs(), el.attr("data-video-thumb") && "" !== el.attr("data-video-thumb")) {
                        var videoThumb = el.data("video-thumb");
                        el.parents(".video-frame").children(".video-thumb").css({
                            background: "url(" + videoThumb + ")"
                        }), el.remove();
                    } else {
                        var build = function(data) {
                            var videoThumb = data[0].thumbnail_large;
                            el.parents(".video-frame").children(".video-thumb").css({
                                background: "url(" + videoThumb + ")"
                            }), el.remove();
                        };
                        requestData("https://vimeo.com/api/v2/video/" + videoID + ".json", "GET", build);
                    }
                    vimFrameBuild(name);
                }
            });
        }
    }, vimVideoPlayers = function() {
        if ($(".video-frame[data-video-service='vimeo']").length) {
            var vimVideoBuild = function(name) {
                var currentPlayer = $("#" + name), wrapper = $("." + name), preview = wrapper.children(".video-thumb"), button = wrapper.children(".video-button"), onPlayerReady = function() {
                    wrapper.addClass("loaded"), button.off().on("click", function() {
                        wrapper.hasClass("playing") ? currentPlayer.vimeo("pause") : (wrapper.addClass("playing"), 
                        config.application.touch || currentPlayer.vimeo("play"));
                    }), preview.off().on("click", function() {
                        wrapper.addClass("playing"), config.application.touch || currentPlayer.vimeo("play");
                    });
                }, onPlayerStop = function() {
                    wrapper.removeClass("playing");
                };
                currentPlayer.on("load", onPlayerReady).on("pause finish", onPlayerStop);
            };
            $(".video-frame[data-video-service='vimeo']").each(function(i) {
                var el = $(this), name = "vimVideoPlayer-" + i, videoID = el.data("video-id"), playerVars = {
                    api: 1,
                    player_id: name
                }, widget = '<div class="video-overlay"></div>								<img class="video-loader" src="' + config.application.root + 'img/loader.gif" alt="Video loader">								<div class="video-thumb">&nbsp;</div>								<div class="video-button">									<img class="svg icon icon-play" src="' + config.application.root + 'img/icons/icon-play.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + 'img/icons/icon-play.png\'">									<img class="svg icon icon-pause" src="' + config.application.root + 'img/icons/icon-pause.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + 'img/icons/icon-pause.png\'">								</div>								<iframe id="' + name + '" src="https://player.vimeo.com/video/' + videoID + "?" + serialize(playerVars) + '" frameborder="0" allowfullscreen></iframe>';
                if (el.html("").addClass(name).append(widget), initSVGs(), el.attr("data-video-thumb") && "" !== el.attr("data-video-thumb")) {
                    var videoThumb = el.data("video-thumb");
                    el.children(".video-thumb").css({
                        background: "url(" + videoThumb + ")"
                    });
                } else {
                    var build = function(data) {
                        var videoThumb = data[0].thumbnail_large;
                        el.children(".video-thumb").css({
                            background: "url(" + videoThumb + ")"
                        });
                    };
                    requestData("https://vimeo.com/api/v2/video/" + videoID + ".json", "GET", build);
                }
                vimVideoBuild(name);
            });
        }
    };
    vimFramePlayers(), vimVideoPlayers(), config.application.debug && console.log("Widget :: Videos");
}, config = {
    application: {
        touch: Modernizr.touch && !device.desktop(),
        debug: !0,
        root: "undefined" == typeof rootPath ? "" : rootPath
    },
    typography: {
        resize: {
            active: !0,
            range: 3
        },
        autoresize: {
            characters: 30,
            rows: 2,
            minFontSize: 36,
            maxFontSize: 72
        }
    },
    forms: {
        validation: !0,
        multiUploadlimit: 3
    },
    notification: {
        active: !0,
        delay: 5e3,
        tone: "default"
    },
    cookie: {
        active: !0,
        message: "We use cookies to give you a better experience. By continuing to browse you are accepting our <a href='#' target='_blank'>Terms &amp; Conditions</a>.",
        delay: 0
    },
    brochure: {
        active: !0
    },
    search: {
        view: "grid",
        display: "full",
        count: 10,
        pagination: !0
    },
    slider: {
        nav: !0,
        arrows: !0,
        thumbnails: !1,
        show: 1,
        slideshow: !0,
        animation: "slide",
        duration: 750,
        interval: 7500,
        threshold: 20
    },
    tables: {
        responsive: !0
    },
    tooltip: {
        bound: !0,
        position: "center"
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
}, initGlobal = function() {
    var firstVisitCookie = cookieSystem.get("firstVisit");
    null === firstVisitCookie && (cookieNotify = !0, cookieSystem.set("firstVisit", "yes", 365), 
    notify(config.cookie.message, config.cookie.delay));
    for (var page, url = this.location.href, section = url.split("/"), nav = $("nav"), i = 0; i < section.length; i++) page = section[section.length - 1].split(".")[0];
    nav.children("a").removeClass("active");
    page.length ? nav.children("a[href*=" + page + "]").addClass("active") : nav.children("a").eq(0).addClass("active");
    if ($(".nav-trigger").on("click", function() {
        $("header").toggleClass("active");
    }), $(".nav-close").on("click", function() {
        $("header").removeClass("active");
    }), $("html, body").on("click", function(event) {
        $(event.target).closest("header").length || $("header").removeClass("active");
    }), $(".main a.anchor").length > 1) {
        $(".sidebar").append("<nav></nav>").show();
        var container;
        $(".main a.anchor").each(function(i) {
            var el = $(this), id = el.attr("id"), target = el.next(), name = target.html(), type = "H2" == target.prop("nodeName") ? "core" : "sub";
            "core" == type && (container = id, $(".sidebar nav").append('<div class="container" data-type="' + container + '"></div>')), 
            $(".sidebar .container[data-type=" + container + "]").append('<a href="#' + id + '" class="' + type + '" data-container="' + container + '">' + name + "</a>");
        });
    }
    $(".sidebar-trigger").on("click", function() {
        $(".main").hasClass("sidebar-on") ? $(".main").removeClass("sidebar-on") : $(".main").addClass("sidebar-on");
    }), $("html, body").on("click", function(event) {
        !$(event.target).closest(".sidebar").length && $(".main").hasClass("sidebar-on") && $(".main").removeClass("sidebar-on");
    }), $(".sidebar a").on("click", function(i) {
        if ($(this).hasClass("core")) {
            var container = $(this).data("container");
            $(".sidebar .container").removeClass("selected"), $(".sidebar .container[data-type=" + container + "]").addClass("selected");
        }
        $(".sidebar a").removeClass("active"), $(this).addClass("active"), $(".main").removeClass("sidebar-on");
    });
}, introParallax = function() {
    $(".intro .parallax").css({
        "-webkit-transform": "translate3d(0, " + pageTop / 2 + "px, 0)",
        "-moz-transform": "translate3d(0, " + pageTop / 2 + "px, 0)",
        "-ms-transform": "translate3d(0, " + pageTop / 2 + "px, 0)",
        "-o-transform": "translate3d(0, " + pageTop / 2 + "px, 0)",
        transform: "translate3d(0, " + pageTop / 2 + "px, 0)",
        opacity: 1 - pageTop / 500
    });
};

$(window).on("scroll", function() {
    requestAnimationFrame(introParallax), detectSidebar();
});
//# sourceMappingURL=build.js.map