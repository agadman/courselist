import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    // Definierar rutterna, omdirigerar till Home vid tom sökväg
    { path: "Home", component: HomeComponent },
    { path: "", redirectTo: "Home", pathMatch: "full" },
];
