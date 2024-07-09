import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaImage } from "react-icons/fa6";

export default function PublicateForm(props) {
    //props
    const {id_user ,nick, photo, done} = props;

    //vars..
    const navigate = useNavigate();

    //state vars..
    const [btnActivate, setbtnDesativate] = useState(true);
    const [btnText, setbtnText] = useState("Write something to publish...");
    const [Published, setPublished] = useState(done);
    

    const [content, setContent] = useState("");
    const [mediaFiles, setMediaFiles] = useState(null);
    const [mediaPreviews, setMediaPreviews] = useState(null);

    //local funcs..
    const handleMediaChange = (e) => {
        const media = Object.values(e.target.files);//tranformando em array dos valores desse objeto

        setMediaFiles(media);

        previewMedia(media);

        setbtnText("Publish")
        document.querySelector('#btn').classList.remove('bg-gray-200');
        setbtnDesativate(false)

    };

    const handleContentChange = (e) => {
        setContent(e.target.value);

        if (e.target.value == "") {
            setbtnText("Write something to publish...")
            document.querySelector('#btn').classList.add('bg-gray-200');
            setbtnDesativate(true)

        }else{
            setbtnText("Publish")
            document.querySelector('#btn').classList.remove('bg-gray-200');
            setbtnDesativate(false)
        }

    };

    const previewMedia = (files) => {
        const previewList = files.map((file, index) => {
            if (file.type.startsWith('image')) {
                return (
                    <a key={index} target="_blank" href={URL.createObjectURL(file)}>
                        
                        <img
                            key={index}
                            className="w-16 object-cover h-16 rounded-lg"
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index}`}
                        />

                    </a>
                );
            } else if (file.type.startsWith('video')) {
                return (
                    <a key={index} target="_blank" href={URL.createObjectURL(file)}>
                        <video
                            key={index}
                            className="w-16 h-16 rounded-lg"
                            muted
                            loop
                            >
                            <source src={URL.createObjectURL(file)} type={file.type} />
                            Your browser does not support the video tag.
                        </video>
                    </a>
                );
            } else {
                return null;
            }
        });
    
        setMediaPreviews(previewList); // Set state with the preview list

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setbtnText("Just a sec...");
        setbtnDesativate(true);

        document.querySelector("#textContent").classList.remove('border-red-400');
        document.querySelector("#error_content").innerHTML = ""

        let formdata = new FormData();
        formdata.append("id_user", id_user);
        formdata.append("content", content);
        
        mediaFiles.map(file => {

            formdata.append("medias", file, "files");

        })        

        const response = await fetch("http://localhost:8005/post", 
            {
                method: 'POST',
                mode: "cors",
                body: formdata,
                redirect: 'follow'
            }
        );

        const data = await response.json();

        if (data.status == false) {
            
            document.querySelector("#textContent").classList.add('border-red-400');
            document.querySelector("#error_content").innerHTML = data.text

        }

        document.querySelector('#preview_list').innerHTML = ""

        setbtnText("Write something to publish...");
        setbtnDesativate(false);

    };

    return (
        <form className="min-w-[38vh] overflow-hidden bg-white rounded-[16px] lg:shadow-lg">
            
            <div className="px-4 py-2">
                <div className="flex items-center gap-1 mb-3">
                    <img
                        className="w-[30px] h-[30px] rounded-full object-cover"
                        src={photo || "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-256.png"}
                        alt="profile_pic"
                    />
                    <p className="text-xs font-bold text-gray-800">@{nick}</p>
                </div>
                <textarea
                    id="textContent"
                    value={content}
                    onChange={handleContentChange}
                    className="mt-1 text-sm text-gray-600 w-full rounded-[16px] border p-2"
                    rows={6}
                    placeholder="What's on your mind?"
                />
                <small id="error_content" className="font-bold text-[#f01313] pl-2"></small>
            </div>

            {/* midia preview */}
            <div id="preview_list" className="inline-flex px-4 gap-4 overflow-x-auto">
                {mediaPreviews}
            </div>

            <div className="px-4 py-2 flex justify-between items-center bg-[#3b82f6]">

                <label htmlFor="media-upload" className="text-sm text-black cursor-pointer p-2 font-bold bg-white rounded-[16px]">
                    
                    <FaImage size={15}/>

                </label>

                <input
                    type="file"
                    id="media-upload"
                    onChange={handleMediaChange}
                    multiple
                    accept="video/*, image/*"
                    className="hidden"
                />

                <button
                    type="submit"
                    id="btn"
                    onClick={handleSubmit}
                    className="px-2 bg-gray-200 py-1 text-sm font-semibold text-gray-900 transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none"
                    disabled={btnActivate}
                >

                    {btnText}
                </button>
            </div>

        </form>
    );
}
