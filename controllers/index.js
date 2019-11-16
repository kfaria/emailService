const { body, validationResult } = require('express-validator/check')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('database/db.json')
const db = low(adapter)
const emailService = require('../server/email_service.js')

emailService.startService()

const validate = (method) => {
    switch (method) {
        case 'sendEmail': {
            return [
                body('to', 'Invalid to email').exists().isEmail(),
                body('from', 'Invalid from email').exists().isEmail(),
                body('subject', 'Invalid subject').exists().isString(),
                body('body_text', 'Invalid email').exists().isString(),
                body('body_html', 'Invalid email').exists().isString(),
       ]
        }
        case 'bouncedEmail': {
            return [
                body('email_address', 'Invalid email address').exists().isEmail()
            ]
        }
    }
}

const sendEmail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    if (db.get('blacklisted_emails').find({ emailId: req.body.to }).value() !== undefined) {
        return res.status(403).json({message: 'to email address has been blacklisted, cannot send email'})
    }

    return (emailService.sendEmail(req, res))
}

const bouncedEmail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    if (db.has('blacklisted_emails')) {
        if (db.get('blacklisted_emails').find({ emailId: req.body.email_address }).value() !== undefined) {
            return res.status(400).json({ message: 'email address already blacklisted' })
        } else {
            db.get('blacklisted_emails').push({ emailId: req.body.email_address }).write()
        }
    }

    return res.status(200).json({ body: req.body })

}

module.exports = {
    validate,
    sendEmail,
    bouncedEmail
}