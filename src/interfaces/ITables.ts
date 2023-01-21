export interface IAuth {
    id?: number,
    user: string,
    pass?: string,
    prov: number,
    admin_id: number
}
export interface IUser {
    id?: number,
    name: string,
    lastname: string
    email: string,
    user: string,
    phone: string,
    admin: boolean
}
export interface IUserPermission {
    id?: number,
    id_user: number,
    id_permission: number
}

export interface IPermission {
    id?: number,
    module_name: string
}

export interface IActivity {
    id?: number,
    date?: Date,
    user_id: number,
    activity_description: string
}

export interface IInvoice {
    id?: number,
    created_time?: Date,
    date: Date,
    sale_point_id: number,
    type_id: number,
    cae: string,
    cae_expiration: Date,
    client_id: number,
    canceled_id?: number,
    user_id: number,
    observations: string
}

export interface IInvoiceItems {
    id?: number,
    invoice_id: number,
    detail: string,
    net_amount: number,
    taxes_amount: number,
    discount_amount: number
}

export interface ISalePoints {
    id?: number,
    business_number: string,
    business_name: string,
    sale_point_number: number,
    iva_condition_id: number,
    logo_name: string,
    activities_start: Date,
    email: string,
    address: string
}

export interface IClients {
    id?: number,
    document_type: number,
    document_number: string,
    business_name: string,
    fantasie_name: string,
    email: string,
    iva_condition_id: number
}

export interface IIvaConditions {
    id?: number,
    description: string
}

export interface IInvoiceTypes {
    id?: number,
    description: string,
    letter: string
}