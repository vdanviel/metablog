//components I use here..
import Mark from "./../components/mark.jsx";
import Button from "./../components/button.jsx";

export default function Home() {

    const handle_click = () => {

      window.location.href = window.location + "sign-up";
    
    }

    const html = (
  
      <div className="flex justify-center items-center flex-col">
    
      <h1 className="flex text-[20px] font-bold	items-center gap-2">
        made by <img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"/> vdanviel
      </h1>
    
        <div className="flex justify-center items-center flex-col text-center text-[25px] rounded-[16px] bg-white p-5 m-5">
          <p>Welcome to</p>
    
          <Mark gradient={true} intercolor="#ffffff" bgcolorhex="#3b82f6"/>
    
          <p>Here you can post anything you think!</p>
        </div>
    
        <Button bg_color="#3b82f6" hover_bg_color="#4f65ff" font_color="white" content="Let's Begin" txtsize="20px" type="submit" onClick={handle_click}/>
    
      </div>
    
    )

    return html;
}