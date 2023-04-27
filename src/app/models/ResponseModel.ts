export class ResponseModel<T> {
  public isError: boolean = false;
  public errorMessage?: string ='';
  public data?: T ;
}
