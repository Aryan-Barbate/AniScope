// Anti-Debug Wrapper
(function() {
    // Detect DevTools
    let devToolsOpen = false;
    const threshold = 160;
    
    setInterval(() => {
        const start = Date.now();
        debugger;
        if (Date.now() - start > threshold) {
            devToolsOpen = true;
            window.location.href = "about:blank";
        }
    }, 1000);
    
    // Override console methods
    const noop = () => {};
    console.log = noop;
    console.warn = noop;
    console.error = noop;
    console.debug = noop;
    console.info = noop;
    
    // Disable eval
    window.eval = new Proxy(window.eval, {
        apply() { return undefined; }
    });
    
    // Override Function constructor
    const OriginalFunction = Function;
    window.Function = new Proxy(OriginalFunction, {
        construct() { return noop; }
    });
    
    // Disable access to source code through chrome devtools
    Object.defineProperty(window, "__filename", {
        get() { return "undefined"; }
    });
})();

const modal = document.getElementById("animeModal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalDesc = document.getElementById("modalDesc");
const modalGenre = document.getElementById("modalGenre");
const modalSource = document.getElementById("modalSource");
const closeModal = document.getElementById("closeModal");
const resultCount = document.getElementById("resultCount");
const sourceBadge = document.getElementById("sourceBadge");

const container = document.getElementById("cardsContainer");

const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");

const animeList = [
    {
        title: "Demon Slayer",
        genre: "Action",
        image: "https://m.media-amazon.com/images/M/MV5BZjZjNzI5MDctY2Y4YS00NmM4LTljMmItZTFkOTExNGI3ODRhXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_.jpg",
        highResImage: "https://m.media-amazon.com/images/M/MV5BZjZjNzI5MDctY2Y4YS00NmM4LTljMmItZTFkOTExNGI3ODRhXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_.jpg",
        desc:"A boy becomes a demon slayer to save his sister."
    },
    {
        title: "One Piece",
        genre: "Adventure",
        image: "https://m.media-amazon.com/images/M/MV5BODcwNWE3OTMtMDc3MS00NDFjLWE1OTAtNDU3NjgxODMxY2UyXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
        highResImage: "https://m.media-amazon.com/images/M/MV5BODcwNWE3OTMtMDc3MS00NDFjLWE1OTAtNDU3NjgxODMxY2UyXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
        desc: "Pirates searching for the ultimate treasure."
    },
    {
        title: "Haikyuu",
        genre: "Sports",
        image: "https://m.media-amazon.com/images/M/MV5BYjYxMWFlYTAtYTk0YS00NTMxLWJjNTQtM2E0NjdhYTRhNzE4XkEyXkFqcGc@._V1_.jpg",
        highResImage: "https://m.media-amazon.com/images/M/MV5BYjYxMWFlYTAtYTk0YS00NTMxLWJjNTQtM2E0NjdhYTRhNzE4XkEyXkFqcGc@._V1_.jpg",
        desc: "A short boy dreams of becoming a volleyball champion."
    },
    {
        title: "Your Name",
        genre: "Romance",
        image: "https://upload.wikimedia.org/wikipedia/en/0/0b/Your_Name_poster.png",
        highResImage: "https://upload.wikimedia.org/wikipedia/en/0/0b/Your_Name_poster.png",
        desc: "A beautiful story of two strangers connected by fate."
    }
];

let currentAnimeList = [...animeList];
let activeSource = "local";
let revealObserver = null;

function createCard(anime, index){
        return `
        <article class="card" data-index="${index}">
            <img src="${anime.image}" loading="lazy" alt="${anime.title} poster">
            <div class="card-content">
                <h3>${anime.title}</h3>
                <p>${shortText(anime.desc, 88)}</p>
                <span class="genre">${anime.genre}</span>
                <span class="info-chip">Tap for details</span>
            </div>
        </article>
        `;
}

function renderCards(list){
    currentAnimeList = list;
    if (list.length === 0) {
        container.innerHTML = '<div class="status-card">No anime found for your current filters.</div>';
    } else {
        container.innerHTML = list.map((anime, index) => createCard(anime, index)).join("");
    }

    activateCardReveals();

    updateMeta(list.length);
}

function setupRevealAnimations() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
        document
            .querySelectorAll(".brand-block, .search-container, .toolbar, .site-footer")
            .forEach((element) => element.classList.add("in-view"));
        return;
    }

    revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("in-view");
                revealObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.16,
            rootMargin: "0px 0px -10% 0px"
        }
    );

    document
        .querySelectorAll(".brand-block, .search-container, .toolbar, .site-footer")
        .forEach((element, index) => {
            element.classList.add("reveal-on-scroll");
            element.style.setProperty("--reveal-delay", `${index * 70}ms`);
            revealObserver.observe(element);
        });
}

function activateCardReveals() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const items = container.querySelectorAll(".card, .status-card");
    items.forEach((item, index) => {
        if (reducedMotion) {
            item.classList.add("in-view");
            return;
        }

        item.classList.add("reveal-on-scroll");
        item.style.setProperty("--reveal-delay", `${Math.min(index * 48, 360)}ms`);

        if (revealObserver) {
            revealObserver.observe(item);
        } else {
            item.classList.add("in-view");
        }
    });
}

function updateMeta(total){
    resultCount.textContent = `${total} ${total === 1 ? "title" : "titles"}`;
    sourceBadge.textContent = activeSource === "remote" ? "Source: Live API" : "Source: Local Picks";
    sourceBadge.classList.toggle("remote", activeSource === "remote");
}

function shortText(text, maxLength){
    if (!text) {
        return "No description available.";
    }

    if (text.length <= maxLength) {
        return text;
    }

    return `${text.slice(0, maxLength).trim()}...`;
}

function filterAnime(){
    activeSource = "local";

    const searchValue = searchInput.value.toLowerCase();
    const selectedGenre = genreFilter.value;

    const filtered = animeList.filter(anime => {
        const matchSearch = anime.title.toLowerCase().includes(searchValue);
        const matchGenre = selectedGenre === "all" || anime.genre === selectedGenre;

        return matchSearch && matchGenre;
    });

    renderCards(filtered);
}

searchInput.addEventListener("input",()=>{
    const query = searchInput.value.trim();

    if(query.length > 2){
        fetchAnime(query);
    }else{
        filterAnime();
    }
});
genreFilter.addEventListener("change",()=>{
    filterAnime();
});

container.addEventListener("click", (e) => {
    const card = e.target.closest(".card");

    if (!card) {
        return;
    }

    const index = Number(card.dataset.index);
    const anime = currentAnimeList[index];

    if (anime) {
        openModal(anime);
    }
});

setupRevealAnimations();
renderCards(animeList);

function openModal(anime){
    modalTitle.textContent = anime.title;
    modalImage.src = anime.highResImage || anime.image;
    modalDesc.textContent = anime.desc;
    modalGenre.textContent = anime.genre;
    modalSource.textContent = activeSource === "remote" ? "Live result" : "Local pick";

    modal.classList.add("show");
    document.body.classList.add("modal-open");
}

function closeAnimeModal(){
    modal.classList.remove("show");
    document.body.classList.remove("modal-open");
}

async function fetchAnime(query){
    try{
        activeSource = "remote";
        container.innerHTML = '<div class="status-card">Loading anime from API...</div>';
        updateMeta(0);

        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=18`);
        const data = await response.json();

        const selectedGenre = genreFilter.value;

        let formattedData = data.data.map(anime => ({
            title: anime.title,
            genre: anime.genres[0]?.name || "Unknown",
            image: anime.images.webp?.image_url || anime.images.jpg.image_url,
            highResImage:
                anime.images.webp?.large_image_url ||
                anime.images.jpg.large_image_url ||
                anime.images.webp?.image_url ||
                anime.images.jpg.image_url,
            desc: anime.synopsis || "No description available"
        }));

        if (selectedGenre !== "all") {
            formattedData = formattedData.filter((anime) => anime.genre === selectedGenre);
        }

        renderCards(formattedData);

    }catch(error){
        container.innerHTML = '<div class="status-card error">Error loading data. Try again in a few seconds.</div>';
        updateMeta(0);
    }
}

closeModal.addEventListener("click",() =>{
    closeAnimeModal();
});

window.addEventListener("click",(e) => {
    if(e.target === modal){
        closeAnimeModal();
    }
});

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeAnimeModal();
    }
});

(function() {

    const blockDevTools = () => {

        document.addEventListener("keydown", (e) => {
            if (e.key === "F12" || (e.ctrlKey && e.shiftKey && ["I", "J", "C", "K"].includes(e.key)) || (e.ctrlKey && e.key === "u")) {
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }
        }, true);
        

        document.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }, true);
        

        document.addEventListener("dragstart", (e) => {
            e.preventDefault();
        }, true);
        

        document.addEventListener("copy", (e) => {
            e.preventDefault();
        });
    };
    
    blockDevTools();
    
    const obs = new TextEncoder().encode.toString().toString();
    
    window.top !== window.self && (window.top.location = window.self.location);
    

    Object.defineProperty(Error.prototype, "stack", {
        get() { return ""; }
    });
    

    let _0x = {};
    Object.defineProperty(_0x, "toString", {
        get() {
            return () => "blocked";
        }
    });
    

    const handler = {
        get(target, prop) {
            return "protected";
        }
    };
    window.proxy = new Proxy({}, handler);
})();

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    return false;
});