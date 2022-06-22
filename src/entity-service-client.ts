export interface UpdateEntityRequest {
    resource_name: string
    current_version: number
    field_mask: string[]
    entity: Entity
    relationship_changes: EntityRelationshipChange
}

interface EntityRelationshipChange {
    field_mask: any
    type: RelationshipChangeType
    relationship_change: EntityContact |
    EntityCountry |
    TrisaRegistration |
    EntityAttachment |
    EntityBankInfo |
    EntityKyc |
    EntityAssetEvaluation |
    EntityVolumeData |
    EmailAddress |
    EntityVolumeData |
    EmailAddress |
    PhoneNumber |
    BankingRoutingInfo
}

interface Entity {
    resource_name: string
    version: number
    legal_name: string
    common_name: string
    category: Category
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

interface EntityContact {
    resource_name: string
    person_resource_name: string
    entity_resource_name: string
    start_date: string
    end_date: string
    role: Role
    person: Person
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
        this.service = "entity"
        this.subService = ""
        this.resourceNamePrefix = this.getResourceNamePrefix()
    }

    domain: string
    service: string
    subService: string
    resourceNamePrefix: string

    getResourceNamePrefix(): string {
        return `${this.domain}:${this.service}:${this.subService}:`
    }
}