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
            /* Requirements for updating Entity:
                resource_name
                current_version
                
            */
        } else if (fieldId === "name_1") {
            console.log(`The common name is ${this.newValue}`)
        } else if (fieldId === "entity_type") {
            console.log(`The category is ${this.newValue}`)
        } else if (fieldId === "opened") {
            console.log(`The open date is ${this.newValue}`)
        } else if (fieldId === "closed") {
            console.log(`The closed date is ${this.newValue}`)
        } else if (fieldId === "web address") {
            console.log(`The url is ${this.newValue}`)
        }
        //Differentiating between compliance & entity email when both have id of "email"
        //There are notes with the id "notes", "ciphertrace_notes", and "new_ciphertrace_notes" 
        else if (fieldId === "ciphertrace_notes") {
            console.log(`The notes are ${this.newValue}`) 
        } else {
            console.log(`the fieldId is not handled.`)
        }
    }


}