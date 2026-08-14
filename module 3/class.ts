// oop
class Animal{
    name:string;
    species:string;
    sound:string;

    constructor(name:string,species:string,sound:string){
        this.name=name;
        this.species=species;
        this.sound=sound;
    }

    makeSound(){
        console.log(this.sound);
    }
}

const dog=new Animal("German Shepherd","Dog","Bark");
const cat=new Animal("Persian Cat","Cat","Meow");

dog.makeSound();
cat.makeSound();

