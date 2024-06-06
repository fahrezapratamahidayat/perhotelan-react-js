import { schemasComments } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Schema, z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import useUserStore from "@/hooks/use-session";
import axios from "axios";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

export default function FormComments({ id }: { id: string | undefined }) {
  const form = useForm<z.infer<typeof schemasComments>>({
    resolver: zodResolver(schemasComments),
    defaultValues: {
      comments: "",
    },
  });
  const { userData } = useUserStore();
  const { mutate } = useSWRConfig()

  const onSubmit = async (values: z.infer<typeof schemasComments>) => {
    try {
      const respone = axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/rooms/comments/${id}`,
        {
          idTamu: userData?.idTamu,
          komentar: values.comments,
          tipeKomentar: "Kamar",
        }
      );
      toast("komentar berhasil dikirim", { duration: 2000 });
      form.reset()
      mutate("/rooms");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Komentar</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Silahkan Berkomentar Disini"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-2">
            Kirim
          </Button>
        </form>
      </Form>
    </>
  );
}
