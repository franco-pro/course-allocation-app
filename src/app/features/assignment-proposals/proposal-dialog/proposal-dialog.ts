import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { TeachersService } from '../../teachers/services/teachers.service';
import { SubjectsService } from '../../matieres/services/matiere.service';
import { ClassesService } from '../../classes/services/classes.service';
import { AssignmentProposalService } from '../services/proposal.service';
import { SchoolYear } from '../../../core/models/year.model';
import { Class } from '../../../core/models/classe.model';
import { Subject } from '../../../core/models/matiere.model';
import { Teacher } from '../../../core/models/teachers.model';
import { SchoolYearsService } from '../../year/services/year.service';
import { AuthService } from '../../../core/auth/authService';
import { proposalListDto } from '../../../core/models/proposalListDto';


@Component({
  selector: 'app-proposal-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,

  ],
  templateUrl: './proposal-dialog.html',
  styleUrl: './proposal-dialog.scss',
})
export class ProposalDialogComponent implements OnInit {
  teachers: Teacher[] = [];
  subjects: Subject[] = [];
  classes: Class[] = [];
  schoolYears: SchoolYear[] = [];

  // 1. Déclarez la propriété ici sans lui donner de valeur immédiatement
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeachersService,
    private subjectService: SubjectsService,
    private classService: ClassesService,
    private proposalService: AssignmentProposalService,
    private dialogRef: MatDialogRef<ProposalDialogComponent>,
    private readonly schoolYearService: SchoolYearsService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    // 2. Initialisez impérativement le formulaire ICI dans le constructeur
    this.form = this.initializeForm();
  }

  private initializeForm() {
    return this.fb.group({
      enseignantMatricule: ['', Validators.required],
      matiereId: [null, Validators.required],
      anneeId: ['', Validators.required],
      classeIds: [[], Validators.required],
    });
  }

  ngOnInit(): void {

  forkJoin({

    teachers: this.teacherService.findAll(),

    subjects: this.subjectService.findAll(),

    classes: this.classService.findAll(),

    schoolYears: this.schoolYearService.findAll(),

  }).subscribe({

    next: (result) => {

      this.teachers = result.teachers;

      this.subjects = result.subjects as Subject[];

      this.classes = result.classes as Class[];

      this.schoolYears = result.schoolYears;

      // =============================
      // MODE EDITION
      // =============================

      if (this.data?.id) {
        console.log("Editing proposal with ID:", this.data);
        if(this.data.status !== 'DRAFT'){
          //display popup message to inform user that the proposal is not editable
          alert("Cette proposition n'est pas modifiable car elle est déjà soumise ou validée.");
          this.form.disable();
        }

        this.loadProposal(this.data.id);

        return;

      }

      // =============================
      // MODE CREATION
      // =============================

      if (this.schoolYears.length) {

        this.form.patchValue({

          anneeId:
            this.schoolYears[this.schoolYears.length - 1].id_annee,

        });

      }

    },

    error: (err) => {

      console.error(err);

    }

  });

}

private loadProposal(id: number): void {

  this.proposalService.findOne(id).subscribe({

    next: (proposal: proposalListDto) => {

      console.log("Proposal loaded", proposal);

      this.form.patchValue(proposal);

    },

    error: (err) => {

      console.error(err);

    }

  });

}



  save() {
    if (this.form.invalid) {
      console.log('Formulaire invalide', this.form);
      this.form.markAllAsTouched();
      return;
    }

    if (this.data) {
      // Mode Édition
      this.proposalService.update(this.data.id, this.form.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.proposalService.create(this.form.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}
