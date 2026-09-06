import {
  ChangeDetectorRef,
  Component,
  inject
} from '@angular/core';

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
  private readonly changeDetector = inject(ChangeDetectorRef);

  isSending = false;
  successMessage = '';
  errorMessage = '';

  fieldErrors: Record<string, string> = {};


  validateField(
    fieldName: string,
    event: Event
  ): void {

    const input = event.target as HTMLInputElement | HTMLTextAreaElement;

    const value = input.value.trim();

    let error = '';

    switch (fieldName) {

      case 'name':

        if (!value) {
          error = 'Name is required.';
        }
        else if (value.length < 2) {
          error = 'Name must be at least 2 characters.';
        }
        else if (value.length > 50) {
          error = 'Name cannot exceed 50 characters.';
        }
        else if (!/^[A-Za-z][A-Za-z ]*$/.test(value)) {
          error = 'Name can contain only letters and spaces.';
        }

        break;


      case 'email':

        if (!value) {
          error = 'Email is required.';
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
          error = 'Please enter a valid email address.';
        }

        break;


      case 'title':

        if (!value) {
          error = 'Subject is required.';
        }
        else if (value.length < 2) {
          error = 'Subject must be at least 2 characters.';
        }
        else if (value.length > 100) {
          error = 'Subject cannot exceed 100 characters.';
        }

        break;


      case 'message':

        if (!value) {
          error = 'Message is required.';
        }
        else if (value.length < 5) {
          error = 'Message must be at least 5 characters.';
        }
        else if (value.length > 1000) {
          error = 'Message cannot exceed 1000 characters.';
        }

        break;
    }

    if (error) {
      this.fieldErrors[fieldName] = error;
    } else {
      delete this.fieldErrors[fieldName];
    }

    this.changeDetector.detectChanges();
  }


  getMessageLength(): number {
    const message =
      document.getElementById('message') as HTMLTextAreaElement | null;

    return message?.value.length ?? 0;
  }


  private validateForm(form: HTMLFormElement): boolean {

    this.fieldErrors = {};

    const name =
      (form.elements.namedItem('name') as HTMLInputElement)
        ?.value.trim() ?? '';

    const email =
      (form.elements.namedItem('email') as HTMLInputElement)
        ?.value.trim() ?? '';

    const title =
      (form.elements.namedItem('title') as HTMLInputElement)
        ?.value.trim() ?? '';

    const message =
      (form.elements.namedItem('message') as HTMLTextAreaElement)
        ?.value.trim() ?? '';


    // Name
    if (!name) {
      this.fieldErrors['name'] = 'Name is required.';
    }
    else if (name.length < 2) {
      this.fieldErrors['name'] =
        'Name must be at least 2 characters.';
    }
    else if (name.length > 50) {
      this.fieldErrors['name'] =
        'Name cannot exceed 50 characters.';
    }
    else if (!/^[A-Za-z][A-Za-z ]*$/.test(name)) {
      this.fieldErrors['name'] =
        'Name can contain only letters and spaces.';
    }


    // Email
    if (!email) {
      this.fieldErrors['email'] = 'Email is required.';
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      this.fieldErrors['email'] =
        'Please enter a valid email address.';
    }


    // Subject
    if (!title) {
      this.fieldErrors['title'] = 'Subject is required.';
    }
    else if (title.length < 2) {
      this.fieldErrors['title'] =
        'Subject must be at least 2 characters.';
    }
    else if (title.length > 100) {
      this.fieldErrors['title'] =
        'Subject cannot exceed 100 characters.';
    }


    // Message
    if (!message) {
      this.fieldErrors['message'] = 'Message is required.';
    }
    else if (message.length < 5) {
      this.fieldErrors['message'] =
        'Message must be at least 5 characters.';
    }
    else if (message.length > 1000) {
      this.fieldErrors['message'] =
        'Message cannot exceed 1000 characters.';
    }


    return Object.keys(this.fieldErrors).length === 0;
  }


  async onSubmit(event: Event): Promise<void> {

    event.preventDefault();

    const form = event.target as HTMLFormElement;

    this.successMessage = '';
    this.errorMessage = '';

    // Validate everything
    if (!this.validateForm(form)) {

      this.changeDetector.detectChanges();

      return;
    }


    this.isSending = true;

    this.changeDetector.detectChanges();


    const formData = new FormData(form);

    const name =
      formData.get('name')?.toString().trim() ?? '';

    const email =
      formData.get('email')?.toString().trim() ?? '';

    const title =
      formData.get('title')?.toString().trim() ?? '';

    const message =
      formData.get('message')?.toString().trim() ?? '';


    try {

      const response = await this.email.sendEmail({
        name,
        email,
        title,
        message
      });

      console.log(
        'Email sent successfully:',
        response
      );


      this.successMessage =
        'Message sent successfully. I will get back to you soon.';

      this.isSending = false;

      form.reset();

      this.fieldErrors = {};

      this.changeDetector.detectChanges();

    }

    catch (error) {

      console.error(
        'Email sending failed:',
        error
      );


      this.errorMessage =
        'Something went wrong while sending your message. Please try again.';

      this.isSending = false;

      this.changeDetector.detectChanges();
    }
  }
}