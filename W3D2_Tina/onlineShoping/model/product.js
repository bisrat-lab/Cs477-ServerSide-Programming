


let products = [];
class Product {
  constructor(id, title, price, info) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.info = info;
  }
  static getAll() {
    return products;
  }
  save() {
    this.id = Math.random().toString();
    products.push(this);
    return this;
  }
  update(){
      const index = products.findIndex(p=> p.id === this.id)
      if(index > -1){
          products.splice(index,1,this);
          return this;
      }else {
          throw new Error('Not Found')
      }
  }

  static getProductByID(productID) {
    return products.find((prod) => prod.id === productID);
  }

  static deleteById(productId){
      const index = products.findIndex(p=>p.id === productId);
      if(index > -1){
          products = products.filter(p=>p.id !== productId);
      }else {
        throw new Error('Not Found');
    }
  }
}
module.exports = Product;


