import { UseChatHelpers } from 'ai/react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from '@/components/external-link';
import { IconArrowRight } from '@/components/ui/icons';
import { motion } from 'framer-motion';

export function EmptyScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl px-4"
    >
      <div className="flex flex-col gap-2 rounded-lg border bg-[#414450] p-8">
        <h1 className="text-2xl text-white font-semibold">
          Welcome to AI Lawyer - Your AI-Powered Legal Assistant
        </h1>
        <p className="text-lg text-gray-300">
          Discover a smarter way to navigate the legal landscape with AI Lawyer. Our cutting-edge platform combines advanced artificial intelligence with a vast database of legal cases to provide you with accurate and relevant legal information at your fingertips.
        </p>
        <Button className="self-start bg-slate-400">
          Ask a Question
          <IconArrowRight className="ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}