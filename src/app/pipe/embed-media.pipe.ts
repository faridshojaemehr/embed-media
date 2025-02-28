import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import markedKatex from 'marked-katex-extension';

@Pipe({
  name: 'embedMedia'
})
export class EmbedMediaPipe implements PipeTransform {
  private ytRegex = /(?:https?:\/\/)?(?:(?:www\.)?youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([^?&"'>]+)/;

  constructor() {
    const renderer = new marked.Renderer();
    renderer.link = ({href, title, text}) => {
      console.log('renderer link called',href); 
      return this.embedYt(href) 
    };
    renderer.link = renderer.link.bind(this);

    marked.use({ 
      renderer,
      breaks: false,
      gfm: true,
      pedantic: false
    });

    marked.use(markedKatex({ throwOnError: false }));
  }

  transform(value: string): SafeHtml {
    console.log('transform called');
    const html = marked.parse(value);
    return html;
  }

  embedYt(href: string): string {
    if (href.match(this.ytRegex)) {
      const ytId = this.extractYtId(href);
      if (ytId) {
        return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${ytId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      }
    } else {
      return `<a href="${href}" target="_blank" title="${href}"> ${href} </a>`;
    }
    return ''
  }

  extractYtId(url: string): string | null {
    const match = url.match(this.ytRegex);
    return match && match[1] ? match[1] : null;
  }

}
