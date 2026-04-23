import { Address } from './address';
import { Customer } from './customer';
import { Product } from './product';

export interface Order {
    id: number;
    product: Product[];
    customer: Customer;
    status: string;
    address: Address;
    purchaseDate: Date;
    totalAmount: number;
    totalItems: number;
    totalQuantity: number;
    totalPrice: number;
}
