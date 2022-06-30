const bodyUnauthorized = {
    message: "Authorization ( API KEY ) is invalid or unknown",
    serverCode: "Unauthorized",
    status: "401 - Unauthorized",
    statusCode: 401,
}
const bodyBlacklisted = {
    message: "Your API Key has been blacklisted from our api",
    serverCode: "Blacklisted",
    status: "403 - Forbidden",
    statusCode: 403,
}
const bodyBadrequest = {
    message: "Requested data was invalid!",
    serverCode: "Bad Request",
    status: "400 - Bad Request",
    statusCode: 400
}

const bodyNotFound = {
    message: "Requested route does not exist",
    serverCode: "Page Not Found",
    status: "404 - Not Found",
    statusCode: 404
}

module.exports = {
    bodyBlacklisted,
    bodyUnauthorized,
    bodyBadrequest,
    bodyNotFound
}