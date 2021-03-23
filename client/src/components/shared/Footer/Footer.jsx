import styled from 'styled-components';

const StyledFooter = styled.footer`
  .footer__content {
    max-width: 980px;
    margin: 20px auto 0;
    padding: 0 4%;
    color: grey;
  }
`;

const Footer = () => (
  <StyledFooter>
    <div className="footer__content">test</div>
  </StyledFooter>
);
export default Footer;
