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
