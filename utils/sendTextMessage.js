import twilio from 'twilio'

export const sendMessage = (options, cb = () => {}) => {
  const { email, phone } = options
  console.log({ sid: process.env.ACCOUNT_SID, token: process.env.AUTH_TOKEN })
  const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)
  client.messages
    .create({
      from: '+17744096821',
      to: `+91${phone}`,
      body: `\nHi user! \n\nYou have an incomplete order in your cart. Please checkout soon to avail the limited offers.`,
    })
    .then((value) => cb(null, value))
    .catch((err) => cb(err, null))
}
