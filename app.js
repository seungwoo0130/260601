const questions = [
  {
    question: "모임에 가면?",
    A: "먼저 대화를 시작한다",
    B: "조용히 상황을 본다",
    type: "EI"
  },
  {
    question: "새로운 정보를 접할 때?",
    A: "사실을 중시한다",
    B: "가능성을 상상한다",
    type: "SN"
  },
  {
    question: "결정할 때?",
    A: "논리를 우선한다",
    B: "감정을 고려한다",
    type: "TF"
  },
  {
    question: "일정을 세울 때?",
    A: "미리 계획한다",
    B: "상황에 맞춘다",
    type: "JP"
  }
];

// 화면 요소
const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const answerA = document.getElementById("answerA");
const answerB = document.getElementById("answerB");
const restartBtn = document.getElementById("restart-btn");

const progressText = document.getElementById("progress-text");
const questionText = document.getElementById("question");

const resultTitle = document.getElementById("mbti-result");
const resultDesc = document.getElementById("mbti-description");

// 상태
let currentQuestion = 0;

let scores = {
  E: 0,
  I: 0,
  S: 0,
  N: 0,
  T: 0,
  F: 0,
  J: 0,
  P: 0
};

// 시작
startBtn.addEventListener("click", startTest);

function startTest() {
  startScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");

  currentQuestion = 0;

  scores = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0
  };

  loadQuestion();
}

// 질문 로드
function loadQuestion() {
  const q = questions[currentQuestion];

  progressText.textContent =
    `질문 ${currentQuestion + 1} / ${questions.length}`;

  questionText.textContent = q.question;

  answerA.textContent = q.A;
  answerB.textContent = q.B;
}

// 답변 선택
answerA.addEventListener("click", () => {
  const type = questions[currentQuestion].type;

  scores[type[0]]++;
  nextQuestion();
});

answerB.addEventListener("click", () => {
  const type = questions[currentQuestion].type;

  scores[type[1]]++;
  nextQuestion();
});

// 다음 질문
function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// 결과 표시
function showResult() {

  let result = "";

  result += scores.E >= scores.I ? "E" : "I";
  result += scores.S >= scores.N ? "S" : "N";
  result += scores.T >= scores.F ? "T" : "F";
  result += scores.J >= scores.P ? "J" : "P";

  questionScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  resultTitle.textContent = result;
  resultDesc.textContent = getDescription(result);
}

// MBTI 설명
function getDescription(type) {

  const descriptions = {
    INTJ: "전략적이고 계획적인 분석가",
    INTP: "논리적이고 창의적인 사색가",
    ENTJ: "대담한 리더형",
    ENTP: "창의적인 혁신가",
    INFJ: "통찰력이 뛰어난 조언가",
    INFP: "이상주의적 중재자",
    ENFJ: "사람을 이끄는 리더",
    ENFP: "열정적인 활동가",

    ISTJ: "책임감이 강한 관리자",
    ISFJ: "헌신적인 수호자",
    ESTJ: "체계적인 경영자",
    ESFJ: "친절한 협력가",

    ISTP: "실용적인 문제 해결사",
    ISFP: "감성적인 예술가",
    ESTP: "에너지 넘치는 도전자",
    ESFP: "자유로운 엔터테이너"
  };

  return descriptions[type] || "당신만의 특별한 성향";
}

// 다시 테스트
restartBtn.addEventListener("click", () => {

  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");

  currentQuestion = 0;

  scores = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0
  };
});
