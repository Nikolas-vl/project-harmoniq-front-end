import s from './About.module.css';
import lotos from '../../assets/img/lotos.webp';
import lotos2x from '../../assets/img/lotos@2x.webp';
import lotostab from '../../assets/img/lotos-tab.webp';
import lotostab2x from '../../assets/img/lotos-tab@2x.webp';
import lotostel from '../../assets/img/lotos-tel.webp';
import lotostel2x from '../../assets/img/lotos-tel@2x.webp';
import friends from '../../assets/img/friends.webp';
import friends2x from '../../assets/img/friends@2x.webp';
import friendstab from '../../assets/img/friends-tab.webp';
import friendstab2x from '../../assets/img/friends-tab@2x.webp';
import friendstel from '../../assets/img/friends-tel.webp';
import friendstel2x from '../../assets/img/friends-tel@2x.webp';
import yoga from '../../assets/img/yoga.webp';
import yoga2x from '../../assets/img/yoga@2x.webp';

const About = () => {
  return (
    <section className={s.about}>
      <div className="container">
        <div className={s.content}>
          <div className={s.textLotos}>
            <div className={s.textBox}>
              <h2 className={s.aboutTitle}>About us</h2>
              <p className={s.aboutText}>
                Harmoniq is a mindful publishing platform dedicated to mental
                health and well-being. We bring together writers, thinkers, and
                readers who believe that open, thoughtful stories can heal,
                inspire, and connect. Whether you're here to share your journey
                or learn from others — this is your space to slow down, reflect,
                and grow.
              </p>
            </div>
            <div className={s.lotosWrap}>
              <picture>
                <source
                  srcSet={`${lotos} 1x, ${lotos2x} 2x`}
                  media="(min-width: 1440px)"
                />
                <source
                  srcSet={`${lotostab} 1x, ${lotostab2x} 2x`}
                  media="(min-width: 768px)"
                />
                <source
                  srcSet={`${lotostel} 1x, ${lotostel2x} 2x`}
                  media="(max-width: 767px)"
                />
                <img src="../../assets/img/lotos.webp" alt="Lotos" />
              </picture>
            </div>
          </div>
          <ul className={s.picturesList}>
            <li className={s.picturesListItem}>
              <picture>
                <source
                  srcSet={`${friends} 1x, ${friends2x} 2x`}
                  media="(min-width: 1440px)"
                />
                <source
                  srcSet={`${friendstab} 1x, ${friendstab2x} 2x`}
                  media="(min-width: 768px)"
                />
                <source
                  srcSet={`${friendstel} 1x, ${friendstel2x} 2x`}
                  media="(max-width: 767px)"
                />
                <img src="../../assets/img/friends.webp" alt="Friends" />
              </picture>
            </li>
            <li className={s.picturesListItem + ' ' + s.desktopOnly}>
              <picture>
                <source
                  srcSet={`${yoga} 1x, ${yoga2x} 2x`}
                  media="(min-width: 1440px)"
                />
                <img src="/img/yoga.webp" alt="Yoga" />
              </picture>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
