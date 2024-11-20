import { useState } from 'react';
import './checkoutPage.css';
import Cart from '../../components/Cart/Cart';
import ProductList from '../../components/ProductList/ProductList';
import { ProductType } from '../../interfaces/interfaceProduct';

const CheckoutPage: React.FC = () => {
    const [isMenuShowing, setIsMenuShowing] = useState<boolean>(true);

    const icecreamArray: ProductType[] = [
        {
            _id: '123',
            name: 'Glass',
            description: 'En vanlig vaniljglass',
            type: 'icecream',
            imageUrl: '',
            ingredients: [
                {
                    ingredientItem: {
                        _id: 'i123',
                        name: 'Glass',
                        description: 'vanilj',
                        allergens: [],
                    },
                    quantity: 100,
                },
            ],
            isSpecial: false,
            sizes: [
                {
                    size: 'small',
                    prize: 32,
                    ingredientMultiplier: 0.8,
                },
                {
                    size: 'medium',
                    prize: 43,
                    ingredientMultiplier: 1,
                },
                {
                    size: 'large',
                    prize: 54,
                    ingredientMultiplier: 1.2,
                },
            ],
        },
        {
            _id: '123',
            name: 'Glass',
            description: 'En vanlig vaniljglass',
            type: 'icecream',
            imageUrl: '',
            ingredients: [
                {
                    ingredientItem: {
                        _id: 'i123',
                        name: 'Glass',
                        description: 'vanilj',
                        allergens: [],
                    },
                    quantity: 100,
                },
            ],
            isSpecial: false,
            sizes: [
                {
                    size: 'small',
                    prize: 32,
                    ingredientMultiplier: 0.8,
                },
                {
                    size: 'medium',
                    prize: 43,
                    ingredientMultiplier: 1,
                },
                {
                    size: 'large',
                    prize: 54,
                    ingredientMultiplier: 1.2,
                },
            ],
        },
        {
            _id: '123',
            name: 'Glass',
            description: 'En vanlig vaniljglass',
            type: 'icecream',
            imageUrl: '',
            ingredients: [
                {
                    ingredientItem: {
                        _id: 'i123',
                        name: 'Glass',
                        description: 'vanilj',
                        allergens: [],
                    },
                    quantity: 100,
                },
            ],
            isSpecial: false,
            sizes: [
                {
                    size: 'small',
                    prize: 32,
                    ingredientMultiplier: 0.8,
                },
                {
                    size: 'medium',
                    prize: 43,
                    ingredientMultiplier: 1,
                },
                {
                    size: 'large',
                    prize: 54,
                    ingredientMultiplier: 1.2,
                },
            ],
        },
    ];

    const milkshakeArray: ProductType[] = [
        {
            _id: '123',
            name: 'milkshake',
            description: 'En vanlig vaniljmilkshake',
            type: 'milkshake',
            imageUrl: '',
            ingredients: [
                {
                    ingredientItem: {
                        _id: 'i123',
                        name: 'Glass',
                        description: 'vanilj',
                        allergens: [],
                    },
                    quantity: 1,
                },
            ],
            isSpecial: false,
            sizes: [
                {
                    size: 'small',
                    prize: 32,
                    ingredientMultiplier: 0.8,
                },
                {
                    size: 'medium',
                    prize: 43,
                    ingredientMultiplier: 1,
                },
                {
                    size: 'large',
                    prize: 54,
                    ingredientMultiplier: 1.2,
                },
            ],
        },
        {
            _id: '123',
            name: 'milkshake',
            description: 'En vanlig vaniljmilkshake',
            type: 'milkshake',
            imageUrl: '',
            ingredients: [
                {
                    ingredientItem: {
                        _id: 'i123',
                        name: 'Glass',
                        description: 'vanilj',
                        allergens: [],
                    },
                    quantity: 1,
                },
            ],
            isSpecial: false,
            sizes: [
                {
                    size: 'small',
                    prize: 32,
                    ingredientMultiplier: 0.8,
                },
                {
                    size: 'medium',
                    prize: 43,
                    ingredientMultiplier: 1,
                },
                {
                    size: 'large',
                    prize: 54,
                    ingredientMultiplier: 1.2,
                },
            ],
        },
        {
            _id: '123',
            name: 'milkshake',
            description: 'En vanlig vaniljmilkshake',
            type: 'milkshake',
            imageUrl: '',
            ingredients: [
                {
                    ingredientItem: {
                        _id: 'i123',
                        name: 'Glass',
                        description: 'vanilj',
                        allergens: [],
                    },
                    quantity: 1,
                },
            ],
            isSpecial: false,
            sizes: [
                {
                    size: 'small',
                    prize: 32,
                    ingredientMultiplier: 0.8,
                },
                {
                    size: 'medium',
                    prize: 43,
                    ingredientMultiplier: 1,
                },
                {
                    size: 'large',
                    prize: 54,
                    ingredientMultiplier: 1.2,
                },
            ],
        },
    ];

    return (
        <main>
            <div className='wrapper'>
                {isMenuShowing ? (
                    <section className='checkoutPage'>
                        <article className='checkoutPage__menu-section'>
                            <h1 className='checkoutPage__menu-title'> Menu </h1>
                            <ProductList title='Ice cream' products={icecreamArray} />
                            <ProductList title='Milkshake' products={milkshakeArray} />
                        </article>
                        <article className='checkoutPage__cart-section'>
                            <Cart />
                        </article>
                    </section>
                ) : (
                    <h1> Orders </h1>
                )}
            </div>
        </main>
    );
};

export default CheckoutPage;
