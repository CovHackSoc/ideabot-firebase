const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.addIdea = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD');
  if (request.method === 'OPTIONS') {
    response.send('');
    return;
  }
  if (request.method === 'HEAD') {
    response.send('');
    return;
  }

  /* Check we got a POST */
  if (request.method !== 'POST') {
    response.status(400).send('Please send a POST request');
    return;
  }
  const { author, idea } = request.body;
  admin.database().ref('ideas').child('all').push({
    idea,
    author,
    score: 0,
    date: admin.database.ServerValue.TIMESTAMP,
  });

  response.send(`${author} - ${idea}`);
});
