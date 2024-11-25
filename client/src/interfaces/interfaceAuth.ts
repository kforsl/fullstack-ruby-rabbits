export interface SignInForm {
    email: string;
    password?: string;
}

export interface SignUpForm extends Customer {
    password: string;
    verifyPassword: string;
}

export interface Customer {
    firstName: string;
    lastName: string;
    socialSecurityNumber: string;
    email: string;
    phone: string;
    address: string;
    zipcode: string;
    city: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// export interface SignUpForm extends SignInForm {
//     firstName: string;
//     lastName: string;
//     confirmPassword: string;
//     phone: string;
//     address?: string;
//     zipcode?: string;
//     city?: string;
//     paymentOptions?: PaymentOptions[];
// }

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