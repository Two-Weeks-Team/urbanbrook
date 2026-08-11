"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type StateKey = "retour" | "clair";
type FormatKey = "air" | "pulse";
type MomentKey = "arrival" | "between" | "evening";

const stateConcepts: Record<
  StateKey,
  {
    index: string;
    name: string;
    korean: string;
    line: string;
    description: string;
    notes: string[];
  }
> = {
  retour: {
    index: "01",
    name: "RETOUR",
    korean: "돌아오는 감각",
    line: "밖의 속도에서, 나의 리듬으로.",
    description:
      "공간을 떠난 뒤에도 다시 꺼내 볼 수 있는 귀환의 언어입니다. 향을 효능이 아닌, 한 순간을 여는 감각적 단서로 제안합니다.",
    notes: ["젖은 나무", "부드러운 흙", "낮은 온기의 잔향"],
  },
  clair: {
    index: "02",
    name: "CLAIR",
    korean: "맑아지는 간격",
    line: "비워진 사이에, 선명해지는 것.",
    description:
      "무언가를 더하는 대신 작은 간격을 만드는 상태 언어입니다. 밝은 공기와 가벼운 결을 통해 지금의 장면을 바라보게 합니다.",
    notes: ["이른 잎", "맑은 공기", "빛을 머금은 허브"],
  },
};

const formats: Record<
  FormatKey,
  {
    name: string;
    type: string;
    description: string;
    use: string;
    detail: string;
  }
> = {
  air: {
    name: "AIR",
    type: "공간을 위한 형식",
    description:
      "방 안에 넓게 번지는 저강도 향의 레이어. 머무는 시간 전체를 덮지 않고, 들어오고 나가는 사이를 가볍게 표시합니다.",
    use: "도착 · 환기 · 읽기",
    detail: "공간 경험 / 느린 확산 / 공유 가능한 리추얼",
  },
  pulse: {
    name: "PULSE",
    type: "순간을 위한 형식",
    description:
      "손 가까이에서 짧게 만나는 개인적 향의 포인트. 한 번의 호흡, 페이지의 전환처럼 작은 행동과 연결합니다.",
    use: "전환 · 집중 사이 · 하루의 끝",
    detail: "개인 경험 / 짧은 접점 / 휴대 가능한 리추얼",
  },
};

const moments: Record<
  MomentKey,
  {
    label: string;
    prompt: string;
    title: string;
    body: string;
    state: string;
    ritual: string[];
  }
> = {
  arrival: {
    label: "긴 이동 뒤",
    prompt: "밖의 속도를 현관에 잠시 내려두고 싶어요.",
    title: "도착을 알아차리는 3분",
    body: "오늘의 장면에는 RETOUR의 낮고 따뜻한 결을 연결해 볼 수 있어요. 향은 배경에 두고, 공간이 바뀌는 순간만 천천히 느껴보세요.",
    state: "RETOUR · AIR",
    ritual: ["창을 조금 열기", "향을 가볍게 퍼뜨리기", "세 번의 자연스러운 호흡"],
  },
  between: {
    label: "집중 사이",
    prompt: "계속 이어가기 전에 짧은 여백이 필요해요.",
    title: "다음 장면 전의 90초",
    body: "CLAIR의 밝은 결을 짧은 전환 신호로 제안합니다. 더 집중하려 애쓰기보다, 지금 하던 일을 잠깐 닫는 데 의미를 둡니다.",
    state: "CLAIR · PULSE",
    ritual: ["화면에서 시선 떼기", "손 가까이 향 두기", "다음 한 가지 적어두기"],
  },
  evening: {
    label: "하루의 끝",
    prompt: "오늘을 정리하고 조용한 저녁으로 넘어가고 싶어요.",
    title: "저녁의 경계를 만드는 5분",
    body: "RETOUR의 잔잔한 향을 하루의 마지막 동작과 연결해 볼 수 있어요. 특정한 결과보다 반복 가능한 나만의 순서를 만드는 제안입니다.",
    state: "RETOUR · PULSE",
    ritual: ["조명 한 단계 낮추기", "향을 한 번 만나기", "오늘 남길 문장 고르기"],
  },
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function ScentField({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`scent-field ${compact ? "scent-field--compact" : ""}`} aria-hidden="true">
      <div className="field-halo field-halo--one" />
      <div className="field-halo field-halo--two" />
      <div className="field-halo field-halo--three" />
      <div className="field-orbit field-orbit--one">
        <span />
      </div>
      <div className="field-orbit field-orbit--two">
        <span />
      </div>
      <div className="field-seed">
        <span>still</span>
      </div>
      <i className="field-grain field-grain--one" />
      <i className="field-grain field-grain--two" />
      <i className="field-grain field-grain--three" />
      <i className="field-grain field-grain--four" />
      <p className="field-caption">motion / stillness</p>
    </div>
  );
}

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [stateKey, setStateKey] = useState<StateKey>("retour");
  const [formatKey, setFormatKey] = useState<FormatKey>("air");
  const [momentKey, setMomentKey] = useState<MomentKey>("arrival");
  const [scenarioStarted, setScenarioStarted] = useState(false);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const state = stateConcepts[stateKey];
  const format = formats[formatKey];
  const moment = moments[momentKey];

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="SILLÉANCE 비공식 독립 콘셉트, 맨 위로">
          <span className="wordmark-mark">SL</span>
          <span className="wordmark-copy">
            <strong>SILLÉANCE</strong>
            <small>FOR URBANBROOK · CONCEPT</small>
          </span>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#origin">Origin</a>
          <a href="#system">Scent system</a>
          <a href="#persona">Persona</a>
          <a className="nav-proposal" href="#proposal">12-week proposal</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="proposal-label">
            <span>Independent concept proposal</span>
            <span>Working title · 2026</span>
          </div>
          <p className="hero-kicker">SPACE · SCENT · WELLNESS · MINDFULNESS</p>
          <h1>
            움직임은 계속되고,
            <br />
            <em>마음은 고요해지는 곳.</em>
          </h1>
          <p className="hero-lead">
            공간에서 태어난 감각적 기억을 일상의 작은 리추얼로 연결하는
            <br className="desktop-break" /> 독립적인 향 경험 콘셉트, SILLÉANCE.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href="#story">
              경험 살펴보기 <span aria-hidden="true">↓</span>
            </a>
            <a className="button button--text" href="#evidence">
              근거와 가설 구분하기 <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className="hero-disclaimer">
            본 사이트는 Two Weeks Team / AgentBa.se가 제안하는 비공식 독립 콘셉트입니다.
            Urbanbrook의 승인·제휴·출시를 의미하지 않습니다.
          </p>
        </div>
        <div className="hero-visual">
          <figure className="hero-image-frame">
            <Image
              src="/scent-flow.webp"
              width={1200}
              height={1200}
              sizes="(max-width: 760px) calc(100vw - 48px), 50vw"
              priority
              unoptimized
              alt="깊은 숲빛 공간 중앙의 고요한 세라믹 오브제 주위를 반투명한 아이보리 향의 선이 천천히 흐르는 추상 장면"
            />
            <figcaption>ORIGINAL GENERATED VISUAL · NO STOCK IMAGE</figcaption>
          </figure>
          <p className="visual-note visual-note--top">A quiet center</p>
          <p className="visual-note visual-note--bottom">in a moving field</p>
        </div>
        <div className="hero-index" aria-hidden="true">
          <span>SCROLL TO RETURN</span>
          <i />
          <span>01 / 08</span>
        </div>
      </section>

      <section className="origin section-pad" id="origin">
        <div className="section-intro">
          <p className="eyebrow">01 · ORIGIN</p>
          <h2>
            공간은 머무는 동안보다
            <br /> 떠난 뒤에 더 오래 남습니다.
          </h2>
        </div>
        <div className="origin-grid">
          <div className="origin-quote">
            <p className="quote-mark" aria-hidden="true">“</p>
            <blockquote>
              좋은 공간은 풍경만 남기지 않습니다.
              <br />
              빛의 온도, 공기의 결, 천천히 흐르던 시간이
              <br />
              다시 돌아갈 수 있는 기억이 됩니다.
            </blockquote>
            <p className="caption">THE STARTING OBSERVATION</p>
          </div>
          <div className="origin-copy">
            <p>
              이 제안은 한 가지 질문에서 시작합니다. 공간이 만든 평온한 순간을,
              체크아웃 이후의 일상에서도 다시 만날 수 있을까?
            </p>
            <p>
              SILLÉANCE는 향을 그 순간으로 돌아가는 작은 단서로 바라봅니다.
              거창한 변화가 아니라, 하루 속 장면과 장면 사이에 놓는 짧은 여백입니다.
            </p>
            <p className="small-note">
              * SILLÉANCE는 검토 중인 working title이며, 공개 상표·제품명이 아닙니다.
            </p>
          </div>
        </div>
      </section>

      <section className="story" id="story" aria-labelledby="story-title">
        <div className="section-pad story-inner">
          <div className="story-heading">
            <p className="eyebrow eyebrow--light">02 · THE RETURN LOOP</p>
            <h2 id="story-title">기억은 직선이 아니라,<br />돌아오는 흐름입니다.</h2>
            <p>
              하나의 공간이 작은 행동이 되기까지. 다섯 개의 장면을 끊김 없는
              경험으로 설계합니다.
            </p>
          </div>
          <ol className="return-loop">
            <li>
              <span className="loop-number">01</span>
              <strong>SPACE</strong>
              <p>빛과 공기, 머무름</p>
            </li>
            <li>
              <span className="loop-number">02</span>
              <strong>MOMENT</strong>
              <p>감정이 머문 장면</p>
            </li>
            <li>
              <span className="loop-number">03</span>
              <strong>SCENT</strong>
              <p>기억을 여는 단서</p>
            </li>
            <li>
              <span className="loop-number">04</span>
              <strong>MEMORY</strong>
              <p>개인의 감각적 연결</p>
            </li>
            <li>
              <span className="loop-number">05</span>
              <strong>RETURN</strong>
              <p>일상 속 작은 리추얼</p>
            </li>
          </ol>
          <p className="loop-end">space becomes a practice <span aria-hidden="true">↗</span></p>
        </div>
      </section>

      <section className="evidence section-pad" id="evidence">
        <div className="section-intro section-intro--row">
          <div>
            <p className="eyebrow">03 · EVIDENCE / HYPOTHESIS</p>
            <h2>확인된 사실과<br />검증할 아이디어 사이.</h2>
          </div>
          <p className="intro-aside">
            연구 결과는 가능성을 설명하고,
            <br />제품의 가치는 실제 경험으로 검증합니다.
          </p>
        </div>

        <div className="truth-grid">
          <article className="truth-card truth-card--evidence">
            <div className="truth-head">
              <span className="truth-type">EVIDENCE</span>
              <span className="truth-status">확인된 연구·시장 자료</span>
            </div>
            <h3>향은 기억 연구에서<br />오래 탐구된 감각 단서입니다.</h3>
            <p>
              학습과 회상 때의 향 맥락 단서를 비교한 기억 연구들이 있습니다. 이는
              특정 제품의 효과를 보장하는 근거가 아니라, 향과 기억의 관계를 탐색할
              출발점입니다.
            </p>
            <a href="https://pubmed.ncbi.nlm.nih.gov/9184489/" target="_blank" rel="noreferrer">
              Herz, 1997 <Arrow />
            </a>
          </article>
          <article className="truth-card truth-card--hypothesis">
            <div className="truth-head">
              <span className="truth-type">HYPOTHESIS</span>
              <span className="truth-status">파일럿에서 검증할 제안</span>
            </div>
            <h3>공간의 향을 일상적 행동과 연결하면<br />다시 찾고 싶은 경험이 될까?</h3>
            <p>
              SILLÉANCE의 제품 언어, 사용 순서, Persona 제안은 모두 가설입니다.
              선호도·재사용 의향·자발적 회상을 작은 파일럿에서 관찰한 뒤 다음 단계를
              결정합니다.
            </p>
            <a href="#proposal">12주 검증 구조 보기 <span aria-hidden="true">↓</span></a>
          </article>
        </div>

        <div className="market-proof">
          <div className="market-heading">
            <p className="eyebrow">MARKET SIGNALS · NOT A FORECAST</p>
            <h3>웰니스의 다음 장면은<br />감각과 공간으로 넓어지고 있습니다.</h3>
          </div>
          <div className="market-stats">
            <a
              className="stat-card"
              href="https://globalwellnessinstitute.org/wp-content/uploads/2025/11/2025-GWI-WE-Monitor_DIGITAL-FINAL.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <span className="stat-source">GWI · 2024 EST.</span>
              <strong><small>$</small>268.3<small>B</small></strong>
              <p>Mental Wellness market</p>
              <span className="stat-link">공식 보고서 <Arrow /></span>
            </a>
            <a
              className="stat-card"
              href="https://globalwellnessinstitute.org/wp-content/uploads/2025/11/2025-GWI-WE-Monitor_DIGITAL-FINAL.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <span className="stat-source">GWI · 2024 EST.</span>
              <strong><small>$</small>107<small>B</small></strong>
              <p>Senses, Spaces &amp; Sleep</p>
              <span className="stat-link">공식 보고서 <Arrow /></span>
            </a>
            <a
              className="stat-card stat-card--accent"
              href="https://pura.com/blogs/pura/pura-calm-launch-2026"
              target="_blank"
              rel="noreferrer"
            >
              <span className="stat-source">LIVE MARKET EXAMPLE · 2026</span>
              <strong className="brand-stat">PURA<br /><i>×</i> CALM</strong>
              <p>향과 오디오를 연결한 상용 컬렉션</p>
              <span className="stat-link">공식 발표 <Arrow /></span>
            </a>
          </div>
          <p className="market-caveat">
            위 수치는 시장의 방향을 살피기 위한 제3자 자료이며 Urbanbrook 또는 본 콘셉트의 매출 전망이 아닙니다.
          </p>
        </div>
      </section>

      <section className="system" id="system">
        <div className="section-pad">
          <div className="section-intro system-heading">
            <p className="eyebrow eyebrow--light">04 · SCENT LANGUAGE</p>
            <h2>두 가지 상태,<br />두 가지 만나는 방식.</h2>
            <p>
              이름은 향의 성분보다 사용자가 돌아가고 싶은 상태를 먼저 말합니다.
            </p>
          </div>

          <div className="state-selector">
            <div className="tab-list" role="tablist" aria-label="향 상태 선택">
              {(Object.keys(stateConcepts) as StateKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  id={`state-tab-${key}`}
                  aria-controls={`state-panel-${key}`}
                  aria-selected={stateKey === key}
                  tabIndex={stateKey === key ? 0 : -1}
                  onClick={() => setStateKey(key)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                      event.preventDefault();
                      const next = key === "retour" ? "clair" : "retour";
                      setStateKey(next);
                      document.getElementById(`state-tab-${next}`)?.focus();
                    }
                  }}
                >
                  <span>{stateConcepts[key].index}</span>
                  {stateConcepts[key].name}
                </button>
              ))}
            </div>
            <div
              className={`state-panel state-panel--${stateKey}`}
              role="tabpanel"
              id={`state-panel-${stateKey}`}
              aria-labelledby={`state-tab-${stateKey}`}
              key={stateKey}
            >
              <div className="state-art" aria-hidden="true">
                <div className="state-ripple" />
                <span className="state-letter">{state.name.charAt(0)}</span>
                <i className="state-dot state-dot--one" />
                <i className="state-dot state-dot--two" />
                <i className="state-dot state-dot--three" />
              </div>
              <div className="state-copy">
                <p className="state-index">STATE {state.index}</p>
                <h3>{state.name}</h3>
                <p className="state-korean">{state.korean}</p>
                <blockquote>{state.line}</blockquote>
                <p>{state.description}</p>
                <ul aria-label="제안된 향의 결">
                  {state.notes.map((note) => <li key={note}>{note}</li>)}
                </ul>
              </div>
            </div>
          </div>

          <div className="format-selector">
            <div className="format-heading">
              <p className="eyebrow eyebrow--light">FORMAT</p>
              <h3>향은 어디에<br />머물 것인가.</h3>
            </div>
            <div className="format-interaction">
              <div className="format-tabs" role="tablist" aria-label="향 형식 선택">
                {(Object.keys(formats) as FormatKey[]).map((key) => (
                  <button
                    type="button"
                    role="tab"
                    key={key}
                    id={`format-tab-${key}`}
                    aria-controls={`format-panel-${key}`}
                    aria-selected={formatKey === key}
                    tabIndex={formatKey === key ? 0 : -1}
                    onClick={() => setFormatKey(key)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                        event.preventDefault();
                        const next = key === "air" ? "pulse" : "air";
                        setFormatKey(next);
                        document.getElementById(`format-tab-${next}`)?.focus();
                      }
                    }}
                  >
                    <span>{key === "air" ? "01" : "02"}</span>
                    {formats[key].name}
                  </button>
                ))}
              </div>
              <div
                className="format-panel"
                role="tabpanel"
                id={`format-panel-${formatKey}`}
                aria-labelledby={`format-tab-${formatKey}`}
                key={formatKey}
              >
                <div>
                  <p className="format-type">{format.type}</p>
                  <h4>{format.name}</h4>
                  <p className="format-description">{format.description}</p>
                </div>
                <dl>
                  <div><dt>SCENES</dt><dd>{format.use}</dd></div>
                  <div><dt>CHARACTER</dt><dd>{format.detail}</dd></div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="persona section-pad" id="persona">
        <div className="persona-heading">
          <div>
            <p className="eyebrow">05 · PERSONA AGENT CONCEPT</p>
            <h2>향을 고르는 대신,<br />지금의 순간을 말합니다.</h2>
          </div>
          <p>
            향, 공간, 짧은 행동을 한 문장의 리추얼로 엮는 Persona 개념입니다.
            아래는 AI가 아닌 사전 작성된 규칙 기반 데모입니다.
          </p>
        </div>

        <div className="persona-shell">
          <div className="persona-sidebar">
            <div className="agent-identity">
              <span className="agent-mark">S</span>
              <div>
                <strong>SILLÉANCE</strong>
                <small>RITUAL COMPANION · CONCEPT</small>
              </div>
            </div>
            <div className="privacy-note">
              <span className="privacy-dot" aria-hidden="true" />
              <div>
                <strong>기억하지 않는 데모</strong>
                <p>선택은 이 화면 안에서만 바뀌며 서버로 전송하거나 저장하지 않습니다.</p>
              </div>
            </div>
            <dl className="persona-meta">
              <div><dt>MODE</dt><dd>Scripted</dd></div>
              <div><dt>INPUT</dt><dd>3 choices</dd></div>
              <div><dt>STORAGE</dt><dd>None</dd></div>
            </dl>
          </div>

          <div className="persona-chat">
            <div className="chat-status">
              <span><i /> A quiet check-in</span>
              <button type="button" onClick={() => setScenarioStarted(false)} disabled={!scenarioStarted}>
                다시 시작
              </button>
            </div>
            {!scenarioStarted ? (
              <div className="chat-opening">
                <p className="agent-message">
                  지금 어떤 장면에 있나요?<br />결과가 아닌, 필요한 여백을 골라보세요.
                </p>
                <div className="moment-choices" aria-label="현재 장면 선택">
                  {(Object.keys(moments) as MomentKey[]).map((key) => (
                    <button
                      type="button"
                      key={key}
                      onClick={() => {
                        setMomentKey(key);
                        setScenarioStarted(true);
                      }}
                    >
                      <span>{moments[key].label}</span>
                      <small>{moments[key].prompt}</small>
                      <i aria-hidden="true">→</i>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="chat-result" aria-live="polite">
                <div className="user-choice">
                  <span>나의 장면</span>
                  <p>{moment.prompt}</p>
                </div>
                <div className="ritual-card">
                  <div className="ritual-title">
                    <span className="agent-mini">S</span>
                    <div>
                      <small>{moment.state}</small>
                      <h3>{moment.title}</h3>
                    </div>
                  </div>
                  <p>{moment.body}</p>
                  <ol>
                    {moment.ritual.map((item, index) => (
                      <li key={item}><span>0{index + 1}</span>{item}</li>
                    ))}
                  </ol>
                  <p className="ritual-caution">
                    취향과 환경에 맞게 향의 사용량을 조절하고, 불편하면 사용을 멈춰주세요.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="persona-disclaimer">
          이 인터랙션은 제품 방향을 설명하는 콘셉트 데모이며 의료·심리적 진단이나 치료 조언을 제공하지 않습니다.
        </p>
      </section>

      <section className="proposal" id="proposal">
        <div className="section-pad proposal-inner">
          <div className="proposal-visual">
            <ScentField compact />
            <span className="proposal-week">12<br /><small>WEEKS</small></span>
          </div>
          <div className="proposal-content">
            <p className="eyebrow eyebrow--light">06 · A SMALL, TESTABLE START</p>
            <h2>큰 약속보다,<br />작게 검증하는 12주.</h2>
            <p className="proposal-lead">
              브랜드·향·디지털 경험을 한 번에 확정하지 않습니다. 동의와 안전 원칙부터
              세우고, 제한된 프로토타입으로 사용자의 반응을 관찰합니다.
            </p>
            <ol className="timeline">
              <li>
                <span>WEEK 01—02</span>
                <div><strong>언어와 경계</strong><p>공개 범위, 안전 문구, 동의와 데이터 비저장 원칙 합의</p></div>
              </li>
              <li>
                <span>WEEK 03—05</span>
                <div><strong>감각 프로토타입</strong><p>2개 상태 언어와 2개 사용 형식의 선호·이해도 탐색</p></div>
              </li>
              <li>
                <span>WEEK 06—09</span>
                <div><strong>제한적 경험</strong><p>소규모 참여자가 선택한 장면과 반복 사용 의향 관찰</p></div>
              </li>
              <li>
                <span>WEEK 10—12</span>
                <div><strong>리뷰와 판단</strong><p>정성·정량 신호를 함께 검토하고 진행·수정·중단 결정</p></div>
              </li>
            </ol>
            <div className="decision-note">
              <span>GO / ADJUST / NO-GO</span>
              <p>파일럿은 출시 약속이 아니라, 다음 판단을 위한 학습 구조입니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sources section-pad" id="sources">
        <div className="sources-heading">
          <p className="eyebrow">07 · SOURCES &amp; BOUNDARIES</p>
          <h2>열린 근거,<br />분명한 경계.</h2>
        </div>
        <div className="source-list">
          <a href="https://v.daum.net/v/20260608201233426?f=p" target="_blank" rel="noreferrer">
            <span>01</span>
            <div><strong>‘어반브룩’ 지역 대표 차별화 플랫폼…문화·비즈니스·라이프 세리머니 잇다</strong><p>광주매일신문 · 2026 · public venue context</p></div>
            <Arrow />
          </a>
          <a href="https://globalwellnessinstitute.org/wp-content/uploads/2025/11/2025-GWI-WE-Monitor_DIGITAL-FINAL.pdf" target="_blank" rel="noreferrer">
            <span>02</span>
            <div><strong>Global Wellness Economy Monitor 2025</strong><p>Global Wellness Institute · 2024 market estimates</p></div>
            <Arrow />
          </a>
          <a href="https://pubmed.ncbi.nlm.nih.gov/9184489/" target="_blank" rel="noreferrer">
            <span>03</span>
            <div><strong>The effects of cue distinctiveness on odor-based context-dependent memory</strong><p>Herz · Memory &amp; Cognition · 1997</p></div>
            <Arrow />
          </a>
          <a href="https://doi.org/10.1101/lm.053562.121" target="_blank" rel="noreferrer">
            <span>04</span>
            <div><strong>Odor-based context-dependent memory: influence of olfactory cues on declarative and nondeclarative memory indices</strong><p>Sorokowska et al. · Learning &amp; Memory · 2022</p></div>
            <Arrow />
          </a>
          <a href="https://pura.com/blogs/pura/pura-calm-launch-2026" target="_blank" rel="noreferrer">
            <span>05</span>
            <div><strong>Pura × Calm Collection announcement</strong><p>Pura · 2026 · commercial market example</p></div>
            <Arrow />
          </a>
        </div>
        <div className="boundary-grid">
          <div>
            <strong>WHAT THIS IS</strong>
            <p>공개 자료와 초기 제안서를 바탕으로 만든 독립적 사업·경험 디자인 콘셉트</p>
          </div>
          <div>
            <strong>WHAT THIS IS NOT</strong>
            <p>공식 파트너십, 확정 제품, 의학적 효능 주장, 투자 또는 매출 전망</p>
          </div>
          <div>
            <strong>VISUAL ORIGIN</strong>
            <p>이 페이지를 위해 생성한 오리지널 이미지와 CSS 비주얼을 사용하며 제3자 스톡 이미지는 사용하지 않음</p>
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="closing-field" aria-hidden="true">
          <span className="closing-ring closing-ring--one" />
          <span className="closing-ring closing-ring--two" />
          <span className="closing-ring closing-ring--three" />
          <i />
        </div>
        <div className="closing-copy">
          <p className="eyebrow eyebrow--light">08 · RETURN, GENTLY</p>
          <h2>공간이 끝난 뒤에도,<br /><em>고요는 계속될 수 있도록.</em></h2>
          <p>SILLÉANCE — a working concept for scent, memory and the spaces between.</p>
          <a className="button button--light" href="#top">처음으로 돌아가기 <span aria-hidden="true">↑</span></a>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <span className="wordmark-mark wordmark-mark--light">SL</span>
          <div><strong>SILLÉANCE</strong><small>INDEPENDENT CONCEPT STUDY</small></div>
        </div>
        <p>
          Concept proposed by Two Weeks Team / AgentBa.se.<br />
          Not affiliated with, endorsed by, or released by Urbanbrook.
        </p>
        <div className="footer-links">
          <a href="#evidence">Evidence</a>
          <a href="#sources">Sources</a>
          <span>© 2026 CONCEPT STUDY</span>
        </div>
      </footer>
    </main>
  );
}
