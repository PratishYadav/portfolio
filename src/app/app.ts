import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren
} from '@angular/core';

import { Navbar } from './sections/navbar/navbar';
import { Hero } from './sections/hero/hero';
import { About } from './sections/about/about';
import { Skills } from './sections/skills/skills';
import { Projects } from './sections/projects/projects';
import { Experience } from './sections/experience/experience';
import { Education } from './sections/education/education';
import { Certifications } from './sections/certifications/certifications';
import { Github } from './sections/github/github';
import { Resume } from './sections/resume/resume';
import { Contact } from './sections/contact/contact';
import { Footer } from './sections/footer/footer';
import { ImageShowcase } from './sections/image-showcase/image-showcase';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Navbar,
    Hero,
    About,
    Skills,
    Projects,
    ImageShowcase,
    Experience,
    Education,
    Certifications,
    Github,
    Resume,
    Contact,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {

  @ViewChildren('revealElement', {
    read: ElementRef
  })
  revealElements!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    this.setupScrollReveal();
  }

  private setupScrollReveal(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    this.revealElements.forEach((element) => {
      observer.observe(element.nativeElement);
    });
  }
}