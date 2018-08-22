class Base {
  constructor() {
    Object.defineProperty(this, '_class', {
      enumerable: true,
      configurable: true,
      get: () => (this.constructor.displayName || this.constructor.name),
      set: () => {}
    });
  }

  valueOf() {
    return JSON.parse(JSON.stringify(this));
  }
}

module.exports = {
  Base
};
