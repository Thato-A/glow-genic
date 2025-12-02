import Header from "./Header";
import Hero from "./Hero";
import SkinDiary from "./SkinDiary";
import SkinFlow from "./SkinFlow";
import Testimonials from "./Testimonials";

function App() {
  const isLoggedIn = true;
  return (
    <>
      <Header />
      <Hero />
      <SkinFlow />
      <Testimonials />
      {isLoggedIn && <SkinDiary />}
    </>
  );
}

export default App;
