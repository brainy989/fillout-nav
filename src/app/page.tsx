import Navigation from "./components/Navigation";

const Home: React.FC = () => (
  <div className="grid grid-rows-[min-content_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <Navigation />
  </div>
);

export default Home;
