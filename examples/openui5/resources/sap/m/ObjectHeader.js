/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/IconPool'],function(q,l,C,I){"use strict";var O=C.extend("sap.m.ObjectHeader",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Misc",defaultValue:null},number:{type:"string",group:"Misc",defaultValue:null},numberUnit:{type:"string",group:"Misc",defaultValue:null},intro:{type:"string",group:"Misc",defaultValue:null},introActive:{type:"boolean",group:"Misc",defaultValue:null},titleActive:{type:"boolean",group:"Misc",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconActive:{type:"boolean",group:"Misc",defaultValue:null},iconAlt:{type:"string",group:"Accessibility",defaultValue:null},iconDensityAware:{type:"boolean",group:"Misc",defaultValue:true},markFavorite:{type:"boolean",group:"Misc",defaultValue:false},markFlagged:{type:"boolean",group:"Misc",defaultValue:false},showMarkers:{type:"boolean",group:"Misc",defaultValue:false},showTitleSelector:{type:"boolean",group:"Misc",defaultValue:false},numberState:{type:"sap.ui.core.ValueState",group:"Misc",defaultValue:sap.ui.core.ValueState.None},condensed:{type:"boolean",group:"Appearance",defaultValue:false},backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance"},responsive:{type:"boolean",group:"Behavior",defaultValue:false},fullScreenOptimized:{type:"boolean",group:"Appearance",defaultValue:false},titleHref:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},titleTarget:{type:"string",group:"Behavior",defaultValue:null},introHref:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},introTarget:{type:"string",group:"Behavior",defaultValue:null},titleTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit},introTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit},numberTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit},titleSelectorTooltip:{type:"string",group:"Misc",defaultValue:"Options"}},defaultAggregation:"attributes",aggregations:{attributes:{type:"sap.m.ObjectAttribute",multiple:true,singularName:"attribute"},firstStatus:{type:"sap.m.ObjectStatus",multiple:false,deprecated:true},secondStatus:{type:"sap.m.ObjectStatus",multiple:false,deprecated:true},statuses:{type:"sap.ui.core.Control",multiple:true,singularName:"status"},_objectNumber:{type:"sap.m.ObjectNumber",multiple:false,visibility:"hidden"},headerContainer:{type:"sap.m.ObjectHeaderContainer",multiple:false}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{titlePress:{parameters:{domRef:{type:"object"}}},introPress:{parameters:{domRef:{type:"object"}}},iconPress:{parameters:{domRef:{type:"object"}}},titleSelectorPress:{parameters:{domRef:{type:"object"}}}}}});O.prototype.init=function(){var t=this,L=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oPlaceholderIcon=I.createControlByURI({id:this.getId()+"-placeholder",useIconTooltip:false,src:I.getIconURI("fridge")});this._oPlaceholderIcon.addStyleClass("sapMObjStatusMarkerInvisible");this._oFlagIcon=I.createControlByURI({id:this.getId()+"-flag",tooltip:L.getText("TOOLTIP_OH_FLAG_MARK_VALUE"),src:I.getIconURI("flag"),visible:false});this._oFavIcon=I.createControlByURI({id:this.getId()+"-favorite",tooltip:L.getText("TOOLTIP_OH_FAVORITE_MARK_VALUE"),src:I.getIconURI("favorite"),visible:false});this._oTitleArrowIcon=I.createControlByURI({id:this.getId()+"-titleArrow",src:I.getIconURI("arrow-down"),decorative:false,visible:false,tooltip:L.getText("OH_SELECT_ARROW_TOOLTIP"),size:"1.375rem",press:function(e){t.fireTitleSelectorPress({domRef:this.getDomRef()});}});this._fNumberWidth=undefined;this._titleText=new sap.m.Text(this.getId()+"-titleText");this._titleText.setMaxLines(3);};O.prototype.insertAttribute=function(a,i){var r=this.insertAggregation("attributes",a,i);this._registerControlListener(a);return r;};O.prototype.addAttribute=function(a){var r=this.addAggregation("attributes",a);this._registerControlListener(a);return r;};O.prototype.removeAttribute=function(a){this._deregisterControlListener(a);return this.removeAggregation("attributes",a);};O.prototype.removeAllAttributes=function(){this.getAggregation("attributes").forEach(this._deregisterControlListener,this);return this.removeAllAggregation("attributes");};O.prototype.destroyAttributes=function(){this.getAggregation("attributes").forEach(this._deregisterControlListener,this);return this.destroyAggregation("attributes");};O.prototype.insertStatus=function(s,i){var r=this.insertAggregation("attributes",s,i);this._registerControlListener(s);return r;};O.prototype.addStatus=function(s){var r=this.addAggregation("statuses",s);this._registerControlListener(s);return r;};O.prototype.removeStatus=function(s){this._deregisterControlListener(s);return this.removeAggregation("statuses",s);};O.prototype.removeAllStatuses=function(){this.getAggregation("statuses").forEach(this._deregisterControlListener,this);return this.removeAllAggregation("statuses");};O.prototype.destroyStatuses=function(){this.getAggregation("statuses").forEach(this._deregisterControlListener,this);return this.destroyAggregation("statuses");};O.prototype._registerControlListener=function(c){if(c){c.attachEvent("_change",this.invalidate,this);}};O.prototype._deregisterControlListener=function(c){if(c){c.detachEvent("_change",this.invalidate,this);}};O.prototype.setCondensed=function(c){this.setProperty("condensed",c);if(this.getCondensed()){this._oTitleArrowIcon.setSize("1rem");}else{this._oTitleArrowIcon.setSize("1.375rem");}return this;};O.prototype.setNumber=function(n){this.setProperty("number",n);this._getObjectNumber().setNumber(n);return this;};O.prototype.setNumberUnit=function(u){this.setProperty("numberUnit",u);this._getObjectNumber().setUnit(u);return this;};O.prototype.setNumberState=function(s){this.setProperty("numberState",s,true);this._getObjectNumber().setState(s);return this;};O.prototype.setTitleSelectorTooltip=function(t){this.setProperty("titleSelectorTooltip",t,false);this._oTitleArrowIcon.setTooltip(t);return this;};O.prototype._getObjectNumber=function(){var c=this.getAggregation("_objectNumber");if(!c){c=new sap.m.ObjectNumber(this.getId()+"-number",{emphasized:false});this.setAggregation("_objectNumber",c,true);}return c;};O.prototype.ontap=function(e){var s=e.target.id;if(this.getIntroActive()&&s===this.getId()+"-intro"){if(!this.getIntroHref()){this.fireIntroPress({domRef:q.sap.domById(s)});}}else if(!this.getResponsive()&&this.getTitleActive()&&(s===this.getId()+"-title"||q(e.target).parent().attr('id')===this.getId()+"-title"||s===this.getId()+"-titleText-inner")){if(!this.getTitleHref()){e.preventDefault();s=this.getId()+"-title";this.fireTitlePress({domRef:q.sap.domById(s)});}}else if(this.getResponsive()&&this.getTitleActive()&&(s===this.getId()+"-txt"||q(e.target).parent().attr('id')===this.getId()+"-txt")){if(!this.getTitleHref()){e.preventDefault();s=this.getId()+"-txt";this.fireTitlePress({domRef:q.sap.domById(s)});}}else if(this.getIconActive()&&(s===this.getId()+"-img"||s===this.getId()+"-icon")){this.fireIconPress({domRef:q.sap.domById(s)});}};O.prototype._handleSpaceOrEnter=function(e){var s=e.target.id;if(!this.getResponsive()&&this.getTitleActive()&&(s===this.getId()+"-title"||q(e.target).parent().attr('id')===this.getId()+"-title"||s===this.getId()+"-titleText-inner")){if(e.type==="sapspace"){e.preventDefault();}s=this.getId()+"-title";if(!this.getTitleHref()){e.preventDefault();this.fireTitlePress({domRef:q.sap.domById(s)});}else{if(e.type==="sapspace"){this._linkClick(e,s);}}}else if(this.getResponsive()&&this.getTitleActive()&&(s===this.getId()+"-txt"||q(e.target).parent().attr('id')===this.getId()+"-txt")){if(e.type==="sapspace"){e.preventDefault();}s=q(e.target).parent().attr('id');if(!this.getTitleHref()){e.preventDefault();this.fireTitlePress({domRef:q.sap.domById(s)});}else{if(e.type==="sapspace"){this._linkClick(e,s);}}}else if(this.getIntroActive()&&s===this.getId()+"-intro"){if(e.type==="sapspace"){e.preventDefault();}if(!this.getIntroHref()){this.fireIntroPress({domRef:q.sap.domById(s)});}}else if(this.getIconActive()&&q(e.target).hasClass('sapMOHIcon')){if(e.type==="sapspace"){e.preventDefault();}var i=q.sap.domById(this.getId()+"-icon");if(!i){i=q.sap.domById(this.getId()+"-img");}this.fireIconPress({domRef:i});}};O.prototype.onsapspace=O.prototype._handleSpaceOrEnter;O.prototype.onsapenter=O.prototype._handleSpaceOrEnter;O.prototype._linkClick=function(e,s){e.setMarked();var c=document.createEvent('MouseEvents');c.initEvent('click',false,true);q.sap.domById(s).dispatchEvent(c);};O.prototype._onOrientationChange=function(){var i=this.getId();if(sap.ui.Device.system.tablet&&this.getFullScreenOptimized()&&(this._hasAttributes()||this._hasStatus())){this._rerenderStates();}if(sap.ui.Device.system.phone){if(sap.ui.Device.orientation.portrait){if(this.getTitle().length>50){this._rerenderTitle(50);}if(this.getIcon()){q.sap.byId(i+"-titlediv").removeClass("sapMOHRTitleIcon");q.sap.byId(i+"-titleIcon").addClass("sapMOHRHideIcon");}}else{if(sap.ui.Device.orientation.landscape){if(this.getTitle().length>80){this._rerenderTitle(80);}if(this.getIcon()){q.sap.byId(i+"-titlediv").addClass("sapMOHRTitleIcon");q.sap.byId(i+"-titleIcon").removeClass("sapMOHRHideIcon");}}}this._adjustNumberDiv();}this._adjustIntroDiv();};O.prototype._rerenderTitle=function(n){var r=sap.ui.getCore().createRenderManager();this.getRenderer()._rerenderTitle(r,this,n);r.destroy();};O.prototype._rerenderStates=function(){var r=sap.ui.getCore().createRenderManager();this.getRenderer()._rerenderResponsiveStates(r,this);r.destroy();};O.prototype.exit=function(){if(sap.ui.Device.system.desktop){sap.ui.Device.media.detachHandler(this._rerenderOHR,this,sap.ui.Device.media.RANGESETS.SAP_STANDARD);}if(sap.ui.Device.system.tablet||sap.ui.Device.system.phone){sap.ui.Device.orientation.detachHandler(this._onOrientationChange,this);}if(this._oImageControl){this._oImageControl.destroy();this._oImageControl=undefined;}if(this._oPlaceholderIcon){this._oPlaceholderIcon.destroy();this._oPlaceholderIcon=undefined;}if(this._oFavIcon){this._oFavIcon.destroy();this._oFavIcon=undefined;}if(this._oFlagIcon){this._oFlagIcon.destroy();this._oFlagIcon=undefined;}if(this._oTitleArrowIcon){this._oTitleArrowIcon.destroy();this._oTitleArrowIcon=undefined;}if(this._titleText){this._titleText.destroy();this._titleText=undefined;}if(this._introText){this._introText.destroy();this._introText=undefined;}};O.prototype._getImageControl=function(){var i=this.getId()+"-img";var s="2.5rem";var h="3rem";var w="3rem";var p=q.extend({src:this.getIcon(),alt:this.getIconAlt(),useIconTooltip:false,densityAware:this.getIconDensityAware()},I.isIconURI(this.getIcon())?{size:s}:{height:h,width:w});this._oImageControl=sap.m.ImageHelper.getImageControl(i,this._oImageControl,this,p);return this._oImageControl;};O.prototype.onBeforeRendering=function(){if(sap.ui.Device.system.tablet||sap.ui.Device.system.phone){sap.ui.Device.orientation.detachHandler(this._onOrientationChange,this);}if(sap.ui.Device.system.desktop){sap.ui.Device.media.detachHandler(this._rerenderOHR,this,sap.ui.Device.media.RANGESETS.SAP_STANDARD);}if(this._introText){this._introText.destroy();this._introText=undefined;}};O.prototype.onAfterRendering=function(){var o=this.getAggregation("_objectNumber");var p=sap.ui.getCore().getConfiguration().getRTL();var $=this.$("titleArrow");$.attr("role","button");if(this.getResponsive()){this._adjustIntroDiv();if(o&&o.getNumber()){if(sap.ui.Device.system.desktop&&q('html').hasClass("sapUiMedia-Std-Desktop")&&this.getFullScreenOptimized()&&this._iCountVisAttrStat>=1&&this._iCountVisAttrStat<=3){o.setTextAlign(p?sap.ui.core.TextAlign.Right:sap.ui.core.TextAlign.Left);}else{o.setTextAlign(p?sap.ui.core.TextAlign.Left:sap.ui.core.TextAlign.Right);}}this._adjustNumberDiv();if(sap.ui.Device.system.tablet||sap.ui.Device.system.phone){sap.ui.Device.orientation.attachHandler(this._onOrientationChange,this);}if(sap.ui.Device.system.desktop){sap.ui.Device.media.attachHandler(this._rerenderOHR,this,sap.ui.Device.media.RANGESETS.SAP_STANDARD);}}else{if(o&&o.getNumber()){o.setTextAlign(p?sap.ui.core.TextAlign.Left:sap.ui.core.TextAlign.Right);}}};O.prototype._rerenderOHR=function(){this.invalidate();};O.prototype._adjustNumberDiv=function(){var i=this.getId();var o=this.getAggregation("_objectNumber");var p=sap.ui.getCore().getConfiguration().getRTL();if(o&&o.getNumber()){var $=q.sap.byId(i+"-number");var a=q.sap.byId(i+"-titlediv");if(sap.ui.Device.system.phone||(sap.ui.Device.system.desktop&&q('html').hasClass("sapUiMedia-Std-Phone"))){if($.hasClass("sapMObjectNumberBelowTitle")){o.setTextAlign(p?sap.ui.core.TextAlign.Left:sap.ui.core.TextAlign.Right);$.removeClass("sapMObjectNumberBelowTitle");a.removeClass("sapMOHRTitleDivFull");}var n=$.parent().width()*0.4;if($.outerWidth()>n){o.setTextAlign(p?sap.ui.core.TextAlign.Right:sap.ui.core.TextAlign.Left);$.addClass("sapMObjectNumberBelowTitle");a.addClass("sapMOHRTitleDivFull");}}}};O.prototype._adjustIntroDiv=function(){var i=this.getId();var $=q.sap.byId(i+"-txt");var a=q.sap.byId(i+"-titleArrow");var b=q.sap.byId(i+"-intro");if(b.parent().hasClass("sapMOHRIntroMargin")){b.parent().removeClass("sapMOHRIntroMargin");}if(a.height()!==null&&($.height()<a.height())){b.parent().addClass("sapMOHRIntroMargin");}};O._escapeId=function(i){return i?"#"+i.replace(/(:|\.)/g,'\\$1'):"";};O.prototype._hasBottomContent=function(){return(this._hasAttributes()||this._hasStatus()||this.getShowMarkers());};O.prototype._hasIcon=function(){return!!this.getIcon().trim();};O.prototype._hasAttributes=function(){var a=this.getAttributes();if(a&&a.length>0){for(var i=0;i<a.length;i++){if(!a[i]._isEmpty()){return true;}}}return false;};O.prototype._hasStatus=function(){var h=((this.getFirstStatus()&&!this.getFirstStatus()._isEmpty())||(this.getSecondStatus()&&!this.getSecondStatus()._isEmpty()));if(!h&&this.getStatuses()&&this.getStatuses().length>0){var s=this.getStatuses();for(var i=0;i<s.length;i++){if(s[i]instanceof sap.m.ObjectStatus&&!s[i]._isEmpty()){h=true;break;}else if(s[i]instanceof sap.m.ProgressIndicator){h=true;break;}}}return h;};O.prototype._getDefaultBackgroundDesign=function(){if(this.getCondensed()){return sap.m.BackgroundDesign.Solid;}else{if(this.getResponsive()){return sap.m.BackgroundDesign.Translucent;}else{return sap.m.BackgroundDesign.Transparent;}}};O.prototype._getBackground=function(){if(this.getBackgroundDesign()===undefined){return this._getDefaultBackgroundDesign();}else{return this.getBackgroundDesign();}};return O;},true);
