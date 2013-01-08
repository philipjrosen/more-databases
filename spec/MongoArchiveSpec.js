/* You'll need to have MongoDB and your Node archive server
 * running for these tests to pass. */

var mongodb = require("mongodb");
var request = require("request");

describe("Persistent Node Chat Server", function() {
  var mongoServer = new mongodb.Server("127.0.0.1", 27017, {});
  // TODO edit this line if your database name is not "archive":
  var mongoClient = new mongodb.Db("archive", server);

  it("Should store requested documents in Mongo", function(done) {

    /* TODO edit these variables to match the interface of your
     * archive server. */
    var archiveServer = "http://127.0.0.1:8080/index.html";
    var archiveForm = {url: "google.com"};

    // Post a message to the archive server:
    request({method: "POST",
             uri: archiveServer,
             form: archiveForm
            },
            function(error, response, body) {
              /* Now if we look in the database, we should find the
               * posted message there. */
              
              mongoClient.open(function(err, p_client) {
                /* TODO edit this variable to match the name of
                 * the collection you're using: */
                var collectionName = "archive";
                client.createCollection(collectionName, function(err, collection) {
                  collection.find().toArray(function(err, results) {
                    // Should have one result:
                    expect(results.length).toEqual(1);

                    // TODO edit this test to match the name of the
                    // property where you're storing the page source:
                    expect(results[0].pageSource.indexOf(
                      "<title>Google</title>")
                          ).toBeGreaterThan(0);

                    done();
                  });
                });

              });
            });
  });

});
