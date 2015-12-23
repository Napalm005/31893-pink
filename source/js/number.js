(function() {
  debugger;

  var elements = document.querySelectorAll(".number");

  for (var i = 0; i < elements.length; i++) {
    initNumberField(elements[i]);
  }


  function initNumberField(parent) {
    var input = parent.querySelector("input");
    var minus = parent.querySelector(".number__button--minus");
    var plus = parent.querySelector(".number__button--plus");

    minus.addEventListener('click', function(){
      changeNumber(false);
    });

    plus.addEventListener('click', function(){
      changeNumber(true);
    });

    function changeNumber(operation) {
      var value = parseInt(input.value);

      if (!isNaN(value)){
        value = 0;
      }

      if (operation) {
        input.value = value + 1 + " " + "чел";
      }  else {
        input.value = value - 1 + " " + "чел";
      }
    }
  }
})();
