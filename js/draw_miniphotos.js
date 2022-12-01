import  {generateObjects}  from "./data.js";

function drawPicture(object) {

  let newObject = document.querySelector('#picture').cloneNode(true).content;

  newObject.querySelector('.picture__img').setAttribute('src', object.url);
  newObject.querySelector('.picture__likes').textContent = object.likes;
  newObject.querySelector('.picture__comments').textContent = object.comments.length;

  document.querySelector('.pictures').append(newObject);
}

export function drawPictures() {
  generateObjects().forEach((object) => drawPicture(object));
}

