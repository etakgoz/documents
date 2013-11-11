The application consists of two layers: the server and the app.

The server:

The server application is a node.js application located under the server folder. It is developed using express.js.

Installation & Running:

1. Enter "./server/npm install" to install.
2. Enter "node document-storage.js" to run the server. A server should start running on your localhost at port 3412. It should be accessible by http://localhost:3412/documents

Server has the following responsibilities:

1. Prodiving a REST API for accessing/modifying documents. It supports all CRUD (Create/Read/Update/Delete) operations on documents. Storage and persistency handled by document-storage.js.
2. Serving the frontend app located at the app folder.
3. Serving the dummy download.html file providing information about the downloaded file.

The Frontend App:

The frontend app is a backbone.js application. It is loaded via Require.js. Less is used as CSS preprocessor. It is served by the server application.

Installation & Running:

1. Enter "./app/bower install" to install necessary components. Bower is a package manager. You migt need to install it by "npm install -g bower" first if you don't have it on your system.

2. When the server app is running, visit "http://localhost:3412/app" on your browser to view the application.


Possible Improvements:

The following changes can be done to improve the application.

1. Document creation/deletion operations can be added to frontend.
2. An xml file or simple database can be used by ./server/document-storage.js for persistency.
3. A build script can be written for the frontend app. (to optimize js/css files)
4. Automated tests can be written and integrated to the build. (It would have been better if they were written first of course!)
