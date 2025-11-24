// variables are reset when we refresh the page or go from one page to another
// Therefore, we need to use the localStorage to use the actual value of the cart between different page reloads and website refresh

// when we run the code for the first time, it will return the null object

// This file demonstrate the OOP version of 'cart.js' file


/*
For testing purposes : 

localStorageKey = cart-oop
localStorageKey = cart-business
*/
function Cart(localStorageKey) {

  const cart = {

  cartItems : undefined ,

  loadFromStorage :  function() {

  this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) ;

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
  } ,

  // Whenever we update the cart, we need to save it to localStorage
  saveToStorage : function() {

    localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems) ) ;

  } ,


  addToCart : function(productId) {

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

  } ,

  removeFromCart : function(productId) {

  const newCart = [] ;

  this.cartItems.forEach( (cartItem) => {

    if (cartItem.productId !== productId) {
      newCart.push(cartItem)
    } 
  }) ;

  this.cartItems = newCart ; // make to change the cart form const to let before doing re-assignment.

  this.saveToStorage() ; 
  }, 

  updateDeliveryOption :  function(productId, deliveryOptionId) {

  let matchingItem ;

  this.cartItems.forEach( (cartItem) => { 

    if (productId === cartItem.productId) {
      matchingItem = cartItem ;
    }

  }) ;

  matchingItem.deliveryOptionId = deliveryOptionId ;

  this.saveToStorage() ; 

  }

  } ; 

  return cart ; 

}



const cartSimple = Cart('cart-oop') ; 
const cartBusiness = Cart('cart-business') ; 

cartSimple.loadFromStorage() ; 
cartBusiness.loadFromStorage() ; 


console.log(cartSimple) ; 
console.log(cartBusiness) ; 
















