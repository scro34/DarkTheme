/* ************************************************************************

   Copyright:
      2015 Norbert Schröder

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Norbert Schröder (scro34)

************************************************************************ */

/**
 * @asset(qx/icon/${qx.icontheme}/16/apps/utilities-statistics.png)
 */
 
qx.Class.define("darktheme.demo.WidgetBrowser",
{
  extend: qx.ui.window.Window,
  

  construct: function()
  {
    this.base(arguments);
    this._createControls();
  },


  members:
  {
    _tabView: null,

    _createControls: function()
    {
      this.set({
        layout: new qx.ui.layout.VBox(),
        contentPadding: [10, 0, 0, 0],
        caption: "WidgetBrowser",
        icon: "icon/16/apps/utilities-statistics.png"
      });
      
      this._tabView = new darktheme.demo.view.TabView();
      this._tabView.set({
        minWidth: 880,
        minHeight: 610,
        padding: 5
      });
      
      this.add(this._tabView, {flex: 1});
      
      this.addListener("appear", function() {
        this.center();
        this.fadeIn(200);
      }, this);

      this.addListener("keypress", function(e) {
        if (e.getKeyIdentifier() == "Escape") {
          this.close();
        }
      }, this);
    }

  }
});
