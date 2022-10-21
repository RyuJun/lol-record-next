import { ICustomNavbarContainerProps } from './CustomNavbar.types';
import { MediaQuery } from '@/shared/styles';
import styled from '@emotion/styled';

export const CustomNavbarContainer = styled.div<ICustomNavbarContainerProps>`
  position: sticky;
  top: ${(props) => (props.isSelectedSummoner ? 0 : 'calc(50% - 60px)')};
  z-index: 1;
  & > .navbar-wrapper {
    background: transparent;
    transition: 0.5s all;
    border: none;
    & > .nextui-navbar-container {
      gap: 20px;
      height: ${(props) => (props.isSelectedSummoner ? 'auto' : '120px')};
      & .navbar-brand {
        width: 25%;
      }
      & .navbar-summoner-info {
        width: 70%;
      }
      & .navbar-summoner-search-area {
        width: 70%;

        ${MediaQuery.mobile} {
          width: 100%;
        }

        & > .nextui-navbar-item {
          width: 100%;
        }
        & .nextui-input-main-container {
          width: 100%;
        }
      }
      & .navbar-summoner-search-input {
        width: 100%;
        & .nextui-input-content--left {
          padding: 10px;
        }
        & .nextui-input-clear-button {
          right: 10px;
        }
      }
      & .navbar-summoner-search-list {
        position: absolute;
        top: 50px;
        overflow-y: auto;
        max-height: 300px;
        display: ${(props) => (props.isListVisible ? 'block' : 'none')};
        & > div {
          gap: 20px;
        }
      }
    }
  }
`;
