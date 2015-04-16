var jim = {
    "first": "Jim",
    "last": "Cooper",
    "extension": 3219,
    "id": "jim",
    "imageUrl": "http://ipro.lambton.on.ca/img/jim.png",
    "office": "N203A",
    "department": "School of Technology",
    "manager": "Dean of Technology"
  };
var jimMoved = {
    "first": "Jim",
    "last": "Cooper",
    "extension": 3219,
    "id": "jim",
    "imageUrl": "http://ipro.lambton.on.ca/img/jim.png",
    "office": "N203",
    "department": "School of Information Technology",
    "manager": "Dean of Information Technology"
  };
  
function sameContact(a, b) {
	return (
	a.first == b.first &&
	a.last == b.last &&
	a.extension == b.extension &&
	a.id == b.id &&
	a.imageUrl == b.imageUrl &&
	a.office == b.office &&
	a.department == b.department &&
	a.manager == b.manager);	
}

  var request = require('request'),
      vows = require('vows'),
      assert = require('assert');

  vows.describe('Contacts API').addBatch({
    "Contacts API": {
      "Root Resource": {
        "A POST to /": {
          topic: function () {
            request({
				url : 'http://localhost:8001/',
				method : 'POST',
				form : jim
			}, this.callback);
          },
          "should respond with 200": function (err, res, body) {
            assert.equal(res.statusCode, 200);
          },		  
          "A GET from /id/jim": {
            topic: function () {
              request({
				  url : 'http://localhost:8001/id/jim',
				  method : 'GET'				
			  }, this.callback);
            },
            "should respond with 200": function (err, res, body) {
              assert.equal(res.statusCode, 200);
            },"sameContact": function (err, res, body) {
              assert.isTrue(sameContact(JSON.parse(body), jim));
            },		  
            "A PUT to /id/jim": {
              topic: function () {
                request({
				    url : 'http://localhost:8001/id/jim',
				    method : 'PUT',
					form: jimMoved
			    }, this.callback);
              },
              "should respond with 200": function (err, res, body) {
                assert.equal(res.statusCode, 200);
              },
			  "A GET from /id/jim": {
                topic: function () {
                  request({
				      url : 'http://localhost:8001/id/jim',
				      method : 'GET'				
			      }, this.callback);
                },
                "should respond with 200": function (err, res, body) {
                  assert.equal(res.statusCode, 200);
                },"sameContact": function (err, res, body) {
                  assert.isTrue(sameContact(JSON.parse(body), jimMoved));
                },
				"A DELETE on /id/jim": {
				  topic: function() {
				    request({
					    url : 'http://localhost:8001/id/jim',
				        method : 'DELETE'	
					}, this.callback);
				  },
				  "should respond with 200": function (err, res, body) {
                    assert.equal(res.statusCode, 200);
				  },
				  "A GET on /id/jim": {
				    topic: function() {
					  request({
					      url : 'http://localhost:8001/id/jim',
				          method : 'GET'
					  }, this.callback);
					},
				    "should respond with 404": function (err, res, body) {
                      assert.equal(res.statusCode, 404);
				    }
				  }
				}
			  }
            }
          }
		}
      }
    }
  }).export(module);