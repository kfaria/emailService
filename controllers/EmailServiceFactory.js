class EmailService {
    constructor(host, port) {
        this.host = host
        this.port = port
    }

    send(to, from, subject, body) {
        throw new Error('Not implemented')
    }

}

class AwsEmailService extends EmailService {
    send(to, from, subject, body_text, body_html) {
        // instantiate AWS service and send off
        return true
    }
}

class SendGridEmailService extends EmailService {
    send(to, from, subject, body_text, body_html) {
        // instantiate AWS service and send off
        return true
    }
}

class EmailServiceFactory {
    static getService({ type, host, port }) {
        switch (type) {
            case 'aws':
                return new AwsEmailService(host, port)
            case 'send-grid':
                return new SendGridEmailService(host, port)
            default:
                throw new Error(`Email service type ${type} is not supported`)
        }
    }
}

module.exports = {
    EmailServiceFactory
}