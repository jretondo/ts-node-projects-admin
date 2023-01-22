export interface IEmailSendPass {
    Colors: object,
    Links: object,
    Names: object,
    titlePage: string,
    titleHead: string,
    paragraphHead: Array<string>,
    titleButton: string,
    textCall: string,
    textCall2: string,
    textFooter: string
}

export interface IListResponse {
    totalItems: number,
    itemsPerPage: number,
    items: Array<any>
}

export interface INewPermissions {
    permissions: Array<INewPermission>,
    idUser: number
}

export interface INewPermission {
    idPermission: number
}