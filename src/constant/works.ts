export interface Work {
    company: string
    title: string
    logo?: string
    start: string | { label: string; dateTime: string }
    end: string | { label: string; dateTime: string }
}

export const works: Array<Work> = [
    {
        company: '8XL Studio',
        title: 'Founder',
        start: '2023',
        end: {
            label: 'Present',
            dateTime: new Date().getFullYear().toString(),
        },
    },
    {
        company: '昆山广联发',
        title: 'Software Developer',
        start: '2024',
        end: '2025',
    },
    {
        company: '苏州唛唛橙',
        title: 'Software Developer',
        start: '2019',
        end: '2023',
    },
    {
        company: '江苏爱高',
        title: 'Software Developer',
        start: '2014',
        end: '2019',
    },
    {
        company: '昆山埃特魔石',
        title: 'Java Developer',
        start: '2015',
        end: '2018',
    },
    {
        company: '南京油运',
        title: 'Third Officer',
        start: '2011',
        end: '2015',
    },
]