import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import s from '../Users.module.scss';
import { ReactComponent as ArrowDown } from '../../../images/arrow__down.svg';

type Option = {
  title: string;
  value: string;
};

type OptionProps = {
  option: Option;
  onClick: (value: Option['value']) => void;
  selectedItem: boolean;
};

const OptionEl = (props: OptionProps) => {
  const {
    option: { value, title },
    onClick,
    selectedItem,
  } = props;
  const optionRef = useRef<HTMLLIElement>(null);

  const handleClick =
    (clickedValue: Option['value']): MouseEventHandler<HTMLLIElement> =>
    () => {
      onClick(clickedValue);
    };

  useEffect(() => {
    const option = optionRef.current;
    if (!option) return;
    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (document.activeElement === option && event.key === 'Enter') {
        onClick(value);
      }
    };

    option.addEventListener('keydown', handleEnterKeyDown);
    return () => {
      option.removeEventListener('keydown', handleEnterKeyDown);
    };
  }, [value, onClick]);

  return (
    <li
      className={s.option}
      value={value}
      onClick={handleClick(value)}
      tabIndex={0}
      data-testid={`select-option-${value}`}
      aria-selected={selectedItem}
      ref={optionRef}
    >
      {title}
    </li>
  );
};

type SelectProps = {
  mode?: 'rows' | 'cells';
  options: Option[];
  selected: Option | null;
  onChange?: (selected: Option['value']) => void;
  placeholder?: string;
  onClose?: () => void;
};

export const UsersSelect = (props: SelectProps) => {
  const {
    mode = 'rows',
    options,
    placeholder,
    selected,
    onChange,
    onClose,
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        isOpen && onClose?.();
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [onClose]);

  useEffect(() => {
    const placeholderEl = placeholderRef.current;
    if (!placeholderEl) return;

    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setIsOpen(prev => !prev);
      }
    };
    placeholderEl.addEventListener('keydown', handleEnterKeyDown);

    return () => {
      placeholderEl.removeEventListener('keydown', handleEnterKeyDown);
    };
  }, []);

  const handleOptionClick = (value: Option['value']) => {
    setIsOpen(false);
    onChange?.(value);
  };
  const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div
      className={s.selectWrapper}
      ref={rootRef}
      data-is-active={isOpen}
      data-mode={mode}
      data-testid="selectWrapper"
    >
      <div
        className={s.placeholder}
        data-selected={!!selected?.value}
        onClick={handlePlaceHolderClick}
        role="button"
        tabIndex={0}
        ref={placeholderRef}
      >
        {selected?.title || placeholder}
        <div className={s.arrow}>
          <ArrowDown className={s.arrow__image} />
        </div>
      </div>
      {isOpen && (
        <ul className={s.select__list} data-testid="selectDropdown">
          {options.map(option => {
            const selectedItem = option.title === selected?.title;
            return (
              <OptionEl
                key={option.value}
                option={option}
                onClick={handleOptionClick}
                selectedItem={selectedItem}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};
