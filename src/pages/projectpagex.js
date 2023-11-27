
import { useEffect, useState } from 'react'
import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router'



export default function Blog() {


  const router = useRouter()

  const [post , setPost ] = useState([])


  const articoli = async()=>{

    const graphcms = new GraphQLClient(
        'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clnyvwdsv03co01tc0on38e2k/master'

      );


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



  useEffect(()=>{
     articoli()

  },[])

  useEffect(()=>{
    console.log('mostra');
    console.log(router);
 

  },[router])



  return (
<div>
<div class='header'>
   <div class='logo'><Link href="/">
    <img class='logoImg' src="/LogoTognon.png"/>
    </Link>
    </div>
    <div class="menu">
    <Link href="/projects">
    <h3 style={{textDecoration: 'underline', textUnderlineOffset: '5px', textDecorationThickness: '1px'}}>PROJECTS</h3>  
    </Link>
    <Link href="/collectible">
      <h3>COLLECTIBLE</h3> 
      </Link>

      <Link href="/about">
       <h3>ABOUT</h3>  
       </Link>   
        </div>

   </div>
     <div class='contentArea'>
      
     <div style={{ paddingTop:'50px', paddingBottom:'50px', paddingRight:'50px', display: 'flex', flexWrap: 'wrap', gap:'3%', rowGap:'3vH'}} class="flex-container" id="flexContainer">
     {post.map((prog,i)=>{
        return(
      <div style={{ flex: '30%'}} key={'progetto_'+i} class="flex-item">

<img class="projCover" src={prog.url}/>

      </div>
    )
})}
      </div>
     </div>

     </div>

  )

 
}




