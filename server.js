const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/NoSQL_SocialNetworkAPI')
mongoose.set('debug', true);

app.listen(PORT, () =>
    console.log(`Running on port ${PORT}!`)
);
