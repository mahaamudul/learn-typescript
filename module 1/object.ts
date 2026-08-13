// const myName: string = "John Doe";
// console.log(myName);



//object type 

const user: {
    isMarried: boolean;
    firstName: string;
    middleName?: string;// optional property
    lastName: string;
     readonly nationality?: "bangladeshi"; // value type || literal type
} = {
    firstName:"mahamudul",
    middleName:"hasan",
    lastName:"mehedi",
    isMarried:true,
    nationality:"bangladeshi"
}
// user.nationality = "bangladeshi"; // This will cause an error since it's a readonly property

console.log(user);
