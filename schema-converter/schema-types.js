const types = {
    create: "Create",
    update: "Update",
    view: "View",
    dashbaord: "Dashboard",
    assist: "Assist",
    detailCollection: "DetailCollection",
    lookups: "Lookups",
    batchUpdate: "BatchUpdate"
};

const allTypes = {
    create: "Create",
    update: "Update",
    view: "View",
    dashbaord: "Dashboard",
    detailCollection: "DetailCollection",
    batchUpdate: "BatchUpdate",
    assistCreate: "AssistCreate",
    assistUpdate: "AssistUpdate",
    assistView: "AssistView",
    assistDashboard: "AssistDashboard",
    assistBatchUpdate: "AssistBatchUpdate"
};

const crudToolbarOrder = [
    "refresh",
    "create",
    "update",
    "delete",
    "navigate",
    "batch-delete",
    "propertiesPanel",
    "queryBuilder",
    "inlineEditingDisabled",
]

export {types, allTypes, crudToolbarOrder};