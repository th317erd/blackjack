ktExport('main.js', ({ Game, Card, renderCard }) => {
  console.log('KingTut: ', Game);

  // First argument is type, can be one of:
  // diamond, heart, club, or spade
<<<<<<< HEAD
  renderCard('spade', Card.SUITS[10]);
=======
  renderCard('spade', Card.SUITS[0]);
>>>>>>> b96e9bb80c7390f46ad3a0a98fd2b3c5b59e3cc2

  // Empty exports (don't export anything)
  // An empty object is needed
  // Because "nothing" (undefined)
  // would throw an exception
  return {};
});
