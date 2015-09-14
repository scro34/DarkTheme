/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2010 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Tristan Koch (tristankoch)

************************************************************************ */

/**
 * Demonstrates qx.ui.tree(...):
 *
 * Tree, TreeVirtual, TreeFile, TreeFolder
 *
 * ... and qx.ui.treevirtual(...):
 *
 * TreeVirtual
 *
 * @asset(darktheme/demo/tree.json)
 *
 */

qx.Class.define("darktheme.demo.pages.Tree",
{
  extend: darktheme.demo.pages.AbstractPage,

  construct: function()
  {
    this.base(arguments);

    this.__grid = new qx.ui.container.Composite(new qx.ui.layout.Grid(10));
    this.add(this.__grid);

    this._initWidgets();
  },

  members:
  {

    __grid: null,

    _initWidgets: function()
    {
      var label;
      var widgets = this._widgets;

      // Tree
      label = new qx.ui.basic.Label("Tree");
      this.__grid.add(label, {row: 0, column: 0});
      var tree = this._getTree();
      this.__grid.add(tree, {row: 1, column: 0});
      widgets.push(tree);

      // VirtualTree
      label = new qx.ui.basic.Label("VirtualTree");
      label.setToolTip(new qx.ui.tooltip.ToolTip(
        "Virtual implementation of Tree. Shares appearance."));
      this.__grid.add(label, {row: 0, column: 1});
      var virtualTree = this._getVirtualTree();
      this.__grid.add(virtualTree, {row: 1, column: 1});
      widgets.push(virtualTree);

      // TreeVirtual
      label = new qx.ui.basic.Label("TreeVirtual (Legacy)");
      label.setToolTip(new qx.ui.tooltip.ToolTip(
        "Inherits from qx.ui.table.Table. Suited for multi-column trees."));
      this.__grid.add(label, {row: 0, column: 2});
      var treeVirtual = this._getTreeVirtual();
      this.__grid.add(treeVirtual, {row: 1, column: 2});
      widgets.push(treeVirtual);
    },

    _getTree: function()
    {
      var tree = new qx.ui.tree.Tree().set({
        width: 200,
        height: 400
      });

      var root = new qx.ui.tree.TreeFolder("root");
      root.setOpen(true);
      tree.setRoot(root);

      var te1 = new qx.ui.tree.TreeFolder("Desktop");
      te1.setOpen(true);
      root.add(te1);

      var te1_1 = new qx.ui.tree.TreeFolder("Files");
      var te1_2 = new qx.ui.tree.TreeFolder("Workspace");
      var te1_3 = new qx.ui.tree.TreeFolder("Network");
      var te1_4 = new qx.ui.tree.TreeFolder("Trash");
      te1.add(te1_1, te1_2, te1_3, te1_4);


      var te1_2_1 = new qx.ui.tree.TreeFile("Windows (C:)");
      var te1_2_2 = new qx.ui.tree.TreeFile("Documents (D:)");
      te1_2.add(te1_2_1, te1_2_2);



      var te2 = new qx.ui.tree.TreeFolder("Inbox");

      var te2_1 = new qx.ui.tree.TreeFolder("Presets");
      var te2_2 = new qx.ui.tree.TreeFolder("Sent");
      var te2_3 = new qx.ui.tree.TreeFolder("Trash");

      for (var i=0; i<30; i++) {
        te2_3.add(new qx.ui.tree.TreeFile("Junk #" + i));
      }

      var te2_4 = new qx.ui.tree.TreeFolder("Data");
      var te2_5 = new qx.ui.tree.TreeFolder("Edit");

      te2.add(te2_1, te2_2, te2_3, te2_4, te2_5);

      root.add(te2);

      return tree;
    },

    _getVirtualTree: function() {
      var tree = new qx.ui.tree.VirtualTree(null, "name", "children").set({
        width: 200,
        height: 400
      });

      var url = "darktheme/demo/tree.json";
      var store = new qx.data.store.Json(url);

      store.bind("model", tree, "model");

      store.addListener("loaded", function() {
        tree.openNode(tree.getModel().getChildren().getItem(0));
      }, this);

      return tree;
    },

    _getTreeVirtual: function() {
      var tree = new qx.ui.treevirtual.TreeVirtual("TreeVirtual").set({
        width: 200,
        rowHeight: 19
      });
      var dataModel = tree.getDataModel();

      var te2 = dataModel.addBranch(null, "Inbox", true, false);

      var te = dataModel.addBranch(te2, "Spam", false);

      for (var i = 1; i < 3000; i++) {
        dataModel.addLeaf(te, "Spam Message #" + i);
      }

      dataModel.addBranch(te2, "Sent", false);
      dataModel.addBranch(te2, "Trash", false);
      dataModel.addBranch(te2, "Data", false);
      dataModel.addBranch(te2, "Edit", false);

      dataModel.setData();

      return tree;
    }
  }
});
