import { useState } from 'react';
import ProfileNav from '../../components/ProfileNav/ProfileNav';
import ProfileOrderList from '../../components/ProfileOrderList/ProfileOrderList';
// import { OrderType } from '../../interfaces/interfaceOrder';
import './profilePage.css';
import ProfilePersonalForm from '../../components/ProfilePersonalForm/ProfilePersonalForm';
import useAuthStore from '../../stores/authStore';
import ProfilePaymentOptionsForm from '../../components/ProfilePaymentOptionsForm/ProfilePaymentOptionsForm';
const ProfilePage: React.FC = () => {
    const { customer } = useAuthStore();
    const [formToShow, setFormToShow] = useState<string>('personal');
    const changeNavOption = (navOption: 'personal' | 'payment' | 'password' | 'allergies') => {
        setFormToShow(navOption);
    };

    // const orders: OrderType[] = [
    //     {
    //         _id: '673f53229d0e31dbb1d16096',
    //         price: 205,
    //         state: 'ready',
    //         comment: '',
    //         order: [
    //             {
    //                 product: {
    //                     _id: '673dadde3cef091f385c82a3',
    //                     name: 'Oreo Overload',
    //                     description: 'En lyxig Oreo-milkshake fylld med chokladglass, krossade Oreos och vispgrädde.',
    //                     type: 'milkshake',
    //                     imageUrl: 'https://happymess-images.s3.eu-north-1.amazonaws.com/oreo-overload.png',
    //                     ingredients: [],
    //                     isSpecial: false,
    //                     sizes: [
    //                         {
    //                             size: 'small',
    //                             price: 35,
    //                             ingredientMultiplier: 0.85,
    //                             _id: '673daddf3cef091f385c82a7',
    //                         },
    //                         {
    //                             size: 'medium',
    //                             price: 49,
    //                             ingredientMultiplier: 1,
    //                             _id: '673daddf3cef091f385c82a8',
    //                         },
    //                         {
    //                             size: 'large',
    //                             price: 55,
    //                             ingredientMultiplier: 1.15,
    //                             _id: '673daddf3cef091f385c82a9',
    //                         },
    //                     ],
    //                 },
    //                 quantity: 1,
    //                 size: 'small',
    //                 _id: '673f53229d0e31dbb1d16097',
    //             },
    //             {
    //                 product: {
    //                     _id: '673dadde3cef091f385c82a3',
    //                     name: 'Oreo Overload',
    //                     description: 'En lyxig Oreo-milkshake fylld med chokladglass, krossade Oreos och vispgrädde.',
    //                     type: 'milkshake',
    //                     imageUrl: 'https://happymess-images.s3.eu-north-1.amazonaws.com/oreo-overload.png',
    //                     ingredients: [],
    //                     isSpecial: false,
    //                     sizes: [],
    //                 },
    //                 quantity: 1,
    //                 size: 'large',
    //                 _id: '673f53229d0e31dbb1d16098',
    //             },
    //             {
    //                 product: {
    //                     _id: '673db7213cef091f385c848c',
    //                     name: 'Vanilla Bean Classic',
    //                     description: 'En klassisk vaniljmilkshake gjord på äkta vaniljstång.',
    //                     type: 'milkshake',
    //                     imageUrl: 'https://happymess-images.s3.eu-north-1.amazonaws.com/vanillamilkshake.png',
    //                     ingredients: [],
    //                     isSpecial: false,
    //                     sizes: [],
    //                 },
    //                 quantity: 1,
    //                 size: 'large',
    //                 _id: '673f53229d0e31dbb1d16099',
    //             },
    //             {
    //                 product: {
    //                     _id: '673dbcd53cef091f385c8b06',
    //                     name: 'Minty Fresh',
    //                     description: 'En uppfriskande mintmilkshake med chokladbitar för en härlig kombination.',
    //                     type: 'milkshake',
    //                     imageUrl: 'https://happymess-images.s3.eu-north-1.amazonaws.com/mint-milkshake.png',
    //                     ingredients: [],
    //                     isSpecial: false,
    //                     sizes: [],
    //                 },
    //                 quantity: 1,
    //                 size: 'medium',
    //                 _id: '673f53229d0e31dbb1d1609a',
    //             },
    //         ],
    //         createdAt: new Date('2024-11-21T15:34:58.334Z'),

    //         updatedAt: new Date('2024-11-21T16:14:25.294Z'),
    //     },
    //     {
    //         _id: '673f5afb9d0e31dbb1d18537',
    //         price: 367,
    //         state: 'waiting',
    //         comment: '',
    //         order: [
    //             {
    //                 product: {
    //                     _id: '673f4264d6eac1bbc32caf7b',
    //                     name: 'Cookie Crumble',
    //                     description: 'Krämig vaniljglass med generösa bitar av chokladkakor.',
    //                     type: 'icecream',
    //                     imageUrl: 'https://happymess-images.s3.eu-north-1.amazonaws.com/cookie-crumble.png',
    //                     ingredients: [],
    //                     isSpecial: false,
    //                     sizes: [
    //                         {
    //                             size: 'small',
    //                             price: 39,
    //                             ingredientMultiplier: 0.9,
    //                             _id: '673f4264d6eac1bbc32caf7e',
    //                         },
    //                         {
    //                             size: 'medium',
    //                             price: 53,
    //                             ingredientMultiplier: 1,
    //                             _id: '673f4264d6eac1bbc32caf7f',
    //                         },
    //                         {
    //                             size: 'large',
    //                             price: 61,
    //                             ingredientMultiplier: 1.25,
    //                             _id: '673f4264d6eac1bbc32caf80',
    //                         },
    //                     ],
    //                 },
    //                 quantity: 1,
    //                 size: 'small',
    //                 _id: '673f5afb9d0e31dbb1d18538',
    //             },
    //             {
    //                 product: {
    //                     _id: '673f4152d6eac1bbc32ca241',
    //                     name: 'Mango Tango',
    //                     description: 'En tropisk mango- och passionsfruktsglass med syrlig fruktpuré.',
    //                     type: 'icecream',
    //                     imageUrl: 'https://happymess-images.s3.eu-north-1.amazonaws.com/mango-tango.png',
    //                     ingredients: [],
    //                     isSpecial: true,
    //                     sizes: [
    //                         {
    //                             size: 'small',
    //                             price: 40,
    //                             ingredientMultiplier: 0.9,
    //                             _id: '673f4152d6eac1bbc32ca244',
    //                         },
    //                         {
    //                             size: 'medium',
    //                             price: 55,
    //                             ingredientMultiplier: 1,
    //                             _id: '673f4152d6eac1bbc32ca245',
    //                         },
    //                         {
    //                             size: 'large',
    //                             price: 60,
    //                             ingredientMultiplier: 1.25,
    //                             _id: '673f4152d6eac1bbc32ca246',
    //                         },
    //                     ],
    //                 },
    //                 quantity: 1,
    //                 size: 'large',
    //                 _id: '673f5afb9d0e31dbb1d18539',
    //             },
    //             {
    //                 product: {
    //                     _id: '673db4de3cef091f385c83bd',
    //                     name: 'Peanut Butter Paradise',
    //                     description: 'En len jordnötsglass med chokladvirvlar och knapriga jordnötsbitar.',
    //                     type: 'icecream',
    //                     imageUrl: 'https://happymess-images.s3.eu-north-1.amazonaws.com/peanut-butter-paradise.png',
    //                     ingredients: [],
    //                     isSpecial: false,
    //                     sizes: [
    //                         {
    //                             size: 'small',
    //                             price: 40,
    //                             ingredientMultiplier: 0.9,
    //                             _id: '673db4de3cef091f385c83c1',
    //                         },
    //                         {
    //                             size: 'medium',
    //                             price: 55,
    //                             ingredientMultiplier: 1,
    //                             _id: '673db4de3cef091f385c83c2',
    //                         },
    //                         {
    //                             size: 'large',
    //                             price: 60,
    //                             ingredientMultiplier: 1.25,
    //                             _id: '673db4de3cef091f385c83c3',
    //                         },
    //                     ],
    //                 },
    //                 quantity: 4,
    //                 size: 'medium',
    //                 _id: '673f5afb9d0e31dbb1d1853a',
    //             },
    //             {
    //                 product: {
    //                     _id: '673db4763cef091f385c83b6',
    //                     name: 'Bubbel Gum Bliss',
    //                     description: 'En färgglad glass med smak av bubbelgum och små marshmallows.',
    //                     type: 'icecream',
    //                     imageUrl: 'https://happymess-images.s3.eu-north-1.amazonaws.com/bubblegum-bliss.png',
    //                     ingredients: [],
    //                     isSpecial: true,
    //                     sizes: [
    //                         {
    //                             size: 'small',
    //                             price: 34,
    //                             ingredientMultiplier: 0.9,
    //                             _id: '673db4763cef091f385c83b9',
    //                         },
    //                         {
    //                             size: 'medium',
    //                             price: 48,
    //                             ingredientMultiplier: 1,
    //                             _id: '673db4763cef091f385c83ba',
    //                         },
    //                         {
    //                             size: 'large',
    //                             price: 56,
    //                             ingredientMultiplier: 1.15,
    //                             _id: '673db4763cef091f385c83bb',
    //                         },
    //                     ],
    //                 },
    //                 quantity: 1,
    //                 size: 'medium',
    //                 _id: '673f5afb9d0e31dbb1d1853b',
    //             },
    //         ],
    //         createdAt: new Date('2024-11-21T16:08:27.916Z'),
    //         updatedAt: new Date('2024-11-21T16:08:27.916Z'),
    //     },
    //     {
    //         _id: '674044b5d7824443d074d45c',
    //         price: 299,
    //         state: 'history',
    //         comment: '',
    //         order: [
    //             {
    //                 product: {
    //                     _id: '673db41f3cef091f385c83ae',
    //                     name: 'Funky Fudge Swirl',
    //                     description: 'Krämig vaniljglass med virvlar av chokladfudge och knapriga chokladbitar.',
    //                     type: 'icecream',
    //                     imageUrl: 'https://happymess-images.s3.eu-north-1.amazonaws.com/funky-fudge-swirl.png',
    //                     ingredients: [],
    //                     isSpecial: true,
    //                     sizes: [
    //                         {
    //                             size: 'small',
    //                             price: 35,
    //                             ingredientMultiplier: 0.85,
    //                             _id: '673db41f3cef091f385c83b2',
    //                         },
    //                         {
    //                             size: 'medium',
    //                             price: 49,
    //                             ingredientMultiplier: 1,
    //                             _id: '673db41f3cef091f385c83b3',
    //                         },
    //                         {
    //                             size: 'large',
    //                             price: 55,
    //                             ingredientMultiplier: 1.15,
    //                             _id: '673db41f3cef091f385c83b4',
    //                         },
    //                     ],
    //                 },
    //                 quantity: 1,
    //                 size: 'large',
    //                 _id: '674044b5d7824443d074d45d',
    //             },
    //             {
    //                 product: {
    //                     _id: '673f4264d6eac1bbc32caf7b',
    //                     name: 'Cookie Crumble',
    //                     description: 'Krämig vaniljglass med generösa bitar av chokladkakor.',
    //                     type: 'icecream',
    //                     imageUrl: 'https://happymess-images.s3.eu-north-1.amazonaws.com/cookie-crumble.png',
    //                     ingredients: [],
    //                     isSpecial: false,
    //                     sizes: [
    //                         {
    //                             size: 'small',
    //                             price: 39,
    //                             ingredientMultiplier: 0.9,
    //                             _id: '673f4264d6eac1bbc32caf7e',
    //                         },
    //                         {
    //                             size: 'medium',
    //                             price: 53,
    //                             ingredientMultiplier: 1,
    //                             _id: '673f4264d6eac1bbc32caf7f',
    //                         },
    //                         {
    //                             size: 'large',
    //                             price: 61,
    //                             ingredientMultiplier: 1.25,
    //                             _id: '673f4264d6eac1bbc32caf80',
    //                         },
    //                     ],
    //                 },
    //                 quantity: 4,
    //                 size: 'large',
    //                 _id: '674044b5d7824443d074d45e',
    //             },
    //         ],
    //         createdAt: new Date('2024-11-22T08:45:41.076Z'),

    //         updatedAt: new Date('2024-11-22T08:48:20.074Z'),
    //     },
    //     {
    //         _id: '673fa6bd3656e8cdb0bacacd',
    //         price: 524,
    //         state: 'history',
    //         comment: '',
    //         order: [
    //             {
    //                 product: {
    //                     _id: '673db4763cef091f385c83b6',
    //                     name: 'Bubbel Gum Bliss',
    //                     description: 'En färgglad glass med smak av bubbelgum och små marshmallows.',
    //                     type: 'icecream',
    //                     imageUrl: 'https://happymess-images.s3.eu-north-1.amazonaws.com/bubblegum-bliss.png',
    //                     ingredients: [],
    //                     isSpecial: true,
    //                     sizes: [
    //                         {
    //                             size: 'small',
    //                             price: 34,
    //                             ingredientMultiplier: 0.9,
    //                             _id: '673db4763cef091f385c83b9',
    //                         },
    //                         {
    //                             size: 'medium',
    //                             price: 48,
    //                             ingredientMultiplier: 1,
    //                             _id: '673db4763cef091f385c83ba',
    //                         },
    //                         {
    //                             size: 'large',
    //                             price: 56,
    //                             ingredientMultiplier: 1.15,
    //                             _id: '673db4763cef091f385c83bb',
    //                         },
    //                     ],
    //                 },
    //                 quantity: 3,
    //                 size: 'medium',
    //                 _id: '673fa6bd3656e8cdb0bacace',
    //             },
    //             {
    //                 product: {
    //                     _id: '673db4de3cef091f385c83bd',
    //                     name: 'Peanut Butter Paradise',
    //                     description: 'En len jordnötsglass med chokladvirvlar och knapriga jordnötsbitar.',
    //                     type: 'icecream',
    //                     imageUrl: 'https://happymess-images.s3.eu-north-1.amazonaws.com/peanut-butter-paradise.png',
    //                     ingredients: [],
    //                     isSpecial: false,
    //                     sizes: [
    //                         {
    //                             size: 'small',
    //                             price: 40,
    //                             ingredientMultiplier: 0.9,
    //                             _id: '673db4de3cef091f385c83c1',
    //                         },
    //                         {
    //                             size: 'medium',
    //                             price: 55,
    //                             ingredientMultiplier: 1,
    //                             _id: '673db4de3cef091f385c83c2',
    //                         },
    //                         {
    //                             size: 'large',
    //                             price: 60,
    //                             ingredientMultiplier: 1.25,
    //                             _id: '673db4de3cef091f385c83c3',
    //                         },
    //                     ],
    //                 },
    //                 quantity: 4,
    //                 size: 'medium',
    //                 _id: '673fa6bd3656e8cdb0bacacf',
    //             },
    //             {
    //                 product: {
    //                     _id: '673f4152d6eac1bbc32ca241',
    //                     name: 'Mango Tango',
    //                     description: 'En tropisk mango- och passionsfruktsglass med syrlig fruktpuré.',
    //                     type: 'icecream',
    //                     imageUrl: 'https://happymess-images.s3.eu-north-1.amazonaws.com/mango-tango.png',
    //                     ingredients: [],
    //                     isSpecial: true,
    //                     sizes: [
    //                         {
    //                             size: 'small',
    //                             price: 40,
    //                             ingredientMultiplier: 0.9,
    //                             _id: '673f4152d6eac1bbc32ca244',
    //                         },
    //                         {
    //                             size: 'medium',
    //                             price: 55,
    //                             ingredientMultiplier: 1,
    //                             _id: '673f4152d6eac1bbc32ca245',
    //                         },
    //                         {
    //                             size: 'large',
    //                             price: 60,
    //                             ingredientMultiplier: 1.25,
    //                             _id: '673f4152d6eac1bbc32ca246',
    //                         },
    //                     ],
    //                 },
    //                 quantity: 4,
    //                 size: 'small',
    //                 _id: '673fa6bd3656e8cdb0bacad0',
    //             },
    //         ],
    //         createdAt: new Date('2024-11-21T21:31:41.319Z'),

    //         updatedAt: new Date('2024-11-22T08:58:55.412Z'),
    //     },
    //     {
    //         _id: '674453778bb4924cc9dbc19b',
    //         price: 455,
    //         state: 'preparing',
    //         comment: 'Hej jag är en kommentar.',
    //         order: [
    //             {
    //                 product: {
    //                     _id: '673db4de3cef091f385c83bd',
    //                     name: 'Peanut Butter Paradise',
    //                     description: 'En len jordnötsglass med chokladvirvlar och knapriga jordnötsbitar.',
    //                     type: 'icecream',
    //                     imageUrl: 'https://happymess-images.s3.eu-north-1.amazonaws.com/peanut-butter-paradise.png',
    //                     ingredients: [],
    //                     isSpecial: false,
    //                     sizes: [
    //                         {
    //                             size: 'small',
    //                             price: 40,
    //                             ingredientMultiplier: 0.9,
    //                             _id: '673db4de3cef091f385c83c1',
    //                         },
    //                         {
    //                             size: 'medium',
    //                             price: 55,
    //                             ingredientMultiplier: 1,
    //                             _id: '673db4de3cef091f385c83c2',
    //                         },
    //                         {
    //                             size: 'large',
    //                             price: 60,
    //                             ingredientMultiplier: 1.25,
    //                             _id: '673db4de3cef091f385c83c3',
    //                         },
    //                     ],
    //                 },
    //                 quantity: 1,
    //                 size: 'medium',
    //                 _id: '674453778bb4924cc9dbc19c',
    //             },
    //             {
    //                 product: {
    //                     _id: '673db4de3cef091f385c83bd',
    //                     name: 'Peanut Butter Paradise',
    //                     description: 'En len jordnötsglass med chokladvirvlar och knapriga jordnötsbitar.',
    //                     type: 'icecream',
    //                     imageUrl: 'https://happymess-images.s3.eu-north-1.amazonaws.com/peanut-butter-paradise.png',
    //                     ingredients: [],
    //                     isSpecial: false,
    //                     sizes: [
    //                         {
    //                             size: 'small',
    //                             price: 40,
    //                             ingredientMultiplier: 0.9,
    //                             _id: '673db4de3cef091f385c83c1',
    //                         },
    //                         {
    //                             size: 'medium',
    //                             price: 55,
    //                             ingredientMultiplier: 1,
    //                             _id: '673db4de3cef091f385c83c2',
    //                         },
    //                         {
    //                             size: 'large',
    //                             price: 60,
    //                             ingredientMultiplier: 1.25,
    //                             _id: '673db4de3cef091f385c83c3',
    //                         },
    //                     ],
    //                 },
    //                 quantity: 10,
    //                 size: 'small',
    //                 _id: '674453778bb4924cc9dbc19d',
    //             },
    //         ],
    //         createdAt: new Date('2024-11-25T10:37:43.040Z'),
    //         updatedAt: new Date('2024-11-25T10:37:43.040Z'),
    //     },
    // ];

    return (
        <>
            <main className='profile-page'>
                <div className='wrapper'>
                    <ProfileNav onClick={changeNavOption} />
                    {formToShow === 'personal' && <ProfilePersonalForm />}
                    {formToShow === 'payment' && <ProfilePaymentOptionsForm />}
                    {formToShow === 'password' && <h1> password </h1>}
                    {formToShow === 'allergies' && <h1> allergies </h1>}

                    {customer && <ProfileOrderList id={customer?._id as string} />}
                </div>
            </main>
        </>
    );
};

export default ProfilePage;

/**
 * Författare: Kim
 * Lagt till UnderConstruction komponent.
 */
