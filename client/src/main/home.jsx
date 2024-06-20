//components I use here..
import { Mark } from "./../components/mark.jsx";

const html = (
  <div>
    <h1 className="text-[40px] flex">Welcome to</h1>

    <Mark size="25%" fontsize="30px" bgcolorhex="#ffffff"/>

    <p>Here you can post anything you think!</p>
  </div>
)

export default function MyApp() {
    return html;
}