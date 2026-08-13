let anything :any;
anything = 5;
(anything as string).valueOf();
// console.log(anything);


const kgToGram=(input: number | string): number | string | undefined=>{
    if(typeof input==="number"){
        return input * 1000;
    }
    else if(typeof input==="string"){
        const [value]=input.split(" ");
        return `Converted Value is : ${Number(value)*1000} gram`;

    }
    else{
        return "Invalid input type";
    }
}


const result1 = kgToGram(5) as number; // 5000
const result2 = kgToGram("5 kg") as string;
const result3=kgToGram("10kg") as string;

console.log(result3);