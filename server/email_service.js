const config = require('../email_config.json');
let serviceInitialized = false
let serviceName = null
let sendEndpoint = null

function emailService() {
    return {
        startService(){
            serviceName = config.service.serviceName
            sendEndpoint = config.service.sendEndpoint
            serviceInitialized = true
            console.log(`Email service initialized and operated with ${serviceName}`)
        },
        sendEmail(req, res){
            if(!serviceInitialized) {
                return res.status(500).json({
                    message: `Email service not initialized`
                })
            } 

            return res.status(200).json({ 
                message: `Service sent email ${serviceName} to ${sendEndpoint}`,
                details: req.body
            })
        }
    }
}

module.exports = emailService()