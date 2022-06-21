import Webhook from "./webhook"
import Card from './pipefy.card'

export default class EntityUpdateService {
    constructor(webhook: Webhook, card: Card) {
        this.fieldId = webhook.field
        this.newValue = webhook.newValue
        this.cardId = webhook.cardId
        this.card = card
        this.cipherTraceId = this.getCipherTraceId()
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

    getCipherTraceId() {
        const cipherTraceIdField = this.card.getField("ciphertraaceid")
        return cipherTraceIdField?.value
    }

    publishUpdate(fieldId: string | undefined) {

        if (fieldId === "legal_name") {
            console.log(`The legal name is ${this.newValue}`)
            /* Requirments for updating Entity:
                resource_name
                curent_version
                
            */
        } else if (fieldId === "entity_type") {
            console.log(`The category is ${this.newValue}`)
        } else {
            console.log(`the fieldId is not handled.`)
        }
    }


}