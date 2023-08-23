import { NextResponse } from "next/server"

const nodemailer = require('nodemailer')

const MailService = async (to: string, firstName: string, lastName: string) => {

  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    secure: false,
    auth: {
      user: process.env.SMPT_USER,
      pass: process.env.SMPT_PASSWORD
    }
  })
  try {
    await transporter.sendMail({
      from: process.env.SMPT_USER,
      to,
      subject: `Message from ${firstName} ${lastName}`,
      text: '',
      html: 'ggg' // Тут будет верстка содержания письма
    })
    return NextResponse.json({ status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ status: 500 })
  } 
}

export default MailService;
