import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

class RouterQuery {
}

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent  implements OnInit {
  errorStatus: any;
  errorStatusList: any[] = [
    { statusCode: 401, statusMsg: "Unauthorized", statusImg: "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" },
    { statusCode: 400, statusMsg: "Bad Request", statusImg: "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" },
    { statusCode: 404, statusMsg: "Сторінка недоступна", statusImg: "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" },
    { statusCode: 403, statusMsg: "Forbidden", statusImg: "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" },
    { statusCode: 500, statusMsg: "Unexpected Error", statusImg: "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" },
    { statusCode: 503, statusMsg: "Сервіс недоступний", statusImg: "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" }
  ];

  constructor(private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadRelevantItems();
  }

  loadRelevantItems() {
    let code = this.activatedRoute.snapshot.paramMap.get('status');
    console.log(code);
    if (code  !== undefined){
      this.errorStatus = this.errorStatusList.filter(i => i.statusCode == code);
      console.log(this.errorStatus);
    }
  }

  protected readonly location = location;
}
