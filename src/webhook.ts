import myCrypto from 'crypto'
import Card, { IUpdateFieldResponse } from './pipefy.card'


export interface IWebhook {
    data: ICreateWebhook | IUpdateWebhook | IDeleteWebhook
}

interface ICreateWebhook {
    action: Action
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

type Action = "card.field_update" | "card.delete" | "card.create"

export default class Webhook {
    constructor(body: any) {
        this.raw = body
        this.field = this.getFieldId(this.raw)
        this.newValue = this.getNewValue(this.raw)
        this.cardId = this.getCardId(this.raw)
    }
    raw: IWebhook
    webhook: IWebhook | undefined
    field: string | undefined
    newValue: string | undefined
    cardId: string | number

    private getFieldId(webhook: IWebhook): string | undefined {
        let result: string | undefined
        if ("field" in webhook.data) {
            result = webhook.data.field.id
        } else {
            result = undefined
        }
        return result
    }

    private getNewValue(webhook: IWebhook): string | undefined {
        let result: string | undefined
        if ("field" in webhook.data) {
            result = webhook.data.new_value
        } else {
            result = undefined
        }
        return result
    }

    private getCardId(webhook: IWebhook) {
        return this.raw.data.card.id
    }

}