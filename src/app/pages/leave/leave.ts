import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee';
import { DatePipe } from '@angular/common';





@Component({
  selector: 'app-leave',
  imports: [ReactiveFormsModule,DatePipe],
  templateUrl: './leave.html',
  styleUrl: './leave.css'
})
export class Leave implements OnInit {

  constructor() {
   const loggedData = localStorage.getItem('leaveUser');
   if (loggedData != null) {
    const loggedParseData = JSON.parse(loggedData);
    this.leaveForm.controls['employeeId'].setValue(loggedParseData.employeeId);
   }
    
  }
  ngOnInit(): void {
    this.loadLeaves();
  }

  employeeService = inject(EmployeeService);
  leaveList: any[] = [];

  @ViewChild("leaveModal") leaveModal!: ElementRef;

  leaveForm: FormGroup = new FormGroup({
    leaveId: new FormControl(0),
    employeeId: new FormControl(0),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    noofDays: new FormControl(''),
    leaveType: new FormControl(''),
    details: new FormControl(''),
    isApproved: new FormControl(false),
    approvedDate: new FormControl(null),
  });

  openModal() {
    if (this.leaveModal) {
      this.leaveModal.nativeElement.style.display = 'block';
    }
  }

  closeModal() {
    if (this.leaveModal) {
      this.leaveModal.nativeElement.style.display = 'none';
        this.leaveForm.reset(); 
    }
  }

  loadLeaves() {
    const empId = this.leaveForm.controls['employeeId'].value;
    this.employeeService.getAllLeavesByEmpId(empId).subscribe({
      next: (result: any) => {
        this.leaveList = result.data;
      },
      error: (err) => {
        console.error('Error loading leaves:', err);
      }
    });
  }

  submitLeave() {
    const formData = this.leaveForm.value;
    this.employeeService.onAddLeave(formData).subscribe({
      next: (res:any) => {
        if(res.result){
          this.loadLeaves();
         alert('Leave added successfully');
          this.closeModal();
         

        }
        else{
          alert(res.message);
        
          
        }
        
      },
      error: (err) => {
       alert('Error adding leave');
      }
    });
  }

}


