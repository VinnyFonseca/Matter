for(var cssArrays=[],bpArrays=[],bpUniqueArrays=[],i=0,numSheets=document.styleSheets.length;numSheets>i;i++){var sheet=document.styleSheets[i];if(null===sheet.href||sheet.href.match(window.location.hostname))for(var rules=sheet.rules?sheet.rules:sheet.cssRules,j=0,numRules=rules.length;numRules>j;j++){var mq=rules[j].cssText.match(/\(\D*\-(width|height)+\s*\:\s*(\d+(\.\d+)?)(px|em)\s*\)/g);if(null!==mq)for(var k=0;k<mq.length;k++)bpArrays.push(mq[k].match(/(width|height)/g)+mq[k].match(/\d+(\.\d+)?/g)+mq[k].match(/(px|em)/g))}if(sheet.media.mediaText.match(/\(\D*\-(width|height)+\s*\:\s*(\d+(\.\d+)?)(px|em)\s*\)/g)&&bpArrays.push(sheet.media.mediaText.match(/(width|height)/g)+sheet.media.mediaText.match(/\d+(\.\d+)?/g)+sheet.media.mediaText.match(/(px|em)/g)),cssArrays.push(i),numSheets===cssArrays.length){var uniqueArrays=[],i,len=bpArrays.length,obj={};for(i=0;len>i;i++)obj[bpArrays[i]]=0;for(i in obj)uniqueArrays.push(i);for(var sortBp=uniqueArrays.sort(function(a,b){return a=a.replace(/[a-z]/g,""),b=b.replace(/[a-z]/g,""),a-b}),regex=/\d+/,i=0;i<sortBp.length;i++){var c=sortBp[i],n=sortBp[i+1];if(c&&n&&c.substring(0,3)==n.substring(0,3)){var cn=regex.exec(c)[0],nn=regex.exec(n)[0];cn!=nn-1&&bpUniqueArrays.push(c)}else bpUniqueArrays.push(c)}}}0!==bpArrays.length&&0!==cssArrays.length||alert("Error: No Media Queries Found! The website you are accessing is not Responsive Design OR Bookmarklet was unable to access Cross Domain Stylesheets due to same-origin-policy."),window.mqUniqueBP='<ul id="bpList" class="clearfix">',bpUniqueArrays.forEach(function(a){if(a.match(/(width)/g)&&0!==a.match(/\d+\.?\d*/)){var b=a.match(/\d+\.?\d*/);mqUniqueBP=mqUniqueBP+"<li data-"+a.match(/(width|height)/g)+"="+Math.floor(100*b)/100+" data-unit="+a.match(/(px|em)/g)+'><a href="javascript:void();"><input type="checkbox"/> '+Math.floor(100*b)/100+" <span>"+a.match(/(px|em)/g)+"</span></a></li>"}});
//# sourceMappingURL=breakpoint.js.map