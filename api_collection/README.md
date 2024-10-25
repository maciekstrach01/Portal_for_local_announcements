# Postman Collection Setup

This guide will walk you through the steps needed to set up a Postman collection.

## Prerequisites

Before you begin, ensure you have the following requirements met:

- **Postman:** Make sure Postman is installed on your machine. If not installed, download and install it from [Postman](https://www.postman.com/downloads/).

## Getting Started

### 1. Import the Postman Collection
- Open **Postman**. 
- Click on the **Import** button (usually found in the top-left corner). 
- Import your collection by uploading the Postman collection file (.json format).

### 2. Import the Environment Variables
- Click on the **Environment** dropdown in the top-right corner of Postman (next to the eye icon).
- Select **Manage Environments**. 
- Click **Import** and upload the environment file (.json format) that contains your environment variables. 
  - Alternatively, you can manually create environment variables by clicking **Add** in the environment window and entering key-value pairs.

### 3. Configure Environment Variables
After importing, make sure to:
- Set the proper environment as **active** by selecting it from the environment dropdown.
- Check that all necessary variables (e.g., baseUrl, authToken, etc.) are correctly set in the environment.

### 4. Authentication Using Bearer Token
- The authentication in this collection is handled using a Bearer Token. 
- When you register a new user or log in, the token will be automatically retrieved from the server response and saved as a collection variable.
- This token will then be automatically used for all subsequent requests requiring authorization.

## Additional Notes
- **Environment Variables:** Make sure you are working in the correct active environment. You can switch environments by selecting the appropriate one from the dropdown in the top-right corner.
- **Updating Collection Variables:** If the token needs to be refreshed or updated, rerun the authentication request to extract and save a new token into the authToken collection variable.
