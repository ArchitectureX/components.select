import cx from '@architecturex/utils.cx'

export const styles = {
  label: 'block text-gray-700 text-sm font-bold mb-2 text-left dark:text-gray-300',
  button:
    'border border-gray-300 px-4 p-2 rounded w-full text-left text-sm overflow-hidden whitespace-nowrap text-overflow-ellipsis dark:bg-gray-700 dark:border-gray-600',
  openDiv:
    'absolute bg-white border border-gray-400 mt-1 rounded w-full z-10 dark:bg-gray-800 dark:border-gray-600',
  input: 'px-4 py-2 w-full text-sm dark:bg-gray-700 dark:text-gray-300',
  li: 'px-4 py-2 hover:bg-gray-100 cursor-pointer text-left text-gray-600 text-sm dark:text-gray-300 dark:hover:bg-gray-900'
}

export const tailwindClasses = cx.extract(styles)
