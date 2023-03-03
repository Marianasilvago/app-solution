import {Coordinate, Customer, Direction, Grid, Robot, RobotMap} from '../api/base';
import {NewGrid, ValidateGrid} from '../api/grid';

const customers: Customer[] = [];
let id = 0;

let grid: Grid;

const robots: RobotMap = {};

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

export function initializeServer(coords: string): Promise<Grid> {
    const errString: string = ValidateGrid(coords);
    if (errString.length > 0) {
        return Promise.reject('Error');
    }

    grid = NewGrid(coords);

    return new Promise(resolve => resolve(grid));
}

export function getInitialisedCoordinates(): Promise<Grid> {
    return new Promise(resolve => resolve(grid));
}

export function createRobot(robotInit: string): Promise<Robot> {
    const roboParams = robotInit.split(' ');
    // tslint:disable-next-line:no-magic-numbers
    if (roboParams.length !== 2) {
        return Promise.reject('Error');
    }

    const position = roboParams[1].split('');
    // tslint:disable-next-line:no-magic-numbers
    if (position.length !== 3 || Number(position[0]) < 1 || Number(position[1]) < 1) {
        return Promise.reject('Error');
    }

    const start: Coordinate = {x: Number(position[0]), y: Number(position[1])};
    // tslint:disable-next-line:no-magic-numbers
    const initDirection: Direction = `${position[2]}` as Direction;
    const robot: Robot = {name: roboParams[0], coordinate: start, direction: initDirection};
    robots[roboParams[0]] = robot;

    return new Promise(resolve => resolve(robot));
}

export function getRobotPosition(params: { name?: string }): Promise<Robot> {
    const filteredRobots = Object.keys(robots)
        .filter((robotName: string) => !params.name || `${robotName}` === params.name);

    if (filteredRobots.length !== 1) {
        return Promise.reject('Error');
    }
    const roboName: string = filteredRobots[0];

    return new Promise(resolve => resolve(robots[roboName]));
}
