/**
 * Divine Hindu — Social Media Dashboard Automation Script
 * Paste this code in Extensions > Apps Script of your Google Sheet.
 */

// Configuration Keys (corresponds to Config sheet)
const CONFIG_SHEET_NAME = "Config";
const TRACKER_SHEET_NAME = "Master Tracker";
const DM_SHEET_NAME = "DM Tracker";

/**
 * Creates a custom menu in Google Sheets
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("🕉️ Divine Hindu")
    .addItem("Refresh Dashboard Metrics", "recalculateDashboardMetrics")
    .addItem("Send Test Alert", "sendTestAlert")
    .addItem("Initialize Config Sheet", "initializeConfigSheet")
    .addToUi();
}

/**
 * Edit trigger to automate calculations and alerts
 */
function onEdit(e) {
  if (!e) return;
  const sheet = e.range.getSheet();
  const sheetName = sheet.getName();
  const range = e.range;
  const row = range.getRow();
  const col = range.getColumn();
  
  // Ignore header edits
  if (row <= 1) return;

  if (sheetName === TRACKER_SHEET_NAME) {
    handleTrackerEdit(sheet, row, col, e.value);
  } else if (sheetName === DM_SHEET_NAME) {
    handleDMEdit(sheet, row, col, e.value);
  }
}

/**
 * Handle edits in the Master Tracker sheet
 */
function handleTrackerEdit(sheet, row, col, newValue) {
  // Column J: Action, Column L: Action Taken, Column N: Status, Column O: Response Time (min)
  // Column A: Timestamp
  
  // 1. Calculate Response Time (min) when Status changes to Resolved
  // Or when Action Taken is first updated
  if (col === 14 && newValue === "Resolved") {
    const timestampVal = sheet.getRange(row, 1).getValue(); // Col A
    const responseTimeCell = sheet.getRange(row, 15); // Col O (Response Time)
    
    if (timestampVal && responseTimeCell.getValue() === "") {
      const startTime = new Date(timestampVal);
      const endTime = new Date();
      const diffMs = endTime - startTime;
      const diffMins = Math.round(diffMs / 1000 / 60);
      responseTimeCell.setValue(diffMins);
    }
  }

  // 2. Trigger instant email alert for Critical/High Complaints
  // Col G: AI Category, Col I: Priority, Col N: Status
  if (col === 7 || col === 9) {
    const category = sheet.getRange(row, 7).getValue(); // Col G
    const priority = sheet.getRange(row, 9).getValue(); // Col I
    const status = sheet.getRange(row, 14).getValue(); // Col N
    
    if (category === "COMPLAINT" && (priority === 1 || priority === 2) && status !== "Resolved") {
      const username = sheet.getRange(row, 5).getValue(); // Col E
      const text = sheet.getRange(row, 6).getValue(); // Col F
      const commentId = sheet.getRange(row, 4).getValue(); // Col D
      const platform = sheet.getRange(row, 2).getValue(); // Col B
      
      sendComplaintAlert(platform, username, text, priority, commentId);
    }
  }
}

/**
 * Handle edits in the DM Tracker sheet
 */
function handleDMEdit(sheet, row, col, newValue) {
  // Col F: AI Category, Col G: Priority, Col L: Status, Col N: Resolution Time (min)
  // Col A: Timestamp
  
  if (col === 12 && newValue === "Resolved") {
    const timestampVal = sheet.getRange(row, 1).getValue(); // Col A
    const resolutionTimeCell = sheet.getRange(row, 14); // Col N
    
    if (timestampVal && resolutionTimeCell.getValue() === "") {
      const startTime = new Date(timestampVal);
      const endTime = new Date();
      const diffMs = endTime - startTime;
      const diffMins = Math.round(diffMs / 1000 / 60);
      resolutionTimeCell.setValue(diffMins);
    }
  }

  // Hot Lead alert notification
  if (col === 6 && newValue === "HOT_LEAD") {
    const username = sheet.getRange(row, 4).getValue(); // Col D
    const message = sheet.getRange(row, 5).getValue(); // Col E
    const platform = sheet.getRange(row, 2).getValue(); // Col B
    
    sendHotLeadAlert(platform, username, message);
  }
}

/**
 * Fetch config value helper
 */
function getConfigValue(keyName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const configSheet = ss.getSheetByName(CONFIG_SHEET_NAME);
  if (!configSheet) return null;
  
  const data = configSheet.getDataRange().getValues();
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === keyName) {
      return data[i][1];
    }
  }
  return null;
}

/**
 * Send an email alert for critical complaints
 */
function sendComplaintAlert(platform, username, text, priority, commentId) {
  const recipient = getConfigValue("Alert Email") || Session.getActiveUser().getEmail();
  const subject = `⚠️ URGENT COMPLAINT [Priority ${priority}] on ${platform}`;
  
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; border: 1px solid #FF1744; padding: 20px; border-radius: 8px; max-width: 600px;">
      <h2 style="color: #FF1744; margin-top: 0;">🕉️ Divine Hindu — Escalation Alert</h2>
      <p>A new <strong>critical complaint</strong> was received and requires immediate attention.</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="padding: 8px; font-weight: bold; background-color: #f8f9fa; border: 1px solid #ddd; width: 30%;">Platform</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${platform}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; background-color: #f8f9fa; border: 1px solid #ddd;">Username</td>
          <td style="padding: 8px; border: 1px solid #ddd;">@${username}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; background-color: #f8f9fa; border: 1px solid #ddd;">Comment Text</td>
          <td style="padding: 8px; border: 1px solid #ddd; color: #d32f2f; font-style: italic;">"${text}"</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; background-color: #f8f9fa; border: 1px solid #ddd;">Priority Level</td>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; color: #FF1744;">L2 (Critical - Response time &lt; 10 mins)</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; background-color: #f8f9fa; border: 1px solid #ddd;">Comment ID</td>
          <td style="padding: 8px; border: 1px solid #ddd; font-size: 11px;">${commentId}</td>
        </tr>
      </table>
      <p style="margin-top: 20px; font-size: 13px; color: #666;">
        Please open the <a href="${SpreadsheetApp.getActiveSpreadsheet().getUrl()}" target="_blank">Social Media Command Center Sheet</a> to assign and resolve this issue.
      </p>
    </div>
  `;
  
  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    htmlBody: htmlBody
  });
}

/**
 * Send email notification for hot sales leads
 */
function sendHotLeadAlert(platform, username, message) {
  const recipient = getConfigValue("Alert Email") || Session.getActiveUser().getEmail();
  const subject = `🔥 HOT SALES LEAD on ${platform} - @${username}`;
  
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; border: 1px solid #00C853; padding: 20px; border-radius: 8px; max-width: 600px;">
      <h2 style="color: #00C853; margin-top: 0;">🕉️ Divine Hindu — Sales Pipeline Lead</h2>
      <p>A user expressed intent to purchase via DM on ${platform}.</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="padding: 8px; font-weight: bold; background-color: #f8f9fa; border: 1px solid #ddd; width: 30%;">Platform</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${platform}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; background-color: #f8f9fa; border: 1px solid #ddd;">Customer Handle</td>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>@${username}</strong></td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; background-color: #f8f9fa; border: 1px solid #ddd;">Message Content</td>
          <td style="padding: 8px; border: 1px solid #ddd; color: #2e7d32;">"${message}"</td>
        </tr>
      </table>
      <p style="margin-top: 20px; font-size: 13px; color: #666;">
        Please reach out to the customer in their DM thread immediately. Check the <a href="${SpreadsheetApp.getActiveSpreadsheet().getUrl()}" target="_blank">DM Tracker Sheet</a> for templates and tracking.
      </p>
    </div>
  `;
  
  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    htmlBody: htmlBody
  });
}

/**
 * Recalculate dashboard statistics if formulas aren't refreshing automatically
 */
function recalculateDashboardMetrics() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dashboardSheet = ss.getSheetByName("Daily Dashboard");
  if (!dashboardSheet) {
    SpreadsheetApp.getUi().alert("Error: 'Daily Dashboard' sheet not found.");
    return;
  }
  
  // Trigger Sheet calculation by writing and deleting a temporary value
  const cell = dashboardSheet.getRange("Z1");
  cell.setValue("recaching...");
  SpreadsheetApp.flush();
  Utilities.sleep(100);
  cell.clearContent();
  SpreadsheetApp.getUi().alert("Dashboard metrics refreshed successfully!");
}

/**
 * Test alert sender
 */
function sendTestAlert() {
  const ui = SpreadsheetApp.getUi();
  const email = getConfigValue("Alert Email") || Session.getActiveUser().getEmail();
  try {
    sendComplaintAlert("Instagram", "test_user", "Testing the Divine Hindu complaint escalation alert system. Damage reported on item.", 1, "test-comment-id-12345");
    ui.alert(`Test email sent successfully to: ${email}`);
  } catch (err) {
    ui.alert(`Failed to send test email: ${err.message}`);
  }
}

/**
 * Initialize config sheet with default structure if missing
 */
function initializeConfigSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let configSheet = ss.getSheetByName(CONFIG_SHEET_NAME);
  
  if (!configSheet) {
    configSheet = ss.insertSheet(CONFIG_SHEET_NAME);
  } else {
    configSheet.clear();
  }
  
  const headers = [
    ["Configuration Key", "Value", "Description"],
    ["Last Processed Comment ID (IG)", "", "Automatically updated by n8n"],
    ["Last Processed Comment ID (FB)", "", "Automatically updated by n8n"],
    ["Last Processed DM Timestamp", "", "Automatically updated by n8n"],
    ["Team Members", "Aarav, Priya, Rohan", "Comma-separated list of handlers"],
    ["Alert Email", Session.getActiveUser().getEmail(), "Recipients of escalation alerts"],
    ["Support Phone", "+91-9876543210", "Displayed in customer replies"],
    ["Min Bulk Quantity", "50", "Minimum units threshold for bulk rates"],
    ["Free Shipping Threshold", "999", "Min order amount in rupees for free shipping"]
  ];
  
  configSheet.getRange(1, 1, headers.length, 3).setValues(headers);
  configSheet.getRange("A1:C1").setFontWeight("bold").setBackground("#E65100").setFontColor("#FFFFFF");
  configSheet.autoResizeColumns(1, 3);
  
  SpreadsheetApp.getUi().alert("Config sheet initialized successfully!");
}
