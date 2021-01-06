require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const postRoutes = require('./routes/posts');

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);

app.get("/", (req, res) => {
    res.send('Hello to Memories API')
})

const port = process.env.PORT || 5000

mongoose.connect(process.env.CONN_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => app.listen(port, () => console.log(`Server running on port: ${port}`)))
.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);