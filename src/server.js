const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');

app.use(cors());

const server = require('http').Server(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
  socket.on('connectRoom', box => {
    socket.join(box)
  })
})

mongoose.connect('mongodb+srv://genitom:69588878@cluster0-gx7qk.mongodb.net/omnistack?retryWrites=true',{
  useNewUrlParser: true
})
// app.get('/teste', (req, res) => { // todos os (req, res) é um middleware, middleware é um interceptador.
//   return res.send('Hello word!!!')
// })
app.use((req,res,next) => {
  req.io = io;
  return next();
});
app.use(express.json())  // app.use é para cadastrar um modulo dentro do express, express.json() ajuda a entender as req em formato json
app.use(express.urlencoded({ extended: true })); // Ele permite que agente envie arquivos em nossas req.
app.use('/files', express.static(path.resolve(__dirname, "..", "tmp")));
app.use(require('./routes'))

app.listen(process.env.PORT || 3339)