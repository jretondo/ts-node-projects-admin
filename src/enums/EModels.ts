
enum Activities {
    model = "Activity",
    tableName = "activities"
}

enum Admins {
    model = "Admin",
    tableName = "admins"
}

enum AdminPermissions {
    model = "AdminPermission",
    tableName = "admin_permissions"
}

enum AuthAdmins {
    model = "AuthAdmin",
    tableName = "auth_admin"
}

enum Clients {
    model = "Client",
    tableName = "clients"
}

enum Invoices {
    model = "Invoice",
    tableName = "invoices"
}

enum InvoiceItems {
    model = "InvoiceItem",
    tableName = "invoice_items"
}

enum InvoiceTypes {
    model = "InvoiceType",
    tableName = "invoice_types"
}

enum IvaConditions {
    model = "IvaCondition",
    tableName = "iva_conditions"
}

enum EPermissions {
    model = "Permission",
    tableName = "permissions"
}

enum SalePoints {
    model = "SalePoint",
    tableName = "sale_points"
}


export const ModelsTables = {
    Activities,
    Admins,
    AdminPermissions,
    AuthAdmins,
    Clients,
    Invoices,
    InvoiceItems,
    InvoiceTypes,
    IvaConditions,
    Permissions: EPermissions,
    SalePoints
}