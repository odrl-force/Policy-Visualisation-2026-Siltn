// review.js
(function() {
  const radios = document.querySelectorAll('input[name="rating"]');

  radios.forEach(radio => {
      radio.addEventListener("change", (event) => {
        localStorage.setItem(`review-${q.question}`, event.target.value);
        nextState = false
        toggleNextButton();
      });
  });

})();
