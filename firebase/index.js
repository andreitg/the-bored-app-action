/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

'use strict'

const { dialogflow } = require('actions-on-google');
const functions = require('firebase-functions');

const app = dialogflow({ debug:true });


app.intent('Bored Intent', conv => {
  const fetch = require("node-fetch");
  return fetch('https://www.boredapi.com/api/activity/').then(response => {
       return response.json();
     }).then(data => {
    	return conv.close(data.activity);
     }).catch(err => {
          return conv.close('Error');
     });
  
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

//Función demo original al crear Cloud Function
/*exports.dialogflowFirebaseFulfillment = (req, res) => {
  let message = req.query.message || req.body.message || 'Hello World!';
  res.status(200).send(message);
};*/