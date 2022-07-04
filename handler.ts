import EntityUpdate from './src/entity-update'
import Webhook from './src/webhook'
import Card from './src/pipefy.card'

module.exports.publishEntity = async (event: any) => {
    let body: any
    try {
        body = JSON.parse(event.body)
    } catch (e) {
        console.log(`There was an error parsing the json body
            body: ${event.body}
            error: ${e}`)
    }
    console.log("test")
    const webhook = new Webhook(body)
    const card = new Card(webhook.cardId)
    await card.initializeCard()
    const entityUpdateService = new EntityUpdate(webhook, card)
    console.log(entityUpdateService.cardId)
    console.log(entityUpdateService.cipherTraceId)
    console.log(entityUpdateService.fieldId)
    console.log(entityUpdateService.newValue)
    entityUpdateService.publishUpdate(entityUpdateService.fieldId)

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: 'Go Serverless v1.0! Your function executed successfully!',
                input: event,
            },
            null,
            2
        ),
    };
};
