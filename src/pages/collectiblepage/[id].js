import { useEffect, useState } from 'react';
import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';
import Slider from 'react-slick';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



export default function Blog() {


  const router = useRouter()
  const [post , setPost ] = useState([])
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const [imageLoaded, setImageLoaded] = useState(false);
  const handleLogoError = () => {
    // Gestisci l'errore nell'URL dell'immagine di fallback o nascondi completamente l'elemento
    setLogoError(true);
  };



  const articoli = async (id) => {
    const graphcms = new GraphQLClient(
        'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clnyvwdsv03co01tc0on38e2k/master'
    );

    // Modifica la query per accettare una variabile
    const APOLLO_QUERY = gql`
    query MyQuery($first: Int, $skip: Int, $projectId: String!) {
      collectibles(where: { slug: $projectId }) {
        id
        title
        gallery(first: $first, skip: $skip) {
          url
        }
        collectibleType {
          name
        }
      }
    }
    `;

    const variables = {
      first: 100, // Numero massimo di risultati che desideri ottenere in una singola query
      skip: 0, // Puoi aumentare questo valore per paginare i risultati
      projectId: router.query.id,
    };

    const projectXpage = await graphcms.request(APOLLO_QUERY, variables);

    console.log('vediamo pro');
    console.log(projectXpage.collectibles[0]);
    setPost(projectXpage.collectibles[0]);

    console.log('ei')
    console.log(post.gallery)

}



  useEffect(()=>{
     //articoli()

  },[])

  useEffect(()=>{
    console.log('mostra');
    console.log(router.query.id);
    if(router.query?.id){
        articoli(router.query.id)
    }
    
 

  },[router])


  // Configurazione per react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  



  return (
<div>
<div class='header'>
   <div class='logo'>
      <Link href="/">
       <img class='logoImg' src="/LogoTognon.png"/>
      </Link>
    </div>

    <div class="menu">
      <Link href="/projects">
      <h3  class='voceMenu'>PROJECTS</h3>  
      </Link>
      <Link href="/collectible">
        <h3 class='voceMenu'>COLLECTIBLE</h3> 
        </Link>

        <Link href="/about">
       <h3 style={{marginRight:0}} class='voceMenu'>ABOUT</h3>  
       </Link>   
    </div>
    {isMenuVisible ? (

    <div class="menuMobile" style={{ display: isMenuVisible ? 'flex' : 'none' }}>
      <Link href="/projects">
      <h3 class='voceMenu'>PROJECTS</h3>  
      </Link>
      <Link href="/collectible">
        <h3 class='voceMenu'>COLLECTIBLE</h3> 
        </Link>

        <Link href="/about">
       <h3 class='voceMenu'>ABOUT</h3>  
       </Link>   
    </div>
    ) : (
      <div class='divHam'>
      <svg class='hamburger' onClick={() => setIsMenuVisible(!isMenuVisible)} style={{ display: isMenuVisible ? 'none' : 'block' }} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
  <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></path>
  </svg>
      </div>
)}

   </div>
     <div class='contentArea'>
      
     

     <div class='slideDesktop'>
        <Slider {...settings}>
          {post?.gallery?.map((o, i) => (
            <div key={i}>
              <Image
                className="galleryImg"
                src={o.url}
                alt="Description of the image"
                width={1200}
                height={800}
                loading="eager"
        unoptimized={false} // Se non hai bisogno di ottimizzazione automatica
        onError={handleLogoError}
              />
            </div>
          ))}
        </Slider>


        </div>
        <div className='sliderMobile'>
        {post?.gallery?.map((o,i)=>{
        return(
          
     
            <Image class="galleryImg" 
            src={o.url}
            alt="Description of the image"
            width={600} // larghezza dell'immagine
            height={400} // altezza dell'immagine
            loading="eager"
            priority={true} // Se stai usando la funzionalità di rendering di priorità di Next.js
        unoptimized={false} // Se non hai bisogno di ottimizzazione automatica
        onError={handleLogoError}
          />

        )
    })}

        </div>

      <div class='nameBar'>
    <h1 >{post?.title}</h1>
                 <Link href={{
    pathname: '/typepage/'+ post?.collectibleType?.name
  }}> 
    <h1 class='underlineText' style={{marginLeft:'10px'}}>{post?.collectibleType?.name}</h1>
       </Link> 
    </div>

   
     </div>

     </div>

  )

 
}




