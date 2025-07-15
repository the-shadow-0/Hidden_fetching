# Hidden\_fetching

**JavaScript Bookmarklet: Script URL Extractor**

A bookmarklet that scans the current web page and its external JavaScript files, extracting all URL-like strings and displaying them in your browser.

---

## Repository: Hidden\_fetching

This repository hosts the `Hidden_fetching` script and related documentation.

---

## Overview

This bookmarklet helps you quickly locate embedded resource paths (APIs, assets, endpoints) without manually sifting through source files. It:

* Scans inline HTML and external `.js` files.
* Uses a regex to match paths starting with `/`, including alphanumeric characters, query parameters, hashes, and dots.
* Deduplicates results to show each URL only once.
* Delays output to allow external fetches to complete.

---

## Installation

1. **Add a Bookmark:**

   * Create a new bookmark in your browser’s toolbar.
   * Name it `Extract URLs` (or any name you prefer).
   * Paste the bookmarklet code (below) as the bookmark’s URL.

2. **Bookmarklet Code:**

   ```javascript
   javascript:(function(){
     var scripts = document.getElementsByTagName("script"),
         regex   = /(?<=(\"|\'|\`))\/[a-zA-Z0-9_?&=\/\-\#\.]*?(?=(\"|\'|\`))/g,
         results = new Set();

     // Fetch external JS content
     for (var i = 0; i < scripts.length; i++) {
       var src = scripts[i].src;
       if (src) {
         fetch(src)
           .then(res => res.text())
           .then(text => {
             for (let match of text.matchAll(regex)) {
               results.add(match[0]);
             }
           })
           .catch(err => console.log("Error fetching script:", err));
       }
     }

     // Scan inline HTML
     var pageHTML = document.documentElement.outerHTML;
     for (let match of pageHTML.matchAll(regex)) {
       results.add(match[0]);
     }

     // Write results after delay
     function writeResults() {
       results.forEach(url => document.write(url + "<br>"));
     }
     setTimeout(writeResults, 3000);
   })();
   ```

---

## Usage

1. Open the target web page.
2. Click the `Extract URLs` bookmark.
3. Wait a few seconds; the page will display all unique URL paths found.

---

## Example Output

```
/api/v1/users?active=true
/assets/images/logo.svg
/scripts/vendor.bundle.js
/styles/main.css#theme=dark
```

---

## Customization

* **Regex:** Tweak the `regex` to match full URLs (including `http(s)://`) or other patterns.
* **Output:** Replace `document.write` with `console.log`, a modal, or download functionality.

---

## Limitations

* CORS restrictions may block fetching some external scripts.
* Only matches paths starting with `/` by default.

---

## License

This script is released under the MIT License. See [LICENSE](LICENSE) for details.

---

*Happy URL hunting!*
