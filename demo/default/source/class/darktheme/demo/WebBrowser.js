/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2010 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclijadt.demo.org/org/documents/epl-v10.php

   Authors:
     * ???

************************************************************************ */

/**
 * @asset(qx/icon/${qx.icontheme}/16/actions/media-playback-start.png)
 * @asset(qx/icon/${qx.icontheme}/16/actions/go-previous.png)
 * @asset(qx/icon/${qx.icontheme}/16/actions/go-next.png)
 * @asset(qx/icon/${qx.icontheme}/16/categories/internet.png)
 */
 
qx.Class.define("darktheme.demo.WebBrowser",
{
  extend: qx.ui.window.Window,
  

  construct: function()
  {
    this.base(arguments);

    this.setCaption("Web Browser");
    this._createControls();
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members:
  {
    iframe: null,
    txtUrl: "",


    _createControls: function()
    {
      var layout = new qx.ui.layout.VBox(0);
      this.set({
        layout: layout,
        width: 900,
        height: 700,
        contentPadding: 0,
        icon: "icon/16/categories/internet.png"
      });
    
      var toolbar = this._createToolbar();
      this.iframe = new qx.ui.embed.ThemedIframe().set({scrollbarY: "on", scrollbarX: "on"});

      this.add(toolbar);
      this.add(this.iframe, { flex: 1 });
    
      this.addListenerOnce("appear", this._onAppear, this);
    },


    _createToolbar: function()
    {
      var toolbar = new qx.ui.toolbar.ToolBar();

      var btnBack = new qx.ui.toolbar.Button(null, "icon/16/actions/go-previous.png");
      btnBack.addListener("execute", function(e) {
        // this.iframe.getWindow().history.back();
      }, this);
      toolbar.add(btnBack);

      var btnForward = new qx.ui.toolbar.Button(null, "icon/16/actions/go-next.png");
      btnForward.addListener("execute", function(e) {
        // this.iframe.getWindow().history.forward();
      }, this);
      toolbar.add(btnForward);

      // IE does not allow access to an iframes history object
      // Firefox applies history changes to the main window
      // Opera throws a script error when trying to go forward or back

      btnForward.setToolTipText("This feature is currently not supported.")
      btnBack.setToolTipText("This feature is currently not supported.")

      this.txtUrl = new qx.ui.form.TextField().set({
        marginLeft: 1,
        value: "http://qooxdoo.org",
        padding: 2,
        alignY: "middle"
      });
      this.txtUrl.addListener("keypress", function(e) {
        if (e.getKeyIdentifier() == "Enter") {
          this.surfTo(this.txtUrl.getValue());
        }
      }, this);
      toolbar.add(this.txtUrl, {flex: 1});

      var btnGo = new qx.ui.toolbar.Button(null, "icon/16/actions/media-playback-start.png");
      btnGo.addListener("execute", function(e) {
        this.surfTo(this.txtUrl.getValue());
      }, this);
      toolbar.add(btnGo);

      return toolbar;
    },


    surfTo: function(url)
    {
      if (url.indexOf("http://") !== 0) {
        url = "http://" + url;
      }
      this.txtUrl.setValue(url);
      this.iframe.setSource(url);
    },


    _onAppear: function(e)
    {
      this.surfTo(this.txtUrl.getValue());
      this.fadeIn(250);
      this.center();
    }
  }

});

