async function loadMovies() {
  const response = await fetch("movies.json");
  const movies = await response.json();
  const list = document.getElementById("movieList");
  const searchBox = document.getElementById("searchBox");

  function render(filter = "") {
    list.innerHTML = "";
    movies
      .filter(m => m.title.toLowerCase().includes(filter.toLowerCase()))
      .forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");
        card.innerHTML = `
          <img src="${movie.poster}" alt="${movie.title}">
          <h3>${movie.title} (${movie.year})</h3>
        `;
        card.onclick = () => window.location.href = `movie.html?id=${movie.id}`;
        list.appendChild(card);
      });
  }

  searchBox.addEventListener("input", e => render(e.target.value));
  render();
}

loadMovies();
