
export function activatePictures(pictures) {
  pictures.forEach((object) => drawSmallPicture(object));
  prepareBigPicture();
}


function drawSmallPicture(object) {

  let newObject = document.querySelector('#picture').cloneNode(true).content;

  newObject.querySelector('.picture__img').setAttribute('src', object.url);
  newObject.querySelector('.picture__likes').textContent = object.likes;
  newObject.querySelector('.picture__comments').textContent = object.comments.length;


  newObject.querySelector('.picture').addEventListener('click', (evt) => {
    evt.preventDefault();

    drawBigPicture(object);
  });

  document.querySelector('.pictures').append(newObject);

}


function prepareBigPicture() {
  let bigPicture = document.querySelector('.big-picture');


  bigPicture.querySelector('#picture-cancel').addEventListener('click', (evt) => {
    evt.preventDefault();


    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  });

    document.addEventListener('keydown', function(event){
      if(event.key === "Escape") {
        bigPicture.classList.add('hidden');
        document.querySelector('body').classList.remove('modal-open');
      }
    });

}


function drawBigPicture(object) {
  document.querySelector('body').classList.add('modal-open');

  let bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img').querySelector('img').setAttribute('src', object.url);
  bigPicture.querySelector('.big-picture__img').querySelector('img').setAttribute('alt', object.description);
  bigPicture.querySelector('.social__caption').textContent = object.description;
  bigPicture.querySelector('.likes-count').textContent = object.likes;
  bigPicture.querySelector('.comments-count').textContent = object.comments.length;



  let socialComments = bigPicture.querySelector('.social__comments');
  let commentLoader =  bigPicture.querySelector(".social__comments-loader");
  commentLoader.classList.remove('hidden');


  socialComments.querySelectorAll('.social__comment').forEach((oldComment) => oldComment.remove());

  let allComments = [];

  object.comments.forEach((comment) => {
    let listItem = document.createElement('li');
    listItem.classList.add('social__comment');

    let commentImage = document.createElement('img');
    commentImage.setAttribute('class', 'social__picture');
    commentImage.setAttribute('src', comment.avatar);
    commentImage.setAttribute('alt', comment.name);
    commentImage.setAttribute('width', 35);
    commentImage.setAttribute('heigth', 35);


    let commentText = document.createElement('p');
    commentText.setAttribute('class', 'social__text');
    commentText.textContent = comment.message;

    listItem.append(commentImage);
    listItem.append(commentText);

    allComments.push(listItem);
  });

  let commentIndex = 0;

  while (commentIndex < 5 && commentIndex < allComments.length) {
    socialComments.append(allComments[commentIndex]);
    commentIndex++;
  }

  if (commentIndex >= allComments.length) {
    commentLoader.classList.add('hidden');
  }

  bigPicture.querySelector(".current-comments-count").textContent = commentIndex;

  commentLoader.addEventListener('click', function addComments (evt) {
    console.log(commentIndex);
    let comentBorder = commentIndex + 5;
    while (commentIndex < comentBorder && commentIndex < allComments.length) {
      socialComments.append(allComments[commentIndex]);
      commentIndex++;
    }

    if (commentIndex >= allComments.length) {
      commentLoader.classList.add('hidden');
      commentLoader.removeEventListener('click', addComments);
    }

    bigPicture.querySelector(".current-comments-count").textContent = commentIndex;
  });
}12331