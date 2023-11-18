import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

declare function HOMEINIT([]):any;
declare var $:any;
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'cursos_online';
  correo = 'example@gmail.com';
  ngOnInit(): void {
    setTimeout(() => {
      HOMEINIT($);
    }, 50);
  }
}
