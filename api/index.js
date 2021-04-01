const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./src/routes/index');

const app = express();
const port = process.env.PORT || 8080

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
    console.log(`\nServer listening on port ${port}`)
})