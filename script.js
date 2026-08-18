const movies = [
  {
    title: "The Public-Domain Adventure",
    year: 1930,
    genre: "Adventure",
    duration: "1h 42m",
    poster: "https://placehold.co/400x600/15131f/e9d5ff?text=Adventure",
    video: "YOUR_LEGAL_VIDEO_URL_HERE"
  },
  {
    title: "Midnight Drama",
    year: 1940,
    genre: "Drama",
    duration: "1h 31m",
    poster: "https://placehold.co/400x600/17121b/e9d5ff?text=Drama",
    video: "YOUR_LEGAL_VIDEO_URL_HERE"
  },
  {
    title: "Laughing Street",
    year: 1950,
    genre: "Comedy",
    duration: "1h 18m",
    poster: "https://placehold.co/400x600/111827/e9d5ff?text=Comedy",
    video: "YOUR_LEGAL_VIDEO_URL_HERE"
  },
  {
    title: "Beyond the Stars",
    year: 1960,
    genre: "Sci-Fi",
    duration: "1h 47m",
    poster: "https://placehold.co/400x600/11131d/e9d5ff?text=Sci-Fi",
    video: "YOUR_LEGAL_VIDEO_URL_HERE"
  }
];

const grid = document.getElementById("movieGrid");
const search = document.getElementById("search");
const filter = document.getElementById("genreFilter");
const empty = document.getElementById("emptyState");
const modal = document.getElementById("playerModal");
const player = document.getElementById("videoPlayer");
const title = document.getElementById("playerTitle");
const meta = document.getElementById("playerMeta");

function renderMovies() {
  const q = search.value.trim().toLowerCase();
  const genre = filter.value;

  const results = movies.filter(m =>
    (genre === "all" || m.genre === genre) &&
    (m.title.toLowerCase().includes(q) || m.genre.toLowerCase().includes(q))
  );

  grid.innerHTML = results.map((m, i) => `
    <article class="movie-card">
      <img class="poster" src="${m.poster}" alt="${m.title} poster">
      <div class="card-body">
        <h3>${m.title}</h3>
        <div class="meta">${m.year} • ${m.genre} • ${m.duration}</div>
        <button class="watch-btn" onclick="watchMovie(${movies.indexOf(m)})">▶ Watch</button>
      </div>
    </article>
  `).join("");

  empty.classList.toggle("hidden", results.length !== 0);
}

function watchMovie(index) {
  const movie = movies[index];
  title.textContent = movie.title;
  meta.textContent = `${movie.year} • ${movie.genre} • ${movie.duration}`;

  if (!movie.video || movie.video === "YOUR_LEGAL_VIDEO_URL_HERE") {
    alert("Add a legal video URL for this movie in script.js first.");
    return;
  }

  player.src = movie.video;
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  player.play().catch(() => {});
}

function closePlayer() {
  player.pause();
  player.removeAttribute("src");
  player.load();
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

search.addEventListener("input", renderMovies);
filter.addEventListener("change", renderMovies);
document.getElementById("closePlayer").addEventListener("click", closePlayer);
modal.addEventListener("click", e => {
  if (e.target === modal) closePlayer();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closePlayer();
});

renderMovies();
