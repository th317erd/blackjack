(function(root) {
  // When you call the ktExport function you pass a "name" and a "func" arguemnts
  function ktExport(name, func) {
    // Call our export "module" helper function
    // The result will be our exported object
    var exported = func(root);

    // Throw an error if no exported object was returned
    if (!exported)
      throw new Error(`${name} didn't export an object`);

    // Merge our new exports into our root scope
    Object.assign(root, exported);
  }

  // Assign our ktExport function to the window so it can be accessed anywhere any everywhere
  window.ktExport = ktExport;

  // Also export it in our scope
  // Object.assign merges object (into the first argument, root)
  Object.assign(root, {
    ktExport
  });
})
// Call out anonymous function passing it the scope
// if the scope exists, otherwise create the scope and assign it to window.KingTut.
// The result of creating the scope and assigning it to window.KingTut
// will be the scope, so it will be passed to as the argument as well
((window.KingTut) ? window.KingTut : (window.KingTut = {}));
