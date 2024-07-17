import { FaInfo } from "react-icons/fa";

const About = () => {
    return (
      <div className="max-w-4xl mx-auto p-4">

        <div className="flex items-center flex-col m-10">
            <FaInfo size={60} color="#3b82f6" title="metablog"/>
        </div>
  
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 lg:text-center">Advanced Technology at Your Fingertips</h2>
          <ul className="list-disc list-inside">
            <li className="mb-3">Debouncing: Optimizing user interaction for faster response times.</li>
            <li className="mb-3">Lazy Load: On-demand content loading for a faster user experience.</li>
            <li className="mb-3">Asynchronicity: Executing operations without blocking the user interface, keeping it responsive.</li>
            <li className="mb-3">Infinite Scroll: Smooth navigation through large volumes of content without page reloads.</li>
          </ul>
        </section>
  
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 lg:text-center">Innovative Components</h2>
          <p className="text-lg text-justify">
            On the frontend, Metablog adopts Tailwind CSS, a modern approach to component styling that allows for flexible and visually appealing designs. Each interface element is meticulously designed to be intuitive and functional, ensuring an immersive user experience.
          </p>
        </section>
  
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 lg:text-center">Advanced Features</h2>
          <ul className="list-disc list-inside">
            <li className="mb-3">Email Sending with Nodemailer: Efficient communication with users through notifications and updates via email.</li>
            <li className="mb-3">Media Upload with Multer: Effective management of images and other types of media, providing a platform rich in visual content.</li>
          </ul>
        </section>
  
        <section>
          <p className="text-lg">
            With Metablog, we are redefining how people interact online, offering a platform that combines advanced technology with an exceptional user experience. Join us on this journey to discover the unlimited potential of modern social networks.
          </p>
          <p className="text-lg mt-4 text-justify">
            Metablog is designed to be fully responsive, ensuring a consistent experience across all devices, from desktops to smartphones.
          </p>
        </section>
      </div>
    );
  }
  
  export default About;
