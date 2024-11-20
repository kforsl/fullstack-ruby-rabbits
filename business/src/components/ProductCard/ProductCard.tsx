import { ProductType, SizeType } from '../../interfaces/interfaceProduct';
import './productCard.css';

interface Props {
    product: ProductType;
    size: SizeType;
}

const ProductCard = ({ product, size }: Props) => {
    return (
        <article className='product-card' onClick={() => console.log('Lägg till', product)}>
            <img className='product-card__image' src='/assets/strawberry-milkshake.png' alt='Produktbild' />
            <h3 className='product-card__text'>{product.name}</h3>
            <h4 className='product-card__text'>{size.size}</h4>
            <h4 className='product-card__text'> {size.prize} Kr </h4>
        </article>
    );
};

export default ProductCard;
