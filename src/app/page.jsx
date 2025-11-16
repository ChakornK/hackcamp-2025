"use client";
import { useRouter } from "next/navigation";
import { Clock, TrendingUp, Users, Award, ArrowRight, CheckCircle } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto px-8 py-20 max-w-7xl">
          <div className="items-center gap-12 grid grid-cols-1 lg:grid-cols-2">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-blue-100 px-4 py-2 rounded-full font-semibold text-blue-600 text-sm">
                  📚 Study Smarter, Not Harder
                </span>
              </div>
              
              <h1 className="font-black text-gray-900 text-6xl leading-tight">
                Transform Your Study Habits with{" "}
                <span className="bg-clip-text">
                  Reel Rewards
                </span>
              </h1>
              
              <p className="text-gray-600 text-xl leading-relaxed">
                Track your study sessions, compete with friends, and build lasting habits. 
                The ultimate productivity tool for students who want to excel.
              </p>
              
              <div className="flex gap-4">
                <button
                  onClick={() => router.push("/")}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg px-8 py-4 rounded-xl font-semibold text-white text-lg hover:scale-105 transition-all"
                >
                  Get Started Free
                  <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => router.push("/signup")}
                  className="bg-white hover:bg-gray-50 px-8 py-4 border-2 border-gray-200 rounded-xl font-semibold text-gray-900 text-lg transition-all"
                >
                  Sign Up
                </button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-gray-600">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-gray-600">Free forever</span>
                </div>
              </div>
            </div>

            {/* Right Content - Dashboard Preview */}
            <div className="relative">
              <div className="z-10 relative bg-gray-100 shadow-2xl p-6 rounded-2xl outline-2 outline-gray-300 hover:scale-105 transition-transform transform">
                <div className="p-8 rounded-xl text-black">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-black text-sm">Your Progress</p>
                      <h3 className="font-bold text-3xl">5 Day Streak 🔥</h3>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-full">
                      <Award size={32} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span>Study Time Today</span>
                        <span className="font-bold">2h 30m</span>
                      </div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span>Rank</span>
                        <span className="font-bold">#3 of 12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="-top-4 -right-4 absolute bg-green-100 opacity-100 blur-xl rounded-full w-80 h-80 animate-blob mix-blend-multiply filter"></div>
              <div className="-bottom-8 -left-4 absolute bg-orange-100 opacity-100 blur-xl rounded-full w-80 h-80 animate-blob animation-delay-2000 mix-blend-multiply filter"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="mx-auto px-8 max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-gray-900 text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="text-gray-600 text-xl">
              Powerful features to help you stay focused and motivated
            </p>
          </div>

          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Clock className="text-blue-600" size={32} />}
              title="Pomodoro Timer"
              description="Stay focused with built-in study timers and break reminders"
              color="blue"
            />
            <FeatureCard
              icon={<TrendingUp className="text-green-600" size={32} />}
              title="Track Progress"
              description="Visualize your study patterns with beautiful charts and stats"
              color="green"
            />
            <FeatureCard
              icon={<Users className="text-purple-600" size={32} />}
              title="Compete with Friends"
              description="Join leaderboards and motivate each other to study more"
              color="purple"
            />
            <FeatureCard
              icon={<Award className="text-orange-600" size={32} />}
              title="Build Streaks"
              description="Maintain daily study streaks and earn achievements"
              color="orange"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white">
        <div className="mx-auto px-8 max-w-7xl">
          <div className="gap-12 grid grid-cols-1 md:grid-cols-3 text-center">
            <StatCard number="10,000+" label="Active Students" />
            <StatCard number="1M+" label="Study Hours Tracked" />
            <StatCard number="50K+" label="Goals Achieved" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20">
        <div className="mx-auto px-8 max-w-4xl text-center">
          <h2 className="mb-6 font-bold text-gray-900 text-5xl">
            Ready to Level Up Your Studies?
          </h2>
          <p className="mb-8 text-gray-600 text-xl">
            Join thousands of students who are already achieving their goals with Reel Rewards
          </p>
          <button
            onClick={() => router.push("/signup")}
            className="bg-blue-600 hover:bg-blue-700 shadow-lg px-12 py-5 rounded-xl font-semibold text-white text-xl hover:scale-105 transition-all"
          >
            Start Your Journey Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="mx-auto px-8 max-w-7xl text-center">
          <h3 className="mb-4 font-bold text-2xl">Reel Rewards</h3>
          <p className="text-gray-400">
            © 2025 Reel Rewards. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description, color }) {
  const colorClasses = {
    blue: "bg-blue-50 hover:bg-blue-100 border-blue-200",
    green: "bg-green-50 hover:bg-green-100 border-green-200",
    purple: "bg-purple-50 hover:bg-purple-100 border-purple-200",
    orange: "bg-orange-50 hover:bg-orange-100 border-orange-200",
  };

  return (
    <div className={`${colorClasses[color]} border-2 rounded-2xl p-6 transition-all hover:shadow-lg cursor-pointer`}>
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 font-bold text-gray-900 text-xl">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div>
      <p className="mb-2 font-bold text-5xl">{number}</p>
      <p className="text-blue-100 text-xl">{label}</p>
    </div>
  );
}