import { Component, computed, inject, signal } from '@angular/core';
import { Course } from '../models/course';
import { CoursesService } from '../services/courses.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  courses = signal<Course[]>([]); 
  error = signal<string | null>(null);
  filterValue = signal<string>('');
  coursesService = inject(CoursesService);

  filteredCourses = computed(() =>
    this.courses().filter(course => {
      const query = this.filterValue().toLowerCase();
      return (
        course.code.toLowerCase().includes(query) ||
        course.coursename.toLowerCase().includes(query)
      );
    })
  );

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
