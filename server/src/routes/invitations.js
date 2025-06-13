const express = require('express');
const auth = require('../middlewares/auth');
const mail = require('../utils/mail');

const router = new express.Router();

const createMailOptions = (data) => {
  const { to, host, seminario, date, time, lab, image, seat } = data;

  const htmlContent = `
                <h1><strong>Invitation For Seminario</strong></h1>
                <p>Hi, You have been invited by ${host}</p>
                <p>Seminario name: ${seminario}</p>
                <p>Date: ${date}</p>
                <p>Time: ${time}</p>
                <p>Lab name: ${lab}</p>
                <p>Lab seat: ${seat}</p>
                <img src="${image}" alt="Lab Image"/>
                <br/>
              `;
  return {
    from: 'mohamedazyzbelkhouja@gmail.com',
    to,
    subject: 'Lab + Invitation',
    html: htmlContent,
  };
};

// Send Invitation Emails
router.post('/invitations', auth.simple, async (req, res) => {
  const invitations = req.body;
  const promises = invitations.map((invitation) => {
    const mailOptions = createMailOptions(invitation);
    return mail
      .sendEMail(mailOptions)
      .then(() => ({
        success: true,
        msg: `The Invitation to ${mailOptions.to} was sent!`,
      }))
      .catch((exception) => ({ success: false, msg: exception }));
  });

  Promise.all(promises).then((result) => res.status(201).json(result));
});
module.exports = router;
