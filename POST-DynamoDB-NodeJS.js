const AWS = require('aws-sdk');  // AWS software development kit
const dynamoDBClient = new AWS.DynamoDB.DocumentClient();  // create new instance? 

/*
!! NOTE:
The body of the event must contain the data that you want inserted as a JSON.
The keys will become the name of the column in DynamoDB, make sure they're correct!!
*/
exports.handler = async (event) => {
    
    // Uncomment below to see what the event looks like
    // console.log("Event object", event);

    // params "object" of what it being inserted into table
    const params = {
        // ** TODO: CHANGE TableName TO THE NAME OF THE TABLE YOU WANT **
        TableName : "name-of-table",
        Item: event
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
        body: JSON.stringify(await dynamoDBClient.put(params).promise())
    };
};
