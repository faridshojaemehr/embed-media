import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import DOMPurify from "dompurify";

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  protected sanitizer = inject(DomSanitizer);
  constructor() {
    DOMPurify.addHook("uponSanitizeElement", (node: any, data: any) => {
      if (data.tagName === "iframe") {
        const src = node.getAttribute("src") || "";
        if (
          !src.startsWith("https://www.youtube.com/embed/") &&
          !src.startsWith("https://docs.google.com/presentation/")
        ) {
          return node.parentNode?.removeChild(node);
        }
      }
    });

    DOMPurify.addHook("beforeSanitizeAttributes", (node: any) => {
      if ("lightbox" in node) {
        node.setAttribute("lightbox", null);
      }
    });
  }

  public transform(value: any): any {
    const sanitizedContent = DOMPurify.sanitize(value, {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: ["lightbox", "target"],
      IN_PLACE: true,
    });
    return this.sanitizer.bypassSecurityTrustHtml(
      sanitizedContent as unknown as string
    );
  }

}
