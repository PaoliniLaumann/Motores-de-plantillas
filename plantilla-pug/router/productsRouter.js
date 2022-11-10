const express = require("express");
const { Router } = express;
const routerProductos = Router();
const Contenedor = require("../container/container");

const data = new Contenedor();

routerProductos.get("/", async (req, res) => {
  const productos = await data.getAll();
  if (productos) {
    res.send(productos);
  } else {
    return console.log();
  }
});

routerProductos.get("/:id", async (req, res) => {
  const { id } = req.params;

  const product = await data.getById(Number(id));

  if (!product) {
    res.json({ error: true, msj: "id no encontrado" });
  } else {
    res.send({ success: true, product: product });
  }
});

routerProductos.post("/", async (req, res) => {
  const { body } = req;
  console.log(
    "🚀 ~ file: router.js ~ line 31 ~ routerProductos.post ~ body",
    body
  );
  try {
    data.saveFile(body);
    res.send({
      success: true,
      msj: `Producto guardado exitosamente: ${body.name}`,
    });
  } catch {
    res.json({ error: true, msj: "No se pudo guardar el producto" });
  }
});

routerProductos.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, thumbnail } = req.body;
    console.log(
      "🚀 ~ file: router.js ~ line 50 ~ routerProductos.put ~ req.body",
      req.body
    );
    await data.updateById(id, name, price, thumbnail);
    res.json({ succes: true });
  } catch (error) {
    res.json({ error: true, msj: "error" });
  }
});

routerProductos.delete("/:id?", (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      data.deleteById(id);
    } else {
      data.deleteAll();
    }
    return res.json({ success: true, msj: "Producto eliminado!" });
  } catch (error) {
    res.json({ error: true, msg: "no se pudo eliminar el producto" });
  }
});

module.exports = routerProductos;
