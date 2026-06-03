// Class - інструкція зі створення об'єктів


class Animal {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    makeSound() {
        console.log("Some generic sound");
    }
}

// Object - реальний екземпляр класу

const animal1 = new Animal("Dog", 5);
const animal2 = new Animal("Cat", 3);

console.log(animal1.name); // "Dog"
console.log(animal2.name); // "Cat"

// Інкапсуляція - об'єднання даних та методів в одному класі
class Dog {
    private name: string;
    private age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    makeSound() {
        console.log("Woof!");
    }
}
    
// Наслідування - клас-батько
class Cat extends Animal {
    constructor(name: string, age: number) {
        super(name, age);
    }

    makeSound() {
        console.log("Meow!");
    }
}

// Поліморфізм - можливість використовувати один інтерфейс для різних типів даних


function makeSound(animal: Animal) {
    animal.makeSound();
}

const dog = new Dog("Buddy", 5);
const cat = new Cat("Whiskers", 3);

// makeSound(dog); // "Woof!"
// makeSound(cat); // "Meow!"  

// Абстракція - це приховування складних деталей реалізації та надання простого інтерфейсу для взаємодії.

class Car {
    private brand: string;
    private model: string;
    private year: number;
    private isEngineOn: boolean;

    constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.isEngineOn = false;
    }

    startEngine() {
        this.isEngineOn = true;
        console.log("Engine started");
    }

    stopEngine() {
        this.isEngineOn = false;
        console.log("Engine stopped");
    }

    drive() {
        if (this.isEngineOn) {
            console.log("Car is driving");
        } else {
            console.log("Engine is off, cannot drive");
        }
    }
}