// Simple client-side search with debounce and suggestions
(function(){
  const input = document.getElementById('nav-search-input');
  const form = document.getElementById('nav-search-form');
  const suggestions = document.getElementById('nav-search-suggestions');
  let products = [];
  let timer = null;
  let selectedIndex = -1;

  function fetchProducts(){
    fetch('/api/products')
      .then(r=>r.json())
      .then(data=>{ products = data.products || []; })
      .catch(()=>{ products = []; });
  }

  function showSuggestions(list){
    if(!suggestions) return;
    suggestions.innerHTML = '';
    if(!list || list.length === 0){ suggestions.style.display = 'none'; return; }
    list.slice(0,7).forEach((p, idx)=>{
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'list-group-item list-group-item-action';
      item.textContent = p.title + ' — ' + (p.category||'');
      item.setAttribute('data-title', p.title);
      item.addEventListener('click', ()=>{
        // set input and submit to results page
        input.value = p.title;
        suggestions.style.display = 'none';
        form.submit();
      });
      suggestions.appendChild(item);
    });
    selectedIndex = -1;
    suggestions.style.display = 'block';
  }

  function filter(q){
    const ql = q.toLowerCase();
    return products.filter(p => (p.title||'').toLowerCase().includes(ql) || (p.category||'').toLowerCase().includes(ql));
  }

  function debounceFilter(){
    const q = input.value.trim();
    if(!q){ showSuggestions([]); return; }
    const results = filter(q);
    showSuggestions(results);
  }

  function onInput(){
    clearTimeout(timer);
    timer = setTimeout(debounceFilter, 250);
  }

  function onKeyDown(e){
    if(!suggestions || suggestions.style.display === 'none') return;
    const items = suggestions.querySelectorAll('.list-group-item');
    if(e.key === 'ArrowDown'){
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, items.length -1);
      updateSelection(items);
    } else if(e.key === 'ArrowUp'){
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex -1, 0);
      updateSelection(items);
    } else if(e.key === 'Enter'){
      if(selectedIndex >=0 && items[selectedIndex]){
        e.preventDefault();
        items[selectedIndex].click();
      }
    } else if(e.key === 'Escape'){
      suggestions.style.display = 'none';
    }
  }

  function updateSelection(items){
    items.forEach((it, i)=>{
      if(i === selectedIndex){ it.classList.add('active'); it.scrollIntoView({block:'nearest'}); }
      else it.classList.remove('active');
    });
  }

  function onClickOutside(e){
    if(!form.contains(e.target)){
      if(suggestions) suggestions.style.display = 'none';
    }
  }

  if(input){
    fetchProducts();
    input.addEventListener('input', onInput);
    input.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onClickOutside);
  }
})();
