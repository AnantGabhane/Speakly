"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Image as ImageIcon, Upload, X } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import LoadingOverlay from "@/components/LoadingOverlay";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ACCEPTED_IMAGE_TYPES, ACCEPTED_PDF_TYPES, voiceCategories, voiceOptions } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { UploadSchema } from "@/lib/zod";

type UploadFormValues = z.infer<typeof UploadSchema>;
type VoiceKey = keyof typeof voiceOptions;

type FileDropzoneProps = React.HTMLAttributes<HTMLDivElement> & {
  accept: string;
  file?: File;
  hint: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  inputId: string;
  onFileChange: (file: File | undefined) => void;
  prompt: string;
};

const voiceGroups: Array<{ label: string; voices: VoiceKey[] }> = [
  { label: "Male Voices", voices: voiceCategories.male as VoiceKey[] },
  { label: "Female Voices", voices: voiceCategories.female as VoiceKey[] },
];

const FileDropzone = ({
  accept,
  className,
  file,
  hint,
  icon: Icon,
  inputId,
  onFileChange,
  prompt,
  onClick,
  onKeyDown,
  ...props
}: FileDropzoneProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className={cn(
        "upload-dropzone",
        file && "upload-dropzone-uploaded",
        className,
      )}
      role="button"
      tabIndex={0}
      onClick={(event) => {
        onClick?.(event);
        openFilePicker();
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openFilePicker();
        }
      }}
      {...props}
    >
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(event) => {
          const selectedFile = event.target.files?.[0];
          onFileChange(selectedFile);
          event.currentTarget.value = "";
        }}
      />

      {file ? (
        <div className="flex max-w-full items-center gap-3 px-4 text-center">
          <p className="upload-dropzone-text truncate">{file.name}</p>
          <button
            type="button"
            className="upload-dropzone-remove"
            aria-label={`Remove ${file.name}`}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onFileChange(undefined);
            }}
          >
            <X className="size-5" />
          </button>
        </div>
      ) : (
        <>
          <Icon className="upload-dropzone-icon" aria-hidden="true" />
          <p className="upload-dropzone-text">{prompt}</p>
          <p className="upload-dropzone-hint">{hint}</p>
        </>
      )}
    </div>
  );
};

const UploadForm = () => {
  const form = useForm<UploadFormValues>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      title: "",
      author: "",
      persona: "",
      pdfFile: undefined,
      coverImage: undefined,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: UploadFormValues) => {
    void values;
    await new Promise((resolve) => setTimeout(resolve, 900));
  };

  return (
    <>
      {isSubmitting && <LoadingOverlay title="Beginning synthesis" />}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="pdfFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Book PDF File</FormLabel>
                <FormControl>
                  <FileDropzone
                    inputId="book-pdf-file"
                    accept={ACCEPTED_PDF_TYPES.join(",")}
                    file={field.value}
                    icon={Upload}
                    prompt="Click to upload PDF"
                    hint="PDF file (max 50MB)"
                    onFileChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Cover Image (Optional)</FormLabel>
                <FormControl>
                  <FileDropzone
                    inputId="book-cover-image"
                    accept={ACCEPTED_IMAGE_TYPES.join(",")}
                    file={field.value}
                    icon={ImageIcon}
                    prompt="Click to upload cover image"
                    hint="Leave empty to auto-generate from PDF"
                    onFileChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Title</FormLabel>
                <FormControl>
                  <input
                    className="form-input"
                    placeholder="ex: Rich Dad Poor Dad"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Author Name</FormLabel>
                <FormControl>
                  <input
                    className="form-input"
                    placeholder="ex: Robert Kiyosaki"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="persona"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">
                  Choose Assistant Voice
                </FormLabel>
                <FormControl>
                  <div className="space-y-6">
                    {voiceGroups.map((group) => (
                      <fieldset key={group.label} className="space-y-3">
                        <legend className="text-sm font-medium text-[#777]">
                          {group.label}
                        </legend>
                        <div className="voice-selector-options rounded-lg border border-[#ded6c7] p-4">
                          {group.voices.map((voiceKey) => {
                            const voice = voiceOptions[voiceKey];
                            const isSelected = field.value === voiceKey;

                            return (
                              <label
                                key={voiceKey}
                                className={cn(
                                  "voice-selector-option",
                                  isSelected
                                    ? "voice-selector-option-selected"
                                    : "voice-selector-option-default",
                                )}
                              >
                                <input
                                  type="radio"
                                  className="size-4 shrink-0"
                                  value={voiceKey}
                                  checked={isSelected}
                                  onChange={() => field.onChange(voiceKey)}
                                />
                                <span className="min-w-0">
                                  <span className="block font-bold text-[#212a3b]">
                                    {voice.name}
                                  </span>
                                  <span className="mt-1 block text-sm leading-[1.35] text-[#3d485e]">
                                    {voice.description}
                                  </span>
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </fieldset>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="form-btn" disabled={isSubmitting}>
            Begin Synthesis
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UploadForm;
