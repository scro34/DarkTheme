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
 * @asset(darktheme/demo/*)
 * 
 * @asset(qx/icon/${qx.icontheme}/32/apps/media-audio-player.png)
 * @asset(qx/icon/${qx.icontheme}/32/apps/media-photo-album.png)
 * @asset(qx/icon/${qx.icontheme}/32/apps/office-address-book.png)
 * @asset(qx/icon/${qx.icontheme}/32/apps/office-chart.png)
 * @asset(qx/icon/${qx.icontheme}/32/apps/utilities-calculator.png)
 * @asset(qx/icon/${qx.icontheme}/32/apps/utilities-color-chooser.png)
 * @asset(qx/icon/${qx.icontheme}/32/apps/utilities-statistics.png)
 * @asset(qx/icon/${qx.icontheme}/32/apps/utilities-text-editor.png)
 * @asset(qx/icon/${qx.icontheme}/32/categories/internet.png)
 * 
 * @@asset(qx/icon/${qx.icontheme}/48/devices*)
 */
qx.Class.define("darktheme.demo.Application",
{
  extend: qx.application.Standalone,


  members:
  {
    desktop: null,
    
    main: function()
    {
      this.base(arguments);

      if (qx.core.Environment.get("qx.debug")) {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      /***************************************************************************/
      
      var doc = this.getRoot();
      
      var desktop = this.desktop = new qx.ui.window.Desktop()
      desktop.add(this.createTitle(), {top: 10, left: 10});
      
      var mainContainer = this.mainContainer = new qx.ui.container.Composite()
      mainContainer.setLayout(new qx.ui.layout.Canvas());
      mainContainer.add(desktop, {top: 0, left: 0, bottom: 0, right: 0});
      mainContainer.add(this.createDock(), {left: 5, bottom: 0, right: 5});
      
      doc.add(mainContainer, {edge: 0});
      
      var about = this.about = new darktheme.demo.About();
      desktop.add(about);
      
      about.open();
    },
    

    createTitle: function()
    {
      var separator = new darktheme.demo.Separator(80);
      
      var themeLabel = new qx.ui.basic.Label("DarkTheme").set({
        font: "title", 
        textColor: "text-label",
        cursor: "pointer"
      });
      themeLabel.addListener("mouseover", function() {
        this.setTextColor("text-textfield");
      }, themeLabel);
      themeLabel.addListener("mouseout", function() {
        this.setTextColor("text-label");
      }, themeLabel);
      themeLabel.addListener("click", function() {
        this.about.open();
      }, this);
      
      var container = new qx.ui.container.Composite(new qx.ui.layout.VBox(0).set({
        alignX: "center"
      }));
      container.add(themeLabel);
      container.add(separator);
      container.add(new qx.ui.basic.Label("Demo"));
      
      return container;
    },
    
    
    createVersionInfo: function()
    {
      var qooxdoo = new qx.ui.basic.Label("qooxdoo").set({font: "qooxdoo", paddingBottom: 3, cursor: "pointer"});
      qooxdoo.addListener("mouseover", function() {
        this.setTextColor("text-selected");
      }, qooxdoo);
      qooxdoo.addListener("mouseout", function() {
        this.setTextColor("text-label");
      }, qooxdoo);
      qooxdoo.addListener("click", function() {
        this.pressButton("WebBrowser");
      }, this);
      
      var container = new qx.ui.container.Composite(new qx.ui.layout.HBox(5).set({alignY: "middle"}));
      container.add(new qx.ui.basic.Label("powered by").set({font: "small"}));
      container.add(qooxdoo);
      container.add(new qx.ui.basic.Label(qx.core.Environment.get("qx.version")).set({font: "small"}));

      return container;
    },


    createDock: function()
    {
      var container = new qx.ui.container.Composite(new qx.ui.layout.HBox(10).set({
        alignX: "center"
      })).set({
        paddingBottom: 5
      });
      container.addListener("appear", function() {
        this.fadeIn(200);
      }, container);
      
      var button;
      var buttonData = this.getButtonData();
      for (var i = 0; i < buttonData.length; i++) {
        button = new qx.ui.form.ToggleButton(null, buttonData[i].icon).set({
          padding: 10, 
          toolTip: new qx.ui.tooltip.ToolTip(buttonData[i].toolTip)
        });
        button.addState("circle");
        button.setUserData("name", buttonData[i].name);
        button.addListener("changeValue", buttonData[i].action, this);
        container.add(button);
      }
      
      var buttonDock = this.buttonDock = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
      buttonDock.add(container, {top: 0, left: 0, bottom: 0, right: 0});
      buttonDock.add(this.createVersionInfo(), {bottom: 2, right: 0});
      
      buttonDock.addListener("mousemove", function(e) {
        var docHeight = this.getRoot()._computeSizeHint().height;
        var buttonDockHeight = this.buttonDock._computeSizeHint().height;
        var buttonDockContainer = this.buttonDock.getChildren()[0];
        
        if (!this.hasActiveButtons(buttonDockContainer) || (e.getDocumentTop() >= docHeight - 20 && e.getDocumentTop() <= docHeight - 3)) {
          buttonDockContainer.setVisibility("visible");
        } else if (e.getDocumentTop() <= docHeight - buttonDockHeight + 10 || e.getDocumentTop() >= docHeight - 3) {
          buttonDockContainer.setVisibility("excluded");
        } 
      }, this);
      
      return buttonDock;
    },
    
    
    hasActiveButtons: function(container)
    {
      var buttonDockButtons = container.getChildren();

      for (var i = 0; i < buttonDockButtons.length; i++) {
        if (buttonDockButtons[i].getValue()) {
          return true;
        }
      }
      
      return false;
    },
    
    
    checkShowDock: function()
    {
      var container = this.buttonDock.getChildren()[0];
      
      if (!this.hasActiveButtons(container)) {
        container.setVisibility("visible");
      }
    },


    pressButton: function(buttonName)
    {
      var buttonDockContainer = this.buttonDock.getChildren()[0];
      var buttonDockButtons = buttonDockContainer.getChildren();

      for (var i = 0; i < buttonDockButtons.length; i++) {
        if (buttonDockButtons[i].getUserData("name") == buttonName) {
          buttonDockButtons[i].setValue(true);
          break;
        }
      }
    },
    

    dockButtonClick: function(button, targetWindow, openFunc)
    {
      if (button.getValue()) {
        openFunc();
      } else {
        if (targetWindow.getVisibility() == "visible" && !targetWindow.getActive()) {
          button.setValue(true);
        } else {
          targetWindow.close();
        }
      }
    },


    onCalculator: function(e)
    {
      var button = e.getTarget();
      var that = this;
      
      this.dockButtonClick(button, this.calculator, function()
      {
        if (!that.calculator) {
          that.calculator = new darktheme.demo.Calculator();
          that.calculator.addListener("close", function() {
            button.setValue(false);
            this.checkShowDock();
          }, that);
          that.desktop.add(that.calculator);
        }
        that.calculator.open();
      });
    },

    
    onColorChooser: function(e)
    {
      var button = e.getTarget();
      var that = this;
      
      this.dockButtonClick(button, this.colorChooser, function()
      {
        if (!that.colorChooser) {
          that.colorChooser = new darktheme.demo.ColorChooser();
          that.colorChooser.addListener("close", function() {
            button.setValue(false);
            this.checkShowDock();
          }, that);
          that.desktop.add(that.colorChooser);
        }
        that.colorChooser.open();
      });
    },
    
    
    onTableWindow: function(e)
    {
      var button = e.getTarget();
      var that = this;
      
      this.dockButtonClick(button, this.tableWindow, function()
      {
        if (!that.tableWindow) {
          that.tableWindow = new darktheme.demo.TableWindow();
          that.tableWindow.addListener("close", function() {
            button.setValue(false);
            this.checkShowDock();
          }, that);
          that.desktop.add(that.tableWindow);
        }
        that.tableWindow.open();
      });
    },
    
    
    onWebBrowser: function(e)
    {
      var button = e.getTarget();
      var that = this;
      
      this.dockButtonClick(button, this.webBrowser, function()
      {
        if (!that.webBrowser) {
          that.webBrowser = new darktheme.demo.WebBrowser();
          that.webBrowser.addListener("close", function() {
            button.setValue(false);
            this.checkShowDock();
          }, that);
          that.desktop.add(that.webBrowser);
        }
        that.webBrowser.open();
      });
    },

    
    onWidgetBrowser: function(e)
    {
      var button = e.getTarget();
      var that = this;
      
      this.dockButtonClick(button, this.widgetBrowser, function()
      {
        if (!that.widgetBrowser) {
          that.widgetBrowser = new darktheme.demo.WidgetBrowser();
          that.widgetBrowser.addListener("close", function() {
            button.setValue(false);
            this.checkShowDock();
          }, that);
          that.desktop.add(that.widgetBrowser);
        }
        that.widgetBrowser.open();
      });
    },

    
    onAudioPlayerWindow: function(e)
    {
      var button = e.getTarget();
      var that = this;
      
      this.dockButtonClick(button, this.audioPlayerWindow, function()
      {
        if (!that.audioPlayerWindow) {
          that.audioPlayerWindow = new darktheme.demo.PlayerWindow();
          that.audioPlayerWindow.addListener("openHomepage", that.onOpenHomepage, that);
          that.audioPlayerWindow.addListener("openWikipedia", that.onOpenWikipedia, that);
          that.audioPlayerWindow.addListener("openVideo", that.onOpenVideo, that);
          that.audioPlayerWindow.addListener("close", function() {
            button.setValue(false);
            this.checkShowDock();
          }, that);
          that.desktop.add(that.audioPlayerWindow, {top: 110, left: 20});
        }
        that.audioPlayerWindow.open();
      });
    },
    
    
    onOpenHomepage: function(e)
    {
      if (!this.homePageWindow) {
        this.homePageWindow = new darktheme.demo.WebBrowser();
        this.desktop.add(this.homePageWindow);
      }
      this.homePageWindow.setIcon(e.getData().icon);
      this.homePageWindow.setCaption(e.getData().caption);
      this.homePageWindow.surfTo(e.getData().url);
      this.homePageWindow.open();
    },
    
    
    onOpenWikipedia: function(e)
    {
      if (!this.wikipediaWindow) {
        this.wikipediaWindow = new darktheme.demo.WebBrowser();
        this.desktop.add(this.wikipediaWindow);
      }
      this.wikipediaWindow.setIcon(e.getData().icon);
      this.wikipediaWindow.setCaption(e.getData().caption);
      this.wikipediaWindow.surfTo(e.getData().url);
      this.wikipediaWindow.open();
    },

    onOpenVideo: function(e)
    {
      if (!this.videoWindow) {
        this.videoWindow = new darktheme.demo.VideoWindow();
        this.desktop.add(this.videoWindow, {top: 60, right: 20});
      }
      this.videoWindow.setIcon(e.getData().icon);
      this.videoWindow.setCaption(e.getData().caption);
      this.videoWindow.setVideoLink(e.getData().video);
      this.videoWindow.open();
    },
    

    getButtonData: function()
    {
      return [
        {
          icon: "icon/32/apps/utilities-statistics.png",
          toolTip: "Widget Browser",
          name: "WidgetBrowser",
          action: this.onWidgetBrowser
        },
        {
          icon: "icon/32/apps/utilities-calculator.png",
          toolTip: "Calculator",
          name: "Calculator",
          action: this.onCalculator
        },
        {
          icon: "icon/32/apps/utilities-color-chooser.png",
          toolTip: "Color Selector",
          name: "ColorSelector",
          action: this.onColorChooser
        },
        {
          icon: "icon/32/apps/office-chart.png",
          toolTip: "Table",
          name: "Table",
          action: this.onTableWindow
        },
        {
          icon: "icon/32/categories/internet.png",
          toolTip: "Web Browser",
          name: "WebBrowser",
          action: this.onWebBrowser
        },
        {
          icon: "icon/32/apps/media-audio-player.png",
          toolTip: "Audio Player",
          name: "AudioPlayer",
          action: this.onAudioPlayerWindow
        }
      ];
    }
    
  }
});
