// import { Flower2 } from 'lucide-react';
// import { useTheme } from '../context/ThemeContext.tsx';

// export function Logo() {
//   const { isDark } = useTheme();

//   return (
//     <div className="flex items-center gap-2">
//       <Flower2 className={`w-8 h-8 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
//       <span className="text-xl font-semibold text-gray-800 dark:text-white transition-colors">
//         Spiritual Insights
//       </span>
//     </div>
//   );
// }
import { useTheme } from '../context/ThemeContext.tsx';
import hanumanImage from '../assets/newhanu.png';

export function Logo() {
  const { isDark } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <img 
        src={hanumanImage} 
        alt="Hanuman Logo" 
        className={`w-25 h-20 ${isDark ? 'filter invert' : ''}`} 
      />
      <span className={`text-xl font-semibold transition-colors ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
      Vayu Vani
      </span>
    </div>
  );
}