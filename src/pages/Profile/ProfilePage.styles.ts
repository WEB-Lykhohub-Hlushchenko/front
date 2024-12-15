import styled from "styled-components";

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  textarea {
    width: 200px;
    height: 100px;
    margin-top: 10px;
  }
`;

export const AppointmentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const AppointmentCard = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;

  button {
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export const FreeTimeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TimeButton = styled.button`
    margin: 5px;
    padding: 5px 10px;
    background-color: #e0f7fa;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: #80deea;
    }
`;
