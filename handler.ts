import Webhook from './src/webhook'

module.exports.sendUpdateMessage = async (event: any) => {
    let body: any
    try {
        body = JSON.parse(event.body)
    } catch (e) {
        console.log(`There was an error parsing the json body
            body: ${event.body}
            error: ${e}`)
    }
    const webhook = new Webhook(body)
    console.log(webhook.raw)
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
