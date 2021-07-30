export interface User {
    name: string;
    age: number;
}
export declare const createUser: (name: string, age: number) => User;
export declare const showUser: (user: User) => void;
