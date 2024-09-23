export default class AddCardForm {
  constructor(parent) {
    this.parent = parent;
    this.form = undefined;
  }

  addMarkup() {
    this.form = document.createElement('form');
    this.form.className = 'form-add';
    this.form.innerHTML = `
        <input class="input-name" name="card" type="text" placeholder="New card" required>
        <button>Add</button>
        <div class="close-form">x</div>
        `;

    this.parent.appendChild(this.form);
  }

  listeners() {
    const close = this.form.querySelector('.close-form');
    close.addEventListener('click', () => {
      this.form.remove();
      this.parent.querySelector('.add-card').className = 'add-card';
    });
  }
}
