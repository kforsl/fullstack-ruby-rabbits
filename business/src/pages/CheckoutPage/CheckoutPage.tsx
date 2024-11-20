import { useState } from 'react';
import './checkoutPage.css';
import Cart from '../../components/Cart/Cart';
import ProductList from '../../components/ProductList/ProductList';
import { ProductType } from '../../interfaces/interfaceProduct';

const CheckoutPage: React.FC = () => {
    const [isMenuShowing, setIsMenuShowing] = useState<boolean>(true);

    const icecreamArray: ProductType[] = [
        {
            _id: '10',
            name: 'Vanilj',
            description: 'En vanlig vaniljglass',
            type: 'icecream',
            imageUrl: '',
            ingredients: [
                {
                    ingredientItem: {
                        _id: 'i1',
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
                    price: 32,
                    ingredientMultiplier: 0.8,
                },
                {
                    size: 'medium',
                    price: 43,
                    ingredientMultiplier: 1,
                },
                {
                    size: 'large',
                    price: 54,
                    ingredientMultiplier: 1.2,
                },
            ],
        },
        {
            _id: '11',
            name: 'Jordgubb',
            description: 'En vanlig Jordgubbsglass',
            type: 'icecream',
            imageUrl: '',
            ingredients: [
                {
                    ingredientItem: {
                        _id: 'i2',
                        name: 'Glass',
                        description: 'Jordgubb',
                        allergens: [],
                    },
                    quantity: 100,
                },
            ],
            isSpecial: false,
            sizes: [
                {
                    size: 'small',
                    price: 32,
                    ingredientMultiplier: 0.8,
                },
                {
                    size: 'medium',
                    price: 43,
                    ingredientMultiplier: 1,
                },
                {
                    size: 'large',
                    price: 54,
                    ingredientMultiplier: 1.2,
                },
            ],
        },
        {
            _id: '12',
            name: 'choklad',
            description: 'En vanlig chokladglass',
            type: 'icecream',
            imageUrl: '',
            ingredients: [
                {
                    ingredientItem: {
                        _id: 'i3',
                        name: 'Glass',
                        description: 'choklad',
                        allergens: [],
                    },
                    quantity: 100,
                },
            ],
            isSpecial: false,
            sizes: [
                {
                    size: 'small',
                    price: 32,
                    ingredientMultiplier: 0.8,
                },
                {
                    size: 'medium',
                    price: 43,
                    ingredientMultiplier: 1,
                },
                {
                    size: 'large',
                    price: 54,
                    ingredientMultiplier: 1.2,
                },
            ],
        },
    ];

    const milkshakeArray: ProductType[] = [
        {
            _id: '21',
            name: 'vanilj',
            description: 'En vanlig vaniljmilkshake',
            type: 'milkshake',
            imageUrl: '',
            ingredients: [
                {
                    ingredientItem: {
                        _id: 'i1',
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
                    price: 32,
                    ingredientMultiplier: 0.8,
                },
                {
                    size: 'medium',
                    price: 43,
                    ingredientMultiplier: 1,
                },
                {
                    size: 'large',
                    price: 54,
                    ingredientMultiplier: 1.2,
                },
            ],
        },
        {
            _id: '22',
            name: 'jordgubb',
            description: 'En vanlig jordgubbsmilkshake',
            type: 'milkshake',
            imageUrl: '',
            ingredients: [
                {
                    ingredientItem: {
                        _id: 'i2',
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
                    price: 32,
                    ingredientMultiplier: 0.8,
                },
                {
                    size: 'medium',
                    price: 43,
                    ingredientMultiplier: 1,
                },
                {
                    size: 'large',
                    price: 54,
                    ingredientMultiplier: 1.2,
                },
            ],
        },
        {
            _id: '23',
            name: 'choklad',
            description: 'En vanlig chokladmilkshake',
            type: 'milkshake',
            imageUrl: '',
            ingredients: [
                {
                    ingredientItem: {
                        _id: 'i3',
                        name: 'Glass',
                        description: 'choklad',
                        allergens: [],
                    },
                    quantity: 1,
                },
            ],
            isSpecial: false,
            sizes: [
                {
                    size: 'small',
                    price: 32,
                    ingredientMultiplier: 0.8,
                },
                {
                    size: 'medium',
                    price: 43,
                    ingredientMultiplier: 1,
                },
                {
                    size: 'large',
                    price: 54,
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
