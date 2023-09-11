# Practice App
## Starting the app for the first time:
- npm i
- Create a database called "shopping-website" in MySQL
- Create .env file and provide the given content.
```javascript
URL="mongodb+srv://UserName:UserPass@ClusterName.b99wetu.mongodb.net/DBName?retryWrites=true&w=majority"
EXPRESS_SESSION_KEY="your-secret-key"
```
- Start server with "npm start" command which will trigger "nodemon start".

## MVC Pattern (Model View Controller):

### Model:

- Responsible for representing your data.
- Responsible for managing your data (saving, fetching...).
- Does not matter if you manage data in memory, files, databases.
- Contains data related logic.

### View:

- What the users see.
- Should not contain too much logic (HTML, Handlebars, Pug, EJS...).

### Controller:

- Connects "Model" and "View".
- Responsible of establishing the communication of both in both directions.

## Model View Controller (MVC) in this Project

- The MVC pattern helps you break up the frontend and backend code into separate components.
- Model View Controller principles are applied in this project.
- There will be "views", "controllers" and "models" folders to make the project easier to divide into its related logical categories.
- "views" folder stores the front end data in it.
- "controllers" folder stores the specific route controlling functions. These functions are then exported into routes folder. They are basically the list of functions which controls the specific page's behaviors.
- "models" folder stores the "users.json" file which has all the usernames and user ages. These info is pulled by "/display/users" page.

# Notes:

- In "req.body.myFormInput", "myFormInput" is extracted from forms. You can also extract all form inputs with "req.body" only.
- In "req.params.myLink", "myLink" is extracted from the entered link. for example in "http://localhost:3000/:myLink", "myLink" is a dynamic link. For more info, check "router.get("/products/:productId", shopController.getProduct);" in the project. You can also extract all parameters with "req.params" only.
- "req.query.myQuery" gives the "myQuery" info. For example when we enter "http://localhost:3000/products?myQuery=true", "req.query.myQuery" will return "true". The extracted value will always be a string. For more info, refer to "router.get("/edit-product/:productId", adminController.editProduct);" in the project.

# Database (MongoDB):

- MongoDB is used for this project. "mongodb" and "uuidv4" packages are needed to be installed from "npm" for access to the database.

- environmental variables used for this project. I put these variables inside
```javascript
URL="mongodb+srv://UserName:UserPass@ClusterName.b99wetu.mongodb.net/DBName?retryWrites=true&w=majority"
EXPRESS_SESSION_KEY="your-secret-key"
```

- **MongoDB-Connect-Database** <br>
Basically, **"./Model/database/dbConnection.js"** is used in **"./index.js"** to connect to database.
- **MongoDB-Create-And-Associate-Models** <br>
**"./Model/database/dbAssociation.js"** is used in **./index.js** so that all model associations and models are properly set. We need to only import dbAssociations.js in index.js.
- **MongoDB-Sequelize-Manage-Database-Function-Operations** <br>
**./Model/operations/dbProductOperation.js** is used in controllers like **./Controller/controllers/adminController.js**
- **Express-Session-Keep-Cookie-in-req.session** <br>
express-session is a package and it keeps some session files in it so the selected admin will be known by the system.
- **MongoDB-Queries**
All query related info kept inside "/Model/tables/orderTable.js", "/Model/tables/productTable.js" and "/Model/tables/userTable.js".