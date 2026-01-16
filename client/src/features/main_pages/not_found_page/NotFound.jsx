import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="m-auto flex flex-col items-center gap-10">
      <p className="text-[50px] font-bold uppercase [word-spacing:0.5cm] [letter-spacing: 0.1cm]">
        Page not found
      </p>
      <p className="text-[30px]">
        Get back to{" "}
        <Link to="/" className="underline cursor-pointer hover:text-chart-2">
          Home Page
        </Link>
      </p>
    </div>
  );
}
