JstructureDemo = {};
JstructureDemo.post = {};
JstructureDemo.post.smileHighlighter = {
    init: function () {
        var smileRegexp = /:\)/;
        $('.post').each(function () {
           if (this.innerHTML.match(smileRegexp)) {
             $(this).addClass('smile');
           }
        });
    }
};
JstructureDemo.post.fakeUnit = {
    init: function () { 
        alert('You should not see this fake message from JstructureDemo.post.fakeUnit.'); 
    }
};

var Jstructure = {};
Jstructure.CSS_NAME_PREFIX = /^with_js_unit_/i;
Jstructure.log = {};
Jstructure.log.error = function(msg) { alert(msg) }
Jstructure.initJavascriptUnits = function() {
  var root = JstructureDemo;
  var unitName2Array = function (name) {
    return name.split(".");
  }

  var inferUnitNames = function (cssClasses) {
    var result = [];
    var cssClassArray = cssClasses.split(" ");
    for(var i = 0; i < cssClassArray.length; i++) {
      if(cssClassArray[i].match(Jstructure.CSS_NAME_PREFIX)) {
          var nameWithDashes = cssClassArray[i].replace(Jstructure.CSS_NAME_PREFIX, '');
          var name = nameWithDashes.replace(/-/g, ".");
          result.push(name);
      }
    }
    return result;
  }

  var initUnits = function (unitNames) {
    for(var i = 0; i < unitsNames.length; i++) {
      initUnit(unitsNames[i]);
    }
  }

  var getInitFunction = function(nameAsArray, node) {
    var currentNode = node;
    for(var i = 0; i < nameAsArray.length; i++) {
      currentNode = currentNode[nameAsArray[i]];
    }
    if (typeof currentNode.init === "function") {
      return currentNode.init;
    } else {
      Jstructure.log.error("'init' function isn't found.");
    } 
  }

  var initUnit = function (unitName) {
    var nameAsArray = unitName2Array(unitName);
    var initFun = getInitFunction(nameAsArray, root);
    initFun();
  }

  var bodyClasses = $('body').attr('class')
  var unitsNames = inferUnitNames(bodyClasses);
  initUnits(unitsNames);
}

Jstructure.init = function() {
  Jstructure.initJavascriptUnits();
};

$(function () { Jstructure.init(); });


