import styled from 'styled-components';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const StyledFooter = styled.footer`
  .footer__content {
    max-width: 980px;
    margin: 20px auto 0;
    padding: 0 4%;
    color: grey;
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
`;

const links = [
  {
    url: 'https://github.com/dannymichaels',
    icon: <GitHubIcon fontSize="large" />,
  },
  {
    url: 'https://www.linkedin.com/in/👨🏽‍💻-daniel-michael-718825155',
    icon: <LinkedInIcon fontSize="large" />,
  },
];

const Footer = () => (
  <StyledFooter>
    <div className="footer__content">
      <div className="footer__social-links">
        {links.map((link) => (
          <a
            href={link.url}
            className="footer__link"
            target="_blank"
            rel="noreferrer"
          >
            {link.icon}
          </a>
        ))}
      </div>

      <ul className="footer__member-links">
        <li>
          <a className="footer__link" href="/">
            test
          </a>
        </li>
      </ul>
    </div>
  </StyledFooter>
);

export default Footer;
