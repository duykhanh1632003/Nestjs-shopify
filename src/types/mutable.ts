type User = {
    readonly name: string,
    readonly age: number
}

type Mutable<T> = {
    readonly [P in keyof T]: T[P]
}

type MutableUser = Mutable<User>

// no se ra nhu nay
type MutableUser = {
    name: string,
    age: number
}