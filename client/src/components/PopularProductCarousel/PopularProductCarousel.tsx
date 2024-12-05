import { useEffect, useState } from 'react';
import { ProductType } from '../../interfaces/interfaceProduct';
import PopularProductItem from '../PopularProductItem/PopularProductItem';
import './popularProductCarousel.css';

interface Props {
    specials: ProductType[];
}

const moveProducts = (
    products: ProductType[],
    setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>,
    direction: 'left' | 'right'
) => {
    if (products) {
        const newProductsArray: ProductType[] = products;
        if (direction === 'left') {
            newProductsArray.push(newProductsArray.shift() as ProductType); // Flyttar första objektet i arrayen till sista positionen
        } else {
            newProductsArray.unshift(newProductsArray.pop() as ProductType); // Flyttar sista objektet i arrayen till första positionen
        }
        setProducts([...newProductsArray]);
    }
};

const PopularProductCarousel = ({ specials }: Props) => {
    const [specialProducts, setSpecialProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        if (specials) {
            setSpecialProducts(specials);
        }
    }, []);
    return (
        <>
            <h2 className='PopularProductCarousel__title'>Happymess Favoriter</h2>
            <section className='PopularProductCarousel'>
                <div className='PopularProductCarousel__fade-left'>
                    <button
                        className='PopularProductCarousel__navigation-btn'
                        onClick={() => moveProducts(specialProducts, setSpecialProducts, 'left')}>
                        <span className='menu-to-cart-incrementer__button-text'>&#10094;</span>
                    </button>
                </div>
                <ul className='PopularProductCarousel__productContainer'>
                    {specialProducts.map((product, index) => {
                        return <PopularProductItem product={product} key={product._id} index={index + 1} />;
                    })}
                </ul>
                <div className='PopularProductCarousel__fade-right'>
                    <button
                        className='PopularProductCarousel__navigation-btn'
                        onClick={() => moveProducts(specialProducts, setSpecialProducts, 'right')}>
                        <span className='menu-to-cart-incrementer__button-text'>&#10095;</span>
                    </button>
                </div>
            </section>
        </>
    );

    {
        /* {specials?.map((special) => (
                <PopularProductItem product={special} key={special._id} />
            ))} */
    }
};

export default PopularProductCarousel;
