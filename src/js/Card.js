/* eslint class-methods-use-this: ["error", { "exceptMethods": ["onDelete"] }] */

export default class Card {
  constructor(parent, text) {
    this.parent = parent;
    this.text = text;
    this.card = undefined;
    this.onDelete = this.onDelete.bind(this);
  }

  getHtmlElement() {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `            
        <div class="card-text">${this.text}</div>
        <div class="delete-card">✖</div>
        `;
    this.card = card;

    return card;
  }

  bindToDOM() {
    this.parent.appendChild(this.getHtmlElement());
    // const cardsDel = this.card.querySelector('.delete-card');
    this.listeners();
  }

  onDelete(evt) {
    const card = evt.target.parentElement;
    card.remove();
  }

  listeners() {
    this.card.addEventListener('mouseover', () => {
      this.card.querySelector('.delete-card').classList.add('visible');
    });

    this.card.addEventListener('mouseout', () => {
      this.card.querySelector('.delete-card').classList.remove('visible');
    });
  }
}
