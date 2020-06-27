const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const subscriptions = require('./models/subscription')
const webPush = require('web-push')

require('./config/db')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

const triggerPushMsg = function(subscription, dataToSend) {
  return webPush.sendNotification(JSON.parse(subscription.subscription), dataToSend)
  .catch((err) => {
    if (err.statusCode === 404 || err.statusCode === 410) {
      console.log('Subscription has expired or is no longer valid: ', err);
      return subscriptions.findByIdAndDelete(subscription._id);
    } else {
      throw err;
    }
  });
};

app.post('/api/save-subscription', async (req, res) => {
  subscriptions.create({ subscription: JSON.stringify(req.body) })
    .then(resp => {
      res.setHeader('Content-Type', 'application/json');
      res.send({
        data: {
          success: true,
          id: resp._id
        }
      });
    })
    .catch(e => {
      res.status(500);
      res.setHeader('Content-Type', 'application/json');
      res.send({
        error: {
          id: 'unable-to-save-subscription',
          message: 'The subscription was received but we were unable to save it to our database.'
        }
      });
    })
})

app.post('/api/delete-subscription', async (req, res) => {
  subscriptions.findByIdAndDelete(req.body.id)
    .then(resp => {
      console.log(resp)
      res.setHeader('Content-Type', 'application/json');
      res.send({
        data: {
          success: true,
        }
      });
    })
    .catch(e => {
      res.status(500);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        error: {
          id: 'unable-to-delete-subscription',
          message: 'Unable to delete subscription.'
        }
      }));
    })
})

app.post('/api/trigger-push-notification', async (req, res) => {
  const vapidKeys = {
    publicKey: 'BBDrHKLJfxVxcNKygxQzENzEb4mUPsuZrffu0EV6Hg_jyU5oR7LdG4bcrjHq7aWA5v8emlZpTMOIG68Wy5s8ofY',
    privateKey: 'bK22-rLBe0ortsJ44q2HdB28TegnYMLoYkpKlOV0HfE'
  };
  
  webPush.setVapidDetails(
    'mailto:web-push-book@gauntface.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );

  subscriptions.findById(req.body.id)
    .then(subscription => {
      triggerPushMsg(subscription, JSON.stringify({
        title: 'Title',
        message: 'Message'
      }));

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ data: { success: true } }));
    })
    .catch(err => {
      res.status(500);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        error: {
          id: 'unable-to-trigger-notification',
          message: 'Unable to fetch subscriptions.'
        }
      }));
    })
})

app.listen(process.env.PORT || 3001, () => console.log(`App running...`))
