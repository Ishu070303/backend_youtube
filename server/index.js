const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;


const searchRouter = require('./routes/search');

// ROUTER
app.use('/', searchRouter);


// PORT
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});