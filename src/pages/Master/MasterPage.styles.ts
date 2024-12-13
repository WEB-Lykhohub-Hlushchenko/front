import styled from "styled-components";

export const MasterPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  gap: 40px;
  min-height: 100vh;
  background-color: var(--main);
`;

export const MasterInfo = styled.div`
  display: flex;
  gap: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 900px;

  img {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    object-fit: cover;
  }

  div {
    text-align: left;

    h2 {
      font-family: "Montserrat", sans-serif;
      font-size: 1.8rem;
      color: var(--accent);
    }

    p {
      font-family: "Montserrat", sans-serif;
      font-size: 1rem;
      color: var(--grey);
      margin-bottom: 5px;
    }
  }
`;

export const AppointmentSection = styled.div`
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  max-width: 900px;

  h3 {
    font-family: "Montserrat", sans-serif;
    font-size: 1.5rem;
    color: var(--accent);
    margin-bottom: 20px;
  }

  div {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }
`;

export const TimeSlot = styled.button<{ isSelected?: boolean }>`
  padding: 10px 20px;
  background-color: ${({ isSelected }) => (isSelected ? "var(--accent)" : "var(--secondary)")};
  color: ${({ isSelected }) => (isSelected ? "#fff" : "var(--grey)")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  font-size: 0.9rem;

  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? "var(--secondary-accent)" : "var(--accent)")};
  }
`;

export const ConfirmButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: var(--accent);
    color: #fff;
    border: none;
    border-radius: 5px;
    font-family: "Montserrat", sans-serif;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background-color: var(--secondary-accent);
    }
`;

export const AppointmentDetails = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 900px;

    h3 {
        font-family: "Montserrat", sans-serif;
        font-size: 1.5rem;
        color: var(--accent);
    }

    p {
        font-family: "Montserrat", sans-serif;
        font-size: 1rem;
        color: var(--grey);
        margin-bottom: 5px;

        a {
            color: var(--accent);
            text-decoration: underline;

            &:hover {
                text-decoration: none;
            }
        }
    }
`;
