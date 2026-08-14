class BankAccount{
    public name:string;
    public readonly id:number;
    private balance:number;
    constructor(name:string,id:number,balance:number){
        this.name=name;
        this.id=id;
        this.balance=balance;
    }

    addBalance(amount:number):void{
        this.balance+=amount;
        console.log(this.balance);
    }

}

const mehediAccount=new BankAccount("Mehedi Hasan",123456,1000);

mehediAccount.addBalance(500);