export interface searchDTO {
    page:number;
    limit:number;
    keyword?:string;
    sortBy?:string;
    sortOrder?:'asc'|'desc';
}