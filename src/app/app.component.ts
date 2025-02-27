import { Component, inject, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import  markedKatex  from 'marked-katex-extension';

@Component({
  selector: 'app-root',
  template: `<div class="markdown-content" [innerHTML]="safeHtml1"></div>
             <div class="markdown-content" [innerHTML]="safeHtml2"></div>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private sanitizer = inject(DomSanitizer)
  markdownContent1 = `This is Katex $c=\\sqrt{a^2+b^2}$`;
  markdownContent2 = `This is inline katex: $c=\\pm\\sqrt{a^2+b^2}$`;

  safeHtml1:any = '';
  safeHtml2:any= '';

  ngOnInit() {
    this.setupMarked();
    this.parseAndSanitizeMarkdown();
  }

  private setupMarked() {
    marked.use(markedKatex({
      throwOnError: false
    }));
  }

  private async parseAndSanitizeMarkdown() {
    const html1  =await  marked.parse(this.markdownContent1);
    const html2 =await  marked.parse(this.markdownContent2);
    
    this.safeHtml1 = this.sanitizer.bypassSecurityTrustHtml(html1);
    this.safeHtml2 = this.sanitizer.bypassSecurityTrustHtml(html2);
  }
}
