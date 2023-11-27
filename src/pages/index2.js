
import { useEffect, useState } from 'react'
import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';
import Image from 'next/image'
import Link from 'next/link';



export default function Blog() {

  const [post , setPost ] = useState([])


  const articoli = async()=>{

    const graphcms = new GraphQLClient(
        'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clnyvwdsv03co01tc0on38e2k/master'

      );


      const APOLLO_QUERY = gql`
      query MyQuery($first: Int, $skip: Int) {
        projects(first: $first, skip: $skip) {
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
        setPost(projectXpage.projects)

        console.log('ciao')
        console.log(projectXpage.projects[0].gallery[0].url)

        var cover = projectXpage.projects[0].gallery[0].url
        console.log('cover')

        console.log(cover)

  }



  useEffect(()=>{
    articoli()

  },[])



  return (
<div>
<div class='header'>
   <div class='logo'>
      <Link href="/">
       <img class='logoImg' src="/LogoTognon.png"/>
      </Link>
    </div>

   

   </div>
     <div class='contentArea'>
      
     <div class="flex-container" id="projectsContainer">
 <Image class='indexCover' src='https://media.graphassets.com/uhSTB4T0RtuQoq8ujgUz'
        alt="Description of the image"
        width={600} // larghezza dell'immagine
        height={400} // altezza dell'immagine
      />

    

      </div>
     </div>

     </div>

  )

 
}
