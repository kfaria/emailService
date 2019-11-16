const request = require('supertest')
const app = require('../server')
let lastBlacklisted

describe('Request Body Parameters', () => {
    it('Full request', async () => {
        const res = await request(app)
            .post('/send-email')
            .send({
                to: "ken@ken.com",
                from: "ken@ken.com",
                subject: "subject is a string",
                body_text: "body text is a string",
                body_html: "body html wrapped in a string"
            })
        expect(res.statusCode).toEqual(200)
    })
    it('Missing to', async () => {
        const res = await request(app)
            .post('/send-email')
            .send({
                from: "ken@ken.com",
                subject: "subject is a string",
                body_text: "body text is a string",
                body_html: "body html wrapped in a string"
            })
        expect(res.statusCode).toEqual(400)
    })
    it('Missing from', async () => {
        const res = await request(app)
            .post('/send-email')
            .send({
                to: "ken@ken.com",
                subject: "subject is a string",
                body_text: "body text is a string",
                body_html: "body html wrapped in a string"
            })
        expect(res.statusCode).toEqual(400)
    })
    it('Missing subject', async () => {
        const res = await request(app)
            .post('/send-email')
            .send({
                to: "ken@ken.com",
                from: "ken@ken.com",
                body_text: "body text is a string",
                body_html: "body html wrapped in a string"
            })
        expect(res.statusCode).toEqual(400)
    })
    it('Missing body_text', async () => {
        const res = await request(app)
            .post('/send-email')
            .send({
                to: "ken@ken.com",
                from: "ken@ken.com",
                subject: "subject is a string",
                body_html: "body html wrapped in a string"
            })
        expect(res.statusCode).toEqual(400)
    })
    it('Missing body_html', async () => {
        const res = await request(app)
            .post('/send-email')
            .send({
                to: "ken@ken.com",
                from: "ken@ken.com",
                subject: "subject is a string",
                body_text: "body text is a string",
            })
        expect(res.statusCode).toEqual(400)
    })
})

describe('Blacklist email', () => {
    it('Blacklist email', async () => {
        lastBlacklisted = "ken" + Date.now() + "@ken.com"
        const res = await request(app)
            .post('/bounced-email')
            .send({
                email_address: lastBlacklisted
            })
        expect(res.statusCode).toEqual(200)
    })
    it('Repeat blacklist', async () => {
        lastBlacklisted = "ken" + Date.now() + "@ken.com"
        const res = await request(app)
            .post('/bounced-email')
            .send({
                email_address: lastBlacklisted
            })
        expect(res.statusCode).toEqual(200)
    })
    it('Email address format check', async () => {
        const res = await request(app)
            .post('/bounced-email')
            .send({
                email_address: "ken"
            })
        expect(res.statusCode).toEqual(400)
    })
    it('Send to blacklisted email', async () => {
        const res = await request(app)
            .post('/send-email')
            .send({
                to: lastBlacklisted,
                from: "ken@ken.com",
                subject: "subject is a string",
                body_text: "body text is a string",
                body_html: "body html wrapped in a string"
            })
        expect(res.statusCode).toEqual(403)
    })
})