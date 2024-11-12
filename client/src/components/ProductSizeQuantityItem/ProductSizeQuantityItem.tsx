import './productSizeQuantityItem.css';

interface Props {
    price: number;
}

const ProductSizeQuantityItem = ({ price }: Props) => {
    return (
        <section className='ProductSizeQuantityItem'>
            <p className='ProductSizeQuantityItem__price'> {price} kr </p>
        </section>
    );
};

export default ProductSizeQuantityItem;
