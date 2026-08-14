type Alphanumeric = string | number;

const addNum=(num1: Alphanumeric, num2: Alphanumeric) => {
    if(typeof num1==="number" && typeof num2==="number"){
        return num1+num2;
    }
    else{
        return num1.toString()+num2.toString();
    }

}

const result = addNum(5,10);
console.log(result);
const result5 = addNum("Hello"," 2");
console.log(result5);

type NormalUser={
    name :string;
}

type AdminUser={
    name :string;
    role : "admin" ;
}

const getUserInfo=(user:NormalUser | AdminUser)=>{
    if("role" in user){
        return `I am an admin user and my name is ${user.name}`;
    }
    else{
        return `I am a normal user and my name is ${user.name}`;
    }
}

console.log(getUserInfo({name:"mehedi",role:"admin"}));