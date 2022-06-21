import Webhook, { IWebhook, IMoveWebhook } from "./webhook";
import Card from "./pipefy.card"

const mockWebhook: IWebhook = {
    "data": {
        "action": "card.create",
        "from": {
            "id": 7861103,
            "name": "Reviewing"
        },
        "to": {
            "id": 315470412,
            "name": "QA"
        },
        "moved_by": {
            "id": 918760,
            "name": "Jordan Casale",
            "username": "jcasale",
            "email": "jordan@ciphertracelabs.com",
            "avatar_url": "https://gravatar.com/avatar/f032204cd3da69faa81733a06970a3e7.png?s=144\u0026d=https://pipestyle.staticpipefy.com/v2-temp/illustrations/avatar.png"
        },
        "card": {
            "id": 535408542,
            "title": "Card Create Test",
            "pipe_id": "RgvuLnO4"
        }
    }
}

const testWebhook = async () => {
    const testWebhook = new Webhook(mockWebhook)
    const mockCard = new Card(testWebhook.raw.data.card.id)
    await mockCard.initializeCard()
    await testWebhook.validate(mockCard)
    console.log(testWebhook.isValid)
    if (!testWebhook.isValid) { console.log(`A ${testWebhook.movement} webhook has already been processed for card ${mockCard.cardId} with title ${mockCard.title}`); return { message: "this should be an API response message" } }

}

const testCard = async () => {
    const mockCard = new Card("543188749")
    await mockCard.initializeCard()
    console.log(JSON.stringify(mockCard.childRelations, null, 3))
    console.log(JSON.stringify(mockCard.parentRelations, null, 3))
}

testCard()
