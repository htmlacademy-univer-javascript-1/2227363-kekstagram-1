import {getRandomPositiveInteger} from './util.js';

function generateObjects() {

  const MESSAGES = [
   'Всё отлично!',
   'В целом всё неплохо. Но не всё.',
   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

   const NICKNAMES = [
    "Harry","Ross",
    "Bruce","Cook",
    "Carolyn","Morgan",
    "Albert","Walker",
    "Larry","Barnes",
    "Lois","Wilson",
    "Jesse","Campbell",
    "Ernest","Rogers",
    "Theresa","Patterson",
    "Henry","Simmons",
    "Michelle","Perry",
    "Frank","Butler",
    "Shirley"];

  let objects = [];

  for (let id = 1; id <= 25; id++) {
    let url = "photos/" + id + ".jpg";
    let description = "This is a great photo with id = " + id;
    let likes = getRandomPositiveInteger(15, 200);
    let comments = []
    let usedCommentIDs = []

    for (let comment = 0; comment < getRandomPositiveInteger(1, 15); comment++) {

      let newID = getRandomPositiveInteger(1, 10000);
      while (newID in usedCommentIDs) {
        newID = getRandomPositiveInteger(1, 10000);
      }
      usedCommentIDs.push(newID);

      comments.push({
          id: newID,
          avatar: 'img/avatar-' + getRandomPositiveInteger(1, 6) +'.svg',
          message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length-1)],
          name: NICKNAMES[getRandomPositiveInteger(0, NICKNAMES.length-1)],
        }
      );
    }

    let newObj = {
      id: id,
      url: url,
      description: description,
      likes: likes,
      comments: comments,
    }
    objects.push(newObj)
  }
  return objects;
}


export const pictureObjects = generateObjects();


export const EFFECTS = {
  'sepia': {
    'noui': {
      range: {
        'min': 0,
        'max': 1,
      },
      step: 0.1,
      format: {
        from: (value) => parseFloat(value).toFixed(1),
        to: (value) => value,
      },
      start: 1
    },
    filter: (value) => `sepia(${value})`
  },

  'chrome': {
    'noui': {
      range: {
        'min': 0,
        'max': 1,
      },
      step: 0.1,
      format: {
        from: (value) => parseFloat(value).toFixed(1),
        to: (value) => value,
      },
      start: 1
    },
    filter: (value) => `grayscale(${value})`
  },

  'marvin': {
    'noui': {
      range: {
        'min': 0,
        'max': 100,
      },
      step: 1,
      format: {
        from: (value) => parseInt(value, 10),
        to: (value) => value,
      },
      start: 100
    },
    filter: (value) => `invert(${value}%)`
  },

  'phobos': {
    'noui': {
      range: {
        'min': 0,
        'max': 3,
      },
      step: 0.1,
      format: {
        from: (value) => parseFloat(value).toFixed(1),
        to: (value) => value,
      },
      start: 3
    },
    filter: (value) => `blur(${value}px)`
  },

  'heat': {
    'noui': {
      range: {
        'min': 1,
        'max': 3,
      },
      step: 0.1,
      format: {
        from: (value) => parseFloat(value).toFixed(1),
        to: (value) => value,
      },
      start: 3
    },
    filter: (value) => `brightness(${value})`
  },
};

export const PUCTURE_FORMATS = [ 'jpg', 'jpeg', 'png','gif'];
