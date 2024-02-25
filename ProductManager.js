import { promises as fs } from "fs";

class ProductManager {
  constructor() {
    this.path = "./productos.txt";
    this.products = [];
  }

  static id = 0;

  addProduct = async (title, description, price, thumbnail, code, stock) => {

    ProductManager.id++

    let newProduct = {
      id: ProductManager.id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    }

    this.products.push(newProduct);

    await fs.writeFile(this.path, JSON.stringify(this.products));
  };

  readProduct = async () => {

    let reading = await fs.readFile(this.path, "utf-8")
    return JSON.parse(reading)
  }

  getProduct = async () => {

    let anotherReading = await this.readProduct()
    return console.log(anotherReading)
  }

  getProductById = async (id) => {

    let anAdditionalReading = await this.readProduct()
    if (!anAdditionalReading.find(product => product.id === id)) {
      console.log("¡PRODUCTO NO ENCONTRADO!");
    } else {
      console.log(anAdditionalReading.find(product => product.id === id))
    }
  };

  deleteProductById = async (id) => {
    let anAdditionalReading = await this.readProduct();
    let deleteForId = anAdditionalReading.filter(products => products.id != id);
    await fs.writeFile(this.path, JSON.stringify(deleteForId));
    // console.log("Eliminé un producto de el archivo .txt")
  };

  updateProduct = async (id, ...product) =>  {
    await this.deleteProductById(id);

    let productId = await this.readProduct()
    let newProductAdded = [
      {id, ...product},
      ...product
    ];
    await fs.writeFile(this.path, JSON.stringify(deleteForId));
  
  }
}

const productCreated = new ProductManager();


// productCreated.addProduct("Remera", "Remera de algodón", 1000, "Remera.jpg", "R001", 25);
// productCreated.addProduct("Pantalón", "Pantalón de Jean", 2000, "Pantalón.jpg", "P001", 50);
// productCreated.addProduct("Campera", "Campera de cocuero", 3000, "Campera.jpg", "C001", 100);
// productCreated.getProduct();
// productCreated.getProductById(2); //Buscar por id existente
// productCreated.getProductById(8); //Buscar por id no existente (error!)

productCreated.deleteProductById(1); //Eliminar Producto por  ID

productCreated.updateProduct(
  {
    id: 2,
    title: 'Pantalón',
    description: 'Pantalón de joggins', //Cambia el material del pantalon
    price: 2000,
    thumbnail: 'Pantalón.jpg',
    code: 'P002',
    stock: 50
  }
); 