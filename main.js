async function loadMovies(query=''){
  const res = await fetch('movies.json');
  const movies = await res.json();
  const grid = document.getElementById('videoGrid');
  grid.innerHTML = '';
  movies.filter(m=>m.title.toLowerCase().includes(query.toLowerCase()))
        .forEach(m=>{
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `
            <div class="thumb"><img src="${m.thumb}" alt="${m.title}"></div>
            <div class="meta">
              <div class="title">${m.title}</div>
              <div class="small">${m.year}</div>
            </div>
          `;
          card.addEventListener('click', ()=>window.location.href=`movie.html?id=${m.id}`);
          grid.appendChild(card);
        });
}

document.getElementById('searchBtn').addEventListener('click', ()=>{
  loadMovies(document.getElementById('searchInput').value.trim());
});
document.getElementById('searchInput').addEventListener('keydown', e=>{
  if(e.key==='Enter') loadMovies(e.target.value.trim());
});
loadMovies();
