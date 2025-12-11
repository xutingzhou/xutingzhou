import ClientArticles from '@/components/ClientArticles'
import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'Life',
    description:
        'My real life experiences and my dream for future life.',
}

export default function LifeIndex() {
    return (
        <ClientArticles
            title="去一个普通的地方，过着普通的生活"
            intro="人生有三把钥匙：接受、改变、离开。不能接受就改变，改变不了就离开。少问别人为什么，多问自己凭什么。"
            category="life"
        />
    )
}