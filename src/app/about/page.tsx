import type { Metadata } from 'next'
import Image from 'next/image'

import { Container } from '@/components/Container'
import { SocialLinkWithText } from '@/components/SocialLink'
import { socialLinks } from '@/constant/socialLinks'
import portraitImage from '@/images/portrait.jpg'

export const metadata: Metadata = {
  title: 'About',
  description:
    'I’m Spencer Sharp. I live in New York City, where I design the future.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            我是许汀洲，一个热爱生活的软件开发者。
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              在这里，我会记录技术上的成长，记录迸发的创意，也记录生活中的时刻。就是想起记录啥就记录啥，没什么特别的主题。
            </p>
            <p>
              也许是想记录一下努力的过程。为什么而努力。努力不是为了证明自己有多优秀，而是在意外和不可控的因素来临时，那些平常所努力积淀的涵养和能力，可以成为抗衡一切风雨的底气。之所以努力，是为了尽可能的把命运拽在自己手里，而不是被动的困在父辈的阶层里动弹不得；是为了当自己遇到喜欢的人和事的时候，除了一片真心，还有拿得出手的东西。
            </p>
            <p>
              祝我们多赚钱，少生气，常开心，睡好觉，少焦虑。
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul>
            {
              socialLinks.map(({ name, href, icon }, index) => (
                <li className={`flex${index === 0 ? '' : ' mt-4'}`} key={name}>
                  <SocialLinkWithText href={href} icon={icon}>
                    {name}
                  </SocialLinkWithText>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </Container>
  )
}
