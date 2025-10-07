export const cart = [] ;

export function addToCart(productId) {

  let matchingItem ; // undefined 
      cart.forEach( (item) => {
        
        if (productId === item.productId) {
          matchingItem = item

        }
      }) ;

      if (matchingItem) {
        matchingItem.quantity += 1 ; 
      } else {

      cart.push( {
        productId : productId,
        quantity : 1
      });

      }
}