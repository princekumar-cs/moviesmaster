async function loadMovie(){
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const res = await fetch('movies.json');
  const movies = await res.json();
  const movie = movies.find(m=>m.id===id);
  const container = document.getElementById('movieDetail');
  const titleEl = document.getElementById('movieTitle');

  if(!movie){
    titleEl.textContent = "Movie Not Found";
    container.innerHTML="<p>Sorry, movie does not exist.</p>";
    return;
  }

  titleEl.textContent = movie.title;
  container.innerHTML = `
    <img src="${movie.thumb}" alt="${movie.title}">
    <h2>${movie.title} (${movie.year})</h2>
    <p>${movie.desc}</p>
    <p><h3>Size of File: ${movie.size}</h3></p>
    <a class="download-btn" href="${movie.download}" target="_blank">⬇ Download Now[server 1]</a>
    <a class="download-btn" href="${movie.download}" target="_blank">⬇ Download Now[server 2]</a>
  `;
}

loadMovie();
