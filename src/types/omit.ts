// Trong lodash có omit, và trong TS cũng vậy, utility này nó
//  sẽ làm bạn nhớ đến omit của lodash, đó là bỏ ra những thuộc tính không 
//  cần dùng trong một đối tượng nào đó.Xem ví dụ các bạn sẽ dễ hiểu hơn

interface User {
    name: string,
    age: number,
    address: string
}

type OmitUser = Omit<User, 'name' | 'age'>

// tuong tu

type OmitUser = {
    address :string
}

