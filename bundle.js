(()=>{"use strict";var e={199:function(e,t){var r=this&&this.__awaiter||function(e,t,r,i){return new(r||(r=Promise))((function(n,a){function o(e){try{u(i.next(e))}catch(e){a(e)}}function l(e){try{u(i.throw(e))}catch(e){a(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,l)}u((i=i.apply(e,t||[])).next())}))},i=this&&this.__generator||function(e,t){var r,i,n,a,o={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return a={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function l(l){return function(u){return function(l){if(r)throw new TypeError("Generator is already executing.");for(;a&&(a=0,l[0]&&(o=0)),o;)try{if(r=1,i&&(n=2&l[0]?i.return:l[0]?i.throw||((n=i.return)&&n.call(i),0):i.next)&&!(n=n.call(i,l[1])).done)return n;switch(i=0,n&&(l=[2&l[0],n.value]),l[0]){case 0:case 1:n=l;break;case 4:return o.label++,{value:l[1],done:!1};case 5:o.label++,i=l[1],l=[0];continue;case 7:l=o.ops.pop(),o.trys.pop();continue;default:if(!((n=(n=o.trys).length>0&&n[n.length-1])||6!==l[0]&&2!==l[0])){o=0;continue}if(3===l[0]&&(!n||l[1]>n[0]&&l[1]<n[3])){o.label=l[1];break}if(6===l[0]&&o.label<n[1]){o.label=n[1],n=l;break}if(n&&o.label<n[2]){o.label=n[2],o.ops.push(l);break}n[2]&&o.ops.pop(),o.trys.pop();continue}l=t.call(e,o)}catch(e){l=[6,e],i=0}finally{r=n=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,u])}}};function n(e){var t={dt:new Date(e.dt),adr:e.adr,cat:e.cat,tx_id:e.tx_id,blk_id:e.blk_id,value:e.value,fee_qty:e.fee_qty,fee_value:e.fee_value},r=0,i=0;return e.tokens.forEach((function(e){e.qty>=0?1==++r?(t.debit1Code=e.code,t.debit1Qty=e.qty,t.debit1Value=e.value):2===r&&(t.debit2Code=e.code,t.debit2Qty=e.qty,t.debit2Value=e.value):1==++i?(t.credit1Code=e.code,t.credit1Qty=e.qty,t.credit1Value=e.value):2===i&&(t.credit2Code=e.code,t.credit2Qty=e.qty,t.credit2Value=e.value)})),t}Object.defineProperty(t,"__esModule",{value:!0}),t.fetchHistoryData=t.historyTooltip=t.historyColumns=t.historyItemSchema=void 0,t.historyItemSchema={model:{fields:{dt:{type:"date"},debit1Code:{type:"string"},debit1Qty:{type:"number"},debit1Value:{type:"number"},debit2Code:{type:"string"},debit2Qty:{type:"number"},debit2Value:{type:"number"},credit1Code:{type:"string"},credit1Qty:{type:"number"},credit1Value:{type:"number"},credit2Code:{type:"string"},credit2Qty:{type:"number"},credit2Value:{type:"number"},adr:{type:"string"},cat:{type:"string"},tx_id:{type:"string"},blkid:{type:"number"},value:{type:"number"},fee_qty:{type:"number"},fee_value:{type:"number"}}}},t.historyColumns=function(e,t){return void 0===t&&(t=[]),[{field:"dt",title:"Date",width:t[0]||120,format:"{0:dd.MM.yy HH:mm:ss}"},{field:"blk_id",title:"Block",width:t[1]||70,template:'<a href="https://defiscan.live/blocks/${blk_id}" target="_blank">${blk_id}</a>'},{field:"adr",title:"Address",width:t[2]||70,filterable:{multi:!0,search:!0},template:'<a href="https://defiscan.live/address/${adr}" target="_blank">${adr}</a>'},{field:"tx_id",title:"tx",width:t[3]||50,template:'<a href="https://defiscan.live/transactions/${tx_id}" target="_blank">${tx_id}</a>'},{field:"cat",title:"Category",width:t[4]||100,filterable:{multi:!0}},{field:"debit1Qty",title:"D1.Qty",width:t[5]||85,format:"{0:n}"},{field:"debit1Code",title:"D1.Code",width:t[6]||85,filterable:{multi:!0}},{field:"debit2Qty",title:"D2.Qty",width:t[7]||85,format:"{0:n}"},{field:"debit2Code",title:"D2.Code",width:t[8]||85,filterable:{multi:!0}},{field:"credit1Qty",title:"C1.Qty",width:t[9]||85,format:"{0:n}"},{field:"credit1Code",title:"C1.Code",width:t[10]||85,filterable:{multi:!0}},{field:"credit2Qty",title:"C2.Qty",width:t[11]||85,format:"{0:n}"},{field:"credit2Code",title:"C2.Code",width:t[12]||85,filterable:{multi:!0}},{field:"value",width:t[13]||100,format:"{0:n} "+e},{field:"fee_qty",width:t[14]||80,format:"{0:#.########}"},{field:"fee_value",format:"{0:#.########}"}]},t.historyTooltip=function(e){var t=e.target.text().trim();switch(t){case"D1.Qty":return"Debit 1 Quantity";case"D1.Code":return"Debit 1 Token Code";case"D1.Value":return"Debit 1 Value";case"D2.Qty":return"Debit 2 Quantity";case"D2.Code":return"Debit 2 Token Code";case"D2.Value":return"Debit 2 Value";case"C1.Qty":return"Credit 1 Quantity";case"C1.Code":return"Credit 1 Token Code";case"C1.Value":return"Credit 1 Value";case"C2.Qty":return"Credit 2 Quantity";case"C2.Code":return"Credit 2 Token Code";case"C2.Value":return"Credit 2 Value";default:return t}},t.fetchHistoryData=function(e){return r(this,void 0,void 0,(function(){var t;return i(this,(function(r){switch(r.label){case 0:return r.trys.push([0,3,,4]),[4,fetch(e)];case 1:return(t=r.sent()).ok?[4,t.json()]:[2,"HTTP error fetching: ".concat(e," status: ").concat(t.status)];case 2:return[2,r.sent().history.map(n)];case 3:return[2,"An error occurred while fetching the data:"+r.sent()];case 4:return[2]}}))}))}},607:function(e,t,r){var i=this&&this.__awaiter||function(e,t,r,i){return new(r||(r=Promise))((function(n,a){function o(e){try{u(i.next(e))}catch(e){a(e)}}function l(e){try{u(i.throw(e))}catch(e){a(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,l)}u((i=i.apply(e,t||[])).next())}))},n=this&&this.__generator||function(e,t){var r,i,n,a,o={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return a={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function l(l){return function(u){return function(l){if(r)throw new TypeError("Generator is already executing.");for(;a&&(a=0,l[0]&&(o=0)),o;)try{if(r=1,i&&(n=2&l[0]?i.return:l[0]?i.throw||((n=i.return)&&n.call(i),0):i.next)&&!(n=n.call(i,l[1])).done)return n;switch(i=0,n&&(l=[2&l[0],n.value]),l[0]){case 0:case 1:n=l;break;case 4:return o.label++,{value:l[1],done:!1};case 5:o.label++,i=l[1],l=[0];continue;case 7:l=o.ops.pop(),o.trys.pop();continue;default:if(!((n=(n=o.trys).length>0&&n[n.length-1])||6!==l[0]&&2!==l[0])){o=0;continue}if(3===l[0]&&(!n||l[1]>n[0]&&l[1]<n[3])){o.label=l[1];break}if(6===l[0]&&o.label<n[1]){o.label=n[1],n=l;break}if(n&&o.label<n[2]){o.label=n[2],o.ops.push(l);break}n[2]&&o.ops.pop(),o.trys.pop();continue}l=t.call(e,o)}catch(e){l=[6,e],i=0}finally{r=n=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,u])}}};Object.defineProperty(t,"__esModule",{value:!0});var a,o,l,u,c,d=r(199);$(document).on("ready",(function(){!function(){i(this,void 0,void 0,(function(){function e(e,t){var r=localStorage.getItem(e);return r?JSON.parse(r):t}var t;return n(this,(function(r){return t=JSON.parse(localStorage.getItem("columnWidths")||"[]"),a=$("#grid").kendoGrid({toolbar:[{template:"<label>Access key:</label>"},{template:"<input id='accessKey' />"},{template:"<label>Year:</label>"},{template:"<input id='yearTexbox' />"},{template:"<label>Month:</label>"},{template:"<input id='monthTexbox' />"},{template:"<button id='btnLoad'>Load</button>"},"excel"],dataSource:{data:c,schema:d.historyItemSchema},columns:(0,d.historyColumns)("",t),sortable:!0,resizable:!0,filterable:!0,excel:{fileName:"dfitax_history.xlsx",filterable:!0,allPages:!0},excelExport:function(e){for(var t=e.workbook.sheets[0],r=1;r<t.rows.length;r++)for(var i=t.rows[r],n=0;n<i.cells.length;n++)i.cells[n].value instanceof Date&&(i.cells[n].format="dd.MM.yy hh:mm:ss")},columnResize:function(e){var t=[];a.columns.forEach((function(e){t.push(e.width)})),localStorage.setItem("columnWidths",JSON.stringify(t))}}).data("kendoGrid"),a.thead.kendoTooltip({filter:"th",content:d.historyTooltip}),o=$("#accessKey").kendoTextBox({value:e("accessKey","")}).data("kendoTextBox"),l=$("#yearTexbox").kendoNumericTextBox({format:"#",decimals:0,value:e("year",2023),min:2019}).data("kendoNumericTextBox"),u=$("#monthTexbox").kendoNumericTextBox({format:"#",decimals:0,value:e("month",0),min:0,max:12}).data("kendoNumericTextBox"),$("#btnLoad").kendoButton({icon:"reload",click:function(){return i(this,void 0,void 0,(function(){var e,t,r,i;return n(this,(function(n){switch(n.label){case 0:return(e=o.value().trim())?(t=l.value(),r=u.value(),i="".concat("https://api.dfi.tax/v02/hst/").concat(e,"/").concat(t,"/").concat(r),[4,(0,d.fetchHistoryData)(i)]):(alert("Access Key is empty!"),[2]);case 1:return"string"==typeof(c=n.sent())?alert(c):(a.setDataSource(c),localStorage.setItem("accessKey",JSON.stringify(e)),localStorage.setItem("year",JSON.stringify(t)),localStorage.setItem("month",JSON.stringify(r))),[2]}}))}))}}),[2]}))}))}(),$(window).on("resize",(function(){null==a||a.resize()}))}))}},t={};!function r(i){var n=t[i];if(void 0!==n)return n.exports;var a=t[i]={exports:{}};return e[i].call(a.exports,a,a.exports,r),a.exports}(607)})();
//# sourceMappingURL=bundle.js.map