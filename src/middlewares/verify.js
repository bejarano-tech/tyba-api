import jwt from "jsonwebtoken"

function verify (req, res, next){
    let accessToken = req.headers['x-token']
    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken){
        return res.status(403).send({ error: 'Not authenticated.' })
    }

    let payload
    try{
        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        next()
    }catch(e){
        if (e.name == "TokenExpiredError") {
            return res.status(440).send({ error: 'Session expired.' })
        }
        if (e.name == "JsonWebTokenError") {
            return res.status(403).send({ error: 'Invalid credentials.' })
        }

        
        //if an error occured return request unauthorized error
        return res.status(401).send({ error: 'An unkown error occurred.' })
    }
}

export { verify }