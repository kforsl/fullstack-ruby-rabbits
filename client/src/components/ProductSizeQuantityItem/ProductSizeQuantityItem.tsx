import './productSizeQuantityItem.css';

interface Props {
    price: number;
}

const ProductSizeQuantityItem = ({ price }: Props) => {
    return (
        <section>
            <p> {price} kr </p>
        </section>
    );
};

export default ProductSizeQuantityItem;
