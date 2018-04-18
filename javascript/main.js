ktExport('main.js', ({ Game }) => {
  console.log('KingTut: ', Game);

  // Empty exports (don't export anything)
  // An empty object is needed
  // Because "nothing" (undefined)
  // would throw an exception
  return {};
});
