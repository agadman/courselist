// Importerar nödvändiga moduler och typer
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Course } from '../models/course';
import { firstValueFrom } from 'rxjs';

// Gör tjänsten tillgänglig i hela appen
@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  // URL till JSON-filen med kursdatan
  private url: string = "https://webbutveckling.miun.se/files/ramschema.json";
  // Skapar en instans av HttpClient
  http = inject(HttpClient);

  // Hämtar kursdata som en lista av Course-objekt
  async loadCourses(): Promise<Course[]> {
    const courses = this.http.get<Course[]>(this.url); // Gör en HTTP GET-förfrågan
    return await firstValueFrom(courses); // Väntar på första värdet och returnerar resultatet
  }
}
