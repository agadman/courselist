import { Component, inject, signal } from '@angular/core';
import { Course } from '../models/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  courses = signal<Course[]>([]); 
  error = signal<string | null>(null);
  coursesService = inject(CoursesService);

  ngOnInit() {
    this.loadCourses();
  }

  async loadCourses() {
    try {
      const response = await this.coursesService.loadCourses();
      this.courses.set(response);
      console.table(this.courses());
    } catch (error) {
      //console.error(error)
      this.error.set("Kunde inte ladda kurser");
    }
  }
}
