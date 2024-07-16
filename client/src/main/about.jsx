import { FaInfo } from "react-icons/fa";

const About = () => {
    return (
      <div className="max-w-4xl mx-auto p-4">

        <div className="flex items-center flex-col m-10">
            <FaInfo size={60} color="#3b82f6" title="metablog"/>
        </div>
  
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 lg:text-center">Tecnologia Avançada ao Seu Alcance</h2>
          <ul className="list-disc list-inside">
            <li className="mb-3">Debouncing: Otimizando a interação do usuário para uma resposta mais ágil.</li>
            <li className="mb-3">Lazy Load: Carregamento de conteúdo sob demanda para uma experiência de usuário mais rápida.</li>
            <li className="mb-3">Assincronicidade: Execução de operações sem bloquear a interface do usuário, mantendo-a responsiva.</li>
            <li className="mb-3">Infinite Scroll: Navegação fluida através de grandes volumes de conteúdo sem recarregar a página.</li>
          </ul>
        </section>
  
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 lg:text-center">Componentes Inovadores</h2>
          <p className="text-lg text-justify">
            No frontend, o Metablog adota o Tailwind CSS, uma abordagem moderna para a estilização de componentes que permite designs flexíveis e visualmente atraentes. Cada elemento da interface é meticulosamente projetado para ser intuitivo e funcional, garantindo uma experiência de usuário imersiva.
          </p>
        </section>
  
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 lg:text-center">Funcionalidades Avançadas</h2>
          <ul className="list-disc list-inside">
            <li className="mb-3">Envio de Emails com Nodemailer: Comunicação eficiente com os usuários através de notificações e atualizações por email.</li>
            <li className="mb-3">Salvamento de Mídias com Multer: Gerenciamento eficaz de imagens e outros tipos de mídia, proporcionando uma plataforma rica em conteúdo visual.</li>
          </ul>
        </section>
  
        <section>
          <p className="text-lg">
            Com o Metablog, estamos redefinindo como as pessoas interagem online, oferecendo uma plataforma que combina tecnologia avançada com uma experiência de usuário excepcional. Junte-se a nós nesta jornada para descobrir o potencial ilimitado das redes sociais modernas.
          </p>
          <p className="text-lg mt-4 text-justify">
            O Metablog é projetado para ser totalmente responsivo, garantindo uma experiência consistente em todos os dispositivos, desde desktops até smartphones.
          </p>
        </section>
      </div>
    );
  }
  
  export default About;
  