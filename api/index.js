const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./src/routes/index');

const app = express();
const port = process.env.PORT || 3001

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', routes);

app.listen(port, () => {
    console.log(`\nServer listening on port ${port}`)
})