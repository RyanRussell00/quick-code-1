const AWS = require('aws-sdk');  // AWS software development kit
const dynamoDBClient = new AWS.DynamoDB.DocumentClient();  // create new instance? 

// ** TODO CHANGE THIS TO YOUR TABLE'S PARTITION KEY (id, email, etc) **
// const partitionKey = "table-partition-key";
const partitionKey = "primary-key-of-table"

exports.handler = async (event) => {
    
    // Uncomment below to see what the event looks like
    // console.log("Event object", event);
    
    var keyParam = "";
    
    // Below is 2 different ways to get parameters from the event, comment out
    // whichever one you don't want to use
    
    // try to get key from query parameters, set to empty string if null
    if (event["queryStringParameters"]) {
        keyParam = event["queryStringParameters"]["key"] || "";
    }
    
    // Try to get key from event body, set to empty string if null
    if (event["body"]) {
        // Need to parse the JSON object for the event to work
        keyParam = JSON.parse(event["body"])["key"] || "";
    }
    
    // Basic error handling
    if (keyParam === "") {
        // Return an error status code and error message
        return {
            statusCode: 400,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify("ERROR: Bad or malformed parameters"),
        }
    }
    
    // DynamoDB expects the unique identifier for the table (partition key) to
    // come in a JSON
    const keyJSON = {}
    keyJSON[partitionKey] = keyParam
    
    // params "object" of what it being fetched from the table
    const params = {
        // ** TODO: CHANGE TableName TO THE NAME OF THE TABLE YOU WANT **
        TableName : "name-of-table",
        Key : keyJSON
    }
    
    // Return success object, the body is the actual call to DynamoDB
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        // Need to stringify since we are using "Lambda Proxy Integration"
        // Read more: https://stackoverflow.com/a/53955884
        body: JSON.stringify(await dynamoDBClient.get(params).promise())
    };
};
