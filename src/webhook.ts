import myCrypto from 'crypto'
import Card, { IUpdateFieldResponse } from './pipefy.card'


export interface IWebhook {
    data: ICreateWebhook | IMoveWebhook | IUpdateWebhook | IDeleteWebhook
}

interface ICreateWebhook {
    action: Action
    card: IWebhookCard
}

export interface IMoveWebhook {
    action: Action
    from: IWebhookPhase
    to: IWebhookPhase
    moved_by: IWebhookUser
    card: IWebhookCard
}

interface IUpdateWebhook {
    action: Action
    field: IWebhookField
    new_value: string
    card: IWebhookCard
}

interface IDeleteWebhook {
    action: Action
    deleted_by: IWebhookUser
    card: IWebhookCard
}

interface IWebhookField {
    id: string
    label: string
    internal_id: number
}

interface IWebhookUser {
    id: number
    name: string
    username: string
    email: string
    avatar_url: string
}

interface IWebhookPhase {
    id: number
    name: string
}

interface IWebhookCard {
    id: number
    title: string
    pipe_id: string
}

type Action = "card.move" | "card.field_update" | "card.delete" | "card.create"

export default class Webhook {
    constructor(body: any) {
        this.raw = body
        this.isValid = false
        this.movement = this._getMovement(this.raw)
    }
    raw: IWebhook
    isValid: boolean | undefined = undefined
    private cardManagementFieldId: string = "card_management"
    webhook: IWebhook | undefined
    movement: string | undefined

    private _getMovement(webhook: IWebhook): string | undefined {
        let result: string
        if ("moved_by" in webhook.data) {
            const { to, from } = webhook.data
            return `[${to.name}->${from.name}] Completed`
        } if (webhook.data.action === "card.create") {
            return `[cardCreate] Completed`
        } else {
            return undefined
        }
        // may need movement values for delete and field update

    }

    validate(card: Card) {
        const managementField = card.getField(this.cardManagementFieldId)
        console.log(managementField)
        this.isValid = this.movement === undefined ? false : !managementField?.array_value.includes(this.movement)
        this._registerWebhook(card)
    }

    private async _registerWebhook(card: Card): Promise<boolean> {
        if (!this.isValid) { console.log("You can not register the movement from an invalid webhook"); return false }
        if (!this.movement) { console.log("There was no phase movement to update"); return false }
        const response: IUpdateFieldResponse = await card.updateField(this.cardManagementFieldId, this.movement, "ADD")
        return response.data.updateFieldsValues.success
    }

}