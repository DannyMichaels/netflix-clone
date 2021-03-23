import styled from 'styled-components';

export const StyledFooter = styled.footer`
  margin: 20px auto 0;
  padding: 0 4%;

  .footer__content {
    color: grey;
    max-width: 980px;
    margin: 20px auto 0;
    padding: 0 4%;
  }

  .footer__link {
    color: grey;
    margin-right: 15px;
    text-decoration: none;
    cursor: pointer;
  }

  .footer__social-links {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    margin-bottom: 1em;
  }

  ul {
    font-size: 13px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -moz-box-orient: horizontal;
    -moz-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    -moz-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    margin: 0 0 14px 0;
    padding: 0;
    list-style: none;
  }

  li {
    flex-basis: 25%;
  }

  .footer__service-code {
    margin-bottom: 20px;
    font-size: 13px;
    padding: 0.5em;
    background: 0 0;
    color: grey;
    border: solid 1px grey;

    &:hover {
      color: #fff;
      cursor: pointer;
    }
  }

  .footer__copyright {
    font-size: 11px;
    margin-bottom: 15px;
  }
`;
