import type { IconProps as PhosphorProps } from '@phosphor-icons/react'
import * as Phosphor from '@phosphor-icons/react'

export type Icon = (props: PhosphorProps) => JSX.Element

export const ArrowRight = Phosphor.ArrowRight
export const Ecosystem = Phosphor.Leaf
export const Plus = Phosphor.Plus
export const Minus = Phosphor.Minus
export const YoutubeLogo = Phosphor.YoutubeLogo
export const XLogo = Phosphor.XLogo
export const InstagramLogo = Phosphor.InstagramLogo
export const TiktokLogo = Phosphor.TiktokLogo
export const LinkedinLogo = Phosphor.LinkedinLogo
export const PinterestLogo = Phosphor.PinterestLogo

export const Menu: Icon = (props) => (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_4002_636)">
      <path
        d="M17.8125 10.5C17.8125 10.7486 17.7137 10.9871 17.5379 11.1629C17.3621 11.3387 17.1236 11.4375 16.875 11.4375H3.125C2.87636 11.4375 2.6379 11.3387 2.46209 11.1629C2.28627 10.9871 2.1875 10.7486 2.1875 10.5C2.1875 10.2514 2.28627 10.0129 2.46209 9.83709C2.6379 9.66127 2.87636 9.5625 3.125 9.5625H16.875C17.1236 9.5625 17.3621 9.66127 17.5379 9.83709C17.7137 10.0129 17.8125 10.2514 17.8125 10.5ZM3.125 6.4375H16.875C17.1236 6.4375 17.3621 6.33873 17.5379 6.16291C17.7137 5.9871 17.8125 5.74864 17.8125 5.5C17.8125 5.25136 17.7137 5.0129 17.5379 4.83709C17.3621 4.66127 17.1236 4.5625 16.875 4.5625H3.125C2.87636 4.5625 2.6379 4.66127 2.46209 4.83709C2.28627 5.0129 2.1875 5.25136 2.1875 5.5C2.1875 5.74864 2.28627 5.9871 2.46209 6.16291C2.6379 6.33873 2.87636 6.4375 3.125 6.4375ZM16.875 14.5625H3.125C2.87636 14.5625 2.6379 14.6613 2.46209 14.8371C2.28627 15.0129 2.1875 15.2514 2.1875 15.5C2.1875 15.7486 2.28627 15.9871 2.46209 16.1629C2.6379 16.3387 2.87636 16.4375 3.125 16.4375H16.875C17.1236 16.4375 17.3621 16.3387 17.5379 16.1629C17.7137 15.9871 17.8125 15.7486 17.8125 15.5C17.8125 15.2514 17.7137 15.0129 17.5379 14.8371C17.3621 14.6613 17.1236 14.5625 16.875 14.5625Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_4002_636">
        <rect
          width="20"
          height="20"
          fill="white"
          transform="translate(0 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
)