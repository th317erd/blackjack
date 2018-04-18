(function(root) {
  fucntion ktExport(..args) {
    var exported = func(root);
    if (!exported)
    throw new Error(`${name} didn't export an object`);

    Object.assign(root, exported);
  }

  window.ktExport = ktExport;
  Object.assign(root, {
    ktExport
  });
});

/*
call out anonymous function passing it the scope
if the scope exists, otherwise create the scope and assign it the window.KingTutthe 
*/

((window.KingTut) ? window.KingTut : (window.KingTut = {}));
