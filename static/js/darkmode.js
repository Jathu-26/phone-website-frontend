// Dark mode toggle script
(function(){
  const key = 'theme';
  const btn = document.getElementById('dark-mode-toggle');

  function setTheme(mode){
    if(mode === 'dark'){
      document.documentElement.setAttribute('data-theme','dark');
      if(btn) btn.textContent = '☀️';
      localStorage.setItem(key,'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      if(btn) btn.textContent = '🌙';
      localStorage.setItem(key,'light');
    }

    // If user is authenticated on server, persist preference
    try{
      // POST to /set_theme; server requires login for this route
      fetch('/set_theme', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: mode })
      }).catch(()=>{/* ignore errors (e.g., not logged in) */});
    }catch(e){/* ignore */}
  }

  // initialize
  try{
    const stored = localStorage.getItem(key);
    if(stored === 'dark') setTheme('dark');
  }catch(e){/* ignore */}

  if(btn){
    btn.addEventListener('click', function(){
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setTheme(isDark ? 'light' : 'dark');
    });
  }
})();
