import registerNumberFormatter from './registerInput'
import metadata from './metadata'

document.addEventListener('DOMContentLoaded', () => {
  const changeEvent = new (typeof Event === 'function' ? Event : CustomEvent)('change')

  // <input class="su" ...> 들을 찾는데,
  // 이미 적용된(su--dyed) 건 제외하고 찾아요.
  Array.prototype.forEach.call(document.querySelectorAll('input.su:not(.su--dyed)'), (input) => {
    registerNumberFormatter(input, metadata(input))

    // 초기에 값이 할당된 경우, change 이벤트를 호출해서
    // 값을 정의된 패턴에 맞게 formatting 해줘요.
    if (input.value) {
      input.dispatchEvent(changeEvent)
    }
  })
})
