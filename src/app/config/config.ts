import { Injectable } from '@angular/core';
export interface ILangItem{
  label:string;
  icon:string;
}
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // public ServerName:string = 'http://localhost:7777'
  // public ServerNameV2:string = 'http://localhost:1212'

  // public ServerName:string = 'http://192.168.1.174:7777'
  // public ServerNameV2:string = 'http://192.168.1.174:1212'

  public ServerName:string = 'http://192.168.5.250:7777'
  public ServerNameV2:string = 'http://192.168.5.250:1212'
  
  constructor() {}
}