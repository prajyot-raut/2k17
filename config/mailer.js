const nodemailer = require('nodemailer');
const { createDate } = require('../utils/time');
const deviceInfo = require('../middlewares/device');

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

async function sendEmail(to, subject, htmlContent) {
  try {
    var mailOptions = {
      from: '"2k17 Platform" <2k17platform@gmail.com>',
      to,
      subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

async function LoginMail(to, data) {
  var template = `<div style="background-color:#1f1c2e; color:#ffffffcc; font-family:sans-serif; padding:20px;">
  <h3 style="color:#7b5cf0;">Security Alert</h3>
  <p>Someone logged in to your account recently. If this wasn’t you, please <a href="" style="color:#7b5cf0;">change your password</a> immediately.</p>
  <div style="margin-top:20px; padding:10px; background-color:#2b273f; border-left:4px solid #6342d8;">
    <p style="margin:0;">Browser: ${deviceInfo(data.useragent)}</p>
    <p style="margin:0;">Authentication Method: ${data.method}</p>
    <p style="margin:0;">Time: ${createDate()}</p>
  </div>
  <p style="color:#888; margin-top:20px;">
    Regards,<br>
    2k17 Platform
  </p>
</div>
`
  sendEmail(to, 'Login Alert • 2k17 Platform', template);
}

async function OTPMail(to, data) {
  var template = `<div style="margin: 0; padding: 0; background-color: #1f1c2e; font-family: sans-serif; color: #ffffffcc;">
    <div style="max-width: 600px; margin: 0 auto; padding: 30px 20px;">
      <div style="background-color: #2b273f; border-radius: 8px; padding: 30px;">
        <h3 style="color: #7b5cf0; margin-top: 0;">Verify Your Email</h3>
        <p style="margin: 15px 0;">To continue, use the following one-time password:</p>

        <div style="font-size: 28px; font-weight: bold; background-color: #2c283d; color: #ffffffcc; padding: 14px 0; border-radius: 6px; display: inline-block; letter-spacing: 5px; margin: 8px 0;">
          ${data.otp}
        </div>

        <p style="color: #888; font-size: 14px;">
          This code is valid for the next 10 minutes. If you didn’t request this, you can safely ignore this message.<br><br>
          <small>OTP Requested from ${deviceInfo(data.useragent)}</small>
        </p>

        <p style="margin-top: 40px; font-size: 13px; color: #888;">
          Regards,<br>
          2k17 Platform
        </p>
      </div>
    </div>
  </div>`

  sendEmail(to, 'OTP for login • 2k17 Platform', template);
}

async function NewCommentMail(to, data) {
  var template = `<body style="margin: 0; padding: 0; background-color: #1f1c2e; font-family: sans-serif; color: #ffffffcc;">

  <div style="max-width: 600px; margin: 0 auto; padding: 30px 20px;">
    <div style="background-color: #2b273f; border-radius: 8px; padding: 30px;">

      <h3 style="color: #7b5cf0; margin-top: 0;">New comment on your post</h3>

      <p style="margin: 15px 0;">
        <strong style="color: #ffffff;">${data.user.username} (${data.user.name.split(' ')[0]} ${data.user.name.split(' ')[1][0]}.)</strong> commented on your post:
      </p>

      <div style="background-color: #2c283d; padding: 12px; border-left: 4px solid #7b5cf0; border-radius: 4px; margin: 12px 0; color: #ffffffcc;">
        “${data.comment}”
      </div>

      <a href="${data.postLink}" style="display: inline-block; margin-top: 20px; padding: 10px 18px; background-color: #7b5cf0; color: white; text-decoration: none; border-radius: 5px; font-size: 15px;">
        View Post
      </a>

      <p style="color: #888; font-size: 14px; margin-top: 40px;">
        You’re receiving this because you posted on 2k17 Platform.
      </p>

      <p style="font-size: 14px; color: #888; line-height: 21px;">
        Regards,<br>
        2k17 Platform
      </p>

    </div>
  </div>

</body>`

  sendEmail(to, 'New comment on your post • 2k17 Platform', template);
}

async function UserReportMail(to, data) {
  var template = `<div style="font-family: Arial, sans-serif; background-color: #1f1c2e; color: #ffffffcc; padding: 20px;">
    <h3 style="color: #7b5cf0;">We've received your report</h3>
    <p>Hi <strong>${data.name}</strong>,</p>
    <p>Thanks for taking the time to let us know. We've received your report as follows :</p>

    <div style="background-color: #2b273f; padding: 15px; border-left: 4px solid #7b5cf0; margin: 20px 0;">
      <p style="margin-top: 5px; color: #ffffffcc;"><b>Subject : </b> ${data.subject}</p>
      <p style="margin-top: 5px; color: #ffffffcc;"><b>Details : </b> ${data.details}</p>
      <p style="margin-top: 5px; color: #ffffffcc;"><b>Submission Time : </b> ${createDate()}</p>
    </div>

    <p>We'll look into it as soon as possible.</p>
    <p style="color: #888;">
      Regards,<br>
      2k17 Platform
    </p>
  </div>`

  sendEmail(to, "Report received • 2k17 Platform", template);
}

async function AdminReportMail(to, data) {
  var template = `<div style="font-family: Arial, sans-serif; background-color: #1f1c2e; color: #ffffffcc; padding: 20px;">
    <h3 style="color: #7b5cf0;">New Report Submitted</h3>
    <p>A new report has been submitted:</p>

    <div style="background-color: #2b273f; padding: 15px; border-left: 4px solid #7b5cf0; margin: 20px 0;">
      <p><strong>From:</strong> ${data.name || "Anonymous"}</p>
      <p style="margin-top: 5px;"><strong>Subject:</strong> ${data.subject}</p>
      <p style="margin-top: 5px;"><strong>Details:</strong> ${data.details}</p>
      <p style="margin-top: 5px;"><strong>Time:</strong> ${createDate()}</p>
    </div>

    <p style="color: #888;">Login to the admin panel to manage this report.</p>
    <p style="color: #888;">Automated Report System<br>2k17 Platform</p>
  </div>`

  sendEmail(to, "New Report Submitted • 2k17 Platform", template);
}

async function VerifyNewEmailMail(to, data) {
  var template = `
        <div style="font-family: sans-serif; background: #1f1c2e; color: #ffffffcc; padding: 20px; border-radius: 10px;">
  <h3 style="color: #7b5cf0;">Please Verify Your New Email Address</h3>
  <p>Hello ${data.name || 'there'},</p>
  <p>We received a request to update your email address for your 2k17 account.</p>
  <a href="${data.link}" style="display: inline-block; padding: 10px 20px; background: #7b5cf0; color: white; text-decoration: none; border-radius: 5px;">Verify Email Address</a>
  <p style="margin-top: 20px; color: #888;">
    This link is valid for 30 minutes. If you did not request this change, please ignore this email or contact support.
  </p>
  <p style="color: #888;">
    Regards,<br>
    2k17 Platform
  </p>
</div>

      `
  sendEmail(to, 'Verify your new email • 2k17 Platform', template);
}

async function ResetPasswordMail(to, data) {
  var template = `
        <div style="font-family: sans-serif; background: #1f1c2e; color: #ffffffcc; padding: 20px; border-radius: 10px;">
  <h3 style="color: #7b5cf0;">Link to reset your password</h3>
  <p>Hello ${data.name || 'there'},</p>
  <p>We received a request to reset password of your 2k17 account.</p>
  <p>Please click on button below to set new password</p>
  <a href="${data.link}" style="display: inline-block; padding: 10px 20px; background: #7b5cf0; color: white; text-decoration: none; border-radius: 5px;">Reset password</a>
  <p style="margin-top: 20px; color: #888;">
    This link is valid for 1 hour. If you did not request this change, please ignore this email or contact support.
  </p>
  <p style="color: #888;">
    Regards,<br>
    2k17 Platform
  </p>
</div>

      `
  sendEmail(to, 'Password reset link • 2k17 Platform', template);
}

async function sendMail(type, to, data) {
  /* if (type == 'login') LoginMail(to, data);
  if (type == 'otp') OTPMail(to, data);
  if (type == 'newcomment') NewCommentMail(to, data); 
  if (type == 'report_user') UserReportMail(to, data);
  if (type == 'report_admins') AdminReportMail(to, data);
  if (type == 'verify-new-email') VerifyNewEmailMail(to, data);
  if (type == 'reset-password') ResetPasswordMail(to, data);
  // commented to avoid sending emails during development */
}

module.exports = sendMail;
