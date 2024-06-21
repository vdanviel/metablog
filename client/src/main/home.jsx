//components I use here..
import Mark from "./../components/mark.jsx";
import Button from "./../components/button.jsx";

const html = (
  
  <div>

    <div className="flex justify-center items-center flex-col text-center text-[25px] rounded-[16px] bg-white p-5 m-5">
      <p>Welcome to</p>

      <Mark bgcolorhex="#f0f8ff"/>

      <p>Here you can post anything you think!</p>
    </div>

    <Button bg_color="#3b82f6" hover_bg_color="#ffffff" font_color="white" content="Começar" type="submit" />

  </div>

)

export default function Home() {
    return html;
}