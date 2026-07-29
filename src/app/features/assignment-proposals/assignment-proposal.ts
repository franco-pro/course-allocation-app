import { Component, OnInit } from '@angular/core';
import { CrudPageComponent } from '../../shared/crud-page/crud-page';

import { AssignmentProposalService } from './services/proposal.service';
import { AssignmentProposalInterface } from '../../core/models/assignment-proposal.model';
import { MatDialog } from '@angular/material/dialog';
import { ProposalDialogComponent } from './proposal-dialog/proposal-dialog';

@Component({
  selector: 'app-proposal-list',
  standalone: true,
  imports: [CrudPageComponent],
  templateUrl: './assignment-proposal.html'
})
export class AssignmentProposalComponent implements OnInit {

  proposals: AssignmentProposalInterface[] = [];
  columns = [

    {
      key:'enseignantNom',
      title:'Enseignants'
    },

    {
      key:'matiereNom',
      title:'Matières'
    },

    {
      key:'classes',
      title:'Classes'
    },

    {
      key:'status',
      title:'Etat'
    },

    {
      key:'proposedAt',
      title:'Date'
    }

  ];

  constructor(
    private proposalService:AssignmentProposalService,
    private dialog:MatDialog,
  ){}

  ngOnInit(){

    this.load();

  }

  load(){

    this.proposalService.findAll().subscribe(res=>{
      console.log("Proposals loaded:", res);

      this.proposals = res as AssignmentProposalInterface[];

    });

  }

 create(){

this.dialog.open(

ProposalDialogComponent,

{
width:'900px',

}

).afterClosed().subscribe(result=>{

if(result){

this.load();

}

});

}

edit(row:any){

this.dialog.open(

ProposalDialogComponent,

{

width:'900px',

data:row

}

).afterClosed().subscribe(result=>{

if(result){

this.load();

}

});

}

  delete(row: any) {

  if (!confirm('Supprimer cette proposition ?')) {
    return;
  }

  this.proposalService.delete(row.id)
    .subscribe(() => this.load());

}

  submit(row:AssignmentProposalInterface){

    if (!confirm('Soumettre cette proposition à la commission ?')) {
    return;
  }

  this.proposalService.submit(row.id).subscribe(() => {
    console.log("id in submit:", row)
      alert('Proposition soumise.');
      this.load();

    });

  }

}