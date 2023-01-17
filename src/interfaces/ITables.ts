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
    phone: string
}
export interface IUserPermission {
    id?: number,
    id_user: number,
    id_permission: number
}

export interface IActivity {
    id?: number,
    date?: Date,
    user_id: number,
    activity_description: string
}