# Expense Splitter For Group Payments
### How to run locally
To set-up the database:

Install Microsoft SQL Server Management Studio and create a connection
Update the connection string in appsettings.json to match your connection string
* In the terminal in the root of the api directory, run the following commands:
* `dotnet ef migrations add init`
* `dotnet ef database update`
* You can then add dummy data to your local database for testing

To test API endpoints:
`run dotnet watch run`
* Check the terminal output for the port number the server is running on, then go to `http://localhost:[port number]/swagger/index.html` substituting your port number
To run the frontend:

Install node & npm
* run `npm install` in the frontend directory
* run `npm run start`
open `localhost:3000` in your browser

### Attributions
(Contact icons created by Indra Maulana Yusuf - Flaticon)[https://www.flaticon.com/free-icons/contact]