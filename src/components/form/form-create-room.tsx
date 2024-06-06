import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "../ui/file-uploader";
import { useState } from "react";
import { UploadedFilesCard } from "../card/UploadedFilesCard";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemasCreateRoom } from "@/utils/schemas";
import axios, { AxiosError } from "axios";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

export function FormCreateRoom() {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof schemasCreateRoom>>({
    resolver: zodResolver(schemasCreateRoom),
    defaultValues: {
      namaKamar: "",
      descriptionKamar: "",
      ukuranKamar: "",
      typeKamar: undefined,
      diskonKamar: "",
      statusKamar: undefined,
      images: [],
    },
  });
  const navigate = useNavigate();
  async function onSubmit(values: z.infer<typeof schemasCreateRoom>) {
    const formData = new FormData();
    formData.append("namaKamar", values.namaKamar);
    formData.append("ukuranKamar", values.ukuranKamar);
    formData.append("deskripsiKamar", values.descriptionKamar);
    formData.append("typeKamar", values.typeKamar);
    if (values.diskonKamar !== undefined) {
      formData.append("diskonKamar", values.diskonKamar.toString());
    }
    formData.append("statusKamar", values.statusKamar);
    values.images.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/rooms",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast({
        title: "Success",
        description: response.data.msg,
        duration: 3000,
      });

      navigate("/admin/rooms");
    } catch (error: AxiosError | any) {
      toast({
        title: "Something went wrong",
        description: error.response.data.msg,
        variant: "destructive",
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid flex-1 w-full gap-4 pb-5 auto-rows-max">
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid items-start gap-4 auto-rows-max lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle>Informasi Kamar</CardTitle>
                  <CardDescription>
                    tambahkan informasi untuk kamar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="namaKamar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Kamar</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nama Kamar"
                              {...field}
                              autoComplete="off"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="descriptionKamar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deskripsi Kamar</FormLabel>
                          <FormControl>
                            <Textarea
                              id="description"
                              placeholder="Deskripsi Kamar"
                              {...field}
                              className="min-h-20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ukuranKamar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ukuran Kamar</FormLabel>
                          <FormControl>
                            <Input placeholder="Ukuran Kamar" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="typeKamar"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel>Type Kamar</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih type Kamar" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Standar">
                                  Standard
                                </SelectItem>
                                <SelectItem value="Deluxe">Deluxe</SelectItem>
                                <SelectItem value="Suite">Suite</SelectItem>
                                <SelectItem value="Premium">Premium</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="diskonKamar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Diskon Kamar (optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Diskon Kamar"
                              {...field}
                              type="number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Status kamar</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="statusKamar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status Kamar</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger
                              id="status"
                              aria-label="Select status"
                            >
                              <SelectValue placeholder="Select Status kamar" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Tersedia">Tersedia</SelectItem>
                              <SelectItem value="Archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Button className="hidden w-32 lg:block" type="submit">
                Buat Kamar
              </Button>
            </div>
            <div className="grid items-start gap-4 auto-rows-max lg:gap-8">
              <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
                <CardHeader>
                  <CardTitle>Upload Gambar</CardTitle>
                  <CardDescription>
                    Tambahkan Gambar untuk kamar minimal 1!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel></FormLabel>
                        <FormControl>
                          <div className="space-y-6">
                            <FileUploader
                              value={field.value}
                              onValueChange={(newFiles) => {
                                field.onChange(newFiles);
                                setFiles(newFiles);
                              }}
                              maxFiles={5}
                              maxSize={1024 * 1024 * 10}
                              accept={{ "image/*": [] }}
                              multiple={true}
                            />
                            <UploadedFilesCard
                              uploadedFiles={files.map((file) => ({
                                key: file.name,
                                url: URL.createObjectURL(file),
                                name: file.name,
                              }))}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
            <Button className="w-32 lg:hidden" type="submit">
              Buat Kamar
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
