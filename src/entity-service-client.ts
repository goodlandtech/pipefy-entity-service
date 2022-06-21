export interface UpdateEntityRequest {
    resource_name: string
    current_version: number
    field_mask: string[]
    entity: Entity
    relationship_changes: EntityRelationshipChange
}

interface Entity {
    resrouce_name: string
    verison: number
    legal_name: string
    comon_name: string
    catagory: Category
    updated_by: string
    updated_date: Date
    urls: string[]
    compliance_contact: string
    compliance_contact_phone: string
    notes: string
    date_opened: Date
    date_closed: Date
    contacts: EntityContact[]


}


interface Category {
    resource_name: string
    name: string
    is_risky: "Yes" | "No"
    version: number
}

export default class EntityServiceClient {
    constructor() {
        this.domain = "ciphertrace.com"
        this.service = "enitity"
        this.subService = ""
        this.resrouceNamePrefix = this.getResourceNamePrefix()
    }

    domain: string
    service: string
    subService: string
    resrouceNamePrefix: string

    getResourceNamePrefix(): string {
        return `${this.domain}:${this.service}:${this.subService}:`
    }
}