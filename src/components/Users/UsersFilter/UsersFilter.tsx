import { useForm } from 'react-hook-form';
import s from '../Users.module.scss';
import { UsersSelect } from '../UsersSelect/UsersSelect';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../context/context';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  getCount,
  getFriendFilter,
  getPage,
  getTermFilter,
} from '../../../redux/selectors/users-selector';
import {
  getUsers,
  setCount,
  setFriendFilter,
  setPage,
  setTermFilter,
} from '../../../redux/users-reducer';
import { MyButton } from '../../common/MyButton/MyButton';

const options1 = [
  { title: 'All', value: 'null' },
  { title: 'Followed', value: 'true' },
  { title: 'Unfollowed', value: 'false' },
];

const options2 = [
  { title: '5', value: '5' },
  { title: '10', value: '10' },
  { title: '20', value: '20' },
  { title: '30', value: '30' },
  { title: '40', value: '40' },
  { title: '50', value: '50' },
  { title: '60', value: '60' },
  { title: '70', value: '70' },
  { title: '80', value: '80' },
];

interface FilterFormData {
  term: string;
}

export const UsersFilter = () => {
  const theme = useContext(ThemeContext);

  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset } = useForm<FilterFormData>({});

  const count = useAppSelector(getCount);
  const currentPage = useAppSelector(getPage);
  const friendFilter = useAppSelector(getFriendFilter);
  const termFilter = useAppSelector(getTermFilter);

  const [searchParams, setSearchParams] = useSearchParams({
    count: count.toString(),
    page: currentPage.toString(),
    term: termFilter,
    friend: friendFilter,
  });

  const termQuery = searchParams.get('term') || '';

  useEffect(() => {
    reset({
      term: termQuery,
    });
  }, [termQuery, reset]);

  const [filter1, setFilter1] = useState(searchParams.get('friend') || 'null');
  const handleFilter1Select = (value: string) => {
    setFilter1(value);
    setFriendFilter(value);
  };

  const selectedFilter1 = options1.find(item => item.value === filter1);

  const [filter2, setFilter2] = useState(searchParams.get('count') || '5');
  const handleFilter2Select = (value: string) => {
    setFilter2(value);
    setCount(+value);
  };

  const selectedFilter2 = options2.find(item => item.value === filter2);

  let selectFriendClass = cn(s.select__friend, {
    [s.light]: theme === 'light',
    [s.dark]: theme === 'dark',
  });

  let selectCountClass = cn(s.select__count, {
    [s.light]: theme === 'light',
    [s.dark]: theme === 'dark',
  });

  let formClass = cn(s.users__form, s['form-users'], {
    [s.light]: theme === 'light',
    [s.dark]: theme === 'dark',
  });

  const onSubmit = handleSubmit(data => {
    dispatch(setFriendFilter(filter1));
    dispatch(setTermFilter(data.term));
    dispatch(setPage(1));
    dispatch(setCount(+filter2));

    JSON.stringify(data);

    setSearchParams({
      count: filter2,
      page: '1',
      term: data.term,
      friend: filter1,
    });

    dispatch(
      getUsers({
        count: filter2,
        page: '1',
        term: data.term,
        friend: filter1,
      }),
    );
  });

  return (
    <form onSubmit={onSubmit} className={formClass}>
      <div className={s['form-users__column']}>
        <div className={s['form-users__input']}>
          <span>Name: </span>
          <input
            type="text"
            {...register('term')}
            placeholder="Enter name..."
          />
        </div>
      </div>
      <div className={s['form-users__column']}>
        <div className={selectFriendClass}>
          <span>Filter: </span>
          <UsersSelect
            mode="rows"
            options={options1}
            selected={selectedFilter1 || options1[0]}
            onChange={handleFilter1Select}
          />
        </div>
      </div>
      <div className={s['form-users__column']}>
        <div className={selectCountClass}>
          <span>Users on page: </span>
          <UsersSelect
            mode="cells"
            options={options2}
            selected={selectedFilter2 || options2[0]}
            onChange={handleFilter2Select}
          />
        </div>
      </div>
      <div className={s['form-users__column']}>
        <MyButton type="submit" className={s['form-users__button']}>
          Search
        </MyButton>
      </div>
    </form>
  );
};
