/* ************************************************************************

   Copyright:
     2015 Norbert Schröder

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Norbert Schröder (scro34)

************************************************************************ */

qx.Class.define("darktheme.demo.About",
{
  extend: qx.ui.window.Window,

  construct: function()
  {
    this.base(arguments);

    this._createControls();
  },


  members:
  {
    _aboutTextUrl: "resource/darktheme/demo/about.html",
    
    _createControls: function()
    {
      this.set({
        layout: new qx.ui.layout.VBox(0),
        caption: "About",
        contentPadding: 5,
        showMaximize: false,
        showMinimize: false,
        resizable: false
      });

      var url = qx.util.ResourceManager.getInstance().toUri(this._aboutTextUrl);
      this.debug(url);
      
      var textBox = this.textBox = new qx.ui.embed.ThemedIframe(url).set({
		decorator: "input",
        width: 580,
        height: 350
      });
      
      this.add(textBox, {flex: 1});
      this.add(new qx.ui.menu.Separator().set({
        margin: 5
      }));
      this.add(this._getButtonBox());

      this.addListenerOnce("appear", this.center, this);
      
      this.addListener("appear", function() {
        this.fadeIn(200);
      }, this);

      this.addListener("keypress", function(e) {
        if (e.getKeyIdentifier() == "Escape") {
          this.close();
        }
      }, this);
    },
    
    
    _getButtonBox: function()
    {
      var btnClose = new qx.ui.form.Button("Close").set({
        width: 100
      });
      btnClose.addListener("execute", this.close, this);
      
      var container = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
        alignX: "center"
      }));
      container.add(btnClose);
      
      return container;
    }
    
  }
});
