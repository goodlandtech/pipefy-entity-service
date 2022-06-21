import PipefyConstants from "./pipefy.constants"
import PipefyClient from "./pipefy.client"

interface IPipefyCard {
    data: { card: ICard }
}

interface ICard {
    id: string
    title: string
    created_by: IPipefyUser
    labels: ICardLabel[]
    fields: ICardField[]
    child_relations: ICardRelationship[]
    parent_relations: ICardRelationship[]
}

interface IPipefyUser {
    id: string
    name: string
}

interface ICardLabel {
    id: string
    name: string
}

interface ICardField {
    field: IField
    value: string
    array_value: string
}

interface IField {
    id: string
    label: string
    type: string
}

interface ICardRelationship {
    name: string
    cards: ICard[]
}

type Operation = "ADD" | "REMOVE" | "REPLACE"

export interface IUpdateFieldResponse {
    data: {
        updateFieldsValues: {
            success: boolean
            userErrors: IPipefyError[]
        }
    }
}

interface IPipefyError {
    message: string
}


export default class Card {

    constructor(id: string | number) {
        this.cardId = id
    }

    async initializeCard() {
        this.rawCardData = await this._getCardData(this.cardId)
        this.title = this.rawCardData.data.card.title
        this.parentRelations = this._getCleanRealtions(this.rawCardData.data.card.parent_relations)
        this.childRelations = this._getCleanRealtions(this.rawCardData.data.card.child_relations)
    }

    cardId: string | number
    rawCardData: IPipefyCard | null = null
    title: string | null = null
    parentRelations: ICardRelationship[] = []
    childRelations: ICardRelationship[] = []



    async _getCardData(cardId: string | number): Promise<IPipefyCard> {
        if (!this.rawCardData) {
            return await PipefyClient.safeQueryPipefy(PipefyConstants.GET_CARD, { id: cardId })
        } else {
            return this.rawCardData
        }
    }

    public getField(fieldId: string): ICardField | undefined {
        if (this.rawCardData === null || this.rawCardData.data.card === null) { return undefined }
        return this.rawCardData.data.card.fields.find(field => field.field.id === fieldId)
    }

    public async updateField(fieldId: string, value: string, operation: Operation = "REPLACE"): Promise<IUpdateFieldResponse> {
        const variables = {
            input: {
                nodeId: this.cardId,
                values: [
                    {
                        fieldId,
                        value,
                        operation
                    }
                ]
            }
        }
        return await PipefyClient.safeQueryPipefy(PipefyConstants.UPDATE_FIELDS_VALUES, variables)
    }

    private _getCleanRealtions(relations: ICardRelationship[]) {
        return relations
            .filter((relation: ICardRelationship) => relation.cards.length > 0)
    }

}