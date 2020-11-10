var authService = require('../services/AuthService');

exports.register = function(req, res){
    let register = authService.Register(req.body, function(err, result){
    if(err)
        res.status(400).send(err);
    res.send(result);
  })
}

exports.login = function(req, res){
    let login = authService.Login(req.body, function(err, result){
        if(err)
            res.status(400).send(err);
        res.send(result);
    })
 }

 exports.validate_token = function(req, res){
    let validate = authService.Validate(req.body.token, function(err, result){
        if(err)
            res.status(400).send(err.message);
        res.send(result);
    })
}