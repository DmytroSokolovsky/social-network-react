import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import {
  getDescription,
  getUpdateProfileStatus,
} from '../../../../../redux/selectors/profile-selector';
import s from './../../../Profile.module.scss';
import { updateProfile } from '../../../../../redux/profile-reducer';
import { MyButton } from '../../../../common/MyButton/MyButton';

interface ContactsType {
  facebook: string;
  github: string;
  instagram: string;
  mainLink: string;
  twitter: string;
  vk: string;
  website: string;
  youtube: string;
}

interface EditDescriptionFormData {
  fullName: string;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  contacts: ContactsType;
  userId: number;
}

interface EditDescriptionPropsType {
  setEditDescription: (boolean: boolean) => void;
  userId: number;
}

export const EditDescription = ({
  setEditDescription,
  userId,
}: EditDescriptionPropsType) => {
  const updateProfileStatus = useAppSelector(getUpdateProfileStatus);
  const profileDescription = useAppSelector(getDescription);
  const dispatch = useAppDispatch();

  const values = {
    fullName: profileDescription?.fullName,
    aboutMe: profileDescription?.aboutMe,
    lookingForAJob: profileDescription?.lookingForAJob,
    lookingForAJobDescription: profileDescription?.lookingForAJobDescription,
    contacts: {
      facebook: profileDescription?.contacts.facebook,
      github: profileDescription?.contacts.github,
      instagram: profileDescription?.contacts.instagram,
      mainLink: profileDescription?.contacts.mainLink,
      twitter: profileDescription?.contacts.twitter,
      vk: profileDescription?.contacts.vk,
      website: profileDescription?.contacts.website,
      youtube: profileDescription?.contacts.youtube,
    },
  };

  const { register, handleSubmit, reset } = useForm<EditDescriptionFormData>({
    mode: 'onBlur',
    defaultValues: values,
  });

  const onSubmit = handleSubmit(data => {
    JSON.stringify(data);
    data.userId = userId;
    dispatch(updateProfile(data));

    if (updateProfileStatus === 'resolved') {
      setEditDescription(false);
    }
  });

  const handleReset = () => {
    reset(values);
  };

  return (
    <form onSubmit={onSubmit} className={s['profile-description__form']}>
      <div className={s['profile-description__row']}>
        <div className={s['profile-description__name']}>Full name: </div>
        <div className={s['profile-description__value']}>
          <input type="text" {...register('fullName')} />
        </div>
      </div>
      <div className={s['profile-description__row']}>
        <div className={s['profile-description__name']}>About me: </div>
        <div className={s['profile-description__value']}>
          <textarea {...register('aboutMe')} />
        </div>
      </div>
      <div className={s['profile-description__row']}>
        <div className={s['profile-description__name']}>
          Looking for a job:{' '}
        </div>
        <div className={s['profile-description__value']}>
          <input type="checkbox" {...register('lookingForAJob')} />
        </div>
      </div>
      <div className={s['profile-description__row']}>
        <div className={s['profile-description__name']}>
          Looking for a job description:{' '}
        </div>
        <div className={s['profile-description__value']}>
          <textarea {...register('lookingForAJobDescription')} />
        </div>
      </div>
      <div className={s['profile-description__row']}>
        <div className={s['profile-description__name']}>Facebook:</div>
        <div className={s['profile-description__value']}>
          <input type="text" {...register('contacts.facebook')} />
        </div>
      </div>
      <div className={s['profile-description__row']}>
        <div className={s['profile-description__name']}>Github:</div>
        <div className={s['profile-description__value']}>
          <input type="text" {...register('contacts.github')} />
        </div>
      </div>
      <div className={s['profile-description__row']}>
        <div className={s['profile-description__name']}>Instagram:</div>
        <div className={s['profile-description__value']}>
          <input type="text" {...register('contacts.instagram')} />
        </div>
      </div>
      <div className={s['profile-description__row']}>
        <div className={s['profile-description__name']}>Main link:</div>
        <div className={s['profile-description__value']}>
          <input type="text" {...register('contacts.mainLink')} />
        </div>
      </div>
      <div className={s['profile-description__row']}>
        <div className={s['profile-description__name']}>Twitter:</div>
        <div className={s['profile-description__value']}>
          <input type="text" {...register('contacts.twitter')} />
        </div>
      </div>
      <div className={s['profile-description__row']}>
        <div className={s['profile-description__name']}>VK:</div>
        <div className={s['profile-description__value']}>
          <input type="text" {...register('contacts.vk')} />
        </div>
      </div>
      <div className={s['profile-description__row']}>
        <div className={s['profile-description__name']}>Website:</div>
        <div className={s['profile-description__value']}>
          <input type="text" {...register('contacts.website')} />
        </div>
      </div>
      <div className={s['profile-description__row']}>
        <div className={s['profile-description__name']}>Youtube:</div>
        <div className={s['profile-description__value']}>
          <input type="text" {...register('contacts.youtube')} />
        </div>
      </div>
      <div className={s['profile-description__row']}>
        <MyButton style={{ marginRight: '10px' }} type="submit">
          Save
        </MyButton>
        <button
          onClick={handleReset}
          type="button"
          className={s['profile-description__cancel']}
        >
          <span>Reset</span>
        </button>
      </div>
    </form>
  );
};
