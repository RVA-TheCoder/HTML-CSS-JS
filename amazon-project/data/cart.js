// variables are reset when we refresh the page or go from one page to another
// Therefore, we need to use the localStorage to use the actual value of the cart between different page reloads and website refresh

// when we run the code for the fisrt time, it will return the null object
export let cart = JSON.parse(localStorage.getItem('cart')) ;

if (!cart) {
    cart = [
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

// whenever we update th cart, we need to save it to localStorage
function saveToStorage() {

  localStorage.setItem('cart', JSON.stringify(cart) ) ;

}


export function addToCart(productId) {

  let matchingItem ; // undefined 

  cart.forEach( (item) => {
    
    if (productId === item.productId) {
      matchingItem = item

    }
  }) ;

  if (matchingItem) {
    matchingItem.quantity += 1 ; 
  } 
  else {

    cart.push( {
      productId : productId,
      quantity : 1,
      deliveryOptionId: '1'
    });

  }

  saveToStorage() ;
}



export function removeFromCart(productId) {

  const newCart = [] ;

  cart.forEach( (cartItem) => {

    if (cartItem.productId !== productId) {
      newCart.push(cartItem)
    } 
  }) ;

  cart = newCart ; // make to change the cart form const to let before doing re-assignment.

  saveToStorage() ; 
} 


export function updateDeliveryOption(productId, deliveryOptionId) {

  let matchingItem ;

  cart.forEach( (cartItem) => { 

    if (productId === cartItem.productId) {
      matchingItem = cartItem ;
    }

  }) ;

  matchingItem.deliveryOptionId = deliveryOptionId ;

  saveToStorage() ; 

}




