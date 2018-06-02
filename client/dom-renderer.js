const dust = require('dustjs'),
      cardTemplate = require('./templates/card'),
      { Card } = require('./card');

class DOMRenderer {
  constructor(rootElementID) {
    var rootElement = this.rootElement = document.getElementById(rootElementID);
    if (!rootElement)
      throw new Error(`Unable to find root element: ${rootElementID}`);
  }

  renderDustTemplate(template, data) {
    dust.render(template, data, function(err, output) {
      // If there is an error, reject the promise and stop
      if (err) {
        reject(err);
        return;
      }

      // Otherwise we have a valid rendered template, so create our div and return it
      var element = document.createElement('div');
      element.innerHTML = output;

      return element.children[0];
    });
  }

  async renderCard(value, suit) {
    var cardElement = await this.renderDustTemplate(cardTemplate, Object.assign({
      'suit': suit,
      'suit-font': 'font-suits1'
    }, Card.CARDS[value]));

    element.setAttribute('class', 'card');

    return element;
  }

  update(game) {

  }

  onEventHitRequested() {
    if (this.checkPlayIsValid({ name: 'hit', player: 1 })) {
      var actionName = 'action' + capitalize(action.name);
      this[actionName](this.getPlayer(playerID));
    }
  }
}

module.exports = {
  DOMRenderer
};
