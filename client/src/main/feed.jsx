//react and libs..
import { useEffect, useState, useCallback  } from "react";

//styles..
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/carrousel.css"

//components..
import { MdDoNotDisturb } from "react-icons/md";
import { PiSmileySad } from "react-icons/pi";
import Slider from "react-slick";
import Button from "../components/button.jsx";
import PublicateForm from "../components/publicate_form.jsx";
import AlertFadeSuccess from "../components/alert/fade/success.jsx";

export default function Feed() {
    
    const [statePublications, setPublications] = useState([]);//variavel onde todos os posts ficam
    const [stateMoreButton, setMoreButton] = useState(null);//variavel onde fica o butão mais post

    //variaveis delemitadores de quais posts a quais posts se desja..
    const [statePubliOffset, setPubliOffset] = useState(0);//"de"
    const [statePubliLimit, setPubliLimit] = useState(5);//"para"

    const user = JSON.parse(localStorage.getItem('user'));//variavel onde fica as informações do usuario..

    //a requisição para recuperar o feed desse usuário..
    const items = async (id,offset,limit) => {
        try {
            
            const response = await fetch(`http://localhost:8005/post/all/${id}/${offset}/${limit}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            return response;
        } catch (error) {
            console.error('Error on loading feed: ', error);
        }
    };

    //abre todos os arrays de posts recebidos e retorna todos em um unico array.. (usado para renderizar os posts)
    const renderListPosts = () => {
        const list = []

        statePublications.map(item => {
            list.push(item);
        });

        setPublications(list);

    }

    //variavel que joga os posts no feed e renderiza EM statePublications..
    const handleFeed = () => {

        //recupera os dados e retornar o html de cada card de post..
        const fetchPublications = (data) => {

            let publications = null;

            //se n houver posts p esse usuario..
            if (data.feed.length == 0) {

                //da um html de avisoo..
                publications = (
                    <div key={"no-posts"} className="flex flex-col items-center overflow-y-hidden m-5 justify-center p-4 bg-white rounded-lg max-w-md mx-auto lg:shadow-lg">

                        <div className="flex justify-center w-full">
                            <span className="text-gray-400">
                            <MdDoNotDisturb size={24} />
                            </span>
                        </div>

                        <div className="flex flex-col items-center justify-center mt-4">
                            <span className="inline-flex items-center gap-1">
                                <p className="text-lg font-semibold text-gray-800">You have no posts yet</p>
                                <PiSmileySad size="22px"/>
                            </span>
                            
                            <p className="text-sm text-gray-600 mt-2">Post something or follow someone!</p>
                        </div>
                    </div>
                );

            }else{

                //se houver posts, itera.. e acrestanta o resultado a var publications..
                publications = data.feed.map(item => { 

                    //se o post n ter midia
                    if (item.media.length == 0) {
                        
                        // ele da um html sem midia só com o content do post..
                        return(

                            <div key={item._id} className="w-[32vh] lg:w-[40vh] overflow-hidden bg-white rounded-lg lg:shadow-lg">
        
                                <div className="px-4 py-2">
                                    <div className="flex items-center gap-1 mb-3">
                                        <img className="w-[30px] h-[30px] rounded-full object-cover" src={item.user.photo || "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-256.png"} alt="profile_pic"/>{/*se usuario n ter foto ele da uma foto padrao de um user pattern*/}
                                        <p className="text-xs font-bold text-gray-800">@{item.user.nick}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-600">{item.content}</p>
                                </div>
        
                                <div className="flex items-center justify-between px-4 py-2 bg-[#3b82f6]">
                                    <small className="text-sm text-white">{new Date(item.created_at).toLocaleString()}</small>
                                    <button className="px-2 py-1 text-sm font-semibold text-gray-900 transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">More</button>
                                </div>    
        
                            </div>

                        );

                    }else{// se ter

                        //itera sobre as midias do post
                        const render_midias = item.media.map((url, index) => {

                                //array de html de midia (pode ser <img> ou <video>)
                                let midias = [];


                                //se essa midia desse post for do tipo de imagem.. (png,jpeg, etc..)
                                if (url.indexOf(".png") != -1 || url.indexOf(".jpg") != -1 || url.indexOf(".jpeg") != -1 || url.indexOf(".webp") != -1) {
                                    
                                    //ele adiciona no array de midias um elemento <img> com a url da midia como src..
                                    midias.push(

                                        <a key={index} target="_blank" href={url}>
                                            <img className="object-cover w-full h-[30vh] rounded-b-lg" src={url}/>
                                        </a>
                                        

                                    )

                                } else if (url.indexOf(".mp4") != -1 || url.indexOf(".mkv") != -1 || url.indexOf(".webm") != -1 || url.indexOf(".mov") != -1){////se essa midia desse post for do tipo de video.. (mp4, mkv, mov, etc..)

                                    //ele adiciona no array de midias um elemento <video> com a url da midia como src..
                                    midias.push(

                                        <video key={index} controls className="object-cover w-full h-[30vh] rounded-b-lg">
                                            <source src={url} type={"video/" + url.substr(url.indexOf('.') + 1, url.length) } />    
                                        </video>                                        

                                    )

                                }

                                //retorna esse array de elementos html..
                                return midias;
                            }
                        );

                        //validações se monta o carrousel ou não (caso uma midia somente, ele n monta..)
                        let carrousel = () => {
                            //se so houver UMA midia não há necessidade de fazer carrousel ent ele só devolve  amidia em si.
                            if (render_midias.length == 1) {
                                return render_midias[0];{/* retorna o primeiro elelemtno do array de elementos de midias  qnd for chamado em renderPublications() */}
                            }else{//se houver mais de um ele faz o carrousel
                                {/* usa o react-slick para criar um carrosel de midias.. */}
                                return (<div className="slider-container m-0 p-0">
                                    <Slider {...{//objeto de configurações do react-slick
                                        dots: true,
                                        infinite: true,
                                        speed: 500,
                                        slidesToShow: 1,
                                        slidesToScroll: 1
                                    }}>
                                        {/* retorna o array de elementos de midias para o carrosel renderizar qnd for chamado em renderPublications() */}
                                        {render_midias}
                                    </Slider>
                                </div>)
                            }

                        }

                        return(

                            //da o html de um post com midias..
                            <div key={item._id}>

                                <div className="w-[32vh] lg:w-[40vh] p-0 m-0 bg-white rounded-t-lg lg:shadow-lg ">
                                    <div className="px-4 py-2">
                                        <div className="flex items-center gap-1 mb-3">
                                            <img className="w-[30px] h-[30px] rounded-full object-cover" src={item.user.photo || "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-256.png"} alt="profile_pic"/>{/*se usuario n ter foto ele da uma foto padrao de um user pattern*/}
                                            <p className="text-xs font-bold text-gray-800">@{item.user.nick}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-600">{item.content}</p>
                                    </div>
            
                                    <div className="flex items-center justify-between px-4 py-2 bg-[#3b82f6]">
                                        <small className="text-sm text-white">{new Date(item.created_at).toLocaleString()}</small>
                                        <button className="px-2 py-1 text-sm font-semibold text-gray-900 transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">More</button>
                                    </div>

                                    {carrousel()}

                                </div>
        
                            </div>

                        );

                    }
                    
                });

            }

            /*
                ESSA É CHAVE DO LOOP:
                quando o usuário clica em More Posts o useEffect aciona novamente em verifyButton() e então ele dá os posts restantes desse usuário,
                ai esse script ADICIONA esses posts a ao array de onde ficam todos os posts acumlados (statePublications) e ele faz todo o processo de novo e renderiza os novos posts na tela..
                (TUDO ISSO ACONTECE PARA UMA BOA PERFORMANCE)
            */

            //joga os posts recuperados no array de posts..
            statePublications.push(publications);

            setPublications(statePublications);
        };

        //verifica se há mais posts e retorna o html do "more posts"..
        const verifyMoreButton = (data) => {

            //se usuário apertar no butão o useeffect é executado novamente com posts ADIANTE (cinco a mais)..
            const addMorePosts = () => {

                setPubliLimit(statePubliLimit + 5);
                setPubliOffset(statePubliOffset + 5)
    
            }

            //butão de mais posts..
            const button = data.more == true ? <Button activate={true} bg_color="#3b82f6" hover_bg_color="#4f65ff" font_color="white" content={"More Posts"} type={"button"} onClick={addMorePosts}/> : null

            //definindo front do butao
            setMoreButton(button);

        }

        //executa as funções anteriores..
        const handle = async () => {

            //requisitando o feed desse usuário..
            const response = await items(user._id, statePubliOffset, statePubliLimit);
            const data = await response.json();

            //apagando o front do sinalzinho de "Loading..." se exitir..
            document.querySelector('#beginning_loading') ? document.querySelector('#beginning_loading').remove() : null;

            //executando as funcoes..
            fetchPublications(data);
            verifyMoreButton(data);
        }

        //executa o algoritmo so useefecct
        handle()

    }

    //ao carregar a pagina carrega os posts..
    useEffect(() => {

        handleFeed();

        renderListPosts();

        console.log(statePublications);

    }, [statePubliOffset ,statePubliLimit]);

    //quando o usuario post algumo novo post..
    const handleHasNew = useCallback((newPostContent, newPostMidia) => {

        let newPost = null;

        const handleNewPost = () => {

            //se o post n ter midia
            if (newPostMidia.length == 0) {

                // ele da um html sem midia só com o content do post e com aviso de post enviado..
                newPost = (

                    <div>
                        <AlertFadeSuccess message="Publicated successfully!" duration={1500} />
                        <div key={(new Date().getTime() )} className="w-[32vh] lg:w-[40vh] overflow-hidden bg-white rounded-lg lg:shadow-lg ">

                            <div className="px-4 py-2">
                                <div className="flex items-center gap-1 mb-3">
                                    <img className="w-[30px] h-[30px] rounded-full object-cover" src={user.photo || "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-256.png"} alt="profile_pic"/>{/*se usuario n ter foto ele da uma foto padrao de um user pattern*/}
                                    <p className="text-xs font-bold text-gray-800">@{user.nick}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-600">{newPostContent}</p>
                            </div>

                            <div className="flex items-center justify-between px-4 py-2 bg-[#3b82f6]">
                                <small className="text-sm text-white">Now</small>
                                <button className="px-2 py-1 text-sm font-semibold text-gray-900 transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">More</button>
                            </div>    

                        </div>
                    </div>

                );

            }else{// se ter

                //itera sobre as midias do post e com aviso de post enviado..
                const render_midias = newPostMidia.map((file, index) => {

                        //array de html de midia (pode ser <img> ou <video>)
                        let midias = [];

                        //se essa midia desse post for do tipo de imagem.. (png,jpeg, etc..)
                        if (file.type.indexOf("png") != -1 || file.type.indexOf("jpg") != -1 || file.type.indexOf("jpeg") != -1 || file.type.indexOf("webp") != -1) {
                            
                            //ele adiciona no array de midias um elemento <img> com a file da midia como src..
                            midias.push(

                                <a key={index} target="_blank" href={URL.createObjectURL(file)}>
                                    <img className="object-cover w-full h-[30vh] rounded-b-lg" src={URL.createObjectURL(file)}/>
                                </a>
                                

                            )

                        } else if (file.type.indexOf("mp4") != -1 || file.type.indexOf("mkv") != -1 || file.type.indexOf("webm") != -1 || file.type.indexOf("mov") != -1){////se essa midia desse post for do tipo de video.. (mp4, mkv, mov, etc..)

                            //ele adiciona no array de midias um elemento <video> com a file da midia como src..
                            midias.push(

                                <video key={index} controls className="object-cover w-full h-[30vh] rounded-b-lg">
                                    <source src={URL.createObjectURL(file)} type={file.type} />    
                                </video>                                        

                            )

                        }

                        //retorna esse array de elementos html..
                        return midias;
                    }
                );

                //validações se monta o carrousel ou não (caso uma midia somente, ele n monta..)
                let carrousel = () => {
                    //se so houver UMA midia não há necessidade de fazer carrousel ent ele só devolve  amidia em si.
                    if (render_midias.length == 1) {
                        return render_midias[0];{/* retorna o primeiro elelemtno do array de elementos de midias  qnd for chamado em renderPublications() */}
                    }else{//se houver mais de um ele faz o carrousel
                        {/* usa o react-slick para criar um carrosel de midias.. */}
                        return (<div className="slider-container m-0 p-0">
                            <Slider {...{//objeto de configurações do react-slick
                                dots: true,
                                infinite: true,
                                speed: 500,
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }}>
                                {/* retorna o array de elementos de midias para o carrosel renderizar qnd for chamado em renderPublications() */}
                                {render_midias}
                            </Slider>
                        </div>)
                    }

                }

                newPost = (

                    //da o html de um post com midias e com o aviso de postado..
                    <div key={(new Date().getTime() )}>

                        <AlertFadeSuccess message="Publicated successfully!" duration={5000} />

                        <div className="w-[32vh] lg:w-[40vh] p-0 m-0 bg-white rounded-t-lg lg:shadow-lg ">
                            <div className="px-4 py-2">
                                <div className="flex items-center gap-1 mb-3">
                                    <img className="w-[30px] h-[30px] rounded-full object-cover" src={user.photo || "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-256.png"} alt="profile_pic"/>{/*se usuario n ter foto ele da uma foto padrao de um user pattern*/}
                                    <p className="text-xs font-bold text-gray-800">@{user.nick}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-600">{newPostContent}</p>
                            </div>

                            <div className="flex items-center justify-between px-4 py-2 bg-[#3b82f6]">
                                <small className="text-sm text-white">Now</small>
                                <button className="px-2 py-1 text-sm font-semibold text-gray-900 transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">More</button>
                            </div>

                            {carrousel()}

                        </div>

                    </div>

                );

            }

        };

        handleNewPost();

        //se ele for a key "no-posts" quer dizer q ele é aquele card de aviso q n ha posts, ai ele só vai deletar ele e colocar o novo post..
        statePublications[0].key == "no-posts" ? statePublications.splice(0, statePublications.length) : null;

        statePublications.unshift(newPost);

        setPublications(statePublications);

        renderListPosts();

    }, []);

    return (
        <div className="flex align-center space-y-6 flex-col pt-12 lg:mx-28 lg:pt-auto lg:mt-16 lg:bg-white lg:rounded-[16px] lg:p-5">
            <h1 className="text-center text-slate-400 font-bold">Welcome again, @{user.nick}!</h1>
            <div className="max-h-[80vh] overflow-y-auto grid gap-10 justify-items-center">

                {/* o formulario de novo post.. */}
                <PublicateForm onPublish={handleHasNew} id_user={user._id} nick={user.nick} photo={user.photo}/>

                <h1 className="text-center text-slate-400 font-bold">These are the current posts</h1>
                <div id="beginning_loading" className="text-center"><svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg> Loading...</div>
                {/* os posts atuais */}
                {statePublications}
                {/* //renderizando o botão de mais posts com toda sua logica e condições dadas pelo useeffect*/}
                {stateMoreButton}
            </div>
        </div>
    );
}
