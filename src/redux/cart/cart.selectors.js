import { createSelector } from 'reselect';

/** Exists two type of selectors, "input selectors" and "output selectors" */

/** 
 * INPUT SELECTOR
 * It's a function which gets the whole state and return only a portion of it
 *  */
const selectCart = state => state.cart;

/** First param is a collection of input selectors, the second param is a function that return the valuoe of we need from the selector */
export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
  );
  
  export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
  );
  
  export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
      cartItems.reduce(
        (accumalatedQuantity, cartItem) =>
          accumalatedQuantity + cartItem.quantity,
        0
      )
  );
  
  export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems =>
      cartItems.reduce(
        (accumalatedQuantity, cartItem) =>
          accumalatedQuantity + cartItem.quantity * cartItem.price,
        0
      )
  );