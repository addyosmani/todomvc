/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/m/semantic/Segment','sap/ui/base/Metadata'],function(q,S,M){"use strict";var a=M.createClass("sap.m.semantic.SegmentedContainer",{constructor:function(c,C){if(!c){q.sap.log.error("missing argumment: constructor expects a container reference",this);return;}this._oContainer=c;C||(C="content");this._sContainerAggregationName=C;this._aSegments=[];}});a.prototype.addSection=function(o){if(!o||!o.sTag){q.sap.log.error("missing argumment: section options expected",this);return;}if(o.aContent){var c=o.aContent;var l=c.length;for(var i=0;i<l;i++){this._oContainer.addAggregation(this._sContainerAggregationName,c[i]);}}var s=new S(c,this._oContainer,this._sContainerAggregationName,o.fnSortFunction);s.sTag=o.sTag;var b=this._aSegments;s.getStartIndex=function(){var d=0;var e=q.inArray(this,b);if(e>0){var p=e-1;while(p>=0){d+=b[p].getContent().length;p--;}}return d;};this._aSegments.push(s);};a.prototype.getSection=function(t){var s;this._aSegments.forEach(function(b){if(b.sTag===t){s=b;}});return s;};a.prototype.destroy=function(s){this._oContainer.destroy(s);this.aSegments=null;};return a;},false);
