import { ProductType } from '../../interfaces/interfaceProduct';
import ProductSizeQuantityItem from '../ProductSizeQuantityItem/ProductSizeQuantityItem';
import './popularProductItem.css';

interface Props {
    product: ProductType;
    index: number;
}

const PopularProductItem = ({ product, index }: Props) => {
    return (
        <article className={`popular-product-item popular-product-item-${index}`}>
            {index === 3 ? (
                <>
                    <img className='popular-product-item__image' src={product.imageUrl} alt={`${product.name} image`} />
                    <section className='popular-product-item__item-info'>
                        <h2 className='popular-product-item__title'> {product.name}</h2>
                        <p className='popular-product-item__description'>{product.description}</p>
                    </section>
                    <section className='popular-product-item__price-wrapper'>
                        {product.sizes.map((item) => (
                            <ProductSizeQuantityItem key={item._id} size={item} product={product} showSize={true} />
                        ))}
                    </section>
                </>
            ) : (
                <>
                    <img className='popular-product-item__image' src={product.imageUrl} alt={`${product.name} image`} />
                </>
            )}
        </article>
    );
};

export default PopularProductItem;

/*
 * Författare: Kim
 * Komponent som tar emot en produkt och trycker ut ett produktkort med bild och produktnamn.
 */
