import { useEffect, useState } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import Slider from 'react-slick';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Blog() {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const handleLogoError = () => {
    setLogoError(true);
  };

  // Funzione per determinare se è un video basandosi sul MIME type
  const isVideoUrl = async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const contentType = response.headers.get('Content-Type');
      return contentType && contentType.startsWith('video/');
    } catch (error) {
      console.error('Errore MIME check:', error);
      return false;
    }
  };

  const articoli = async () => {
    const graphcms = new GraphQLClient(
      'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clnyvwdsv03co01tc0on38e2k/master'
    );

    const APOLLO_QUERY = gql`
      query MyQuery($first: Int, $skip: Int, $projectId: String!) {
        projects(where: { slug: $projectId }) {
          id
          title
          gallery(first: $first, skip: $skip) {
            url
          }
          brand {
            name
          }
        }
      }
    `;

    const variables = {
      first: 100,
      skip: 0,
      projectId: router.query.id,
    };

    const result = await graphcms.request(APOLLO_QUERY, variables);
    const project = result.projects[0];

    // Controlla se ogni elemento è video
    const updatedGallery = await Promise.all(
      project.gallery.map(async (item) => {
        const isVideo = await isVideoUrl(item.url);
        return { ...item, isVideo };
      })
    );

    setPost({
      ...project,
      gallery: updatedGallery,
    });
  };

  useEffect(() => {
    if (router.query?.id) {
      articoli();
    }
  }, [router]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <div className="header">
        <div className="logo">
          <Link href="/">
            <img className="logoImg" src="/LogoTognon.png" />
          </Link>
        </div>

        <div className="menu">
          <Link href="/projects"><h3 className="voceMenu">PROJECTS</h3></Link>
          <Link href="/collectible"><h3 className="voceMenu">COLLECTIBLE</h3></Link>
          <Link href="/about"><h3 className="voceMenu">ABOUT</h3></Link>
        </div>

        {isMenuVisible ? (
          <div className="menuMobile">
            <Link href="/projects"><h3 className="voceMenu">PROJECTS</h3></Link>
            <Link href="/collectible"><h3 className="voceMenu">COLLECTIBLE</h3></Link>
            <Link href="/about"><h3 className="voceMenu">ABOUT</h3></Link>
          </div>
        ) : (
          <div className="divHam">
            <svg className="hamburger" onClick={() => setIsMenuVisible(true)} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
              <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z" />
            </svg>
          </div>
        )}
      </div>

      <div className="contentArea">
        <div className="slideDesktop">
          <Slider {...settings}>
            {post?.gallery?.map((item, i) => {
              const mediaUrl =
                router.query.s === 'index'
                  ? post.gallery[(i + 1) % post.gallery.length].url
                  : item.url;

              return (
                <div key={i}>
                  {item.isVideo ? (
                    <video
                      className=""
                      src={mediaUrl}
                      controls
                      width="80%"
                      height="auto"
                    />
                  ) : (
                    <img
                      className="galleryImg"
                      src={mediaUrl}
                      alt="Gallery"
                      loading="eager"
                      onError={handleLogoError}
                    />
                  )}
                </div>
              );
            })}
          </Slider>
        </div>

        <div className="sliderMobile">
          {post?.gallery?.map((item, i) => (
            item.isVideo ? (
              <video
                key={i}
                className="galleryImg"
                src={item.url}
                controls
                width="100%"
              />
            ) : (
              <img
                key={i}
                className="galleryImg"
                src={item.url}
                alt="Gallery"
                loading="eager"
                onError={handleLogoError}
              />
            )
          ))}
        </div>

        <div className="nameBar">
          <h1>{post?.title}</h1>
          {post?.brand?.name && (
            <Link href={`/brandpage/${post.brand.name}`}>
              <h1 className="underlineText" style={{ marginLeft: '10px' }}>{post.brand.name}</h1>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
