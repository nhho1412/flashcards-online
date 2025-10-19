import React from "react";

export default function Footer() {
  return (
    <footer className="pt-4 my-md-5 pt-md-5 border-top text-center">
      <p className="text-muted fst-italic mb-2">
        Persistence is power.
      </p>
      <div className="mb-2">
        <a
          href="https://github.com/nhho1412/flashcards-online"
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none text-muted"
        >
          View on GitHub
        </a>
      </div>
      <small className="d-block text-muted">
        © 2025 Flashcards Online
      </small>
    </footer>
  );
}
