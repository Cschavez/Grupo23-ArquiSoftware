const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');

const poolData = {
    UserPoolId: "us-east-1_fnR3qgQhP",
    ClientId: "34mhest1jjdsb9s2p4ciijqv31"
 };

exports.Validate = function(req, res, next){
    const pool_region = "us-east-1";
    var token = req.headers['authorization'];
    request({
           url : `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
           json : true
        }, function(error, response, body){
           if (!error && response.statusCode === 200) {
               pems = {};
               var keys = body['keys'];
               for(var i = 0; i < keys.length; i++) {
                    var key_id = keys[i].kid;
                    var modulus = keys[i].n;
                    var exponent = keys[i].e;
                    var key_type = keys[i].kty;
                    var jwk = { kty: key_type, n: modulus, e: exponent};
                    var pem = jwkToPem(jwk);
                    pems[key_id] = pem;
               }
               var decodedJwt = jwt.decode(token, {complete: true});
                    if (!decodedJwt) {
                        console.log("Not a valid JWT token");
                        res.status(401);
                        return res.send("Invalid token");
                   }
                var kid = decodedJwt.header.kid;
                var pem = pems[kid];
                if (!pem) {
                    console.log('Invalid token');
                    res.status(401);
                    return res.send("Invalid token");              
                }
                jwt.verify(token, pem, function(err, payload) {
                        if(err) {
                            console.log("Invalid Token.");
                            res.status(401);
                            return res.send("Invalid tokern");
                        } else {
                             console.log("Valid Token.");
                             return next();
                        }
                   });
           } else {
                 console.log("Error! Unable to download JWKs");
                 res.status(500);
                 return res.send("Error! Unable to download JWKs");
           }
       });
    }

exports.ValidateAdmin = function(req, res, next){
    const pool_region = "us-east-1";
    var token = req.headers['authorization'];
    request({
            url : `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
            json : true
        }, function(error, response, body){
            if (!error && response.statusCode === 200) {
                pems = {};
                var keys = body['keys'];
                for(var i = 0; i < keys.length; i++) {
                    var key_id = keys[i].kid;
                    var modulus = keys[i].n;
                    var exponent = keys[i].e;
                    var key_type = keys[i].kty;
                    var jwk = { kty: key_type, n: modulus, e: exponent};
                    var pem = jwkToPem(jwk);
                    pems[key_id] = pem;
                }
                var decodedJwt = jwt.decode(token, {complete: true});
                if (!decodedJwt) {
                    console.log("Not a valid JWT token");
                    res.status(401);
                    return res.send("Invalid token");
                }
                var kid = decodedJwt.header.kid;
                var pem = pems[kid];
                if (!pem) {
                    console.log('Invalid token');
                    res.status(401);
                    return res.send("Invalid token");              
                }
                jwt.verify(token, pem, function(err, payload) {
                        if(err) {
                            console.log("Invalid Token.");
                            res.status(401);
                            return res.send("Invalid tokern");
                        } if (!decodedJwt.payload.hasOwnProperty("cognito:groups")  || !decodedJwt.payload['cognito:groups'].includes("admins") ) {
                            console.log("Only admins.");
                            res.status(401);
                            return res.send("Invalid tokern");
                        } else {
                            console.log("Valid Token.");
                            return next();
                        }
                    });
            } else {
                    console.log("Error! Unable to download JWKs");
                    res.status(500);
                    return res.send("Error! Unable to download JWKs");
            }
        });
    }
    