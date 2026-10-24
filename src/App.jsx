import { useMemo, useState } from "react";
import "./App.css";

const flights = [
  { id: 1, airline: "IndiGo", code: "6E 204", from: "BOM", to: "DEL", depart: "06:15", arrive: "08:25", duration: "2h 10m", stops: "Non-stop", price: 5299, tone: "blue", logo: "✈" },
  { id: 2, airline: "Air India", code: "AI 866", from: "BOM", to: "DEL", depart: "09:40", arrive: "11:55", duration: "2h 15m", stops: "Non-stop", price: 6199, tone: "red", logo: "✦" },
  { id: 3, airline: "Akasa Air", code: "QP 1120", from: "BOM", to: "BLR", depart: "07:20", arrive: "09:00", duration: "1h 40m", stops: "Non-stop", price: 3899, tone: "orange", logo: "▲" },
  { id: 4, airline: "IndiGo", code: "6E 532", from: "DEL", to: "BLR", depart: "12:10", arrive: "15:00", duration: "2h 50m", stops: "Non-stop", price: 5799, tone: "blue", logo: "✈" },
  { id: 5, airline: "Air India", code: "AI 640", from: "BLR", to: "BOM", depart: "18:30", arrive: "20:10", duration: "1h 40m", stops: "Non-stop", price: 4299, tone: "red", logo: "✦" },
  { id: 6, airline: "Akasa Air", code: "QP 1351", from: "DEL", to: "BOM", depart: "20:15", arrive: "22:25", duration: "2h 10m", stops: "Non-stop", price: 4999, tone: "orange", logo: "▲" }
];
const money = n => "₹" + n.toLocaleString("en-IN");

function App() {
  const [from, setFrom] = useState("BOM");
  const [to, setTo] = useState("DEL");
  const [date, setDate] = useState("2026-11-15");
  const [passengers, setPassengers] = useState("1 Adult");
  const [searched, setSearched] = useState(false);
  const [selected, setSelected] = useState(null);
  const [booking, setBooking] = useState(null);
  const [notice, setNotice] = useState("");

  const results = useMemo(() => flights.filter(f => f.from === from && f.to === to), [from, to]);

  const swapCities = () => {
    setFrom(to);
    setTo(from);
    setSearched(false);
    setSelected(null);
  };

  const searchFlights = (event) => {
    event.preventDefault();
    setSearched(true);
    setSelected(null);
    setBooking(null);
    document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const chooseFlight = (flight) => {
    setSelected(flight);
    setBooking(null);
  };

  const confirmBooking = (event) => {
    event.preventDefault();
    setBooking({
      reference: "SKY" + Math.random().toString(36).slice(2, 7).toUpperCase(),
      flight: selected,
      date,
      passengers
    });
    setSelected(null);
  };

  return (
    <div className="sky-app">
      <div className="top-strip">YOUR NEXT ADVENTURE STARTS HERE <span>✦</span> SIMPLE · SMART · SKYBOOK</div>
      <header className="header">
        <button className="brand" onClick={() => { setSearched(false); setSelected(null); setBooking(null); window.scrollTo({top:0,behavior:"smooth"}); }}>
          <span className="brand-mark">S</span> skybook<span className="brand-dot">.</span>
        </button>
        <nav><a href="#search-panel">Book flights</a><a href="#why-skybook">Why SkyBook</a></nav>
        <button className="manage-btn" onClick={() => document.getElementById("search-panel")?.scrollIntoView({behavior:"smooth"})}>Plan a trip ↗</button>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">FLY A LITTLE FURTHER</p>
          <h1>The world is<br/><em>closer than ever.</em></h1>
          <p className="hero-description">Find your next flight with less fuss and more feeling. Your journey begins with one simple search.</p>
          <a className="hero-link" href="#search-panel">Find your flight <span>↓</span></a>
        </div>
        <div className="hero-visual" aria-label="Decorative airplane travel illustration">
          <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
          <div className="sun-disc"></div><div className="plane-symbol">✈</div>
          <div className="floating-card"><span>✦</span><div><b>New places</b><small>New memories</small></div></div>
          <div className="hero-location">NEXT STOP: ANYWHERE</div>
        </div>
        <div className="hero-foot"><span>01 / MADE FOR YOUR JOURNEY</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section id="search-panel" className="search-section">
        <div className="section-label">LET'S GET YOU THERE <span>✳</span></div>
        <h2>Where to next?</h2>
        <form className="search-card" onSubmit={searchFlights}>
          <label className="field"><span>FROM</span><select value={from} onChange={e => setFrom(e.target.value)}><option value="BOM">Mumbai (BOM)</option><option value="DEL">Delhi (DEL)</option><option value="BLR">Bengaluru (BLR)</option></select></label>
          <button type="button" className="swap-btn" onClick={swapCities} aria-label="Swap departure and destination">⇄</button>
          <label className="field"><span>TO</span><select value={to} onChange={e => setTo(e.target.value)}><option value="DEL">Delhi (DEL)</option><option value="BOM">Mumbai (BOM)</option><option value="BLR">Bengaluru (BLR)</option></select></label>
          <label className="field date-field"><span>DEPARTURE</span><input type="date" value={date} min="2026-10-24" onChange={e => setDate(e.target.value)} required /></label>
          <label className="field passenger-field"><span>PASSENGERS</span><select value={passengers} onChange={e => setPassengers(e.target.value)}><option>1 Adult</option><option>2 Adults</option><option>3 Adults</option><option>4 Adults</option></select></label>
          <button className="search-btn" type="submit">Search flights <span>↗</span></button>
        </form>
        <p className="search-note">✦ Sample flight data for this student project. No real tickets are sold.</p>
      </section>

      <section id="results" className="results-section">
        <div className="results-heading"><div><p className="eyebrow">CURATED FLIGHT OPTIONS</p><h2>{searched ? `${from} to ${to}` : "Popular departures"}<span>.</span></h2></div><span className="result-count">{searched ? `${results.length} flights found` : "A few places to begin"}</span></div>
        <div className="flight-list">
          {(searched ? results : flights.slice(0, 3)).map(f => (
            <article className={`flight-card ${selected?.id === f.id ? "flight-selected" : ""}`} key={f.id}>
              <div className={`airline-logo ${f.tone}`}>{f.logo}</div>
              <div className="airline-name"><b>{f.airline}</b><small>{f.code}</small></div>
              <div className="time-block"><b>{f.depart}</b><small>{f.from}</small></div>
              <div className="duration"><small>{f.duration}</small><span></span><small>{f.stops}</small></div>
              <div className="time-block"><b>{f.arrive}</b><small>{f.to}</small></div>
              <div className="fare"><small>from</small><b>{money(f.price)}</b></div>
              <button className="select-btn" onClick={() => chooseFlight(f)}>{selected?.id === f.id ? "Selected ✓" : "Select flight"}</button>
            </article>
          ))}
          {searched && results.length === 0 && <div className="no-results"><b>No sample flights on this route yet.</b><p>Try Mumbai, Delhi or Bengaluru as your departure and destination.</p></div>}
        </div>
      </section>

      {selected && <section className="booking-section" id="booking-form">
        <div className="booking-card">
          <p className="eyebrow">ONE STEP CLOSER</p><h2>Review your journey<span>.</span></h2>
          <div className="booking-summary"><div><small>FLIGHT</small><b>{selected.airline} · {selected.code}</b></div><div><small>ROUTE</small><b>{selected.from} → {selected.to}</b></div><div><small>DATE</small><b>{date}</b></div><div><small>TRAVELLERS</small><b>{passengers}</b></div><div><small>DEMO FARE</small><b>{money(selected.price * Number.parseInt(passengers, 10))}</b></div></div>
          <form onSubmit={confirmBooking} className="traveller-form"><label>Passenger name<input required placeholder="Enter passenger name"/></label><label>Email address<input required type="email" placeholder="you@example.com"/></label><button className="search-btn" type="submit">Confirm demo booking ↗</button></form>
          <button className="cancel-link" onClick={() => setSelected(null)}>Cancel selection</button>
        </div>
      </section>}

      {booking && <section className="booking-section"><div className="confirmation-card"><div className="check-mark">✓</div><p className="eyebrow">BOOKING CONFIRMED · DEMO</p><h2>You're ready to fly!</h2><p>Your sample booking reference is <b>{booking.reference}</b>.</p><div className="confirmation-details"><span>{booking.flight.airline} · {booking.flight.code}</span><span>{booking.flight.from} → {booking.flight.to}</span><span>{booking.date}</span><span>{booking.passengers}</span></div><p className="disclaimer">This is a classroom demo. No ticket was issued and no payment was taken.</p><button className="search-btn" onClick={() => { setBooking(null); setSearched(false); window.scrollTo({top:0,behavior:"smooth"}); }}>Search another flight ↗</button></div></section>}

      <section id="why-skybook" className="why-section">
        <div><p className="eyebrow">THE SKYBOOK DIFFERENCE</p><h2>Travel planning,<br/><em>made lighter.</em></h2></div>
        <div className="why-grid"><article><span>✦</span><h3>Simple search</h3><p>Find sample routes with a clear, easy-to-use search form.</p></article><article><span>↗</span><h3>Clear choices</h3><p>Compare times, durations and fares in one place.</p></article><article><span>♡</span><h3>Easy review</h3><p>Check your trip details before the demo confirmation.</p></article></div>
      </section>
      <footer className="footer"><div className="brand footer-brand"><span className="brand-mark">S</span> skybook<span className="brand-dot">.</span></div><p>Thoughtful journeys start here.</p><div className="footer-bottom"><span>Student project by Rohit Borole · SE INFT-1</span><span>Demo only · No real booking or payment</span></div></footer>
    </div>
  );
}
export default App;
