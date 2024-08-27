// nguoc lai voi partial

interface User{
    name ?: string | undefined,
    age?: number | undefined
}

type RequiredUser = Required<User>

// se tra ve ket qua

type RequiredUser = {
    name: string,
    age: string
}

