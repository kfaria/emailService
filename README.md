Author: Kenneth Faria
Project: a simple email server 

#H1 Running instructions

-- To run on a specific PORT
    PORT=#### node start
-- To run tests
    npm test
-- To start in refresh dev mode
    npm run-script start-dev
-- To start
    npm run-script start

Application instructions 

-- send-email sample POSTS

    curl --request POST \ --url localhost:3300/send-email \ --header 'content-type: application/json' \ --data '{ "from" : "ken@kend.com", "to" : "kendo@kend.com", "subject : "send that email!", "body_text" : "Welcome to the internet", "body_html" : "<html><div> Wow the email got sent </div></html>" }'

-- blacklist emails POST

    curl --request POST \ --url localhost:3300/bounced-email \ --header 'content-type: application/json' \ --data '{ "email_address" : "kendo@kend.com" }'