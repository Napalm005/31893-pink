(function() {

  var elements = document.querySelectorAll(".number");
  var area = document.querySelector(".companion-wrap");
  var template = document.querySelector("#COMPANIONTEMPLATE");

  for (var i = 0; i < elements.length; i++) {
    initNumberField(elements[i]);
  }

  function initNumberField(parent) {
    var input = parent.querySelector(".number__input");
    var minus = parent.querySelector(".number__button--minus");
    var plus = parent.querySelector(".number__button--plus");
    var min = parseInt(input.getAttribute('min')) || 0;
    var max = parseInt(input.getAttribute('max'));

    input.readOnly=true;

    if (min>max) {
      var x = min;
      min = max;
      max = x;
    }

    minus.addEventListener('click', function(){
      if (input == COMPANIONSNUMBER) {
        removeFields();
      }
      changeNumber(false);
    });

    plus.addEventListener('click', function(){
      if (input == COMPANIONSNUMBER) {
        addFields();
      }
      changeNumber(true);
    });

    function changeNumber(operation) {
      var value = parseInt(input.value);
      if (operation) {
        value = value + 1;
        minus.disabled=false;

        if (!isNaN(max)){
          value = Math.min(value, max);
          if (value == max) {
            plus.disabled=true;
          }
        }
      } else {
          value = value - 1;
          value = Math.max(value, min);
          minus.disabled=false;
          plus.disabled=false;

          if (value == min) {
            minus.disabled=true;
          }
        }
      input.value = value;
    }

    function removeFields() {
      var value = parseInt(input.value);
      if (value > min) {
        var children = area.children;
        var lastChildNumber = children.length - 1;
        area.removeChild(children[lastChildNumber]);
      }
    }

    function addFields() {

      var number = parseInt(input.value) + 1;

      var html = Mustache.render(template.innerHTML, {
        "number": number
      });

      var templateElement = document.createElement("div");
      templateElement.classList.add("companion");
      templateElement.innerHTML = html;

      if (number <= max || number > 0) {
        area.appendChild(templateElement);
      }
    }
  }
})();
