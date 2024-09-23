export default function dnd() {
  let selectedEl = null;
  let draggedEl = null;
  let ghostEl = null;
  let deltaX = 0;
  let deltaY = 0;
  let widthEl = 0;
  let heightEl = 0;
  let container = null;
  let element = null;

  const itemsEl = document.querySelector('.desk');

  const insertElement = (placeEl, refEl, evt) => {
    if (container.contains(refEl)) {
      const clientRect = refEl.getBoundingClientRect();

      if (evt.pageY < clientRect.top + clientRect.height / 2) {
        container.insertBefore(placeEl, refEl);
      } else if (!refEl.nextSibling) {
        container.appendChild(placeEl);
      } else {
        container.insertBefore(placeEl, refEl.nextSibling);
      }
    } else {
      container.appendChild(placeEl);
    }
  };

  const onMouseDown = (evt) => {
    if (evt.target.classList.contains('card')) {
      selectedEl = evt.target;
    } else if (evt.target.classList.contains('card-text')) {
      selectedEl = evt.target.closest('.card');
    } else return;

    const clientRect = selectedEl.getBoundingClientRect();
    deltaX = evt.pageX - clientRect.left;
    deltaY = evt.pageY - clientRect.top;
    widthEl = clientRect.width;
    heightEl = clientRect.height;

    draggedEl = selectedEl.cloneNode(true);
    draggedEl.style.width = `${widthEl - 20}px`;
    draggedEl.style.height = `${heightEl - 20}px`;
    selectedEl.closest('.card-container').insertBefore(draggedEl, selectedEl);
    selectedEl.classList.add('selected');

    itemsEl.classList.add('grabbing');
  };

  const clearDragged = () => {
    if (ghostEl) {
      ghostEl = null;
    }
    draggedEl = null;
    selectedEl = null;
    itemsEl.classList.remove('grabbing');
  };

  const onMouseUp = () => {
    if (!draggedEl) {
      return;
    }
    if (ghostEl) {
      draggedEl.classList.remove('dragged');

      draggedEl.style = null;
      container.insertBefore(draggedEl, ghostEl);
      ghostEl.remove();
      selectedEl.remove();
    } else {
      draggedEl.remove();
      selectedEl.classList.remove('selected');
    }
    clearDragged();
  };

  const onMouseMove = (evt) => {
    evt.preventDefault();
    if (!draggedEl) {
      return;
    }
    if (!draggedEl.classList.contains('dragged')) {
      draggedEl.classList.add('dragged');
    }

    draggedEl.style.left = `${evt.pageX - deltaX}px`;
    draggedEl.style.top = `${evt.pageY - deltaY}px`;

    if (evt.target.classList.contains('card')) {
      element = evt.target;
      container = element.parentElement;
    } else if (evt.target.classList.contains('card-title')) {
      element = evt.target.closest('.card');
      container = element.parentElement;
    } else if (evt.target.classList.contains('add-card')) {
      element = evt.target;
      container = element.parentElement.querySelector('.card-container');
    } else {
      return;
    }

    if (element) {
      if (!ghostEl) {
        ghostEl = document.createElement('div');
        ghostEl.className = 'empty';

        ghostEl.style.width = `${widthEl}px`;
        ghostEl.style.height = `${heightEl}px`;

        insertElement(ghostEl, element, evt);
      } else {
        ghostEl.remove();
        ghostEl = null;
      }
    }
  };

  itemsEl.addEventListener('mousedown', onMouseDown);
  itemsEl.addEventListener('mouseup', onMouseUp);
  itemsEl.addEventListener('mousemove', onMouseMove);
}
