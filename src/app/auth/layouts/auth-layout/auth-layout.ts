import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggle } from '../../../theme/components/theme-toggle/theme-toggle';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, ThemeToggle],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {}
