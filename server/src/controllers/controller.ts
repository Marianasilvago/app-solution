import {Coordinate, Customer} from '../api/base';

const customers: Customer[] = [];
let id = 0;

let savedRightCoords: Coordinate;

export function getCustomers(): Promise<Customer[]> {
    return new Promise(resolve => resolve(customers));
}

export function addCustomer(customerName: string): Promise<Customer> {
    const newCustomer = {name: customerName, id: id++};
    customers.push(newCustomer);

    return new Promise(resolve => resolve(newCustomer));
}

export function searchCustomers(params: { id?: string; name?: string }): Promise<Customer[]> {
    const filteredCustomers = customers
        .filter(customer => !params.id || `${customer.id}` === params.id)
        .filter(customer => !params.name || customer.name.includes(params.name));

    return new Promise(resolve => resolve(filteredCustomers));
}

export function initializeServer(coords: string): Promise<Coordinate> {
    const upperRightCoords: number[] = coords.split(' ').map(Number).filter(isFinite);
    // tslint:disable-next-line:no-magic-numbers
    if (!upperRightCoords || upperRightCoords.length !== 2 || upperRightCoords[0] < 1 || upperRightCoords[1] < 1) {
        return Promise.reject('Error');
    }

    savedRightCoords = {x: Number(upperRightCoords[0]), y: Number(upperRightCoords[1])};

    return new Promise(resolve => resolve(savedRightCoords));
}

export function getInitialisedCoordinates(): Promise<Coordinate> {
    return new Promise(resolve => resolve(savedRightCoords));
}
