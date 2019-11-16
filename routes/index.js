const { Router } = require('express');
const router = Router();
const controllers = require('../controllers');

router.post(
    '/send-email', 
    controllers.validate('sendEmail'),
    controllers.sendEmail
);

router.post(
    '/bounced-email',
    controllers.validate('bouncedEmail'),
    controllers.bouncedEmail
);

module.exports = router;
