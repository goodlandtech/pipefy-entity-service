import Webhook from "./webhook"
import Card from './pipefy.card'

export default class Entity {
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

    test() {
        console.log(this.fieldId, this.newValue)
    }

    getCipherTraceId() {
        const cipherTraceIdField = this.card.getField("ciphertraaceid")
        return cipherTraceIdField?.value
    }


}