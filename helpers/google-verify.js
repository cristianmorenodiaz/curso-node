const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GClientID);

const verificagoogle = async (idToken = "") => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GClientID,
  });
  const { name: nombre, picture: img, email } = ticket.getPayload();

  return { nombre, img, email };
};

module.exports = {
  verificagoogle,
};
