export default class Card {
    constructor(parent,text) {
        this.parent = parent
        this.text = text
        this.card = undefined
        this.onDelete = this.onDelete.bind(this)

    }

    // static get markup

    getHtmlElement() {
        const card = document.createElement('div');
        card.className = 'card'
        card.innerHTML = `            
        <div class="card-text">${this.text}</div>
        <div class="delete-card">✖</div>
        `
        this.card = card

        return card
    }

    bindToDOM() {
        this.parent.appendChild(this.getHtmlElement())
        const del = this.card.querySelector('.delete-card');
        this.listeners()
      }

      onDelete(evt) {
        const card = evt.target.parentElement;
        const text = card.querySelector('.card-text').textContent
        card.remove();
        console.log(this.parent)
      }


    listeners() {
        this.card.addEventListener('mouseover',()=>{
            this.card.querySelector('.delete-card').classList.add('visible')  
        })

        this.card.addEventListener('mouseout',()=>{
            this.card.querySelector('.delete-card').classList.remove('visible') 
        })

        


    }






    
}