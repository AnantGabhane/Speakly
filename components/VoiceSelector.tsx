"use client";

import { Check, Volume2 } from "lucide-react";

import { DEFAULT_VOICE, voiceCategories, voiceOptions } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { VoiceSelectorProps } from "@/types";

const categoryLabels: Record<keyof typeof voiceCategories, string> = {
  male: "Male voices",
  female: "Female voices",
};

function VoiceSelector({
  disabled,
  className,
  value = DEFAULT_VOICE,
  onChange,
}: VoiceSelectorProps) {
  return (
    <div className={cn("space-y-5", className)}>
      {Object.entries(voiceCategories).map(([category, voiceKeys]) => (
        <div key={category} className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#663820]">
            {categoryLabels[category as keyof typeof voiceCategories]}
          </p>
          <div className="voice-selector-options">
            {voiceKeys.map((voiceKey) => {
              const voice = voiceOptions[voiceKey as keyof typeof voiceOptions];
              const isSelected = value === voiceKey || value === voice.id;

              return (
                <button
                  key={voiceKey}
                  type="button"
                  disabled={disabled}
                  className={cn(
                    "voice-selector-option",
                    isSelected
                      ? "voice-selector-option-selected"
                      : "voice-selector-option-default",
                    disabled && "voice-selector-option-disabled",
                  )}
                  aria-pressed={isSelected}
                  onClick={() => onChange(voiceKey)}
                >
                  <span className="mt-1 flex size-5 items-center justify-center rounded-full border border-[#663820] text-[#663820]">
                    {isSelected ? <Check className="size-3" aria-hidden="true" /> : null}
                  </span>
                  <span className="flex flex-1 flex-col text-left">
                    <span className="text-base font-bold text-[#212a3b]">
                      {voice.name}
                    </span>
                    <span className="text-sm font-medium leading-5 text-[#3d485e]">
                      {voice.description}
                    </span>
                  </span>
                  {isSelected ? <Volume2 className="volume" aria-hidden="true" /> : null}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default VoiceSelector;
