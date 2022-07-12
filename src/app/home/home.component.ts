import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private authServise: AuthService, private router: Router) {}

  ngOnInit(): void {}
  backToForm() {
    this.authServise.logout();
    this.router.navigate(['/']);
  }
}
