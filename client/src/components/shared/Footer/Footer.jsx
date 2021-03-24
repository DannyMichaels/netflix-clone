import { useState } from 'react';
import { Link } from 'react-router-dom';
// icons
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';

// utils
import { getServiceCode } from '../../../utils/getServiceCode';

// styles
import { StyledFooter } from './footer.styles';

const socialLinks = [
  {
    url: 'https://github.com/dannymichaels',
    icon: <GitHubIcon fontSize="large" />,
  },
  {
    url: 'https://www.linkedin.com/in/👨🏽‍💻-daniel-michael-718825155',
    icon: <LinkedInIcon fontSize="large" />,
  },
  {
    url: 'https://twitter.com/_DanielDev',
    icon: <TwitterIcon fontSize="large" />,
  },
];

const bottomFooterLinks = `Audio and Subtitles,
Audio Description,
Help Center,
Gift Cards,
Media Center,
Investor Relations,
Jobs,
Terms of Use,
Privacy,
Legal Notices,
Cookie Preferences,
Corporate Information,
Contact Us`;

export default function Footer() {
  const [serviceCode, setServiceCode] = useState('');

  const onGetServiceCode = () => {
    const result = getServiceCode();
    setServiceCode(result);
  };

  return (
    <StyledFooter>
      <div className="footer__content">
        <div className="footer__social-links">
          {socialLinks.map((link) => (
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
          {bottomFooterLinks.split(',').map((link) => (
            <li className="footer__link-wrapper">
              <Link className="footer__link" href="/">
                {link}
              </Link>
            </li>
          ))}
        </ul>

        <div className="footer__service">
          <button
            className="footer__service-code"
            onClick={() => !serviceCode && onGetServiceCode()} // don't regenrate on second-click.
          >
            {serviceCode ? serviceCode : 'Service Code'}
          </button>
        </div>

        <div className="footer__copyright">
          <span>© 1997-2021 Fakeflix, Inc. ‎&lrm;</span>
        </div>
      </div>
    </StyledFooter>
  );
}
