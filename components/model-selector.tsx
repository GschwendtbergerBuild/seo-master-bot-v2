// components/model-selector.tsx
'use client';

import { startTransition, useMemo, useOptimistic, useState } from 'react';
import { saveChatModelAsCookie } from '@/app/chat/actions';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { chatModels } from '@/lib/ai/models';
import { cn } from '@/lib/utils';
import { CheckCircleFillIcon, ChevronDownIcon } from '@/components/icons';
import { entitlementsByUserType } from '@/lib/ai/entitlements';
import type { Session } from 'next-auth';

interface ModelSelectorProps extends React.ComponentProps<typeof Button> {
  session: Session;
  selectedModelId: string;
}

export function ModelSelector({
  session,
  selectedModelId,
  className,
  ...buttonProps
}: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const [optimisticModelId, setOptimisticModelId] =
    useOptimistic(selectedModelId);

  const userType = session.user.type;
  const { availableChatModelIds } = entitlementsByUserType[userType];

  const availableChatModels = chatModels.filter((m) =>
    availableChatModelIds.includes(m.id),
  );

  const selectedChatModel = useMemo(
    () =>
      availableChatModels.find((m) => m.id === optimisticModelId) ??
      availableChatModels[0],
    [optimisticModelId, availableChatModels],
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
            className,
          )}
          {...buttonProps}
        >
          {selectedChatModel.name}
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-[300px]">
        {availableChatModels.map((model) => (
          <DropdownMenuItem
            key={model.id}
            data-testid={`model-selector-item-${model.id}`}
            data-active={model.id === optimisticModelId}
            onSelect={() => {
              setOpen(false);
              startTransition(() => {
                setOptimisticModelId(model.id);
                saveChatModelAsCookie(model.id);
              });
            }}
            asChild
          >
            <button className="flex w-full justify-between items-center gap-4">
              <div className="flex flex-col items-start gap-1">
                <span>{model.name}</span>
                <span className="text-xs text-muted-foreground">
                  {model.description}
                </span>
              </div>
              {model.id === optimisticModelId && (
                <CheckCircleFillIcon className="text-foreground" />
              )}
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
