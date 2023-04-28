import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {ShopService} from "../../../services/shop.service";
import {UserRole} from "../../../models/user";

@Component({
  selector: 'app-humburger',
  templateUrl: './humburger.component.html',
  styleUrls: ['./humburger.component.scss']
})
export class HumburgerComponent implements OnInit{
  public user: UserRole = UserRole.User;
  constructor(private el: ElementRef,
              private router: Router,
              private auth: AuthService,
              private shop: ShopService,
  ) {
  }
  ngOnInit(): void {
    if(this.auth.isAuthenticated()) {
      this.shop.getUser().subscribe(res=>
        this.user = res
      )
    }
  }

  onOpen(): void {
    const bodyList = document.getElementsByTagName('body');
    if (bodyList && bodyList.length > 0) {
      const body = bodyList[0];
      body.classList.add('modal-open');
    }
    const backDrop = this.el.nativeElement.querySelector('.backdrop');
    const close = this.el.nativeElement.querySelector('.imgContainer');
    const content = this.el.nativeElement.querySelector('.content');
    // const container = this.el.nativeElement.querySelector('.container');
    backDrop.style.display ='flex';
    close.style.display ='flex';
    content.style.display ='flex';
  }
  goToPage(page: string){
    this.router.navigate([page]);
    this.onClose();
  }
  logout(){
    this.auth.logout();
    location.href = '';
    this.onClose();
  }

  onClose() {
    const bodyList = document.getElementsByTagName('body');
    if (bodyList && bodyList.length > 0) {
      const body = bodyList[0];
      body.classList.remove('modal-open');
    }
    const backDrop = this.el.nativeElement.querySelector('.backdrop');
    const close = this.el.nativeElement.querySelector('.imgContainer');
    const content = this.el.nativeElement.querySelector('.content');
    const container = this.el.nativeElement.querySelector('.container');
    content.style.display ='none';
    backDrop.style.display ='none';
    close.style.display ='none';
  }


  protected readonly UserRole = UserRole;
}
