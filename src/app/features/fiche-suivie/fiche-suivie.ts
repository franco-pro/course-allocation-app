import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FicheSuivieModel } from '../../core/models/fiche_suivie.model';
import { FicheSuivieService } from './services/fiche_suivie.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-fiche-suivie',
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './fiche-suivie.html',
  styleUrl: './fiche-suivie.scss',
})
export class FicheSuivieComponent {
  form : FormGroup
  // data: FicheSuivieModel[]=[]
  readonly data = signal<FicheSuivieModel[]>([])
  readonly loading = signal(false)
  readonly hasSearched = signal(false)

  displayedColumns = [
    'numero',
    'nomComplet',
    'jours',
    'heureArrivee',
    'heureDepart',
    'dureeJournee',
    'totalHeures',
  ]

  constructor(
    private readonly fb:FormBuilder,
    private readonly ficheSuivieService: FicheSuivieService
  ){
    this.form = this.fb.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required]
    })
  }

  generate(): void{
    if(this.form.invalid){
      this.form.markAllAsTouched()
      return;
    }

    const {dateDebut, dateFin} = this.form.getRawValue()
    this.loading.set(true)
    this.hasSearched.set(false)
    const dateDebutISO = dateDebut ? new Date(dateDebut).toISOString().split('T')[0]:dateDebut
    const dateFinISO = dateFin ? new Date(dateFin).toISOString().split('T')[0]:dateFin

    this.ficheSuivieService.generate({ dateDebut: dateDebutISO, dateFin: dateFinISO }).subscribe({
      next: (res)=>{
        
        console.log("fiche de suivie:", res)
        const filterRes = res.slice().sort((a,b)=>(a.nomComplet.localeCompare(b.nomComplet)))
        this.data.set(filterRes)
        this.loading.set(false)
        this.hasSearched.set(true)
      },
      error: (err)=>{
        console.error('Erreur generation fiche:', err)
        this.loading.set(false)
      }

    })
  }

  exportExcel():void{
    const rows = this.data()
    if(rows.length === 0){
      return
    }

    const dateDebut = this.form.get('dateDebut')?.value
    const dateFin = this.form.get('dateFin')?.value

    const formatDate = (date:any):string=>{
      if(!date){
        return "";
      }

      const d = new Date(date)
      return d.toLocaleDateString('fr-Fr')
    }
    const periode =  `Période : du ${formatDate(dateDebut)} au ${formatDate(dateFin)}`;

    const excelData = rows.map((row, index)=>({
      'N°': index + 1,
    'Nom complet': row.nomComplet,
    'Jours': row.jours,
    "Heure d'arrivée": row.heureArrivee,
    'Heure de départ': row.heureDepart,
    'Durée d’une journée': row.dureeJournee,
    'Total heures': row.totalHeures,
    }))
    const fileName =
  `fiche-suivi-presences-${formatDate(dateDebut).replace(/\//g, '-')}-au-${formatDate(dateFin).replace(/\//g, '-')}.xlsx`;


    const worksheet:XLSX.WorkSheet = XLSX.utils.book_new() 
    XLSX.utils.sheet_add_json(worksheet, excelData,{
      origin: 'A5'})
    

    //entete
    XLSX.utils.sheet_add_aoa(worksheet, [
      ['INSTITUT UNIVERSITAIRE DE GESTION'],
      ['FICHE DE SUIVI des PRÉSENCES'],
      [periode],
      []
    ],
  {
    origin: 
  'A1'
  })

  //largeur des colonnes
  worksheet['!cols'] = [
    { wch: 6 },   // N°
    { wch: 30 },  // Nom
    { wch: 10 },  // Jours
    { wch: 18 },  // Arrivée
    { wch: 18 },  // Départ
    { wch: 22 },  // Durée journée
    { wch: 20 },  // Total
  ];

  //fusion cellules en-tete
   worksheet['!merges'] = [
    {
      s: { r: 0, c: 0 },
      e: { r: 0, c: 6 },
    },

    {
      s: { r: 1, c: 0 },
      e: { r: 1, c: 6 },
    },

    {
      s: { r: 2, c: 0 },
      e: { r: 2, c: 6 },
    },

  ];

  //style
  worksheet['A1'].s = {
    font: {
      bold: true,
      sz: 16,
    },

    alignment: {
      horizontal: 'center',
      vertical: 'center',
    },

  };


  worksheet['A2'].s = {

    font: {
      bold: true,
      sz: 14,
    },

    alignment: {
      horizontal: 'center',
      vertical: 'center',
    },

  };


  worksheet['A3'].s = {

    font: {
      italic: true,
      sz: 11,
    },

    alignment: {
      horizontal: 'center',
      vertical: 'center',
    },

  };

  const workbook:XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Fiche de suivie')

    XLSX.writeFile(workbook, fileName)

  }

  exportPDF():void{
    const rows = this.data()
    if(rows.length === 0){
      return
    }

    const dateDebut = this.form.get('dateDebut')?.value
    const dateFin = this.form.get('dateFin')?.value

    const formatDate = (date:any): string =>{
      if(!date){
        return ""
      }
      const d = new Date(date)
      return d.toLocaleDateString("Fr-fr")
    }
    const formatAdministrativeDate = (date:any):string=>{
      if(!date){
        return ""
      }
      const d = new Date(date)
      const result =  d.toLocaleDateString("fr-fr", {weekday:'long',day:'2-digit', month:'2-digit', year:'numeric'})

      return result.charAt(0).toUpperCase() + result.slice(1)
    }

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: 'a4'
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    //entete
    const margin = 30
    //bloc gauche
    pdf.setTextColor(30,30,30)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(11)
    pdf.text("INSTITUT UNIVERSITAIRE DU GOLFE DE GUINÉE", margin, 30)

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.text("BP. 12489 DOUALA", margin, 45)
    pdf.text("Tel: +237 33 37 50 59 / +237 33 43 04 52", margin, 60)
    pdf.text("WebSite: univ-iug.com", margin, 75)

    //bloc droit
    pdf.setFont("helvitica", 'bold')
    pdf.setFontSize(11)
    pdf.text(formatAdministrativeDate(new Date()), pageWidth-margin, 30,{align:'right'})
    pdf.setDrawColor(40,40,40)
      pdf.setLineWidth(1)
      pdf.line(pageWidth-100,34,pageWidth-50,34)

    //titre central

      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(18)
      pdf.text('GLOBALEMENT', pageWidth / 2, 100, { align: 'center' })

      pdf.setFontSize(16)
      pdf.text('FICHE DE SUIVI DES PRÉSENCES DES EMPLOYÉS', pageWidth / 2, 120, { align: 'center' })

      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'italic')
      pdf.text(`Période : du ${formatDate(dateDebut)} au ${formatDate(dateFin)}`, pageWidth / 2, 140, { align: 'center' })

      // pdf.setDrawColor(40,40,40)
      // pdf.setLineWidth(1)
      // pdf.line(margin,128,pageWidth-margin,128)

      const tableBody = rows.map((row, index)=>[
        index + 1,
        row.nomComplet,
        row.jours,
        row.heureArrivee,
        row.heureDepart,
        row.dureeJournee,
        row.totalHeures
      ])

      autoTable(pdf,{

        margin:{
          left:30,
          right:30,
        },
        startY:180,
        tableWidth:'auto',

        head: [
          [
          'N°', 
          'Nom complet', 
          'Jours', 
          "Heure d'arrivée",
           'Heure de départ',
            'Durée d’une journée',
             'Total heures'
            ]
          ],

        body:tableBody,
        theme: 'grid',

        styles:{
          font: 'helvetica',
          fontSize: 10,
          textColor: [30,30,30],
          cellPadding: 6,
          lineColor: [30,30,30],
          lineWidth: 0.8,
          valign:'middle',
          halign: 'center'
        },
        columnStyles:{
          0:{
            cellWidth:35
          },
           1: {
        cellWidth: 200,
        halign: 'left',
      },
        },

         headStyles: {

      fontStyle: 'bold',
      // fillColor: [240, 240, 240],
      lineColor: [30,30,30],
      lineWidth: 0.8,
      halign: 'center',
      valign: 'middle',

    },
    })

    //pied de page
    const pageCount = pdf.getNumberOfPages()
    for(let page=1; page<=pageCount; page++){
      pdf.setPage(page)
      const pageHeight = pdf.internal.pageSize.getHeight()
      pdf.setFontSize(8)
      pdf.setFont('helvetica', 'normal')

      
      pdf.text(`Page ${page} sur ${pageCount}`, pageWidth - 50, pageHeight - 10, { align: 'right' })
    }

    const fileName = `fiche-suivi-presences-${formatDate(dateDebut).replace(/\//g, '-')}-au-${formatDate(dateFin).replace(/\//g, '-')}.pdf`
    pdf.save(fileName)
  }

}
