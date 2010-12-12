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
Jstructure.CSS_NAME_PREFIX = /^with_js_/i;
Jstructure.log = {};
Jstructure.log.error = function(msg) { alert(msg) }

Jstructure.init = function(unitNames, context) {
  var objectByName = function (nameAsArray) {
    var currentObject = eval(nameAsArray[0]);
    for(var i = 1; i < nameAsArray.length; i++) {
      currentObject = currentObject[nameAsArray[i]];
    }
    return currentObject;
  }

  var getInitFunction = function(nameAsArray) {
    var objectToInit = objectByName(nameAsArray);

    if (typeof objectToInit.init === "function") {
      return objectToInit.init;
    } else {
      Jstructure.log.error("'init' function isn't found.");
    } 
  }

  var initUnits = function (names) {
    for(var i = 0; i < names.length; i++) {
      initUnit(names[i]);
    }
  }

  var initUnit = function (name) {
    var nameAsArray = unitNameToArray(name);
    getInitFunction(nameAsArray)(context);
  }

  var unitNameToArray = function (name) {
    return name.split(".");
  }

  initUnits(unitNames);
}

Jstructure.initByBodyTagClasses = function () {
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

  var bodyClasses = $('body').attr('class')
  var unitNames = inferUnitNames(bodyClasses);
  Jstructure.init(unitNames, $(document));
}

Jstructure.initByRequestHeader = function(event, xhr, options) {
  var unitNames = (xhr.getResponseHeader("X-JavascriptUnits") || "").split(" ");
  var context = $(options.context) || $(document);
  Jstructure.init(unitNames, context);
}

$(function () { 
    Jstructure.initByBodyTagClasses(); 
    $("body").ajaxComplete(Jstructure.initByRequestHeader);
});
