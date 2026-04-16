import { useEffect, useMemo, useState } from "react";

const weekdays = ["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică"];

const defaultSelectedDays = {
  3: ["Luni", "Miercuri", "Vineri"],
  5: ["Luni", "Marți", "Miercuri", "Vineri", "Duminică"],
  7: ["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică"],
};

const physiqueGoals = [
  "Slăbire și definire",
  "Tonifiere",
  "Masă musculară",
  "Menținere",
  "Atletic / definit",
];

const programs = {
  fete: [
    {
      id: "f1",
      name: "Fesieri 20 min",
      category: "fesieri",
      duration: "20 min",
      equipment: ["corp", "elastice"],
      difficulty: "începător-intermediar",
      calories: "120-170 kcal",
      steps: [
        {
          ex: "Glute Bridge",
          reps: "15 reps",
          workSec: 45,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
          cue: "Strânge fesierii sus.",
        },
        {
          ex: "Banded Squat",
          reps: "15 reps",
          workSec: 45,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
          cue: "Genunchii în exterior.",
        },
      ],
    },
    {
      id: "f2",
      name: "Anticelulită rapid",
      category: "cardio",
      duration: "15 min",
      equipment: ["coardă"],
      difficulty: "începător",
      calories: "100 kcal",
      steps: [
        {
          ex: "Coardă",
          reps: "1 min",
          workSec: 60,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&w=900&q=80",
          cue: "Ritm constant.",
        },
        {
          ex: "High Knees",
          reps: "40 sec",
          workSec: 40,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=900&q=80",
          cue: "Genunchii sus.",
        },
      ],
    },
    {
      id: "f3",
      name: "Abdomen 12 min",
      category: "abdomen",
      duration: "12 min",
      equipment: ["corp"],
      difficulty: "începător",
      calories: "80 kcal",
      steps: [
        {
          ex: "Plank",
          reps: "40 sec",
          workSec: 40,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80",
          cue: "Corp drept.",
        },
        {
          ex: "Crunch",
          reps: "20 reps",
          workSec: 40,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80",
          cue: "Mișcare controlată.",
        },
      ],
    },
    {
      id: "f4",
      name: "Full Body Tonifiere",
      category: "full body",
      duration: "25 min",
      equipment: ["corp", "gantere"],
      difficulty: "intermediar",
      calories: "150 kcal",
      steps: [
        {
          ex: "Squat",
          reps: "15 reps",
          workSec: 45,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
          cue: "Spate drept.",
        },
        {
          ex: "Push-ups",
          reps: "10 reps",
          workSec: 40,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=80",
          cue: "Control bun.",
        },
      ],
    },
    {
      id: "f5",
      name: "Cardio Coardă",
      category: "cardio",
      duration: "10 min",
      equipment: ["coardă"],
      difficulty: "începător",
      calories: "90 kcal",
      steps: [
        {
          ex: "Coardă",
          reps: "2 min",
          workSec: 60,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&w=900&q=80",
          cue: "Respirație constantă.",
        },
      ],
    },
    {
      id: "f6",
      name: "Fesieri + coapse",
      category: "fesieri",
      duration: "22 min",
      equipment: ["corp", "elastice"],
      difficulty: "intermediar",
      calories: "145 kcal",
      steps: [
        {
          ex: "Lunges",
          reps: "14 reps",
          workSec: 45,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=900&q=80",
          cue: "Pas lung și controlat.",
        },
        {
          ex: "Fire Hydrants",
          reps: "18 reps",
          workSec: 40,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
          cue: "Mișcare scurtă și precisă.",
        },
      ],
    },
    {
      id: "f7",
      name: "Abdomen + talie",
      category: "abdomen",
      duration: "16 min",
      equipment: ["corp"],
      difficulty: "începător-intermediar",
      calories: "95 kcal",
      steps: [
        {
          ex: "Russian Twist",
          reps: "24 reps",
          workSec: 40,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80",
          cue: "Rotește din trunchi.",
        },
        {
          ex: "Leg Raises",
          reps: "15 reps",
          workSec: 40,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=900&q=80",
          cue: "Coboară lent.",
        },
      ],
    },
    {
      id: "f8",
      name: "HIIT acasă 18 min",
      category: "cardio",
      duration: "18 min",
      equipment: ["corp"],
      difficulty: "intermediar",
      calories: "160 kcal",
      steps: [
        {
          ex: "Jumping Jacks",
          reps: "45 sec",
          workSec: 45,
          restSec: 15,
          gif: "https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=900&q=80",
          cue: "Ține ritmul.",
        },
        {
          ex: "Mountain Climbers",
          reps: "40 sec",
          workSec: 40,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80",
          cue: "Abdomen activ.",
        },
      ],
    },
    {
      id: "f9",
      name: "Tonifiere brațe + postură",
      category: "full body",
      duration: "17 min",
      equipment: ["gantere", "elastice"],
      difficulty: "începător",
      calories: "90 kcal",
      steps: [
        {
          ex: "Lateral Raise",
          reps: "14 reps",
          workSec: 40,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
          cue: "Mișcare controlată.",
        },
        {
          ex: "Band Pull Apart",
          reps: "16 reps",
          workSec: 40,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
          cue: "Piept deschis.",
        },
      ],
    },
    {
      id: "f10",
      name: "Alergare ușoară outdoor",
      category: "cardio",
      duration: "25 min",
      equipment: ["outdoor"],
      difficulty: "începător",
      calories: "170 kcal",
      steps: [
        {
          ex: "Alergare ușoară",
          reps: "25 min",
          workSec: 60,
          restSec: 15,
          gif: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=80",
          cue: "Ritm lejer și constant.",
        },
      ],
    },
  ],
  baieti: [
    {
      id: "b1",
      name: "Umeri + piept",
      category: "upper",
      duration: "25 min",
      equipment: ["gantere"],
      difficulty: "intermediar",
      calories: "150 kcal",
      steps: [
        {
          ex: "Flotări",
          reps: "12 reps",
          workSec: 45,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=80",
          cue: "Corp drept.",
        },
        {
          ex: "Shoulder Press",
          reps: "12 reps",
          workSec: 45,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
          cue: "Control complet.",
        },
      ],
    },
    {
      id: "b2",
      name: "Brațe",
      category: "arms",
      duration: "20 min",
      equipment: ["gantere"],
      difficulty: "începător",
      calories: "120 kcal",
      steps: [
        {
          ex: "Biceps Curls",
          reps: "12 reps",
          workSec: 40,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80",
          cue: "Coatele fixe.",
        },
      ],
    },
    {
      id: "b3",
      name: "Spate",
      category: "back",
      duration: "20 min",
      equipment: ["elastice"],
      difficulty: "intermediar",
      calories: "130 kcal",
      steps: [
        {
          ex: "Row",
          reps: "12 reps",
          workSec: 45,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
          cue: "Trage din spate.",
        },
      ],
    },
    {
      id: "b4",
      name: "Picioare",
      category: "legs",
      duration: "25 min",
      equipment: ["corp"],
      difficulty: "intermediar",
      calories: "160 kcal",
      steps: [
        {
          ex: "Squat",
          reps: "15 reps",
          workSec: 45,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
          cue: "Mișcare controlată.",
        },
      ],
    },
    {
      id: "b5",
      name: "Full Body",
      category: "full",
      duration: "30 min",
      equipment: ["corp", "gantere"],
      difficulty: "intermediar",
      calories: "200 kcal",
      steps: [
        {
          ex: "Burpees",
          reps: "10 reps",
          workSec: 40,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=900&q=80",
          cue: "Exploziv.",
        },
      ],
    },
    {
      id: "b6",
      name: "Piept + triceps",
      category: "upper",
      duration: "24 min",
      equipment: ["corp", "gantere"],
      difficulty: "intermediar",
      calories: "155 kcal",
      steps: [
        {
          ex: "Diamond Push-ups",
          reps: "10 reps",
          workSec: 40,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=80",
          cue: "Coatele aproape.",
        },
        {
          ex: "Floor Press",
          reps: "12 reps",
          workSec: 45,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80",
          cue: "Controlează coborârea.",
        },
      ],
    },
    {
      id: "b7",
      name: "Spate + postură",
      category: "back",
      duration: "18 min",
      equipment: ["elastice", "gantere"],
      difficulty: "începător-intermediar",
      calories: "115 kcal",
      steps: [
        {
          ex: "Band Pull Apart",
          reps: "16 reps",
          workSec: 40,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
          cue: "Ține pieptul sus.",
        },
        {
          ex: "Reverse Fly",
          reps: "12 reps",
          workSec: 40,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
          cue: "Mișcare precisă.",
        },
      ],
    },
    {
      id: "b8",
      name: "Picioare + core",
      category: "legs",
      duration: "22 min",
      equipment: ["corp", "gantere"],
      difficulty: "intermediar",
      calories: "170 kcal",
      steps: [
        {
          ex: "Goblet Squat",
          reps: "14 reps",
          workSec: 45,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
          cue: "Ține pieptul sus.",
        },
        {
          ex: "Plank",
          reps: "45 sec",
          workSec: 45,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80",
          cue: "Abdomen încordat.",
        },
      ],
    },
    {
      id: "b9",
      name: "Brațe + umeri rapide",
      category: "arms",
      duration: "16 min",
      equipment: ["gantere"],
      difficulty: "începător",
      calories: "95 kcal",
      steps: [
        {
          ex: "Hammer Curls",
          reps: "12 reps",
          workSec: 40,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80",
          cue: "Fără balans.",
        },
        {
          ex: "Lateral Raise",
          reps: "14 reps",
          workSec: 40,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
          cue: "Ridică până la umeri.",
        },
      ],
    },
    {
      id: "b10",
      name: "Cardio + condiție",
      category: "full",
      duration: "20 min",
      equipment: ["coardă", "corp"],
      difficulty: "intermediar",
      calories: "180 kcal",
      steps: [
        {
          ex: "Coardă",
          reps: "1 min",
          workSec: 60,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&w=900&q=80",
          cue: "Respirație ritmată.",
        },
        {
          ex: "Burpees",
          reps: "10 reps",
          workSec: 40,
          restSec: 20,
          gif: "https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=900&q=80",
          cue: "Ține ritmul.",
        },
      ],
    },
  ],
};

function styles() {
  return `
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, Arial, sans-serif;
      background: #f4f6f8;
      color: #0f172a;
    }
    .app {
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .card {
      background: white;
      border-radius: 20px;
      padding: 18px;
      box-shadow: 0 6px 20px rgba(15, 23, 42, 0.08);
      border: 1px solid #e2e8f0;
    }
    .title {
      font-size: 32px;
      font-weight: 800;
      margin: 0 0 6px;
    }
    .subtitle {
      color: #64748b;
      margin: 0;
    }
    .row { display: flex; gap: 12px; flex-wrap: wrap; }
    .between { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
    .grid {
      display: grid;
      gap: 16px;
    }
    .grid-2 { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
    .grid-3 { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
    .grid-4 { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
    .btn {
      border: none;
      background: white;
      color: #0f172a;
      padding: 12px 16px;
      border-radius: 16px;
      font-weight: 700;
      cursor: pointer;
      border: 2px solid #cbd5e1;
      transition: 0.2s;
    }
    .btn:hover { transform: translateY(-1px); }
    .btn.active {
      background: #0f172a;
      color: white;
      border-color: #0f172a;
      box-shadow: 0 0 0 4px #cbd5e1;
    }
    .btn.full { width: 100%; }
    .tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin: 20px 0;
    }
    .badge {
      display: inline-block;
      background: #e2e8f0;
      color: #334155;
      border-radius: 999px;
      padding: 6px 10px;
      font-size: 12px;
      font-weight: 700;
    }
    .stat {
      font-size: 28px;
      font-weight: 800;
      margin: 8px 0 4px;
    }
    .muted { color: #64748b; }
    .input {
      width: 100%;
      padding: 12px 14px;
      border-radius: 14px;
      border: 1px solid #cbd5e1;
      font-size: 14px;
    }
    .progress {
      width: 100%;
      height: 12px;
      border-radius: 999px;
      background: #e2e8f0;
      overflow: hidden;
    }
    .progress > div {
      height: 100%;
      background: #0f172a;
      border-radius: 999px;
    }
    .day {
      cursor: pointer;
      transition: 0.2s;
    }
    .day:hover { transform: translateY(-1px); }
    .day.today {
      background: #0f172a;
      color: white;
      box-shadow: 0 0 0 4px #cbd5e1;
    }
    .day.rest {
      background: #fff7ed;
    }
    .day .small {
      font-size: 13px;
      color: inherit;
      opacity: 0.85;
    }
    .img {
      width: 100%;
      height: 260px;
      object-fit: cover;
      border-radius: 18px;
      background: #e2e8f0;
    }
    .section-space { margin-top: 18px; }
    .list-item {
      background: #f8fafc;
      border-radius: 14px;
      padding: 10px 12px;
      margin-bottom: 8px;
    }
    .highlight {
      border: 2px solid #10b981;
    }
    .center {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .timer {
      background: #0f172a;
      color: white;
      border-radius: 20px;
      padding: 24px;
      text-align: center;
      margin-top: 14px;
    }
    .timer-number {
      font-size: 54px;
      font-weight: 800;
      margin-top: 8px;
    }
    @media (max-width: 640px) {
      .title { font-size: 24px; }
      .timer-number { font-size: 42px; }
      .app { padding: 14px; }
    }
  `;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [userProfile, setUserProfile] = useState({
    name: "",
    sex: "baieti",
    weight: "",
    height: "",
    age: "",
    goalWeight: "",
    physiqueGoal: "Atletic / definit",
  });

  const [profile, setProfile] = useState("fete");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [weeklyPlanType, setWeeklyPlanType] = useState(3);
  const [selectedDays, setSelectedDays] = useState(defaultSelectedDays[3]);
  const [activeProgram, setActiveProgram] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState("idle");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [programCategoryFilter, setProgramCategoryFilter] = useState("toate");
  const [weightInput, setWeightInput] = useState("");
  const [stats, setStats] = useState({
    workoutsDone: 8,
    weeklyGoal: 3,
    weeklyDone: 2,
    streak: 6,
    lastWorkout: "ieri",
  });
  const [weights, setWeights] = useState([
    { date: "01 Apr", kg: 86.2 },
    { date: "04 Apr", kg: 85.8 },
    { date: "07 Apr", kg: 85.6 },
    { date: "10 Apr", kg: 85.1 },
    { date: "13 Apr", kg: 84.9 },
  ]);

  const currentPrograms = programs[profile];
  const currentStep = activeProgram ? activeProgram.steps[stepIndex] : null;
  const totalSteps = activeProgram?.steps.length || 0;
  const progressValue = activeProgram ? ((stepIndex + (phase === "done" ? 1 : 0)) / totalSteps) * 100 : 0;

  const effectiveWeight = userProfile.weight ? Number(userProfile.weight) : null;
  const effectiveGoalWeight = userProfile.goalWeight ? Number(userProfile.goalWeight) : 80;
  const currentWeight = weights[weights.length - 1]?.kg ?? 0;
  const startWeight = effectiveWeight ?? weights[0]?.kg ?? 0;
  const targetWeight = effectiveGoalWeight;
  const weightDelta = Number((currentWeight - startWeight).toFixed(1));

  const avgRecent = useMemo(() => {
    const vals = weights.slice(-4).map((w) => w.kg);
    if (!vals.length) return "0.0";
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  }, [weights]);

  const targetPct = Math.min(
    100,
    Math.max(0, ((startWeight - currentWeight) / Math.max(0.1, startWeight - targetWeight)) * 100)
  );

  useEffect(() => {
    setSelectedDays(defaultSelectedDays[weeklyPlanType]);
    setStats((prev) => ({ ...prev, weeklyGoal: weeklyPlanType }));
  }, [weeklyPlanType]);

  useEffect(() => {
    setStats((prev) => ({ ...prev, weeklyGoal: selectedDays.length }));
  }, [selectedDays]);

  useEffect(() => {
    if (phase === "idle" || phase === "done" || isPaused || !secondsLeft) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, phase, isPaused]);

  useEffect(() => {
    if (!activeProgram || !currentStep) return;
    if (secondsLeft > 0) return;

    if (phase === "work") {
      setPhase("rest");
      setSecondsLeft(currentStep.restSec);
    } else if (phase === "rest") {
      if (stepIndex < activeProgram.steps.length - 1) {
        const nextIdx = stepIndex + 1;
        setStepIndex(nextIdx);
        setPhase("work");
        setSecondsLeft(activeProgram.steps[nextIdx].workSec);
      } else {
        setPhase("done");
        setStats((prev) => ({
          ...prev,
          workoutsDone: prev.workoutsDone + 1,
          weeklyDone: Math.min(prev.weeklyDone + 1, prev.weeklyGoal),
          streak: prev.streak + 1,
          lastWorkout: "azi",
        }));
      }
    }
  }, [secondsLeft, phase, activeProgram, currentStep, stepIndex]);

  const rotationOrderFete = ["fesieri", "abdomen", "cardio", "full body"];
  const rotationOrderBaieti = ["upper", "back", "legs", "arms", "full"];

  const weeklyCalendar = useMemo(() => {
    const rotation = profile === "fete" ? rotationOrderFete : rotationOrderBaieti;
    let rotationIndex = 0;

    return weekdays.map((day) => {
      if (!selectedDays.includes(day)) {
        return { day, plan: "Pauză / recuperare", status: "rest" };
      }

      const category = rotation[rotationIndex % rotation.length];
      const programsForCategory = currentPrograms.filter((p) => p.category.includes(category));
      const chosenProgram = programsForCategory.length
        ? programsForCategory[rotationIndex % programsForCategory.length]
        : currentPrograms[rotationIndex % currentPrograms.length];
      rotationIndex++;

      const todayName = "Joi";
      const status = day === todayName ? "today" : "planned";

      return {
        day,
        plan: chosenProgram.name,
        status,
        programId: chosenProgram.id,
      };
    });
  }, [selectedDays, profile, currentPrograms]);

  const weeklyProgramIds = useMemo(
    () => weeklyCalendar.filter((item) => item.programId).map((item) => item.programId),
    [weeklyCalendar]
  );

  const weeklyPrograms = useMemo(() => {
    const seen = new Set();
    return weeklyCalendar
      .filter((item) => item.programId)
      .map((item) => currentPrograms.find((p) => p.id === item.programId))
      .filter(Boolean)
      .filter((program) => {
        if (seen.has(program.id)) return false;
        seen.add(program.id);
        return true;
      });
  }, [weeklyCalendar, currentPrograms]);

  const allCategories = useMemo(
    () => ["toate", ...Array.from(new Set(currentPrograms.map((p) => p.category)))],
    [currentPrograms]
  );

  const filteredPrograms = useMemo(() => {
    return currentPrograms.filter((program) => {
      if (programCategoryFilter === "toate") return true;
      return program.category === programCategoryFilter;
    });
  }, [currentPrograms, programCategoryFilter]);

  const startProgram = (program) => {
    setActiveProgram(program);
    setStepIndex(0);
    setPhase("work");
    setSecondsLeft(program.steps[0].workSec);
    setIsPaused(false);
    setActiveTab("live");
  };

  const toggleSelectedDay = (day) => {
    setSelectedDays((prev) => {
      if (prev.includes(day)) {
        if (prev.length === 1) return prev;
        return prev.filter((d) => d !== day);
      }
      return [...prev, day].sort((a, b) => weekdays.indexOf(a) - weekdays.indexOf(b));
    });
  };

  const handleLogin = () => {
    if (!credentials.email || !credentials.password) return;
    setIsLoggedIn(true);
  };

  const completeOnboarding = () => {
    if (!userProfile.name || !userProfile.weight || !userProfile.height) return;
    setProfile(userProfile.sex);
    const initialWeight = Number(userProfile.weight);
    if (!Number.isNaN(initialWeight)) {
      setWeights([{ date: "Start", kg: initialWeight }]);
    }
    setShowOnboarding(false);
    setActiveTab("dashboard");
  };

  const addWeight = () => {
    const parsed = Number(weightInput.replace(",", "."));
    if (!parsed || Number.isNaN(parsed)) return;
    const today = new Date();
    const label = today.toLocaleDateString("ro-RO", { day: "2-digit", month: "short" });
    setWeights((prev) => [...prev, { date: label, kg: parsed }]);
    setWeightInput("");
  };

  const togglePause = () => setIsPaused((p) => !p);

  const skipStep = () => {
    if (!activeProgram) return;
    if (stepIndex < activeProgram.steps.length - 1) {
      const nextIdx = stepIndex + 1;
      setStepIndex(nextIdx);
      setPhase("work");
      setSecondsLeft(activeProgram.steps[nextIdx].workSec);
      setIsPaused(false);
    } else {
      setPhase("done");
    }
  };

  const resetWorkout = () => {
    if (!activeProgram) return;
    setStepIndex(0);
    setPhase("work");
    setSecondsLeft(activeProgram.steps[0].workSec);
    setIsPaused(false);
  };

  const exitWorkout = () => {
    setActiveProgram(null);
    setStepIndex(0);
    setPhase("idle");
    setSecondsLeft(0);
    setIsPaused(false);
  };

  if (!isLoggedIn) {
    return (
      <>
        <style>{styles()}</style>
        <div className="app center">
          <div className="card" style={{ width: "100%", maxWidth: 420 }}>
            <h1 className="title" style={{ fontSize: 28 }}>Login</h1>
            <div className="grid">
              <input
                className="input"
                placeholder="Email"
                value={credentials.email}
                onChange={(e) => setCredentials((p) => ({ ...p, email: e.target.value }))}
              />
              <input
                className="input"
                type="password"
                placeholder="Parolă"
                value={credentials.password}
                onChange={(e) => setCredentials((p) => ({ ...p, password: e.target.value }))}
              />
              <button className="btn active full" onClick={handleLogin}>Intră în aplicație</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (showOnboarding) {
    return (
      <>
        <style>{styles()}</style>
        <div className="app center">
          <div className="card" style={{ width: "100%", maxWidth: 900 }}>
            <h1 className="title" style={{ fontSize: 28 }}>Date inițiale</h1>
            <div className="grid grid-2">
              <input
                className="input"
                placeholder="Nume"
                value={userProfile.name}
                onChange={(e) => setUserProfile((p) => ({ ...p, name: e.target.value }))}
              />
              <div className="row">
                <button
                  className={`btn ${userProfile.sex === "fete" ? "active" : ""}`}
                  onClick={() => setUserProfile((p) => ({ ...p, sex: "fete" }))}
                >
                  👩 Fată
                </button>
                <button
                  className={`btn ${userProfile.sex === "baieti" ? "active" : ""}`}
                  onClick={() => setUserProfile((p) => ({ ...p, sex: "baieti" }))}
                >
                  👨 Băiat
                </button>
              </div>
              <input
                className="input"
                placeholder="Greutate actuală (kg)"
                value={userProfile.weight}
                onChange={(e) => setUserProfile((p) => ({ ...p, weight: e.target.value }))}
              />
              <input
                className="input"
                placeholder="Înălțime (cm)"
                value={userProfile.height}
                onChange={(e) => setUserProfile((p) => ({ ...p, height: e.target.value }))}
              />
              <input
                className="input"
                placeholder="Vârstă"
                value={userProfile.age}
                onChange={(e) => setUserProfile((p) => ({ ...p, age: e.target.value }))}
              />
              <input
                className="input"
                placeholder="Greutate țintă (kg)"
                value={userProfile.goalWeight}
                onChange={(e) => setUserProfile((p) => ({ ...p, goalWeight: e.target.value }))}
              />
            </div>

            <div className="section-space">
              <p className="muted" style={{ fontWeight: 700 }}>La ce corp dorești să ajungi</p>
              <div className="row">
                {physiqueGoals.map((goal) => (
                  <button
                    key={goal}
                    className={`btn ${userProfile.physiqueGoal === goal ? "active" : ""}`}
                    onClick={() => setUserProfile((p) => ({ ...p, physiqueGoal: goal }))}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            <div className="section-space">
              <button className="btn active full" onClick={completeOnboarding}>
                Salvează și continuă
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles()}</style>
      <div className="app">
        <div className="container">
          <div className="between">
            <div>
              <h1 className="title">FitnessApp</h1>
              <p className="subtitle">
                Profil: {userProfile.name} · {userProfile.height} cm · obiectiv: {userProfile.physiqueGoal}
              </p>
            </div>
            <div className="row">
              <button className={`btn ${profile === "fete" ? "active" : ""}`} onClick={() => setProfile("fete")}>👩 Fete</button>
              <button className={`btn ${profile === "baieti" ? "active" : ""}`} onClick={() => setProfile("baieti")}>👨 Băieți</button>
            </div>
          </div>

          <div className="tabs">
            {["dashboard", "programe", "live", "kg"].map((tab) => (
              <button
                key={tab}
                className={`btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "dashboard" ? "Dashboard" : tab === "programe" ? "Programe" : tab === "live" ? "Live workout" : "Progres KG"}
              </button>
            ))}
          </div>

          {activeTab === "dashboard" && (
            <div className="grid">
              <div className="grid grid-4">
                <div className="card"><div className="muted">Antrenamente finalizate</div><div className="stat">{stats.workoutsDone}</div></div>
                <div className="card"><div className="muted">Streak activ</div><div className="stat">{stats.streak} zile</div></div>
                <div className="card"><div className="muted">Greutate curentă</div><div className="stat">{currentWeight} kg</div></div>
                <div className="card"><div className="muted">Schimbare totală</div><div className="stat">{weightDelta} kg</div></div>
              </div>

              <div className="card">
                <h3 style={{ marginTop: 0 }}>Planul tău săptămânal</h3>
                <div className="row" style={{ marginBottom: 14 }}>
                  {[3, 5, 7].map((n) => (
                    <button
                      key={n}
                      className={`btn ${weeklyPlanType === n ? "active" : ""}`}
                      onClick={() => setWeeklyPlanType(n)}
                    >
                      {n} / săptămână
                    </button>
                  ))}
                </div>

                <div className="row" style={{ marginBottom: 18 }}>
                  {weekdays.map((day) => (
                    <button
                      key={day}
                      className={`btn ${selectedDays.includes(day) ? "active" : ""}`}
                      onClick={() => toggleSelectedDay(day)}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                <div className="grid grid-4">
                  {weeklyCalendar.map((item) => (
                    <div
                      key={item.day}
                      className={`card day ${item.status === "today" ? "today" : ""} ${item.status === "rest" ? "rest" : ""}`}
                      onClick={() => {
                        if (!item.programId) return;
                        const program = currentPrograms.find((p) => p.id === item.programId);
                        if (program) startProgram(program);
                      }}
                    >
                      <div className="between">
                        <strong>{item.day}</strong>
                        <span className="badge">{item.status}</span>
                      </div>
                      <p className="small">{item.plan}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "programe" && (
            <div className="grid">
              <div className="card">
                <h3 style={{ marginTop: 0 }}>Programele săptămânii tale</h3>
                <div className="grid grid-3">
                  {weeklyPrograms.map((program) => (
                    <div key={program.id} className="card highlight">
                      <div className="between">
                        <strong>{program.name}</strong>
                        <span className="badge">{program.duration}</span>
                      </div>
                      <p className="muted">{program.category} · {program.difficulty}</p>
                      <button className="btn active full" onClick={() => startProgram(program)}>
                        Start direct
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 style={{ marginTop: 0 }}>Bibliotecă completă de programe</h3>
                <div className="row" style={{ marginBottom: 14 }}>
                  {allCategories.map((category) => (
                    <button
                      key={category}
                      className={`btn ${programCategoryFilter === category ? "active" : ""}`}
                      onClick={() => setProgramCategoryFilter(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                <div className="grid grid-3">
                  {filteredPrograms.map((program) => (
                    <div key={program.id} className={`card ${weeklyProgramIds.includes(program.id) ? "highlight" : ""}`}>
                      <div className="between">
                        <strong>{program.name}</strong>
                        <span className="badge">{program.duration}</span>
                      </div>
                      <p className="muted">{program.category} · {program.difficulty} · {program.calories}</p>
                      <p className="muted">Echipament: {program.equipment.join(", ")}</p>
                      {program.steps.map((step, idx) => (
                        <div key={idx} className="list-item">
                          {idx + 1}. {step.ex} — {step.reps}
                        </div>
                      ))}
                      <button className="btn active full" onClick={() => startProgram(program)}>
                        Start program
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "live" && (
            <div className="grid grid-3">
              {!activeProgram ? (
                <div className="card" style={{ gridColumn: "1 / -1" }}>
                  <h3 style={{ marginTop: 0 }}>Niciun antrenament pornit</h3>
                  <p className="muted">Alege un program din Dashboard sau Programe.</p>
                </div>
              ) : (
                <>
                  <div className="card" style={{ gridColumn: "span 2" }}>
                    <div className="between">
                      <div>
                        <h3 style={{ margin: 0 }}>{activeProgram.name}</h3>
                        <p className="muted">Pasul {Math.min(stepIndex + 1, totalSteps)} din {totalSteps}</p>
                      </div>
                      <span className="badge">{phase === "work" ? "execuție" : phase === "rest" ? "pauză" : "finalizat"}</span>
                    </div>

                    {phase !== "done" && currentStep ? (
                      <>
                        <div className="section-space">
                          <img src={currentStep.gif} alt={currentStep.ex} className="img" />
                        </div>
                        <div className="section-space">
                          <div className="stat" style={{ marginBottom: 0 }}>{currentStep.ex}</div>
                          <div className="muted">{currentStep.reps}</div>
                          <div className="list-item" style={{ marginTop: 12 }}>{currentStep.cue}</div>
                        </div>

                        <div className="timer">
                          <div>{phase === "work" ? "Timp rămas" : "Pauză rămasă"}</div>
                          <div className="timer-number">{secondsLeft}s</div>
                        </div>

                        <div className="section-space">
                          <div className="progress">
                            <div style={{ width: `${progressValue}%` }} />
                          </div>
                        </div>

                        <div className="row section-space">
                          <button className="btn" onClick={togglePause}>{isPaused ? "Continuă" : "Pauză"}</button>
                          <button className="btn" onClick={skipStep}>Sare pasul</button>
                          <button className="btn" onClick={resetWorkout}>Reia</button>
                        </div>
                      </>
                    ) : (
                      <div className="section-space">
                        <h3>Antrenament finalizat</h3>
                        <p className="muted">Sesiunea a fost salvată.</p>
                        <div className="row">
                          <button className="btn active" onClick={() => startProgram(activeProgram)}>Refă programul</button>
                          <button className="btn" onClick={() => { exitWorkout(); setActiveTab("programe"); }}>
                            Înapoi la programe
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="card">
                    <h3 style={{ marginTop: 0 }}>Exerciții</h3>
                    {activeProgram.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="list-item"
                        style={{
                          background: idx === stepIndex && phase !== "done" ? "#0f172a" : idx < stepIndex || phase === "done" ? "#ecfdf5" : "#f8fafc",
                          color: idx === stepIndex && phase !== "done" ? "white" : "#0f172a",
                        }}
                      >
                        {idx + 1}. {step.ex} — {step.reps}
                      </div>
                    ))}
                    <button className="btn full" onClick={() => { exitWorkout(); setActiveTab("programe"); }}>
                      Ieși din antrenament
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === "kg" && (
            <div className="grid">
              <div className="grid grid-4">
                <div className="card"><div className="muted">Greutate actuală</div><div className="stat">{currentWeight} kg</div></div>
                <div className="card"><div className="muted">Diferență față de start</div><div className="stat">{weightDelta} kg</div></div>
                <div className="card"><div className="muted">Media recentă</div><div className="stat">{avgRecent} kg</div></div>
                <div className="card"><div className="muted">Țintă</div><div className="stat">{targetWeight} kg</div><div className="muted">{userProfile.physiqueGoal}</div></div>
              </div>

              <div className="grid grid-3">
                <div className="card" style={{ gridColumn: "span 2" }}>
                  <div className="between">
                    <h3 style={{ marginTop: 0 }}>Evoluție în kg</h3>
                    <span className="badge">{Math.round(targetPct)}% spre obiectiv</span>
                  </div>
                  <div className="progress" style={{ marginBottom: 18 }}>
                    <div style={{ width: `${targetPct}%` }} />
                  </div>
                  {weights.map((w, idx) => {
                    const max = Math.max(...weights.map((x) => x.kg));
                    const min = Math.min(...weights.map((x) => x.kg));
                    const width = ((w.kg - min) / Math.max(0.1, max - min)) * 100;
                    return (
                      <div key={idx} style={{ marginBottom: 12 }}>
                        <div className="between">
                          <span className="muted">{w.date}</span>
                          <strong>{w.kg} kg</strong>
                        </div>
                        <div className="progress">
                          <div style={{ width: `${Math.max(8, width)}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="card">
                  <h3 style={{ marginTop: 0 }}>Adaugă o cântărire</h3>
                  <input
                    className="input"
                    placeholder="Ex: 84.7"
                    value={weightInput}
                    onChange={(e) => setWeightInput(e.target.value)}
                  />
                  <div className="section-space">
                    <button className="btn active full" onClick={addWeight}>Salvează greutatea</button>
                  </div>
                  <div className="list-item section-space">
                    Cântărește-te dimineața, în condiții similare, pentru un trend mai corect.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}