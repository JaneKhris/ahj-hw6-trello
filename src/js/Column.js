import AddCard from "./AddCard";
import AddCardForm from "./AddCardForm";
import Card from "./Card";

export default class Column {
  constructor(parent, name, array) {
    this.parent = parent;
    this.name = name;
    this.cardsArray = array;
    this.column = undefined;
  }

  addMarkup() {
    this.column = document.createElement("div");
    this.column.className = "column";
    this.column.innerHTML = `
    <h3 class="column-title">${this.name}</h3>
    <div class="card-container"></div>
    `;


    this.cardsArray.forEach((el) => {
      const card = new Card(this.column.querySelector('.card-container'), el)
      const cardHtml = card.getHtmlElement();
      card.bindToDOM()
    });

    const add = new AddCard(this.column);
    this.column.appendChild(add.getHtmlElement());
    
    this.parent.appendChild(this.column);
  }

  addCard(text) {
    this.cardsArray.push(text)
    const newCard = new Card(this.column, text)
    const newCardHtml = newCard.getHtmlElement()
    newCard.listeners()
    newCardHtml.querySelector(".delete-card").addEventListener('click',(evt) => this.onDelete(evt))
    this.column.querySelector('.add-card').before(newCardHtml)

  }

  onDelete(evt) {
    const card = evt.target.parentElement;
    const text = card.querySelector('.card-text').textContent
    card.remove();
    this.cardsArray = this.cardsArray.filter((card)=> card != text)
    console.log(this.cardsArray)
  }

  onSubmit(evt) {
    evt.preventDefault()            
    this.column.querySelector('.add-card').className = 'add-card'
    this.addCard(evt.target.card.value)
    console.log(evt.target.card)
    evt.target.remove()
  }

  onAddForm(evt) {
    const card = evt.target;
          card.className = "add-card nd";
          console.log(evt.target)

          const parent = card.closest('.column')
          console.log(parent)
          const form = new AddCardForm(this.column);

          form.addMarkup();
          form.listeners();

          const forms = this.column.querySelectorAll('form')
          console.log(forms)
          forms.forEach((el) => {
            el.addEventListener('submit', (evt) => this.onSubmit(evt))
          })
    
  }

  listeners() {
    const del = this.column.querySelectorAll(".delete-card");
    console.log(del)
    del.forEach((el) => {
      el.addEventListener("click", (evt) => this.onDelete(evt));
    });

    const addForm = this.column.querySelectorAll(".add-card");
    console.log(addForm)
    addForm.forEach((el) => {
        el.addEventListener("click", (evt) => this.onAddForm(evt))         
      });
  }
}
