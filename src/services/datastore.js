import Firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDOv9xzWOwwerbiiaaeTWfsWmDsQ3JHQpk',
  authDomain: 'lab3-react-notes-4cbc7.firebaseapp.com',
  databaseURL: 'https://lab3-react-notes-4cbc7.firebaseio.com',
  projectId: 'lab3-react-notes-4cbc7',
  storageBucket: 'lab3-react-notes-4cbc7.appspot.com',
  messagingSenderId: '371331101902',
};

Firebase.initializeApp(config);

const database = Firebase.database();

// used this Medium article to better understand callbacks: https://medium.com/@thejasonfile/callback-functions-in-react-e822ebede766
function fetchNotes(callback) {
  database.ref('notes').on('value', (snapshot) => {
    const dbNotes = snapshot.val();
    callback(dbNotes);
  });
}

// set state for notes
// used this resource to learn how to generate random numbers in JavaScript:
// https://www.freecodecamp.org/challenges/generate-random-whole-numbers-with-javascript
function newNote(noteTitle, name) {
  database.ref('notes').push().set({
    title: noteTitle,
    content: '',
    author: name,
    x: Math.floor(Math.random() * 1400),
    y: Math.floor(Math.random() * 700),
    zIndex: Math.floor(Math.random() * 100),
    // generating random pastel colors was done with this StackOverflow post: https://stackoverflow.com/questions/43193341/how-to-generate-random-pastel-or-brighter-color-in-javascript
    backgroundColor: `hsl(${360 * Math.random()},${25 + (70 * Math.random())}%,${85 + (10 * Math.random())}%)`,
  });
}

function deleteNote(id) {
  database.ref('notes').child(id).remove();
}

function updateTitle(id, newTitle) {
  database.ref('notes').child(id).update({ title: newTitle });
}

function updateContent(id, newContent) {
  database.ref('notes').child(id).update({ content: newContent });
}

function updateXY(id, newX, newY) {
  database.ref('notes').child(id).update({ x: newX, y: newY });
}

function deleteAll() {
  database.ref('notes').remove();
}

export const provider = new Firebase.auth.GoogleAuthProvider();
export const auth = Firebase.auth();
export { fetchNotes, newNote, deleteNote, updateTitle, updateContent, updateXY, deleteAll };
