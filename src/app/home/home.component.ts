// Först importera nödvändiga moduler och komponenter
import { Component, computed, inject, signal } from '@angular/core';
import { Course } from '../models/course';
import { CoursesService } from '../services/courses.service';
import { FormsModule } from '@angular/forms';

// Deklarerar komponenten 
@Component({
  selector: 'app-home',
  imports: [FormsModule], // Importerar FormsModule för ngModel
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  courses = signal<Course[]>([]); // Skapar en signal för kurslistan
  error = signal<string | null>(null); // Skapar en signal för felmeddelanden
  filterValue = signal<string>(''); // Skapar en signal för sökfiltret
  coursesService = inject(CoursesService); // Hämtar en instans av CoursesService

  // Returnerar en filtrerad lista av kurser baserat på sökvärdet
  filteredCourses = computed(() =>
    this.courses().filter(course => {
      const query = this.filterValue().toLowerCase();
      return (
        course.code.toLowerCase().includes(query) ||
        course.coursename.toLowerCase().includes(query)
      );
    })
  );

  // Körs när komponenten laddas
  ngOnInit() {
    this.loadCourses();
  }

  // Hämtar kurserna från API
  async loadCourses() {
    try {
      const response = await this.coursesService.loadCourses();
      this.courses.set(response); // Sparar kurserna i signalen
      console.table(this.courses());
    } catch (error) {
      //console.error(error)
      this.error.set("Kunde inte ladda kurser");
    }
  }
}
