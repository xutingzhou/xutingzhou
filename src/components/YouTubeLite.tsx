export function YouTubeLite({ videoId }: { videoId: string }) {
    return (
        <div className="aspect-video w-full relative">
            <iframe
                className="w-full h-full absolute top-0 left-0"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />
        </div>
    )
}
