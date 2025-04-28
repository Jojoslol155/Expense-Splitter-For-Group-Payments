export enum StatusType {
    LOADING, 
    COMPLETE,
    ERROR
}

export type StatusContextType = {
    status: StatusType
    errorMessage: string
    setStatus: (status: StatusType) => void
    setErrorMessage: (errorMessage: string) => void
}