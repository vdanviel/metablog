import { useEffect, useState } from 'react';

export default function Profile(){

    const [name, setName] = useState('Carregando..');
    const [age, setAge] = useState('Carregando..');
    const [bio, setBio] = useState('Carregando..');
    const [email, setEmail] = useState('Carregando..');

    let [counter, setCounter] = useState(0);

    useEffect(() => {
        
        async () => {
            try {
              const response = await fetch('https://fluffy-space-zebra-6x4x597w4xvcrq6v-5173.app.github.dev/user/profile', {
                method: "GET",
                mode: "cors"
              });

              if (!response.ok) {
                throw new Error('Network response was not ok');
              }

              const data = await response.json();

              setName(data.name);
              setAge((new Date).getFullYear() - data.birth);
              setBio(data.bio);
              setEmail(data.email);

            } catch (error) {
              console.error(error);
            }
        };

        setCounter(counter++)

        return () => {
            setName('');
            setAge('');
            setBio('');
            setEmail('');
        };

    }, [counter]);

    

}