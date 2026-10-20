
import { useState, useRef } from "react";
import "./App.css";

const questions = [
  {
    question: "Do you laugh when your friend falls asleep in class?",
    yes: "Obviously 😂",
    no: "Never! 😇",
    mature: "no",
  },
  {
    question: "Have you ever laughed at a completely inappropriate moment?",
    yes: "Guilty 💀",
    no: "I'm an angel 😇",
    mature: "yes",
  },
  {
    question: "Would you press a big red button just because it says DON'T PRESS?",
    yes: "PRESS IT 🔴",
    no: "I have self-control 😎",
    mature: "yes",
  },
  {
    question: "Do you make weird sounds when you're alone?",
    yes: "We all do 💀",
    no: "Absolutely not 🤨",
    mature: "no",
  },
  {
    question: "Would you laugh if someone said '69' in class?",
    yes: "TRY NOT TO LAUGH 😭",
    no: "Very mature 😐",
    mature: "no",
  },
  {
    question: "Do you sometimes argue with objects when they don't work?",
    yes: "STUPID COMPUTER 😡",
    no: "I remain calm 😌",
    mature: "no",
  },
  {
    question: "Would you rather play games than do boring homework?",
    yes: "GAMING TIME 🎮",
    no: "Homework first 📚",
    mature: "no",
  },
  {
    question: "Have you ever made a joke that only you found funny?",
    yes: "I'M HILARIOUS 😂",
    no: "My humour is elite 😎",
    mature: "no",
  },
  {
    question: "Do you make random faces when looking in the mirror?",
    yes: "Professional face maker 🤡",
    no: "I'm sophisticated 🧐",
    mature: "no",
  },
  {
    question: "Do you think you're mature enough to pass this test?",
    yes: "Of course 😎",
    no: "I'm suspicious 🤨",
    mature: "no",
  },
];

export default function App() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [finished, setFinished] = useState(false);
  const [escaped, setEscaped] = useState(false);
  const [position, setPosition] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  const arenaRef = useRef(null);
  const question = questions[current];

  const moveButton = () => {
    const arena = arenaRef.current;
    if (!arena) return;

    const rect = arena.getBoundingClientRect();
    const buttonWidth = 160;
    const buttonHeight = 56;
    const padding = 8;

    const maxX = Math.max(padding, rect.width - buttonWidth - padding);
    const maxY = Math.max(padding, rect.height - buttonHeight - padding);

    let x = Math.random() * maxX;
    let y = Math.random() * maxY;

    if (position && rect.width > buttonWidth * 2) {
      let attempts = 0;

      while (
        Math.abs(x - position.x) < 100 &&
        Math.abs(y - position.y) < 40 &&
        attempts < 20
      ) {
        x = Math.random() * maxX;
        y = Math.random() * maxY;
        attempts++;
      }
    }

    setPosition({ x, y });
    setEscaped(true);
  };

  const handleAnswer = (answer) => {
    if (answer === question.mature) {
      moveButton();
      return;
    }

    if (current === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrent((prev) => prev + 1);
    setPosition(null);
    setEscaped(false);
  };

  const startTest = () => {
    setStarted(true);
    setCurrent(0);
    setFinished(false);
    setPosition(null);
    setEscaped(false);
  };

  const restartTest = () => {
    setStarted(false);
    setCurrent(0);
    setFinished(false);
    setPosition(null);
    setEscaped(false);
  };

  const handlePointerMove = (event) => {
    if (!started || finished || !question) return;

    const target = event.target.closest("[data-answer]");
    if (!target) return;

    if (target.dataset.answer === question.mature) {
      moveButton();
    }
  };

  return (
    <main className="app">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <nav className="navbar">
        <a className="brand" href="#" onClick={restartTest}>
          <span className="brand-icon">C</span>
          CHILDISH<span className="brand-dot">.</span>
        </a>

        <span className="nav-tag">
          <span className="status-dot" />
          EXTREMELY UNOFFICIAL
        </span>
      </nav>

      {!started && !finished && (
        <section className="intro screen">
          <div className="eyebrow">
            <span>✳</span> THE INTERNET'S LEAST TRUSTWORTHY TEST
          </div>

          <h1>
            How childish
            <br />
            <span className="gradient-text">are you, really?</span>
          </h1>

          <p className="subtitle">
            Ten questions. Two choices. Absolutely no chance of proving your
            maturity.
          </p>

          <div className="preview-card">
            <div className="preview-top">
              <span className="mini-label">YOUR MATURITY CHECK</span>
              <span className="preview-number">01 / 10</span>
            </div>

            <h2>Are you ready to prove that you're mature?</h2>

            <div className="preview-buttons">
              <span className="preview-button yes-preview">YES, obviously</span>
              <span className="preview-button no-preview">NO, not really</span>
            </div>

            <div className="preview-note">
              <span>⚠</span> Results may hurt your ego.
            </div>
          </div>

          <button className="primary-button" onClick={startTest}>
            Start the test <span>→</span>
          </button>

          <div className="intro-footer">
            <span>10 QUESTIONS</span>
            <span className="footer-separator">✦</span>
            <span>0% ACCURACY</span>
            <span className="footer-separator">✦</span>
            <span>100% NONSENSE</span>
          </div>
        </section>
      )}

      {started && !finished && (
        <section className="quiz screen">
          <div className="quiz-header">
            <div>
              <div className="eyebrow">THE MATURITY EXAM</div>
              <h1 className="quiz-title">
                Question <span>{String(current + 1).padStart(2, "0")}</span>
                <span className="question-total"> / 10</span>
              </h1>
            </div>

            <div className="question-badge">
              {current + 1} OF {questions.length}
            </div>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${((current + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className="question-card">
            <div className="question-symbol">?</div>

            <p className="question-category">BE HONEST. OR DON'T.</p>

            <h2>{question.question}</h2>

            <p className="question-hint">
              Choose wisely. One of these buttons has trust issues.
            </p>

            <div
              className={`answer-arena ${escaped ? "has-escaped" : ""}`}
              ref={arenaRef}
              onPointerOver={handlePointerMove}
            >
              {["yes", "no"].map((answer) => {
                const isMature = answer === question.mature;
                const isMoving = isMature && position !== null;

                return (
                  <button
                    key={answer}
                    data-answer={answer}
                    className={`answer-button ${answer}-button ${
                      isMoving ? "moving-button" : ""
                    }`}
                    style={
                      isMoving
                        ? {
                            position: "absolute",
                            left: position.x,
                            top: position.y,
                          }
                        : undefined
                    }
                    onPointerDown={(event) => {
                      if (isMature) {
                        event.preventDefault();
                        moveButton();
                      }
                    }}
                    onClick={() => handleAnswer(answer)}
                  >
                    <span className="answer-emoji">
                      {answer === "yes" ? "✦" : "○"}
                    </span>
                    <span>
                      {answer === "yes" ? question.yes : question.no}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="escape-message" aria-live="polite">
              {escaped
                ? "NICE TRY. THAT BUTTON WANTS NOTHING TO DO WITH YOU. 💀"
                : "PICK AN ANSWER TO CONTINUE"}
            </div>
          </div>

          <div className="quiz-footer">
            <span>CHILDISH™ PERSONALITY LAB</span>
            <span>MATURITY NOT GUARANTEED</span>
          </div>
        </section>
      )}

      {finished && (
        <section className="result screen">
          <div className="result-confetti">✳ ✦ ✧ ✳ ✧</div>

          <div className="result-label">
            <span className="status-dot" />
            OFFICIAL TEST RESULTS
          </div>

          <h1>
            YOUR CHILDISHNESS
            <br />
            <span className="gradient-text">HAS BEEN CONFIRMED.</span>
          </h1>

          <div className="score-card">
            <div className="score-ring">
              <div className="score-inner">
                <span className="score-number">100%</span>
                <span className="score-caption">CHILDISH</span>
              </div>
            </div>

            <div className="score-divider" />

            <div className="score-details">
              <span className="mini-label">MATURITY LEVEL</span>
              <h2>LEGENDARY BABY 🍼</h2>
              <p>
                You completed all 10 questions and still couldn't prove your
                maturity. That's honestly impressive.
              </p>
              <span className="final-stamp">VERDICT: ABSOLUTE MENACE</span>
            </div>
          </div>

          <p className="result-roast">
            "YOU REALLY THOUGHT YOU COULD ESCAPE?" 💀
          </p>

          <button className="primary-button" onClick={restartTest}>
            Retake the test <span>↻</span>
          </button>

          <p className="disclaimer">
            This is a joke, not an actual psychological assessment.
          </p>
        </section>
      )}

      <footer className="site-footer">
        <span>© CHILDISH™ 2026</span>
        <span>MADE FOR THE IMMATURE.</span>
      </footer>
    </main>
  );
}
