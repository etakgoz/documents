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
 * Base URL GET Request - /documents
 *
 * Returns list of all documents
 *
 * @param  {object} req express request object
 * @param  {object} res express response object
 * @return void
 */
app.get('/documents', function(req, res) {
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
 * Document GET Request - /documents/id
 *
 * Returns the document with the particular id,
 * 404 if the document is not found
 *
 * @param  {object} req express request object
 * @param  {object} res express response object
 * @return void
 */
app.get('/documents/:id', function(req, res) {

  var doc = documentStorage.get(req.params.id);

  if(doc === false) {
    res.statusCode = 404;
    return res.send('Error 404: No document with the given id found');
  }

  res.json(doc);
});

/**
 * Document POST Request - /documents
 *
 * Handles document post request.
 * Creates a new document and tries to insert into document storage.
 *
 * @param  {object} req express request object
 * @param  {object} res express response object
 * @return void
 */
app.post('/documents', function(req, res) {

  // Check post syntax
  if(!req.body.hasOwnProperty('attachmentId') ||
    !req.body.hasOwnProperty('fileName') ||
    !req.body.hasOwnProperty('dateAdded') ||
    !req.body.hasOwnProperty('fileSize')) {

    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }

  // Create new document object
  var newDocument= {
    attachmentId : req.body.attachmentId,
    fileName : req.body.fileName,
    dateAdded: req.body.dateAdded,
    fileSize: req.body.fileSize
  };

  // Check if the attachment id is unique
  var doc = documentStorage.get(newDocument.attachmentId);
  if (doc !== false) {
    res.statusCode = 400;
    return res.send('Error 400: Document with the given attachment id already exists.');
  }

  // Try to insert the new document
  if (documentStorage.insert(newDocument)) {
    res.json(newDocument);
  } else {
    res.statusCode = 400;
    return res.send('Error 400: Failed to insert new document.');
  }

});

/**
 * Document PUT Request - /documents
 *
 * Handles document put request
 * Updates the document with the given id
 *
 * @param  {object} req express request object
 * @param  {object} res express response object
 * @return void
 */
app.put('/documents/:id', function (req, res) {
    var attachmentId = req.params.id;

    // Check post syntax
    if(!req.body.hasOwnProperty('attachmentId') ||
      !req.body.hasOwnProperty('fileName') ||
      !req.body.hasOwnProperty('dateAdded') ||
      !req.body.hasOwnProperty('fileSize')) {

      res.statusCode = 400;
      return res.send('Error 400: Post syntax incorrect.');
    }

    if (attachmentId != req.body.attachmentId) {
      res.statusCode = 400;
      return res.send('Error 400: Post syntax incorrect. It is not possible to update the id of the documents');
    }


    // Create new document object
    var newDocument= {
      attachmentId : req.body.attachmentId,
      fileName : req.body.fileName,
      dateAdded: req.body.dateAdded,
      fileSize: req.body.fileSize
    };

    // Try to insert the new document
    if (documentStorage.update(attachmentId, newDocument)) {
      res.json(newDocument);
    } else {
      res.statusCode = 400;
      return res.send('Error 400: Failed to update the document');
    }

});

/**
 * Document DELETE Request - /documents/id
 *
 * Handles document delete request.
 * Deletes the document with the given id.
 *
 * @param  {object} req express request object
 * @param  {object} res express response object
 * @return void
 */
app.delete('/documents/:id', function(req, res) {
  res.json(documentStorage.delete(req.params.id));
});

// Serve the frontend app
app.use('/app/', express.static(__dirname + '/../app'));

// Listen the port 3412 for the requests
app.listen(process.env.PORT || 3412);