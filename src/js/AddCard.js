'<div class="card add-card">Add card</div>'
export default class AddCard {
    constructor(parent) {
        this.parent = parent
    }

    getHtmlElement() {
        const addCard = document.createElement('div');
        addCard.className = 'add-card';
        addCard.textContent = 'Add card'
        return addCard
    }
}