import { Component, inject } from '@angular/core';
import { Email } from '../../services/email';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

  private readonly email = inject(Email);

  isSending = false;
  successMessage = '';
  errorMessage = '';

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    this.isSending = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formData = new FormData(form);

    const name = formData.get('name')?.toString().trim() ?? '';
    const email = formData.get('email')?.toString().trim() ?? '';
    const title = formData.get('title')?.toString().trim() ?? '';
    const message = formData.get('message')?.toString().trim() ?? '';

    try {
      await this.email.sendEmail({
        name,
        email,
        title,
        message
      });

      this.successMessage =
        'Message sent successfully. I will get back to you soon.';

      form.reset();

    } catch (error) {
      console.error('Email sending failed:', error);

      this.errorMessage =
        'Something went wrong while sending your message. Please try again.';
    } finally {
      this.isSending = false;
    }
  }
}