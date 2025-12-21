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

  loadProductsFetch() ,

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
