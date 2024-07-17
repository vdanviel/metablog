import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Importa a função defineConfig do Vite e o plugin de React.
// defineConfig ajuda na definição da configuração do Vite de maneira mais clara.

export default defineConfig({
  plugins: [react()],
  // Aqui estamos utilizando o plugin do React para Vite.
  // Isso permite que o Vite lide com arquivos JSX/TSX e outras funcionalidades do React.

  server: {
    host: true,
    // Aqui definimos que o servidor vai escutar em todos os endereços IP disponíveis.
    // Isso é útil quando você quer acessar o servidor de desenvolvimento a partir de outros dispositivos na mesma rede, como smartphones ou outros computadores.

    port: 8080,
    // Define a porta na qual o servidor de desenvolvimento do Vite vai rodar.
    // O padrão é 3000, mas aqui estamos mudando para 8080.

    strictPort: true
    // Quando true, o Vite irá falhar se a porta 8080 já estiver em uso.
    // Isso garante que o servidor de desenvolvimento use exclusivamente a porta especificada (8080).
  }
});