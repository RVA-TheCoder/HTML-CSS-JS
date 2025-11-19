import {addToCart, cart, loadFromStorage} from '../../data/cart.js'




// describe : Groups related tests into one suite
// it : Defines a single test case.. Each it() block runs independently.

/*   
Why We Mock localStorage : 

Because in a test environment (like Node.js or Jasmine browser runner):

 - We don't want to mess with real browser data.

 - We want predictable, isolated behavior.

 - So mocking gives full control over input/output.

*/

describe('test suite : addToCart', () => {

  it('adds an existing product to the cart', () => {

    // A mock only lasts for 1 test
    spyOn(localStorage,  'setItem') ;

    spyOn(localStorage, 'getItem').and.callFake( () => {

      return  JSON.stringify([{
        productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity : 1 , 
        deliveryOptionId : '1'
      }]) ;

    })

    loadFromStorage() ;

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6') ; 

    expect(cart.length).toEqual(1) ; 
    expect(localStorage.setItem).toHaveBeenCalledTimes(1) ;
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2) ; 

  }) ; 




  it('adds a new product to the cart', () => {

    /* spyOn(localStorage, 'setItem') : This replaces the real localStorage.setItem() function
       with a spy — a fake version Jasmine uses to track how many times it's called, and with what arguments.

        So we don't actually write anything to the browser's real localStorage during testing.  
    */

    spyOn(localStorage, 'setItem') ; 

    spyOn(localStorage, 'getItem').and.callFake( () => {

      return JSON.stringify([]) ; 
    }) ; 

    //console.log( localStorage.getItem('cart') ) ; 

    loadFromStorage() ; 

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6') ; 

    expect(cart.length).toEqual(1) ; 
    expect(localStorage.setItem).toHaveBeenCalledTimes(1) ;
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1) ;  

  }) ; 

}) ;