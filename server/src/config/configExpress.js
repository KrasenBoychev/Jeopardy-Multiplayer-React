const express = require('express');
const { session } = require('../middlewares/session');
const { cors } = require('../middlewares/cors');

function configExpress(app) {  
  console.log('App listen at port 5000');
  
  app.use(cors());
  app.use(session());
  app.use(express.json());

  app.get('/', (req, resp) => {
    resp.send('App is Working');
    // You can check backend is working or not by
    // entering http://loacalhost:5000

    // If you see App is working means
    // backend working properly
  });
}

module.exports = { configExpress };
