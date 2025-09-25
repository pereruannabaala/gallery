# 📸 Gallery App

A simple image gallery web application built with Node.js, Express, and EJS. This project allows users to view and manage image collections through a clean and responsive interface.

Live demo: [gallery-1-1970.onrender.com](https://gallery-1-1970.onrender.com)

---

## 🚀 Features

- Display image galleries using EJS templates
- Organized folder structure for models, routes, views, and public assets
- Basic security and routing setup
- Includes test suite for backend functionality
- Jenkinsfile for CI/CD pipeline integration

---

# 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/pereruannabaala/gallery.git
cd gallery

# Install dependencies
npm install

# Start the server
npm start
```
Visit ``http://localhost:5000`` in your browser to view the app locally.

# 🧪 Running Tests
```
npm test
```

# 🧰 Technologies Used

- Node.js
- Express
- EJS
- MongoDB (via Mongoose)
- CSS
- Jenkins (for CI/CD)

---

## 📣 Slack Notifications on Successful Deploy

This project includes a CI/CD pipeline that sends a Slack message to the `#pereruan_ip1` channel upon successful deployment.

### What the Message Includes

- 🔢 **Build ID** of the deployment
- 🌐 **Live site link** hosted on [Render](https://render.com)

### How It Works

The pipeline uses environment variables to securely pass:

- `SLACK_WEBHOOK_URL` – Incoming webhook for the Slack channel
- `RENDER_DEPLOY_URL` – Public URL of the deployed site
- `BUILD_ID` – Unique identifier for the deployment job

When a deployment completes successfully, a message is posted to Slack with a summary like:

---

## 🧪 CI Pipeline: Test Execution & Failure Alerts

The Jenkins pipeline has been updated to automatically run tests after merging the `test` branch into `main`. If any test fails during the build process, an email notification is sent to the configured recipient.

### ❌ Example Failure Notification

Subject: Jenkins Pipeline Failed: gallery-pipeline #3 
From: pereruannabaala@gmail.com

The pipeline for job 'gallery-pipeline [3]' has failed.

Check the console output at http://localhost:8080/job/gallery-pipeline/3/ to see what went wrong.


### 📬 Email Notification Setup

The Jenkinsfile includes logic to:

- Run the test suite on each build
- Detect failures and trigger an email alert
- Include the job name and direct link to the Jenkins console output

> Make sure your Jenkins environment is configured with:
> - Valid SMTP settings
> - `EMAIL_RECIPIENTS` environment variable set to your email address

This ensures that any issues in the codebase are caught early and communicated immediately to the developer.

---

# Author
- Pereruan Nabaala
- pereruannabaala@gmail.comm
