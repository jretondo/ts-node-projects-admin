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
    prov = 'prov',
    admin_id = "admin_id"
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

enum Invoices {
    id = "id",
    created_time = "created_time",
    date = "date",
    sale_point_id = "sale_point_id",
    type_id = "type_id",
    cae = "cae",
    cae_expiration = "cae_expiration",
    client_id = "client_id",
    canceled_id = "canceled_id",
    user_id = "user_id",
    observations = "observations"
}

enum InvoiceItems {
    id = "id",
    invoice_id = "invoice_id",
    detail = "detail",
    net_amount = "net_amount",
    taxes_amount = "taxes_amount",
    discount_amount = "discount_amount"
}

enum SalePoints {
    id = "id",
    business_number = "business_number",
    business_name = "business_name",
    sale_point_number = "sale_point_number",
    iva_condition_id = "iva_condition_id",
    logo_name = "logo_name",
    activities_start = "activities_start",
    email = "email",
    address = "address"
}

enum Clients {
    id = "id",
    document_type = "document_type",
    document_number = "document_number",
    business_name = "business_name",
    fantasie_name = "fantasie_name",
    email = "email",
    iva_condition_id = "iva_condition_id"
}

enum IvaConditions {
    id = "id",
    description = "description"
}

enum InvoiceTypes {
    id = "id",
    description = "description",
    letter = "letter"
}

export enum EPermissions {
    userAdmin = 1
}

export enum Tables {
    ADMIN = "admins",
    AUTH_ADMIN = "auth_admin",
    USER_PERMISSIONS = "admin_permissions",
    PERMISSIONS = "permissions",
    ACTIVITY = "activities",
    INVOICES = "invoices",
    INVOICE_ITEMS = "invoice_items",
    SALE_POINTS = "sale_points",
    CLIENTS = "clients",
    IVA_CONDITIONS = "iva_conditions",
    INVOICE_TYPES = "invoice_types"
}

export const Columns = {
    admin: AdminCol,
    authAdmin: AuthAdmCol,
    userPermissions: UserPermissionCol,
    permissions: Permissions,
    activity: Activity,
    invoices: Invoices,
    invoiceItems: InvoiceItems,
    salePoints: SalePoints,
    clients: Clients,
    ivaConditions: IvaConditions,
    invoiceTypes: InvoiceTypes
}