const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const videoGrid = document.getElementById('videoGrid');
const searchPreview = document.getElementById('searchPreview');

let movies = [];
let trendingIds = [];

// Load movies once
async function loadMoviesData(){
  const res = await fetch('movies.json');
  movies = await res.json();
}
loadMoviesData();

// --- Render movies in main grid ---
async function loadMovies(query=''){
  if(movies.length === 0) await loadMoviesData();
  videoGrid.innerHTML = '';
  const filtered = movies.filter(m=>m.title.toLowerCase().includes(query.toLowerCase()));
  filtered.forEach(m=>{
    const card = document.createElement('div');
    card.className = 'card movie-card';
    card.innerHTML = `
      ${trendingIds.includes(m.id) ? '<div class="badge">Trending</div>' : ''}
      <div class="thumb"><img src="${m.thumb}" alt="${m.title}"></div>
      <div class="meta">
        <div class="title">${m.title}</div>
        <div class="small">${m.year}</div>
      </div>
    `;
    card.addEventListener('click', ()=> window.location.href=`movie.html?id=${m.id}`);
    videoGrid.appendChild(card);
  });
}

// --- Load trending movies ---
async function loadTrendingMovies(){
  try{
    const [trendingRes, moviesRes] = await Promise.all([
      fetch("trending.json"),
      fetch("movies.json")
    ]);

    trendingIds = (await trendingRes.json()).trending;
    const moviesData = await moviesRes.json();

    const trendingList = document.getElementById("trendingList");
    trendingList.innerHTML = "";

    const trendingMovies = moviesData.filter(m => trendingIds.includes(m.id));
    trendingMovies.forEach(movie=>{
      const item = document.createElement("div");
      item.classList.add("trending-item");
      item.innerHTML = `
        <a href="movie.html?id=${movie.id}">
          <img src="${movie.thumb}" alt="${movie.title}">
          <span>${movie.title}</span>
        </a>
      `;
      trendingList.appendChild(item);
    });

    if(trendingMovies.length === 0){
      trendingList.innerHTML = '<div class="loading">No trending movies found.</div>';
    }

  }catch(err){
    console.error(err);
    document.getElementById("trendingList").innerHTML = '<div class="loading">Failed to load trending movies.</div>';
  }
}

// --- Live search preview ---
searchInput.addEventListener('input', ()=>{
  const query = searchInput.value.trim().toLowerCase();
  searchPreview.style.width = searchInput.offsetWidth + 'px';

  if(!query){
    searchPreview.style.display = 'none';
    return;
  }

  const results = movies.filter(m=>m.title.toLowerCase().includes(query));

  if(results.length === 0){
    searchPreview.innerHTML = '<div style="color:#6b7280;cursor:default;">No results found</div>';
  } else {
    searchPreview.innerHTML = results.map(m=>
      `<div onclick="window.location.href='movie.html?id=${m.id}'">${m.title} (${m.year})</div>`
    ).join('');
  }
  searchPreview.style.display = 'block';
});

// Hide preview when clicking outside
document.addEventListener('click', e=>{
  if(!searchPreview.contains(e.target) && e.target !== searchInput){
    searchPreview.style.display = 'none';
  }
});

// Search button & enter key
searchBtn.addEventListener('click', ()=> loadMovies(searchInput.value.trim()));
searchInput.addEventListener('keydown', e=>{
  if(e.key==='Enter') loadMovies(e.target.value.trim());
});

// --- Initial load ---
loadMovies();
loadTrendingMovies();


