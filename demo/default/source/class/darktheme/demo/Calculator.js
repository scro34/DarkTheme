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
 * @asset(qx/icon/${qx.icontheme}/16/apps/utilities-calculator.png)
 */
 
qx.Class.define("darktheme.demo.Calculator",
{
  extend: qx.ui.window.Window,

  
  construct: function()
  {
    this.base(arguments);

    this._createControls();
  },


  members:
  {
    __display: null,
    __cal: null,


    _createControls: function()
    {
      this.__cal = new darktheme.demo.CalculatorLogic();

      var layout = new qx.ui.layout.VBox(16);
      this.set({
        layout: layout,
        width: 260,
        minWidth: 260,
        height: 260,
        caption: "Calculator",
        icon: "icon/16/apps/utilities-calculator.png"
      });

      this.addListenerOnce("appear", function(e) {
        this.add(this._createCalculator(), {flex: 1});
        this.center();
      }, this);

      this.addListener("appear", function(e) {
        this.fadeIn(200);
      }, this);

      this.addListener("keypress", function(e) {
        if (e.getKeyIdentifier() == "Escape") {
          this.close();
        }
      }, this);
    },
    

    _createCalculator: function()
    {
      var box = new qx.ui.container.Composite().set({
        minWidth: 140,
        minHeight: 260,
        padding: 3,
        allowGrowX: true,
        allowGrowY: true
      });

      var gridLayout = new qx.ui.layout.Grid(5, 5);

      box.setLayout(gridLayout);

      this.__display = new qx.ui.basic.Label(this.__cal.getCurrentValue().toString()).set({
        decorator: "input",
        allowGrowX: true,
        allowGrowY: true,
        minWidth: 140,
        height: 32,
        paddingRight: 8,
        textColor: "text-active",
        enabled: false,

        font: new qx.bom.Font().set({
          size: 20,
          family: [ "Verdana", "sans-serif" ],
          bold: true
        }),

        textAlign: "right"
      });

      var fontButton = new qx.bom.Font().set({
        size: 12,
        family: [ "Verdana", "sans-serif" ],
        bold: true
      });

      var button0 = this.button0 = new qx.ui.form.Button("0").set({
        font: fontButton,
        minWidth: 30
      });

      var button1 = new qx.ui.form.Button("1").set({
        font: fontButton,
        minWidth: 30
      });

      var button2 = new qx.ui.form.Button("2").set({
        font: fontButton,
        minWidth: 30
      });

      var button3 = new qx.ui.form.Button("3").set({
        font: fontButton,
        minWidth: 30
      });

      var button4 = new qx.ui.form.Button("4").set({
        font: fontButton,
        minWidth: 30
      });

      var button5 = new qx.ui.form.Button("5").set({
        font: fontButton,
        minWidth: 30
      });

      var button6 = new qx.ui.form.Button("6").set({
        font: fontButton,
        minWidth: 30
      });

      var button7 = new qx.ui.form.Button("7").set({
        font: fontButton,
        minWidth: 30
      });

      var button8 = new qx.ui.form.Button("8").set({
        font: fontButton,
        minWidth: 30
      });

      var button9 = new qx.ui.form.Button("9").set({
        font: fontButton,
        minWidth: 30
      });

      var buttonC = new qx.ui.form.Button("C").set({
        font: fontButton,
        minWidth: 30
      });

      var buttonCE = new qx.ui.form.Button("CE").set({
        font: fontButton,
        minWidth: 30
      });

      var buttonDelete = new qx.ui.form.Button("Del").set({
        font: fontButton,
        minWidth: 30
      });

      var buttonChangeSign = new qx.ui.form.Button("+/-").set({
        font: fontButton,
        minWidth: 30
      });

      var buttonComma = new qx.ui.form.Button(".").set({
        font: fontButton,
        minWidth: 30
      });

      var buttonPlus = new qx.ui.form.Button("+").set({
        font: fontButton,
        minWidth: 30
      });

      var buttonMinus = new qx.ui.form.Button("-").set({
        font: fontButton,
        minWidth: 30
      });

      var buttonMultiplication = new qx.ui.form.Button("*").set({
        font: fontButton,
        minWidth: 30
      });

      var buttonDivision = new qx.ui.form.Button("/").set({
        font: fontButton,
        minWidth: 30
      });

      var buttonResult = new qx.ui.form.Button("=").set({
        font: fontButton,
        minWidth: 30
      });

      gridLayout.setColumnFlex(0, 1);
      gridLayout.setColumnFlex(1, 1);
      gridLayout.setColumnFlex(2, 1);
      gridLayout.setColumnFlex(3, 1);

      gridLayout.setRowFlex(1, 1);
      gridLayout.setRowFlex(2, 1);
      gridLayout.setRowFlex(3, 1);
      gridLayout.setRowFlex(4, 1);
      gridLayout.setRowFlex(5, 1);
      gridLayout.setRowFlex(6, 1);

      box.add(this.__display, {
        row: 0,
        column: 0,
        rowSpan: 0,
        colSpan: 4
      });

      box.add(buttonC, {
        row: 1,
        column: 2,
        rowSpan: 1,
        colSpan: 2
      });

      box.add(buttonCE, {
        row: 1,
        column: 1
      });

      box.add(buttonDelete, {
        row: 1,
        column: 0
      });

      box.add(button7, {
        row: 2,
        column: 0
      });

      box.add(button8, {
        row: 2,
        column: 1
      });

      box.add(button9, {
        row: 2,
        column: 2
      });

      box.add(buttonDivision, {
        row: 2,
        column: 3
      });

      box.add(button4, {
        row: 3,
        column: 0
      });

      box.add(button5, {
        row: 3,
        column: 1
      });

      box.add(button6, {
        row: 3,
        column: 2
      });

      box.add(buttonMultiplication, {
        row: 3,
        column: 3
      });

      box.add(button1, {
        row: 4,
        column: 0
      });

      box.add(button2, {
        row: 4,
        column: 1
      });

      box.add(button3, {
        row: 4,
        column: 2
      });

      box.add(buttonMinus, {
        row: 4,
        column: 3
      });

      box.add(button0, {
        row: 5,
        column: 0
      });

      box.add(buttonChangeSign, {
        row: 5,
        column: 1
      });

      box.add(buttonComma, {
        row: 5,
        column: 2
      });

      box.add(buttonPlus, {
        row: 5,
        column: 3
      });

      box.add(buttonResult, {
        row: 6,
        column: 0,
        rowSpan: 1,
        colSpan: 4
      });

      buttonC.addListener("execute", function(e) {
        this.__cal.cleanDisplay();
        this.__display.setValue(this.__cal.getCurrentValue().toString());
      }, this);

      buttonCE.addListener("execute", function(e) {
        this.__cal.clearEntry();

        if (this.__cal.getResult() != null) {
          this.__display.setValue(this.__cal.getCurrentValue().toString());
        }
      }, this);

      buttonDelete.addListener("execute", function(e) {
        this.__cal.deleteNumber();
        this.__display.setValue(this.__cal.getCurrentValue().toString());
      }, this);

      buttonChangeSign.addListener("execute", function(e) {
        this.__cal.setSign();

        if (this.__cal.getResult() != null) {
          this.__display.setValue(this.__cal.getResult().toString());
        }
      }, this);

      button0.addListener("execute", function(e) {
        this.__cal.setCurrentValue(0);
        this.__display.setValue(this.__cal.getCurrentValue().toFixed(this.__cal.getZeroCounter()).toString());
      }, this);

      button1.addListener("execute", function(e) {
        this.__cal.setCurrentValue(1);
        this.__display.setValue(this.__cal.getCurrentValue().toString());
      }, this);

      button2.addListener("execute", function(e) {
        this.__cal.setCurrentValue(2);
        this.__display.setValue(this.__cal.getCurrentValue().toString());
      }, this);

      button3.addListener("execute", function(e) {
        this.__cal.setCurrentValue(3);
        this.__display.setValue(this.__cal.getCurrentValue().toString());
      }, this);

      button4.addListener("execute", function(e) {
        this.__cal.setCurrentValue(4);
        this.__display.setValue(this.__cal.getCurrentValue().toString());
      }, this);

      button5.addListener("execute", function(e) {
        this.__cal.setCurrentValue(5);
        this.__display.setValue(this.__cal.getCurrentValue().toString());
      }, this);

      button6.addListener("execute", function(e) {
        this.__cal.setCurrentValue(6);
        this.__display.setValue(this.__cal.getCurrentValue().toString());
      }, this);

      button7.addListener("execute", function(e) {
        this.__cal.setCurrentValue(7);
        this.__display.setValue(this.__cal.getCurrentValue().toString());
      }, this);

      button8.addListener("execute", function(e) {
        this.__cal.setCurrentValue(8);
        this.__display.setValue(this.__cal.getCurrentValue().toString());
      }, this);

      button9.addListener("execute", function(e) {
        this.__cal.setCurrentValue(9);
        this.__display.setValue(this.__cal.getCurrentValue().toString());
      }, this);

      buttonPlus.addListener("execute", function(e) {
        this.__cal.calculate("+");

        if (this.__cal.getResult() != null) {
          this.__display.setValue(this.__cal.getResult().toString());
        }

        this.__cal.resetCurrentValue();
      }, this);

      buttonMinus.addListener("execute", function(e) {
        this.__cal.calculate("-");

        if (this.__cal.getResult() != null) {
          this.__display.setValue(this.__cal.getResult().toString());
        }

        this.__cal.resetCurrentValue();
      }, this);

      buttonMultiplication.addListener("execute", function(e) {
        this.__cal.calculate("*");

        if (this.__cal.getResult() != null) {
          this.__display.setValue(this.__cal.getResult().toString());
        }

        this.__cal.resetCurrentValue();
      }, this);

      buttonDivision.addListener("execute", function(e) {
        this.__cal.calculate("/");

        if (this.__cal.getResult() != null) {
          this.__display.setValue(this.__cal.getResult().toString());
        }

        this.__cal.resetCurrentValue();
      }, this);

      buttonResult.addListener("execute", function(e) {
        this.__cal.calculate("=");

        if (this.__cal.getResult() != null) {
          this.__display.setValue(this.__cal.getResult().toString());
        }

        this.__cal.resetCurrentValue();
      }, this);

      buttonComma.addListener("execute", function(e) {
        this.__cal.setComma();
      }, this);

      return box;
    }
    
  },


  destruct: function()
  {
    this._disposeObjects("__cal", "__display");
  }
});

