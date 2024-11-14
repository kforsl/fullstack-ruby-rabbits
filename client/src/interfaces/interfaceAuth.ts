import { AllergensType } from '.';

export interface SignInForm {
    email: string;
    password: string;
}

export interface SignUpForm extends SignInForm {
    confirmPassword: string;
    phone: string;
    address?: string;
    zipcode?: string;
    city?: string;
    paymentOptions?: PaymentOptions[];
}

export interface Employee {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    address: string;
    zipcode: string;
    city: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface Customer {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    address: string;
    zipcode: string;
    city: string;
    allergens: AllergensType[];
    paymentOptions: PaymentOptions[];
    // orders?: string[]; //Ändra detta när vi implementerat orders.
    // personalDiscounts?: string[]; //Ändra detta när vi implementerat discounts.
    createdAt?: Date;
    updatedAt?: Date;
}

interface PaymentOptions {
    option: string;
    details: string;
}
