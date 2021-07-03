const AWS = require('aws-sdk');  // AWS software development kit
const client = new AWS.DynamoDB.DocumentClient();  // create new instance? 

exports.handler = async (event) => {
    
    if (!event || !event["email"] || !event["name"]) {
        return {
            statusCode: 400,
            body: "ERROR: Invalid paremeters sent"
        }
    }
    
    // params "object" of what it being inserted into tabel
    const params = {
        TableName : "name-of-table",
        Item : {
            "primary-key-of-table" : event["email"],
            "name" : event["name"]
        }
    }
    
    return {
        statusCode: 200,
        body: await client.put(params).promise()
    };
};
