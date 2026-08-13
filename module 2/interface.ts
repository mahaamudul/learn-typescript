//type allias object
type User={
    isMarried: boolean;
    firstName: string;
    middleName?: string;// optional property
    lastName: string;
    age: number;
}

type Role={
    role: "admin" | "user" | "guest"; // literal type
}
type UserWithRole = User & Role; // intersection type


// interface object
interface IUser{
    name :string;
    age:number
}
// interface inheritance
interface IUserWithRole extends IUser{
    role: "admin" | "user" | "guest"; // literal type
}

const user1: UserWithRole = {
    firstName:"mahamudul",
    middleName:"hasan",
    lastName:"hossain",
    age: 30,
    isMarried: true,
    role: "admin"
};

const user2: IUser = {
    name: "John Doe",
    age: 25
};

const user3: IUserWithRole = {
    name: "Jane Smith",
    age: 28,
    role: "user"
};

//function type allias 
type Add=(num1:number,num2:number)=>number;

const addFn:Add=(num1,num2)=>num1+num2;


interface IAdd{
    (num1:number,num2:number):number;
}

const addFn2:IAdd=(num1,num2)=>num1+num2;










