import { Metadata } from 'next';
import StatCard from '../components/dashboard/StatCard';
import QuickActions from '../components/dashboard/QuickActions';

export const metadata: Metadata = {
  title: 'Dashboard | Prashan',
  description: 'Manage your question papers and settings.',
};

export default function DashboardPage() {
  return (
    <div className="space-y-8 mt-20">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome back!</h2>
        <p className="text-foreground/60">Here's an overview of your recent activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Recent Papers" 
          value="0"
          description="You haven't generated any papers yet." 
        />
        
        <StatCard 
          title="Usage Stats" 
          value="0 / 10"
          description="Free generation credits used this month." 
        />
        
        <QuickActions />
      </div>
      
      {/* Expanded recent papers list could go below here */}
      <div className="mt-8">
        <h3 className="text-xl font-bold tracking-tight mb-4">Your Library</h3>
        <div className="p-8 rounded-2xl border border-black/10 dark:border-white/10 bg-white/30 dark:bg-white/5 flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <p className="text-foreground/50 mb-3">No papers found in your library.</p>
            <button className="text-sm font-medium hover:underline">
              Create your first test paper →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
