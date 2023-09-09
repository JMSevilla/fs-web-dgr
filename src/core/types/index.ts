
export type DataToPresent = {
    firstname: string | undefined
    lastname: string | undefined
    middlename: string | undefined
}

export type GlobalContextProps = {
    state: DataToPresent
    setState: any
    handleFunction() : void
}

export type PostsDataUpdate = {
    id: number
    title: string
    author: string
    firstname: string
    middlename: string
    lastname: string
    status: number
}