/**
 * DocumentStorage
 *
 * Defines the DocumentStorage object and creates the necessary module for reading/writing documents.
 * DocumentStorage is responsible for IO operations.
 *
 * @author Tolga Akgoz
 */

// Index Map between attachmentId and the array index on documents array for fast retrival (avoiding array iteration)
var documentIndexMap = {
	"263" : 0,
	"264" : 1,
	"265" : 2,
	"266" : 3,
	"271" : 4,
	"272" : 5,
	"273" : 6,
	"274" : 7
};

// Documents array
var documents = [
	{"attachmentId":263,"fileName":"Requirements spec 1.docx","dateAdded":"2009-10-06 11:46:12","fileSize":"9.7 KB"},
	{"attachmentId":264,"fileName":"A dummy document.docx","dateAdded":"2009-10-07 11:46:12","fileSize":"23.7 KB"},
	{"attachmentId":265,"fileName":'Test "plan.doc',"dateAdded":"2009-10-08 11:46:12","fileSize":"30.0 KB"},
	{"attachmentId":266,"fileName":"Phone <list.xlsx","dateAdded":"2009-10-09 11:46:12","fileSize":"220.2 KB"},
	{"attachmentId":271,"fileName":"det här är på svenska.docx","dateAdded":"2009-10-14 17:14:29","fileSize":"9.7 KB"},
	{"attachmentId":272,"fileName":"error's are mine.png","dateAdded":"2009-10-16 18:58:28","fileSize":"20.9 KB"},
	{"attachmentId":273,"fileName":"GUI - ugly error message.png","dateAdded":"2009-10-16 19:02:32","fileSize":"13.8 KB"},
	{"attachmentId":274,"fileName":"message.txt","dateAdded":"2009-10-16 19:09:34","fileSize":"1.0 KB"}
];


/**
 * DocumentStorage Constructor
 */
var DocumentStorage = function() {};

/**
 * Returns the document with the id or false
 * @param  {mixed} id document id
 * @return {mixed}    document object on success otherwise false
 */
DocumentStorage.prototype.get = function (id) {
	var docIndex = documentIndexMap[id];

	if (typeof docIndex === "undefined" || docIndex === false) {
		return false;
	}

	return documents[documentIndexMap[id]];
};

/**
 * Returns all documents
 * @return {array}    array of document objects
 */
DocumentStorage.prototype.getAll = function () {
	return documents;
};

/**
 * Returns the number of documents
 * @return {number} number of documents
 */
DocumentStorage.prototype.length= function () {
	return documents.length;
};

/**
 * Inserts a new document
 * @param  {object} document new document object to insert
 * @return {boolean}          true on success and false on failure
 */
DocumentStorage.prototype.insert = function (document) {

	if (typeof documentIndexMap[document.attachmentId] !== "undefined") {
		return false;
	}

	documentIndexMap[documents.length] = document.attachmentId;
	documents.push(document);

	return true;
};

/**
 * Deletes a document from the document storage
 * @param  {mixed} id id of the document
 * @return {boolean}          true on success and false on failure
 */
DocumentStorage.prototype.delete = function (id) {
	var docIndex = documentIndexMap[id];

	if (typeof docIndex === "undefined" || docIndex === false) {
		return false;
	}


	documents.splice(documentIndexMap[id], 1);
	delete documentIndexMap[id];

	return true;
};



/**
 * Updates the document with the given id
 * @param  {mixed} id              id of the document to update
 * @param  {object} updatedDocument updatedDocument object
 * @return {boolean}                 returns true on success and false on failure
 */
DocumentStorage.prototype.update = function (id, updatedDocument) {
	var docIndex = documentIndexMap[id];

	if (typeof docIndex === "undefined" || docIndex === false) {
		return false;
	}

	documents[documentIndexMap[id]] = updatedDocument;

	return true;
};

module.exports = new DocumentStorage();