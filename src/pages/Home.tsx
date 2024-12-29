// import { useState, useEffect } from 'react';
// import { ArrowRight } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../lib/supabase';
// import { commonStyles } from '../styles/common.ts';

// interface Blog {
//   id: string;
//   title: string;
//   content: string;
//   thumbnail_url: string;
//   created_at: string;
//   excerpt: string;
// }

// export function Home() {
//   const navigate = useNavigate();
//   const [blogs, setBlogs] = useState<Blog[]>([]);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       const { data, error } = await supabase
//         .from('posts')
//         .select('*')
//         .order('created_at', { ascending: false })
//         .limit(3);

//       if (error) {
//         console.error('Error fetching blogs:', error);
//       } else {
//         console.log(data);
//         setBlogs(data as Blog[]);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   const handleBlogClick = (id: string) => {
//     navigate(`/blog/${id}`);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
//       <div className={commonStyles.container}>
//         <div className="text-center">
//           <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
//           Hari Sarvottama,
//             <span className="text-indigo-600 dark:text-indigo-400"> Vayu Jeevottama</span>
//           </h1>
//           <p className="mt-3 max-w-md mx-auto text-base text-gray-700 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
//           Experience the Truth of Hari and the Grace of Vayu.
//           </p>
//           <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
//             <button
//               onClick={() => navigate('/blogs')}
//               className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
//             >
//               Start Reading
//               <ArrowRight className="ml-2 w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         <div className="mt-10">
//           <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//             {blogs.map((post) => (
//               <div
//                 key={post.id}
//                 className="bg-white dark:bg-gray-800 rounded-lg shadow-lg shadow-indigo-500/50 overflow-hidden cursor-pointer transition-colors hover:bg-indigo-50 dark:hover:bg-gray-700"
//                 onClick={() => handleBlogClick(post.id)}
//               >
//                 <img
//                   className="h-48 w-full object-cover object-top"
//                   src={post.thumbnail_url}
//                   alt={post.title}
//                 />
//                 <div className="p-6">
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{post.title}</h3>
//                   <p className="mt-2 text-gray-700 dark:text-gray-300">{post.excerpt}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { commonStyles } from '../styles/common.ts';

interface Blog {
  id: string;
  title: string;
  content: string;
  thumbnail_url: string;
  created_at: string;
  excerpt: string;
}

export function Home() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching blogs:', error);
      } else {
        // console.log(data);
        setBlogs(data as Blog[]);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (id: string) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="flex-grow bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className={commonStyles.container}>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          Hari Sarvottama,
            <span className="text-indigo-600 dark:text-indigo-400"> Vayu Jeevottama</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-700 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          (Lord Vishnu is the Supreme Being, and Lord Vayu is the supreme among all the souls.)
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <button
              onClick={() => navigate('/blogs')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Start Reading
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {blogs.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg shadow-indigo-500/50 overflow-hidden cursor-pointer transition-colors hover:bg-indigo-50 dark:hover:bg-gray-700"
                onClick={() => handleBlogClick(post.id)}
              >
                <img
                  className="h-48 w-full object-cover object-top"
                  src={post.thumbnail_url}
                  alt={post.title}
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{post.title}</h3>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}