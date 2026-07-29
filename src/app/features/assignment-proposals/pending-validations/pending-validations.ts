import { Component, OnInit } from '@angular/core';
import { CrudPageComponent } from '../../../shared/crud-page/crud-page';
import { AssignmentProposalService } from '../services/proposal.service';
import { AssignmentProposalInterface } from '../../../core/models/assignment-proposal.model';

@Component({
  selector:'app-pending-validations',
  standalone:true,
  imports:[CrudPageComponent],
  templateUrl:'./pending-validations.html'
})
export class PendingValidationsComponent implements OnInit{

  proposals:AssignmentProposalInterface[]=[];

  columns=[

    {
      key:'enseignantNom',
      title:'Enseignant'
    },

    {
      key:'matiereNom',
      title:'Matière'
    },

    {
      key:'classes',
      title:'Classes'
    },

    {
      key:'proposedBy',
      title:'Proposé par'
    },

    {
      key:'proposedAt',
      title:'Date'
    }

  ];

  constructor(
    private proposalService:AssignmentProposalService
  ){}

  ngOnInit(){

    this.load();

  }

  load(){
    this.proposalService.findPending().subscribe(res=>{
      this.proposals=res as AssignmentProposalInterface[];
    });   
  }

  validate(row:any){

    const comment=prompt("Commentaire de validation")??"";

    this.proposalService.validate(row.id,{ comment })
    .subscribe(()=>{

      alert("Proposition validée");

      this.load();

    });

  }

  reject(row:any){

    const reason=prompt("Motif du rejet");

    if(!reason) return;

    this.proposalService.reject(row.id,{ comment:reason })
    .subscribe(()=>{

      alert("Proposition rejetée");

      this.load();

    });

  }

}