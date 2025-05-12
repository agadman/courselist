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

  sortField = signal<keyof Course | null>(null); // Signal som håller koll på vilket fält som sorteras
  sortAscending = signal<boolean>(true); // Signal som håller koll på sorteringsriktningen
  
  // Filtrerar och sorterar kurslistan beroende på sökfält och vald sortering
  filteredCourses = computed(() => {
    const query = this.filterValue().toLowerCase(); // Söksträng från inputfältet
    
    //Filtrerar kurserna utefter söksträngen (kod eller namn)
    const sorted = [...this.courses()].filter(course =>
      course.code.toLowerCase().includes(query) ||
      course.coursename.toLowerCase().includes(query)
    );
  
    const field = this.sortField(); // Valt fält för sortering
    const ascending = this.sortAscending(); // Sorteringsriktning
  
    // Sortering av kurserna
    if (field) {
      sorted.sort((a, b) => {
        // Konverterar till små bokstäver för att jämföra strängarna med
        const aVal = a[field]?.toLowerCase?.() ?? '';
        const bVal = b[field]?.toLowerCase?.() ?? '';
        return ascending
          ? aVal.localeCompare(bVal) // Stigande
          : bVal.localeCompare(aVal); // Fallande
      });
    }
  
    return sorted; // Returnerar den filtrerade och sorterade kurslistan
  });
  
  // Metod för att hantera när en th klickas på (kod, namn eller progression)
  setSort(field: keyof Course) {
    if (this.sortField() === field) {
      this.sortAscending.set(!this.sortAscending()); // Byt riktning (om samma fält klickas)
    } else {
      this.sortField.set(field); // Nytt th klickas på
      this.sortAscending.set(true); // Börjar med stigande
    }
  }

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
