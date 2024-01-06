import cx from '@architecturex/utils.cx'

export const styles = {
  ul: 'bg-white border border-black rounded-md list-none m-0 overflow-auto p-0 absolute top-0 w-[130%] z-10',
  li: 'border-b border-shuttleGray text-[FontSize.regular] p-2.5 pl-5 last:border-b-0 hover:bg-whiteLilac hover:text-outerSpace',
  input: 'border-none border-b border-black py-1 px-2 h-8 w-full',
  select: 'min-w-[220px] relative touch-none select-none w-fit',
  a: 'rounded-md flex py-2.5 px-5 text-decoration-none w-fit'
}

export const tailwindClasses = cx.extract(styles)
