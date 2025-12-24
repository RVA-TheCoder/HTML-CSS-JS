import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";


// for the 'cart-oop.js' file
//import '../data/cart-oop.js'  // this import statement will run all the code inside the file 

// for the 'cart-oop-class.js' file
//import '../data/cart-oop-class.js'  // this import statement will run all the code inside the file 

//import '../data/backend-Practice.js'
 

/*
// handling using Promise 
loadProducts( () => {

  renderOrderSummary() ; 
  renderPaymentSummary() ; 

}) ;
 */

//renderOrderSummary() ; 
//renderPaymentSummary() ; 

/*
// Promise Practice : Approach1
new Promise( (resolve) => {
  loadProducts( () => {
    resolve('value1') ;

  }) ; 

}).then( (value1)=> {

  console.log(value1) ;
  return new Promise( (resolve) => {
    loadCart( () => {

      resolve('value2') ; 
    }) ; 

  })

}).then( (value2) => {

  console.log(value2) ; 
  renderOrderSummary() ; 
  renderPaymentSummary() ; 

}) ;
*/

/*
// Promise Practice : Approach2
Promise.all( [

  new Promise( (resolve) => {
  loadProducts( () => {
    resolve('value1') ;
  });
 }) ,

 new Promise( (resolve) => {
    loadCart( () => {

      resolve('value2') ; 
    }) ; 

  })

]).then( (values) => {

  console.log(values) ; 
  renderOrderSummary() ; 
  renderPaymentSummary() ; 

}) ;
*/

// Promise Practice : Approach3
Promise.all( [

  loadProductsFetch() , // this function returns a Promise

  new Promise( (resolve) => {
    loadCart( () => {

      resolve('value2') ; 
    }) ; 

  })

]).then( (values) => {

  console.log(values) ; 
  renderOrderSummary() ; 
  renderPaymentSummary() ; 

}) ;


// -------------------------- Learning Part 1 : ---------------------------

/*
// async : makes a function return a Promise
async function loadPage() {

  console.log('load page.') ; 

  // return value inside async function becomes/ equivalent to resolve('value2') inside a Promise.
  return 'value2' ; 
}

loadPage().then( (value2) => {

  console.log('next step.');
  console.log(value2);

}) ;
*/


// ------------------------------ Learning Part 2 : ---------------------------------

/*

// async : makes a function return a Promise
// asyn-await can only be used with Promises.
async function loadPage() {

  // runs synchronously.
  console.log('load page.') ; 


  // Lets us write asynchronous code like a normal code
  //    → pauses 'loadProductsFetch' function only
  //    → waits until the Promise returned by loadProductsFetch() resolves.
  
  
  await loadProductsFetch() ;  // Using Asynchronous code like a normal code


  // return value inside async function becomes/ equivalent to resolve('value2') inside a Promise.
  //  -> return 'value2'
  //  -> resolves the Promise returned by loadPage() with 'value2'.
  
  //  NOTE : An async function always returns a Promise, even when we return a normal value.

  //          So this is equivalent to:  return Promise.resolve('value2');
  
  
  return 'value2' ; 
}

loadPage().then( (value2) => {

  console.log('next step.');
  console.log(value2);

}) ;

*/




// ---------------------- Learning Part 3 : --------------------------------------------- 

/*

// async : makes a function return a Promise
// asyn-await can only be used with Promises.
async function loadPage() {

  // runs synchronously.
  console.log('load page.') ; 


  // Lets us write asynchronous code like a normal code
  //    → pauses 'loadProductsFetch' function only
  //    → waits until the Promise returned by loadProductsFetch() resolves.
  
  
  await loadProductsFetch() ; 

  const value3 = await new Promise( (resolve) => {

    loadCart( () => {
      resolve('value3') ; 
    }) ;

  })

  console.log(value3) ;


  // return value inside async function becomes/ equivalent to resolve('value2') inside a Promise.
  //  -> return 'value2'
  //  -> resolves the Promise returned by loadPage() with 'value2'.
  
  //  NOTE : An async function always returns a Promise, even when we return a normal value.

  //          So this is equivalent to:  return Promise.resolve('value2');
  
  
  return 'value2' ; 
}

loadPage().then( (value2) => {

  console.log('next step.');
  console.log(value2);

}) ;

*/







// ----------------------------------- Learning Part 4 : -----------------------------



// async : makes a function return a Promise
// asyn-await can only be used with Promises.
async function loadPage() {

  // runs synchronously.
  console.log('load page.') ; 


  // Lets us write asynchronous code like a normal code
  //    → pauses 'loadProductsFetch' function only
  //    → waits until the Promise returned by loadProductsFetch() resolves.
  
  
  await loadProductsFetch() ; 

  const value3 = await new Promise( (resolve) => {

    loadCart( () => {
      resolve('value3') ; 
    }) ;

  })

  console.log(value3) ;

  renderOrderSummary();
  renderPaymentSummary();


  // return value inside async function becomes/ equivalent to resolve('value2') inside a Promise.
  //  -> return 'value2'
  //  -> resolves the Promise returned by loadPage() with 'value2'.
  
  //  NOTE : An async function always returns a Promise, even when we return a normal value.

  //          So this is equivalent to:  return Promise.resolve('value2');
  
  
  return 'value2' ; 
}

loadPage().then( (value2) => {

  console.log('next step.');
  console.log(value2);

}) ;





















