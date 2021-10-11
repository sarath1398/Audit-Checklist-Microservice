export class auditResponse 
{
    auditType:string;
    auditDate:Date;
    responsesList:string[];

    constructor()
    {
        this.auditType="";
        this.auditDate = new Date(); 
        this.responsesList=[];
    }

}