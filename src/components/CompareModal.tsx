import { motion, AnimatePresence } from 'motion/react';
import { GitCompare, X } from 'lucide-react';
import { DepartmentGroup, groupsData } from '../data';

export function CompareModal({ 
  isOpen, 
  onClose, 
  compareIds 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  compareIds: string[];
}) {
  const groupsToCompare = groupsData.filter(g => compareIds.includes(g.id));

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
             className="bg-white rounded-[2rem] max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-white/20 flex flex-col"
             onClick={e => e.stopPropagation()}
          >
             <div className="p-8 pb-6 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-md z-10 border-b border-zinc-100">
               <h2 className="text-2xl font-bold flex items-center text-zinc-900 tracking-tight">
                 <GitCompare className="w-6 h-6 mr-3 text-zinc-400" />
                 群類綜合比較
               </h2>
               <button 
                 onClick={onClose}
                 className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors"
               >
                 <X className="w-5 h-5" />
               </button>
             </div>
             
             <div className="p-6 md:p-8 overflow-x-auto">
               <table className="w-full text-left border-collapse min-w-[700px]">
                 <thead>
                   <tr>
                      <th className="p-4 border-b-2 border-zinc-200 bg-zinc-50 font-semibold text-zinc-500 w-32 rounded-tl-2xl">比較項目</th>
                      {groupsToCompare.map((g, i) => (
                        <th key={g.id} className={`p-4 border-b-2 border-zinc-200 bg-white font-bold text-xl text-zinc-900 shadow-sm ${i === groupsToCompare.length - 1 ? 'rounded-tr-2xl' : ''}`}>
                          {g.group}
                        </th>
                      ))}
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-zinc-100">
                   <tr className="hover:bg-zinc-50/50 transition-colors">
                     <td className="p-4 bg-zinc-50 text-sm font-semibold text-zinc-600">包含科別</td>
                     {groupsToCompare.map(g => (
                       <td key={g.id} className="p-4 align-top">
                         <div className="flex flex-wrap gap-1.5">
                           {g.departments.map(d => <span key={d} className="px-2 py-1 bg-zinc-100 border border-zinc-200/50 text-zinc-700 text-[13px] rounded-lg">{d}</span>)}
                         </div>
                       </td>
                     ))}
                   </tr>
                   <tr className="hover:bg-zinc-50/50 transition-colors">
                     <td className="p-4 bg-zinc-50 text-sm font-semibold text-zinc-600">數學卷別</td>
                     {groupsToCompare.map(g => (
                       <td key={g.id} className="p-4 font-medium">
                         <span className="inline-flex px-3 py-1.5 bg-zinc-100 rounded-full text-zinc-800 text-sm border border-zinc-200/60 font-bold">{g.math}</span>
                       </td>
                     ))}
                   </tr>
                   <tr className="hover:bg-zinc-50/50 transition-colors">
                     <td className="p-4 bg-zinc-50 text-sm font-semibold text-zinc-600 align-top">專業科目(一)</td>
                     {groupsToCompare.map(g => (
                       <td key={g.id} className="p-4 align-top">
                          <p className="text-zinc-700 text-sm leading-relaxed p-4 bg-zinc-50/70 rounded-xl border border-zinc-100 shadow-inner shadow-zinc-200/20">{g.subject1}</p>
                       </td>
                     ))}
                   </tr>
                   <tr className="hover:bg-zinc-50/50 transition-colors">
                     <td className="p-4 bg-zinc-50 text-sm font-semibold text-zinc-600 align-top rounded-bl-2xl">專業科目(二)</td>
                     {groupsToCompare.map((g, i) => (
                       <td key={g.id} className={`p-4 align-top ${i === groupsToCompare.length - 1 ? 'rounded-br-2xl' : ''}`}>
                          <p className="text-zinc-700 text-sm leading-relaxed p-4 bg-zinc-50/70 rounded-xl border border-zinc-100 shadow-inner shadow-zinc-200/20">{g.subject2}</p>
                       </td>
                     ))}
                   </tr>
                 </tbody>
               </table>
             </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
