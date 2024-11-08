import { MailtrapClient } from 'mailtrap';

const TOKEN = "42f17fb287e420eb44de0d8ac9104260";

export const client = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Azhad",
};


