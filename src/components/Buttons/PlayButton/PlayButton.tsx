export function PlayButton() {
  return (
    <button className="flex items-center justify-center rounded-full border-[1px] border-white bg-custom-green p-2 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#fff"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className="lucide lucide-play translate-x-[2px]"
      >
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    </button>
  )
}
