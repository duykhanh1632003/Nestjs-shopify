// tra ve readOnly

interface User {
    name: string,
    age: number
}

type readOnlyUser = Readonly<User>

// ket qua tra ve
type readOnlyUser = {
    readonly name: string,
    readonly age: number
}