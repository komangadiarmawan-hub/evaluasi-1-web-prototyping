import { createContext, useContext, useState } from "react";

// ===============================
// DATA PEMAIN
// ===============================

const players = [
  {
    id: 1,
    name: "Gilang",
    number: 1,
    position: "GK",
    age: 19,
    status: "Starter",
  },
  {
    id: 2,
    name: "Dhika",
    number: 2,
    position: "CB",
    age: 20,
    status: "Starter",
  },
  {
    id: 3,
    name: "Agus Suardita",
    number: 3,
    position: "CB",
    age: 19,
    status: "Starter",
  },
  {
    id: 4,
    name: "Yoga",
    number: 12,
    position: "LB",
    age: 19,
    status: "Starter",
  },
  {
    id: 5,
    name: "Bagas",
    number: 14,
    position: "RB",
    age: 19,
    status: "Starter",
  },
  {
    id: 6,
    name: "Fery Affandi",
    number: 15,
    position: "DM",
    age: 21,
    status: "Starter",
  },
  {
    id: 7,
    name: "Gobel",
    number: 8,
    position: "CM",
    age: 19,
    status: "Starter",
  },
  {
    id: 8,
    name: "Salomo",
    number: 10,
    position: "AM",
    age: 20,
    status: "Starter",
  },
  {
  id: 8,
    name: "Rikoo",
    number: 7,
    position: "LW",
    age: 20,
    status: "Starter",
 },
 {
 id: 9,
    name: "Krisna",
    number: 11,
    position: "RW",
    age: 20,
    status: "Starter",
  },
  {
  id: 10,
    name: "Petrus",
    number: 9,
    position: "ST",
    age: 19,
    status: "Starter",
  },
];

// ===============================
// DATA PERTANDINGAN
// ===============================

const matches = [
  {
    id: 1,
    opponent: "ILKOM FC",
    date: "12 Oktober 2026",
    time: "19:30",
    venue: "Santiago Berdebu | Undiksha",
    competition: "Liga Mahasiswa",
    type: "HOME",
  },
  {
    id: 2,
    opponent: "PTI UNITED",
    date: "18 Oktober 2026",
    time: "16:00",
    venue: "Santiago Berdebu | Undiksha",
    competition: "Liga Mahasiswa",
    type: "AWAY",
  },
  {
    id: 3,
    opponent: "SIFORS FC",
    date: "25 Oktober 2026",
    time: "19:00",
    venue: "Santiago Berdebu | Undiksha",
    competition: "Liga Mahasiswa",
    type: "HOME",
  },
];

// ===============================
// DATA KLASEMEN
// ===============================

const standings = [
  {
    position: 1,
    team: "TRPL FC",
    played: 8,
    win: 6,
    draw: 1,
    lose: 1,
    points: 19,
  },
  {
    position: 2,
    team: "ILKOM FC",
    played: 8,
    win: 5,
    draw: 2,
    lose: 1,
    points: 17,
  },
  {
    position: 3,
    team: "PTI UNITED",
    played: 8,
    win: 5,
    draw: 1,
    lose: 2,
    points: 16,
  },
  {
    position: 4,
    team: "SIFORS FC",
    played: 8,
    win: 4,
    draw: 2,
    lose: 2,
    points: 14,
  },
 
];

// ===============================
// CONTEXT
// ===============================

const TeamContext = createContext();

function TeamProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((item) => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <TeamContext.Provider
      value={{
        favorites,
        toggleFavorite,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}

// ===============================
// HEADER
// ===============================

function Header({ page, setPage }) {
  const { darkMode, setDarkMode } = useContext(TeamContext);

  return (
    <header className="header">
      <div className="logo-area">
        <div className="logo">⚽</div>

        <div>
          <h2>TRPL FC</h2>
          <span>Football Team Dashboard</span>
        </div>
      </div>

      <nav>
        <button
          className={page === "dashboard" ? "active" : ""}
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={page === "squad" ? "active" : ""}
          onClick={() => setPage("squad")}
        >
          Squad
        </button>

        <button
          className={page === "matches" ? "active" : ""}
          onClick={() => setPage("matches")}
        >
          Matches
        </button>

        <button
          className={page === "standings" ? "active" : ""}
          onClick={() => setPage("standings")}
        >
          Standings
        </button>
      </nav>

      <button
        className="theme-button"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </header>
  );
}

// ===============================
// STATS CARD
// ===============================

function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>

      <div>
        <p>{title}</p>
        <h2>{value}</h2>
      </div>
    </div>
  );
}

// ===============================
// PLAYER CARD
// ===============================

function PlayerCard({ player }) {
  const { favorites, toggleFavorite } = useContext(TeamContext);

  const isFavorite = favorites.includes(player.id);

  return (
    <div className="player-card">
      <div className="player-header">
        <span className="number">#{player.number}</span>

        <button
          className={isFavorite ? "favorite selected" : "favorite"}
          onClick={() => toggleFavorite(player.id)}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      <div className="player-avatar">{player.position}</div>

      <h3>{player.name}</h3>

      <p>
        {player.age} tahun • {player.position}
      </p>

      {/* CONDITIONAL RENDERING */}

      {player.status === "Starter" && (
        <span className="badge starter">STARTER</span>
      )}

    </div>
  );
}

// ===============================
// DASHBOARD
// ===============================

function Dashboard({ setPage }) {
  return (
    <>
      <section className="hero">
        <div>
          <span className="small-title">SEASON 2026/27</span>

          <h1>
            Welcome to <span>TRPL FC</span>
          </h1>

          <p>
            Pantau skuad, pertandingan, dan klasemen TRPL FC
            dalam satu dashboard.
          </p>

          <button
            className="main-button"
            onClick={() => setPage("squad")}
          >
            Lihat Skuad →
          </button>
        </div>

        <div className="big-ball">⚽</div>
      </section>

      <div className="stats">
        <StatCard title="Posisi Liga" value="#1" icon="🏆" />

        <StatCard title="Pertandingan" value="8" icon="📅" />

        <StatCard title="Menang" value="6" icon="✓" />

        <StatCard title="Poin" value="19" icon="⭐" />
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <span className="small-title">NEXT MATCH</span>

          <h2>TRPL FC vs ILKOM FC</h2>

          <div className="match">
            <div>
              <div className="club-logo">T</div>
              <strong>TRPL FC</strong>
            </div>

            <div className="vs">
              <strong>VS</strong>
              <span>12 Okt • 19:30</span>
            </div>

            <div>
              <div className="club-logo opponent">I</div>
              <strong>ILKOM FC</strong>
            </div>
          </div>

          <p className="location">
            📍 Santiago Berdebu Undiksha • Liga Mahasiswa
          </p>
        </div>

        <div className="panel">
          <span className="small-title">RECENT FORM</span>

          <h2>5 Pertandingan Terakhir</h2>

          <div className="form">
            <span className="win">W</span>
            <span className="win">W</span>
            <span className="draw">D</span>
            <span className="win">W</span>
            <span className="loss">L</span>
          </div>

          <p className="location">
            Performa TRPL FC dalam lima pertandingan terakhir.
          </p>
        </div>
      </div>
    </>
  );
}

// ===============================
// SQUAD
// ===============================

function Squad() {
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("ALL");

  const filteredPlayers = players.filter((player) => {
    const searchMatch = player.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const positionMatch =
      position === "ALL" || player.position === position;

    return searchMatch && positionMatch;
  });

  return (
    <section>
      <div className="page-title">
        <div>
          <span className="small-title">TEAM MANAGEMENT</span>

          <h1>First Team Squad</h1>

          <p>Daftar pemain TRPL FC.</p>
        </div>

        <div className="filters">
          <input
            type="text"
            placeholder="Cari pemain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            <option value="ALL">Semua Posisi</option>
            <option value="GK">GK</option>
            <option value="CB">CB</option>
            <option value="LB">LB</option>
            <option value="RB">RB</option>
            <option value="DMF">DMF</option>
            <option value="CMF">CMF</option>
            <option value="AMF">AMF</option>
            <option value="LW">LW</option>
            <option value="RW">RW</option>
            <option value="ST">ST</option>
          </select>
        </div>
      </div>

      <div className="players">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
            />
          ))
        ) : (
          <div className="empty">
            Pemain tidak ditemukan.
          </div>
        )}
      </div>
    </section>
  );
}

// ===============================
// MATCHES
// ===============================

function Matches() {
  return (
    <section>
      <div className="page-title">
        <div>
          <span className="small-title">FIXTURES</span>

          <h1>Upcoming Matches</h1>

          <p>Jadwal pertandingan TRPL FC.</p>
        </div>
      </div>

      <div className="matches">
        {matches.map((match) => (
          <div className="match-card" key={match.id}>
            <div className="date">
              <strong>{match.date.split(" ")[0]}</strong>
              <span>{match.date.split(" ")[1]}</span>
            </div>

            <div className="match-info">
              <small>{match.competition}</small>

              <h3>
                TRPL FC <span>vs</span> {match.opponent}
              </h3>

              <p>
                📍 {match.venue} • 🕒 {match.time}
              </p>
            </div>

            <span
              className={
                match.type === "HOME"
                  ? "home"
                  : "away"
              }
            >
              {match.type}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===============================
// STANDINGS
// ===============================

function Standings() {
  return (
    <section>
      <div className="page-title">
        <div>
          <span className="small-title">LEAGUE TABLE</span>

          <h1>League Standings</h1>

          <p>Klasemen sementara Liga Mahasiswa.</p>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>TEAM</th>
              <th>P</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>PTS</th>
            </tr>
          </thead>

          <tbody>
            {standings.map((team) => (
              <tr
                key={team.team}
                className={
                  team.team === "TRPL FC"
                    ? "my-team"
                    : ""
                }
              >
                <td>{team.position}</td>

                <td>
                  <strong>{team.team}</strong>
                </td>

                <td>{team.played}</td>

                <td>{team.win}</td>

                <td>{team.draw}</td>

                <td>{team.lose}</td>

                <td>
                  <strong>{team.points}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ===============================
// FOOTER
// ===============================

function Footer() {
  return (
    <footer>
      <strong>TRPL FC</strong>

      <span>
        Football Team Dashboard
      </span>
    </footer>
  );
}

// ===============================
// APP
// ===============================

function AppContent() {
  const [page, setPage] = useState("dashboard");

  const { darkMode } = useContext(TeamContext);

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <Header
        page={page}
        setPage={setPage}
      />

      <main>
        {page === "dashboard" && (
          <Dashboard setPage={setPage} />
        )}

        {page === "squad" && <Squad />}

        {page === "matches" && <Matches />}

        {page === "standings" && <Standings />}
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <TeamProvider>
      <AppContent />
    </TeamProvider>
  );
}