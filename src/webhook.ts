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
interface IWebhookCard {
    id: number
    pipe_id: string
}

type Action = "card.field_update" | "card.delete" | "card.create"

export default class Webhook {
    constructor(body: any) {
        this.raw = body
        this.setCommonVars(this.raw)
        this.field = this.setFieldId(this.raw)
        this.newValue = this.setNewValue(this.raw)
        this.userName = this.setUserName(this.raw)
    }
    raw: IWebhook
    cardId: string | number | undefined
    action: Action | undefined
    pipeId: string | undefined
    field: string | undefined
    newValue: string | undefined
    userName: string | undefined

    private setFieldId(webhook: IWebhook): string | undefined {
        return (webhook.data && "field" in webhook.data) ? webhook.data.field.id : undefined
    }

    private setNewValue(webhook: IWebhook): string | undefined {
        return (webhook.data && "new_value" in webhook.data) ? webhook.data.new_value : undefined
    }

    private setUserName(webhook: IWebhook): string | undefined {
        return (webhook.data && "deleted_by" in webhook.data) ? webhook.data.deleted_by.username : undefined
    }

    private setCommonVars(webhook: IWebhook): void {
        this.action = webhook?.data?.action || undefined
        this.cardId = webhook?.data?.card?.id || undefined
        this.pipeId = webhook?.data?.card?.pipe_id || undefined
    }
}