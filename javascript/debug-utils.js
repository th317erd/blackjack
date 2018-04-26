ktExport('card.js', () => {
  function renderCard(suit, cardDefinition) {
    // Create our base card element
    function createCard() {
      var cardElement = document.createElement('div'),
          cardContainerElement = document.createElement('div');

      cardElement.setAttribute('id', 'card-preview');
      cardElement.setAttribute('class', 'card');

      cardContainerElement.setAttribute('class', 'card-container');
      cardElement.appendChild(cardContainerElement);

      return cardElement;
    }

    // This function will add a suit point to the specified parent element
    function addSuitPoint(parentElement, point, size = 'large') {
      var suitPointElement = document.createElement('span');

      suitPointElement.setAttribute('class', `suit-point font-suits1-${suit} suit-color-${suit} suit-point-${size}`);
      suitPointElement.setAttribute('style', `left: ${point.x * 100}%; top: ${point.y * 100}%;`);

      parentElement.appendChild(suitPointElement);
    }

    // This function will add a digit to the card element
    function addDigit(digit, flip) {
      var digitContainerElement = document.createElement('div'),
          digitElement = document.createElement('span');

      digitContainerElement.setAttribute('class', `suit-digit-container ${(flip) ? 'flip' : ''}`);
      digitContainerElement.setAttribute('style', (flip) ? 'bottom: 0; right: 0;' : 'top: 0; left: 0');

      digitElement.innerHTML = digit;
      digitElement.setAttribute('class', `suit-digit suit-color-${suit}`);

      addSuitPoint(digitContainerElement, { x: 0.5, y: 1.0 }, 'small');

      digitContainerElement.appendChild(digitElement);
      cardElement.children[0].appendChild(digitContainerElement);
    }

    // If any card already exists on the document, then remove it
    var currentCard = document.getElementById('card-preview');
    if (currentCard)
      currentCard.parentNode.removeChild(currentCard);

    // Create a new card
    var cardElement = createCard();

    // Add the two digits
    addDigit(cardDefinition.digit, false);
    addDigit(cardDefinition.digit, true);

    // Create the container element to hold the suit pattern
    var suitContainerElement = document.createElement('div');
    suitContainerElement.setAttribute('class', 'card-suit-container');

    // Add the pattern of suit points to out suit pattern container
    var pattern = cardDefinition.pattern;
    for (var i = 0, il = pattern.length; i < il; i++)
      addSuitPoint(suitContainerElement, pattern[i]);

    // Add elements to the DOM
    cardElement.children[0].appendChild(suitContainerElement);
    document.body.appendChild(cardElement);
  }

  return {
    renderCard
  };
});