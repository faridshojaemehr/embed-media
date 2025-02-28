import { Component } from '@angular/core';
import { EmbedMediaPipe } from './pipe/embed-media.pipe';
import { SafeHtmlPipe } from "./pipe/safe-html.pipe";


@Component({
  selector: 'app-root',
  template: `
      <div class="markdown-content" [innerHTML]="safeHtml1|embedMedia|safeHtml"></div>
      <div class="markdown-content" [innerHTML]="safeHtml2|embedMedia|safeHtml"></div>
      <div class="markdown-content" [innerHTML]="safeHtml3|embedMedia|safeHtml"></div>
             `,
  styleUrls: ['./app.component.css'],
  imports: [EmbedMediaPipe, SafeHtmlPipe]
})
export class AppComponent  {
  
  safeHtml1 = `This is **Katex** $$c=\\sqrt{a^2+b^2}$$`;
  safeHtml2 = `This is **inline** katex: $c=\\pm\\sqrt{a^2+b^2}$`;
  url = `https://www.youtube.com/watch?v=Ata9cSC2WpM` 
  safeHtml3 = `can you helo me to learn python? ${this.url})`

}
