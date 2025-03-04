/*
 * Copyright (c) 2012 Zynga Inc.
 * Copyright (c) 2013-2014 Chukong Technologies Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

#include "cocos2d_specifics.hpp"
#include "cocos2d.h"
#include <typeinfo>
#include "js_bindings_config.h"
#include "jsb_cocos2dx_auto.hpp"
#include "jsb_event_dispatcher_manual.h"


using namespace cocos2d;

schedFunc_proxy_t *_schedFunc_target_ht = NULL;
schedTarget_proxy_t *_schedObj_target_ht = NULL;

JSTouchDelegate::TouchDelegateMap JSTouchDelegate::sTouchDelegateMap;

JSTouchDelegate::JSTouchDelegate()
: _obj(nullptr)
, _needUnroot(false)
, _touchListenerAllAtOnce(nullptr)
, _touchListenerOneByOne(nullptr)
{
}

JSTouchDelegate::~JSTouchDelegate()
{
    CCLOGINFO("In the destructor of JSTouchDelegate.");
}

void JSTouchDelegate::setDelegateForJSObject(JSObject* pJSObj, JSTouchDelegate* pDelegate)
{
    CCASSERT(sTouchDelegateMap.find(pJSObj) == sTouchDelegateMap.end(), "");
    sTouchDelegateMap.insert(TouchDelegatePair(pJSObj, pDelegate));
}

JSTouchDelegate* JSTouchDelegate::getDelegateForJSObject(JSObject* pJSObj)
{
    JSTouchDelegate* pRet = NULL;
    TouchDelegateMap::iterator iter = sTouchDelegateMap.find(pJSObj);
    if (iter != sTouchDelegateMap.end())
    {
        pRet = iter->second;
    }
    return pRet;
}

void JSTouchDelegate::removeDelegateForJSObject(JSObject* pJSObj)
{
    TouchDelegateMap::iterator iter = sTouchDelegateMap.find(pJSObj);
    CCASSERT(iter != sTouchDelegateMap.end(), "");
    sTouchDelegateMap.erase(pJSObj);
}

void JSTouchDelegate::setJSObject(JSObject *obj)
{
    _obj = obj;
    
    js_proxy_t *p = jsb_get_js_proxy(_obj);
    if (!p)
    {
        JSContext *cx = ScriptingCore::getInstance()->getGlobalContext();
        JS_AddNamedObjectRoot(cx, &_obj, "JSB_TouchDelegateTarget, target");
        _needUnroot = true;
    }
}

void JSTouchDelegate::registerStandardDelegate(int priority)
{
    auto dispatcher = Director::getInstance()->getEventDispatcher();
    dispatcher->removeEventListener(_touchListenerAllAtOnce);
    
    auto listener = EventListenerTouchAllAtOnce::create();
    
    listener->onTouchesBegan = CC_CALLBACK_2(JSTouchDelegate::onTouchesBegan, this);
    listener->onTouchesMoved = CC_CALLBACK_2(JSTouchDelegate::onTouchesMoved, this);
    listener->onTouchesEnded = CC_CALLBACK_2(JSTouchDelegate::onTouchesEnded, this);
    listener->onTouchesCancelled = CC_CALLBACK_2(JSTouchDelegate::onTouchesCancelled, this);
    
    dispatcher->addEventListenerWithFixedPriority(listener, priority);
    
    _touchListenerAllAtOnce = listener;
}

void JSTouchDelegate::registerTargetedDelegate(int priority, bool swallowsTouches)
{
    auto dispatcher = Director::getInstance()->getEventDispatcher();
    dispatcher->removeEventListener(_touchListenerOneByOne);
    
    auto listener = EventListenerTouchOneByOne::create();
    listener->setSwallowTouches(swallowsTouches);
    
    listener->onTouchBegan = CC_CALLBACK_2(JSTouchDelegate::onTouchBegan, this);
    listener->onTouchMoved = CC_CALLBACK_2(JSTouchDelegate::onTouchMoved, this);
    listener->onTouchEnded = CC_CALLBACK_2(JSTouchDelegate::onTouchEnded, this);
    listener->onTouchCancelled = CC_CALLBACK_2(JSTouchDelegate::onTouchCancelled, this);
    
    dispatcher->addEventListenerWithFixedPriority(listener, priority);
    _touchListenerOneByOne = listener;
}

void JSTouchDelegate::unregisterTouchDelegate()
{
    if (_needUnroot)
    {
        JSContext *cx = ScriptingCore::getInstance()->getGlobalContext();
        JS_RemoveObjectRoot(cx, &_obj);
    }
    
    auto dispatcher = Director::getInstance()->getEventDispatcher();
    dispatcher->removeEventListener(_touchListenerAllAtOnce);
    dispatcher->removeEventListener(_touchListenerOneByOne);
    
    this->release();
}

bool JSTouchDelegate::onTouchBegan(Touch *touch, Event *event)
{
    CC_UNUSED_PARAM(event); 
    jsval retval;
    bool bRet = false;
    
    ScriptingCore::getInstance()->executeCustomTouchEvent(EventTouch::EventCode::BEGAN,
        touch, _obj, retval);
    
    if(JSVAL_IS_BOOLEAN(retval))
    {
        bRet = JSVAL_TO_BOOLEAN(retval);
    } 

    return bRet;
};
// optional

void JSTouchDelegate::onTouchMoved(Touch *touch, Event *event)
{
    CC_UNUSED_PARAM(event);

    ScriptingCore::getInstance()->executeCustomTouchEvent(EventTouch::EventCode::MOVED,
        touch, _obj);
}

void JSTouchDelegate::onTouchEnded(Touch *touch, Event *event)
{
    CC_UNUSED_PARAM(event);

    ScriptingCore::getInstance()->executeCustomTouchEvent(EventTouch::EventCode::ENDED,
        touch, _obj);
}

void JSTouchDelegate::onTouchCancelled(Touch *touch, Event *event)
{
    CC_UNUSED_PARAM(event);
    ScriptingCore::getInstance()->executeCustomTouchEvent(EventTouch::EventCode::CANCELLED,
        touch, _obj);
}

// optional
void JSTouchDelegate::onTouchesBegan(const std::vector<Touch*>& touches, Event *event)
{
    CC_UNUSED_PARAM(event);
    ScriptingCore::getInstance()->executeCustomTouchesEvent(EventTouch::EventCode::BEGAN, touches, _obj);
}

void JSTouchDelegate::onTouchesMoved(const std::vector<Touch*>& touches, Event *event)
{
    CC_UNUSED_PARAM(event);
    ScriptingCore::getInstance()->executeCustomTouchesEvent(EventTouch::EventCode::MOVED, touches, _obj);
}

void JSTouchDelegate::onTouchesEnded(const std::vector<Touch*>& touches, Event *event)
{
    CC_UNUSED_PARAM(event);
    ScriptingCore::getInstance()->executeCustomTouchesEvent(EventTouch::EventCode::ENDED, touches, _obj);
}

void JSTouchDelegate::onTouchesCancelled(const std::vector<Touch*>& touches, Event *event)
{
    CC_UNUSED_PARAM(event);
    ScriptingCore::getInstance()->executeCustomTouchesEvent(EventTouch::EventCode::CANCELLED, touches, _obj);
}

static void addCallBackAndThis(JSObject *obj, jsval callback, jsval &thisObj)
{
    if(callback != JSVAL_VOID) {
        ScriptingCore::getInstance()->setReservedSpot(0, obj, callback);
    }
    if(thisObj != JSVAL_VOID) {
        ScriptingCore::getInstance()->setReservedSpot(1, obj, thisObj);
    }
}

template<class T>
JSObject* bind_menu_item(JSContext *cx, T* nativeObj, jsval callback, jsval thisObj) {    
	js_proxy_t *p = jsb_get_native_proxy(nativeObj);
	if (p) {
		addCallBackAndThis(p->obj, callback, thisObj);
		return p->obj;
	} else {
		js_type_class_t *classType = js_get_type_from_native<T>(nativeObj);
		assert(classType);
		JSObject *tmp = JS_NewObject(cx, classType->jsclass, classType->proto, classType->parentProto);

		// bind nativeObj <-> JSObject
		js_proxy_t *proxy = jsb_new_proxy(nativeObj, tmp);
		JS_AddNamedObjectRoot(cx, &proxy->obj, typeid(*nativeObj).name());        
		addCallBackAndThis(tmp, callback, thisObj);

		return tmp;
	}
}

bool js_cocos2dx_CCMenu_create(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	if (argc > 0) {
		Vector<MenuItem*> items;
		uint32_t i = 0;
		while (i < argc) {
			js_proxy_t *proxy;
			JSObject *tmpObj = JSVAL_TO_OBJECT(argv[i]);
			proxy = jsb_get_js_proxy(tmpObj);
			cocos2d::MenuItem *item = (cocos2d::MenuItem*)(proxy ? proxy->ptr : NULL);
			TEST_NATIVE_OBJECT(cx, item)
			items.pushBack(item);
			i++;
		}
		cocos2d::Menu* ret = cocos2d::Menu::createWithArray(items);
		jsval jsret;
		do {
			if (ret) {
				js_proxy_t *p = jsb_get_native_proxy(ret);
				if (p) {
					jsret = OBJECT_TO_JSVAL(p->obj);
				} else {
					// create a new js obj of that class
					js_proxy_t *proxy = js_get_or_create_proxy<cocos2d::Menu>(cx, ret);
					jsret = OBJECT_TO_JSVAL(proxy->obj);
				}
			} else {
				jsret = JSVAL_NULL;
			}
		} while (0);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
	}
	if (argc == 0) {
		cocos2d::Menu* ret = cocos2d::Menu::create();
		jsval jsret;
		do {
			if (ret) {
				js_proxy_t *p = jsb_get_native_proxy(ret);
				if (p) {
					jsret = OBJECT_TO_JSVAL(p->obj);
				} else {
					// create a new js obj of that class
					js_proxy_t *proxy = js_get_or_create_proxy<cocos2d::Menu>(cx, ret);
					jsret = OBJECT_TO_JSVAL(proxy->obj);
				}
			} else {
				jsret = JSVAL_NULL;
			}
		} while (0);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
	}
    JS_ReportError(cx, "wrong number of arguments");
	return false;
}

bool js_cocos2dx_CCSequence_create(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	if (argc > 0) {
		Vector<FiniteTimeAction*> array;
        if (argc == 1 && JS_IsArrayObject(cx, JSVAL_TO_OBJECT(argv[0]))) {
            bool ok = true;
            ok &= jsval_to_ccvector(cx, argv[0], &array);
            JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        } else {
            uint32_t i = 0;
            while (i < argc) {
                js_proxy_t *proxy;
                JSObject *tmpObj = JSVAL_TO_OBJECT(argv[i]);
                proxy = jsb_get_js_proxy(tmpObj);
                cocos2d::FiniteTimeAction *item = (cocos2d::FiniteTimeAction*)(proxy ? proxy->ptr : NULL);
                TEST_NATIVE_OBJECT(cx, item)
                array.pushBack(item);
                i++;
            }
        }
		cocos2d::FiniteTimeAction* ret = cocos2d::Sequence::create(array);
		jsval jsret;
		do {
			if (ret) {
				js_proxy_t *p = jsb_get_native_proxy(ret);
				if (p) {
					jsret = OBJECT_TO_JSVAL(p->obj);
				} else {
					// create a new js obj of that class
					js_proxy_t *proxy = js_get_or_create_proxy<cocos2d::FiniteTimeAction>(cx, ret);
					jsret = OBJECT_TO_JSVAL(proxy->obj);
				}
			} else {
				jsret = JSVAL_NULL;
			}
		} while (0);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
	}
    JS_ReportError(cx, "wrong number of arguments");
	return false;
}

bool js_cocos2dx_CCSpawn_create(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	if (argc > 0) {
		Vector<FiniteTimeAction*> array;
        if (argc == 1 && JS_IsArrayObject(cx, JSVAL_TO_OBJECT(argv[0]))) {
            bool ok = true;
            ok &= jsval_to_ccvector(cx, argv[0], &array);
            JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        } else {
            uint32_t i = 0;
            while (i < argc) {
                js_proxy_t *proxy;
                JSObject *tmpObj = JSVAL_TO_OBJECT(argv[i]);
                proxy = jsb_get_js_proxy(tmpObj);
                cocos2d::FiniteTimeAction *item = (cocos2d::FiniteTimeAction*)(proxy ? proxy->ptr : NULL);
                TEST_NATIVE_OBJECT(cx, item)
                array.pushBack(item);
                i++;
            }
        }
		cocos2d::FiniteTimeAction* ret = cocos2d::Spawn::create(array);
		jsval jsret;
		do {
			if (ret) {
				js_proxy_t *p = jsb_get_native_proxy(ret);
				if (p) {
					jsret = OBJECT_TO_JSVAL(p->obj);
				} else {
					// create a new js obj of that class
					js_proxy_t *proxy = js_get_or_create_proxy<cocos2d::FiniteTimeAction>(cx, ret);
					jsret = OBJECT_TO_JSVAL(proxy->obj);
				}
			} else {
				jsret = JSVAL_NULL;
			}
		} while (0);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
	}
    JS_ReportError(cx, "wrong number of arguments");
	return false;
}

bool js_cocos2dx_CCMenuItem_create(JSContext *cx, uint32_t argc, jsval *vp)
{
	if (argc >= 1) {
		jsval *argv = JS_ARGV(cx, vp);
		cocos2d::MenuItem* ret = cocos2d::MenuItem::create();
		JSObject *obj = bind_menu_item<cocos2d::MenuItem>(cx, ret, argv[0], argc == 2? argv[1] : JSVAL_VOID);
		JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(obj));
		return true;
	}
    JS_ReportError(cx, "wrong number of arguments");
	return false;
}

// "create" in JS
// cc.MenuItemSprite.create( normalSprite, selectedSprite, [disabledSprite], [callback_fn], [this]
bool js_cocos2dx_CCMenuItemSprite_create(JSContext *cx, uint32_t argc, jsval *vp)
{
	if (argc >= 2 && argc <= 5) {
		jsval *argv = JS_ARGV(cx, vp);
		js_proxy_t *proxy;
		JSObject *tmpObj;
		
		tmpObj = JSVAL_TO_OBJECT(argv[0]);
		proxy = jsb_get_js_proxy(tmpObj);
		cocos2d::Node* arg0 = (cocos2d::Node*)(proxy ? proxy->ptr : NULL);
		TEST_NATIVE_OBJECT(cx, arg0);

		tmpObj = JSVAL_TO_OBJECT(argv[1]);
		proxy = jsb_get_js_proxy(tmpObj);
		cocos2d::Node* arg1 = (cocos2d::Node*)(proxy ? proxy->ptr : NULL);
		TEST_NATIVE_OBJECT(cx, arg1);

        int last = 2;
		bool thirdArgIsCallback = false;

		jsval jsCallback = JSVAL_VOID;
		jsval jsThis = JSVAL_VOID;

		cocos2d::Node* arg2 = NULL;
		if (argc >= 3) {
			tmpObj = JSVAL_TO_OBJECT(argv[2]);
			thirdArgIsCallback = JS_ObjectIsFunction(cx, tmpObj);
			if (!thirdArgIsCallback) { 
				proxy = jsb_get_js_proxy(tmpObj);
				arg2 = (cocos2d::Node*)(proxy ? proxy->ptr : NULL);
				TEST_NATIVE_OBJECT(cx, arg2);
				last = 3;
			}
		}
		cocos2d::MenuItemSprite* ret = cocos2d::MenuItemSprite::create(arg0, arg1, arg2);
		if (argc >= 3) { 
			if (thirdArgIsCallback) {
				//cc.MenuItemSprite.create( normalSprite, selectedSprite, callback_fn, [this] )
				jsCallback = argv[last++];
				if (argc == 4) {
					jsThis = argv[last];
				}
			}
			else { 
				//cc.MenuItemSprite.create( normalSprite, selectedSprite, disabledSprite, callback_fn, [this] )
				if (argc >= 4) {
					jsCallback = argv[last++];
					if (argc == 5) {
						jsThis = argv[last];
					}
				}
			}
		}

		JSObject *obj = bind_menu_item<cocos2d::MenuItemSprite>(cx, ret, jsCallback, jsThis);

		JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(obj));
		return true;
	}
    JS_ReportError(cx, "Invalid number of arguments. Expecting: 2 <= args <= 5");
	return false;
}

// "create" in JS:
// cc.MenuItemLabel.create( label, callback_fn, [this] );
bool js_cocos2dx_CCMenuItemLabel_create(JSContext *cx, uint32_t argc, jsval *vp)
{
	if (argc >= 1 && argc <= 3) {
		jsval *argv = JS_ARGV(cx, vp);
		js_proxy_t *proxy;
		JSObject *tmpObj = JSVAL_TO_OBJECT(argv[0]);
		proxy = jsb_get_js_proxy(tmpObj);
		cocos2d::Node* arg0 = (cocos2d::Node*)(proxy ? proxy->ptr : NULL);
		TEST_NATIVE_OBJECT(cx, arg0)
		cocos2d::MenuItemLabel* ret = cocos2d::MenuItemLabel::create(arg0);
		JSObject *obj = bind_menu_item<cocos2d::MenuItemLabel>(cx, ret, (argc >= 2 ? argv[1] : JSVAL_VOID), (argc == 3 ? argv[2] : JSVAL_VOID) );
		JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(obj));
		return true;
	}
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d or %d or %d", argc, 1, 2, 3);
	return false;
}

bool js_cocos2dx_CCMenuItemAtlasFont_create(JSContext *cx, uint32_t argc, jsval *vp)
{
	if (argc >= 5) {
        bool ok = true;
		jsval *argv = JS_ARGV(cx, vp);
		JSStringWrapper arg0(argv[0]);
		JSStringWrapper arg1(argv[1]);
		int arg2; ok &= jsval_to_int32(cx, argv[2], &arg2);
		int arg3; ok &= jsval_to_int32(cx, argv[3], &arg3);
		int arg4; ok &= jsval_to_int32(cx, argv[4], &arg4);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
		cocos2d::MenuItemAtlasFont* ret = cocos2d::MenuItemAtlasFont::create(arg0.get(), arg1.get(), arg2, arg3, arg4);
		JSObject *obj = bind_menu_item<cocos2d::MenuItemAtlasFont>(cx, ret, (argc >= 6 ? argv[5] : JSVAL_VOID), (argc == 7 ? argv[6] : JSVAL_VOID));
		JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(obj));
		return true;
	}
    JS_ReportError(cx, "wrong number of arguments");
	return false;
}

// "create" in JS
// cc.MenuItemFont.create( string, callback_fn, [this] );
bool js_cocos2dx_CCMenuItemFont_create(JSContext *cx, uint32_t argc, jsval *vp)
{
	if (argc >= 1 && argc <= 3) {
		jsval *argv = JS_ARGV(cx, vp);
		JSStringWrapper arg0(argv[0]);
		cocos2d::MenuItemFont* ret = cocos2d::MenuItemFont::create(arg0.get());
		JSObject *obj = bind_menu_item<cocos2d::MenuItemFont>(cx, ret, (argc >= 2 ? argv[1] : JSVAL_VOID), (argc == 3 ? argv[2] : JSVAL_VOID));
		JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(obj));
		return true;
	}
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d or %d or %d", argc, 1, 2, 3);
	return false;
}


bool js_cocos2dx_CCMenuItemToggle_create(JSContext *cx, uint32_t argc, jsval *vp)
{
    if (argc >= 1) {
        jsval *argv = JS_ARGV(cx, vp);
        cocos2d::MenuItemToggle* ret = cocos2d::MenuItemToggle::create();

        for (uint32_t i=0; i < argc; i++) {
            js_proxy_t *proxy;
            JSObject *tmpObj = JSVAL_TO_OBJECT(argv[i]);
            proxy = jsb_get_js_proxy(tmpObj);
            cocos2d::MenuItem* item = (cocos2d::MenuItem*)(proxy ? proxy->ptr : NULL);
            TEST_NATIVE_OBJECT(cx, item)
            ret->addSubItem(item);
        }

        ret->setSelectedIndex(0);
        
        jsval jsret;
        if (ret) {
            js_proxy_t *proxy = jsb_get_native_proxy(ret);
            if (proxy) {
                jsret = OBJECT_TO_JSVAL(proxy->obj);
            } else {
                // create a new js obj of that class
                proxy = js_get_or_create_proxy<cocos2d::MenuItemToggle>(cx, ret);
                jsret = OBJECT_TO_JSVAL(proxy->obj);
            }
        } else {
            jsret = JSVAL_NULL;
        }
        
        JS_SET_RVAL(cx, vp, jsret);
        return true;
    }
    JS_ReportError(cx, "wrong number of arguments");
    return false;
}

// "setCallback" in JS
// item.setCallback( callback_fn, [this]);
template<class T>
bool js_cocos2dx_setCallback(JSContext *cx, uint32_t argc, jsval *vp)
{
    if(argc == 1 || argc == 2)
    {
        jsval *argv = JS_ARGV(cx, vp);
        JSObject *obj = JS_THIS_OBJECT(cx, vp);
        jsval jsThis = JSVAL_VOID;
        jsval jsFunc = argv[0];
        
        if (jsFunc.isUndefined())
        {
            JS_ReportError(cx, "The callback function is undefined.");
            return false;
        }
        
        if (argc == 2)
        {
            jsThis = argv[1];
        }
        
        js_proxy_t *proxy = jsb_get_js_proxy(obj);
        T* item = (T*)(proxy ? proxy->ptr : NULL);
        TEST_NATIVE_OBJECT(cx, item)
        bind_menu_item(cx, item, jsFunc, jsThis);
        return true;
    }
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d or %d", argc, 1, 2);
    return false;
}

bool js_cocos2dx_CCMenuItem_setCallback(JSContext *cx, uint32_t argc, jsval *vp) {
    return js_cocos2dx_setCallback<cocos2d::MenuItem>(cx, argc, vp);
}


bool js_cocos2dx_CCAnimation_create(JSContext *cx, uint32_t argc, jsval *vp)
{
    bool ok = true;
	jsval *argv = JS_ARGV(cx, vp);
	if (argc <= 3) {
		cocos2d::Animation* ret = nullptr;
		double arg1 = 0.0f;
		if (argc == 2) {
            Vector<SpriteFrame*> arg0;
            if (argc > 0) {
                ok &= jsval_to_ccvector(cx, argv[0], &arg0);
                JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
            }
            ok &= JS::ToNumber(cx, JS::RootedValue(cx, argv[1]), &arg1);
            JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
			ret = cocos2d::Animation::createWithSpriteFrames(arg0, arg1);
		} else if (argc == 3) {
            Vector<AnimationFrame*> arg0;
            if (argc > 0) {
                ok &= jsval_to_ccvector(cx, argv[0], &arg0);
                JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
            }
			unsigned int loops;
			ok &= JS::ToNumber(cx, JS::RootedValue(cx, argv[1]), &arg1);
			ok &= jsval_to_uint32(cx, argv[2], &loops);
            JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
			ret = cocos2d::Animation::create(arg0, arg1, loops);
		} else if (argc == 1) {
            Vector<SpriteFrame*> arg0;
            if (argc > 0) {
                ok &= jsval_to_ccvector(cx, argv[0], &arg0);
                JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
            }
			ret = cocos2d::Animation::createWithSpriteFrames(arg0);
		} else if (argc == 0) {
            ret = cocos2d::Animation::create();
        }
		jsval jsret;
		if (ret) {
			js_proxy_t *proxy = jsb_get_native_proxy(ret);
			if (proxy) {
				jsret = OBJECT_TO_JSVAL(proxy->obj);
			} else {
				// create a new js obj of that class
				proxy = js_get_or_create_proxy<cocos2d::Animation>(cx, ret);
				jsret = OBJECT_TO_JSVAL(proxy->obj);
			}
		} else {
			jsret = JSVAL_NULL;
		}
		JS_SET_RVAL(cx, vp, jsret);
		return true;
	}
    JS_ReportError(cx, "wrong number of arguments");
	return false;
}

bool js_cocos2dx_CCScene_init(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::Scene* cobj = (cocos2d::Scene *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_Scene_init : Invalid Native Object");
	if (argc == 0) {
		bool ret = cobj->init();
		jsval jsret = JSVAL_NULL;
		jsret = BOOLEAN_TO_JSVAL(ret);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
	}
    
	JS_ReportError(cx, "js_cocos2dx_Scene_init : wrong number of arguments: %d, was expecting %d", argc, 0);
	return false;
}

bool js_cocos2dx_CCLayerMultiplex_create(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	Vector<Layer*> arg0;
    bool ok = true;
	ok &= jsvals_variadic_to_ccvector(cx, argv, argc, &arg0);
    JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
    
	cocos2d::LayerMultiplex* ret = cocos2d::LayerMultiplex::createWithArray(arg0);
	jsval jsret;
	do {
		if (ret) {
			js_proxy_t *proxy = js_get_or_create_proxy<cocos2d::LayerMultiplex>(cx, ret);
			jsret = OBJECT_TO_JSVAL(proxy->obj);
		} else {
			jsret = JSVAL_NULL;
		}
	} while (0);
	JS_SET_RVAL(cx, vp, jsret);
	return true;
}

bool js_cocos2dx_JSTouchDelegate_registerStandardDelegate(JSContext *cx, uint32_t argc, jsval *vp)
{
	if (argc == 1 || argc == 2)
    {
		jsval *argv = JS_ARGV(cx, vp);
        JSObject* jsobj = NULL;

        JSTouchDelegate *touch = new JSTouchDelegate();
        
        int priority = 1;
        if (argc == 2)
        {
            priority = JSVAL_TO_INT(argv[1]);
        }
        
        touch->registerStandardDelegate(priority);
        
        jsobj = JSVAL_TO_OBJECT(argv[0]); 
        touch->setJSObject(jsobj);
        JSTouchDelegate::setDelegateForJSObject(jsobj, touch);
		return true;
	}
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 2);
	return false;
}

bool js_cocos2dx_JSTouchDelegate_registerTargetedDelegate(JSContext *cx, uint32_t argc, jsval *vp)
{
	if (argc == 3)
    {
		jsval *argv = JS_ARGV(cx, vp);
        JSObject* jsobj = NULL;

        JSTouchDelegate *touch = new JSTouchDelegate();
        touch->registerTargetedDelegate(JSVAL_TO_INT(argv[0]), JSVAL_TO_BOOLEAN(argv[1]));
        
        jsobj = JSVAL_TO_OBJECT(argv[2]);
        touch->setJSObject(jsobj);
        JSTouchDelegate::setDelegateForJSObject(jsobj, touch);

		return true;
	}
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 3);
	return false;
}

bool js_cocos2dx_JSTouchDelegate_unregisterTouchDelegate(JSContext *cx, uint32_t argc, jsval *vp)
{
    if (argc == 1) {
        jsval *argv = JS_ARGV(cx, vp);
        JSObject* jsobj = JSVAL_TO_OBJECT(argv[0]);
        JSTouchDelegate* pDelegate = JSTouchDelegate::getDelegateForJSObject(jsobj);
        if (pDelegate)
        {
            pDelegate->unregisterTouchDelegate();
            JSTouchDelegate::removeDelegateForJSObject(jsobj);
        }
        
        return true;
    }
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}

JSObject* getObjectFromNamespace(JSContext* cx, JSObject *ns, const char *name) {
	JS::RootedValue out(cx);
    bool ok = true;
	if (JS_GetProperty(cx, ns, name, &out) == true) {
        JS::RootedObject obj(cx);
		ok &= JS_ValueToObject(cx, out, &obj);
        JSB_PRECONDITION2(ok, cx, NULL, "Error processing arguments");
	}
	return NULL;
}

jsval anonEvaluate(JSContext *cx, JSObject *thisObj, const char* string) {
	jsval out;
	JSB_AUTOCOMPARTMENT_WITH_GLOBAL_OBJCET
	if (JS_EvaluateScript(cx, thisObj, string, strlen(string), "(string)", 1, &out) == true) {
		return out;
	}
	return JSVAL_VOID;
}

bool js_platform(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSString *str = JS_NewStringCopyZ(cx, "mobile");
	jsval out = STRING_TO_JSVAL(str);
	JS_SET_RVAL(cx, vp, out);
	return true;
}

JSCallbackWrapper::JSCallbackWrapper()
: _jsCallback(JSVAL_VOID), _jsThisObj(JSVAL_VOID), _extraData(JSVAL_VOID)
{

}

JSCallbackWrapper::~JSCallbackWrapper()
{
    JSContext* cx = ScriptingCore::getInstance()->getGlobalContext();
    JS_RemoveValueRoot(cx, &_jsCallback);
}

void JSCallbackWrapper::setJSCallbackFunc(jsval func) {
    _jsCallback = func;
    JSContext* cx = ScriptingCore::getInstance()->getGlobalContext();
	// Root the callback function.
    JS_AddNamedValueRoot(cx, &_jsCallback, "JSCallbackWrapper_callback_func");
}

void JSCallbackWrapper::setJSCallbackThis(jsval thisObj) {
    _jsThisObj = thisObj;
}

void JSCallbackWrapper::setJSExtraData(jsval data) {
    _extraData = data;
}

const jsval& JSCallbackWrapper::getJSCallbackFunc() const
{
    return _jsCallback;
}

const jsval& JSCallbackWrapper::getJSCallbackThis() const
{
    return _jsThisObj;
}

const jsval& JSCallbackWrapper::getJSExtraData() const
{
    return _extraData;
}

// cc.CallFunc.create( func, this, [data])
// cc.CallFunc.create( func )
static bool js_callFunc(JSContext *cx, uint32_t argc, jsval *vp)
{
    if (argc >= 1 && argc <= 3) {
		jsval *argv = JS_ARGV(cx, vp);

        std::shared_ptr<JSCallbackWrapper> tmpCobj(new JSCallbackWrapper());
        
        tmpCobj->setJSCallbackFunc(argv[0]);
        if(argc >= 2) {
            tmpCobj->setJSCallbackThis(argv[1]);
        } if(argc == 3) {
            tmpCobj->setJSExtraData(argv[2]);
        }
        
        CallFuncN *ret = CallFuncN::create([=](Node* sender){
            const jsval& jsvalThis = tmpCobj->getJSCallbackThis();
            const jsval& jsvalCallback = tmpCobj->getJSCallbackFunc();
            const jsval& jsvalExtraData = tmpCobj->getJSExtraData();
            
            bool hasExtraData = !JSVAL_IS_VOID(jsvalExtraData);
            JSObject* thisObj = JSVAL_IS_VOID(jsvalThis) ? nullptr : JSVAL_TO_OBJECT(jsvalThis);
            
            JSB_AUTOCOMPARTMENT_WITH_GLOBAL_OBJCET
            
            js_proxy_t *proxy = js_get_or_create_proxy<cocos2d::Node>(cx, sender);
            
            jsval retval;
            if(jsvalCallback != JSVAL_VOID)
            {
                if (hasExtraData)
                {
                    jsval valArr[2];
                    valArr[0] = OBJECT_TO_JSVAL(proxy->obj);
                    valArr[1] = jsvalExtraData;
                    
                    JS_AddValueRoot(cx, valArr);
                    JS_CallFunctionValue(cx, thisObj, jsvalCallback, 2, valArr, &retval);
                    JS_RemoveValueRoot(cx, valArr);
                }
                else
                {
                    jsval senderVal = OBJECT_TO_JSVAL(proxy->obj);
                    JS_AddValueRoot(cx, &senderVal);
                    JS_CallFunctionValue(cx, thisObj, jsvalCallback, 1, &senderVal, &retval);
                    JS_RemoveValueRoot(cx, &senderVal);
                }
            }
            
            // I think the JSCallFuncWrapper isn't needed.
            // Since an action will be run by a cc.Node, it will be released at the Node::cleanup.
            // By James Chen
            // JSCallFuncWrapper::setTargetForNativeNode(node, (JSCallFuncWrapper *)this);
        });
        
		js_proxy_t *proxy = js_get_or_create_proxy<cocos2d::CallFunc>(cx, ret);
		JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(proxy->obj));
        
        JS_SetReservedSlot(proxy->obj, 0, argv[0]);
        if(argc > 1) {
            JS_SetReservedSlot(proxy->obj, 1, argv[1]);
        }
//        if(argc == 3) {
//            JS_SetReservedSlot(proxy->obj, 2, argv[2]);
//        }
        
      //  test->execute();
        return true;
    }
    JS_ReportError(cx, "Invalid number of arguments");
    return false;
}

// callFunc.initWithFunction( func, this, [data])
// callFunc.initWithFunction( func )
bool js_cocos2dx_CallFunc_initWithFunction(JSContext *cx, uint32_t argc, jsval *vp)
{
    if (argc >= 1 && argc <= 3) {
        JSObject *obj = JS_THIS_OBJECT(cx, vp);
		js_proxy_t *proxy = jsb_get_js_proxy(obj);
		CallFuncN *action = (cocos2d::CallFuncN *)(proxy ? proxy->ptr : NULL);
        JSB_PRECONDITION2(action, cx, false, "Invalid Native Object");
        
		jsval *argv = JS_ARGV(cx, vp);
        
        std::shared_ptr<JSCallbackWrapper> tmpCobj(new JSCallbackWrapper());
        
        tmpCobj->setJSCallbackFunc(argv[0]);
        if(argc >= 2) {
            tmpCobj->setJSCallbackThis(argv[1]);
        } if(argc == 3) {
            tmpCobj->setJSExtraData(argv[2]);
        }
        
        action->initWithFunction([=](Node* sender){
            const jsval& jsvalThis = tmpCobj->getJSCallbackThis();
            const jsval& jsvalCallback = tmpCobj->getJSCallbackFunc();
            const jsval& jsvalExtraData = tmpCobj->getJSExtraData();
            
            bool hasExtraData = !JSVAL_IS_VOID(jsvalExtraData);
            JSObject* thisObj = JSVAL_IS_VOID(jsvalThis) ? nullptr : JSVAL_TO_OBJECT(jsvalThis);
            
            JSB_AUTOCOMPARTMENT_WITH_GLOBAL_OBJCET
            
            js_proxy_t *proxy = js_get_or_create_proxy<cocos2d::Node>(cx, sender);
            
            jsval retval;
            if(jsvalCallback != JSVAL_VOID)
            {
                if (hasExtraData)
                {
                    jsval valArr[2];
                    valArr[0] = OBJECT_TO_JSVAL(proxy->obj);
                    valArr[1] = jsvalExtraData;
                    
                    JS_AddValueRoot(cx, valArr);
                    JS_CallFunctionValue(cx, thisObj, jsvalCallback, 2, valArr, &retval);
                    JS_RemoveValueRoot(cx, valArr);
                }
                else
                {
                    jsval senderVal = OBJECT_TO_JSVAL(proxy->obj);
                    JS_AddValueRoot(cx, &senderVal);
                    JS_CallFunctionValue(cx, thisObj, jsvalCallback, 1, &senderVal, &retval);
                    JS_RemoveValueRoot(cx, &senderVal);
                }
            }
            
            // I think the JSCallFuncWrapper isn't needed.
            // Since an action will be run by a cc.Node, it will be released at the Node::cleanup.
            // By James Chen
            // JSCallFuncWrapper::setTargetForNativeNode(node, (JSCallFuncWrapper *)this);
        });
        
		JS_SetReservedSlot(proxy->obj, 0, argv[0]);
        if(argc > 1) {
            JS_SetReservedSlot(proxy->obj, 1, argv[1]);
        }
        return true;
    }
    JS_ReportError(cx, "Invalid number of arguments");
    return false;
}

JSScheduleWrapper::~JSScheduleWrapper()
{
    if (_pPureJSTarget) {
        JSContext* cx = ScriptingCore::getInstance()->getGlobalContext();
        JS_RemoveObjectRoot(cx, &_pPureJSTarget);
    }
}

void JSScheduleWrapper::setTargetForSchedule(jsval sched, JSScheduleWrapper *target) {
    do {
        JSObject* jsfunc = JSVAL_TO_OBJECT(sched);
        auto targetArray = getTargetForSchedule(sched);
        if (NULL == targetArray) {
            targetArray = new __Array();
            targetArray->init();
            schedFunc_proxy_t *p = (schedFunc_proxy_t *)malloc(sizeof(schedFunc_proxy_t));
            assert(p);
            p->jsfuncObj = jsfunc;
            p->targets = targetArray;
            HASH_ADD_PTR(_schedFunc_target_ht, jsfuncObj, p);
        }

        CCASSERT(!targetArray->containsObject(target), "The target was already added.");

        targetArray->addObject(target);
    } while(0);
}

__Array * JSScheduleWrapper::getTargetForSchedule(jsval sched) {
    schedFunc_proxy_t *t = NULL;
    JSObject *o = JSVAL_TO_OBJECT(sched);
    HASH_FIND_PTR(_schedFunc_target_ht, &o, t);
    return t != NULL ? t->targets : NULL;
}


void JSScheduleWrapper::setTargetForJSObject(JSObject* jsTargetObj, JSScheduleWrapper *target)
{
    auto targetArray = getTargetForJSObject(jsTargetObj);
    if (NULL == targetArray) {
        targetArray = new __Array();
        targetArray->init();
        schedTarget_proxy_t *p = (schedTarget_proxy_t *)malloc(sizeof(schedTarget_proxy_t));
        assert(p);
        p->jsTargetObj = jsTargetObj;
        p->targets = targetArray;
        HASH_ADD_PTR(_schedObj_target_ht, jsTargetObj, p);
    }
    
    CCASSERT(!targetArray->containsObject(target), "The target was already added.");
    targetArray->addObject(target);
}

__Array * JSScheduleWrapper::getTargetForJSObject(JSObject* jsTargetObj)
{
    schedTarget_proxy_t *t = NULL;
    HASH_FIND_PTR(_schedObj_target_ht, &jsTargetObj, t);
    return t != NULL ? t->targets : NULL;
}

void JSScheduleWrapper::removeAllTargets()
{
    CCLOGINFO("removeAllTargets begin");
    dump();
    
    {
        schedFunc_proxy_t *current, *tmp;
        HASH_ITER(hh, _schedFunc_target_ht, current, tmp) {
            current->targets->removeAllObjects();
            current->targets->release();
            HASH_DEL(_schedFunc_target_ht, current);
            free(current);
        }
    }
    
    {
        schedTarget_proxy_t *current, *tmp;
        HASH_ITER(hh, _schedObj_target_ht, current, tmp) {
            current->targets->removeAllObjects();
            current->targets->release();
            HASH_DEL(_schedObj_target_ht, current);
            free(current);
        }
    }
    
    dump();
    CCLOGINFO("removeAllTargets end");
}

void JSScheduleWrapper::removeAllTargetsForMinPriority(int minPriority)
{
    CCLOGINFO("removeAllTargetsForPriority begin");
    dump();
    
    {
        schedFunc_proxy_t *current, *tmp;
        HASH_ITER(hh, _schedFunc_target_ht, current, tmp) {
            std::vector<Ref*> objectsNeedToBeReleased;
            auto targets = current->targets;
            Ref* pObj = NULL;
            CCARRAY_FOREACH(targets, pObj)
            {
                JSScheduleWrapper* wrapper = static_cast<JSScheduleWrapper*>(pObj);
                bool isUpdateSchedule = wrapper->isUpdateSchedule();
                if (!isUpdateSchedule || (isUpdateSchedule && wrapper->getPriority() >= minPriority))
                {
                    objectsNeedToBeReleased.push_back(pObj);
                }
            }
            
            std::vector<Ref*>::iterator iter = objectsNeedToBeReleased.begin();
            for (; iter != objectsNeedToBeReleased.end(); ++iter)
            {
                targets->removeObject(*iter, true);
            }
            
            if (targets->count() == 0)
            {
                HASH_DEL(_schedFunc_target_ht, current);
                targets->release();
                free(current);
            }
        }
    }
    
    {
        schedTarget_proxy_t *current, *tmp;
        HASH_ITER(hh, _schedObj_target_ht, current, tmp) {
            std::vector<Ref*> objectsNeedToBeReleased;
            auto targets = current->targets;
            Ref* pObj = NULL;
            CCARRAY_FOREACH(targets, pObj)
            {
                JSScheduleWrapper* wrapper = static_cast<JSScheduleWrapper*>(pObj);
                bool isUpdateSchedule = wrapper->isUpdateSchedule();
                if (!isUpdateSchedule || (isUpdateSchedule && wrapper->getPriority() >= minPriority))
                {
                    CCLOG("isUpdateSchedule2:%d", isUpdateSchedule);
                    objectsNeedToBeReleased.push_back(pObj);
                }
            }
            
            auto iter = objectsNeedToBeReleased.begin();
            for (; iter != objectsNeedToBeReleased.end(); ++iter)
            {
                targets->removeObject(*iter, true);
            }
            
            if (targets->count() == 0)
            {
                HASH_DEL(_schedObj_target_ht, current);
                targets->release();
                free(current);
            }
        }
    }
    
    dump();
    CCLOGINFO("removeAllTargetsForPriority end");
}

void JSScheduleWrapper::removeAllTargetsForJSObject(JSObject* jsTargetObj)
{
    CCLOGINFO("removeAllTargetsForNatiaveNode begin");
    dump();
    __Array* removeNativeTargets = NULL;
    schedTarget_proxy_t *t = NULL;
    HASH_FIND_PTR(_schedObj_target_ht, &jsTargetObj, t);
    if (t != NULL) {
        removeNativeTargets = t->targets;
        HASH_DEL(_schedObj_target_ht, t);
    }

    if (removeNativeTargets == NULL) return;

    schedFunc_proxy_t *current, *tmp;
    HASH_ITER(hh, _schedFunc_target_ht, current, tmp) {
        std::vector<Ref*> objectsNeedToBeReleased;
        auto targets = current->targets;
        Ref* pObj = NULL;
        CCARRAY_FOREACH(targets, pObj)
        {
            if (removeNativeTargets->containsObject(pObj))
            {
                objectsNeedToBeReleased.push_back(pObj);
            }
        }
        
        auto iter = objectsNeedToBeReleased.begin();
        for (; iter != objectsNeedToBeReleased.end(); ++iter)
        {
            targets->removeObject(*iter, true);
        }

        if (targets->count() == 0)
        {
            HASH_DEL(_schedFunc_target_ht, current);
            targets->release();
            free(current);
        }  
    }

    removeNativeTargets->removeAllObjects();
    removeNativeTargets->release();
    free(t);
    dump();
    CCLOGINFO("removeAllTargetsForNatiaveNode end");
}

void JSScheduleWrapper::removeTargetForJSObject(JSObject* jsTargetObj, JSScheduleWrapper* target)
{
    CCLOGINFO("removeTargetForJSObject begin");
    dump();
    schedTarget_proxy_t *t = NULL;
    HASH_FIND_PTR(_schedObj_target_ht, &jsTargetObj, t);
    if (t != NULL) {
        t->targets->removeObject(target);
        if (t->targets->count() == 0)
        {
            t->targets->release();
            HASH_DEL(_schedObj_target_ht, t);
            free(t);
        }
    }

    schedFunc_proxy_t *current, *tmp, *removed=NULL;

    HASH_ITER(hh, _schedFunc_target_ht, current, tmp) {
        auto targets = current->targets;
        Ref* pObj = NULL;
        
        CCARRAY_FOREACH(targets, pObj)
        {
            JSScheduleWrapper* pOneTarget = static_cast<JSScheduleWrapper*>(pObj);
            if (pOneTarget == target)
            {
                removed = current;
                break;
            }
        }
        if (removed) break;
    }

    if (removed)
    {
        removed->targets->removeObject(target);
        if (removed->targets->count() == 0)
        {
            removed->targets->release();
            HASH_DEL(_schedFunc_target_ht, removed);
            free(removed);
        }  
    }
    dump();
    CCLOGINFO("removeTargetForJSObject end");
}

void JSScheduleWrapper::dump()
{
#if COCOS2D_DEBUG > 1
    CCLOG("\n---------JSScheduleWrapper dump begin--------------\n");
    CCLOG("target hash count = %d, func hash count = %d", HASH_COUNT(_schedObj_target_ht), HASH_COUNT(_schedFunc_target_ht));
    schedTarget_proxy_t *current, *tmp;
    int nativeTargetsCount = 0;
    HASH_ITER(hh, _schedObj_target_ht, current, tmp) {
        Ref* pObj = NULL;
        CCARRAY_FOREACH(current->targets, pObj)
        {
            CCLOG("js target ( %p ), native target[%d]=( %p )", current->jsTargetObj, nativeTargetsCount, pObj);
            nativeTargetsCount++;
        }
    }

    CCLOG("\n-----------------------------\n");

    schedFunc_proxy_t *current_func, *tmp_func;
    int jsfuncTargetCount = 0;
    HASH_ITER(hh, _schedFunc_target_ht, current_func, tmp_func) {
        Ref* pObj = NULL;
        CCARRAY_FOREACH(current_func->targets, pObj)
        {
            CCLOG("js func ( %p ), native target[%d]=( %p )", current_func->jsfuncObj, jsfuncTargetCount, pObj);
            jsfuncTargetCount++;
        }
    }
    CCASSERT(nativeTargetsCount == jsfuncTargetCount, "");
    CCLOG("\n---------JSScheduleWrapper dump end--------------\n");
#endif
}

void JSScheduleWrapper::scheduleFunc(float dt)
{
    jsval retval = JSVAL_NULL;
    jsval data = DOUBLE_TO_JSVAL(dt);

    JSContext *cx = ScriptingCore::getInstance()->getGlobalContext();

    bool ok = JS_AddValueRoot(cx, &data);
    if (!ok) {
        CCLOG("scheduleFunc: Root value fails.");
        return;
    }
    
    JSB_AUTOCOMPARTMENT_WITH_GLOBAL_OBJCET

    if(!_jsCallback.isNullOrUndefined()) {
        if (!_jsThisObj.isNullOrUndefined()) {
            JS_CallFunctionValue(cx, JSVAL_TO_OBJECT(_jsThisObj), _jsCallback, 1, &data, &retval);
        }
        else {
            JS_CallFunctionValue(cx, NULL, _jsCallback, 1, &data, &retval);
        }
    }

    JS_RemoveValueRoot(cx, &data);
}

void JSScheduleWrapper::update(float dt)
{
    jsval data = DOUBLE_TO_JSVAL(dt);
    
    JSContext *cx = ScriptingCore::getInstance()->getGlobalContext();
    
    bool ok = JS_AddValueRoot(cx, &data);
    if (!ok) {
        CCLOG("scheduleFunc: Root value fails.");
        return;
    }
    
    ScriptingCore::getInstance()->executeFunctionWithOwner(_jsThisObj, "update", 1, &data);
    
    JS_RemoveValueRoot(cx, &data);
}

Ref*  JSScheduleWrapper::getTarget()
{
    return _pTarget;
}

void JSScheduleWrapper::setTarget(Ref* pTarget)
{
    _pTarget = pTarget;
}

void JSScheduleWrapper::setPureJSTarget(JSObject* pPureJSTarget)
{
    CCASSERT(_pPureJSTarget == NULL, "The pure js target has been set");
    JSContext* cx = ScriptingCore::getInstance()->getGlobalContext();
    _pPureJSTarget = pPureJSTarget;
    JS_AddNamedObjectRoot(cx, &_pPureJSTarget, "Pure JS target");
}

JSObject* JSScheduleWrapper::getPureJSTarget()
{
    return _pPureJSTarget;
}

void JSScheduleWrapper::setPriority(int priority)
{
    _priority = priority;
}

int  JSScheduleWrapper::getPriority()
{
    return _priority;
}

void JSScheduleWrapper::setUpdateSchedule(bool isUpdateSchedule)
{
    _isUpdateSchedule = isUpdateSchedule;
}

bool JSScheduleWrapper::isUpdateSchedule()
{
    return _isUpdateSchedule;
}

bool js_CCNode_unschedule(JSContext *cx, uint32_t argc, jsval *vp)
{
    if (argc == 1) {
		jsval *argv = JS_ARGV(cx, vp);
        
        JSObject *obj = JS_THIS_OBJECT(cx, vp);
		js_proxy_t *proxy = jsb_get_js_proxy(obj);
		cocos2d::Node *node = (cocos2d::Node *)(proxy ? proxy->ptr : NULL);
        JSB_PRECONDITION2(node, cx, false, "Invalid Native Object");
        
        Scheduler *sched = node->getScheduler();
        
        auto targetArray = JSScheduleWrapper::getTargetForSchedule(argv[0]);
        CCLOGINFO("unschedule target number: %d", targetArray->count());
        Ref* tmp = NULL;
        CCARRAY_FOREACH(targetArray, tmp)
        {
            JSScheduleWrapper* target = static_cast<JSScheduleWrapper*>(tmp);
            if (node == target->getTarget())
            {
                sched->unschedule(schedule_selector(JSScheduleWrapper::scheduleFunc), target);
                JSScheduleWrapper::removeTargetForJSObject(obj, target);
                break;
            }
        }
        
        JS_SET_RVAL(cx, vp, JSVAL_VOID);
    }
    return true;
}

bool js_cocos2dx_CCNode_unscheduleAllSelectors(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::Node* cobj = (cocos2d::Node *)(proxy ? proxy->ptr : NULL);
	TEST_NATIVE_OBJECT(cx, cobj)
    
    if (argc == 0)
    {
        cobj->unscheduleAllSelectors();

        __Array *arr = JSScheduleWrapper::getTargetForJSObject(obj);
		// If there aren't any targets, just return true.
		// Otherwise, the for loop will break immediately. 
		// It will lead to logic errors. 
		// For details to reproduce it, please refer to SchedulerTest/SchedulerUpdate.
        if(! arr) return true;
        JSScheduleWrapper* wrapper = NULL;
        for(ssize_t i = 0; i < arr->count(); ++i) {
            wrapper = (JSScheduleWrapper*)arr->getObjectAtIndex(i);
            if(wrapper) {
                cobj->getScheduler()->unscheduleAllForTarget(wrapper);
            }
        }
        
        JSScheduleWrapper::removeAllTargetsForJSObject(obj);
        
        JS_SET_RVAL(cx, vp, JSVAL_VOID);
        return true;
    }
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return false;
}

bool js_CCNode_scheduleOnce(JSContext *cx, uint32_t argc, jsval *vp)
{
    if (argc >= 1) {
        bool ok = true;
		jsval *argv = JS_ARGV(cx, vp);
        
        JSObject *obj = JS_THIS_OBJECT(cx, vp);
		js_proxy_t *proxy = jsb_get_js_proxy(obj);
		cocos2d::Node *node = (cocos2d::Node *)(proxy ? proxy->ptr : NULL);
        
        Scheduler *sched = node->getScheduler();
        
        JSScheduleWrapper *tmpCobj = NULL;

        //
        // delay
        //
        double delay;
        if( argc >= 2 ) {
            ok &= JS::ToNumber(cx, JS::RootedValue(cx, argv[1]), &delay );
            JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        }
        
        bool bFound = false;
        auto pTargetArr = JSScheduleWrapper::getTargetForJSObject(obj);
        Ref* pObj = NULL;
        CCARRAY_FOREACH(pTargetArr, pObj)
        {
            JSScheduleWrapper* pTarget = static_cast<JSScheduleWrapper*>(pObj);
            if (argv[0] == pTarget->getJSCallbackFunc())
            {
                tmpCobj = pTarget;
                bFound = true;
                break;
            }
        }

        if (!bFound)
        {
            tmpCobj = new JSScheduleWrapper();
            tmpCobj->autorelease();
            tmpCobj->setJSCallbackThis(OBJECT_TO_JSVAL(obj));
            tmpCobj->setJSCallbackFunc(argv[0]);
            tmpCobj->setTarget(node);

            JSScheduleWrapper::setTargetForSchedule(argv[0], tmpCobj);
            JSScheduleWrapper::setTargetForJSObject(obj, tmpCobj);
        }

        if(argc == 1) {
            sched->schedule(schedule_selector(JSScheduleWrapper::scheduleFunc), tmpCobj, 0, 0, 0.0f, !node->isRunning());
        } else {
            sched->schedule(schedule_selector(JSScheduleWrapper::scheduleFunc), tmpCobj, 0, 0, delay, !node->isRunning());
        }

		/* We shouldn't set the js callback function to reserved slot,
		   since the target object may execute more than one schedule.
		   Therefore, previous js callback function will be replaced 
		   by the current one. For example:
		      this.scheduleOnce(function() { temporary function 1 }, 0.5);
		      this.scheduleOnce(function() { temporary function 2 }, 0.5);
		   In this case, the temporary function 1 will be removed from reserved slot 0.
		   And temporary function 2 will be set to reserved slot 0 of this object.
		   If gc is triggered before the 'JSScheduleWrapper::scheduleFunc' is invoked, 
		   crash will happen. You could simply reproduce it by adding '__jsc__.garbageCollect();' after scheduleOnce.
		   
		   [Solution] Because one schedule corresponds to one JSScheduleWrapper, we root 
		   the js callback function in JSScheduleWrapper::setJSCallbackFunc and unroot it 
		   at the destructor of JSScheduleWrapper.
		*/
        //jsb_set_reserved_slot(proxy->obj, 0, argv[0]);

        JS_SET_RVAL(cx, vp, JSVAL_VOID);
        return true;
    }
    JS_ReportError(cx, "wrong number of arguments");
    return false;
}

bool js_CCNode_schedule(JSContext *cx, uint32_t argc, jsval *vp)
{
    if (argc >= 1) {
        bool ok = true;
		jsval *argv = JS_ARGV(cx, vp);
        
        JSObject *obj = JS_THIS_OBJECT(cx, vp);
		js_proxy_t *proxy = jsb_get_js_proxy(obj);
		cocos2d::Node *node = (cocos2d::Node *)(proxy ? proxy->ptr : NULL);
        Scheduler *sched = node->getScheduler();

        JSScheduleWrapper *tmpCobj = NULL;

    	double interval = 0.0;
        if( argc >= 2 ) {
            ok &= JS::ToNumber(cx, JS::RootedValue(cx, argv[1]), &interval );
        }
        
        //
        // repeat
        //
        double repeat = 0.0;
        if( argc >= 3 ) {
            ok &= JS::ToNumber(cx, JS::RootedValue(cx, argv[2]), &repeat );
        }
        
        //
        // delay
        //
        double delay = 0.0;
        if( argc >= 4 ) {
            ok &= JS::ToNumber(cx, JS::RootedValue(cx, argv[3]), &delay );
        }
        
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
        bool bFound = false;
        auto pTargetArr = JSScheduleWrapper::getTargetForJSObject(obj);
        Ref* pObj = NULL;
        CCARRAY_FOREACH(pTargetArr, pObj)
        {
            JSScheduleWrapper* pTarget = static_cast<JSScheduleWrapper*>(pObj);
            if (argv[0] == pTarget->getJSCallbackFunc())
            {
                tmpCobj = pTarget;
                bFound = true;
                break;
            }
        }

        if (!bFound)
        {
            tmpCobj = new JSScheduleWrapper();
            tmpCobj->autorelease();
            tmpCobj->setJSCallbackThis(OBJECT_TO_JSVAL(obj));
            tmpCobj->setJSCallbackFunc(argv[0]);
            tmpCobj->setTarget(node);
            JSScheduleWrapper::setTargetForSchedule(argv[0], tmpCobj);        
            JSScheduleWrapper::setTargetForJSObject(obj, tmpCobj);
        }
        
        if(argc == 1) {
            sched->schedule(schedule_selector(JSScheduleWrapper::scheduleFunc), tmpCobj, 0, !node->isRunning());
        } if(argc == 2) {
            sched->schedule(schedule_selector(JSScheduleWrapper::scheduleFunc), tmpCobj, interval, !node->isRunning());
        } if(argc == 3) {
            sched->schedule(schedule_selector(JSScheduleWrapper::scheduleFunc), tmpCobj, interval, (unsigned int)repeat, 0, !node->isRunning());
        } if (argc == 4) {
            sched->schedule(schedule_selector(JSScheduleWrapper::scheduleFunc), tmpCobj, interval, (unsigned int)repeat, delay, !node->isRunning());
        }
		
        // I comment next line with the same reason in the js_CCNode_scheduleOnce.
        //jsb_set_reserved_slot(proxy->obj, 0, argv[0]);

        JS_SET_RVAL(cx, vp, JSVAL_VOID);
        return true;
    }
    JS_ReportError(cx, "wrong number of arguments");
    return false;
}

bool js_cocos2dx_CCNode_scheduleUpdateWithPriority(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	bool ok = true;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::Node* cobj = (cocos2d::Node *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "Invalid Native Object");
	if (argc == 1) {
		int arg0 = 0;
		ok &= jsval_to_int32(cx, argv[0], (int32_t *)&arg0);
		JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
        bool isFoundUpdate = false;
        ok = JS_HasProperty(cx, obj, "update", &isFoundUpdate);
        JS::RootedValue jsUpdateFunc(cx);
        if (ok && isFoundUpdate) {
            ok = JS_GetProperty(cx, obj, "update", &jsUpdateFunc);
        }
        
        // if no 'update' property, return true directly.
        if (!ok) {
            JS_SET_RVAL(cx, vp, JSVAL_VOID);
            return true;
        }
        
        JSScheduleWrapper* tmpCobj = NULL;
        
        bool bFound = false;
        auto pTargetArr = JSScheduleWrapper::getTargetForJSObject(obj);
        Ref* pObj = NULL;
        CCARRAY_FOREACH(pTargetArr, pObj)
        {
            JSScheduleWrapper* pTarget = static_cast<JSScheduleWrapper*>(pObj);
            if (jsUpdateFunc == pTarget->getJSCallbackFunc())
            {
                tmpCobj = pTarget;
                bFound = true;
                break;
            }
        }
        
        if (!bFound)
        {
            tmpCobj = new JSScheduleWrapper();
            tmpCobj->autorelease();
            tmpCobj->setJSCallbackThis(OBJECT_TO_JSVAL(obj));
            tmpCobj->setJSCallbackFunc(jsUpdateFunc);
            tmpCobj->setTarget(cobj);
            tmpCobj->setUpdateSchedule(true);
            JSScheduleWrapper::setTargetForSchedule(jsUpdateFunc, tmpCobj);
            JSScheduleWrapper::setTargetForJSObject(obj, tmpCobj);
        }
        
        tmpCobj->setPriority(arg0);
        cobj->getScheduler()->scheduleUpdate(tmpCobj, arg0, !cobj->isRunning());
        
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return true;
	}
    
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_cocos2dx_CCNode_unscheduleUpdate(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::Node* cobj = (cocos2d::Node *)(proxy ? proxy->ptr : NULL);
	TEST_NATIVE_OBJECT(cx, cobj)
    
    if (argc == 0)
    {
        cobj->unscheduleUpdate();
        do {
			JSObject *tmpObj = obj;
            
            __Array *arr = JSScheduleWrapper::getTargetForJSObject(tmpObj);
			// If there aren't any targets, just return true.
			// Otherwise, the for loop will break immediately.
			// It will lead to logic errors.
			// For details to reproduce it, please refer to SchedulerTest/SchedulerUpdate.
            if(! arr) return true;
            
            JSScheduleWrapper* wrapper = NULL;
            for(ssize_t i = 0; i < arr->count(); ++i) {
                wrapper = (JSScheduleWrapper*)arr->getObjectAtIndex(i);
                if(wrapper && wrapper->isUpdateSchedule()) {
                    cobj->getScheduler()->unscheduleUpdate(wrapper);
                    CCASSERT(OBJECT_TO_JSVAL(tmpObj) == wrapper->getJSCallbackThis(), "Wrong target object.");
                    JSScheduleWrapper::removeTargetForJSObject(tmpObj, wrapper);
                    break;
                }
            }
		} while (0);
        
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return true;
    }
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return false;
}

bool js_cocos2dx_CCNode_scheduleUpdate(JSContext *cx, uint32_t argc, jsval *vp)
{
	bool ok = true;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::Node* cobj = (cocos2d::Node *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "Invalid Native Object");
	if (argc == 0) {
        
        bool isFoundUpdate = false;
        ok = JS_HasProperty(cx, obj, "update", &isFoundUpdate);
        JS::RootedValue jsUpdateFunc(cx);
        if (ok && isFoundUpdate) {
            ok = JS_GetProperty(cx, obj, "update", &jsUpdateFunc);
        }
        
        // if no 'update' property, return true directly.
        if (!ok) {
            JS_SET_RVAL(cx, vp, JSVAL_VOID);
            return true;
        }
        
        JSScheduleWrapper* tmpCobj = NULL;
        
        bool bFound = false;
        auto pTargetArr = JSScheduleWrapper::getTargetForJSObject(obj);
        Ref* pObj = NULL;
        CCARRAY_FOREACH(pTargetArr, pObj)
        {
            JSScheduleWrapper* pTarget = static_cast<JSScheduleWrapper*>(pObj);
            if (jsUpdateFunc == pTarget->getJSCallbackFunc())
            {
                tmpCobj = pTarget;
                bFound = true;
                break;
            }
        }
        
        if (!bFound)
        {
            tmpCobj = new JSScheduleWrapper();
            tmpCobj->autorelease();
            tmpCobj->setJSCallbackThis(OBJECT_TO_JSVAL(obj));
            tmpCobj->setJSCallbackFunc(jsUpdateFunc);
            tmpCobj->setTarget(cobj);
            tmpCobj->setUpdateSchedule(true);
            JSScheduleWrapper::setTargetForSchedule(jsUpdateFunc, tmpCobj);
            JSScheduleWrapper::setTargetForJSObject(obj, tmpCobj);
        }
        
        cobj->getScheduler()->scheduleUpdate(tmpCobj, 0, !cobj->isRunning());
        
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return true;
	}
    
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_cocos2dx_CCScheduler_unscheduleAllSelectorsForTarget(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::Scheduler* cobj = (cocos2d::Scheduler *)(proxy ? proxy->ptr : NULL);
	TEST_NATIVE_OBJECT(cx, cobj)
    
	if (argc == 1) {
		do {
			JSObject *tmpObj = JSVAL_TO_OBJECT(argv[0]);
            
            __Array *arr = JSScheduleWrapper::getTargetForJSObject(tmpObj);
			// If there aren't any targets, just return true.
			// Otherwise, the for loop will break immediately.
			// It will lead to logic errors.
			// For details to reproduce it, please refer to SchedulerTest/SchedulerUpdate.
            if(! arr) return true;
            
            JSScheduleWrapper* wrapper = NULL;
            for(ssize_t i = 0; i < arr->count(); ++i) {
                wrapper = (JSScheduleWrapper*)arr->getObjectAtIndex(i);
                if(wrapper) {
                    cobj->unscheduleAllForTarget(wrapper);
                }
            }
            JSScheduleWrapper::removeAllTargetsForJSObject(tmpObj);
            
		} while (0);
        
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return true;
	}
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_CCScheduler_scheduleUpdateForTarget(JSContext *cx, uint32_t argc, jsval *vp)
{
    if (argc >= 1) {
        bool ok = true;
		jsval *argv = JS_ARGV(cx, vp);
        
        JSObject *obj = JS_THIS_OBJECT(cx, vp);
		js_proxy_t *proxy = jsb_get_js_proxy(obj);
		cocos2d::Scheduler *sched = (cocos2d::Scheduler *)(proxy ? proxy->ptr : NULL);
        
        JSScheduleWrapper *tmpCObj = NULL;
        
        JSObject *tmpObj = JSVAL_TO_OBJECT(argv[0]);
        proxy = jsb_get_js_proxy(tmpObj);
        bool isPureJSTarget = proxy ? false : true;
        
        bool isFoundUpdate = false;
        ok = JS_HasProperty(cx, tmpObj, "update", &isFoundUpdate);
        JS::RootedValue jsUpdateFunc(cx);
        if (ok && isFoundUpdate) {
            ok = JS_GetProperty(cx, tmpObj, "update", &jsUpdateFunc);
        }
        
        // if no 'update' property, return true directly.
        if (!ok) {
            JS_SET_RVAL(cx, vp, JSVAL_VOID);
            return true;
        }
        
        int arg1 = 0;
        if (argc >= 2) {
            ok &= jsval_to_int32(cx, argv[1], (int32_t *)&arg1);
        }

        bool paused = false;
        
        if( argc >= 3 ) {
            paused = JS::ToBoolean(JS::RootedValue(cx, argv[2]));
        }
        
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
        bool bFound = false;
        auto pTargetArr = JSScheduleWrapper::getTargetForJSObject(tmpObj);
        Ref* pObj = NULL;
        CCARRAY_FOREACH(pTargetArr, pObj)
        {
            JSScheduleWrapper* pTarget = static_cast<JSScheduleWrapper*>(pObj);
            if (jsUpdateFunc == pTarget->getJSCallbackFunc())
            {
                tmpCObj = pTarget;
                bFound = true;
                break;
            }
        }
        
        if (!bFound)
        {
            tmpCObj = new JSScheduleWrapper();
            tmpCObj->autorelease();
            tmpCObj->setJSCallbackThis(argv[0]);
            tmpCObj->setJSCallbackFunc(jsUpdateFunc);
            tmpCObj->setUpdateSchedule(true);
            if (isPureJSTarget) {
                tmpCObj->setPureJSTarget(tmpObj);
            }
            
            JSScheduleWrapper::setTargetForSchedule(jsUpdateFunc, tmpCObj);
            JSScheduleWrapper::setTargetForJSObject(tmpObj, tmpCObj);
        }
        tmpCObj->setPriority(arg1);
        sched->scheduleUpdate(tmpCObj, arg1, paused);
        
        JS_SET_RVAL(cx, vp, JSVAL_VOID);
        return true;
    }
    JS_ReportError(cx, "wrong number of arguments");
    return false;
}

bool js_CCScheduler_unscheduleUpdateForTarget(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::Scheduler* cobj = (cocos2d::Scheduler *)(proxy ? proxy->ptr : NULL);
	TEST_NATIVE_OBJECT(cx, cobj)
    
	if (argc == 1) {
		do {
			JSObject *tmpObj = JSVAL_TO_OBJECT(argv[0]);
            
            __Array *arr = JSScheduleWrapper::getTargetForJSObject(tmpObj);
			// If there aren't any targets, just return true.
			// Otherwise, the for loop will break immediately.
			// It will lead to logic errors.
			// For details to reproduce it, please refer to SchedulerTest/SchedulerUpdate.
            if(! arr) return true;
            
            JSScheduleWrapper* wrapper = NULL;
            for(ssize_t i = 0; i < arr->count(); ++i) {
                wrapper = (JSScheduleWrapper*)arr->getObjectAtIndex(i);
                if(wrapper && wrapper->isUpdateSchedule()) {
                    cobj->unscheduleUpdate(wrapper);
                    CCASSERT(argv[0] == wrapper->getJSCallbackThis(), "Wrong target object.");
                    JSScheduleWrapper::removeTargetForJSObject(tmpObj, wrapper);
                    break;
                }
            }
		} while (0);
        
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return true;
	}
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_CCScheduler_schedule(JSContext *cx, uint32_t argc, jsval *vp)
{
    if (argc >= 2) {
        bool ok = true;
		jsval *argv = JS_ARGV(cx, vp);
        
        JSObject *obj = JS_THIS_OBJECT(cx, vp);
		js_proxy_t *proxy = jsb_get_js_proxy(obj);
		cocos2d::Scheduler *sched = (cocos2d::Scheduler *)(proxy ? proxy->ptr : NULL);
        
        JSScheduleWrapper *tmpCObj = NULL;
        
        JSObject *tmpObj = JSVAL_TO_OBJECT(argv[0]);
        proxy = jsb_get_js_proxy(tmpObj);
        bool isPureJSTarget = proxy ? false : true;
        
    	double interval = 0;
        if( argc >= 3 ) {
            ok &= JS::ToNumber(cx, JS::RootedValue(cx, argv[2]), &interval );
        }
        
        //
        // repeat
        //
        double repeat = kRepeatForever;
        if( argc >= 4 ) {
            ok &= JS::ToNumber(cx, JS::RootedValue(cx, argv[3]), &repeat );
        }
        
        //
        // delay
        //
        double delay = 0;
        if( argc >= 5 ) {
            ok &= JS::ToNumber(cx, JS::RootedValue(cx, argv[4]), &delay );
        }
        
        bool paused = false;
        
        if( argc >= 6 ) {
            paused = JS::ToBoolean(JS::RootedValue(cx,  argv[5]));
        }
        
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
        bool bFound = false;
        auto pTargetArr = JSScheduleWrapper::getTargetForJSObject(tmpObj);
        Ref* pObj = NULL;
        CCARRAY_FOREACH(pTargetArr, pObj)
        {
            JSScheduleWrapper* pTarget = static_cast<JSScheduleWrapper*>(pObj);
            if (argv[1] == pTarget->getJSCallbackFunc())
            {
                tmpCObj = pTarget;
                bFound = true;
                break;
            }
        }

        if (!bFound)
        {
            tmpCObj = new JSScheduleWrapper();
            tmpCObj->autorelease();
            tmpCObj->setJSCallbackThis(argv[0]);
            tmpCObj->setJSCallbackFunc(argv[1]);
            if (isPureJSTarget) {
                tmpCObj->setPureJSTarget(tmpObj);
            }
            
            JSScheduleWrapper::setTargetForSchedule(argv[1], tmpCObj);
            JSScheduleWrapper::setTargetForJSObject(tmpObj, tmpCObj);
        }
        
        sched->schedule(schedule_selector(JSScheduleWrapper::scheduleFunc), tmpCObj, interval, repeat, delay, paused);
                
        JS_SET_RVAL(cx, vp, JSVAL_VOID);
        return true;
    }
    JS_ReportError(cx, "wrong number of arguments");
    return false;
}

bool js_CCScheduler_unscheduleCallbackForTarget(JSContext *cx, uint32_t argc, jsval *vp)
{
    jsval *argv = JS_ARGV(cx, vp);
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::Scheduler* cobj = (cocos2d::Scheduler *)(proxy ? proxy->ptr : NULL);
	TEST_NATIVE_OBJECT(cx, cobj)
    
	if (argc == 2) {
		do {
			JSObject *tmpObj = JSVAL_TO_OBJECT(argv[0]);
            
            __Array *arr = JSScheduleWrapper::getTargetForJSObject(tmpObj);
			// If there aren't any targets, just return true.
			// Otherwise, the for loop will break immediately.
			// It will lead to logic errors.
			// For details to reproduce it, please refer to SchedulerTest/SchedulerUpdate.
            if(! arr) return true;
            
            JSScheduleWrapper* wrapper = NULL;
            for(ssize_t i = 0; i < arr->count(); ++i) {
                wrapper = (JSScheduleWrapper*)arr->getObjectAtIndex(i);
                if(wrapper && wrapper->getJSCallbackFunc() == argv[1]) {
                    cobj->unschedule(schedule_selector(JSScheduleWrapper::scheduleFunc), wrapper);
                    JSScheduleWrapper::removeTargetForJSObject(tmpObj, wrapper);
                    break;
                }
            }
		} while (0);
        
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return true;
	}
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_cocos2dx_CCScheduler_unscheduleAll(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::Scheduler* cobj = (cocos2d::Scheduler *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "Invalid Native Object");
	if (argc == 0) {
        cobj->unscheduleAll();
        JSScheduleWrapper::removeAllTargets();
        JS_SET_RVAL(cx, vp, JSVAL_VOID);
        return true;
	}
    
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_cocos2dx_CCScheduler_unscheduleAllCallbacksWithMinPriority(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	bool ok = true;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::Scheduler* cobj = (cocos2d::Scheduler *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "Invalid Native Object");
	if (argc == 1) {
		int arg0;
		ok &= jsval_to_int32(cx, argv[0], (int32_t *)&arg0);
		JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
		cobj->unscheduleAllWithMinPriority(arg0);
        JSScheduleWrapper::removeAllTargetsForMinPriority(arg0);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return true;
	}
    
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}


bool js_cocos2dx_CCScheduler_pauseTarget(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
    JSObject *obj = JS_THIS_OBJECT(cx, vp);
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    cocos2d::Scheduler *sched = (cocos2d::Scheduler *)(proxy ? proxy->ptr : NULL);
    
	if (argc == 1) {
		do {
			JSObject *tmpObj = JSVAL_TO_OBJECT(argv[0]);
            __Array *arr = JSScheduleWrapper::getTargetForJSObject(tmpObj);
            if(! arr) return true;
            for(ssize_t i = 0; i < arr->count(); ++i) {
                if(arr->getObjectAtIndex(i)) {
                    sched->pauseTarget(arr->getObjectAtIndex(i));
                }
            }

		} while (0);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return true;
	}
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_cocos2dx_CCScheduler_resumeTarget(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
    JSObject *obj = JS_THIS_OBJECT(cx, vp);
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    cocos2d::Scheduler *sched = (cocos2d::Scheduler *)(proxy ? proxy->ptr : NULL);
    
	if (argc == 1) {
		do {
			JSObject *tmpObj = JSVAL_TO_OBJECT(argv[0]);
            auto arr = JSScheduleWrapper::getTargetForJSObject(tmpObj);
            if(! arr) return true;
            for(ssize_t i = 0; i < arr->count(); ++i) {
                if(arr->getObjectAtIndex(i)) {
                    sched->resumeTarget(arr->getObjectAtIndex(i));
                }
            }
            
		} while (0);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return true;
	}
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_cocos2dx_CCScheduler_isTargetPaused(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::Scheduler* cobj = (cocos2d::Scheduler *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "Invalid Native Object");
	if (argc == 1) {
        bool ret = false;
		do {
			JSObject *tmpObj = JSVAL_TO_OBJECT(argv[0]);
            __Array *arr = JSScheduleWrapper::getTargetForJSObject(tmpObj);
            if(! arr) return true;
            for(ssize_t i = 0; i < arr->count(); ++i) {
                if(arr->getObjectAtIndex(i)) {
                    ret = cobj->isTargetPaused(arr->getObjectAtIndex(i)) ? true : false;
                    // break directly since all targets have the same `pause` status.
                    break;
                }
            }
		} while (0);
        JS_SET_RVAL(cx, vp, BOOLEAN_TO_JSVAL(ret));
		return true;
	}
    
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_doNothing(JSContext *cx, uint32_t argc, jsval *vp) {
    return true;
}

bool js_forceGC(JSContext *cx, uint32_t argc, jsval *vp) {
    JSRuntime *rt = JS_GetRuntime(cx);
    JS_GC(rt);
    return true;
}

bool js_cocos2dx_retain(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *thisObj = JS_THIS_OBJECT(cx, vp);
	if (thisObj) {
		js_proxy_t *proxy = jsb_get_js_proxy(thisObj);
		if (proxy) {
			((Ref *)proxy->ptr)->retain();
			return true;
		}
	}
    JS_ReportError(cx, "Invalid Native Object.");
	return false;
}

bool js_cocos2dx_release(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *thisObj = JS_THIS_OBJECT(cx, vp);
	if (thisObj) {
		js_proxy_t *proxy = jsb_get_js_proxy(thisObj);
		if (proxy) {
			((Ref *)proxy->ptr)->release();
			return true;
		}
	}
    JS_ReportError(cx, "Invalid Native Object.");
	return false;
}

bool js_cocos2dx_Node_onEnter(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *thisObj = JS_THIS_OBJECT(cx, vp);
	if (thisObj) {
		js_proxy_t *proxy = jsb_get_js_proxy(thisObj);
		if (proxy) {
            ScriptingCore::getInstance()->setCalledFromScript(true);
			static_cast<Node*>(proxy->ptr)->onEnter();
			return true;
		}
	}
    JS_ReportError(cx, "Invalid Native Object.");
	return false;
}

bool js_cocos2dx_Node_onExit(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *thisObj = JS_THIS_OBJECT(cx, vp);
	if (thisObj) {
		js_proxy_t *proxy = jsb_get_js_proxy(thisObj);
		if (proxy) {
            ScriptingCore::getInstance()->setCalledFromScript(true);
			static_cast<Node*>(proxy->ptr)->onExit();
			return true;
		}
	}
    JS_ReportError(cx, "Invalid Native Object.");
	return false;
}

bool js_cocos2dx_Node_onEnterTransitionDidFinish(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *thisObj = JS_THIS_OBJECT(cx, vp);
	if (thisObj) {
		js_proxy_t *proxy = jsb_get_js_proxy(thisObj);
		if (proxy) {
            ScriptingCore::getInstance()->setCalledFromScript(true);
			static_cast<Node*>(proxy->ptr)->onEnterTransitionDidFinish();
			return true;
		}
	}
    JS_ReportError(cx, "Invalid Native Object.");
	return false;
}

bool js_cocos2dx_Node_onExitTransitionDidStart(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *thisObj = JS_THIS_OBJECT(cx, vp);
	if (thisObj) {
		js_proxy_t *proxy = jsb_get_js_proxy(thisObj);
		if (proxy) {
            ScriptingCore::getInstance()->setCalledFromScript(true);
			static_cast<Node*>(proxy->ptr)->onExitTransitionDidStart();
			return true;
		}
	}
    JS_ReportError(cx, "Invalid Native Object.");
	return false;
}

bool js_cocos2dx_CCNode_setPosition(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
    bool ok = true;
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::Node* cobj = (cocos2d::Node *)(proxy ? proxy->ptr : NULL);
	TEST_NATIVE_OBJECT(cx, cobj)
    
	if (argc == 1) {
		cocos2d::Point arg0;
        ok &= jsval_to_ccpoint(cx, argv[0], &arg0);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
		cobj->setPosition(arg0);
        JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return true;
	} if (argc == 2) {
        double x;
        ok &= JS::ToNumber(cx, JS::RootedValue(cx, argv[0]), &x );
        double y;
        ok &= JS::ToNumber(cx, JS::RootedValue(cx, argv[1]), &y );
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
        cobj->setPosition(Point(x,y));
        JS_SET_RVAL(cx, vp, JSVAL_VOID);
        return true;
    }
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_cocos2dx_CCNode_setContentSize(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
    bool ok = true;
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::Node* cobj = (cocos2d::Node *)(proxy ? proxy->ptr : NULL);
	TEST_NATIVE_OBJECT(cx, cobj)
    
	if (argc == 1) {
		cocos2d::Size arg0;
        ok &= jsval_to_ccsize(cx, argv[0], &arg0);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
		cobj->setContentSize(arg0);
        JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return true;
	} if (argc == 2) {
        double width;
        ok &= JS::ToNumber(cx, JS::RootedValue(cx, argv[0]), &width );
        double height;
        ok &= JS::ToNumber(cx, JS::RootedValue(cx, argv[1]), &height );
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
        cobj->setContentSize(Size(width,height));
        JS_SET_RVAL(cx, vp, JSVAL_VOID);
        return true;
    }
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_cocos2dx_CCNode_setAnchorPoint(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs argv = JS::CallArgsFromVp(argc, vp);
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
    bool ok = true;
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::Node* cobj = (cocos2d::Node *)(proxy ? proxy->ptr : NULL);
	TEST_NATIVE_OBJECT(cx, cobj)
    
	if (argc == 1) {
		cocos2d::Point arg0;
        ok &= jsval_to_ccpoint(cx, argv[0], &arg0);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
		cobj->setAnchorPoint(arg0);
        JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return true;
	} if (argc == 2) {
        double x;
        ok &= JS::ToNumber(cx, argv[0], &x );
        double y;
        ok &= JS::ToNumber(cx, argv[1], &y );
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
        cobj->setAnchorPoint(Point(x,y));
        JS_SET_RVAL(cx, vp, JSVAL_VOID);
        return true;
    }
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_cocos2dx_CCNode_setColor(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	bool ok = true;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::Node* cobj = (cocos2d::Node *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_Node_setColor : Invalid Native Object");
	if (argc == 1) {
		cocos2d::Color3B arg0;
		ok &= jsval_to_cccolor3b(cx, argv[0], &arg0);
		JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_Node_setColor : Error processing arguments");
		cobj->setColor(arg0);
        
        int32_t alpha;
		ok &= jsval_cccolor_to_opacity(cx, argv[0], &alpha);
        if (ok) {
            cobj->setOpacity(alpha);
        }
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return true;
	}
    
	JS_ReportError(cx, "js_cocos2dx_Node_setColor : wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_cocos2dx_Component_onEnter(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *thisObj = JS_THIS_OBJECT(cx, vp);
	if (thisObj) {
		js_proxy_t *proxy = jsb_get_js_proxy(thisObj);
		if (proxy) {
            ScriptingCore::getInstance()->setCalledFromScript(true);
			static_cast<Component*>(proxy->ptr)->onEnter();
			return true;
		}
	}
    JS_ReportError(cx, "Invalid Native Object.");
	return false;
}

bool js_cocos2dx_Component_onExit(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *thisObj = JS_THIS_OBJECT(cx, vp);
	if (thisObj) {
		js_proxy_t *proxy = jsb_get_js_proxy(thisObj);
		if (proxy) {
            ScriptingCore::getInstance()->setCalledFromScript(true);
			static_cast<Component*>(proxy->ptr)->onExit();
			return true;
		}
	}
    JS_ReportError(cx, "Invalid Native Object.");
	return false;
}

bool js_cocos2dx_CCTMXLayer_tileFlagsAt(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSObject *obj;
    bool ok = true;
	cocos2d::TMXLayer* cobj;
	obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cobj = (cocos2d::TMXLayer *)(proxy ? proxy->ptr : NULL);
	TEST_NATIVE_OBJECT(cx, cobj)
    
	if (argc == 1) {
		cocos2d::Point arg0;
		ok &= jsval_to_ccpoint(cx, argv[0], &arg0);
		cocos2d::TMXTileFlags flags = kTMXTileHorizontalFlag;
		jsval jsret;
        jsret = UINT_TO_JSVAL((uint32_t)flags);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
	}
    JS_ReportError(cx, "wrong number of arguments");
    return false;
}

bool js_cocos2dx_CCTMXLayer_getTiles(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::TMXLayer* cobj = (cocos2d::TMXLayer *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "Invalid Native Object");
	if (argc == 0) {
        uint32_t* ret = cobj->getTiles();
        Size size = cobj->getLayerSize();
        int count = size.width * size.height;
        JSObject* array = JS_NewUint32Array(cx, count);
        if (NULL == array) {
            JS_ReportError(cx, "Can't allocate enough memory.");
            return false;
        }
        uint32_t* bufdata = (uint32_t*)JS_GetArrayBufferViewData(array);
        memcpy(bufdata, ret, count*sizeof(int32_t));
        JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(array));
		return true;
	}
    
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return false;
}


// Actions

bool js_cocos2dx_ActionInterval_repeat(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::ActionInterval* cobj = (cocos2d::ActionInterval *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_ActionInterval_repeat : Invalid Native Object");
    
    JS::CallArgs argv = JS::CallArgsFromVp(argc, vp);
	if (argc == 1)
    {
        double times;
        if( ! JS::ToNumber(cx, argv[0], &times) ) {
            return false;
        }
        int timesInt = (int)times;
        if (timesInt <= 0) {
            JS_ReportError(cx, "js_cocos2dx_ActionInterval_repeat : Repeat times must be greater than 0");
        }
        
        cocos2d::Repeat* action = cocos2d::Repeat::create(cobj, timesInt);
        // Unbind current proxy binding
        JS_RemoveObjectRoot(cx, &proxy->obj);
        jsb_remove_proxy(jsb_get_native_proxy(cobj), proxy);
        // Rebind js obj with new action
        js_proxy_t* newProxy = jsb_new_proxy(action, obj);
        JS_AddNamedObjectRoot(cx, &newProxy->obj, "cocos2d::Repeat");
        
		JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(obj));
		return true;
	}
    
	JS_ReportError(cx, "js_cocos2dx_ActionInterval_repeat : wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_cocos2dx_ActionInterval_repeatForever(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::ActionInterval* cobj = (cocos2d::ActionInterval *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_ActionInterval_repeatForever : Invalid Native Object");
    
	if (argc == 0) {
        cocos2d::RepeatForever* action = cocos2d::RepeatForever::create(cobj);
        // Unbind current proxy binding
        JS_RemoveObjectRoot(cx, &proxy->obj);
        jsb_remove_proxy(jsb_get_native_proxy(cobj), proxy);
        // Rebind js obj with new action
        js_proxy_t* newProxy = jsb_new_proxy(action, obj);
        JS_AddNamedObjectRoot(cx, &newProxy->obj, "cocos2d::RepeatForever");
        
		JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(obj));
		return true;
	}
    
	JS_ReportError(cx, "js_cocos2dx_ActionInterval_repeatForever : wrong number of arguments: %d, was expecting %d", argc, 0);
	return false;
}

bool js_cocos2dx_ActionInterval_speed(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::ActionInterval* cobj = (cocos2d::ActionInterval *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_ActionInterval_speed : Invalid Native Object");
    
    JS::CallArgs argv = JS::CallArgsFromVp(argc, vp);
	if (argc == 1)
    {
        double speed;
        if( ! JS::ToNumber(cx, argv[0], &speed) ) {
            return false;
        }
        if (speed <= 0) {
            JS_ReportError(cx, "js_cocos2dx_ActionInterval_repeat : Speed must be greater than 0");
        }
        
        cocos2d::Speed* action = cocos2d::Speed::create(cobj, speed);
        // Unbind current proxy binding
        JS_RemoveObjectRoot(cx, &proxy->obj);
        jsb_remove_proxy(jsb_get_native_proxy(cobj), proxy);
        // Rebind js obj with new action
        js_proxy_t* newProxy = jsb_new_proxy(action, obj);
        JS_AddNamedObjectRoot(cx, &newProxy->obj, "cocos2d::Speed");
        
		JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(obj));
		return true;
	}
    
	JS_ReportError(cx, "js_cocos2dx_ActionInterval_speed : wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

enum ACTION_TAG {
    EASE_IN = 0,
    EASE_OUT,
    EASE_INOUT,
    EASE_EXPONENTIAL_IN,
    EASE_EXPONENTIAL_OUT,
    EASE_EXPONENTIAL_INOUT,
    EASE_SINE_IN,
    EASE_SINE_OUT,
    EASE_SINE_INOUT,
    EASE_ELASTIC_IN,
    EASE_ELASTIC_OUT,
    EASE_ELASTIC_INOUT,
    EASE_BOUNCE_IN,
    EASE_BOUNCE_OUT,
    EASE_BOUNCE_INOUT,
    EASE_BACK_IN,
    EASE_BACK_OUT,
    EASE_BACK_INOUT,
    
    EASE_BEZIER_ACTION,
    EASE_QUADRATIC_IN,
    EASE_QUADRATIC_OUT,
    EASE_QUADRATIC_INOUT,
    EASE_QUARTIC_IN,
    EASE_QUARTIC_OUT,
    EASE_QUARTIC_INOUT,
    EASE_QUINTIC_IN,
    EASE_QUINTIC_OUT,
    EASE_QUINTIC_INOUT,
    EASE_CIRCLE_IN,
    EASE_CIRCLE_OUT,
    EASE_CIRCLE_INOUT,
    EASE_CUBIC_IN,
    EASE_CUBIC_OUT,
    EASE_CUBIC_INOUT
};

bool js_cocos2dx_ActionInterval_easing(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::ActionInterval* cobj = (cocos2d::ActionInterval *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_ActionInterval_easing : Invalid Native Object");
    
    cocos2d::ActionInterval* currentAction = cobj;
    JS::CallArgs argv = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject tmp(cx);
    JS::RootedValue jsTag(cx);
    JS::RootedValue jsParam(cx);
    double tag;
    double parameter;

    for (int i = 0; i < argc; i++)
    {
        jsval vpi = argv[i];
        bool ok = vpi.isObject() &&
            JS_ValueToObject(cx, JS::RootedValue(cx, vpi), &tmp) &&
            JS_GetProperty(cx, tmp, "tag", &jsTag) &&
            JS::ToNumber(cx, jsTag, &tag);
        JS_GetProperty(cx, tmp, "parameter", &jsParam) && JS::ToNumber(cx, jsParam, &parameter);
        bool hasParam = (parameter == parameter);
        if (!ok) continue;

        cocos2d::ActionEase* action;
        ok = true;
        if (tag == EASE_IN)
        {
            if (!hasParam) ok = false;
            action = cocos2d::EaseIn::create(currentAction, parameter);
        }
        else if (tag == EASE_OUT)
        {
            if (!hasParam) ok = false;
            action = cocos2d::EaseOut::create(currentAction, parameter);
        }
        else if (tag == EASE_INOUT)
        {
            if (!hasParam) ok = false;
            action = cocos2d::EaseInOut::create(currentAction, parameter);
        }
        else if (tag == EASE_EXPONENTIAL_IN)
            action = cocos2d::EaseExponentialIn::create(currentAction);
        else if (tag == EASE_EXPONENTIAL_OUT)
            action = cocos2d::EaseExponentialOut::create(currentAction);
        else if (tag == EASE_EXPONENTIAL_INOUT)
            action = cocos2d::EaseExponentialInOut::create(currentAction);
        else if (tag == EASE_SINE_IN)
            action = cocos2d::EaseSineIn::create(currentAction);
        else if (tag == EASE_SINE_OUT)
            action = cocos2d::EaseSineOut::create(currentAction);
        else if (tag == EASE_SINE_INOUT)
            action = cocos2d::EaseSineInOut::create(currentAction);
        else if (tag == EASE_ELASTIC_IN)
        {
            if (!hasParam) parameter = 0.3;
            action = cocos2d::EaseElasticIn::create(currentAction, parameter);
        }
        else if (tag == EASE_ELASTIC_OUT)
        {
            if (!hasParam) parameter = 0.3;
            action = cocos2d::EaseElasticOut::create(currentAction, parameter);
        }
        else if (tag == EASE_ELASTIC_INOUT)
        {
            if (!hasParam) parameter = 0.3;
            action = cocos2d::EaseElasticInOut::create(currentAction, parameter);
        }
        else if (tag == EASE_BOUNCE_IN)
            action = cocos2d::EaseBounceIn::create(currentAction);
        else if (tag == EASE_BOUNCE_OUT)
            action = cocos2d::EaseBounceOut::create(currentAction);
        else if (tag == EASE_BOUNCE_INOUT)
            action = cocos2d::EaseBounceInOut::create(currentAction);
        else if (tag == EASE_BACK_IN)
            action = cocos2d::EaseBackIn::create(currentAction);
        else if (tag == EASE_BACK_OUT)
            action = cocos2d::EaseBackOut::create(currentAction);
        else if (tag == EASE_BACK_INOUT)
            action = cocos2d::EaseBackInOut::create(currentAction);
        
        else if (tag == EASE_QUADRATIC_IN)
            action = cocos2d::EaseQuadraticActionIn::create(currentAction);
        else if (tag == EASE_QUADRATIC_OUT)
            action = cocos2d::EaseQuadraticActionOut::create(currentAction);
        else if (tag == EASE_QUADRATIC_INOUT)
            action = cocos2d::EaseQuadraticActionInOut::create(currentAction);
        else if (tag == EASE_QUARTIC_IN)
            action = cocos2d::EaseQuarticActionIn::create(currentAction);
        else if (tag == EASE_QUARTIC_OUT)
            action = cocos2d::EaseQuarticActionOut::create(currentAction);
        else if (tag == EASE_QUARTIC_INOUT)
            action = cocos2d::EaseQuarticActionInOut::create(currentAction);
        else if (tag == EASE_QUINTIC_IN)
            action = cocos2d::EaseQuinticActionIn::create(currentAction);
        else if (tag == EASE_QUINTIC_OUT)
            action = cocos2d::EaseQuinticActionOut::create(currentAction);
        else if (tag == EASE_QUINTIC_INOUT)
            action = cocos2d::EaseQuinticActionInOut::create(currentAction);
        else if (tag == EASE_CIRCLE_IN)
            action = cocos2d::EaseCircleActionIn::create(currentAction);
        else if (tag == EASE_CIRCLE_OUT)
            action = cocos2d::EaseCircleActionOut::create(currentAction);
        else if (tag == EASE_CIRCLE_INOUT)
            action = cocos2d::EaseCircleActionInOut::create(currentAction);
        else if (tag == EASE_CUBIC_IN)
            action = cocos2d::EaseCubicActionIn::create(currentAction);
        else if (tag == EASE_CUBIC_OUT)
            action = cocos2d::EaseCubicActionOut::create(currentAction);
        else if (tag == EASE_CUBIC_INOUT)
            action = cocos2d::EaseCubicActionInOut::create(currentAction);
        else if (tag == EASE_BEZIER_ACTION)
        {
            // TODO: Extra manipulation on parameters
            action = cocos2d::EaseBezierAction::create(currentAction);
        }
        else
            continue;
        
        if (!ok || !action) {
            JS_ReportError(cx, "js_cocos2dx_ActionInterval_easing : Invalid action: At least one action was expecting parameter");
            return false;
        }
        
        currentAction = action;
    }
    
    // Unbind current proxy binding
    JS_RemoveObjectRoot(cx, &proxy->obj);
    jsb_remove_proxy(jsb_get_native_proxy(cobj), proxy);
    // Rebind js obj with new action
    js_proxy_t* newProxy = jsb_new_proxy(currentAction, obj);
    JS_AddNamedObjectRoot(cx, &newProxy->obj, "cocos2d::EaseAction");
    JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(obj));
    return true;
}


template<class T>
bool js_BezierActions_create(JSContext *cx, uint32_t argc, jsval *vp) {
	JS::CallArgs argv = JS::CallArgsFromVp(argc, vp);

    if (argc == 2) {
        double t;
        if( ! JS::ToNumber(cx, argv[0], &t) ) {
            return false;
        }
        
        int num;
        Point *arr;
        jsval_to_ccarray_of_CCPoint(cx, argv[1], &arr, &num);
        
        ccBezierConfig config;
        config.controlPoint_1 = arr[0];
        config.controlPoint_2 = arr[1];
        config.endPosition = arr[2];
        
        T* ret =  T::create(t, config);
        
        free(arr);

        jsval jsret;
		do {
			if (ret) {
				js_proxy_t *p = jsb_get_native_proxy(ret);
				if (p) {
					jsret = OBJECT_TO_JSVAL(p->obj);
				} else {
					// create a new js obj of that class
					js_proxy_t *proxy = js_get_or_create_proxy<T>(cx, ret);
					jsret = OBJECT_TO_JSVAL(proxy->obj);
				}
			} else {
				jsret = JSVAL_NULL;
			}
		} while (0);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
        
    }
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

template<class T>
bool js_BezierActions_initWithDuration(JSContext *cx, uint32_t argc, jsval *vp)
{
    jsval *argv = JS_ARGV(cx, vp);
    bool ok = true;
    JSObject *obj = JS_THIS_OBJECT(cx, vp);
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    T* cobj = (T *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_Bezier_initWithDuration : Invalid Native Object");
    if (argc == 2) {
        double arg0;
        cocos2d::_ccBezierConfig arg1;
        ok &= JS::ToNumber( cx, JS::RootedValue(cx, argv[0]), &arg0);

        int num;
        cocos2d::Vec2 *arr;
        jsval_to_ccarray_of_CCPoint(cx, argv[1], &arr, &num);

        arg1.controlPoint_1 = arr[0];
        arg1.controlPoint_2 = arr[1];
        arg1.endPosition = arr[2];

        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_Bezier_initWithDuration : Error processing arguments");
        bool ret = cobj->initWithDuration(arg0, arg1);
        free(arr);
        jsval jsret = JSVAL_NULL;
        jsret = BOOLEAN_TO_JSVAL(ret);
        JS_SET_RVAL(cx, vp, jsret);
        return true;
    }

    JS_ReportError(cx, "js_cocos2dx_BezierTo_initWithDuration : wrong number of arguments: %d, was expecting %d", argc, 2);
    return false;
}

template<class T>
bool js_CardinalSplineActions_create(JSContext *cx, uint32_t argc, jsval *vp) {
	JS::CallArgs argv = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    
    if (argc == 3) {
        double dur;
        ok &= JS::ToNumber(cx, argv[0], &dur);
        
        int num;
        Point *arr;
        ok &= jsval_to_ccarray_of_CCPoint(cx, argv[1], &arr, &num);
        
        double ten;
        ok &= JS::ToNumber(cx, argv[2], &ten);
        
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
        PointArray *points = PointArray::create(num);
        
        for( int i=0; i < num;i++) {
            points->addControlPoint(arr[i]);
        }
        
        T *ret = T::create(dur, points, ten);
        
        free(arr);
        
        jsval jsret;
		do {
			if (ret) {
				js_proxy_t *p = jsb_get_native_proxy(ret);
				if (p) {
					jsret = OBJECT_TO_JSVAL(p->obj);
				} else {
					// create a new js obj of that class
					js_proxy_t *proxy = js_get_or_create_proxy<T>(cx, ret);
					jsret = OBJECT_TO_JSVAL(proxy->obj);
				}
			} else {
				jsret = JSVAL_NULL;
			}
		} while (0);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
        
    }
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

template<class T>
bool js_CatmullRomActions_create(JSContext *cx, uint32_t argc, jsval *vp) {
	JS::CallArgs argv = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    
    if (argc == 2) {
        double dur;
        ok &= JS::ToNumber(cx, argv[0], &dur);
        
        int num;
        Point *arr;
        ok &= jsval_to_ccarray_of_CCPoint(cx, argv[1], &arr, &num);
        
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
        PointArray *points = PointArray::create(num);
        
        for( int i=0; i < num;i++) {
            points->addControlPoint(arr[i]);
        }
        
        T *ret = T::create(dur, points);
        
        free(arr);
        
        jsval jsret;
		do {
			if (ret) {
				js_proxy_t *p = jsb_get_native_proxy(ret);
				if (p) {
					jsret = OBJECT_TO_JSVAL(p->obj);
				} else {
					// create a new js obj of that class
					js_proxy_t *proxy = js_get_or_create_proxy<T>(cx, ret);
					jsret = OBJECT_TO_JSVAL(proxy->obj);
				}
			} else {
				jsret = JSVAL_NULL;
			}
		} while (0);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
        
    }
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}


bool JSB_CCBezierBy_actionWithDuration(JSContext *cx, uint32_t argc, jsval *vp) {
    return js_BezierActions_create<cocos2d::BezierBy>(cx, argc, vp);
}

bool JSB_CCBezierTo_actionWithDuration(JSContext *cx, uint32_t argc, jsval *vp) {
	return js_BezierActions_create<cocos2d::BezierTo>(cx, argc, vp);
}

bool JSB_CCBezierBy_initWithDuration(JSContext *cx, uint32_t argc, jsval *vp)
{
    return js_BezierActions_initWithDuration<cocos2d::BezierBy>(cx, argc, vp);
}

bool JSB_CCBezierTo_initWithDuration(JSContext *cx, uint32_t argc, jsval *vp)
{
    return js_BezierActions_initWithDuration<cocos2d::BezierTo>(cx, argc, vp);
}

bool JSB_CCCardinalSplineBy_actionWithDuration(JSContext *cx, uint32_t argc, jsval *vp) {
    return js_CardinalSplineActions_create<cocos2d::CardinalSplineBy>(cx, argc, vp);
}

bool JSB_CCCardinalSplineTo_actionWithDuration(JSContext *cx, uint32_t argc, jsval *vp) {
    return js_CardinalSplineActions_create<cocos2d::CardinalSplineTo>(cx, argc, vp);
}

bool JSB_CCCatmullRomBy_actionWithDuration(JSContext *cx, uint32_t argc, jsval *vp) {
    return js_CatmullRomActions_create<cocos2d::CatmullRomBy>(cx, argc, vp);
}

bool JSB_CCCatmullRomTo_actionWithDuration(JSContext *cx, uint32_t argc, jsval *vp) {
	return js_CatmullRomActions_create<cocos2d::CatmullRomTo>(cx, argc, vp);
}

bool js_cocos2dx_ccGLEnableVertexAttribs(JSContext *cx, uint32_t argc, jsval *vp)
{
    bool ok = true;
	jsval *argv = JS_ARGV(cx, vp);
    
	if (argc == 1) {
		unsigned int arg0;
		ok &= jsval_to_uint32(cx, argv[0], &arg0);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
        GL::enableVertexAttribs(arg0);
		JS_SET_RVAL(cx, vp, JSVAL_NULL);
		return true;
	}
	
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}



bool js_cocos2dx_ccpAdd(JSContext *cx, uint32_t argc, jsval *vp)
{
    bool ok = true;
	jsval *argv = JS_ARGV(cx, vp);
    
	if (argc == 2) {
		cocos2d::Point arg0;
		ok &= jsval_to_ccpoint(cx, argv[0], &arg0);
		cocos2d::Point arg1;
		ok &= jsval_to_ccpoint(cx, argv[1], &arg1);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
		Point ret = arg0 + arg1;
		
		jsval jsret = ccpoint_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
	}
	
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_cocos2dx_ccpDistanceSQ(JSContext *cx, uint32_t argc, jsval *vp)
{
    bool ok = true;
	jsval *argv = JS_ARGV(cx, vp);
    
	if (argc == 2) {
		cocos2d::Point arg0;
		ok &= jsval_to_ccpoint(cx, argv[0], &arg0);
		cocos2d::Point arg1;
		ok &= jsval_to_ccpoint(cx, argv[1], &arg1);
		
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
		float ret = arg0.getDistanceSq(arg1);
		
		jsval jsret = DOUBLE_TO_JSVAL(ret);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
	}
	
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_cocos2dx_ccpDistance(JSContext *cx, uint32_t argc, jsval *vp)
{
    bool ok = true;
	jsval *argv = JS_ARGV(cx, vp);
    
	if (argc == 2) {
		cocos2d::Point arg0;
		ok &= jsval_to_ccpoint(cx, argv[0], &arg0);
		cocos2d::Point arg1;
		ok &= jsval_to_ccpoint(cx, argv[1], &arg1);
		
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
		float ret = arg0.getDistance(arg1);
		
		jsval jsret = DOUBLE_TO_JSVAL(ret);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
	}
	
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_cocos2dx_ccpClamp(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
    bool ok = true;
	if (argc == 3) {
		cocos2d::Point arg0;
		ok &= jsval_to_ccpoint(cx, argv[0], &arg0);
		cocos2d::Point arg1;
		ok &= jsval_to_ccpoint(cx, argv[1], &arg1);
		cocos2d::Point arg2;
		ok &= jsval_to_ccpoint(cx, argv[2], &arg2);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
		Point ret = arg0.getClampPoint(arg1, arg2);
		
		jsval jsret = ccpoint_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
	}
	
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_cocos2dx_ccpLengthSQ(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
    bool ok = true;
	if (argc == 1) {
		cocos2d::Point arg0;
		ok &= jsval_to_ccpoint(cx, argv[0], &arg0);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
		float ret = arg0.getLengthSq();

		jsval jsret = DOUBLE_TO_JSVAL(ret);
		JS_SET_RVAL(cx, vp, jsret);
		return true;

	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_cocos2dx_ccpLength(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
    bool ok = true;
	if (argc == 1) {
		cocos2d::Point arg0;
        ok &= jsval_to_ccpoint(cx, argv[0], &arg0);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");

		float ret = arg0.getLength();

		jsval jsret = DOUBLE_TO_JSVAL(ret);
		JS_SET_RVAL(cx, vp, jsret);
		return true;

	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_cocos2dx_ccpNeg(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
    bool ok = true;
	if (argc == 1) {
		cocos2d::Point arg0;
        ok &= jsval_to_ccpoint(cx, argv[0], &arg0);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
		Point ret = -arg0;
		
		jsval jsret = ccpoint_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		
		return true;
	}
	
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_cocos2dx_ccpSub(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
    bool ok = true;
	if (argc == 2) {
		cocos2d::Point arg0;
		ok &= jsval_to_ccpoint(cx, argv[0], &arg0);
		cocos2d::Point arg1;
		ok &= jsval_to_ccpoint(cx, argv[1], &arg1);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
		Point ret = arg0 - arg1;
		
		jsval jsret = ccpoint_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
        
		return true;
	}
	
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_cocos2dx_ccpMult(JSContext *cx, uint32_t argc, jsval *vp)
{
	JS::CallArgs argv = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
	if (argc == 2) {
        cocos2d::Point arg0;
		ok &= jsval_to_ccpoint(cx, argv[0], &arg0);
        
		double arg1;
		ok &= JS::ToNumber(cx, argv[1], &arg1);
        
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
		
		Point ret = arg0 * arg1;
		
		jsval jsret = ccpoint_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		
		return true;
	}
	
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_cocos2dx_ccpMidpoint(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
    bool ok = true;
	if (argc == 2) {
		cocos2d::Point arg0;
		ok &= jsval_to_ccpoint(cx, argv[0], &arg0);
		cocos2d::Point arg1;
		ok &= jsval_to_ccpoint(cx, argv[1], &arg1);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
		Point ret = arg0.getMidpoint(arg1);
		
		jsval jsret = ccpoint_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
        
	}
	
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 2);
	return false;
}


bool js_cocos2dx_ccpDot(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
    bool ok = true;
	if (argc == 2) {
		cocos2d::Point arg0;
		ok &= jsval_to_ccpoint(cx, argv[0], &arg0);
		cocos2d::Point arg1;
		ok &= jsval_to_ccpoint(cx, argv[1], &arg1);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
		float ret = arg0.dot(arg1);
		
		jsval jsret = DOUBLE_TO_JSVAL(ret);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
        
	}
	
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 2);
	return false;
}

bool js_cocos2dx_ccpCross(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
    bool ok = true;
	if (argc == 2) {
		cocos2d::Point arg0;
		ok &= jsval_to_ccpoint(cx, argv[0], &arg0);
		cocos2d::Point arg1;
		ok &= jsval_to_ccpoint(cx, argv[1], &arg1);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
		float ret = arg0.cross(arg1);
		
		jsval jsret = DOUBLE_TO_JSVAL(ret);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
        
	}
	
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 2);
	return false;
}

bool js_cocos2dx_ccpPerp(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
    bool ok = true;
	if (argc == 1) {
		cocos2d::Point arg0;
		ok &= jsval_to_ccpoint(cx, argv[0], &arg0);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
		Point ret = arg0.getPerp();
		
		jsval jsret = ccpoint_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		
		return true;
	}
	
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}


bool js_cocos2dx_ccpRPerp(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
    bool ok = true;
	if (argc == 1) {
		cocos2d::Point arg0;
		ok &= jsval_to_ccpoint(cx, argv[0], &arg0);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
		Point ret = arg0.getRPerp();
		
		jsval jsret = ccpoint_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
        
	}
	
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}


bool js_cocos2dx_ccpProject(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
    bool ok = true;
	if (argc == 2) {
		cocos2d::Point arg0;
		ok &= jsval_to_ccpoint(cx, argv[0], &arg0);
		cocos2d::Point arg1;
		ok &= jsval_to_ccpoint(cx, argv[1], &arg1);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
		Point ret = arg0.project(arg1);
		
		jsval jsret = ccpoint_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
        
	}
	
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 2);
	return false;
}

bool js_cocos2dx_ccpRotate(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
    bool ok = true;
	if (argc == 2) {
		cocos2d::Point arg0;
		ok &= jsval_to_ccpoint(cx, argv[0], &arg0);
		cocos2d::Point arg1;
		ok &= jsval_to_ccpoint(cx, argv[1], &arg1);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
		Point ret = arg0.rotate(arg1);
		
		jsval jsret = ccpoint_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
        
	}
	
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 2);
	return false;
}

bool js_cocos2dx_ccpNormalize(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
    bool ok = true;
	if (argc == 1) {
		cocos2d::Vec2 ret;
		ok &= jsval_to_vector2(cx, argv[0], &ret);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
		ret.normalize();
		
		jsval jsret = ccpoint_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		
		return true;
	}
	
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_cocos2dx_CCSprite_textureLoaded(JSContext *cx, uint32_t argc, jsval *vp)
{
    JSObject *obj;
    Sprite* cobj;
    obj = JS_THIS_OBJECT(cx, vp);
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    cobj = (Sprite*)(proxy ? proxy->ptr : NULL);
    TEST_NATIVE_OBJECT(cx, cobj);
    
    bool ret = false;
    if( cobj->getTexture() )
        ret = true;
    
    JS_SET_RVAL(cx, vp, BOOLEAN_TO_JSVAL(ret));
    
    return true;
}

bool js_cocos2dx_CCTexture2D_setTexParameters(JSContext *cx, uint32_t argc, jsval *vp)
{
    JSObject* obj = (JSObject *)JS_THIS_OBJECT(cx, vp);
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    Texture2D* cobj = (Texture2D*)(proxy ? proxy->ptr : NULL);
    TEST_NATIVE_OBJECT(cx, cobj)

    if (argc == 4)
    {
        jsval *argvp = JS_ARGV(cx,vp);
        bool ok = true;

        GLuint arg0, arg1, arg2, arg3;

        ok &= jsval_to_uint32(cx, *argvp++, &arg0);
        ok &= jsval_to_uint32(cx, *argvp++, &arg1);
        ok &= jsval_to_uint32(cx, *argvp++, &arg2);
        ok &= jsval_to_uint32(cx, *argvp++, &arg3);

        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");

        Texture2D::TexParams param = { arg0, arg1, arg2, arg3 };

        cobj->setTexParameters(param);

        JS_SET_RVAL(cx, vp, JSVAL_VOID);
        return true;
    }

    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 4);
    return false;		
}

bool js_cocos2dx_CCMenu_alignItemsInRows(JSContext *cx, uint32_t argc, jsval *vp)
{
    JSObject* jsthis = (JSObject *)JS_THIS_OBJECT(cx, vp);
    bool ok = true;
    js_proxy_t *proxy = jsb_get_js_proxy(jsthis);
    Menu* cobj = (Menu*)(proxy ? proxy->ptr : NULL);
    TEST_NATIVE_OBJECT(cx, cobj)

    jsval *argvp = JS_ARGV(cx,vp);

    ValueVector items;
    ok &= jsvals_variadic_to_ccvaluevector(cx, argvp, argc, &items);
    if (ok)
    {
        cobj->alignItemsInRowsWithArray(items);
        JS_SET_RVAL(cx, vp, JSVAL_VOID);
        return true;
    }
    JS_ReportError(cx, "Error in js_cocos2dx_CCMenu_alignItemsInRows");
    return false;
}

bool js_cocos2dx_CCMenu_alignItemsInColumns(JSContext *cx, uint32_t argc, jsval *vp)
{
    JSObject* jsthis = (JSObject *)JS_THIS_OBJECT(cx, vp);
    bool ok = true;
    js_proxy_t *proxy = jsb_get_js_proxy(jsthis);
    Menu* cobj = (Menu*)(proxy ? proxy->ptr : NULL);
    TEST_NATIVE_OBJECT(cx, cobj)

    jsval *argvp = JS_ARGV(cx,vp);

    ValueVector items;
    ok &= jsvals_variadic_to_ccvaluevector(cx, argvp, argc, &items);
    if (ok)
    {
        cobj->alignItemsInColumnsWithArray(items);
        JS_SET_RVAL(cx, vp, JSVAL_VOID);
        return true;
    }
    JS_ReportError(cx, "Error in js_cocos2dx_CCMenu_alignItemsInColumns");
    return false;
}

bool js_cocos2dx_CCLayer_init(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::Layer* cobj = (cocos2d::Layer *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_CCLayer_init : Invalid Native Object");
	if (argc == 0) {
		bool ret = cobj->init();
		jsval jsret = JSVAL_NULL;
		jsret = BOOLEAN_TO_JSVAL(ret);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
	}
    
	JS_ReportError(cx, "js_cocos2dx_CCLayer_init : wrong number of arguments: %d, was expecting %d", argc, 0);
	return false;
}


// TMXLayer
bool js_cocos2dx_CCTMXLayer_getTileFlagsAt(JSContext *cx, uint32_t argc, jsval *vp)
{
    jsval *argv = JS_ARGV(cx, vp);
    bool ok = true;
    JSObject *obj;
    TMXLayer* cobj;
    obj = JS_THIS_OBJECT(cx, vp);
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    cobj = (TMXLayer*)(proxy ? proxy->ptr : NULL);
    TEST_NATIVE_OBJECT(cx, cobj)
    if (argc == 1)
    {
        TMXTileFlags flags;
        Point arg0;
        ok &= jsval_to_ccpoint(cx, argv[0], &arg0);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        cobj->getTileGIDAt(arg0, &flags);
        
        JS_SET_RVAL(cx, vp, UINT_TO_JSVAL((uint32_t)flags));
        return true;
    }
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 2);
    return false;
}

//#pragma mark - DrawNode

// Arguments: Array of points, fill color (Color4F), width(float), border color (Color4F)
// Ret value: void
bool js_cocos2dx_CCDrawNode_drawPolygon(JSContext *cx, uint32_t argc, jsval *vp)
{
    JSObject* obj = (JSObject *)JS_THIS_OBJECT(cx, vp);
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    DrawNode* cobj = (DrawNode*)(proxy ? proxy->ptr : NULL);
    TEST_NATIVE_OBJECT(cx, cobj)

    if ( argc == 4) {
        JS::CallArgs argvp = JS::CallArgsFromVp(argc ,vp);
        bool ok = true;
        JS::RootedObject argArray(cx);
        Color4F argFillColor = Color4F(0.0f, 0.0f, 0.0f, 0.0f);
        double argWidth = 0.0;
        Color4F argBorderColor = Color4F(0.0f, 0.0f, 0.0f, 0.0f);

        // Points
        ok &= JS_ValueToObject(cx, argvp[0], &argArray);
        JSB_PRECONDITION2( (argArray && JS_IsArrayObject(cx, argArray)) , cx, false, "Vertex should be anArray object");

        // Color 4F
        ok &= jsval_to_cccolor4f(cx, argvp[1], &argFillColor);

        // Width
        ok &= JS::ToNumber( cx, argvp[2], &argWidth );

        // Color Border (4F)
        ok &= jsval_to_cccolor4f(cx, argvp[3], &argBorderColor);

        JSB_PRECONDITION2(ok, cx, false, "Error parsing arguments");

        {
            uint32_t l;
            if( ! JS_GetArrayLength(cx, argArray, &l) )
                return false;

            Point* verts = new Point[ l ];
            Point p;

            for( uint32_t i=0; i<l; i++ ) {
                JS::RootedValue pointvp(cx);
                ok &= JS_GetElement(cx, argArray, i, &pointvp);
                JSB_PRECONDITION2(ok, cx, false, "JS_GetElement fails.");
                
                ok &= jsval_to_ccpoint(cx, pointvp, &p);
                JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
                verts[i] = p;
            }

            cobj->drawPolygon(verts, l, argFillColor, argWidth, argBorderColor);
            CC_SAFE_DELETE_ARRAY(verts);
        }
        JS_SET_RVAL(cx, vp, JSVAL_VOID);
        return true;	
    }

    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 4);
    return false;
}

static bool jsval_to_string_vector(JSContext* cx, jsval v, std::vector<std::string>& ret) {
    JS::RootedObject jsobj(cx);
    bool ok = JS_ValueToObject( cx, JS::RootedValue(cx, v), &jsobj );
    JSB_PRECONDITION2( ok, cx, false, "Error converting value to object");
	JSB_PRECONDITION2( jsobj && JS_IsArrayObject( cx, jsobj),  cx, false, "Object must be an array");
    
    uint32_t len = 0;
    JS_GetArrayLength(cx, jsobj, &len);

    for (uint32_t i=0; i < len; i++) {
        JS::RootedValue elt(cx);
        if (JS_GetElement(cx, jsobj, i, &elt)) {
            
            if (JSVAL_IS_STRING(elt))
            {
                JSStringWrapper str(JSVAL_TO_STRING(elt));
                ret.push_back(str.get());
            }
        }
    }

    return true;
}


static jsval string_vector_to_jsval(JSContext* cx, const std::vector<std::string>& arr) {
    
    JS::RootedObject jsretArr(cx, JS_NewArrayObject(cx, 0, NULL));
    
    int i = 0;
    for(std::vector<std::string>::const_iterator iter = arr.begin(); iter != arr.end(); ++iter, ++i) {
        JS::RootedValue arrElement(cx, c_string_to_jsval(cx, iter->c_str()));
        if(!JS_SetElement(cx, jsretArr, i, &arrElement)) {
            break;
        }
    }
    return OBJECT_TO_JSVAL(jsretArr);
}

bool js_cocos2dx_CCFileUtils_setSearchResolutionsOrder(JSContext *cx, uint32_t argc, jsval *vp)
{
    jsval *argv = JS_ARGV(cx, vp);
    bool ok = true;
    JSObject *obj = JS_THIS_OBJECT(cx, vp);
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    cocos2d::FileUtils* cobj = (cocos2d::FileUtils *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "Invalid Native Object");
    
    if (argc == 1) {
        std::vector<std::string> arg0;
        ok &= jsval_to_string_vector(cx, argv[0], arg0);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        cobj->setSearchResolutionsOrder(arg0);
        JS_SET_RVAL(cx, vp, JSVAL_VOID);
        return true;
    }
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}

bool js_cocos2dx_CCFileUtils_setSearchPaths(JSContext *cx, uint32_t argc, jsval *vp)
{
    jsval *argv = JS_ARGV(cx, vp);
    bool ok = true;
    JSObject *obj = JS_THIS_OBJECT(cx, vp);
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    cocos2d::FileUtils* cobj = (cocos2d::FileUtils *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "Invalid Native Object");
    
    if (argc == 1) {
        std::vector<std::string> arg0;
        ok &= jsval_to_string_vector(cx, argv[0], arg0);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        cobj->setSearchPaths(arg0);
        JS_SET_RVAL(cx, vp, JSVAL_VOID);
        return true;
    }
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}
bool js_cocos2dx_CCFileUtils_getSearchPaths(JSContext *cx, uint32_t argc, jsval *vp)
{
    JSObject *obj = JS_THIS_OBJECT(cx, vp);
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    cocos2d::FileUtils* cobj = (cocos2d::FileUtils *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "Invalid Native Object");
    
    if (argc == 0) {
        std::vector<std::string> ret = cobj->getSearchPaths();
        jsval jsret;
        jsret = string_vector_to_jsval(cx, ret);
        JS_SET_RVAL(cx, vp, jsret);
        return true;
    }
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}

bool js_cocos2dx_CCFileUtils_getByteArrayFromFile(JSContext *cx, uint32_t argc, jsval *vp)
{
    jsval *argv = JS_ARGV(cx, vp);
    bool ok = true;
    JSObject *obj = JS_THIS_OBJECT(cx, vp);
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    cocos2d::FileUtils* cobj = (cocos2d::FileUtils *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "Invalid Native Object");
    
    if (argc == 1) {
        std::string arg0;
        ok &= jsval_to_std_string(cx, argv[0], &arg0);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");

        Data data = cobj->getDataFromFile(arg0);
        do
        {
            if (!data.isNull())
            {
                uint32_t size = static_cast<uint32_t>(data.getSize());
                JSObject* array = JS_NewUint8Array(cx, size);
                if (nullptr == array)
                    break;

                uint8_t* bufdata = (uint8_t*)JS_GetArrayBufferViewData(array);
                memcpy(bufdata, data.getBytes(), size*sizeof(uint8_t));
                
                JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(array));
                return true;
            }
        } while(false);
        
        JS_ReportError(cx, "get file(%s) data fails", arg0.c_str());
        return false;
    }
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 3);
    return false;
}

bool js_cocos2dx_CCFileUtils_getSearchResolutionsOrder(JSContext *cx, uint32_t argc, jsval *vp)
{
    JSObject *obj = JS_THIS_OBJECT(cx, vp);
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    cocos2d::FileUtils* cobj = (cocos2d::FileUtils *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "Invalid Native Object");
    
    if (argc == 0) {
        std::vector<std::string> ret = cobj->getSearchResolutionsOrder();
        jsval jsret;
        jsret = string_vector_to_jsval(cx, ret);
        JS_SET_RVAL(cx, vp, jsret);
        return true;
    }
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}

static bool js_cocos2dx_FileUtils_createDictionaryWithContentsOfFile(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	bool ok = true;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::FileUtils* cobj = (cocos2d::FileUtils *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "Invalid Native Object");
	if (argc == 1) {
		std::string arg0;
		ok &= jsval_to_std_string(cx, argv[0], &arg0);
		JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
		cocos2d::ValueMap ret = FileUtils::getInstance()->getValueMapFromFile(arg0.c_str());
		jsval jsret;
		jsret = ccvaluemap_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
	}
    
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}

bool js_cocos2dx_CCGLProgram_setUniformLocationWith4f(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs argv = JS::CallArgsFromVp(argc, vp);
	bool ok = true;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::GLProgram* cobj = (cocos2d::GLProgram *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "Invalid Native Object");
    int arg0;
    double arg1;
    double arg2;
    double arg3;
    double arg4;
    ok &= jsval_to_int32(cx, argv[0], (int32_t *)&arg0);
    ok &= JS::ToNumber(cx, argv[1], &arg1);
    
    if(argc == 2) {
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        cobj->setUniformLocationWith1f(arg0, arg1);
    }
	if (argc == 3) {
        ok &= JS::ToNumber(cx, argv[2], &arg2);
		JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
		cobj->setUniformLocationWith2f(arg0, arg1, arg2);
	}
    if(argc == 4) {
        ok &= JS::ToNumber(cx, argv[2], &arg2);
        ok &= JS::ToNumber(cx, argv[3], &arg3);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
		cobj->setUniformLocationWith3f(arg0, arg1, arg2, arg3);
    }
    if(argc == 5) {
        ok &= JS::ToNumber(cx, argv[2], &arg2);
        ok &= JS::ToNumber(cx, argv[3], &arg3);
        ok &= JS::ToNumber(cx, argv[4], &arg4);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
		cobj->setUniformLocationWith4f(arg0, arg1, arg2, arg3, arg4);
    }
    
    JS_SET_RVAL(cx, vp, JSVAL_VOID);
    return true;
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 5);
	return false;
}

bool js_cocos2dx_CCGLProgram_create(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	bool ok = true;
    if(argc != 2) {
        JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 2);
        return false;
    }
    
    const char *arg0, *arg1;
    std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
    std::string arg1_tmp; ok &= jsval_to_std_string(cx, argv[1], &arg1_tmp); arg1 = arg1_tmp.c_str();

    GLProgram* ret = new GLProgram();
    ret->autorelease();
    
    ret->initWithFilenames(arg0, arg1);
    
    jsval jsret;
    do {
        if (ret) {
            js_proxy_t *p = jsb_get_native_proxy(ret);
            if (p) {
                jsret = OBJECT_TO_JSVAL(p->obj);
            } else {
                // create a new js obj of that class
                js_proxy_t *proxy = js_get_or_create_proxy<cocos2d::GLProgram>(cx, ret);
                jsret = OBJECT_TO_JSVAL(proxy->obj);
            }
        } else {
            jsret = JSVAL_NULL;
        }
    } while (0);
    JS_SET_RVAL(cx, vp, jsret);
    return true;

}


bool js_cocos2dx_CCGLProgram_createWithString(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	bool ok = true;
    if(argc != 2) {
        JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 2);
        return false;
    }
    
    const char *arg0, *arg1;
    std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
    std::string arg1_tmp; ok &= jsval_to_std_string(cx, argv[1], &arg1_tmp); arg1 = arg1_tmp.c_str();
    
    GLProgram* ret = new GLProgram();
    ret->initWithByteArrays(arg0, arg1);
    
    jsval jsret;
    do {
        if (ret) {
            js_proxy_t *p = jsb_get_native_proxy(ret);
            if (p) {
                jsret = OBJECT_TO_JSVAL(p->obj);
            } else {
                // create a new js obj of that class
                js_proxy_t *proxy = js_get_or_create_proxy<cocos2d::GLProgram>(cx, ret);
                jsret = OBJECT_TO_JSVAL(proxy->obj);
            }
        } else {
            jsret = JSVAL_NULL;
        }
    } while (0);
    JS_SET_RVAL(cx, vp, jsret);
    return true;
    
}

bool js_cocos2dx_CCGLProgram_getProgram(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::GLProgram* cobj = (cocos2d::GLProgram *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "Invalid Native Object");
	if (argc == 0) {
        GLuint ret = cobj->getProgram();
        JS_SET_RVAL(cx, vp, UINT_TO_JSVAL((uint32_t)ret));
		return true;
	}
    
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return false;
}

#define js_cocos2dx_CCCamera_getXYZ(funcName) \
    bool ok = true;                                                                                                  \
	JSObject *obj = JS_THIS_OBJECT(cx, vp);                                                                               \
	js_proxy_t *proxy = jsb_get_js_proxy(obj);                                                                            \
	cocos2d::Camera* cobj = (cocos2d::Camera *)(proxy ? proxy->ptr : NULL);                                           \
	JSB_PRECONDITION2( cobj, cx, false, "Invalid Native Object");                                                      \
	if (argc == 0) {                                                                                                      \
		float x;                                                                                                          \
		float y;                                                                                                          \
		float z;                                                                                                          \
		cobj->funcName(&x, &y, &z);                                                                                       \
        JSObject* tmp = JS_NewObject(cx, NULL, NULL, NULL);                                                               \
                                                                                                                          \
        do                                                                                                                \
        {                                                                                                                 \
            if (NULL == tmp) break;                                                                                       \
                                                                                                                          \
            ok = JS_DefineProperty(cx, tmp, "x", DOUBLE_TO_JSVAL(x), NULL, NULL, JSPROP_ENUMERATE | JSPROP_PERMANENT) &&  \
            JS_DefineProperty(cx, tmp, "y", DOUBLE_TO_JSVAL(y), NULL, NULL, JSPROP_ENUMERATE | JSPROP_PERMANENT) &&       \
            JS_DefineProperty(cx, tmp, "z", DOUBLE_TO_JSVAL(z), NULL, NULL, JSPROP_ENUMERATE | JSPROP_PERMANENT);         \
                                                                                                                          \
            if (ok) {                                                                                                     \
                JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(tmp));                                                                \
                return true;                                                                                           \
            }                                                                                                             \
        } while (false);                                                                                                  \
                                                                                                                          \
		JS_SET_RVAL(cx, vp, JSVAL_NULL);                                                                                  \
		return true;                                                                                                   \
	}                                                                                                                     \
                                                                                                                          \
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);                                       \
	return false;



bool js_cocos2dx_SpriteBatchNode_getDescendants(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	cocos2d::SpriteBatchNode* cobj = (cocos2d::SpriteBatchNode *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_SpriteBatchNode_getDescendants : Invalid Native Object");
	if (argc == 0) {
		std::vector<Sprite*> ret = cobj->getDescendants();
		
        JS::RootedObject jsretArr(cx, JS_NewArrayObject(cx, 0, NULL));
		size_t vSize = ret.size();
        JS::RootedValue jsret(cx);
		for (size_t i = 0; i < vSize; i++)
		{
			proxy = js_get_or_create_proxy<cocos2d::Sprite>(cx, ret[i]);
			jsret = OBJECT_TO_JSVAL(proxy->obj);
			JS_SetElement(cx, jsretArr, static_cast<uint32_t>(i), &jsret);
		}
		JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(jsretArr));
		return true;
	}

	JS_ReportError(cx, "js_cocos2dx_SpriteBatchNode_getDescendants : wrong number of arguments: %d, was expecting %d", argc, 0);
	return false;
}

bool js_cocos2dx_NodeGrid_setGrid(JSContext *cx, uint32_t argc, jsval *vp)
{
    jsval *argv = JS_ARGV(cx, vp);
    bool ok = true;
    JSObject *obj = JS_THIS_OBJECT(cx, vp);
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    cocos2d::NodeGrid* cobj = (cocos2d::NodeGrid *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_NodeGrid_setGrid : Invalid Native Object");
    if (argc == 1) {
        cocos2d::GridBase* arg0;
        do {
            if(argv[0].isNull()) { arg0 = nullptr; break;}
            if (!argv[0].isObject()) { ok = false; break; }
            JSObject *tmpObj = JSVAL_TO_OBJECT(argv[0]);
            proxy = jsb_get_js_proxy(tmpObj);
            arg0 = (cocos2d::GridBase*)(proxy ? proxy->ptr : NULL);
            JSB_PRECONDITION2( arg0, cx, false, "Invalid Native Object");
        } while (0);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_NodeGrid_setGrid : Error processing arguments");
        cobj->setGrid(arg0);
        JS_SET_RVAL(cx, vp, JSVAL_VOID);
        return true;
    }

    JS_ReportError(cx, "js_cocos2dx_NodeGrid_setGrid : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}

// cc.PlistParser.getInstance()
bool js_PlistParser_getInstance(JSContext *cx, unsigned argc, JS::Value *vp) {
    __JSPlistDelegator* delegator = __JSPlistDelegator::getInstance();
    SAXParser* parser = delegator->getParser();
    
    jsval jsret;
    if (parser) {
        js_proxy_t *p = jsb_get_native_proxy(parser);
        if (p) {
            jsret = OBJECT_TO_JSVAL(p->obj);
        } else {
            // create a new js obj of that class
            js_proxy_t *proxy = js_get_or_create_proxy<SAXParser>(cx, parser);
            jsret = OBJECT_TO_JSVAL(proxy->obj);
        }
    } else {
        jsret = JSVAL_NULL;
    }
    JS_SET_RVAL(cx, vp, jsret);
    
    return true;
}
// cc.PlistParser.getInstance().parse(text)
bool js_PlistParser_parse(JSContext *cx, unsigned argc, JS::Value *vp) {
    __JSPlistDelegator* delegator = __JSPlistDelegator::getInstance();
    
    bool ok = true;
    jsval *argv = JS_ARGV(cx, vp);
    if (argc == 1) {
        std::string arg0;
        ok &= jsval_to_std_string(cx, argv[0], &arg0);
        JSB_PRECONDITION2(ok, cx, false, "Error processing arguments");
        
        std::string parsedStr = delegator->parseText(arg0);
        jsval strVal = std_string_to_jsval(cx, parsedStr);
        // create a new js obj of the parsed string
        JS::RootedValue outVal(cx);
        ok = JS_ParseJSON(cx, JS_GetStringCharsZ(cx, JSVAL_TO_STRING(strVal)), static_cast<uint32_t>(parsedStr.size()), &outVal);
        
        if (ok)
            JS_SET_RVAL(cx, vp, outVal);
        else {
            JS_SET_RVAL(cx, vp, JSVAL_NULL);
            JS_ReportError(cx, "js_PlistParser_parse : parse error");
        }
        return true;
    }
    JS_ReportError(cx, "js_PlistParser_parse : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}

cocos2d::SAXParser* __JSPlistDelegator::getParser() {
    return &_parser;
}

std::string __JSPlistDelegator::parse(const std::string& path) {
    _result.clear();
    
    SAXParser parser;
    if (false != parser.init("UTF-8") )
    {
        parser.setDelegator(this);
        parser.parse(FileUtils::getInstance()->fullPathForFilename(path).c_str());
    }
    
    return _result;
}

__JSPlistDelegator::~__JSPlistDelegator(){
    CCLOGINFO("deallocing __JSSAXDelegator: %p", this);
}

std::string __JSPlistDelegator::parseText(const std::string& text){
	 _result.clear();
    
    SAXParser parser;
    if (false != parser.init("UTF-8") )
    {
        parser.setDelegator(this);
		parser.parse(text.c_str(), text.size());
    }
    
    return _result;
}

void __JSPlistDelegator::startElement(void *ctx, const char *name, const char **atts) {
    _isStoringCharacters = true;
    _currentValue.clear();
    
    std::string elementName = (char*)name;
    
    int end = (int)_result.size() - 1;
    if(end >= 0 && _result[end] != '{' && _result[end] != '[' && _result[end] != ':') {
        _result += ",";
    }
    
    if (elementName == "dict") {
        _result += "{";
    }
    else if (elementName == "array") {
        _result += "[";
    }
}

void __JSPlistDelegator::endElement(void *ctx, const char *name) {
    _isStoringCharacters = false;
    std::string elementName = (char*)name;
    
    if (elementName == "dict") {
        _result += "}";
    }
    else if (elementName == "array") {
        _result += "]";
    }
    else if (elementName == "key") {
        _result += "\"" + _currentValue + "\":";
    }
    else if (elementName == "string") {
        _result += "\"" + _currentValue + "\"";
    }
    else if (elementName == "false" || elementName == "true") {
        _result += elementName;
    }
    else if (elementName == "real" || elementName == "integer") {
        _result += _currentValue;
    }
}

void __JSPlistDelegator::textHandler(void *ctx, const char *ch, int len) {
    CC_UNUSED_PARAM(ctx);
    std::string text((char*)ch, 0, len);
    
    if (_isStoringCharacters)
    {
        _currentValue += text;
    }
}

bool jsval_to_TTFConfig(JSContext *cx, jsval v, TTFConfig* ret) {
    JS::RootedObject tmp(cx);
    JS::RootedValue js_fontFilePath(cx);
    JS::RootedValue js_fontSize(cx);
    JS::RootedValue js_glyphs(cx);
    JS::RootedValue js_customGlyphs(cx);
    JS::RootedValue js_distanceFieldEnable(cx);

    std::string fontFilePath,customGlyphs;
    double fontSize, glyphs;

    bool ok = v.isObject() &&
        JS_ValueToObject(cx, JS::RootedValue(cx, v), &tmp) &&
        JS_GetProperty(cx, tmp, "fontFilePath", &js_fontFilePath) &&
        JS_GetProperty(cx, tmp, "fontSize", &js_fontSize) &&
        JS_GetProperty(cx, tmp, "glyphs", &js_glyphs) &&
        JS_GetProperty(cx, tmp, "customGlyphs", &js_customGlyphs) &&
        JS_GetProperty(cx, tmp, "distanceFieldEnable", &js_distanceFieldEnable) &&
        JS::ToNumber(cx, js_fontSize, &fontSize) &&
        JS::ToNumber(cx, js_glyphs, &glyphs) &&
        jsval_to_std_string(cx,js_fontFilePath,&ret->fontFilePath) &&
        jsval_to_std_string(cx,js_customGlyphs,&customGlyphs);
    bool distanceFieldEnable = JS::ToBoolean(js_distanceFieldEnable);

    JSB_PRECONDITION3(ok, cx, false, "Error processing arguments");

    ret->fontSize = (int)fontSize;
    ret->glyphs = GlyphCollection((int)glyphs);
    ret->distanceFieldEnabled = distanceFieldEnable;
    if(ret->glyphs == GlyphCollection::CUSTOM && customGlyphs.length() > 0)
        ret->customGlyphs = customGlyphs.c_str();
    else
        ret->customGlyphs = nullptr;

    return true;
}

bool js_cocos2dx_Label_createWithTTF(JSContext *cx, uint32_t argc, jsval *vp)
{
    if (argc < 2)
        return false;

    jsval *argv = JS_ARGV(cx, vp);
    bool ok = true;

    TTFConfig ttfConfig("");
    std::string text;

    ok &= jsval_to_TTFConfig(cx, argv[0], &ttfConfig);
    ok &= jsval_to_std_string(cx, argv[1], &text);

    cocos2d::Label* ret = nullptr;

    if (argc == 2) {
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_Label_createWithTTF : Error processing arguments");
        ret = cocos2d::Label::createWithTTF(ttfConfig, text);
        jsval jsret = JSVAL_NULL;
        if (ret) {
            js_proxy_t *proxy = js_get_or_create_proxy<cocos2d::Label>(cx, (cocos2d::Label*)ret);
            jsret = OBJECT_TO_JSVAL(proxy->obj);
        }
        JS_SET_RVAL(cx, vp, jsret);
        return true;
    }
    if (argc == 3) {
        int arg2;
        ok &= jsval_to_int32(cx, argv[2], (int32_t *)&arg2);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_Label_createWithTTF : Error processing arguments");
        TextHAlignment alignment = TextHAlignment(arg2);
        ret = cocos2d::Label::createWithTTF(ttfConfig, text, alignment);
        jsval jsret = JSVAL_NULL;
        if (ret) {
            js_proxy_t *proxy = js_get_or_create_proxy<cocos2d::Label>(cx, (cocos2d::Label*)ret);
            jsret = OBJECT_TO_JSVAL(proxy->obj);
        }
        JS_SET_RVAL(cx, vp, jsret);
        return true;
    }
    if (argc == 4) {
        int arg2,arg3;
        ok &= jsval_to_int32(cx, argv[2], (int32_t *)&arg2);
        ok &= jsval_to_int32(cx, argv[3], (int32_t *)&arg3);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_Label_createWithTTF : Error processing arguments");
        TextHAlignment alignment = TextHAlignment(arg2);
        ret = cocos2d::Label::createWithTTF(ttfConfig, text, alignment, arg3);
        jsval jsret = JSVAL_NULL;
        if (ret) {
            js_proxy_t *proxy = js_get_or_create_proxy<cocos2d::Label>(cx, (cocos2d::Label*)ret);
            jsret = OBJECT_TO_JSVAL(proxy->obj);
        }
        JS_SET_RVAL(cx, vp, jsret);
        return true;
    }

    JS_ReportError(cx, "js_cocos2dx_Label_createWithTTF : wrong number of arguments");
    return false;
}

bool js_cocos2dx_Label_setTTFConfig(JSContext *cx, uint32_t argc, jsval *vp)
{
    jsval *argv = JS_ARGV(cx, vp);
    bool ok = true;
    JSObject *obj = JS_THIS_OBJECT(cx, vp);
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    cocos2d::Label* cobj = (cocos2d::Label *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_Label_setTTFConfig : Invalid Native Object");

    if (argc == 1) {
        TTFConfig ttfConfig("");
        do {
            if (!argv[0].isObject()) { ok = false; break; }
            ok &= jsval_to_TTFConfig(cx, argv[0], &ttfConfig);
        } while (0);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_Label_setTTFConfig : Error processing arguments");
        cobj->setTTFConfig(ttfConfig);
        JS_SET_RVAL(cx, vp, JSVAL_VOID);
        return true;
    }

    JS_ReportError(cx, "js_cocos2dx_Label_setTTFConfig : wrong number of arguments");
    return false;
}

void register_cocos2dx_js_extensions(JSContext* cx, JSObject* global)
{
	// first, try to get the ns
    JS::RootedValue nsval(cx);
    JS::RootedObject ns(cx);
	JS_GetProperty(cx, global, "cc", &nsval);
	if (nsval == JSVAL_VOID) {
		ns = JS_NewObject(cx, NULL, NULL, NULL);
		nsval = OBJECT_TO_JSVAL(ns);
		JS_SetProperty(cx, global, "cc", nsval);
	} else {
		JS_ValueToObject(cx, nsval, &ns);
	}

	JS_DefineFunction(cx, global, "__getPlatform", js_platform, 0, JSPROP_READONLY | JSPROP_PERMANENT);

	JSObject *tmpObj;
    JS_DefineFunction(cx, jsb_cocos2d_Label_prototype, "createWithTTF", js_cocos2dx_Label_createWithTTF, 4, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Label_prototype, "setTTFConfig", js_cocos2dx_Label_setTTFConfig, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);

    JS_DefineFunction(cx, jsb_cocos2d_NodeGrid_prototype, "setGrid", js_cocos2dx_NodeGrid_setGrid, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);

    JS_DefineFunction(cx, jsb_cocos2d_Node_prototype, "retain", js_cocos2dx_retain, 0, JSPROP_ENUMERATE | JSPROP_PERMANENT);
	JS_DefineFunction(cx, jsb_cocos2d_Node_prototype, "release", js_cocos2dx_release, 0, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    
    JS_DefineFunction(cx, jsb_cocos2d_EventListener_prototype, "retain", js_cocos2dx_retain, 0, JSPROP_ENUMERATE | JSPROP_PERMANENT);
	JS_DefineFunction(cx, jsb_cocos2d_EventListener_prototype, "release", js_cocos2dx_release, 0, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    
    JS_DefineFunction(cx, jsb_cocos2d_GLProgram_prototype, "retain", js_cocos2dx_retain, 0, JSPROP_ENUMERATE | JSPROP_PERMANENT);
	JS_DefineFunction(cx, jsb_cocos2d_GLProgram_prototype, "release", js_cocos2dx_release, 0, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Node_prototype, "onEnter", js_cocos2dx_Node_onEnter, 0, JSPROP_ENUMERATE  | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Node_prototype, "onExit", js_cocos2dx_Node_onExit, 0, JSPROP_ENUMERATE  | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Node_prototype, "onEnterTransitionDidFinish", js_cocos2dx_Node_onEnterTransitionDidFinish, 0, JSPROP_ENUMERATE  | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Node_prototype, "onExitTransitionDidStart", js_cocos2dx_Node_onExitTransitionDidStart, 0, JSPROP_ENUMERATE  | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Node_prototype, "init", js_doNothing, 0, JSPROP_ENUMERATE  | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Node_prototype, "schedule", js_CCNode_schedule, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Node_prototype, "scheduleOnce", js_CCNode_scheduleOnce, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Node_prototype, "scheduleUpdateWithPriority", js_cocos2dx_CCNode_scheduleUpdateWithPriority, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Node_prototype, "unscheduleUpdate", js_cocos2dx_CCNode_unscheduleUpdate, 0, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Node_prototype, "scheduleUpdate", js_cocos2dx_CCNode_scheduleUpdate, 0, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Node_prototype, "unschedule", js_CCNode_unschedule, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Node_prototype, "unscheduleAllCallbacks", js_cocos2dx_CCNode_unscheduleAllSelectors, 0, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Node_prototype, "setPosition", js_cocos2dx_CCNode_setPosition, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Node_prototype, "setContentSize", js_cocos2dx_CCNode_setContentSize, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Node_prototype, "setAnchorPoint", js_cocos2dx_CCNode_setAnchorPoint, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Node_prototype, "setColor", js_cocos2dx_CCNode_setColor, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    
    JS_DefineFunction(cx, jsb_cocos2d_Component_prototype, "onEnter", js_cocos2dx_Component_onEnter, 0, JSPROP_ENUMERATE  | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Component_prototype, "onExit", js_cocos2dx_Component_onExit, 0, JSPROP_ENUMERATE  | JSPROP_PERMANENT);

    JS_DefineFunction(cx, jsb_cocos2d_GLProgram_prototype, "setUniformLocationF32", js_cocos2dx_CCGLProgram_setUniformLocationWith4f, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_GLProgram_prototype, "getProgram", js_cocos2dx_CCGLProgram_getProgram, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);

    JS_DefineFunction(cx, jsb_cocos2d_Scheduler_prototype, "resumeTarget", js_cocos2dx_CCScheduler_resumeTarget, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Scheduler_prototype, "pauseTarget", js_cocos2dx_CCScheduler_pauseTarget, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Scheduler_prototype, "scheduleUpdateForTarget", js_CCScheduler_scheduleUpdateForTarget, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Scheduler_prototype, "unscheduleUpdateForTarget", js_CCScheduler_unscheduleUpdateForTarget, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Scheduler_prototype, "scheduleCallbackForTarget", js_CCScheduler_schedule, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Scheduler_prototype, "unscheduleCallbackForTarget", js_CCScheduler_unscheduleCallbackForTarget, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Scheduler_prototype, "unscheduleAllCallbacksForTarget", js_cocos2dx_CCScheduler_unscheduleAllSelectorsForTarget, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Scheduler_prototype, "unscheduleAllCallbacks", js_cocos2dx_CCScheduler_unscheduleAll, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Scheduler_prototype, "unscheduleAllCallbacksWithMinPriority", js_cocos2dx_CCScheduler_unscheduleAllCallbacksWithMinPriority, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Scheduler_prototype, "isTargetPaused", js_cocos2dx_CCScheduler_isTargetPaused, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    
    JS_DefineFunction(cx, jsb_cocos2d_TMXLayer_prototype, "getTileFlagsAt", js_cocos2dx_CCTMXLayer_getTileFlagsAt, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);

    JS_DefineFunction(cx, jsb_cocos2d_DrawNode_prototype, "drawPoly", js_cocos2dx_CCDrawNode_drawPolygon, 4, JSPROP_ENUMERATE | JSPROP_PERMANENT);

    JS_DefineFunction(cx, jsb_cocos2d_Texture2D_prototype, "setTexParameters", js_cocos2dx_CCTexture2D_setTexParameters, 4, JSPROP_ENUMERATE  | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Menu_prototype, "alignItemsInRows", js_cocos2dx_CCMenu_alignItemsInRows, 1, JSPROP_ENUMERATE  | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Menu_prototype, "alignItemsInColumns", js_cocos2dx_CCMenu_alignItemsInColumns, 1, JSPROP_ENUMERATE  | JSPROP_PERMANENT);

	JS_DefineFunction(cx, jsb_cocos2d_Layer_prototype, "init", js_cocos2dx_CCLayer_init, 0, JSPROP_ENUMERATE  | JSPROP_PERMANENT);

    JS_DefineFunction(cx, jsb_cocos2d_FileUtils_prototype, "setSearchResolutionsOrder", js_cocos2dx_CCFileUtils_setSearchResolutionsOrder, 1, JSPROP_PERMANENT );
    JS_DefineFunction(cx, jsb_cocos2d_FileUtils_prototype, "setSearchPaths", js_cocos2dx_CCFileUtils_setSearchPaths, 1, JSPROP_PERMANENT );
    JS_DefineFunction(cx, jsb_cocos2d_FileUtils_prototype, "getSearchPaths", js_cocos2dx_CCFileUtils_getSearchPaths, 0, JSPROP_PERMANENT );
    JS_DefineFunction(cx, jsb_cocos2d_FileUtils_prototype, "getSearchResolutionsOrder", js_cocos2dx_CCFileUtils_getSearchResolutionsOrder, 0, JSPROP_PERMANENT );

    JS_DefineFunction(cx, jsb_cocos2d_FileUtils_prototype, "createDictionaryWithContentsOfFile", js_cocos2dx_FileUtils_createDictionaryWithContentsOfFile, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    
    JS_DefineFunction(cx, jsb_cocos2d_FileUtils_prototype, "getByteArrayFromFile", js_cocos2dx_CCFileUtils_getByteArrayFromFile, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    
    tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.EventListenerTouchOneByOne; })()"));
    JS_DefineFunction(cx, tmpObj, "create", js_EventListenerTouchOneByOne_create, 0, JSPROP_READONLY | JSPROP_PERMANENT);
    
    tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.EventListenerTouchAllAtOnce; })()"));
    JS_DefineFunction(cx, tmpObj, "create", js_EventListenerTouchAllAtOnce_create, 0, JSPROP_READONLY | JSPROP_PERMANENT);
    
    tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.EventListenerMouse; })()"));
    JS_DefineFunction(cx, tmpObj, "create", js_EventListenerMouse_create, 0, JSPROP_READONLY | JSPROP_PERMANENT);
    
    tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.EventListenerKeyboard; })()"));
    JS_DefineFunction(cx, tmpObj, "create", js_EventListenerKeyboard_create, 0, JSPROP_READONLY | JSPROP_PERMANENT);
    
    tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.BezierBy; })()"));
    JS_DefineFunction(cx, tmpObj, "create", JSB_CCBezierBy_actionWithDuration, 2, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_BezierBy_prototype, "initWithDuration", JSB_CCBezierBy_initWithDuration, 2, JSPROP_ENUMERATE | JSPROP_PERMANENT);

    tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.BezierTo; })()"));
    JS_DefineFunction(cx, tmpObj, "create", JSB_CCBezierTo_actionWithDuration, 2, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_BezierTo_prototype, "initWithDuration", JSB_CCBezierTo_initWithDuration, 2, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    
    tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.CardinalSplineBy; })()"));
    JS_DefineFunction(cx, tmpObj, "create", JSB_CCCardinalSplineBy_actionWithDuration, 2, JSPROP_READONLY | JSPROP_PERMANENT);
    
    tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.CardinalSplineTo; })()"));
    JS_DefineFunction(cx, tmpObj, "create", JSB_CCCardinalSplineTo_actionWithDuration, 2, JSPROP_READONLY | JSPROP_PERMANENT);
    
    tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.CatmullRomBy; })()"));
    JS_DefineFunction(cx, tmpObj, "create", JSB_CCCatmullRomBy_actionWithDuration, 2, JSPROP_READONLY | JSPROP_PERMANENT);
    
    tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.CatmullRomTo; })()"));
    JS_DefineFunction(cx, tmpObj, "create", JSB_CCCatmullRomTo_actionWithDuration, 2, JSPROP_READONLY | JSPROP_PERMANENT);
    
    JS_DefineFunction(cx, jsb_cocos2d_Sprite_prototype, "textureLoaded", js_cocos2dx_CCSprite_textureLoaded, 0, JSPROP_ENUMERATE | JSPROP_PERMANENT);
	JS_DefineFunction(cx, jsb_cocos2d_SpriteBatchNode_prototype, "getDescendants", js_cocos2dx_SpriteBatchNode_getDescendants, 0, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    
	JS_DefineFunction(cx, jsb_cocos2d_Action_prototype, "retain", js_cocos2dx_retain, 0, JSPROP_ENUMERATE | JSPROP_PERMANENT);
	JS_DefineFunction(cx, jsb_cocos2d_Action_prototype, "release", js_cocos2dx_release, 0, JSPROP_ENUMERATE | JSPROP_PERMANENT);
	JS_DefineFunction(cx, jsb_cocos2d_Animation_prototype, "retain", js_cocos2dx_retain, 0, JSPROP_ENUMERATE | JSPROP_PERMANENT);
	JS_DefineFunction(cx, jsb_cocos2d_Animation_prototype, "release", js_cocos2dx_release, 0, JSPROP_ENUMERATE | JSPROP_PERMANENT);
	JS_DefineFunction(cx, jsb_cocos2d_SpriteFrame_prototype, "retain", js_cocos2dx_retain, 0, JSPROP_ENUMERATE | JSPROP_PERMANENT);
	JS_DefineFunction(cx, jsb_cocos2d_SpriteFrame_prototype, "release", js_cocos2dx_release, 0, JSPROP_ENUMERATE | JSPROP_PERMANENT);
	JS_DefineFunction(cx, jsb_cocos2d_MenuItem_prototype, "setCallback", js_cocos2dx_CCMenuItem_setCallback, 2, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_TMXLayer_prototype, "getTileFlagsAt", js_cocos2dx_CCTMXLayer_tileFlagsAt, 2, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_TMXLayer_prototype, "getTiles", js_cocos2dx_CCTMXLayer_getTiles, 0, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    
    JS_DefineFunction(cx, jsb_cocos2d_ActionInterval_prototype, "repeat", js_cocos2dx_ActionInterval_repeat, 0, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_ActionInterval_prototype, "repeatForever", js_cocos2dx_ActionInterval_repeatForever, 0, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_ActionInterval_prototype, "speed", js_cocos2dx_ActionInterval_speed, 0, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_ActionInterval_prototype, "easing", js_cocos2dx_ActionInterval_easing, 0, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    
	tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.Menu; })()"));
	JS_DefineFunction(cx, tmpObj, "create", js_cocos2dx_CCMenu_create, 0, JSPROP_READONLY | JSPROP_PERMANENT);
	tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.MenuItem; })()"));
	JS_DefineFunction(cx, tmpObj, "create", js_cocos2dx_CCMenuItem_create, 1, JSPROP_READONLY | JSPROP_PERMANENT);
	tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.MenuItemSprite; })()"));
	JS_DefineFunction(cx, tmpObj, "create", js_cocos2dx_CCMenuItemSprite_create, 1, JSPROP_READONLY | JSPROP_PERMANENT);
	tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.MenuItemLabel; })()"));
	JS_DefineFunction(cx, tmpObj, "create", js_cocos2dx_CCMenuItemLabel_create, 1, JSPROP_READONLY | JSPROP_PERMANENT);
	tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.MenuItemAtlasFont; })()"));
	JS_DefineFunction(cx, tmpObj, "create", js_cocos2dx_CCMenuItemAtlasFont_create, 1, JSPROP_READONLY | JSPROP_PERMANENT);
	tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.MenuItemFont; })()"));
	JS_DefineFunction(cx, tmpObj, "create", js_cocos2dx_CCMenuItemFont_create, 1, JSPROP_READONLY | JSPROP_PERMANENT);
	tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.MenuItemToggle; })()"));
	JS_DefineFunction(cx, tmpObj, "_create", js_cocos2dx_CCMenuItemToggle_create, 1, JSPROP_READONLY | JSPROP_PERMANENT);
	tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.Sequence; })()"));
	JS_DefineFunction(cx, tmpObj, "create", js_cocos2dx_CCSequence_create, 0, JSPROP_READONLY | JSPROP_PERMANENT);
	tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.Spawn; })()"));
	JS_DefineFunction(cx, tmpObj, "create", js_cocos2dx_CCSpawn_create, 0, JSPROP_READONLY | JSPROP_PERMANENT);
	//tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.Animation; })()"));
	//JS_DefineFunction(cx, tmpObj, "create", js_cocos2dx_CCAnimation_create, 0, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_Scene_prototype, "init", js_cocos2dx_CCScene_init, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE);
    tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.LayerMultiplex; })()"));
    JS_DefineFunction(cx, tmpObj, "create", js_cocos2dx_CCLayerMultiplex_create, 0, JSPROP_READONLY | JSPROP_PERMANENT);
    
	JS_DefineFunction(cx, ns, "registerTargetedDelegate", js_cocos2dx_JSTouchDelegate_registerTargetedDelegate, 1, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction(cx, ns, "registerStandardDelegate", js_cocos2dx_JSTouchDelegate_registerStandardDelegate, 1, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, ns, "unregisterTouchDelegate", js_cocos2dx_JSTouchDelegate_unregisterTouchDelegate, 1, JSPROP_READONLY | JSPROP_PERMANENT);

	tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.CallFunc; })()"));
	JS_DefineFunction(cx, tmpObj, "create", js_callFunc, 1, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_cocos2d_CallFuncN_prototype, "initWithFunction", js_cocos2dx_CallFunc_initWithFunction, 1, JSPROP_ENUMERATE | JSPROP_PERMANENT);
    
    tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.PlistParser; })()"));
	JS_DefineFunction(cx, tmpObj, "getInstance", js_PlistParser_getInstance, 0, JSPROP_READONLY | JSPROP_PERMANENT);
    tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.PlistParser.getInstance(); })()"));
	JS_DefineFunction(cx, tmpObj, "parse", js_PlistParser_parse, 1, JSPROP_READONLY | JSPROP_PERMANENT);

    
	tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return cc.GLProgram; })()"));
	JS_DefineFunction(cx, tmpObj, "create", js_cocos2dx_CCGLProgram_create, 1, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, tmpObj, "createWithString", js_cocos2dx_CCGLProgram_createWithString, 1, JSPROP_READONLY | JSPROP_PERMANENT);

     tmpObj = JSVAL_TO_OBJECT(anonEvaluate(cx, global, "(function () { return this; })()"));
    JS_DefineFunction(cx, tmpObj, "garbageCollect", js_forceGC, 1, JSPROP_READONLY | JSPROP_PERMANENT);

    JS_DefineFunction(cx, ns, "glEnableVertexAttribs", js_cocos2dx_ccGLEnableVertexAttribs, 1, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, ns, "pAdd", js_cocos2dx_ccpAdd, 1, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, ns, "pDistanceSQ", js_cocos2dx_ccpDistanceSQ, 1, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, ns, "pDistance", js_cocos2dx_ccpDistance, 1, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, ns, "pSub", js_cocos2dx_ccpSub, 0, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, ns, "pNeg", js_cocos2dx_ccpNeg, 0, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, ns, "pMult", js_cocos2dx_ccpMult, 0, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, ns, "pMidpoint", js_cocos2dx_ccpMidpoint, 0, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, ns, "pDot", js_cocos2dx_ccpDot, 0, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, ns, "pCross", js_cocos2dx_ccpCross, 0, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, ns, "pPerp", js_cocos2dx_ccpPerp, 0, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, ns, "pRPerp", js_cocos2dx_ccpRPerp, 0, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, ns, "pProject", js_cocos2dx_ccpProject, 0, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, ns, "pRotate", js_cocos2dx_ccpRotate, 0, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, ns, "pNormalize", js_cocos2dx_ccpNormalize, 0, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, ns, "pClamp", js_cocos2dx_ccpClamp, 2, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction(cx, ns, "pLengthSQ", js_cocos2dx_ccpLengthSQ, 1, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, ns, "pLength", js_cocos2dx_ccpLength, 1, JSPROP_READONLY | JSPROP_PERMANENT);
}
