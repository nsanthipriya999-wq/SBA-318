#JOB APPLICATION TRACKER APP

  This Job Application Tracker App is a Node.js, Express and EJS-based web application that help users manage job applications, companies, and users in one place.

  It supports full CRUD operations, filtering, dashboard analytics and data visualization of the applications status in the form of Bar Chart using Chart.js. The project follows RESTful principles and also server-side rendering with EJS.

#Features
•	Users
•	Create users
•	View all users
•	Update user information
•	Delete users

#Companies
•	Add companies
•	Filter companies by industry
•	Update company details
•	Delete companies

#Applications
•	Create job applications
•	View all applications
•	Filter by:
•	Status
•	Priority
•	Update application status (PATCH)
•	Delete applications

#Dashboard
•	View all applications in one place
•	View individual application details
•	Navigate between users, companies, and applications

#Analytics (Chart.js)
•	Total applications overview
•	Applied / Interviewing / Rejected / Offer breakdown
•	Visual bar chart representation of job application status

•	The application includes a route that uses a regular expression in the route path to match numeric application IDs.
    GET/applications/123

•	Used Morgan (HTTP Request Logger) for logging every request. (npm install morgan)

#User routes

Get all users → http://localhost:3000/users
Add user → POST http://localhost:3000/users
Update user → PATCH http://localhost:3000/users/:id
Delete user → DELETE http://localhost:3000/users/:id

#Companies Routes
Get all companies → http://localhost:3000/companies
Filter by industry →http://localhost:3000/companies?industry=it
Add company → POST http://localhost:3000/companies
Update company → PATCH http://localhost:3000/companies/:id
Delete company → DELETE http://localhost:3000/companies/:id

#Applications Routes
Get all applications → http://localhost:3000/applications
Filter applications →
http://localhost:3000/applications?status=applied
http://localhost:3000/applications?priority=high
View single application → http://localhost:3000/applications/:id
Create application → POST http://localhost:3000/applications
Update application → PATCH http://localhost:3000/applications/:id
Delete application → DELETE http://localhost:3000/applications/:id
application view by id => http://localhost:3000/applications/1/view

#Technologies Used:
Node.js
Express.js
EJS
Chart.js
Method Override
HTML/CSS
Javascript (ES Module)
Morgan 
Npm package manager.

#Main Pages
Dashboard →  http://127.0.0.1:3000/applications/dashboard
Stats Page → http://localhost:3000/stats/view
Application full information page -> http://localhost:3000/applications/1/view


Thank you!!


