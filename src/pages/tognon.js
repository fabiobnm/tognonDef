import { useEffect, useState } from 'react'
import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';
import Image from 'next/image'



export default function Blog() {

  const [post , setPost ] = useState([])


  const articoli = async()=>{

    const graphcms = new GraphQLClient(
        'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clkh34ac86vgh01t2gsqpgpec/master'

      );


      const APOLLO_QUERY = gql`
        query content() {
            articoli:
            ordinesConnection {
     edges {
       node {
         projects {
           id
           title
           cover {
             url
           }
           anno
           info2
           info3
           info4
           info6
           info5
         }
       }
     }
   }
            projectsConnection {
            aggregate {
                count
            }
            }
        }`;

        const variables = {
            first: 10,
            skip:0
          };

        const articoloXpage = await graphcms.request(APOLLO_QUERY,variables)

        console.log(articoloXpage.articoli.edges[0].node.projects);
        setPost(articoloXpage.articoli.edges[0].node.projects)

  }



  useEffect(()=>{
    articoli()

  },[])



  return (

   <div>
   <h1 class="fightPausa">FIGHT PAUSA*</h1>
    <div>
    <div class="flex-container" id="flexContainer">
    {post.map((prog,i)=>{
        return(
      <div key={'progetto_'+i} class="flex-item">

        <img src={prog.cover?.url}/>

        <div class="text-overlay">
          <div class="">
            <h2 class='title'>{prog.title}</h2>
          </div>
          <div class="">
            <h2 style={{display:'flex',gap:'20px',alignItems:'flex-end',justifyContent: 'space-between'}}>
              <span>{prog.anno}<br></br>{prog.info2}<br></br>{prog.info3}</span>
              <span>{prog.info4}<br></br>{prog.info5}<br></br>{prog.info6}</span>
            </h2>
          </div>
        </div>

      </div>
    )
})}
      </div>


    </div>
    </div>

  )
}
