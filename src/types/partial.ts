interface User {
    name: string,
    age: number
}

type PartialUser = Partial<User>

// no se ra kieu nhu nay

type PartialUser = {
    name?: string | undefined,
    age?: number | undefined
}