// Skapar ett interface för en kurs (datan från Url)
export interface Course {
  code: string;
  coursename: string;
  progression: 'A' | 'B' | 'C';
  syllabus: string;
}