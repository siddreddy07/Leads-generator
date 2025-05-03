### 🌟 Leads Generator


---

## 📖 Overview

**Leads Generator** is a beautifully designed web application built to streamline lead management. Powered by a **Node.js/Express** backend and a **React** frontend, it allows you to fetch, display, and filter leads with ease. Filter by date and status to focus on what matters most, all within a clean and intuitive interface. 🚀

---

## 📂 Project Structure

The project is organized into two core directories for a seamless development experience:

| Directory | Description |
| --- | --- |
| 📦 **Server** (`server/`) | Node.js/Express backend with MongoDB integration for managing lead data. |
| 🌐 **Client** (`client/`) | React frontend for a user-friendly interface to view and filter leads. |

---

## 🛠️ Prerequisites

Before diving in, ensure the following tools are installed on your system:

- **Node.js** (v14 or higher) ⚙️\
  *The runtime environment for running the backend.*
- **MongoDB** (running locally on `mongodb://localhost:27017`) 🗄️\
  *The database to store and manage lead data.*
- **npm** (comes with Node.js) 📦\
  *The package manager for installing project dependencies.*

---

## ⚙️ Setup Instructions

Follow these straightforward steps to set up the Leads Generator locally. Let’s get started! 🚀

### 1. Clone the Repository 📥

Clone the repository to your local machine. It contains two folders: `client` and `server`.

```bash
git clone https://github.com/siddreddy07/Leads-generator
cd Leads-generator
```

### 2. Install Dependencies 📦

Install the necessary dependencies for both the backend and frontend.

#### Backend (Server)

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm i
   ```

#### Frontend (Client)

1. Navigate to the `client` directory:

   ```bash
   cd ../client
   ```

2. Install dependencies:

   ```bash
   npm i
   ```

### 3. Start MongoDB 🗄️

Ensure MongoDB is running locally on the default port (`mongodb://localhost:27017`):

- **macOS/Linux**:

  ```bash
  mongod
  ```

- **Windows**: Ensure MongoDB is installed and running as a service, or start it manually.

---

## 🚀 Running the Application

Launch both the client and server simultaneously using two terminal windows. Here’s how to bring the app to life! 🌟

### 1. Start the Backend (Server) 🖥️

1. In the first terminal, navigate to the `server` directory (if not already there):

   ```bash
   cd server
   ```

2. Start the server:

   ```bash
   npm run dev
   ```

   Confirm it’s running:

   ```
   Server running on port 5000
   ```

### 2. Start the Frontend (Client) 🌐

1. In a second terminal, navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Start the client:

   ```bash
   npm run dev
   ```

   The app should open at `http://localhost:5173` (or another port if specified).

### 3. Explore the Dashboard 📊

Open `http://localhost:5173` in your browser to experience the dashboard. Filter leads with ease:

- **Start Date**: Filters leads by the `date` field (on or after the selected date). 📅
- **End Date**: Filters leads by the `action` field (on or before the selected date). 📅
- **Status**: Filters leads by their status (e.g., `completed`, `In Progress`). ✅

---

## 🌐 REST API Endpoints

### 1. Get All Leads

- **Endpoint**: `GET /api/get-leads`

- **Description**: Retrieve all leads with dates formatted as `DD/MM/YYYY`.

- **Response**:

  ```json
  [
    {
      "_id": "string",
      "date": "DD/MM/YYYY",
      "objectId": "string",
      "type": "string",
      "company": "string",
      "name": "string",
      "action": "DD/MM/YYYY",
      "status": "string",
      "subscription": "string",
      "broker": "string",
      "postcode": "string"
    }
  ]
  ```

---

## Get-Leads Via API (via POSTMAN etc.)

Enter the URL for the get leads endpoint (e.g., `http://localhost:5000/get-leads`).

## 🔧 Additionally Adding Leads via API

Add leads to the database using tools like **Postman** or `curl` to make a POST request to the appropriate API endpoint. Follow this guide to get started! 🛠️

1. Set the request method to `POST`. 📬

2. Enter the URL for the add leads endpoint (e.g., `http://localhost:5000/add-leads`).

3. Go to the "Body" tab, select "raw", and choose "JSON".

4. Add a JSON array of leads in the body, for example:

   ```json
   [
     {
       "date": "2022-01-01",
       "objectId": "1234",
       "type": "Salesperson",
       "company": "Example Company",
       "name": "John Doe",
       "action": "2022-01-02",
       "status": "new",
       "subscription": "Basic",
       "broker": "Standard",
       "postcode": "12345"
     }
   ]
   ```

5. Click "Send" to add the leads to the database. ✅



### Using curl

Alternatively, use `curl` in your terminal:

```bash
curl -X POST http://localhost:5000/Leads-generator \
-H "Content-Type: application/json" \
-d '[{"date":"2022-01-01","objectId":"1234","type":"Salesperson","company":"Example Company","name":"John Doe","action":"2022-01-02","status":"new","subscription":"Basic","broker":"Standard","postcode":"12345"}]'
```

---

## 🐞 Troubleshooting

Run into an issue? Here are some solutions to common problems:

- **Backend Not Starting** ⚠️\
  Ensure MongoDB is running and port `5000` is available.
- **Frontend Not Loading Data** 🌐\
  Verify that the backend is running and the API endpoint (`http://localhost:5000/api/get-leads`) is accessible.
- **CORS Issues** 🚫\
  The backend includes CORS middleware, but confirm the frontend is running on `http://localhost:5173`.

---

## 💡 Additional Notes

A few tips to enhance your experience with the Leads Dashboard:

- **Styling**: The app uses minimal styling for simplicity. Add Tailwind CSS or another library for a more refined look. 🎨
- **Error Handling**: Basic error handling is in place. Enhance it for production-grade reliability. 🛡️
- **Database Schema**: The schema is fixed. Modify `leadSchema` in `server.js` to include additional fields if needed. 📋

---

## ✨ Happy Lead Managing! ✨

*Built with 💻 and ❤️ for seamless lead management*
