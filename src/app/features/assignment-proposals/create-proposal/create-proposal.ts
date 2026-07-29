import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TeachersService } from '../../teachers/services/teachers.service';
import { SubjectsService } from '../../matieres/services/matiere.service';
import { ClassesService } from '../../classes/services/classes.service';
import { AssignmentProposalService } from '../services/proposal.service';

@Component({
  selector: 'app-create-proposal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './create-proposal.html',
  styleUrl: './create-proposal.scss'
})
export class CreateProposalComponent implements OnInit {

  teachers:any[]=[];

  subjects:any[]=[];

  classes:any[]=[];

  form: any;

  constructor(

    private fb:FormBuilder,

    private teacherService:TeachersService,

    private subjectService:SubjectsService,

    private classService:ClassesService,

    private proposalService:AssignmentProposalService

  ){}

  ngOnInit(){

    this.teacherService.findAll().subscribe(r=>this.teachers=r);

    this.subjectService.findAll().subscribe(r=>this.subjects=r);

    this.classService.findAll().subscribe(r=>this.classes=r);

  }

  submit(){

    if(this.form.invalid){

      this.form.markAllAsTouched();

      return;

    }

    // cast to any to satisfy overloaded create signature
    this.proposalService.create(this.form.value as any)

    .subscribe(()=>{

      alert("Proposition enregistrée.");

      this.form.reset();

    });

  }

}