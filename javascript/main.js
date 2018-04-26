ktExport('main.js', ({ Game, Card, renderCard }) => {
  console.log('KingTut: ', Game);

  // First argument is type, can be one of:
  // diamond, heart, club, or spade
  renderCard('diamond', Card.SUITS[1]);

  // Empty exports (don't export anything)
  // An empty object is needed
  // Because "nothing" (undefined)
  // would throw an exception
  return {};
});
