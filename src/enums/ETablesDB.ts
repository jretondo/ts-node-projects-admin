enum AdminCol {
    id = 'id',
    name = 'name',
    lastname = 'lastname',
    email = 'email',
    user = 'user',
    phone = 'phone'
}

enum AuthAdmCol {
    id = 'id',
    user = 'user',
    pass = 'pass',
    prov = 'prov'
}

enum UserPermissionCol {
    id = "id",
    id_user = "id_user",
    id_permission = "id_permission"
}

enum Permissions {
    id = "id",
    module_name = "module_name"
}

enum Activity {
    id = "id",
    date = "date",
    user_id = "user_id",
    activity_description = "activity_description"
}

export enum EPermissions {
    userAdmin = 1
}

export enum Tables {
    ADMIN = "admins",
    AUTH_ADMIN = "auth_admin",
    USER_PERMISSIONS = "admin_permissions",
    PERMISSIONS = "permissions",
    ACTIVITY = "activity"
}

export const Columns = {
    admin: AdminCol,
    authAdmin: AuthAdmCol,
    userPermissions: UserPermissionCol,
    permissions: Permissions,
    activity: Activity
}