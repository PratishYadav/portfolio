import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class Email {

  private readonly serviceId = 'service_oxqyqgt';
  private readonly templateId = 'template_jwx6dbl';
  private readonly publicKey = '8QmkSxlnbWmhniqqu';

  async sendEmail(formData: {
    name: string;
    email: string;
    title: string;
    message: string;
  }): Promise<void> {

    await emailjs.send(
      this.serviceId,
      this.templateId,
      {
        name: formData.name,
        email: formData.email,
        title: formData.title,
        message: formData.message,
        time: new Date().toLocaleString()
      },
      {
        publicKey: this.publicKey
      }
    );
  }
}