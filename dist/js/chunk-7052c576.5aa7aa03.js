(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7052c576"],{a7ab:function(e,t,n){"use strict";var i=n("d225"),o=n("b0b4"),a=n("308d"),r=n("6bb5"),l=n("4e2b"),s=n("9ab4"),c=n("ab3c"),u=n("8bbf"),p=n.n(u),d=n("2fe1"),b=n("60a3"),y=function(e){function t(){var e;return Object(i["a"])(this,t),e=Object(a["a"])(this,Object(r["a"])(t).apply(this,arguments)),e.props=Object(c["b"])(),e.value=Object(c["c"])(),e.options={disabled:!1,loading:!1,readonly:!1,displayMode:!1,sticky:!1,mobile:!1},e.optionFormDefinition={title:"选项",props:{inline:!0,title:"选项"},fields:[{title:"禁用",type:"boolean",property:"disabled"},{title:"加载中",type:"boolean",property:"loading"},{title:"详情模式",type:"boolean",property:"displayMode"},{title:"固定模式",type:"boolean",property:"sticky"}]},e}return Object(l["a"])(t,e),Object(o["a"])(t,[{key:"created",value:function(){this.init&&this.init(),window.ondevicelight=function(){console.log(1)},window.ondevicemotion=function(){console.log(2)},window.ondeviceorientation=function(){console.log(3)},window.onresize=function(){console.log(window.outerHeight+"/"+window.outerWidth)}}},{key:"onOk",value:function(){this.$message.success("ok clicked")}},{key:"onReset",value:function(){this.$message.error("reset click")}},{key:"onCancel",value:function(){this.$message.warning("cancel clicked")}},{key:"definition",get:function(){return Object(c["a"])()}}]),t}(p.a);s["b"]([Object(b["b"])({type:String,default:"desktop"})],y.prototype,"platform",void 0),s["b"]([Object(b["b"])(Function)],y.prototype,"init",void 0),y=s["b"]([Object(d["b"])({name:"Base"})],y),t["a"]=y},ab3c:function(e,t,n){"use strict";n.d(t,"b",function(){return a}),n.d(t,"c",function(){return r}),n.d(t,"a",function(){return s});var i=n("8588"),o=[{label:"选项1",value:1},{label:"选项2",value:2},{label:"选项3",value:3}],a=function(){return{labelSuffix:":",gutter:40,labelWidth:"120px"}},r=function(){return{string:"111",text:"abc",integer:122,double:.2,url:"http://www",datetime:new Date,date:new Date,start:new Date,end:new Date,year:new Date,month:new Date,time:window.moment(),select:1,multiSelect:[1,3],expandSelect:2,expandMultiSelect:[2,3],subForm:{input:"abs"},subFormArray:[{input:"sssssssss"}]}},l={string:{title:"单行文本",type:"string",required:!0,placeholder:"请输入文本"},text:{title:"多行文本",required:!0,type:"text"},url:{title:"链接",rules:"url",type:"url"},integer:{title:"整数",type:"integer",required:!0,min:100,max:200},double:{title:"小数",required:!0,type:"double"},date:{title:"日期",required:!0,type:"date"},dateRange:{title:"日期范围",required:!0,type:"daterange",processor:{getValue:function(e,t){return[e&&e["start"],e&&e["end"]]},setValue:function(e,t,n){n?(e["start"]=n[0],e["end"]=n[1]):(e["start"]=null,e["end"]=null)}}},datetime:{title:"日期时间",required:!0,type:"datetime"},month:{title:"月份",required:!0,type:"month"},select:{title:"单选",required:!0,type:"select",props:{options:o,clearable:!0}},image:{title:"图片",type:"picture"},expandSelect:{title:"展开单选",required:!0,type:"expand-select",props:{options:o}},multiSelect:{title:"多选",required:!0,type:"select",array:!0,props:{options:o}},expandMultiSelect:{title:"展开多选",required:!0,type:"expand-select",array:!0,props:{options:o}},subForm:{title:"子表单",type:i["g"].object,fields:{input:{title:"输入框",type:"string",required:!0}},props:{addBtnText:"添加子表单",addBtnProps:{block:!0}}},subFormArray:{title:"子表单数组",type:i["g"].object,array:!0,fields:{input:{title:"输入框(数组)",type:"string",required:!0}},props:{addBtnText:"添加子表单",addBtnProps:{block:!0}}}},s=function(){return{props:{section:!0,spaceBetweenSection:16},fields:l}}},d08a:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ae-layout",{staticClass:"demo-wrapper"},[n("ae-layout-content",[n("v-schema-form",{attrs:{inline:"",schema:e.optionFormDefinition},model:{value:e.options,callback:function(t){e.options=t},expression:"options"}}),n("v-schema-form",{staticClass:"demo-form",attrs:{actions:e.actions,disabled:e.options.disabled,loading:e.options.loading,editable:!e.options.displayMode,platform:e.options.mobile?"mobile":"desktop",props:e.props,readonly:e.options.readonly,schema:e.definition,sticky:e.options.sticky},on:{cancel:e.onCancel,ok:e.onOk,reset:e.onReset},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1)],1)},o=[],a=n("d225"),r=n("b0b4"),l=n("308d"),s=n("6bb5"),c=n("4e2b"),u=n("9ab4"),p=n("ffb4"),d=n("a7ab"),b=n("2fe1");p["a"].registerAntd();var y=function(e){function t(){var e;return Object(a["a"])(this,t),e=Object(l["a"])(this,Object(s["a"])(t).apply(this,arguments)),e.actions=["submit","reset","cancel",{text:"切换显示",action:e.customAction}],e}return Object(c["a"])(t,e),Object(r["a"])(t,[{key:"created",value:function(){p["a"].registerAntd()}},{key:"customAction",value:function(e){e.getValue();console.log(e("subFormArray.?").toggle())}}]),t}(d["a"]);y=u["b"]([Object(b["b"])({name:"DesktopEdit"})],y);var f=y,m=f,g=n("2877"),w=Object(g["a"])(m,i,o,!1,null,null,null);t["default"]=w.exports}}]);
//# sourceMappingURL=chunk-7052c576.5aa7aa03.js.map