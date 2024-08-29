// Mục đích: implements được sử dụng khi một lớp muốn tuân thủ một giao diện
// (interface).Nó yêu cầu lớp đó phải triển khai tất cả các phương thức và thuộc tính mà giao diện định nghĩa.
//  Cách hoạt động: Một lớp có thể implements nhiều giao diện,
//  và lớp đó phải cung cấp các định nghĩa cụ thể cho tất cả các phương thức và thuộc tính được định nghĩa trong các giao diện đó.


interface Flyable {
    fly() :void
}

interface SwimmingAble {
    swim(): void
}

class Bird implements Flyable, SwimmingAble {
    fly(): void {
        console.log("Bird is flying.");
    }
    swim(): void {
        console.log("Bird is swimming.");
    }

}

const bird = new Bird();
bird.fly();  // Output: Bird is flying.
bird.swim(); // Output: Bird is swimming.
