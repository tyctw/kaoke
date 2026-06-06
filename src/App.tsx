import { useState, useMemo } from 'react';
import { Search, Calculator, GraduationCap, X, ChevronRight, Hash, Focus, Menu, Clock, Target, Share2, ExternalLink, GitCompare, Sparkles, CheckSquare, Square } from 'lucide-react';
import { groupsData, DepartmentGroup } from './data';
import { CompareModal } from './components/CompareModal';
import { CareerTestModal } from './components/CareerTestModal';

function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200/60 shadow-sm">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center shadow-md shadow-zinc-900/20">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-zinc-900 tracking-tight text-lg">高職群科總覽</span>
        </div>

        {/* Top-right Navigation Menu */}
        <div>
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 bg-zinc-100 focus:bg-zinc-200 hover:bg-zinc-200 rounded-full transition-colors text-zinc-700 focus:outline-none"
            aria-label="選單"
          >
            <Menu className="w-5 h-5" />
          </button>

          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 bg-zinc-900/40 backdrop-blur-sm" 
                  onClick={() => setIsOpen(false)} 
                />
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed top-0 right-0 h-screen w-72 sm:w-80 bg-white shadow-2xl z-50 flex flex-col pt-1"
                >
                  <div className="p-4 flex items-center justify-between border-b border-zinc-100">
                     <span className="font-bold text-zinc-900 text-lg ml-2 tracking-tight">導覽選單</span>
                     <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 bg-zinc-100 focus:bg-zinc-200 hover:bg-zinc-200 rounded-full transition-colors text-zinc-700 focus:outline-none"
                      >
                       <X className="w-5 h-5" />
                     </button>
                  </div>
                  <div className="p-4 flex flex-col gap-2 flex-grow overflow-y-auto">
                    <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest pl-2 mb-2 mt-2">實用工具連結</div>
                    <a href="https://tyctw.github.io/clock/" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900 transition-colors group">
                      <div className="bg-indigo-50 p-2.5 rounded-xl group-hover:bg-indigo-100 transition-colors text-indigo-500">
                        <Clock className="w-5 h-5" />
                      </div>
                      <span className="font-bold flex-grow text-[15px]">會考倒數</span>
                      <ExternalLink className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <a href="https://tyctw.github.io/spare/" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900 transition-colors group">
                      <div className="bg-emerald-50 p-2.5 rounded-xl group-hover:bg-emerald-100 transition-colors text-emerald-500">
                        <Target className="w-5 h-5" />
                      </div>
                      <span className="font-bold flex-grow text-[15px]">會考落點分析</span>
                      <ExternalLink className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <a href="https://tyctw.github.io/shared/" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900 transition-colors group">
                      <div className="bg-amber-50 p-2.5 rounded-xl group-hover:bg-amber-100 transition-colors text-amber-500">
                        <Share2 className="w-5 h-5" />
                      </div>
                      <span className="font-bold flex-grow text-[15px]">會考錄取分享</span>
                      <ExternalLink className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                  <div className="p-6 bg-zinc-50 border-t border-zinc-100 mt-auto">
                    <p className="text-xs text-zinc-400 text-center font-semibold">給會考生的最強指南</p>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
import { motion, AnimatePresence } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function GroupCard({ 
  group, 
  isSelected, 
  onToggleSelect, 
  disableSelection 
}: { 
  group: DepartmentGroup; 
  isSelected?: boolean;
  onToggleSelect?: () => void;
  disableSelection?: boolean;
}) {
  // Determine badge color based on Math type
  const mathColorClass = useMemo(() => {
    if (group.math.includes('A')) return 'bg-orange-50 text-orange-700 border-orange-200/60';
    if (group.math.includes('B')) return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
    if (group.math.includes('C')) return 'bg-indigo-50 text-indigo-700 border-indigo-200/60';
    return 'bg-zinc-100 text-zinc-600 border-zinc-200';
  }, [group.math]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={itemVariants} 
      className={`flex flex-col bg-white rounded-3xl border transition-all duration-300 overflow-hidden group relative ${
        isSelected ? 'border-zinc-900 shadow-xl shadow-zinc-900/10' : 'border-zinc-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1'
      }`}
    >
      <div className="p-6 flex-grow flex flex-col gap-5 relative">
        
        {/* Compare Checkbox */}
        {onToggleSelect && (
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleSelect(); }}
            disabled={!isSelected && disableSelection}
            title={!isSelected && disableSelection ? "最多選擇三個進行比較" : "加入比較"}
            className={`absolute top-6 right-6 z-10 transition-colors ${
              !isSelected && disableSelection ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:scale-110'
            } ${isSelected ? 'text-zinc-900' : 'text-zinc-300 hover:text-zinc-500'}`}
          >
            {isSelected ? <CheckSquare className="w-6 h-6" /> : <Square className="w-6 h-6" />}
          </button>
        )}

        {/* Header */}
        <div className="flex flex-col items-start gap-3 pr-8">
          <h3 className="text-xl font-semibold text-zinc-900 tracking-tight leading-tight">{group.group}</h3>
          <span className={`shrink-0 px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold border ${mathColorClass}`}>
            {group.math}
          </span>
        </div>

        {/* Departments */}
        <div>
          <div className="flex flex-wrap gap-1.5">
            {group.departments.map(dept => (
               <span key={dept} className="px-2.5 py-1 text-[13px] font-medium bg-zinc-100 text-zinc-600 border border-zinc-200/50 rounded-lg group-hover:bg-zinc-100/50 transition-colors">
                 {dept}
               </span>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-zinc-100 my-1" />

        {/* Subjects */}
        <div className="flex flex-col gap-4 mt-auto">
          <div>
            <div className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase mb-1.5 flex items-center gap-1.5">
              <Hash className="w-3 h-3" />
              專業科目 (一)
            </div>
            <p className="text-sm text-zinc-700 font-medium leading-relaxed">{group.subject1}</p>
          </div>
          <div>
            <div className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase mb-1.5 flex items-center gap-1.5">
              <Focus className="w-3 h-3" />
              專業科目 (二)
            </div>
            <p className="text-sm text-zinc-700 font-medium leading-relaxed">{group.subject2}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ScoringModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.2 }}
           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm"
           onClick={onClose}
        >
          <motion.div
             initial={{ opacity: 0, scale: 0.95, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.95, y: 20 }}
             transition={{ type: "spring", duration: 0.5, bounce: 0 }}
             className="bg-white rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-white/20"
             onClick={e => e.stopPropagation()}
          >
             <div className="p-8 pb-6 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-10">
               <h2 className="text-2xl font-bold flex items-center text-zinc-900 tracking-tight">
                 <Calculator className="w-6 h-6 mr-3 text-zinc-400" />
                 統測計分方式與附註
               </h2>
               <button 
                 onClick={onClose}
                 className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors"
               >
                 <X className="w-5 h-5" />
               </button>
             </div>
             
             <div className="p-8 pt-2 space-y-8">
               <section>
                 <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">各科原始分數</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                   <div className="p-4 bg-zinc-50 rounded-2xl">
                     <div className="font-semibold text-zinc-900 flex justify-between">
                       <span>國文</span>
                       <span className="text-zinc-500">100分</span>
                     </div>
                     <div className="text-xs text-zinc-500 mt-2">選擇題佔 76 分、作文佔 24 分</div>
                   </div>
                   <div className="p-4 bg-zinc-50 rounded-2xl">
                     <div className="font-semibold text-zinc-900 flex justify-between">
                       <span>英文</span>
                       <span className="text-zinc-500">100分</span>
                     </div>
                     <div className="text-xs text-zinc-500 mt-2">選擇題 ≧ 82 分、非選 ≦ 18 分</div>
                   </div>
                   <div className="p-4 bg-zinc-50 rounded-2xl flex justify-between items-center">
                     <span className="font-semibold text-zinc-900">數學</span>
                     <span className="text-sm text-zinc-500 font-medium">100分</span>
                   </div>
                   <div className="p-4 bg-zinc-50 rounded-2xl flex justify-between items-center">
                     <span className="font-semibold text-zinc-900">專業科目（一）</span>
                     <span className="text-sm text-zinc-500 font-medium">100分</span>
                   </div>
                   <div className="p-4 bg-zinc-50 rounded-2xl flex justify-between items-center md:col-span-2">
                     <span className="font-semibold text-zinc-900">專業科目（二）</span>
                     <span className="text-sm text-zinc-500 font-medium">100分</span>
                   </div>
                   <div className="p-5 bg-zinc-900 text-white rounded-2xl md:col-span-2 flex justify-between items-center shadow-lg shadow-zinc-900/20 mt-2">
                     <span className="font-bold tracking-wide">原始總分共計</span> 
                     <span className="text-xl font-bold">500分</span>
                   </div>
                 </div>
               </section>

               <div className="h-px w-full bg-zinc-100" />

               <section>
                 <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">登記分發專業加重計分</h3>
                 <div className="bg-zinc-50 p-5 rounded-2xl text-zinc-700 leading-relaxed text-sm shadow-inner shadow-zinc-200/20">
                   <p className="mb-3">
                     <strong className="text-zinc-900">108學年度起</strong>，四技二專日間部聯合登記分發入學採各科目彈性權重，改採各招生校系自主選擇各考科權重。
                   </p>
                   <ul className="space-y-2">
                     <li className="flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                       國文、英文及數學之共同科目權重為 <strong className="text-zinc-900 mx-1">1 至 2 倍</strong> 之間。
                     </li>
                     <li className="flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                       專業科目權重為 <strong className="text-zinc-900 mx-1">2 至 3 倍</strong> 之間。
                     </li>
                   </ul>
                 </div>
                 
                 <div className="mt-8 h-72">
                   <ResponsiveContainer width="100%" height="100%">
                     <BarChart 
                       data={[
                         { name: '國文', minWeight: 1, maxWeight: 2 },
                         { name: '英文', minWeight: 1, maxWeight: 2 },
                         { name: '數學', minWeight: 1, maxWeight: 2 },
                         { name: '專業(一)', minWeight: 2, maxWeight: 3 },
                         { name: '專業(二)', minWeight: 2, maxWeight: 3 },
                       ]} 
                       margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
                     >
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" />
                       <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717A', fontSize: 13, fontWeight: 500 }} dy={10} />
                       <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A1A1AA', fontSize: 12 }} domain={[0, 4]} tickCount={5} />
                       <Tooltip 
                         cursor={{ fill: '#F4F4F5' }} 
                         contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', padding: '12px 16px' }} 
                       />
                       <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '13px' }} />
                       <Bar dataKey="minWeight" name="最低權重" fill="#D4D4D8" radius={[6, 6, 0, 0]} barSize={24} />
                       <Bar dataKey="maxWeight" name="最高權重" fill="#27272A" radius={[6, 6, 0, 0]} barSize={24} />
                     </BarChart>
                   </ResponsiveContainer>
                 </div>
               </section>
             </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mathFilter, setMathFilter] = useState('ALL');
  const [isScoringModalOpen, setIsScoringModalOpen] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isCareerTestModalOpen, setIsCareerTestModalOpen] = useState(false);

  const filteredGroups = useMemo(() => {
    return groupsData.filter(group => {
      const matchSearch = group.group.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          group.departments.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchMath = mathFilter === 'ALL' || group.math.includes(mathFilter);
      return matchSearch && matchMath;
    });
  }, [searchTerm, mathFilter]);

  const handleToggleCompare = (id: string) => {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter(cid => cid !== id));
    } else {
      if (compareIds.length < 3) {
        setCompareIds([...compareIds, id]);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-zinc-200 selection:text-zinc-900 relative">
      <SiteHeader />
      
      {/* Hero Header */}
      <header className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 text-white text-xs font-semibold tracking-wide mb-6 shadow-md shadow-zinc-900/20">
              <GraduationCap className="w-3.5 h-3.5" />
              會考生的第一指南
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight mb-5 leading-tight">
              探索未來，從選對群科開始
            </h1>
            <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
              高職群科別總覽與統測專業考科。為你整理最完整的升學對應資訊，不再為選擇感到迷惘。
            </p>
          </motion.div>
        </div>

         {/* Decorative subtle background blobs */}
         <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] left-1/2 -translate-x-[80%] w-[30rem] h-[30rem] bg-orange-100/50 rounded-full mix-blend-multiply blur-3xl opacity-60" />
            <div className="absolute top-[20%] left-1/2 translate-x-[-10%] w-[35rem] h-[35rem] bg-indigo-100/50 rounded-full mix-blend-multiply blur-3xl opacity-60" />
         </div>
      </header>

      {/* Controls Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-16 relative z-10 mt-2">
         <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-2.5 rounded-[1.5rem] shadow-xl shadow-zinc-200/40 border border-zinc-200/60 flex flex-col md:flex-row gap-2"
         >
           {/* Search Input */}
           <div className="relative flex-grow flex items-center px-4 py-2 hover:bg-zinc-50 rounded-2xl transition-colors group">
              <Search className="w-5 h-5 text-zinc-400 mr-3 group-focus-within:text-zinc-800 transition-colors" />
              <input 
                type="text" 
                className="w-full bg-transparent border-none outline-none text-zinc-800 placeholder-zinc-400 text-base font-medium" 
                placeholder="搜尋科系或群類 (例如：電機, 設計)..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>

           <div className="hidden md:block w-px bg-zinc-200 my-2" />

           {/* Filters */}
           <div className="flex items-center gap-1 overflow-x-auto p-1.5 no-scrollbar shrink-0">
              {[
                { id: 'ALL', label: '全部數學卷' },
                { id: 'A', label: '數學 (A)' },
                { id: 'B', label: '數學 (B)' },
                { id: 'C', label: '數學 (C)' }
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => setMathFilter(type.id)}
                  className={`px-4 py-2 text-[13px] font-bold rounded-xl whitespace-nowrap transition-all duration-200 ${
                    mathFilter === type.id 
                      ? 'bg-zinc-900 text-white shadow-md shadow-zinc-900/20' 
                      : 'bg-transparent text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                  }`}
                >
                  {type.label}
                </button>
              ))}
           </div>
         </motion.div>

         {/* Quick Info Trigger */}
         <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex justify-center gap-4 flex-wrap"
         >
           <button 
              onClick={() => setIsCareerTestModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-zinc-900 shadow-xl shadow-zinc-900/20 hover:bg-zinc-800 hover:-translate-y-0.5 transition-all"
           >
              <Sparkles className="w-4 h-4 text-amber-300" />
              性向與興趣探索測驗
           </button>
           <button 
              onClick={() => setIsScoringModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-zinc-700 bg-white border border-zinc-200/80 hover:bg-zinc-50 hover:text-zinc-900 hover:border-zinc-300 hover:shadow-sm transition-all"
           >
              <Calculator className="w-4 h-4 text-zinc-400" />
              查看統測計分加權規則
           </button>
         </motion.div>
      </div>

      {/* Main Content Grid */}
      <main className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <AnimatePresence>
          {filteredGroups.length === 0 ? (
            <motion.div 
               key="empty"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="text-center py-24 bg-white rounded-[2rem] border border-dashed border-zinc-300 shadow-sm"
            >
              <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-zinc-300" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-1">找不到相關的科系</h3>
              <p className="text-zinc-500">請嘗試使用其他關鍵字，或清除篩選條件設定</p>
            </motion.div>
          ) : (
            <motion.div 
               key="grid"
               variants={containerVariants}
               initial="hidden"
               animate="show"
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredGroups.map((group) => (
                <GroupCard 
                  key={group.id} 
                  group={group} 
                  isSelected={compareIds.includes(group.id)}
                  onToggleSelect={() => handleToggleCompare(group.id)}
                  disableSelection={compareIds.length >= 3 && !compareIds.includes(group.id)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <ScoringModal 
        isOpen={isScoringModalOpen} 
        onClose={() => setIsScoringModalOpen(false)} 
      />

      <CompareModal 
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        compareIds={compareIds}
      />

      <CareerTestModal 
        isOpen={isCareerTestModalOpen}
        onClose={() => setIsCareerTestModalOpen(false)}
      />

      {/* Floating Action Bar for Compare */}
      <AnimatePresence>
        {compareIds.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-40 bg-zinc-900/95 backdrop-blur-md text-white px-4 py-3 rounded-[2rem] shadow-2xl flex items-center gap-4 md:gap-6 border border-zinc-700 pointer-events-auto"
          >
            <div className="flex items-center gap-3">
              <div className="bg-zinc-800 p-2 rounded-full hidden sm:block">
                 <GitCompare className="w-5 h-5 text-zinc-300" />
              </div>
              <span className="font-semibold text-[13px] md:text-sm whitespace-nowrap">已選擇 {compareIds.length} / 3 個<span className="hidden sm:inline">群類比較</span></span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <button 
                onClick={() => setIsCompareModalOpen(true)} 
                disabled={compareIds.length < 2}
                className={`px-4 py-2 rounded-full font-bold text-[13px] md:text-sm transition-all whitespace-nowrap ${
                  compareIds.length >= 2 
                    ? 'bg-white text-zinc-900 hover:bg-zinc-100 hover:scale-105 shadow-md' 
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                }`}
              >
                {compareIds.length < 2 ? '請再選 1 個' : '開始比較'}
              </button>
              <button 
                onClick={() => setCompareIds([])} 
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors ml-1"
                aria-label="清除選擇"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

