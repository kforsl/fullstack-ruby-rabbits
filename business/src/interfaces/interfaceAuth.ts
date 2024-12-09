export interface SignInForm {
    email: string;
    password: string;
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
    phone: string;
    address: string;
    zipcode: string;
    city: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface TokenResponse {
    message: string;
    data: Employee;
    token: string;
}
