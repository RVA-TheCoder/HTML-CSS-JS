// variables are reset when we refresh the page or go from one page to another
// Therefore, we need to use the localStorage to use the actual value of the cart between different page reloads and website refresh

// when we run the code for the first time, it will return the null object

// This file demonstrate the OOP class version of 'cart.js' file


/*
For testing purposes : 

localStorageKey = cart-oop
localStorageKey = cart-business
*/

class Cart {

  // Properties or fields
  // Public property
  cartItems = undefined ;   // another way : cartItems ;
  // private property
  #localStorageKey = undefined ;   // another way : #localStorageKey ;

  // Constructor
  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey ;
  }



  // Inside a JS class, we never use the 'function' keyword when defining methods.
  loadFromStorage() {

  this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) ;

  if (!this.cartItems) {
      this.cartItems = [
              {
                productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity : 2,
                deliveryOptionId : '1'
              },
              {
                productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity : 1,
                deliveryOptionId : '2'
              }
            ]  ; 
  }
  } 

  // Whenever we update the cart, we need to save it to localStorage
  saveToStorage () {

    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems) ) ;

  } 

  addToCart(productId) {

  let matchingItem ; // undefined 

  this.cartItems.forEach( (item) => {
    
    if (productId === item.productId) {
      matchingItem = item

    }

  }) ;

  if (matchingItem) {
    matchingItem.quantity += 1 ; 
  } 
  else {

    this.cartItems.push( {
      productId : productId,
      quantity : 1,
      deliveryOptionId: '1'
    });

  }

  this.saveToStorage() ;

  } 

  removeFromCart(productId) {

  const newCart = [] ;

  this.cartItems.forEach( (cartItem) => {

    if (cartItem.productId !== productId) {
      newCart.push(cartItem)
    } 

  }) ;

  this.cartItems = newCart ; // make to change the cart form const to let before doing re-assignment.

  this.saveToStorage() ;

  }

  updateDeliveryOption(productId, deliveryOptionId) {

  let matchingItem ;

  this.cartItems.forEach( (cartItem) => { 

    if (productId === cartItem.productId) {
      matchingItem = cartItem ;
    }

  }) ;

  matchingItem.deliveryOptionId = deliveryOptionId ;

  this.saveToStorage() ; 

  }



}



const cartSimple = new Cart('cart-oop') ; 
const cartBusiness = new Cart('cart-business') ; 

cartSimple.loadFromStorage() ;   // we put this code in the cosntructor itself, so that everytime we create the instance of the class, this code will be run
cartBusiness.loadFromStorage() ; // we can put this code in the constructor itself, so that everytime we create the instance of the class, this code will be run


console.log(cartSimple) ; 
console.log(cartBusiness) ; 

console.log(cartSimple instanceof Cart) ;















