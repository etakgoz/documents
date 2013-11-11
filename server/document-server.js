/**
 * Document Server
 *
 * A node.js application implementing a REST API using express.js.
 * Supports CRUD operations on http://localhost:3412/documents
 *
 * @author Tolga Akgoz
 *
 */


// Setup express app to server requests and document storage to serve documents
var express = require('express'),
    _ = require('underscore'),
    app = express(),
    documentStorage = require('./lib/document-storage.js');


app.use(express.bodyParser());

/**
 * Base URL GET Request - /
 *
 * Returns list of all documents
 *
 * @param  {object} req express request object
 * @param  {object} res express response object
 * @return void
 */
app.get('/', function(req, res) {
  res.json(documentStorage.getAll());
});

/**
 * Download HTML GET Request - /download.html
 *
 * Returns information about the download request. The actual file is not sent.
 *
 * @param  {object} req express request object
 * @param  {object} res express response object
 * @return void
 */
app.get('/download.html', function(req, res) {

    var downloadMsg = "Thanks for downloading the file with";
    res.send(downloadMsg + " the attachment id: " + req.query.id + " and the name: " + _.escape(req.query.file_name));

});

/**
 * Document GET Request - /document/id
 *
 * Returns the document with the particular id,
 * 404 if the document is not found
 *
 * @param  {object} req express request object
 * @param  {object} res express response object
 * @return void
 */
app.get('/document/:id', function(req, res) {

  var doc = documentStorage.get(req.params.id);

  if(doc === false) {
    res.statusCode = 404;
    return res.send('Error 404: No quote found');
  }

  res.json(doc);
});

/**
 * Document POST Request - /document
 *
 * Handles document post request.
 * Creates a new document and tries to insert into document storage.
 *
 * @param  {object} req express request object
 * @param  {object} res express response object
 * @return void
 */
app.post('/document', function(req, res) {

  // Check post syntax
  if(!req.body.hasOwnProperty('attachment_id') ||
    !req.body.hasOwnProperty('file_name') ||
    !req.body.hasOwnProperty('date_added') ||
    !req.body.hasOwnProperty('file_size')) {

    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }

  // Create new document object
  var newDocument= {
    attachmentId : req.body.attachment_id,
    fileName : req.body.file_name,
    dateAdded: req.body.date_added,
    fileSize: req.body.file_size
  };

  // Check if the attachment id is unique
  var doc = documentStorage.get(newDocument.attachmentId);
  if (doc !== false) {
    res.statusCode = 400;
    return res.send('Error 400: Document with the given attachment id already exists.');
  }

  // Try to insert the new document
  if (documentStorage.insert(newDocument)) {
    res.json(true);
  } else {
    res.statusCode = 400;
    return res.send('Error 400: Failed to insert new document.');
  }

});


/**
 * Document DELETE Request - /document/id
 *
 * Handles document delete request.
 * Deletes the document with the given id.
 *
 * @param  {object} req express request object
 * @param  {object} res express response object
 * @return void
 */
app.delete('/document/:id', function(req, res) {
  res.json(documentStorage.delete(req.params.id));
});

// Serve the frontend app
app.use('/app/', express.static(__dirname + '/../app'));

// Listen the port 3412 for the requests
app.listen(process.env.PORT || 3412);