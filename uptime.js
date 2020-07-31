var express = require('express');
var app = express();
app.get("/", (request, response) => {
  response.sendstatus(200);
});