import { Component } from '@angular/core';

type AboutCommand = 'whoami' | 'stack' | 'projects' | 'mindset' | 'status';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {

  activeCommand: AboutCommand = 'whoami';

  readonly commands: AboutCommand[] = [
    'whoami',
    'stack',
    'projects',
    'mindset',
    'status'
  ];

  readonly commandLabels: Record<AboutCommand, string> = {
    whoami: 'whoami',
    stack: './stack',
    projects: './projects',
    mindset: './mindset',
    status: './status'
  };

  readonly commandDescriptions: Record<AboutCommand, string> = {
    whoami: 'identity',
    stack: 'technology',
    projects: 'what I build',
    mindset: 'how I think',
    status: 'current state'
  };

  setCommand(command: AboutCommand): void {
    this.activeCommand = command;
  }

  isActive(command: AboutCommand): boolean {
    return this.activeCommand === command;
  }
}