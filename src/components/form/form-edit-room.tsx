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
import { useEffect, useState } from "react";
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
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Rooms } from "@/types";

interface Props {
  data: Rooms;
  id: string;
}
export function FormEditRoom({ data, id }: Props) {
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
    formData.append("diskonKamar", values.diskonKamar ? values.diskonKamar.toString() : "0");
    formData.append("statusKamar", values.statusKamar);
    values.images.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await axios.put(
        `http://localhost:3000/api/rooms/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast({
          title: "Success",
          description: response.data.message,
        });
        navigate("/admin/rooms");
      } else {
        toast({
          title: "Something went wrong",
          description: response.data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "kamar gagal diupdate",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    form.reset({
      namaKamar: data.namaKamar,
      descriptionKamar: data.deskripsiKamar,
      ukuranKamar: data.ukuranKamar,
      typeKamar: data.typeKamar,
      diskonKamar: data.diskonKamar,
      statusKamar: data.statusKamar,
    });
  }, [form, data]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid flex-1 w-full gap-4 pb-5 auto-rows-max">
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid items-start gap-4 auto-rows-max lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle>Informasi Kamar</CardTitle>
                  <CardDescription>Edit Informasi Untuk Kamar</CardDescription>
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
                            <Input placeholder="Nama Kamar" {...field} />
                          </FormControl>
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
                                <SelectItem value="Standard">
                                  Standard
                                </SelectItem>
                                <SelectItem value="Deluxe">Deluxe</SelectItem>
                                <SelectItem value="Suite">Suite</SelectItem>
                                <SelectItem value="Premium">Premium</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
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
                            <Input placeholder="Diskon Kamar" {...field} />
                          </FormControl>
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
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Tersedia">Tersedia</SelectItem>
                              <SelectItem value="Booking">Booking</SelectItem>
                              <SelectItem value="Archived">Archived</SelectItem>
                              <SelectItem value="Sedang diperbaiki">
                                Sedang diperbaiki
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
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
                  <CardTitle>foto Kamar</CardTitle>
                  <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Foto Kamar</FormLabel>
                        <FormControl>
                          <div className="space-y-6">
                            <FileUploader
                              value={field.value}
                              onValueChange={field.onChange}
                              maxFiles={5}
                              maxSize={1024 * 1024 * 5}
                              accept={{ "image/*": [] }}
                              multiple={true}
                            />
                            <UploadedFilesCard
                              uploadedFiles={data.images.map((img) => ({
                                key: img.id.toString(),
                                url: img.url,
                                name: img.name,
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
          </div>
        </div>
        <Button className="w-32 lg:hidden" type="submit">
          Edit Kamar
        </Button>
      </form>
    </Form>
  );
}
