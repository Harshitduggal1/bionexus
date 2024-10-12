"use client"

import Tabs from '@/components/Tabs';


const GridTabs = () => {
  return (
    <div className="min-h-screen bg-transparent text">
      <main className="flex flex-col items-center justify-center py-10">
        <h1 className="text-7xl font-extrabold text-purple-800 dark:text-white mb-8">
          The Solutions  We Offers
       
        </h1>
        <Tabs />
      </main>
    </div>
  );
}

export default GridTabs;

