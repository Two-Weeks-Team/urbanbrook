"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type OriginKey = "life" | "culture" | "mice" | "wellness";
type MemoryConditionKey = "same" | "different" | "none";
type CountryKey = "us" | "fr";
type ScentStateKey = "retour" | "clair" | "nuit";
type ProductFormatKey = "air" | "pulse" | "peau" | "lin";
type RoadmapKey = "prototype" | "launch01" | "launch02" | "launch03" | "expansion";
type CamilleSceneKey = "complex" | "transition" | "evening";
type PilotPhaseKey = "week1" | "week4" | "week7" | "week10";

const originAxes: Record<
  OriginKey,
  {
    number: string;
    name: string;
    korean: string;
    description: string;
    examples: string[];
    bridge: string;
  }
> = {
  life: {
    number: "01",
    name: "LIFE MOMENTS",
    korean: "삶의 중요한 순간",
    description:
      "웨딩, 가족행사, 프라이빗 모임처럼 사람과 시간이 함께 기억되는 장면을 설계합니다.",
    examples: ["Wedding", "Family", "Private gathering"],
    bridge: "행사의 향을 개인의 기념일 리추얼로 이어봅니다.",
  },
  culture: {
    number: "02",
    name: "CULTURE",
    korean: "감각으로 만나는 문화",
    description:
      "전시, 클래스, 플라워, 다도처럼 보고 듣고 만지는 체험형 콘텐츠가 공간을 채웁니다.",
    examples: ["Exhibition", "Class", "Flower & tea"],
    bridge: "콘텐츠의 감각적 인상을 하나의 향 언어로 남겨봅니다.",
  },
  mice: {
    number: "03",
    name: "BUSINESS & MICE",
    korean: "목적이 있는 만남",
    description:
      "기업행사, 세미나, 론칭, 리셉션을 수용하는 유니크 베뉴 경험을 전제로 합니다.",
    examples: ["Seminar", "Launch", "Reception"],
    bridge: "브랜드의 현장 경험을 환대와 회상의 단서로 확장합니다.",
  },
  wellness: {
    number: "04",
    name: "WELLNESS",
    korean: "회복을 위한 여백",
    description:
      "향기, 미식, 문화예술을 한 공간 안에서 연결하는 웰니스 베뉴 가능성을 탐색합니다.",
    examples: ["Scent", "Food", "Arts & rest"],
    bridge: "공간의 고요를 일상에서 반복할 수 있는 작은 리추얼로 바꿔봅니다.",
  },
};

const experienceFlow = [
  { name: "SPACE", korean: "공간", detail: "빛·공기·동선" },
  { name: "MOMENT", korean: "경험", detail: "머물렀던 장면" },
  { name: "SCENT", korean: "향", detail: "감각적 단서" },
  { name: "MEMORY", korean: "기억", detail: "개인적 연결" },
  { name: "DAILY LIFE", korean: "일상", detail: "반복되는 접점" },
  { name: "PERSONA", korean: "Agent", detail: "나만의 리추얼 큐레이터" },
];

const ritualFlow = [
  { name: "VENUE", detail: "공간에서 만남" },
  { name: "RITUAL", detail: "행동과 연결" },
  { name: "SCENT", detail: "하나의 향 정체성" },
  { name: "RECALL", detail: "일상에서 재노출" },
  { name: "AGENT", detail: "다음 경험으로 연결" },
];

const memoryConditions: Record<
  MemoryConditionKey,
  {
    label: string;
    english: string;
    setup: string;
    signal: string;
    interpretation: string;
  }
> = {
  same: {
    label: "같은 향",
    english: "MATCHED SCENT",
    setup: "공간 리추얼에서 만난 향을 1-2주 뒤 일상에서 다시 만납니다.",
    signal: "향 인지 · 장면 회상 · 자발적 재사용",
    interpretation: "동일한 향의 재노출이 경험을 다시 여는 단서가 되는지 관찰합니다.",
  },
  different: {
    label: "다른 향",
    english: "MISMATCHED SCENT",
    setup: "같은 사용 형식이지만 처음 경험과 다른 향을 제공합니다.",
    signal: "향 구분 · 회상 차이 · 선호 변화",
    interpretation: "반응이 향의 정체성 때문인지, 단순한 사용 행동 때문인지 비교합니다.",
  },
  none: {
    label: "무향",
    english: "NO SCENT",
    setup: "같은 안내와 시간 구조를 유지하되 향 없이 리추얼을 진행합니다.",
    signal: "행동 효과 · 회상 기준선 · 재사용 의향",
    interpretation: "향이 없는 기준 조건을 두어 리추얼 자체의 영향을 구분합니다.",
  },
};

const marketCountries: Record<
  CountryKey,
  {
    name: string;
    spend: string;
    adjacent: string;
    adjacentLabel: string;
    language: string[];
    firstFormats: string;
    test: string;
  }
> = {
  us: {
    name: "UNITED STATES",
    spend: "$125.1B",
    adjacent: "$531M",
    adjacentLabel: "Aroma diffuser · PDF third-party estimate · validation required",
    language: ["self-care", "focus moments", "sleep routine", "portable reset"],
    firstFormats: "AIR · PULSE",
    test: "짧고 명확한 사용 장면, 휴대성, 루틴의 반복성을 중심으로 비교합니다.",
  },
  fr: {
    name: "FRANCE",
    spend: "$7.23B",
    adjacent: "$838M",
    adjacentLabel: "Home fragrance · PDF third-party estimate · validation required",
    language: ["parfum", "rituel", "bien-être", "art de vivre"],
    firstFormats: "AIR · PEAU",
    test: "향의 문화적 언어, 오브제성, 생활미학과 공간의 기원을 중심으로 비교합니다.",
  },
};

const scentStates: Record<
  ScentStateKey,
  {
    number: string;
    name: string;
    meaning: string;
    korean: string;
    texture: string;
    status: string;
  }
> = {
  retour: {
    number: "01",
    name: "RETOUR",
    meaning: "RETURN / RESET",
    korean: "밖의 속도에서 나의 리듬으로 돌아오는 상태",
    texture: "TBD · 공간과 일상에서 동일하게 인지될 Olfactory Identity를 공동 결정",
    status: "LAUNCH 01 CANDIDATE",
  },
  clair: {
    number: "02",
    name: "CLAIR",
    meaning: "CLARITY / FOCUS",
    korean: "다음 장면을 위해 짧고 맑은 간격을 만드는 상태",
    texture: "TBD · clarity / focus 상태 언어에 맞는 향 방향을 파일럿 전에 공동 결정",
    status: "LAUNCH 01 CANDIDATE",
  },
  nuit: {
    number: "03",
    name: "NUIT",
    meaning: "NIGHT / WIND-DOWN",
    korean: "하루의 속도를 낮추고 저녁의 경계를 만드는 상태",
    texture: "TBD · Launch 03 이후 night / wind-down 상태를 별도로 탐색",
    status: "LAUNCH 03 · AFTER VALIDATION",
  },
};

const productFormats: Record<
  ProductFormatKey,
  {
    name: string;
    domain: string;
    korean: string;
    products: string;
    caution: string;
  }
> = {
  air: {
    name: "AIR",
    domain: "SPACE",
    korean: "공간 전체보다 도착과 전환의 순간을 표시하는 향",
    products: "리드 디퓨저 · 룸 미스트",
    caution: "공간 크기와 환기 조건에 맞춘 저강도 사용 설계",
  },
  pulse: {
    name: "PULSE",
    domain: "CARRY",
    korean: "손 가까이에서 짧게 만나는 휴대형 향의 포인트",
    products: "휴대형 향 오브제 · 제형 검토 중",
    caution: "시제품 단계에서 규제·제조 조건과 안전성에 따라 제형 확정",
  },
  peau: {
    name: "PEAU",
    domain: "SKIN",
    korean: "몸의 작은 돌봄 행동과 향 정체성을 연결하는 형식",
    products: "핸드 · 바디 · 바디오일 후보",
    caution: "피부 제품은 별도 안전성 평가와 화장품 규제 검토 후 진행",
  },
  lin: {
    name: "LIN",
    domain: "TEXTILE",
    korean: "침구와 패브릭에 남는 낮은 강도의 생활 향 형식",
    products: "필로우 · 패브릭 미스트",
    caution: "소재 적합성·잔향·접촉 안전 기준을 별도 검증",
  },
};

const roadmap: Record<
  RoadmapKey,
  { label: string; timing: string; scope: string; gate: string }
> = {
  prototype: {
    label: "PROTOTYPE",
    timing: "FIRST 12 WEEKS",
    scope: "RETOUR 01과 CLAIR 02의 두 master scent 후보",
    gate: "향 구분도·선호·안전 조건이 파일럿 기준을 충족하는가?",
  },
  launch01: {
    label: "LAUNCH 01",
    timing: "AFTER GO DECISION",
    scope: "RETOUR / CLAIR × AIR / PULSE = 4 SKU",
    gate: "같은 향 인지와 cross-format 연결이 반복해서 나타나는가?",
  },
  launch02: {
    label: "LAUNCH 02",
    timing: "AFTER REPEAT SIGNAL",
    scope: "PEAU · LIN · refill 후보를 검증된 향부터 추가",
    gate: "재사용·리필 수요와 제품별 안전·제조 조건이 확인되는가?",
  },
  launch03: {
    label: "LAUNCH 03",
    timing: "AFTER STATE EXPANSION",
    scope: "NUIT 03 night collection 후보",
    gate: "저녁 사용 장면이 명확하고 과장 없는 언어로 전달되는가?",
  },
  expansion: {
    label: "EXPANSION",
    timing: "VALIDATED USE CASES ONLY",
    scope: "EAU · BAIN · VOYAGE · OBJECT",
    gate: "새 카테고리가 기존 기억 연결을 강화하는가, 제품 수만 늘리는가?",
  },
};

const camilleScenes: Record<
  CamilleSceneKey,
  {
    label: string;
    user: string;
    past: string;
    state: string;
    ritual: { format: string; moment: string }[];
  }
> = {
  complex: {
    label: "머리가 복잡한 오후",
    user: "오늘 머릿속에 일이 계속 겹쳐 있어요.",
    past: "가상 기록 예시: 지난주 비슷한 시간에는 RETOUR 01 · AIR 뒤 ‘공간이 바뀐 느낌’을 선택했어요.",
    state: "RETOUR 01",
    ritual: [
      { format: "AIR", moment: "창을 열고 3분간 공간 전환" },
      { format: "PULSE", moment: "이동 전에 같은 향을 짧게 확인" },
      { format: "LIN", moment: "저녁에는 패브릭 접점으로 연결" },
    ],
  },
  transition: {
    label: "일과 일 사이",
    user: "다음 일로 넘어가기 전에 짧은 간격이 필요해요.",
    past: "가상 기록 예시: 두 번의 CLAIR 02 선택에서 짧은 PULSE 형식을 더 편하게 느꼈어요.",
    state: "CLAIR 02",
    ritual: [
      { format: "PULSE", moment: "화면에서 눈을 떼고 향을 한 번 확인" },
      { format: "AIR", moment: "다음 공간의 시작을 가볍게 표시" },
      { format: "PEAU", moment: "손을 돌보는 짧은 행동으로 연결" },
    ],
  },
  evening: {
    label: "조용한 저녁 전",
    user: "오늘을 닫고 집의 시간으로 넘어가고 싶어요.",
    past: "가상 기록 예시: RETOUR 01의 낮은 향과 조명을 함께 바꾼 순서를 다시 선택했어요.",
    state: "RETOUR 01",
    ritual: [
      { format: "AIR", moment: "조명을 낮추며 공간의 경계 만들기" },
      { format: "PULSE", moment: "마지막 일정 뒤 같은 향 만나기" },
      { format: "LIN", moment: "침실의 패브릭 접점으로 마무리" },
    ],
  },
};

const pilotPhases: Record<
  PilotPhaseKey,
  {
    week: string;
    name: string;
    objective: string;
    tasks: string[];
    output: string;
  }
> = {
  week1: {
    week: "WEEK 1-3",
    name: "BRAND & SCENT",
    objective: "두 상태 언어와 Olfactory Identity의 기준을 고정합니다.",
    tasks: ["RETOUR / CLAIR 감각 방향", "Olfactory Identity 기준", "규제·상표 예비 체크"],
    output: "2 master scent briefs + public-safe language guide",
  },
  week4: {
    week: "WEEK 4-6",
    name: "PROTOTYPE",
    objective: "AIR / PULSE 후보와 비저장 Persona 흐름을 작은 범위에서 연결합니다.",
    tasks: ["AIR / PULSE 시제품", "Persona Agent scripted MVP", "세션-향-재노출 이벤트 정의"],
    output: "4 SKU candidates + testable ritual prototype",
  },
  week7: {
    week: "WEEK 7-9",
    name: "MEMORY TEST",
    objective: "같은 향·다른 향·무향 세 조건에서 기억 연결 가설을 비교합니다.",
    tasks: ["같은 향 / 다른 향 / 무향 비교", "회상·상태·반복사용 기록", "Launch 01 형식 잠금 여부 판단"],
    output: "condition comparison + format recommendation",
  },
  week10: {
    week: "WEEK 10-12",
    name: "US / FR SIGNAL",
    objective: "국가별 creator cohort에서 제품·카피 반응의 차이를 봅니다.",
    tasks: ["미국·프랑스 메시지 셀", "제품 형식별 반응 비교", "GO / ADJUST / NO-GO 리뷰"],
    output: "market signal memo + next-step decision",
  },
};

const sources = [
  {
    group: "MARKET",
    title: "Global Wellness Economy Monitor 2025",
    detail: "Mental wellness, meditation & mindfulness, senses/spaces/sleep의 2024 규모와 성장률",
    href: "https://globalwellnessinstitute.org/wp-content/uploads/2025/11/2025-GWI-WE-Monitor_DIGITAL-FINAL.pdf",
  },
  {
    group: "RESEARCH",
    title: "Herz · Memory & Cognition · 1997",
    detail: "냄새 맥락 단서의 구별성이 기억 회상에 미치는 영향을 다룬 연구",
    href: "https://pubmed.ncbi.nlm.nih.gov/9184489/",
  },
  {
    group: "RESEARCH",
    title: "Sorokowska et al. · Learning & Memory · 2022",
    detail: "냄새 맥락과 지연된 기억 회상을 다룬 연구",
    href: "https://doi.org/10.1101/lm.053562.121",
  },
  {
    group: "MARKET EXAMPLE",
    title: "Pura × Calm collection announcement · 2026",
    detail: "향과 호흡·사운드·Sleep Story를 동기화한 상용 컬렉션 사례",
    href: "https://pura.com/blogs/pura/pura-calm-launch-2026",
  },
  {
    group: "REGULATION",
    title: "U.S. FDA · Cosmetic facility registration & product listing",
    detail: "미국 화장품 시설·제품·안전 관련 MoCRA 공식 안내",
    href: "https://www.fda.gov/cosmetics/registration-listing-cosmetic-product-facilities-and-products",
  },
  {
    group: "REGULATION",
    title: "European Commission · Regulation (EC) No 1223/2009",
    detail: "EU 화장품 규정의 공식 원문과 관련 자료 진입점",
    href: "https://health.ec.europa.eu/publications/regulation-ec-no-12232009_en",
  },
  {
    group: "DATA",
    title: "European Commission · GDPR processing principles",
    detail: "개인정보 최소수집과 보유 제한을 설명하는 공식 실무 안내",
    href: "https://commission.europa.eu/law/law-topic/data-protection/rules-business-and-organisations/principles-gdpr/overview-principles/what-data-can-we-process-and-under-which-conditions_en",
  },
  {
    group: "SAFETY",
    title: "IFRA Standards · Safe use of fragrance",
    detail: "제품 카테고리별 향료 안전 사용을 위한 산업 가이드 진입점",
    href: "https://ifrafragrance.org/initiatives-positions/safe-use-fragrance-science/ifra-standards",
  },
  {
    group: "THIRD-PARTY ESTIMATE",
    title: "Grand View Research · U.S. aromatherapy diffusers",
    detail: "미국 인접 카테고리 방향을 보는 상업 시장조사. PDF 수치는 공개 페이지에서 재현되지 않아 검증 필요",
    href: "https://www.grandviewresearch.com/horizon/outlook/aromatherapy-diffusers-market/united-states",
  },
  {
    group: "THIRD-PARTY ESTIMATE",
    title: "Grand View Research · France home fragrance",
    detail: "프랑스 인접 카테고리 방향을 보는 상업 시장조사. PDF 수치는 공개 페이지에서 재현되지 않아 검증 필요",
    href: "https://www.grandviewresearch.com/horizon/outlook/home-fragrance-market/france",
  },
  {
    group: "DATA",
    title: "European Data Protection Board · Basic principles",
    detail: "목적 제한·최소수집·보유 제한·무결성 원칙의 공식 설명",
    href: "https://www.edpb.europa.eu/topics/key-gdpr-concepts/basic-principles_en",
  },
  {
    group: "PUBLIC CONTEXT",
    title: "Urbanbrook 관련 공개 보도 · 2026",
    detail: "웰니스 베뉴, 향기 콘텐츠와 프랑스 교류에 관한 공개 기사",
    href: "https://v.daum.net/v/20260608201233426?f=p",
  },
];

function DeckArrow() {
  return <span className="deck-arrow" aria-hidden="true">↗</span>;
}

function DeckSectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="deck-section-label">{children}</p>;
}

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [originKey, setOriginKey] = useState<OriginKey>("life");
  const [memoryCondition, setMemoryCondition] = useState<MemoryConditionKey>("same");
  const [countryKey, setCountryKey] = useState<CountryKey>("us");
  const [scentStateKey, setScentStateKey] = useState<ScentStateKey>("retour");
  const [productFormatKey, setProductFormatKey] = useState<ProductFormatKey>("air");
  const [roadmapKey, setRoadmapKey] = useState<RoadmapKey>("prototype");
  const [camilleSceneKey, setCamilleSceneKey] = useState<CamilleSceneKey>("complex");
  const [camilleStep, setCamilleStep] = useState(0);
  const [memoryOpen, setMemoryOpen] = useState(false);
  const [virtualMemory, setVirtualMemory] = useState(true);
  const [memoryMode, setMemoryMode] = useState<"session" | "off">("session");
  const [pilotPhaseKey, setPilotPhaseKey] = useState<PilotPhaseKey>("week1");
  const [pilotCondition, setPilotCondition] = useState<MemoryConditionKey>("same");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const origin = originAxes[originKey];
  const selectedCondition = memoryConditions[memoryCondition];
  const country = marketCountries[countryKey];
  const scentState = scentStates[scentStateKey];
  const productFormat = productFormats[productFormatKey];
  const roadmapStep = roadmap[roadmapKey];
  const camille = camilleScenes[camilleSceneKey];
  const pilotPhase = pilotPhases[pilotPhaseKey];

  return (
    <main className="deck-root">
      <div className="deck-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>

      <header className="deck-header">
        <a className="deck-wordmark" href="#deck-top" aria-label="Urbanbrook 비공식 독립 콘셉트, 맨 위로">
          <span className="deck-wordmark-mark">UB</span>
          <span className="deck-wordmark-copy">
            <strong>URBANBROOK CONCEPT</strong>
            <small>INDEPENDENT · NOT AN OFFICIAL PARTNERSHIP</small>
          </span>
        </a>
        <nav className="deck-nav" aria-label="주요 섹션">
          <a href="#deck-origin">Origin</a>
          <a href="#deck-memory">Scent memory</a>
          <a href="#deck-product">Product</a>
          <a href="#deck-persona">Persona</a>
          <a className="deck-nav-cta" href="#deck-pilot">12 weeks</a>
        </nav>
      </header>

      <section className="deck-hero" id="deck-top" aria-labelledby="deck-hero-title">
        <figure className="deck-hero-desktop-art">
          <Image
            src="/hero-wide.webp"
            width={1731}
            height={909}
            sizes="100vw"
            priority
            unoptimized
            alt="독립 콘셉트 제안. 숲빛 공간과 고요한 돌, 흐르는 향의 선 위에 ‘공간에서 만든 기억을, 일상으로.’라는 제목이 놓인 전체 가로 비주얼"
          />
        </figure>
        <div className="deck-hero-mobile-art">
          <Image
            src="/scent-flow.webp"
            width={1200}
            height={1200}
            sizes="100vw"
            unoptimized
            alt="숲빛 공간 중앙의 고요한 세라믹 오브제 주위를 반투명한 향의 선이 흐르는 추상 장면"
          />
        </div>
        <div className="deck-hero-mobile-copy">
          <DeckSectionLabel>INDEPENDENT CONCEPT PROPOSAL</DeckSectionLabel>
          <h1 id="deck-hero-title">공간에서 만든 기억을,<br /><em>일상으로.</em></h1>
          <p>
            공간의 복합문화 경험을 향과 Persona Agent 기반 전담 큐레이터로 이어,
            웰니스의 일상적 리추얼로 확장하는 독립 제안입니다.
          </p>
        </div>
        <div className="deck-hero-notice">
          <strong>PUBLIC CONCEPT · WORKING TITLE</strong>
          <p>
            Two Weeks Team / AgentBa.se의 비공식 독립 제안이며 Urbanbrook의 승인·제휴·출시를 의미하지 않습니다.
            SILLÉANCE와 모든 제품명은 검토 중인 가칭입니다.
          </p>
          <a href="#deck-origin">본편 탐색 <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="deck-section deck-origin" id="deck-origin">
        <div className="deck-section-heading deck-section-heading--split">
          <div>
            <DeckSectionLabel>01 / ORIGIN</DeckSectionLabel>
            <h2>어반브룩은 이미<br />‘경험’을 만드는 공간입니다.</h2>
          </div>
          <p>
            이 제안의 출발점은 “향 회사로의 전환”이 아닙니다. 공간에서 이미 만들어지는
            좋은 순간을 감각적으로 기억하고, 집·업무·저녁·여행의 접점으로 연결하는 일입니다.
          </p>
        </div>

        <div className="deck-origin-explorer">
          <div className="deck-origin-tabs" role="tablist" aria-label="공간 경험의 네 축">
            {(Object.keys(originAxes) as OriginKey[]).map((key) => (
              <button
                type="button"
                role="tab"
                id={`deck-origin-tab-${key}`}
                aria-controls={`deck-origin-panel-${key}`}
                aria-selected={originKey === key}
                tabIndex={originKey === key ? 0 : -1}
                key={key}
                onClick={() => setOriginKey(key)}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                  event.preventDefault();
                  const keys = Object.keys(originAxes) as OriginKey[];
                  const index = keys.indexOf(key);
                  const nextIndex = event.key === "ArrowRight"
                    ? (index + 1) % keys.length
                    : (index - 1 + keys.length) % keys.length;
                  const next = keys[nextIndex];
                  setOriginKey(next);
                  document.getElementById(`deck-origin-tab-${next}`)?.focus();
                }}
              >
                <span>{originAxes[key].number}</span>
                <strong>{originAxes[key].name}</strong>
                <small>{originAxes[key].korean}</small>
              </button>
            ))}
          </div>
          <article
            className={`deck-origin-panel deck-origin-panel--${originKey}`}
            role="tabpanel"
            id={`deck-origin-panel-${originKey}`}
            aria-labelledby={`deck-origin-tab-${originKey}`}
            key={originKey}
          >
            <div className="deck-origin-panel-index" aria-hidden="true">{origin.number}</div>
            <div className="deck-origin-panel-copy">
              <p className="deck-origin-panel-label">{origin.name}</p>
              <h3>{origin.korean}</h3>
              <p>{origin.description}</p>
              <ul>
                {origin.examples.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <aside className="deck-origin-bridge">
              <span>SCENT MEMORY BRIDGE</span>
              <p>{origin.bridge}</p>
            </aside>
          </article>
        </div>

        <div className="deck-experience-flow" aria-labelledby="deck-experience-flow-title">
          <div className="deck-flow-intro">
            <p id="deck-experience-flow-title">EXPERIENCE EXTENSION</p>
            <strong>공간의 경험이 나만의 리추얼 큐레이터로 이어지는 여섯 단계</strong>
          </div>
          <ol className="deck-flow-list deck-flow-list--six">
            {experienceFlow.map((step, index) => (
              <li key={step.name}>
                <span>0{index + 1}</span>
                <strong>{step.name}</strong>
                <small>{step.korean}</small>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>
          <p className="deck-flow-thesis">
            SPACE → MOMENT → SCENT → MEMORY → DAILY LIFE → PERSONA
          </p>
        </div>
      </section>

      <section className="deck-section deck-proposal-flow" id="deck-proposal-flow">
        <div className="deck-section-heading deck-section-heading--split deck-section-heading--light">
          <div>
            <DeckSectionLabel>02 / THE PROPOSAL</DeckSectionLabel>
            <h2>공간을 바꾸는 것이 아니라,<br />경험을 연장합니다.</h2>
          </div>
          <div className="deck-proposal-flow-quote">
            <p>From venue to ritual.<br />From ritual to memory.</p>
            <strong>One scent. Many returns.</strong>
          </div>
        </div>
        <ol className="deck-ritual-flow">
          {ritualFlow.map((step, index) => (
            <li key={step.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step.name}</strong>
              <p>{step.detail}</p>
            </li>
          ))}
        </ol>
        <div className="deck-proposal-core">
          <span>THE CORE</span>
          <p>향을 파는 것이 아니라 <strong>“돌아가는 방법”</strong>을 만듭니다.</p>
        </div>
      </section>

      <section className="deck-section deck-memory" id="deck-memory">
        <div className="deck-section-heading deck-section-heading--split">
          <div>
            <DeckSectionLabel>03 / SCENT MEMORY</DeckSectionLabel>
            <h2>향은 기억의 답이 아니라,<br />탐색할 수 있는 단서입니다.</h2>
          </div>
          <p>
            연구가 설명하는 가능성과 제품이 직접 검증해야 하는 가설을 분리합니다.
            특정 향이 명상 상태나 건강 결과를 만든다고 주장하지 않습니다.
          </p>
        </div>

        <ol className="deck-memory-mechanism">
          <li><span>01</span><strong>RITUAL</strong><p>향과 함께 특정한 행동을 경험</p></li>
          <li><span>02</span><strong>ENCODING</strong><p>향과 장면의 맥락이 함께 기억됨</p></li>
          <li><span>03</span><strong>RE-EXPOSURE</strong><p>일상에서 향 또는 조건을 다시 만남</p></li>
          <li><span>04</span><strong>RECALL</strong><p>이전 경험의 자발적 회상 여부를 관찰</p></li>
        </ol>

        <div className="deck-evidence-hypothesis">
          <article className="deck-evidence-card">
            <span>EVIDENCE</span>
            <h3>냄새 맥락과 기억의 관계는<br />학술 연구의 대상입니다.</h3>
            <p>
              냄새 맥락 단서의 구별성이 회상에 미치는 영향과, 냄새 맥락이 선언적·비선언적
              기억 지표에 미치는 영향을 살핀 연구가 있습니다. 이는 제품 효능의 보증이 아닙니다.
            </p>
            <div className="deck-evidence-links">
              <a href="https://pubmed.ncbi.nlm.nih.gov/9184489/" target="_blank" rel="noreferrer">Herz · 1997 <DeckArrow /></a>
              <a href="https://doi.org/10.1101/lm.053562.121" target="_blank" rel="noreferrer">Sorokowska et al. · 2022 <DeckArrow /></a>
            </div>
          </article>
          <article className="deck-hypothesis-card">
            <span>PRODUCT HYPOTHESIS</span>
            <h3>같은 향을 다시 만날 때<br />공간의 기억도 더 잘 돌아올까?</h3>
            <p>
              같은 향·다른 향·무향을 비교해 향의 일치, 리추얼 자체, 새로움의 영향을 구분합니다.
              회상·선호·반복사용을 관찰하며 과장된 인과를 주장하지 않습니다.
            </p>
          </article>
        </div>

        <div className="deck-condition-explorer">
          <div className="deck-condition-heading">
            <DeckSectionLabel>THREE-CONDITION TEST</DeckSectionLabel>
            <h3>조건을 바꿔 가설을 살펴보세요.</h3>
          </div>
          <div className="deck-condition-tabs" role="tablist" aria-label="향 기억 테스트 조건">
            {(Object.keys(memoryConditions) as MemoryConditionKey[]).map((key) => (
              <button
                type="button"
                role="tab"
                id={`deck-condition-tab-${key}`}
                aria-controls={`deck-condition-panel-${key}`}
                aria-selected={memoryCondition === key}
                tabIndex={memoryCondition === key ? 0 : -1}
                key={key}
                onClick={() => setMemoryCondition(key)}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                  event.preventDefault();
                  const keys = Object.keys(memoryConditions) as MemoryConditionKey[];
                  const index = keys.indexOf(key);
                  const nextIndex = event.key === "ArrowRight"
                    ? (index + 1) % keys.length
                    : (index - 1 + keys.length) % keys.length;
                  const next = keys[nextIndex];
                  setMemoryCondition(next);
                  document.getElementById(`deck-condition-tab-${next}`)?.focus();
                }}
              >
                <span>{memoryConditions[key].english}</span>
                {memoryConditions[key].label}
              </button>
            ))}
          </div>
          <article
            className={`deck-condition-panel deck-condition-panel--${memoryCondition}`}
            role="tabpanel"
            id={`deck-condition-panel-${memoryCondition}`}
            aria-labelledby={`deck-condition-tab-${memoryCondition}`}
            key={memoryCondition}
          >
            <div className="deck-condition-orbit" aria-hidden="true">
              <span>RITUAL</span><i /><span>1-2 WEEKS</span><i /><span>RECALL</span>
            </div>
            <div className="deck-condition-copy">
              <p>{selectedCondition.english}</p>
              <h4>{selectedCondition.label}</h4>
              <dl>
                <div><dt>SETUP</dt><dd>{selectedCondition.setup}</dd></div>
                <div><dt>OBSERVE</dt><dd>{selectedCondition.signal}</dd></div>
                <div><dt>READ</dt><dd>{selectedCondition.interpretation}</dd></div>
              </dl>
            </div>
          </article>
        </div>
      </section>

      <section className="deck-section deck-market" id="deck-market">
        <div className="deck-section-heading deck-section-heading--split">
          <div>
            <DeckSectionLabel>04 / WHY THIS MARKET</DeckSectionLabel>
            <h2>명상은 고립된 앱 시장이 아니라,<br />Mental Wellness의 성장 축입니다.</h2>
          </div>
          <p>
            향·공간·수면 환경과 명상·마음챙김은 각각 소비시장을 형성하고 있습니다.
            아래 수치는 방향을 읽기 위한 제3자 자료이며 사업 매출 전망이 아닙니다.
          </p>
        </div>

        <div className="deck-market-metrics">
          <a href="https://globalwellnessinstitute.org/wp-content/uploads/2025/11/2025-GWI-WE-Monitor_DIGITAL-FINAL.pdf" target="_blank" rel="noreferrer" className="deck-market-metric deck-market-metric--primary">
            <span>GLOBAL MENTAL WELLNESS · 2024</span>
            <strong>$268.3B</strong>
            <p>2029 forecast <b>$434.6B</b></p>
            <DeckArrow />
          </a>
          <a href="https://globalwellnessinstitute.org/wp-content/uploads/2025/11/2025-GWI-WE-Monitor_DIGITAL-FINAL.pdf" target="_blank" rel="noreferrer" className="deck-market-metric">
            <span>MEDITATION &amp; MINDFULNESS · 2024</span>
            <strong>$7.1B</strong>
            <p>2019-2024 CAGR <b>18.9%</b></p>
            <DeckArrow />
          </a>
          <a href="https://globalwellnessinstitute.org/wp-content/uploads/2025/11/2025-GWI-WE-Monitor_DIGITAL-FINAL.pdf" target="_blank" rel="noreferrer" className="deck-market-metric">
            <span>SENSES · SPACES · SLEEP · 2024</span>
            <strong>$107B</strong>
            <p>2019-2024 CAGR <b>12.5%</b></p>
            <DeckArrow />
          </a>
        </div>

        <div className="deck-market-bridge" aria-label="시장 카테고리 연결 가설">
          <span>MEDITATION</span><i /><span>SCENT &amp; SPACE</span><i /><strong>SILLÉANCE</strong>
          <p>Scent × Ritual × Memory</p>
        </div>

        <div className="deck-market-proof">
          <article className="deck-pura-card">
            <span>LIVE MARKET EXAMPLE · 2026</span>
            <h3>Pura <i>×</i> Calm</h3>
            <p>
              향과 호흡·사운드·Sleep Story를 동기화한 컬렉션이 출시됐습니다.
              “향 + 디지털 웰니스”가 연결된 상품 경험으로 등장한 시장 신호입니다.
            </p>
            <a href="https://pura.com/blogs/pura/pura-calm-launch-2026" target="_blank" rel="noreferrer">공식 발표 보기 <DeckArrow /></a>
          </article>

          <div className="deck-country-explorer">
            <div className="deck-country-tabs" role="tablist" aria-label="국가별 시장 메시지 비교">
              {(Object.keys(marketCountries) as CountryKey[]).map((key) => (
                <button
                  type="button"
                  role="tab"
                  id={`deck-country-tab-${key}`}
                  aria-controls={`deck-country-panel-${key}`}
                  aria-selected={countryKey === key}
                  tabIndex={countryKey === key ? 0 : -1}
                  key={key}
                  onClick={() => setCountryKey(key)}
                  onKeyDown={(event) => {
                    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                    event.preventDefault();
                    const keys = Object.keys(marketCountries) as CountryKey[];
                    const index = keys.indexOf(key);
                    const nextIndex = event.key === "ArrowRight"
                      ? (index + 1) % keys.length
                      : (index - 1 + keys.length) % keys.length;
                    const next = keys[nextIndex];
                    setCountryKey(next);
                    document.getElementById(`deck-country-tab-${next}`)?.focus();
                  }}
                >
                  {marketCountries[key].name}
                  <span>{marketCountries[key].spend}</span>
                </button>
              ))}
            </div>
            <article
              className="deck-country-panel"
              role="tabpanel"
              id={`deck-country-panel-${countryKey}`}
              aria-labelledby={`deck-country-tab-${countryKey}`}
              key={countryKey}
            >
              <div className="deck-country-numbers">
                <p><span>2024 MENTAL WELLNESS SPEND</span><strong>{country.spend}</strong></p>
                <p><span>{country.adjacentLabel}</span><strong>{country.adjacent}</strong></p>
              </div>
              <div className="deck-country-language">
                <span>MESSAGE LANGUAGE</span>
                <ul>{country.language.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <dl className="deck-country-plan">
                <div><dt>FIRST FORMATS</dt><dd>{country.firstFormats}</dd></div>
                <div><dt>WHAT TO TEST</dt><dd>{country.test}</dd></div>
              </dl>
            </article>
          </div>
        </div>
        <p className="deck-market-caveat">
          미국·프랑스 인접 시장 수치는 Grand View Research 등 제3자 추정치로 카테고리 정의가 다르며,
          GWI 지표와 합산할 수 없습니다. SocialSeed.ing을 통한 국가별 creator cohort 비교는 제안 단계입니다.
        </p>
      </section>

      <section className="deck-section deck-brand" id="deck-brand">
        <div className="deck-brand-origin">
          <DeckSectionLabel>05 / WORKING BRAND</DeckSectionLabel>
          <p className="deck-brand-status">WORKING TITLE · TRADEMARK CLEARANCE REQUIRED</p>
          <h2>SILLÉANCE</h2>
          <p className="deck-brand-line">A scent to return to.</p>
          <div className="deck-name-roots">
            <div><strong>SILLAGE</strong><span>향이 지나간 뒤의 흔적</span></div>
            <i aria-hidden="true">+</i>
            <div><strong>SILENCE</strong><span>움직임 안의 고요</span></div>
            <i aria-hidden="true">+</i>
            <div><strong>RÉMANENCE</strong><span>사라진 뒤에도 남는 것</span></div>
          </div>
          <p className="deck-brand-note">
            프랑스어 어근에서 영감을 받은 조어 제안입니다. 미국·EU·프랑스의 전문 상표 clearance 전에는
            브랜드 사용 가능성을 보증하지 않습니다.
          </p>
        </div>

        <div className="deck-state-list" aria-label="제안된 세 가지 상태 언어">
          {(Object.keys(scentStates) as ScentStateKey[]).map((key) => (
            <button
              type="button"
              key={key}
              aria-pressed={scentStateKey === key}
              onClick={() => setScentStateKey(key)}
            >
              <span>{scentStates[key].number}</span>
              <strong>{scentStates[key].name}</strong>
              <small>{scentStates[key].meaning}</small>
              <i>{scentStates[key].status}</i>
            </button>
          ))}
        </div>
      </section>

      <section className="deck-section deck-product" id="deck-product">
        <div className="deck-section-heading deck-section-heading--split deck-section-heading--light">
          <div>
            <DeckSectionLabel>06 / PRODUCT SYSTEM</DeckSectionLabel>
            <h2>핸드크림 하나가 아니라,<br />하루의 접점을 설계합니다.</h2>
          </div>
          <p>
            같은 향 정체성을 공간·휴대·피부·직물에서 다시 만납니다.
            초기에는 연소형 향 없이 시작하고, 검증된 향과 사용 장면부터 넓힙니다.
          </p>
        </div>

        <div className="deck-product-explorer">
          <div className="deck-product-controls">
            <fieldset className="deck-product-fieldset">
              <legend>STATE · 어떤 상태로 돌아갈 것인가</legend>
              <div className="deck-product-state-buttons">
                {(Object.keys(scentStates) as ScentStateKey[]).map((key) => (
                  <button
                    type="button"
                    key={key}
                    aria-pressed={scentStateKey === key}
                    onClick={() => setScentStateKey(key)}
                  >
                    <span>{scentStates[key].number}</span>
                    {scentStates[key].name}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset className="deck-product-fieldset">
              <legend>FORMAT · 어디에서 다시 만날 것인가</legend>
              <div className="deck-product-format-buttons">
                {(Object.keys(productFormats) as ProductFormatKey[]).map((key) => (
                  <button
                    type="button"
                    key={key}
                    aria-pressed={productFormatKey === key}
                    onClick={() => setProductFormatKey(key)}
                  >
                    <strong>{productFormats[key].name}</strong>
                    <span>{productFormats[key].domain}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <article className={`deck-product-result deck-product-result--${scentStateKey}`} aria-live="polite">
            <div className="deck-product-result-code">
              <span>{scentState.number}</span>
              <strong>{scentState.name}</strong>
              <i>×</i>
              <strong>{productFormat.name}</strong>
            </div>
            <div className="deck-product-result-copy">
              <p className="deck-product-result-status">{scentState.status} · {productFormat.domain}</p>
              <h3>{scentState.korean}</h3>
              <p>{productFormat.korean}</p>
              <dl>
                <div><dt>SCENT DIRECTION</dt><dd>{scentState.texture}</dd></div>
                <div><dt>FORMAT CANDIDATES</dt><dd>{productFormat.products}</dd></div>
                <div><dt>SAFETY / DEVELOPMENT</dt><dd>{productFormat.caution}</dd></div>
              </dl>
            </div>
          </article>
        </div>

        <div className="deck-launch-skus">
          <div className="deck-launch-skus-heading">
            <DeckSectionLabel>LAUNCH 01 · 4 SKU</DeckSectionLabel>
            <h3>필수만 먼저.<br />팔린 뒤 넓힙니다.</h3>
          </div>
          <div className="deck-sku-grid">
            {[
              ["RETOUR 01", "AIR", "SPACE"],
              ["RETOUR 01", "PULSE", "CARRY"],
              ["CLAIR 02", "AIR", "SPACE"],
              ["CLAIR 02", "PULSE", "CARRY"],
            ].map(([state, format, domain]) => (
              <article className="deck-sku-card" key={`${state}-${format}`}>
                <span>{domain}</span>
                <strong>{state}</strong>
                <p>{format}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="deck-roadmap">
          <div className="deck-roadmap-tabs" role="tablist" aria-label="제품 출시 로드맵">
            {(Object.keys(roadmap) as RoadmapKey[]).map((key) => (
              <button
                type="button"
                role="tab"
                id={`deck-roadmap-tab-${key}`}
                aria-controls={`deck-roadmap-panel-${key}`}
                aria-selected={roadmapKey === key}
                tabIndex={roadmapKey === key ? 0 : -1}
                key={key}
                onClick={() => setRoadmapKey(key)}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                  event.preventDefault();
                  const keys = Object.keys(roadmap) as RoadmapKey[];
                  const index = keys.indexOf(key);
                  const nextIndex = event.key === "ArrowRight"
                    ? (index + 1) % keys.length
                    : (index - 1 + keys.length) % keys.length;
                  const next = keys[nextIndex];
                  setRoadmapKey(next);
                  document.getElementById(`deck-roadmap-tab-${next}`)?.focus();
                }}
              >
                <span>{String((Object.keys(roadmap) as RoadmapKey[]).indexOf(key) + 1).padStart(2, "0")}</span>
                {roadmap[key].label}
              </button>
            ))}
          </div>
          <article
            className="deck-roadmap-panel"
            role="tabpanel"
            id={`deck-roadmap-panel-${roadmapKey}`}
            aria-labelledby={`deck-roadmap-tab-${roadmapKey}`}
            key={roadmapKey}
          >
            <p>{roadmapStep.timing}</p>
            <h3>{roadmapStep.label}</h3>
            <strong>{roadmapStep.scope}</strong>
            <div><span>DECISION GATE</span><p>{roadmapStep.gate}</p></div>
          </article>
        </div>
      </section>

      <section className="deck-section deck-persona" id="deck-persona">
        <div className="deck-section-heading deck-section-heading--split">
          <div>
            <DeckSectionLabel>07 / PERSONA AGENT</DeckSectionLabel>
            <h2>개인화의 핵심은 추천이 아니라,<br />나만의 “리추얼 큐레이터”입니다.</h2>
          </div>
          <p>
            미술관의 큐레이터가 작품 사이의 맥락을 만들듯, Camille은 사용자가 허용한 반응만 바탕으로
            향·상태·사용 형식을 연결하는 가상의 전담 큐레이터입니다. 아래 흐름은 사전 작성된 로컬 데모이며,
            선택과 가상 메모리는 이 브라우저 화면 밖으로 전송되거나 저장되지 않습니다.
          </p>
        </div>

        <div className="deck-camille-shell">
          <aside className="deck-camille-sidebar">
            <div className="deck-camille-profile">
              <span>C</span>
              <div><strong>Camille</strong><small>YOUR PERSONAL RITUAL CURATOR · CONCEPT</small></div>
            </div>
            <ol className="deck-camille-steps" aria-label="Persona 데모 단계">
              <li aria-current={camilleStep === 0 ? "step" : undefined}><span>01</span>상태를 묻습니다</li>
              <li aria-current={camilleStep === 1 ? "step" : undefined}><span>02</span>과거 반응 예시를 봅니다</li>
              <li aria-current={camilleStep === 2 ? "step" : undefined}><span>03</span>제품을 리추얼로 연결합니다</li>
            </ol>
            <div className="deck-camille-privacy">
              <i aria-hidden="true" />
              <div><strong>LOCAL-ONLY DEMO</strong><p>서버 전송 없음 · 영구 저장 없음</p></div>
            </div>
          </aside>

          <div className="deck-camille-chat">
            <div className="deck-camille-toolbar">
              <span><i /> CAMILLE · SCRIPTED</span>
              <div>
                <button type="button" onClick={() => setMemoryOpen((open) => !open)} aria-expanded={memoryOpen} aria-controls="deck-memory-drawer">
                  가상 Memory {memoryOpen ? "닫기" : "보기"}
                </button>
                <button type="button" onClick={() => setCamilleStep(0)}>처음부터</button>
              </div>
            </div>

            {memoryOpen && (
              <aside className="deck-memory-drawer" id="deck-memory-drawer" aria-label="가상 Agent Memory 설정">
                <div className="deck-memory-drawer-heading">
                  <div><span>VIRTUAL MEMORY CONTROL</span><strong>사용자가 확인하고 결정합니다.</strong></div>
                  <button type="button" onClick={() => setMemoryOpen(false)} aria-label="가상 Memory 패널 닫기">×</button>
                </div>
                <div className="deck-memory-mode" role="group" aria-label="가상 Memory 모드">
                  <button type="button" aria-pressed={memoryMode === "session"} onClick={() => setMemoryMode("session")}>이 세션에서만</button>
                  <button type="button" aria-pressed={memoryMode === "off"} onClick={() => setMemoryMode("off")}>기억하지 않음</button>
                </div>
                {virtualMemory && memoryMode === "session" ? (
                  <div className="deck-memory-record">
                    <span>EXAMPLE RECORD · NOT SAVED</span>
                    <p>{camille.past}</p>
                    <button type="button" onClick={() => setVirtualMemory(false)}>가상 기록 삭제</button>
                  </div>
                ) : (
                  <div className="deck-memory-empty">
                    <p>현재 이 데모가 참조하는 가상 기록이 없습니다.</p>
                    <button type="button" onClick={() => { setVirtualMemory(true); setMemoryMode("session"); }}>예시 기록 다시 만들기</button>
                  </div>
                )}
              </aside>
            )}

            <div className="deck-camille-stage" aria-live="polite">
              {camilleStep === 0 && (
                <div className="deck-camille-question">
                  <p className="deck-camille-message">지금 어떤 상태에 가까운가요?</p>
                  <p className="deck-camille-submessage">제품보다 현재 장면에서 시작합니다.</p>
                  <div className="deck-camille-choices">
                    {(Object.keys(camilleScenes) as CamilleSceneKey[]).map((key) => (
                      <button
                        type="button"
                        key={key}
                        onClick={() => { setCamilleSceneKey(key); setCamilleStep(1); }}
                      >
                        <strong>{camilleScenes[key].label}</strong>
                        <span>{camilleScenes[key].user}</span>
                        <i aria-hidden="true">→</i>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {camilleStep === 1 && (
                <div className="deck-camille-history">
                  <div className="deck-camille-user-message"><span>YOU · NOW</span><p>{camille.user}</p></div>
                  <div className="deck-camille-response">
                    <span>CAMILLE · VIRTUAL EXAMPLE</span>
                    <h3>과거의 반응을 정답이 아닌 맥락으로 봅니다.</h3>
                    {virtualMemory && memoryMode === "session" ? (
                      <p>{camille.past}</p>
                    ) : (
                      <p>참조할 기록이 없어 지금 선택한 장면만으로 시작합니다.</p>
                    )}
                    <button type="button" onClick={() => setCamilleStep(2)}>cross-format 리추얼 만들기 <span aria-hidden="true">→</span></button>
                  </div>
                </div>
              )}

              {camilleStep === 2 && (
                <div className="deck-camille-ritual">
                  <div className="deck-camille-ritual-heading">
                    <span>ONE IDENTITY · THREE TOUCHPOINTS</span>
                    <h3>{camille.state} cross-format ritual</h3>
                    <p>상황이 바뀌어도 같은 향의 정체성을 이어가는 제안입니다.</p>
                  </div>
                  <ol>
                    {camille.ritual.map((step, index) => (
                      <li key={`${step.format}-${step.moment}`}>
                        <span>0{index + 1}</span>
                        <strong>{step.format}</strong>
                        <p>{step.moment}</p>
                      </li>
                    ))}
                  </ol>
                  <div className="deck-camille-ritual-actions">
                    <button type="button" onClick={() => setMemoryOpen(true)}>가상 Memory 제어하기</button>
                    <button type="button" onClick={() => setCamilleStep(0)}>다른 상태 선택</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="deck-persona-disclaimer">
          의료·심리적 진단, 치료, 수면 개선 또는 집중력 향상을 보장하지 않습니다. 실제 Agent 도입 시 명시적 동의,
          최소수집, 확인·삭제, 보유기간 설정이 선행되어야 합니다.
        </p>
      </section>

      <section className="deck-section deck-pilot" id="deck-pilot">
        <div className="deck-section-heading deck-section-heading--split deck-section-heading--light">
          <div>
            <DeckSectionLabel>08 / FIRST 12 WEEKS</DeckSectionLabel>
            <h2>12주는 대량 출시가 아니라,<br />출시할 이유를 만드는 기간입니다.</h2>
          </div>
          <p>
            향·제품·Persona 개념·해외시장 반응을 함께 확인하고, 상업 출시의
            GO / ADJUST / NO-GO를 결정하는 제안입니다.
          </p>
        </div>

        <div className="deck-pilot-explorer">
          <div className="deck-pilot-tabs" role="tablist" aria-label="12주 파일럿 단계">
            {(Object.keys(pilotPhases) as PilotPhaseKey[]).map((key) => (
              <button
                type="button"
                role="tab"
                id={`deck-pilot-tab-${key}`}
                aria-controls={`deck-pilot-panel-${key}`}
                aria-selected={pilotPhaseKey === key}
                tabIndex={pilotPhaseKey === key ? 0 : -1}
                key={key}
                onClick={() => setPilotPhaseKey(key)}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                  event.preventDefault();
                  const keys = Object.keys(pilotPhases) as PilotPhaseKey[];
                  const index = keys.indexOf(key);
                  const nextIndex = event.key === "ArrowRight"
                    ? (index + 1) % keys.length
                    : (index - 1 + keys.length) % keys.length;
                  const next = keys[nextIndex];
                  setPilotPhaseKey(next);
                  document.getElementById(`deck-pilot-tab-${next}`)?.focus();
                }}
              >
                <span>{pilotPhases[key].week}</span>
                <strong>{pilotPhases[key].name}</strong>
              </button>
            ))}
          </div>
          <article
            className="deck-pilot-panel"
            role="tabpanel"
            id={`deck-pilot-panel-${pilotPhaseKey}`}
            aria-labelledby={`deck-pilot-tab-${pilotPhaseKey}`}
            key={pilotPhaseKey}
          >
            <div className="deck-pilot-panel-copy">
              <p>{pilotPhase.week}</p>
              <h3>{pilotPhase.name}</h3>
              <strong>{pilotPhase.objective}</strong>
              <ul>{pilotPhase.tasks.map((task) => <li key={task}>{task}</li>)}</ul>
              <div><span>OUTPUT</span><p>{pilotPhase.output}</p></div>
            </div>
            <div className="deck-pilot-condition">
              <span>CONDITION PREVIEW</span>
              <div role="group" aria-label="파일럿 조건 미리보기">
                {(Object.keys(memoryConditions) as MemoryConditionKey[]).map((key) => (
                  <button type="button" key={key} aria-pressed={pilotCondition === key} onClick={() => setPilotCondition(key)}>
                    {memoryConditions[key].label}
                  </button>
                ))}
              </div>
              <strong>{memoryConditions[pilotCondition].english}</strong>
              <p>{memoryConditions[pilotCondition].setup}</p>
              <small>{pilotPhaseKey === "week7" ? "이 단계에서 세 조건을 직접 비교합니다." : "WEEK 7-9에 사용할 조건 구조를 미리 살펴봅니다."}</small>
            </div>
          </article>
        </div>

        <div className="deck-decision-metrics">
          <div className="deck-decision-metrics-heading">
            <span>FIVE FIRST SIGNALS</span>
            <h3>첫 판단 지표</h3>
          </div>
          <ol>
            <li><span>01</span><strong>같은 향 인지</strong><p>시간이 지난 뒤 향의 일치 여부를 구분하는가</p></li>
            <li><span>02</span><strong>cross-format 연결</strong><p>AIR와 PULSE가 같은 정체성으로 느껴지는가</p></li>
            <li><span>03</span><strong>1-2주 후 자발적 재사용</strong><p>안내 없이 다시 리추얼을 선택하는가</p></li>
            <li><span>04</span><strong>Curator 재진입</strong><p>전담 큐레이터 경험이 다음 사용을 돕는가</p></li>
            <li><span>05</span><strong>US / France 메시지 반응</strong><p>국가별 카피와 형식의 차이가 나타나는가</p></li>
          </ol>
          <div className="deck-go-no-go">
            <strong>GO</strong><i /> <strong>ADJUST</strong><i /> <strong>NO-GO</strong>
            <p>지표의 기준값과 표본 규모는 파일럿 설계 단계에서 별도 합의합니다.</p>
          </div>
        </div>
      </section>

      <section className="deck-section deck-collaboration" id="deck-collaboration">
        <div className="deck-section-heading deck-section-heading--split">
          <div>
            <DeckSectionLabel>09 / PROPOSED COLLABORATION</DeckSectionLabel>
            <h2>역할은 겹치지 않고,<br />하나의 경험으로 연결됩니다.</h2>
          </div>
          <p>
            아래는 확정된 계약이나 파트너십이 아니라, 파일럿 범위를 논의하기 위한 제안된 역할 구조입니다.
          </p>
        </div>

        <div className="deck-role-grid">
          <article><span>VENUE &amp; EXPERIENCE</span><h3>Urbanbrook</h3><p>공간 · 향 방향 · 문화 콘텐츠 · 현장 리추얼</p><small>PROPOSED ROLE</small></article>
          <article><span>AGENT &amp; PRODUCT</span><h3>AgentBa.se</h3><p>Persona · Memory UX · 데이터 경계 · 제품 시스템</p><small>PROPOSED ROLE</small></article>
          <article><span>GO-TO-MARKET</span><h3>SocialSeed.ing</h3><p>미국 · 프랑스 · creator cohort · 메시지 비교</p><small>PROPOSED ROLE</small></article>
        </div>

        <div className="deck-decision-items">
          <div className="deck-decision-items-heading"><span>FOUR SCOPE DECISIONS</span><h3>파일럿 전 결정할 네 항목</h3></div>
          <ol>
            <li><span>01</span><p>RETOUR 01 / CLAIR 02의 감각 방향</p></li>
            <li><span>02</span><p>Launch 01의 AIR / PULSE 구체 형식</p></li>
            <li><span>03</span><p>공간 안에서 진행할 12주 검증 범위</p></li>
            <li><span>04</span><p>미국·프랑스 첫 cohort의 고객상과 메시지</p></li>
          </ol>
        </div>

        <div className="deck-guardrails">
          <div className="deck-guardrails-heading"><DeckSectionLabel>GUARDRAILS</DeckSectionLabel><h3>제품보다 먼저 고정할 경계</h3></div>
          <div className="deck-guardrail-grid">
            <article><span>CLAIMS</span><strong>NO MEDICAL CLAIMS</strong><p>치료·진단·수면 개선·집중력 향상을 약속하지 않으며 상태 언어와 효능 주장을 구분합니다.</p></article>
            <article><span>U.S.</span><strong>MoCRA</strong><p>미국 화장품에 해당하는 제품은 시설·제품·안전 자료 의무를 현재 공식 기준으로 검토합니다.</p></article>
            <article><span>EU</span><strong>COSMETICS</strong><p>EU 화장품 규정, 책임자, 안전성 평가, 라벨링 요건을 제품 유형별로 확인합니다.</p></article>
            <article><span>DATA</span><strong>GDPR</strong><p>Agent Memory는 최소수집·목적 제한·보유기간·확인·삭제·동의 철회를 기본값으로 설계합니다.</p></article>
            <article><span>FRAGRANCE</span><strong>IFRA</strong><p>사용 부위와 제품 카테고리에 맞는 향료 안전 기준을 적용하고 최종 제형별 평가를 수행합니다.</p></article>
          </div>
        </div>
      </section>

      <section className="deck-section deck-sources" id="deck-sources">
        <div className="deck-section-heading deck-section-heading--split deck-section-heading--light">
          <div>
            <DeckSectionLabel>10 / SOURCE HUB</DeckSectionLabel>
            <h2>근거는 열어두고,<br />검증은 분명하게.</h2>
          </div>
          <p>
            연구·시장·규제 자료의 역할을 구분합니다. 시장 수치는 제공기관의 카테고리 정의와 시점에 따라 다르며,
            후각 연구는 제품의 치료 효능을 의미하지 않습니다.
          </p>
        </div>

        <div className="deck-source-list">
          {sources.map((source, index) => (
            <a href={source.href} target="_blank" rel="noreferrer" key={source.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>{source.group}</small>
              <div><strong>{source.title}</strong><p>{source.detail}</p></div>
              <DeckArrow />
            </a>
          ))}
        </div>

        <div className="deck-source-boundaries">
          <article><strong>CONFIRMED SOURCES</strong><p>직접 연결된 연구·기관·기업의 공개 자료</p></article>
          <article><strong>THIRD-PARTY ESTIMATES</strong><p>사업 방향 탐색에만 사용하는 시장 추정치. 서로 합산하지 않음</p></article>
          <article><strong>PRODUCT HYPOTHESES</strong><p>향 기억, 제품 형식, Persona 경험, 국가별 메시지는 파일럿에서 검증</p></article>
        </div>
      </section>

      <section className="deck-closing">
        <div className="deck-closing-visual" aria-hidden="true"><span /><span /><span /><i /></div>
        <div className="deck-closing-copy">
          <DeckSectionLabel>RETURN, GENTLY</DeckSectionLabel>
          <h2>공간에서 만든 기억을,<br /><em>일상으로.</em></h2>
          <p>SILLÉANCE — a working concept for scent, ritual, memory and the spaces between.</p>
          <a href="#deck-top">처음으로 돌아가기 <span aria-hidden="true">↑</span></a>
        </div>
      </section>

      <footer className="deck-footer">
        <div className="deck-footer-brand"><span>UB</span><div><strong>URBANBROOK CONCEPT</strong><small>INDEPENDENT PROPOSAL · 2026</small></div></div>
        <p>
          Concept proposed by Two Weeks Team / AgentBa.se.<br />
          Not affiliated with, endorsed by, or released by Urbanbrook. Working title. No medical claims.
        </p>
        <div className="deck-footer-links"><a href="#deck-sources">Sources</a><a href="#deck-pilot">Pilot</a><span>NO USER DATA STORED</span></div>
      </footer>
    </main>
  );
}
