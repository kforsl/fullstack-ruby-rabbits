import { useEffect, useState } from 'react';
import PopularProductItem from '../../components/PopularProductItem/PopularProductItem';
import ProductList from '../../components/ProductList/ProductList';
import { MenuItemType } from '../../interfaces';
import './menuPage.css';

const productItems: MenuItemType[] = [
    {
        _id: '1',
        name: 'Choco Loco Shake',
        description: 'En chokladmilkshake fylld med krämig chokladglass, toppad med vispgrädde och chokladsås.',
        type: 'milkshake',
        imageUrl: '../../../public/images/choco-loco-shake.jpg',
        sizes: [
            {
                size: 'medium',
                price: 45,
                ingredients: [
                    {
                        ingredientItem: {
                            _id: 'i1',
                            name: 'Chokladglass',
                            description: 'Krämig chokladglass gjord på belgisk choklad.',
                            allergens: [
                                {
                                    type: 'mjölk',
                                    description: 'Innehåller mjölkprodukter.',
                                },
                            ],
                        },
                        quantity: 150,
                    },
                    {
                        ingredientItem: {
                            _id: 'i2',
                            name: 'Vispgrädde',
                            description: 'Luftig och sötad grädde för topping.',
                            allergens: [
                                {
                                    type: 'mjölk',
                                    description: 'Innehåller mjölk.',
                                },
                            ],
                        },
                        quantity: 20,
                    },
                    {
                        ingredientItem: {
                            _id: 'i3',
                            name: 'Chokladsås',
                            description: 'En mörk och söt chokladsås för extra smak.',
                            allergens: [],
                        },
                        quantity: 10,
                    },
                ],
            },
        ],
    },
    {
        _id: '2',
        name: 'Strawberry Dream',
        description: 'En fruktig jordgubbsmilkshake med färska jordgubbar och vaniljglass.',
        type: 'milkshake',
        imageUrl: '../../../public/images/strawberry-dream.jpg',
        sizes: [
            {
                size: 'large',
                price: 55,
                ingredients: [
                    {
                        ingredientItem: {
                            _id: 'i4',
                            name: 'Jordgubbsglass',
                            description: 'Fräsch glass gjord på färska jordgubbar.',
                            allergens: [
                                {
                                    type: 'mjölk',
                                    description: 'Innehåller mjölkprodukter.',
                                },
                            ],
                        },
                        quantity: 200,
                    },
                    {
                        ingredientItem: {
                            _id: 'i5',
                            name: 'Vaniljglass',
                            description: 'Krämig vaniljglass gjord på äkta vanilj.',
                            allergens: [
                                {
                                    type: 'mjölk',
                                    description: 'Innehåller mjölk.',
                                },
                            ],
                        },
                        quantity: 50,
                    },
                ],
            },
        ],
    },
    {
        _id: '3',
        name: 'Salted Caramel Bliss',
        description: 'En salt karamellmilkshake som är perfekt för den som älskar sött och salt.',
        type: 'milkshake',
        imageUrl: 'https://happymess.com/images/salted-caramel-bliss.png',
        sizes: [
            {
                size: 'medium',
                price: 50,
                ingredients: [
                    {
                        ingredientItem: {
                            _id: 'i6',
                            name: 'Karamellglass',
                            description: 'Söt glass med fyllig karamellsmak.',
                            allergens: [
                                {
                                    type: 'mjölk',
                                    description: 'Innehåller mjölkprodukter.',
                                },
                            ],
                        },
                        quantity: 150,
                    },
                    {
                        ingredientItem: {
                            _id: 'i7',
                            name: 'Havssalt',
                            description: 'Lätt strödd havssalt för att balansera smaken.',
                            allergens: [],
                        },
                        quantity: 2,
                    },
                ],
            },
        ],
    },
    {
        _id: '4',
        name: 'Vanilla Bean Classic',
        description: 'En klassisk vaniljmilkshake gjord på äkta vaniljstång.',
        type: 'milkshake',
        imageUrl: 'https://happymess.com/images/vanilla-bean-classic.png',
        sizes: [
            {
                size: 'small',
                price: 40,
                ingredients: [
                    {
                        ingredientItem: {
                            _id: 'i8',
                            name: 'Vaniljglass',
                            description: 'Krämig glass gjord på vaniljstång.',
                            allergens: [
                                {
                                    type: 'mjölk',
                                    description: 'Innehåller mjölkprodukter.',
                                },
                            ],
                        },
                        quantity: 100,
                    },
                ],
            },
        ],
    },
    {
        _id: '5',
        name: 'Minty Fresh',
        description: 'En uppfriskande mintmilkshake med chokladbitar för en härlig kombination.',
        type: 'milkshake',
        imageUrl: 'https://happymess.com/images/minty-fresh.png',
        sizes: [
            {
                size: 'large',
                price: 60,
                ingredients: [
                    {
                        ingredientItem: {
                            _id: 'i9',
                            name: 'Mintglass',
                            description: 'Krämig mintglass med naturlig mintsmak.',
                            allergens: [
                                {
                                    type: 'mjölk',
                                    description: 'Innehåller mjölkprodukter.',
                                },
                            ],
                        },
                        quantity: 150,
                    },
                    {
                        ingredientItem: {
                            _id: 'i10',
                            name: 'Chokladbitar',
                            description: 'Mörka chokladbitar för extra crunch.',
                            allergens: [],
                        },
                        quantity: 20,
                    },
                ],
            },
        ],
    },
    {
        _id: '1',
        name: 'Funky Fudge Swirl',
        description: 'Krämig vaniljglass med virvlar av chokladfudge och knapriga chokladbitar.',
        type: 'ice cream',
        imageUrl: '../../../public/images/funky-fudge-swirl.jpg',
        sizes: [
            {
                size: 'small',
                price: 35,
                ingredients: [
                    {
                        ingredientItem: {
                            _id: 'i1',
                            name: 'Vaniljglass',
                            description: 'Krämig vaniljglass gjord på äkta vanilj.',
                            allergens: [
                                {
                                    type: 'mjölk',
                                    description: 'Innehåller mjölkprodukter.',
                                },
                            ],
                        },
                        quantity: 100,
                    },
                    {
                        ingredientItem: {
                            _id: 'i2',
                            name: 'Chokladfudge',
                            description: 'En rik och krämig chokladfudge.',
                            allergens: [],
                        },
                        quantity: 20,
                    },
                    {
                        ingredientItem: {
                            _id: 'i3',
                            name: 'Chokladbitar',
                            description: 'Knapriga mörka chokladbitar.',
                            allergens: [],
                        },
                        quantity: 15,
                    },
                ],
            },
        ],
    },
    {
        _id: '2',
        name: 'Bubblegum Bliss',
        description: 'En färgglad glass med smak av bubbelgum och små marshmallows.',
        type: 'ice cream',
        imageUrl: '../../../public/images/bubblegum-bliss.jpg',
        sizes: [
            {
                size: 'medium',
                price: 45,
                ingredients: [
                    {
                        ingredientItem: {
                            _id: 'i4',
                            name: 'Bubbelgumsglass',
                            description: 'Söt och färgglad glass med smak av bubbelgum.',
                            allergens: [
                                {
                                    type: 'mjölk',
                                    description: 'Innehåller mjölkprodukter.',
                                },
                            ],
                        },
                        quantity: 120,
                    },
                    {
                        ingredientItem: {
                            _id: 'i5',
                            name: 'Mini-marshmallows',
                            description: 'Små, mjuka marshmallows som ger extra sötma.',
                            allergens: [],
                        },
                        quantity: 10,
                    },
                ],
            },
        ],
    },
    {
        _id: '3',
        name: 'Peanut Butter Paradise',
        description: 'En len jordnötsglass med chokladvirvlar och knapriga jordnötsbitar.',
        type: 'ice cream',
        imageUrl: 'https://happymess.com/images/peanut-butter-paradise.png',
        sizes: [
            {
                size: 'large',
                price: 55,
                ingredients: [
                    {
                        ingredientItem: {
                            _id: 'i6',
                            name: 'Jordnötsglass',
                            description: 'Glass med rik jordnötssmak.',
                            allergens: [
                                {
                                    type: 'mjölk',
                                    description: 'Innehåller mjölkprodukter.',
                                },
                                {
                                    type: 'jordnötter',
                                    description: 'Innehåller jordnötter.',
                                },
                            ],
                        },
                        quantity: 130,
                    },
                    {
                        ingredientItem: {
                            _id: 'i7',
                            name: 'Chokladvirvlar',
                            description: 'Krämig choklad för en extra söt touch.',
                            allergens: [],
                        },
                        quantity: 15,
                    },
                    {
                        ingredientItem: {
                            _id: 'i8',
                            name: 'Jordnötsbitar',
                            description: 'Rostade jordnötsbitar för extra crunch.',
                            allergens: [
                                {
                                    type: 'jordnötter',
                                    description: 'Innehåller jordnötter.',
                                },
                            ],
                        },
                        quantity: 10,
                    },
                ],
            },
        ],
    },
    {
        _id: '4',
        name: 'Mango Tango',
        description: 'En tropisk mango- och passionsfruktsglass med syrlig fruktpuré.',
        type: 'ice cream',
        imageUrl: 'https://happymess.com/images/mango-tango.png',
        sizes: [
            {
                size: 'medium',
                price: 50,
                ingredients: [
                    {
                        ingredientItem: {
                            _id: 'i9',
                            name: 'Mangoglass',
                            description: 'Söt och krämig glass med smak av färsk mango.',
                            allergens: [
                                {
                                    type: 'mjölk',
                                    description: 'Innehåller mjölkprodukter.',
                                },
                            ],
                        },
                        quantity: 120,
                    },
                    {
                        ingredientItem: {
                            _id: 'i10',
                            name: 'Passionsfruktspuré',
                            description: 'Syrlig passionsfruktspuré som ger fräschhet.',
                            allergens: [],
                        },
                        quantity: 15,
                    },
                ],
            },
        ],
    },
    {
        _id: '5',
        name: 'Cookie Crumble',
        description: 'Krämig vaniljglass med generösa bitar av chokladkakor.',
        type: 'ice cream',
        imageUrl: 'https://happymess.com/images/cookie-crumble.png',
        sizes: [
            {
                size: 'large',
                price: 60,
                ingredients: [
                    {
                        ingredientItem: {
                            _id: 'i11',
                            name: 'Vaniljglass',
                            description: 'Mjölkig och krämig vaniljglass.',
                            allergens: [
                                {
                                    type: 'mjölk',
                                    description: 'Innehåller mjölkprodukter.',
                                },
                            ],
                        },
                        quantity: 150,
                    },
                    {
                        ingredientItem: {
                            _id: 'i12',
                            name: 'Chokladkakbitar',
                            description: 'Knapriga kakbitar med chokladbitar.',
                            allergens: [
                                {
                                    type: 'gluten',
                                    description: 'Innehåller gluten.',
                                },
                                {
                                    type: 'mjölk',
                                    description: 'Innehåller mjölkprodukter.',
                                },
                            ],
                        },
                        quantity: 20,
                    },
                ],
            },
        ],
    },
];

const filterProductsItemsArray = (
    productItems: MenuItemType[],
    type: 'ice cream' | 'milkshake',
    setFunction: React.Dispatch<React.SetStateAction<MenuItemType[]>>
) => {
    const filteredProducts = productItems.filter((item) => item.type === type);
    setFunction(filteredProducts);
};

const MenuPage: React.FC = () => {
    const [iceCreamProducts, setIceCreamProducts] = useState<MenuItemType[]>([]);
    const [milkshakeProducts, setMilkshakeProducts] = useState<MenuItemType[]>([]);

    useEffect(() => {
        // setIceCreamProducts(productItems.filter((item) => item.type === 'ice cream'));
        // setMilkshakeProducts(productItems.filter((item) => item.type === 'milkshake'));

        filterProductsItemsArray(productItems, 'ice cream', setIceCreamProducts);
        filterProductsItemsArray(productItems, 'milkshake', setMilkshakeProducts);
    }, []);

    return (
        <main className='menu-page'>
            <div className='wrapper'>
                <ul className='menu-page__popular-wrapper'>
                    {iceCreamProducts[0] && <PopularProductItem product={iceCreamProducts[0]} />}
                    {iceCreamProducts[3] && <PopularProductItem product={iceCreamProducts[1]} />}
                    {milkshakeProducts[2] && <PopularProductItem product={milkshakeProducts[0]} />}
                    {milkshakeProducts[1] && <PopularProductItem product={milkshakeProducts[1]} />}
                    {iceCreamProducts[3] && <PopularProductItem product={iceCreamProducts[1]} />}
                </ul>

                <section className='menu-page__menu-wrapper'>
                    <ProductList title='Ice Cream' position='left' productItems={iceCreamProducts} />
                    <ProductList title='Milkshake' position='right' productItems={milkshakeProducts} />
                </section>
            </div>
        </main>
    );
};

export default MenuPage;

/*
 * Författare: Kim
 * grundläggande layout av Page för meny där "företagsnamn" populära produkter och menyn renderas ut på sidan.
 *
 * Ändrat: Magnus
 * Tog bort svg-image och titel med css och lade den i headerkomponent.
 */

/**
 * Ändrat: Kim
 * Lagt till div med wrapper
 */
