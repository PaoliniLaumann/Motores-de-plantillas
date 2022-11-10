const fs = require("fs");

class Container {
  constructor() {
    this.db = [];
    this.readJson = JSON.parse(fs.readFileSync("./api/products.json", "utf-8"));
  }

  saveFile(object) {
    const data = {
      name: object?.name,
      thumbnail: object?.thumbnail,
      price: object?.price,
      id: this.readJson.length + 1,
    };

    this.db.push(...this.readJson, data);

    try {
      fs.writeFile("./api/products.json", JSON.stringify(this.db), () =>
        console.log("Done")
      );
    } catch (e) {
      console.log(e);
    }

    console.log(`El id asignado es ${data.id}`);
  }

  getById(myId) {
    console.log(typeof myId);
    this.readJson === "" ? console.log("No hay nada") : "";

    const matchId = this.readJson.find((product) => product.id === myId);
    /* matchId == undefined ? console.log("No existe.") : console.log(matchId); */
    return matchId === undefined ? "This id isnt in the db" : matchId;
  }

  deleteById(myId) {
    const matchId = this.readJson.filter((product) => product.id != myId);
    this.db.push(...matchId);
    console.log(this.db);

    try {
      fs.writeFile("./api/products.json", JSON.stringify(this.db), () =>
        console.log("Deleted!")
      );
    } catch (error) {
      console.log(
        "🚀 ~ file: challenge.js ~ line 45 ~ Container ~ deleteById ~ error",
        error
      );
    }
  }

  deleteAll() {
    fs.writeFileSync("./api/products.json", JSON.stringify(this.db));
  }

  getAll() {
    return this.readJson;
  }

  updateById = async (id, name, price, thumbnail) => {
    try {
      const products = await this.getAll();
      const item = products.find((prod) => prod.id === Number(id));
      if (item) {
        item.name = name;
        item.price = price;
        item.thumbnail = thumbnail;
        console.log(item);
        console.log(products);
        await fs.promises.writeFile(
          "./api/products.json",
          JSON.stringify(products, item)
        );
        return item;
      } else {
        return { error: "Product not found" };
      }
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = Container;
