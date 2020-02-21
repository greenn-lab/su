import keydown from './events/keydown'
import focus from './events/focus'
import formatting from './numberFormatter'

export default (input: HTMLInputElement, meta: DecimalMetadata): void => {
  input.addEventListener(
    'keydown',
    (e: KeyboardEvent) => keydown(e, input, meta),
    false,
  )

  input.addEventListener(
    'focus',
    () => focus(input, meta),
    false,
  )

  input.addEventListener(
    'focusout',
    () => {
      input.value = formatting(input.value, meta)
    },
    false,
  )

  input.addEventListener(
    'mousedown',
    () => {
      meta.cursor = input.selectionStart || 0
    },
    false
  )

  // 적용된 형태로 명시하고, 숫자를 위한 정렬 스타일을 적용해요.
  input.classList.add('su--dyed')
  input.style.textAlign = 'right'

  // <input type=number...> 의 경우,
  // setSelectionRange 함수등이 동작하지 않아요. 그래서 억지로 "text" 로 바꿔요.
  if (input.getAttribute('type') === 'number') {
    input.setAttribute('type', 'text')
  }

  // inputmode 속성을 고정해요.
  // https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/inputmode
  input.setAttribute('inputmode', 'decimal')
}
