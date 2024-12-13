import styled from 'styled-components';
import backgroundImg from '../../assets/images/services-background.jpg';

export const ServicePageContainer = styled.div`
  position: relative;
  padding: 60px 40px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;

  @media (max-width: 1900px) {
    padding: 60px 40px;
  }

  @media (max-width: 1300px) {
    padding: 40px 20px;
  }

  @media (max-width: 768px) {
    padding: 20px 20px;
  }
`;

export const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  object-fit: cover; 
  pointer-events: none; 
`;

export const ServiceHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  z-index: 2; 

  h1 {
    font-family: "Montserrat", sans-serif;
    font-size: 2.5rem;
    color: var(--accent);
  }
`;

export const ServiceDescriptionBox = styled.div`
  background-color: rgba(255, 255, 255, 0.8); 
  border-radius: 10px; 
  padding: 20px;
  margin: 20px auto;
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2; 
  text-align: left;

  p {
    font-family: "Montserrat", sans-serif;
    font-size: 1rem;
    color: var(--grey);
    margin-bottom: 10px;
    line-height: 1.6;
  }

  ul {
    list-style-type: disc;
    margin-left: 20px;

    li {
      margin-bottom: 10px;
      font-family: "Montserrat", sans-serif;
      font-size: 1rem;
      color: var(--grey);
    }
  }
`;

export const SpecialistContainer = styled.div`
  display: flex; 
  overflow-x: auto;
  scroll-snap-type: x mandatory; 
  gap: 20px;
  padding: 20px 0;
  margin: 0 auto;
  max-width: 100%;
  position: relative;
  z-index: 2;

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--secondary);
    border-radius: 5px;
  }

  & > div {
    scroll-snap-align: center;
    flex-shrink: 0;
    width: 250px; 
    text-align: center;
  }
`;

export const SpecialistCard = styled.div`
  background-color: var(--secondary);
  border-radius: 10px;
  padding: 15px;
  text-align: center;

  img {
    width: 100%;
    max-width: 150px;
    height: auto;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  h3 {
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    color: var(--grey);
    margin-bottom: 5px;
  }

  p {
    font-family: "Montserrat", sans-serif;
    font-size: 0.9rem;
    color: var(--grey);
    margin: 5px 0;
  }
`;

export const SeeMoreButton = styled.button`
  padding: 10px 20px;
  background-color: var(--accent);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 10px;

  &:hover {
    background-color: var(--secondary-accent);
  }
`;
