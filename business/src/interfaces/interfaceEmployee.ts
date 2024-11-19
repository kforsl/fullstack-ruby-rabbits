export interface EmployeeType {
    _id: string;
    firstName: string;
    lastName: string;
    address: string;
    zipcode: string;
    city: string;
    email: string;
    phone: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    role: 'admin' | 'employee' | 'manager';
}

/*
 * Författare: Magnus
 * Skapat upp interface för employee.
 */
