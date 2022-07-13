import Webhook from "../src/webhook";

test(`Field Update Webhook`, () => {
    const updateWebhook = {
        "data": {
            "action": "card.field_update",
            "field": {
                "id": "entity_type",
                "label": "Testing",
                "internal_id": 16927805
            },
            "new_value": "Exchange",
            "card": {
                "id": 523118566,
                "pipe_id": "YYpt4OMQ"
            }
        }
    }
    const { cardId, field, newValue, action, userName } = new Webhook(updateWebhook)
    expect(cardId).toBe(523118566)
    expect(field).toBe("entity_type")
    expect(newValue).toBe("Exchange")
    expect(action).toBe("card.field_update")
    expect(userName).toBe(undefined)
})

test(`Delete Webhook`, () => {
    const deleteWebhook = {
        "data": {
            "action": "card.delete",
            "deleted_by": {
                "id": 918760,
                "name": "Jordan Casale",
                "username": "jcasale",
                "email": "jcasale@goodland.tech",
                "avatar_url": "https://gravatar.com/avatar/70f3097e394b5cc592e777a499ab99df.png?s=144&d=https://pipestyle.staticpipefy.com/v2-temp/illustrations/avatar.png"
            },
            "card": {
                "id": "56871820",
                "pipe_id": "YYpt4OMQ"
            }
        }
    }
    const { cardId, action, pipeId, field, newValue, userName, } = new Webhook(deleteWebhook)
    expect(cardId).toBe("56871820")
    expect(action).toBe("card.delete")
    expect(pipeId).toBe("YYpt4OMQ")
    expect(field).toBe(undefined)
    expect(newValue).toBe(undefined)
    expect(userName).toBe("jcasale")
})

test(`Create Webhook`, () => {
    const createWebhook = {
        "data": {
            "action": "card.create",
            "card": {
                "id": 428902082,
                "pipe_id": "YYpt4OMQ"
            }
        }
    }
    const { cardId, action, pipeId, field, newValue, userName, } = new Webhook(createWebhook)
    expect(cardId).toBe(428902082)
    expect(action).toBe("card.create")
    expect(pipeId).toBe("YYpt4OMQ")
    expect(field).toBe(undefined)
    expect(newValue).toBe(undefined)
    expect(userName).toBe(undefined)
})

test(`Empty Webhook`, () => {
    const webhook = {}
    const { cardId, action, pipeId, field, newValue, userName, } = new Webhook(webhook)
    expect(cardId).toBe(undefined)
    expect(action).toBe(undefined)
    expect(pipeId).toBe(undefined)
    expect(field).toBe(undefined)
    expect(newValue).toBe(undefined)
    expect(userName).toBe(undefined)
})

