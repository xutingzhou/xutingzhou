export default function Loading() {
    return (
        <div className="
      fixed inset-0 z-50 flex items-center justify-center
      bg-white/80 backdrop-blur-sm 
      dark:bg-black/60
    ">
            <div
                className="
          h-12 w-12 animate-spin rounded-full border-4 
          border-gray-300 border-t-black
          dark:border-gray-700 dark:border-t-white
        "
            />
        </div>
    );
}
