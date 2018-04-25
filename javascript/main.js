ktExport('main.js', ({ Game, Card, renderCard }) => {
  console.log('KingTut: ', Game);

  renderCard(Card.SUITS[1]);

  // Empty exports (don't export anything)
  // An empty object is needed
  // Because "nothing" (undefined)
  // would throw an exception
  return {};
});
