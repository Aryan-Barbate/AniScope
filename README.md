# AniScope 🎌

> A cinematic anime discovery web app built with HTML, CSS, and JavaScript.

AniScope helps users discover anime through a stylish card interface, smart search, genre filters, and a polished detail modal.

## ✨ Highlights

![HTML](https://img.shields.io/badge/HTML5-Structure-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-UI%20Design-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Logic-F7DF1E?logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-Ready%20to%20Deploy-2ea44f)

| Feature | Description | User Benefit |
|---|---|---|
| 🔎 Smart Search | Title-based search with API fallback for longer queries | Fast anime discovery |
| 🎭 Genre Filter | Filter local and API results by selected genre | Cleaner browsing |
| 🪄 Cinematic UI | Glassmorphism cards, gradients, motion, responsive layout | Modern visual experience |
| 🖼️ Detail Modal | Enhanced anime popup with source/genre chips | Better readability |
| 📊 Live Meta | Shows result count and source (Local/API) | Better context |

## 📸 Screenshots

> Add your screenshots here after uploading them to the repo.

| View | Suggested File |
|---|---|
| Home Screen | assets/screenshots/home.png |
| Search Results | assets/screenshots/search-results.png |
| Anime Detail Modal | assets/screenshots/modal.png |

## 🧱 Tech Stack

| Layer | Tools |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom properties, animations, responsive design) |
| Logic | Vanilla JavaScript (DOM APIs, fetch API, event delegation) |
| Data Source | Jikan API (`https://api.jikan.moe/v4/anime`) |

## 🗂️ Project Structure

```text
AniScope/
|- index.html
|- style.css
|- script.js
|- README.md
```

## 🚀 Quick Start

| Step | Command / Action |
|---|---|
| 1 | `git clone https://github.com/your-username/AniScope.git` |
| 2 | `cd AniScope` |
| 3 | Open `index.html` directly OR run with VS Code Live Server |

### Option A: Run directly

1. Open `index.html` in your browser.

### Option B: Run with VS Code Live Server (recommended)

1. Open project in VS Code.
2. Install the Live Server extension.
3. Right-click `index.html` → **Open with Live Server**.

## 🔄 App Flowchart

```mermaid
flowchart TD
	A[User opens AniScope] --> B[Render local anime cards]
	B --> C{User types in search?}
	C -- No --> D[Stay on local list]
	C -- Yes --> E{Input length > 2?}
	E -- No --> F[Apply local filter + search]
	E -- Yes --> G[Fetch anime from Jikan API]
	G --> H[Apply genre filter]
	H --> I[Render cards + update result count/source]
	F --> I
	I --> J{Card clicked?}
	J -- Yes --> K[Open detail modal]
	J -- No --> C
```

## 🏗️ UI Architecture

```mermaid
flowchart LR
	UI[User Interface] --> Header[Header + Search]
	UI --> Toolbar[Toolbar + Filters + Meta]
	UI --> Grid[Anime Cards Grid]
	UI --> Modal[Anime Detail Modal]

	Logic[JavaScript Logic] --> Render[Render Cards]
	Logic --> Filter[Filter Anime]
	Logic --> Fetch[Fetch API Data]
	Logic --> Events[Event Listeners]

	Fetch --> API[(Jikan API)]
	Render --> Grid
	Events --> Modal
```

## ⚙️ Configuration Guide

| What to Customize | Where | How |
|---|---|---|
| 🎨 Theme colors | `style.css` (`:root`) | Update CSS variables |
| 🧩 Default anime list | `script.js` (`animeList`) | Add/remove objects |
| 🏷️ Branding text | `index.html` | Edit title, subtitle, labels |
| 🧠 Modal content | `script.js` (`openModal`) | Add extra fields/chips |

## 🛣️ Roadmap

| Priority | Improvement |
|---|---|
| High | Debounced search to reduce API calls |
| High | Pagination or infinite scroll |
| Medium | Sorting (score, popularity, release year) |
| Medium | Theme switcher (dark/light variants) |
| Medium | Extra modal metadata (score, episodes, year) |

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

For major changes, please open an issue first to discuss your idea.

## 📜 License

This project is available under the MIT License.

---

### 💡 Pro Tip for GitHub Post

Add a short demo GIF in your repo banner section and include 2-3 screenshots in the table above to improve engagement and star rate.
