const randomInt = require('random-int');
const uuid = require('uuid/v1');
var AWS = require('aws-sdk');

// Set the region 
// AWS.config.update({region: 'us-east-2'});
AWS.config.update({ 
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key,
    sessionToken: process.env.aws_session_token,
    region: process.env.region
});

//public functions

module.exports = {
  
  
    getUser: function (phoneNumber) {
      var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
      var params = {
         TableName: "users",
         Key: 
            {
                'phoneNumber': phoneNumber
            }
        };
        //return promise object for async and success/failure handling in main app.js
      return docClient.get(params).promise();
    },
    
    createUser: function (phoneNumber) {
        // Create DynamoDB document client
        var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
       
       
        //add attributes to item
        var params = {
          TableName: 'users',
          Item: {
            'phoneNumber': phoneNumber
          }
        };
        
        return docClient.put(params).promise();
    },
    
    updateUserXeroAccessToken: function (phoneNumber, xeroAccessToken) {
        var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
        
        var params = {
         TableName: "users",
         Key: 
            {
                'phoneNumber': phoneNumber
            },
        UpdateExpression: "set xeroAccessToken = :xeroAccessToken",
            ExpressionAttributeValues: {
                ":xeroAccessToken": xeroAccessToken
            },
            ReturnValues:"UPDATED_NEW"
        };
        
        //return promise object for async and success/failure handling in main app.js
        return docClient.update(params).promise();
    },
    
    updateUserOrgDetails: function (phoneNumber, orgName, orgId) {
      var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
      var params = {
         TableName: "users",
         Key: 
            {
                'phoneNumber': phoneNumber
            },
        UpdateExpression: "set orgName = :orgName, set orgId = :orgId",
            ExpressionAttributeValues: {
                ":orgName": orgName,
                ":orgId": orgId
            },
            ReturnValues:"UPDATED_NEW"
        };
        
        //return promise object for async and success/failure handling in main app.js
      return docClient.update(params).promise();
    },
    
    updateUserInvoices: function (phoneNumber, invoices) {
      var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
      var params = {
         TableName: "users",
         Key: 
            {
                'phoneNumber': phoneNumber
            },
        UpdateExpression: "set invoices = :invoices",
            ExpressionAttributeValues: {
                ":invoices": invoices
            },
            ReturnValues:"UPDATED_NEW"
        };
        
        //return promise object for async and success/failure handling in main app.js
      return docClient.update(params).promise();
    }
    
  
    //old way of getting user details without using promises
    // getUserDetails: function (phoneNumber, onSuccess) {
        
    //     // Create DynamoDB document client
    //     var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
        
    //     var params = {
    //     TableName: "users",
    //     Key: 
    //         {
    //             'phoneNumber': phoneNumber
    //         }
    //     };
        
    //     const data = docClient.get(params, function(err, data) {
    //       if (err) {
    //         console.log("Error getting user: ", err);
    //       } else {
    //         console.log("Success getting user: ", data.Item);
    //         onSuccess(data.Item);
    //       }
    //     });
    // },
    
    
    
    // createTable: function () {
    //     // Create the DynamoDB service object
    //     var ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});
        
    //     var params = {
    //       AttributeDefinitions: [
    //         {
    //           AttributeName: 'USER_ID',
    //           AttributeType: 'S'
    //         },
    //         {
    //           AttributeName: 'USER_PHONE',
    //           AttributeType: 'N'
    //         }
    //       ],
    //       KeySchema: [
    //         {
    //           AttributeName: 'USER_ID',
    //           KeyType: 'HASH'
    //         },
    //         {
    //           AttributeName: 'USER_PHONE',
    //           KeyType: 'RANGE'
    //         }
    //       ],
    //       ProvisionedThroughput: {
    //         ReadCapacityUnits: 1,
    //         WriteCapacityUnits: 1
    //       },
    //       TableName: 'BANANA_LIST',
    //       StreamSpecification: {
    //         StreamEnabled: false
    //       },
    //     }
    
        
    //     ddb.createTable(params, function(err, data) {
    //       if (err) {
    //         console.log("Error", err);
    //       } else {
    //         console.log("Table Created", data);
    //       }
    //     });
    // }

};


//private functions
