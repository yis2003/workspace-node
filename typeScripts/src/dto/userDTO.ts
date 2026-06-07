
/**
 * user DTO 클래스
 */
export class UserDTO {
    private _id: string;
    private _name: string;
    private _age: number;

    constructor(data: any) {
        if (!data) 
            throw new Error('Invalid user data: data is null or undefined');
        
        this._id = data.id;
        this._name = data.name;
        this._age = data.age;
    };

    get id(): string { return this._id};
    get name(): string {return this._name };
    get age(): number { return this._age };
};