export function Bilibili({ videoId }: { videoId: string }) {
    return (
        <div className="aspect-video w-full relative">
            <iframe
                className="w-full h-full border-0"
                src={`//player.bilibili.com/player.html?isOutside=true&aid=115693550966574&bvid=${videoId}&cid=34631321806&p=1`}
                title={`Bilibili video ${videoId}`}
                scrolling="no"
                allowFullScreen
            />
        </div>
    )
}