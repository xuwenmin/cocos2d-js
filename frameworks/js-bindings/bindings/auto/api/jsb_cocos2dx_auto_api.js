/**
 * @module cocos2dx
 */
var cc = cc || {};

/**
 * @class Configuration
 */
cc.Configuration = {

/**
 * @method checkForGLExtension
 * @param {String} arg0
 * @return {bool}
 */
checkForGLExtension : function (
str 
)
{
    return false;
},

/**
 * @method setValue
 * @param {String} arg0
 * @param {cc.Value} arg1
 */
setValue : function (
str, 
value 
)
{
},

/**
 * @method supportsS3TC
 * @return {bool}
 */
supportsS3TC : function (
)
{
    return false;
},

/**
 * @method supportsPVRTC
 * @return {bool}
 */
supportsPVRTC : function (
)
{
    return false;
},

/**
 * @method supportsShareableVAO
 * @return {bool}
 */
supportsShareableVAO : function (
)
{
    return false;
},

/**
 * @method getInfo
 * @return {String}
 */
getInfo : function (
)
{
    return ;
},

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method getMaxTextureUnits
 * @return {int}
 */
getMaxTextureUnits : function (
)
{
    return 0;
},

/**
 * @method supportsNPOT
 * @return {bool}
 */
supportsNPOT : function (
)
{
    return false;
},

/**
 * @method getMaxModelviewStackDepth
 * @return {int}
 */
getMaxModelviewStackDepth : function (
)
{
    return 0;
},

/**
 * @method supportsDiscardFramebuffer
 * @return {bool}
 */
supportsDiscardFramebuffer : function (
)
{
    return false;
},

/**
 * @method supportsATITC
 * @return {bool}
 */
supportsATITC : function (
)
{
    return false;
},

/**
 * @method gatherGPUInfo
 */
gatherGPUInfo : function (
)
{
},

/**
 * @method supportsETC
 * @return {bool}
 */
supportsETC : function (
)
{
    return false;
},

/**
 * @method loadConfigFile
 * @param {String} arg0
 */
loadConfigFile : function (
str 
)
{
},

/**
 * @method getValue
 * @param {String} arg0
 * @param {cc.Value} arg1
 * @return {cc.Value}
 */
getValue : function (
str, 
value 
)
{
    return cc.Value;
},

/**
 * @method getMaxTextureSize
 * @return {int}
 */
getMaxTextureSize : function (
)
{
    return 0;
},

/**
 * @method supportsBGRA8888
 * @return {bool}
 */
supportsBGRA8888 : function (
)
{
    return false;
},

/**
 * @method destroyInstance
 */
destroyInstance : function (
)
{
},

/**
 * @method getInstance
 * @return {cc.Configuration}
 */
getInstance : function (
)
{
    return cc.Configuration;
},

};

/**
 * @class EventListener
 */
cc.EventListener = {

/**
 * @method setEnabled
 * @param {bool} arg0
 */
setEnabled : function (
bool 
)
{
},

/**
 * @method clone
 * @return {cc.EventListener}
 */
clone : function (
)
{
    return cc.EventListener;
},

/**
 * @method isEnabled
 * @return {bool}
 */
isEnabled : function (
)
{
    return false;
},

/**
 * @method checkAvailable
 * @return {bool}
 */
checkAvailable : function (
)
{
    return false;
},

};

/**
 * @class Event
 */
cc.Event = {

/**
 * @method isStopped
 * @return {bool}
 */
isStopped : function (
)
{
    return false;
},

/**
 * @method getType
 * @return {cc.Event::Type}
 */
getType : function (
)
{
    return 0;
},

/**
 * @method getCurrentTarget
 * @return {cc.Node}
 */
getCurrentTarget : function (
)
{
    return cc.Node;
},

/**
 * @method stopPropagation
 */
stopPropagation : function (
)
{
},

};

/**
 * @class EventDispatcher
 */
cc.EventDispatcher = {

/**
 * @method setEnabled
 * @param {bool} arg0
 */
setEnabled : function (
bool 
)
{
},

/**
 * @method removeAllEventListeners
 */
removeAllEventListeners : function (
)
{
},

/**
 * @method addEventListenerWithSceneGraphPriority
 * @param {cc.EventListener} arg0
 * @param {cc.Node} arg1
 */
addEventListenerWithSceneGraphPriority : function (
eventlistener, 
node 
)
{
},

/**
 * @method addCustomEventListener
 * @param {String} arg0
 * @param {function} arg1
 * @return {cc.EventListenerCustom}
 */
addCustomEventListener : function (
str, 
func 
)
{
    return cc.EventListenerCustom;
},

/**
 * @method addEventListenerWithFixedPriority
 * @param {cc.EventListener} arg0
 * @param {int} arg1
 */
addEventListenerWithFixedPriority : function (
eventlistener, 
int 
)
{
},

/**
 * @method removeEventListenersForTarget
* @param {cc.Node|cc.EventListener::Type} node
* @param {bool} bool
*/
removeEventListenersForTarget : function(
node,
bool 
)
{
},

/**
 * @method resumeEventListenersForTarget
 * @param {cc.Node} arg0
 * @param {bool} arg1
 */
resumeEventListenersForTarget : function (
node, 
bool 
)
{
},

/**
 * @method setPriority
 * @param {cc.EventListener} arg0
 * @param {int} arg1
 */
setPriority : function (
eventlistener, 
int 
)
{
},

/**
 * @method dispatchEvent
 * @param {cc.Event} arg0
 */
dispatchEvent : function (
event 
)
{
},

/**
 * @method pauseEventListenersForTarget
 * @param {cc.Node} arg0
 * @param {bool} arg1
 */
pauseEventListenersForTarget : function (
node, 
bool 
)
{
},

/**
 * @method removeCustomEventListeners
 * @param {String} arg0
 */
removeCustomEventListeners : function (
str 
)
{
},

/**
 * @method removeEventListener
 * @param {cc.EventListener} arg0
 */
removeEventListener : function (
eventlistener 
)
{
},

/**
 * @method isEnabled
 * @return {bool}
 */
isEnabled : function (
)
{
    return false;
},

/**
 * @method EventDispatcher
 * @constructor
 */
EventDispatcher : function (
)
{
},

};

/**
 * @class Touch
 */
cc.Touch = {

/**
 * @method getPreviousLocationInView
 * @return {vec2_object}
 */
getPreviousLocationInView : function (
)
{
    return cc.Vec2;
},

/**
 * @method getLocation
 * @return {vec2_object}
 */
getLocation : function (
)
{
    return cc.Vec2;
},

/**
 * @method getDelta
 * @return {vec2_object}
 */
getDelta : function (
)
{
    return cc.Vec2;
},

/**
 * @method getStartLocationInView
 * @return {vec2_object}
 */
getStartLocationInView : function (
)
{
    return cc.Vec2;
},

/**
 * @method getStartLocation
 * @return {vec2_object}
 */
getStartLocation : function (
)
{
    return cc.Vec2;
},

/**
 * @method getID
 * @return {int}
 */
getID : function (
)
{
    return 0;
},

/**
 * @method setTouchInfo
 * @param {int} arg0
 * @param {float} arg1
 * @param {float} arg2
 */
setTouchInfo : function (
int, 
float, 
float 
)
{
},

/**
 * @method getLocationInView
 * @return {vec2_object}
 */
getLocationInView : function (
)
{
    return cc.Vec2;
},

/**
 * @method getPreviousLocation
 * @return {vec2_object}
 */
getPreviousLocation : function (
)
{
    return cc.Vec2;
},

/**
 * @method Touch
 * @constructor
 */
Touch : function (
)
{
},

};

/**
 * @class EventTouch
 */
cc.EventTouch = {

/**
 * @method getEventCode
 * @return {cc.EventTouch::EventCode}
 */
getEventCode : function (
)
{
    return 0;
},

/**
 * @method setEventCode
 * @param {cc.EventTouch::EventCode} arg0
 */
setEventCode : function (
eventcode 
)
{
},

/**
 * @method EventTouch
 * @constructor
 */
EventTouch : function (
)
{
},

};

/**
 * @class EventKeyboard
 */
cc.EventKeyboard = {

/**
 * @method EventKeyboard
 * @constructor
 * @param {cc.EventKeyboard::KeyCode} arg0
 * @param {bool} arg1
 */
EventKeyboard : function (
keycode, 
bool 
)
{
},

};

/**
 * @class Texture2D
 */
cc.Texture2D = {

/**
 * @method getMaxT
 * @return {float}
 */
getMaxT : function (
)
{
    return 0;
},

/**
 * @method getStringForFormat
 * @return {char}
 */
getStringForFormat : function (
)
{
    return 0;
},

/**
 * @method initWithImage
* @param {cc.Image|cc.Image} image
* @param {cc.Texture2D::PixelFormat} pixelformat
* @return {bool|bool}
*/
initWithImage : function(
image,
pixelformat 
)
{
    return false;
},

/**
 * @method getMaxS
 * @return {float}
 */
getMaxS : function (
)
{
    return 0;
},

/**
 * @method releaseGLTexture
 */
releaseGLTexture : function (
)
{
},

/**
 * @method hasPremultipliedAlpha
 * @return {bool}
 */
hasPremultipliedAlpha : function (
)
{
    return false;
},

/**
 * @method initWithMipmaps
 * @param {cc._MipmapInfo} arg0
 * @param {int} arg1
 * @param {cc.Texture2D::PixelFormat} arg2
 * @param {int} arg3
 * @param {int} arg4
 * @return {bool}
 */
initWithMipmaps : function (
map, 
int, 
pixelformat, 
int, 
int 
)
{
    return false;
},

/**
 * @method getPixelsHigh
 * @return {int}
 */
getPixelsHigh : function (
)
{
    return 0;
},

/**
 * @method getBitsPerPixelForFormat
* @param {cc.Texture2D::PixelFormat} pixelformat
* @return {unsigned int|unsigned int}
*/
getBitsPerPixelForFormat : function(
pixelformat 
)
{
    return 0;
},

/**
 * @method getName
 * @return {unsigned int}
 */
getName : function (
)
{
    return 0;
},

/**
 * @method initWithString
* @param {char|char} char
* @param {cc.FontDefinition|String} fontdefinition
* @param {float} float
* @param {size_object} size
* @param {cc.TextHAlignment} texthalignment
* @param {cc.TextVAlignment} textvalignment
* @return {bool|bool}
*/
initWithString : function(
char,
str,
float,
size,
texthalignment,
textvalignment 
)
{
    return false;
},

/**
 * @method setMaxT
 * @param {float} arg0
 */
setMaxT : function (
float 
)
{
},

/**
 * @method drawInRect
 * @param {rect_object} arg0
 */
drawInRect : function (
rect 
)
{
},

/**
 * @method getContentSize
 * @return {size_object}
 */
getContentSize : function (
)
{
    return cc.Size;
},

/**
 * @method setAliasTexParameters
 */
setAliasTexParameters : function (
)
{
},

/**
 * @method setAntiAliasTexParameters
 */
setAntiAliasTexParameters : function (
)
{
},

/**
 * @method generateMipmap
 */
generateMipmap : function (
)
{
},

/**
 * @method getDescription
 * @return {String}
 */
getDescription : function (
)
{
    return ;
},

/**
 * @method getPixelFormat
 * @return {cc.Texture2D::PixelFormat}
 */
getPixelFormat : function (
)
{
    return 0;
},

/**
 * @method setGLProgram
 * @param {cc.GLProgram} arg0
 */
setGLProgram : function (
glprogram 
)
{
},

/**
 * @method getContentSizeInPixels
 * @return {size_object}
 */
getContentSizeInPixels : function (
)
{
    return cc.Size;
},

/**
 * @method getPixelsWide
 * @return {int}
 */
getPixelsWide : function (
)
{
    return 0;
},

/**
 * @method drawAtPoint
 * @param {vec2_object} arg0
 */
drawAtPoint : function (
vec2 
)
{
},

/**
 * @method getGLProgram
 * @return {cc.GLProgram}
 */
getGLProgram : function (
)
{
    return cc.GLProgram;
},

/**
 * @method hasMipmaps
 * @return {bool}
 */
hasMipmaps : function (
)
{
    return false;
},

/**
 * @method setMaxS
 * @param {float} arg0
 */
setMaxS : function (
float 
)
{
},

/**
 * @method setDefaultAlphaPixelFormat
 * @param {cc.Texture2D::PixelFormat} arg0
 */
setDefaultAlphaPixelFormat : function (
pixelformat 
)
{
},

/**
 * @method getDefaultAlphaPixelFormat
 * @return {cc.Texture2D::PixelFormat}
 */
getDefaultAlphaPixelFormat : function (
)
{
    return 0;
},

/**
 * @method PVRImagesHavePremultipliedAlpha
 * @param {bool} arg0
 */
PVRImagesHavePremultipliedAlpha : function (
bool 
)
{
},

/**
 * @method Texture2D
 * @constructor
 */
Texture2D : function (
)
{
},

};

/**
 * @class Node
 */
cc.Node = {

/**
 * @method addChild
* @param {cc.Node|cc.Node|cc.Node|cc.Node} node
* @param {int|int|int} int
* @param {int|String} int
*/
addChild : function(
node,
int,
str 
)
{
},

/**
 * @method removeComponent
 * @param {String} arg0
 * @return {bool}
 */
removeComponent : function (
str 
)
{
    return false;
},

/**
 * @method setPhysicsBody
 * @param {cc.PhysicsBody} arg0
 */
setPhysicsBody : function (
physicsbody 
)
{
},

/**
 * @method getDescription
 * @return {String}
 */
getDescription : function (
)
{
    return ;
},

/**
 * @method setRotationSkewY
 * @param {float} arg0
 */
setRotationSkewY : function (
float 
)
{
},

/**
 * @method setOpacityModifyRGB
 * @param {bool} arg0
 */
setOpacityModifyRGB : function (
bool 
)
{
},

/**
 * @method setCascadeOpacityEnabled
 * @param {bool} arg0
 */
setCascadeOpacityEnabled : function (
bool 
)
{
},

/**
 * @method getChildren
* @return {Array|Array}
*/
getChildren : function(
)
{
    return new Array();
},

/**
 * @method pause
 */
pause : function (
)
{
},

/**
 * @method convertToWorldSpaceAR
 * @param {vec2_object} arg0
 * @return {vec2_object}
 */
convertToWorldSpaceAR : function (
vec2 
)
{
    return cc.Vec2;
},

/**
 * @method isIgnoreAnchorPointForPosition
 * @return {bool}
 */
isIgnoreAnchorPointForPosition : function (
)
{
    return false;
},

/**
 * @method getChildByName
 * @param {String} arg0
 * @return {cc.Node}
 */
getChildByName : function (
str 
)
{
    return cc.Node;
},

/**
 * @method updateDisplayedOpacity
 * @param {unsigned char} arg0
 */
updateDisplayedOpacity : function (
char 
)
{
},

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method setRotation
 * @param {float} arg0
 */
setRotation : function (
float 
)
{
},

/**
 * @method setScaleZ
 * @param {float} arg0
 */
setScaleZ : function (
float 
)
{
},

/**
 * @method setScaleY
 * @param {float} arg0
 */
setScaleY : function (
float 
)
{
},

/**
 * @method setScaleX
 * @param {float} arg0
 */
setScaleX : function (
float 
)
{
},

/**
 * @method setRotationSkewX
 * @param {float} arg0
 */
setRotationSkewX : function (
float 
)
{
},

/**
 * @method removeAllComponents
 */
removeAllComponents : function (
)
{
},

/**
 * @method _setLocalZOrder
 * @param {int} arg0
 */
_setLocalZOrder : function (
int 
)
{
},

/**
 * @method getTag
 * @return {int}
 */
getTag : function (
)
{
    return 0;
},

/**
 * @method getGLProgram
 * @return {cc.GLProgram}
 */
getGLProgram : function (
)
{
    return cc.GLProgram;
},

/**
 * @method getNodeToWorldTransform
 * @return {mat4_object}
 */
getNodeToWorldTransform : function (
)
{
    return cc.Mat4;
},

/**
 * @method getPosition3D
 * @return {vec3_object}
 */
getPosition3D : function (
)
{
    return cc.Vec3;
},

/**
 * @method removeChild
 * @param {cc.Node} arg0
 * @param {bool} arg1
 */
removeChild : function (
node, 
bool 
)
{
},

/**
 * @method convertToWorldSpace
 * @param {vec2_object} arg0
 * @return {vec2_object}
 */
convertToWorldSpace : function (
vec2 
)
{
    return cc.Vec2;
},

/**
 * @method getScene
 * @return {cc.Scene}
 */
getScene : function (
)
{
    return cc.Scene;
},

/**
 * @method getEventDispatcher
 * @return {cc.EventDispatcher}
 */
getEventDispatcher : function (
)
{
    return cc.EventDispatcher;
},

/**
 * @method setSkewX
 * @param {float} arg0
 */
setSkewX : function (
float 
)
{
},

/**
 * @method setGLProgramState
 * @param {cc.GLProgramState} arg0
 */
setGLProgramState : function (
glprogramstate 
)
{
},

/**
 * @method getOpacity
 * @return {unsigned char}
 */
getOpacity : function (
)
{
    return 0;
},

/**
 * @method setNormalizedPosition
 * @param {vec2_object} arg0
 */
setNormalizedPosition : function (
vec2 
)
{
},

/**
 * @method convertTouchToNodeSpace
 * @param {cc.Touch} arg0
 * @return {vec2_object}
 */
convertTouchToNodeSpace : function (
touch 
)
{
    return cc.Vec2;
},

/**
 * @method removeAllChildrenWithCleanup
* @param {bool} bool
*/
removeAllChildrenWithCleanup : function(
bool 
)
{
},

/**
 * @method getNodeToParentAffineTransform
 * @return {cc.AffineTransform}
 */
getNodeToParentAffineTransform : function (
)
{
    return cc.AffineTransform;
},

/**
 * @method isCascadeOpacityEnabled
 * @return {bool}
 */
isCascadeOpacityEnabled : function (
)
{
    return false;
},

/**
 * @method setParent
 * @param {cc.Node} arg0
 */
setParent : function (
node 
)
{
},

/**
 * @method getName
 * @return {String}
 */
getName : function (
)
{
    return ;
},

/**
 * @method getRotation3D
 * @return {vec3_object}
 */
getRotation3D : function (
)
{
    return cc.Vec3;
},

/**
 * @method getNodeToParentTransform
 * @return {mat4_object}
 */
getNodeToParentTransform : function (
)
{
    return cc.Mat4;
},

/**
 * @method convertTouchToNodeSpaceAR
 * @param {cc.Touch} arg0
 * @return {vec2_object}
 */
convertTouchToNodeSpaceAR : function (
touch 
)
{
    return cc.Vec2;
},

/**
 * @method convertToNodeSpace
 * @param {vec2_object} arg0
 * @return {vec2_object}
 */
convertToNodeSpace : function (
vec2 
)
{
    return cc.Vec2;
},

/**
 * @method resume
 */
resume : function (
)
{
},

/**
 * @method getPhysicsBody
 * @return {cc.PhysicsBody}
 */
getPhysicsBody : function (
)
{
    return cc.PhysicsBody;
},

/**
 * @method stopActionByTag
 * @param {int} arg0
 */
stopActionByTag : function (
int 
)
{
},

/**
 * @method reorderChild
 * @param {cc.Node} arg0
 * @param {int} arg1
 */
reorderChild : function (
node, 
int 
)
{
},

/**
 * @method ignoreAnchorPointForPosition
 * @param {bool} arg0
 */
ignoreAnchorPointForPosition : function (
bool 
)
{
},

/**
 * @method setSkewY
 * @param {float} arg0
 */
setSkewY : function (
float 
)
{
},

/**
 * @method setRotation3D
 * @param {vec3_object} arg0
 */
setRotation3D : function (
vec3 
)
{
},

/**
 * @method setPositionX
 * @param {float} arg0
 */
setPositionX : function (
float 
)
{
},

/**
 * @method setNodeToParentTransform
 * @param {mat4_object} arg0
 */
setNodeToParentTransform : function (
mat4 
)
{
},

/**
 * @method getAnchorPoint
 * @return {vec2_object}
 */
getAnchorPoint : function (
)
{
    return cc.Vec2;
},

/**
 * @method getNumberOfRunningActions
 * @return {long}
 */
getNumberOfRunningActions : function (
)
{
    return 0;
},

/**
 * @method updateTransform
 */
updateTransform : function (
)
{
},

/**
 * @method setGLProgram
 * @param {cc.GLProgram} arg0
 */
setGLProgram : function (
glprogram 
)
{
},

/**
 * @method isVisible
 * @return {bool}
 */
isVisible : function (
)
{
    return false;
},

/**
 * @method getChildrenCount
 * @return {long}
 */
getChildrenCount : function (
)
{
    return 0;
},

/**
 * @method convertToNodeSpaceAR
 * @param {vec2_object} arg0
 * @return {vec2_object}
 */
convertToNodeSpaceAR : function (
vec2 
)
{
    return cc.Vec2;
},

/**
 * @method addComponent
 * @param {cc.Component} arg0
 * @return {bool}
 */
addComponent : function (
component 
)
{
    return false;
},

/**
 * @method runAction
 * @param {cc.Action} arg0
 * @return {cc.Action}
 */
runAction : function (
action 
)
{
    return cc.Action;
},

/**
 * @method isOpacityModifyRGB
 * @return {bool}
 */
isOpacityModifyRGB : function (
)
{
    return false;
},

/**
 * @method getRotation
 * @return {float}
 */
getRotation : function (
)
{
    return 0;
},

/**
 * @method getAnchorPointInPoints
 * @return {vec2_object}
 */
getAnchorPointInPoints : function (
)
{
    return cc.Vec2;
},

/**
 * @method visit
* @param {cc.Renderer} renderer
* @param {mat4_object} mat4
* @param {unsigned int} int
*/
visit : function(
renderer,
mat4,
int 
)
{
},

/**
 * @method removeChildByName
 * @param {String} arg0
 * @param {bool} arg1
 */
removeChildByName : function (
str, 
bool 
)
{
},

/**
 * @method setPositionZ
 * @param {float} arg0
 */
setPositionZ : function (
float 
)
{
},

/**
 * @method getGLProgramState
 * @return {cc.GLProgramState}
 */
getGLProgramState : function (
)
{
    return cc.GLProgramState;
},

/**
 * @method setScheduler
 * @param {cc.Scheduler} arg0
 */
setScheduler : function (
scheduler 
)
{
},

/**
 * @method stopAllActions
 */
stopAllActions : function (
)
{
},

/**
 * @method getSkewX
 * @return {float}
 */
getSkewX : function (
)
{
    return 0;
},

/**
 * @method getSkewY
 * @return {float}
 */
getSkewY : function (
)
{
    return 0;
},

/**
 * @method getDisplayedColor
 * @return {color3b_object}
 */
getDisplayedColor : function (
)
{
    return cc.Color3B;
},

/**
 * @method getActionByTag
 * @param {int} arg0
 * @return {cc.Action}
 */
getActionByTag : function (
int 
)
{
    return cc.Action;
},

/**
 * @method setName
 * @param {String} arg0
 */
setName : function (
str 
)
{
},

/**
 * @method setAdditionalTransform
* @param {cc.AffineTransform|mat4_object} affinetransform
*/
setAdditionalTransform : function(
mat4 
)
{
},

/**
 * @method getDisplayedOpacity
 * @return {unsigned char}
 */
getDisplayedOpacity : function (
)
{
    return 0;
},

/**
 * @method getLocalZOrder
 * @return {int}
 */
getLocalZOrder : function (
)
{
    return 0;
},

/**
 * @method getScheduler
* @return {cc.Scheduler|cc.Scheduler}
*/
getScheduler : function(
)
{
    return cc.Scheduler;
},

/**
 * @method getParentToNodeAffineTransform
 * @return {cc.AffineTransform}
 */
getParentToNodeAffineTransform : function (
)
{
    return cc.AffineTransform;
},

/**
 * @method getOrderOfArrival
 * @return {int}
 */
getOrderOfArrival : function (
)
{
    return 0;
},

/**
 * @method setActionManager
 * @param {cc.ActionManager} arg0
 */
setActionManager : function (
actionmanager 
)
{
},

/**
 * @method getPosition
* @param {float} float
* @param {float} float
* @return {vec2_object}
*/
getPosition : function(
float,
float 
)
{
},

/**
 * @method isRunning
 * @return {bool}
 */
isRunning : function (
)
{
    return false;
},

/**
 * @method getParent
* @return {cc.Node|cc.Node}
*/
getParent : function(
)
{
    return cc.Node;
},

/**
 * @method getPositionY
 * @return {float}
 */
getPositionY : function (
)
{
    return 0;
},

/**
 * @method getPositionX
 * @return {float}
 */
getPositionX : function (
)
{
    return 0;
},

/**
 * @method removeChildByTag
 * @param {int} arg0
 * @param {bool} arg1
 */
removeChildByTag : function (
int, 
bool 
)
{
},

/**
 * @method setPositionY
 * @param {float} arg0
 */
setPositionY : function (
float 
)
{
},

/**
 * @method getNodeToWorldAffineTransform
 * @return {cc.AffineTransform}
 */
getNodeToWorldAffineTransform : function (
)
{
    return cc.AffineTransform;
},

/**
 * @method updateDisplayedColor
 * @param {color3b_object} arg0
 */
updateDisplayedColor : function (
color3b 
)
{
},

/**
 * @method setVisible
 * @param {bool} arg0
 */
setVisible : function (
bool 
)
{
},

/**
 * @method getParentToNodeTransform
 * @return {mat4_object}
 */
getParentToNodeTransform : function (
)
{
    return cc.Mat4;
},

/**
 * @method getPositionZ
 * @return {float}
 */
getPositionZ : function (
)
{
    return 0;
},

/**
 * @method setGlobalZOrder
 * @param {float} arg0
 */
setGlobalZOrder : function (
float 
)
{
},

/**
 * @method setScale
* @param {float|float} float
* @param {float} float
*/
setScale : function(
float,
float 
)
{
},

/**
 * @method getChildByTag
 * @param {int} arg0
 * @return {cc.Node}
 */
getChildByTag : function (
int 
)
{
    return cc.Node;
},

/**
 * @method setOrderOfArrival
 * @param {int} arg0
 */
setOrderOfArrival : function (
int 
)
{
},

/**
 * @method getScaleZ
 * @return {float}
 */
getScaleZ : function (
)
{
    return 0;
},

/**
 * @method getScaleY
 * @return {float}
 */
getScaleY : function (
)
{
    return 0;
},

/**
 * @method getScaleX
 * @return {float}
 */
getScaleX : function (
)
{
    return 0;
},

/**
 * @method setLocalZOrder
 * @param {int} arg0
 */
setLocalZOrder : function (
int 
)
{
},

/**
 * @method getWorldToNodeAffineTransform
 * @return {cc.AffineTransform}
 */
getWorldToNodeAffineTransform : function (
)
{
    return cc.AffineTransform;
},

/**
 * @method setCascadeColorEnabled
 * @param {bool} arg0
 */
setCascadeColorEnabled : function (
bool 
)
{
},

/**
 * @method setOpacity
 * @param {unsigned char} arg0
 */
setOpacity : function (
char 
)
{
},

/**
 * @method cleanup
 */
cleanup : function (
)
{
},

/**
 * @method getComponent
 * @param {String} arg0
 * @return {cc.Component}
 */
getComponent : function (
str 
)
{
    return cc.Component;
},

/**
 * @method getContentSize
 * @return {size_object}
 */
getContentSize : function (
)
{
    return cc.Size;
},

/**
 * @method getColor
 * @return {color3b_object}
 */
getColor : function (
)
{
    return cc.Color3B;
},

/**
 * @method getBoundingBox
 * @return {rect_object}
 */
getBoundingBox : function (
)
{
    return cc.Rect;
},

/**
 * @method setEventDispatcher
 * @param {cc.EventDispatcher} arg0
 */
setEventDispatcher : function (
eventdispatcher 
)
{
},

/**
 * @method getGlobalZOrder
 * @return {float}
 */
getGlobalZOrder : function (
)
{
    return 0;
},

/**
 * @method draw
* @param {cc.Renderer} renderer
* @param {mat4_object} mat4
* @param {unsigned int} int
*/
draw : function(
renderer,
mat4,
int 
)
{
},

/**
 * @method setUserObject
 * @param {cc.Ref} arg0
 */
setUserObject : function (
ref 
)
{
},

/**
 * @method enumerateChildren
 * @param {String} arg0
 * @param {function} arg1
 */
enumerateChildren : function (
str, 
func 
)
{
},

/**
 * @method removeFromParentAndCleanup
* @param {bool} bool
*/
removeFromParentAndCleanup : function(
bool 
)
{
},

/**
 * @method setPosition3D
 * @param {vec3_object} arg0
 */
setPosition3D : function (
vec3 
)
{
},

/**
 * @method update
 * @param {float} arg0
 */
update : function (
float 
)
{
},

/**
 * @method sortAllChildren
 */
sortAllChildren : function (
)
{
},

/**
 * @method getWorldToNodeTransform
 * @return {mat4_object}
 */
getWorldToNodeTransform : function (
)
{
    return cc.Mat4;
},

/**
 * @method getScale
 * @return {float}
 */
getScale : function (
)
{
    return 0;
},

/**
 * @method getNormalizedPosition
 * @return {vec2_object}
 */
getNormalizedPosition : function (
)
{
    return cc.Vec2;
},

/**
 * @method getRotationSkewX
 * @return {float}
 */
getRotationSkewX : function (
)
{
    return 0;
},

/**
 * @method getRotationSkewY
 * @return {float}
 */
getRotationSkewY : function (
)
{
    return 0;
},

/**
 * @method setTag
 * @param {int} arg0
 */
setTag : function (
int 
)
{
},

/**
 * @method isCascadeColorEnabled
 * @return {bool}
 */
isCascadeColorEnabled : function (
)
{
    return false;
},

/**
 * @method stopAction
 * @param {cc.Action} arg0
 */
stopAction : function (
action 
)
{
},

/**
 * @method getActionManager
* @return {cc.ActionManager|cc.ActionManager}
*/
getActionManager : function(
)
{
    return cc.ActionManager;
},

/**
 * @method create
 * @return {cc.Node}
 */
create : function (
)
{
    return cc.Node;
},

/**
 * @method Node
 * @constructor
 */
Node : function (
)
{
},

};

/**
 * @class __NodeRGBA
 */
cc.NodeRGBA = {

/**
 * @method __NodeRGBA
 * @constructor
 */
__NodeRGBA : function (
)
{
},

};

/**
 * @class AtlasNode
 */
cc.AtlasNode = {

/**
 * @method updateAtlasValues
 */
updateAtlasValues : function (
)
{
},

/**
 * @method initWithTileFile
 * @param {String} arg0
 * @param {int} arg1
 * @param {int} arg2
 * @param {int} arg3
 * @return {bool}
 */
initWithTileFile : function (
str, 
int, 
int, 
int 
)
{
    return false;
},

/**
 * @method getTexture
 * @return {cc.Texture2D}
 */
getTexture : function (
)
{
    return cc.Texture2D;
},

/**
 * @method setTextureAtlas
 * @param {cc.TextureAtlas} arg0
 */
setTextureAtlas : function (
textureatlas 
)
{
},

/**
 * @method setBlendFunc
 * @param {cc.BlendFunc} arg0
 */
setBlendFunc : function (
blendfunc 
)
{
},

/**
 * @method getTextureAtlas
 * @return {cc.TextureAtlas}
 */
getTextureAtlas : function (
)
{
    return cc.TextureAtlas;
},

/**
 * @method getBlendFunc
 * @return {cc.BlendFunc}
 */
getBlendFunc : function (
)
{
    return cc.BlendFunc;
},

/**
 * @method getQuadsToDraw
 * @return {long}
 */
getQuadsToDraw : function (
)
{
    return 0;
},

/**
 * @method setTexture
 * @param {cc.Texture2D} arg0
 */
setTexture : function (
texture2d 
)
{
},

/**
 * @method initWithTexture
 * @param {cc.Texture2D} arg0
 * @param {int} arg1
 * @param {int} arg2
 * @param {int} arg3
 * @return {bool}
 */
initWithTexture : function (
texture2d, 
int, 
int, 
int 
)
{
    return false;
},

/**
 * @method setQuadsToDraw
 * @param {long} arg0
 */
setQuadsToDraw : function (
long 
)
{
},

/**
 * @method create
 * @param {String} arg0
 * @param {int} arg1
 * @param {int} arg2
 * @param {int} arg3
 * @return {cc.AtlasNode}
 */
create : function (
str, 
int, 
int, 
int 
)
{
    return cc.AtlasNode;
},

/**
 * @method AtlasNode
 * @constructor
 */
AtlasNode : function (
)
{
},

};

/**
 * @class LabelAtlas
 */
cc.LabelAtlas = {

/**
 * @method setString
 * @param {String} arg0
 */
setString : function (
str 
)
{
},

/**
 * @method initWithString
* @param {String|String|String} str
* @param {String|String|cc.Texture2D} str
* @param {int|int} int
* @param {int|int} int
* @param {int|int} int
* @return {bool|bool|bool}
*/
initWithString : function(
str,
texture2d,
int,
int,
int 
)
{
    return false;
},

/**
 * @method updateAtlasValues
 */
updateAtlasValues : function (
)
{
},

/**
 * @method getString
 * @return {String}
 */
getString : function (
)
{
    return ;
},

/**
 * @method create
* @param {String|String} str
* @param {String|String} str
* @param {int} int
* @param {int} int
* @param {int} int
* @return {cc.LabelAtlas|cc.LabelAtlas|cc.LabelAtlas}
*/
create : function(
str,
str,
int,
int,
int 
)
{
    return cc.LabelAtlas;
},

};

/**
 * @class Director
 */
cc.Director = {

/**
 * @method pause
 */
pause : function (
)
{
},

/**
 * @method setEventDispatcher
 * @param {cc.EventDispatcher} arg0
 */
setEventDispatcher : function (
eventdispatcher 
)
{
},

/**
 * @method pushScene
 * @param {cc.Scene} arg0
 */
pushScene : function (
scene 
)
{
},

/**
 * @method getDeltaTime
 * @return {float}
 */
getDeltaTime : function (
)
{
    return 0;
},

/**
 * @method getContentScaleFactor
 * @return {float}
 */
getContentScaleFactor : function (
)
{
    return 0;
},

/**
 * @method getWinSizeInPixels
 * @return {size_object}
 */
getWinSizeInPixels : function (
)
{
    return cc.Size;
},

/**
 * @method pushMatrix
 * @param {cc.MATRIX_STACK_TYPE} arg0
 */
pushMatrix : function (
matrix_stack_type 
)
{
},

/**
 * @method setGLDefaultValues
 */
setGLDefaultValues : function (
)
{
},

/**
 * @method setActionManager
 * @param {cc.ActionManager} arg0
 */
setActionManager : function (
actionmanager 
)
{
},

/**
 * @method setAlphaBlending
 * @param {bool} arg0
 */
setAlphaBlending : function (
bool 
)
{
},

/**
 * @method popToRootScene
 */
popToRootScene : function (
)
{
},

/**
 * @method loadMatrix
 * @param {cc.MATRIX_STACK_TYPE} arg0
 * @param {mat4_object} arg1
 */
loadMatrix : function (
matrix_stack_type, 
mat4 
)
{
},

/**
 * @method getNotificationNode
 * @return {cc.Node}
 */
getNotificationNode : function (
)
{
    return cc.Node;
},

/**
 * @method getWinSize
 * @return {size_object}
 */
getWinSize : function (
)
{
    return cc.Size;
},

/**
 * @method end
 */
end : function (
)
{
},

/**
 * @method getTextureCache
 * @return {cc.TextureCache}
 */
getTextureCache : function (
)
{
    return cc.TextureCache;
},

/**
 * @method isSendCleanupToScene
 * @return {bool}
 */
isSendCleanupToScene : function (
)
{
    return false;
},

/**
 * @method getVisibleOrigin
 * @return {vec2_object}
 */
getVisibleOrigin : function (
)
{
    return cc.Vec2;
},

/**
 * @method mainLoop
 */
mainLoop : function (
)
{
},

/**
 * @method setDepthTest
 * @param {bool} arg0
 */
setDepthTest : function (
bool 
)
{
},

/**
 * @method getFrameRate
 * @return {float}
 */
getFrameRate : function (
)
{
    return 0;
},

/**
 * @method getSecondsPerFrame
 * @return {float}
 */
getSecondsPerFrame : function (
)
{
    return 0;
},

/**
 * @method convertToUI
 * @param {vec2_object} arg0
 * @return {vec2_object}
 */
convertToUI : function (
vec2 
)
{
    return cc.Vec2;
},

/**
 * @method setDefaultValues
 */
setDefaultValues : function (
)
{
},

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method setScheduler
 * @param {cc.Scheduler} arg0
 */
setScheduler : function (
scheduler 
)
{
},

/**
 * @method startAnimation
 */
startAnimation : function (
)
{
},

/**
 * @method getOpenGLView
 * @return {cc.GLView}
 */
getOpenGLView : function (
)
{
    return cc.GLView;
},

/**
 * @method getRunningScene
 * @return {cc.Scene}
 */
getRunningScene : function (
)
{
    return cc.Scene;
},

/**
 * @method setViewport
 */
setViewport : function (
)
{
},

/**
 * @method stopAnimation
 */
stopAnimation : function (
)
{
},

/**
 * @method setContentScaleFactor
 * @param {float} arg0
 */
setContentScaleFactor : function (
float 
)
{
},

/**
 * @method popToSceneStackLevel
 * @param {int} arg0
 */
popToSceneStackLevel : function (
int 
)
{
},

/**
 * @method resume
 */
resume : function (
)
{
},

/**
 * @method isNextDeltaTimeZero
 * @return {bool}
 */
isNextDeltaTimeZero : function (
)
{
    return false;
},

/**
 * @method setOpenGLView
 * @param {cc.GLView} arg0
 */
setOpenGLView : function (
glview 
)
{
},

/**
 * @method convertToGL
 * @param {vec2_object} arg0
 * @return {vec2_object}
 */
convertToGL : function (
vec2 
)
{
    return cc.Vec2;
},

/**
 * @method purgeCachedData
 */
purgeCachedData : function (
)
{
},

/**
 * @method getTotalFrames
 * @return {unsigned int}
 */
getTotalFrames : function (
)
{
    return 0;
},

/**
 * @method runWithScene
 * @param {cc.Scene} arg0
 */
runWithScene : function (
scene 
)
{
},

/**
 * @method setNotificationNode
 * @param {cc.Node} arg0
 */
setNotificationNode : function (
node 
)
{
},

/**
 * @method drawScene
 */
drawScene : function (
)
{
},

/**
 * @method getZEye
 * @return {float}
 */
getZEye : function (
)
{
    return 0;
},

/**
 * @method getMatrix
 * @param {cc.MATRIX_STACK_TYPE} arg0
 * @return {mat4_object}
 */
getMatrix : function (
matrix_stack_type 
)
{
    return cc.Mat4;
},

/**
 * @method popScene
 */
popScene : function (
)
{
},

/**
 * @method isDisplayStats
 * @return {bool}
 */
isDisplayStats : function (
)
{
    return false;
},

/**
 * @method setProjection
 * @param {cc.Director::Projection} arg0
 */
setProjection : function (
projection 
)
{
},

/**
 * @method loadIdentityMatrix
 * @param {cc.MATRIX_STACK_TYPE} arg0
 */
loadIdentityMatrix : function (
matrix_stack_type 
)
{
},

/**
 * @method setNextDeltaTimeZero
 * @param {bool} arg0
 */
setNextDeltaTimeZero : function (
bool 
)
{
},

/**
 * @method resetMatrixStack
 */
resetMatrixStack : function (
)
{
},

/**
 * @method popMatrix
 * @param {cc.MATRIX_STACK_TYPE} arg0
 */
popMatrix : function (
matrix_stack_type 
)
{
},

/**
 * @method getVisibleSize
 * @return {size_object}
 */
getVisibleSize : function (
)
{
    return cc.Size;
},

/**
 * @method getScheduler
 * @return {cc.Scheduler}
 */
getScheduler : function (
)
{
    return cc.Scheduler;
},

/**
 * @method setAnimationInterval
 * @param {double} arg0
 */
setAnimationInterval : function (
double 
)
{
},

/**
 * @method getAnimationInterval
 * @return {double}
 */
getAnimationInterval : function (
)
{
    return 0;
},

/**
 * @method isPaused
 * @return {bool}
 */
isPaused : function (
)
{
    return false;
},

/**
 * @method setDisplayStats
 * @param {bool} arg0
 */
setDisplayStats : function (
bool 
)
{
},

/**
 * @method getEventDispatcher
 * @return {cc.EventDispatcher}
 */
getEventDispatcher : function (
)
{
    return cc.EventDispatcher;
},

/**
 * @method replaceScene
 * @param {cc.Scene} arg0
 */
replaceScene : function (
scene 
)
{
},

/**
 * @method multiplyMatrix
 * @param {cc.MATRIX_STACK_TYPE} arg0
 * @param {mat4_object} arg1
 */
multiplyMatrix : function (
matrix_stack_type, 
mat4 
)
{
},

/**
 * @method getActionManager
 * @return {cc.ActionManager}
 */
getActionManager : function (
)
{
    return cc.ActionManager;
},

/**
 * @method getInstance
 * @return {cc.Director}
 */
getInstance : function (
)
{
    return cc.Director;
},

};

/**
 * @class Scheduler
 */
cc.Scheduler = {

/**
 * @method setTimeScale
 * @param {float} arg0
 */
setTimeScale : function (
float 
)
{
},

/**
 * @method performFunctionInCocosThread
 * @param {function} arg0
 */
performFunctionInCocosThread : function (
func 
)
{
},

/**
 * @method getTimeScale
 * @return {float}
 */
getTimeScale : function (
)
{
    return 0;
},

/**
 * @method Scheduler
 * @constructor
 */
Scheduler : function (
)
{
},

};

/**
 * @class FileUtils
 */
cc.FileUtils = {

/**
 * @method fullPathForFilename
 * @param {String} arg0
 * @return {String}
 */
fullPathForFilename : function (
str 
)
{
    return ;
},

/**
 * @method getStringFromFile
 * @param {String} arg0
 * @return {String}
 */
getStringFromFile : function (
str 
)
{
    return ;
},

/**
 * @method removeFile
 * @param {String} arg0
 * @return {bool}
 */
removeFile : function (
str 
)
{
    return false;
},

/**
 * @method isAbsolutePath
 * @param {String} arg0
 * @return {bool}
 */
isAbsolutePath : function (
str 
)
{
    return false;
},

/**
 * @method renameFile
 * @param {String} arg0
 * @param {String} arg1
 * @param {String} arg2
 * @return {bool}
 */
renameFile : function (
str, 
str, 
str 
)
{
    return false;
},

/**
 * @method loadFilenameLookupDictionaryFromFile
 * @param {String} arg0
 */
loadFilenameLookupDictionaryFromFile : function (
str 
)
{
},

/**
 * @method isPopupNotify
 * @return {bool}
 */
isPopupNotify : function (
)
{
    return false;
},

/**
 * @method getValueVectorFromFile
 * @param {String} arg0
 * @return {Array}
 */
getValueVectorFromFile : function (
str 
)
{
    return new Array();
},

/**
 * @method getSearchPaths
 * @return {Array}
 */
getSearchPaths : function (
)
{
    return new Array();
},

/**
 * @method writeToFile
 * @param {map_object} arg0
 * @param {String} arg1
 * @return {bool}
 */
writeToFile : function (
map, 
str 
)
{
    return false;
},

/**
 * @method getValueMapFromFile
 * @param {String} arg0
 * @return {map_object}
 */
getValueMapFromFile : function (
str 
)
{
    return map_object;
},

/**
 * @method getFileSize
 * @param {String} arg0
 * @return {long}
 */
getFileSize : function (
str 
)
{
    return 0;
},

/**
 * @method removeDirectory
 * @param {String} arg0
 * @return {bool}
 */
removeDirectory : function (
str 
)
{
    return false;
},

/**
 * @method setSearchPaths
 * @param {Array} arg0
 */
setSearchPaths : function (
array 
)
{
},

/**
 * @method writeStringToFile
 * @param {String} arg0
 * @param {String} arg1
 * @return {bool}
 */
writeStringToFile : function (
str, 
str 
)
{
    return false;
},

/**
 * @method setSearchResolutionsOrder
 * @param {Array} arg0
 */
setSearchResolutionsOrder : function (
array 
)
{
},

/**
 * @method addSearchResolutionsOrder
 * @param {String} arg0
 */
addSearchResolutionsOrder : function (
str 
)
{
},

/**
 * @method addSearchPath
 * @param {String} arg0
 */
addSearchPath : function (
str 
)
{
},

/**
 * @method isFileExist
 * @param {String} arg0
 * @return {bool}
 */
isFileExist : function (
str 
)
{
    return false;
},

/**
 * @method purgeCachedEntries
 */
purgeCachedEntries : function (
)
{
},

/**
 * @method fullPathFromRelativeFile
 * @param {String} arg0
 * @param {String} arg1
 * @return {String}
 */
fullPathFromRelativeFile : function (
str, 
str 
)
{
    return ;
},

/**
 * @method isDirectoryExist
 * @param {String} arg0
 * @return {bool}
 */
isDirectoryExist : function (
str 
)
{
    return false;
},

/**
 * @method getSearchResolutionsOrder
 * @return {Array}
 */
getSearchResolutionsOrder : function (
)
{
    return new Array();
},

/**
 * @method createDirectory
 * @param {String} arg0
 * @return {bool}
 */
createDirectory : function (
str 
)
{
    return false;
},

/**
 * @method createDirectories
 * @param {String} arg0
 * @return {bool}
 */
createDirectories : function (
str 
)
{
    return false;
},

/**
 * @method getWritablePath
 * @return {String}
 */
getWritablePath : function (
)
{
    return ;
},

/**
 * @method getInstance
 * @return {cc.FileUtils}
 */
getInstance : function (
)
{
    return cc.FileUtils;
},

};

/**
 * @class EventListenerTouchOneByOne
 */
cc.EventListenerTouchOneByOne = {

/**
 * @method isSwallowTouches
 * @return {bool}
 */
isSwallowTouches : function (
)
{
    return false;
},

/**
 * @method setSwallowTouches
 * @param {bool} arg0
 */
setSwallowTouches : function (
bool 
)
{
},

};

/**
 * @class EventListenerTouchAllAtOnce
 */
cc.EventListenerTouchAllAtOnce = {

};

/**
 * @class EventListenerKeyboard
 */
cc.EventListenerKeyboard = {

};

/**
 * @class EventMouse
 */
cc.EventMouse = {

/**
 * @method getMouseButton
 * @return {int}
 */
getMouseButton : function (
)
{
    return 0;
},

/**
 * @method setMouseButton
 * @param {int} arg0
 */
setMouseButton : function (
int 
)
{
},

/**
 * @method setScrollData
 * @param {float} arg0
 * @param {float} arg1
 */
setScrollData : function (
float, 
float 
)
{
},

/**
 * @method getCursorY
 * @return {float}
 */
getCursorY : function (
)
{
    return 0;
},

/**
 * @method getCursorX
 * @return {float}
 */
getCursorX : function (
)
{
    return 0;
},

/**
 * @method getScrollY
 * @return {float}
 */
getScrollY : function (
)
{
    return 0;
},

/**
 * @method setCursorPosition
 * @param {float} arg0
 * @param {float} arg1
 */
setCursorPosition : function (
float, 
float 
)
{
},

/**
 * @method getScrollX
 * @return {float}
 */
getScrollX : function (
)
{
    return 0;
},

/**
 * @method EventMouse
 * @constructor
 * @param {cc.EventMouse::MouseEventType} arg0
 */
EventMouse : function (
mouseeventtype 
)
{
},

};

/**
 * @class EventListenerMouse
 */
cc.EventListenerMouse = {

};

/**
 * @class EventAcceleration
 */
cc.EventAcceleration = {

/**
 * @method EventAcceleration
 * @constructor
 * @param {cc.Acceleration} arg0
 */
EventAcceleration : function (
acceleration 
)
{
},

};

/**
 * @class EventListenerAcceleration
 */
cc.EventListenerAcceleration = {

/**
 * @method create
 * @param {function} arg0
 * @return {cc.EventListenerAcceleration}
 */
create : function (
func 
)
{
    return cc.EventListenerAcceleration;
},

};

/**
 * @class EventCustom
 */
cc.EventCustom = {

/**
 * @method getEventName
 * @return {String}
 */
getEventName : function (
)
{
    return ;
},

/**
 * @method EventCustom
 * @constructor
 * @param {String} arg0
 */
EventCustom : function (
str 
)
{
},

};

/**
 * @class EventListenerCustom
 */
cc.EventListenerCustom = {

/**
 * @method create
 * @param {String} arg0
 * @param {function} arg1
 * @return {cc.EventListenerCustom}
 */
create : function (
str, 
func 
)
{
    return cc.EventListenerCustom;
},

/**
 * @method EventListenerCustom
 * @constructor
 */
EventListenerCustom : function (
)
{
},

};

/**
 * @class EventFocus
 */
cc.EventFocus = {

/**
 * @method EventFocus
 * @constructor
 * @param {ccui.Widget} arg0
 * @param {ccui.Widget} arg1
 */
EventFocus : function (
widget, 
widget 
)
{
},

};

/**
 * @class EventListenerFocus
 */
cc.EventListenerFocus = {

/**
 * @method create
 * @return {cc.EventListenerFocus}
 */
create : function (
)
{
    return cc.EventListenerFocus;
},

};

/**
 * @class Action
 */
cc.Action = {

/**
 * @method startWithTarget
 * @param {cc.Node} arg0
 */
startWithTarget : function (
node 
)
{
},

/**
 * @method setOriginalTarget
 * @param {cc.Node} arg0
 */
setOriginalTarget : function (
node 
)
{
},

/**
 * @method clone
 * @return {cc.Action}
 */
clone : function (
)
{
    return cc.Action;
},

/**
 * @method getOriginalTarget
 * @return {cc.Node}
 */
getOriginalTarget : function (
)
{
    return cc.Node;
},

/**
 * @method stop
 */
stop : function (
)
{
},

/**
 * @method update
 * @param {float} arg0
 */
update : function (
float 
)
{
},

/**
 * @method getTarget
 * @return {cc.Node}
 */
getTarget : function (
)
{
    return cc.Node;
},

/**
 * @method step
 * @param {float} arg0
 */
step : function (
float 
)
{
},

/**
 * @method setTag
 * @param {int} arg0
 */
setTag : function (
int 
)
{
},

/**
 * @method getTag
 * @return {int}
 */
getTag : function (
)
{
    return 0;
},

/**
 * @method setTarget
 * @param {cc.Node} arg0
 */
setTarget : function (
node 
)
{
},

/**
 * @method isDone
 * @return {bool}
 */
isDone : function (
)
{
    return false;
},

/**
 * @method reverse
 * @return {cc.Action}
 */
reverse : function (
)
{
    return cc.Action;
},

};

/**
 * @class FiniteTimeAction
 */
cc.FiniteTimeAction = {

/**
 * @method setDuration
 * @param {float} arg0
 */
setDuration : function (
float 
)
{
},

/**
 * @method getDuration
 * @return {float}
 */
getDuration : function (
)
{
    return 0;
},

};

/**
 * @class Speed
 */
cc.Speed = {

/**
 * @method setInnerAction
 * @param {cc.ActionInterval} arg0
 */
setInnerAction : function (
actioninterval 
)
{
},

/**
 * @method getSpeed
 * @return {float}
 */
getSpeed : function (
)
{
    return 0;
},

/**
 * @method setSpeed
 * @param {float} arg0
 */
setSpeed : function (
float 
)
{
},

/**
 * @method initWithAction
 * @param {cc.ActionInterval} arg0
 * @param {float} arg1
 * @return {bool}
 */
initWithAction : function (
actioninterval, 
float 
)
{
    return false;
},

/**
 * @method getInnerAction
 * @return {cc.ActionInterval}
 */
getInnerAction : function (
)
{
    return cc.ActionInterval;
},

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @param {float} arg1
 * @return {cc.Speed}
 */
create : function (
actioninterval, 
float 
)
{
    return cc.Speed;
},

/**
 * @method Speed
 * @constructor
 */
Speed : function (
)
{
},

};

/**
 * @class Follow
 */
cc.Follow = {

/**
 * @method initWithTarget
 * @param {cc.Node} arg0
 * @param {rect_object} arg1
 * @return {bool}
 */
initWithTarget : function (
node, 
rect 
)
{
    return false;
},

/**
 * @method setBoudarySet
 * @param {bool} arg0
 */
setBoudarySet : function (
bool 
)
{
},

/**
 * @method isBoundarySet
 * @return {bool}
 */
isBoundarySet : function (
)
{
    return false;
},

/**
 * @method create
 * @param {cc.Node} arg0
 * @param {rect_object} arg1
 * @return {cc.Follow}
 */
create : function (
node, 
rect 
)
{
    return cc.Follow;
},

/**
 * @method Follow
 * @constructor
 */
Follow : function (
)
{
},

};

/**
 * @class SpriteFrame
 */
cc.SpriteFrame = {

/**
 * @method clone
 * @return {cc.SpriteFrame}
 */
clone : function (
)
{
    return cc.SpriteFrame;
},

/**
 * @method setRotated
 * @param {bool} arg0
 */
setRotated : function (
bool 
)
{
},

/**
 * @method setTexture
 * @param {cc.Texture2D} arg0
 */
setTexture : function (
texture2d 
)
{
},

/**
 * @method getOffset
 * @return {vec2_object}
 */
getOffset : function (
)
{
    return cc.Vec2;
},

/**
 * @method setRectInPixels
 * @param {rect_object} arg0
 */
setRectInPixels : function (
rect 
)
{
},

/**
 * @method getTexture
 * @return {cc.Texture2D}
 */
getTexture : function (
)
{
    return cc.Texture2D;
},

/**
 * @method getRect
 * @return {rect_object}
 */
getRect : function (
)
{
    return cc.Rect;
},

/**
 * @method setOffsetInPixels
 * @param {vec2_object} arg0
 */
setOffsetInPixels : function (
vec2 
)
{
},

/**
 * @method getRectInPixels
 * @return {rect_object}
 */
getRectInPixels : function (
)
{
    return cc.Rect;
},

/**
 * @method setOriginalSize
 * @param {size_object} arg0
 */
setOriginalSize : function (
size 
)
{
},

/**
 * @method getOriginalSizeInPixels
 * @return {size_object}
 */
getOriginalSizeInPixels : function (
)
{
    return cc.Size;
},

/**
 * @method setOriginalSizeInPixels
 * @param {size_object} arg0
 */
setOriginalSizeInPixels : function (
size 
)
{
},

/**
 * @method setOffset
 * @param {vec2_object} arg0
 */
setOffset : function (
vec2 
)
{
},

/**
 * @method initWithTexture
* @param {cc.Texture2D|cc.Texture2D} texture2d
* @param {rect_object|rect_object} rect
* @param {bool} bool
* @param {vec2_object} vec2
* @param {size_object} size
* @return {bool|bool}
*/
initWithTexture : function(
texture2d,
rect,
bool,
vec2,
size 
)
{
    return false;
},

/**
 * @method isRotated
 * @return {bool}
 */
isRotated : function (
)
{
    return false;
},

/**
 * @method initWithTextureFilename
* @param {String|String} str
* @param {rect_object|rect_object} rect
* @param {bool} bool
* @param {vec2_object} vec2
* @param {size_object} size
* @return {bool|bool}
*/
initWithTextureFilename : function(
str,
rect,
bool,
vec2,
size 
)
{
    return false;
},

/**
 * @method setRect
 * @param {rect_object} arg0
 */
setRect : function (
rect 
)
{
},

/**
 * @method getOffsetInPixels
 * @return {vec2_object}
 */
getOffsetInPixels : function (
)
{
    return cc.Vec2;
},

/**
 * @method getOriginalSize
 * @return {size_object}
 */
getOriginalSize : function (
)
{
    return cc.Size;
},

/**
 * @method create
* @param {String|String} str
* @param {rect_object|rect_object} rect
* @param {bool} bool
* @param {vec2_object} vec2
* @param {size_object} size
* @return {cc.SpriteFrame|cc.SpriteFrame}
*/
create : function(
str,
rect,
bool,
vec2,
size 
)
{
    return cc.SpriteFrame;
},

/**
 * @method createWithTexture
* @param {cc.Texture2D|cc.Texture2D} texture2d
* @param {rect_object|rect_object} rect
* @param {bool} bool
* @param {vec2_object} vec2
* @param {size_object} size
* @return {cc.SpriteFrame|cc.SpriteFrame}
*/
createWithTexture : function(
texture2d,
rect,
bool,
vec2,
size 
)
{
    return cc.SpriteFrame;
},

/**
 * @method SpriteFrame
 * @constructor
 */
SpriteFrame : function (
)
{
},

};

/**
 * @class AnimationFrame
 */
cc.AnimationFrame = {

/**
 * @method setSpriteFrame
 * @param {cc.SpriteFrame} arg0
 */
setSpriteFrame : function (
spriteframe 
)
{
},

/**
 * @method getUserInfo
* @return {map_object|map_object}
*/
getUserInfo : function(
)
{
    return map_object;
},

/**
 * @method setDelayUnits
 * @param {float} arg0
 */
setDelayUnits : function (
float 
)
{
},

/**
 * @method clone
 * @return {cc.AnimationFrame}
 */
clone : function (
)
{
    return cc.AnimationFrame;
},

/**
 * @method getSpriteFrame
 * @return {cc.SpriteFrame}
 */
getSpriteFrame : function (
)
{
    return cc.SpriteFrame;
},

/**
 * @method getDelayUnits
 * @return {float}
 */
getDelayUnits : function (
)
{
    return 0;
},

/**
 * @method setUserInfo
 * @param {map_object} arg0
 */
setUserInfo : function (
map 
)
{
},

/**
 * @method initWithSpriteFrame
 * @param {cc.SpriteFrame} arg0
 * @param {float} arg1
 * @param {map_object} arg2
 * @return {bool}
 */
initWithSpriteFrame : function (
spriteframe, 
float, 
map 
)
{
    return false;
},

/**
 * @method create
 * @param {cc.SpriteFrame} arg0
 * @param {float} arg1
 * @param {map_object} arg2
 * @return {cc.AnimationFrame}
 */
create : function (
spriteframe, 
float, 
map 
)
{
    return cc.AnimationFrame;
},

/**
 * @method AnimationFrame
 * @constructor
 */
AnimationFrame : function (
)
{
},

};

/**
 * @class Animation
 */
cc.Animation = {

/**
 * @method getLoops
 * @return {unsigned int}
 */
getLoops : function (
)
{
    return 0;
},

/**
 * @method addSpriteFrame
 * @param {cc.SpriteFrame} arg0
 */
addSpriteFrame : function (
spriteframe 
)
{
},

/**
 * @method setRestoreOriginalFrame
 * @param {bool} arg0
 */
setRestoreOriginalFrame : function (
bool 
)
{
},

/**
 * @method clone
 * @return {cc.Animation}
 */
clone : function (
)
{
    return cc.Animation;
},

/**
 * @method getDuration
 * @return {float}
 */
getDuration : function (
)
{
    return 0;
},

/**
 * @method initWithAnimationFrames
 * @param {Array} arg0
 * @param {float} arg1
 * @param {unsigned int} arg2
 * @return {bool}
 */
initWithAnimationFrames : function (
array, 
float, 
int 
)
{
    return false;
},

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method setFrames
 * @param {Array} arg0
 */
setFrames : function (
array 
)
{
},

/**
 * @method getFrames
 * @return {Array}
 */
getFrames : function (
)
{
    return new Array();
},

/**
 * @method setLoops
 * @param {unsigned int} arg0
 */
setLoops : function (
int 
)
{
},

/**
 * @method setDelayPerUnit
 * @param {float} arg0
 */
setDelayPerUnit : function (
float 
)
{
},

/**
 * @method addSpriteFrameWithFile
 * @param {String} arg0
 */
addSpriteFrameWithFile : function (
str 
)
{
},

/**
 * @method getTotalDelayUnits
 * @return {float}
 */
getTotalDelayUnits : function (
)
{
    return 0;
},

/**
 * @method getDelayPerUnit
 * @return {float}
 */
getDelayPerUnit : function (
)
{
    return 0;
},

/**
 * @method initWithSpriteFrames
 * @param {Array} arg0
 * @param {float} arg1
 * @param {unsigned int} arg2
 * @return {bool}
 */
initWithSpriteFrames : function (
array, 
float, 
int 
)
{
    return false;
},

/**
 * @method getRestoreOriginalFrame
 * @return {bool}
 */
getRestoreOriginalFrame : function (
)
{
    return false;
},

/**
 * @method addSpriteFrameWithTexture
 * @param {cc.Texture2D} arg0
 * @param {rect_object} arg1
 */
addSpriteFrameWithTexture : function (
texture2d, 
rect 
)
{
},

/**
 * @method create
* @param {Array} array
* @param {float} float
* @param {unsigned int} int
* @return {cc.Animation|cc.Animation}
*/
create : function(
array,
float,
int 
)
{
    return cc.Animation;
},

/**
 * @method createWithSpriteFrames
 * @param {Array} arg0
 * @param {float} arg1
 * @param {unsigned int} arg2
 * @return {cc.Animation}
 */
createWithSpriteFrames : function (
array, 
float, 
int 
)
{
    return cc.Animation;
},

/**
 * @method Animation
 * @constructor
 */
Animation : function (
)
{
},

};

/**
 * @class ActionInterval
 */
cc.ActionInterval = {

/**
 * @method getAmplitudeRate
 * @return {float}
 */
getAmplitudeRate : function (
)
{
    return 0;
},

/**
 * @method setAmplitudeRate
 * @param {float} arg0
 */
setAmplitudeRate : function (
float 
)
{
},

/**
 * @method getElapsed
 * @return {float}
 */
getElapsed : function (
)
{
    return 0;
},

};

/**
 * @class Sequence
 */
cc.Sequence = {

/**
 * @method initWithTwoActions
 * @param {cc.FiniteTimeAction} arg0
 * @param {cc.FiniteTimeAction} arg1
 * @return {bool}
 */
initWithTwoActions : function (
finitetimeaction, 
finitetimeaction 
)
{
    return false;
},

/**
 * @method Sequence
 * @constructor
 */
Sequence : function (
)
{
},

};

/**
 * @class Repeat
 */
cc.Repeat = {

/**
 * @method setInnerAction
 * @param {cc.FiniteTimeAction} arg0
 */
setInnerAction : function (
finitetimeaction 
)
{
},

/**
 * @method initWithAction
 * @param {cc.FiniteTimeAction} arg0
 * @param {unsigned int} arg1
 * @return {bool}
 */
initWithAction : function (
finitetimeaction, 
int 
)
{
    return false;
},

/**
 * @method getInnerAction
 * @return {cc.FiniteTimeAction}
 */
getInnerAction : function (
)
{
    return cc.FiniteTimeAction;
},

/**
 * @method create
 * @param {cc.FiniteTimeAction} arg0
 * @param {unsigned int} arg1
 * @return {cc.Repeat}
 */
create : function (
finitetimeaction, 
int 
)
{
    return cc.Repeat;
},

/**
 * @method Repeat
 * @constructor
 */
Repeat : function (
)
{
},

};

/**
 * @class RepeatForever
 */
cc.RepeatForever = {

/**
 * @method setInnerAction
 * @param {cc.ActionInterval} arg0
 */
setInnerAction : function (
actioninterval 
)
{
},

/**
 * @method initWithAction
 * @param {cc.ActionInterval} arg0
 * @return {bool}
 */
initWithAction : function (
actioninterval 
)
{
    return false;
},

/**
 * @method getInnerAction
 * @return {cc.ActionInterval}
 */
getInnerAction : function (
)
{
    return cc.ActionInterval;
},

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.RepeatForever}
 */
create : function (
actioninterval 
)
{
    return cc.RepeatForever;
},

/**
 * @method RepeatForever
 * @constructor
 */
RepeatForever : function (
)
{
},

};

/**
 * @class Spawn
 */
cc.Spawn = {

/**
 * @method initWithTwoActions
 * @param {cc.FiniteTimeAction} arg0
 * @param {cc.FiniteTimeAction} arg1
 * @return {bool}
 */
initWithTwoActions : function (
finitetimeaction, 
finitetimeaction 
)
{
    return false;
},

/**
 * @method Spawn
 * @constructor
 */
Spawn : function (
)
{
},

};

/**
 * @class RotateTo
 */
cc.RotateTo = {

/**
 * @method initWithDuration
* @param {float|float} float
* @param {float|float} float
* @param {float} float
* @return {bool|bool}
*/
initWithDuration : function(
float,
float,
float 
)
{
    return false;
},

/**
 * @method create
* @param {float|float} float
* @param {float|float} float
* @param {float} float
* @return {cc.RotateTo|cc.RotateTo}
*/
create : function(
float,
float,
float 
)
{
    return cc.RotateTo;
},

/**
 * @method RotateTo
 * @constructor
 */
RotateTo : function (
)
{
},

};

/**
 * @class RotateBy
 */
cc.RotateBy = {

/**
 * @method initWithDuration
* @param {float|float|float} float
* @param {float|float|vec3_object} float
* @param {float} float
* @return {bool|bool|bool}
*/
initWithDuration : function(
float,
float,
float 
)
{
    return false;
},

/**
 * @method create
* @param {float|float|float} float
* @param {float|float|vec3_object} float
* @param {float} float
* @return {cc.RotateBy|cc.RotateBy|cc.RotateBy}
*/
create : function(
float,
float,
float 
)
{
    return cc.RotateBy;
},

/**
 * @method RotateBy
 * @constructor
 */
RotateBy : function (
)
{
},

};

/**
 * @class MoveBy
 */
cc.MoveBy = {

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {vec2_object} arg1
 * @return {bool}
 */
initWithDuration : function (
float, 
vec2 
)
{
    return false;
},

/**
 * @method create
 * @param {float} arg0
 * @param {vec2_object} arg1
 * @return {cc.MoveBy}
 */
create : function (
float, 
vec2 
)
{
    return cc.MoveBy;
},

/**
 * @method MoveBy
 * @constructor
 */
MoveBy : function (
)
{
},

};

/**
 * @class MoveTo
 */
cc.MoveTo = {

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {vec2_object} arg1
 * @return {bool}
 */
initWithDuration : function (
float, 
vec2 
)
{
    return false;
},

/**
 * @method create
 * @param {float} arg0
 * @param {vec2_object} arg1
 * @return {cc.MoveTo}
 */
create : function (
float, 
vec2 
)
{
    return cc.MoveTo;
},

/**
 * @method MoveTo
 * @constructor
 */
MoveTo : function (
)
{
},

};

/**
 * @class SkewTo
 */
cc.SkewTo = {

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {float} arg1
 * @param {float} arg2
 * @return {bool}
 */
initWithDuration : function (
float, 
float, 
float 
)
{
    return false;
},

/**
 * @method create
 * @param {float} arg0
 * @param {float} arg1
 * @param {float} arg2
 * @return {cc.SkewTo}
 */
create : function (
float, 
float, 
float 
)
{
    return cc.SkewTo;
},

/**
 * @method SkewTo
 * @constructor
 */
SkewTo : function (
)
{
},

};

/**
 * @class SkewBy
 */
cc.SkewBy = {

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {float} arg1
 * @param {float} arg2
 * @return {bool}
 */
initWithDuration : function (
float, 
float, 
float 
)
{
    return false;
},

/**
 * @method create
 * @param {float} arg0
 * @param {float} arg1
 * @param {float} arg2
 * @return {cc.SkewBy}
 */
create : function (
float, 
float, 
float 
)
{
    return cc.SkewBy;
},

/**
 * @method SkewBy
 * @constructor
 */
SkewBy : function (
)
{
},

};

/**
 * @class JumpBy
 */
cc.JumpBy = {

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {vec2_object} arg1
 * @param {float} arg2
 * @param {int} arg3
 * @return {bool}
 */
initWithDuration : function (
float, 
vec2, 
float, 
int 
)
{
    return false;
},

/**
 * @method create
 * @param {float} arg0
 * @param {vec2_object} arg1
 * @param {float} arg2
 * @param {int} arg3
 * @return {cc.JumpBy}
 */
create : function (
float, 
vec2, 
float, 
int 
)
{
    return cc.JumpBy;
},

/**
 * @method JumpBy
 * @constructor
 */
JumpBy : function (
)
{
},

};

/**
 * @class JumpTo
 */
cc.JumpTo = {

/**
 * @method create
 * @param {float} arg0
 * @param {vec2_object} arg1
 * @param {float} arg2
 * @param {int} arg3
 * @return {cc.JumpTo}
 */
create : function (
float, 
vec2, 
float, 
int 
)
{
    return cc.JumpTo;
},

};

/**
 * @class BezierBy
 */
cc.BezierBy = {

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {cc._ccBezierConfig} arg1
 * @return {bool}
 */
initWithDuration : function (
float, 
_ccbezierconfig 
)
{
    return false;
},

/**
 * @method BezierBy
 * @constructor
 */
BezierBy : function (
)
{
},

};

/**
 * @class BezierTo
 */
cc.BezierTo = {

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {cc._ccBezierConfig} arg1
 * @return {bool}
 */
initWithDuration : function (
float, 
_ccbezierconfig 
)
{
    return false;
},

/**
 * @method BezierTo
 * @constructor
 */
BezierTo : function (
)
{
},

};

/**
 * @class ScaleTo
 */
cc.ScaleTo = {

/**
 * @method initWithDuration
* @param {float|float|float} float
* @param {float|float|float} float
* @param {float|float} float
* @param {float} float
* @return {bool|bool|bool}
*/
initWithDuration : function(
float,
float,
float,
float 
)
{
    return false;
},

/**
 * @method create
* @param {float|float|float} float
* @param {float|float|float} float
* @param {float|float} float
* @param {float} float
* @return {cc.ScaleTo|cc.ScaleTo|cc.ScaleTo}
*/
create : function(
float,
float,
float,
float 
)
{
    return cc.ScaleTo;
},

/**
 * @method ScaleTo
 * @constructor
 */
ScaleTo : function (
)
{
},

};

/**
 * @class ScaleBy
 */
cc.ScaleBy = {

/**
 * @method create
* @param {float|float|float} float
* @param {float|float|float} float
* @param {float|float} float
* @param {float} float
* @return {cc.ScaleBy|cc.ScaleBy|cc.ScaleBy}
*/
create : function(
float,
float,
float,
float 
)
{
    return cc.ScaleBy;
},

};

/**
 * @class Blink
 */
cc.Blink = {

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {int} arg1
 * @return {bool}
 */
initWithDuration : function (
float, 
int 
)
{
    return false;
},

/**
 * @method create
 * @param {float} arg0
 * @param {int} arg1
 * @return {cc.Blink}
 */
create : function (
float, 
int 
)
{
    return cc.Blink;
},

/**
 * @method Blink
 * @constructor
 */
Blink : function (
)
{
},

};

/**
 * @class FadeTo
 */
cc.FadeTo = {

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {unsigned char} arg1
 * @return {bool}
 */
initWithDuration : function (
float, 
char 
)
{
    return false;
},

/**
 * @method create
 * @param {float} arg0
 * @param {unsigned char} arg1
 * @return {cc.FadeTo}
 */
create : function (
float, 
char 
)
{
    return cc.FadeTo;
},

/**
 * @method FadeTo
 * @constructor
 */
FadeTo : function (
)
{
},

};

/**
 * @class FadeIn
 */
cc.FadeIn = {

/**
 * @method setReverseAction
 * @param {cc.FadeTo} arg0
 */
setReverseAction : function (
fadeto 
)
{
},

/**
 * @method create
 * @param {float} arg0
 * @return {cc.FadeIn}
 */
create : function (
float 
)
{
    return cc.FadeIn;
},

};

/**
 * @class FadeOut
 */
cc.FadeOut = {

/**
 * @method setReverseAction
 * @param {cc.FadeTo} arg0
 */
setReverseAction : function (
fadeto 
)
{
},

/**
 * @method create
 * @param {float} arg0
 * @return {cc.FadeOut}
 */
create : function (
float 
)
{
    return cc.FadeOut;
},

};

/**
 * @class TintTo
 */
cc.TintTo = {

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {unsigned char} arg1
 * @param {unsigned char} arg2
 * @param {unsigned char} arg3
 * @return {bool}
 */
initWithDuration : function (
float, 
char, 
char, 
char 
)
{
    return false;
},

/**
 * @method create
 * @param {float} arg0
 * @param {unsigned char} arg1
 * @param {unsigned char} arg2
 * @param {unsigned char} arg3
 * @return {cc.TintTo}
 */
create : function (
float, 
char, 
char, 
char 
)
{
    return cc.TintTo;
},

/**
 * @method TintTo
 * @constructor
 */
TintTo : function (
)
{
},

};

/**
 * @class TintBy
 */
cc.TintBy = {

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {short} arg1
 * @param {short} arg2
 * @param {short} arg3
 * @return {bool}
 */
initWithDuration : function (
float, 
short, 
short, 
short 
)
{
    return false;
},

/**
 * @method create
 * @param {float} arg0
 * @param {short} arg1
 * @param {short} arg2
 * @param {short} arg3
 * @return {cc.TintBy}
 */
create : function (
float, 
short, 
short, 
short 
)
{
    return cc.TintBy;
},

/**
 * @method TintBy
 * @constructor
 */
TintBy : function (
)
{
},

};

/**
 * @class DelayTime
 */
cc.DelayTime = {

/**
 * @method create
 * @param {float} arg0
 * @return {cc.DelayTime}
 */
create : function (
float 
)
{
    return cc.DelayTime;
},

};

/**
 * @class Animate
 */
cc.Animate = {

/**
 * @method getAnimation
* @return {cc.Animation|cc.Animation}
*/
getAnimation : function(
)
{
    return cc.Animation;
},

/**
 * @method initWithAnimation
 * @param {cc.Animation} arg0
 * @return {bool}
 */
initWithAnimation : function (
animation 
)
{
    return false;
},

/**
 * @method setAnimation
 * @param {cc.Animation} arg0
 */
setAnimation : function (
animation 
)
{
},

/**
 * @method create
 * @param {cc.Animation} arg0
 * @return {cc.Animate}
 */
create : function (
animation 
)
{
    return cc.Animate;
},

/**
 * @method Animate
 * @constructor
 */
Animate : function (
)
{
},

};

/**
 * @class TargetedAction
 */
cc.TargetedAction = {

/**
 * @method getForcedTarget
* @return {cc.Node|cc.Node}
*/
getForcedTarget : function(
)
{
    return cc.Node;
},

/**
 * @method initWithTarget
 * @param {cc.Node} arg0
 * @param {cc.FiniteTimeAction} arg1
 * @return {bool}
 */
initWithTarget : function (
node, 
finitetimeaction 
)
{
    return false;
},

/**
 * @method setForcedTarget
 * @param {cc.Node} arg0
 */
setForcedTarget : function (
node 
)
{
},

/**
 * @method create
 * @param {cc.Node} arg0
 * @param {cc.FiniteTimeAction} arg1
 * @return {cc.TargetedAction}
 */
create : function (
node, 
finitetimeaction 
)
{
    return cc.TargetedAction;
},

/**
 * @method TargetedAction
 * @constructor
 */
TargetedAction : function (
)
{
},

};

/**
 * @class ActionCamera
 */
cc.ActionCamera = {

/**
 * @method setEye
* @param {float|vec3_object} float
* @param {float} float
* @param {float} float
*/
setEye : function(
float,
float,
float 
)
{
},

/**
 * @method getEye
 * @return {vec3_object}
 */
getEye : function (
)
{
    return cc.Vec3;
},

/**
 * @method setUp
 * @param {vec3_object} arg0
 */
setUp : function (
vec3 
)
{
},

/**
 * @method getCenter
 * @return {vec3_object}
 */
getCenter : function (
)
{
    return cc.Vec3;
},

/**
 * @method setCenter
 * @param {vec3_object} arg0
 */
setCenter : function (
vec3 
)
{
},

/**
 * @method getUp
 * @return {vec3_object}
 */
getUp : function (
)
{
    return cc.Vec3;
},

/**
 * @method ActionCamera
 * @constructor
 */
ActionCamera : function (
)
{
},

};

/**
 * @class OrbitCamera
 */
cc.OrbitCamera = {

/**
 * @method sphericalRadius
 * @param {float} arg0
 * @param {float} arg1
 * @param {float} arg2
 */
sphericalRadius : function (
float, 
float, 
float 
)
{
},

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {float} arg1
 * @param {float} arg2
 * @param {float} arg3
 * @param {float} arg4
 * @param {float} arg5
 * @param {float} arg6
 * @return {bool}
 */
initWithDuration : function (
float, 
float, 
float, 
float, 
float, 
float, 
float 
)
{
    return false;
},

/**
 * @method create
 * @param {float} arg0
 * @param {float} arg1
 * @param {float} arg2
 * @param {float} arg3
 * @param {float} arg4
 * @param {float} arg5
 * @param {float} arg6
 * @return {cc.OrbitCamera}
 */
create : function (
float, 
float, 
float, 
float, 
float, 
float, 
float 
)
{
    return cc.OrbitCamera;
},

/**
 * @method OrbitCamera
 * @constructor
 */
OrbitCamera : function (
)
{
},

};

/**
 * @class ActionManager
 */
cc.ActionManager = {

/**
 * @method getActionByTag
 * @param {int} arg0
 * @param {cc.Node} arg1
 * @return {cc.Action}
 */
getActionByTag : function (
int, 
node 
)
{
    return cc.Action;
},

/**
 * @method removeActionByTag
 * @param {int} arg0
 * @param {cc.Node} arg1
 */
removeActionByTag : function (
int, 
node 
)
{
},

/**
 * @method removeAllActions
 */
removeAllActions : function (
)
{
},

/**
 * @method addAction
 * @param {cc.Action} arg0
 * @param {cc.Node} arg1
 * @param {bool} arg2
 */
addAction : function (
action, 
node, 
bool 
)
{
},

/**
 * @method resumeTarget
 * @param {cc.Node} arg0
 */
resumeTarget : function (
node 
)
{
},

/**
 * @method update
 * @param {float} arg0
 */
update : function (
float 
)
{
},

/**
 * @method getNumberOfRunningActionsInTarget
 * @param {cc.Node} arg0
 * @return {long}
 */
getNumberOfRunningActionsInTarget : function (
node 
)
{
    return 0;
},

/**
 * @method removeAllActionsFromTarget
 * @param {cc.Node} arg0
 */
removeAllActionsFromTarget : function (
node 
)
{
},

/**
 * @method resumeTargets
 * @param {Array} arg0
 */
resumeTargets : function (
array 
)
{
},

/**
 * @method removeAction
 * @param {cc.Action} arg0
 */
removeAction : function (
action 
)
{
},

/**
 * @method pauseTarget
 * @param {cc.Node} arg0
 */
pauseTarget : function (
node 
)
{
},

/**
 * @method pauseAllRunningActions
 * @return {Array}
 */
pauseAllRunningActions : function (
)
{
    return new Array();
},

/**
 * @method ActionManager
 * @constructor
 */
ActionManager : function (
)
{
},

};

/**
 * @class ActionEase
 */
cc.ActionEase = {

/**
 * @method initWithAction
 * @param {cc.ActionInterval} arg0
 * @return {bool}
 */
initWithAction : function (
actioninterval 
)
{
    return false;
},

/**
 * @method getInnerAction
 * @return {cc.ActionInterval}
 */
getInnerAction : function (
)
{
    return cc.ActionInterval;
},

};

/**
 * @class EaseRateAction
 */
cc.EaseRateAction = {

/**
 * @method setRate
 * @param {float} arg0
 */
setRate : function (
float 
)
{
},

/**
 * @method initWithAction
 * @param {cc.ActionInterval} arg0
 * @param {float} arg1
 * @return {bool}
 */
initWithAction : function (
actioninterval, 
float 
)
{
    return false;
},

/**
 * @method getRate
 * @return {float}
 */
getRate : function (
)
{
    return 0;
},

};

/**
 * @class EaseIn
 */
cc.EaseIn = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @param {float} arg1
 * @return {cc.EaseIn}
 */
create : function (
actioninterval, 
float 
)
{
    return cc.EaseIn;
},

/**
 * @method EaseIn
 * @constructor
 */
EaseIn : function (
)
{
},

};

/**
 * @class EaseOut
 */
cc.EaseOut = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @param {float} arg1
 * @return {cc.EaseOut}
 */
create : function (
actioninterval, 
float 
)
{
    return cc.EaseOut;
},

/**
 * @method EaseOut
 * @constructor
 */
EaseOut : function (
)
{
},

};

/**
 * @class EaseInOut
 */
cc.EaseInOut = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @param {float} arg1
 * @return {cc.EaseInOut}
 */
create : function (
actioninterval, 
float 
)
{
    return cc.EaseInOut;
},

/**
 * @method EaseInOut
 * @constructor
 */
EaseInOut : function (
)
{
},

};

/**
 * @class EaseExponentialIn
 */
cc.EaseExponentialIn = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseExponentialIn}
 */
create : function (
actioninterval 
)
{
    return cc.EaseExponentialIn;
},

/**
 * @method EaseExponentialIn
 * @constructor
 */
EaseExponentialIn : function (
)
{
},

};

/**
 * @class EaseExponentialOut
 */
cc.EaseExponentialOut = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseExponentialOut}
 */
create : function (
actioninterval 
)
{
    return cc.EaseExponentialOut;
},

/**
 * @method EaseExponentialOut
 * @constructor
 */
EaseExponentialOut : function (
)
{
},

};

/**
 * @class EaseExponentialInOut
 */
cc.EaseExponentialInOut = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseExponentialInOut}
 */
create : function (
actioninterval 
)
{
    return cc.EaseExponentialInOut;
},

/**
 * @method EaseExponentialInOut
 * @constructor
 */
EaseExponentialInOut : function (
)
{
},

};

/**
 * @class EaseSineIn
 */
cc.EaseSineIn = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseSineIn}
 */
create : function (
actioninterval 
)
{
    return cc.EaseSineIn;
},

/**
 * @method EaseSineIn
 * @constructor
 */
EaseSineIn : function (
)
{
},

};

/**
 * @class EaseSineOut
 */
cc.EaseSineOut = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseSineOut}
 */
create : function (
actioninterval 
)
{
    return cc.EaseSineOut;
},

/**
 * @method EaseSineOut
 * @constructor
 */
EaseSineOut : function (
)
{
},

};

/**
 * @class EaseSineInOut
 */
cc.EaseSineInOut = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseSineInOut}
 */
create : function (
actioninterval 
)
{
    return cc.EaseSineInOut;
},

/**
 * @method EaseSineInOut
 * @constructor
 */
EaseSineInOut : function (
)
{
},

};

/**
 * @class EaseElastic
 */
cc.EaseElastic = {

/**
 * @method setPeriod
 * @param {float} arg0
 */
setPeriod : function (
float 
)
{
},

/**
 * @method initWithAction
 * @param {cc.ActionInterval} arg0
 * @param {float} arg1
 * @return {bool}
 */
initWithAction : function (
actioninterval, 
float 
)
{
    return false;
},

/**
 * @method getPeriod
 * @return {float}
 */
getPeriod : function (
)
{
    return 0;
},

};

/**
 * @class EaseElasticIn
 */
cc.EaseElasticIn = {

/**
 * @method create
* @param {cc.ActionInterval|cc.ActionInterval} actioninterval
* @param {float} float
* @return {cc.EaseElasticIn|cc.EaseElasticIn}
*/
create : function(
actioninterval,
float 
)
{
    return cc.EaseElasticIn;
},

/**
 * @method EaseElasticIn
 * @constructor
 */
EaseElasticIn : function (
)
{
},

};

/**
 * @class EaseElasticOut
 */
cc.EaseElasticOut = {

/**
 * @method create
* @param {cc.ActionInterval|cc.ActionInterval} actioninterval
* @param {float} float
* @return {cc.EaseElasticOut|cc.EaseElasticOut}
*/
create : function(
actioninterval,
float 
)
{
    return cc.EaseElasticOut;
},

/**
 * @method EaseElasticOut
 * @constructor
 */
EaseElasticOut : function (
)
{
},

};

/**
 * @class EaseElasticInOut
 */
cc.EaseElasticInOut = {

/**
 * @method create
* @param {cc.ActionInterval|cc.ActionInterval} actioninterval
* @param {float} float
* @return {cc.EaseElasticInOut|cc.EaseElasticInOut}
*/
create : function(
actioninterval,
float 
)
{
    return cc.EaseElasticInOut;
},

/**
 * @method EaseElasticInOut
 * @constructor
 */
EaseElasticInOut : function (
)
{
},

};

/**
 * @class EaseBounce
 */
cc.EaseBounce = {

};

/**
 * @class EaseBounceIn
 */
cc.EaseBounceIn = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseBounceIn}
 */
create : function (
actioninterval 
)
{
    return cc.EaseBounceIn;
},

/**
 * @method EaseBounceIn
 * @constructor
 */
EaseBounceIn : function (
)
{
},

};

/**
 * @class EaseBounceOut
 */
cc.EaseBounceOut = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseBounceOut}
 */
create : function (
actioninterval 
)
{
    return cc.EaseBounceOut;
},

/**
 * @method EaseBounceOut
 * @constructor
 */
EaseBounceOut : function (
)
{
},

};

/**
 * @class EaseBounceInOut
 */
cc.EaseBounceInOut = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseBounceInOut}
 */
create : function (
actioninterval 
)
{
    return cc.EaseBounceInOut;
},

/**
 * @method EaseBounceInOut
 * @constructor
 */
EaseBounceInOut : function (
)
{
},

};

/**
 * @class EaseBackIn
 */
cc.EaseBackIn = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseBackIn}
 */
create : function (
actioninterval 
)
{
    return cc.EaseBackIn;
},

/**
 * @method EaseBackIn
 * @constructor
 */
EaseBackIn : function (
)
{
},

};

/**
 * @class EaseBackOut
 */
cc.EaseBackOut = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseBackOut}
 */
create : function (
actioninterval 
)
{
    return cc.EaseBackOut;
},

/**
 * @method EaseBackOut
 * @constructor
 */
EaseBackOut : function (
)
{
},

};

/**
 * @class EaseBackInOut
 */
cc.EaseBackInOut = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseBackInOut}
 */
create : function (
actioninterval 
)
{
    return cc.EaseBackInOut;
},

/**
 * @method EaseBackInOut
 * @constructor
 */
EaseBackInOut : function (
)
{
},

};

/**
 * @class EaseBezierAction
 */
cc.EaseBezierAction = {

/**
 * @method setBezierParamer
 * @param {float} arg0
 * @param {float} arg1
 * @param {float} arg2
 * @param {float} arg3
 */
setBezierParamer : function (
float, 
float, 
float, 
float 
)
{
},

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseBezierAction}
 */
create : function (
actioninterval 
)
{
    return cc.EaseBezierAction;
},

/**
 * @method EaseBezierAction
 * @constructor
 */
EaseBezierAction : function (
)
{
},

};

/**
 * @class EaseQuadraticActionIn
 */
cc.EaseQuadraticActionIn = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseQuadraticActionIn}
 */
create : function (
actioninterval 
)
{
    return cc.EaseQuadraticActionIn;
},

/**
 * @method EaseQuadraticActionIn
 * @constructor
 */
EaseQuadraticActionIn : function (
)
{
},

};

/**
 * @class EaseQuadraticActionOut
 */
cc.EaseQuadraticActionOut = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseQuadraticActionOut}
 */
create : function (
actioninterval 
)
{
    return cc.EaseQuadraticActionOut;
},

/**
 * @method EaseQuadraticActionOut
 * @constructor
 */
EaseQuadraticActionOut : function (
)
{
},

};

/**
 * @class EaseQuadraticActionInOut
 */
cc.EaseQuadraticActionInOut = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseQuadraticActionInOut}
 */
create : function (
actioninterval 
)
{
    return cc.EaseQuadraticActionInOut;
},

/**
 * @method EaseQuadraticActionInOut
 * @constructor
 */
EaseQuadraticActionInOut : function (
)
{
},

};

/**
 * @class EaseQuarticActionIn
 */
cc.EaseQuarticActionIn = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseQuarticActionIn}
 */
create : function (
actioninterval 
)
{
    return cc.EaseQuarticActionIn;
},

/**
 * @method EaseQuarticActionIn
 * @constructor
 */
EaseQuarticActionIn : function (
)
{
},

};

/**
 * @class EaseQuarticActionOut
 */
cc.EaseQuarticActionOut = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseQuarticActionOut}
 */
create : function (
actioninterval 
)
{
    return cc.EaseQuarticActionOut;
},

/**
 * @method EaseQuarticActionOut
 * @constructor
 */
EaseQuarticActionOut : function (
)
{
},

};

/**
 * @class EaseQuarticActionInOut
 */
cc.EaseQuarticActionInOut = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseQuarticActionInOut}
 */
create : function (
actioninterval 
)
{
    return cc.EaseQuarticActionInOut;
},

/**
 * @method EaseQuarticActionInOut
 * @constructor
 */
EaseQuarticActionInOut : function (
)
{
},

};

/**
 * @class EaseQuinticActionIn
 */
cc.EaseQuinticActionIn = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseQuinticActionIn}
 */
create : function (
actioninterval 
)
{
    return cc.EaseQuinticActionIn;
},

/**
 * @method EaseQuinticActionIn
 * @constructor
 */
EaseQuinticActionIn : function (
)
{
},

};

/**
 * @class EaseQuinticActionOut
 */
cc.EaseQuinticActionOut = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseQuinticActionOut}
 */
create : function (
actioninterval 
)
{
    return cc.EaseQuinticActionOut;
},

/**
 * @method EaseQuinticActionOut
 * @constructor
 */
EaseQuinticActionOut : function (
)
{
},

};

/**
 * @class EaseQuinticActionInOut
 */
cc.EaseQuinticActionInOut = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseQuinticActionInOut}
 */
create : function (
actioninterval 
)
{
    return cc.EaseQuinticActionInOut;
},

/**
 * @method EaseQuinticActionInOut
 * @constructor
 */
EaseQuinticActionInOut : function (
)
{
},

};

/**
 * @class EaseCircleActionIn
 */
cc.EaseCircleActionIn = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseCircleActionIn}
 */
create : function (
actioninterval 
)
{
    return cc.EaseCircleActionIn;
},

/**
 * @method EaseCircleActionIn
 * @constructor
 */
EaseCircleActionIn : function (
)
{
},

};

/**
 * @class EaseCircleActionOut
 */
cc.EaseCircleActionOut = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseCircleActionOut}
 */
create : function (
actioninterval 
)
{
    return cc.EaseCircleActionOut;
},

/**
 * @method EaseCircleActionOut
 * @constructor
 */
EaseCircleActionOut : function (
)
{
},

};

/**
 * @class EaseCircleActionInOut
 */
cc.EaseCircleActionInOut = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseCircleActionInOut}
 */
create : function (
actioninterval 
)
{
    return cc.EaseCircleActionInOut;
},

/**
 * @method EaseCircleActionInOut
 * @constructor
 */
EaseCircleActionInOut : function (
)
{
},

};

/**
 * @class EaseCubicActionIn
 */
cc.EaseCubicActionIn = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseCubicActionIn}
 */
create : function (
actioninterval 
)
{
    return cc.EaseCubicActionIn;
},

/**
 * @method EaseCubicActionIn
 * @constructor
 */
EaseCubicActionIn : function (
)
{
},

};

/**
 * @class EaseCubicActionOut
 */
cc.EaseCubicActionOut = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseCubicActionOut}
 */
create : function (
actioninterval 
)
{
    return cc.EaseCubicActionOut;
},

/**
 * @method EaseCubicActionOut
 * @constructor
 */
EaseCubicActionOut : function (
)
{
},

};

/**
 * @class EaseCubicActionInOut
 */
cc.EaseCubicActionInOut = {

/**
 * @method create
 * @param {cc.ActionInterval} arg0
 * @return {cc.EaseCubicActionInOut}
 */
create : function (
actioninterval 
)
{
    return cc.EaseCubicActionInOut;
},

/**
 * @method EaseCubicActionInOut
 * @constructor
 */
EaseCubicActionInOut : function (
)
{
},

};

/**
 * @class ActionInstant
 */
cc.ActionInstant = {

};

/**
 * @class Show
 */
cc.Show = {

/**
 * @method create
 * @return {cc.Show}
 */
create : function (
)
{
    return cc.Show;
},

};

/**
 * @class Hide
 */
cc.Hide = {

/**
 * @method create
 * @return {cc.Hide}
 */
create : function (
)
{
    return cc.Hide;
},

};

/**
 * @class ToggleVisibility
 */
cc.ToggleVisibility = {

/**
 * @method create
 * @return {cc.ToggleVisibility}
 */
create : function (
)
{
    return cc.ToggleVisibility;
},

};

/**
 * @class RemoveSelf
 */
cc.RemoveSelf = {

/**
 * @method init
 * @param {bool} arg0
 * @return {bool}
 */
init : function (
bool 
)
{
    return false;
},

/**
 * @method create
 * @return {cc.RemoveSelf}
 */
create : function (
)
{
    return cc.RemoveSelf;
},

/**
 * @method RemoveSelf
 * @constructor
 */
RemoveSelf : function (
)
{
},

};

/**
 * @class FlipX
 */
cc.FlipX = {

/**
 * @method initWithFlipX
 * @param {bool} arg0
 * @return {bool}
 */
initWithFlipX : function (
bool 
)
{
    return false;
},

/**
 * @method create
 * @param {bool} arg0
 * @return {cc.FlipX}
 */
create : function (
bool 
)
{
    return cc.FlipX;
},

/**
 * @method FlipX
 * @constructor
 */
FlipX : function (
)
{
},

};

/**
 * @class FlipY
 */
cc.FlipY = {

/**
 * @method initWithFlipY
 * @param {bool} arg0
 * @return {bool}
 */
initWithFlipY : function (
bool 
)
{
    return false;
},

/**
 * @method create
 * @param {bool} arg0
 * @return {cc.FlipY}
 */
create : function (
bool 
)
{
    return cc.FlipY;
},

/**
 * @method FlipY
 * @constructor
 */
FlipY : function (
)
{
},

};

/**
 * @class Place
 */
cc.Place = {

/**
 * @method initWithPosition
 * @param {vec2_object} arg0
 * @return {bool}
 */
initWithPosition : function (
vec2 
)
{
    return false;
},

/**
 * @method create
 * @param {vec2_object} arg0
 * @return {cc.Place}
 */
create : function (
vec2 
)
{
    return cc.Place;
},

/**
 * @method Place
 * @constructor
 */
Place : function (
)
{
},

};

/**
 * @class CallFunc
 */
cc._CallFunc = {

/**
 * @method execute
 */
execute : function (
)
{
},

/**
 * @method CallFunc
 * @constructor
 */
CallFunc : function (
)
{
},

};

/**
 * @class CallFuncN
 */
cc.CallFunc = {

/**
 * @method CallFuncN
 * @constructor
 */
CallFuncN : function (
)
{
},

};

/**
 * @class GridAction
 */
cc.GridAction = {

/**
 * @method getGrid
 * @return {cc.GridBase}
 */
getGrid : function (
)
{
    return cc.GridBase;
},

};

/**
 * @class Grid3DAction
 */
cc.Grid3DAction = {

/**
 * @method getGrid
 * @return {cc.GridBase}
 */
getGrid : function (
)
{
    return cc.GridBase;
},

};

/**
 * @class TiledGrid3DAction
 */
cc.TiledGrid3DAction = {

/**
 * @method getGrid
 * @return {cc.GridBase}
 */
getGrid : function (
)
{
    return cc.GridBase;
},

};

/**
 * @class StopGrid
 */
cc.StopGrid = {

/**
 * @method create
 * @return {cc.StopGrid}
 */
create : function (
)
{
    return cc.StopGrid;
},

};

/**
 * @class ReuseGrid
 */
cc.ReuseGrid = {

/**
 * @method initWithTimes
 * @param {int} arg0
 * @return {bool}
 */
initWithTimes : function (
int 
)
{
    return false;
},

/**
 * @method create
 * @param {int} arg0
 * @return {cc.ReuseGrid}
 */
create : function (
int 
)
{
    return cc.ReuseGrid;
},

/**
 * @method ReuseGrid
 * @constructor
 */
ReuseGrid : function (
)
{
},

};

/**
 * @class Waves3D
 */
cc.Waves3D = {

/**
 * @method setAmplitudeRate
 * @param {float} arg0
 */
setAmplitudeRate : function (
float 
)
{
},

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {unsigned int} arg2
 * @param {float} arg3
 * @return {bool}
 */
initWithDuration : function (
float, 
size, 
int, 
float 
)
{
    return false;
},

/**
 * @method getAmplitude
 * @return {float}
 */
getAmplitude : function (
)
{
    return 0;
},

/**
 * @method getAmplitudeRate
 * @return {float}
 */
getAmplitudeRate : function (
)
{
    return 0;
},

/**
 * @method setAmplitude
 * @param {float} arg0
 */
setAmplitude : function (
float 
)
{
},

/**
 * @method create
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {unsigned int} arg2
 * @param {float} arg3
 * @return {cc.Waves3D}
 */
create : function (
float, 
size, 
int, 
float 
)
{
    return cc.Waves3D;
},

/**
 * @method Waves3D
 * @constructor
 */
Waves3D : function (
)
{
},

};

/**
 * @class FlipX3D
 */
cc.FlipX3D = {

/**
 * @method initWithSize
 * @param {size_object} arg0
 * @param {float} arg1
 * @return {bool}
 */
initWithSize : function (
size, 
float 
)
{
    return false;
},

/**
 * @method initWithDuration
 * @param {float} arg0
 * @return {bool}
 */
initWithDuration : function (
float 
)
{
    return false;
},

/**
 * @method create
 * @param {float} arg0
 * @return {cc.FlipX3D}
 */
create : function (
float 
)
{
    return cc.FlipX3D;
},

/**
 * @method FlipX3D
 * @constructor
 */
FlipX3D : function (
)
{
},

};

/**
 * @class FlipY3D
 */
cc.FlipY3D = {

/**
 * @method create
 * @param {float} arg0
 * @return {cc.FlipY3D}
 */
create : function (
float 
)
{
    return cc.FlipY3D;
},

};

/**
 * @class Lens3D
 */
cc.Lens3D = {

/**
 * @method setConcave
 * @param {bool} arg0
 */
setConcave : function (
bool 
)
{
},

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {vec2_object} arg2
 * @param {float} arg3
 * @return {bool}
 */
initWithDuration : function (
float, 
size, 
vec2, 
float 
)
{
    return false;
},

/**
 * @method setLensEffect
 * @param {float} arg0
 */
setLensEffect : function (
float 
)
{
},

/**
 * @method getLensEffect
 * @return {float}
 */
getLensEffect : function (
)
{
    return 0;
},

/**
 * @method setPosition
 * @param {vec2_object} arg0
 */
setPosition : function (
vec2 
)
{
},

/**
 * @method getPosition
 * @return {vec2_object}
 */
getPosition : function (
)
{
    return cc.Vec2;
},

/**
 * @method create
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {vec2_object} arg2
 * @param {float} arg3
 * @return {cc.Lens3D}
 */
create : function (
float, 
size, 
vec2, 
float 
)
{
    return cc.Lens3D;
},

/**
 * @method Lens3D
 * @constructor
 */
Lens3D : function (
)
{
},

};

/**
 * @class Ripple3D
 */
cc.Ripple3D = {

/**
 * @method setAmplitudeRate
 * @param {float} arg0
 */
setAmplitudeRate : function (
float 
)
{
},

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {vec2_object} arg2
 * @param {float} arg3
 * @param {unsigned int} arg4
 * @param {float} arg5
 * @return {bool}
 */
initWithDuration : function (
float, 
size, 
vec2, 
float, 
int, 
float 
)
{
    return false;
},

/**
 * @method getAmplitudeRate
 * @return {float}
 */
getAmplitudeRate : function (
)
{
    return 0;
},

/**
 * @method setAmplitude
 * @param {float} arg0
 */
setAmplitude : function (
float 
)
{
},

/**
 * @method getAmplitude
 * @return {float}
 */
getAmplitude : function (
)
{
    return 0;
},

/**
 * @method setPosition
 * @param {vec2_object} arg0
 */
setPosition : function (
vec2 
)
{
},

/**
 * @method getPosition
 * @return {vec2_object}
 */
getPosition : function (
)
{
    return cc.Vec2;
},

/**
 * @method create
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {vec2_object} arg2
 * @param {float} arg3
 * @param {unsigned int} arg4
 * @param {float} arg5
 * @return {cc.Ripple3D}
 */
create : function (
float, 
size, 
vec2, 
float, 
int, 
float 
)
{
    return cc.Ripple3D;
},

/**
 * @method Ripple3D
 * @constructor
 */
Ripple3D : function (
)
{
},

};

/**
 * @class Shaky3D
 */
cc.Shaky3D = {

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {int} arg2
 * @param {bool} arg3
 * @return {bool}
 */
initWithDuration : function (
float, 
size, 
int, 
bool 
)
{
    return false;
},

/**
 * @method create
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {int} arg2
 * @param {bool} arg3
 * @return {cc.Shaky3D}
 */
create : function (
float, 
size, 
int, 
bool 
)
{
    return cc.Shaky3D;
},

/**
 * @method Shaky3D
 * @constructor
 */
Shaky3D : function (
)
{
},

};

/**
 * @class Liquid
 */
cc.Liquid = {

/**
 * @method setAmplitudeRate
 * @param {float} arg0
 */
setAmplitudeRate : function (
float 
)
{
},

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {unsigned int} arg2
 * @param {float} arg3
 * @return {bool}
 */
initWithDuration : function (
float, 
size, 
int, 
float 
)
{
    return false;
},

/**
 * @method getAmplitude
 * @return {float}
 */
getAmplitude : function (
)
{
    return 0;
},

/**
 * @method getAmplitudeRate
 * @return {float}
 */
getAmplitudeRate : function (
)
{
    return 0;
},

/**
 * @method setAmplitude
 * @param {float} arg0
 */
setAmplitude : function (
float 
)
{
},

/**
 * @method create
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {unsigned int} arg2
 * @param {float} arg3
 * @return {cc.Liquid}
 */
create : function (
float, 
size, 
int, 
float 
)
{
    return cc.Liquid;
},

/**
 * @method Liquid
 * @constructor
 */
Liquid : function (
)
{
},

};

/**
 * @class Waves
 */
cc.Waves = {

/**
 * @method setAmplitudeRate
 * @param {float} arg0
 */
setAmplitudeRate : function (
float 
)
{
},

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {unsigned int} arg2
 * @param {float} arg3
 * @param {bool} arg4
 * @param {bool} arg5
 * @return {bool}
 */
initWithDuration : function (
float, 
size, 
int, 
float, 
bool, 
bool 
)
{
    return false;
},

/**
 * @method getAmplitude
 * @return {float}
 */
getAmplitude : function (
)
{
    return 0;
},

/**
 * @method getAmplitudeRate
 * @return {float}
 */
getAmplitudeRate : function (
)
{
    return 0;
},

/**
 * @method setAmplitude
 * @param {float} arg0
 */
setAmplitude : function (
float 
)
{
},

/**
 * @method create
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {unsigned int} arg2
 * @param {float} arg3
 * @param {bool} arg4
 * @param {bool} arg5
 * @return {cc.Waves}
 */
create : function (
float, 
size, 
int, 
float, 
bool, 
bool 
)
{
    return cc.Waves;
},

/**
 * @method Waves
 * @constructor
 */
Waves : function (
)
{
},

};

/**
 * @class Twirl
 */
cc.Twirl = {

/**
 * @method setAmplitudeRate
 * @param {float} arg0
 */
setAmplitudeRate : function (
float 
)
{
},

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {vec2_object} arg2
 * @param {unsigned int} arg3
 * @param {float} arg4
 * @return {bool}
 */
initWithDuration : function (
float, 
size, 
vec2, 
int, 
float 
)
{
    return false;
},

/**
 * @method getAmplitudeRate
 * @return {float}
 */
getAmplitudeRate : function (
)
{
    return 0;
},

/**
 * @method setAmplitude
 * @param {float} arg0
 */
setAmplitude : function (
float 
)
{
},

/**
 * @method getAmplitude
 * @return {float}
 */
getAmplitude : function (
)
{
    return 0;
},

/**
 * @method setPosition
 * @param {vec2_object} arg0
 */
setPosition : function (
vec2 
)
{
},

/**
 * @method getPosition
 * @return {vec2_object}
 */
getPosition : function (
)
{
    return cc.Vec2;
},

/**
 * @method create
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {vec2_object} arg2
 * @param {unsigned int} arg3
 * @param {float} arg4
 * @return {cc.Twirl}
 */
create : function (
float, 
size, 
vec2, 
int, 
float 
)
{
    return cc.Twirl;
},

/**
 * @method Twirl
 * @constructor
 */
Twirl : function (
)
{
},

};

/**
 * @class PageTurn3D
 */
cc.PageTurn3D = {

/**
 * @method create
 * @param {float} arg0
 * @param {size_object} arg1
 * @return {cc.PageTurn3D}
 */
create : function (
float, 
size 
)
{
    return cc.PageTurn3D;
},

};

/**
 * @class ProgressTo
 */
cc.ProgressTo = {

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {float} arg1
 * @return {bool}
 */
initWithDuration : function (
float, 
float 
)
{
    return false;
},

/**
 * @method create
 * @param {float} arg0
 * @param {float} arg1
 * @return {cc.ProgressTo}
 */
create : function (
float, 
float 
)
{
    return cc.ProgressTo;
},

/**
 * @method ProgressTo
 * @constructor
 */
ProgressTo : function (
)
{
},

};

/**
 * @class ProgressFromTo
 */
cc.ProgressFromTo = {

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {float} arg1
 * @param {float} arg2
 * @return {bool}
 */
initWithDuration : function (
float, 
float, 
float 
)
{
    return false;
},

/**
 * @method create
 * @param {float} arg0
 * @param {float} arg1
 * @param {float} arg2
 * @return {cc.ProgressFromTo}
 */
create : function (
float, 
float, 
float 
)
{
    return cc.ProgressFromTo;
},

/**
 * @method ProgressFromTo
 * @constructor
 */
ProgressFromTo : function (
)
{
},

};

/**
 * @class ShakyTiles3D
 */
cc.ShakyTiles3D = {

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {int} arg2
 * @param {bool} arg3
 * @return {bool}
 */
initWithDuration : function (
float, 
size, 
int, 
bool 
)
{
    return false;
},

/**
 * @method create
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {int} arg2
 * @param {bool} arg3
 * @return {cc.ShakyTiles3D}
 */
create : function (
float, 
size, 
int, 
bool 
)
{
    return cc.ShakyTiles3D;
},

/**
 * @method ShakyTiles3D
 * @constructor
 */
ShakyTiles3D : function (
)
{
},

};

/**
 * @class ShatteredTiles3D
 */
cc.ShatteredTiles3D = {

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {int} arg2
 * @param {bool} arg3
 * @return {bool}
 */
initWithDuration : function (
float, 
size, 
int, 
bool 
)
{
    return false;
},

/**
 * @method create
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {int} arg2
 * @param {bool} arg3
 * @return {cc.ShatteredTiles3D}
 */
create : function (
float, 
size, 
int, 
bool 
)
{
    return cc.ShatteredTiles3D;
},

/**
 * @method ShatteredTiles3D
 * @constructor
 */
ShatteredTiles3D : function (
)
{
},

};

/**
 * @class ShuffleTiles
 */
cc.ShuffleTiles = {

/**
 * @method placeTile
 * @param {vec2_object} arg0
 * @param {cc.Tile} arg1
 */
placeTile : function (
vec2, 
tile 
)
{
},

/**
 * @method shuffle
 * @param {unsigned int} arg0
 * @param {unsigned int} arg1
 */
shuffle : function (
int, 
int 
)
{
},

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {unsigned int} arg2
 * @return {bool}
 */
initWithDuration : function (
float, 
size, 
int 
)
{
    return false;
},

/**
 * @method getDelta
 * @param {size_object} arg0
 * @return {size_object}
 */
getDelta : function (
size 
)
{
    return cc.Size;
},

/**
 * @method create
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {unsigned int} arg2
 * @return {cc.ShuffleTiles}
 */
create : function (
float, 
size, 
int 
)
{
    return cc.ShuffleTiles;
},

/**
 * @method ShuffleTiles
 * @constructor
 */
ShuffleTiles : function (
)
{
},

};

/**
 * @class FadeOutTRTiles
 */
cc.FadeOutTRTiles = {

/**
 * @method turnOnTile
 * @param {vec2_object} arg0
 */
turnOnTile : function (
vec2 
)
{
},

/**
 * @method turnOffTile
 * @param {vec2_object} arg0
 */
turnOffTile : function (
vec2 
)
{
},

/**
 * @method transformTile
 * @param {vec2_object} arg0
 * @param {float} arg1
 */
transformTile : function (
vec2, 
float 
)
{
},

/**
 * @method testFunc
 * @param {size_object} arg0
 * @param {float} arg1
 * @return {float}
 */
testFunc : function (
size, 
float 
)
{
    return 0;
},

/**
 * @method create
 * @param {float} arg0
 * @param {size_object} arg1
 * @return {cc.FadeOutTRTiles}
 */
create : function (
float, 
size 
)
{
    return cc.FadeOutTRTiles;
},

};

/**
 * @class FadeOutBLTiles
 */
cc.FadeOutBLTiles = {

/**
 * @method create
 * @param {float} arg0
 * @param {size_object} arg1
 * @return {cc.FadeOutBLTiles}
 */
create : function (
float, 
size 
)
{
    return cc.FadeOutBLTiles;
},

};

/**
 * @class FadeOutUpTiles
 */
cc.FadeOutUpTiles = {

/**
 * @method transformTile
 * @param {vec2_object} arg0
 * @param {float} arg1
 */
transformTile : function (
vec2, 
float 
)
{
},

/**
 * @method create
 * @param {float} arg0
 * @param {size_object} arg1
 * @return {cc.FadeOutUpTiles}
 */
create : function (
float, 
size 
)
{
    return cc.FadeOutUpTiles;
},

};

/**
 * @class FadeOutDownTiles
 */
cc.FadeOutDownTiles = {

/**
 * @method create
 * @param {float} arg0
 * @param {size_object} arg1
 * @return {cc.FadeOutDownTiles}
 */
create : function (
float, 
size 
)
{
    return cc.FadeOutDownTiles;
},

};

/**
 * @class TurnOffTiles
 */
cc.TurnOffTiles = {

/**
 * @method turnOnTile
 * @param {vec2_object} arg0
 */
turnOnTile : function (
vec2 
)
{
},

/**
 * @method turnOffTile
 * @param {vec2_object} arg0
 */
turnOffTile : function (
vec2 
)
{
},

/**
 * @method shuffle
 * @param {unsigned int} arg0
 * @param {unsigned int} arg1
 */
shuffle : function (
int, 
int 
)
{
},

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {unsigned int} arg2
 * @return {bool}
 */
initWithDuration : function (
float, 
size, 
int 
)
{
    return false;
},

/**
 * @method create
* @param {float|float} float
* @param {size_object|size_object} size
* @param {unsigned int} int
* @return {cc.TurnOffTiles|cc.TurnOffTiles}
*/
create : function(
float,
size,
int 
)
{
    return cc.TurnOffTiles;
},

/**
 * @method TurnOffTiles
 * @constructor
 */
TurnOffTiles : function (
)
{
},

};

/**
 * @class WavesTiles3D
 */
cc.WavesTiles3D = {

/**
 * @method setAmplitudeRate
 * @param {float} arg0
 */
setAmplitudeRate : function (
float 
)
{
},

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {unsigned int} arg2
 * @param {float} arg3
 * @return {bool}
 */
initWithDuration : function (
float, 
size, 
int, 
float 
)
{
    return false;
},

/**
 * @method getAmplitude
 * @return {float}
 */
getAmplitude : function (
)
{
    return 0;
},

/**
 * @method getAmplitudeRate
 * @return {float}
 */
getAmplitudeRate : function (
)
{
    return 0;
},

/**
 * @method setAmplitude
 * @param {float} arg0
 */
setAmplitude : function (
float 
)
{
},

/**
 * @method create
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {unsigned int} arg2
 * @param {float} arg3
 * @return {cc.WavesTiles3D}
 */
create : function (
float, 
size, 
int, 
float 
)
{
    return cc.WavesTiles3D;
},

/**
 * @method WavesTiles3D
 * @constructor
 */
WavesTiles3D : function (
)
{
},

};

/**
 * @class JumpTiles3D
 */
cc.JumpTiles3D = {

/**
 * @method setAmplitudeRate
 * @param {float} arg0
 */
setAmplitudeRate : function (
float 
)
{
},

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {unsigned int} arg2
 * @param {float} arg3
 * @return {bool}
 */
initWithDuration : function (
float, 
size, 
int, 
float 
)
{
    return false;
},

/**
 * @method getAmplitude
 * @return {float}
 */
getAmplitude : function (
)
{
    return 0;
},

/**
 * @method getAmplitudeRate
 * @return {float}
 */
getAmplitudeRate : function (
)
{
    return 0;
},

/**
 * @method setAmplitude
 * @param {float} arg0
 */
setAmplitude : function (
float 
)
{
},

/**
 * @method create
 * @param {float} arg0
 * @param {size_object} arg1
 * @param {unsigned int} arg2
 * @param {float} arg3
 * @return {cc.JumpTiles3D}
 */
create : function (
float, 
size, 
int, 
float 
)
{
    return cc.JumpTiles3D;
},

/**
 * @method JumpTiles3D
 * @constructor
 */
JumpTiles3D : function (
)
{
},

};

/**
 * @class SplitRows
 */
cc.SplitRows = {

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {unsigned int} arg1
 * @return {bool}
 */
initWithDuration : function (
float, 
int 
)
{
    return false;
},

/**
 * @method create
 * @param {float} arg0
 * @param {unsigned int} arg1
 * @return {cc.SplitRows}
 */
create : function (
float, 
int 
)
{
    return cc.SplitRows;
},

/**
 * @method SplitRows
 * @constructor
 */
SplitRows : function (
)
{
},

};

/**
 * @class SplitCols
 */
cc.SplitCols = {

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {unsigned int} arg1
 * @return {bool}
 */
initWithDuration : function (
float, 
int 
)
{
    return false;
},

/**
 * @method create
 * @param {float} arg0
 * @param {unsigned int} arg1
 * @return {cc.SplitCols}
 */
create : function (
float, 
int 
)
{
    return cc.SplitCols;
},

/**
 * @method SplitCols
 * @constructor
 */
SplitCols : function (
)
{
},

};

/**
 * @class ActionTween
 */
cc.ActionTween = {

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {String} arg1
 * @param {float} arg2
 * @param {float} arg3
 * @return {bool}
 */
initWithDuration : function (
float, 
str, 
float, 
float 
)
{
    return false;
},

/**
 * @method create
 * @param {float} arg0
 * @param {String} arg1
 * @param {float} arg2
 * @param {float} arg3
 * @return {cc.ActionTween}
 */
create : function (
float, 
str, 
float, 
float 
)
{
    return cc.ActionTween;
},

};

/**
 * @class CardinalSplineTo
 */
cc.CardinalSplineTo = {

/**
 * @method getPoints
 * @return {point_object}
 */
getPoints : function (
)
{
    return cc.PointArray;
},

/**
 * @method updatePosition
 * @param {vec2_object} arg0
 */
updatePosition : function (
vec2 
)
{
},

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {point_object} arg1
 * @param {float} arg2
 * @return {bool}
 */
initWithDuration : function (
float, 
pointarray, 
float 
)
{
    return false;
},

/**
 * @method CardinalSplineTo
 * @constructor
 */
CardinalSplineTo : function (
)
{
},

};

/**
 * @class CardinalSplineBy
 */
cc.CardinalSplineBy = {

/**
 * @method CardinalSplineBy
 * @constructor
 */
CardinalSplineBy : function (
)
{
},

};

/**
 * @class CatmullRomTo
 */
cc.CatmullRomTo = {

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {point_object} arg1
 * @return {bool}
 */
initWithDuration : function (
float, 
pointarray 
)
{
    return false;
},

};

/**
 * @class CatmullRomBy
 */
cc.CatmullRomBy = {

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {point_object} arg1
 * @return {bool}
 */
initWithDuration : function (
float, 
pointarray 
)
{
    return false;
},

};

/**
 * @class DrawNode
 */
cc.DrawNode = {

/**
 * @method drawTriangle
 * @param {vec2_object} arg0
 * @param {vec2_object} arg1
 * @param {vec2_object} arg2
 * @param {color4f_object} arg3
 */
drawTriangle : function (
vec2, 
vec2, 
vec2, 
color4f 
)
{
},

/**
 * @method getBlendFunc
 * @return {cc.BlendFunc}
 */
getBlendFunc : function (
)
{
    return cc.BlendFunc;
},

/**
 * @method onDraw
 * @param {mat4_object} arg0
 * @param {unsigned int} arg1
 */
onDraw : function (
mat4, 
int 
)
{
},

/**
 * @method clear
 */
clear : function (
)
{
},

/**
 * @method setBlendFunc
 * @param {cc.BlendFunc} arg0
 */
setBlendFunc : function (
blendfunc 
)
{
},

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method drawDot
 * @param {vec2_object} arg0
 * @param {float} arg1
 * @param {color4f_object} arg2
 */
drawDot : function (
vec2, 
float, 
color4f 
)
{
},

/**
 * @method drawQuadraticBezier
 * @param {vec2_object} arg0
 * @param {vec2_object} arg1
 * @param {vec2_object} arg2
 * @param {unsigned int} arg3
 * @param {color4f_object} arg4
 */
drawQuadraticBezier : function (
vec2, 
vec2, 
vec2, 
int, 
color4f 
)
{
},

/**
 * @method drawCubicBezier
 * @param {vec2_object} arg0
 * @param {vec2_object} arg1
 * @param {vec2_object} arg2
 * @param {vec2_object} arg3
 * @param {unsigned int} arg4
 * @param {color4f_object} arg5
 */
drawCubicBezier : function (
vec2, 
vec2, 
vec2, 
vec2, 
int, 
color4f 
)
{
},

/**
 * @method drawSegment
 * @param {vec2_object} arg0
 * @param {vec2_object} arg1
 * @param {float} arg2
 * @param {color4f_object} arg3
 */
drawSegment : function (
vec2, 
vec2, 
float, 
color4f 
)
{
},

/**
 * @method create
 * @return {cc.DrawNode}
 */
create : function (
)
{
    return cc.DrawNode;
},

/**
 * @method DrawNode
 * @constructor
 */
DrawNode : function (
)
{
},

};

/**
 * @class LabelTTF
 */
cc.LabelTTF = {

/**
 * @method enableShadow
 * @param {size_object} arg0
 * @param {float} arg1
 * @param {float} arg2
 * @param {bool} arg3
 */
enableShadow : function (
size, 
float, 
float, 
bool 
)
{
},

/**
 * @method setDimensions
 * @param {size_object} arg0
 */
setDimensions : function (
size 
)
{
},

/**
 * @method getFontSize
 * @return {float}
 */
getFontSize : function (
)
{
    return 0;
},

/**
 * @method getString
 * @return {String}
 */
getString : function (
)
{
    return ;
},

/**
 * @method setFlippedY
 * @param {bool} arg0
 */
setFlippedY : function (
bool 
)
{
},

/**
 * @method setFlippedX
 * @param {bool} arg0
 */
setFlippedX : function (
bool 
)
{
},

/**
 * @method setTextDefinition
 * @param {cc.FontDefinition} arg0
 */
setTextDefinition : function (
fontdefinition 
)
{
},

/**
 * @method setFontName
 * @param {String} arg0
 */
setFontName : function (
str 
)
{
},

/**
 * @method getHorizontalAlignment
 * @return {cc.TextHAlignment}
 */
getHorizontalAlignment : function (
)
{
    return 0;
},

/**
 * @method initWithStringAndTextDefinition
 * @param {String} arg0
 * @param {cc.FontDefinition} arg1
 * @return {bool}
 */
initWithStringAndTextDefinition : function (
str, 
fontdefinition 
)
{
    return false;
},

/**
 * @method setString
 * @param {String} arg0
 */
setString : function (
str 
)
{
},

/**
 * @method initWithString
 * @param {String} arg0
 * @param {String} arg1
 * @param {float} arg2
 * @param {size_object} arg3
 * @param {cc.TextHAlignment} arg4
 * @param {cc.TextVAlignment} arg5
 * @return {bool}
 */
initWithString : function (
str, 
str, 
float, 
size, 
texthalignment, 
textvalignment 
)
{
    return false;
},

/**
 * @method setFontFillColor
 * @param {color3b_object} arg0
 * @param {bool} arg1
 */
setFontFillColor : function (
color3b, 
bool 
)
{
},

/**
 * @method getBlendFunc
 * @return {cc.BlendFunc}
 */
getBlendFunc : function (
)
{
    return cc.BlendFunc;
},

/**
 * @method enableStroke
 * @param {color3b_object} arg0
 * @param {float} arg1
 * @param {bool} arg2
 */
enableStroke : function (
color3b, 
float, 
bool 
)
{
},

/**
 * @method getDimensions
 * @return {size_object}
 */
getDimensions : function (
)
{
    return cc.Size;
},

/**
 * @method setVerticalAlignment
 * @param {cc.TextVAlignment} arg0
 */
setVerticalAlignment : function (
textvalignment 
)
{
},

/**
 * @method setFontSize
 * @param {float} arg0
 */
setFontSize : function (
float 
)
{
},

/**
 * @method getVerticalAlignment
 * @return {cc.TextVAlignment}
 */
getVerticalAlignment : function (
)
{
    return 0;
},

/**
 * @method getTextDefinition
 * @return {cc.FontDefinition}
 */
getTextDefinition : function (
)
{
    return cc.FontDefinition;
},

/**
 * @method setBlendFunc
 * @param {cc.BlendFunc} arg0
 */
setBlendFunc : function (
blendfunc 
)
{
},

/**
 * @method getFontName
 * @return {String}
 */
getFontName : function (
)
{
    return ;
},

/**
 * @method setHorizontalAlignment
 * @param {cc.TextHAlignment} arg0
 */
setHorizontalAlignment : function (
texthalignment 
)
{
},

/**
 * @method disableShadow
 */
disableShadow : function (
)
{
},

/**
 * @method disableStroke
 */
disableStroke : function (
)
{
},

/**
 * @method create
* @param {String} str
* @param {String} str
* @param {float} float
* @param {size_object} size
* @param {cc.TextHAlignment} texthalignment
* @param {cc.TextVAlignment} textvalignment
* @return {cc.LabelTTF|cc.LabelTTF}
*/
create : function(
str,
str,
float,
size,
texthalignment,
textvalignment 
)
{
    return cc.LabelTTF;
},

/**
 * @method createWithFontDefinition
 * @param {String} arg0
 * @param {cc.FontDefinition} arg1
 * @return {cc.LabelTTF}
 */
createWithFontDefinition : function (
str, 
fontdefinition 
)
{
    return cc.LabelTTF;
},

/**
 * @method LabelTTF
 * @constructor
 */
LabelTTF : function (
)
{
},

};

/**
 * @class GLProgram
 */
cc.GLProgram = {

/**
 * @method getFragmentShaderLog
 * @return {String}
 */
getFragmentShaderLog : function (
)
{
    return ;
},

/**
 * @method bindAttribLocation
 * @param {String} arg0
 * @param {unsigned int} arg1
 */
bindAttribLocation : function (
str, 
int 
)
{
},

/**
 * @method setUniformLocationWithMatrix4fv
 * @param {int} arg0
 * @param {float} arg1
 * @param {unsigned int} arg2
 */
setUniformLocationWithMatrix4fv : function (
int, 
float, 
int 
)
{
},

/**
 * @method getUniformLocationForName
 * @param {char} arg0
 * @return {int}
 */
getUniformLocationForName : function (
char 
)
{
    return 0;
},

/**
 * @method use
 */
use : function (
)
{
},

/**
 * @method getVertexShaderLog
 * @return {String}
 */
getVertexShaderLog : function (
)
{
    return ;
},

/**
 * @method getUniform
 * @param {String} arg0
 * @return {cc.Uniform}
 */
getUniform : function (
str 
)
{
    return cc.Uniform;
},

/**
 * @method initWithByteArrays
 * @param {char} arg0
 * @param {char} arg1
 * @return {bool}
 */
initWithByteArrays : function (
char, 
char 
)
{
    return false;
},

/**
 * @method initWithFilenames
 * @param {String} arg0
 * @param {String} arg1
 * @return {bool}
 */
initWithFilenames : function (
str, 
str 
)
{
    return false;
},

/**
 * @method setUniformsForBuiltins
* @param {mat4_object} mat4
*/
setUniformsForBuiltins : function(
mat4 
)
{
},

/**
 * @method setUniformLocationWith3i
 * @param {int} arg0
 * @param {int} arg1
 * @param {int} arg2
 * @param {int} arg3
 */
setUniformLocationWith3i : function (
int, 
int, 
int, 
int 
)
{
},

/**
 * @method setUniformLocationWith3iv
 * @param {int} arg0
 * @param {int} arg1
 * @param {unsigned int} arg2
 */
setUniformLocationWith3iv : function (
int, 
int, 
int 
)
{
},

/**
 * @method updateUniforms
 */
updateUniforms : function (
)
{
},

/**
 * @method setUniformLocationWith4iv
 * @param {int} arg0
 * @param {int} arg1
 * @param {unsigned int} arg2
 */
setUniformLocationWith4iv : function (
int, 
int, 
int 
)
{
},

/**
 * @method getUniformLocation
 * @param {String} arg0
 * @return {int}
 */
getUniformLocation : function (
str 
)
{
    return 0;
},

/**
 * @method link
 * @return {bool}
 */
link : function (
)
{
    return false;
},

/**
 * @method setUniformLocationWith2iv
 * @param {int} arg0
 * @param {int} arg1
 * @param {unsigned int} arg2
 */
setUniformLocationWith2iv : function (
int, 
int, 
int 
)
{
},

/**
 * @method setUniformLocationWithMatrix3fv
 * @param {int} arg0
 * @param {float} arg1
 * @param {unsigned int} arg2
 */
setUniformLocationWithMatrix3fv : function (
int, 
float, 
int 
)
{
},

/**
 * @method reset
 */
reset : function (
)
{
},

/**
 * @method getAttribLocation
 * @param {String} arg0
 * @return {int}
 */
getAttribLocation : function (
str 
)
{
    return 0;
},

/**
 * @method getVertexAttrib
 * @param {String} arg0
 * @return {cc.VertexAttrib}
 */
getVertexAttrib : function (
str 
)
{
    return cc.VertexAttrib;
},

/**
 * @method setUniformLocationWithMatrix2fv
 * @param {int} arg0
 * @param {float} arg1
 * @param {unsigned int} arg2
 */
setUniformLocationWithMatrix2fv : function (
int, 
float, 
int 
)
{
},

/**
 * @method setUniformLocationWith4i
 * @param {int} arg0
 * @param {int} arg1
 * @param {int} arg2
 * @param {int} arg3
 * @param {int} arg4
 */
setUniformLocationWith4i : function (
int, 
int, 
int, 
int, 
int 
)
{
},

/**
 * @method setUniformLocationWith1i
 * @param {int} arg0
 * @param {int} arg1
 */
setUniformLocationWith1i : function (
int, 
int 
)
{
},

/**
 * @method setUniformLocationWith2i
 * @param {int} arg0
 * @param {int} arg1
 * @param {int} arg2
 */
setUniformLocationWith2i : function (
int, 
int, 
int 
)
{
},

/**
 * @method createWithByteArrays
 * @param {char} arg0
 * @param {char} arg1
 * @return {cc.GLProgram}
 */
createWithByteArrays : function (
char, 
char 
)
{
    return cc.GLProgram;
},

/**
 * @method createWithFilenames
 * @param {String} arg0
 * @param {String} arg1
 * @return {cc.GLProgram}
 */
createWithFilenames : function (
str, 
str 
)
{
    return cc.GLProgram;
},

/**
 * @method GLProgram
 * @constructor
 */
GLProgram : function (
)
{
},

};

/**
 * @class SpriteBatchNode
 */
cc.SpriteBatchNode = {

/**
 * @method appendChild
 * @param {cc.Sprite} arg0
 */
appendChild : function (
sprite 
)
{
},

/**
 * @method reorderBatch
 * @param {bool} arg0
 */
reorderBatch : function (
bool 
)
{
},

/**
 * @method getTexture
 * @return {cc.Texture2D}
 */
getTexture : function (
)
{
    return cc.Texture2D;
},

/**
 * @method setTexture
 * @param {cc.Texture2D} arg0
 */
setTexture : function (
texture2d 
)
{
},

/**
 * @method removeChildAtIndex
 * @param {long} arg0
 * @param {bool} arg1
 */
removeChildAtIndex : function (
long, 
bool 
)
{
},

/**
 * @method removeSpriteFromAtlas
 * @param {cc.Sprite} arg0
 */
removeSpriteFromAtlas : function (
sprite 
)
{
},

/**
 * @method addSpriteWithoutQuad
 * @param {cc.Sprite} arg0
 * @param {int} arg1
 * @param {int} arg2
 * @return {cc.SpriteBatchNode}
 */
addSpriteWithoutQuad : function (
sprite, 
int, 
int 
)
{
    return cc.SpriteBatchNode;
},

/**
 * @method atlasIndexForChild
 * @param {cc.Sprite} arg0
 * @param {int} arg1
 * @return {long}
 */
atlasIndexForChild : function (
sprite, 
int 
)
{
    return 0;
},

/**
 * @method increaseAtlasCapacity
 */
increaseAtlasCapacity : function (
)
{
},

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method lowestAtlasIndexInChild
 * @param {cc.Sprite} arg0
 * @return {long}
 */
lowestAtlasIndexInChild : function (
sprite 
)
{
    return 0;
},

/**
 * @method getBlendFunc
 * @return {cc.BlendFunc}
 */
getBlendFunc : function (
)
{
    return cc.BlendFunc;
},

/**
 * @method initWithTexture
 * @param {cc.Texture2D} arg0
 * @param {long} arg1
 * @return {bool}
 */
initWithTexture : function (
texture2d, 
long 
)
{
    return false;
},

/**
 * @method setTextureAtlas
 * @param {cc.TextureAtlas} arg0
 */
setTextureAtlas : function (
textureatlas 
)
{
},

/**
 * @method insertQuadFromSprite
 * @param {cc.Sprite} arg0
 * @param {long} arg1
 */
insertQuadFromSprite : function (
sprite, 
long 
)
{
},

/**
 * @method initWithFile
 * @param {String} arg0
 * @param {long} arg1
 * @return {bool}
 */
initWithFile : function (
str, 
long 
)
{
    return false;
},

/**
 * @method setBlendFunc
 * @param {cc.BlendFunc} arg0
 */
setBlendFunc : function (
blendfunc 
)
{
},

/**
 * @method rebuildIndexInOrder
 * @param {cc.Sprite} arg0
 * @param {long} arg1
 * @return {long}
 */
rebuildIndexInOrder : function (
sprite, 
long 
)
{
    return 0;
},

/**
 * @method getTextureAtlas
 * @return {cc.TextureAtlas}
 */
getTextureAtlas : function (
)
{
    return cc.TextureAtlas;
},

/**
 * @method highestAtlasIndexInChild
 * @param {cc.Sprite} arg0
 * @return {long}
 */
highestAtlasIndexInChild : function (
sprite 
)
{
    return 0;
},

/**
 * @method create
 * @param {String} arg0
 * @param {long} arg1
 * @return {cc.SpriteBatchNode}
 */
create : function (
str, 
long 
)
{
    return cc.SpriteBatchNode;
},

/**
 * @method createWithTexture
 * @param {cc.Texture2D} arg0
 * @param {long} arg1
 * @return {cc.SpriteBatchNode}
 */
createWithTexture : function (
texture2d, 
long 
)
{
    return cc.SpriteBatchNode;
},

/**
 * @method SpriteBatchNode
 * @constructor
 */
SpriteBatchNode : function (
)
{
},

};

/**
 * @class Label
 */
cc.Label = {

/**
 * @method isClipMarginEnabled
 * @return {bool}
 */
isClipMarginEnabled : function (
)
{
    return false;
},

/**
 * @method enableShadow
 */
enableShadow : function (
)
{
},

/**
 * @method setDimensions
 * @param {unsigned int} arg0
 * @param {unsigned int} arg1
 */
setDimensions : function (
int, 
int 
)
{
},

/**
 * @method getString
 * @return {String}
 */
getString : function (
)
{
    return ;
},

/**
 * @method getHeight
 * @return {unsigned int}
 */
getHeight : function (
)
{
    return 0;
},

/**
 * @method disableEffect
 */
disableEffect : function (
)
{
},

/**
 * @method getTextColor
 * @return {color4b_object}
 */
getTextColor : function (
)
{
    return cc.Color4B;
},

/**
 * @method setWidth
 * @param {unsigned int} arg0
 */
setWidth : function (
int 
)
{
},

/**
 * @method getMaxLineWidth
 * @return {unsigned int}
 */
getMaxLineWidth : function (
)
{
    return 0;
},

/**
 * @method getHorizontalAlignment
 * @return {cc.TextHAlignment}
 */
getHorizontalAlignment : function (
)
{
    return 0;
},

/**
 * @method setClipMarginEnabled
 * @param {bool} arg0
 */
setClipMarginEnabled : function (
bool 
)
{
},

/**
 * @method setString
 * @param {String} arg0
 */
setString : function (
str 
)
{
},

/**
 * @method setSystemFontName
 * @param {String} arg0
 */
setSystemFontName : function (
str 
)
{
},

/**
 * @method setBMFontFilePath
 * @param {String} arg0
 * @param {vec2_object} arg1
 * @return {bool}
 */
setBMFontFilePath : function (
str, 
vec2 
)
{
    return false;
},

/**
 * @method setLineHeight
 * @param {float} arg0
 */
setLineHeight : function (
float 
)
{
},

/**
 * @method setSystemFontSize
 * @param {float} arg0
 */
setSystemFontSize : function (
float 
)
{
},

/**
 * @method updateContent
 */
updateContent : function (
)
{
},

/**
 * @method getStringLength
 * @return {int}
 */
getStringLength : function (
)
{
    return 0;
},

/**
 * @method setLineBreakWithoutSpace
 * @param {bool} arg0
 */
setLineBreakWithoutSpace : function (
bool 
)
{
},

/**
 * @method getStringNumLines
 * @return {int}
 */
getStringNumLines : function (
)
{
    return 0;
},

/**
 * @method enableOutline
 * @param {color4b_object} arg0
 * @param {int} arg1
 */
enableOutline : function (
color4b, 
int 
)
{
},

/**
 * @method getAdditionalKerning
 * @return {float}
 */
getAdditionalKerning : function (
)
{
    return 0;
},

/**
 * @method setCharMap
* @param {cc.Texture2D|String|String} texture2d
* @param {int|int} int
* @param {int|int} int
* @param {int|int} int
* @return {bool|bool|bool}
*/
setCharMap : function(
str,
int,
int,
int 
)
{
    return false;
},

/**
 * @method getDimensions
 * @return {size_object}
 */
getDimensions : function (
)
{
    return cc.Size;
},

/**
 * @method setMaxLineWidth
 * @param {unsigned int} arg0
 */
setMaxLineWidth : function (
int 
)
{
},

/**
 * @method getSystemFontName
 * @return {String}
 */
getSystemFontName : function (
)
{
    return ;
},

/**
 * @method setVerticalAlignment
 * @param {cc.TextVAlignment} arg0
 */
setVerticalAlignment : function (
textvalignment 
)
{
},

/**
 * @method getLineHeight
 * @return {float}
 */
getLineHeight : function (
)
{
    return 0;
},

/**
 * @method getTTFConfig
 * @return {cc._ttfConfig}
 */
getTTFConfig : function (
)
{
    return cc._ttfConfig;
},

/**
 * @method getVerticalAlignment
 * @return {cc.TextVAlignment}
 */
getVerticalAlignment : function (
)
{
    return 0;
},

/**
 * @method setTextColor
 * @param {color4b_object} arg0
 */
setTextColor : function (
color4b 
)
{
},

/**
 * @method setHeight
 * @param {unsigned int} arg0
 */
setHeight : function (
int 
)
{
},

/**
 * @method getWidth
 * @return {unsigned int}
 */
getWidth : function (
)
{
    return 0;
},

/**
 * @method enableGlow
 * @param {color4b_object} arg0
 */
enableGlow : function (
color4b 
)
{
},

/**
 * @method getLetter
 * @param {int} arg0
 * @return {cc.Sprite}
 */
getLetter : function (
int 
)
{
    return cc.Sprite;
},

/**
 * @method setAdditionalKerning
 * @param {float} arg0
 */
setAdditionalKerning : function (
float 
)
{
},

/**
 * @method getSystemFontSize
 * @return {float}
 */
getSystemFontSize : function (
)
{
    return 0;
},

/**
 * @method getTextAlignment
 * @return {cc.TextHAlignment}
 */
getTextAlignment : function (
)
{
    return 0;
},

/**
 * @method getBMFontFilePath
 * @return {String}
 */
getBMFontFilePath : function (
)
{
    return ;
},

/**
 * @method setHorizontalAlignment
 * @param {cc.TextHAlignment} arg0
 */
setHorizontalAlignment : function (
texthalignment 
)
{
},

/**
 * @method setAlignment
* @param {cc.TextHAlignment|cc.TextHAlignment} texthalignment
* @param {cc.TextVAlignment} textvalignment
*/
setAlignment : function(
texthalignment,
textvalignment 
)
{
},

/**
 * @method createWithBMFont
 * @param {String} arg0
 * @param {String} arg1
 * @param {cc.TextHAlignment} arg2
 * @param {int} arg3
 * @param {vec2_object} arg4
 * @return {cc.Label}
 */
createWithBMFont : function (
str, 
str, 
texthalignment, 
int, 
vec2 
)
{
    return cc.Label;
},

/**
 * @method create
 * @return {cc.Label}
 */
create : function (
)
{
    return cc.Label;
},

/**
 * @method createWithCharMap
* @param {cc.Texture2D|String|String} texture2d
* @param {int|int} int
* @param {int|int} int
* @param {int|int} int
* @return {cc.Label|cc.Label|cc.Label}
*/
createWithCharMap : function(
str,
int,
int,
int 
)
{
    return cc.Label;
},

/**
 * @method createWithSystemFont
 * @param {String} arg0
 * @param {String} arg1
 * @param {float} arg2
 * @param {size_object} arg3
 * @param {cc.TextHAlignment} arg4
 * @param {cc.TextVAlignment} arg5
 * @return {cc.Label}
 */
createWithSystemFont : function (
str, 
str, 
float, 
size, 
texthalignment, 
textvalignment 
)
{
    return cc.Label;
},

};

/**
 * @class LabelBMFont
 */
cc.LabelBMFont = {

/**
 * @method setLineBreakWithoutSpace
 * @param {bool} arg0
 */
setLineBreakWithoutSpace : function (
bool 
)
{
},

/**
 * @method getBlendFunc
 * @return {cc.BlendFunc}
 */
getBlendFunc : function (
)
{
    return cc.BlendFunc;
},

/**
 * @method isOpacityModifyRGB
 * @return {bool}
 */
isOpacityModifyRGB : function (
)
{
    return false;
},

/**
 * @method getLetter
 * @param {int} arg0
 * @return {cc.Sprite}
 */
getLetter : function (
int 
)
{
    return cc.Sprite;
},

/**
 * @method getString
 * @return {String}
 */
getString : function (
)
{
    return ;
},

/**
 * @method setBlendFunc
 * @param {cc.BlendFunc} arg0
 */
setBlendFunc : function (
blendfunc 
)
{
},

/**
 * @method setString
 * @param {String} arg0
 */
setString : function (
str 
)
{
},

/**
 * @method initWithString
 * @param {String} arg0
 * @param {String} arg1
 * @param {float} arg2
 * @param {cc.TextHAlignment} arg3
 * @param {vec2_object} arg4
 * @return {bool}
 */
initWithString : function (
str, 
str, 
float, 
texthalignment, 
vec2 
)
{
    return false;
},

/**
 * @method setOpacityModifyRGB
 * @param {bool} arg0
 */
setOpacityModifyRGB : function (
bool 
)
{
},

/**
 * @method getFntFile
 * @return {String}
 */
getFntFile : function (
)
{
    return ;
},

/**
 * @method setFntFile
 * @param {String} arg0
 * @param {vec2_object} arg1
 */
setFntFile : function (
str, 
vec2 
)
{
},

/**
 * @method setAlignment
 * @param {cc.TextHAlignment} arg0
 */
setAlignment : function (
texthalignment 
)
{
},

/**
 * @method setWidth
 * @param {float} arg0
 */
setWidth : function (
float 
)
{
},

/**
 * @method create
* @param {String} str
* @param {String} str
* @param {float} float
* @param {cc.TextHAlignment} texthalignment
* @param {vec2_object} vec2
* @return {cc.LabelBMFont|cc.LabelBMFont}
*/
create : function(
str,
str,
float,
texthalignment,
vec2 
)
{
    return cc.LabelBMFont;
},

/**
 * @method LabelBMFont
 * @constructor
 */
LabelBMFont : function (
)
{
},

};

/**
 * @class Layer
 */
cc.Layer = {

/**
 * @method create
 * @return {cc.Layer}
 */
create : function (
)
{
    return cc.Layer;
},

/**
 * @method Layer
 * @constructor
 */
Layer : function (
)
{
},

};

/**
 * @class __LayerRGBA
 */
cc.LayerRGBA = {

/**
 * @method create
 * @return {cc.__LayerRGBA}
 */
create : function (
)
{
    return cc.__LayerRGBA;
},

};

/**
 * @class LayerColor
 */
cc.LayerColor = {

/**
 * @method changeWidthAndHeight
 * @param {float} arg0
 * @param {float} arg1
 */
changeWidthAndHeight : function (
float, 
float 
)
{
},

/**
 * @method getBlendFunc
 * @return {cc.BlendFunc}
 */
getBlendFunc : function (
)
{
    return cc.BlendFunc;
},

/**
 * @method setBlendFunc
 * @param {cc.BlendFunc} arg0
 */
setBlendFunc : function (
blendfunc 
)
{
},

/**
 * @method changeWidth
 * @param {float} arg0
 */
changeWidth : function (
float 
)
{
},

/**
 * @method initWithColor
* @param {color4b_object|color4b_object} color4b
* @param {float} float
* @param {float} float
* @return {bool|bool|bool}
*/
initWithColor : function(
color4b,
float,
float 
)
{
    return false;
},

/**
 * @method changeHeight
 * @param {float} arg0
 */
changeHeight : function (
float 
)
{
},

/**
 * @method create
* @param {color4b_object|color4b_object} color4b
* @param {float} float
* @param {float} float
* @return {cc.LayerColor|cc.LayerColor|cc.LayerColor}
*/
create : function(
color4b,
float,
float 
)
{
    return cc.LayerColor;
},

/**
 * @method LayerColor
 * @constructor
 */
LayerColor : function (
)
{
},

};

/**
 * @class LayerGradient
 */
cc.LayerGradient = {

/**
 * @method getStartColor
 * @return {color3b_object}
 */
getStartColor : function (
)
{
    return cc.Color3B;
},

/**
 * @method isCompressedInterpolation
 * @return {bool}
 */
isCompressedInterpolation : function (
)
{
    return false;
},

/**
 * @method getStartOpacity
 * @return {unsigned char}
 */
getStartOpacity : function (
)
{
    return 0;
},

/**
 * @method setVector
 * @param {vec2_object} arg0
 */
setVector : function (
vec2 
)
{
},

/**
 * @method setStartOpacity
 * @param {unsigned char} arg0
 */
setStartOpacity : function (
char 
)
{
},

/**
 * @method setCompressedInterpolation
 * @param {bool} arg0
 */
setCompressedInterpolation : function (
bool 
)
{
},

/**
 * @method setEndOpacity
 * @param {unsigned char} arg0
 */
setEndOpacity : function (
char 
)
{
},

/**
 * @method getVector
 * @return {vec2_object}
 */
getVector : function (
)
{
    return cc.Vec2;
},

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method setEndColor
 * @param {color3b_object} arg0
 */
setEndColor : function (
color3b 
)
{
},

/**
 * @method initWithColor
* @param {color4b_object|color4b_object} color4b
* @param {color4b_object|color4b_object} color4b
* @param {vec2_object} vec2
* @return {bool|bool}
*/
initWithColor : function(
color4b,
color4b,
vec2 
)
{
    return false;
},

/**
 * @method getEndColor
 * @return {color3b_object}
 */
getEndColor : function (
)
{
    return cc.Color3B;
},

/**
 * @method getEndOpacity
 * @return {unsigned char}
 */
getEndOpacity : function (
)
{
    return 0;
},

/**
 * @method setStartColor
 * @param {color3b_object} arg0
 */
setStartColor : function (
color3b 
)
{
},

/**
 * @method create
* @param {color4b_object|color4b_object} color4b
* @param {color4b_object|color4b_object} color4b
* @param {vec2_object} vec2
* @return {cc.LayerGradient|cc.LayerGradient|cc.LayerGradient}
*/
create : function(
color4b,
color4b,
vec2 
)
{
    return cc.LayerGradient;
},

/**
 * @method LayerGradient
 * @constructor
 */
LayerGradient : function (
)
{
},

};

/**
 * @class LayerMultiplex
 */
cc.LayerMultiplex = {

/**
 * @method initWithArray
 * @param {Array} arg0
 * @return {bool}
 */
initWithArray : function (
array 
)
{
    return false;
},

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method switchToAndReleaseMe
 * @param {int} arg0
 */
switchToAndReleaseMe : function (
int 
)
{
},

/**
 * @method addLayer
 * @param {cc.Layer} arg0
 */
addLayer : function (
layer 
)
{
},

/**
 * @method switchTo
 * @param {int} arg0
 */
switchTo : function (
int 
)
{
},

/**
 * @method LayerMultiplex
 * @constructor
 */
LayerMultiplex : function (
)
{
},

};

/**
 * @class Scene
 */
cc.Scene = {

/**
 * @method initWithSize
 * @param {size_object} arg0
 * @return {bool}
 */
initWithSize : function (
size 
)
{
    return false;
},

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method initWithPhysics
 * @return {bool}
 */
initWithPhysics : function (
)
{
    return false;
},

/**
 * @method getPhysicsWorld
 * @return {cc.PhysicsWorld}
 */
getPhysicsWorld : function (
)
{
    return cc.PhysicsWorld;
},

/**
 * @method createWithSize
 * @param {size_object} arg0
 * @return {cc.Scene}
 */
createWithSize : function (
size 
)
{
    return cc.Scene;
},

/**
 * @method create
 * @return {cc.Scene}
 */
create : function (
)
{
    return cc.Scene;
},

/**
 * @method createWithPhysics
 * @return {cc.Scene}
 */
createWithPhysics : function (
)
{
    return cc.Scene;
},

/**
 * @method Scene
 * @constructor
 */
Scene : function (
)
{
},

};

/**
 * @class TransitionEaseScene
 */
cc.TransitionEaseScene = {

/**
 * @method easeActionWithAction
 * @param {cc.ActionInterval} arg0
 * @return {cc.ActionInterval}
 */
easeActionWithAction : function (
actioninterval 
)
{
    return cc.ActionInterval;
},

};

/**
 * @class TransitionScene
 */
cc.TransitionScene = {

/**
 * @method finish
 */
finish : function (
)
{
},

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {bool}
 */
initWithDuration : function (
float, 
scene 
)
{
    return false;
},

/**
 * @method hideOutShowIn
 */
hideOutShowIn : function (
)
{
},

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionScene}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionScene;
},

/**
 * @method TransitionScene
 * @constructor
 */
TransitionScene : function (
)
{
},

};

/**
 * @class TransitionSceneOriented
 */
cc.TransitionSceneOriented = {

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @param {cc.TransitionScene::Orientation} arg2
 * @return {bool}
 */
initWithDuration : function (
float, 
scene, 
orientation 
)
{
    return false;
},

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @param {cc.TransitionScene::Orientation} arg2
 * @return {cc.TransitionSceneOriented}
 */
create : function (
float, 
scene, 
orientation 
)
{
    return cc.TransitionSceneOriented;
},

/**
 * @method TransitionSceneOriented
 * @constructor
 */
TransitionSceneOriented : function (
)
{
},

};

/**
 * @class TransitionRotoZoom
 */
cc.TransitionRotoZoom = {

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionRotoZoom}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionRotoZoom;
},

};

/**
 * @class TransitionJumpZoom
 */
cc.TransitionJumpZoom = {

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionJumpZoom}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionJumpZoom;
},

};

/**
 * @class TransitionMoveInL
 */
cc.TransitionMoveInL = {

/**
 * @method action
 * @return {cc.ActionInterval}
 */
action : function (
)
{
    return cc.ActionInterval;
},

/**
 * @method easeActionWithAction
 * @param {cc.ActionInterval} arg0
 * @return {cc.ActionInterval}
 */
easeActionWithAction : function (
actioninterval 
)
{
    return cc.ActionInterval;
},

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionMoveInL}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionMoveInL;
},

};

/**
 * @class TransitionMoveInR
 */
cc.TransitionMoveInR = {

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionMoveInR}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionMoveInR;
},

};

/**
 * @class TransitionMoveInT
 */
cc.TransitionMoveInT = {

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionMoveInT}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionMoveInT;
},

};

/**
 * @class TransitionMoveInB
 */
cc.TransitionMoveInB = {

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionMoveInB}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionMoveInB;
},

};

/**
 * @class TransitionSlideInL
 */
cc.TransitionSlideInL = {

/**
 * @method action
 * @return {cc.ActionInterval}
 */
action : function (
)
{
    return cc.ActionInterval;
},

/**
 * @method easeActionWithAction
 * @param {cc.ActionInterval} arg0
 * @return {cc.ActionInterval}
 */
easeActionWithAction : function (
actioninterval 
)
{
    return cc.ActionInterval;
},

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionSlideInL}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionSlideInL;
},

};

/**
 * @class TransitionSlideInR
 */
cc.TransitionSlideInR = {

/**
 * @method action
 * @return {cc.ActionInterval}
 */
action : function (
)
{
    return cc.ActionInterval;
},

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionSlideInR}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionSlideInR;
},

};

/**
 * @class TransitionSlideInB
 */
cc.TransitionSlideInB = {

/**
 * @method action
 * @return {cc.ActionInterval}
 */
action : function (
)
{
    return cc.ActionInterval;
},

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionSlideInB}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionSlideInB;
},

};

/**
 * @class TransitionSlideInT
 */
cc.TransitionSlideInT = {

/**
 * @method action
 * @return {cc.ActionInterval}
 */
action : function (
)
{
    return cc.ActionInterval;
},

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionSlideInT}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionSlideInT;
},

};

/**
 * @class TransitionShrinkGrow
 */
cc.TransitionShrinkGrow = {

/**
 * @method easeActionWithAction
 * @param {cc.ActionInterval} arg0
 * @return {cc.ActionInterval}
 */
easeActionWithAction : function (
actioninterval 
)
{
    return cc.ActionInterval;
},

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionShrinkGrow}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionShrinkGrow;
},

};

/**
 * @class TransitionFlipX
 */
cc.TransitionFlipX = {

/**
 * @method create
* @param {float|float} float
* @param {cc.Scene|cc.Scene} scene
* @param {cc.TransitionScene::Orientation} orientation
* @return {cc.TransitionFlipX|cc.TransitionFlipX}
*/
create : function(
float,
scene,
orientation 
)
{
    return cc.TransitionFlipX;
},

};

/**
 * @class TransitionFlipY
 */
cc.TransitionFlipY = {

/**
 * @method create
* @param {float|float} float
* @param {cc.Scene|cc.Scene} scene
* @param {cc.TransitionScene::Orientation} orientation
* @return {cc.TransitionFlipY|cc.TransitionFlipY}
*/
create : function(
float,
scene,
orientation 
)
{
    return cc.TransitionFlipY;
},

};

/**
 * @class TransitionFlipAngular
 */
cc.TransitionFlipAngular = {

/**
 * @method create
* @param {float|float} float
* @param {cc.Scene|cc.Scene} scene
* @param {cc.TransitionScene::Orientation} orientation
* @return {cc.TransitionFlipAngular|cc.TransitionFlipAngular}
*/
create : function(
float,
scene,
orientation 
)
{
    return cc.TransitionFlipAngular;
},

};

/**
 * @class TransitionZoomFlipX
 */
cc.TransitionZoomFlipX = {

/**
 * @method create
* @param {float|float} float
* @param {cc.Scene|cc.Scene} scene
* @param {cc.TransitionScene::Orientation} orientation
* @return {cc.TransitionZoomFlipX|cc.TransitionZoomFlipX}
*/
create : function(
float,
scene,
orientation 
)
{
    return cc.TransitionZoomFlipX;
},

};

/**
 * @class TransitionZoomFlipY
 */
cc.TransitionZoomFlipY = {

/**
 * @method create
* @param {float|float} float
* @param {cc.Scene|cc.Scene} scene
* @param {cc.TransitionScene::Orientation} orientation
* @return {cc.TransitionZoomFlipY|cc.TransitionZoomFlipY}
*/
create : function(
float,
scene,
orientation 
)
{
    return cc.TransitionZoomFlipY;
},

};

/**
 * @class TransitionZoomFlipAngular
 */
cc.TransitionZoomFlipAngular = {

/**
 * @method create
* @param {float|float} float
* @param {cc.Scene|cc.Scene} scene
* @param {cc.TransitionScene::Orientation} orientation
* @return {cc.TransitionZoomFlipAngular|cc.TransitionZoomFlipAngular}
*/
create : function(
float,
scene,
orientation 
)
{
    return cc.TransitionZoomFlipAngular;
},

};

/**
 * @class TransitionFade
 */
cc.TransitionFade = {

/**
 * @method initWithDuration
* @param {float|float} float
* @param {cc.Scene|cc.Scene} scene
* @param {color3b_object} color3b
* @return {bool|bool}
*/
initWithDuration : function(
float,
scene,
color3b 
)
{
    return false;
},

/**
 * @method create
* @param {float|float} float
* @param {cc.Scene|cc.Scene} scene
* @param {color3b_object} color3b
* @return {cc.TransitionFade|cc.TransitionFade}
*/
create : function(
float,
scene,
color3b 
)
{
    return cc.TransitionFade;
},

/**
 * @method TransitionFade
 * @constructor
 */
TransitionFade : function (
)
{
},

};

/**
 * @class TransitionCrossFade
 */
cc.TransitionCrossFade = {

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionCrossFade}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionCrossFade;
},

};

/**
 * @class TransitionTurnOffTiles
 */
cc.TransitionTurnOffTiles = {

/**
 * @method easeActionWithAction
 * @param {cc.ActionInterval} arg0
 * @return {cc.ActionInterval}
 */
easeActionWithAction : function (
actioninterval 
)
{
    return cc.ActionInterval;
},

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionTurnOffTiles}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionTurnOffTiles;
},

};

/**
 * @class TransitionSplitCols
 */
cc.TransitionSplitCols = {

/**
 * @method action
 * @return {cc.ActionInterval}
 */
action : function (
)
{
    return cc.ActionInterval;
},

/**
 * @method easeActionWithAction
 * @param {cc.ActionInterval} arg0
 * @return {cc.ActionInterval}
 */
easeActionWithAction : function (
actioninterval 
)
{
    return cc.ActionInterval;
},

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionSplitCols}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionSplitCols;
},

};

/**
 * @class TransitionSplitRows
 */
cc.TransitionSplitRows = {

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionSplitRows}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionSplitRows;
},

};

/**
 * @class TransitionFadeTR
 */
cc.TransitionFadeTR = {

/**
 * @method easeActionWithAction
 * @param {cc.ActionInterval} arg0
 * @return {cc.ActionInterval}
 */
easeActionWithAction : function (
actioninterval 
)
{
    return cc.ActionInterval;
},

/**
 * @method actionWithSize
 * @param {size_object} arg0
 * @return {cc.ActionInterval}
 */
actionWithSize : function (
size 
)
{
    return cc.ActionInterval;
},

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionFadeTR}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionFadeTR;
},

};

/**
 * @class TransitionFadeBL
 */
cc.TransitionFadeBL = {

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionFadeBL}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionFadeBL;
},

};

/**
 * @class TransitionFadeUp
 */
cc.TransitionFadeUp = {

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionFadeUp}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionFadeUp;
},

};

/**
 * @class TransitionFadeDown
 */
cc.TransitionFadeDown = {

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionFadeDown}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionFadeDown;
},

};

/**
 * @class TransitionPageTurn
 */
cc.TransitionPageTurn = {

/**
 * @method actionWithSize
 * @param {size_object} arg0
 * @return {cc.ActionInterval}
 */
actionWithSize : function (
size 
)
{
    return cc.ActionInterval;
},

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @param {bool} arg2
 * @return {bool}
 */
initWithDuration : function (
float, 
scene, 
bool 
)
{
    return false;
},

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @param {bool} arg2
 * @return {cc.TransitionPageTurn}
 */
create : function (
float, 
scene, 
bool 
)
{
    return cc.TransitionPageTurn;
},

/**
 * @method TransitionPageTurn
 * @constructor
 */
TransitionPageTurn : function (
)
{
},

};

/**
 * @class TransitionProgress
 */
cc.TransitionProgress = {

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionProgress}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionProgress;
},

/**
 * @method TransitionProgress
 * @constructor
 */
TransitionProgress : function (
)
{
},

};

/**
 * @class TransitionProgressRadialCCW
 */
cc.TransitionProgressRadialCCW = {

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionProgressRadialCCW}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionProgressRadialCCW;
},

};

/**
 * @class TransitionProgressRadialCW
 */
cc.TransitionProgressRadialCW = {

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionProgressRadialCW}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionProgressRadialCW;
},

};

/**
 * @class TransitionProgressHorizontal
 */
cc.TransitionProgressHorizontal = {

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionProgressHorizontal}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionProgressHorizontal;
},

};

/**
 * @class TransitionProgressVertical
 */
cc.TransitionProgressVertical = {

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionProgressVertical}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionProgressVertical;
},

};

/**
 * @class TransitionProgressInOut
 */
cc.TransitionProgressInOut = {

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionProgressInOut}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionProgressInOut;
},

};

/**
 * @class TransitionProgressOutIn
 */
cc.TransitionProgressOutIn = {

/**
 * @method create
 * @param {float} arg0
 * @param {cc.Scene} arg1
 * @return {cc.TransitionProgressOutIn}
 */
create : function (
float, 
scene 
)
{
    return cc.TransitionProgressOutIn;
},

};

/**
 * @class MenuItem
 */
cc.MenuItem = {

/**
 * @method setEnabled
 * @param {bool} arg0
 */
setEnabled : function (
bool 
)
{
},

/**
 * @method activate
 */
activate : function (
)
{
},

/**
 * @method initWithCallback
 * @param {function} arg0
 * @return {bool}
 */
initWithCallback : function (
func 
)
{
    return false;
},

/**
 * @method isEnabled
 * @return {bool}
 */
isEnabled : function (
)
{
    return false;
},

/**
 * @method selected
 */
selected : function (
)
{
},

/**
 * @method isSelected
 * @return {bool}
 */
isSelected : function (
)
{
    return false;
},

/**
 * @method unselected
 */
unselected : function (
)
{
},

/**
 * @method rect
 * @return {rect_object}
 */
rect : function (
)
{
    return cc.Rect;
},

/**
 * @method MenuItem
 * @constructor
 */
MenuItem : function (
)
{
},

};

/**
 * @class MenuItemLabel
 */
cc.MenuItemLabel = {

/**
 * @method setLabel
 * @param {cc.Node} arg0
 */
setLabel : function (
node 
)
{
},

/**
 * @method getDisabledColor
 * @return {color3b_object}
 */
getDisabledColor : function (
)
{
    return cc.Color3B;
},

/**
 * @method setString
 * @param {String} arg0
 */
setString : function (
str 
)
{
},

/**
 * @method initWithLabel
 * @param {cc.Node} arg0
 * @param {function} arg1
 * @return {bool}
 */
initWithLabel : function (
node, 
func 
)
{
    return false;
},

/**
 * @method setDisabledColor
 * @param {color3b_object} arg0
 */
setDisabledColor : function (
color3b 
)
{
},

/**
 * @method getLabel
 * @return {cc.Node}
 */
getLabel : function (
)
{
    return cc.Node;
},

/**
 * @method MenuItemLabel
 * @constructor
 */
MenuItemLabel : function (
)
{
},

};

/**
 * @class MenuItemAtlasFont
 */
cc.MenuItemAtlasFont = {

/**
 * @method initWithString
 * @param {String} arg0
 * @param {String} arg1
 * @param {int} arg2
 * @param {int} arg3
 * @param {char} arg4
 * @param {function} arg5
 * @return {bool}
 */
initWithString : function (
str, 
str, 
int, 
int, 
char, 
func 
)
{
    return false;
},

/**
 * @method MenuItemAtlasFont
 * @constructor
 */
MenuItemAtlasFont : function (
)
{
},

};

/**
 * @class MenuItemFont
 */
cc.MenuItemFont = {

/**
 * @method setFontNameObj
 * @param {String} arg0
 */
setFontNameObj : function (
str 
)
{
},

/**
 * @method getFontSizeObj
 * @return {int}
 */
getFontSizeObj : function (
)
{
    return 0;
},

/**
 * @method setFontSizeObj
 * @param {int} arg0
 */
setFontSizeObj : function (
int 
)
{
},

/**
 * @method initWithString
 * @param {String} arg0
 * @param {function} arg1
 * @return {bool}
 */
initWithString : function (
str, 
func 
)
{
    return false;
},

/**
 * @method getFontNameObj
 * @return {String}
 */
getFontNameObj : function (
)
{
    return ;
},

/**
 * @method setFontName
 * @param {String} arg0
 */
setFontName : function (
str 
)
{
},

/**
 * @method getFontSize
 * @return {int}
 */
getFontSize : function (
)
{
    return 0;
},

/**
 * @method getFontName
 * @return {String}
 */
getFontName : function (
)
{
    return ;
},

/**
 * @method setFontSize
 * @param {int} arg0
 */
setFontSize : function (
int 
)
{
},

/**
 * @method MenuItemFont
 * @constructor
 */
MenuItemFont : function (
)
{
},

};

/**
 * @class MenuItemSprite
 */
cc.MenuItemSprite = {

/**
 * @method setEnabled
 * @param {bool} arg0
 */
setEnabled : function (
bool 
)
{
},

/**
 * @method selected
 */
selected : function (
)
{
},

/**
 * @method setNormalImage
 * @param {cc.Node} arg0
 */
setNormalImage : function (
node 
)
{
},

/**
 * @method setDisabledImage
 * @param {cc.Node} arg0
 */
setDisabledImage : function (
node 
)
{
},

/**
 * @method initWithNormalSprite
 * @param {cc.Node} arg0
 * @param {cc.Node} arg1
 * @param {cc.Node} arg2
 * @param {function} arg3
 * @return {bool}
 */
initWithNormalSprite : function (
node, 
node, 
node, 
func 
)
{
    return false;
},

/**
 * @method setSelectedImage
 * @param {cc.Node} arg0
 */
setSelectedImage : function (
node 
)
{
},

/**
 * @method getDisabledImage
 * @return {cc.Node}
 */
getDisabledImage : function (
)
{
    return cc.Node;
},

/**
 * @method getSelectedImage
 * @return {cc.Node}
 */
getSelectedImage : function (
)
{
    return cc.Node;
},

/**
 * @method getNormalImage
 * @return {cc.Node}
 */
getNormalImage : function (
)
{
    return cc.Node;
},

/**
 * @method unselected
 */
unselected : function (
)
{
},

/**
 * @method MenuItemSprite
 * @constructor
 */
MenuItemSprite : function (
)
{
},

};

/**
 * @class MenuItemImage
 */
cc.MenuItemImage = {

/**
 * @method setDisabledSpriteFrame
 * @param {cc.SpriteFrame} arg0
 */
setDisabledSpriteFrame : function (
spriteframe 
)
{
},

/**
 * @method setSelectedSpriteFrame
 * @param {cc.SpriteFrame} arg0
 */
setSelectedSpriteFrame : function (
spriteframe 
)
{
},

/**
 * @method setNormalSpriteFrame
 * @param {cc.SpriteFrame} arg0
 */
setNormalSpriteFrame : function (
spriteframe 
)
{
},

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method initWithNormalImage
 * @param {String} arg0
 * @param {String} arg1
 * @param {String} arg2
 * @param {function} arg3
 * @return {bool}
 */
initWithNormalImage : function (
str, 
str, 
str, 
func 
)
{
    return false;
},

/**
 * @method MenuItemImage
 * @constructor
 */
MenuItemImage : function (
)
{
},

};

/**
 * @class MenuItemToggle
 */
cc.MenuItemToggle = {

/**
 * @method setSubItems
 * @param {Array} arg0
 */
setSubItems : function (
array 
)
{
},

/**
 * @method initWithItem
 * @param {cc.MenuItem} arg0
 * @return {bool}
 */
initWithItem : function (
menuitem 
)
{
    return false;
},

/**
 * @method getSelectedIndex
 * @return {unsigned int}
 */
getSelectedIndex : function (
)
{
    return 0;
},

/**
 * @method addSubItem
 * @param {cc.MenuItem} arg0
 */
addSubItem : function (
menuitem 
)
{
},

/**
 * @method getSelectedItem
 * @return {cc.MenuItem}
 */
getSelectedItem : function (
)
{
    return cc.MenuItem;
},

/**
 * @method setSelectedIndex
 * @param {unsigned int} arg0
 */
setSelectedIndex : function (
int 
)
{
},

/**
 * @method MenuItemToggle
 * @constructor
 */
MenuItemToggle : function (
)
{
},

};

/**
 * @class Menu
 */
cc.Menu = {

/**
 * @method initWithArray
 * @param {Array} arg0
 * @return {bool}
 */
initWithArray : function (
array 
)
{
    return false;
},

/**
 * @method setEnabled
 * @param {bool} arg0
 */
setEnabled : function (
bool 
)
{
},

/**
 * @method alignItemsVertically
 */
alignItemsVertically : function (
)
{
},

/**
 * @method isEnabled
 * @return {bool}
 */
isEnabled : function (
)
{
    return false;
},

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method alignItemsHorizontallyWithPadding
 * @param {float} arg0
 */
alignItemsHorizontallyWithPadding : function (
float 
)
{
},

/**
 * @method alignItemsVerticallyWithPadding
 * @param {float} arg0
 */
alignItemsVerticallyWithPadding : function (
float 
)
{
},

/**
 * @method alignItemsHorizontally
 */
alignItemsHorizontally : function (
)
{
},

/**
 * @method Menu
 * @constructor
 */
Menu : function (
)
{
},

};

/**
 * @class ClippingNode
 */
cc.ClippingNode = {

/**
 * @method isInverted
 * @return {bool}
 */
isInverted : function (
)
{
    return false;
},

/**
 * @method setInverted
 * @param {bool} arg0
 */
setInverted : function (
bool 
)
{
},

/**
 * @method setStencil
 * @param {cc.Node} arg0
 */
setStencil : function (
node 
)
{
},

/**
 * @method getAlphaThreshold
 * @return {float}
 */
getAlphaThreshold : function (
)
{
    return 0;
},

/**
 * @method init
* @param {cc.Node} node
* @return {bool|bool}
*/
init : function(
node 
)
{
    return false;
},

/**
 * @method getStencil
 * @return {cc.Node}
 */
getStencil : function (
)
{
    return cc.Node;
},

/**
 * @method setAlphaThreshold
 * @param {float} arg0
 */
setAlphaThreshold : function (
float 
)
{
},

/**
 * @method create
* @param {cc.Node} node
* @return {cc.ClippingNode|cc.ClippingNode}
*/
create : function(
node 
)
{
    return cc.ClippingNode;
},

};

/**
 * @class MotionStreak
 */
cc.MotionStreak = {

/**
 * @method reset
 */
reset : function (
)
{
},

/**
 * @method setTexture
 * @param {cc.Texture2D} arg0
 */
setTexture : function (
texture2d 
)
{
},

/**
 * @method getTexture
 * @return {cc.Texture2D}
 */
getTexture : function (
)
{
    return cc.Texture2D;
},

/**
 * @method tintWithColor
 * @param {color3b_object} arg0
 */
tintWithColor : function (
color3b 
)
{
},

/**
 * @method setBlendFunc
 * @param {cc.BlendFunc} arg0
 */
setBlendFunc : function (
blendfunc 
)
{
},

/**
 * @method setStartingPositionInitialized
 * @param {bool} arg0
 */
setStartingPositionInitialized : function (
bool 
)
{
},

/**
 * @method getBlendFunc
 * @return {cc.BlendFunc}
 */
getBlendFunc : function (
)
{
    return cc.BlendFunc;
},

/**
 * @method isStartingPositionInitialized
 * @return {bool}
 */
isStartingPositionInitialized : function (
)
{
    return false;
},

/**
 * @method isFastMode
 * @return {bool}
 */
isFastMode : function (
)
{
    return false;
},

/**
 * @method initWithFade
* @param {float|float} float
* @param {float|float} float
* @param {float|float} float
* @param {color3b_object|color3b_object} color3b
* @param {cc.Texture2D|String} texture2d
* @return {bool|bool}
*/
initWithFade : function(
float,
float,
float,
color3b,
str 
)
{
    return false;
},

/**
 * @method setFastMode
 * @param {bool} arg0
 */
setFastMode : function (
bool 
)
{
},

/**
 * @method create
* @param {float|float} float
* @param {float|float} float
* @param {float|float} float
* @param {color3b_object|color3b_object} color3b
* @param {cc.Texture2D|String} texture2d
* @return {cc.MotionStreak|cc.MotionStreak}
*/
create : function(
float,
float,
float,
color3b,
str 
)
{
    return cc.MotionStreak;
},

/**
 * @method MotionStreak
 * @constructor
 */
MotionStreak : function (
)
{
},

};

/**
 * @class Sprite
 */
cc.Sprite = {

/**
 * @method setSpriteFrame
* @param {cc.SpriteFrame|String} spriteframe
*/
setSpriteFrame : function(
str 
)
{
},

/**
 * @method setTexture
* @param {cc.Texture2D|String} texture2d
*/
setTexture : function(
str 
)
{
},

/**
 * @method getTexture
 * @return {cc.Texture2D}
 */
getTexture : function (
)
{
    return cc.Texture2D;
},

/**
 * @method setFlippedY
 * @param {bool} arg0
 */
setFlippedY : function (
bool 
)
{
},

/**
 * @method setFlippedX
 * @param {bool} arg0
 */
setFlippedX : function (
bool 
)
{
},

/**
 * @method initWithSpriteFrameName
 * @param {String} arg0
 * @return {bool}
 */
initWithSpriteFrameName : function (
str 
)
{
    return false;
},

/**
 * @method initWithTexture
* @param {cc.Texture2D|cc.Texture2D|cc.Texture2D} texture2d
* @param {rect_object|rect_object} rect
* @param {bool} bool
* @return {bool|bool|bool}
*/
initWithTexture : function(
texture2d,
rect,
bool 
)
{
    return false;
},

/**
 * @method getBatchNode
 * @return {cc.SpriteBatchNode}
 */
getBatchNode : function (
)
{
    return cc.SpriteBatchNode;
},

/**
 * @method getOffsetPosition
 * @return {vec2_object}
 */
getOffsetPosition : function (
)
{
    return cc.Vec2;
},

/**
 * @method removeAllChildrenWithCleanup
 * @param {bool} arg0
 */
removeAllChildrenWithCleanup : function (
bool 
)
{
},

/**
 * @method updateTransform
 */
updateTransform : function (
)
{
},

/**
 * @method setTextureRect
* @param {rect_object|rect_object} rect
* @param {bool} bool
* @param {size_object} size
*/
setTextureRect : function(
rect,
bool,
size 
)
{
},

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method isFrameDisplayed
 * @param {cc.SpriteFrame} arg0
 * @return {bool}
 */
isFrameDisplayed : function (
spriteframe 
)
{
    return false;
},

/**
 * @method getAtlasIndex
 * @return {long}
 */
getAtlasIndex : function (
)
{
    return 0;
},

/**
 * @method setBatchNode
 * @param {cc.SpriteBatchNode} arg0
 */
setBatchNode : function (
spritebatchnode 
)
{
},

/**
 * @method getBlendFunc
 * @return {cc.BlendFunc}
 */
getBlendFunc : function (
)
{
    return cc.BlendFunc;
},

/**
 * @method setDisplayFrameWithAnimationName
 * @param {String} arg0
 * @param {long} arg1
 */
setDisplayFrameWithAnimationName : function (
str, 
long 
)
{
},

/**
 * @method setTextureAtlas
 * @param {cc.TextureAtlas} arg0
 */
setTextureAtlas : function (
textureatlas 
)
{
},

/**
 * @method getSpriteFrame
 * @return {cc.SpriteFrame}
 */
getSpriteFrame : function (
)
{
    return cc.SpriteFrame;
},

/**
 * @method isDirty
 * @return {bool}
 */
isDirty : function (
)
{
    return false;
},

/**
 * @method setAtlasIndex
 * @param {long} arg0
 */
setAtlasIndex : function (
long 
)
{
},

/**
 * @method setDirty
 * @param {bool} arg0
 */
setDirty : function (
bool 
)
{
},

/**
 * @method isTextureRectRotated
 * @return {bool}
 */
isTextureRectRotated : function (
)
{
    return false;
},

/**
 * @method getTextureRect
 * @return {rect_object}
 */
getTextureRect : function (
)
{
    return cc.Rect;
},

/**
 * @method initWithFile
* @param {String|String} str
* @param {rect_object} rect
* @return {bool|bool}
*/
initWithFile : function(
str,
rect 
)
{
    return false;
},

/**
 * @method setBlendFunc
 * @param {cc.BlendFunc} arg0
 */
setBlendFunc : function (
blendfunc 
)
{
},

/**
 * @method getTextureAtlas
 * @return {cc.TextureAtlas}
 */
getTextureAtlas : function (
)
{
    return cc.TextureAtlas;
},

/**
 * @method initWithSpriteFrame
 * @param {cc.SpriteFrame} arg0
 * @return {bool}
 */
initWithSpriteFrame : function (
spriteframe 
)
{
    return false;
},

/**
 * @method isFlippedX
 * @return {bool}
 */
isFlippedX : function (
)
{
    return false;
},

/**
 * @method isFlippedY
 * @return {bool}
 */
isFlippedY : function (
)
{
    return false;
},

/**
 * @method setVertexRect
 * @param {rect_object} arg0
 */
setVertexRect : function (
rect 
)
{
},

/**
 * @method create
* @param {String|String} str
* @param {rect_object} rect
* @return {cc.Sprite|cc.Sprite|cc.Sprite}
*/
create : function(
str,
rect 
)
{
    return cc.Sprite;
},

/**
 * @method createWithTexture
* @param {cc.Texture2D|cc.Texture2D} texture2d
* @param {rect_object} rect
* @param {bool} bool
* @return {cc.Sprite|cc.Sprite}
*/
createWithTexture : function(
texture2d,
rect,
bool 
)
{
    return cc.Sprite;
},

/**
 * @method createWithSpriteFrameName
 * @param {String} arg0
 * @return {cc.Sprite}
 */
createWithSpriteFrameName : function (
str 
)
{
    return cc.Sprite;
},

/**
 * @method createWithSpriteFrame
 * @param {cc.SpriteFrame} arg0
 * @return {cc.Sprite}
 */
createWithSpriteFrame : function (
spriteframe 
)
{
    return cc.Sprite;
},

/**
 * @method Sprite
 * @constructor
 */
Sprite : function (
)
{
},

};

/**
 * @class ProgressTimer
 */
cc.ProgressTimer = {

/**
 * @method initWithSprite
 * @param {cc.Sprite} arg0
 * @return {bool}
 */
initWithSprite : function (
sprite 
)
{
    return false;
},

/**
 * @method isReverseDirection
 * @return {bool}
 */
isReverseDirection : function (
)
{
    return false;
},

/**
 * @method setBarChangeRate
 * @param {vec2_object} arg0
 */
setBarChangeRate : function (
vec2 
)
{
},

/**
 * @method getPercentage
 * @return {float}
 */
getPercentage : function (
)
{
    return 0;
},

/**
 * @method setSprite
 * @param {cc.Sprite} arg0
 */
setSprite : function (
sprite 
)
{
},

/**
 * @method getType
 * @return {cc.ProgressTimer::Type}
 */
getType : function (
)
{
    return 0;
},

/**
 * @method getSprite
 * @return {cc.Sprite}
 */
getSprite : function (
)
{
    return cc.Sprite;
},

/**
 * @method setMidpoint
 * @param {vec2_object} arg0
 */
setMidpoint : function (
vec2 
)
{
},

/**
 * @method getBarChangeRate
 * @return {vec2_object}
 */
getBarChangeRate : function (
)
{
    return cc.Vec2;
},

/**
 * @method setReverseDirection
* @param {bool|bool} bool
*/
setReverseDirection : function(
bool 
)
{
},

/**
 * @method getMidpoint
 * @return {vec2_object}
 */
getMidpoint : function (
)
{
    return cc.Vec2;
},

/**
 * @method setPercentage
 * @param {float} arg0
 */
setPercentage : function (
float 
)
{
},

/**
 * @method setType
 * @param {cc.ProgressTimer::Type} arg0
 */
setType : function (
type 
)
{
},

/**
 * @method create
 * @param {cc.Sprite} arg0
 * @return {cc.ProgressTimer}
 */
create : function (
sprite 
)
{
    return cc.ProgressTimer;
},

/**
 * @method ProgressTimer
 * @constructor
 */
ProgressTimer : function (
)
{
},

};

/**
 * @class RenderTexture
 */
cc.RenderTexture = {

/**
 * @method setVirtualViewport
 * @param {vec2_object} arg0
 * @param {rect_object} arg1
 * @param {rect_object} arg2
 */
setVirtualViewport : function (
vec2, 
rect, 
rect 
)
{
},

/**
 * @method clearStencil
 * @param {int} arg0
 */
clearStencil : function (
int 
)
{
},

/**
 * @method getClearDepth
 * @return {float}
 */
getClearDepth : function (
)
{
    return 0;
},

/**
 * @method getClearStencil
 * @return {int}
 */
getClearStencil : function (
)
{
    return 0;
},

/**
 * @method end
 */
end : function (
)
{
},

/**
 * @method setClearStencil
 * @param {int} arg0
 */
setClearStencil : function (
int 
)
{
},

/**
 * @method setSprite
 * @param {cc.Sprite} arg0
 */
setSprite : function (
sprite 
)
{
},

/**
 * @method getSprite
 * @return {cc.Sprite}
 */
getSprite : function (
)
{
    return cc.Sprite;
},

/**
 * @method isAutoDraw
 * @return {bool}
 */
isAutoDraw : function (
)
{
    return false;
},

/**
 * @method setKeepMatrix
 * @param {bool} arg0
 */
setKeepMatrix : function (
bool 
)
{
},

/**
 * @method setClearFlags
 * @param {unsigned int} arg0
 */
setClearFlags : function (
int 
)
{
},

/**
 * @method begin
 */
begin : function (
)
{
},

/**
 * @method saveToFile
* @param {String|String} str
* @param {cc.Image::Format|bool} format
* @param {bool} bool
* @return {bool|bool}
*/
saveToFile : function(
str,
format,
bool 
)
{
    return false;
},

/**
 * @method setAutoDraw
 * @param {bool} arg0
 */
setAutoDraw : function (
bool 
)
{
},

/**
 * @method setClearColor
 * @param {color4f_object} arg0
 */
setClearColor : function (
color4f 
)
{
},

/**
 * @method endToLua
 */
endToLua : function (
)
{
},

/**
 * @method beginWithClear
* @param {float|float|float} float
* @param {float|float|float} float
* @param {float|float|float} float
* @param {float|float|float} float
* @param {float|float} float
* @param {int} int
*/
beginWithClear : function(
float,
float,
float,
float,
float,
int 
)
{
},

/**
 * @method clearDepth
 * @param {float} arg0
 */
clearDepth : function (
float 
)
{
},

/**
 * @method getClearColor
 * @return {color4f_object}
 */
getClearColor : function (
)
{
    return cc.Color4F;
},

/**
 * @method clear
 * @param {float} arg0
 * @param {float} arg1
 * @param {float} arg2
 * @param {float} arg3
 */
clear : function (
float, 
float, 
float, 
float 
)
{
},

/**
 * @method getClearFlags
 * @return {unsigned int}
 */
getClearFlags : function (
)
{
    return 0;
},

/**
 * @method newImage
 * @return {cc.Image}
 */
newImage : function (
)
{
    return cc.Image;
},

/**
 * @method setClearDepth
 * @param {float} arg0
 */
setClearDepth : function (
float 
)
{
},

/**
 * @method initWithWidthAndHeight
* @param {int|int} int
* @param {int|int} int
* @param {cc.Texture2D::PixelFormat|cc.Texture2D::PixelFormat} pixelformat
* @param {unsigned int} int
* @return {bool|bool}
*/
initWithWidthAndHeight : function(
int,
int,
pixelformat,
int 
)
{
    return false;
},

/**
 * @method create
* @param {int|int|int} int
* @param {int|int|int} int
* @param {cc.Texture2D::PixelFormat|cc.Texture2D::PixelFormat} pixelformat
* @param {unsigned int} int
* @return {cc.RenderTexture|cc.RenderTexture|cc.RenderTexture}
*/
create : function(
int,
int,
pixelformat,
int 
)
{
    return cc.RenderTexture;
},

/**
 * @method RenderTexture
 * @constructor
 */
RenderTexture : function (
)
{
},

};

/**
 * @class NodeGrid
 */
cc.NodeGrid = {

/**
 * @method setTarget
 * @param {cc.Node} arg0
 */
setTarget : function (
node 
)
{
},

/**
 * @method getGrid
* @return {cc.GridBase|cc.GridBase}
*/
getGrid : function(
)
{
    return cc.GridBase;
},

/**
 * @method create
 * @return {cc.NodeGrid}
 */
create : function (
)
{
    return cc.NodeGrid;
},

};

/**
 * @class ParticleBatchNode
 */
cc.ParticleBatchNode = {

/**
 * @method setTexture
 * @param {cc.Texture2D} arg0
 */
setTexture : function (
texture2d 
)
{
},

/**
 * @method initWithTexture
 * @param {cc.Texture2D} arg0
 * @param {int} arg1
 * @return {bool}
 */
initWithTexture : function (
texture2d, 
int 
)
{
    return false;
},

/**
 * @method disableParticle
 * @param {int} arg0
 */
disableParticle : function (
int 
)
{
},

/**
 * @method getTexture
 * @return {cc.Texture2D}
 */
getTexture : function (
)
{
    return cc.Texture2D;
},

/**
 * @method setTextureAtlas
 * @param {cc.TextureAtlas} arg0
 */
setTextureAtlas : function (
textureatlas 
)
{
},

/**
 * @method initWithFile
 * @param {String} arg0
 * @param {int} arg1
 * @return {bool}
 */
initWithFile : function (
str, 
int 
)
{
    return false;
},

/**
 * @method setBlendFunc
 * @param {cc.BlendFunc} arg0
 */
setBlendFunc : function (
blendfunc 
)
{
},

/**
 * @method removeAllChildrenWithCleanup
 * @param {bool} arg0
 */
removeAllChildrenWithCleanup : function (
bool 
)
{
},

/**
 * @method getTextureAtlas
 * @return {cc.TextureAtlas}
 */
getTextureAtlas : function (
)
{
    return cc.TextureAtlas;
},

/**
 * @method getBlendFunc
 * @return {cc.BlendFunc}
 */
getBlendFunc : function (
)
{
    return cc.BlendFunc;
},

/**
 * @method insertChild
 * @param {cc.ParticleSystem} arg0
 * @param {int} arg1
 */
insertChild : function (
particlesystem, 
int 
)
{
},

/**
 * @method removeChildAtIndex
 * @param {int} arg0
 * @param {bool} arg1
 */
removeChildAtIndex : function (
int, 
bool 
)
{
},

/**
 * @method create
 * @param {String} arg0
 * @param {int} arg1
 * @return {cc.ParticleBatchNode}
 */
create : function (
str, 
int 
)
{
    return cc.ParticleBatchNode;
},

/**
 * @method createWithTexture
 * @param {cc.Texture2D} arg0
 * @param {int} arg1
 * @return {cc.ParticleBatchNode}
 */
createWithTexture : function (
texture2d, 
int 
)
{
    return cc.ParticleBatchNode;
},

/**
 * @method ParticleBatchNode
 * @constructor
 */
ParticleBatchNode : function (
)
{
},

};

/**
 * @class ParticleSystem
 */
cc.ParticleSystem = {

/**
 * @method getStartSizeVar
 * @return {float}
 */
getStartSizeVar : function (
)
{
    return 0;
},

/**
 * @method getTexture
 * @return {cc.Texture2D}
 */
getTexture : function (
)
{
    return cc.Texture2D;
},

/**
 * @method isFull
 * @return {bool}
 */
isFull : function (
)
{
    return false;
},

/**
 * @method getBatchNode
 * @return {cc.ParticleBatchNode}
 */
getBatchNode : function (
)
{
    return cc.ParticleBatchNode;
},

/**
 * @method getStartColor
 * @return {color4f_object}
 */
getStartColor : function (
)
{
    return cc.Color4F;
},

/**
 * @method getPositionType
 * @return {cc.ParticleSystem::PositionType}
 */
getPositionType : function (
)
{
    return 0;
},

/**
 * @method setPosVar
 * @param {vec2_object} arg0
 */
setPosVar : function (
vec2 
)
{
},

/**
 * @method getEndSpin
 * @return {float}
 */
getEndSpin : function (
)
{
    return 0;
},

/**
 * @method setRotatePerSecondVar
 * @param {float} arg0
 */
setRotatePerSecondVar : function (
float 
)
{
},

/**
 * @method getStartSpinVar
 * @return {float}
 */
getStartSpinVar : function (
)
{
    return 0;
},

/**
 * @method getRadialAccelVar
 * @return {float}
 */
getRadialAccelVar : function (
)
{
    return 0;
},

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method getEndSizeVar
 * @return {float}
 */
getEndSizeVar : function (
)
{
    return 0;
},

/**
 * @method setRotation
 * @param {float} arg0
 */
setRotation : function (
float 
)
{
},

/**
 * @method setTangentialAccel
 * @param {float} arg0
 */
setTangentialAccel : function (
float 
)
{
},

/**
 * @method setScaleY
 * @param {float} arg0
 */
setScaleY : function (
float 
)
{
},

/**
 * @method setScaleX
 * @param {float} arg0
 */
setScaleX : function (
float 
)
{
},

/**
 * @method getRadialAccel
 * @return {float}
 */
getRadialAccel : function (
)
{
    return 0;
},

/**
 * @method setStartRadius
 * @param {float} arg0
 */
setStartRadius : function (
float 
)
{
},

/**
 * @method setRotatePerSecond
 * @param {float} arg0
 */
setRotatePerSecond : function (
float 
)
{
},

/**
 * @method setEndSize
 * @param {float} arg0
 */
setEndSize : function (
float 
)
{
},

/**
 * @method getGravity
 * @return {vec2_object}
 */
getGravity : function (
)
{
    return cc.Vec2;
},

/**
 * @method getTangentialAccel
 * @return {float}
 */
getTangentialAccel : function (
)
{
    return 0;
},

/**
 * @method setEndRadius
 * @param {float} arg0
 */
setEndRadius : function (
float 
)
{
},

/**
 * @method getSpeed
 * @return {float}
 */
getSpeed : function (
)
{
    return 0;
},

/**
 * @method getAngle
 * @return {float}
 */
getAngle : function (
)
{
    return 0;
},

/**
 * @method setEndColor
 * @param {color4f_object} arg0
 */
setEndColor : function (
color4f 
)
{
},

/**
 * @method setStartSpin
 * @param {float} arg0
 */
setStartSpin : function (
float 
)
{
},

/**
 * @method setDuration
 * @param {float} arg0
 */
setDuration : function (
float 
)
{
},

/**
 * @method initWithTotalParticles
 * @param {int} arg0
 * @return {bool}
 */
initWithTotalParticles : function (
int 
)
{
    return false;
},

/**
 * @method setTexture
 * @param {cc.Texture2D} arg0
 */
setTexture : function (
texture2d 
)
{
},

/**
 * @method getPosVar
 * @return {vec2_object}
 */
getPosVar : function (
)
{
    return cc.Vec2;
},

/**
 * @method updateWithNoTime
 */
updateWithNoTime : function (
)
{
},

/**
 * @method isBlendAdditive
 * @return {bool}
 */
isBlendAdditive : function (
)
{
    return false;
},

/**
 * @method getSpeedVar
 * @return {float}
 */
getSpeedVar : function (
)
{
    return 0;
},

/**
 * @method setPositionType
 * @param {cc.ParticleSystem::PositionType} arg0
 */
setPositionType : function (
positiontype 
)
{
},

/**
 * @method stopSystem
 */
stopSystem : function (
)
{
},

/**
 * @method getSourcePosition
 * @return {vec2_object}
 */
getSourcePosition : function (
)
{
    return cc.Vec2;
},

/**
 * @method setLifeVar
 * @param {float} arg0
 */
setLifeVar : function (
float 
)
{
},

/**
 * @method setTotalParticles
 * @param {int} arg0
 */
setTotalParticles : function (
int 
)
{
},

/**
 * @method setEndColorVar
 * @param {color4f_object} arg0
 */
setEndColorVar : function (
color4f 
)
{
},

/**
 * @method updateQuadWithParticle
 * @param {cc.sParticle} arg0
 * @param {vec2_object} arg1
 */
updateQuadWithParticle : function (
sparticle, 
vec2 
)
{
},

/**
 * @method getAtlasIndex
 * @return {int}
 */
getAtlasIndex : function (
)
{
    return 0;
},

/**
 * @method getStartSize
 * @return {float}
 */
getStartSize : function (
)
{
    return 0;
},

/**
 * @method setStartSpinVar
 * @param {float} arg0
 */
setStartSpinVar : function (
float 
)
{
},

/**
 * @method resetSystem
 */
resetSystem : function (
)
{
},

/**
 * @method setAtlasIndex
 * @param {int} arg0
 */
setAtlasIndex : function (
int 
)
{
},

/**
 * @method setTangentialAccelVar
 * @param {float} arg0
 */
setTangentialAccelVar : function (
float 
)
{
},

/**
 * @method setEndRadiusVar
 * @param {float} arg0
 */
setEndRadiusVar : function (
float 
)
{
},

/**
 * @method getEndRadius
 * @return {float}
 */
getEndRadius : function (
)
{
    return 0;
},

/**
 * @method isOpacityModifyRGB
 * @return {bool}
 */
isOpacityModifyRGB : function (
)
{
    return false;
},

/**
 * @method isActive
 * @return {bool}
 */
isActive : function (
)
{
    return false;
},

/**
 * @method setRadialAccelVar
 * @param {float} arg0
 */
setRadialAccelVar : function (
float 
)
{
},

/**
 * @method setStartSize
 * @param {float} arg0
 */
setStartSize : function (
float 
)
{
},

/**
 * @method setSpeed
 * @param {float} arg0
 */
setSpeed : function (
float 
)
{
},

/**
 * @method getStartSpin
 * @return {float}
 */
getStartSpin : function (
)
{
    return 0;
},

/**
 * @method getRotatePerSecond
 * @return {float}
 */
getRotatePerSecond : function (
)
{
    return 0;
},

/**
 * @method initParticle
 * @param {cc.sParticle} arg0
 */
initParticle : function (
sparticle 
)
{
},

/**
 * @method setEmitterMode
 * @param {cc.ParticleSystem::Mode} arg0
 */
setEmitterMode : function (
mode 
)
{
},

/**
 * @method getDuration
 * @return {float}
 */
getDuration : function (
)
{
    return 0;
},

/**
 * @method setSourcePosition
 * @param {vec2_object} arg0
 */
setSourcePosition : function (
vec2 
)
{
},

/**
 * @method getEndSpinVar
 * @return {float}
 */
getEndSpinVar : function (
)
{
    return 0;
},

/**
 * @method setBlendAdditive
 * @param {bool} arg0
 */
setBlendAdditive : function (
bool 
)
{
},

/**
 * @method setLife
 * @param {float} arg0
 */
setLife : function (
float 
)
{
},

/**
 * @method setAngleVar
 * @param {float} arg0
 */
setAngleVar : function (
float 
)
{
},

/**
 * @method setRotationIsDir
 * @param {bool} arg0
 */
setRotationIsDir : function (
bool 
)
{
},

/**
 * @method setEndSizeVar
 * @param {float} arg0
 */
setEndSizeVar : function (
float 
)
{
},

/**
 * @method setAngle
 * @param {float} arg0
 */
setAngle : function (
float 
)
{
},

/**
 * @method setBatchNode
 * @param {cc.ParticleBatchNode} arg0
 */
setBatchNode : function (
particlebatchnode 
)
{
},

/**
 * @method getTangentialAccelVar
 * @return {float}
 */
getTangentialAccelVar : function (
)
{
    return 0;
},

/**
 * @method getEmitterMode
 * @return {cc.ParticleSystem::Mode}
 */
getEmitterMode : function (
)
{
    return 0;
},

/**
 * @method setEndSpinVar
 * @param {float} arg0
 */
setEndSpinVar : function (
float 
)
{
},

/**
 * @method initWithFile
 * @param {String} arg0
 * @return {bool}
 */
initWithFile : function (
str 
)
{
    return false;
},

/**
 * @method getAngleVar
 * @return {float}
 */
getAngleVar : function (
)
{
    return 0;
},

/**
 * @method setStartColor
 * @param {color4f_object} arg0
 */
setStartColor : function (
color4f 
)
{
},

/**
 * @method getRotatePerSecondVar
 * @return {float}
 */
getRotatePerSecondVar : function (
)
{
    return 0;
},

/**
 * @method getEndSize
 * @return {float}
 */
getEndSize : function (
)
{
    return 0;
},

/**
 * @method getLife
 * @return {float}
 */
getLife : function (
)
{
    return 0;
},

/**
 * @method setSpeedVar
 * @param {float} arg0
 */
setSpeedVar : function (
float 
)
{
},

/**
 * @method setAutoRemoveOnFinish
 * @param {bool} arg0
 */
setAutoRemoveOnFinish : function (
bool 
)
{
},

/**
 * @method setGravity
 * @param {vec2_object} arg0
 */
setGravity : function (
vec2 
)
{
},

/**
 * @method postStep
 */
postStep : function (
)
{
},

/**
 * @method setEmissionRate
 * @param {float} arg0
 */
setEmissionRate : function (
float 
)
{
},

/**
 * @method getEndColorVar
 * @return {color4f_object}
 */
getEndColorVar : function (
)
{
    return cc.Color4F;
},

/**
 * @method getRotationIsDir
 * @return {bool}
 */
getRotationIsDir : function (
)
{
    return false;
},

/**
 * @method setScale
 * @param {float} arg0
 */
setScale : function (
float 
)
{
},

/**
 * @method getEmissionRate
 * @return {float}
 */
getEmissionRate : function (
)
{
    return 0;
},

/**
 * @method getEndColor
 * @return {color4f_object}
 */
getEndColor : function (
)
{
    return cc.Color4F;
},

/**
 * @method getLifeVar
 * @return {float}
 */
getLifeVar : function (
)
{
    return 0;
},

/**
 * @method setStartSizeVar
 * @param {float} arg0
 */
setStartSizeVar : function (
float 
)
{
},

/**
 * @method setOpacityModifyRGB
 * @param {bool} arg0
 */
setOpacityModifyRGB : function (
bool 
)
{
},

/**
 * @method addParticle
 * @return {bool}
 */
addParticle : function (
)
{
    return false;
},

/**
 * @method getStartRadius
 * @return {float}
 */
getStartRadius : function (
)
{
    return 0;
},

/**
 * @method getParticleCount
 * @return {unsigned int}
 */
getParticleCount : function (
)
{
    return 0;
},

/**
 * @method getStartRadiusVar
 * @return {float}
 */
getStartRadiusVar : function (
)
{
    return 0;
},

/**
 * @method getBlendFunc
 * @return {cc.BlendFunc}
 */
getBlendFunc : function (
)
{
    return cc.BlendFunc;
},

/**
 * @method setStartColorVar
 * @param {color4f_object} arg0
 */
setStartColorVar : function (
color4f 
)
{
},

/**
 * @method setEndSpin
 * @param {float} arg0
 */
setEndSpin : function (
float 
)
{
},

/**
 * @method setRadialAccel
 * @param {float} arg0
 */
setRadialAccel : function (
float 
)
{
},

/**
 * @method initWithDictionary
* @param {map_object|map_object} map
* @param {String} str
* @return {bool|bool}
*/
initWithDictionary : function(
map,
str 
)
{
    return false;
},

/**
 * @method isAutoRemoveOnFinish
 * @return {bool}
 */
isAutoRemoveOnFinish : function (
)
{
    return false;
},

/**
 * @method getTotalParticles
 * @return {int}
 */
getTotalParticles : function (
)
{
    return 0;
},

/**
 * @method setStartRadiusVar
 * @param {float} arg0
 */
setStartRadiusVar : function (
float 
)
{
},

/**
 * @method setBlendFunc
 * @param {cc.BlendFunc} arg0
 */
setBlendFunc : function (
blendfunc 
)
{
},

/**
 * @method getEndRadiusVar
 * @return {float}
 */
getEndRadiusVar : function (
)
{
    return 0;
},

/**
 * @method getStartColorVar
 * @return {color4f_object}
 */
getStartColorVar : function (
)
{
    return cc.Color4F;
},

/**
 * @method create
 * @param {String} arg0
 * @return {cc.ParticleSystem}
 */
create : function (
str 
)
{
    return cc.ParticleSystem;
},

/**
 * @method createWithTotalParticles
 * @param {int} arg0
 * @return {cc.ParticleSystem}
 */
createWithTotalParticles : function (
int 
)
{
    return cc.ParticleSystem;
},

/**
 * @method ParticleSystem
 * @constructor
 */
ParticleSystem : function (
)
{
},

};

/**
 * @class ParticleSystemQuad
 */
cc.ParticleSystem = {

/**
 * @method setDisplayFrame
 * @param {cc.SpriteFrame} arg0
 */
setDisplayFrame : function (
spriteframe 
)
{
},

/**
 * @method setTextureWithRect
 * @param {cc.Texture2D} arg0
 * @param {rect_object} arg1
 */
setTextureWithRect : function (
texture2d, 
rect 
)
{
},

/**
 * @method create
* @param {String|map_object} str
* @return {cc.ParticleSystemQuad|cc.ParticleSystemQuad|cc.ParticleSystemQuad}
*/
create : function(
map 
)
{
    return cc.ParticleSystemQuad;
},

/**
 * @method createWithTotalParticles
 * @param {int} arg0
 * @return {cc.ParticleSystemQuad}
 */
createWithTotalParticles : function (
int 
)
{
    return cc.ParticleSystemQuad;
},

/**
 * @method ParticleSystemQuad
 * @constructor
 */
ParticleSystemQuad : function (
)
{
},

};

/**
 * @class ParticleFire
 */
cc.ParticleFire = {

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method create
 * @return {cc.ParticleFire}
 */
create : function (
)
{
    return cc.ParticleFire;
},

/**
 * @method createWithTotalParticles
 * @param {int} arg0
 * @return {cc.ParticleFire}
 */
createWithTotalParticles : function (
int 
)
{
    return cc.ParticleFire;
},

/**
 * @method ParticleFire
 * @constructor
 */
ParticleFire : function (
)
{
},

};

/**
 * @class ParticleFireworks
 */
cc.ParticleFireworks = {

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method initWithTotalParticles
 * @param {int} arg0
 * @return {bool}
 */
initWithTotalParticles : function (
int 
)
{
    return false;
},

/**
 * @method create
 * @return {cc.ParticleFireworks}
 */
create : function (
)
{
    return cc.ParticleFireworks;
},

/**
 * @method createWithTotalParticles
 * @param {int} arg0
 * @return {cc.ParticleFireworks}
 */
createWithTotalParticles : function (
int 
)
{
    return cc.ParticleFireworks;
},

/**
 * @method ParticleFireworks
 * @constructor
 */
ParticleFireworks : function (
)
{
},

};

/**
 * @class ParticleSun
 */
cc.ParticleSun = {

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method initWithTotalParticles
 * @param {int} arg0
 * @return {bool}
 */
initWithTotalParticles : function (
int 
)
{
    return false;
},

/**
 * @method create
 * @return {cc.ParticleSun}
 */
create : function (
)
{
    return cc.ParticleSun;
},

/**
 * @method createWithTotalParticles
 * @param {int} arg0
 * @return {cc.ParticleSun}
 */
createWithTotalParticles : function (
int 
)
{
    return cc.ParticleSun;
},

/**
 * @method ParticleSun
 * @constructor
 */
ParticleSun : function (
)
{
},

};

/**
 * @class ParticleGalaxy
 */
cc.ParticleGalaxy = {

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method initWithTotalParticles
 * @param {int} arg0
 * @return {bool}
 */
initWithTotalParticles : function (
int 
)
{
    return false;
},

/**
 * @method create
 * @return {cc.ParticleGalaxy}
 */
create : function (
)
{
    return cc.ParticleGalaxy;
},

/**
 * @method createWithTotalParticles
 * @param {int} arg0
 * @return {cc.ParticleGalaxy}
 */
createWithTotalParticles : function (
int 
)
{
    return cc.ParticleGalaxy;
},

/**
 * @method ParticleGalaxy
 * @constructor
 */
ParticleGalaxy : function (
)
{
},

};

/**
 * @class ParticleFlower
 */
cc.ParticleFlower = {

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method initWithTotalParticles
 * @param {int} arg0
 * @return {bool}
 */
initWithTotalParticles : function (
int 
)
{
    return false;
},

/**
 * @method create
 * @return {cc.ParticleFlower}
 */
create : function (
)
{
    return cc.ParticleFlower;
},

/**
 * @method createWithTotalParticles
 * @param {int} arg0
 * @return {cc.ParticleFlower}
 */
createWithTotalParticles : function (
int 
)
{
    return cc.ParticleFlower;
},

/**
 * @method ParticleFlower
 * @constructor
 */
ParticleFlower : function (
)
{
},

};

/**
 * @class ParticleMeteor
 */
cc.ParticleMeteor = {

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method initWithTotalParticles
 * @param {int} arg0
 * @return {bool}
 */
initWithTotalParticles : function (
int 
)
{
    return false;
},

/**
 * @method create
 * @return {cc.ParticleMeteor}
 */
create : function (
)
{
    return cc.ParticleMeteor;
},

/**
 * @method createWithTotalParticles
 * @param {int} arg0
 * @return {cc.ParticleMeteor}
 */
createWithTotalParticles : function (
int 
)
{
    return cc.ParticleMeteor;
},

/**
 * @method ParticleMeteor
 * @constructor
 */
ParticleMeteor : function (
)
{
},

};

/**
 * @class ParticleSpiral
 */
cc.ParticleSpiral = {

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method initWithTotalParticles
 * @param {int} arg0
 * @return {bool}
 */
initWithTotalParticles : function (
int 
)
{
    return false;
},

/**
 * @method create
 * @return {cc.ParticleSpiral}
 */
create : function (
)
{
    return cc.ParticleSpiral;
},

/**
 * @method createWithTotalParticles
 * @param {int} arg0
 * @return {cc.ParticleSpiral}
 */
createWithTotalParticles : function (
int 
)
{
    return cc.ParticleSpiral;
},

/**
 * @method ParticleSpiral
 * @constructor
 */
ParticleSpiral : function (
)
{
},

};

/**
 * @class ParticleExplosion
 */
cc.ParticleExplosion = {

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method initWithTotalParticles
 * @param {int} arg0
 * @return {bool}
 */
initWithTotalParticles : function (
int 
)
{
    return false;
},

/**
 * @method create
 * @return {cc.ParticleExplosion}
 */
create : function (
)
{
    return cc.ParticleExplosion;
},

/**
 * @method createWithTotalParticles
 * @param {int} arg0
 * @return {cc.ParticleExplosion}
 */
createWithTotalParticles : function (
int 
)
{
    return cc.ParticleExplosion;
},

/**
 * @method ParticleExplosion
 * @constructor
 */
ParticleExplosion : function (
)
{
},

};

/**
 * @class ParticleSmoke
 */
cc.ParticleSmoke = {

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method initWithTotalParticles
 * @param {int} arg0
 * @return {bool}
 */
initWithTotalParticles : function (
int 
)
{
    return false;
},

/**
 * @method create
 * @return {cc.ParticleSmoke}
 */
create : function (
)
{
    return cc.ParticleSmoke;
},

/**
 * @method createWithTotalParticles
 * @param {int} arg0
 * @return {cc.ParticleSmoke}
 */
createWithTotalParticles : function (
int 
)
{
    return cc.ParticleSmoke;
},

/**
 * @method ParticleSmoke
 * @constructor
 */
ParticleSmoke : function (
)
{
},

};

/**
 * @class ParticleSnow
 */
cc.ParticleSnow = {

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method initWithTotalParticles
 * @param {int} arg0
 * @return {bool}
 */
initWithTotalParticles : function (
int 
)
{
    return false;
},

/**
 * @method create
 * @return {cc.ParticleSnow}
 */
create : function (
)
{
    return cc.ParticleSnow;
},

/**
 * @method createWithTotalParticles
 * @param {int} arg0
 * @return {cc.ParticleSnow}
 */
createWithTotalParticles : function (
int 
)
{
    return cc.ParticleSnow;
},

/**
 * @method ParticleSnow
 * @constructor
 */
ParticleSnow : function (
)
{
},

};

/**
 * @class ParticleRain
 */
cc.ParticleRain = {

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method initWithTotalParticles
 * @param {int} arg0
 * @return {bool}
 */
initWithTotalParticles : function (
int 
)
{
    return false;
},

/**
 * @method create
 * @return {cc.ParticleRain}
 */
create : function (
)
{
    return cc.ParticleRain;
},

/**
 * @method createWithTotalParticles
 * @param {int} arg0
 * @return {cc.ParticleRain}
 */
createWithTotalParticles : function (
int 
)
{
    return cc.ParticleRain;
},

/**
 * @method ParticleRain
 * @constructor
 */
ParticleRain : function (
)
{
},

};

/**
 * @class GridBase
 */
cc.GridBase = {

/**
 * @method setGridSize
 * @param {size_object} arg0
 */
setGridSize : function (
size 
)
{
},

/**
 * @method calculateVertexPoints
 */
calculateVertexPoints : function (
)
{
},

/**
 * @method afterDraw
 * @param {cc.Node} arg0
 */
afterDraw : function (
node 
)
{
},

/**
 * @method beforeDraw
 */
beforeDraw : function (
)
{
},

/**
 * @method isTextureFlipped
 * @return {bool}
 */
isTextureFlipped : function (
)
{
    return false;
},

/**
 * @method getGridSize
 * @return {size_object}
 */
getGridSize : function (
)
{
    return cc.Size;
},

/**
 * @method getStep
 * @return {vec2_object}
 */
getStep : function (
)
{
    return cc.Vec2;
},

/**
 * @method set2DProjection
 */
set2DProjection : function (
)
{
},

/**
 * @method setStep
 * @param {vec2_object} arg0
 */
setStep : function (
vec2 
)
{
},

/**
 * @method setTextureFlipped
 * @param {bool} arg0
 */
setTextureFlipped : function (
bool 
)
{
},

/**
 * @method blit
 */
blit : function (
)
{
},

/**
 * @method setActive
 * @param {bool} arg0
 */
setActive : function (
bool 
)
{
},

/**
 * @method getReuseGrid
 * @return {int}
 */
getReuseGrid : function (
)
{
    return 0;
},

/**
 * @method initWithSize
* @param {size_object|size_object} size
* @param {cc.Texture2D} texture2d
* @param {bool} bool
* @return {bool|bool}
*/
initWithSize : function(
size,
texture2d,
bool 
)
{
    return false;
},

/**
 * @method setReuseGrid
 * @param {int} arg0
 */
setReuseGrid : function (
int 
)
{
},

/**
 * @method isActive
 * @return {bool}
 */
isActive : function (
)
{
    return false;
},

/**
 * @method reuse
 */
reuse : function (
)
{
},

/**
 * @method create
* @param {size_object|size_object} size
* @param {cc.Texture2D} texture2d
* @param {bool} bool
* @return {cc.GridBase|cc.GridBase}
*/
create : function(
size,
texture2d,
bool 
)
{
    return cc.GridBase;
},

};

/**
 * @class Grid3D
 */
cc.Grid3D = {

/**
 * @method create
* @param {size_object|size_object} size
* @param {cc.Texture2D} texture2d
* @param {bool} bool
* @return {cc.Grid3D|cc.Grid3D}
*/
create : function(
size,
texture2d,
bool 
)
{
    return cc.Grid3D;
},

/**
 * @method Grid3D
 * @constructor
 */
Grid3D : function (
)
{
},

};

/**
 * @class TiledGrid3D
 */
cc.TiledGrid3D = {

/**
 * @method create
* @param {size_object|size_object} size
* @param {cc.Texture2D} texture2d
* @param {bool} bool
* @return {cc.TiledGrid3D|cc.TiledGrid3D}
*/
create : function(
size,
texture2d,
bool 
)
{
    return cc.TiledGrid3D;
},

/**
 * @method TiledGrid3D
 * @constructor
 */
TiledGrid3D : function (
)
{
},

};

/**
 * @class GLProgramCache
 */
cc.ShaderCache = {

/**
 * @method reloadDefaultGLPrograms
 */
reloadDefaultGLPrograms : function (
)
{
},

/**
 * @method addGLProgram
 * @param {cc.GLProgram} arg0
 * @param {String} arg1
 */
addGLProgram : function (
glprogram, 
str 
)
{
},

/**
 * @method getGLProgram
 * @param {String} arg0
 * @return {cc.GLProgram}
 */
getGLProgram : function (
str 
)
{
    return cc.GLProgram;
},

/**
 * @method loadDefaultGLPrograms
 */
loadDefaultGLPrograms : function (
)
{
},

/**
 * @method destroyInstance
 */
destroyInstance : function (
)
{
},

/**
 * @method getInstance
 * @return {cc.GLProgramCache}
 */
getInstance : function (
)
{
    return cc.GLProgramCache;
},

/**
 * @method GLProgramCache
 * @constructor
 */
GLProgramCache : function (
)
{
},

};

/**
 * @class TextureCache
 */
cc.TextureCache = {

/**
 * @method reloadTexture
 * @param {String} arg0
 * @return {bool}
 */
reloadTexture : function (
str 
)
{
    return false;
},

/**
 * @method unbindAllImageAsync
 */
unbindAllImageAsync : function (
)
{
},

/**
 * @method removeTextureForKey
 * @param {String} arg0
 */
removeTextureForKey : function (
str 
)
{
},

/**
 * @method removeAllTextures
 */
removeAllTextures : function (
)
{
},

/**
 * @method addImageAsync
 * @param {String} arg0
 * @param {function} arg1
 */
addImageAsync : function (
str, 
func 
)
{
},

/**
 * @method getDescription
 * @return {String}
 */
getDescription : function (
)
{
    return ;
},

/**
 * @method getCachedTextureInfo
 * @return {String}
 */
getCachedTextureInfo : function (
)
{
    return ;
},

/**
 * @method addImage
* @param {cc.Image|String} image
* @param {String} str
* @return {cc.Texture2D|cc.Texture2D}
*/
addImage : function(
image,
str 
)
{
    return cc.Texture2D;
},

/**
 * @method unbindImageAsync
 * @param {String} arg0
 */
unbindImageAsync : function (
str 
)
{
},

/**
 * @method getTextureForKey
 * @param {String} arg0
 * @return {cc.Texture2D}
 */
getTextureForKey : function (
str 
)
{
    return cc.Texture2D;
},

/**
 * @method removeUnusedTextures
 */
removeUnusedTextures : function (
)
{
},

/**
 * @method removeTexture
 * @param {cc.Texture2D} arg0
 */
removeTexture : function (
texture2d 
)
{
},

/**
 * @method waitForQuit
 */
waitForQuit : function (
)
{
},

/**
 * @method TextureCache
 * @constructor
 */
TextureCache : function (
)
{
},

};

/**
 * @class Device
 */
cc.Device = {

/**
 * @method setAccelerometerEnabled
 * @param {bool} arg0
 */
setAccelerometerEnabled : function (
bool 
)
{
},

/**
 * @method setAccelerometerInterval
 * @param {float} arg0
 */
setAccelerometerInterval : function (
float 
)
{
},

/**
 * @method getDPI
 * @return {int}
 */
getDPI : function (
)
{
    return 0;
},

};

/**
 * @class SAXParser
 */
cc.PlistParser = {

/**
 * @method init
 * @param {char} arg0
 * @return {bool}
 */
init : function (
char 
)
{
    return false;
},

};

/**
 * @class Application
 */
cc.Application = {

/**
 * @method getCurrentLanguage
 * @return {cc.LanguageType}
 */
getCurrentLanguage : function (
)
{
    return 0;
},

/**
 * @method getInstance
 * @return {cc.Application}
 */
getInstance : function (
)
{
    return cc.Application;
},

};

/**
 * @class GLViewProtocol
 */
cc.GLViewProtocol = {

/**
 * @method setFrameSize
 * @param {float} arg0
 * @param {float} arg1
 */
setFrameSize : function (
float, 
float 
)
{
},

/**
 * @method getViewPortRect
 * @return {rect_object}
 */
getViewPortRect : function (
)
{
    return cc.Rect;
},

/**
 * @method setIMEKeyboardState
 * @param {bool} arg0
 */
setIMEKeyboardState : function (
bool 
)
{
},

/**
 * @method getViewName
 * @return {String}
 */
getViewName : function (
)
{
    return ;
},

/**
 * @method isOpenGLReady
 * @return {bool}
 */
isOpenGLReady : function (
)
{
    return false;
},

/**
 * @method end
 */
end : function (
)
{
},

/**
 * @method getScaleY
 * @return {float}
 */
getScaleY : function (
)
{
    return 0;
},

/**
 * @method getScaleX
 * @return {float}
 */
getScaleX : function (
)
{
    return 0;
},

/**
 * @method getVisibleOrigin
 * @return {vec2_object}
 */
getVisibleOrigin : function (
)
{
    return cc.Vec2;
},

/**
 * @method getFrameSize
 * @return {size_object}
 */
getFrameSize : function (
)
{
    return cc.Size;
},

/**
 * @method getDesignResolutionSize
 * @return {size_object}
 */
getDesignResolutionSize : function (
)
{
    return cc.Size;
},

/**
 * @method setDesignResolutionSize
 * @param {float} arg0
 * @param {float} arg1
 * @param {ResolutionPolicy} arg2
 */
setDesignResolutionSize : function (
float, 
float, 
resolutionpolicy 
)
{
},

/**
 * @method getResolutionPolicy
 * @return {ResolutionPolicy}
 */
getResolutionPolicy : function (
)
{
    return ResolutionPolicy;
},

/**
 * @method setViewPortInPoints
 * @param {float} arg0
 * @param {float} arg1
 * @param {float} arg2
 * @param {float} arg3
 */
setViewPortInPoints : function (
float, 
float, 
float, 
float 
)
{
},

/**
 * @method setViewName
 * @param {String} arg0
 */
setViewName : function (
str 
)
{
},

/**
 * @method getVisibleRect
 * @return {rect_object}
 */
getVisibleRect : function (
)
{
    return cc.Rect;
},

/**
 * @method getVisibleSize
 * @return {size_object}
 */
getVisibleSize : function (
)
{
    return cc.Size;
},

};

/**
 * @class GLView
 */
cc.GLView = {

/**
 * @method createWithRect
 * @param {String} arg0
 * @param {rect_object} arg1
 * @param {float} arg2
 * @return {cc.GLView}
 */
createWithRect : function (
str, 
rect, 
float 
)
{
    return cc.GLView;
},

/**
 * @method create
 * @param {String} arg0
 * @return {cc.GLView}
 */
create : function (
str 
)
{
    return cc.GLView;
},

/**
 * @method createWithFullScreen
 * @param {String} arg0
 * @return {cc.GLView}
 */
createWithFullScreen : function (
str 
)
{
    return cc.GLView;
},

};

/**
 * @class AnimationCache
 */
cc.AnimationCache = {

/**
 * @method getAnimation
 * @param {String} arg0
 * @return {cc.Animation}
 */
getAnimation : function (
str 
)
{
    return cc.Animation;
},

/**
 * @method addAnimation
 * @param {cc.Animation} arg0
 * @param {String} arg1
 */
addAnimation : function (
animation, 
str 
)
{
},

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method addAnimationsWithDictionary
 * @param {map_object} arg0
 * @param {String} arg1
 */
addAnimationsWithDictionary : function (
map, 
str 
)
{
},

/**
 * @method removeAnimation
 * @param {String} arg0
 */
removeAnimation : function (
str 
)
{
},

/**
 * @method addAnimationsWithFile
 * @param {String} arg0
 */
addAnimationsWithFile : function (
str 
)
{
},

/**
 * @method destroyInstance
 */
destroyInstance : function (
)
{
},

/**
 * @method getInstance
 * @return {cc.AnimationCache}
 */
getInstance : function (
)
{
    return cc.AnimationCache;
},

/**
 * @method AnimationCache
 * @constructor
 */
AnimationCache : function (
)
{
},

};

/**
 * @class SpriteFrameCache
 */
cc.SpriteFrameCache = {

/**
 * @method addSpriteFramesWithFile
* @param {String|String|String} str
* @param {String|cc.Texture2D} str
*/
addSpriteFramesWithFile : function(
str,
texture2d 
)
{
},

/**
 * @method addSpriteFrame
 * @param {cc.SpriteFrame} arg0
 * @param {String} arg1
 */
addSpriteFrame : function (
spriteframe, 
str 
)
{
},

/**
 * @method removeUnusedSpriteFrames
 */
removeUnusedSpriteFrames : function (
)
{
},

/**
 * @method getSpriteFrameByName
 * @param {String} arg0
 * @return {cc.SpriteFrame}
 */
getSpriteFrameByName : function (
str 
)
{
    return cc.SpriteFrame;
},

/**
 * @method removeSpriteFramesFromFile
 * @param {String} arg0
 */
removeSpriteFramesFromFile : function (
str 
)
{
},

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method removeSpriteFrames
 */
removeSpriteFrames : function (
)
{
},

/**
 * @method removeSpriteFramesFromTexture
 * @param {cc.Texture2D} arg0
 */
removeSpriteFramesFromTexture : function (
texture2d 
)
{
},

/**
 * @method removeSpriteFrameByName
 * @param {String} arg0
 */
removeSpriteFrameByName : function (
str 
)
{
},

/**
 * @method destroyInstance
 */
destroyInstance : function (
)
{
},

/**
 * @method getInstance
 * @return {cc.SpriteFrameCache}
 */
getInstance : function (
)
{
    return cc.SpriteFrameCache;
},

};

/**
 * @class TextFieldTTF
 */
cc.TextFieldTTF = {

/**
 * @method getCharCount
 * @return {int}
 */
getCharCount : function (
)
{
    return 0;
},

/**
 * @method setSecureTextEntry
 * @param {bool} arg0
 */
setSecureTextEntry : function (
bool 
)
{
},

/**
 * @method getColorSpaceHolder
 * @return {color4b_object}
 */
getColorSpaceHolder : function (
)
{
    return cc.Color4B;
},

/**
 * @method initWithPlaceHolder
* @param {String|String} str
* @param {String|size_object} str
* @param {float|cc.TextHAlignment} float
* @param {String} str
* @param {float} float
* @return {bool|bool}
*/
initWithPlaceHolder : function(
str,
size,
texthalignment,
str,
float 
)
{
    return false;
},

/**
 * @method setColorSpaceHolder
* @param {color4b_object|color3b_object} color4b
*/
setColorSpaceHolder : function(
color3b 
)
{
},

/**
 * @method detachWithIME
 * @return {bool}
 */
detachWithIME : function (
)
{
    return false;
},

/**
 * @method setPlaceHolder
 * @param {String} arg0
 */
setPlaceHolder : function (
str 
)
{
},

/**
 * @method isSecureTextEntry
 * @return {bool}
 */
isSecureTextEntry : function (
)
{
    return false;
},

/**
 * @method getPlaceHolder
 * @return {String}
 */
getPlaceHolder : function (
)
{
    return ;
},

/**
 * @method attachWithIME
 * @return {bool}
 */
attachWithIME : function (
)
{
    return false;
},

/**
 * @method textFieldWithPlaceHolder
* @param {String|String} str
* @param {String|size_object} str
* @param {float|cc.TextHAlignment} float
* @param {String} str
* @param {float} float
* @return {cc.TextFieldTTF|cc.TextFieldTTF}
*/
textFieldWithPlaceHolder : function(
str,
size,
texthalignment,
str,
float 
)
{
    return cc.TextFieldTTF;
},

/**
 * @method TextFieldTTF
 * @constructor
 */
TextFieldTTF : function (
)
{
},

};

/**
 * @class ParallaxNode
 */
cc.ParallaxNode = {

/**
 * @method getParallaxArray
* @return {cc._ccArray|cc._ccArray}
*/
getParallaxArray : function(
)
{
    return cc._ccArray;
},

/**
 * @method addChild
 * @param {cc.Node} arg0
 * @param {int} arg1
 * @param {vec2_object} arg2
 * @param {vec2_object} arg3
 */
addChild : function (
node, 
int, 
vec2, 
vec2 
)
{
},

/**
 * @method removeAllChildrenWithCleanup
 * @param {bool} arg0
 */
removeAllChildrenWithCleanup : function (
bool 
)
{
},

/**
 * @method setParallaxArray
 * @param {cc._ccArray} arg0
 */
setParallaxArray : function (
_ccarray 
)
{
},

/**
 * @method create
 * @return {cc.ParallaxNode}
 */
create : function (
)
{
    return cc.ParallaxNode;
},

};

/**
 * @class TMXObjectGroup
 */
cc.TMXObjectGroup = {

/**
 * @method setPositionOffset
 * @param {vec2_object} arg0
 */
setPositionOffset : function (
vec2 
)
{
},

/**
 * @method getProperty
 * @param {String} arg0
 * @return {cc.Value}
 */
getProperty : function (
str 
)
{
    return cc.Value;
},

/**
 * @method getPositionOffset
 * @return {vec2_object}
 */
getPositionOffset : function (
)
{
    return cc.Vec2;
},

/**
 * @method getObject
 * @param {String} arg0
 * @return {map_object}
 */
getObject : function (
str 
)
{
    return map_object;
},

/**
 * @method getObjects
* @return {Array|Array}
*/
getObjects : function(
)
{
    return new Array();
},

/**
 * @method setGroupName
 * @param {String} arg0
 */
setGroupName : function (
str 
)
{
},

/**
 * @method getProperties
* @return {map_object|map_object}
*/
getProperties : function(
)
{
    return map_object;
},

/**
 * @method getGroupName
 * @return {String}
 */
getGroupName : function (
)
{
    return ;
},

/**
 * @method setProperties
 * @param {map_object} arg0
 */
setProperties : function (
map 
)
{
},

/**
 * @method setObjects
 * @param {Array} arg0
 */
setObjects : function (
array 
)
{
},

/**
 * @method TMXObjectGroup
 * @constructor
 */
TMXObjectGroup : function (
)
{
},

};

/**
 * @class TMXLayerInfo
 */
cc.TMXLayerInfo = {

/**
 * @method setProperties
 * @param {map_object} arg0
 */
setProperties : function (
map 
)
{
},

/**
 * @method getProperties
 * @return {map_object}
 */
getProperties : function (
)
{
    return map_object;
},

/**
 * @method TMXLayerInfo
 * @constructor
 */
TMXLayerInfo : function (
)
{
},

};

/**
 * @class TMXTilesetInfo
 */
cc.TMXTilesetInfo = {

/**
 * @method getRectForGID
 * @param {unsigned int} arg0
 * @return {rect_object}
 */
getRectForGID : function (
int 
)
{
    return cc.Rect;
},

/**
 * @method TMXTilesetInfo
 * @constructor
 */
TMXTilesetInfo : function (
)
{
},

};

/**
 * @class TMXMapInfo
 */
cc.TMXMapInfo = {

/**
 * @method setObjectGroups
 * @param {Array} arg0
 */
setObjectGroups : function (
array 
)
{
},

/**
 * @method setTileSize
 * @param {size_object} arg0
 */
setTileSize : function (
size 
)
{
},

/**
 * @method initWithTMXFile
 * @param {String} arg0
 * @return {bool}
 */
initWithTMXFile : function (
str 
)
{
    return false;
},

/**
 * @method getOrientation
 * @return {int}
 */
getOrientation : function (
)
{
    return 0;
},

/**
 * @method isStoringCharacters
 * @return {bool}
 */
isStoringCharacters : function (
)
{
    return false;
},

/**
 * @method setLayers
 * @param {Array} arg0
 */
setLayers : function (
array 
)
{
},

/**
 * @method parseXMLFile
 * @param {String} arg0
 * @return {bool}
 */
parseXMLFile : function (
str 
)
{
    return false;
},

/**
 * @method getParentElement
 * @return {int}
 */
getParentElement : function (
)
{
    return 0;
},

/**
 * @method setTMXFileName
 * @param {String} arg0
 */
setTMXFileName : function (
str 
)
{
},

/**
 * @method parseXMLString
 * @param {String} arg0
 * @return {bool}
 */
parseXMLString : function (
str 
)
{
    return false;
},

/**
 * @method getLayers
* @return {Array|Array}
*/
getLayers : function(
)
{
    return new Array();
},

/**
 * @method getTilesets
* @return {Array|Array}
*/
getTilesets : function(
)
{
    return new Array();
},

/**
 * @method getParentGID
 * @return {int}
 */
getParentGID : function (
)
{
    return 0;
},

/**
 * @method setParentElement
 * @param {int} arg0
 */
setParentElement : function (
int 
)
{
},

/**
 * @method initWithXML
 * @param {String} arg0
 * @param {String} arg1
 * @return {bool}
 */
initWithXML : function (
str, 
str 
)
{
    return false;
},

/**
 * @method setParentGID
 * @param {int} arg0
 */
setParentGID : function (
int 
)
{
},

/**
 * @method getLayerAttribs
 * @return {int}
 */
getLayerAttribs : function (
)
{
    return 0;
},

/**
 * @method getTileSize
 * @return {size_object}
 */
getTileSize : function (
)
{
    return cc.Size;
},

/**
 * @method getTileProperties
 * @return {map_object}
 */
getTileProperties : function (
)
{
    return map_object;
},

/**
 * @method getObjectGroups
* @return {Array|Array}
*/
getObjectGroups : function(
)
{
    return new Array();
},

/**
 * @method getTMXFileName
 * @return {String}
 */
getTMXFileName : function (
)
{
    return ;
},

/**
 * @method setCurrentString
 * @param {String} arg0
 */
setCurrentString : function (
str 
)
{
},

/**
 * @method setProperties
 * @param {map_object} arg0
 */
setProperties : function (
map 
)
{
},

/**
 * @method setOrientation
 * @param {int} arg0
 */
setOrientation : function (
int 
)
{
},

/**
 * @method setTileProperties
 * @param {map_object} arg0
 */
setTileProperties : function (
map 
)
{
},

/**
 * @method setMapSize
 * @param {size_object} arg0
 */
setMapSize : function (
size 
)
{
},

/**
 * @method setStoringCharacters
 * @param {bool} arg0
 */
setStoringCharacters : function (
bool 
)
{
},

/**
 * @method getMapSize
 * @return {size_object}
 */
getMapSize : function (
)
{
    return cc.Size;
},

/**
 * @method setTilesets
 * @param {Array} arg0
 */
setTilesets : function (
array 
)
{
},

/**
 * @method getProperties
* @return {map_object|map_object}
*/
getProperties : function(
)
{
    return map_object;
},

/**
 * @method getCurrentString
 * @return {String}
 */
getCurrentString : function (
)
{
    return ;
},

/**
 * @method setLayerAttribs
 * @param {int} arg0
 */
setLayerAttribs : function (
int 
)
{
},

/**
 * @method create
 * @param {String} arg0
 * @return {cc.TMXMapInfo}
 */
create : function (
str 
)
{
    return cc.TMXMapInfo;
},

/**
 * @method createWithXML
 * @param {String} arg0
 * @param {String} arg1
 * @return {cc.TMXMapInfo}
 */
createWithXML : function (
str, 
str 
)
{
    return cc.TMXMapInfo;
},

/**
 * @method TMXMapInfo
 * @constructor
 */
TMXMapInfo : function (
)
{
},

};

/**
 * @class TMXLayer
 */
cc.TMXLayer = {

/**
 * @method getTileGIDAt
 * @param {vec2_object} arg0
 * @param {cc.TMXTileFlags_} arg1
 * @return {unsigned int}
 */
getTileGIDAt : function (
vec2, 
tmxtileflags_ 
)
{
    return 0;
},

/**
 * @method getPositionAt
 * @param {vec2_object} arg0
 * @return {vec2_object}
 */
getPositionAt : function (
vec2 
)
{
    return cc.Vec2;
},

/**
 * @method setLayerOrientation
 * @param {int} arg0
 */
setLayerOrientation : function (
int 
)
{
},

/**
 * @method releaseMap
 */
releaseMap : function (
)
{
},

/**
 * @method setTiles
 * @param {unsigned int} arg0
 */
setTiles : function (
int 
)
{
},

/**
 * @method getLayerSize
 * @return {size_object}
 */
getLayerSize : function (
)
{
    return cc.Size;
},

/**
 * @method setMapTileSize
 * @param {size_object} arg0
 */
setMapTileSize : function (
size 
)
{
},

/**
 * @method getLayerOrientation
 * @return {int}
 */
getLayerOrientation : function (
)
{
    return 0;
},

/**
 * @method setProperties
 * @param {map_object} arg0
 */
setProperties : function (
map 
)
{
},

/**
 * @method setLayerName
 * @param {String} arg0
 */
setLayerName : function (
str 
)
{
},

/**
 * @method removeTileAt
 * @param {vec2_object} arg0
 */
removeTileAt : function (
vec2 
)
{
},

/**
 * @method initWithTilesetInfo
 * @param {cc.TMXTilesetInfo} arg0
 * @param {cc.TMXLayerInfo} arg1
 * @param {cc.TMXMapInfo} arg2
 * @return {bool}
 */
initWithTilesetInfo : function (
tmxtilesetinfo, 
tmxlayerinfo, 
map 
)
{
    return false;
},

/**
 * @method setupTiles
 */
setupTiles : function (
)
{
},

/**
 * @method setTileGID
* @param {unsigned int|unsigned int} int
* @param {vec2_object|vec2_object} vec2
* @param {cc.TMXTileFlags_} tmxtileflags_
*/
setTileGID : function(
int,
vec2,
tmxtileflags_ 
)
{
},

/**
 * @method getMapTileSize
 * @return {size_object}
 */
getMapTileSize : function (
)
{
    return cc.Size;
},

/**
 * @method getProperty
 * @param {String} arg0
 * @return {cc.Value}
 */
getProperty : function (
str 
)
{
    return cc.Value;
},

/**
 * @method setLayerSize
 * @param {size_object} arg0
 */
setLayerSize : function (
size 
)
{
},

/**
 * @method getLayerName
 * @return {String}
 */
getLayerName : function (
)
{
    return ;
},

/**
 * @method setTileSet
 * @param {cc.TMXTilesetInfo} arg0
 */
setTileSet : function (
tmxtilesetinfo 
)
{
},

/**
 * @method getTileSet
 * @return {cc.TMXTilesetInfo}
 */
getTileSet : function (
)
{
    return cc.TMXTilesetInfo;
},

/**
 * @method getProperties
* @return {map_object|map_object}
*/
getProperties : function(
)
{
    return map_object;
},

/**
 * @method getTileAt
 * @param {vec2_object} arg0
 * @return {cc.Sprite}
 */
getTileAt : function (
vec2 
)
{
    return cc.Sprite;
},

/**
 * @method create
 * @param {cc.TMXTilesetInfo} arg0
 * @param {cc.TMXLayerInfo} arg1
 * @param {cc.TMXMapInfo} arg2
 * @return {cc.TMXLayer}
 */
create : function (
tmxtilesetinfo, 
tmxlayerinfo, 
map 
)
{
    return cc.TMXLayer;
},

/**
 * @method TMXLayer
 * @constructor
 */
TMXLayer : function (
)
{
},

};

/**
 * @class TMXTiledMap
 */
cc.TMXTiledMap = {

/**
 * @method setObjectGroups
 * @param {Array} arg0
 */
setObjectGroups : function (
array 
)
{
},

/**
 * @method getProperty
 * @param {String} arg0
 * @return {cc.Value}
 */
getProperty : function (
str 
)
{
    return cc.Value;
},

/**
 * @method setMapSize
 * @param {size_object} arg0
 */
setMapSize : function (
size 
)
{
},

/**
 * @method getObjectGroup
 * @param {String} arg0
 * @return {cc.TMXObjectGroup}
 */
getObjectGroup : function (
str 
)
{
    return cc.TMXObjectGroup;
},

/**
 * @method getObjectGroups
* @return {Array|Array}
*/
getObjectGroups : function(
)
{
    return new Array();
},

/**
 * @method initWithXML
 * @param {String} arg0
 * @param {String} arg1
 * @return {bool}
 */
initWithXML : function (
str, 
str 
)
{
    return false;
},

/**
 * @method initWithTMXFile
 * @param {String} arg0
 * @return {bool}
 */
initWithTMXFile : function (
str 
)
{
    return false;
},

/**
 * @method getTileSize
 * @return {size_object}
 */
getTileSize : function (
)
{
    return cc.Size;
},

/**
 * @method getMapSize
 * @return {size_object}
 */
getMapSize : function (
)
{
    return cc.Size;
},

/**
 * @method getProperties
 * @return {map_object}
 */
getProperties : function (
)
{
    return map_object;
},

/**
 * @method getPropertiesForGID
* @param {int|int} int
* @param {cc.Value} value
* @return {bool|cc.Value}
*/
getPropertiesForGID : function(
int,
value 
)
{
    return false;
},

/**
 * @method setTileSize
 * @param {size_object} arg0
 */
setTileSize : function (
size 
)
{
},

/**
 * @method setProperties
 * @param {map_object} arg0
 */
setProperties : function (
map 
)
{
},

/**
 * @method getLayer
 * @param {String} arg0
 * @return {cc.TMXLayer}
 */
getLayer : function (
str 
)
{
    return cc.TMXLayer;
},

/**
 * @method getMapOrientation
 * @return {int}
 */
getMapOrientation : function (
)
{
    return 0;
},

/**
 * @method setMapOrientation
 * @param {int} arg0
 */
setMapOrientation : function (
int 
)
{
},

/**
 * @method create
 * @param {String} arg0
 * @return {cc.TMXTiledMap}
 */
create : function (
str 
)
{
    return cc.TMXTiledMap;
},

/**
 * @method createWithXML
 * @param {String} arg0
 * @param {String} arg1
 * @return {cc.TMXTiledMap}
 */
createWithXML : function (
str, 
str 
)
{
    return cc.TMXTiledMap;
},

/**
 * @method TMXTiledMap
 * @constructor
 */
TMXTiledMap : function (
)
{
},

};

/**
 * @class TileMapAtlas
 */
cc.TileMapAtlas = {

/**
 * @method initWithTileFile
 * @param {String} arg0
 * @param {String} arg1
 * @param {int} arg2
 * @param {int} arg3
 * @return {bool}
 */
initWithTileFile : function (
str, 
str, 
int, 
int 
)
{
    return false;
},

/**
 * @method releaseMap
 */
releaseMap : function (
)
{
},

/**
 * @method getTGAInfo
 * @return {cc.sImageTGA}
 */
getTGAInfo : function (
)
{
    return cc.sImageTGA;
},

/**
 * @method getTileAt
 * @param {vec2_object} arg0
 * @return {color3b_object}
 */
getTileAt : function (
vec2 
)
{
    return cc.Color3B;
},

/**
 * @method setTile
 * @param {color3b_object} arg0
 * @param {vec2_object} arg1
 */
setTile : function (
color3b, 
vec2 
)
{
},

/**
 * @method setTGAInfo
 * @param {cc.sImageTGA} arg0
 */
setTGAInfo : function (
simagetga 
)
{
},

/**
 * @method create
 * @param {String} arg0
 * @param {String} arg1
 * @param {int} arg2
 * @param {int} arg3
 * @return {cc.TileMapAtlas}
 */
create : function (
str, 
str, 
int, 
int 
)
{
    return cc.TileMapAtlas;
},

/**
 * @method TileMapAtlas
 * @constructor
 */
TileMapAtlas : function (
)
{
},

};

/**
 * @class Component
 */
cc.Component = {

/**
 * @method setEnabled
 * @param {bool} arg0
 */
setEnabled : function (
bool 
)
{
},

/**
 * @method setName
 * @param {String} arg0
 */
setName : function (
str 
)
{
},

/**
 * @method isEnabled
 * @return {bool}
 */
isEnabled : function (
)
{
    return false;
},

/**
 * @method update
 * @param {float} arg0
 */
update : function (
float 
)
{
},

/**
 * @method getOwner
 * @return {cc.Node}
 */
getOwner : function (
)
{
    return cc.Node;
},

/**
 * @method init
 * @return {bool}
 */
init : function (
)
{
    return false;
},

/**
 * @method setOwner
 * @param {cc.Node} arg0
 */
setOwner : function (
node 
)
{
},

/**
 * @method getName
 * @return {String}
 */
getName : function (
)
{
    return ;
},

/**
 * @method create
 * @return {cc.Component}
 */
create : function (
)
{
    return cc.Component;
},

/**
 * @method Component
 * @constructor
 */
Component : function (
)
{
},

};

/**
 * @class ComponentContainer
 */
cc.ComponentContainer = {

/**
 * @method visit
 * @param {float} arg0
 */
visit : function (
float 
)
{
},

/**
 * @method remove
 * @param {String} arg0
 * @return {bool}
 */
remove : function (
str 
)
{
    return false;
},

/**
 * @method removeAll
 */
removeAll : function (
)
{
},

/**
 * @method add
 * @param {cc.Component} arg0
 * @return {bool}
 */
add : function (
component 
)
{
    return false;
},

/**
 * @method isEmpty
 * @return {bool}
 */
isEmpty : function (
)
{
    return false;
},

/**
 * @method get
 * @param {String} arg0
 * @return {cc.Component}
 */
get : function (
str 
)
{
    return cc.Component;
},

};

/**
 * @class SimpleAudioEngine
 */
cc.AudioEngine = {

/**
 * @method preloadBackgroundMusic
 * @param {char} arg0
 */
preloadBackgroundMusic : function (
char 
)
{
},

/**
 * @method stopBackgroundMusic
 */
stopBackgroundMusic : function (
)
{
},

/**
 * @method stopAllEffects
 */
stopAllEffects : function (
)
{
},

/**
 * @method getBackgroundMusicVolume
 * @return {float}
 */
getBackgroundMusicVolume : function (
)
{
    return 0;
},

/**
 * @method resumeBackgroundMusic
 */
resumeBackgroundMusic : function (
)
{
},

/**
 * @method setBackgroundMusicVolume
 * @param {float} arg0
 */
setBackgroundMusicVolume : function (
float 
)
{
},

/**
 * @method preloadEffect
 * @param {char} arg0
 */
preloadEffect : function (
char 
)
{
},

/**
 * @method isBackgroundMusicPlaying
 * @return {bool}
 */
isBackgroundMusicPlaying : function (
)
{
    return false;
},

/**
 * @method getEffectsVolume
 * @return {float}
 */
getEffectsVolume : function (
)
{
    return 0;
},

/**
 * @method willPlayBackgroundMusic
 * @return {bool}
 */
willPlayBackgroundMusic : function (
)
{
    return false;
},

/**
 * @method pauseEffect
 * @param {unsigned int} arg0
 */
pauseEffect : function (
int 
)
{
},

/**
 * @method playEffect
 * @param {char} arg0
 * @param {bool} arg1
 * @param {float} arg2
 * @param {float} arg3
 * @param {float} arg4
 * @return {unsigned int}
 */
playEffect : function (
char, 
bool, 
float, 
float, 
float 
)
{
    return 0;
},

/**
 * @method rewindBackgroundMusic
 */
rewindBackgroundMusic : function (
)
{
},

/**
 * @method playBackgroundMusic
 * @param {char} arg0
 * @param {bool} arg1
 */
playBackgroundMusic : function (
char, 
bool 
)
{
},

/**
 * @method resumeAllEffects
 */
resumeAllEffects : function (
)
{
},

/**
 * @method setEffectsVolume
 * @param {float} arg0
 */
setEffectsVolume : function (
float 
)
{
},

/**
 * @method stopEffect
 * @param {unsigned int} arg0
 */
stopEffect : function (
int 
)
{
},

/**
 * @method pauseBackgroundMusic
 */
pauseBackgroundMusic : function (
)
{
},

/**
 * @method pauseAllEffects
 */
pauseAllEffects : function (
)
{
},

/**
 * @method unloadEffect
 * @param {char} arg0
 */
unloadEffect : function (
char 
)
{
},

/**
 * @method resumeEffect
 * @param {unsigned int} arg0
 */
resumeEffect : function (
int 
)
{
},

/**
 * @method end
 */
end : function (
)
{
},

/**
 * @method getInstance
 * @return {cc.SimpleAudioEngine}
 */
getInstance : function (
)
{
    return cc.SimpleAudioEngine;
},

};

/**
 * @class ProtectedNode
 */
cc.ProtectedNode = {

/**
 * @method addProtectedChild
* @param {cc.Node|cc.Node|cc.Node} node
* @param {int|int} int
* @param {int} int
*/
addProtectedChild : function(
node,
int,
int 
)
{
},

/**
 * @method disableCascadeColor
 */
disableCascadeColor : function (
)
{
},

/**
 * @method removeProtectedChildByTag
 * @param {int} arg0
 * @param {bool} arg1
 */
removeProtectedChildByTag : function (
int, 
bool 
)
{
},

/**
 * @method reorderProtectedChild
 * @param {cc.Node} arg0
 * @param {int} arg1
 */
reorderProtectedChild : function (
node, 
int 
)
{
},

/**
 * @method removeAllProtectedChildrenWithCleanup
 * @param {bool} arg0
 */
removeAllProtectedChildrenWithCleanup : function (
bool 
)
{
},

/**
 * @method sortAllProtectedChildren
 */
sortAllProtectedChildren : function (
)
{
},

/**
 * @method getProtectedChildByTag
 * @param {int} arg0
 * @return {cc.Node}
 */
getProtectedChildByTag : function (
int 
)
{
    return cc.Node;
},

/**
 * @method removeProtectedChild
 * @param {cc.Node} arg0
 * @param {bool} arg1
 */
removeProtectedChild : function (
node, 
bool 
)
{
},

/**
 * @method removeAllProtectedChildren
 */
removeAllProtectedChildren : function (
)
{
},

/**
 * @method create
 * @return {cc.ProtectedNode}
 */
create : function (
)
{
    return cc.ProtectedNode;
},

/**
 * @method ProtectedNode
 * @constructor
 */
ProtectedNode : function (
)
{
},

};
