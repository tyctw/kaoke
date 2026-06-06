import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, ArrowRight, RotateCcw, BrainCircuit, Activity } from 'lucide-react';
import { groupsData } from '../data';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const QUESTIONS = [
  {
    title: "1. 遇到一個全新未組裝的設備或家具時，你的第一反應是？",
    options: [
      { text: "拿起工具跟零件，直接動手試著把它們組裝起來", type: "R" },
      { text: "仔細閱讀說明書，分析它的結構和背後的運作邏輯", type: "I" },
      { text: "思考把它塗裝成什麼顏色，或如何擺設最美觀", type: "A" },
      { text: "找家人或朋友一起幫忙，享受共同合作聊天的過程", type: "S" },
      { text: "評估這個設備能帶來多大效益，是否能幫忙賺錢或省時間", type: "E" },
      { text: "先將所有零件分門別類排好，並核對清單確認有沒有缺漏", type: "C" },
    ]
  },
  {
    title: "2. 想像你未來的理想工作環境，最符合你期待的是哪一種？",
    options: [
      { text: "有各種專業機具、設備齊全的工程現場、廠房或大自然", type: "R" },
      { text: "充滿高科技儀器、可以專心進行實驗或開發的研究機構", type: "I" },
      { text: "沒有太多常規限制，充滿巧思與設計感的個人工作室", type: "A" },
      { text: "可以頻繁與人群接觸、充滿熱情與關懷的醫療院所或學校", type: "S" },
      { text: "步調快速、充滿挑戰與晉升機會的跨國企業或商業廣場", type: "E" },
      { text: "檔案數據井然有序、制度完善且工作流程明確的辦公室", type: "C" },
    ]
  },
  {
    title: "3. 如果要在學校舉辦一場大型園遊會，你最想擔任什麼職務？",
    options: [
      { text: "場地硬體建置員：負責搭帳篷、牽管線或架設音響設備", type: "R" },
      { text: "系統規劃員：負責規劃動線邏輯與設計線上點餐結帳系統", type: "I" },
      { text: "視覺設計師：設計活動海報、場地主題視覺與所有的裝飾", type: "A" },
      { text: "現場服務員：擔任服務台人員或在攤位前熱情招呼客人", type: "S" },
      { text: "行銷總召集：負責對外招商贊助或規劃活動的盈利策略", type: "E" },
      { text: "財務稽核員：負責管帳、建立收支明細表以及控管票券", type: "C" },
    ]
  },
  {
    title: "4. 當你遇到困難或壓力時，你覺得哪種紓壓方式最適合你？",
    options: [
      { text: "運動流汗、操作機械或是做些耗費體力的實物勞動", type: "R" },
      { text: "上網搜尋資料，專注研究問題的根本原因並尋求客觀解答", type: "I" },
      { text: "聽音樂、畫畫、寫作或是去欣賞一場展覽", type: "A" },
      { text: "找信任的老師或朋友傾訴，透過深談與分享獲得力量", type: "S" },
      { text: "思考策略逆轉局勢，或者去參加大型社交活動轉換心情", type: "E" },
      { text: "整理自己的房間、書桌，或是把所有待辦事項重新列出清單", type: "C" },
    ]
  },
  {
    title: "5. 你認為自己最強的「個人優勢」是下列何者？",
    options: [
      { text: "動手實作能力強、體能好，對於操作工具很在行", type: "R" },
      { text: "邏輯清晰、具備優秀的分析、觀察與解決複雜問題的能力", type: "I" },
      { text: "想像力豐富、直覺敏銳，總是能產出與眾不同的創意", type: "A" },
      { text: "善解人意、同理心強，很會傾聽並能與各種人建立良好關係", type: "S" },
      { text: "具備強大領導力、說服力強，能夠帶領團隊達成目標", type: "E" },
      { text: "做事細心謹慎、有條理，對於數字與細節具備高度敏銳度", type: "C" },
    ]
  },
  {
    title: "6. 在觀看網路影片或瀏覽社群時，你最容易被哪類主題吸引？",
    options: [
      { text: "各種工具實測、機械改裝、汽車引擎或是戶外求生探險", type: "R" },
      { text: "科普知識、物理化學原理講解、最新科技硬核解析", type: "I" },
      { text: "電影深度影評、藝術設計展覽、流行時尚或美感生活穿搭", type: "A" },
      { text: "心理學探討、社會福利議題或是與家庭關係相關的深入專訪", type: "S" },
      { text: "企業家成功心法、商業談判技巧、投資理財與國際趨勢", type: "E" },
      { text: "軟體工具教學（如 Excel）、高效時間管理與筆記術分享", type: "C" },
    ]
  }
];

const CATEGORY_MAP: Record<string, { label: string, title: string, desc: string, traits: string, groupIds: string[] }> = {
  R: { 
    label: "實用",
    title: "實用型 (Realistic)", 
    desc: "喜歡具體、雙手實作與機器操作，通常偏好明確、講求實用與產出的工作環境。你可能對工程、結構、動植物或解決實務問題充滿熱情。", 
    traits: "實踐者、愛動手做、喜歡戶外與機械",
    groupIds: ['g1', 'g2', 'g6', 'g14', 'g18', 'g19'] 
  },
  I: { 
    label: "研究",
    title: "研究型 (Investigative)", 
    desc: "喜歡邏輯思考、分析問題與研究深層原理，對於探索未知與解答複雜疑問有著強烈好奇心。你傾向依賴數據與客觀事實。", 
    traits: "思想家、分析派、具備科學實驗精神",
    groupIds: ['g3', 'g4', 'g5', 'g8'] 
  },
  A: { 
    label: "藝術",
    title: "藝術型 (Artistic)", 
    desc: "具備敏銳美感，喜歡自由創作、表演或空間設計，重視個人獨特風格與情感的表達。你不喜歡受太多框架限制。", 
    traits: "創作者、直覺強、注重美感與獨創性",
    groupIds: ['g7', 'g17', 'g20'] 
  },
  S: { 
    label: "社會",
    title: "社會型 (Social)", 
    desc: "樂於助人、具有極高同理心，喜歡與群眾互動並提供專業的生活或健康照護。你擅長團隊合作且十分看重人際和諧。", 
    traits: "助人者、善解人意、重視人際互動",
    groupIds: ['g10', 'g15', 'g16'] 
  },
  E: { 
    label: "企業",
    title: "企業型 (Enterprising)", 
    desc: "具有良好口語表達與企劃能力，對商業趨勢、團隊領導與跨文化溝通有高度敏銳度。你勇於接受挑戰，喜歡說服他人。", 
    traits: "領導者、具說服力、喜愛商業與挑戰",
    groupIds: ['g9', 'g11', 'g12'] 
  },
  C: { 
    label: "事務",
    title: "事務型 (Conventional)", 
    desc: "做事細心謹慎、有條理，不僅對數字敏銳，也能將複雜的資料整理得井然有序。你偏好有明確制度與規範的工作環境。", 
    traits: "組織者、注重細節、有條不紊且謹慎",
    groupIds: ['g9', 'g13'] 
  }
};

export function CareerTestModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [step, setStep] = useState(0); 
  const [scores, setScores] = useState<Record<string, number>>({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });

  const reset = () => {
    setStep(0);
    setScores({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
  };

  const fullClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  const handleAnswer = (type: string) => {
    setScores(prev => ({ ...prev, [type]: prev[type] + 1 }));
    setStep(s => s + 1);
  };

  const result = useMemo(() => {
    if (step < QUESTIONS.length + 1) return null;
    let maxType = 'R';
    let maxScore = -1;
    for (const [type, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        maxType = type;
      }
    }
    
    const chartData = [
      { subject: '實用型(R)', score: scores.R },
      { subject: '研究型(I)', score: scores.I },
      { subject: '藝術型(A)', score: scores.A },
      { subject: '社會型(S)', score: scores.S },
      { subject: '企業型(E)', score: scores.E },
      { subject: '事務型(C)', score: scores.C },
    ];

    return { ...CATEGORY_MAP[maxType], chartData };
  }, [step, scores]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.2 }}
           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm"
           onClick={fullClose}
        >
          <motion.div
             initial={{ opacity: 0, scale: 0.95, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.95, y: 20 }}
             transition={{ type: "spring", duration: 0.5, bounce: 0 }}
             className={`bg-white rounded-[2rem] w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-white/20 ${step > QUESTIONS.length ? 'max-w-4xl' : 'max-w-2xl'}`}
             onClick={e => e.stopPropagation()}
          >
             <div className="p-6 md:p-8 flex flex-col min-h-[500px]">
               {/* Header */}
               <div className="flex justify-between items-center mb-6">
                 {step > 0 && step <= QUESTIONS.length ? (
                   <div className="flex items-center gap-4">
                     <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full shadow-inner border border-indigo-100">
                       問題 {step} / {QUESTIONS.length}
                     </span>
                     <div className="h-2 w-32 md:w-48 bg-zinc-100 rounded-full overflow-hidden">
                       <motion.div 
                         className="h-full bg-indigo-500 rounded-full" 
                         initial={{ width: 0 }} 
                         animate={{ width: `${(step / QUESTIONS.length) * 100}%` }} 
                       />
                     </div>
                   </div>
                 ) : <div />}
                 <button 
                   onClick={fullClose}
                   className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors ml-auto z-10"
                 >
                   <X className="w-5 h-5" />
                 </button>
               </div>

               <AnimatePresence mode="wait">
                 {/* Intro Step */}
                 {step === 0 && (
                   <motion.div key="intro" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-grow flex flex-col items-center justify-center text-center py-6">
                     <div className="w-24 h-24 bg-indigo-50 rounded-[2rem] rotate-3 flex items-center justify-center mb-8 border border-indigo-100 shadow-sm relative">
                       <BrainCircuit className="w-12 h-12 text-indigo-600 -rotate-3" />
                       <div className="absolute -top-2 -right-2 bg-amber-100 p-1.5 rounded-full shadow-sm animate-pulse">
                         <Sparkles className="w-4 h-4 text-amber-500" />
                       </div>
                     </div>
                     <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight mb-4">Holland 職涯興趣探索</h2>
                     <p className="text-zinc-500 max-w-md mb-10 leading-relaxed text-[15px]">
                       本測驗基於專業的 RIASEC 職業興趣理論。<br className="hidden md:block"/>只要透過 6 道情境題，就能光速分析出你的潛在優勢，為你推薦最契合的高職群科！
                     </p>
                     <button 
                       onClick={() => setStep(1)}
                       className="w-full sm:w-auto px-10 py-4 bg-zinc-900 text-white font-bold rounded-full hover:bg-zinc-800 transition-all active:scale-95 shadow-xl shadow-zinc-900/20 inline-flex items-center justify-center gap-2 text-base md:text-lg"
                     >
                       開始專業評測 <ArrowRight className="w-5 h-5 ml-1" />
                     </button>
                   </motion.div>
                 )}

                 {/* Questions */}
                 {step > 0 && step <= QUESTIONS.length && (
                   <motion.div key={`q-${step}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-grow flex flex-col">
                     <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-8 leading-normal tracking-tight text-balance">
                       {QUESTIONS[step - 1].title}
                     </h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
                       {QUESTIONS[step - 1].options.map((opt, i) => (
                         <button
                           key={i}
                           onClick={() => handleAnswer(opt.type)}
                           className="text-left p-4 md:p-5 rounded-2xl border-2 border-zinc-100 bg-white hover:border-indigo-600 focus:border-indigo-600 hover:bg-indigo-50/30 hover:shadow-md transition-all group font-semibold text-zinc-700 hover:text-indigo-900 text-[15px] leading-relaxed flex flex-col justify-center min-h-[100px]"
                         >
                           {opt.text}
                         </button>
                       ))}
                     </div>
                   </motion.div>
                 )}

                 {/* Results */}
                 {step > QUESTIONS.length && result && (
                   <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-grow flex flex-col pt-2">
                     
                     <div className="text-center mb-8">
                       <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200/60 text-xs font-bold uppercase tracking-widest rounded-full mb-4 shadow-sm">
                         <Activity className="w-3.5 h-3.5" /> 測驗分析完成
                       </span>
                       <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight mb-2 leading-tight">
                         最適合你的發展領域是
                       </h2>
                       <div className="text-4xl md:text-5xl font-black text-indigo-600 tracking-tight my-4">
                         {result.title}
                       </div>
                       <p className="text-zinc-500 text-sm font-medium tracking-wide bg-zinc-100 inline-block px-4 py-1.5 rounded-full border border-zinc-200 mt-2">
                         核心優勢：{result.traits}
                       </p>
                     </div>

                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
                       {/* Radar Chart */}
                       <div className="bg-zinc-50 p-6 rounded-[2rem] border border-zinc-100 flex flex-col h-full min-h-[350px]">
                          <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-widest text-center mb-2">RIASEC 傾向雷達圖</h4>
                          <div className="flex-grow w-full -ml-3">
                            <ResponsiveContainer width="100%" height="100%">
                              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={result.chartData}>
                                <PolarGrid stroke="#e4e4e7" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 13, fontWeight: 600 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 6]} tick={false} axisLine={false} />
                                <Tooltip wrapperStyle={{ outline: 'none' }} cursor={{ fill: '#f4f4f5' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Radar name="興趣分數" dataKey="score" stroke="#4f46e5" strokeWidth={3} fill="#4f46e5" fillOpacity={0.4} />
                              </RadarChart>
                            </ResponsiveContainer>
                          </div>
                       </div>

                       {/* Description and Recommendations */}
                       <div className="flex flex-col gap-6">
                         <div className="bg-indigo-50/50 p-6 sm:p-8 rounded-[2rem] border border-indigo-100/60 shadow-sm relative overflow-hidden">
                           <div className="absolute -right-6 -top-6 text-indigo-100 opacity-50 z-0">
                             <BrainCircuit className="w-32 h-32" />
                           </div>
                           <h4 className="text-lg font-bold text-indigo-900 mb-3 relative z-10">人格特質解析</h4>
                           <p className="text-indigo-800/80 leading-relaxed text-[15px] relative z-10">
                             {result.desc}
                           </p>
                         </div>

                         <div className="p-6 sm:p-8 border-2 border-zinc-100 rounded-[2rem] bg-white">
                           <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-5 flex items-center">
                             為你推薦的群類
                           </h4>
                           <div className="flex flex-wrap gap-2.5">
                             {result.groupIds.map(id => {
                               const g = groupsData.find(x => x.id === id);
                               return g ? (
                                 <span key={id} className="px-4 py-2 bg-zinc-900 text-white shadow-md shadow-zinc-900/10 text-[14px] font-bold rounded-xl transition-transform hover:scale-105 cursor-default">
                                   {g.group}
                                 </span>
                               ) : null;
                             })}
                           </div>
                         </div>
                       </div>
                     </div>

                     <div className="flex justify-center mt-2">
                       <button 
                         onClick={reset}
                         className="px-8 py-3 bg-white text-zinc-600 font-bold rounded-full hover:bg-zinc-50 border-2 border-zinc-200 transition-colors inline-flex items-center justify-center gap-2"
                       >
                         <RotateCcw className="w-4 h-4" /> 重新測驗
                       </button>
                     </div>

                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

