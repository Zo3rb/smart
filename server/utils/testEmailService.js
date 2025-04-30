// Load environment variables for development
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const emailService = require("./emailService");
const logger = require("./logger");

/**
 * Test the email service with a sample email
 */
async function testEmailService() {
  console.log(
    "Testing email service in",
    process.env.NODE_ENV || "development",
    "environment"
  );

  // Check if email configuration exists and print status for debugging
  if (!process.env.EMAIL_HOST) {
    console.error("ERROR: EMAIL_HOST is not configured");
    logger.error("EMAIL_HOST is not configured in environment variables");
    return;
  }
  if (!process.env.EMAIL_PORT) {
    console.error("ERROR: EMAIL_PORT is not configured");
    logger.error("EMAIL_PORT is not configured in environment variables");
    return;
  }

  console.log("Email configuration found:");
  console.log("- HOST:", process.env.EMAIL_HOST);
  console.log("- PORT:", process.env.EMAIL_PORT);
  console.log("- SECURE:", process.env.EMAIL_SECURE || "false");
  console.log("- FROM:", process.env.EMAIL_FROM || "noreply@erpsystem.com");
  console.log(
    "- AUTH:",
    process.env.EMAIL_USER ? "Configured" : "Not configured"
  );

  const testEmail = process.env.TEST_EMAIL || "example@email.com";
  console.log("Sending test email to:", testEmail);

  try {
    // Initialize the email service
    const initialized = emailService.initialize();

    if (!initialized) {
      console.error("Failed to initialize email service");
      return;
    }

    // Send a test email
    console.log("Attempting to send email...");
    const result = await emailService.sendMail({
      to: testEmail,
      subject: "Smart ERP Email Service Test",
      html: `
        <h1>Email Service Test</h1>
        <p>This is a test email from the Smart ERP system.</p>
        <p>If you received this email, the email service is working properly.</p>
        <p>Time sent: ${new Date().toISOString()}</p>
        <p>Environment: ${process.env.NODE_ENV || "development"}</p>
      `,
    });

    if (result) {
      console.log("✓ SUCCESS: Email sent successfully!");
      console.log("- Message ID:", result.messageId);
      logger.info("Test email sent successfully!", {
        metadata: {
          messageId: result.messageId,
        },
      });
    } else {
      console.error("✗ FAILED: Could not send email");
      logger.error("Failed to send test email");
    }
  } catch (error) {
    console.error("✗ ERROR:", error.message);
    console.error(error.stack);
    logger.error("Error testing email service", {
      metadata: {
        error: error.message,
        stack: error.stack,
      },
    });
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  console.log("Running email test utility...");
  testEmailService()
    .then(() => {
      console.log("Email test completed");
      process.exit();
    })
    .catch((err) => {
      console.error("Uncaught error during email test:", err);
      process.exit(1);
    });
}

module.exports = { testEmailService };
