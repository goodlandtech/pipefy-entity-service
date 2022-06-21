
export interface IQuery {
  title: string
  query: string
  variableExample: string
}

export default class PipefyConstants {
  static GET_RECORD: IQuery = {
    title: "Get Record",
    query: `
        query getTableRecord($id:ID!){
            table_record(id: $id) {
              id
              record_fields {
                field {
                  id
                  type
                }
                array_value
                name
                value
              }
            }
          }
        `,
    variableExample: `
        {
            id: "534094448"
        }`
  }

  static GET_CARD: IQuery = {
    title: "Get Card",
    query: `
        query getCardData($id: ID!) {
            card(id: $id) {
              created_by {
                name
              }
              pipe {
                id
                name
              }
              id
              title
              labels {
                id
                name
              }
              fields {
                field {
                  label
                  id
                  type
                }
                value
                array_value
              }
              child_relations {
                name
                ... on CardRelationship {
                  cards {
                    pipe {
                      name
                      id
                    }
                    id
                    title
                    fields {
                      field {
                        id
                        label
                        type
                      }
                      value
                    }
                  }
                }
              }
              parent_relations {
                name
                ... on CardRelationship {
                  cards {
                    pipe {
                      id
                      name
                    }
                    id
                    title
                    fields {
                      field {
                        id
                        label
                        type
                      }
                      value
                    }
                  }
                }
              }
            }
          }
          
          
        `,
    variableExample: `
        { 
            "id": "531810237"
        }`
  }

  static UPDATE_FIELDS_VALUES: IQuery = {
    title: "Update Fields Values",
    query: `mutation($input:UpdateFieldsValuesInput!){
        updateFieldsValues(input: $input) {
          success
          userErrors {
            message
          }
          updatedNode
        }
      }`,
    variableExample: `{
        "input": {
        "nodeId": "",
        "values": [
            {
              "fieldId": "",
              "value": "",
              "operation": "ADD"
            }
          ]
        }
      }`
  }
}