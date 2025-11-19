"use client"

import { motion } from "framer-motion"

export function EmptyState() {
    return (
        <div className="flex flex-col items-center py-24 text-zinc-500 dark:text-zinc-400">

            {/* 整体渐入 + 微浮动 */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <motion.svg
                    width="150"
                    height="150"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-10"
                >
                    {/* 盒子主体 */}
                    <rect
                        x="20"
                        y="40"
                        width="60"
                        height="40"
                        rx="4"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                    />

                    {/* 左盖子：先关闭 → 慢慢打开 */}
                    <motion.path
                        d="M20 40 L10 30 L40 30 L60 40"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: -25 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.3,
                            ease: "easeInOut",
                        }}
                        style={{ originX: 0.4, originY: 1 }}
                    />

                    {/* 右盖子：先关闭 → 慢慢打开 */}
                    <motion.path
                        d="M80 40 L90 30 L60 30 L40 40"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 25 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.3,
                            ease: "easeInOut",
                        }}
                        style={{ originX: 0.6, originY: 1 }}
                    />

                    {/* 盒子里冒出几颗“光点” */}
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="2"
                        fill="currentColor"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: [0, 1, 0], y: [10, -10, -20] }}
                        transition={{ duration: 1.4, delay: 1.0, repeat: Infinity }}
                    />

                    <motion.circle
                        cx="45"
                        cy="55"
                        r="1.5"
                        fill="currentColor"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: [0, 1, 0], y: [10, -12, -25] }}
                        transition={{ duration: 1.4, delay: 1.2, repeat: Infinity }}
                    />

                    <motion.circle
                        cx="55"
                        cy="55"
                        r="1.5"
                        fill="currentColor"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: [0, 1, 0], y: [10, -8, -18] }}
                        transition={{ duration: 1.4, delay: 1.3, repeat: Infinity }}
                    />
                </motion.svg>
            </motion.div>

            {/* 文本：在盖子完全打开后淡入 */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    delay: 1.1,   // 盖子打开后再出现
                    duration: 0.8,
                }}
                className="text-lg"
            >
                No articles found.
            </motion.div>
        </div>
    )
}
