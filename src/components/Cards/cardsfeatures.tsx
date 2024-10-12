import { FeatureCard } from './feature-card';
import { featuresList } from './features-list';

export function FeaturesGrid() {
  return (
    <div className="flex justify-center bg-transparent py-[72px] text-white  sm:py-24">
      <div className="container">
        <h2 className="text-center text-7xl font-extrabold tracking-tighter text-blue-800 dark:text-white sm:text-6xl">
  everything you need to know
        </h2>
        <div className="mx-auto max-w-xl">
          <p className="mt-5 text-center text-xl text-slate-700 dark:text-white/80 font-semibold " >
            Enjoy customizable lists, team work tools, and smart tracking all in
            one place. Set tasks, get reminders, and see your progress simply
            and quickly.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuresList.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} href={'/pricing'} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturesGrid;