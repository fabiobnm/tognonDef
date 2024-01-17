
import { useEffect, useState } from 'react'
import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';
import Image from 'next/image'
import Link from 'next/link';
import Head from 'next/head'




export default function Blog() {

  const [post , setPost ] = useState([])
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const [imageLoaded, setImageLoaded] = useState(false);
  const handleLogoError = () => {
    // Gestisci l'errore nell'URL dell'immagine di fallback o nascondi completamente l'elemento
    setLogoError(true);
  };


  const articoli = async()=>{

    const graphcms = new GraphQLClient(
        'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clnyvwdsv03co01tc0on38e2k/master'

      );


      const APOLLO_QUERY = gql`
      query MyQuery($first: Int, $skip: Int) {
        projects(first: $first, skip: $skip) {
          id
          title
          slug
          gallery {
            url
          }
        }
      }
    `;

        const variables = {
            first: 20,
            skip:0
          };

        const projectXpage = await graphcms.request(APOLLO_QUERY,variables)

        console.log(projectXpage.projects);
        console.log(projectXpage.projects.length);
        console.log(projectXpage.projects[Math.floor(Math.random() * projectXpage.projects.length)])

        setPost(projectXpage.projects[Math.floor(Math.random() * projectXpage.projects.length)])

        console.log('ciao')
        console.log(projectXpage.projects[0].gallery[0].url)

        var cover = projectXpage.projects[0].gallery[0].url
        console.log('cover')

        console.log(cover)

  }

  useEffect(() => {
    // Controlla se la larghezza della finestra è inferiore a una certa soglia
    const isMobile = window.innerWidth <= 768; // Puoi regolare il valore della soglia a seconda delle tue esigenze

    if (isMobile) {
      // Esegui il reindirizzamento se è un dispositivo mobile
      window.location.href = '/projects'; // Sostituisci con l'URL desiderato per la pagina mobile
    }
  }, []); // L'array 

  useEffect(()=>{
    articoli()

  },[])



  return (
<div>
     <Head>
        <title>TOGNON</title>
      </Head>
<div class='header'>
   <div class='logo'>
      <Link href="/">
       <img class='logoImg' src="/LogoTognon.png"/>
      </Link>
    </div>

    <div class="menu">
      <Link href="/projects">
      <h3 class='voceMenu'>PROJECTS</h3>  
      </Link>
      <Link href="/collectible">
        <h3 class='voceMenu'>COLLECTIBLE</h3> 
        </Link>

        <Link href="/about">
       <h3 style={{marginRight:0}} class='voceMenu'>ABOUT</h3>  
       </Link>   
    </div>

    <div style={{display:'none'}} class="menuMobile">
      <Link href="/projects">
      <h3 class='voceMenu'>PROJECTS</h3>  
      </Link>
      <Link href="/collectible">
        <h3 class='voceMenu'>COLLECTIBLE</h3> 
        </Link>

        <Link href="/about">
       <h3 style={{marginRight:0}} class='voceMenu'>ABOUT</h3>  
       </Link>   
    </div>
    <div class='divHam'>
    </div>
  

   </div>
     <div class='contentArea'>
     <div class="flex-container" id="indexContainer">
     <Link
  href={{
    pathname: '/projectpage/'+ post.slug ,
    query: { s: 'index' }, // Aggiungi il parametro s=index
  }}> 
 
       <img
          className={`indexCover ${imageLoaded ? 'loaded' : 'fade-in'}`}
          src={post?.gallery && post.gallery[0]?.url}
          onLoad={() => setImageLoaded(true)}
        priority={true} // Se stai usando la funzionalità di rendering di priorità di Next.js
        unoptimized={false} // Se non hai bisogno di ottimizzazione automatica
        onError={handleLogoError}
        />
      </Link>

  


    

      </div>
     </div>

     </div>

  )

 
}
