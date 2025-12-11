import type { Metadata } from 'next'
import ClientLife from './ClientLife'


export const metadata: Metadata = {
    title: 'Life',
    description:
        'My real life experiences and my dream for future life.',
}

export default function LifeIndex() {
    return <ClientLife />
}