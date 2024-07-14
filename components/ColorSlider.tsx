'use client'
import React from 'react';
import { useColorSlider } from '@react-aria/color';
import { useColorSliderState } from '@react-stately/color';
import { useLocale } from '@react-aria/i18n';
import { useFocusRing } from '@react-aria/focus';

const TRACK_THICKNESS = 28;
const THUMB_SIZE = 20;

function ColorSlider(props) {
  let { isDisabled } = props;
  let { locale } = useLocale();
  let state = useColorSliderState({ ...props, locale });
  let trackRef = React.useRef(null);
  let inputRef = React.useRef(null);

  let label = props.label || state.value.getChannelName(props.channel, locale);

  let { trackProps, thumbProps, inputProps, labelProps, outputProps } =
    useColorSlider({
      ...props,
      label,
      trackRef,
      inputRef
    }, state);

  let { focusProps, isFocusVisible } = useFocusRing();

  return (
    // THE CONTAINER FOR BOTH THE COLORS AND THE THUMB 
    <div className=''>
      {/* <div className='pl-4 flex gap-4'>
        <label {...labelProps}>{label}</label>
        <output
          {...outputProps}
          style={{ flex: '', textAlign: 'end' }}
        >
          {state.value.formatChannelValue(
            props.channel,
            locale
          )}
        </output>
      </div> */}
    <div className='cursor-grab rounded-full overflow-hidden relative'>
      {/* The track element holds the visible track line and the thumb. */}
      {/* THE COLOUR BACKGROUND  */}

      <div
        {...trackProps}
        ref={trackRef}
        className='h-[40px] w-full flex '
        style={{
          ...trackProps.style,
          background: isDisabled ? 'rgb(142, 142, 142)' : trackProps.style.background
        }}
      >
        <div
          // THE SLIDER THUMB
          className='border-black w-[30px] h-[30px] border-2 rounded-full self-center items-center'
          {...thumbProps}
          style={{
            ...thumbProps.style,
            transform: 'translateX(-50%)',
            background: isDisabled
              ? 'rgb(142, 142, 142)'
              : state.getDisplayColor().toString('css'),
          }}
        >
          <input ref={inputRef} {...inputProps} {...focusProps} />
        </div>
      </div>
    </div>
    </div>
  );
}

export default ColorSlider;
