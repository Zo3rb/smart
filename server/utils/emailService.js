const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const logger = require("./logger");

/**
 * Email Service for sending various types of emails
 */
class EmailService {
  constructor() {
    this.transporter = null;
    this.initialized = false;
    this.from = process.env.EMAIL_FROM || "noreply@erpsystem.com";
    this.templatesDir = path.join(__dirname, "../templates/emails");

    // Create templates directory if it doesn't exist
    if (!fs.existsSync(this.templatesDir)) {
      fs.mkdirSync(this.templatesDir, { recursive: true });
    }
  }

  /**
   * Initialize the email transporter
   * @returns {Boolean} Success status
   */
  initialize() {
    try {
      // Check if required configuration exists
      if (!process.env.EMAIL_HOST || !process.env.EMAIL_PORT) {
        logger.warn(
          "Email service not configured. Missing EMAIL_HOST or EMAIL_PORT."
        );
        return false;
      }

      // Create transporter
      this.transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE === "true",
        auth:
          process.env.EMAIL_USER && process.env.EMAIL_PASSWORD
            ? {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
              }
            : undefined,
      });

      this.initialized = true;
      logger.info("Email service initialized successfully");
      return true;
    } catch (error) {
      logger.error("Failed to initialize email service", {
        metadata: {
          error: error.message,
          stack: error.stack,
        },
      });
      return false;
    }
  }

  /**
   * Load an email template and replace placeholders
   * @param {string} templateName - Name of the template file (without extension)
   * @param {Object} replacements - Key-value pairs for template placeholders
   * @returns {string|null} Rendered template or null on error
   */
  loadTemplate(templateName, replacements = {}) {
    try {
      const templatePath = path.join(this.templatesDir, `${templateName}.html`);

      if (!fs.existsSync(templatePath)) {
        logger.warn(`Email template not found: ${templateName}`);
        return null;
      }

      let template = fs.readFileSync(templatePath, "utf-8");

      // Replace all placeholders
      Object.keys(replacements).forEach((key) => {
        const placeholder = new RegExp(`{{${key}}}`, "g");
        template = template.replace(placeholder, replacements[key]);
      });

      return template;
    } catch (error) {
      logger.error("Error loading email template", {
        metadata: {
          templateName,
          error: error.message,
        },
      });
      return null;
    }
  }

  /**
   * Send an email
   * @param {Object} options - Email options
   * @param {string} options.to - Recipient email
   * @param {string} options.subject - Email subject
   * @param {string} options.html - Email content as HTML
   * @param {string} [options.text] - Plain text version
   * @param {Array} [options.attachments] - Email attachments
   * @returns {Promise<Object|null>} Send result or null on error
   */
  async sendMail(options) {
    if (!this.initialized) {
      const initialized = this.initialize();
      if (!initialized) {
        return null;
      }
    }

    try {
      const mailOptions = {
        from: options.from || this.from,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || options.html.replace(/<[^>]+>/g, ""), // Strip HTML tags for text version
        attachments: options.attachments || [],
      };

      const result = await this.transporter.sendMail(mailOptions);

      logger.info(`Email sent to ${options.to}`, {
        metadata: {
          subject: options.subject,
          messageId: result.messageId,
        },
      });

      return result;
    } catch (error) {
      logger.error("Failed to send email", {
        metadata: {
          to: options.to,
          subject: options.subject,
          error: error.message,
          stack: error.stack,
        },
      });
      return null;
    }
  }

  /**
   * Send an email using a template
   * @param {string} to - Recipient email
   * @param {string} subject - Email subject
   * @param {string} templateName - Name of the template to use
   * @param {Object} templateData - Data to replace in the template
   * @param {Array} [attachments] - Optional email attachments
   * @returns {Promise<Object|null>} Send result or null on error
   */
  async sendTemplate(
    to,
    subject,
    templateName,
    templateData = {},
    attachments = []
  ) {
    const html = this.loadTemplate(templateName, templateData);

    if (!html) {
      return null;
    }

    return this.sendMail({
      to,
      subject,
      html,
      attachments,
    });
  }

  /**
   * Send a welcome email
   * @param {string} to - User's email
   * @param {string} name - User's name
   * @param {string} [activationUrl] - Optional activation URL
   * @returns {Promise<Object|null>} Send result or null on error
   */
  async sendWelcomeEmail(to, name, activationUrl = "") {
    return this.sendTemplate(to, "Welcome to Smart ERP!", "welcome", {
      name,
      activationUrl,
      year: new Date().getFullYear(),
    });
  }

  /**
   * Send password reset email
   * @param {string} to - User's email
   * @param {string} name - User's name
   * @param {string} resetUrl - Password reset URL
   * @returns {Promise<Object|null>} Send result or null on error
   */
  async sendPasswordResetEmail(to, name, resetUrl) {
    return this.sendTemplate(to, "Reset Your Password", "password-reset", {
      name,
      resetUrl,
      year: new Date().getFullYear(),
    });
  }

  /**
   * Send a notification email
   * @param {string} to - Recipient's email
   * @param {string} subject - Notification subject
   * @param {string} message - Notification message
   * @param {string} [ctaText] - Call to action button text
   * @param {string} [ctaUrl] - Call to action URL
   * @returns {Promise<Object|null>} Send result or null on error
   */
  async sendNotification(to, subject, message, ctaText = "", ctaUrl = "") {
    return this.sendTemplate(to, subject, "notification", {
      message,
      ctaText,
      ctaUrl,
      year: new Date().getFullYear(),
    });
  }
}

module.exports = new EmailService();
