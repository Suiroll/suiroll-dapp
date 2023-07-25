import DiceBoard from "../components/dice";
import Stats from "../components/stats";

const Home = () => {
  return (
    <div className="col-start-1 col-span-2">
      <Stats />
      <div className="mb-6" ></div>
      <DiceBoard />
    </div>
  );
}

export default Home;
