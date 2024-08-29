// Một abstract class (lớp trừu tượng) là một lớp cơ sở(base class) sử dụng định nghĩa lớp dẫn xuất
// .abstract không thể khởi tạo trực tiếp.
//  Để khai báo thì phải dùng từ khóa abstract

abstract class Employee {
    constructor(private firstName: string, private lastName: string) {
    }
    abstract getSalary(): number
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
    compensationStatement(): string {
        return `${this.fullName} makes ${this.getSalary()} a month.`;
    }
}


// Vì lớp Employee là một abstract, bạn không thể khởi tạo một new object từ nó. Câu lệnh sau đây gây ra lỗi:

// let employee = new Employee('John','Doe');
// error TS2511: Cannot create an instance of an abstract class.

class FullTimeEmployee extends Employee {
    constructor(firstName: string, lastName: string, private salary: number) {
        super(firstName, lastName);
    }
    getSalary(): number {
        return this.salary;
    }
}
// Trong lớp Contractor, hàm khởi tạo khởi tạo rate(tỷ lệ) và hours(giờ). Phương thức getSalary() tính toán mức lương bằng cách nhân tỷ lệ với giờ.
// Tiếp tục tạo một đối tượng FullTimeEaffee và một đối tượng Contractor:

let john = new FullTimeEmployee('John', 'Doe', 12000);
let jane = new Contractor('Jane', 'Doe', 100, 160);

console.log(john.compensationStatement());
console.log(jane.compensationStatement());
Output:

// John Doe makes 12000 a month.
// Jane Doe makes 16000 a month.
// Tóm tắt:

// Các lớp trừu tượng không thể được khởi tạo.
// Một lớp trừu tượng có ít nhất một phương thức trừu tượng.
// Để sử dụng một lớp trừu tượng, bạn cần kế thừa nó và cung cấp thực hiện các xử lý cho các phương thức trừu tượng
