Leads Dashboard
A simple web application to view leads, built with a Node.js/Express backend and a React frontend. The app allows you to fetch and display leads in a table with basic filtering by date and status.
Project Structure

Server: server/ - Node.js/Express backend with MongoDB integration.
Client: client/ - React frontend to display and filter leads.

Prerequisites

Node.js (v14 or higher)
MongoDB (running locally on mongodb://localhost:27017)
npm (comes with Node.js)

Setup Instructions
1. Clone the Repository
Clone the repository to your local machine. The repository contains two folders: client and server.
git clone <repository-url>
cd leads-dashboard

2. Install Dependencies
The project is split into two folders: client (frontend) and server (backend). You'll need to install dependencies in both.
Backend (Server)

Navigate to the server folder:cd server


Install dependencies:npm i



Frontend (Client)

Navigate to the client folder:cd ../client


Install dependencies:npm i



3. Start MongoDB
Ensure MongoDB is running locally on the default port (mongodb://localhost:27017):

On macOS/Linux:mongod


On Windows, ensure MongoDB is installed and running as a service, or start it manually.

Running the Application
You'll need two terminal windows to run the client and server simultaneously.
1. Start the Backend (Server)

In the first terminal, navigate to the server folder (if not already there):cd server


Start the server:npm run dev

You should see:Server running on port 5000



2. Start the Frontend (Client)

In a second terminal, navigate to the client folder:cd client


Start the client:npm run dev

The app should open at http://localhost:3000 (or another port if specified).

3. View the Dashboard
Open http://localhost:3000 in your browser to view the dashboard. Use the filters to narrow down leads:

Start Date: Filters leads by the date field (on or after the selected date).
End Date: Filters leads by the action field (on or before the selected date).
Status: Filters leads by their status (e.g., completed, In Progress).

4. Add Leads via API
To add leads to the database, you can use a tool like Postman or curl to make a POST request to the appropriate API endpoint. Below is a generic example of how to do this:
Using Postman

Open Postman and create a new request.
Set the request method to POST.
Enter the URL for the add leads endpoint (e.g., http://localhost:5000/your-add-endpoint).
Go to the "Body" tab, select "raw", and choose "JSON".
Add a JSON array of leads in the body, for example:[
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


Click "Send" to add the leads to the database.

Using curl
You can also use curl in your terminal:
curl -X POST http://localhost:5000/your-add-endpoint \
-H "Content-Type: application/json" \
-d '[{"date":"2022-01-01","objectId":"1234","type":"Salesperson","company":"Example Company","name":"John Doe","action":"2022-01-02","status":"new","subscription":"Basic","broker":"Standard","postcode":"12345"}]'

Replace your-add-endpoint with the actual endpoint path provided by your backend.
REST API Endpoints
1. Get All Leads

Endpoint: GET /api/leads
Description: Retrieve all leads with dates formatted as DD/MM/YYYY.
Response:[
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



Troubleshooting

Backend Not Starting: Ensure MongoDB is running and the port 5000 is free.
Frontend Not Loading Data: Check if the backend is running and the API endpoint (http://localhost:5000/api/leads) is accessible.
CORS Issues: The backend includes CORS middleware, but ensure the frontend is running on http://localhost:3000.

Notes

The app uses minimal styling for simplicity. You can enhance the UI with Tailwind CSS or another library.
Error handling is basic. Add more robust error handling for production use.
The database schema is fixed. Modify the leadSchema in server.js to add more fields if needed.

