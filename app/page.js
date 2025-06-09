import Image from "next/image";
import Squares from "@/components/home/Squares";

export default function Home() {
  return (
    <>
      <Squares
        speed={0.5}
        squareSize={40}
        direction="diagonal" // up, down, left, right, diagonal
        borderColor="#fff"
        hoverFillColor="#F70000"
      />
    </>
  );
}
