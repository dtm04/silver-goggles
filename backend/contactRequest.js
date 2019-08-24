import uuid from "uuid";
import AWS from "aws-sdk";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
const moment = require('moment');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export function main(event, context, callback) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: "contact_form",
    Item: {
      userId: uuid.v1(),
      content: data.content,
      email: data.email,
      createdAt: moment().format("MM-D-YYYY-H:mm:ss");
    },
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch(e) {
    return failure({ status: false });
  }
}
