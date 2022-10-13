const AWS = require("aws-sdk");
var ses = new AWS.SES();

let fromAddress = process.env.FROM_ADDRESS;

export const send_email = async (event, context) => {
  for (const record of event.Records) {
    if (record.eventName === "INSERT") {
      let pk = record.dynamodb.NewImage.pk.S.split("_");
      let otp = pk[1];
      let toAddress = record.dynamodb.NewImage.email.S;

      await sendEmail(otp, toAddress);
    }
  }
};

async function sendEmail(otp, toAddress) {
  var htmlBody =
    `<!DOCTYPE html>
      <html>
        <body>
          <p>Use this code to verify your login at Josh's magical mystery Thoughtful application app</p>
          <p><h1>` + otp + `</h1></p>
        </body>
      </html>`;

  const params = {
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmlBody,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Your OTP from the Thoughtful Coding challenge",
      },
    },
    Source: "SimpleOTP <" + fromAddress + ">",
  };

  await ses.sendEmail(params).promise();
}