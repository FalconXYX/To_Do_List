import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor() {}
  httpPost(theUrl: string, senditem: any) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', theUrl, false); // false for synchronous request
    xmlHttp.send(senditem);
    return xmlHttp.responseText;
  }
  httpGet(theUrl: string) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
  }
}
