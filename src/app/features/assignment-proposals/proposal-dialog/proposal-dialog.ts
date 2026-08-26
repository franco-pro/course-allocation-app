import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { AssignmentProposalService } from '../services/proposal.service';
import { SchoolYear } from '../../../core/models/year.model';


import { SchoolYearsService } from '../../year/services/year.service';

import { proposalListDto } from '../../../core/models/proposalListDto';
import { AcademicContextComponent } from '../../../shared/academic-context/academic-context';
import { AcademicContextConfig, DEFAULT_ACADEMIC_CONTEXT_CONFIG } from '../../../shared/academic-context/models/academic-context-config';
import { AcademicContextStore } from '../../../shared/academic-context';


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

    AcademicContextComponent,
  ],
  templateUrl: './proposal-dialog.html',
  styleUrl: './proposal-dialog.scss',
})
export class ProposalDialogComponent implements OnInit {
  

  // 1. Déclarez la propriété ici sans lui donner de valeur immédiatement
  form!: FormGroup;

   readonly academicContextConfig: AcademicContextConfig = {
    ...DEFAULT_ACADEMIC_CONTEXT_CONFIG,

    levelRequiresFiliere: true,
    classRequiresLevel: true,
    subjectRequiresClass: true,
    teacherRequiresSubject: false,

    multipleClasses: true,
   }
  constructor(
     private readonly fb: FormBuilder,
    private readonly proposalService: AssignmentProposalService,
    private readonly dialogRef: MatDialogRef<ProposalDialogComponent>,
  

    public readonly academicContextStore: AcademicContextStore,

    @Inject(MAT_DIALOG_DATA)
    public data: any,
    
  ) {
    // 2. Initialisez impérativement le formulaire ICI dans le constructeur
    this.form = this.initializeForm();
  }

  private initializeForm() {
    return this.fb.group({
      anneeId: ['', Validators.required],
    });
  }

ngOnInit(): void {

  if (this.data?.id) {

    if (this.data.status !== 'DRAFT') {

      alert(
        "Cette proposition n'est pas modifiable car elle est déjà soumise ou validée."
      );

      this.form.disable();

    }

    this.loadProposal(this.data.id);

  }

}

private loadProposal(id: number): void {

  this.proposalService.findOne(id).subscribe({

    next: (proposal: proposalListDto) => {

      console.log("Proposal loaded", proposal);

      this.form.patchValue({ anneeId: proposal.anneeId });

    },

    error: (err) => {

      console.error(err);

    }

  });

}



 save(): void {

  const context = this.academicContextStore.context();

  if (
    context.academicYearId== null||
    context.subjectId == null ||
    context.teacherMatricule== null ||
    context.classIds ==null ||
    context.classIds.length === 0
  ) {

    alert("Veuillez compléter le contexte académique.");

    return;
  }

  const dto = {

    anneeId: context.academicYearId,

    enseignantMatricule: context.teacherMatricule,

    matiereId: context.subjectId,

    classeIds: context.classIds,

  };

  console.log("dto proposition:", dto);

  if (this.data?.id) {

    this.proposalService.update(this.data.id, dto)
      .subscribe(() => {

        this.dialogRef.close(true);

      });

  } else {

    this.proposalService.create(dto)
      .subscribe(() => {

        this.dialogRef.close(true);

      });

  }

}
}
