import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
// import { RouterOutlet } from "../../../../node_modules/@angular/router/router_module.d";

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

  router = inject(Router);
onLogout() {
  localStorage.removeItem("leaveUser")
  // Navigate to login page or perform any other logout actions
  this.router.navigateByUrl('/login');
}

}
