export default class Cart {

  listCart: any[]
  totalOrder: number
  constructor() {
    this.listCart = []
    this.totalOrder = 0
    this.loadCart()
  }


  addItem(item: any, amount: number) {
    const exist = this.listCart.find(cartItem => cartItem.item.id === item.id);

    if (exist) {
      exist.amount += amount
    } else {
      this.listCart.push({ item, amount })
    }
    this.saveCart()
    this.loadCart()
  }

  removeItem(id: number) {
    const index = this.listCart.findIndex(cartItem => cartItem.item.id === id);
    if (index !== -1) {
      this.listCart.splice(index, 1);
    }
    this.saveCart()
    this.loadCart()
  }

  removeUnit(id: number) {
    const index = this.listCart.findIndex(cartItem => cartItem.item.id === id);
    if (index !== -1) {
      if (this.listCart[index].amount === 1) {
        this.listCart.splice(index, 1)
      } else {
        this.listCart[index].amount--
      }

    }
    this.saveCart()
    this.loadCart()
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.listCart));
  }

  loadCart() {
    const data = localStorage.getItem("cart")
    if (data) this.listCart = JSON.parse(data)
  }

  getData() {
    const cart = this.listCart.map(itemCart => {
      itemCart.item.total = itemCart.item.price * itemCart.amount
      return itemCart
    })

    this.totalOrder = this.listCart.reduce((accumulator, currentItem) => {
      const totalItem = currentItem.item.total;
      return accumulator + totalItem;
    }, 0);
    return cart
  }

  getTotalOrderFormatted() {
    const formatPrice = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    const order = this.totalOrder
    return formatPrice.format(order)
  }

  getItemCardNumber() {
    return this.listCart.length
  }

}