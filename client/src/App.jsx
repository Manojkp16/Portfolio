import { useState } from "react";
import portrait from "./assets/manoj-kp.jpeg";
import { process, profile, projects, skills } from "./data.js";

const navItems = [
  ["About", "#about"],
  ["Expertise", "#expertise"],
  ["Projects", "#projects"],
  ["Approach", "#approach"],
  ["Contact", "#contact"],
];

function ArrowIcon({ diagonal = false }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? "arrow-icon arrow-icon--diagonal" : "arrow-icon"}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label={`${profile.name}, home`}>
        {profile.initials}<span>.</span>
      </a>
      <button
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        type="button"
      >
        <span />
        <span />
      </button>
      <nav aria-label="Main navigation" className={menuOpen ? "main-nav is-open" : "main-nav"}>
        {navItems.map(([label, href]) => (
          <a href={href} key={href} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
        <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>
          Let&apos;s talk <ArrowIcon diagonal />
        </a>
      </nav>
    </header>
  );
}

function OrbitGraphic() {
  return (
    <div aria-label="Animated MERN technology orbit" className="orbit-scene" role="img">
      <div className="orbit-glow" />
      <div className="orbit orbit--outer">
        <span className="orbit-label orbit-label--react">React</span>
      </div>
      <div className="orbit orbit--middle">
        <span className="orbit-label orbit-label--node">Node.js</span>
      </div>
      <div className="orbit orbit--inner">
        <span className="orbit-label orbit-label--mongo">MongoDB</span>
      </div>
      <div className="orbit-core">
        <span>MK</span>
        <i />
      </div>
      <span className="orbit-caption">FULL STACK / BUILT WITH INTENT</span>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero section-shell" id="home">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot" /> FRONTEND TO BACKEND</p>
        <h1>
          Ideas into
          <br />
          <span className="headline-accent">experiences.</span>
        </h1>
        <p className="hero-description">
          I&apos;m <strong>{profile.name}</strong>, a {profile.role.toLowerCase()} creating
          thoughtful digital products from interface to API.
        </p>
        <div className="hero-actions">
          <a className="button button--primary" href="#contact">
            Start a conversation <ArrowIcon />
          </a>
          <a className="text-link" href="#expertise">
            Explore my work <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="hero-meta">
          <span>REACT · NODE · MONGODB</span>
          <span>BUILT END TO END</span>
        </div>
      </div>
      <OrbitGraphic />
      <a className="scroll-cue" href="#about">
        <span /> SCROLL TO EXPLORE
      </a>
      <span aria-hidden="true" className="hero-index">01 / 05</span>
    </section>
  );
}

function SectionHeading({ index, eyebrow, title, detail }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow"><span className="section-index">{index}</span>{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {detail && <p className="section-detail">{detail}</p>}
    </div>
  );
}

function About() {
  function updateAboutTilt(event) {
    if (event.pointerType === "touch") return;

    const sectionBounds = event.currentTarget.getBoundingClientRect();
    const pointerX = (event.clientX - sectionBounds.left) / sectionBounds.width;
    const pointerY = (event.clientY - sectionBounds.top) / sectionBounds.height;
    event.currentTarget.style.setProperty("--pointer-x", `${pointerX * 100}%`);
    event.currentTarget.style.setProperty("--pointer-y", `${pointerY * 100}%`);

    event.currentTarget.querySelectorAll(".about-tilt").forEach((card) => {
      const bounds = card.getBoundingClientRect();
      const horizontal = Math.max(-0.5, Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5));
      const vertical = Math.max(-0.5, Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5));

      card.style.setProperty("--tilt-x", `${vertical * -9}deg`);
      card.style.setProperty("--tilt-y", `${horizontal * 10}deg`);
    });
  }

  function resetAboutTilt(event) {
    event.currentTarget.style.removeProperty("--pointer-x");
    event.currentTarget.style.removeProperty("--pointer-y");
    event.currentTarget.querySelectorAll(".about-tilt").forEach((card) => {
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
    });
  }

  return (
    <section className="about-section section-shell section-block" id="about">
      <SectionHeading
        detail="Early in my career. Ready to learn, contribute, and grow."
        eyebrow="A LITTLE ABOUT ME"
        index="01"
        title={<>One developer.<br /><span className="muted-heading">The whole picture.</span></>}
      />
      <div
        className="about-content"
        onPointerLeave={resetAboutTilt}
        onPointerMove={updateAboutTilt}
      >
        <figure className="about-portrait about-tilt">
          <img alt={`Portrait of ${profile.name}`} src={portrait} />
          <figcaption className="portrait-caption">{profile.name}</figcaption>
        </figure>
        <p className="about-lead about-tilt">{profile.intro}</p>
        <div className="about-aside about-tilt">
          <p>{profile.about}</p>
          <div className="about-skills">
            <h3>SKILLS I&apos;M BUILDING</h3>
            <ul className="tag-list">
              {[...new Set(skills.flatMap((skill) => skill.tools))].map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }, (_, index) => (
            <span className="marquee-set" key={index}>
              BUILD WITH PURPOSE <b>✳</b> KEEP IT HUMAN <b>✳</b> STAY CURIOUS <b>✳</b>&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section className="expertise-section section-shell section-block" id="expertise">
      <SectionHeading
        detail="From the first pixel to the database."
        eyebrow="WHAT I BRING"
        index="02"
        title={<>A stack built<br />to <span className="muted-heading">work together.</span></>}
      />
      <div className="skill-grid">
        {skills.map((skill) => (
          <article className="skill-card" key={skill.number}>
            <span className="card-number">{skill.number}</span>
            <div className="skill-mark" aria-hidden="true">{skill.number === "01" ? "↗" : skill.number === "02" ? "{ }" : "◉"}</div>
            <h3>{skill.title}</h3>
            <p>{skill.description}</p>
            <ul className="tag-list">
              {skill.tools.map((tool) => <li key={tool}>{tool}</li>)}
            </ul>
          </article>
        ))}
      </div>
      <p className="stack-line">
        <span>MY EVERYDAY STACK</span>
        <strong>HTML <i>·</i> CSS <i>·</i> JavaScript <i>·</i> React <i>·</i> Node <i>·</i> Express <i>·</i> MongoDB <i>·</i> REST APIs <i>·</i> AI</strong>
      </p>
    </section>
  );
}

function ProjectPreview({ type }) {
  if (type === "calculator") {
    return (
      <div aria-hidden="true" className="project-preview project-preview--calculator">
        <div className="calculator-display">
          <span>12 + 8</span>
          <strong>20</strong>
        </div>
        <div className="calculator-keys">
          {["AC", "±", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "−", "1", "2", "3", "+", "0", ".", "="].map((key) => (
            <span className={key === "=" ? "calculator-key calculator-key--accent" : "calculator-key"} key={key}>{key}</span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="project-preview project-preview--coffee">
      <span className="coffee-halo coffee-halo--outer" />
      <span className="coffee-halo coffee-halo--inner" />
      <span className="coffee-steam coffee-steam--one" />
      <span className="coffee-steam coffee-steam--two" />
      <span className="coffee-cup"><i /></span>
      <span className="coffee-saucer" />
      <span className="coffee-preview-label">LIGHTSOFF / COFFEE</span>
    </div>
  );
}

function Projects() {
  return (
    <section className="projects-section section-shell section-block" id="projects">
      <SectionHeading
        detail="A couple of things I’ve been making."
        eyebrow="SELECTED PROJECTS"
        index="03"
        title={<>Made with<br /><span className="muted-heading">curiosity.</span></>}
      />
      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.number}>
            <ProjectPreview type={project.preview} />
            <div className="project-card-content">
              <div className="project-card-meta">
                <span>{project.category}</span>
                <span>{project.number}</span>
              </div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section className="approach-section section-shell section-block" id="approach">
      <SectionHeading
        detail="Good work comes from asking the right questions, then sweating the details."
        eyebrow="HOW I WORK"
        index="04"
        title={<>Thoughtful at<br />every <span className="muted-heading">step.</span></>}
      />
      <div className="process-list">
        {process.map((step) => (
          <article className="process-item" key={step.number}>
            <span className="process-number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            <ArrowIcon diagonal />
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "idle", message: "" });

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    if (status.type !== "idle") setStatus({ type: "idle", message: "" });
  }

  async function submitForm(event) {
    event.preventDefault();
    setStatus({ type: "loading", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Your message could not be sent. Please try again.");
      }

      setForm({ name: "", email: "", message: "" });
      setStatus({ type: "success", message: "Thanks for reaching out. Your message is on its way." });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof TypeError
          ? "Could not reach the server. Please try again later."
          : error.message,
      });
    }
  }

  return (
    <section className="contact-section section-shell section-block" id="contact">
      <div className="contact-orb" aria-hidden="true" />
      <SectionHeading
        detail="Have an idea, a question, or just want to say hello? My inbox is open."
        eyebrow="YOUR TURN"
        index="05"
        title={<>Let&apos;s make<br />something <span className="muted-heading">matter.</span></>}
      />
      <div className="contact-grid">
        <div className="contact-intro">
          <p>Tell me a little about what you&apos;re working on. I&apos;ll get back to you as soon as I can.</p>
          <span className="contact-location"><i /> HAVE A PROJECT IN MIND?</span>
        </div>
        <form className="contact-form" onSubmit={submitForm}>
          <label>
            <span>Your name</span>
            <input
              autoComplete="name"
              maxLength="100"
              name="name"
              onChange={updateField}
              placeholder="How should I call you?"
              required
              value={form.name}
            />
          </label>
          <label>
            <span>Email address</span>
            <input
              autoComplete="email"
              maxLength="254"
              name="email"
              onChange={updateField}
              placeholder="you@example.com"
              required
              type="email"
              value={form.email}
            />
          </label>
          <label>
            <span>Your message</span>
            <textarea
              maxLength="5000"
              minLength="10"
              name="message"
              onChange={updateField}
              placeholder="A few words about your idea..."
              required
              rows="4"
              value={form.message}
            />
          </label>
          <button className="button button--primary submit-button" disabled={status.type === "loading"} type="submit">
            {status.type === "loading" ? "Sending..." : "Send message"}
            {status.type !== "loading" && <ArrowIcon />}
          </button>
          <p aria-live="polite" className={`form-status form-status--${status.type}`}>
            {status.message}
          </p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer section-shell">
      <a className="wordmark" href="#home" aria-label="Back to top">{profile.initials}<span>.</span></a>
      <p>Designed &amp; built with care by {profile.name}.</p>
      <a className="back-to-top" href="#home">BACK TO TOP ↑</a>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Approach />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
