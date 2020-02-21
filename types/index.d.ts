export {}

declare global {
  interface DecimalMetadata {
    // 길이 제한없음
    unlimited: boolean
    // 앞쪽 수식어
    prefix: string
    // 뒷쪽 수식어
    suffix: string
    // 커서의 위치
    // <input ...> 에 클릭으로 특정 위치를 선택했을 때,
    // 위치를 기억해서 prefix, suffix 를 제거하고 난 이후
    // 다시 해당 위치로 커서를 옮겨요.
    cursor?: number
    integer: {
      groups: number
      fill: string
      max: number
    },
    fraction: {
      fill: string
      max: number
    }
  }
}
