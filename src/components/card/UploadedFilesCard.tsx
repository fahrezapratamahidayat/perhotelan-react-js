
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { EmptyCard } from "@/components/card/empty-card"

export function UploadedFilesCard({ uploadedFiles }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploaded files</CardTitle>
        <CardDescription>View the uploaded files here</CardDescription>
      </CardHeader>
      <CardContent>
        {uploadedFiles.length > 0 ? (
          <ScrollArea className="pb-4">
            <div className="flex w-max space-x-2.5">
              {uploadedFiles.map((file: any) => (
                <div key={file.key} className="relative w-64 aspect-video">
                  <img
                    src={file.url}
                    alt={file.name}
                    sizes="(min-width: 640px) 640px, 100vw"
                    loading="lazy"
                    className="object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <EmptyCard
            title="No files uploaded"
            description="Upload some files to see them here"
            className="w-full"
          />
        )}
      </CardContent>
    </Card>
  )
}
