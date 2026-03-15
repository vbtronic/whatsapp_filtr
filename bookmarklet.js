javascript:(function(){
  if (document.getElementById('wsf-panel')) {
    document.getElementById('wsf-toggle-btn').click();
    return;
  }

  var hostCandidates = [];
  if (location.protocol === 'https:') {
    hostCandidates = ['https://localhost:8000', 'https://127.0.0.1:8000'];
  } else {
    hostCandidates = ['http://localhost:8000', 'http://127.0.0.1:8000'];
  }

  function injectFrom(index) {
    if (index >= hostCandidates.length) {
      alert('WSF: nepodařilo se načíst soubory z localhost. Spusťte ./serve.sh, povolte přístup k localhost a/nebo používejte Chrome rozšíření (doporučeno pro HTTPS).');
      return;
    }

    var base = hostCandidates[index];
    var s = document.createElement('script');
    var c = document.createElement('link');

    s.src = base + '/content.js';
    s.onload = function() {
      if (!document.getElementById('wsf-panel')) {
        // Styles may load after JS; try to add CSS again as fallback.
        if (!document.querySelector('link[href="' + base + '/panel.css"]')) {
          document.head.appendChild(c);
        }
      }
    };
    s.onerror = function() {
      if (c.parentNode) c.parentNode.removeChild(c);
      injectFrom(index + 1);
    };

    c.rel = 'stylesheet';
    c.href = base + '/panel.css';

    document.head.appendChild(c);
    document.head.appendChild(s);
  }

  injectFrom(0);
})();
