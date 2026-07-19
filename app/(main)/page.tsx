import { LifeNavigator } from "@/components/navigator/life-navigator";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 selection:bg-primary/20">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl translate-x-1/2 pointer-events-none" />
        
        <LifeNavigator />
      </main>
    </div>
  );
}
