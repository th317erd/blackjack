class Base {
  constructor() {
    Object.defineProperty(this, '_class', {
      enumerable: true,
      configurable: true,
      get: () => (this.constructor.displayName || this.constructor.name),
      set: () => {}
    });
  }
}

module.exports = {
  Base
};
