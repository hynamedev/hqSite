var _____WB$wombat$assign$function_____ = function(name) {
    return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name];
};
if (!self.__WB_pmw) {
    self.__WB_pmw = function(obj) {
        this.__WB_source = obj;
        return this;
    }
}
{
    let window = _____WB$wombat$assign$function_____("window");
    let self = _____WB$wombat$assign$function_____("self");
    let document = _____WB$wombat$assign$function_____("document");
    let location = _____WB$wombat$assign$function_____("location");
    let top = _____WB$wombat$assign$function_____("top");
    let parent = _____WB$wombat$assign$function_____("parent");
    let frames = _____WB$wombat$assign$function_____("frames");
    let opener = _____WB$wombat$assign$function_____("opener");

    jQuery(function() {
        initRetinaCover();
        initAjaxPage();
    });
    function initAjaxPage() {
        jQuery('div.ajax-tabs').ajaxTabs({
            tabLinks: 'ul.ajax-tabset a',
            tabHolder: 'div.ajax-holder',
            loadingClass: 'ajax-tabs-loading',
            activeClass: 'active',
            animSpeed: 200,
            onTabLoad: function(tab) {
                tab.find('.bg-stretch').retinaCover();
            }
        });
    }
    function initRetinaCover() {
        jQuery('.bg-stretch').retinaCover();
    }
    /*!
* JavaScript Custom Forms
*
* Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
* Released under the MIT license (LICENSE.txt)
*
* Version: 1.1.3
*/
    ;(function(root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.jcf = factory(jQuery);
    }
}(this, function($) {
    'use strict';
    var version = '1.1.3';
    var customInstances = [];
    var commonOptions = {
        optionsKey: 'jcf',
        dataKey: 'jcf-instance',
        rtlClass: 'jcf-rtl',
        focusClass: 'jcf-focus',
        pressedClass: 'jcf-pressed',
        disabledClass: 'jcf-disabled',
        hiddenClass: 'jcf-hidden',
        resetAppearanceClass: 'jcf-reset-appearance',
        unselectableClass: 'jcf-unselectable'
    };
    var isTouchDevice = ('ontouchstart'in window) || window.DocumentTouch && document instanceof window.DocumentTouch
        , isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);
    commonOptions.isMobileDevice = !!(isTouchDevice || isWinPhoneDevice);
    var isIOS = /(iPad|iPhone).*OS ([0-9_]*) .*/.exec(navigator.userAgent);
    if (isIOS)
        isIOS = parseFloat(isIOS[2].replace(/_/g, '.'));
    commonOptions.ios = isIOS;
    var createStyleSheet = function() {
        var styleTag = $('<style>').appendTo('head')
            , styleSheet = styleTag.prop('sheet') || styleTag.prop('styleSheet');
        var addCSSRule = function(selector, rules, index) {
            if (styleSheet.insertRule) {
                styleSheet.insertRule(selector + '{' + rules + '}', index);
            } else {
                styleSheet.addRule(selector, rules, index);
            }
        };
        addCSSRule('.' + commonOptions.hiddenClass, 'position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none');
        addCSSRule('.' + commonOptions.rtlClass + ' .' + commonOptions.hiddenClass, 'right:-9999px !important; left: auto !important');
        addCSSRule('.' + commonOptions.unselectableClass, '-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);');
        addCSSRule('.' + commonOptions.resetAppearanceClass, 'background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);');
        var html = $('html')
            , body = $('body');
        if (html.css('direction') === 'rtl' || body.css('direction') === 'rtl') {
            html.addClass(commonOptions.rtlClass);
        }
        html.on('reset', function() {
            setTimeout(function() {
                api.refreshAll();
            }, 0);
        });
        commonOptions.styleSheetCreated = true;
    };
    (function() {
        var pointerEventsSupported = navigator.pointerEnabled || navigator.msPointerEnabled, touchEventsSupported = ('ontouchstart'in window) || window.DocumentTouch && document instanceof window.DocumentTouch, eventList, eventMap = {}, eventPrefix = 'jcf-';
        if (pointerEventsSupported) {
            eventList = {
                pointerover: navigator.pointerEnabled ? 'pointerover' : 'MSPointerOver',
                pointerdown: navigator.pointerEnabled ? 'pointerdown' : 'MSPointerDown',
                pointermove: navigator.pointerEnabled ? 'pointermove' : 'MSPointerMove',
                pointerup: navigator.pointerEnabled ? 'pointerup' : 'MSPointerUp'
            };
        } else {
            eventList = {
                pointerover: 'mouseover',
                pointerdown: 'mousedown' + (touchEventsSupported ? ' touchstart' : ''),
                pointermove: 'mousemove' + (touchEventsSupported ? ' touchmove' : ''),
                pointerup: 'mouseup' + (touchEventsSupported ? ' touchend' : '')
            };
        }
        $.each(eventList, function(targetEventName, fakeEventList) {
            $.each(fakeEventList.split(' '), function(index, fakeEventName) {
                eventMap[fakeEventName] = targetEventName;
            });
        });
        $.each(eventList, function(eventName, eventHandlers) {
            eventHandlers = eventHandlers.split(' ');
            $.event.special[eventPrefix + eventName] = {
                setup: function() {
                    var self = this;
                    $.each(eventHandlers, function(index, fallbackEvent) {
                        if (self.addEventListener)
                            self.addEventListener(fallbackEvent, fixEvent, commonOptions.isMobileDevice ? {
                                passive: false
                            } : false);
                        else
                            self['on' + fallbackEvent] = fixEvent;
                    });
                },
                teardown: function() {
                    var self = this;
                    $.each(eventHandlers, function(index, fallbackEvent) {
                        if (self.addEventListener)
                            self.removeEventListener(fallbackEvent, fixEvent, commonOptions.isMobileDevice ? {
                                passive: false
                            } : false);
                        else
                            self['on' + fallbackEvent] = null;
                    });
                }
            };
        });
        var lastTouch = null;
        var mouseEventSimulated = function(e) {
            var dx = Math.abs(e.pageX - lastTouch.x)
                , dy = Math.abs(e.pageY - lastTouch.y)
                , rangeDistance = 25;
            if (dx <= rangeDistance && dy <= rangeDistance) {
                return true;
            }
        };
        var fixEvent = function(e) {
            var origEvent = e || window.event
                , touchEventData = null
                , targetEventName = eventMap[origEvent.type];
            e = $.event.fix(origEvent);
            e.type = eventPrefix + targetEventName;
            if (origEvent.pointerType) {
                switch (origEvent.pointerType) {
                    case 2:
                        e.pointerType = 'touch';
                        break;
                    case 3:
                        e.pointerType = 'pen';
                        break;
                    case 4:
                        e.pointerType = 'mouse';
                        break;
                    default:
                        e.pointerType = origEvent.pointerType;
                }
            } else {
                e.pointerType = origEvent.type.substr(0, 5);
            }
            if (!e.pageX && !e.pageY) {
                touchEventData = origEvent.changedTouches ? origEvent.changedTouches[0] : origEvent;
                e.pageX = touchEventData.pageX;
                e.pageY = touchEventData.pageY;
            }
            if (origEvent.type === 'touchend') {
                lastTouch = {
                    x: e.pageX,
                    y: e.pageY
                };
            }
            if (e.pointerType === 'mouse' && lastTouch && mouseEventSimulated(e)) {
                return;
            } else {
                return ($.event.dispatch || $.event.handle).call(this, e);
            }
        };
    }());
    (function() {
        var wheelEvents = ('onwheel'in document || document.documentMode >= 9 ? 'wheel' : 'mousewheel DOMMouseScroll').split(' ')
            , shimEventName = 'jcf-mousewheel';
        $.event.special[shimEventName] = {
            setup: function() {
                var self = this;
                $.each(wheelEvents, function(index, fallbackEvent) {
                    if (self.addEventListener)
                        self.addEventListener(fallbackEvent, fixEvent, false);
                    else
                        self['on' + fallbackEvent] = fixEvent;
                });
            },
            teardown: function() {
                var self = this;
                $.each(wheelEvents, function(index, fallbackEvent) {
                    if (self.addEventListener)
                        self.removeEventListener(fallbackEvent, fixEvent, false);
                    else
                        self['on' + fallbackEvent] = null;
                });
            }
        };
        var fixEvent = function(e) {
            var origEvent = e || window.event;
            e = $.event.fix(origEvent);
            e.type = shimEventName;
            if ('detail'in origEvent) {
                e.deltaY = -origEvent.detail;
            }
            if ('wheelDelta'in origEvent) {
                e.deltaY = -origEvent.wheelDelta;
            }
            if ('wheelDeltaY'in origEvent) {
                e.deltaY = -origEvent.wheelDeltaY;
            }
            if ('wheelDeltaX'in origEvent) {
                e.deltaX = -origEvent.wheelDeltaX;
            }
            if ('deltaY'in origEvent) {
                e.deltaY = origEvent.deltaY;
            }
            if ('deltaX'in origEvent) {
                e.deltaX = origEvent.deltaX;
            }
            e.delta = e.deltaY || e.deltaX;
            if (origEvent.deltaMode === 1) {
                var lineHeight = 16;
                e.delta *= lineHeight;
                e.deltaY *= lineHeight;
                e.deltaX *= lineHeight;
            }
            return ($.event.dispatch || $.event.handle).call(this, e);
        };
    }());
    var moduleMixin = {
        fireNativeEvent: function(elements, eventName) {
            $(elements).each(function() {
                var element = this, eventObject;
                if (element.dispatchEvent) {
                    eventObject = document.createEvent('HTMLEvents');
                    eventObject.initEvent(eventName, true, true);
                    element.dispatchEvent(eventObject);
                } else if (document.createEventObject) {
                    eventObject = document.createEventObject();
                    eventObject.target = element;
                    element.fireEvent('on' + eventName, eventObject);
                }
            });
        },
        bindHandlers: function() {
            var self = this;
            $.each(self, function(propName, propValue) {
                if (propName.indexOf('on') === 0 && $.isFunction(propValue)) {
                    self[propName] = function() {
                        return propValue.apply(self, arguments);
                    }
                    ;
                }
            });
        }
    };
    var api = {
        version: version,
        modules: {},
        getOptions: function() {
            return $.extend({}, commonOptions);
        },
        setOptions: function(moduleName, moduleOptions) {
            if (arguments.length > 1) {
                if (this.modules[moduleName]) {
                    $.extend(this.modules[moduleName].prototype.options, moduleOptions);
                }
            } else {
                $.extend(commonOptions, moduleName);
            }
        },
        addModule: function(proto) {
            var Module = function(options) {
                if (!options.element.data(commonOptions.dataKey)) {
                    options.element.data(commonOptions.dataKey, this);
                }
                customInstances.push(this);
                this.options = $.extend({}, commonOptions, this.options, getInlineOptions(options.element), options);
                this.bindHandlers();
                this.init.apply(this, arguments);
            };
            var getInlineOptions = function(element) {
                var dataOptions = element.data(commonOptions.optionsKey)
                    , attrOptions = element.attr(commonOptions.optionsKey);
                if (dataOptions) {
                    return dataOptions;
                } else if (attrOptions) {
                    try {
                        return $.parseJSON(attrOptions);
                    } catch (e) {}
                }
            };
            Module.prototype = proto;
            $.extend(proto, moduleMixin);
            if (proto.plugins) {
                $.each(proto.plugins, function(pluginName, plugin) {
                    $.extend(plugin.prototype, moduleMixin);
                });
            }
            var originalDestroy = Module.prototype.destroy;
            Module.prototype.destroy = function() {
                this.options.element.removeData(this.options.dataKey);
                for (var i = customInstances.length - 1; i >= 0; i--) {
                    if (customInstances[i] === this) {
                        customInstances.splice(i, 1);
                        break;
                    }
                }
                if (originalDestroy) {
                    originalDestroy.apply(this, arguments);
                }
            }
            ;
            this.modules[proto.name] = Module;
        },
        getInstance: function(element) {
            return $(element).data(commonOptions.dataKey);
        },
        replace: function(elements, moduleName, customOptions) {
            var self = this, instance;
            if (!commonOptions.styleSheetCreated) {
                createStyleSheet();
            }
            $(elements).each(function() {
                var moduleOptions, element = $(this);
                instance = element.data(commonOptions.dataKey);
                if (instance) {
                    instance.refresh();
                } else {
                    if (!moduleName) {
                        $.each(self.modules, function(currentModuleName, module) {
                            if (module.prototype.matchElement.call(module.prototype, element)) {
                                moduleName = currentModuleName;
                                return false;
                            }
                        });
                    }
                    if (moduleName) {
                        moduleOptions = $.extend({
                            element: element
                        }, customOptions);
                        instance = new self.modules[moduleName](moduleOptions);
                    }
                }
            });
            return instance;
        },
        refresh: function(elements) {
            $(elements).each(function() {
                var instance = $(this).data(commonOptions.dataKey);
                if (instance) {
                    instance.refresh();
                }
            });
        },
        destroy: function(elements) {
            $(elements).each(function() {
                var instance = $(this).data(commonOptions.dataKey);
                if (instance) {
                    instance.destroy();
                }
            });
        },
        replaceAll: function(context) {
            var self = this;
            $.each(this.modules, function(moduleName, module) {
                $(module.prototype.selector, context).each(function() {
                    if (this.className.indexOf('jcf-ignore') < 0) {
                        self.replace(this, moduleName);
                    }
                });
            });
        },
        refreshAll: function(context) {
            if (context) {
                $.each(this.modules, function(moduleName, module) {
                    $(module.prototype.selector, context).each(function() {
                        var instance = $(this).data(commonOptions.dataKey);
                        if (instance) {
                            instance.refresh();
                        }
                    });
                });
            } else {
                for (var i = customInstances.length - 1; i >= 0; i--) {
                    customInstances[i].refresh();
                }
            }
        },
        destroyAll: function(context) {
            if (context) {
                $.each(this.modules, function(moduleName, module) {
                    $(module.prototype.selector, context).each(function(index, element) {
                        var instance = $(element).data(commonOptions.dataKey);
                        if (instance) {
                            instance.destroy();
                        }
                    });
                });
            } else {
                while (customInstances.length) {
                    customInstances[0].destroy();
                }
            }
        }
    };
    window.jcf = api;
    return api;
}));
    /*!
* JavaScript Custom Forms : Select Module
*
* Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
* Released under the MIT license (LICENSE.txt)
*
* Version: 1.1.3
*/
    ;(function($, window) {
    'use strict';
    jcf.addModule({
        name: 'Select',
        selector: 'select',
        options: {
            element: null,
            multipleCompactStyle: false
        },
        plugins: {
            ListBox: ListBox,
            ComboBox: ComboBox,
            SelectList: SelectList
        },
        matchElement: function(element) {
            return element.is('select');
        },
        init: function() {
            this.element = $(this.options.element);
            this.createInstance();
        },
        isListBox: function() {
            return this.element.is('[size]:not([jcf-size]), [multiple]');
        },
        createInstance: function() {
            if (this.instance) {
                this.instance.destroy();
            }
            if (this.isListBox() && !this.options.multipleCompactStyle) {
                this.instance = new ListBox(this.options);
            } else {
                this.instance = new ComboBox(this.options);
            }
        },
        refresh: function() {
            var typeMismatch = (this.isListBox() && this.instance instanceof ComboBox) || (!this.isListBox() && this.instance instanceof ListBox);
            if (typeMismatch) {
                this.createInstance();
            } else {
                this.instance.refresh();
            }
        },
        destroy: function() {
            this.instance.destroy();
        }
    });
    function ComboBox(options) {
        this.options = $.extend({
            wrapNative: true,
            wrapNativeOnMobile: true,
            fakeDropInBody: true,
            useCustomScroll: true,
            flipDropToFit: true,
            maxVisibleItems: 10,
            fakeAreaStructure: '<span class="jcf-select"><span class="jcf-select-text"></span><span class="jcf-select-opener"></span></span>',
            fakeDropStructure: '<div class="jcf-select-drop"><div class="jcf-select-drop-content"></div></div>',
            optionClassPrefix: 'jcf-option-',
            selectClassPrefix: 'jcf-select-',
            dropContentSelector: '.jcf-select-drop-content',
            selectTextSelector: '.jcf-select-text',
            dropActiveClass: 'jcf-drop-active',
            flipDropClass: 'jcf-drop-flipped'
        }, options);
        this.init();
    }
    $.extend(ComboBox.prototype, {
        init: function() {
            this.initStructure();
            this.bindHandlers();
            this.attachEvents();
            this.refresh();
        },
        initStructure: function() {
            this.win = $(window);
            this.doc = $(document);
            this.realElement = $(this.options.element);
            this.fakeElement = $(this.options.fakeAreaStructure).insertAfter(this.realElement);
            this.selectTextContainer = this.fakeElement.find(this.options.selectTextSelector);
            this.selectText = $('<span></span>').appendTo(this.selectTextContainer);
            makeUnselectable(this.fakeElement);
            this.fakeElement.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));
            if (this.realElement.prop('multiple')) {
                this.fakeElement.addClass('jcf-compact-multiple');
            }
            if (this.options.isMobileDevice && this.options.wrapNativeOnMobile && !this.options.wrapNative) {
                this.options.wrapNative = true;
            }
            if (this.options.wrapNative) {
                this.realElement.prependTo(this.fakeElement).css({
                    position: 'absolute',
                    height: '100%',
                    width: '100%'
                }).addClass(this.options.resetAppearanceClass);
            } else {
                this.realElement.addClass(this.options.hiddenClass);
                this.fakeElement.attr('title', this.realElement.attr('title'));
                this.fakeDropTarget = this.options.fakeDropInBody ? $('body') : this.fakeElement;
            }
        },
        attachEvents: function() {
            var self = this;
            this.delayedRefresh = function() {
                setTimeout(function() {
                    self.refresh();
                    if (self.list) {
                        self.list.refresh();
                        self.list.scrollToActiveOption();
                    }
                }, 1);
            }
            ;
            if (this.options.wrapNative) {
                this.realElement.on({
                    focus: this.onFocus,
                    change: this.onChange,
                    click: this.onChange,
                    keydown: this.onChange
                });
            } else {
                this.realElement.on({
                    focus: this.onFocus,
                    change: this.onChange,
                    keydown: this.onKeyDown
                });
                this.fakeElement.on({
                    'jcf-pointerdown': this.onSelectAreaPress
                });
            }
        },
        onKeyDown: function(e) {
            if (e.which === 13) {
                this.toggleDropdown();
            } else if (this.dropActive) {
                this.delayedRefresh();
            }
        },
        onChange: function() {
            this.refresh();
        },
        onFocus: function() {
            if (!this.pressedFlag || !this.focusedFlag) {
                this.fakeElement.addClass(this.options.focusClass);
                this.realElement.on('blur', this.onBlur);
                this.toggleListMode(true);
                this.focusedFlag = true;
            }
        },
        onBlur: function() {
            if (!this.pressedFlag) {
                this.fakeElement.removeClass(this.options.focusClass);
                this.realElement.off('blur', this.onBlur);
                this.toggleListMode(false);
                this.focusedFlag = false;
            }
        },
        onResize: function() {
            if (this.dropActive) {
                this.hideDropdown();
            }
        },
        onSelectDropPress: function() {
            this.pressedFlag = true;
        },
        onSelectDropRelease: function(e, pointerEvent) {
            this.pressedFlag = false;
            if (pointerEvent.pointerType === 'mouse') {
                this.realElement.focus();
            }
        },
        onSelectAreaPress: function(e) {
            var dropClickedInsideFakeElement = !this.options.fakeDropInBody && $(e.target).closest(this.dropdown).length;
            if (dropClickedInsideFakeElement || e.button > 1 || this.realElement.is(':disabled')) {
                return;
            }
            this.selectOpenedByEvent = e.pointerType;
            this.toggleDropdown();
            if (!this.focusedFlag) {
                if (e.pointerType === 'mouse') {
                    this.realElement.focus();
                } else {
                    this.onFocus(e);
                }
            }
            this.pressedFlag = true;
            this.fakeElement.addClass(this.options.pressedClass);
            this.doc.on('jcf-pointerup', this.onSelectAreaRelease);
        },
        onSelectAreaRelease: function(e) {
            if (this.focusedFlag && e.pointerType === 'mouse') {
                this.realElement.focus();
            }
            this.pressedFlag = false;
            this.fakeElement.removeClass(this.options.pressedClass);
            this.doc.off('jcf-pointerup', this.onSelectAreaRelease);
        },
        onOutsideClick: function(e) {
            var target = $(e.target)
                , clickedInsideSelect = target.closest(this.fakeElement).length || target.closest(this.dropdown).length;
            if (!clickedInsideSelect) {
                this.hideDropdown();
            }
        },
        onSelect: function() {
            this.refresh();
            if (this.realElement.prop('multiple')) {
                this.repositionDropdown();
            } else {
                this.hideDropdown();
            }
            this.fireNativeEvent(this.realElement, 'change');
        },
        toggleListMode: function(state) {
            if (!this.options.wrapNative) {
                if (state) {
                    this.realElement.attr({
                        size: 4,
                        'jcf-size': ''
                    });
                } else {
                    if (!this.options.wrapNative) {
                        this.realElement.removeAttr('size jcf-size');
                    }
                }
            }
        },
        createDropdown: function() {
            if (this.dropdown) {
                this.list.destroy();
                this.dropdown.remove();
            }
            this.dropdown = $(this.options.fakeDropStructure).appendTo(this.fakeDropTarget);
            this.dropdown.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));
            makeUnselectable(this.dropdown);
            if (this.realElement.prop('multiple')) {
                this.dropdown.addClass('jcf-compact-multiple');
            }
            if (this.options.fakeDropInBody) {
                this.dropdown.css({
                    position: 'absolute',
                    top: -9999
                });
            }
            this.list = new SelectList({
                useHoverClass: true,
                handleResize: false,
                alwaysPreventMouseWheel: true,
                maxVisibleItems: this.options.maxVisibleItems,
                useCustomScroll: this.options.useCustomScroll,
                holder: this.dropdown.find(this.options.dropContentSelector),
                multipleSelectWithoutKey: this.realElement.prop('multiple'),
                element: this.realElement
            });
            $(this.list).on({
                select: this.onSelect,
                press: this.onSelectDropPress,
                release: this.onSelectDropRelease
            });
        },
        repositionDropdown: function() {
            var selectOffset = this.fakeElement.offset(), selectWidth = this.fakeElement.outerWidth(), selectHeight = this.fakeElement.outerHeight(), dropHeight = this.dropdown.css('width', selectWidth).outerHeight(), winScrollTop = this.win.scrollTop(), winHeight = this.win.height(), calcTop, calcLeft, bodyOffset, needFlipDrop = false;
            if (selectOffset.top + selectHeight + dropHeight > winScrollTop + winHeight && selectOffset.top - dropHeight > winScrollTop) {
                needFlipDrop = true;
            }
            if (this.options.fakeDropInBody) {
                bodyOffset = this.fakeDropTarget.css('position') !== 'static' ? this.fakeDropTarget.offset().top : 0;
                if (this.options.flipDropToFit && needFlipDrop) {
                    calcLeft = selectOffset.left;
                    calcTop = selectOffset.top - dropHeight - bodyOffset;
                } else {
                    calcLeft = selectOffset.left;
                    calcTop = selectOffset.top + selectHeight - bodyOffset;
                }
                this.dropdown.css({
                    width: selectWidth,
                    left: calcLeft,
                    top: calcTop
                });
            }
            this.dropdown.add(this.fakeElement).toggleClass(this.options.flipDropClass, this.options.flipDropToFit && needFlipDrop);
        },
        showDropdown: function() {
            if (!this.realElement.prop('options').length) {
                return;
            }
            if (!this.dropdown) {
                this.createDropdown();
            }
            this.dropActive = true;
            this.dropdown.appendTo(this.fakeDropTarget);
            this.fakeElement.addClass(this.options.dropActiveClass);
            this.refreshSelectedText();
            this.repositionDropdown();
            this.list.setScrollTop(this.savedScrollTop);
            this.list.refresh();
            this.win.on('resize', this.onResize);
            this.doc.on('jcf-pointerdown', this.onOutsideClick);
        },
        hideDropdown: function() {
            if (this.dropdown) {
                this.savedScrollTop = this.list.getScrollTop();
                this.fakeElement.removeClass(this.options.dropActiveClass + ' ' + this.options.flipDropClass);
                this.dropdown.removeClass(this.options.flipDropClass).detach();
                this.doc.off('jcf-pointerdown', this.onOutsideClick);
                this.win.off('resize', this.onResize);
                this.dropActive = false;
                if (this.selectOpenedByEvent === 'touch') {
                    this.onBlur();
                }
            }
        },
        toggleDropdown: function() {
            if (this.dropActive) {
                this.hideDropdown();
            } else {
                this.showDropdown();
            }
        },
        refreshSelectedText: function() {
            var selectedIndex = this.realElement.prop('selectedIndex'), selectedOption = this.realElement.prop('options')[selectedIndex], selectedOptionImage = selectedOption ? selectedOption.getAttribute('data-image') : null, selectedOptionText = '', selectedOptionClasses, self = this;
            if (this.realElement.prop('multiple')) {
                $.each(this.realElement.prop('options'), function(index, option) {
                    if (option.selected) {
                        selectedOptionText += (selectedOptionText ? ', ' : '') + option.innerHTML;
                    }
                });
                if (!selectedOptionText) {
                    selectedOptionText = self.realElement.attr('placeholder') || '';
                }
                this.selectText.removeAttr('class').html(selectedOptionText);
            } else if (!selectedOption) {
                if (this.selectImage) {
                    this.selectImage.hide();
                }
                this.selectText.removeAttr('class').empty();
            } else if (this.currentSelectedText !== selectedOption.innerHTML || this.currentSelectedImage !== selectedOptionImage) {
                selectedOptionClasses = getPrefixedClasses(selectedOption.className, this.options.optionClassPrefix);
                this.selectText.attr('class', selectedOptionClasses).html(selectedOption.innerHTML);
                if (selectedOptionImage) {
                    if (!this.selectImage) {
                        this.selectImage = $('<img>').prependTo(this.selectTextContainer).hide();
                    }
                    this.selectImage.attr('src', selectedOptionImage).show();
                } else if (this.selectImage) {
                    this.selectImage.hide();
                }
                this.currentSelectedText = selectedOption.innerHTML;
                this.currentSelectedImage = selectedOptionImage;
            }
        },
        refresh: function() {
            if (this.realElement.prop('style').display === 'none') {
                this.fakeElement.hide();
            } else {
                this.fakeElement.show();
            }
            this.refreshSelectedText();
            this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(':disabled'));
        },
        destroy: function() {
            if (this.options.wrapNative) {
                this.realElement.insertBefore(this.fakeElement).css({
                    position: '',
                    height: '',
                    width: ''
                }).removeClass(this.options.resetAppearanceClass);
            } else {
                this.realElement.removeClass(this.options.hiddenClass);
                if (this.realElement.is('[jcf-size]')) {
                    this.realElement.removeAttr('size jcf-size');
                }
            }
            this.fakeElement.remove();
            this.doc.off('jcf-pointerup', this.onSelectAreaRelease);
            this.realElement.off({
                focus: this.onFocus
            });
        }
    });
    function ListBox(options) {
        this.options = $.extend({
            wrapNative: true,
            useCustomScroll: true,
            fakeStructure: '<span class="jcf-list-box"><span class="jcf-list-wrapper"></span></span>',
            selectClassPrefix: 'jcf-select-',
            listHolder: '.jcf-list-wrapper'
        }, options);
        this.init();
    }
    $.extend(ListBox.prototype, {
        init: function() {
            this.bindHandlers();
            this.initStructure();
            this.attachEvents();
        },
        initStructure: function() {
            this.realElement = $(this.options.element);
            this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
            this.listHolder = this.fakeElement.find(this.options.listHolder);
            makeUnselectable(this.fakeElement);
            this.fakeElement.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));
            this.realElement.addClass(this.options.hiddenClass);
            this.list = new SelectList({
                useCustomScroll: this.options.useCustomScroll,
                holder: this.listHolder,
                selectOnClick: false,
                element: this.realElement
            });
        },
        attachEvents: function() {
            var self = this;
            this.delayedRefresh = function(e) {
                if (e && e.which === 16) {
                    return;
                } else {
                    clearTimeout(self.refreshTimer);
                    self.refreshTimer = setTimeout(function() {
                        self.refresh();
                        self.list.scrollToActiveOption();
                    }, 1);
                }
            }
            ;
            this.realElement.on({
                focus: this.onFocus,
                click: this.delayedRefresh,
                keydown: this.delayedRefresh
            });
            $(this.list).on({
                select: this.onSelect,
                press: this.onFakeOptionsPress,
                release: this.onFakeOptionsRelease
            });
        },
        onFakeOptionsPress: function(e, pointerEvent) {
            this.pressedFlag = true;
            if (pointerEvent.pointerType === 'mouse') {
                this.realElement.focus();
            }
        },
        onFakeOptionsRelease: function(e, pointerEvent) {
            this.pressedFlag = false;
            if (pointerEvent.pointerType === 'mouse') {
                this.realElement.focus();
            }
        },
        onSelect: function() {
            this.fireNativeEvent(this.realElement, 'change');
            this.fireNativeEvent(this.realElement, 'click');
        },
        onFocus: function() {
            if (!this.pressedFlag || !this.focusedFlag) {
                this.fakeElement.addClass(this.options.focusClass);
                this.realElement.on('blur', this.onBlur);
                this.focusedFlag = true;
            }
        },
        onBlur: function() {
            if (!this.pressedFlag) {
                this.fakeElement.removeClass(this.options.focusClass);
                this.realElement.off('blur', this.onBlur);
                this.focusedFlag = false;
            }
        },
        refresh: function() {
            this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(':disabled'));
            this.list.refresh();
        },
        destroy: function() {
            this.list.destroy();
            this.realElement.insertBefore(this.fakeElement).removeClass(this.options.hiddenClass);
            this.fakeElement.remove();
        }
    });
    function SelectList(options) {
        this.options = $.extend({
            holder: null,
            maxVisibleItems: 10,
            selectOnClick: true,
            useHoverClass: false,
            useCustomScroll: false,
            handleResize: true,
            multipleSelectWithoutKey: false,
            alwaysPreventMouseWheel: false,
            indexAttribute: 'data-index',
            cloneClassPrefix: 'jcf-option-',
            containerStructure: '<span class="jcf-list"><span class="jcf-list-content"></span></span>',
            containerSelector: '.jcf-list-content',
            captionClass: 'jcf-optgroup-caption',
            disabledClass: 'jcf-disabled',
            optionClass: 'jcf-option',
            groupClass: 'jcf-optgroup',
            hoverClass: 'jcf-hover',
            selectedClass: 'jcf-selected',
            scrollClass: 'jcf-scroll-active'
        }, options);
        this.init();
    }
    $.extend(SelectList.prototype, {
        init: function() {
            this.initStructure();
            this.refreshSelectedClass();
            this.attachEvents();
        },
        initStructure: function() {
            this.element = $(this.options.element);
            this.indexSelector = '[' + this.options.indexAttribute + ']';
            this.container = $(this.options.containerStructure).appendTo(this.options.holder);
            this.listHolder = this.container.find(this.options.containerSelector);
            this.lastClickedIndex = this.element.prop('selectedIndex');
            this.rebuildList();
        },
        attachEvents: function() {
            this.bindHandlers();
            this.listHolder.on('jcf-pointerdown', this.indexSelector, this.onItemPress);
            this.listHolder.on('jcf-pointerdown', this.onPress);
            if (this.options.useHoverClass) {
                this.listHolder.on('jcf-pointerover', this.indexSelector, this.onHoverItem);
            }
        },
        onPress: function(e) {
            $(this).trigger('press', e);
            this.listHolder.on('jcf-pointerup', this.onRelease);
        },
        onRelease: function(e) {
            $(this).trigger('release', e);
            this.listHolder.off('jcf-pointerup', this.onRelease);
        },
        onHoverItem: function(e) {
            var hoverIndex = parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute));
            this.fakeOptions.removeClass(this.options.hoverClass).eq(hoverIndex).addClass(this.options.hoverClass);
        },
        onItemPress: function(e) {
            if (e.pointerType === 'touch' || this.options.selectOnClick) {
                this.tmpListOffsetTop = this.list.offset().top;
                this.listHolder.on('jcf-pointerup', this.indexSelector, this.onItemRelease);
            } else {
                this.onSelectItem(e);
            }
        },
        onItemRelease: function(e) {
            this.listHolder.off('jcf-pointerup', this.indexSelector, this.onItemRelease);
            if (this.tmpListOffsetTop === this.list.offset().top) {
                this.listHolder.on('click', this.indexSelector, {
                    savedPointerType: e.pointerType
                }, this.onSelectItem);
            }
            delete this.tmpListOffsetTop;
        },
        onSelectItem: function(e) {
            var clickedIndex = parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute)), pointerType = e.data && e.data.savedPointerType || e.pointerType || 'mouse', range;
            this.listHolder.off('click', this.indexSelector, this.onSelectItem);
            if (e.button > 1 || this.realOptions[clickedIndex].disabled) {
                return;
            }
            if (this.element.prop('multiple')) {
                if (e.metaKey || e.ctrlKey || pointerType === 'touch' || this.options.multipleSelectWithoutKey) {
                    this.realOptions[clickedIndex].selected = !this.realOptions[clickedIndex].selected;
                } else if (e.shiftKey) {
                    range = [this.lastClickedIndex, clickedIndex].sort(function(a, b) {
                        return a - b;
                    });
                    this.realOptions.each(function(index, option) {
                        option.selected = (index >= range[0] && index <= range[1]);
                    });
                } else {
                    this.element.prop('selectedIndex', clickedIndex);
                }
            } else {
                this.element.prop('selectedIndex', clickedIndex);
            }
            if (!e.shiftKey) {
                this.lastClickedIndex = clickedIndex;
            }
            this.refreshSelectedClass();
            if (pointerType === 'mouse') {
                this.scrollToActiveOption();
            }
            $(this).trigger('select');
        },
        rebuildList: function() {
            var self = this
                , rootElement = this.element[0];
            this.storedSelectHTML = rootElement.innerHTML;
            this.optionIndex = 0;
            this.list = $(this.createOptionsList(rootElement));
            this.listHolder.empty().append(this.list);
            this.realOptions = this.element.find('option');
            this.fakeOptions = this.list.find(this.indexSelector);
            this.fakeListItems = this.list.find('.' + this.options.captionClass + ',' + this.indexSelector);
            delete this.optionIndex;
            var maxCount = this.options.maxVisibleItems
                , sizeValue = this.element.prop('size');
            if (sizeValue > 1 && !this.element.is('[jcf-size]')) {
                maxCount = sizeValue;
            }
            var needScrollBar = this.fakeOptions.length > maxCount;
            this.container.toggleClass(this.options.scrollClass, needScrollBar);
            if (needScrollBar) {
                this.listHolder.css({
                    maxHeight: this.getOverflowHeight(maxCount),
                    overflow: 'auto'
                });
                if (this.options.useCustomScroll && jcf.modules.Scrollable) {
                    jcf.replace(this.listHolder, 'Scrollable', {
                        handleResize: this.options.handleResize,
                        alwaysPreventMouseWheel: this.options.alwaysPreventMouseWheel
                    });
                    return;
                }
            }
            if (this.options.alwaysPreventMouseWheel) {
                this.preventWheelHandler = function(e) {
                    var currentScrollTop = self.listHolder.scrollTop()
                        , maxScrollTop = self.listHolder.prop('scrollHeight') - self.listHolder.innerHeight();
                    if ((currentScrollTop <= 0 && e.deltaY < 0) || (currentScrollTop >= maxScrollTop && e.deltaY > 0)) {
                        e.preventDefault();
                    }
                }
                ;
                this.listHolder.on('jcf-mousewheel', this.preventWheelHandler);
            }
        },
        refreshSelectedClass: function() {
            var self = this, selectedItem, isMultiple = this.element.prop('multiple'), selectedIndex = this.element.prop('selectedIndex');
            if (isMultiple) {
                this.realOptions.each(function(index, option) {
                    self.fakeOptions.eq(index).toggleClass(self.options.selectedClass, !!option.selected);
                });
            } else {
                this.fakeOptions.removeClass(this.options.selectedClass + ' ' + this.options.hoverClass);
                selectedItem = this.fakeOptions.eq(selectedIndex).addClass(this.options.selectedClass);
                if (this.options.useHoverClass) {
                    selectedItem.addClass(this.options.hoverClass);
                }
            }
        },
        scrollToActiveOption: function() {
            var targetOffset = this.getActiveOptionOffset();
            if (typeof targetOffset === 'number') {
                this.listHolder.prop('scrollTop', targetOffset);
            }
        },
        getSelectedIndexRange: function() {
            var firstSelected = -1
                , lastSelected = -1;
            this.realOptions.each(function(index, option) {
                if (option.selected) {
                    if (firstSelected < 0) {
                        firstSelected = index;
                    }
                    lastSelected = index;
                }
            });
            return [firstSelected, lastSelected];
        },
        getChangedSelectedIndex: function() {
            var selectedIndex = this.element.prop('selectedIndex'), targetIndex;
            if (this.element.prop('multiple')) {
                if (!this.previousRange) {
                    this.previousRange = [selectedIndex, selectedIndex];
                }
                this.currentRange = this.getSelectedIndexRange();
                targetIndex = this.currentRange[this.currentRange[0] !== this.previousRange[0] ? 0 : 1];
                this.previousRange = this.currentRange;
                return targetIndex;
            } else {
                return selectedIndex;
            }
        },
        getActiveOptionOffset: function() {
            var dropHeight = this.listHolder.height()
                , dropScrollTop = this.listHolder.prop('scrollTop')
                , currentIndex = this.getChangedSelectedIndex()
                , fakeOption = this.fakeOptions.eq(currentIndex)
                , fakeOptionOffset = fakeOption.offset().top - this.list.offset().top
                , fakeOptionHeight = fakeOption.innerHeight();
            if (fakeOptionOffset + fakeOptionHeight >= dropScrollTop + dropHeight) {
                return fakeOptionOffset - dropHeight + fakeOptionHeight;
            } else if (fakeOptionOffset < dropScrollTop) {
                return fakeOptionOffset;
            }
        },
        getOverflowHeight: function(sizeValue) {
            var item = this.fakeListItems.eq(sizeValue - 1)
                , listOffset = this.list.offset().top
                , itemOffset = item.offset().top
                , itemHeight = item.innerHeight();
            return itemOffset + itemHeight - listOffset;
        },
        getScrollTop: function() {
            return this.listHolder.scrollTop();
        },
        setScrollTop: function(value) {
            this.listHolder.scrollTop(value);
        },
        createOption: function(option) {
            var newOption = document.createElement('span');
            newOption.className = this.options.optionClass;
            newOption.innerHTML = option.innerHTML;
            newOption.setAttribute(this.options.indexAttribute, this.optionIndex++);
            var optionImage, optionImageSrc = option.getAttribute('data-image');
            if (optionImageSrc) {
                optionImage = document.createElement('img');
                optionImage.src = optionImageSrc;
                newOption.insertBefore(optionImage, newOption.childNodes[0]);
            }
            if (option.disabled) {
                newOption.className += ' ' + this.options.disabledClass;
            }
            if (option.className) {
                newOption.className += ' ' + getPrefixedClasses(option.className, this.options.cloneClassPrefix);
            }
            return newOption;
        },
        createOptGroup: function(optgroup) {
            var optGroupContainer = document.createElement('span'), optGroupName = optgroup.getAttribute('label'), optGroupCaption, optGroupList;
            optGroupCaption = document.createElement('span');
            optGroupCaption.className = this.options.captionClass;
            optGroupCaption.innerHTML = optGroupName;
            optGroupContainer.appendChild(optGroupCaption);
            if (optgroup.children.length) {
                optGroupList = this.createOptionsList(optgroup);
                optGroupContainer.appendChild(optGroupList);
            }
            optGroupContainer.className = this.options.groupClass;
            return optGroupContainer;
        },
        createOptionContainer: function() {
            var optionContainer = document.createElement('li');
            return optionContainer;
        },
        createOptionsList: function(container) {
            var self = this
                , list = document.createElement('ul');
            $.each(container.children, function(index, currentNode) {
                var item = self.createOptionContainer(currentNode), newNode;
                switch (currentNode.tagName.toLowerCase()) {
                    case 'option':
                        newNode = self.createOption(currentNode);
                        break;
                    case 'optgroup':
                        newNode = self.createOptGroup(currentNode);
                        break;
                }
                list.appendChild(item).appendChild(newNode);
            });
            return list;
        },
        refresh: function() {
            if (this.storedSelectHTML !== this.element.prop('innerHTML')) {
                this.rebuildList();
            }
            var scrollInstance = jcf.getInstance(this.listHolder);
            if (scrollInstance) {
                scrollInstance.refresh();
            }
            this.refreshSelectedClass();
        },
        destroy: function() {
            this.listHolder.off('jcf-mousewheel', this.preventWheelHandler);
            this.listHolder.off('jcf-pointerdown', this.indexSelector, this.onSelectItem);
            this.listHolder.off('jcf-pointerover', this.indexSelector, this.onHoverItem);
            this.listHolder.off('jcf-pointerdown', this.onPress);
        }
    });
    var getPrefixedClasses = function(className, prefixToAdd) {
        return className ? className.replace(/[\s]*([\S]+)+[\s]*/gi, prefixToAdd + '$1 ') : '';
    };
    var makeUnselectable = (function() {
        var unselectableClass = jcf.getOptions().unselectableClass;
        function preventHandler(e) {
            e.preventDefault();
        }
        return function(node) {
            node.addClass(unselectableClass).on('selectstart', preventHandler);
        }
            ;
    }());
}(jQuery, this));
    /*!
* JavaScript Custom Forms : Radio Module
*
* Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
* Released under the MIT license (LICENSE.txt)
*
* Version: 1.1.3
*/
    ;(function($) {
    'use strict';
    jcf.addModule({
        name: 'Radio',
        selector: 'input[type="radio"]',
        options: {
            wrapNative: true,
            checkedClass: 'jcf-checked',
            uncheckedClass: 'jcf-unchecked',
            labelActiveClass: 'jcf-label-active',
            fakeStructure: '<span class="jcf-radio"><span></span></span>'
        },
        matchElement: function(element) {
            return element.is(':radio');
        },
        init: function() {
            this.initStructure();
            this.attachEvents();
            this.refresh();
        },
        initStructure: function() {
            this.doc = $(document);
            this.realElement = $(this.options.element);
            this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
            this.labelElement = this.getLabelFor();
            if (this.options.wrapNative) {
                this.realElement.prependTo(this.fakeElement).css({
                    position: 'absolute',
                    opacity: 0
                });
            } else {
                this.realElement.addClass(this.options.hiddenClass);
            }
        },
        attachEvents: function() {
            this.realElement.on({
                focus: this.onFocus,
                click: this.onRealClick
            });
            this.fakeElement.on('click', this.onFakeClick);
            this.fakeElement.on('jcf-pointerdown', this.onPress);
        },
        onRealClick: function(e) {
            var self = this;
            this.savedEventObject = e;
            setTimeout(function() {
                self.refreshRadioGroup();
            }, 0);
        },
        onFakeClick: function(e) {
            if (this.options.wrapNative && this.realElement.is(e.target)) {
                return;
            }
            if (!this.realElement.is(':disabled')) {
                delete this.savedEventObject;
                this.currentActiveRadio = this.getCurrentActiveRadio();
                this.stateChecked = this.realElement.prop('checked');
                this.realElement.prop('checked', true);
                this.fireNativeEvent(this.realElement, 'click');
                if (this.savedEventObject && this.savedEventObject.isDefaultPrevented()) {
                    this.realElement.prop('checked', this.stateChecked);
                    this.currentActiveRadio.prop('checked', true);
                } else {
                    this.fireNativeEvent(this.realElement, 'change');
                }
                delete this.savedEventObject;
            }
        },
        onFocus: function() {
            if (!this.pressedFlag || !this.focusedFlag) {
                this.focusedFlag = true;
                this.fakeElement.addClass(this.options.focusClass);
                this.realElement.on('blur', this.onBlur);
            }
        },
        onBlur: function() {
            if (!this.pressedFlag) {
                this.focusedFlag = false;
                this.fakeElement.removeClass(this.options.focusClass);
                this.realElement.off('blur', this.onBlur);
            }
        },
        onPress: function(e) {
            if (!this.focusedFlag && e.pointerType === 'mouse') {
                this.realElement.focus();
            }
            this.pressedFlag = true;
            this.fakeElement.addClass(this.options.pressedClass);
            this.doc.on('jcf-pointerup', this.onRelease);
        },
        onRelease: function(e) {
            if (this.focusedFlag && e.pointerType === 'mouse') {
                this.realElement.focus();
            }
            this.pressedFlag = false;
            this.fakeElement.removeClass(this.options.pressedClass);
            this.doc.off('jcf-pointerup', this.onRelease);
        },
        getCurrentActiveRadio: function() {
            return this.getRadioGroup(this.realElement).filter(':checked');
        },
        getRadioGroup: function(radio) {
            var name = radio.attr('name')
                , parentForm = radio.parents('form');
            if (name) {
                if (parentForm.length) {
                    return parentForm.find('input[name="' + name + '"]');
                } else {
                    return $('input[name="' + name + '"]:not(form input)');
                }
            } else {
                return radio;
            }
        },
        getLabelFor: function() {
            var parentLabel = this.realElement.closest('label')
                , elementId = this.realElement.prop('id');
            if (!parentLabel.length && elementId) {
                parentLabel = $('label[for="' + elementId + '"]');
            }
            return parentLabel.length ? parentLabel : null;
        },
        refreshRadioGroup: function() {
            this.getRadioGroup(this.realElement).each(function() {
                jcf.refresh(this);
            });
        },
        refresh: function() {
            var isChecked = this.realElement.is(':checked')
                , isDisabled = this.realElement.is(':disabled');
            this.fakeElement.toggleClass(this.options.checkedClass, isChecked).toggleClass(this.options.uncheckedClass, !isChecked).toggleClass(this.options.disabledClass, isDisabled);
            if (this.labelElement) {
                this.labelElement.toggleClass(this.options.labelActiveClass, isChecked);
            }
        },
        destroy: function() {
            if (this.options.wrapNative) {
                this.realElement.insertBefore(this.fakeElement).css({
                    position: '',
                    width: '',
                    height: '',
                    opacity: '',
                    margin: ''
                });
            } else {
                this.realElement.removeClass(this.options.hiddenClass);
            }
            this.fakeElement.off('jcf-pointerdown', this.onPress);
            this.fakeElement.remove();
            this.doc.off('jcf-pointerup', this.onRelease);
            this.realElement.off({
                blur: this.onBlur,
                focus: this.onFocus,
                click: this.onRealClick
            });
        }
    });
}(jQuery));
    /*! Picturefill - v3.0.1 - 2015-09-30
* http://scottjehl.github.io/picturefill
* Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
*/
    !function(a) {
        var b = navigator.userAgent;
        a.HTMLPictureElement && /ecko/.test(b) && b.match(/rv\:(\d+)/) && RegExp.$1 < 41 && addEventListener("resize", function() {
            var b, c = document.createElement("source"), d = function(a) {
                var b, d, e = a.parentNode;
                "PICTURE" === e.nodeName.toUpperCase() ? (b = c.cloneNode(),
                    e.insertBefore(b, e.firstElementChild),
                    setTimeout(function() {
                        e.removeChild(b)
                    })) : (!a._pfLastSize || a.offsetWidth > a._pfLastSize) && (a._pfLastSize = a.offsetWidth,
                    d = a.sizes,
                    a.sizes += ",100vw",
                    setTimeout(function() {
                        a.sizes = d
                    }))
            }, e = function() {
                var a, b = document.querySelectorAll("picture > img, img[srcset][sizes]");
                for (a = 0; a < b.length; a++)
                    d(b[a])
            }, f = function() {
                clearTimeout(b),
                    b = setTimeout(e, 99)
            }, g = a.matchMedia && matchMedia("(orientation: landscape)"), h = function() {
                f(),
                g && g.addListener && g.addListener(f)
            };
            return c.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                /^[c|i]|d$/.test(document.readyState || "") ? h() : document.addEventListener("DOMContentLoaded", h),
                f
        }())
    }(window),
        function(a, b, c) {
            "use strict";
            function d(a) {
                return " " === a || "	" === a || "\n" === a || "\f" === a || "\r" === a
            }
            function e(b, c) {
                var d = new a.Image;
                return d.onerror = function() {
                    z[b] = !1,
                        aa()
                }
                    ,
                    d.onload = function() {
                        z[b] = 1 === d.width,
                            aa()
                    }
                    ,
                    d.src = c,
                    "pending"
            }
            function f() {
                L = !1,
                    O = a.devicePixelRatio,
                    M = {},
                    N = {},
                    s.DPR = O || 1,
                    P.width = Math.max(a.innerWidth || 0, y.clientWidth),
                    P.height = Math.max(a.innerHeight || 0, y.clientHeight),
                    P.vw = P.width / 100,
                    P.vh = P.height / 100,
                    r = [P.height, P.width, O].join("-"),
                    P.em = s.getEmValue(),
                    P.rem = P.em
            }
            function g(a, b, c, d) {
                var e, f, g, h;
                return "saveData" === A.algorithm ? a > 2.7 ? h = c + 1 : (f = b - c,
                    e = Math.pow(a - .6, 1.5),
                    g = f * e,
                d && (g += .1 * e),
                    h = a + g) : h = c > 1 ? Math.sqrt(a * b) : a,
                h > c
            }
            function h(a) {
                var b, c = s.getSet(a), d = !1;
                "pending" !== c && (d = r,
                c && (b = s.setRes(c),
                    s.applySetCandidate(b, a))),
                    a[s.ns].evaled = d
            }
            function i(a, b) {
                return a.res - b.res
            }
            function j(a, b, c) {
                var d;
                return !c && b && (c = a[s.ns].sets,
                    c = c && c[c.length - 1]),
                    d = k(b, c),
                d && (b = s.makeUrl(b),
                    a[s.ns].curSrc = b,
                    a[s.ns].curCan = d,
                d.res || _(d, d.set.sizes)),
                    d
            }
            function k(a, b) {
                var c, d, e;
                if (a && b)
                    for (e = s.parseSet(b),
                             a = s.makeUrl(a),
                             c = 0; c < e.length; c++)
                        if (a === s.makeUrl(e[c].url)) {
                            d = e[c];
                            break
                        }
                return d
            }
            function l(a, b) {
                var c, d, e, f, g = a.getElementsByTagName("source");
                for (c = 0,
                         d = g.length; d > c; c++)
                    e = g[c],
                        e[s.ns] = !0,
                        f = e.getAttribute("srcset"),
                    f && b.push({
                        srcset: f,
                        media: e.getAttribute("media"),
                        type: e.getAttribute("type"),
                        sizes: e.getAttribute("sizes")
                    })
            }
            function m(a, b) {
                function c(b) {
                    var c, d = b.exec(a.substring(m));
                    return d ? (c = d[0],
                        m += c.length,
                        c) : void 0
                }
                function e() {
                    var a, c, d, e, f, i, j, k, l, m = !1, o = {};
                    for (e = 0; e < h.length; e++)
                        f = h[e],
                            i = f[f.length - 1],
                            j = f.substring(0, f.length - 1),
                            k = parseInt(j, 10),
                            l = parseFloat(j),
                            W.test(j) && "w" === i ? ((a || c) && (m = !0),
                                0 === k ? m = !0 : a = k) : X.test(j) && "x" === i ? ((a || c || d) && (m = !0),
                                0 > l ? m = !0 : c = l) : W.test(j) && "h" === i ? ((d || c) && (m = !0),
                                0 === k ? m = !0 : d = k) : m = !0;
                    m || (o.url = g,
                    a && (o.w = a),
                    c && (o.d = c),
                    d && (o.h = d),
                    d || c || a || (o.d = 1),
                    1 === o.d && (b.has1x = !0),
                        o.set = b,
                        n.push(o))
                }
                function f() {
                    for (c(S),
                             i = "",
                             j = "in descriptor"; ; ) {
                        if (k = a.charAt(m),
                        "in descriptor" === j)
                            if (d(k))
                                i && (h.push(i),
                                    i = "",
                                    j = "after descriptor");
                            else {
                                if ("," === k)
                                    return m += 1,
                                    i && h.push(i),
                                        void e();
                                if ("(" === k)
                                    i += k,
                                        j = "in parens";
                                else {
                                    if ("" === k)
                                        return i && h.push(i),
                                            void e();
                                    i += k
                                }
                            }
                        else if ("in parens" === j)
                            if (")" === k)
                                i += k,
                                    j = "in descriptor";
                            else {
                                if ("" === k)
                                    return h.push(i),
                                        void e();
                                i += k
                            }
                        else if ("after descriptor" === j)
                            if (d(k))
                                ;
                            else {
                                if ("" === k)
                                    return void e();
                                j = "in descriptor",
                                    m -= 1
                            }
                        m += 1
                    }
                }
                for (var g, h, i, j, k, l = a.length, m = 0, n = []; ; ) {
                    if (c(T),
                    m >= l)
                        return n;
                    g = c(U),
                        h = [],
                        "," === g.slice(-1) ? (g = g.replace(V, ""),
                            e()) : f()
                }
            }
            function n(a) {
                function b(a) {
                    function b() {
                        f && (g.push(f),
                            f = "")
                    }
                    function c() {
                        g[0] && (h.push(g),
                            g = [])
                    }
                    for (var e, f = "", g = [], h = [], i = 0, j = 0, k = !1; ; ) {
                        if (e = a.charAt(j),
                        "" === e)
                            return b(),
                                c(),
                                h;
                        if (k) {
                            if ("*" === e && "/" === a[j + 1]) {
                                k = !1,
                                    j += 2,
                                    b();
                                continue
                            }
                            j += 1
                        } else {
                            if (d(e)) {
                                if (a.charAt(j - 1) && d(a.charAt(j - 1)) || !f) {
                                    j += 1;
                                    continue
                                }
                                if (0 === i) {
                                    b(),
                                        j += 1;
                                    continue
                                }
                                e = " "
                            } else if ("(" === e)
                                i += 1;
                            else if (")" === e)
                                i -= 1;
                            else {
                                if ("," === e) {
                                    b(),
                                        c(),
                                        j += 1;
                                    continue
                                }
                                if ("/" === e && "*" === a.charAt(j + 1)) {
                                    k = !0,
                                        j += 2;
                                    continue
                                }
                            }
                            f += e,
                                j += 1
                        }
                    }
                }
                function c(a) {
                    return k.test(a) && parseFloat(a) >= 0 ? !0 : l.test(a) ? !0 : "0" === a || "-0" === a || "+0" === a ? !0 : !1
                }
                var e, f, g, h, i, j, k = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i, l = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;
                for (f = b(a),
                         g = f.length,
                         e = 0; g > e; e++)
                    if (h = f[e],
                        i = h[h.length - 1],
                        c(i)) {
                        if (j = i,
                            h.pop(),
                        0 === h.length)
                            return j;
                        if (h = h.join(" "),
                            s.matchesMedia(h))
                            return j
                    }
                return "100vw"
            }
            b.createElement("picture");
            var o, p, q, r, s = {}, t = function() {}, u = b.createElement("img"), v = u.getAttribute, w = u.setAttribute, x = u.removeAttribute, y = b.documentElement, z = {}, A = {
                algorithm: ""
            }, B = "data-pfsrc", C = B + "set", D = navigator.userAgent, E = /rident/.test(D) || /ecko/.test(D) && D.match(/rv\:(\d+)/) && RegExp.$1 > 35, F = "currentSrc", G = /\s+\+?\d+(e\d+)?w/, H = /(\([^)]+\))?\s*(.+)/, I = a.picturefillCFG, J = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)", K = "font-size:100%!important;", L = !0, M = {}, N = {}, O = a.devicePixelRatio, P = {
                px: 1,
                "in": 96
            }, Q = b.createElement("a"), R = !1, S = /^[ \t\n\r\u000c]+/, T = /^[, \t\n\r\u000c]+/, U = /^[^ \t\n\r\u000c]+/, V = /[,]+$/, W = /^\d+$/, X = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/, Y = function(a, b, c, d) {
                a.addEventListener ? a.addEventListener(b, c, d || !1) : a.attachEvent && a.attachEvent("on" + b, c)
            }, Z = function(a) {
                var b = {};
                return function(c) {
                    return c in b || (b[c] = a(c)),
                        b[c]
                }
            }, $ = function() {
                var a = /^([\d\.]+)(em|vw|px)$/
                    , b = function() {
                    for (var a = arguments, b = 0, c = a[0]; ++b in a; )
                        c = c.replace(a[b], a[++b]);
                    return c
                }
                    , c = Z(function(a) {
                    return "return " + b((a || "").toLowerCase(), /\band\b/g, "&&", /,/g, "||", /min-([a-z-\s]+):/g, "e.$1>=", /max-([a-z-\s]+):/g, "e.$1<=", /calc([^)]+)/g, "($1)", /(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)", /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi, "") + ";"
                });
                return function(b, d) {
                    var e;
                    if (!(b in M))
                        if (M[b] = !1,
                        d && (e = b.match(a)))
                            M[b] = e[1] * P[e[2]];
                        else
                            try {
                                M[b] = new Function("e",c(b))(P)
                            } catch (f) {}
                    return M[b]
                }
            }(), _ = function(a, b) {
                return a.w ? (a.cWidth = s.calcListLength(b || "100vw"),
                    a.res = a.w / a.cWidth) : a.res = a.d,
                    a
            }, aa = function(a) {
                var c, d, e, f = a || {};
                if (f.elements && 1 === f.elements.nodeType && ("IMG" === f.elements.nodeName.toUpperCase() ? f.elements = [f.elements] : (f.context = f.elements,
                    f.elements = null)),
                    c = f.elements || s.qsa(f.context || b, f.reevaluate || f.reselect ? s.sel : s.selShort),
                    e = c.length) {
                    for (s.setupRun(f),
                             R = !0,
                             d = 0; e > d; d++)
                        s.fillImg(c[d], f);
                    s.teardownRun(f)
                }
            };
            o = a.console && console.warn ? function(a) {
                    console.warn(a)
                }
                : t,
            F in u || (F = "src"),
                z["image/jpeg"] = !0,
                z["image/gif"] = !0,
                z["image/png"] = !0,
                z["image/svg+xml"] = b.implementation.hasFeature("https://web.archive.org/web/20190317004914/http://wwwindow.w3.org/TR/SVG11/feature#Image", "1.1"),
                s.ns = ("pf" + (new Date).getTime()).substr(0, 9),
                s.supSrcset = "srcset"in u,
                s.supSizes = "sizes"in u,
                s.supPicture = !!a.HTMLPictureElement,
            s.supSrcset && s.supPicture && !s.supSizes && !function(a) {
                u.srcset = "data:,a",
                    a.src = "data:,a",
                    s.supSrcset = u.complete === a.complete,
                    s.supPicture = s.supSrcset && s.supPicture
            }(b.createElement("img")),
                s.selShort = "picture>img,img[srcset]",
                s.sel = s.selShort,
                s.cfg = A,
            s.supSrcset && (s.sel += ",img[" + C + "]"),
                s.DPR = O || 1,
                s.u = P,
                s.types = z,
                q = s.supSrcset && !s.supSizes,
                s.setSize = t,
                s.makeUrl = Z(function(a) {
                    return Q.href = a,
                        Q.href
                }),
                s.qsa = function(a, b) {
                    return a.querySelectorAll(b)
                }
                ,
                s.matchesMedia = function() {
                    return a.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches ? s.matchesMedia = function(a) {
                            return !a || matchMedia(a).matches
                        }
                        : s.matchesMedia = s.mMQ,
                        s.matchesMedia.apply(this, arguments)
                }
                ,
                s.mMQ = function(a) {
                    return a ? $(a) : !0
                }
                ,
                s.calcLength = function(a) {
                    var b = $(a, !0) || !1;
                    return 0 > b && (b = !1),
                        b
                }
                ,
                s.supportsType = function(a) {
                    return a ? z[a] : !0
                }
                ,
                s.parseSize = Z(function(a) {
                    var b = (a || "").match(H);
                    return {
                        media: b && b[1],
                        length: b && b[2]
                    }
                }),
                s.parseSet = function(a) {
                    return a.cands || (a.cands = m(a.srcset, a)),
                        a.cands
                }
                ,
                s.getEmValue = function() {
                    var a;
                    if (!p && (a = b.body)) {
                        var c = b.createElement("div")
                            , d = y.style.cssText
                            , e = a.style.cssText;
                        c.style.cssText = J,
                            y.style.cssText = K,
                            a.style.cssText = K,
                            a.appendChild(c),
                            p = c.offsetWidth,
                            a.removeChild(c),
                            p = parseFloat(p, 10),
                            y.style.cssText = d,
                            a.style.cssText = e
                    }
                    return p || 16
                }
                ,
                s.calcListLength = function(a) {
                    if (!(a in N) || A.uT) {
                        var b = s.calcLength(n(a));
                        N[a] = b ? b : P.width
                    }
                    return N[a]
                }
                ,
                s.setRes = function(a) {
                    var b;
                    if (a) {
                        b = s.parseSet(a);
                        for (var c = 0, d = b.length; d > c; c++)
                            _(b[c], a.sizes)
                    }
                    return b
                }
                ,
                s.setRes.res = _,
                s.applySetCandidate = function(a, b) {
                    if (a.length) {
                        var c, d, e, f, h, k, l, m, n, o = b[s.ns], p = s.DPR;
                        if (k = o.curSrc || b[F],
                            l = o.curCan || j(b, k, a[0].set),
                        l && l.set === a[0].set && (n = E && !b.complete && l.res - .1 > p,
                        n || (l.cached = !0,
                        l.res >= p && (h = l))),
                            !h)
                            for (a.sort(i),
                                     f = a.length,
                                     h = a[f - 1],
                                     d = 0; f > d; d++)
                                if (c = a[d],
                                c.res >= p) {
                                    e = d - 1,
                                        h = a[e] && (n || k !== s.makeUrl(c.url)) && g(a[e].res, c.res, p, a[e].cached) ? a[e] : c;
                                    break
                                }
                        h && (m = s.makeUrl(h.url),
                            o.curSrc = m,
                            o.curCan = h,
                        m !== k && s.setSrc(b, h),
                            s.setSize(b))
                    }
                }
                ,
                s.setSrc = function(a, b) {
                    var c;
                    a.src = b.url,
                    "image/svg+xml" === b.set.type && (c = a.style.width,
                        a.style.width = a.offsetWidth + 1 + "px",
                    a.offsetWidth + 1 && (a.style.width = c))
                }
                ,
                s.getSet = function(a) {
                    var b, c, d, e = !1, f = a[s.ns].sets;
                    for (b = 0; b < f.length && !e; b++)
                        if (c = f[b],
                        c.srcset && s.matchesMedia(c.media) && (d = s.supportsType(c.type))) {
                            "pending" === d && (c = d),
                                e = c;
                            break
                        }
                    return e
                }
                ,
                s.parseSets = function(a, b, d) {
                    var e, f, g, h, i = b && "PICTURE" === b.nodeName.toUpperCase(), j = a[s.ns];
                    (j.src === c || d.src) && (j.src = v.call(a, "src"),
                        j.src ? w.call(a, B, j.src) : x.call(a, B)),
                    (j.srcset === c || d.srcset || !s.supSrcset || a.srcset) && (e = v.call(a, "srcset"),
                        j.srcset = e,
                        h = !0),
                        j.sets = [],
                    i && (j.pic = !0,
                        l(b, j.sets)),
                        j.srcset ? (f = {
                            srcset: j.srcset,
                            sizes: v.call(a, "sizes")
                        },
                            j.sets.push(f),
                            g = (q || j.src) && G.test(j.srcset || ""),
                        g || !j.src || k(j.src, f) || f.has1x || (f.srcset += ", " + j.src,
                            f.cands.push({
                                url: j.src,
                                d: 1,
                                set: f
                            }))) : j.src && j.sets.push({
                            srcset: j.src,
                            sizes: null
                        }),
                        j.curCan = null,
                        j.curSrc = c,
                        j.supported = !(i || f && !s.supSrcset || g),
                    h && s.supSrcset && !j.supported && (e ? (w.call(a, C, e),
                        a.srcset = "") : x.call(a, C)),
                    j.supported && !j.srcset && (!j.src && a.src || a.src !== s.makeUrl(j.src)) && (null === j.src ? a.removeAttribute("src") : a.src = j.src),
                        j.parsed = !0
                }
                ,
                s.fillImg = function(a, b) {
                    var c, d = b.reselect || b.reevaluate;
                    a[s.ns] || (a[s.ns] = {}),
                        c = a[s.ns],
                    (d || c.evaled !== r) && ((!c.parsed || b.reevaluate) && s.parseSets(a, a.parentNode, b),
                        c.supported ? c.evaled = r : h(a))
                }
                ,
                s.setupRun = function() {
                    (!R || L || O !== a.devicePixelRatio) && f()
                }
                ,
                s.supPicture ? (aa = t,
                    s.fillImg = t) : !function() {
                    var c, d = a.attachEvent ? /d$|^c/ : /d$|^c|^i/, e = function() {
                        var a = b.readyState || "";
                        f = setTimeout(e, "loading" === a ? 200 : 999),
                        b.body && (s.fillImgs(),
                            c = c || d.test(a),
                        c && clearTimeout(f))
                    }, f = setTimeout(e, b.body ? 9 : 99), g = function(a, b) {
                        var c, d, e = function() {
                            var f = new Date - d;
                            b > f ? c = setTimeout(e, b - f) : (c = null,
                                a())
                        };
                        return function() {
                            d = new Date,
                            c || (c = setTimeout(e, b))
                        }
                    }, h = y.clientHeight, i = function() {
                        L = Math.max(a.innerWidth || 0, y.clientWidth) !== P.width || y.clientHeight !== h,
                            h = y.clientHeight,
                        L && s.fillImgs()
                    };
                    Y(a, "resize", g(i, 99)),
                        Y(b, "readystatechange", e)
                }(),
                s.picturefill = aa,
                s.fillImgs = aa,
                s.teardownRun = t,
                aa._ = s,
                a.picturefillCFG = {
                    pf: s,
                    push: function(a) {
                        var b = a.shift();
                        "function" == typeof s[b] ? s[b].apply(s, a) : (A[b] = a[0],
                        R && s.fillImgs({
                            reselect: !0
                        }))
                    }
                };
            for (; I && I.length; )
                a.picturefillCFG.push(I.shift());
            a.picturefill = aa,
                "object" == typeof module && "object" == typeof module.exports ? module.exports = aa : "function" == typeof define && define.amd && define("picturefill", function() {
                    return aa
                }),
            s.supPicture || (z["image/webp"] = e("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))
        }(window, document);
    ;(function($) {
    'use strict';
    var styleRules = {};
    var templates = {
        '2x': ['(-webkit-min-device-pixel-ratio: 1.5)', '(min-resolution: 192dpi)', '(min-device-pixel-ratio: 1.5)', '(min-resolution: 1.5dppx)'],
        '3x': ['(-webkit-min-device-pixel-ratio: 3)', '(min-resolution: 384dpi)', '(min-device-pixel-ratio: 3)', '(min-resolution: 3dppx)']
    };
    function addSimple(imageSrc, media, id) {
        var style = buildRule(id, imageSrc);
        addRule(media, style);
    }
    function addRetina(imageData, media, id) {
        var currentRules = templates[imageData[1]].slice();
        var patchedRules = currentRules;
        var style = buildRule(id, imageData[0]);
        if (media !== 'default') {
            patchedRules = $.map(currentRules, function(ele, i) {
                return ele + ' and ' + media;
            });
        }
        media = patchedRules.join(',');
        addRule(media, style);
    }
    function buildRule(id, src) {
        return '#' + id + '{background-image: url("' + src + '");}';
    }
    function addRule(media, rule) {
        var $styleTag = styleRules[media];
        var styleTagData;
        var rules = '';
        if (media === 'default') {
            rules = rule + ' ';
        } else {
            rules = '@media ' + media + '{' + rule + '}';
        }
        if (!$styleTag) {
            styleRules[media] = $('<style>').text(rules).appendTo('head');
        } else {
            styleTagData = $styleTag.text();
            styleTagData = styleTagData.substring(0, styleTagData.length - 2) + ' }' + rule + '}';
            $styleTag.text(styleTagData);
        }
    }
    $.fn.retinaCover = function() {
        return this.each(function() {
            var $block = $(this);
            var $items = $block.children('[data-srcset]');
            var id = 'bg-stretch' + Date.now() + (Math.random() * 1000).toFixed(0);
            if ($items.length) {
                $block.attr('id', id);
                $items.each(function() {
                    var $item = $(this);
                    var data = $item.data('srcset').split(', ');
                    var media = $item.data('media') || 'default';
                    var dataLength = data.length;
                    var itemData;
                    var i;
                    for (i = 0; i < dataLength; i++) {
                        itemData = data[i].split(' ');
                        if (itemData.length === 1) {
                            addSimple(itemData[0], media, id);
                        } else {
                            addRetina(itemData, media, id);
                        }
                    }
                });
            }
            $items.detach();
        });
    }
    ;
}(jQuery));
    Hash = {
        init: function() {
            this._handlers = [];
            this.initChangeHandler();
            return this;
        },
        hashChangeSupported: (function() {
                return 'onhashchange'in window && (document.documentMode === undefined || document.documentMode > 7);
            }
        )(),
        initChangeHandler: function() {
            var needFrame = /(MSIE 6|MSIE 7)/.test(navigator.userAgent);
            var delay = 200, instance = this, oldHash, newHash, frameHash;
            frameHash = oldHash = newHash = location.hash;
            if (needFrame) {
                this.fixFrame = document.createElement('iframe');
                this.fixFrame.style.display = 'none';
                document.documentElement.insertBefore(this.fixFrame, document.documentElement.childNodes[0]);
                this.fixFrame.contentWindow.document.open();
                this.fixFrame.contentWindow.document.close();
                this.fixFrame.contentWindow.location.hash = oldHash;
            }
            if (this.hashChangeSupported) {
                function changeHandler() {
                    newHash = location.hash;
                    instance.makeCallbacks(newHash, oldHash);
                    oldHash = newHash;
                }
                if (window.addEventListener)
                    window.addEventListener('hashchange', changeHandler, false);
                else if (window.attachEvent)
                    window.attachEvent('onhashchange', changeHandler);
            } else {
                setInterval(function() {
                    newHash = location.hash;
                    frameHash = needFrame ? instance.fixFrame.contentWindow.location.hash : null;
                    if (needFrame && newHash.length && newHash !== frameHash && frameHash.length) {
                        location.hash = frameHash;
                    }
                    if (oldHash != newHash) {
                        instance.makeCallbacks(newHash, oldHash);
                        oldHash = newHash;
                    }
                }, delay);
            }
        },
        makeCallbacks: function() {
            for (var i = 0; i < this._handlers.length; i++) {
                this._handlers[i].apply(this, arguments);
            }
        },
        get: function() {
            return location.hash.substr(1);
        },
        set: function(text) {
            if (this.get() != text) {
                location.hash = text;
                if (this.fixFrame) {
                    this.fixFrame.contentWindow.document.open();
                    this.fixFrame.contentWindow.document.close();
                    this.fixFrame.contentWindow.document.location.hash = text;
                }
            }
        },
        clear: function() {
            this.set('');
        },
        onChange: function(handler) {
            this._handlers.push(handler);
        }
    }.init();
    Hash.key = {
        parseItems: function() {
            var items = {}
                , hashString = Hash.get();
            if (hashString.length > 1) {
                var hashData = hashString.split('&');
                if (hashData.length) {
                    for (var i = 0; i < hashData.length; i++) {
                        var curData = hashData[i].split('=');
                        if (typeof curData[1] === 'string') {
                            items[curData[0]] = curData[1];
                        }
                    }
                }
            }
            return items;
        },
        rebuildHash: function(obj) {
            var s = '';
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    s += p + '=' + obj[p] + '&';
                }
            }
            s = s.substring(0, s.length - 1);
            Hash.set(s);
        },
        get: function(key) {
            var obj = this.parseItems();
            return obj[key];
        },
        set: function(key, value) {
            var curItems = this.parseItems();
            curItems[key] = value;
            this.rebuildHash(curItems)
        },
        remove: function() {
            var curItems = this.parseItems();
            for (var i = 0; i < arguments.length; i++) {
                delete curItems[arguments[i]];
            }
            this.rebuildHash(curItems);
        }
    }
    jQuery.fn.ajaxTabs = function(opt) {
        var opt = jQuery.extend({
            loadingClass: 'ajax-loading',
            activeClass: 'active',
            addToParent: false,
            tabLinks: 'a.tab',
            tabHolder: 'div.ajax-hold',
            minDelay: 500,
            animSpeed: 0,
            onTabLoad: null,
            event: 'click'
        }, opt);
        return this.each(function() {
            var holder = jQuery(this);
            var tabLinks = jQuery(opt.tabLinks, holder);
            var tabHolder = jQuery(opt.tabHolder, holder);
            var tabset = (opt.addToParent ? tabLinks.parent() : tabLinks);
            var ajaxBusy, fakeTimer, timerState;
            if (typeof opt.onBeforeInit === 'function') {
                opt.onBeforeInit(tabLinks, tabset, opt);
            }
            tabLinks.each(function() {
                var tmpLink = jQuery(this);
                var classItem = (opt.addToParent ? tmpLink.parent() : tmpLink);
                if (classItem.hasClass(opt.activeClass))
                    switchTab(tmpLink);
            });
            function switchTab(lnk) {
                if (!ajaxBusy) {
                    var tabSrc = jQuery(lnk).attr('href');
                    var loadedTab = tabHolder.children('[rel="' + tabSrc + '"]');
                    var activeTab = tabHolder.children('.' + opt.activeClass);
                    if (loadedTab.length) {
                        if (!loadedTab.hasClass(opt.activeClass)) {
                            changeTabs(activeTab, loadedTab, lnk);
                        }
                    } else {
                        if (activeTab.length) {
                            activeTab.fadeOut(opt.animSpeed);
                        }
                        ajaxBusy = true;
                        holder.addClass(opt.loadingClass);
                        jQuery.ajax({
                            url: tabSrc,
                            type: 'get',
                            dataType: 'text',
                            success: function(msg) {
                                loadedTab = $('<div>', {
                                    'class': 'tab-block',
                                    rel: tabSrc,
                                    html: msg
                                }).hide().appendTo(tabHolder);
                                if (timerState < 0) {
                                    showLoadedTab();
                                }
                            },
                            error: function() {}
                        });
                        timerState = 0;
                        clearTimeout(fakeTimer);
                        fakeTimer = setTimeout(function() {
                            if (loadedTab && loadedTab.length) {
                                timerState = 1;
                                showLoadedTab();
                            } else {
                                timerState = -1;
                            }
                        }, opt.minDelay)
                    }
                    function showLoadedTab() {
                        ajaxBusy = false;
                        holder.removeClass(opt.loadingClass);
                        changeTabs(activeTab, loadedTab, lnk);
                        if (typeof opt.onTabLoad === 'function') {
                            opt.onTabLoad(loadedTab);
                        }
                    }
                }
            }
            function changeTabs(prev, current, tablink) {
                if (prev && prev.length)
                    prev.removeClass(opt.activeClass).fadeOut(opt.animSpeed);
                if (current && current.length) {
                    setTimeout(function() {
                        current.addClass(opt.activeClass).css({
                            display: 'none'
                        }).fadeIn(opt.animSpeed);
                        if (typeof opt.onChange === 'function') {
                            opt.onChange(jQuery(tablink), current, prev);
                        }
                    }, opt.animSpeed + 1);
                }
                tabset.removeClass(opt.activeClass);
                (opt.addToParent ? jQuery(tablink).parent() : jQuery(tablink)).addClass(opt.activeClass);
            }
            tabLinks.each(function() {
                jQuery(this).bind(opt.event, function() {
                    switchTab(this);
                    return false;
                });
            });
        });
    }

}
/*
     FILE ARCHIVED ON 00:49:14 Mar 17, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 02:08:42 Dec 21, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 194.632
  exclusion.robots: 0.066
  exclusion.robots.policy: 0.058
  cdx.remote: 0.054
  esindex: 0.008
  LoadShardBlock: 166.722 (3)
  PetaboxLoader3.datanode: 70.38 (5)
  PetaboxLoader3.resolve: 201.697 (4)
  load_resource: 153.74 (2)
*/
