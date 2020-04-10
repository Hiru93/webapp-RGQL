import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.styles.scss';

const CollectionPage = ({ collection }) => {
    const { title, items } = collection;
    return (
        <div className="collection-page">
            <h2 className="title">{ title }</h2>
            <div className="items">
                { items.map(item => (
                    <CollectionItem key={ item.id } item={ item } />
                )) }
            </div>
        </div>
    );
};

/**
 * ownProps indicates all the local props of the component
 * so we can take the only props which exist inside the current component
 */
const mapStateToProps = (state, ownProps) => ({
    /**
     * We are using a selector which expect a parameter as input for the function
     * the createSelector (written inside the selector file) is returning to us
     * (the expected param is "collectionUrlParam" inside the selector definition file)
     */
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);