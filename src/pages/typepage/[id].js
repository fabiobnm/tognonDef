
import { useEffect, useState } from 'react'
import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router'



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


/*
  const articoliOld = async(id)=>{

    const graphcms = new GraphQLClient(
        'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clnyvwdsv03co01tc0on38e2k/master'

      );


      let idc = 'fsdfsfsdfsdf'
      const APOLLO_QUERY = gql`
      query MyQuery {
        project(where: {id: "cloisgr2g2n5q0bwdwj1syq4s"}) {
          id
          title
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
        setPost(projectXpage.project.gallery)

  }
  */

  const articoli = async (id) => {
    const graphcms = new GraphQLClient(
        'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clnyvwdsv03co01tc0on38e2k/master'
    );

    // Modifica la query per accettare una variabile
    const APOLLO_QUERY = gql`
        query MyQuery($projectId: String!) {
            collectibles(where: {collectibleType: {name: $projectId}}) {
                id
                title
                slug
                gallery{
                  url
                }
                
              }
        }
    `;

    const variables = {
        projectId: id, // Utilizza la variabile 'id' passata alla funzione
    };

    const projectXpage = await graphcms.request(APOLLO_QUERY, variables);

    console.log('vediamo pro');
    console.log(projectXpage.collectibles);
    setPost(projectXpage.collectibles);

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
      
      
     <div  class="flex-container" id="collectibleContainer">
     {post?.map((o,i)=>{
        return(
            
            <div  style={{ flex: '30%'}} key={'progetto_'+i} class='imgList'>
                <Link href={{
    pathname: '/collectiblepage/'+ o.slug
  }}> 
    <Image class='portCover'
      src={o.gallery[0].url}
        alt="Description of the image"
        width={200} // larghezza dell'immagine
        height={200} // altezza dell'immagine
        priority={true} // Se stai usando la funzionalità di rendering di priorità di Next.js
        unoptimized={false} // Se non hai bisogno di ottimizzazione automatica
        onError={handleLogoError}
      />
            <h1 class='titleProjBrand'>{o.title}</h1>

</Link>
            
            </div>

        )
    })}
 <div class='nameBar'>
         <h1>{router.query.id}</h1>
    <Link href="/about">
    <h1>{post?.title}</h1>
       </Link> 
    </div>
   

   
     
    


    
      </div>
     </div>

     </div>

  )

 
}




