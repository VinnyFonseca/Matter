/*
   Breakpoint Tester(BETA) V 1.0
   Copyright (c) 2013 Mandar Shirke.
*/
var cssArrays = [],
    bpArrays = [],
    bpUniqueArrays = [];
for (var i = 0, numSheets = document.styleSheets.length; i < numSheets; i++) {
    var sheet = document.styleSheets[i];
    if (sheet.href === null || sheet.href.match(window.location.hostname)) {
        var rules = sheet.rules ? sheet.rules : sheet.cssRules;
        for (var j = 0, numRules = rules.length; j < numRules; j++) {
            var mq = rules[j].cssText.match(/\(\D*\-(width|height)+\s*\:\s*(\d+(\.\d+)?)(px|em)\s*\)/g);
            if (mq !== null) {
                for (var k = 0; k < mq.length; k++) {
                    bpArrays.push(mq[k].match(/(width|height)/g) + mq[k].match(/\d+(\.\d+)?/g) + mq[k].match(/(px|em)/g))
                }
            }
        }
    }
    if (sheet.media.mediaText.match(/\(\D*\-(width|height)+\s*\:\s*(\d+(\.\d+)?)(px|em)\s*\)/g)) {
        bpArrays.push(sheet.media.mediaText.match(/(width|height)/g) + sheet.media.mediaText.match(/\d+(\.\d+)?/g) + sheet.media.mediaText.match(/(px|em)/g))
    }
    cssArrays.push(i);
    if (numSheets === cssArrays.length) {
        var uniqueArrays = [],
            i, len = bpArrays.length,
            obj = {};
        for (i = 0; i < len; i++) {
            obj[bpArrays[i]] = 0
        }
        for (i in obj) {
            uniqueArrays.push(i)
        }
        var sortBp = uniqueArrays.sort(function(e, t) {
            e = e.replace(/[a-z]/g, "");
            t = t.replace(/[a-z]/g, "");
            return e - t
        });
        var regex = /\d+/;
        for (var i = 0; i < sortBp.length; i++) {
            var c = sortBp[i],
                n = sortBp[i + 1];
            if (c && n && c.substring(0, 3) == n.substring(0, 3)) {
                var cn = regex.exec(c)[0];
                var nn = regex.exec(n)[0];
                if (cn != nn - 1) {
                    bpUniqueArrays.push(c)
                }
            } else {
                bpUniqueArrays.push(c)
            }
        }
    }
}
if (bpArrays.length === 0 || cssArrays.length === 0) {
    alert("Error: No Media Queries Found! The website you are accessing is not Responsive Design OR Bookmarklet was unable to access Cross Domain Stylesheets due to same-origin-policy.")
}
window.mqUniqueBP = '<ul id="bpList" class="clearfix">';
bpUniqueArrays.forEach(function(e) {
    if (e.match(/(width)/g) && e.match(/\d+\.?\d*/) != 0) {
        var t = e.match(/\d+\.?\d*/);
        mqUniqueBP = mqUniqueBP + "<li data-" + e.match(/(width|height)/g) + "=" + Math.floor(t * 100) / 100 + " data-unit=" + e.match(/(px|em)/g) + '><a href="javascript:void();"><input type="checkbox"/> ' + Math.floor(t * 100) / 100 + " <span>" + e.match(/(px|em)/g) + "</span></a></li>"
    }
});
