/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */

qx.Class.define("darktheme.demo.pages.FormItems", 
{
  extend: qx.ui.container.Composite,

  construct: function() 
  {
    this.base(arguments);

    this.__widgets = [];
    this._createView();
  },

  members: 
  {
    __widgets : null,

    _createView : function()
    {
      var grid = new qx.ui.layout.Grid(20, 5);
      grid.setColumnFlex(0, 1);
      grid.setColumnFlex(1, 1);
      this.setLayout(grid);
      this.setPadding(10);
      var tabIndex = 1;

      /*****************************************
       * TEXT INPUT
       ****************************************/

      var textGroupBox = new qx.ui.groupbox.GroupBox("Text");
      textGroupBox.setLayout(new qx.ui.layout.Grid(5, 5));
      this.add(textGroupBox, {row: 0, column: 0});
      this.__widgets.push(textGroupBox);

      // text field
      var label = new qx.ui.basic.Label("TextField :").set({alignX: "right", alignY: "middle"});
      textGroupBox.add(label, {row: 0, column: 0});
      
      var textField = new qx.ui.form.TextField().set({placeholder: "required", tabIndex: tabIndex++, required: true});
      textGroupBox.add(textField, {row: 0, column: 1});
      this.__widgets.push(textField);

      // password field
      label = new qx.ui.basic.Label("PasswordField :").set({alignX: "right", alignY: "middle"});
      textGroupBox.add(label, {row: 1, column: 0});
      
      var passwordField = new qx.ui.form.PasswordField().set({placeholder: "password", tabIndex: tabIndex++, required: true});
      textGroupBox.add(passwordField, {row: 1, column: 1});
      this.__widgets.push(passwordField);

      // text area
      label = new qx.ui.basic.Label("TextArea :").set({alignX: "right", alignY: "top"});
      textGroupBox.add(label, {row: 2, column: 0});
      
      var textArea = new qx.ui.form.TextArea().set({placeholder: "placeholder text...", tabIndex: tabIndex++});
      textGroupBox.add(textArea, {row: 2, column: 1});
      this.__widgets.push(textArea);

      // combo box
      label = new qx.ui.basic.Label("ComboBox :").set({alignX: "right", alignY: "middle"});
      textGroupBox.add(label, {row: 3, column: 0});
      
      var comboBox = new qx.ui.form.ComboBox().set({placeholder: "Pick an item", tabIndex: tabIndex++});
      textGroupBox.add(comboBox, {row: 3, column: 1});
      this.__createItems(comboBox);
      this.__widgets.push(comboBox);

      // virtual combo box
      label = new qx.ui.basic.Label("Virtual ComboBox :").set({alignX: "right", alignY: "middle"});
      textGroupBox.add(label, {row: 4, column: 0});
      
      var virtualComboBox = new qx.ui.form.VirtualComboBox().set({placeholder: "Pick an item", tabIndex: tabIndex++});
      textGroupBox.add(virtualComboBox, {row: 4, column: 1});
      this.__createItemsVirtual(virtualComboBox);
      this.__widgets.push(virtualComboBox);

      // date field
      label = new qx.ui.basic.Label("DateField :").set({alignX: "right", alignY: "middle"});
      textGroupBox.add(label, {row: 5, column: 0});
      
      var dateField = new qx.ui.form.DateField().set({placeholder: "Pick a date", tabIndex: tabIndex++});
      textGroupBox.add(dateField, {row: 5, column: 1});
      this.__widgets.push(dateField);

      /*****************************************
       * SELECTION
       ****************************************/

      var selectionGroupBox = new qx.ui.groupbox.GroupBox("Selection");
      layout = new qx.ui.layout.Grid(5, 5);
      layout.setColumnAlign(0, "right", "middle");
      selectionGroupBox.setLayout(layout);
      this.add(selectionGroupBox, {row: 1, column: 0, rowSpan: 2});
      this.__widgets.push(selectionGroupBox);

      // select box
      label = new qx.ui.basic.Label("SelectBox :");
      selectionGroupBox.add(label, {row: 0, column: 0});
      
      var selectBox = new qx.ui.form.SelectBox().set({tabIndex: tabIndex++});
      selectionGroupBox.add(selectBox, {row: 0, column: 1});
      this.__createItems(selectBox);
      this.__widgets.push(selectBox);

      // virtual select box
      label = new qx.ui.basic.Label("VirtualSelectBox :");
      selectionGroupBox.add(label, {row: 1, column: 0});
      
      var virtualSelectBox = new qx.ui.form.VirtualSelectBox().set({tabIndex: tabIndex++});
      selectionGroupBox.add(virtualSelectBox, {row: 1, column: 1});
      this.__createItemsVirtual(virtualSelectBox);
      this.__widgets.push(virtualSelectBox);

      // list
      label = new qx.ui.basic.Label("List :").set({alignY: "top"});
      selectionGroupBox.add(label, {row: 2, column: 0});
      
      var list = new qx.ui.form.List().set({height: 60, width: 155, tabIndex: tabIndex++});
      selectionGroupBox.add(list, {row: 2, column: 1});
      this.__createItems(list);
      this.__widgets.push(list);

      // radio button group
      label = new qx.ui.basic.Label("RadioButtonGroup :").set({alignY: "top"});
      selectionGroupBox.add(label, {row: 3, column: 0});
      
      var radioButtonGroup = new qx.ui.form.RadioButtonGroup();
      selectionGroupBox.add(radioButtonGroup, {row: 3, column: 1});
      
      var radioButton = new qx.ui.form.RadioButton("RadioButton 1").set({tabIndex: tabIndex++});
      radioButtonGroup.add(radioButton);
      this.__widgets.push(radioButton);
      
      radioButton = new qx.ui.form.RadioButton("RadioButton 2").set({tabIndex: tabIndex++});
      radioButtonGroup.add(radioButton);
      this.__widgets.push(radioButton);
      
      radioButton = new qx.ui.form.RadioButton("RadioButton 3").set({tabIndex: tabIndex++});
      radioButtonGroup.add(radioButton);
      this.__widgets.push(radioButton);
      
      this.__widgets.push(radioButtonGroup);

      /*****************************************
       * BUTTONS
       ****************************************/

      var buttonGroupBox = new qx.ui.groupbox.GroupBox("Buttons");
      var layout = new qx.ui.layout.Grid(5, 8);
      layout.setColumnAlign(0, "right", "middle");
      buttonGroupBox.setLayout(layout);
      this.add(buttonGroupBox, {row: 0, column: 1});
      this.__widgets.push(buttonGroupBox);

      // button
      label = new qx.ui.basic.Label("Button :");
      buttonGroupBox.add(label, {row: 0, column: 0});
      
      var button = new qx.ui.form.Button("Button").set({tabIndex: tabIndex++});
      label.setBuddy(button);
      buttonGroupBox.add(button, {row: 0, column: 1});
      this.__widgets.push(button);

      // toggle button
      label = new qx.ui.basic.Label("ToggleButton :");
      buttonGroupBox.add(label, {row: 1, column: 0});
      
      var toggleButton = new qx.ui.form.ToggleButton("ToggleButton").set({tabIndex: tabIndex++});
      label.setBuddy(toggleButton);
      buttonGroupBox.add(toggleButton, {row: 1, column: 1});
      this.__widgets.push(toggleButton);

      // repeat button
      label = new qx.ui.basic.Label("RepeatButton :");
      buttonGroupBox.add(label, {row: 2, column: 0});
      
      var repeatButton = new qx.ui.form.RepeatButton("0").set({tabIndex: tabIndex++});
      label.setBuddy(repeatButton);
      buttonGroupBox.add(repeatButton, {row: 2, column: 1});
      this.__widgets.push(repeatButton);

      // menu button
      label = new qx.ui.basic.Label("MenuButton :");
      buttonGroupBox.add(label, {row: 3, column: 0});
      
      var menueButton = new qx.ui.form.MenuButton("MenuButton", null, this.__createMenuForMenuButton()).set({tabIndex: tabIndex++});
      label.setBuddy(menueButton);
      buttonGroupBox.add(menueButton, {row: 3, column: 1});
      this.__widgets.push(menueButton);

      // split button
      label = new qx.ui.basic.Label("SplitButton :");
      buttonGroupBox.add(label, {row: 4, column: 0});
      
      var splitButton = new qx.ui.form.SplitButton("SplitButton", null, this.__createMenuForSplitButton()).set({tabIndex: tabIndex++});
      label.setBuddy(splitButton);
      buttonGroupBox.add(splitButton, {row: 4, column: 1});
      this.__widgets.push(splitButton);

      // Listener
      repeatButton.addListener("execute", function()
      {
        var tempValue = parseInt(repeatButton.getLabel(), 10) + 1;
        repeatButton.setLabel(tempValue.toString());
      });
      
      /*****************************************
       * BOOLEAN INPUT
       ****************************************/

      var booleanGroupBox = new qx.ui.groupbox.GroupBox("Boolean");
      layout = new qx.ui.layout.Grid(5, 8);
      layout.setColumnAlign(0, "right", "middle");
      booleanGroupBox.setLayout(layout);
      this.add(booleanGroupBox, {row: 1, column: 1});
      this.__widgets.push(booleanGroupBox);

      // check box
      label = new qx.ui.basic.Label("CheckBox :");
      booleanGroupBox.add(label, {row: 0, column: 0});
      
      var checkBox = new qx.ui.form.CheckBox().set({tabIndex: tabIndex++});
      booleanGroupBox.add(checkBox, {row: 0, column: 1});
      this.__widgets.push(checkBox);

      // tri-state check box
      label = new qx.ui.basic.Label("Tri-State CheckBox :");
      booleanGroupBox.add(label, {row: 1, column: 0});
      
      var triCheckBox = new qx.ui.form.CheckBox().set({tabIndex: tabIndex++, triState: true, value: null});
      booleanGroupBox.add(triCheckBox, {row: 1, column: 1});
      this.__widgets.push(triCheckBox);

      // radio button
      label = new qx.ui.basic.Label("RadioButton :");
      booleanGroupBox.add(label, {row: 2, column: 0});
      
      var radioButton = new qx.ui.form.RadioButton().set({tabIndex: tabIndex++});
      booleanGroupBox.add(radioButton, {row: 2, column: 1});
      this.__widgets.push(radioButton);

      /*****************************************
       * NUMBER INPUT
       ****************************************/

      var numberGroupBox = new qx.ui.groupbox.GroupBox("Number");
      layout = new qx.ui.layout.Grid(5, 8);
      layout.setColumnAlign(0, "right", "middle");
      numberGroupBox.setLayout(layout);
      this.add(numberGroupBox, {row: 2, column: 1});
      this.__widgets.push(numberGroupBox);

      // spinner
      label = new qx.ui.basic.Label("Spinner :");
      numberGroupBox.add(label, {row: 0, column: 0});
      
      var spinner = new qx.ui.form.Spinner(0, 50, 100).set({tabIndex: tabIndex++});
      numberGroupBox.add(spinner, {row: 0, column: 1});
      this.__widgets.push(spinner);

      // slider
      label = new qx.ui.basic.Label("Slider :");
      numberGroupBox.add(label, {row: 1, column: 0});
      
      var slider = new qx.ui.form.Slider().set({width: 130, alignY: "middle", tabIndex: tabIndex++});
      numberGroupBox.add(slider, {row: 1, column: 1});
      this.__widgets.push(slider);
      this.__widgets.push(slider.getChildControl("knob"));

      slider.bind("value", spinner, "value");
      spinner.bind("value", slider, "value");
    },


    __createItems: function(widget)
    {
      for (var i = 0; i < 10; i++) {
        var tempItem = new qx.ui.form.ListItem("Item " + i);
        widget.add(tempItem);
      }
    },


    __createItemsVirtual: function(widget)
    {
      // Creates the model data
      var model = new qx.data.Array();
      for (var i = 0; i < 300; i++) {
        model.push("Item " + (i));
      }
      widget.setModel(model);
    },


    __createMenuForMenuButton : function()
    {
      // Creates the option menu
      var optionMenu = new qx.ui.menu.Menu;

      for (var i = 0; i < 3; i++) {
        var radioButton = new qx.ui.menu.RadioButton("Option" + i);
        // radioButton.setAppearance("menu-radiobutton-light");
        optionMenu.add(radioButton);
      }

      var groupOptions = new qx.ui.form.RadioGroup;
      groupOptions.add.apply(groupOptions, optionMenu.getChildren());

      // create main menu and buttons
      var menu = new qx.ui.menu.Menu();

      for (i = 0; i < 3; i++) {
        var tempButton = new qx.ui.menu.Button("Button" + i);
        // tempButton.setAppearance("menu-button-light");
        menu.add(tempButton);
      }

      var separator = new qx.ui.menu.Separator();
      separator.setAppearance("menu-separator");
      menu.add(separator);

      var optionButton = new qx.ui.menu.Button("Options", "", null, optionMenu);
      // optionButton.setAppearance("menu-button-light");
      menu.add(optionButton);

      return menu;
    },


    __createMenuForSplitButton : function()
    {
      var menu = new qx.ui.menu.Menu;

      var site1 = new qx.ui.menu.Button("Website 1");
      // site1.setAppearance("menu-button-light");
      var site2 = new qx.ui.menu.Button("Website 2");
      // site2.setAppearance("menu-button-light");
      var site3 = new qx.ui.menu.Button("Website 3");
      // site3.setAppearance("menu-button-light");

      menu.add(site1);
      menu.add(site2);
      menu.add(site3);

      return menu;
    },


    getWidgets : function() {
      // this.debug(this.__textForm.getValidationManager().getItems());
      return this.__widgets;
    }
  }
});
