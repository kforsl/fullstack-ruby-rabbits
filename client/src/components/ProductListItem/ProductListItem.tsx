import './productListItem.css';
import ProductSizeQuantityItem from '../ProductSizeQuantityItem/ProductSizeQuantityItem';
import { ProductType } from '../../interfaces/interfaceProduct';

interface Props {
    productItem: ProductType;
}

const ProductListItem = ({ productItem }: Props) => {
    return (
        <li className='product-list-item'>
            <img className='product-list-item__image' src={productItem.imageUrl} alt={`${productItem.name} image`} />
            <section className='product-list-item__item-info'>
                <h2 className='product-list-item__title'> {productItem.name}</h2>
                <p className='product-list-item__description'>{productItem.description}</p>
                {/* <ul className='product-list-item__ingredients-list'>
                    
                    {productItem.ingredients.map((product) => (
                        <li key={product.ingredient._id}>{product.ingredient.name},</li>
                    ))} 
                </ul> */}
            </section>
            <section className='product-list-item__price-wrapper'>
                {productItem.sizes.map((item) => (
                    <ProductSizeQuantityItem key={item._id} size={item} product={productItem} />
                ))}
            </section>
        </li>
    );
};

export default ProductListItem;

/*
 * Författare: Kim
 * Komponent som tar emot en produkt och trycker ut ett listobjekt med produktnamn, lista med ingredienser och pris.
 *
 * Ändrat: Magnus
 * Komponent skickar nu ned size och productItem för användning när man lägger till saker från meny till cart.
 */
