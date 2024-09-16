export default function dnd() {
  let draggedEl = null;
  let ghostEl = null;
  let deltaX = 0;
  let deltaY = 0;
  let widthEl = 0;
  let heightEl = 0;
  let column = null;
  let element = null;

  const itemsEl = document.querySelector('.desk');

  const insertElement = (placeEl, refEl, evt) => {
    if (column.contains(refEl)) {
      const clientRect = refEl.getBoundingClientRect();

      if (evt.pageY < clientRect.top + clientRect.height / 2) {
        column.insertBefore(placeEl, refEl);
      } else if (!refEl.nextSibling) {
        column.appendChild(placeEl);
      } else {
        column.insertBefore(placeEl, refEl.nextSibling);
      }
    }
  };

  const onMouseDown = (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('card')) {
      draggedEl = evt.target;
    } else if (evt.target.classList.contains('card-text')) {
      draggedEl = evt.target.closest('.card');
    } else return;

    ghostEl = draggedEl.cloneNode(true);

    ghostEl.classList.add('dragged');
    const clientRect = draggedEl.getBoundingClientRect();
    deltaX = evt.clientX - clientRect.left;
    deltaY = evt.clientY - clientRect.top;
    widthEl = clientRect.width;
    heightEl = clientRect.height;

    draggedEl.classList.add('selected');

    document.body.appendChild(ghostEl);

    ghostEl.style.width = `${widthEl}px`;
    ghostEl.style.height = `${heightEl}px`;

    ghostEl.style.top = `${clientRect.top}px`;
    ghostEl.style.left = `${clientRect.left}px`;
  };

  const clearDragged = () => {
    document.body.removeChild(ghostEl);
    ghostEl = null;
    draggedEl.classList.remove('selected');
    draggedEl = null;
  };

  const onMouseLeave = () => {
    if (!draggedEl) {
      return;
    }
    clearDragged();
  };

  const onMouseUp = (evt) => {
    if (!draggedEl) {
      return;
    }
    if (document.querySelector('.empty')) {
      document.querySelector('.empty').remove();
    }

    insertElement(draggedEl, element, evt);
    draggedEl.classList.remove('selected');

    clearDragged();
  };

  const onMouseMove = (evt) => {
    evt.preventDefault();
    if (!draggedEl) {
      return;
    }
    if (document.querySelector('.empty')) {
      document.querySelector('.empty').remove();
    }

    if (!evt.target.classList.contains('column-title')
    && !evt.target.classList.contains('column')
    && !evt.target.classList.contains('add-card')
    && !evt.target.classList.contains('desk')) {
      const closest = document.elementFromPoint(evt.clientX, evt.clientY);
      if (closest.classList.contains('card-text') || closest.classList.contains('delete-card')) {
        element = closest.closest('.card');
      } else if (closest.classList.contains('card-text')) {
        element = closest;
      } else {
        return;
      }
      if (evt.target.classList.contains('card-container')) {
        column = evt.target;
      } else {
        column = closest.closest('.card-container');
      }

      const place = document.createElement('div');
      place.className = 'empty';

      place.style.width = `${widthEl}px`;
      place.style.height = `${heightEl}px`;

      insertElement(place, element, evt);
    }

    ghostEl.style.left = `${evt.pageX - deltaX}px`;
    ghostEl.style.top = `${evt.pageY - deltaY}px`;
  };

  itemsEl.addEventListener('mousedown', onMouseDown);
  itemsEl.addEventListener('mouseleave', onMouseLeave);
  itemsEl.addEventListener('mouseup', onMouseUp);
  itemsEl.addEventListener('mousemove', onMouseMove);
}
