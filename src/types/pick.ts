// Pick cho phép chúng ta chọn ra những thuộc tính nào cần sử dụng của 
// một đối tượng cụ thể nó sẽ ngược lại với Omit ở trên


interface User {
  name: string;
  age: number;
  address: string;
}
type UserWithNameAndAge = Pick<User, 'name' | 'age'>

// nó sẽ tương tự như sau
type UserWithNameAndAge = {
 name: string;
 age: string;
}
