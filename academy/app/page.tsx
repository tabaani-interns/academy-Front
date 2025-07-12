import NewsLetter from "@/components/NewsLetter";

"useClient"
import LargeHero from "@/components/LargeHero";
import SearchPanel from "@/components/SearchPanel";
import NewCourses from "@/components/NewCourses";
import TopCourses from "@/components/TopCourses";



export default function Home() {
  return (
    <div className="min-h-screen bg-white">
        <LargeHero />
        <SearchPanel />
        <NewCourses />
        <TopCourses />
        <NewsLetter/>



      {/* Additional content can go here */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-h2 font-bold text-black mb-4">
            Why Choose Academy?
          </h2>
          <p className="text-body text-black-75 mb-8">
            Experience the difference with our innovative learning platform
          </p>
        </div>
      </main>
    </div>
  );
}
