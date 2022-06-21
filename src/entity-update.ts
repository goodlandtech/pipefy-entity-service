import Webhook from "./webhook"
import Card from './pipefy.card'

export default class EntityUpdateService {
    constructor(webhook: Webhook, card: Card) {
        this.fieldId = webhook.field
        this.newValue = webhook.newValue
        this.cardId = webhook.cardId
        this.card = card
    }

    fieldId
    newValue
    cardId
    cipherTraceId: string | undefined
    card: Card
    // field id for CipherTraceId is ciphertraaceid

    test() {
        console.log(this.fieldId, this.newValue)
    }

    async getCipherTraceId() {
        const cipherTraceIdField = this.card.getField("ciphertraaceid")
        return cipherTraceIdField?.value
    }

    branchOnField(fieldId: string) {
        if (fieldId === "legal_name") {
            console.log(`The legal name is ${this.newValue}`)
        } else if (fieldId === "entity_type") {
            console.log(`The category is ${this.newValue}`)
        }
    }
}