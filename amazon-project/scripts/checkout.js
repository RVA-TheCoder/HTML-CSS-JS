// named exports
import {cart, removeFromCart, updateDeliveryOption} from '../data/cart.js'
import {products} from '../data/products.js'
import { formatCurrency } from './utils/money.js'
import { deliveryOptions } from '../data/deliveryOptions.js'

// default export type : module can have only one default export.It is meant to represent the "main thing" the module provides.
//                       Then we import without curly braces, and we can name it anything we want (optional)
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'  

const today = dayjs();
const deliveryData = today.add(7, 'days') ;

console.log(deliveryData.format('dddd, MMMM D') ) ;


function renderOrderSummary() {   

  let cartSummaryHTML = '' ;

  cart.forEach( (cartItem) => {

    const productId = cartItem.productId ;

    let matchingProduct ;

    // We can't use break inside higher-order array methods like .forEach(), .map(), or .filter(). 
    // Those don't support breaking early.
    products.forEach( (product) => {

      if (product.id === productId) {

        matchingProduct = product ; 
        
      }

    })

    //console.log(matchingProduct) ; 

    const deliveryOptionId = cartItem.deliveryOptionId ;

    let deliveryOption ; 

    deliveryOptions.forEach( (option) => {

      if (option.id === deliveryOptionId) {
        deliveryOption = option ; 
      }
    }) ;

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays, 'days'
    ) ;

    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    ) ;




    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>

            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary 
                          js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>

          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
            
          </div>

        </div>
      </div>
    `

    
  }) ;

  // console.log(cartSummaryHTML) ; 

  /*
  we can use (call) a function before declaring it if it's defined using a function declaration.
  That works because function declarations are hoisted — meaning during compilation, JavaScript moves
  the function definition to the top of the current scope.

  NOTE : Above hoisting won't work with : 
    (a) if we define our function as a function expression, then it won’t work before it’s declared.

      ex: 

        sayHello();  // ❌ ReferenceError: Cannot access 'sayHello' before initialization

        const sayHello = function() {
          console.log("Hello Aakash!");
        };

    (b) Arrow Functions - no hoisting.

      ex :
        
        sayHello();  // ❌ Error

        const sayHello = () => {
          console.log("Hello Aakash!");
        };

  */
  function deliveryOptionsHTML(matchingProduct, cartItem) {

    let html = '' ;

    deliveryOptions.forEach( (deliveryOption) => {
      
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days') ;
        
      const dateString = deliveryDate.format( 'dddd, MMMM D' ) ;
        
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -` ; 

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId ; 

      html += `
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">

          <input type="radio" ${isChecked ? 'checked' : '' }
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} - Shipping
            </div>
          </div>

        </div>
      ` ; 

    }) ;

    return html ;
  }

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML ;

  document.querySelectorAll('.js-delete-link')
    .forEach( (link) => {

      link.addEventListener('click', () => {
        const productId = link.dataset.productId ;

        removeFromCart(productId) ; // updates the shopping cart

        const container = document.querySelector(`.js-cart-item-container-${productId}`) ;

        container.remove() ; 
        

      })

    }) ;


  document.querySelectorAll('.js-delivery-option')
    .forEach( (element) => {
      element.addEventListener('click', () => { 

        const productId = element.dataset.productId ;
        const deliveryOptionId = element.dataset.deliveryOptionId ;
        // Shorthand version of above code : const {productId, deliveryOptionId} = element.dataset ; 

        updateDeliveryOption(productId, deliveryOptionId) ; 

        renderOrderSummary() ; 
        
      }) ;

    }) ;

}
 
renderOrderSummary() ; 







