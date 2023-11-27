import { useEffect, useState } from 'react'
import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';
import Image from 'next/image'
import Link from 'next/link';



export default function Blog() {

  const [post , setPost ] = useState([])
  const [isMenuVisible, setIsMenuVisible] = useState(false);




  const articoli = async()=>{

    const graphcms = new GraphQLClient(
        'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clnyvwdsv03co01tc0on38e2k/master'

      );


      const APOLLO_QUERY = gql`
      query MyQuery {
        abouts {
          id
          textRich{
            html
          }
          info{
            html
          }
          message{
            html
          }
        }
      }
      
    `;

        const variables = {
            first: 20,
            skip:0
          };

        const projectXpage = await graphcms.request(APOLLO_QUERY,variables)

        console.log(projectXpage.abouts);
        setPost(projectXpage.abouts)

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

    <div class="menu">
      <Link href="/projects">
      <h3 class='voceMenu'>PROJECTS</h3>  
      </Link>
      <Link href="/collectible">
        <h3 class='voceMenu'>COLLECTIBLE</h3> 
        </Link>

        <Link href="/about">
       <h3 style={{textDecoration: 'underline', textUnderlineOffset: '5px', textDecorationThickness: '1px'}} class='voceMenu'>ABOUT</h3>  
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
       <h3  style={{marginRight:'0',textDecoration: 'underline', textUnderlineOffset: '5px', textDecorationThickness: '1px'}} class='voceMenu'>ABOUT</h3>  
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
      
      
     <div id="text-about">
        
        <div class='aboutFont'
            dangerouslySetInnerHTML={{__html: post[0]?.textRich?.html}}
          />
          <div class='aboutFont'
            dangerouslySetInnerHTML={{__html: post[0]?.info?.html}}
          />
          <div class='aboutFont'
            dangerouslySetInnerHTML={{__html: post[0]?.message?.html}}
          />
      </div>
     </div>

     </div>

  )

 
}
