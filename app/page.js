import Image from "next/image";
<<<<<<< HEAD
import Squares from "@/components/home/Squares";
=======
import Hero from "@/components/home/Hero";
import Auth from "@/components/Auth";
import Shop from "@/components/Shop";
>>>>>>> c977e60c2680ce2a61c7435d251cc96173c06306

export default function Home() {
  return (
    <>
<<<<<<< HEAD
      <Squares
        speed={0.5}
        squareSize={40}
        direction="diagonal" // up, down, left, right, diagonal
        borderColor="#fff"
        hoverFillColor="#F70000"
      />
=======
    {/* <Hero/> */}
    <Shop/>

>>>>>>> c977e60c2680ce2a61c7435d251cc96173c06306
    </>
  );
}
