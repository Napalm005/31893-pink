(function() {

  var elements = document.querySelectorAll(".number");
  var area = document.querySelector(".companion-wrap");
  var template = document.querySelector("#COMPANIONTEMPLATE").innerHTML;

  for (var i = 0; i < elements.length; i++) {
    initNumberField(elements[i]);
  }

  function initNumberField(parent) {
    var input = parent.querySelector(".number__input");
    var minus = parent.querySelector(".number__button--minus");
    var plus = parent.querySelector(".number__button--plus");
    var min = parseInt(input.getAttribute('min')) || 0;
    var max = parseInt(input.getAttribute('max'));

    if (min>max) {
      var x = min;
      min = max;
      max = x;
    }

    minus.addEventListener('click', function(){
      if (input == document.getElementById("COMPANIONSNUMBER")) {
        removeFields();
      }
      changeNumber(false);
    });

    plus.addEventListener('click', function(){
      changeNumber(true);
      if (input == document.getElementById("COMPANIONSNUMBER")) {
        addFields();
      }
    });

    function changeNumber(operation) {
      var value = parseInt(input.value);
      if (operation) {
        value = value + 1;
        if (!isNaN(max)){
          value = Math.min(value, max);
        }
      }  else {
        value = value - 1;
        value = Math.max(value, min);
      }
      input.value = value;
    }

    function removeFields() {
      var value = parseInt(input.value);
      if (value > 0) {
        var children = area.children;
        var lastChildNumber = children.length - 1;
        area.removeChild(children[lastChildNumber]);
      }
    }

    function addFields() {
      var number = Number(input.value);

      var html = Mustache.render(template, {
        "number": number
      });

      var templateElement = document.createElement("div");
      templateElement.classList.add("companion");
      templateElement.innerHTML = html;

      area.appendChild(templateElement);
    }
  }
})();
