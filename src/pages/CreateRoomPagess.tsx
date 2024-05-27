import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FileUploader } from "@/components/ui/file-uploader";
import { UploadedFilesCard } from "@/components/card/UploadedFilesCard";

const formSchema = z.object({
  file: z.instanceof(FileList).optional(),
});

export default function CreateRoomPage() {
  return (
    <div className="space-y-6">
      <FileUploader
        maxFiles={1}
        maxSize={1 * 1024 * 1024}
      />
    </div>
  );
}
