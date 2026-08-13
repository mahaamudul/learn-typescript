// arrow function 
const add = (a: number, b: number): number => {
    return a + b;
};
//normal function 
function sum(a: number, b: number) : number {
    return a + b;
}


// object => funtion or methods 
const poorUser={
    balance: 1000,
    addBalance(amount: number): number {
        const total = this.balance + amount;
        this.balance = total;
        return this.balance;
    }
}
console.log(poorUser.addBalance(1000));
