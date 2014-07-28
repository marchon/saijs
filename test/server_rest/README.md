Simple REST tester written in AngularJs
================

Usage: 

Open the host.js file and update your host.
```
var simpleRestTestHost = "http://localhost/project/";
```
Open the tests.js file and start writing tests.

```
simpleRestTests.push(
    new SimpleRestTest('endpoint', 'function', 'method', 'postData', 'expected responce code', 'expected data'));
```

=

GET
```
simpleRestTests.push(
    new SimpleRestTest('user', 'get/1234', 'GET', null, 200, {'first':'bill', 'last','roberts'}));
```
POST
```
simpleRestTests.push(
    new SimpleRestTest('user', 'create', 'POST',{'first':'bill', 'last','roberts'}, 200, null));
```
PUT
```
simpleRestTests.push(
    new SimpleRestTest('user', 'update', 'PUT',{'id':'1234','first':'bill', 'last','roberts'}, 200, null));
```
DELETE
```
simpleRestTests.push(
    new SimpleRestTest('user', 'delete', 'DELETE',{'id':'1234'}, 200, null));
```
