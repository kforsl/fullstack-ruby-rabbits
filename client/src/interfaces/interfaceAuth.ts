export interface SignInForm {
    email: string;
    password?: string;
}

export interface SignUpForm extends Customer {
    password: string;
    verifyPassword: string;
}

export interface Customer {
    _id?: string;
    firstName: string;
    lastName: string;
    socialSecurityNumber: string;
    email: string;
    phone: string;
    address: string;
    zipcode: string;
    city: string;
    refreshToken?: string;
    paymentOptions?: PaymentOption[];
    createdAt?: Date;
    updatedAt?: Date;
}
export interface PaymentOption {
    paymentOption: string;
    paymentDetails: string;
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

export interface PasswordForm {
    password: string;
    newPassword: string;
    verifyPassword: string;
}

export interface FormInputs {
    inputName: string;
    placeholder: string;
    type: 'email' | 'password' | 'text' | 'tel';
    inputId: string;
    value: string;
    onChangeFunc?: (event: React.FormEvent) => void;
    dataFormType?: string;
}
