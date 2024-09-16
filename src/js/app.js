import { data } from "../data/data.js";
import Column from "./Column.js";
import dnd from "./dnd.js";
import { readData, writeData } from "./localStorage.js";

const desk = document.querySelector(".desk");
let startData;


const storageData = readData()

if(storageData) {
  startData = storageData
  console.log('sss')
} else {

  startData = data;
  console.log('aaaa')
}

for (const [key, value] of Object.entries(startData)) {
  const column = new Column(desk, key, value);
  column.addMarkup();
  column.listeners();
}

dnd()

window.addEventListener('beforeunload', (evt) => {
  evt.preventDefault();
  
  writeData()
})





