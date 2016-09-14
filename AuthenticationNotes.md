***Authentication***

=== Old School: Server Side Authentication ===

When you log in, the client sends a request to the server, which then creates a piece of session data and stores it in a database.
With the response, it gives the client the session data (referred to sometimes as cookies), which is then used as authentication
for each time the client accesses the database during that session. Cookies are unique to one single domain, meaning that in a complex
server layout, you're sending multiple cookies out all the time.

=== New School: Token Authentication ===

Client sends request to the server signing up to the service. The server creates a token containing the id of the user.
If successful, the server sends that token to the client and doesn't bother with it anymore. The token isn't needed at the server
as it can be encrypted and decrypted whenever it needs to be. The token can also be given an expiration date, so that the client
doesn't need to type in a password every time, but after some time the client will be redirected back to the sign in page and
be expected to sign in again to create a new token.


---Misc Notes---

Vertical Upgrade: Upgrade the one server to handle more requests.
Horizontal Upgrade: Create more servers to share request handling.
Create a config file to store elements that your server will need to function (port number, etc)

const { PORT } = require('./config')
const port = process.env.PORT || PORT
Either use the port assigned by the server environment, or the port we have defined.