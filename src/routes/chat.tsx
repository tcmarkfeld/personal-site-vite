import { createFileRoute } from '@tanstack/react-router';
import { ROUTES } from '@/Navigation/routeEnum';
import { Chat } from '@/pages/Chat/Chat';

export const Route = createFileRoute(ROUTES.CHAT)({
  component: Chat,
});
