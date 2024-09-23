import data from '../data/data';
import Column from './Column';
import dnd from './dnd';
import { readData, writeData } from './localStorage';

const desk = document.querySelector('.desk');
let startData;

const storageData = readData();

if (storageData) {
  startData = storageData;
} else {
  startData = data;
}

for (const [key, value] of Object.entries(startData)) {
  const column = new Column(desk, key, value);
  column.addMarkup();
  column.listeners();
}

dnd();

window.addEventListener('beforeunload', () => {
  writeData();
});
