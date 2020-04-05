import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className='cart-icon' onClick={ toggleCartHidden }>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{ itemCount }</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = createStructuredSelector({
    /** 
     * This is a selector 
     * A “selector” is simply a function that accepts Redux state as an argument and returns data that is derived from that state.
     * It is a best practice to keep your Redux store state minimal and derive data from the state as needed. Selectors help with that. 
     * They can compute derived data, allowing Redux to store the minimal possible state. 
     * Selectors are also very efficient. A selector is not recomputed unless one of its arguments changes.
     * A few examples of selectors:
     * selectUsers = state => state.users;
     * selectUserIds = state => state.users.map(user => user.id);
     * selectUserIdsOfName = (state, name) => state.users.filter(user => user.name === name);
     * 
     * Selector introduces a "new" functionality, MEMORIZATION
     * The use of selectors in your application can also provide performance optimizations. 
     * Let’s say you have a component that needs to run an intensive sorting operation on the store’s state in order to get the data it needs. 
     * If you were to perform the operation in your mapStateToProps() function, without the use of a selector, the operation would run every time a dispatched action caused the state to update!
     * It would be great if we could only run the expensive sorting operation only when the data we are running the operation on changes. 
     * This is where the concept of memoization comes to the rescue.
     * Memoization is a form of caching. It involves tracking inputs to a function, and storing the inputs and the results for later reference. 
     * If a function is called with the same inputs as before, the function can skip doing the actual work, and return the same result it generated the last time it received those input values.
     * The official Redux docs briefly discuss memoization. 
     * There is also an amazing Redux middleware library for creating memoized selectors called Reselect.
     * */
    itemCount: selectCartItemsCount
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartIcon);