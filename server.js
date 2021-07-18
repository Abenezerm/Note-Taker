//dependencies..
const express  = require('express');

//configure express...
const app = express();

//initial port to listen on later...
const PORT = process.env.PORT || 5000;

//Sets up express to handle data parsing...
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
//Points to the "routes" for the server...
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

//Listener to start server...
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
