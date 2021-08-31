import React, {useState} from 'react';
import { IFilmDataAdapted } from '../../common/types';

export default function Tabs ({filmData}: {filmData: IFilmDataAdapted}): JSX.Element {

  const overviewTab: JSX.Element = (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{filmData.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good?</span>
          <span className="film-rating__count">{filmData.scoresCount}</span>
        </p>
      </div>
      <div className="film-card__text">
        <p>{filmData.description}</p>
        <p className="film-card__director"><strong>Director: {filmData.director}</strong></p>
        <p className="film-card__starring"><strong>Starring: {filmData.starring.join(', ')} and other</strong></p>
      </div>
    </>
  );

  const detailsTab: JSX.Element = (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{filmData.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {filmData.starring.map((star) => (
              <>
                {star}, <br />
              </>
            )}
        Bill Murray, <br />
        Edward Norton, <br />
        Jude Law, <br />
        Willem Dafoe, <br />
        Saoirse Ronan, <br />
        Tony Revoloru, <br />
        Tilda Swinton, <br />
        Tom Wilkinson, <br />
        Owen Wilkinson, <br />
        Adrien Brody, <br />
        Ralph Fiennes, <br />
        Jeff Goldblum
          </span>
        </p>
      </div>
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">1h 39m</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">Comedy</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">2014</span>
        </p>
      </div>
    </div>
  );

  const reviewsTab: JSX.Element = (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        <div className="review">
          <blockquote className="review__quote">
            <p className="review__text">Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director&apos;s funniest and most exquisitely designed films in years.</p>
            <footer className="review__details">
              <cite className="review__author">Kate Muir</cite>
              <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
            </footer>
          </blockquote>
          <div className="review__rating">8,9</div>
        </div>
        <div className="review">
          <blockquote className="review__quote">
            <p className="review__text">Anderson&apos;s films are too precious for some, but for those of us willing to lose ourselves in them, they&apos;re a delight. &quot;The Grand Budapest Hotel&quot; is no different, except that he has added a hint of gravitas to the mix, improving the recipe.</p>
            <footer className="review__details">
              <cite className="review__author">Bill Goodykoontz</cite>
              <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
            </footer>
          </blockquote>
          <div className="review__rating">8,0</div>
        </div>
        <div className="review">
          <blockquote className="review__quote">
            <p className="review__text">I didn&apos;t find it amusing, and while I can appreciate the creativity, it&apos;s an hour and 40 minutes I wish I could take back.</p>
            <footer className="review__details">
              <cite className="review__author">Amanda Greever</cite>
              <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
            </footer>
          </blockquote>
          <div className="review__rating">8,0</div>
        </div>
      </div>
      <div className="film-card__reviews-col">
        <div className="review">
          <blockquote className="review__quote">
            <p className="review__text">The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.</p>
            <footer className="review__details">
              <cite className="review__author">Matthew Lickona</cite>
              <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
            </footer>
          </blockquote>
          <div className="review__rating">7,2</div>
        </div>
        <div className="review">
          <blockquote className="review__quote">
            <p className="review__text">It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.</p>
            <footer className="review__details">
              <cite className="review__author">Paula Fleri-Soler</cite>
              <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
            </footer>
          </blockquote>
          <div className="review__rating">7,6</div>
        </div>
        <div className="review">
          <blockquote className="review__quote">
            <p className="review__text">It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.</p>
            <footer className="review__details">
              <cite className="review__author">Paula Fleri-Soler</cite>
              <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
            </footer>
          </blockquote>
          <div className="review__rating">7,0</div>
        </div>
      </div>
    </div>
  );

  const TabsAliases: {[key: string]: JSX.Element} = {
    Overview: overviewTab,
    Details: detailsTab,
    Reviews: reviewsTab,
  };

  const [activeTab, setActiveTab] = useState(Object.keys(TabsAliases)[0]);

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {Object.keys(TabsAliases).map((tabName) => (
            <li
              key={tabName}
              className={`film-nav__item ${activeTab === tabName ?'film-nav__item--active' : ''}`}
            >
              <div
                style={{cursor: 'pointer'}}
                className="film-nav__link"
                onClick={() => setActiveTab(tabName)}
              >
                {tabName}
              </div>
            </li>
          ))}
        </ul>
      </nav>
      {TabsAliases[activeTab]}
    </div>
  );
}


