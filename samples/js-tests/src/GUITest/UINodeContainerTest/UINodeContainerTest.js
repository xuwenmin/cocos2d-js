/****************************************************************************
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var UIWidgetAddNodeTest = UIScene.extend({
    init: function () {
        if (this._super()) {
            var widgetSize = this._widget.getContentSize();
            //init text
            this._topDisplayLabel.setString("");
            this._bottomDisplayLabel.setString("NodeContainer");

            // Create the ui node container
            var nodeContainer = ccui.Widget.create();
            nodeContainer.x = widgetSize.width / 2;
            nodeContainer.y = widgetSize.height / 2;
            this._mainNode.addChild(nodeContainer);

            var sprite = cc.Sprite.create("res/cocosui/ccicon.png");
            sprite.x = 0;
            sprite.y = sprite.getBoundingBox().height / 4;
            nodeContainer.addNode(sprite);

            return true;
        }
        return false;
    }
});
