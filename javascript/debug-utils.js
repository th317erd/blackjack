ktExport('card.js', () => {
  function renderCard(cardDefinition) {
    var currentCard = document.getElementById('card-preview');
    if (currentCard)
      currentCard.parentNode.removeChild(currentCard);

    var newCardElement = document.createElement('div');
    newCardElement.setAttribute('id', 'card-preview');
    newCardElement.setAttribute('class', 'card');

    var suitContainerElement = document.createElement('div');
    suitContainerElement.setAttribute('class', 'card-suit-container');

    var pattern = cardDefinition.pattern;
    for (var i = 0, il = pattern.length; i < il; i++) {
      var point = pattern[i],
          suitPointElement = document.createElement('span'),
          x = 0,
          y = 0;

      suitPointElement.setAttribute('class', 'suit-point');
      suitPointElement.setAttribute('style', `top: ${x}rem; left: ${y}rem;`);

      suitContainerElement.appendChild(suitPointElement);
    }

    document.body.appendChild(suitContainerElement);
    document.body.appendChild(newCardElement);
  }

  return {
    renderCard
  };
});