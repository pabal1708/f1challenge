import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

}
