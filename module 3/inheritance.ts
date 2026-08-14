// 

class Parent {
    name: string
    age: number
    id: number

    constructor(name: string, age: number, id: number) {
        this.name = name
        this.age = age
        this.id = id
    }
    getDetails() {
        console.log(`Name: ${this.name}, Age: ${this.age}, ID: ${this.id}`);
    }
}

class Student extends Parent {
    grade: string

    constructor(name: string, age: number, id: number, grade: string) {
        super(name, age, id);
        this.grade = grade;
    }

    getStudentDetails() {
        this.getDetails();
        console.log(`Grade: ${this.grade}`);
    }
}

const student1 = new Student("John Doe", 20, 12345, "A");
student1.getStudentDetails();