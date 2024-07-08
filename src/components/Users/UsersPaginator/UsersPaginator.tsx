import cn from 'classnames';
import s from '../Users.module.scss';
import { memo, useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useMatchMedia } from '../../../hooks/useMatchMedia';
import { ThemeContext } from '../../../context/context';

interface UsersPaginatorPropsType {
  pages: Array<number>;
  handleSetPage: (page: number) => void;
  currentPage: number;
}

export const UsersPaginator = memo(
  ({ pages, handleSetPage, currentPage }: UsersPaginatorPropsType) => {
    const theme = useContext(ThemeContext);

    const { md3 } = useMatchMedia();

    let pagesInRange: number = 10;
    if (md3) {
      pagesInRange = 5;
    }

    const pagesCount = pages.length;

    const [index, setIndex] = useState<number>(1);
    const [pageRange, setPageRange] = useState<number[]>([]);

    useEffect(() => {
      const generatePageRange = (startIndex: number) => {
        let range = [];
        for (
          let i = startIndex;
          i < Math.min(startIndex + pagesInRange, pagesCount + 1);
          i++
        ) {
          range.push(i);
        }
        setPageRange(range);
      };

      generatePageRange(index);
    }, [index, pagesCount, pagesInRange]);

    const handlePrev = () => {
      if (index > 1) {
        setIndex(prevIndex => prevIndex - pagesInRange);
      }
    };

    const handleNext = () => {
      if (index + pagesInRange <= pagesCount) {
        setIndex(prevIndex => prevIndex + pagesInRange);
      }
    };

    let prevButtonClass = cn(s.paginator__button, s.paginator__button_prev, {
      [s.disabled]: index === 1,
    });

    let nextButtonClass = cn(s.paginator__button, s.paginator__button_next, {
      [s.disabled]: index + pagesInRange > pagesCount,
    });

    let paginatorClass = cn(s.paginator, {
      [s.light]: theme === 'light',
      [s.dark]: theme === 'dark',
    });

    return (
      <div className={paginatorClass}>
        <div className={s.paginator__prev}>
          <FontAwesomeIcon
            className={prevButtonClass}
            icon={faCircleChevronLeft}
            size="2x"
            onClick={handlePrev}
          />
        </div>
        <div className={s.paginator__pages}>
          {pageRange.map(page => {
            const isActive = currentPage === page;
            let pageClass = cn(s.paginator__page, {
              [s.active]: isActive,
            });
            return (
              <div
                className={pageClass}
                onClick={() => handleSetPage(page)}
                key={page}
              >
                <span>{page}</span>
              </div>
            );
          })}
        </div>
        <div className={s.paginator__next}>
          <FontAwesomeIcon
            className={nextButtonClass}
            icon={faCircleChevronRight}
            size="2x"
            onClick={handleNext}
          />
        </div>
      </div>
    );
  },
);
