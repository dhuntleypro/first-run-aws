# first-run-aws

# Backend

# Update Code

1. aws - lambda
2. Function
3. Code
4. Upload from.. (upload zipped version of backend content)

# view users

1. aws - DynamoDB
2. tables
3. Select table
4. explore items

Users are listed under Items returned

---

# Setup Steps

DynamoDB

1. Search for DynamoDB in aws
2. Create Table
3. Table name : <tableName>
4. Primary Key : username

IAM

1. Search for IAM in aws
2. Click Roles on the left
3. Create Role
4. Lambda
5. Create

ADD Policy

1. Add Policy
2. CloudWatchLogsFullAccess
3. AmazonDynamoDBFullAccess
4. Next (skip tag)
5. Role Name : <roleName>
6. Role Description : allow lambda functions to call AWS services on your behalf
7. Create

Lambda Function

1. Create Function
2. Function name : <functionName>
3. Runtime : Node
4. Select - Change default execution role
   1. Use Existing role
   2. Select <roleName>
5. Create function
6. Select Configuration
7. Edit
8. Set timeout to 5 instead of 3
9. Memory (MB) : 500 MB
10. Save

API Gateway

1. Get started
2. Select REST API
3. Build
4. Ok
5. New API
6. Name : <gatewayName>
7. Create API
8. Select Action - (health)
   1. Create Resources
   2. Resource name : health
   3. Check box : Enable API Gateway CORS
   4. Create Resources
   5. Select Action
      1. Create Method
      2. Options : GET
      3. Click checkbox
      4. Check box : Use Lambda Proxy integration
      5. Lambda Function : <functionName>
      6. Save
9. Select Action - (register)
   1. Create Resources
   2. Resource name : register
   3. Check box : Enable API Gateway CORS
   4. Create Resources
   5. Select Action
      1. Create Method
      2. Options : POST
      3. Click checkbox
      4. Check box : Use Lambda Proxy integration
      5. Lambda Function : <functionName>
      6. Save
10. Select Action - (login)
    1. Create Resources
    2. Resource name : login
    3. Check box : Enable API Gateway CORS
    4. Create Resources
    5. Select Action
       1. Create Method
       2. Options : GET
       3. Click checkbox
       4. Check box : Use Lambda Proxy integration
       5. Lambda Function : <functionName>
       6. Save
11. Select Action - (verify)
    1. Create Resources
    2. Resource name : verify
    3. Check box : Enable API Gateway CORS
    4. Create Resources
    5. Select Action
       1. Create Method
       2. Options : GET
       3. Click checkbox
       4. Check box : Use Lambda Proxy integration
       5. Lambda Function : <functionName>
       6. Save
12. Select root
    1. Select Action
    2. Deploy API
    3. Deployment stage
    4. stage name : prod

Create Sample Data in Lambda

1. Click Lambda tab
2. Code
3. Select index.js
4. Paste….

const healthPath = '/health'
const registerPath = '/register'
const loginPath = '/login'
const verifyPath = '/verify'

exports.handler = async (event) => {
console.log('Request Event: ', event)
let response;
switch(true) {
case event.httpMethod === 'GET' && event.path === healthPath:
response = buildResponse(200);
break;
case event.httpMethod === 'POST' && event.path === registerPath:
response = buildResponse(200);
break;
case event.httpMethod === 'POST' && event.path === loginPath:
response = buildResponse(200);
break;
case event.httpMethod === 'POST' && event.path === verifyPath:
response = buildResponse(200);
break;
default:
response = buildResponse(404, '404 Not Found');
}
return response;
};

function buildResponse(statusCode, body) {
return {
statusCode: statusCode,
headers: {
'Access-Control-Allow-Origin': '\*',
'Content-Type': 'application/json'
},
body: JSON.stringify(body)

    }

}

————————————————————————————————
Confirm You are Hitting API

1. GO to API Gateway
2. Copy of the URL
3. Open Postman on computer
4. Paste and add /health at the end as a GET Request ( Should return 200 )
5. Test each - /health + /login + /register + /verify

LOCK API (Currently open)

1. GO to API Gateway
2. API on the left
3. Action
   1. Create Api Key
   2. Name : website-client
   3. Set
   4. Click (Show)

Click on API On the left

1. Select the current API
2. Select “Usage Plans” on the left
3. Create
4. Name : the-plan
5. Rate : 1000
6. Burst : 500
7. Quota : 1000000 (million)
8. Next
9. Add Api Stage
10. Select : <gatewayName>
11. Stage : prod]
12. Check mark
13. Next
14. Add API Key to usage plan
15. Name : website-client
16. Check
17. Done

Set Each API To Required

1. Go to API Gateway
2. Select the Get / Post
3. Method
4. Set API Key Required to true
5. Check Mark
6. For each 1
7. Click Root
8. Deplot APi
9. Deployment Stage : prod
10. Deploy

Test

1. If you Send the request again on any of the for now in postman it should return
   1. 403 forbidden

Get Access

1. Go to Api Key
2. (Show)
3. Copy
4. Open Postman
5. Set to /heath
6. Select Header
   1. KEY : x-api-key
   2. VALUE : <apikey>
7. Send
8. Works : 200 OK
9.
10.

Put Zip Database Structure in AWS

1. Zip backend
2. Go to lambda
3. Code
4. Upload from
5. Select Zip file

Set Up Environment Variables

1. Configure
2. Environment Variables
3. Edit
4. Add
5. Enter Environment Variables
