import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Course } from '../models/course';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private url: string = "https://webbutveckling.miun.se/files/ramschema.json";
  http = inject(HttpClient);

  // Ladda kurser 
  async loadCourses(): Promise<Course[]> {
    const courses = this.http.get<Course[]>(this.url);
    return await firstValueFrom(courses);
  }
}
