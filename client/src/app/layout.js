//este arquivo é o arquivo que configura a página..

export const metadata = {
  title: 'MetaBlog',
  description: 'This a beya app for a blog app.',
}

//aq ele está dando um pasrão para pagina principal, que é a página que esta na raiz.. (page.js)
export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
