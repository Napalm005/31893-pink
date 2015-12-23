(function() {

  var elements = document.querySelectorAll(".number");


  var template = document.querySelector("#companion-template").innerHTML;
  var number = 0;
  var div = 0;

  for (var i = 0; i < elements.length; i++) {
    initNumberField(elements[i]);
  }




  function initNumberField(parent) {
    var input = parent.querySelector("input");
    var minus = parent.querySelector(".number__button--minus");
    var plus = parent.querySelector(".number__button--plus");
    var min = parseInt(input.getAttribute('min')) || 0;
    var max = parseInt(input.getAttribute('max'));
    var companion = document.querySelector(".companion");
    var del = document.querySelector(".companion__delete");
    var area = document.querySelector(".form__fieldset--companions");

    del.addEventListener("click", function(event) {
      debugger;
      event.preventDefault();
      companion.classList.add("companion--hidden");
    });

    if (min>max) {
      min = Math.min(max,min);
      max = Math.max(max,min);
    }

  //   del.addEventListener('click', function(event){
  // debugger;

  //     // area.removeChild(companion);
  //     for (var i = 0; i < elements.length; i++) {
  //       var area = document.querySelector(".form__fieldset--companions");
  //     }

  //   });

    minus.addEventListener('click', function(){
      changeNumber(false);
      if (input == document.getElementById("INPUTDURATION-2")) {
        removeFields();
      }
    });

    plus.addEventListener('click', function(){
      changeNumber(true);
      if (input == document.getElementById("INPUTDURATION-2")) {
        addFields();
      }
    });

    function changeNumber(operation) {
      var value = parseInt(input.value);
      var result;
      if (operation) {
        result = value + 1;
        if (!isNaN(max)){
          result = Math.min(result, max);
        }
      }  else {
        result = value - 1;
        result = Math.max(result, min);
      }
      input.value = result;
    }

    function removeFields() {
      if (input.value > 0) {
        var children = area.children;
        var lastChildNumber = children.length - 1;
        area.removeChild(children[lastChildNumber]);
      } else {
        input.value = 1;
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
