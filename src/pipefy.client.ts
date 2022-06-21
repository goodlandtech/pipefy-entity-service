require('dotenv').config()
const axios = require('axios')
import PipefyConstants, { IQuery } from "../src/pipefy.constants"

export default class PipefyClient {
    static async queryPipefy(query: string, variables: any): Promise<any> {
        const options = {
            url: 'https://api.pipefy.com/graphql',
            method: 'post',
            data: { query, variables },
            headers: {
                "Content-Type": "application/json",
                "Authorization": process.env.PIPEFY_TOKEN
            }
        }
        return axios(options)
    }

    static async safeQueryPipefy(query: IQuery, variables: any) {
        const tryNum = 3
        let result
        for (let index = 0; index < tryNum; index++) {
            let response: any
            console.log(`Context, ${query.title} request, values: ${JSON.stringify(variables, null, 3)}`)
            try {
                response = await PipefyClient.queryPipefy(query.query, variables)
                    .catch((error) => {
                        if (error.response.status >= 500) {
                            console.log(`Context, ${query.title} error, Internal error within Pipefy`)
                        } else if (error.response.status === 401) {
                            console.log(`Context, ${query.title} error, Unauthorized. A valid token was not passed within the request header.`)
                        } else if (error.response.status === 404) {
                            console.log(`Context, ${query.title} error, Not found. The resource is not available.`)
                        } else if (error.response.status === 422) {
                            console.log(`Context, ${query.title} error, Unprocessable Entity. Pipefy is not able to process the request.`)
                        } else if (error.response.status === 429) {
                            console.log(`Context, ${query.title} error, Too many requests. This error occurs when you reach the rate limit for API Calls.`)
                            // TODO: Wait 5 minutes and then try the request again
                        }
                        result = {}
                    })
                if (response.status === 200) {
                    console.log(`Context, ${query.title} response, status: ${response.status}, body: ${JSON.stringify(response.data, null, 3)}`)
                    result = response.data
                    break
                }
            } catch { }
        }
        return result
    }

}

// const exampleQuery = async () => {
//     safeQueryPipefy(PipefyConstants.GET_RECORD, { id: "534094448" })
// }

// exampleQuery()