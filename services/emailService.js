const nodemailer = require("nodemailer");

const emailConfig = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "anamolina.r08@gmail.com",
    pass: "mpei uzwn pioj xbye",
  },
});

const registerEmail = async (to) => {
  try {
    const mailOptions = {
      from: "anamolina.r08@gmail.com",
      to: to,
      subject: "Confirmation of registration in TransactFlow",
      html: `
                <h1> It is a pleasure to welcome TransactFlow</h1>
                <p>Your account has been successfully registered and is ready for use.</p>
                <p>From now on, you can access all the functionalities that our platform offers to manage your transactions efficiently and securely</p>
                <p>If you have any questions or need additional assistance, please do not hesitate to contact our support team who will be happy to help</p>
                <br>
                <p>Sincerely,</p>
                <p>The TransactFlow team</p>
            `,
    };

    await emailConfig.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending the email", error.message);
  }
};

const doneTransactionEmail = async (to) => {
  try {
    const mailOptions = {
      from: "anamolina.r08@gmail.com",
      to: to,
      subject: "Transaction Processed Correctly",
      html: `
                <h1>We are pleased to inform you that your transaction has been successfully processed.</h1>
                <p>Your payment has been received and your application completed. You can check the status of your transaction or perform more actions on your account.</p>
                <p>If you have any questions or need additional assistance, please do not hesitate to contact our support team who will be happy to help</p>
                <p>We appreciate your trust and assure you that we are committed to providing the best possible service.</p>
                <br>
                <p>Sincerely,</p>
                <p>The TransactFlow team</p>
            `,
    };

    await emailConfig.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending the email", error.message);
  }
};

const receivedTransactionEmail = async (to) => {
  try {
    const mailOptions = {
      from: "anamolina.r08@gmail.com",
      to: to,
      subject: "Transaction Received Confirmation",
      html: `
                <h1>We are pleased to inform you that you have successfully received a transaction.</h1>
                <p>Your balance has been updated, and the received amount has been successfully added to your account.</p>
                <p>If you have any questions or need additional assistance, please do not hesitate to contact our support team who will be happy to help</p>
                <p>We appreciate your trust and remain committed to providing the best service possible.</p>
                <br>
                <p>Sincerely,</p>
                <p>The TransactFlow team</p>
            `,
    };

    await emailConfig.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending the email", error.message);
  }
};

const changePasswordEmail = async (to) => {
  try {
    const mailOptions = {
      from: "anamolina.r08@gmail.com",
      to: to,
      subject: "Confirmation of password change",
      html: `
                <h1>We confirm that your password has been successfully changed in TransactFlow</h1>
                <p>If you did not request this change, we recommend that you change your password immediately and review your account activity.</p>
                <p>For any queries, please do not hesitate to contact us.</p>
                <br>
                <p>Sincerely,</p>
                <p>The TransactFlow team</p>
            `,
    };

    await emailConfig.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending the email", error.message);
  }
};


module.exports = {  registerEmail,  doneTransactionEmail,  receivedTransactionEmail, changePasswordEmail };
