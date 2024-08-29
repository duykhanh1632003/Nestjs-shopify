// Mục đích: extends được sử dụng để kế thừa từ một lớp khác.Nó cho phép một lớp(subclass)
// kế thừa các thuộc tính và phương thức từ một lớp cha(superclass).

// Cách hoạt động: Khi một lớp kế thừa từ lớp khác bằng từ khóa extends,
// nó sẽ có tất cả các thuộc tính và phương thức của lớp cha, và có thể ghi đè(override) các phương thức này nếu cần.

class Animal{
    name: string

    constructor(name: string) {
        this.name = name
    }

    speak(): void{
        console.log(`${this.name} makes a noise.`);
    }
}

class Dogs extends Animal {
    constructor(name: string) {
        super(name)
    }

    speak(): void {
        console.log(`${this.name} barks.`);
    }
}

const dog = new Dogs('Rex')
dog.speak(); // Output: Rex barks.
