import './productSizeQuantityItem.css';

interface Props {
    price: number;
}

const ProductSizeQuantityItem = ({ price }: Props) => {
    return (
        <section className='product-size-quantity-item'>
            <p className='product-size-quantity-item__price'> {price} kr </p>
        </section>
    );
};

export default ProductSizeQuantityItem;

/**
 * Författare: Kim
 * Komponent som tar emot ett pris och trycker ut priset på skärmen.
 */
