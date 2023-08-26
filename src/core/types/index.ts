
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