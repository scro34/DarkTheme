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
 * This class is responsible for the logic of the calculator.
 */
qx.Class.define("darktheme.demo.CalculatorLogic",
{
  extend: qx.core.Object,
  

  construct: function()
  {
    this.base(arguments);
  },
  

  members:
  {
    __currentValue : 0,
    __result : 0,
    __currentOperation : "n",
    __opCounter : 0,
    __resultContainer : 0,
    __ecCounter : 0,
    __isCommaPressed : false,
    __commaDivider : 1,
    __zeroCounter : 0,
    __isSigned : false,
    __signPressedCounter : 0,


    /**
     * sets the pressed number into the display.
     *
     * @param __currentValue {var} Pressed number
     * @return {void}
     */
    setCurrentValue : function(__currentValue)
    {

      if (this.__isCommaPressed)
      {
        this.__commaDivider *= 10;
        this.__currentValue = this.__currentValue + (__currentValue / this.__commaDivider);

        if (__currentValue == 0) {
          this.__zeroCounter++;
        }
      }
      else
      {
        this.__isCommaPressed = false;

        if (this.__currentValue < 0) {
          this.__currentValue = this.__currentValue * 10 - __currentValue;
        } else {

        this.__currentValue = this.__currentValue * 10 + __currentValue;
        }

      }

    },


    /**
     * returns the counter to regulate the decimal place.
     *
     * @return {Integer} a counter
     */
    getZeroCounter : function() {
      return this.__zeroCounter;
    },


    /**
     * sets a comma.
     *
     * @return {void}
     */
    setComma : function() {
      this.__isCommaPressed = true;
    },


    /**
     * returns the pressed number.
     *
     * @return {Float} is the pressed value
     */
    getCurrentValue : function() {
      return this.__currentValue;
    },


    /**
     * resets the pressed number.
     *
     * @return {void}
     */
    resetCurrentValue : function() {
      this.__currentValue = null;
    },


    /**
     * cleans the display and resets all variables.
     *
     * @return {void}
     */
    cleanDisplay : function()
    {
      this.__signPressedCounter = 0;
      this.__resultContainer = 0;
      this.__currentOperation = "n";
      this.__zeroCounter = 0;
      this.__commaDivider = 1;
      this.__isCommaPressed = false;
      this.__ecCounter = 0;
      this.__opCounter = 0;
      this.__currentValue = 0;
      this.__result = 0;
      this.__isSigned = false;
    },


    /**
     * sets the result.
     *
     * @param __result {var} the calculated result.
     * @return {void}
     */
    setResult : function(__result) {
      this.__result = __result;
    },


    /**
     * returns the calculated result.
     *
     * @return {Integer} calculated result.
     */
    getResult : function() {
      return Math.round(this.__result * 10000000) / 10000000;
    },


    /**
     * sets the operator.
     *
     * @param op {var} pressed operator
     * @return {void}
     */
    setCurrentOperation : function(op) {
      this.__currentOperation = op;
    },


    /**
     * returns the recent pressed operator.
     *
     * @return {Char} recent operator
     */
    getCurrentOperation : function() {
      return this.__currentOperation;
    },


    /**
     * clears the entry.
     *
     * @return {void}
     */
    clearEntry : function()
    {
      this.__isSigned = false;
      this.__zeroCounter = 0;
      this.__commaDivider = 1;
      this.__isCommaPressed = false;
      this.__ecCounter++;
      this.__currentValue = 0;

      if (this.__ecCounter < 2) {
        this.__resultContainer = this.__result;
      }

      if (this.__opCounter >= 2)
      {
        this.__result = 0;
        this.__opCounter = 0;
      }
    },


    /**
     * sets the sign from plus to minus or the other way round.
     *
     * @return {void}
     */
    setSign : function()
    {
      this.__signPressedCounter++;

      if (this.__signPressedCounter % 2 == 0) {
        this.__isSigned = false;
      } else {
        this.__isSigned = true;
      }

      if (this.__currentValue == null) {
        this.__currentValue = this.__result;
      }

      this.__currentValue = this.__currentValue * (-1);

      if (this.__result == 0) {
        this.__result = this.__currentValue;
      }

      if (this.__result != 0)
      {
        this.__resultContainer = this.__result;
        this.__result = this.__currentValue;
      }
    },

    /**
     * deletes the last pressed number.
     *
     * @return {void}
     */
    deleteNumber : function()
    {
      var isDecimal = false;
      var isNegative = false;

      if (this.__currentValue < 0)
      {
        this.__currentValue = this.__currentValue * (-1);
        isNegative = true;
      }

      if (this.__currentValue != null)
      {
        if (this.__currentValue.toString().lastIndexOf(".") != -1)
        {
          this.__currentValue = this.__currentValue * this.__commaDivider;
          isDecimal = true;
        }
      }

      var num1 = this.__currentValue % 10;
      var num2 = num1 / 10;
      this.__currentValue = this.__currentValue / 10;
      this.__currentValue = this.__currentValue - num2;

      if (isDecimal)
      {
        this.__commaDivider /= 10;
        this.__currentValue = this.__currentValue / (this.__commaDivider);
        isDecimal = false;
      }

      if (isNegative)
      {
        this.__currentValue = this.__currentValue * (-1);
        isNegative = false;
      }
    },


    /**
     * computes the given numbers with the desired operation.
     *
     * @param currentOperation {var} desired operation to compute
     * @return {void}
     *
     * @lint ignoreDeprecated(alert)
     */
    calculate : function(currentOperation)
    {
      if (currentOperation == "+" || currentOperation == "*" || currentOperation == "/" || currentOperation == "-" || currentOperation == "=")
      {
        this.__isCommaPressed = false;
        this.__commaDivider = 1;
        this.__zeroCounter = 0;

        if (this.__currentOperation != "n")
        {
          if (this.__currentOperation == "+")
          {
            if (this.__result == null) {
              this.__result = this.__resultContainer;
            }

            if (this.__isSigned) {
              this.__result = this.__resultContainer + this.__currentValue;
            } else {
              this.__result = this.__result + this.__currentValue;
            }

            this.__currentValue = this.__result;
            this.__resultContainer = this.__result;
          }

          if (this.__currentOperation == "-")
          {
            if (this.__result == 0)
            {
              this.__result = this.__currentValue;
              this.__currentValue = 0;
            }

            if (this.__result == null) {
              this.__result = this.__resultContainer;
            }

            if (this.__isSigned) {
              this.__result = this.__resultContainer - this.__currentValue;
            } else {
              this.__result = this.__result - this.__currentValue;
            }

            this.__currentValue = this.__result;
            this.__resultContainer = this.__result;
          }

          if (this.__currentOperation == "/")
          {
            if (this.__result == 0)
            {
              this.__result = this.__currentValue;
              this.__currentValue = 1;
            }

            if (this.__result == null) {
              this.__result = this.__resultContainer;
            }

            if (this.__currentValue != null)
            {
              if (this.__currentValue != 0)
              {
                if (this.__isSigned) {
                  this.__result = this.__resultContainer / this.__currentValue;
                } else {
                  this.__result = this.__result / this.__currentValue;
                }
              }
              else
              {
                alert("You can't divide by 0!");
              }
            }

            this.__currentValue = this.__result;
            this.__resultContainer = this.__result;
          }

          if (this.__currentOperation == "*")
          {
            if (this.__result == 0) {
              this.__result = 1;
            }

            if (this.__currentValue == null) {
              this.__currentValue = 1;
            }

            if (this.__result == null) {
              this.__result = this.__resultContainer;
            }

            if (this.__isSigned) {
              this.__result = this.__resultContainer * this.__currentValue;
            } else {
              this.__result = this.__result * this.__currentValue;
            }

            this.__currentValue = this.__result;
            this.__resultContainer = this.__result;
          }
        }
        else
        {
          this.__result = this.__currentValue;
        }

        if (currentOperation != "=") {
          this.__currentOperation = currentOperation;
        }
        else
        {
          this.__opCounter++;
          this.__result = this.__resultContainer;

          this.__currentOperation = "n";
        }

        this.__isSigned = false;
        this.__signPressedCounter = 0;

        return;
      }
    }

  }
});
