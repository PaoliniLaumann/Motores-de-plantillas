const express = require('express');
const { Router } = express;
const multer = require('multer');
const app = express();
const router = require('./router/productsRouter');

const { itemsValidate } = require('./utils/validations');
const port = process.env.PORT || 8080;
const Contenedor = require('./container/container');

const data = new Contenedor();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', './views');

app.listen(port, () => {
  console.log(`Servidor app escuchando en el puerto http://localhost:${port}/index`);
});

app.use('/api/products', router);

app.use('/public', express.static(__dirname + '/public'));



app.get('/products', async (req, res) => {
  const products = await data.getAll()
  res.render('products.pug', { products, productsExist: true });
});

app.get("/index", (req, res) => {
  res.render("index.pug");
});

app.post('/', async (req, res) => {
  const { body } = req;
  try {
    data.save(body);    
  } catch {
    res.json({ error: true, msj: "No se pudo guardar el producto" });
  }
});
