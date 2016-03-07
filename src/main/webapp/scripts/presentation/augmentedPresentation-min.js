/*
 Apache-2.0
*/
(function(e){"object"===typeof exports?module.exports=e(require("augmented")):"function"===typeof define&&define.amd?define(["augmented"],e):window.Augmented.Presentation=e(window.Augmented)})(function(e){e.Presentation={};e.Presentation.VERSION=e.VERSION;var p=e.Logger.LoggerFactory.getLogger(e.Logger.console,e.Configuration.LoggerLevel);e.Utility.extend(e.View,{getFormData:function(a){return function(a){for(var c=[],d=0,d=0;d<a.length;d++){var g=a[d],h={};h.name=g.name;h.value=g.value;h.type=g.type;
"checkbox"===g.type&&(h.value=g.checked?"on":"off");c.push(h)}return c}(document.querySelectorAll(a+" > input")).reduce(function(a,c){switch(c.type){case "number":""!==c.value&&(a[c.name]=parseFloat(c.value));break;case "checkbox":a[c.name]="on"===c.value?!0:!1;break;default:a[c.name]=c.value}return a},{})}});var B=e.View.prototype.delegateEvents,C=e.View.prototype.undelegateEvents,D=e.Presentation.Colleague=e.View.extend({mediator:null,delegateEvents:function(){B.apply(this,arguments);this.setSubscriptions()},
undelegateEvents:function(){C.apply(this,arguments);this.unsetSubscriptions()},subscriptions:{},getSubscriptions:function(){return this.subscriptions},setSubscriptions:function(a){a&&e.Utility.extend(this.subscriptions||{},a);if((a=a||this.subscriptions)&&0!==a.length){this.unsetSubscriptions(a);var b=0,c=a.length;for(b;b<c;b++){var d=a[b],g=!1;d.$once&&(d=d.$once,g=!0);"string"===typeof d&&(d=this[d]);this.subscribe(d.channel,d,this,g)}}},unsetSubscriptions:function(a){if((a=a||this.subscriptions)&&
0!==a.length){var b=0,c=a.length;for(b;b<c;b++){var d=a[b];d.$once&&(d=d.$once);"string"==typeof d&&(d=this[d]);this.unsubscribe(d.channel,d.$once||d,this)}}},sendMessage:function(a,b){this.mediator.trigger(a,b)},setMediatorMessageQueue:function(a){this.mediator=a},removeMediatorMessageQueue:function(){this.mediator=null}});e.Presentation.Mediator=e.Presentation.Colleague.extend({defaultChannel:"augmentedChannel",channels:{},observeColleague:function(a,b,c){a instanceof e.Presentation.Colleague&&
(c||(c=this.defaultChannel),a.setMediatorMessageQueue(this),this.subscribe(c,b,a,!1))},dismissColleague:function(a,b){a instanceof e.Presentation.Colleague&&(b||(b=this.defaultChannel),a.removeMediatorMessageQueue(),this.unsubscribe(b,callback,a))},subscribe:function(a,b,c,d){this.channels[a]||(this.channels[a]=[]);this.channels[a].push({fn:b,context:c||this,once:d});this.on(a,this.publish,c)},publish:function(a){if(this.channels[a])for(var b=[].slice.call(arguments,1),c,d=0,g=this.channels[a].length,
d=0;d<g;d++)c=this.channels[a][d],c.fn.apply(c.context,b),c.once&&(this.unsubscribe(a,c.fn,c.context),d--)},unsubscribe:function(a,b,c){if(this.channels[a])for(var d=0,g=this.channels[a].length,d=0;d<g;d++)b=this.channels[a][d],b.fn===fn&&b.context===c&&(this.channels[a].splice(d,1),d--)},subscribeOnce:function(a,b,c){this.subscribe(a,b,c,!0)},getColleagues:function(a){return this.getChannel(a).context},getChannels:function(){return this.channels},getChannel:function(a){a||(a=this.defaultChannel);
return this.channels[a]},getDefaultChannel:function(){return this.channels[this.defaultChannel]}});var v=e.Presentation.Application=function(){e.Application.apply(this,arguments);this.Mediators=[];this.Stylesheets=[];this.breadcrumb=new e.Utility.Stack;this.initialize=function(){this.Stylesheets&&0<this.Stylesheets.length&&this.attachStylesheets()};this.registerMediator=function(a){a&&this.Mediators.push(a)};this.deregisterMediator=function(a){a&&(a=this.Mediators.indexOf(a),-1!=a&&this.Mediators.splice(a,
1))};this.getMediators=function(){return this.Mediators};this.registerStylesheet=function(a){a&&this.Stylesheets.push(a)};this.deregisterStylesheet=function(a){a&&this.Stylesheets.splice(this.Stylesheets.indexOf(a),1)};this.attachStylesheets=function(){var a=document.getElementsByTagName("head")[0],b=0,c=this.Stylesheets.length;for(b;b<c;b++){var d=document.createElement("link");d.type="text/css";d.rel="stylesheet";d.href=this.Stylesheets[b];a.appendChild(d)}};this.replaceStylesheets=function(){for(var a=
0,a=document.getElementsByTagName("link").length-1;0<=a;a--)element[a].parentNode.removeChild(element[a]);this.attachStylesheets()};this.setCurrentBreadcrumb=function(a,b){1<this.breadcrumb.size()&&this.breadcrumb.pop();this.breadcrumb.push({uri:a,name:b})};this.getCurrentBreadcrumb=function(){return this.breadcrumb.peek()};this.getBreadcrumbs=function(){return this.breadcrumb.toArray()}};v.prototype.constructor=v;e.PaginatedCollection.extend({});var w=function(a,b,c,d,g){a="";g||(g=",");if(c){for(var h in c)c.hasOwnProperty(h)&&
(a=a+h+g);a=a.slice(0,-1);a+="\n"}var e,f=d.length;for(c=0;c<f;c++){h=d[c];for(e in h)h.hasOwnProperty(e)&&(b=h[e],a=a+b+g);a=a.slice(0,-1);a+="\n"}return a},x=function(a,b,c,d,g,h,e){var f='<table data-name="'+a+'" data-description="'+b+'">';a&&(f+="<caption",b&&(f=f+' title="'+b+'"'),f=f+">"+a+"</caption>");f=f+"<thead>"+r(c,g,h);f+="</thead><tbody>";d&&(f=e?f+t(d,g,h):f+u(d,g,h));return f+="</tbody></table>"},r=function(a,b,c){var d="";if(a){d+="<tr>";b&&(d+='<th data-name="lineNumber">#</th>');
for(var g in a)a.hasOwnProperty(g)&&(b=a[g],d=d+'<th data-name="'+g+'" data-description="'+b.description+'" data-type="'+b.type+'"',c===g&&(d+=' class="sorted"'),d=d+">"+g+"</th>");d+="</tr>"}return d},u=function(a,b,c){var d,g,h,e,f="",l=a.length,k;for(d=0;d<l;d++){g=a[d];f+="<tr>";b&&(f=f+'<td class="label number">'+(d+1)+"</td>");for(h in g)g.hasOwnProperty(h)&&(e=g[h],k=typeof e,f=f+'<td data-type="'+k+'" class="'+k,c===h&&(f+=" sorted"),f=f+'">'+e+"</td>");f+="</tr>"}return f},t=function(a,b,
c){var d,g,e,n,f="",l=a.length,k;for(d=0;d<l;d++){g=a[d];f+="<tr>";b&&(f=f+'<td class="label number">'+(d+1)+"</td>");for(e in g)g.hasOwnProperty(e)&&(n=g[e],k=typeof n,f=f+'<td data-type="'+k+'" class="'+k,c===e&&(f+=" sorted"),f+='">',f=f+'<input type="'+("number"===k?"number":"text")+'" value="'+n+'"data-name="'+e+'" data-index="'+d+'"/></td>');f+="</tr>"}return f},E=function(a){var b="";if(a&&0<a.length){for(var b=b+'<ul class="errors">',c=0,d=a.length,c=0;c<d;c++)for(var g=0,e=a[c].errors.length,
g=0;g<e;g++)b=b+"<li>"+a[c].errors[g]+"</li>";b+="</ul>"}return b};e.Presentation.AutomaticTable=D.extend({sortable:!1,sortStyle:"client",sortKey:null,sortBy:function(a){a&&(this.editable||!this.editable&&this.sortKey!==a)&&(this.sortKey=a,this.collection.sortByKey(a),this.refresh())},renderPaginationControl:!1,paginationAPI:null,currentPage:function(){return this.collection.currentPage},totalPages:function(){return this.collection.totalPages},nextPage:function(){this.collection.nextPage();this.refresh()},
previousPage:function(){this.collection.previousPage();this.refresh()},goToPage:function(a){this.collection.goToPage(a);this.refresh()},firstPage:function(){this.collection.firstPage();this.refresh()},lastPage:function(){this.collection.lastPage();this.refresh()},localStorage:!1,localStorageKey:"augmented.localstorage.autotable.key",editable:!1,editCell:function(a,b,c){a&&b&&(a=this.collection.at(a),b=this.columns[b],a&&b&&a.set(b,c))},copyCell:function(a,b,c,d){a&&b&&c&&d&&(a=this.collection.at(a),
b=this.columns[b],c=this.collection.at(row),a&&b&&c&&c.set(b,value1))},clearCell:function(a,b){this.editCell(a,b,null)},crossOrigin:!1,lineNumbers:!1,columns:{},uri:null,data:[],collection:null,isInitalized:!1,initialize:function(a){this.init();this.collection&&this.collection.reset();a&&(a.paginationAPI&&(this.paginationAPI=a.paginationAPI),!this.collection&&this.paginationAPI?(this.collection=e.PaginationFactory.getPaginatedCollection(this.paginationAPI),this.paginationAPI=this.collection.paginationAPI,
this.localStorage=!1):!this.collection&&this.localStorage?this.collection=new e.LocalStorageCollection:this.collection||(this.collection=new e.Collection),a.schema&&(this.schema=a.schema),a.el&&(this.el=a.el),a.uri&&(this.uri=a.uri,this.collection.url=a.uri),a.data&&Array.isArray(a.data)&&this.populate(a.data),a.renderPaginationControl&&(this.renderPaginationControl=a.renderPaginationControl),a.sortable&&(this.sortable=a.sortable),a.lineNumbers&&(this.lineNumbers=a.lineNumbers),a.editable&&(this.editable=
a.editable),a.localStorageKey&&!a.uri&&(this.localStorageKey=a.localStorageKey,this.uri=null));this.uri&&(this.collection.url=this.uri);if(!this.schema)return this.isInitalized=!1;this.isInitalized||(this.columns=this.schema.properties,this.collection.schema=this.schema,this.isInitalized=!0);this.schema.title&&(this.name=this.schema.title);this.schema.description&&(this.description=this.schema.description);this.collection.crossOrigin=this.crossOrigin;return this.isInitalized},fetch:function(){this.showProgressBar(!0);
var a=this;this.collection.fetch({reset:!0,success:function(){a.showProgressBar(!1);a.sortKey=null;a.populate(a.collection.toJSON());a.refresh()},error:function(){a.showProgressBar(!1);a.showMessage("AutomaticTable fetch failed!")}})},save:function(){if(this.editable){this.showProgressBar(!0);var a=this;this.collection.save({reset:!0,success:function(){a.showProgressBar(!1)},error:function(){a.showProgressBar(!1);a.showMessage("AutomaticTable save failed!");p.warn("AUGMENTED: AutomaticTable save failed!")}})}},
populate:function(a){a&&Array.isArray(a)&&(this.sortKey=null,this.data=a,this.collection.reset(this.data))},clear:function(){this.sortKey=null;this.data=[];this.collection.reset(null)},refresh:function(){this.render()},render:function(){var a;if(this.template)if(this.showProgressBar(!0),this.el){a="string"===typeof this.el?document.querySelector(this.el):this.el;var b=a.querySelector("tbody"),c=a.querySelector("thead");a&&(this.columns&&0<Object.keys(this.columns).length?(this.sortable&&this.unbindSortableColumnEvents(),
a=r(this.columns,this.lineNumbers,this.sortKey)):a="",c.innerHTML=a,a=this.collection&&0<this.collection.length?this.editable?t(this.collection.toJSON(),this.lineNumbers,this.sortKey):u(this.collection.toJSON(),this.lineNumbers,this.sortKey):"",this.editable&&this.unbindCellChangeEvents(),b.innerHTML=a)}else this.$el?(p.debug("AUGMENTED: AutoTable using jQuery to render."),this.sortable&&this.unbindSortableColumnEvents(),this.$el("thead").html(r(this.columns,this.lineNumbers,this.sortKey)),b="",b=
this.editable?t(this.collection.toJSON(),this.lineNumbers,this.sortKey):u(this.collection.toJSON(),this.lineNumbers,this.sortKey),this.editable&&this.unbindCellChangeEvents(),this.$el("tbody").html(b)):p.warn("AUGMENTED: AutoTable no element anchor, not rendering.");else{this.template="<progress>Please wait.</progress>"+this.compileTemplate()+'<p class="message"></p>';this.showProgressBar(!0);if(this.el){if(a="string"===typeof this.el?document.querySelector(this.el):this.el)a.innerHTML=this.template}else this.$el?
this.$el.html(this.template):p.warn("AUGMENTED: AutoTable no element anchor, not rendering.");this.renderPaginationControl&&this.bindPaginationControlEvents()}this.delegateEvents();this.sortable&&this.bindSortableColumnEvents();this.editable&&this.bindCellChangeEvents();this.showProgressBar(!1);return this},saveCell:function(a){a=a.target;var b=this.collection.at(parseInt(a.getAttribute("data-index"))),c=a.value;"number"===a.getAttribute("type")&&(c=parseInt(a.value));b.set(a.getAttribute("data-name"),
c)},bindCellChangeEvents:function(){for(var a=[].slice.call(document.querySelectorAll(("string"===typeof this.el?this.el:this.el.localName)+" table tr td input")),b=0,c=a.length,b=0;b<c;b++)a[b].addEventListener("change",this.saveCell.bind(this),!1)},unbindCellChangeEvents:function(){for(var a=[].slice.call(document.querySelectorAll(("string"===typeof this.el?this.el:this.el.localName)+" table tr td input")),b=0,c=a.length,b=0;b<c;b++)a[b].removeEventListener("change",this.saveCell,!1)},"export":function(a){var b=
"";"csv"===a?b=w(this.name,this.description,this.columns,this.collection.toJSON()):"tsv"===a?(a=this.collection.toJSON(),b=w(this.name,this.description,this.columns,a,"\t")):b=x(this.name,this.description,this.columns,this.collection.toJSON(),!1,null);return b},unbindPaginationControlEvents:function(){if(this.pageControlBound){var a="string"===typeof this.el?this.el:this.el.localName,b=document.querySelector(a+" div.paginationControl span.first"),c=document.querySelector(a+" div.paginationControl span.previous"),
d=document.querySelector(a+" div.paginationControl span.next"),a=document.querySelector(a+" div.paginationControl span.last");b&&b.removeEventListener("click",this.firstPage,!1);c&&c.removeEventListener("click",this.previousPage,!1);d&&d.removeEventListener("click",this.nextPage,!1);a&&a.removeEventListener("click",this.lastPage,!1);this.pageControlBound=!1}},pageControlBound:!1,bindPaginationControlEvents:function(){if(!this.pageControlBound){var a="string"===typeof this.el?this.el:this.el.localName,
b=document.querySelector(a+" div.paginationControl span.first"),c=document.querySelector(a+" div.paginationControl span.previous"),d=document.querySelector(a+" div.paginationControl span.next"),a=document.querySelector(a+" div.paginationControl span.last");b&&b.addEventListener("click",this.firstPage.bind(this),!1);c&&c.addEventListener("click",this.previousPage.bind(this),!1);d&&d.addEventListener("click",this.nextPage.bind(this),!1);a&&a.addEventListener("click",this.lastPage.bind(this),!1);this.pageControlBound=
!0}},deriveEventTarget:function(a){var b=null;a&&(b=a.target.getAttribute("data-name"));return b},sortByHeaderEvent:function(a){a=this.deriveEventTarget(a);this.sortBy(a)},unbindSortableColumnEvents:function(){if(this.el&&this.sortable){var a;a="string"===typeof this.el?document.querySelectorAll(this.el+" table tr th"):document.querySelectorAll(this.el.localName+" table tr th");for(var b=0,c=a.length,b=0;b<c;b++)a[b].removeEventListener("click",this.sortByHeaderEvent,!1)}},bindSortableColumnEvents:function(){if(this.el&&
this.sortable){var a;a="string"===typeof this.el?document.querySelectorAll(this.el+" table tr th"):document.querySelectorAll(this.el.localName+" table tr th");for(var b=0,c=a.length,b=0;b<c;b++)"lineNumber"!==a[b].getAttribute("data-name")&&a[b].addEventListener("click",this.sortByHeaderEvent.bind(this),!1)}},compileTemplate:function(){var a=x(this.name,this.description,this.columns,this.collection.toJSON(),this.lineNumbers,this.sortKey,this.editable);if(this.renderPaginationControl)var b=this.currentPage(),
c=this.totalPages(),a=a+('<div class="paginationControl"><span class="first"><< First</span><span class="previous">< Previous</span><span class="current">'+b+" of "+c+'</span><span class="next">Next ></span><span class="last">Last >></span></div>');return a},setURI:function(a){this.uri=a},setSchema:function(a){this.schema=a;this.columns=a.properties;this.collection.reset();this.collection.schema=a;this.uri&&(col.url=this.uri)},showProgressBar:function(a){if(this.el){var b=("string"===typeof this.el?
document.querySelector(this.el):this.el).querySelector("progress");b&&(b.style.display=a?"block":"none",b.style.visibility=a?"visible":"hidden")}},showMessage:function(a){if(this.el){var b=("string"===typeof this.el?document.querySelector(this.el):this.el).querySelector("p[class=message]");b&&(b.innerHTML=a)}},validate:function(){var a=this.collection?this.collection.validate():null;!this.collection.isValid()&&a&&a.messages?this.showMessage(E(a.messages)):this.showMessage("");return a},isValid:function(){return this.collection?
this.collection.isValid():!0}});e.Presentation.AutoTable=e.Presentation.AutomaticTable;var y=function(a,b,c,d){var g,e;if(b){g=document.createElement("tr");c&&(c=document.createElement("th"),c.setAttribute("data-name","lineNumber"),e=document.createTextNode("#"),c.appendChild(e),g.appendChild(c));for(var n in b)b.hasOwnProperty(n)&&(e=b[n],c=document.createElement("th"),c.setAttribute("data-name",n),c.setAttribute("data-description",e.description),c.setAttribute("data-type",e.type),d===n&&c.classList.add("sorted"),
e=document.createTextNode(n),c.appendChild(e),g.appendChild(c));a.appendChild(g)}},z=function(a,b,c,d){var e,h,n,f,l=b.length,k,m,q;for(e=0;e<l;e++){h=b[e];q=document.createElement("tr");c&&(m=document.createElement("td"),f=document.createTextNode(""+(e+1)),m.appendChild(f),m.classList.add("label","number"),q.appendChild(m));for(n in h)h.hasOwnProperty(n)&&(f=h[n],k=typeof f,m=document.createElement("td"),f=document.createTextNode(f),m.appendChild(f),m.classList.add(k),d===n&&m.classList.add("sorted"),
m.setAttribute("data-type",k),q.appendChild(m));a.appendChild(q)}},A=function(a,b,c,d){var e,h,n,f,l=b.length,k,m,q,p;for(e=0;e<l;e++){h=b[e];q=document.createElement("tr");c&&(m=document.createElement("td"),f=document.createTextNode(""+(e+1)),m.appendChild(f),m.classList.add("label","number"),q.appendChild(m));for(n in h)h.hasOwnProperty(n)&&(f=h[n],k=typeof f,m=document.createElement("td"),m.classList.add(k),d===n&&m.classList.add("sorted"),m.setAttribute("data-type",k),p=document.createElement("input"),
p.setAttribute("type","number"===k?"number":"text"),p.setAttribute("value",f),p.setAttribute("data-name",n),p.setAttribute("data-name",n),p.setAttribute("data-index",e),p.value=f,m.appendChild(p),q.appendChild(m));a.appendChild(q)}};e.Presentation.DirectDOMAutomaticTable=e.Presentation.AutomaticTable.extend({compileTemplate:function(){return""},render:function(){var a;if(this.template)if(this.showProgressBar(!0),this.el){a="string"===typeof this.el?document.querySelector(this.el):this.el;var b=a.querySelector("tbody"),
c=a.querySelector("thead");if(a){this.sortable&&this.unbindSortableColumnEvents();this.editable&&this.unbindCellChangeEvents();if(this.columns&&0<Object.keys(this.columns).length){for(;c.hasChildNodes();)c.removeChild(c.lastChild);y(c,this.columns,this.lineNumbers,this.sortKey)}else for(;c.hasChildNodes();)c.removeChild(c.lastChild);if(this.collection&&0<this.collection.length){for(;b.hasChildNodes();)b.removeChild(b.lastChild);this.editable?A(b,this.collection.toJSON(),this.lineNumbers,this.sortKey):
z(b,this.collection.toJSON(),this.lineNumbers,this.sortKey)}else for(;b.hasChildNodes();)b.removeChild(b.lastChild)}}else this.$el?p.warn("AUGMENTED: AutoTable no jquery, sorry not rendering."):p.warn("AUGMENTED: AutoTable no element anchor, not rendering.");else{this.template="notused";this.showProgressBar(!0);if(this.el){if(a="string"===typeof this.el?document.querySelector(this.el):this.el){b=document.createElement("progress");c=document.createTextNode("Please wait.");b.appendChild(c);a.appendChild(b);
var b=a,d=this.name,e=this.description,h=this.columns,c=this.collection.toJSON(),n=this.lineNumbers,f=this.sortKey,l=this.editable,k,m;k=document.createElement("table");k.setAttribute("data-name",d);k.setAttribute("data-description",e);d&&(m=document.createElement("caption"),e&&m.setAttribute("title",e),d=document.createTextNode(d),m.appendChild(d),k.appendChild(m));m=document.createElement("thead");y(m,h,n,f);k.appendChild(m);h=document.createElement("tbody");k.appendChild(h);c&&(l?A(h,c,n,f):z(h,
c,n,f));b.appendChild(k);this.renderPaginationControl&&(b=a,c=this.currentPage(),n=this.totalPages(),f=document.createElement("div"),f.classList.add("paginationControl"),l=document.createElement("span"),l.classList.add("first"),k=document.createTextNode("<< First"),l.appendChild(k),f.appendChild(l),l=document.createElement("span"),l.classList.add("previous"),k=document.createTextNode("< Previous"),l.appendChild(k),f.appendChild(l),l=document.createElement("span"),l.classList.add("current"),k=document.createTextNode(c+
" of "+n),l.appendChild(k),f.appendChild(l),l=document.createElement("span"),l.classList.add("next"),k=document.createTextNode("Next >"),l.appendChild(k),f.appendChild(l),l=document.createElement("span"),l.classList.add("last"),k=document.createTextNode("Last >>"),l.appendChild(k),f.appendChild(l),b.appendChild(f));b=document.createElement("p");b.classList.add("message");a.appendChild(b)}}else this.$el?p.warn("AUGMENTED: AutoTable no jquery render, sorry not rendering."):p.warn("AUGMENTED: AutoTable no element anchor, not rendering.");
this.renderPaginationControl&&this.bindPaginationControlEvents()}this.delegateEvents();this.sortable&&this.bindSortableColumnEvents();this.editable&&this.bindCellChangeEvents();this.showProgressBar(!1);return this}});e.Presentation.BigDataTable=e.Presentation.AutomaticTable.extend({renderPaginationControl:!0,lineNumbers:!0,sortable:!0});e.Presentation.EditableTable=e.Presentation.AutomaticTable.extend({editable:!0,lineNumbers:!0});e.Presentation.EditableBigDataTable=e.Presentation.AutomaticTable.extend({renderPaginationControl:!0,
lineNumbers:!0,sortable:!0,editable:!0});e.Presentation.LocalStorageTable=e.Presentation.AutomaticTable.extend({renderPaginationControl:!1,lineNumbers:!0,sortable:!0,editable:!1,localStorage:!0});e.Presentation.EditableLocalStorageTable=e.Presentation.AutomaticTable.extend({renderPaginationControl:!1,lineNumbers:!0,sortable:!0,editable:!0,localStorage:!0});return e.Presentation});
